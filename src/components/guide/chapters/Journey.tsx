import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable } from "../primitives";

export function Journey({ c }: { c: GuideContent }) {
  const j = c.journey;
  return (
    <Chapter id="journey" alt eyebrow={j.eyebrow} title={j.title}>
      <ol className="guide-journey" aria-label="Six steps from diagnosis to follow-up">
        {j.steps.map((step, i) => (
          <li key={step.n} className="guide-journey-step">
            <span className="dot">{step.n}</span>
            <span className="label">{step.title}</span>
            <span className="detail">{step.detail}</span>
            {i < j.steps.length - 1 && <span className="arrow" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{j.caption}</p>
      <Callout data={{ label: "A reassuring fact", body: j.reassuringFact }} />
      <Expandable title={'What "localized" means'} open>
        <p>{j.localizedMeans}</p>
      </Expandable>
      <Expandable title="Good decisions are rarely based on one test">
        <p>{j.notOneTest}</p>
      </Expandable>
    </Chapter>
  );
}
