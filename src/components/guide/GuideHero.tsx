import type { GuideContent } from "./content";

export function GuideHero({ c }: { c: GuideContent }) {
  return (
    <>
      <header className="guide-hero">
        <span className="eyebrow">{c.hero.eyebrow}</span>
        <h1>{c.hero.title}</h1>
        <p className="lead">{c.hero.lead}</p>
        <div className="guide-hero-reassure">{c.hero.reassurance}</div>
        <div className="guide-hero-meta">
          {c.hero.chips.map((chip) => (
            <span className="guide-chip" key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </header>
      <div className="guide-stat-strip">
        {c.stats.map((s) => (
          <div className="guide-stat" key={s.cap}>
            <span className="num">{s.num}</span>
            <span className="cap">{s.cap}</span>
          </div>
        ))}
      </div>
      <p className="guide-stat-source">{c.statsSource}</p>
    </>
  );
}
