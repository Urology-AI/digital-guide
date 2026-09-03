import { useState } from "react";
import type { GuideContent } from "../content";
import { Blocks, Callout, Chapter, DefTable, ScrollX, ToolCta } from "../primitives";
import { ContinenceCurve, Figure, NerveSparingDiagram, ProtectBars } from "../figures";

export function Treatment({ c }: { c: GuideContent }) {
  const t = c.treatment;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Chapter id="treatment" alt eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <h3>{t.byStageTitle}</h3>
      <p>{t.byStageIntro}</p>
      <DefTable head={["Risk group", "Options usually discussed"]} rows={t.byStageRows} />
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{t.byStageFoot}</p>

      <h3 style={{ marginTop: "2rem" }}>The options in detail</h3>
      <p style={{ fontSize: ".85rem", color: "var(--g-muted)" }}>{t.expandHint}</p>
      <Callout data={{ label: "Surveillance or surgery depends on your case", body: t.surgeryFirstNote }} />
      <div className="guide-toolcta-row">
        <ToolCta data={c.toolCta.surveillance} />
        <ToolCta data={c.toolCta.compass} />
      </div>

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

      <div className="guide-chapter-head" style={{ marginTop: "2.6rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{t.pathTitle}</h3>
        <p>{t.pathIntro}</p>
      </div>
      <ol className="guide-pathsteps">
        {t.pathSteps.map((step) => (
          <li key={step.n}>
            <span className="n">{step.n}</span>
            <div>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
              <span className="src">{step.cite}</span>
            </div>
          </li>
        ))}
      </ol>

      <Figure
        n="1"
        title="The four nerve-sparing planes"
        caption="Nerve sparing is not all-or-nothing. The predicted risk that cancer has reached the edge of the prostate on a given side selects a dissection plane, from intrafascial (Grade 1, closest to the gland) out to extrafascial (Grade 4)."
        source="Tewari et al., BJU Int 2011;108(6b):984–992; Martini et al., BJU Int 2019;124(1):103–108"
        sourceUrl="https://pubmed.ncbi.nlm.nih.gov/30575261/"
      >
        <NerveSparingDiagram />
      </Figure>

      <h4 style={{ marginTop: "2rem" }}>{t.pathOutcomeTitle}</h4>
      <p>{t.pathOutcomeIntro}</p>
      <div className="guide-outcome-grid">
        {t.pathOutcomeRows.map((r) => (
          <div className="guide-outcome" key={r.label}>
            <span className="num">{r.a}</span>
            <span className="cap">{r.label}</span>
          </div>
        ))}
      </div>
      <Figure
        n="2"
        title="Return of urinary control after the hood technique"
        caption="Continence measured from catheter removal in a prospective series of 300 men. Most of the recovery happens in the first month; the curve then flattens. The week axis is spaced logarithmically so the early period is readable."
        source="Wagaskar et al., Eur Urol 2021;80(2):213–221 (n=300; men with anterior tumours excluded)"
        sourceUrl="https://pubmed.ncbi.nlm.nih.gov/33067016/"
      >
        <ContinenceCurve />
      </Figure>
      <p className="guide-cite">{t.pathOutcomeCaveat}</p>

      <div className="guide-chapter-head" style={{ marginTop: "2.6rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{t.papersTitle}</h3>
        <p>{t.papersIntro}</p>
      </div>
      <ol className="guide-papers">
        {t.papers.map((paper) => (
          <li key={paper.url}>
            <a href={paper.url} target="_blank" rel="noreferrer">
              {paper.cite}
            </a>
            <span className="note">{paper.note}</span>
          </li>
        ))}
      </ol>
      <p className="guide-cite">{t.papersFoot}</p>

      <div className="guide-chapter-head" style={{ marginTop: "2.6rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>{t.evidenceTitle}</h3>
        <p>{t.evidenceIntro}</p>
      </div>
      <ScrollX>
        <table className="guide-cmp">
          <thead>
            <tr>
              {t.evidenceHead.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.evidenceRows.map((r) => (
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
      <Figure
        n="3"
        title="ProtecT at 15 years, by treatment arm"
        caption="Prostate-cancer death was low and statistically similar across all three arms. The arms separated on metastasis and local progression, not survival."
        source="Hamdy et al., N Engl J Med 2023;388(17):1547–1558 (n=1,643; median 15-year follow-up)"
        sourceUrl="https://www.nejm.org/doi/full/10.1056/NEJMoa2214122"
      >
        <ProtectBars />
      </Figure>

      <div className="guide-block">
        <h4>How to read this</h4>
        <ul>
          {t.evidenceCaveats.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
      <p className="guide-cite">{t.evidenceSource}</p>

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
