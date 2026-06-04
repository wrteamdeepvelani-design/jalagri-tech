/**
 * TeamSection — theme markup from about.html lines 679-781.
 * Editable content lives in src/data/about/team.json.
 * .team-slider Swiper + .array-prev / .array-next nav wired by main.js.
 */
import data from "@/data/about/team.json";

type Social = { icon: string; href: string };
type Member = {
  image: string;
  name: string;
  role: string;
  href: string;
  socials: Social[];
};

export default function TeamSection() {
  const members = data.members as Member[];

  return (
    <section
      className="team-section section-padding fix bg-cover"
      style={{ backgroundImage: `url(${data.background})` }}
    >
      <div className="container">
        <div className="section-title-area mb-0">
          <div className="section-title mb-0">
            <span className="sub-title-3">{data.eyebrow}</span>
            <h2 className="text-anim text-white">
              {data.headline.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
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
        <div className="swiper team-slider">
          <div className="swiper-wrapper">
            {members.map((m, i) => (
              <div key={i} className="swiper-slide">
                <div className="team-card-item">
                  <div className="team-image">
                    <img src={m.image} alt="img" />
                    <div className="social-icon">
                      {m.socials.map((s) => (
                        <a key={s.icon} href={s.href}>
                          <i className={`fa-brands ${s.icon}`}></i>
                        </a>
                      ))}
                    </div>
                    <div className="team-content">
                      <h3>
                        <a href={m.href}>{m.name}</a>
                      </h3>
                      <p>{m.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
