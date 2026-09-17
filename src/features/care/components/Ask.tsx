import { useState } from "react";
import { retrieve, type Retrieved } from "../../../data/care/corpus";
import { CONTENT } from "../../../data/care/content";
import { logMiss } from "../../../services/askLog";
import { checkRedFlags } from "../../../data/care/redFlags";
import { gateQuestion, type Gate } from "../../../data/care/intentGate";
import { Alert, Button, Surface } from "../design/primitives";

/**
 * Urology Copilot — retrieval-only question answering.
 *
 * Passages are returned verbatim from approved content, so this cannot state
 * something the clinical content does not. Three checks run in order before
 * any answer is shown: urgent symptoms, then questions the product must not
 * answer, then retrieval — which itself abstains rather than offering a weak
 * match.
 *
 * It is query-by-query. There is no conversation memory, and the interface
 * must not imply otherwise.
 */

/**
 * Starters, so the page is never a blank "ask me anything" box — an empty
 * prompt invites the questions this must not answer. Every one is covered by
 * the content; a test asserts each retrieves.
 */
const SUGGESTIONS = [
  "What does PI-RADS 4 mean?",
  "What is active surveillance?",
  "What happens after a biopsy?",
  "Will I be incontinent after surgery?",
  "Why do I need another PSA if I already had an MRI?",
  "How long does hormone therapy last?",
];

type Feedback = "helped" | "partly" | "missed";

