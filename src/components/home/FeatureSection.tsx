/**
 * FeatureSection — theme markup from index.html lines 494-572. Content
 * comes from src/data/home/feature.json. Hover .active state and the
 * .tp_fade_anim entrance animation are wired by the theme's main.js.
 */
import featureData from "@/data/home/feature.json";

type Feature = {
  shape: string;
  icon: string;
  title: string;
  description: string;
  delay: string;
};

export default function FeatureSection() {
  const features = featureData.features as Feature[];

  return (
    <section className="feature-section-2 section-padding pb-0">
      <div className="container">
        <div className="row g-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="col-xl-4 col-lg-6 col-md-6 tp_fade_anim"
              data-delay={f.delay}
              data-fade-from="left"
            >
              <div className="feature-box-item-2">
                <div className="maize-shape">
                  <img src={f.shape} alt="img" />
                </div>
                <div className="masking-shape">
                  <img src="/images/home-2/mask.png" alt="img" />
                  <div className="masking-2">
                    <img src="/images/home-2/mask-2.png" alt="img" />
                  </div>
                  <div className="icon">
                    <img src={f.icon} alt="img" />
                  </div>
                </div>
                <div className="content">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
