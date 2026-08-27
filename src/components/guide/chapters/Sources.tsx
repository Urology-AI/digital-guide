import type { GuideContent } from "../content";
import { Callout, Chapter } from "../primitives";

export function Sources({ c }: { c: GuideContent }) {
  const s = c.sources;
  return (
    <Chapter id="sources" alt eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
      {s.groups.map((group) => (
        <div className="guide-block" key={group.heading}>
          <h3>{group.heading}</h3>
          <ol className="guide-sources">
            {group.refs.map((r) => (
              <li key={r.cite}>
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    {r.cite}
                  </a>
                ) : (
                  r.cite
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}

      <div className="guide-block">
        <h3>{s.reviewTitle}</h3>
        <ul>
          {s.reviewItems.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <Callout data={{ label: "Version", body: s.version }} />
    </Chapter>
  );
}
