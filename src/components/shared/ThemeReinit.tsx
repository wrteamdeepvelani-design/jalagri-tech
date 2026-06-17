"use client";

/**
 * ThemeReinit — re-runs the theme's page-level jQuery/GSAP inits on every
 * Next.js client-side navigation AND keeps GSAP ScrollTrigger positions
 * correct as the layout settles.
 *
 * Why the extra refresh machinery:
 * Almost every animation on this site is GSAP ScrollTrigger driven (heading
 * `text-anim`, `tp_fade_anim` reveals, `scale-animation`, ScrollSmoother
 * parallax `effects`). ScrollTrigger caches each trigger's start/end SCROLL
 * positions when it's created. Those positions are only correct if the page
 * is at its final height at that moment — but images load late, web fonts
 * swap, and client-rendered content appears after init, all of which change
 * the height. Stale positions = triggers fire at the wrong scroll point or
 * never fire, which is the classic "animation doesn't work until I refresh".
 *
 * Fixes applied here:
 *   1. main.js exposes window.__initThemePage() — re-run page-level inits on
 *      each route change (layout-level inits stay one-time inside main.js).
 *   2. ScrollTrigger.refresh() is called at every point the layout can settle:
 *      window 'load' (images), document.fonts.ready (fonts), several delays
 *      after each navigation, and — most importantly — via a ResizeObserver
 *      on #smooth-content so ANY height change auto-corrects positions.
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

function refreshScrollTrigger() {
  window.ScrollTrigger?.refresh();
}

export default function ThemeReinit() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  // One-time: recompute ScrollTrigger positions whenever the layout settles
  // or the content height changes. This is what stops the intermittent
  // "works only after a refresh" behavior across the whole site.
  useEffect(() => {
    // After images finish loading.
    window.addEventListener("load", refreshScrollTrigger);

    // After web fonts swap (text reflow changes element heights).
    try {
      (document as any).fonts?.ready
        .then(refreshScrollTrigger)
        .catch(() => {});
    } catch {
      /* fonts API unavailable — ignore */
    }

    // Auto-refresh on ANY content height change (lazy images, async client
    // content, expanding sections). Debounced to one refresh per frame.
    let raf = 0;
    let resizeObserver: ResizeObserver | undefined;
    const content = document.getElementById("smooth-content");
    if (content && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(refreshScrollTrigger);
      });
      resizeObserver.observe(content);
    }

    return () => {
      window.removeEventListener("load", refreshScrollTrigger);
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
    };
  }, []);

  // Per-navigation: re-run page inits, then refresh at a few settle points.
  useEffect(() => {
    const timers: number[] = [];
    const refreshAtSettlePoints = () => {
      [0, 150, 400, 800].forEach((delay) =>
        timers.push(window.setTimeout(refreshScrollTrigger, delay))
      );
    };

    // main.js runs initThemePage() on the first load via $(document).ready,
    // so on the initial mount we only need to schedule extra refreshes (for
    // late images/fonts) — not re-run the inits.
    if (isFirst.current) {
      isFirst.current = false;
      refreshAtSettlePoints();
      return () => timers.forEach(clearTimeout);
    }

    let tries = 0;
    const run = () => {
      if (typeof window.__initThemePage === "function") {
        window.__initThemePage();
        refreshAtSettlePoints();
      } else if (tries++ < 60) {
        // main.js (afterInteractive) may not have loaded yet on a fast nav.
        timers.push(window.setTimeout(run, 100));
      }
    };
    // Small delay so the new page DOM is committed before re-init.
    timers.push(window.setTimeout(run, 120));

    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
}
