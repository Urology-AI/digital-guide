import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { QUESTION_SETS } from "../../../data/care/demo";
import { ContentBlock, CopyButton } from "../components/ui";
import { byId } from "../../../data/care/content";
import { Button, Section } from "../design/primitives";

export function Questions() {
  const { lang } = useLang();
  const [active, setActive] = useState(QUESTION_SETS[0].id);
  const set = QUESTION_SETS.find((s) => s.id === active) ?? QUESTION_SETS[0];

  return (
    <Section level="h1" eyebrow="Take this with you" title={tc(lang, "questions.title")} lead={tc(lang, "questions.lead")}>
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
  const { lang } = useLang();
  const item = byId("caregiver-supporting");

  return (
    <Section
      level="h1"
      eyebrow="For family and caregivers"
      title="Supporting someone through prostate cancer"
      lead="Practical ways to help, without taking over."
    >
      {item && (
        <ContentBlock item={item} askTitle={tc(lang, "ask.title")} refsTitle={tc(lang, "refs.title")} />
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button tone="secondary" href="#/questions">
          Questions to take to an appointment →
        </Button>
        <Button tone="secondary" href="#/recovery">
          What recovery involves →
        </Button>
      </div>
    </Section>
  );
}
