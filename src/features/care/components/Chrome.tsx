import { useState } from "react";
import { useLang } from "../../../i18n/LanguageContext";
import { CARE_LANGS, tc } from "../../../i18n/care";
import { JOURNEY } from "../../../data/care/journey";
import { BrandLockup, MountSinaiLogo } from "./Logo";
import { Search } from "./Search";

const NAV: { key: Parameters<typeof tc>[1]; route: string }[] = [
  { key: "nav.home", route: "/" },
  { key: "nav.health", route: "/health" },
  { key: "nav.screening", route: "/psa" },
  { key: "nav.diagnosis", route: "/diagnosis" },
  { key: "nav.treatment", route: "/treatment" },
  { key: "nav.recovery", route: "/recovery" },
  { key: "nav.monitoring", route: "/monitoring" },
];

export function Header({ path }: { path: string }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        {/* aria-label supplies a single accessible name: the lockup's own text
            is hidden below sm, and duplicating it in a sr-only span made screen
            readers announce the product name twice. */}
        <a href="#/" className="shrink-0" aria-label={tc(lang, "app.name")}>
          <BrandLockup />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => {
              const active = path === n.route;
              return (
                <li key={n.route}>
                  <a
                    href={`#${n.route}`}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active ? "bg-sinai-50 text-sinai-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {tc(lang, n.key)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden lg:block">
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
          <ul className="mx-auto max-w-6xl px-3 py-2">
            {NAV.map((n) => (
              <li key={n.route}>
                <a
                  href={`#${n.route}`}
                  onClick={() => setOpen(false)}
                  aria-current={path === n.route ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-sm font-medium ${
                    path === n.route ? "bg-sinai-50 text-sinai-700" : "text-slate-700"
                  }`}
                >
                  {tc(lang, n.key)}
                </a>
              </li>
            ))}
          </ul>
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
          <a className="text-xs font-semibold text-sinai-600 hover:underline" href="#/questions">
            {tc(lang, "questions.title")}
          </a>
          <a className="text-xs font-semibold text-sinai-600 hover:underline" href="#/caregiver">
            Family &amp; caregivers
          </a>
          <a className="text-xs font-semibold text-sinai-600 hover:underline" href="#/risk">
            Risk factors
          </a>
          <a className="text-xs font-semibold text-sinai-600 hover:underline" href="#/guide">
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
    { label: tc(lang, "nav.diagnosis"), route: "/diagnosis", icon: "▤" },
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
