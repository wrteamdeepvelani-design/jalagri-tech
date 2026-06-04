/**
 * FaqSection — theme markup from index.html lines 853-995. Editable content
 * lives in src/data/home/faq.json. Bootstrap accordion (data-bs-toggle) is
 * wired by bootstrap.bundle.min.js. .progress-value bars + .text-anim by
 * main.js + GSAP. Last item gets `mb-0` automatically.
 */
import data from "@/data/home/faq.json";

type ProgressBar = {
  title: string;
  point: string;
  modifier?: string;
};

type Faq = {
  id: string;
  question: string;
  answer: string;
  delay: string;
  expanded: boolean;
};

export default function FaqSection() {
  const progressBars = data.progressBars as ProgressBar[];
  const faqs = data.faqs as Faq[];

  return (
    <section
      className="faq-section-2 section-padding fix bg-cover"
      style={{ backgroundImage: `url(${data.background})` }}
    >
      <div className="faq-shape float-bob-x">
        <img src={data.shape} alt="img" />
      </div>
      <div className="container">
        <div className="faq-wrapper-2">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="faq-content">
                <div className="section-title mb-0">
                  <span className="sub-title-2">
                    <img src={data.eyebrow.icon} alt="img" /> {data.eyebrow.text}
                  </span>
                  <h2 className="text-anim text-white">{data.headline}</h2>
                </div>
                <div className="progress-wrap">
                  {progressBars.map((p, i) => (
                    <div key={i} className="pro-items">
                      <div className="pro-head">
                        <h3 className="title">{p.title}</h3>
                        <span className="point">{p.point}</span>
                      </div>
                      <div className="progress">
                        <div
                          className={`progress-value${p.modifier ? " " + p.modifier : ""}`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-box">
                <div className="faq-items mt-0">
                  <div className="accordion" id="accordionExample">
                    {faqs.map((f, i) => (
                      <div
                        key={f.id}
                        className={`accordion-item${i === faqs.length - 1 ? " mb-0" : ""} wow fadeInUp`}
                        data-wow-delay={f.delay}
                      >
                        <h2 className="accordion-header" id={`heading${f.id}`}>
                          <button
                            className={`accordion-button${f.expanded ? "" : " collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${f.id}`}
                            aria-expanded={f.expanded}
                            aria-controls={`collapse${f.id}`}
                          >
                            {f.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse${f.id}`}
                          className={`accordion-collapse collapse${f.expanded ? " show" : ""}`}
                          aria-labelledby={`heading${f.id}`}
                          data-bs-parent="#accordionExample"
                          role="region"
                        >
                          <div className="accordion-body">
                            <p>{f.answer}</p>
                          </div>
                        </div>
                      </div>
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
