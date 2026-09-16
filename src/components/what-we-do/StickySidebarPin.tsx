"use client";

/**
 * StickySidebarPin — keeps the service-detail sidebar in view by translating
 * it with GSAP ScrollTrigger as the content column scrolls.
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

      // Do NOT use ScrollTrigger's pin here. Pinning with pinSpacing:false
      // pulls the sidebar out of the flow, collapsing the row and leaving
      // ScrollSmoother's cached scroll length stale (dead space past the
      // footer); pinSpacing:true instead pads the page with the pin duration.
      // Refreshing on toggle fixes the height but reflows every trigger
      // mid-scroll, which flickers.
      //
      // Instead the sidebar stays in the flow at its natural height and is
      // simply translated as the content scrolls — visually identical, no
      // layout change, nothing to resync.
      const room = () =>
        Math.max(0, content.offsetHeight - sidebar.offsetHeight - 100);
      if (room() <= 0) return;

      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: content,
        start: "top 70px",
        end: () => "+=" + room(),
        invalidateOnRefresh: true,
        onUpdate: (self: any) => {
          gsap.set(sidebar, { y: self.progress * room() });
        },
        onRefresh: (self: any) => {
          gsap.set(sidebar, { y: self.progress * room() });
        },
      });
    };

    // Delay so ScrollSmoother.create() in main.js runs first.
    timer = window.setTimeout(start, 600);

    return () => {
      window.clearTimeout(timer);
      if (trigger) trigger.kill();
      const sidebar = document.querySelector<HTMLElement>(
        ".service-details-sidebar"
      );
      if (sidebar) window.gsap?.set(sidebar, { clearProps: "transform" });
    };
  }, []);

  return null;
}
