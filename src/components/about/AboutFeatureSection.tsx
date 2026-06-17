/**
 * AboutFeatureSection — theme markup from about.html lines 1087-1156.
 * Editable content lives in src/data/about/feature.json.
 * .feature-section + .inner-page modifier (different from homepage's
 * .feature-section-2). data-speed=".8" enables parallaxie scroll effect.
 */
import data from "@/data/about/feature.json";

type Feature = {
  image: string;
  icon: string;
  title: string;
  description: string;
  href: string;
};

export default function AboutFeatureSection() {
  const features = data.features as Feature[];

  return (
    <section className="feature-section section-padding fix pb-0">
      <div className="container">
        <div className="section-title text-center mx-auto">
          <span className="sub-title-3">{data.eyebrow}</span>
          <h2 className="text-anim">{data.heading}</h2>
          <p className="mt-3">{data.description}</p>
        </div>
        <div className="row g-4">
          {features.map((f) => (
            <div key={f.title} className="col-xl-4 col-lg-6 col-md-6">
              <div className="feature-card-item inner-page">
                <div className="feature-image">
                  <img data-speed=".8" src={f.image} alt="img" />
                  <div className="icon">
                    <img src={f.icon} alt="" />
                  </div>
                </div>
                <div className="content">
                  <h3>
                    <a href={f.href}>{f.title}</a>
                  </h3>
                  <p>{f.description}</p>
                  <a href={f.href} className="plus-icon style-theme">
                    <i className="fa-solid fa-plus"></i> <span>{data.readMoreLabel}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
