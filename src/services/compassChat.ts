/**
 * Client for the Prostate Health Compass chat proxy (Cloudflare Worker).
 * See worker/chat-proxy.js. The worker keeps the Gemini key server-side,
 * grounds answers in the approved guide content + an optional publication
 * corpus (RAG), and returns citations when it used sources.
 *
 * Build-time config:
 *   VITE_COMPASS_CHAT_URL   = https://compass-chat-proxy.<subdomain>.workers.dev
 *   VITE_TURNSTILE_SITE_KEY = <Cloudflare Turnstile site key>   (optional)
 *
 * When a Turnstile site key is set, the client solves a challenge, exchanges
 * it for a short-lived signed session, and sends that as a bearer token.
 */
import { getTurnstileToken } from "./turnstile";

const BASE = (import.meta.env.VITE_COMPASS_CHAT_URL || "").trim().replace(/\/+$/, "");
const SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY || "").trim();

export function compassChatConfigured(): boolean {
  return BASE.length > 0;
}

const LANG_NAMES: Record<string, string> = {
  en: "English", es: "Spanish", zh: "Chinese", hi: "Hindi", it: "Italian",
  fr: "French", pt: "Portuguese", "pt-BR": "Brazilian Portuguese", ar: "Arabic",
  tr: "Turkish", ru: "Russian", mr: "Marathi", bn: "Bengali",
};

export interface Citation {
  n: number;
  title: string;
  url: string;
}

export interface CompassAnswer {
  text: string;
  source: "ai" | "offline";
  citations?: Citation[];
}

let session: { token: string; exp: number } | null = null;
let sessionInFlight: Promise<string | null> | null = null;

async function getSession(): Promise<string | null> {
  if (!BASE || !SITE_KEY) return null;
  if (session && session.exp > Date.now() + 30_000) return session.token;
  if (sessionInFlight) return sessionInFlight;

  sessionInFlight = (async () => {
    const tsToken = await getTurnstileToken(SITE_KEY);
    const res = await fetch(`${BASE}/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tsToken }),
    });
    if (!res.ok) throw new Error(`session HTTP ${res.status}`);
    const data = (await res.json()) as { session: string; expiresIn?: number };
    session = { token: data.session, exp: Date.now() + (data.expiresIn ?? 1800) * 1000 };
    return session.token;
  })();

  try {
    return await sessionInFlight;
  } finally {
    sessionInFlight = null;
  }
}

async function postChat(
  q: string,
  context: string | undefined,
  bearer: string | null
): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (bearer) headers.Authorization = `Bearer ${bearer}`;
  return fetch(`${BASE}/chat`, {
    method: "POST",
    headers,
    body: JSON.stringify({ question: q, context }),
  });
}

/**
 * Ask the guide assistant. `context` is a short, non-identifying snippet of the
 * chapter the reader is on. Never pass anything patient-specific.
 * Falls back to `offlineAnswer` when the worker is unreachable or unconfigured.
 */
export async function askCompass(
  question: string,
  opts: { context?: string; lang?: string; offlineAnswer: (q: string) => string }
): Promise<CompassAnswer> {
  const { context, lang = "en", offlineAnswer } = opts;
  if (!BASE) return { text: offlineAnswer(question), source: "offline" };

  const langName = LANG_NAMES[lang] ?? "English";
  const q = lang !== "en" ? `[Respond in ${langName}.]\n${question}` : question;

  try {
    let bearer: string | null = null;
    try {
      bearer = await getSession();
    } catch {
      // Session couldn't be established; try the request anyway (the worker may
      // be running origin-gated without sessions).
    }

    let res = await postChat(q, context, bearer);
    if (res.status === 401 && SITE_KEY) {
      session = null;
      bearer = await getSession().catch(() => null);
      res = await postChat(q, context, bearer);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as {
      text?: string;
      error?: string;
      citations?: Citation[];
    };
    if (!data.text) throw new Error(data.error || "empty response");
    return { text: data.text, source: "ai", citations: data.citations };
  } catch {
    return { text: offlineAnswer(question), source: "offline" };
  }
}
