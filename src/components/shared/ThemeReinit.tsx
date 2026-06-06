"use client";

/**
 * ThemeReinit — re-runs the theme's page-level jQuery/GSAP inits on every
 * Next.js client-side navigation.
 *
 * The vendored main.js runs all its inits once inside $(document).ready,
 * which only fires on a full page load. App-Router navigation swaps the page
 * DOM without reloading, so WOW animations, Swiper sliders, counters, the
 * GSAP text-anim, accordions and the scroll animations never re-initialize.
 *
 * main.js was refactored to expose window.__initThemePage() — a re-callable
 * function that re-runs only the PAGE-level inits (layout-level inits like
 * ScrollSmoother, the sticky header and the mobile menu stay one-time, and
 * stale page ScrollTriggers are killed before re-init). This component calls
 * it after each route change.
 */
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __initThemePage?: () => void;
    ScrollTrigger?: any;
  }
}

export default function ThemeReinit() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // main.js already runs initThemePage() on the first load via
    // $(document).ready, so skip the initial mount — only re-run on
    // subsequent navigations.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    let tries = 0;
    let timer: number;
    const run = () => {
      if (typeof window.__initThemePage === "function") {
        window.__initThemePage();
        // Recalculate ScrollSmoother / ScrollTrigger positions for the new
        // page's height once the new DOM has settled.
        window.ScrollTrigger?.refresh();
      } else if (tries++ < 40) {
        // main.js (afterInteractive) may not have loaded yet on a fast nav.
        timer = window.setTimeout(run, 100);
      }
    };
    // Small delay so the new page DOM is committed before re-init.
    timer = window.setTimeout(run, 120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
