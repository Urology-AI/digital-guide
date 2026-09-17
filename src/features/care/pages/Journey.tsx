import { useLang } from "../../../i18n/LanguageContext";
import { tc } from "../../../i18n/care";
import {
  DEMO_JOURNEY,
  DEMO_LABEL,
  DEMO_RESULTS,
  DEMO_SURVEILLANCE,
} from "../../../data/care/demo";
import { DemoBadge, Disclaimer, Section } from "../components/ui";
import { PsaTrend } from "../components/charts";
import { AS_TOOL, ToolLink } from "../components/ToolLink";

const STATE_STYLE = {
  done: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  upcoming: "bg-slate-100 text-slate-500 ring-slate-200",
} as const;

const STATE_LABEL = { done: "Completed", pending: "In progress", upcoming: "Upcoming" } as const;

function StatePill({ state }: { state: keyof typeof STATE_STYLE }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${STATE_STYLE[state]}`}>
      {STATE_LABEL[state]}
    </span>
  );
}

/** Prototype dashboard. Everything on this page is synthetic demo data. */
export function Journey() {
  const { lang } = useLang();
  const done = DEMO_JOURNEY.filter((s) => s.state === "done").length;
  const pct = Math.round((done / DEMO_JOURNEY.length) * 100);

  return (
    <Section
      eyebrow="Prototype"
      title="My prostate care"
      lead="A preview of how a personal care dashboard could work. It is populated with example data only — no real results are shown or stored."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <DemoBadge label={tc(lang, "demo.badge")} />
        <span className="text-sm text-slate-500">{DEMO_LABEL}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">My care journey</h3>
          <span className="text-sm text-slate-500">
            {done} of {DEMO_JOURNEY.length} stages marked complete
          </span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-sinai-400"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Example journey progress"
          />
        </div>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_JOURNEY.map((s) => (
            <li
              key={s.stage}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3"
            >
              <span className="text-sm font-medium text-slate-800">{s.stage}</span>
              <StatePill state={s.state} />
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEMO_RESULTS.map((r) => (
          <div key={r.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{r.label}</span>
            <p className="mt-2 text-xl font-bold text-slate-900">{r.value}</p>
            <p className="mt-1 text-xs text-slate-500">{r.meta}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Example PSA history</h3>
          <DemoBadge label={tc(lang, "demo.badge")} />
        </div>
        <div className="mt-5 overflow-x-auto">
          <PsaTrend />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900">Active surveillance journey</h3>
        <p className="mt-2 text-sm text-slate-600">
          Surveillance repeats the same small set of checks on a schedule, so that a change is picked up while every
          option is still open.
        </p>
        <ol className="mt-5 space-y-2">
          {DEMO_SURVEILLANCE.map((s) => (
            <li
              key={s.item}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3"
            >
              <span>
                <span className="text-sm font-semibold text-slate-900">{s.item}</span>
                <span className="ml-2 text-xs text-slate-500">{s.detail}</span>
              </span>
              <StatePill state={s.state} />
            </li>
          ))}
        </ol>
        <div className="mt-5">
          <ToolLink data={AS_TOOL} />
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer text={`${DEMO_LABEL}. ${tc(lang, "disclaimer")}`} />
      </div>
    </Section>
  );
}
