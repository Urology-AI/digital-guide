import type { GuideContent } from "../content";
import { Callout, Chapter } from "../primitives";

export function Staging({ c }: { c: GuideContent }) {
  const s = c.staging;
  return (
    <Chapter id="staging" alt eyebrow={s.eyebrow} title={s.title}>
      <h3>{s.continuumTitle}</h3>
      <div className="guide-continuum">
        {s.tiers.map((t) => (
          <div className={`guide-tier tier-${t.id}`} key={t.id}>
            <strong>{t.label}</strong>
            <span>{t.gist}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{s.continuumFoot}</p>

      <div className="guide-grid-2">
        <div className="guide-block">
          <h3>Clinical stage</h3>
          <p>{s.clinicalStage}</p>
        </div>
        <div className="guide-block">
          <h3>Risk group</h3>
          <p>{s.riskGroup}</p>
        </div>
      </div>
      <div className="guide-block">
        <h3>Imaging</h3>
        <ul>
          {s.imaging.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <Callout data={s.sayItBack} />
    </Chapter>
  );
}
