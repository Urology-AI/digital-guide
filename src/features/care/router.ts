import { useEffect, useState } from "react";

/**
 * Hash routing: the app is deployed as a static bundle on GitHub Pages, where
 * path-based routes would 404 on refresh.
 */
export function useRoute(): [string, (to: string) => void] {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "/");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [route, navigate];
}

export function routePath(route: string): string {
  return route.split("#")[0] || "/";
}
