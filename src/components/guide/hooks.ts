import { useCallback, useEffect, useRef, useState } from "react";

/** Tracks which chapter section is currently in view via IntersectionObserver. */
export function useActiveChapter(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

type ThemeChoice = "auto" | "light" | "dark";
const THEME_KEY = "guide_theme";

export function useGuideTheme(): [ThemeChoice, (t: ThemeChoice) => void] {
  const [theme, setThemeState] = useState<ThemeChoice>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY) as ThemeChoice | null;
      return stored ?? "auto";
    } catch {
      return "auto";
    }
  });
  const setTheme = useCallback((t: ThemeChoice) => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  // Mirror the choice onto <html> so the page background (index.css) and the
  // browser UI (color-scheme / theme-color) follow the guide's theme.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-guide-theme", theme);
    return () => root.removeAttribute("data-guide-theme");
  }, [theme]);

  return [theme, setTheme];
}

/** A string→string map persisted to localStorage (e.g. worksheet fields). */
export function usePersistentMap(key: string): {
  get: (field: string) => string;
  set: (field: string, value: string) => void;
  clear: () => void;
} {
  const [map, setMap] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  const persist = useRef((next: Record<string, string>) => {
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  });

  const set = useCallback((field: string, value: string) => {
    setMap((prev) => {
      const next = { ...prev, [field]: value };
      persist.current(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(() => {
      persist.current({});
      return {};
    });
  }, []);

  return { get: (field: string) => map[field] ?? "", set, clear };
}

/** A set of string ids persisted to localStorage — survives refresh. */
export function usePersistentSet(key: string): {
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
  size: number;
} {
  const [ids, setIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(key);
      return new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      return new Set();
    }
  });

  const persist = useRef((next: Set<string>) => {
    try {
      localStorage.setItem(key, JSON.stringify([...next]));
    } catch {
      /* ignore */
    }
  });

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persist.current(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setIds(() => {
      const next = new Set<string>();
      persist.current(next);
      return next;
    });
  }, []);

  return {
    has: (id: string) => ids.has(id),
    toggle,
    clear,
    size: ids.size,
  };
}
