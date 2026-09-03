/**
 * Hand-off to one of the department's patient-facing apps.
 *
 * These tools are the reviewed surface for anything interactive — they carry
 * their own consent framing, disclaimers, and record-keeping. The guide
 * explains and hands over at the right moment rather than re-implementing them.
 */
export interface ToolLinkData {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  note?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export const EPSA_TOOL: ToolLinkData = {
  eyebrow: "Check your risk",
  title: "ePSA — screening risk tool",
  body: "ePSA is the department's educational screening tool. It asks about your history, symptoms, and — if you have them — your PSA and MRI results, then describes whether a PSA conversation is worth having and what kind. Because it asks the full questionnaire, it gives a far more meaningful answer than a short checklist can.",
  cta: "Open ePSA",
  href: "https://epsa.millionstrongmen.com/",
  note: "Educational tool. It does not diagnose prostate cancer.",
};

export const AS_TOOL: ToolLinkData = {
  eyebrow: "If you are considering active surveillance",
  title: "Tewari Active Surveillance Program",
  body: "The department's surveillance pathway, written for patients: what monitoring involves, the schedule of PSA tests, imaging and biopsies, and what findings would prompt a change of plan.",
  cta: "Open the patient version",
  href: "https://as.millionstrongmen.com/patient/",
  secondaryCta: "Clinician pathway tool",
  secondaryHref: "https://as.millionstrongmen.com/",
  note: "The clinician version is the step-by-step tool your team uses to work through the same protocol.",
};

export const COMPASS_TOOL: ToolLinkData = {
  eyebrow: "If you are weighing surgery",
  title: "COMPASS — surgical planning model",
  body: "For patients considering robot-assisted radical prostatectomy. COMPASS combines clinical data with MRI, micro-ultrasound, and PSMA PET to estimate pathology, recurrence risk, side-specific nerve-sparing, and functional recovery on a 3D model of the prostate.",
  cta: "Open COMPASS",
  href: "https://urology-ai.github.io/digital-twin/",
  note: "Research use only, not FDA cleared. Decision support for your surgical team — bring the results to your consultation.",
};

export function ToolLink({ data }: { data: ToolLinkData }) {
  return (
    <aside className="rounded-2xl border border-slate-200 border-l-4 border-l-sinai-400 bg-gradient-to-br from-sinai-50/70 to-white p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sinai-magenta">{data.eyebrow}</p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{data.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          className="rounded-xl bg-sinai-400 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-sinai-500"
          href={data.href}
          target="_blank"
          rel="noreferrer"
        >
          {data.cta} →
        </a>
        {data.secondaryHref && (
          <a
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-sinai-400 hover:text-sinai-600"
            href={data.secondaryHref}
            target="_blank"
            rel="noreferrer"
          >
            {data.secondaryCta} →
          </a>
        )}
      </div>
      {data.note && <p className="mt-3 text-xs leading-relaxed text-slate-500">{data.note}</p>}
    </aside>
  );
}
