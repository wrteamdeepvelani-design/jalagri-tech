"use client";

/**
 * StickySidebarPin — pins the service-detail sidebar with GSAP ScrollTrigger.
 *
 * Why JS and not CSS: the theme runs ScrollSmoother (smooth: 2), which fakes
 * scrolling by putting a transform on #smooth-content. A transformed ancestor
 * disables CSS `position: sticky` entirely, so the theme's .sticky-style class
 * can never work. ScrollTrigger pinning is the GSAP-recommended, ScrollSmoother-
 * compatible way to keep the sidebar fixed while the left content scrolls.
 *
 * Reuses the GSAP + ScrollTrigger globals already loaded by the theme's
 * /scripts in layout.tsx — no new libraries. Polls briefly because this
 * component can mount before those afterInteractive scripts finish.
 */
import { useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
}

export default function StickySidebarPin() {
  useEffect(() => {
    let trigger: any;
    let timer: number;
    let tries = 0;

    const start = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const sidebar = document.querySelector<HTMLElement>(
        ".service-details-sidebar"
      );
      const content = document.querySelector<HTMLElement>(
        ".service-details-content"
      );

      // Wait for the theme scripts + DOM; give up after ~12s.
      if (!gsap || !ScrollTrigger || !sidebar || !content) {
        if (tries++ < 120) timer = window.setTimeout(start, 100);
        return;
      }

      // Only pin when the sidebar sits beside the content (lg and up).
      if (!window.matchMedia("(min-width: 992px)").matches) return;

      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: sidebar,
        start: "top 70px",
        // Pin for exactly the height difference so the sidebar releases
        // right as the content column ends.
        end: () =>
          "+=" +
          Math.max(0, content.offsetHeight - sidebar.offsetHeight - 100),
        pin: sidebar,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.refresh();
    };

    // Delay so ScrollSmoother.create() in main.js runs first.
    timer = window.setTimeout(start, 600);

    return () => {
      window.clearTimeout(timer);
      if (trigger) trigger.kill();
    };
  }, []);

  return null;
}
