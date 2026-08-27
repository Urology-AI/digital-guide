/**
 * Cloudflare Worker — AI chat proxy for the Mount Sinai / Tewari Program
 * "Prostate Health Compass" patient guide.
 *
 * Adapted from epsa-gemini-proxy. Its only job is to keep the Gemini API key
 * off the client and to ground answers in approved, non-identifying patient
 * education content. The browser sends { question, context? }; this worker adds
 * the key + a grounding system prompt and forwards to Gemini.
 *
 * Deploy:
 *   cd worker && npm install && npx wrangler deploy
 *
 * Secrets (set once via wrangler, never in code or wrangler.toml):
 *   npx wrangler secret put GEMINI_API_KEY        # Google AI Studio key
 *   npx wrangler secret put TURNSTILE_SECRET_KEY  # optional — enables POST /session
 *   npx wrangler secret put SESSION_SECRET        # optional — HMAC signing key for sessions
 *   npx wrangler secret put APP_TOKEN             # optional legacy fallback
 *
 * Routes:
 *   GET  /health   – liveness check (no auth)
 *   POST /session  – exchange a Turnstile token for a short-lived signed session
 *   POST /chat     – { question, context? } -> { text }
 *
 * PHI POSTURE — READ BEFORE CHANGING:
 *   The Google Generative Language API is NOT covered by a BAA. This worker
 *   must never receive, and never log, protected health information. The
 *   client sends only free-text questions and guide-derived context; the
 *   `scrub()` below is a second line of defence, not the primary control, and
 *   it cannot catch a bare name. Logging is status-only, by construction.
 *   Before any real PHI flows here, move upstream to Vertex AI under a signed
 *   Google Cloud BAA with real auth + audit logging.
 */

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const ALLOWED_ORIGINS = [
  // Production — GitHub Pages served at https://www.urology.edu.eu.org/digital-guide/
  'https://www.urology.edu.eu.org',
  'https://urology.edu.eu.org',
  'https://urology-ai.github.io', // github.io fallback before the custom domain resolves
  // Local dev / preview
  'http://localhost:5173',
  'http://localhost:4173',
];

const MAX_BODY_BYTES = 200_000;
const SESSION_TTL_SECONDS = 30 * 60;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Grounding prompt. Facts are drawn from "Understanding Localized Prostate
 * Cancer — Mount Sinai Patient Guide" (Milton and Carroll Petrie Department of
 * Urology / The Tisch Cancer Institute), a draft for medical + brand review.
 * Do not add facts that are not in that guide.
 */
