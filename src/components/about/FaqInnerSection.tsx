/**
 * FaqInnerSection — theme markup from about.html lines 783-905.
 * Editable content lives in src/data/about/faq.json.
 * Bootstrap accordion (data-bs-toggle="collapse") wired by bootstrap.bundle.min.js.
 * Last item gets `mb-0 border-none` automatically.
 */
import data from "@/data/about/faq.json";

type Faq = {
  id: string;
  question: string;
  answer: string;
  delay: string;
  expanded: boolean;
};

export default function FaqInnerSection() {
  const faqs = data.faqs as Faq[];

  return (
    <section className="faq-inner-section section-padding fix">
      <div className="faq-shape float-bob-y">
        <img src={data.shape} alt="img" />
      </div>
      <div className="container">
        <div className="faq-wrapper-3">
          <div className="row g-4">
            <div className="col-xl-6 col-lg-7">
              <div className="faq-box style-inner">
                <div className="faq-items mt-0">
                  <div className="accordion" id="accordionExample">
                    {faqs.map((f, i) => {
                      const isLast = i === faqs.length - 1;
                      return (
                        <div
                          key={f.id}
                          className={`accordion-item${isLast ? " mb-0 border-none" : ""} wow fadeInUp`}
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
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="faq-contentt">
                <div className="section-title mb-0">
                  <span className="sub-title-3">{data.eyebrow}</span>
                  <h2 className="text-anim">{data.headline}</h2>
                </div>
                <div className="faq-image-item">
                  {data.images.map((src, i) => (
                    <div key={src} className={`faq-image${i > 0 ? " style-2" : ""}`}>
                      <img src={src} alt="img" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
