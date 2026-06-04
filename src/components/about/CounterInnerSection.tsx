/**
 * CounterInnerSection — theme markup from about.html lines 494-531.
 * Editable content lives in src/data/about/counter.json.
 * .count animations via jquery.counterup. Float animations via main.css.
 */
import data from "@/data/about/counter.json";

type Stat = {
  value: string;
  suffix: string;
  description: string;
  modifier?: string;
};

export default function CounterInnerSection() {
  const stats = data.stats as Stat[];

  return (
    <div className="counter-inner-section fix">
      <div className="chili-shape float-bob-y">
        <img src={data.shape} alt="img" />
      </div>
      <div className="container">
        <div className="counter-inner-wrapper">
          <div className="count-wrap">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`count-item-2${s.modifier ? " " + s.modifier : ""}`}
              >
                <h2>
                  <span className="count">{s.value}</span>
                  {s.suffix}
                </h2>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
          <div className="trac-wrap">
            <div className="tractor-image float-bob-x">
              <img src={data.tractorImage} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
