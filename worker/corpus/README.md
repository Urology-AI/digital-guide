# RAG corpus

Drop approved reference documents here as `.md` or `.txt`, then run the
ingest script (see `../ingest/ingest.mjs`).

## What belongs here

- Published papers, review articles, or their abstracts (Tewari-program and
  guideline literature: AUA/ASTRO, NCCN, EAU, NCI PDQ).
- Approved Mount Sinai patient-education material and program pages.
- Plain-language summaries the clinical team has signed off on.

## What must NOT go here

- Any protected health information — no patient records, no case details,
  no identifiers, no unpublished cohort data.
- Anything the clinical / legal / brand teams have not approved for patient use.

## File format

Optional frontmatter, then plain text:

```
---
title: Clinically localized prostate cancer: AUA/ASTRO guideline, part II
url: https://pubmed.ncbi.nlm.nih.gov/35536134/
---
Active surveillance is the preferred management option for patients with
low-risk prostate cancer ...
```

No frontmatter is fine too — the filename becomes the title.

## Ingest

```bash
cd worker
WORKER_URL=https://compass-chat-proxy.<subdomain>.workers.dev \
INGEST_TOKEN=<your INGEST_TOKEN secret> \
node ingest/ingest.mjs
```

Re-running overwrites chunks for docs with the same filename (id). PDFs: convert
first, e.g. `pdftotext paper.pdf corpus/paper.txt`.
