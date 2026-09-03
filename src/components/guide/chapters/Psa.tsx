import type { GuideContent } from "../content";
import { Callout, Chapter, DefTable } from "../primitives";

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

      <div className="guide-chapter-head" style={{ marginTop: "2.4rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{p.numbersTitle}</h3>
        <p>{p.numbersIntro}</p>
      </div>
      <div className="guide-role-grid">
        {p.numbers.map((n) => (
          <div className="guide-role" key={n.label}>
            <h4>{n.label}</h4>
            <p>{n.a}</p>
          </div>
        ))}
      </div>

      <div className="guide-chapter-head" style={{ marginTop: "2.4rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{p.screeningTitle}</h3>
        <p>{p.screeningIntro}</p>
      </div>
      <DefTable head={["Recommendation", "What it says"]} rows={p.screeningRows} />
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{p.screeningFoot}</p>
    </Chapter>
  );
}
