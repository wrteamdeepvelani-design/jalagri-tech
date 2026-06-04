/**
 * ServiceGridSection — theme markup from service.html lines 407-515.
 * Service One style: 3-col grid of .service-card-items-2.style-2 cards.
 * Each card has a tag row + image + title. Title link jumps to a topic
 * anchor (#topic-N) further down the same page — same anchor pattern as
 * ServiceCardsSection so categories can switch grid styles freely.
 */
import Link from "next/link";

type GridCard = {
  title: string;
  image: string;
  anchor: string;
  tags?: string[];
};

export default function ServiceGridSection({
  cards,
  defaultTags = ["Empowerment", "Agriculture", "Technology"],
}: {
  cards: GridCard[];
  defaultTags?: string[];
}) {
  return (
    <section className="service-section-4 section-padding fix">
      <div className="container">
        <div className="row g-4">
          {cards.map((c, i) => (
            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
              <div className="service-card-items-2 style-2">
                <div className="top-content">
                  <div className="tag-list">
                    {(c.tags ?? defaultTags).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="service-image">
                  <img src={c.image} alt={c.title} />
                </div>
                <h2>
                  <Link href={`#${c.anchor}`}>{c.title}</Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}