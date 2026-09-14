/**
 * BrandSection — client logo cards (logo + client name) in the theme's
 * .brand-slider Swiper, which main.js initializes.
 * Editable content lives in src/data/home/brand.json.
 */
import data from "@/data/home/brand.json";

type Client = { name: string; logo: string; onDark?: boolean };

export default function BrandSection() {
  const clients = data.clients as Client[];

  return (
    <div className="brand-section-2 section-padding pt-0 fix">
      <div className="container">
        <div className="swiper brand-slider">
          <div className="swiper-wrapper">
            {clients.map((client) => (
              <div key={client.name + client.logo} className="swiper-slide">
                <div className="client-card">
                  <div
                    className={
                      "client-card__logo" +
                      (client.onDark ? " client-card__logo--on-dark" : "")
                    }
                  >
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