const SYSTEM_PROMPT = `You are the patient-education assistant for "Understanding Localized Prostate Cancer," a guide from Mount Sinai's Milton and Carroll Petrie Department of Urology and The Tisch Cancer Institute. The guide is a draft under medical review.

Your job is to help patients and families understand a localized prostate cancer diagnosis — the tests, the terms, the treatment choices, and recovery — in plain, calm language, and to prepare them for shared decision-making with their own care team.

STYLE:
- Warm, calm, and reassuring. Many readers are newly diagnosed and anxious. Reinforce that a decision rarely has to be rushed.
- Plain language. Define any term the first time you use it.
- Concise: 2–4 short paragraphs. Use a short list only when it genuinely helps.
- When helpful, point to the relevant chapter (e.g. "See the Treatment choices chapter").
- End substantive answers by encouraging the reader to discuss specifics with their Mount Sinai care team.

RULES:
- Educational only. Never diagnose, never recommend a specific treatment for the individual, never interpret their personal results as good or bad.
- Do not invent statistics, studies, or quotations, and do not attribute quotes to any clinician.
- Stay on localized prostate cancer: anatomy, PSA, biopsy/Grade Group, stage and risk group, the care team, treatment choices, quality of life, recovery/follow-up, healthy living, and genetics. Gently redirect anything else.
- Never ask for, repeat, or acknowledge any identifying detail about the patient (name, contact info, dates, record numbers). If the question contains one, answer the general question and ignore the detail.
- If you are unsure or the guide does not cover it, say so and refer the reader to their care team. This guide is a draft pending medical review.
- When a SOURCES section is included below, prefer it for specifics and cite the sources you use as [1], [2], etc. Never introduce a statistic or claim that is not in SOURCES or in the key facts above.

KEY FACTS FROM THE GUIDE:
- Localized prostate cancer generally means testing suggests the cancer is confined to the prostate; it is commonly staged T1 or T2. "Locally advanced"/"regional" means growth just outside the prostate or into nearby structures or nodes.
- Five-year relative survival for localized prostate cancer is greater than 99%. Statistics describe groups, not individuals, but they help explain why there is often time for thoughtful decisions.
- The most important first step: know your PSA, Grade Group, clinical stage, imaging results, and risk group — they work together and no single number tells the whole story.
- Early prostate cancer often causes no symptoms; urinary changes are usually benign enlargement, not cancer.
- PSA is a protein made by prostate tissue; an elevated value does not by itself prove cancer (benign enlargement, inflammation, infection, recent procedures also raise it). Trend over time, prostate size, PSA density, and context all matter. Before a PSA test, ask whether recent infection, ejaculation, cycling, urinary procedures, or medications could affect the result.
- Tests that may follow an abnormal PSA: repeat PSA and exam, multiparametric MRI, selected biomarker/genomic tests, and prostate biopsy.
- Biopsy report: the pathologist adds the two most common Gleason patterns and translates the result to a Grade Group 1–5. GG1 = 3+3=6 (lower grade, active surveillance often preferred when other findings are low risk); GG2 = 3+4=7 (favorable intermediate in context); GG3 = 4+3=7; GG4 = 4+4=8 and selected patterns (high-grade); GG5 = 9–10 (highest grade). Also note number/percentage of positive cores, one vs. both sides, and features like cribriform/intraductal patterns or perineural invasion. A genitourinary-pathologist review can matter.
- Clinical stage uses TNM (tumor, nodes, metastasis). Risk groups (very low, low, favorable/unfavorable intermediate, high, very high) combine PSA, Grade Group, and stage; systems can differ. MRI shows the prostate and nearby tissue; CT, bone scan, or PSMA PET may be added when spread is more likely.
- Care team may include a urologic oncologist, radiation oncologist, medical oncologist, radiologist and pathologist, sexual medicine/pelvic health, and nurse/social worker/navigator. Second opinions help when pathology/risk is uncertain, options differ in quality-of-life tradeoffs, focal therapy or a trial is considered, or priorities aren't reflected in the recommendation.
- Treatment choices for localized disease:
  * Active surveillance — preferred for many low-risk (and selected favorable intermediate-risk) cancers; PSA, exams, MRI and repeat biopsy on a risk-adapted schedule; treat if it progresses. Not the same as watchful waiting (less intensive, symptom-focused).
  * Surgery (radical prostatectomy) — removes prostate and seminal vesicles; gives final pathology; PSA should become very low/undetectable; tradeoffs include operation/catheter, early urinary leakage, erectile changes, loss of ejaculation and natural fertility; nerve-sparing may help erectile recovery when safe.
  * Radiation — external-beam (outside the body, schedules from a few high-dose treatments to several weeks) or brachytherapy (sources placed in/near the prostate); no incision; early urinary/bowel irritation possible; erectile function can decline gradually.
  * Focal therapy (HIFU, cryoablation, investigational approaches) — treats a targeted area; evidence and eligibility vary; whole prostate still needs monitoring.
  * Hormone therapy (ADT) — lowers/blocks testosterone; for localized disease usually combined with radiation in selected intermediate/high-risk cases; generally not curative alone; plan bone, cardiovascular, and metabolic supportive care first.
- Quality of life: ask about supportive care before treatment. Pelvic floor training before/after surgery; report persistent rectal bleeding rather than assuming "just radiation"; sexual-health options include medicine, devices, injections, counseling, implants. Fertility: ask about sperm banking before treatment begins.
- Recovery/follow-up: after surgery the catheter is temporary and the first postoperative PSA guides follow-up; after radiation PSA declines gradually since the prostate stays in place; long-term, the clinician defines the PSA threshold/trend that triggers further evaluation. Seek urgent care for chest pain, trouble breathing, fainting, serious allergic reaction, inability to urinate, heavy bleeding, fever/chills after a procedure, or severe/worsening pain.
- Healthy living supports recovery but cannot guarantee the cancer will not progress: regular activity and strength work, a diet rich in vegetables/fruit/whole grains/beans/nuts/fish, protected sleep, no tobacco, limited alcohol.
- Genetics: consider genetic counseling if the cancer is high/very-high-risk, regional, or metastatic, or with a strong family history of prostate, breast, ovarian, pancreatic, colorectal, or endometrial cancer. Germline testing finds inherited variants (relevant to relatives); tumor/somatic testing looks at the cancer itself. A negative germline result does not erase a strong family history.
- Emotional health is part of cancer care: anxiety, sadness, anger, and decision regret are common. In the US, call or text 988 for the Suicide & Crisis Lifeline, or 911 for immediate danger.`;

