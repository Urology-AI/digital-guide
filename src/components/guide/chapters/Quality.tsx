import type { GuideContent } from "../content";
import { Blocks, Callout, Chapter } from "../primitives";

export function Quality({ c }: { c: GuideContent }) {
  const q = c.quality;
  return (
    <Chapter id="quality" eyebrow={q.eyebrow} title={q.title} intro={q.intro}>
      <Blocks blocks={q.blocks} collapsible />
      <Callout data={q.fertility} />
    </Chapter>
  );
}
