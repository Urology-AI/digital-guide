import { useState } from "react";
import { retrieve, type Retrieved } from "../../../data/care/corpus";
import { CONTENT } from "../../../data/care/content";
import { logMiss } from "../../../services/askLog";
import { checkRedFlags } from "../../../data/care/redFlags";
import { gateQuestion, type Gate } from "../../../data/care/intentGate";

/**
 * Starters, so the page is never a blank "ask me anything" box. An empty
 * prompt invites the questions this must not answer ("do I have cancer?",
 * "should I cancel my surgery?"); showing what it can answer sets the scope.
 * Each is covered by the content — a test asserts every one retrieves.
 */
const SUGGESTIONS = [
  "What does active surveillance mean?",
  "What happens after a biopsy?",
  "Will I be incontinent after surgery?",
  "Why do I need another PSA if I already had an MRI?",
  "What can raise my PSA apart from cancer?",
  "How long does hormone therapy last?",
];

/**
 * Retrieval-only question answering.
 *
 * Passages are returned verbatim from the approved content — nothing is
 * generated, paraphrased, or summarized, so this cannot state something the
 * clinical content does not. When retrieval finds nothing, it says so and
 * points to the care team rather than improvising.
 */
export function Ask() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [hits, setHits] = useState<Retrieved[] | null>(null);
  const [urgent, setUrgent] = useState<string | null>(null);
  const [gate, setGate] = useState<Gate | null>(null);

  const ask = (raw: string) => {
    const q = raw.trim();
    if (q.length < 3) return;
    setQuestion(q);
    setAsked(q);
    // Order matters: urgent symptoms first, then questions this product must
    // not answer, and only then retrieval.
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(question);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Urology Copilot</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Ask in your own words. Answers are passages from this guide, shown exactly as written and with their
        sources — nothing is generated. If the guide does not cover your question, it will say so.
      </p>

      <form onSubmit={submit} className="mt-5 flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="ask-input">
          Your question
        </label>
        <input
          id="ask-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Can I ride my bike after a biopsy?"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-sinai-400 px-6 py-3 text-sm font-bold text-white transition hover:bg-sinai-500"
        >
          Ask
        </button>
      </form>

      {hits === null && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Things people ask</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s2) => (
              <li key={s2}>
                <button
                  type="button"
                  onClick={() => ask(s2)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-sinai-400 hover:text-sinai-600"
                >
                  {s2}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {urgent && (
        <div className="mt-6 rounded-xl border-l-4 border-red-400 bg-red-50 p-5" role="alert">
          <h3 className="text-sm font-bold text-slate-900">This may need medical attention now</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{urgent}</p>
        </div>
      )}

      {hits !== null && hits.length > 0 && (
        <div className="mt-7 space-y-4" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            From the guide, on “{asked}”
          </p>
          {hits.map(({ passage }) => (
            <article key={passage.id} className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900">
                {passage.title}
                {passage.heading ? ` · ${passage.heading}` : ""}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{passage.text}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                <a className="text-xs font-semibold text-sinai-600 hover:underline" href={`#/t/${passage.contentId}`}>
                  Read the full explanation →
                </a>
                {passage.references.slice(0, 2).map((r) => (
                  <a
                    key={r.id}
                    className="text-xs text-slate-500 underline underline-offset-2 hover:text-sinai-600"
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {r.cite.split(".")[0]}
                  </a>
                ))}
              </div>
            </article>
          ))}
          {(() => {
            const shown = new Set(hits.map((h) => h.passage.contentId));
            const primary = CONTENT.find((c) => c.id === hits[0].passage.contentId);
            const related = CONTENT.filter(
              (c) => c.category === primary?.category && !shown.has(c.id)
            ).slice(0, 4);
            if (!related.length) return null;
            return (
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900">Related topics</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <a
                        className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:border-sinai-400 hover:text-sinai-600"
                        href={`#/t/${r.id}`}
                      >
                        {r.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}

          {hits[0].passage.questions.length > 0 && (
            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="text-sm font-bold text-slate-900">Worth asking your care team</h3>
              <ul className="mt-2 space-y-1.5">
                {hits[0].passage.questions.map((q) => (
                  <li key={q} className="text-sm text-slate-700">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {gate && (
        <div className="mt-7 rounded-xl border-l-4 border-sinai-400 bg-sinai-50/70 p-5" aria-live="polite">
          <h3 className="text-sm font-bold text-slate-900">{gate.heading}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{gate.message}</p>
          <p className="mt-3 text-sm text-slate-600">
            Mount Sinai cancer appointments 844-MD-CANCER · Urology 212-241-9955
          </p>
        </div>
      )}

      {!gate && hits !== null && hits.length === 0 && (
        <div className="mt-7 rounded-xl border-l-4 border-amber-300 bg-amber-50 p-5" aria-live="polite">
          <h3 className="text-sm font-bold text-slate-900">
            I couldn't find this in the approved content
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            This guide does not cover “{asked}”. Rather than guess, it is better to ask your care team — Mount Sinai
            cancer appointments 844-MD-CANCER, Urology 212-241-9955. You can also browse the stages from the menu, or
            search a term from your report.
          </p>
        </div>
      )}
    </div>
  );
}
