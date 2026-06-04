import Link from "next/link";

/**
 * SearchModal — static markup matching the theme's search popup exactly.
 * Open/close is handled by the theme's main.js (jQuery):
 *   - `$('.search_btn').click` adds `search-opened` to `.search_popup`
 *     and `search-popup-overlay-open` to `.search-popup-overlay`
 *   - `$('.search_close_btn, .search-popup-overlay').click` removes them
 *
 * Do NOT add React state here — main.js manages the classes via jQuery.
 */
export default function SearchModal() {
  return (
    <>
      <div className="search_popup">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="search_wrapper">
                <div className="search_top d-flex align-items-center">
                  <div className="search_logo">
                    <Link href="/">
                      <img src="/images/logo/white-logo.svg" alt="logo" />
                    </Link>
                  </div>
                  <div className="search_close">
                    <button
                      type="button"
                      className="search_close_btn"
                      aria-label="Close search"
                    >
                      <i className="fa-thin fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="search_form">
                  <form action="#">
                    <div className="search_input">
                      <input
                        className="search-input-field"
                        type="text"
                        placeholder="Type here to search..."
                      />
                      <span className="search-focus-border"></span>
                      <button type="submit" aria-label="Search">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.55 18.1C14.272 18.1 18.1 14.272 18.1 9.55C18.1 4.82797 14.272 1 9.55 1C4.82797 1 1 4.82797 1 9.55C1 14.272 4.82797 18.1 9.55 18.1Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19.0002 19.0002L17.2002 17.2002"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-popup-overlay bg-theme-2"></div>
    </>
  );
}
