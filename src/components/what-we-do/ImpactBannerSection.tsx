/**
 * ImpactBannerSection — service-2.html lines 551-589.
 * .our-imapact-section bg-cover banner with title + N counter items.
 * .count animations via jquery.counterup (wired by main.js).
 */
type Impact = {
  background: string;
  title: string;
  items: { icon: string; label: string; value: string; delay: string }[];
};

export default function ImpactBannerSection({ impact }: { impact: Impact }) {
  return (
    <section
      className="our-imapact-section section-padding fix bg-cover"
      style={{ backgroundImage: `url(${impact.background})` }}
    >
      <div className="container">
        <div className="our-impact-wrapper">
          <h2 className="wow fadeInUp" data-wow-delay=".2s">
            {impact.title.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <div className="imapct-item">
            {impact.items.map((item, i) => (
              <div
                key={i}
                className="icon-items wow fadeInUp"
                data-wow-delay={item.delay}
              >
                <div className="icon">
                  <img src={item.icon} alt="img" />
                </div>
                <div className="content">
                  <h3>{item.label}</h3>
                  <h4>
                    <span className="count">{item.value}</span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}