import { useState } from "react";
import { retrieve, type Retrieved } from "../../../data/care/corpus";
import { logMiss } from "../../../services/askLog";

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = question.trim();
    if (q.length < 3) return;
    const found = retrieve(q);
    setHits(found);
    setAsked(q);
    if (!found.length) logMiss(q);
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

      {hits !== null && hits.length === 0 && (
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
