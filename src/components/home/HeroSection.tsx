/**
 * HeroSection — home page opener, in two parts:
 *   1. a deep-green band under the floating header carrying the client-logo
 *      strip (HeroClients);
 *   2. the hero itself, starting below the band: looping field video, the
 *      headline/subheadline/CTAs from the first slide in hero.json, and the
 *      "What Makes Us Different" points along the bottom.
 * Copy lives in src/data/home/hero.json. The theme's revealing-slider markup
 * is gone; its main.js init returns early when no slides exist.
 */
import heroData from "@/data/home/hero.json";
import HeroClients from "@/components/home/HeroClients";

type Cta = { label: string; href: string };
type Slide = {
  headline: string;
  subheadline: string;
  ctas: Cta[];
};

export default function HeroSection() {
  const slide = heroData.slides[0] as Slide;
  const { differentiators } = heroData;

  return (
    <section className="home-hero">
      <div className="home-hero__brands">
        <HeroClients />
      </div>

      <div className="home-hero__stage">
        <video
          className="home-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/images/hero/herovideo.mp4" type="video/mp4" />
        </video>

        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <h1>{slide.headline}</h1>
            <p>{slide.subheadline}</p>
            <div className="home-hero__ctas">
              {slide.ctas.map((cta, i) => (
                <a
                  key={cta.href + cta.label}
                  href={cta.href}
                  className={i === 0 ? "theme-btn-2" : "home-hero__ghost"}
                >
                  {cta.label}
                  {i === 0 && <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>}
                </a>
              ))}
            </div>
          </div>

          <div className="home-hero__points">
            <h2>{differentiators.title}</h2>
            <ul>
              {differentiators.items.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
