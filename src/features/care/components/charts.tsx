import { DEMO_PSA_HISTORY } from "../../../data/care/demo";

/** Example PSA trend. Synthetic data — labelled as such wherever it appears. */
export function PsaTrend() {
  const w = 560;
  const h = 220;
  const pad = { l: 40, r: 16, t: 16, b: 34 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const max = 6;
  const x = (i: number) => pad.l + (i / (DEMO_PSA_HISTORY.length - 1)) * iw;
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const line = DEMO_PSA_HISTORY.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d.value)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" className="h-auto w-full min-w-[420px]"
      aria-label="Example PSA history: 2.1 in 2022, 2.8 in 2023, 3.4 in 2024, 4.1 in 2025. Example data, not a real patient.">
      {[0, 2, 4, 6].map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={w - pad.r} y1={y(g)} y2={y(g)} stroke="#e2e8f0" />
          <text x={pad.l - 8} y={y(g) + 4} textAnchor="end" className="fill-slate-400 text-[11px]">
            {g}
          </text>
        </g>
      ))}
      <line x1={pad.l} x2={w - pad.r} y1={y(4)} y2={y(4)} stroke="#DC298D" strokeDasharray="4 4" />
      <text x={w - pad.r} y={y(4) - 6} textAnchor="end" className="fill-[#DC298D] text-[11px] font-semibold">
        4.0 ng/mL — conventional threshold
      </text>
      <path d={line} fill="none" stroke="#00AEEF" strokeWidth={2.5} strokeLinejoin="round" />
      {DEMO_PSA_HISTORY.map((d, i) => (
        <g key={d.date}>
          <circle cx={x(i)} cy={y(d.value)} r={4.5} fill="#fff" stroke="#00AEEF" strokeWidth={2.5} />
          <text x={x(i)} y={y(d.value) - 12} textAnchor="middle" className="fill-slate-900 text-[11px] font-bold">
            {d.value}
          </text>
          <text x={x(i)} y={h - 12} textAnchor="middle" className="fill-slate-400 text-[11px]">
            {d.date}
          </text>
        </g>
      ))}
    </svg>
  );
}

const PIRADS = [
  { n: 1, label: "Very low", detail: "Clinically significant cancer is highly unlikely to be present." },
  { n: 2, label: "Low", detail: "Clinically significant cancer is unlikely to be present." },
  { n: 3, label: "Intermediate", detail: "The presence of clinically significant cancer is equivocal." },
  { n: 4, label: "High", detail: "Clinically significant cancer is likely to be present." },
  { n: 5, label: "Very high", detail: "Clinically significant cancer is highly likely to be present." },
];

export function PiradsScale() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {PIRADS.map((p) => (
        <li
          key={p.n}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-bold text-sinai-600">{p.n}</span>
            <span className="text-sm font-bold text-slate-900">{p.label}</span>
          </div>
          <div aria-hidden="true" className="mt-2 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`h-1.5 flex-1 rounded-full ${s <= p.n ? "bg-sinai-400" : "bg-slate-200"}`}
              />
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">{p.detail}</p>
        </li>
      ))}
    </ol>
  );
}

const PATHWAY = [
  "PSA and clinical assessment",
  "MRI when appropriate",
  "Biopsy when appropriate",
  "Pathology review",
  "Grade Group and Gleason score",
  "Clinical staging",
  "Treatment discussion",
];

export function DiagnosticPathway() {
  return (
    <ol className="space-y-2">
      {PATHWAY.map((step, i) => (
        <li key={step} className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sinai-violet font-mono text-xs font-bold text-white">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
