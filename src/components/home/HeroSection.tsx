/**
 * HeroSection — theme markup from index.html lines 381-492. All copy and
 * imagery lives in src/data/home/hero.json so it can be edited without
 * touching JSX. The .hero-portfolio-revealing-slider behavior is wired
 * by the theme's main.js.
 */
import heroData from "@/data/home/hero.json";

type Cta = { label: string; href: string };
type Slide = {
  background: string;
  tagline: string;
  headline: string;
  subheadline: string;
  ctas: Cta[];
};

export default function HeroSection() {
  const slides = heroData.slides as Slide[];

  return (
    <section className="hero-section hero-2 fix">
      <div className="hero-portfolio-revealing-slider">
        <div className="hero-portfolio-revealing-slider-slides">
          {/* Video-background single hero — uses content from the first
              slide in hero.json. Swiper map() above kept commented for
              easy switch back if a slide carousel is needed later. */}
          <div className="hero-portfolio-revealing-slide s-active hero-video-active">
            <div className="hero-portfolio-revealing-slide-inner hero-video-slide">
              <video
                className="hero-video-bg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="/images/hero/herovideo.mp4" type="video/mp4" />
              </video>
              {/* <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div className="hero-portfolio-revealing-slide-content">
                      <div className="icon">
                        <img src="/images/home-2/icon/03.svg" alt="img" />
                      </div>
                      {slides[0].tagline && <span>{slides[0].tagline}</span>}
                      <h1 className="hero-portfolio-revealing-slide-heading">
                        {slides[0].headline}
                      </h1>
                      {slides[0].subheadline && <p>{slides[0].subheadline}</p>}
                      <div
                        className="hero-button"
                        data-animation="fadeInUp"
                        data-delay="1.5s"
                      >
                        {slides[0].ctas.map((cta, j) => (
                          <a
                            key={j}
                            href={cta.href}
                            className={`theme-btn-2${j > 0 ? " border-btn" : ""}`}
                          >
                            {cta.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* {slides.map((slide, i) => (
            <div
              key={i}
              className={`hero-portfolio-revealing-slide${i === 0 ? " s-active" : ""}`}
            >
              <div
                className="hero-portfolio-revealing-slide-inner bg-cover"
                data-background={slide.background}
                style={slide.background ? { backgroundImage: `url(${slide.background})` } : undefined}
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-9">
                      <div className="hero-portfolio-revealing-slide-content">
                        <div className="icon">
                          <img src="/images/home-2/icon/03.svg" alt="img" />
                        </div>
                        {slide.tagline && <span>{slide.tagline}</span>}
                        <h1 className="hero-portfolio-revealing-slide-heading">
                          {slide.headline}
                        </h1>
                        {slide.subheadline && <p>{slide.subheadline}</p>}
                        <div className="hero-button" data-animation="fadeInUp" data-delay="1.5s">
                          {slide.ctas.map((cta, j) => (
                            <a
                              key={j}
                              href={cta.href}
                              className={`theme-btn-2${j > 0 ? " border-btn" : ""}`}
                            >
                              {cta.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
        {/* <div className="hero-portfolio-revealing-slider-control">
          <img src="/images/home-2/icon/01.svg" alt="img" className="hero-portfolio-revealing-slider-control-line" />
        </div>
        <div className="hero-portfolio-revealing-slider-control hero-portfolio-revealing-slider-control-right m-right">
          <img src="/images/home-2/icon/12.svg" alt="img" className="hero-portfolio-revealing-slider-control-line" />
        </div> */}
      </div>
      <div className="hero-border-item">
        <div className="hero-bottom-item">
          <h2>{heroData.differentiators.title}</h2>
          <div className="hero-list">
            {heroData.differentiators.items.map((item) => (
              <span key={item}>
                <i className="fa-solid fa-circle-check"></i> {item}
              </span>
            ))}
          </div>
        </div>
        {/* <div className="pagi-item">
          <div className="dot-number">
            <span className="dot-num">
              <span>02</span>
            </span>
            <span className="dot-num">
              <span className="style-2">03</span>
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
