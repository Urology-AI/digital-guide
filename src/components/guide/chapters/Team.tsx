import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable } from "../primitives";

export function Team({ c }: { c: GuideContent }) {
  const t = c.team;
  return (
    <Chapter id="team" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="guide-team">
        <div className="badge">
          <img
            src={`${import.meta.env.BASE_URL}drtewari.png`}
            alt={t.chairName}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div>
          <h3>{t.chairName}</h3>
          <span className="role">{t.chairRole}</span>
          <p style={{ marginBottom: 0 }}>{t.chairBody}</p>
        </div>
      </div>

      <div className="guide-role-grid">
        {t.roles.map((r) => (
          <div className="guide-role" key={r.label}>
            <h4>{r.label}</h4>
            <p>{r.a}</p>
          </div>
        ))}
      </div>

      <Expandable title={t.secondOpinionTitle}>
        <ul>
          {t.secondOpinionItems.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </Expandable>
      <Callout data={t.msApproach} />

      <div className="guide-chapter-head" style={{ marginTop: "2.4rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{t.prioritiesTitle}</h3>
        <p>{t.prioritiesIntro}</p>
      </div>
      <div className="guide-quad">
        {t.priorities.map((p) => (
          <div className="guide-quad-cell" key={p.label}>
            <h4>{p.label}</h4>
            <p>{p.a}</p>
          </div>
        ))}
      </div>
      <Callout data={t.decisionCheck} />
    </Chapter>
  );
}
