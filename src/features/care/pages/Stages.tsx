import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import { DEMO_LABEL, RISK_FACTORS } from "../../../data/care/demo";
import { REFS } from "../../../data/care/references";
import { DemoBadge, Disclaimer, References } from "../components/ui";
import { DiagnosticPathway, PiradsScale, PsaTrend } from "../components/charts";
import { EpsaCheck } from "../components/EpsaCheck";
import { Topic } from "./Topic";

export function Health() {
  return (
    <Topic
      stage="health"
      eyebrow="01 · Understand"
      title="Prostate health"
      lead="What the prostate is, what it does, and the conditions that commonly affect it — in plain language."
    />
  );
}

/** An educational checklist, deliberately not a risk score. */
export function Risk() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const count = Object.values(checked).filter(Boolean).length;

  return (
    <Topic
      stage="risk"
      eyebrow="02 · Assess your risk"
      title="Risk factors worth discussing"
      lead="This is a checklist to take to an appointment, not a risk calculation. It does not produce a score or estimate your chance of having prostate cancer."
      before={
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">Which of these apply to you?</h3>
          <p className="mt-1 text-sm text-slate-600">
            Tick anything that applies. Nothing is sent anywhere — this stays in your browser.
          </p>
          <ul className="mt-5 space-y-2">
            {RISK_FACTORS.map((f) => (
              <li key={f.id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3.5 transition hover:border-sinai-400">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-sinai-400"
                    checked={Boolean(checked[f.id])}
                    onChange={() => setChecked((c) => ({ ...c, [f.id]: !c[f.id] }))}
                  />
                  <span className="text-sm text-slate-800">{f.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl border-l-2 border-sinai-400 bg-sinai-50/60 px-4 py-3 text-sm text-slate-700">
            {count > 0
              ? `You ticked ${count} ${count === 1 ? "factor" : "factors"}. Discuss these with your healthcare professional — they are things that may shape when and how screening is considered, not a diagnosis.`
              : "Discuss any factors that apply with your healthcare professional. Risk factors influence when screening may be considered; they do not diagnose anything."}
          </p>
        </div>
      }
      after={
        <div className="mt-6">
          <EpsaCheck />
        </div>
      }
    />
  );
}

export function Psa() {
  const { lang } = useLang();
  return (
    <Topic
      stage="psa"
      eyebrow="03 · Screening"
      title="PSA testing"
      lead="What PSA measures, what can move it, and what may happen after an elevated result."
      after={
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">What a PSA history can look like</h3>
            <DemoBadge label={tc(lang, "demo.badge")} />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {DEMO_LABEL}. It shows why the trend over time is often more informative than any single value.
          </p>
          <div className="mt-5 overflow-x-auto">
            <PsaTrend />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            A rising trend prompts a conversation, not a conclusion. Crossing 4.0 ng/mL does not mean cancer is
            present, and staying below it does not rule cancer out.
          </p>
          <References title={tc(lang, "refs.title")} items={[REFS.nciPsa, REFS.uspstf, REFS.acs]} />
        </div>
      }
    />
  );
}

export function Imaging() {
  const { lang } = useLang();
  return (
    <Topic
      stage="imaging"
      eyebrow="04 · Imaging"
      title="Prostate MRI and PI-RADS"
      lead="Why an MRI may be done before a biopsy, and how radiologists describe what they see."
      after={
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">The PI-RADS scale</h3>
          <p className="mt-2 text-sm text-slate-600">
            PI-RADS describes how likely it is that an area seen on MRI represents clinically significant prostate
            cancer.
          </p>
          <div className="mt-5">
            <PiradsScale />
          </div>
          <p className="mt-4 rounded-xl border-l-2 border-sinai-400 bg-sinai-50/60 px-4 py-3 text-sm text-slate-700">
            PI-RADS is one component of clinical assessment and does not by itself establish a cancer diagnosis.
          </p>
          <References title={tc(lang, "refs.title")} items={[REFS.pirads, REFS.nccn]} />
        </div>
      }
    />
  );
}

export function Diagnosis() {
  const { lang } = useLang();
  return (
    <Topic
      stage="diagnosis"
      eyebrow="05 · Diagnosis"
      title="Biopsy and diagnosis"
      lead="How a diagnosis is established, and how to read the report that results."
      before={
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900">The usual diagnostic pathway</h3>
          <p className="mt-2 text-sm text-slate-600">
            Each step informs the next. Not everyone goes through every step.
          </p>
          <div className="mt-5">
            <DiagnosticPathway />
          </div>
          <References title={tc(lang, "refs.title")} items={[REFS.nccn, REFS.aua]} />
        </div>
      }
    />
  );
}

export function Treatment() {
  const { lang } = useLang();
  return (
    <Topic
      stage="treatment"
      eyebrow="06 · Treatment"
      title="Treatment approaches"
      lead="The approaches a care team may discuss for localized prostate cancer. Which apply depends on your own cancer, health, and priorities — this page does not recommend one."
      after={
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sinai-400 hover:shadow-lg"
            href="https://as.millionstrongmen.com/patient/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-sinai-magenta">
              If you are considering surveillance
            </span>
            <h3 className="mt-2 text-base font-bold text-slate-900">Tewari Active Surveillance Program</h3>
            <p className="mt-2 text-sm text-slate-600">
              The department's surveillance pathway, explained for patients — what monitoring involves and what may
              change the plan.
            </p>
            <span className="mt-3 block text-sm font-semibold text-sinai-600">Open the patient version →</span>
          </a>
          <a
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sinai-400 hover:shadow-lg"
            href="#/guide"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-sinai-magenta">Go deeper</span>
            <h3 className="mt-2 text-base font-bold text-slate-900">Full clinical guide</h3>
            <p className="mt-2 text-sm text-slate-600">
              Side-by-side comparison, 15-year trial outcomes, the department's surgical decision pathway, and the
              published literature behind it.
            </p>
            <span className="mt-3 block text-sm font-semibold text-sinai-600">{tc(lang, "deepdive.cta")} →</span>
          </a>
        </div>
      }
    />
  );
}

export function Recovery() {
  return (
    <Topic
      stage="recovery"
      eyebrow="07 · Recovery"
      title="Recovery and function"
      lead="What recovery may involve after treatment, including urinary control and sexual function."
      after={
        <div className="mt-8">
          <Disclaimer text="Recovery varies widely between people. Nothing here predicts an individual outcome — ask your own care team what is realistic given your baseline function and treatment." />
        </div>
      }
    />
  );
}

export function Monitoring() {
  const { lang } = useLang();
  return (
    <Topic
      stage="monitoring"
      eyebrow="08 · Monitoring"
      title="Follow-up and active surveillance"
      lead="How PSA is followed after treatment, and what being on active surveillance involves."
      after={
        <div className="mt-8">
          <Disclaimer text={tc(lang, "disclaimer")} />
        </div>
      }
    />
  );
}
