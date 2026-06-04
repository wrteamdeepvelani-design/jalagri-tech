/**
 * ServiceSection — theme markup from index.html lines 718-851. All editable
 * content lives in src/data/home/service.json. The .swiper.service-image-slider
 * carousel and .wt-about-title2 banner bounce are wired by the theme's main.js.
 */
import data from "@/data/home/service.json";

type ServiceCard = {
  image: string;
  title: string;
  delay: string;
  href?: string;
};

export default function ServiceSection() {
  const cards = data.cards as ServiceCard[];

  return (
    <section className="service-section-2 section-padding fix">
      <div className="mask-image wt-about-title2">
        <img src={data.bannerImage} alt="img" className="animated-img" />
      </div>
      <div className="container">
        <div className="row g-4">
          {/* Feature card */}
          <div
            className="col-xl-4 col-lg-6 col-md-6 tp_fade_anim"
            data-delay=".3"
            data-fade-from="left"
          >
            <div
              className="service-bg-item bg-cover"
              style={{ backgroundImage: `url(${data.feature.background})` }}
            >
              <div className="service-cont">
                <div className="section-title mb-0">
                  <span className="sub-title-2">
                    <img src={data.feature.eyebrow.icon} alt="img" /> {data.feature.eyebrow.text}
                  </span>
                  <h2 className="text-anim text-white">
                    {data.feature.headline.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>
                <a href={data.feature.cta.href} className="theme-btn-2">
                  {data.feature.cta.label}
                </a>
              </div>
            </div>
          </div>

          {/* Service cards */}
          {cards.map((c) => (
            <div
              key={c.title}
              className="col-xl-4 col-lg-6 col-md-6 tp_fade_anim"
              data-delay={c.delay}
              data-fade-from="left"
            >
              <div className="service-card-items-2">
                <div className="top-content">
                  <div className="tag-list">
                    {data.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p>{data.cardDescription}</p>
                </div>
                <div className="service-image">
                  <img src={c.image} alt="img" />
                </div>
                <h3>
                  <a href={c.href ?? data.cardLink}>{c.title}</a>
                </h3>
              </div>
            </div>
          ))}

          {/* Swiper carousel */}
          <div
            className="col-xl-4 col-lg-6 col-md-6 tp_fade_anim"
            data-delay={data.carousel.delay}
            data-fade-from="left"
          >
            <div className="service-image-item">
              <div className="swiper service-image-slider">
                <div className="swiper-wrapper">
                  {data.carousel.slides.map((src) => (
                    <div key={src} className="swiper-slide">
                      <div className="slider-thumb">
                        <img src={src} alt="img" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="swiper-dot4">
                <div className="dot2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
