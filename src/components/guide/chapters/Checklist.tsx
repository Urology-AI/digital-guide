import type { GuideContent } from "../content";
import { Callout, Chapter } from "../primitives";
import { usePersistentMap, usePersistentSet } from "../hooks";

export function Checklist({ c }: { c: GuideContent }) {
  const cl = c.checklist;
  const checks = usePersistentSet("guide_checklist_v2");
  const record = usePersistentMap("guide_record_v1");
  const pct = cl.questions.length
    ? Math.round((checks.size / cl.questions.length) * 100)
    : 0;

  return (
    <Chapter id="checklist" eyebrow={cl.eyebrow} title={cl.title} intro={cl.intro}>
      <h3>{cl.questionsTitle}</h3>
      <div className="guide-progress">
        <span>
          {checks.size} / {cl.questions.length} {cl.progress}
        </span>
        <span className="bar">
          <i style={{ width: `${pct}%` }} />
        </span>
        <button type="button" onClick={checks.clear}>
          {cl.reset}
        </button>
      </div>
      <ul className="guide-checklist">
        {cl.questions.map((q) => {
          const done = checks.has(q.id);
          return (
            <li key={q.id} className={done ? "done" : ""}>
              <label>
                <input type="checkbox" checked={done} onChange={() => checks.toggle(q.id)} />
                <span>{q.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <Callout data={cl.teachBack} />

      <div className="guide-chapter-head" style={{ marginTop: "2.4rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{cl.recordTitle}</h3>
        <p>{cl.recordIntro}</p>
      </div>
      <div className="guide-record">
        {cl.recordFields.map((f) => (
          <label key={f.id} className="guide-record-row">
            <span>{f.label}</span>
            <input
              type="text"
              value={record.get(f.id)}
              onChange={(e) => record.set(f.id, e.target.value)}
            />
          </label>
        ))}
      </div>

      <h4 style={{ marginTop: "1.4rem" }}>{cl.prioritiesLabel}</h4>
      <div className="guide-record">
        {[0, 1, 2].map((i) => (
          <label key={i} className="guide-record-row">
            <span>{i + 1}.</span>
            <input
              type="text"
              value={record.get(`priority_${i}`)}
              onChange={(e) => record.set(`priority_${i}`, e.target.value)}
            />
          </label>
        ))}
      </div>

      <h4 style={{ marginTop: "1.4rem" }}>{cl.careTeamLabel}</h4>
      <div className="guide-record">
        {cl.careTeamRoles.map((role) => (
          <label key={role} className="guide-record-row">
            <span>{role}</span>
            <input
              type="text"
              value={record.get(`team_${role}`)}
              onChange={(e) => record.set(`team_${role}`, e.target.value)}
            />
          </label>
        ))}
      </div>

      <p style={{ fontSize: ".8rem", color: "var(--g-muted)", marginTop: "1rem" }}>
        {cl.recordSavedNote}{" "}
        <button
          type="button"
          onClick={record.clear}
          style={{
            background: "none",
            border: "none",
            color: "var(--g-blue)",
            textDecoration: "underline",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          {cl.reset}
        </button>
      </p>
    </Chapter>
  );
}
