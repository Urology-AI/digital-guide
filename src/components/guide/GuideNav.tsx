import type { GuideContent } from "./content";
import { ThemeToggle, type ThemeChoice } from "./ThemeToggle";
import type { ReadMode } from "./hooks";

/** Groups the flat chapter list into labelled sections for the side nav. */
const SECTIONS: { label: string; ids: string[] }[] = [
  { label: "Get oriented", ids: ["start", "journey"] },
  { label: "The essentials", ids: ["basics", "psa", "diagnosis", "staging"] },
  { label: "Making a decision", ids: ["team", "treatment"] },
  { label: "After treatment", ids: ["quality", "recovery", "living", "genetics"] },
  { label: "Toolkit & reference", ids: ["glossary", "checklist", "tools", "sources"] },
];

export function GuideNav({
  c,
  activeId,
  open,
  onClose,
  onNavigate,
  theme,
  setTheme,
  readMode,
  setReadMode,
}: {
  c: GuideContent;
  activeId: string;
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  readMode: ReadMode;
  setReadMode: (m: ReadMode) => void;
}) {
  const byId = new Map(c.nav.map((n) => [n.id, n]));

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

        {SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="guide-navgroup">
              <span>{section.label}</span>
            </p>
            <ul className="guide-navlist">
              {section.ids.map((id) => {
                const item = byId.get(id);
                if (!item) return null;
                return (
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
                );
              })}
            </ul>
          </div>
        ))}

        <div className="guide-nav-theme" role="group" aria-label={c.readModeLabel}>
          <p className="guide-navgroup">
            <span>{c.readModeLabel}</span>
          </p>
          <div className="guide-theme-toggle">
            <button
              type="button"
              className={readMode === "pages" ? "active" : ""}
              aria-pressed={readMode === "pages"}
              onClick={() => setReadMode("pages")}
            >
              {c.readModePages}
            </button>
            <button
              type="button"
              className={readMode === "scroll" ? "active" : ""}
              aria-pressed={readMode === "scroll"}
              onClick={() => setReadMode("scroll")}
            >
              {c.readModeScroll}
            </button>
          </div>
        </div>

        <div className="guide-nav-theme" role="group" aria-label={c.theme.label}>
          <p className="guide-navgroup">
            <span>{c.theme.label}</span>
          </p>
          <ThemeToggle c={c} theme={theme} setTheme={setTheme} />
        </div>
      </nav>
    </>
  );
}
