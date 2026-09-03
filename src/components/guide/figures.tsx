import type { ReactNode } from "react";

/**
 * Figures are drawn from published data only. Every figure states its source
 * inline; nothing here is illustrative or invented.
 */
export function Figure({
  n,
  title,
  caption,
  source,
  sourceUrl,
  children,
}: {
  n: string;
  title: string;
  caption: string;
  source: string;
  sourceUrl?: string;
  children: ReactNode;
}) {
  return (
    <figure className="guide-figure">
      <figcaption className="head">
        <span className="n">Figure {n}</span>
        <strong>{title}</strong>
        <span className="cap">{caption}</span>
      </figcaption>
      <div className="plot">{children}</div>
      <figcaption className="src">
        Source:{" "}
        {sourceUrl ? (
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            {source}
          </a>
        ) : (
          source
        )}
      </figcaption>
    </figure>
  );
}

const WEEKS = [1, 2, 4, 6, 12, 24, 48];
const CONTINENCE = [21, 36, 83, 88, 91, 94, 95];

/** Continence recovery after the hood technique (Wagaskar, Eur Urol 2021, n=300). */
export function ContinenceCurve() {
  const w = 640;
  const h = 260;
  const pad = { l: 44, r: 16, t: 14, b: 34 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  // Log scale on weeks: the measurements cluster early, where recovery happens.
  const lx = (week: number) => Math.log(week);
  const x = (week: number) =>
    pad.l + ((lx(week) - lx(1)) / (lx(48) - lx(1))) * iw;
  const y = (pct: number) => pad.t + ih - (pct / 100) * ih;
  const line = WEEKS.map((week, i) => `${i ? "L" : "M"}${x(week)},${y(CONTINENCE[i])}`).join(" ");
  const area = `${line} L${x(48)},${y(0)} L${x(1)},${y(0)} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" className="guide-plot-svg"
      aria-label="Continence rates after the hood technique: 21% at 1 week, 36% at 2 weeks, 83% at 4 weeks, 88% at 6 weeks, 91% at 12 weeks, 94% at 24 weeks, 95% at 48 weeks.">
      {[0, 25, 50, 75, 100].map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={w - pad.r} y1={y(g)} y2={y(g)} className="grid" />
          <text x={pad.l - 8} y={y(g) + 4} className="axis" textAnchor="end">
            {g}%
          </text>
        </g>
      ))}
      <path d={area} className="area" />
      <path d={line} className="line" />
      {WEEKS.map((week, i) => (
        <g key={week}>
          <circle cx={x(week)} cy={y(CONTINENCE[i])} r={4.5} className="dot" />
          <text x={x(week)} y={y(CONTINENCE[i]) - 11} className="val" textAnchor="middle">
            {CONTINENCE[i]}%
          </text>
          <text x={x(week)} y={h - 12} className="axis" textAnchor="middle">
            {week}w
          </text>
        </g>
      ))}
    </svg>
  );
}

const PROTECT = [
  { label: "Died of prostate cancer", v: [3.1, 2.2, 2.9] },
  { label: "Metastasis", v: [9.4, 4.7, 5.0] },
  { label: "Local progression", v: [25.9, 10.5, 11.0] },
];
const ARMS = ["Active monitoring", "Surgery", "Radiotherapy"];

/** ProtecT 15-year outcomes by treatment arm (Hamdy, NEJM 2023). */
export function ProtectBars() {
  const w = 640;
  const h = 300;
  const pad = { l: 44, r: 12, t: 16, b: 64 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const max = 30;
  const groupW = iw / PROTECT.length;
  const barW = Math.min(34, (groupW - 26) / 3);
  const y = (v: number) => pad.t + ih - (v / max) * ih;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" className="guide-plot-svg"
      aria-label="ProtecT 15-year outcomes. Died of prostate cancer: active monitoring 3.1%, surgery 2.2%, radiotherapy 2.9%. Metastasis: 9.4%, 4.7%, 5.0%. Local progression: 25.9%, 10.5%, 11.0%.">
      {[0, 10, 20, 30].map((g) => (
        <g key={g}>
          <line x1={pad.l} x2={w - pad.r} y1={y(g)} y2={y(g)} className="grid" />
          <text x={pad.l - 8} y={y(g) + 4} className="axis" textAnchor="end">
            {g}%
          </text>
        </g>
      ))}
      {PROTECT.map((row, gi) => {
        const gx = pad.l + gi * groupW + (groupW - barW * 3 - 12) / 2;
        return (
          <g key={row.label}>
            {row.v.map((v, bi) => (
              <g key={bi}>
                <rect
                  x={gx + bi * (barW + 6)}
                  y={y(v)}
                  width={barW}
                  height={pad.t + ih - y(v)}
                  rx={3}
                  className={`bar s${bi}`}
                />
                <text
                  x={gx + bi * (barW + 6) + barW / 2}
                  y={y(v) - 6}
                  className="val"
                  textAnchor="middle"
                >
                  {v}
                </text>
              </g>
            ))}
            <text x={pad.l + gi * groupW + groupW / 2} y={h - 40} className="axis" textAnchor="middle">
              {row.label}
            </text>
          </g>
        );
      })}
      {ARMS.map((arm, i) => (
        <g key={arm} transform={`translate(${pad.l + i * 190}, ${h - 14})`}>
          <rect width={11} height={11} y={-9} rx={2} className={`bar s${i}`} />
          <text x={16} className="axis">
            {arm}
          </text>
        </g>
      ))}
    </svg>
  );
}

const NS_GRADES = [
  { g: "1", plane: "Intrafascial", detail: "Between the periprostatic veins and the prostate pseudocapsule — the closest plane, sparing the most nerve tissue.", risk: "Lowest predicted risk" },
  { g: "2", plane: "Interfascial", detail: "Along the perivenous plane, a step further from the prostate.", risk: "Low–intermediate" },
  { g: "3", plane: "Interfascial (outer)", detail: "Through the outer compartment of the lateral prostatic fascia.", risk: "Intermediate–high" },
  { g: "4", plane: "Extrafascial", detail: "A deliberately wide dissection that takes the fascia with the specimen.", risk: "Highest predicted risk" },
];

/** The four anatomical nerve-sparing planes (Tewari 2011; Martini 2019). */
export function NerveSparingDiagram() {
  const w = 640;
  const h = 250;
  const cx = 150;
  const cy = 125;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" className="guide-plot-svg"
      aria-label="Diagram of four nerve-sparing planes around the prostate, from intrafascial (grade 1, closest to the prostate) outward to extrafascial (grade 4).">
      {[4, 3, 2, 1].map((g, i) => {
        const r = 92 - i * 16;
        return (
          <g key={g}>
            <circle cx={cx} cy={cy} r={r} className={`ns ns${g}`} />
            <text x={cx} y={cy - r + 15} className="nslabel" textAnchor="middle">
              {g}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={30} className="gland" />
      <text x={cx} y={cy + 4} className="glandlabel" textAnchor="middle">
        prostate
      </text>
      {NS_GRADES.map((row, i) => (
        <g key={row.g} transform={`translate(280, ${34 + i * 52})`}>
          <text className="key-g">Grade {row.g}</text>
          <text y={16} className="key-p">
            {row.plane}
          </text>
          <text y={32} className="key-r">
            {row.risk}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Where prostate cancers are found, by stage at diagnosis (SEER). */
export function StageSplit() {
  const data = [
    { label: "Localized", v: 69 },
    { label: "Regional", v: 12 },
    { label: "Distant", v: 9 },
    { label: "Unstaged", v: 10 },
  ];
  const w = 640;
  const h = 74;
  const barH = 34;
  let x = 0;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" className="guide-plot-svg"
      aria-label="Stage at diagnosis: about 69% localized, with the remainder regional, distant, or unstaged.">
      {data.map((d, i) => {
        const width = (d.v / 100) * w;
        const el = (
          <g key={d.label}>
            <rect x={x} y={0} width={width - 2} height={barH} rx={4} className={`bar s${i}`} />
            <text x={x} y={barH + 18} className="axis">
              {d.label} {d.v}%
            </text>
          </g>
        );
        x += width;
        return el;
      })}
    </svg>
  );
}
