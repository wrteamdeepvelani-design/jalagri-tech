/**
 * TestimonialSection — theme markup from index.html lines 1084-1184. Editable
 * content lives in src/data/home/testimonial.json. .testimonial-slider Swiper
 * + .array-prev / .array-next nav are initialized by main.js.
 */
import data from "@/data/home/testimonial.json";

type Testimonial = {
  image: string;
  name: string;
  role: string;
  quote: string;
};

export default function TestimonialSection() {
  const testimonials = data.testimonials as Testimonial[];
  const stars = Array.from({ length: data.rating });

  return (
    <section
      className="testimonial-section-2 section-padding pt-0 fix bg-cover"
      style={{ backgroundImage: `url(${data.background})` }}
    >
      <div className="client-man">
        <img src={data.clientImage} alt="img" />
      </div>
      <div className="container">
        <div className="testimonial-top-item">
          <div className="section-title">
            <span className="sub-title-2">
              <img src={data.eyebrow.icon} alt="img" /> {data.eyebrow.text}
            </span>
            <h2 className="text-anim">
              {data.headline.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
          <div className="right-item">
            <div className="star">
              <img src={data.starImage} alt="img" />
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
        <div className="testimonial-wrapper-2">
          <div className="swiper testimonial-slider">
            <div className="swiper-wrapper">
              {testimonials.map((t) => (
                <div key={t.name} className="swiper-slide">
                  <div className="testimonial-card-item-2">
                    <div className="content">
                      <div className="client-image">
                        <img src={t.image} alt="img" />
                      </div>
                      <h3>{t.name}</h3>
                      <span>{t.role}</span>
                    </div>
                    <p>{t.quote}</p>
                    <div className="star">
                      {stars.map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
