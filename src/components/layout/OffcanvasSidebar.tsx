"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * OffcanvasSidebar — mobile slide-in panel.
 *
 * The mobile nav is rendered HERE in React (not cloned by meanmenu). The
 * theme originally let jquery.meanmenu clone the desktop #mobile-menu into
 * this panel, but that fought React hydration: meanmenu mutated the DOM,
 * then the client components re-rendered and clobbered it — leaving the
 * desktop nav visible and this panel empty at <=1199px. We replicate
 * meanmenu's exact DOM (.mean-container > .mean-bar > .mean-nav) so the
 * existing meanmenu.css styling applies unchanged, and drive the submenu +
 * close behavior with React.
 *
 * Open/close is still toggled by main.js (now delegated on document, so it
 * survives client re-renders): .sidebar__toggle adds .info-open /
 * .overlay-open; .offcanvas__close / .offcanvas__overlay remove them.
 */

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "What We Do",
    href: "#",
    submenu: [
      { label: "Irrigation and Landscaping", href: "/what-we-do/irrigation-and-landscaping" },
      { label: "Services", href: "/what-we-do/services" },
      { label: "Maintenance", href: "/what-we-do/maintenance" },
      { label: "Outlets", href: "/what-we-do/outlets" },
      { label: "Manufacturing", href: "/what-we-do/manufacturing" },
      { label: "Trading", href: "/what-we-do/trading" },
    ],
  },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

function closeOffcanvas() {
  document.querySelector(".offcanvas__info")?.classList.remove("info-open");
  document.querySelector(".offcanvas__overlay")?.classList.remove("overlay-open");
}

export default function OffcanvasSidebar() {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <>
      <div className="fix-area">
        <div className="offcanvas__info">
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/" onClick={closeOffcanvas}>
                    <img src="/images/logo/logo.png" alt="logo" />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button aria-label="Close menu">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>

              {/* Mobile navigation — mirrors meanmenu's DOM so meanmenu.css
                  styles it; submenu open/close handled by React state. */}
              <div className="mobile-menu mean-container fix mb-3">
                <div className="mean-bar">
                  <nav className="mean-nav" role="navigation">
                    <ul>
                      {navItems.map((item) =>
                        item.submenu ? (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.label}
                            </Link>
                            <a
                              className={`mean-expand${openSubmenu ? " mean-clicked" : ""}`}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenSubmenu((v) => !v);
                              }}
                            >
                              <i className="far fa-plus"></i>
                            </a>
                            <ul
                              className="submenu"
                              style={{ display: openSubmenu ? "block" : "none" }}
                            >
                              {item.submenu.map((sub) => (
                                <li key={sub.href}>
                                  <Link href={sub.href} onClick={closeOffcanvas}>
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={item.label}>
                            <Link href={item.href} onClick={closeOffcanvas}>
                              {item.label}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="offcanvas__contact d-xl-block">
                <h4 className="d-xl-block">Contact Info</h4>
                <ul className="d-xl-block">
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2">
                      <i className="fal fa-map-marker-alt"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a
                        href="https://maps.google.com/maps?q=34%2C+Time+Square+Empire%2C+Mirzapar+Road%2C+Bhuj+%E2%80%93+Kutch+370001%2C+Gujarat%2C+India"
                        target="_blank"
                        rel="noreferrer"
                      >
                        34, Time Square Empire, Mirzapar Road, Bhuj – Kutch 370001, Gujarat, India
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2 mr-15">
                      <i className="fal fa-envelope"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="mailto:jalagritechindiapvtltd@gmail.com">
                        jalagritechindiapvtltd@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2 mr-15">
                      <i className="far fa-phone"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+919879447395">+91 98794 47395</a>
                    </div>
                  </li>
                </ul>
                <div className="social-icon d-flex align-items-center style-2">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas__overlay"></div>
    </>
  );
}
