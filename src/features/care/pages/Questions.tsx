import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { QUESTION_SETS } from "../../../data/care/demo";
import { CopyButton, Section } from "../components/ui";

export function Questions() {
  const { lang } = useLang();
  const [active, setActive] = useState(QUESTION_SETS[0].id);
  const set = QUESTION_SETS.find((s) => s.id === active) ?? QUESTION_SETS[0];

  return (
    <Section eyebrow="Take this with you" title={tc(lang, "questions.title")} lead={tc(lang, "questions.lead")}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={tc(lang, "questions.title")}>
        {QUESTION_SETS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={active === s.id}
            onClick={() => setActive(s.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === s.id
                ? "border-sinai-400 bg-sinai-50 text-sinai-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {s.stage}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">{set.stage}</h3>
          <CopyButton
            text={`${set.stage}\n\n${set.questions.map((q) => `- ${q}`).join("\n")}`}
            label={tc(lang, "questions.copy")}
            done={tc(lang, "questions.copied")}
          />
        </div>
        <ul className="mt-5 space-y-3">
          {set.questions.map((q) => (
            <li key={q} className="flex gap-3 rounded-xl border border-slate-200 px-4 py-3.5">
              <span aria-hidden="true" className="font-bold text-sinai-magenta">?</span>
              <span className="text-[15px] leading-relaxed text-slate-800">{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Caregiver() {
  return (
    <Section
      eyebrow="For family and caregivers"
      title="Supporting someone through prostate cancer"
      lead="Practical ways to help, without taking over."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          {
            t: "Understand the care journey",
            d: "Read the same stages they are going through. Knowing what a Grade Group or a PI-RADS score means makes conversations at home much easier.",
          },
          {
            t: "Prepare for appointments",
            d: "Bring the question list, take notes, and write down what was said. Two sets of ears in a consultation is genuinely useful.",
          },
          {
            t: "Help track results",
            d: "Keep PSA values, dates, and reports together in one place, so a trend is visible rather than scattered across letters.",
          },
          {
            t: "Support recovery",
            d: "Recovery from treatment takes months, not days. Practical help — lifts to appointments, pelvic floor exercise reminders — often matters more than advice.",
          },
          {
            t: "Ask about support for you",
            d: "Caregiver support exists and is worth asking about. Supporting someone through cancer is demanding.",
          },
          {
            t: "Let them lead",
            d: "Treatment decisions belong to the person being treated. Helping them get information and ask questions is more useful than steering the choice.",
          },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900">{c.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a
          href="#/questions"
          className="inline-block rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sinai-400 hover:text-sinai-600"
        >
          Questions caregivers may want to ask →
        </a>
      </div>
    </Section>
  );
}
