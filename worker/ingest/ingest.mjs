#!/usr/bin/env node
/**
 * Ingest the approved publication corpus into the worker's Vectorize index.
 *
 * The worker does the chunking + embedding + upsert; this script just reads
 * local files and POSTs them to the admin /ingest route.
 *
 * Usage:
 *   WORKER_URL=https://compass-chat-proxy.<sub>.workers.dev \
 *   INGEST_TOKEN=<the secret you set with `wrangler secret put INGEST_TOKEN`> \
 *   node ingest/ingest.mjs [corpusDir]
 *
 * Corpus files: .md or .txt in worker/corpus/ (default). Optional frontmatter:
 *   ---
 *   title: Long-term outcomes of active surveillance ...
 *   url: https://pubmed.ncbi.nlm.nih.gov/00000000/
 *   ---
 *   <plain text of the paper / abstract / approved summary>
 *
 * Only add approved, de-identified, published material. No PHI, no patient
 * records, no unpublished data.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, extname, basename, resolve } from 'node:path';

const WORKER_URL = (process.env.WORKER_URL || '').replace(/\/+$/, '');
const INGEST_TOKEN = process.env.INGEST_TOKEN || '';
const corpusDir = resolve(process.argv[2] || join(new URL('.', import.meta.url).pathname, '..', 'corpus'));
const BATCH = 4;

if (!WORKER_URL || !INGEST_TOKEN) {
  console.error('Set WORKER_URL and INGEST_TOKEN environment variables.');
  process.exit(1);
}

function parse(raw, fallbackTitle) {
  let title = fallbackTitle;
  let url = '';
  let text = raw;
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fm) {
    text = raw.slice(fm[0].length);
    for (const line of fm[1].split('\n')) {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (!m) continue;
      if (m[1] === 'title') title = m[2].trim();
      if (m[1] === 'url') url = m[2].trim();
    }
  }
  return { title, url, text: text.trim() };
}

const files = (await readdir(corpusDir)).filter((f) => ['.md', '.txt'].includes(extname(f).toLowerCase()));
if (!files.length) {
  console.error(`No .md/.txt files in ${corpusDir}`);
  process.exit(1);
}
console.log(`Ingesting ${files.length} file(s) from ${corpusDir}`);

const docs = [];
for (const f of files) {
  const raw = await readFile(join(corpusDir, f), 'utf8');
  const { title, url, text } = parse(raw, basename(f, extname(f)));
  if (text.length < 40) {
    console.warn(`  skip ${f} (too short)`);
    continue;
  }
  docs.push({ id: basename(f, extname(f)), title, url, text });
}

let totalChunks = 0;
for (let i = 0; i < docs.length; i += BATCH) {
  const batch = docs.slice(i, i + BATCH);
  const res = await fetch(`${WORKER_URL}/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${INGEST_TOKEN}` },
    body: JSON.stringify({ docs: batch }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`  batch ${i / BATCH + 1} failed: HTTP ${res.status} ${JSON.stringify(data)}`);
    process.exit(1);
  }
  totalChunks += data.chunks || 0;
  console.log(`  batch ${i / BATCH + 1}: ${batch.map((d) => d.id).join(', ')} → ${data.chunks} chunks`);
}
console.log(`Done. ${docs.length} docs, ${totalChunks} chunks upserted.`);
