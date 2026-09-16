/**
 * WhyChooseSection — theme markup from index.html lines 645-716. Editable
 * content lives in src/data/home/why-choose.json. Decorative shapes
 * (left/right/maize-3/circle) are kept inline since they're theme visuals,
 * not client content. .text-anim (GSAP SplitText), .wow fadeInUp (WOW.js),
 * and .float-bob-x/y (CSS keyframes) are all wired by the theme assets.
 */
import data from "@/data/home/why-choose.json";

type Box = {
  title: string;
  description: string;
  modifier?: string;
};

export default function WhyChooseSection() {
  const boxes = data.boxes as Box[];

  return (
    <section className="why-choose-us-section-2 section-padding fix theme-bg-2">
      <div className="container">
        <div className="why-choose-us-wrapper-2">
          <div className="row g-4">
            <div className="col-xl-6">
              <div className="why-choose-video">
                <video
                  src={data.video}
                  poster={data.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="why-choose-us-content">
                <div className="section-title mb-0">
                  <span className="sub-title-2 style-2">
                    <img src={data.eyebrow.icon} alt="img" /> {data.eyebrow.text}
                  </span>
                  <h2 className="text-anim">{data.headline}</h2>
                </div>
                <p className="text wow fadeInUp" data-wow-delay=".3s">
                  {data.description}
                </p>
                <div className="choose-us-box wow fadeInUp" data-wow-delay=".5s">
                  {boxes.map((box, i) => (
                    <div
                      key={i}
                      className={`content${box.modifier ? " " + box.modifier : ""}`}
                    >
                      <h3>{box.title}</h3>
                      <span>{box.description}</span>
                    </div>
                  ))}
                </div>
                <div className="choose-us-btn-item wow fadeInUp" data-wow-delay=".3s">
                  <a href={data.cta.href} className="theme-btn">
                    {data.cta.label}
                  </a>
                  <div className="icon-item">
                    <div className="icon">
                      <img src={data.contact.icon} alt="img" />
                    </div>
                    <div className="cont">
                      <h4>{data.contact.label}</h4>
                      <h5>
                        <a href={`tel:${data.contact.tel}`}>{data.contact.phone}</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
