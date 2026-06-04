import Link from "next/link";

/**
 * OffcanvasSidebar — static markup matching the theme's offcanvas exactly.
 * Open/close, mobile menu population, and link-click behavior are all
 * handled by the theme's main.js (jQuery + meanmenu plugin):
 *   - `$('.sidebar__toggle').click` adds `info-open` to `.offcanvas__info`
 *   - `$('.offcanvas__close, .offcanvas__overlay').click` removes it
 *   - `$('#mobile-menu').meanmenu({ meanMenuContainer: '.mobile-menu' })`
 *     clones the desktop nav into the empty `.mobile-menu` div below.
 *
 * Do NOT add React state here — main.js manages the classes via jQuery.
 */
export default function OffcanvasSidebar() {
  return (
    <>
      <div className="fix-area">
        <div className="offcanvas__info">
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    <img src="/images/logo/theme-logo.svg" alt="logo" />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button aria-label="Close menu">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <p className="text d-none d-xl-block">
                Nullam dignissim, ante scelerisque the is euismod fermentum odio
                sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean
                a imperdiet risus.
              </p>
              <div className="mobile-menu fix mb-3"></div>
              <div className="offcanvas__contact d-xl-block">
                <h4 className="d-xl-block">Contact Info</h4>
                <ul className="d-xl-block">
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2">
                      <i className="fal fa-map-marker-alt"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="#">Main Street, Melbourne, Australia</a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2 mr-15">
                      <i className="fal fa-envelope"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2 mr-15">
                      <i className="fal fa-clock"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="#">Mon-Friday, 09am - 05pm</a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon style-2 mr-15">
                      <i className="far fa-phone"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+11002345909">+1100 2345 909</a>
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
