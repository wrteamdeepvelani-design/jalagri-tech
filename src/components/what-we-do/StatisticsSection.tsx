/**
 * StatisticsSection — service-2.html lines 591-647.
 * Image left + content/percentage stats right. Stats render in rows of 2.
 * .count animations via counterup. .img-custom-anim-left via main.js.
 */
type Stat = { value: string; suffix: string; description: string };
type Statistics = {
  image: string;
  eyebrow: string;
  headline: string;
  description: string;
  stats: Stat[];
};

function chunk<T>(items: T[], n: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += n) rows.push(items.slice(i, i + n));
  return rows;
}

export default function StatisticsSection({
  statistics,
}: {
  statistics: Statistics;
}) {
  const rows = chunk(statistics.stats, 2);

  return (
    <section className="our-statistics-section section-padding fix section-bg-3">
      <div className="container">
        <div className="our-statistics-wrapper">
          <div className="row g-4">
            <div className="col-xl-6 col-lg-5">
              <div className="our-statistics-image wow img-custom-anim-left">
                <img src={statistics.image} alt="img" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="our-statistics-content">
                <div className="section-title mb-0">
                  <span className="sub-title-3">{statistics.eyebrow}</span>
                  <h2 className="text-anim">{statistics.headline}</h2>
                </div>
                <p>{statistics.description}</p>
                {rows.map((row, ri) => (
                  <div key={ri} className="our-statistics-card">
                    {row.map((s, si) => (
                      <div key={si} className="statistics-card">
                        <h3>
                          <span className="count">{s.value}</span>
                          {s.suffix}
                        </h3>
                        <p>{s.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}