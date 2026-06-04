/**
 * OurHistorySection — theme markup from about.html lines 533-617.
 * Editable content lives in src/data/about/history.json.
 * Tab switching (data-bs-toggle="tab") wired by bootstrap.bundle.min.js.
 * Year-hover image swap (year-list h2[data-img] → #historyImage) is
 * handled by the theme's main.js.
 */
import data from "@/data/about/history.json";

type Year = { label: string; image: string };
type Tab = {
  id: string;
  label: string;
  active: boolean;
  title: string;
  paragraphs: string[];
};

export default function OurHistorySection() {
  const years = data.years as Year[];
  const tabs = data.tabs as Tab[];

  return (
    <section className="our-history-section-3 section-padding">
      <div className="cabage-shape float-bob-x">
        <img src={data.shape} alt="img" />
      </div>
      <div className="container custom-container">
        <div className="our-history-wrapper">
          <div className="history-image">
            <img src={data.defaultImage} alt="img" id="historyImage" />
            <div className="year-list">
              {years.map((y) => (
                <h2 key={y.label} data-img={y.image}>
                  {y.label}
                </h2>
              ))}
            </div>
          </div>

          <div className="our-history-content">
            <div className="section-title mb-0">
              <span className="sub-title-3">{data.eyebrow}</span>
              <h2 className="text-anim">
                {data.headline.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </div>
            <ul className="nav" role="tablist">
              {tabs.map((t) => (
                <li key={t.id} className="nav-item">
                  <a
                    href={`#${t.id}`}
                    data-bs-toggle="tab"
                    className={`nav-link${t.active ? " active" : ""}`}
                    aria-selected={t.active}
                    role="tab"
                    tabIndex={t.active ? 0 : -1}
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {tabs.map((t) => (
                <div
                  key={t.id}
                  id={t.id}
                  className={`tab-pane fade${t.active ? " active show" : ""}`}
                  role="tabpanel"
                >
                  <div className="content">
                    <h3>{t.title}</h3>
                    {t.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={i === t.paragraphs.length - 1 ? "mb-0" : ""}
                      >
                        {p}
                      </p>
                    ))}
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
