import { useState } from "react";
import type { GuideContent } from "../content";
import { Blocks, Callout, Chapter, ScrollX } from "../primitives";

export function Treatment({ c }: { c: GuideContent }) {
  const t = c.treatment;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Chapter id="treatment" alt eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{t.expandHint}</p>

      <div className="guide-path-list">
        {t.paths.map((p) => {
          const isOpen = open === p.id;
          return (
            <div key={p.id} className={`guide-path-card${isOpen ? " open" : ""}`}>
              <button
                type="button"
                className="guide-path-toggle"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : p.id)}
              >
                <span>
                  <span className="n">{p.n}</span>
                  <span className="ttl">{p.title}</span>
                </span>
                <span className="sign" aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen ? (
                <div className="guide-path-body">
                  <Blocks blocks={p.blocks} />
                  {p.callout && <Callout data={p.callout} />}
                </div>
              ) : (
                <p className="summary">{p.summary}</p>
              )}
            </div>
          );
        })}
      </div>

      <h3 style={{ marginTop: "2.4rem" }}>{t.compareTitle}</h3>
      <p>{t.compareIntro}</p>
      <ScrollX>
        <table className="guide-cmp">
          <thead>
            <tr>
              {t.compareHead.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.compareRows.map((r) => (
              <tr key={r.label}>
                <td>
                  <strong>{r.label}</strong>
                </td>
                <td>{r.a}</td>
                <td>{r.b}</td>
                <td>{r.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollX>
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{t.compareFoot}</p>

      <div className="guide-block">
        <h3>{t.fairQuestionsTitle}</h3>
        <ol>
          {t.fairQuestions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </div>
    </Chapter>
  );
}
