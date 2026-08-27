import { useCallback, useEffect, useMemo, useState } from "react";
import "./guide.css";
import { getGuideContent } from "./content";
import { useGuideTheme } from "./hooks";
import { useLang } from "../../i18n/LanguageContext";
import { GuideNav } from "./GuideNav";
import { GuideHero } from "./GuideHero";
import { GuideChat } from "./GuideChat";
import { Start } from "./chapters/Start";
import { Journey } from "./chapters/Journey";
import { Basics } from "./chapters/Basics";
import { Psa } from "./chapters/Psa";
import { Diagnosis } from "./chapters/Diagnosis";
import { Staging } from "./chapters/Staging";
import { Team } from "./chapters/Team";
import { Treatment } from "./chapters/Treatment";
import { Quality } from "./chapters/Quality";
import { Recovery } from "./chapters/Recovery";
import { LivingWith } from "./chapters/LivingWith";
import { Genetics } from "./chapters/Genetics";
import { Glossary } from "./chapters/Glossary";
import { Checklist } from "./chapters/Checklist";
import { Sources } from "./chapters/Sources";
import type { GuideContent } from "./content";

const CHAPTERS: { id: string; C: (p: { c: GuideContent }) => JSX.Element }[] = [
  { id: "start", C: Start },
  { id: "journey", C: Journey },
  { id: "basics", C: Basics },
  { id: "psa", C: Psa },
  { id: "diagnosis", C: Diagnosis },
  { id: "staging", C: Staging },
  { id: "team", C: Team },
  { id: "treatment", C: Treatment },
  { id: "quality", C: Quality },
  { id: "recovery", C: Recovery },
  { id: "living", C: LivingWith },
  { id: "genetics", C: Genetics },
  { id: "glossary", C: Glossary },
  { id: "checklist", C: Checklist },
  { id: "sources", C: Sources },
];

const PLACE_KEY = "guide_place";

export function PatientGuide() {
  const { lang } = useLang();
  const c = useMemo(() => getGuideContent(lang), [lang]);
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useGuideTheme();

  const [currentId, setCurrentId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PLACE_KEY);
      if (saved && CHAPTERS.some((ch) => ch.id === saved)) return saved;
    } catch {
      /* ignore */
    }
    return CHAPTERS[0].id;
  });

  const idx = Math.max(0, CHAPTERS.findIndex((ch) => ch.id === currentId));
  const Current = CHAPTERS[idx].C;
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
  const labelFor = (id: string) => c.nav.find((n) => n.id === id)?.label ?? id;

  const goTo = useCallback((id: string) => {
    setNavOpen(false);
    setCurrentId(id);
    try {
      localStorage.setItem(PLACE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const scroller = document.querySelector(".guide-main");
    scroller?.scrollTo({ top: 0, behavior: "auto" });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentId]);

  return (
    <div className="guide-scope" data-guide-theme={theme}>
      <div className="guide-topbar">
        <button
          type="button"
          className="guide-topbar-menu"
          aria-expanded={navOpen}
          aria-controls="guide-side-nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span aria-hidden="true">☰</span> {c.nav[idx]?.label ?? c.brandName}
        </button>
        <span className="guide-topbar-count">
          {idx + 1}/{CHAPTERS.length}
        </span>
      </div>

      <div className="guide-shell">
        <GuideNav
          c={c}
          activeId={currentId}
          open={navOpen}
          onClose={() => setNavOpen(false)}
          onNavigate={goTo}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="guide-main">
          <div className="guide-progress-rail" aria-hidden="true">
            <i style={{ width: `${((idx + 1) / CHAPTERS.length) * 100}%` }} />
          </div>

          {idx === 0 && (
            <>
              <GuideHero c={c} />
              <p className="guide-draft-notice" role="note">
                {c.draftNotice}
              </p>
            </>
          )}

          <div className="guide-chapter-view" key={currentId}>
            <Current c={c} />

            <nav className="guide-pager" aria-label="Chapter navigation">
              {prev ? (
                <button type="button" className="prev" onClick={() => goTo(prev.id)}>
                  <span className="dir">← Previous</span>
                  <span className="ttl">{labelFor(prev.id)}</span>
                </button>
              ) : (
                <span />
              )}
              {next ? (
                <button type="button" className="next" onClick={() => goTo(next.id)}>
                  <span className="dir">Next →</span>
                  <span className="ttl">{labelFor(next.id)}</span>
                </button>
              ) : (
                <span />
              )}
            </nav>
          </div>

          <footer className="guide-footer">
            <p className="fine">{c.footer.fine}</p>
            <p className="fine brandline">{c.footer.brandline}</p>
            <p className="fine">{c.footer.contact}</p>
          </footer>
        </main>
      </div>

      <div className="guide-disclaimer-bar" role="note">
        {c.disclaimerBar}
      </div>

      <GuideChat c={c} activeChapterLabel={labelFor(currentId)} />
    </div>
  );
}
