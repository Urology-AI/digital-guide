import { useCallback, useEffect, useMemo, useState } from "react";
import "./guide.css";
import { getGuideContent } from "./content";
import { useActiveChapter, useGuideTheme, useReadMode } from "./hooks";
import { useLang } from "../../i18n/LanguageContext";
import { GuideNav } from "./GuideNav";
import { GuideHero } from "./GuideHero";
import { GuideChat } from "./GuideChat";
import { ThemeToggle } from "./ThemeToggle";
import { Welcome } from "./Welcome";
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
import { Tools } from "./chapters/Tools";
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
  { id: "tools", C: Tools },
  { id: "sources", C: Sources },
];

const PLACE_KEY = "guide_place";
const ENTERED_KEY = "guide_entered";

export function PatientGuide() {
  const { lang } = useLang();
  const c = useMemo(() => getGuideContent(lang), [lang]);
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useGuideTheme();
  const [readMode, setReadMode] = useReadMode();
  const chapterIds = useMemo(() => CHAPTERS.map((ch) => ch.id), []);
  const scrolledId = useActiveChapter(readMode === "scroll" ? chapterIds : []);

  const savedPlace = (() => {
    try {
      const saved = localStorage.getItem(PLACE_KEY);
      return saved && CHAPTERS.some((ch) => ch.id === saved) ? saved : null;
    } catch {
      return null;
    }
  })();

  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ENTERED_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [currentId, setCurrentId] = useState<string>(savedPlace ?? CHAPTERS[0].id);

  const activeId = readMode === "scroll" ? scrolledId || currentId : currentId;
  const idx = Math.max(
    0,
    CHAPTERS.findIndex((ch) => ch.id === activeId)
  );
  const Current = CHAPTERS[idx].C;
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
  const labelFor = (id: string) => c.nav.find((n) => n.id === id)?.label ?? id;

  const enter = useCallback(() => {
    setShowWelcome(false);
    try {
      localStorage.setItem(ENTERED_KEY, "1");
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const goTo = useCallback(
    (id: string) => {
      setNavOpen(false);
      setCurrentId(id);
      try {
        localStorage.setItem(PLACE_KEY, id);
      } catch {
        /* ignore */
      }
      if (showWelcome) enter();
      if (readMode === "scroll") {
        // Let the section render before scrolling to it.
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    [showWelcome, enter, readMode]
  );

  // Paged reading starts each chapter at the top; continuous reading must not
  // yank the page while someone is scrolling through it.
  useEffect(() => {
    if (readMode === "pages") window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentId, showWelcome, readMode]);

  // Remember where the reader got to while scrolling.
  useEffect(() => {
    if (readMode !== "scroll" || !scrolledId) return;
    try {
      localStorage.setItem(PLACE_KEY, scrolledId);
    } catch {
      /* ignore */
    }
  }, [readMode, scrolledId]);

  // Left / right arrow keys page between chapters (unless typing in a field).
  useEffect(() => {
    if (showWelcome || readMode === "scroll") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (el?.isContentEditable) return;
      if (e.key === "ArrowRight" && next) goTo(next.id);
      else if (e.key === "ArrowLeft" && prev) goTo(prev.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showWelcome, next, prev, goTo, readMode]);

  if (showWelcome) {
    return (
      <div className="guide-scope" data-guide-theme={theme}>
        <Welcome
          c={c}
          hasPlace={Boolean(savedPlace)}
          theme={theme}
          setTheme={setTheme}
          onStart={() => {
            setCurrentId(CHAPTERS[0].id);
            enter();
          }}
          onContinue={enter}
          onJump={(id) => goTo(id)}
        />
      </div>
    );
  }

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
        <ThemeToggle c={c} theme={theme} setTheme={setTheme} compact />
      </div>

      <div className="guide-shell">
        <GuideNav
          c={c}
          activeId={activeId}
          open={navOpen}
          onClose={() => setNavOpen(false)}
          onNavigate={goTo}
          theme={theme}
          setTheme={setTheme}
          readMode={readMode}
          setReadMode={setReadMode}
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

          {readMode === "scroll" ? (
            <div className="guide-chapter-view guide-book">
              {CHAPTERS.map(({ id, C }) => (
                <C c={c} key={id} />
              ))}
            </div>
          ) : (
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
          )}

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
