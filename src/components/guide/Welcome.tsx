import type { GuideContent } from "./content";

export function Welcome({
  c,
  hasPlace,
  onStart,
  onContinue,
}: {
  c: GuideContent;
  hasPlace: boolean;
  onStart: () => void;
  onContinue: () => void;
}) {
  const w = c.welcome;
  return (
    <div className="guide-welcome">
      <header className="guide-welcome-hero">
        <span className="lockup">MOUNT SINAI</span>
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

      <p className="guide-welcome-foot">{w.footNote}</p>
    </div>
  );
}
