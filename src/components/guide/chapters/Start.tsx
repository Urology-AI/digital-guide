import type { GuideContent } from "../content";
import { Callout, Chapter, Expandable } from "../primitives";
import { Figure, StageSplit } from "../figures";

export function Start({ c }: { c: GuideContent }) {
  const s = c.start;
  return (
    <Chapter id="start" eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
      <Callout data={s.firstStep} />
      <Expandable title="How to use this guide" open>
        <ul>
          {s.howToUse.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </Expandable>
      <Expandable title="What this guide can — and cannot — do">
        <p>{s.canCannot}</p>
        <p style={{ fontSize: ".85rem", color: "var(--g-muted)", marginBottom: 0 }}>
          {s.languageNote}
        </p>
      </Expandable>

      <Figure
        n="0"
        title="Where prostate cancer is found, by stage at diagnosis"
        caption="About two-thirds of prostate cancers in the United States are found while still confined to the prostate — the situation this guide is written for. Five-year relative survival at that stage is essentially 100%."
        source="NCI SEER Cancer Stat Facts: Prostate Cancer (stage distribution 2019–2023; survival SEER 21, 2016–2022)"
        sourceUrl="https://seer.cancer.gov/statfacts/html/prost.html"
      >
        <StageSplit />
      </Figure>

      <div className="guide-askbox">
        <strong>{s.epsaLabel}</strong> {s.epsaBody}{" "}
        <a href={s.epsaUrl} target="_blank" rel="noopener noreferrer">
          {s.epsaLinkText} →
        </a>
      </div>
    </Chapter>
  );
}
