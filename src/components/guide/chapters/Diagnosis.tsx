import { useState } from "react";
import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable, ScrollX } from "../primitives";

export function Diagnosis({ c }: { c: GuideContent }) {
  const d = c.diagnosis;
  const [selected, setSelected] = useState(d.rows[0].id);
  const active = d.rows.find((r) => r.id === selected) ?? d.rows[0];

  return (
    <Chapter id="diagnosis" eyebrow={d.eyebrow} title={d.title} intro={d.intro}>
      <Expandable title={d.howDoneTitle}>
        <p>{d.howDone}</p>
      </Expandable>
      <Expandable title={d.prepareTitle}>
        <ul>
          {d.prepare.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </Expandable>
      <Callout data={d.whatToExpect} />

      <h3 style={{ marginTop: "1.8rem" }}>Reading the pathology</h3>
      <p>{d.gleasonIntro}</p>
      <p style={{ fontSize: ".88rem", color: "var(--g-muted)" }}>
        Tap a row to see what it generally means.
      </p>
      <ScrollX>
        <table className="guide-cmp">
          <thead>
            <tr>
              <th>{d.tableHead[0]}</th>
              <th>{d.tableHead[1]}</th>
              <th>{d.tableHead[2]}</th>
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r) => (
              <tr
                key={r.id}
                className={`selectable${r.id === selected ? " selected" : ""}`}
                onClick={() => setSelected(r.id)}
                tabIndex={0}
                role="button"
                aria-pressed={r.id === selected}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(r.id);
                  }
                }}
              >
                <td>Grade Group {r.group}</td>
                <td>{r.gleason}</td>
                <td>{r.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollX>

      <div className="guide-card" aria-live="polite">
        <h3 style={{ fontSize: "1rem" }}>
          Grade Group {active.group} · Gleason {active.gleason}
        </h3>
        <p style={{ marginBottom: 0 }}>{active.meaning}</p>
      </div>
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{d.tableFoot}</p>

      <Expandable title="Other things on the report">
        <ul>
          {d.alsoLookFor.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </Expandable>
      <Expandable title={d.ifNegativeTitle}>
        <p>{d.ifNegative}</p>
      </Expandable>
      <Callout data={d.worthAsking} />
    </Chapter>
  );
}
