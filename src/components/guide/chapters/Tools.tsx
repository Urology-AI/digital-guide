import type { GuideContent } from "../content";
import { Callout, Chapter } from "../primitives";

export function Tools({ c }: { c: GuideContent }) {
  const t = c.tools;
  return (
    <Chapter id="tools" alt eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="guide-tool-list">
        {t.items.map((item) => (
          <div className="guide-tool-card" key={item.id}>
            <span className="eyebrow">{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.note && <p className="note">{item.note}</p>}
            {item.href && (
              <a
                className="guide-tool-cta"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.cta} →
              </a>
            )}
          </div>
        ))}
      </div>
      <Callout data={{ label: "About outcome estimates", body: t.ruoNote }} />
    </Chapter>
  );
}
