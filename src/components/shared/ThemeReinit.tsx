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
import { useEffect, useLayoutEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    __initThemePage?: () => void;
    ScrollTrigger?: any;
    ScrollSmoother?: any;
  }
}

function refreshScrollTrigger() {
  // refresh() makes ScrollSmoother restart its smoothing from near the top
  // and glide back to the real scroll position — a visible jump-and-slide
  // every time the layout is re-measured. Pin it to the real position: the
  // native scrollY, not smoother.scrollTop(), which returns the in-flight
  // smoothed value and would freeze a glide mid-way.
  const y = window.scrollY;
  window.ScrollTrigger?.refresh();
  window.ScrollSmoother?.get?.()?.scrollTop(y);
}

/**
 * Put the new page at the top (or at its #hash target) after a client-side
 * navigation. Next.js normally does this, but ScrollSmoother owns scrolling
 * here, so without it a link clicked near the footer opened the next page
 * still scrolled to the footer.
 */
function scrollToTopOrHash() {
  const smoother = window.ScrollSmoother?.get?.();
  const hash = window.location.hash;
  const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (target) {
    if (smoother) smoother.scrollTo(target, false, "top 90px");
    else target.scrollIntoView();
    return;
  }
  // "instant": an animated scroll is still mid-way when ScrollTrigger next
  // refreshes, and refresh() restores the position it reads at that moment.
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  smoother?.scrollTop(0);
}

/**
 * For a moment after a page change, keep ScrollSmoother's displayed position
 * on the real scroll position. The theme's page re-init rebuilds its
 * ScrollTriggers, which sets the smoother gliding in from a stale offset —
 * a visible flash of the page scrolled partway down. Stops early on any
 * user scroll input so manual scrolling stays smooth.
 */
function holdScrollPosition(ms: number) {
  const gsap = (window as any).gsap;
  const smoother = window.ScrollSmoother?.get?.();
  if (!gsap || !smoother) return () => {};
  // Also hold the native position: late content growth can nudge it.
  const target = window.scrollY;
  const tick = () => {
    if (Math.abs(window.scrollY - target) > 1) {
      window.scrollTo({ top: target, left: 0, behavior: "instant" });
    }
    if (Math.abs(smoother.scrollTop() - target) > 1) smoother.scrollTop(target);
  };
  const inputs = ["wheel", "touchstart", "keydown", "pointerdown"];
  let timer = 0;
  const stop = () => {
    gsap.ticker.remove(tick);
    inputs.forEach((e) => window.removeEventListener(e, stop));
    clearTimeout(timer);
  };
  gsap.ticker.add(tick);
  inputs.forEach((e) => window.addEventListener(e, stop, { passive: true }));
  timer = window.setTimeout(stop, ms);
  return stop;
}

export default function ThemeReinit() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const prevPath = useRef<string | null>(null);

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

    /* ScrollSmoother fakes scrolling with a transform on #smooth-content and
       leaves #smooth-wrapper as a fixed, overflow:hidden box. That box is
       still *programmatically* scrollable, and anything that calls
       scrollIntoView() — Next.js' router when navigating to a #hash, browser
       fragment handling — scrolls the wrapper itself. The smoother knows
       nothing about that offset, so the whole page renders shifted: you can
       scroll past the footer into blank space and never get back to the top.
       Reset it whenever it happens; the smoother remains the only scroller. */
    const wrapper = document.getElementById("smooth-wrapper");
    const resetWrapperScroll = () => {
      if (!wrapper) return;
      if (wrapper.scrollTop !== 0) wrapper.scrollTop = 0;
      if (wrapper.scrollLeft !== 0) wrapper.scrollLeft = 0;
    };
    wrapper?.addEventListener("scroll", resetWrapperScroll, { passive: true });

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
      wrapper?.removeEventListener("scroll", resetWrapperScroll);
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
    };
  }, []);

  // Per-navigation: reset the scroll position before the new page paints.
  // Product category switches keep their place (handled in place by
  // ProductCategoryBrowser), so they are skipped.
  const lastScrolledPath = useRef<string | null>(null);
  useLayoutEffect(() => {
    const prev = lastScrolledPath.current;
    lastScrolledPath.current = pathname;
    if (prev === null || prev === pathname) return;
    const isProducts = (p: string | null) => !!p?.startsWith("/products/");
    if (isProducts(prev) && isProducts(pathname)) return;
    scrollToTopOrHash();
    let release = holdScrollPosition(1500);
    // A #hash target may sit below late-loading images; aim again once the
    // layout has settled and ScrollTrigger has re-measured.
    const t = window.location.hash.length > 1
      ? window.setTimeout(() => {
          release();
          scrollToTopOrHash();
          release = holdScrollPosition(600);
        }, 900)
      : 0;
    return () => {
      release();
      clearTimeout(t);
    };
  }, [pathname]);

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
      prevPath.current = pathname;
      refreshAtSettlePoints();
      return () => timers.forEach(clearTimeout);
    }

    // Product category pills switch in place and only push the URL
    // (ProductCategoryBrowser); re-running the page inits there would
    // replay animations on an unchanged page. The ResizeObserver above
    // already re-measures when the new products change the page height.
    const isProducts = (p: string | null) => !!p?.startsWith("/products/");
    const categorySwitch = isProducts(prevPath.current) && isProducts(pathname);
    prevPath.current = pathname;
    if (categorySwitch) return;

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
