# compass-chat-proxy

Cloudflare Worker that fronts the Gemini API for the **Understanding Localized
Prostate Cancer** Mount Sinai patient guide. It keeps the Gemini key off the
client, grounds every answer in the approved guide content (`SYSTEM_PROMPT` in
`chat-proxy.js`, adapted from the Mount Sinai draft, Aug 2026), and can retrieve
from an approved publication corpus (RAG).

Adapted from `epsa-gemini-proxy`. Same security model, broader prompt.

## Routes

| Route | Method | Auth | Body | Returns |
|-------|--------|------|------|---------|
| `/health` | GET | none | — | `{ status, model, rag }` |
| `/session` | POST | Turnstile token | `{ token }` | `{ session, expiresIn }` |
| `/chat` | POST | session / APP_TOKEN / open | `{ question, context? }` | `{ text, citations }` |
| `/ingest` | POST | `Bearer INGEST_TOKEN` | `{ docs: [{id,title,url,text}] }` | `{ ok, docs, chunks }` |

## Deploy

```bash
cd worker
npm install
npx wrangler secret put GEMINI_API_KEY
npx wrangler deploy
```

`ALLOWED_ORIGINS` in `chat-proxy.js` already lists the production origin
(`https://www.urology.edu.eu.org`, GitHub Pages) plus localhost. Add any others
there.

## Auth (Turnstile sessions)

A public static site can't hold a credential. Instead the browser solves a
Turnstile challenge and exchanges it for a short-lived signed session.

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY   # from Cloudflare Turnstile
npx wrangler secret put SESSION_SECRET         # long random string
```

Frontend: set `VITE_TURNSTILE_SITE_KEY`. With neither `SESSION_SECRET` nor
`APP_TOKEN` set, `/chat` runs open but origin-gated.

## RAG over the publication corpus

Grounds answers in an approved, **de-identified, published** corpus — no PHI.

```bash
# 1. one-time infra
npx wrangler vectorize create compass-papers --dimensions=768 --metric=cosine
npx wrangler secret put INGEST_TOKEN            # long random string
# uncomment [ai] and [[vectorize]] in wrangler.toml, then:
npx wrangler deploy

# 2. add documents
#    put .md / .txt files in worker/corpus/  (see corpus/README.md)

# 3. ingest
WORKER_URL=https://compass-chat-proxy.<sub>.workers.dev \
INGEST_TOKEN=<the secret above> \
node ingest/ingest.mjs
```

The worker chunks (~1200 chars, 200 overlap), embeds with Workers AI
(`@cf/baai/bge-base-en-v1.5`), and upserts to Vectorize. On `/chat` it embeds the
question, retrieves the top matches above a score threshold, prepends them as a
`SOURCES` block, and returns `citations`. If the bindings are absent or the index
is empty, RAG is silently skipped and the guide-prompt grounding still applies.

`GET /health` reports `"rag": true` once the bindings are live.

## PHI posture

The Google Generative Language API is **not covered by a BAA**. This worker must
never receive or log protected health information.

- The client sends only free-text questions plus guide-derived context.
- The RAG corpus is published, de-identified material only.
- The worker applies a regex scrub (email, SSN, phone, MRN, dates, long digit
  runs) as defence in depth. **It cannot catch a bare name.**
- Logging is status-code only. Do not add prompt/response logging.

Before any real PHI flows through this path, move upstream to **Vertex AI under a
signed Google Cloud BAA** with real authentication and audit logging.
