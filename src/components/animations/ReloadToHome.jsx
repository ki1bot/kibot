"use client";

import { useEffect } from "react";

const RELOAD_TO_HOME_HAS_RUN_KEY = "__portfolio_reload_to_home_has_run__";

function isBrowserReload() {
  if (typeof window === "undefined") return false;

  const navigationEntries = performance.getEntriesByType?.("navigation");
  const navigationEntry = navigationEntries?.[0];

  if (navigationEntry && "type" in navigationEntry) {
    return navigationEntry.type === "reload";
  }

  return performance.navigation?.type === 1;
}

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") return "/";

  return pathname.replace(/\/+$/, "");
}

export function ReloadToHome() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window[RELOAD_TO_HOME_HAS_RUN_KEY]) return;
    window[RELOAD_TO_HOME_HAS_RUN_KEY] = true;

    if (!isBrowserReload()) return;

    const currentPath = normalizePathname(window.location.pathname);

    if (currentPath !== "/") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.search || window.location.hash) {
      window.history.replaceState(null, "", "/");
    }

    function scrollToHome() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }

    scrollToHome();

    const timers = [0, 50, 150, 350, 700, 1200, 1800, 2600, 3200].map((delay) =>
      window.setTimeout(scrollToHome, delay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