export function Ask() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [hits, setHits] = useState<Retrieved[] | null>(null);
  const [urgent, setUrgent] = useState<string | null>(null);
  const [gate, setGate] = useState<Gate | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const ask = (raw: string) => {
    const q = raw.trim();
    if (q.length < 3) return;
    setQuestion(q);
    setAsked(q);
    setFeedback(null);

    const red = checkRedFlags(q);
    setUrgent(red);

    const blocked = gateQuestion(q);
    setGate(blocked);
    if (blocked) {
      setHits([]);
      logMiss(q);
      return;
    }

    const found = retrieve(q);
    setHits(found);
    if (!found.length) logMiss(q);
  };

  const contact = (
    <p className="mt-3 text-[var(--t-small)] text-[var(--c-ink-soft)]">
      Mount Sinai cancer appointments <strong>844-MD-CANCER</strong> · Urology{" "}
      <strong>212-241-9955</strong>
    </p>
  );

  return (
    <div>
      <Surface className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[var(--t-h2)] font-bold text-[var(--c-ink)]">Urology Copilot</h2>
          <span className="rounded-[var(--r-pill)] bg-[var(--c-surface-sunken)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--c-muted)]">
            Answers from the approved guide
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-[var(--t-small)] leading-relaxed text-[var(--c-ink-soft)]">
          Ask in your own words. Answers are passages from this guide shown exactly as written, with their sources —
          nothing is generated. It cannot interpret your results or recommend a treatment, and it will say so when
          the guide does not cover something.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(question);
          }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <label className="sr-only" htmlFor="ask-input">
            Your question
          </label>
          <input
            id="ask-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What happens after a biopsy?"
            className="min-w-0 flex-1 rounded-[var(--r-md)] border border-[var(--c-line-strong)] px-4 py-3 text-[var(--t-small)] text-[var(--c-ink)] placeholder:text-[var(--c-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--c-blue-deep)]"
          />
          <Button type="submit">Ask</Button>
        </form>

        {hits === null && (
          <div className="mt-6">
            <p className="text-[var(--t-fine)] font-semibold uppercase tracking-wide text-[var(--c-muted)]">
              Things people ask
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => ask(s)}
                    className="rounded-[var(--r-pill)] border border-[var(--c-line)] bg-white px-4 py-2 text-[var(--t-small)] text-[var(--c-ink-soft)] transition hover:border-[var(--c-blue)] hover:text-[var(--c-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-blue-deep)] motion-reduce:transition-none"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Surface>

      {/* Urgent guidance always precedes educational content. */}
      {urgent && (
        <div className="mt-4">
          <Alert tone="urgent" heading="This may need medical attention now">
            <p>{urgent}</p>
          </Alert>
        </div>
      )}

      {gate && (
        <div className="mt-4">
          <Alert tone="info" heading={gate.heading}>
            <p>{gate.message}</p>
            {contact}
          </Alert>
        </div>
      )}

      {!gate && hits !== null && hits.length > 0 && (
        <div className="mt-4 space-y-4" aria-live="polite">
          <p className="text-[var(--t-fine)] font-semibold uppercase tracking-wide text-[var(--c-muted)]">
            From the approved guide · “{asked}”
          </p>

          {hits.map(({ passage }) => (
            <Surface as="article" key={passage.id} className="p-6">
              <h3 className="text-[var(--t-h3)] font-bold text-[var(--c-ink)]">
                {passage.title}
                {passage.heading ? <span className="text-[var(--c-muted)]"> · {passage.heading}</span> : null}
              </h3>
              <p className="mt-3 text-[var(--t-body)] leading-[var(--lh-body)] text-[var(--c-ink)]">{passage.text}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--c-line)] pt-3">
                <a
                  className="text-[var(--t-fine)] font-semibold text-[var(--c-accent-ink)] hover:underline"
                  href={`#/t/${passage.contentId}`}
                >
                  Read the full explanation →
                </a>
                {passage.references.slice(0, 2).map((r) => (
                  <a
                    key={r.id}
                    className="text-[var(--t-fine)] text-[var(--c-muted)] underline underline-offset-2 hover:text-[var(--c-accent-ink)]"
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {r.cite.split(".")[0]}
                  </a>
                ))}
              </div>
            </Surface>
          ))}

          {(() => {
            const shown = new Set(hits.map((h) => h.passage.contentId));
            const primary = CONTENT.find((c) => c.id === hits[0].passage.contentId);
            const related = CONTENT.filter((c) => c.category === primary?.category && !shown.has(c.id)).slice(0, 4);
            if (!related.length) return null;
            return (
              <Surface tone="sunken" className="p-5">
                <h3 className="text-[var(--t-fine)] font-bold uppercase tracking-wide text-[var(--c-ink)]">
                  Related topics
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <a
                        className="inline-block rounded-[var(--r-pill)] border border-[var(--c-line)] bg-white px-3 py-1.5 text-[var(--t-fine)] text-[var(--c-ink-soft)] hover:border-[var(--c-blue)] hover:text-[var(--c-accent-ink)]"
                        href={`#/t/${r.id}`}
                      >
                        {r.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Surface>
            );
          })()}

          {hits[0].passage.questions.length > 0 && (
            <Surface tone="accent" className="p-5">
              <h3 className="text-[var(--t-fine)] font-bold uppercase tracking-wide text-[var(--c-ink)]">
                Questions to ask your care team
              </h3>
              <ul className="mt-3 space-y-2">
                {hits[0].passage.questions.map((q) => (
                  <li key={q} className="text-[var(--t-small)] leading-relaxed text-[var(--c-ink)]">
                    {q}
                  </li>
                ))}
              </ul>
            </Surface>
          )}

          <Surface tone="sunken" className="flex flex-wrap items-center gap-3 p-4">
            <span className="text-[var(--t-fine)] font-semibold text-[var(--c-ink-soft)]">Was this helpful?</span>
            {(
              [
                ["helped", "Yes, this helped"],
                ["partly", "Partly"],
                ["missed", "I didn't find what I needed"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={feedback === value}
                onClick={() => {
                  setFeedback(value);
                  // Only the outcome is recorded, never the question text.
                  if (value !== "helped") logMiss(`[${value}]`);
                }}
                className={`rounded-[var(--r-pill)] border px-3 py-1.5 text-[var(--t-fine)] transition ${
                  feedback === value
                    ? "border-[var(--c-blue-deep)] bg-white text-[var(--c-accent-ink)] font-semibold"
                    : "border-[var(--c-line)] bg-white text-[var(--c-ink-soft)] hover:border-[var(--c-blue)]"
                }`}
              >
                {label}
              </button>
            ))}
            {feedback && (
              <span className="text-[var(--t-fine)] text-[var(--c-muted)]" role="status">
                Thank you — noted for the team reviewing this guide.
              </span>
            )}
          </Surface>
        </div>
      )}

      {!gate && hits !== null && hits.length === 0 && (
        <div className="mt-4">
          <Alert tone="caution" heading="The approved guide doesn't cover this">
            <p>
              Nothing in this guide answers “{asked}”. Rather than show you something that only looks related, it is
              better to ask your care team.
            </p>
            {contact}
            <p className="mt-3 text-[var(--t-fine)] text-[var(--c-muted)]">
              You can also browse care stages from the menu, or look up a term from your report.
            </p>
          </Alert>
        </div>
      )}
    </div>
  );
}