// ── CORS ─────────────────────────────────────────────────────────────────────

function corsHeaders(origin) {
  const headers = { Vary: 'Origin' };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

// ── PHI backstop ─────────────────────────────────────────────────────────────

function scrub(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/\b[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, '[redacted]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[redacted]')
    .replace(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[redacted]')
    .replace(/\b(?:MRN|mrn|medical record(?: number)?)\b[:#\s]*[\w-]+/gi, '[redacted]')
    .replace(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/g, '[redacted]')
    .replace(/\b\d{7,}\b/g, '[redacted]');
}

// ── Sessions (Turnstile -> short-lived signed token) ─────────────────────────

const b64url = {
  encode(bytes) {
    let s = '';
    for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  decode(str) {
    const pad = str.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  },
};

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function issueSession(secret, { ip, origin }) {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    ip,
    origin: origin || '',
    nonce: b64url.encode(crypto.getRandomValues(new Uint8Array(12))),
  };
  const body = b64url.encode(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return { token: `${body}.${b64url.encode(sig)}`, expiresIn: SESSION_TTL_SECONDS };
}

async function verifySession(secret, token, { ip, origin }) {
  if (typeof token !== 'string' || !token.includes('.')) return false;
  const [body, sig] = token.split('.');
  if (!body || !sig) return false;

  const key = await hmacKey(secret);
  const ok = await crypto.subtle
    .verify('HMAC', key, b64url.decode(sig), new TextEncoder().encode(body))
    .catch(() => false);
  if (!ok) return false;

  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(b64url.decode(body)));
  } catch {
    return false;
  }
  if (typeof payload?.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return false;
  if (payload.ip !== ip) return false;
  if ((payload.origin || '') !== (origin || '')) return false;
  return true;
}

async function verifyTurnstile(secret, token, ip) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip && ip !== 'unknown') form.append('remoteip', ip);
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
    const data = await res.json();
    return data?.success === true;
  } catch {
    return false;
  }
}

// ── Rate limiter (no-op unless RATE_LIMIT_KV is bound) ───────────────────────

async function isRateLimited(kv, ip, limitPerMinute = 20) {
  if (!kv) return false;
  const now = Date.now();
  const key = `rl:${ip}`;
  const raw = await kv.get(key, { type: 'json' });
  const timestamps = Array.isArray(raw) ? raw.filter((t) => t > now - 60_000) : [];
  if (timestamps.length >= limitPerMinute) return true;
  timestamps.push(now);
  await kv.put(key, JSON.stringify(timestamps), { expirationTtl: 90 });
  return false;
}

// ── Retrieval-augmented grounding (Vectorize + Workers AI) ───────────────────
//
// Optional. Active only when the AI and VECTORIZE bindings exist (see
// wrangler.toml) and the index has content (see worker/ingest/). The corpus
// must be approved, de-identified, published material — no PHI.

const EMBED_MODEL = '@cf/baai/bge-base-en-v1.5'; // 768-dim
const RAG_TOP_K = 6;
const RAG_MIN_SCORE = 0.6;
const RAG_MAX_CHARS = 6000;
const CHUNK_CHARS = 1200;
const CHUNK_OVERLAP = 200;

async function embed(env, text) {
  if (!env.AI) return null;
  try {
    const out = await env.AI.run(EMBED_MODEL, { text: [String(text).slice(0, 4000)] });
    return out?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

function chunkText(text) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  const chunks = [];
  const step = CHUNK_CHARS - CHUNK_OVERLAP;
  for (let i = 0; i < clean.length; i += step) {
    const piece = clean.slice(i, i + CHUNK_CHARS).trim();
    if (piece) chunks.push(piece);
    if (i + CHUNK_CHARS >= clean.length) break;
  }
  return chunks;
}

async function retrieve(env, question) {
  if (!env.VECTORIZE || !env.AI) return { block: '', citations: [] };
  const vec = await embed(env, question);
  if (!vec) return { block: '', citations: [] };
  let res;
  try {
    res = await env.VECTORIZE.query(vec, { topK: RAG_TOP_K, returnMetadata: 'all' });
  } catch {
    return { block: '', citations: [] };
  }
  const matches = (res?.matches ?? []).filter((m) => (m.score ?? 0) >= RAG_MIN_SCORE);
  if (!matches.length) return { block: '', citations: [] };

  const citations = [];
  const seen = new Map();
  let block = '';
  for (const m of matches) {
    const md = m.metadata ?? {};
    const key = md.url || md.title || m.id;
    let idx = seen.get(key);
    if (idx == null) {
      idx = citations.length + 1;
      seen.set(key, idx);
      citations.push({ n: idx, title: md.title || 'Source', url: md.url || '' });
    }
    const snippet = String(md.text || '').slice(0, 1200);
    if (block.length + snippet.length > RAG_MAX_CHARS) break;
    block += `[${idx}] ${md.title || 'Source'}${md.url ? ' — ' + md.url : ''}\n${snippet}\n\n`;
  }
  return { block: block.trim(), citations };
}

/** Admin-only: chunk + embed + upsert documents into Vectorize. */
async function handleIngest(request, env, cors) {
  const token = env.INGEST_TOKEN;
  if (!token) return json({ error: 'Ingestion not configured' }, 503, cors);
  const auth = request.headers.get('Authorization') || '';
  if (auth !== `Bearer ${token}`) return json({ error: 'Unauthorized' }, 401, cors);
  if (!env.AI || !env.VECTORIZE) return json({ error: 'AI or VECTORIZE binding missing' }, 503, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, cors);
  }
  const docs = Array.isArray(body?.docs) ? body.docs : [];
  if (!docs.length) return json({ error: 'No docs' }, 400, cors);

  let chunks = 0;
  for (const doc of docs) {
    const docId = String(doc.id || doc.title || crypto.randomUUID()).slice(0, 120);
    const title = String(doc.title || docId);
    const docUrl = typeof doc.url === 'string' ? doc.url : '';
    const pieces = chunkText(doc.text || '');
    const vectors = [];
    for (let i = 0; i < pieces.length; i++) {
      const values = await embed(env, pieces[i]);
      if (!values) continue;
      vectors.push({
        id: `${docId}#${i}`,
        values,
        metadata: { docId, title, url: docUrl, text: pieces[i] },
      });
    }
    if (vectors.length) {
      await env.VECTORIZE.upsert(vectors);
      chunks += vectors.length;
    }
  }
  return json({ ok: true, docs: docs.length, chunks }, 200, cors);
}

// ── Main handler ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      if (!cors['Access-Control-Allow-Origin']) {
        return json({ error: 'Origin not allowed' }, 403, cors);
      }
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === 'GET' && url.pathname === '/health') {
      return json(
        { status: 'ok', model: GEMINI_MODEL, rag: Boolean(env.AI && env.VECTORIZE) },
        200,
        cors,
      );
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    if (request.method === 'POST' && url.pathname === '/session') {
      if (origin && !cors['Access-Control-Allow-Origin']) {
        return json({ error: 'Origin not allowed' }, 403, cors);
      }
      const turnstileSecret = env.TURNSTILE_SECRET_KEY;
      const sessionSecret = env.SESSION_SECRET;
      if (!turnstileSecret || !sessionSecret) {
        return json({ error: 'Sessions not configured on server' }, 503, cors);
      }
      if (await isRateLimited(env.RATE_LIMIT_KV, `sess:${ip}`, 10)) {
        return json({ error: 'Too many requests — please wait a moment' }, 429, cors);
      }
      let sessionBody;
      try {
        sessionBody = await request.json();
      } catch {
        return json({ error: 'Invalid JSON' }, 400, cors);
      }
      const passed = await verifyTurnstile(turnstileSecret, sessionBody?.token, ip);
      if (!passed) {
        return json({ error: 'Challenge failed' }, 403, cors);
      }
      const { token, expiresIn } = await issueSession(sessionSecret, { ip, origin });
      return json({ session: token, expiresIn }, 200, cors);
    }

    if (request.method === 'POST' && url.pathname === '/ingest') {
      return handleIngest(request, env, cors);
    }

    if (request.method !== 'POST' || url.pathname !== '/chat') {
      return json({ error: 'Not found' }, 404, cors);
    }

    if (origin && !cors['Access-Control-Allow-Origin']) {
      return json({ error: 'Origin not allowed' }, 403, cors);
    }

    // Auth. Any one path is sufficient:
    //   1. Signed browser session (from Turnstile via POST /session)
    //   2. APP_TOKEN, legacy fallback when SESSION_SECRET is unset
    // If neither secret is configured, the worker runs open (origin-gated only).
    const sessionSecret = env.SESSION_SECRET;
    const appToken = env.APP_TOKEN;
    const auth = request.headers.get('Authorization') || '';
    const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';

    let authorized = false;
    if (sessionSecret && bearer) {
      authorized = await verifySession(sessionSecret, bearer, { ip, origin });
    }
    if (!authorized && !sessionSecret && appToken) {
      authorized = auth === `Bearer ${appToken}`;
    }
    if ((sessionSecret || (!sessionSecret && appToken)) && !authorized) {
      return json({ error: 'Unauthorized' }, 401, cors);
    }

    if (await isRateLimited(env.RATE_LIMIT_KV, ip)) {
      return json({ error: 'Too many requests — please wait a moment' }, 429, cors);
    }

    const declared = Number(request.headers.get('Content-Length') || 0);
    if (declared > MAX_BODY_BYTES) {
      return json({ error: 'Request too large' }, 413, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors);
    }

    const { question, context } = body ?? {};
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return json({ error: 'Missing question' }, 400, cors);
    }

    const geminiKey = env.GEMINI_API_KEY;
    if (!geminiKey) {
      return json({ error: 'Gemini not configured on server' }, 503, cors);
    }

    // Backstop scrub. Never log either value.
    const safeQuestion = scrub(question.trim()).slice(0, 4000);
    const safeContext = typeof context === 'string' ? scrub(context.trim()).slice(0, 8000) : '';

    // Retrieval-augmented grounding (no-op unless the index is configured + populated).
    const { block: ragBlock, citations } = await retrieve(env, safeQuestion);
    const sourcesPart = ragBlock
      ? `\n\nSOURCES (excerpts from approved Mount Sinai / Tewari-program publications; cite as [n] when you use them, and if they do not address the question, rely on the key facts above and say what is not covered):\n${ragBlock}`
      : '';

    const userPrompt =
      (safeContext
        ? `Guide context the reader is looking at:\n${safeContext}\n\nReader question: ${safeQuestion}`
        : safeQuestion) + sourcesPart;

    const geminiBody = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
    };

    let geminiRes;
    try {
      geminiRes = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey },
        body: JSON.stringify(geminiBody),
      });
    } catch (err) {
      return json({ error: 'Could not reach Gemini', detail: err?.message }, 502, cors);
    }

    if (!geminiRes.ok) {
      return json({ error: `Gemini returned HTTP ${geminiRes.status}` }, 502, cors);
    }

    let data;
    try {
      data = await geminiRes.json();
    } catch {
      return json({ error: 'Invalid response from Gemini' }, 502, cors);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return json({ error: 'No content in Gemini response' }, 502, cors);
    }

    return json({ text: text.trim(), citations }, 200, cors);
  },
};

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}
