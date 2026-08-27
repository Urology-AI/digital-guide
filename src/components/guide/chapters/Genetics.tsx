import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable } from "../primitives";

export function Genetics({ c }: { c: GuideContent }) {
  const g = c.genetics;
  return (
    <Chapter id="genetics" alt eyebrow={g.eyebrow} title={g.title} intro={g.intro}>
      <div className="guide-block">
        <h3>{g.counselingWhenTitle}</h3>
        <ul>
          {g.counselingWhen.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <Expandable title={g.twoKindsTitle}>
        <p>{g.twoKindsBody}</p>
      </Expandable>
      <Expandable title={g.beforeAfterTitle}>
        <p>{g.beforeAfterBody}</p>
      </Expandable>
      <Callout data={g.familyAction} />
    </Chapter>
  );
}
