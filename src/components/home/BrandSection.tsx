/**
 * BrandSection — theme markup from index.html lines 1295-1373. Editable
 * content lives in src/data/home/brand.json. Each slide holds 2 logos.
 * The .swiper.brand-slider Swiper is initialized by main.js.
 */
import data from "@/data/home/brand.json";

export default function BrandSection() {
  const slides = data.slides as [string, string][];

  return (
    <div className="brand-section-2 section-padding pt-0 fix">
      <div className="container">
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
