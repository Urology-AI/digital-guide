import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { CARE_LANGS, tc } from "../../../i18n/care";
import { JOURNEY } from "../../../data/care/journey";
import { BrandLockup, MountSinaiLogo } from "./Logo";
import { Search } from "./Search";

/**
 * Eight stage links in the bar made the product read like documentation. The
 * stages move into an "Explore care" disclosure; the bar keeps the two things
 * a patient came to do, plus the guide.
 */
const STAGE_LINKS: { key: Parameters<typeof tc>[1]; route: string }[] = [
  { key: "nav.health", route: "/health" },
  { key: "nav.risk", route: "/risk" },
  { key: "nav.screening", route: "/psa" },
  { key: "nav.imaging", route: "/imaging" },
  { key: "nav.diagnosis", route: "/diagnosis" },
  { key: "nav.treatment", route: "/treatment" },
  { key: "nav.recovery", route: "/recovery" },
  { key: "nav.monitoring", route: "/monitoring" },
];

const DIRECT_LINKS: { key: Parameters<typeof tc>[1]; route: string }[] = [
  { key: "nav.ask", route: "/ask" },
  { key: "nav.questions", route: "/questions" },
  { key: "nav.journey", route: "/journey" },
];

export function Header({ path }: { path: string }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        {/* aria-label supplies a single accessible name: the lockup's own text
            is hidden below sm, and duplicating it in a sr-only span made screen
            readers announce the product name twice. */}
        <a href="#/" className="flex min-h-[44px] shrink-0 items-center" aria-label={tc(lang, "app.name")}>
          <BrandLockup />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={exploreOpen}
              aria-controls="explore-care-menu"
              onClick={() => setExploreOpen((v) => !v)}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-[var(--r-md)] px-3 py-2 text-sm font-medium text-[var(--c-ink-soft)] transition hover:bg-[var(--c-surface-sunken)] hover:text-[var(--c-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--c-blue-deep)]"
            >
              {tc(lang, "nav.explore")}
              <span aria-hidden="true" className="text-[0.6rem]">▾</span>
            </button>
            {exploreOpen && (
              <div
                id="explore-care-menu"
                className="absolute left-0 top-full z-50 mt-1 w-64 rounded-[var(--r-lg)] border border-[var(--c-line)] bg-white p-2 shadow-[var(--e-3)]"
              >
                <ul>
                  {STAGE_LINKS.map((n, i) => (
                    <li key={n.route}>
                      <a
                        href={`#${n.route}`}
                        onClick={() => setExploreOpen(false)}
                        aria-current={path === n.route ? "page" : undefined}
                        className={`flex items-baseline gap-2.5 rounded-[var(--r-sm)] px-3 py-2 text-sm ${
                          path === n.route
                            ? "bg-[var(--c-surface-accent)] font-semibold text-[var(--c-accent-ink)]"
                            : "text-[var(--c-ink-soft)] hover:bg-[var(--c-surface-sunken)]"
                        }`}
                      >
                        <span className="font-mono text-[0.65rem] text-[var(--c-muted)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {tc(lang, n.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {DIRECT_LINKS.map((n) => (
            <a
              key={n.route}
              href={`#${n.route}`}
              aria-current={path === n.route ? "page" : undefined}
              className={`whitespace-nowrap rounded-[var(--r-md)] px-3 py-2 text-sm font-medium transition ${
                path === n.route
                  ? "bg-[var(--c-surface-accent)] text-[var(--c-accent-ink)]"
                  : "text-[var(--c-ink-soft)] hover:bg-[var(--c-surface-sunken)] hover:text-[var(--c-ink)]"
              }`}
            >
              {tc(lang, n.key)}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:block lg:ml-2">
          <Search />
        </div>

        <label className="ml-auto flex items-center gap-2 lg:ml-0">
          <span className="sr-only">{tc(lang, "nav.language")}</span>
          <select
            value={CARE_LANGS.some((l) => l.code === lang) ? lang : "en"}
            onChange={(e) => setLang(e.target.value as typeof lang)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400"
          >
            {CARE_LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        {lang !== "en" && (
          <p className="hidden text-[0.68rem] leading-tight text-[var(--c-muted)] xl:block xl:max-w-[9rem]">
            {tc(lang, "lang.note")}
          </p>
        )}

        <button
          type="button"
          className="rounded-lg border border-slate-300 p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="care-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{tc(lang, "nav.menu")}</span>
          <span aria-hidden="true" className="block text-sm leading-none">☰</span>
        </button>
      </div>

      {open && (
        <nav id="care-mobile-nav" aria-label="Primary" className="border-t border-slate-200 lg:hidden">
          <div className="mx-auto max-w-6xl px-3 pt-3">
            <Search />
          </div>
          <div className="mx-auto max-w-6xl px-3 py-2">
            <ul>
              {DIRECT_LINKS.map((n) => (
                <li key={n.route}>
                  <a
                    href={`#${n.route}`}
                    onClick={() => setOpen(false)}
                    aria-current={path === n.route ? "page" : undefined}
                    className={`block rounded-[var(--r-sm)] px-3 py-3 text-sm font-semibold ${
                      path === n.route ? "bg-[var(--c-surface-accent)] text-[var(--c-accent-ink)]" : "text-[var(--c-ink)]"
                    }`}
                  >
                    {tc(lang, n.key)}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--c-muted)]">
              {tc(lang, "nav.explore")}
            </p>
            <ul className="mt-1">
              {STAGE_LINKS.map((n) => (
                <li key={n.route}>
                  <a
                    href={`#${n.route}`}
                    onClick={() => setOpen(false)}
                    aria-current={path === n.route ? "page" : undefined}
                    className={`block rounded-[var(--r-sm)] px-3 py-2.5 text-sm ${
                      path === n.route
                        ? "bg-[var(--c-surface-accent)] font-semibold text-[var(--c-accent-ink)]"
                        : "text-[var(--c-ink-soft)]"
                    }`}
                  >
                    {tc(lang, n.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <MountSinaiLogo />
        <p className="mt-3 text-sm font-bold text-slate-900">{tc(lang, "app.name")}</p>
        <p className="mt-1 text-xs text-slate-500">
          Milton and Carroll Petrie Department of Urology · The Tisch Cancer Institute · Mount Sinai
        </p>
        <nav aria-label="Support" className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <a className="inline-flex min-h-[44px] items-center text-fine font-semibold text-[var(--c-accent-ink)] hover:underline" href="#/ask">
            Urology Copilot
          </a>
          <a className="inline-flex min-h-[44px] items-center text-fine font-semibold text-[var(--c-accent-ink)] hover:underline" href="#/questions">
            {tc(lang, "questions.title")}
          </a>
          <a className="inline-flex min-h-[44px] items-center text-fine font-semibold text-[var(--c-accent-ink)] hover:underline" href="#/caregiver">
            Family &amp; caregivers
          </a>
          <a className="inline-flex min-h-[44px] items-center text-fine font-semibold text-[var(--c-accent-ink)] hover:underline" href="#/risk">
            Risk factors
          </a>
          <a className="inline-flex min-h-[44px] items-center text-fine font-semibold text-[var(--c-accent-ink)] hover:underline" href="#/guide">
            Full clinical guide
          </a>
        </nav>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500">{tc(lang, "disclaimer")}</p>
        <p className="mt-2 text-xs text-slate-400">
          Cancer appointments 844-MD-CANCER · Urology 212-241-9955
        </p>
      </div>
    </footer>
  );
}

/** Mobile bottom bar for the four most-used destinations. */
export function BottomNav({ path }: { path: string }) {
  const { lang } = useLang();
  const items = [
    { label: tc(lang, "nav.home"), route: "/", icon: "◆" },
    { label: tc(lang, "nav.screening"), route: "/psa", icon: "◎" },
    { label: tc(lang, "nav.treatment"), route: "/treatment", icon: "✚" },
    { label: tc(lang, "nav.journey"), route: "/journey", icon: "▤" },
  ];
  return (
    <nav
      aria-label="Quick navigation"
      className="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-md">
        {items.map((i) => (
          <li key={i.route} className="flex-1">
            <a
              href={`#${i.route}`}
              aria-current={path === i.route ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                path === i.route ? "text-sinai-600" : "text-slate-500"
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">
                {i.icon}
              </span>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function StageStrip({ activeId }: { activeId?: string }) {
  return (
    <ol className="flex gap-2 overflow-x-auto pb-2">
      {JOURNEY.map((s) => (
        <li key={s.id} className="shrink-0">
          <a
            href={`#${s.route}`}
            aria-current={activeId === s.id ? "step" : undefined}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              activeId === s.id
                ? "border-sinai-400 bg-sinai-50 text-sinai-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <span className="font-mono text-[10px] text-slate-400">{s.n}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
