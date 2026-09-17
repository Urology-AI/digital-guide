# Tewari Prostate Care — showcase pack

Everything here is reproducible from the deployed application. No staged
functionality, no fabricated metrics, no fake integrations.

---

## What this product is

A patient-facing education and navigation companion from the Milton and Carroll
Petrie Department of Urology. It helps a patient:

1. Understand an unfamiliar term from a report
2. Ask a question in their own words
3. Browse reliable education by stage of care
4. Prepare questions for their care team
5. Recognise when to contact the department or seek urgent help
6. Reach the department's own tools
7. See where every statement comes from

It does **not** diagnose, interpret an individual's results, recommend or rank
treatments, or advise on medication.

---

## Three-to-five minute demo script

### 0:00 — Opening (20s)
Open the home page. Two actions, deliberately separate:

> "A patient arrives with either a report in their hand, or a question in their
> head. The product does not guess which — it offers both."

### 0:20 — DEMO 1 · Report understanding (45s)
Type `PI-RADS 4` in **Look up a term**.

Show: the term resolves instantly to the explanation, questions to ask, and
sources.

> "This path is deterministic. It is a lookup table, not a model — it cannot
> improvise, and it returns the same answer every time."

### 1:05 — DEMO 2 · Natural language (60s)
Open **Urology Copilot**. Ask: *"Will I be incontinent after surgery?"*

Show: passages returned **verbatim** from approved content, each with its
citation, plus related topics, questions to ask, and feedback controls.

> "Nothing here is generated. These are passages from the approved guide, shown
> as written, with their sources. The patient's own words are matched to the
> clinical vocabulary — 'incontinent' never appears in our content; 'urinary
> leakage' does."

### 2:05 — DEMO 3 · The safe limit (60s)
Ask: *"Should I choose surgery or radiation?"* then *"Do I have cancer?"*

Show: both decline, explain why, and hand off to the care team.

> "This is the feature, not a failure. A product that answers these questions is
> a liability. Every question of this class is caught before retrieval runs."

Optionally add *"Can I cycle after a biopsy?"*:

> "Our content mentions cycling — because cycling can raise PSA. A keyword
> search would return that passage and look like an answer about recovery. It
> abstains instead, and points to the discharge instructions that actually
> govern this."

### 3:05 — DEMO 4 · Urgent safety (40s)
Ask: *"I have a fever and chills after my biopsy."*

Show: urgent guidance in red, **above** any educational content.

> "Escalation always precedes education. The patient sees the instruction to
> seek care before they see anything to read."

### 3:45 — DEMO 5 · Depth (45s)
Open **Full clinical guide** from the footer or home.

Show: the same visual language, a published figure (continence recovery, or the
four nerve-sparing planes), a citation, and the department's own decision
algorithm. Return via the bar at the top.

> "Underneath the patient layer is the referenced clinical guide — the
> department's published technique, trial data, and the literature behind it."

### 4:30 — Close (20s)
> "Deterministic where it can be, retrieval where it must be, and silent where
> it should be. Every clinical sentence traces to a source, and the tests fail
> the build if one does not."

---

## Screenshot checklist

- [ ] Home — two primary actions
- [ ] Term lookup typeahead mid-query (`PI-RADS`)
- [ ] Topic page — explanation, questions, sources
- [ ] Copilot — starters (initial state)
- [ ] Copilot — answer with citations, related topics, feedback
- [ ] Copilot — gated question ("Do I have cancer?")
- [ ] Copilot — urgent escalation (fever after biopsy)
- [ ] Clinical guide — a figure with its source line
- [ ] Mobile — home and Copilot at 375px

---

## Known limitations (state these; do not let them be discovered)

| Limitation | Status |
|---|---|
| Spanish and Hindi cover interface labels only; clinical content is English | Labelled in the UI |
| My Journey is a prototype with synthetic data; no EMR connection | Labelled on the page |
| Retrieval is lexical with a vocabulary map, not embeddings | Abstains rather than guessing |
| No approved post-procedure activity content | Copilot abstains and points to discharge instructions |
| Official Mount Sinai logo not present | Component loads it from `public/mount-sinai-logo.svg` when supplied |
| Miss logging is per-device (localStorage) | No backend; nothing leaves the browser |

---

## Department-dependent items

- [ ] Official logo asset → `public/mount-sinai-logo.svg`
- [ ] Verify phone numbers (844-MD-CANCER, 212-241-9955)
- [ ] Verify faculty names, titles and roster
- [ ] Approve post-biopsy / post-surgery activity guidance (currently a
      deliberate abstention)
- [ ] Approve red-flag symptom list and wording
- [ ] Confirm which department tools should be linked and how they are described

## Clinical review checklist

- [ ] Every content item reviewed for accuracy and currency
- [ ] Citations checked against the current edition of each guideline
- [ ] Escalation rules confirmed by a clinician (no invented thresholds)
- [ ] Gate wording reviewed — what the product declines, and how it says it
- [ ] Reading level and plain-language review
- [ ] Confirm nothing reads as a recommendation for an individual

## Privacy and security checklist

- [ ] Confirm no PHI is collected — today nothing leaves the browser
- [ ] Approve any future server-side logging of questions before enabling it
- [ ] Review localStorage use (reading position, miss log, feedback outcome)
- [ ] Confirm third-party analytics policy — none is installed
- [ ] Review the chat proxy's data handling if the worker is enabled

## Deployment checklist

- [ ] `npm ci && npx tsc --noEmit && npm test && npm run build -- --base="/digital-guide/"`
- [ ] CI green on the pull request
- [ ] Branch protection requires the CI check (repo admin)
- [ ] Logo asset in place
- [ ] Verified contact details
