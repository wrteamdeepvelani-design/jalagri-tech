/**
 * WorkProcessSection — theme markup from about.html lines 619-677.
 * Editable content lives in src/data/about/process.json.
 * .tp_fade_anim entrance animation + .process-card hover effect wired
 * by the theme's main.js.
 */
import data from "@/data/about/process.json";

type Step = {
  number: string;
  icon: string;
  title: string;
  delay: string;
  modifier?: string;
};

export default function WorkProcessSection() {
  const steps = data.steps as Step[];

  return (
    <section
      className="work-process-section section-padding fix bg-cover"
      style={{ backgroundImage: `url(${data.background})` }}
    >
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title-3">{data.eyebrow}</span>
          <h2 className="section-title text-anim">{data.headline}</h2>
        </div>
        <div className="row">
          {steps.map((step) => (
            <div
              key={step.number}
              className="col-xl-3 col-lg-6 col-md-6 tp_fade_anim"
              data-delay={step.delay}
              data-fade-from="left"
            >
              <div className={`process-card${step.modifier ? " " + step.modifier : ""}`}>
                <div className="card-icon">
                  <img src={step.icon} alt="img" />
                  <span>{step.number}</span>
                </div>
                <h3 className="card-title">{step.title}</h3>
                <p className="card-description">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
