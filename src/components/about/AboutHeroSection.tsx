/**
 * AboutHeroSection — theme markup from about.html lines 407-492.
 * Editable content lives in src/data/about/about-hero.json.
 * .count → jquery.counterup, .text-anim → GSAP SplitText, .float-bob-y
 * → CSS keyframes. All wired by the theme assets in layout.tsx.
 */
import data from "@/data/about/about-hero.json";

type ImageItem = {
  src: string;
  counter?: { value: string; suffix: string; label: string };
};

type Cta = { label: string; href: string; className: string };

export default function AboutHeroSection() {
  const images = data.images as ImageItem[];
  const ctas = data.rightBox.ctas as Cta[];

  return (
    <section className="about-section-3 section-padding fix">
      <div className="chili-shape float-bob-y">
        <img src="/images/home-3/chili.png" alt="img" />
      </div>
      <div className="tree-shape float-bob-y">
        <img src="/images/home-3/about-shape-2.png" alt="img" />
      </div>
      <div className="container">
        <div className="about-wrapper-3">
          <div className="row g-4">
            <div className="col-xl-6 col-lg-7">
              <div className="about-content">
                <div className="section-title mb-0">
                  <span className="sub-title-3">{data.eyebrow}</span>
                  <h2 className="text-anim">
                    {data.headline.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                </div>
                <p className="text">{data.description}</p>
                <div className="about-image-item">
                  {images.map((img, i) => (
                    <div key={i} className="about-image">
                      <img src={img.src} alt="img" />
                      {img.counter && (
                        <div className="count-content">
                          <h2>
                            <span className="count">{img.counter.value}</span>
                            {img.counter.suffix}
                          </h2>
                          <p>{img.counter.label}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div
                className="about-box bg-cover"
                style={{ backgroundImage: `url(${data.rightBox.background})` }}
              >
                <div className="about-right-item">
                  <h3>{data.rightBox.title}</h3>
                  <div className="list-item">
                    {data.rightBox.columns.map((col, i) => (
                      <ul key={i} className="list">
                        {col.map((item) => (
                          <li key={item}>
                            <i className="fa-solid fa-circle-check"></i>
                            {" "}{item}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                  <div className="info-item">
                    <img src={data.rightBox.person.image} alt="img" />
                    <div className="content">
                      <h4>{data.rightBox.person.name}</h4>
                      <span>{data.rightBox.person.role}</span>
                    </div>
                  </div>
                  <div className="about-button wow fadeInUp" data-wow-delay=".3s">
                    {ctas.map((cta) => (
                      <a key={cta.label} href={cta.href} className={cta.className}>
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
    </section>
  );
}
