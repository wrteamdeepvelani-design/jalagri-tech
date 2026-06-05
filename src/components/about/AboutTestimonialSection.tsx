/**
 * AboutTestimonialSection — theme markup from about.html lines 907-1004.
 * Editable content lives in src/data/about/testimonial.json.
 * .testimonial-slider-2 Swiper + .array-prev/next nav wired by main.js.
 */
import data from "@/data/about/testimonial.json";

type Testimonial = {
  image: string;
  name: string;
  role: string;
  quote: string;
};

export default function AboutTestimonialSection() {
  const testimonials = data.testimonials as Testimonial[];
  const stars = Array.from({ length: data.rating });

  return (
    <section className="testimonial-section-3 section-padding fix">
      <div className="cabage-shape">
        <img src={data.shape} alt="img" />
      </div>
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title-3">{data.eyebrow}</span>
          <h2 className="text-anim">{data.headline}</h2>
        </div>
        <div className="testimonial-wrapper-3">
          <div className="row g-4">
            <div className="col-lg-6">
              <div
                className="testimonial-bg-box bg-cover"
                style={{ backgroundImage: `url(${data.leftBox.background})` }}
              >
                <div
                  className="testimonial-man wow slideInUp"
                  data-wow-delay="100ms"
                  data-wow-duration="2500ms"
                >
                  
                </div>
                
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testimonial-box">
                <div className="swiper testimonial-slider-2">
                  <div className="swiper-wrapper">
                    {testimonials.map((t, i) => (
                      <div key={i} className="swiper-slide">
                        <div className="content">
                          <div className="info-item">
                            <div className="info-text">
                              {/* <div className="client-image">
                                <img src={t.image} alt="img" />
                              </div> */}
                              <h3>{t.name}</h3>
                              <span>{t.role}</span>
                            </div>
                            <div className="icon">
                              <img src={data.quoteIcon} alt="img" />
                            </div>
                          </div>
                          <p>{t.quote}</p>
                          <div className="star">
                            {stars.map((_, j) => (
                              <i key={j} className="fa-solid fa-star"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="arrow-button">
                  <button className="array-prev">
                    <img src={data.arrows.prev} alt="img" />
                  </button>
                  <button className="array-next">
                    <img src={data.arrows.next} alt="img" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
