"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header — static markup matching the theme. The theme's main.js handles:
 *   - sticky scroll (toggles `.sticky` on `#header-sticky` past 250px scroll)
 *   - offcanvas open (.sidebar__toggle click adds .info-open)
 *   - search modal open (.search_btn click adds .search-opened)
 *
 * Do NOT add React state for sticky/offcanvas/search — main.js handles via
 * jQuery class selectors. Pathname-based variant switching is React routing.
 */

const homeMenuItems = [
  { href: "/", img: "/images/header/home-1.jpg", title: "Maize Farming" },
  { href: "/home-2", img: "/images/header/home-2.jpg", title: "Agriculture Drone" },
  { href: "/home-3", img: "/images/header/home-3.jpg", title: "Tomato Farming" },
  { href: "/home-4", img: "/images/header/home-4.jpg", title: "Vegetable Farming" },
];

function NavMenu({ isInner }: { isInner: boolean }) {
  return (
    <div className="main-menu">
      <nav id="mobile-menu">
        <ul>
          {/* Home - desktop mega menu */}
          <li className="has-dropdown active menu-thumb">
            <Link href="/">Home</Link>
          </li>

          {/* Home - mobile only */}
          <li className="has-dropdown active d-xl-none">
            <Link href="/" className="border-none">Home</Link>
          </li>

          <li className="has-dropdown">
            <Link href="/about">About Us</Link>
          </li>

          <li className="has-dropdown">
            {/* "What We Do" is a non-routing parent — clicking just opens
                the dropdown. All 6 submenu items link to
                /what-we-do/[slug] dynamic routes powered by the JSONs in
                src/data/what-we-do/. Slugs MUST match the JSON filenames
                and categories.json `slug` field. */}
            <Link href="#" onClick={(e) => e.preventDefault()}>What We Do</Link>
            <ul className="submenu">
              <li><Link href="/what-we-do/irrigation-and-landscaping">Irrigation and Landscaping</Link></li>
              <li><Link href="/what-we-do/services">Services</Link></li>
              <li><Link href="/what-we-do/maintenance">Maintenance</Link></li>
              <li><Link href="/what-we-do/outlets">Outlets</Link></li>
              <li><Link href="/what-we-do/manufacturing">Manufacturing</Link></li>
              <li><Link href="/what-we-do/trading">Trading</Link></li>
            </ul>
          </li>

          <li className="has-dropdown">
            <Link href="/projects">Our Projects</Link>
          </li>

          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isInner = pathname !== "/";

  // .sticky class is added by main.js on scroll — don't manage here
  const headerClass = ["header-1", isInner ? "header-2" : ""]
    .filter(Boolean)
    .join(" ");

  /* ── Homepage layout ── */
  if (!isInner) {
    return (
      <header id="header-sticky" className={headerClass}>
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">

              <div className="header-left">
                <div className="logo">
                  <Link href="/" className="header-logo">
                    <img src="/images/logo/white-logo.svg" alt="Agriva" />
                  </Link>
                  <Link href="/" className="header-logo-2">
                    <img src="/images/logo/black-logo-2.svg" alt="Agriva" />
                  </Link>
                </div>
              </div>

              <div className="mean__menu-wrapper">
                <NavMenu isInner={false} />
              </div>

              <div className="header-right d-flex justify-content-end align-items-center">
                <div className="header-btn">
                  <span>
                    <i className="fa-solid fa-phone-volume"></i>
                    <a href="tel:+8801234567890">+880 1234 567890</a>
                  </span>
                  <div className="header-button">
                    <Link href="/contact" className="theme-btn-2 style-btns">
                      Get In Touch
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-none my-auto">
                    <div
                      className="sidebar__toggle"
                      role="button"
                      aria-label="Open menu"
                    >
                      <i className="fas fa-bars"></i>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    );
  }

  /* ── Inner page layout ── */
  return (
    <header id="header-sticky" className={headerClass}>
      <div className="container-fluid">
        <div className="mega-menu-wrapper">
          <div className="header-main header-inner">

            <div className="overlay-shape">
              <img src="/images/overlay-2.png" alt="" />
            </div>

            <div className="header-left">
              <div className="logo">
                <Link href="/" className="header-logo">
                  <img src="/images/logo/white-logo-2.svg" alt="Agriva" />
                </Link>
                <Link href="/" className="header-logo-2">
                  <img src="/images/logo/logo-5.svg" alt="Agriva" />
                </Link>
              </div>
            </div>

            <div className="header-right d-flex justify-content-end align-items-center">

              <div className="mean__menu-wrapper">
                <NavMenu isInner={true} />
              </div>

              <div className="icon-items">
                <div className="menu_search">
                  <button className="search_btn" aria-label="Search">
                    <i className="far fa-search"></i>
                  </button>
                </div>
                <Link href="/shop/cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </div>

              <div className="header-btn">
                <div className="header-button">
                  <Link href="/contact" className="theme-btn theme-btn-3">
                    Get In Touch
                  </Link>
                </div>
                <div className="header__hamburger my-auto">
                  <div
                    className="sidebar__toggle"
                    role="button"
                    aria-label="Open menu"
                  >
                    <i className="fa-regular fa-ellipsis"></i>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
