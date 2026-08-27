/**
 * Minimal Cloudflare Turnstile loader — used to obtain a token that the
 * compass-chat-proxy exchanges for a short-lived signed session.
 * No-op unless VITE_TURNSTILE_SITE_KEY is set.
 */

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const HOLDER_ID = "cf-turnstile-holder";

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      size?: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "timeout-callback"?: () => void;
    }
  ) => string;
  remove: (widgetId: string) => void;
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("no document"));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_URL;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/** Resolves with a fresh Turnstile token, or rejects if the challenge fails. */
export async function getTurnstileToken(siteKey: string): Promise<string> {
  await loadScript();
  const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
  if (!api) throw new Error("Turnstile unavailable");

  let holder = document.getElementById(HOLDER_ID);
  if (!holder) {
    holder = document.createElement("div");
    holder.id = HOLDER_ID;
    holder.style.cssText =
      "position:fixed;left:0;bottom:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";
    document.body.appendChild(holder);
  }
  holder.innerHTML = "";

  return new Promise<string>((resolve, reject) => {
    let widgetId: string | null = null;
    const done = (fn: () => void) => {
      if (widgetId) {
        try {
          api.remove(widgetId);
        } catch {
          /* ignore */
        }
      }
      fn();
    };
    try {
      widgetId = api.render(holder as HTMLElement, {
        sitekey: siteKey,
        size: "flexible",
        callback: (token: string) => done(() => resolve(token)),
        "error-callback": () => done(() => reject(new Error("Turnstile error"))),
        "timeout-callback": () => done(() => reject(new Error("Turnstile timeout"))),
      });
    } catch (e) {
      reject(e as Error);
    }
  });
}
