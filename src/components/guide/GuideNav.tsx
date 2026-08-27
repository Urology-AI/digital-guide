import type { GuideContent } from "./content";

type ThemeChoice = "auto" | "light" | "dark";

export function GuideNav({
  c,
  activeId,
  open,
  onClose,
  onNavigate,
  theme,
  setTheme,
}: {
  c: GuideContent;
  activeId: string;
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
}) {
  const themes: ThemeChoice[] = ["auto", "light", "dark"];
  const themeLabel: Record<ThemeChoice, string> = {
    auto: c.theme.auto,
    light: c.theme.light,
    dark: c.theme.dark,
  };

  return (
    <>
      <div
        className={`guide-nav-overlay${open ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={`guide-nav${open ? " open" : ""}`}
        id="guide-side-nav"
        aria-label={c.brandName}
      >
        <div className="brand">
          <span className="logo">
            <b>MOUNT SINAI</b>
          </span>
          <strong>{c.brandName}</strong>
          <span>{c.brandDept}</span>
          <span>{c.brandInstitute}</span>
        </div>
        <ul className="guide-navlist">
          {c.nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={activeId === item.id ? "active" : ""}
                aria-current={activeId === item.id ? "true" : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <span className="n">{item.n}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="guide-nav-theme" role="group" aria-label={c.theme.label}>
          {themes.map((tm) => (
            <button
              key={tm}
              type="button"
              className={theme === tm ? "active" : ""}
              onClick={() => setTheme(tm)}
            >
              {themeLabel[tm]}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
