import type { GuideContent } from "../content";
import { Chapter } from "../primitives";

export function Basics({ c }: { c: GuideContent }) {
  const b = c.basics;
  return (
    <Chapter id="basics" eyebrow={b.eyebrow} title={b.title} intro={b.intro}>
      <div className="guide-grid-2">
        <figure className="guide-anatomy">
          {/* Schematic side (sagittal) view — not to scale. Flagged for
              clinical + medical-illustration review before publication. */}
          <svg
            viewBox="0 0 320 260"
            role="img"
            aria-label="Simplified side-view diagram: the bladder sits above the prostate; the prostate surrounds the top of the urethra; the seminal vesicles sit behind the bladder base and the rectum lies behind the prostate."
          >
            {/* rectum (behind) */}
            <path
              d="M232 40 q26 60 4 150 q-4 24 -22 28 q16 -70 4 -140 q-3 -40 14 -66 z"
              fill="var(--g-surface-2)"
              stroke="var(--g-muted)"
            />
            {/* bladder */}
            <path
              d="M96 96 q-14 -56 60 -60 q68 2 60 54 q-2 22 -20 30 l-80 2 q-16 -8 -20 -26 z"
              fill="var(--g-blue-tint)"
              stroke="var(--g-blue-bright)"
              strokeWidth="1.5"
            />
            {/* seminal vesicles */}
            <path d="M176 120 q34 -6 40 14 q-24 8 -40 -2 z" fill="var(--g-violet-tint)" stroke="var(--g-violet)" />
            {/* prostate — encircles the urethra */}
            <circle cx="132" cy="150" r="30" fill="var(--g-violet-tint)" stroke="var(--g-magenta)" strokeWidth="1.75" />
            {/* urethra through prostate and out */}
            <path
              d="M132 118 L132 150 Q132 176 120 200 L110 236"
              fill="none"
              stroke="var(--g-violet)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* pubic bone (front) */}
            <ellipse cx="70" cy="176" rx="12" ry="20" fill="var(--g-surface)" stroke="var(--g-muted)" />

            <line className="a-lead" x1="156" y1="70" x2="196" y2="58" />
            <text className="a-label" x="200" y="60">Bladder</text>
            <line className="a-lead" x1="150" y1="150" x2="196" y2="150" />
            <text className="a-label" x="200" y="153">Prostate</text>
            <line className="a-lead" x1="204" y1="128" x2="240" y2="120" />
            <text className="a-label" x="244" y="123">Seminal vesicles</text>
            <line className="a-lead" x1="238" y1="180" x2="270" y2="188" />
            <text className="a-label" x="252" y="204">Rectum</text>
            <line className="a-lead" x1="113" y1="224" x2="150" y2="232" />
            <text className="a-label" x="154" y="235">Urethra</text>
          </svg>
          <figcaption>{b.anatomyCaption}</figcaption>
        </figure>
        <div>
          <div className="guide-block">
            <h3>Why prostate treatment can affect daily life</h3>
            <p>{b.dailyLife}</p>
          </div>
          <div className="guide-block">
            <h3>Symptoms are not a reliable early warning</h3>
            <p>{b.symptoms}</p>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
