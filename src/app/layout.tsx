import type { Metadata, Viewport } from "next";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  CONTACT,
} from "@/lib/site";
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
import Preloader from "@/components/shared/Preloader";
import CustomCursor from "@/components/shared/CustomCursor";
import BackToTop from "@/components/shared/BackToTop";
import ThemeReinit from "@/components/shared/ThemeReinit";

// Site-wide SEO constants live in src/lib/site.ts so metadata, sitemap,
// robots and JSON-LD can't drift apart. Override the host per environment
// with NEXT_PUBLIC_SITE_URL.
const pageTitle = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "jal agritech",
    "irrigation company Gujarat",
    "drip irrigation Kutch",
    "sprinkler irrigation",
    "rain gun irrigation",
    "landscaping contractor India",
    "vertical garden",
    "miyawaki forest plantation",
    "horticulture services",
    "turnkey irrigation projects",
    "agriculture solutions",
    "Bhuj",
    "Kutch",
    "Gujarat",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Agriculture",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
    title: pageTitle,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11a21b",
};

// Organization + LocalBusiness markup, emitted once on every page. Google
// reads this for the knowledge panel, the local pack and sitelinks.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Jal Agritech",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  telephone: CONTACT.phoneE164,
  email: CONTACT.email,
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.region,
    postalCode: CONTACT.postalCode,
    addressCountry: CONTACT.country,
  },
  areaServed: [
    { "@type": "State", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "Drip irrigation",
    "Sprinkler and rain gun irrigation",
    "Landscape design and execution",
    "Miyawaki afforestation",
    "Vertical gardens",
    "Nursery and plant supply",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      "Irrigation & Landscaping",
      "Services",
      "Maintenance",
      "Outlets & Nurseries",
      "Manufacturing",
      "Trading",
    ].map((name, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Preloader />
        <ThemeReinit />
        <BackToTop />
        <CustomCursor />
        <OffcanvasSidebar />
        <Header />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <Footer />
          </div>
        </div>

        {/* DOMContentLoaded shim — main.js wraps GSAP ScrollTrigger inits in
            DOMContentLoaded listeners. With strategy="afterInteractive" that
            event has already fired, so those callbacks never run. This shim
            patches Document.prototype.addEventListener so any
            DOMContentLoaded registration that happens after the event has
            fired is immediately scheduled via setTimeout. */}
        <Script id="dcl-shim" strategy="beforeInteractive">{`
          (function(){
            var _add = Document.prototype.addEventListener;
            Document.prototype.addEventListener = function(type, fn, opts) {
              if (type === 'DOMContentLoaded' && this.readyState !== 'loading') {
                setTimeout(fn, 0); return;
              }
              return _add.call(this, type, fn, opts);
            };
          })();
        `}</Script>

        {/* Theme scripts — load after page interactive, in the exact same
            order as the original index.html so plugin dependencies resolve. */}
        {themeScripts.map((src) => (
          <Script key={src} src={src} strategy="afterInteractive" />
        ))}
      </body>
    </html>
  );
}
