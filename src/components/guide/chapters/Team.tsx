import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable } from "../primitives";

/** First + last initial, e.g. "Ashutosh K. Tewari" -> "AT". */
function initials(name: string): string {
  const parts = name.split(" ").filter((w) => w.replace(/\W/g, "").length > 1);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`;
}

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
          <ul className="guide-chair-titles">
            {t.chairTitles.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p>{t.chairBody}</p>
          <p style={{ marginBottom: 0 }}>
            <a className="guide-srclink" href={t.chairSourceUrl} target="_blank" rel="noreferrer">
              {t.chairSourceLabel} ↗
            </a>
          </p>
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

      <div className="guide-chapter-head" style={{ marginTop: "2.4rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{t.msCare.title}</h3>
        <p>{t.msCare.intro}</p>
      </div>
      <div className="guide-role-grid">
        {t.msCare.items.map((it) => (
          <div className="guide-role" key={it.label}>
            <h4>{it.label}</h4>
            <p>{it.a}</p>
          </div>
        ))}
      </div>
      <div className="guide-chapter-head" style={{ marginTop: "2.4rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{t.facultyTitle}</h3>
        <p>{t.facultyIntro}</p>
      </div>
      <div className="guide-faculty-grid">
        {t.faculty.map((f) => (
          <a
            className="guide-faculty"
            key={f.name}
            href={f.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="mono" aria-hidden="true">
              {initials(f.name)}
            </span>
            <span className="who">
              <strong>
                {f.name}
                <span className="creds">{f.creds}</span>
              </strong>
              <span className="role">{f.role}</span>
              <span className="focus">{f.focus}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="guide-faculty-note">{t.facultyNote}</p>

      <div className="guide-contact-card">
        <h4>{t.msCare.contactTitle}</h4>
        <ul>
          {t.msCare.contactLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p style={{ marginBottom: 0 }}>
          <a className="guide-srclink" href={t.msCare.sourceUrl} target="_blank" rel="noreferrer">
            {t.msCare.sourceLabel} ↗
          </a>
        </p>
      </div>
    </Chapter>
  );
}
