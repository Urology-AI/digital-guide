import type { GuideContent } from "../content";
import { Chapter } from "../primitives";

export function Basics({ c }: { c: GuideContent }) {
  const b = c.basics;
  return (
    <Chapter id="basics" eyebrow={b.eyebrow} title={b.title} intro={b.intro}>
      <div className="guide-grid-2">
        <figure className="guide-anatomy">
          <svg viewBox="0 0 240 200" role="img" aria-label="Simplified diagram: the bladder sits above the prostate, which surrounds the urethra">
            <ellipse cx="120" cy="60" rx="60" ry="38" fill="var(--g-blue-tint)" stroke="var(--g-blue-bright)" />
            <text x="120" y="64" textAnchor="middle" fontSize="12" fill="var(--g-ink)">Bladder</text>
            <ellipse cx="120" cy="120" rx="34" ry="24" fill="var(--g-violet-tint)" stroke="var(--g-magenta)" />
            <text x="120" y="124" textAnchor="middle" fontSize="11" fill="var(--g-ink)">Prostate</text>
            <rect x="113" y="96" width="14" height="86" rx="7" fill="var(--g-surface)" stroke="var(--g-violet)" />
            <text x="120" y="196" textAnchor="middle" fontSize="10" fill="var(--g-muted)">urethra</text>
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
