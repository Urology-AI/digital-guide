import type { GuideContent } from "../content";
import { Callout, Chapter } from "../primitives";

export function LivingWith({ c }: { c: GuideContent }) {
  const l = c.living;
  return (
    <Chapter id="living" eyebrow={l.eyebrow} title={l.title} intro={l.intro}>
      <div className="guide-quad">
        {l.basics.map((b) => (
          <div className="guide-quad-cell" key={b.label}>
            <h4>{b.label}</h4>
            <p>{b.a}</p>
          </div>
        ))}
      </div>
      <div className="guide-block">
        <h3>{l.emotionalTitle}</h3>
        <p>{l.emotionalBody}</p>
      </div>
      <Callout data={l.crisis} tone="warn" />
    </Chapter>
  );
}
