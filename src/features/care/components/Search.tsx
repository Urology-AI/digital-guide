import { useEffect, useMemo, useRef, useState } from "react";
import { search, type LookupHit } from "../../../data/care/lookup";

/**
 * Type what is written on your report — "PI-RADS 4", "Gleason 3+4" — and go
 * straight to the explanation.
 */
export function Search({ variant = "header" }: { variant?: "header" | "hero" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => search(query), [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setActive(0), [query]);

  const goTo = (hit: LookupHit) => {
    window.location.hash = `/t/${hit.id}`;
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!hits.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(hits[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hero = variant === "hero";

  return (
    <div ref={boxRef} className={`relative ${hero ? "w-full max-w-xl" : "w-full max-w-xs"}`}>
      <label className="sr-only" htmlFor={`care-search-${variant}`}>
        Search the guide
      </label>
      <input
        id={`care-search-${variant}`}
        type="search"
        role="combobox"
        aria-expanded={open && hits.length > 0}
        aria-controls={`care-search-results-${variant}`}
        aria-autocomplete="list"
        autoComplete="off"
        value={query}
        placeholder={hero ? "Search a term from your report — PI-RADS 4, Gleason 3+4…" : "Search a term…"}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className={`w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sinai-400 ${
          hero ? "px-5 py-4 text-base" : "px-3 py-2 text-sm"
        }`}
      />

      {open && hits.length > 0 && (
        <ul
          id={`care-search-results-${variant}`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
        >
          {hits.map((hit, i) => (
            <li key={`${hit.id}-${hit.title}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => goTo(hit)}
                className={`block w-full px-4 py-2.5 text-left ${i === active ? "bg-sinai-50" : ""}`}
              >
                <span className="block text-sm font-semibold text-slate-900">{hit.title}</span>
                <span className="block text-xs text-slate-500">{hit.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && query.trim().length >= 2 && hits.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-xl">
          Nothing matched “{query}”. Try a term from your report, such as PI-RADS, Gleason, or PSA.
        </div>
      )}
    </div>
  );
}
