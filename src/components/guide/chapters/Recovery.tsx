import type { GuideContent } from "../content";
import { Blocks, Callout, Chapter } from "../primitives";

export function Recovery({ c }: { c: GuideContent }) {
  const r = c.recovery;
  return (
    <Chapter id="recovery" alt eyebrow={r.eyebrow} title={r.title} intro={r.intro}>
      <Blocks blocks={r.blocks} collapsible />
      <Callout data={r.callUrgently} tone="warn" />
    </Chapter>
  );
}
