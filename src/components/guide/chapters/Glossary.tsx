import { useMemo, useState } from "react";
import type { GuideContent } from "../content";
import { Chapter } from "../primitives";

export function Glossary({ c }: { c: GuideContent }) {
  const g = c.glossary;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return g.terms;
    return g.terms.filter(
      (t) =>
        t.term.toLowerCase().includes(needle) || t.def.toLowerCase().includes(needle)
    );
  }, [q, g.terms]);

  return (
    <Chapter id="glossary" alt eyebrow={g.eyebrow} title={g.title} intro={g.intro}>
      <input
        className="guide-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={g.searchPlaceholder}
        aria-label={g.searchPlaceholder}
      />
      {filtered.length === 0 ? (
        <p className="guide-gloss-empty">{g.empty}</p>
      ) : (
        <dl className="guide-gloss-grid">
          {filtered.map((t) => (
            <div className="guide-gloss-item" key={t.term}>
              <dt>{t.term}</dt>
              <dd>{t.def}</dd>
            </div>
          ))}
        </dl>
      )}
    </Chapter>
  );
}
