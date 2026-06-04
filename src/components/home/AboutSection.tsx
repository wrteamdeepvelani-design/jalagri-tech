/**
 * AboutSection — theme markup from index.html lines 574-643. Editable
 * content lives in src/data/home/about.json. The decorative shapes
 * (left/right/maize) are kept inline since they're theme visuals, not
 * client content. main.js + jquery.counterup animate .count values,
 * GSAP SplitText handles .text-anim, magnific-popup handles .video-popup.
 */
import aboutData from "@/data/home/about.json";

type Stat = {
  value: string;
  suffix: string;
  description: string;
  modifier?: string;
};

export default function AboutSection() {
  const stats = aboutData.stats as Stat[];

  return (
    <section className="about-section-2 section-padding fix pt-0">
      <div className="left-shape">
        <img src="/images/home-2/about-shape-1.png" alt="img" />
      </div>
      <div className="right-shape">
        <img src="/images/home-2/about-shape-2.png" alt="img" />
      </div>
      <div className="maize-shape float-bob-y">
        <img src="/images/features/feature-2.png" alt="img" />
      </div>
      <div className="maize-shape-2 float-bob-y">
        <img src="/images/features/feature-2.png" alt="img" />
      </div>
      <div className="container">
        <div className="section-title-area">
          <div className="section-title">
            <span className="sub-title-2">
              <img src={aboutData.eyebrow.icon} alt="img" /> {aboutData.eyebrow.text}
            </span>
            <h2 className="text-anim">
              {aboutData.headline.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <div className="content">
            <p>{aboutData.description}</p>
            <a href={aboutData.cta.href} className="link-btn-2">
              {aboutData.cta.label}
            </a>
          </div>
        </div>
        <div className="about-wrapper-2">
          <div className="count-wrap">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`count-item-2${s.modifier ? " " + s.modifier : ""}`}
              >
                <h2>
                  <span className="count">{s.value}</span>
                  {s.suffix}
                </h2>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="trac-wrap">
            <div className="tractor-image float-bob-x">
              <img src={aboutData.tractorImage} alt="img" />
            </div>
          </div>
          {/* <div className="paddy-image">
            <img src={aboutData.paddyImage} alt="img" />
            <a
              href={aboutData.videoUrl}
              className="video-btn video-popup ripple-2"
            >
              <i className="fa-solid fa-play"></i>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
