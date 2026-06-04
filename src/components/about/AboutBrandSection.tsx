/**
 * AboutBrandSection — theme markup from about.html lines 1006-1085.
 * Editable content lives in src/data/about/brand.json.
 * Uses .brand-section-3 (different from homepage's .brand-section-2) and
 * has an h2 title. .brand-slider Swiper wired by main.js.
 */
import data from "@/data/about/brand.json";

export default function AboutBrandSection() {
  const slides = data.slides as [string, string][];

  return (
    <div className="brand-section-3 section-padding fix pb-0">
      <div className="container">
        <h2>{data.title}</h2>
        <div className="swiper brand-slider">
          <div className="swiper-wrapper">
            {slides.map(([a, b]) => (
              <div key={a} className="swiper-slide">
                <div className="brand-box-1">
                  <span className="brand-img-1">
                    <img src={a} alt="img" />
                  </span>
                  <span className="brand-img-1">
                    <img src={b} alt="img" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
