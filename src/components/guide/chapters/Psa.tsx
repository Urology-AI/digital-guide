import type { GuideContent } from "../content";
import { Callout, Chapter } from "../primitives";

export function Psa({ c }: { c: GuideContent }) {
  const p = c.psa;
  return (
    <Chapter id="psa" alt eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
      <div className="guide-quad">
        {p.factors.map((f) => (
          <div className="guide-quad-cell" key={f.label}>
            <h4>{f.label}</h4>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
      <div className="guide-block">
        <h3>Tests that may follow</h3>
        <ul>
          {p.testsThatFollow.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <Callout data={p.beforeTest} />
    </Chapter>
  );
}
