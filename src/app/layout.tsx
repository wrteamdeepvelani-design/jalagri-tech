import type { Metadata } from "next";
import Script from "next/script";

// CSS load order — matches the original index.html exactly.
// Theme assets are vendored verbatim in src/app/styles/.
import "./styles/bootstrap.min.css";
import "./styles/all.min.css";          // FontAwesome
import "./styles/animate.css";
import "./styles/magnific-popup.css";
import "./styles/meanmenu.css";
import "./styles/swiper-bundle.min.css";
import "./styles/nice-select.css";
import "./styles/main.css";             // Theme styles

// globals.css loads LAST — Tailwind utilities + project overrides
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OffcanvasSidebar from "@/components/layout/OffcanvasSidebar";
import SearchModal from "@/components/layout/SearchModal";
import Preloader from "@/components/shared/Preloader";
import CustomCursor from "@/components/shared/CustomCursor";
import BackToTop from "@/components/shared/BackToTop";

export const metadata: Metadata = {
  title: "Agriva - Agriculture Organic Farm",
  description: "Agriva - Agriculture Farming HTML Template",
};

// JS load order — matches index.html exactly. All files vendored at
// public/scripts/ from the original theme zip. The theme's main.js
// (last) initializes meanmenu, magnificPopup, counterUp, WOW, niceSelect,
// parallaxie, sticky header, offcanvas open/close, search modal, and all
// GSAP ScrollSmoother/ScrollTrigger/SplitText animations.
const themeScripts = [
  "/scripts/jquery-3.7.1.min.js",
  "/scripts/viewport.jquery.js",
  "/scripts/bootstrap.bundle.min.js",
  "/scripts/gsap.min.js",
  "/scripts/ScrollTrigger.min.js",
  "/scripts/ScrollSmoother.min.js",
  "/scripts/ScrollToPlugin.min.js",
  "/scripts/SplitText.min.js",
  "/scripts/TextPlugin.js",
  "/scripts/chroma.min.js",
  "/scripts/jquery.nice-select.min.js",
  "/scripts/jquery.waypoints.js",
  "/scripts/jquery.counterup.min.js",
  "/scripts/swiper-bundle.min.js",
  "/scripts/jquery.meanmenu.min.js",
  "/scripts/parallaxie.js",
  "/scripts/jquery.magnific-popup.min.js",
  "/scripts/wow.min.js",
  "/scripts/main.js",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Preloader />
        <BackToTop />
        <CustomCursor />
        <OffcanvasSidebar />
        <Header />
        <SearchModal />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <Footer />
          </div>
        </div>

        {/* Theme scripts — load after page interactive, in the exact same
            order as the original index.html so plugin dependencies resolve. */}
        {themeScripts.map((src) => (
          <Script key={src} src={src} strategy="afterInteractive" />
        ))}
      </body>
    </html>
  );
}
