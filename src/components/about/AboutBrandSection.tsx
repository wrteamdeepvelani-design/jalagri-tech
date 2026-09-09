/**
 * AboutBrandSection — client logo cards under an h2 title. Uses
 * .brand-section-3 (the about-page variant) with the same .brand-slider
 * Swiper wired by main.js.
 * Editable content lives in src/data/about/brand.json.
 */
import data from "@/data/about/brand.json";

type Client = { name: string; logo: string };

export default function AboutBrandSection() {
  const clients = data.clients as Client[];

  return (
    <div className="brand-section-3 section-padding fix pb-0">
      <div className="container">
        <h2>{data.title}</h2>
        <div className="swiper brand-slider">
          <div className="swiper-wrapper">
            {clients.map((client) => (
              <div key={client.name + client.logo} className="swiper-slide">
                <div className="client-card">
                  <div className="client-card__logo">
                    <img src={client.logo} alt={client.name} />
                  </div>
                  <p className="client-card__name">{client.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
