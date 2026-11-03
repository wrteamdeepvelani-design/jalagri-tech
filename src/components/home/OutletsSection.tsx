/**
 * OutletsSection — the five retail outlets and nurseries. Moved here from the
 * former /what-we-do/outlets page. Content lives in src/data/home/outlets.json.
 * The section id lets the footer link straight to it (/#outlets).
 */
import data from "@/data/home/outlets.json";

type Outlet = {
  name: string;
  location: string;
  image: string;
  description: string;
};

export default function OutletsSection() {
  const outlets = data.outlets as Outlet[];

  return (
    <section id="outlets" className="outlet-section section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title-2">
            <img src={data.eyebrow.icon} alt="img" /> {data.eyebrow.text}
            <img src={data.eyebrow.icon} alt="img" className="ms-2" />
          </span>
          <h2 className="text-anim">
            {data.headline.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className="outlet-section__intro">{data.intro}</p>
        </div>

        <div className="row g-4 justify-content-center">
          {outlets.map((o) => (
            <div key={o.name} className="col-xl-4 col-lg-6 col-md-6">
              <div className="outlet-card">
                <div className="outlet-card__image">
                  <img src={o.image} alt={`${o.name}, ${o.location}`} loading="lazy" />
                </div>
                <div className="outlet-card__body">
                  <span className="outlet-card__location">
                    <i className="fa-solid fa-location-dot"></i> {o.location}
                  </span>
                  <h3>{o.name}</h3>
                  <p>{o.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
