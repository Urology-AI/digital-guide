import type { GuideContent } from "./content";

export type ThemeChoice = "auto" | "light" | "dark";

const ICONS: Record<ThemeChoice, JSX.Element> = {
  auto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
};

export function ThemeToggle({
  c,
  theme,
  setTheme,
  compact,
}: {
  c: GuideContent;
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  /** compact = single cycling button (mobile topbar) */
  compact?: boolean;
}) {
  const order: ThemeChoice[] = ["auto", "light", "dark"];
  const label: Record<ThemeChoice, string> = {
    auto: c.theme.auto,
    light: c.theme.light,
    dark: c.theme.dark,
  };

  if (compact) {
    const next = order[(order.indexOf(theme) + 1) % order.length];
    return (
      <button
        type="button"
        className="guide-topbar-theme"
        onClick={() => setTheme(next)}
        aria-label={`${c.theme.label}: ${label[theme]}. ${label[next]}?`}
        title={`${c.theme.label}: ${label[theme]}`}
      >
        {ICONS[theme]}
      </button>
    );
  }

  return (
    <div className="guide-theme-toggle" role="group" aria-label={c.theme.label}>
      {order.map((t) => (
        <button
          key={t}
          type="button"
          className={theme === t ? "active" : ""}
          aria-pressed={theme === t}
          onClick={() => setTheme(t)}
        >
          {ICONS[t]}
          {label[t]}
        </button>
      ))}
    </div>
  );
}
