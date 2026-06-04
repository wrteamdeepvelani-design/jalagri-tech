/**
 * ServiceCardsSection — service-2.html lines 407-548.
 * 4-col grid of .service-box-items-3 cards (big number + icon + title +
 * description + Read More plus-icon). Each "Read More" jumps to a topic
 * anchor (#topic-N) further down the same page.
 */
type Card = {
  number: string;
  icon: string;
  title: string;
  description: string;
  anchor: string;
  animation: string;
  delay: string;
};

export default function ServiceCardsSection({ cards }: { cards: Card[] }) {
  return (
    <section className="service-section-4 section-padding fix">
      <div className="container">
        <div className="row g-4">
          {cards.map((c) => (
            <div
              key={c.number}
              className={`col-xl-3 col-lg-6 col-md-6 wow ${c.animation}`}
              data-wow-delay={c.delay}
            >
              <div className="service-box-items-3">
                <h2>{c.number}</h2>
                <div className="icon">
                  <img src={c.icon} alt="img" />
                </div>
                <h3>
                  <a href={`#${c.anchor}`}>{c.title}</a>
                </h3>
                <p>{c.description}</p>
                <a href={`#${c.anchor}`} className="plus-icon">
                  <i className="fa-solid fa-plus"></i> <span>Read More</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}