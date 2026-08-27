import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable } from "../primitives";

export function Start({ c }: { c: GuideContent }) {
  const s = c.start;
  return (
    <Chapter id="start" eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
      <Callout data={s.firstStep} />
      <Expandable title="How to use this guide" open>
        <ul>
          {s.howToUse.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </Expandable>
      <Expandable title="What this guide can — and cannot — do">
        <p>{s.canCannot}</p>
        <p style={{ fontSize: ".85rem", color: "var(--g-muted)", marginBottom: 0 }}>
          {s.languageNote}
        </p>
      </Expandable>
    </Chapter>
  );
}
