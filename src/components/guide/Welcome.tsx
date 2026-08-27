import type { GuideContent } from "./content";
import { ThemeToggle, type ThemeChoice } from "./ThemeToggle";

export function Welcome({
  c,
  hasPlace,
  theme,
  setTheme,
  onStart,
  onContinue,
  onJump,
}: {
  c: GuideContent;
  hasPlace: boolean;
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  onStart: () => void;
  onContinue: () => void;
  onJump: (id: string) => void;
}) {
  const w = c.welcome;
  // A short, human-picked set of "jump straight to" chapters.
  const quickJump = ["diagnosis", "staging", "treatment", "glossary", "checklist"];
  const byId = new Map(c.nav.map((n) => [n.id, n]));

  return (
    <div className="guide-welcome">
      <div className="guide-welcome-top">
        <span className="lockup">MOUNT SINAI</span>
        <ThemeToggle c={c} theme={theme} setTheme={setTheme} />
      </div>

      <header className="guide-welcome-hero">
        <img
          className="guide-welcome-portrait"
          src={`${import.meta.env.BASE_URL}drtewari.png`}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="eyebrow">{w.eyebrow}</span>
        <h1>{w.title}</h1>
        <p className="lead">{w.lead}</p>
        <div className="guide-welcome-reassure">{w.reassurance}</div>

        <div className="guide-welcome-actions">
          <button type="button" className="primary" onClick={onStart}>
            {w.startLabel} →
          </button>
          {hasPlace && (
            <button type="button" className="ghost" onClick={onContinue}>
              {w.continueLabel}
            </button>
          )}
        </div>
      </header>

      <ul className="guide-welcome-highlights">
        {w.highlights.map((h) => (
          <li key={h.label}>
            <strong>{h.label}</strong>
            <span>{h.text}</span>
          </li>
        ))}
      </ul>

      <div className="guide-welcome-preview">
        <span>Jump straight to</span>
        <ul className="guide-welcome-chapters">
          {quickJump.map((id) => {
            const item = byId.get(id);
            if (!item) return null;
            return (
              <li key={id}>
                <button type="button" onClick={() => onJump(id)}>
                  <span className="n">{item.n}</span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="guide-welcome-foot">{w.footNote}</p>
    </div>
  );
}
