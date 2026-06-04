/**
 * NewsSection — theme markup from index.html lines 1186-1293. Editable
 * content lives in src/data/home/news.json. `colMod` adds slide-in
 * direction modifiers (item_right_1 / item_left_1) used by main.js.
 */
import data from "@/data/home/news.json";

type Article = {
  image: string;
  title: string;
  description: string;
  date: string;
  comments: string;
  href: string;
  colMod: string;
};

export default function NewsSection() {
  const articles = data.articles as Article[];

  return (
    <section className="news-section-2 section-padding fix">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title-2">
            <img src={data.eyebrow.icon} alt="img" /> {data.eyebrow.text}
            <img src={data.eyebrow.icon} alt="img" className="ms-2" />
          </span>
          <h2 className="text-anim">{data.headline}</h2>
        </div>
        <div className="row">
          {articles.map((a) => (
            <div
              key={a.image}
              className={`col-xl-4 col-lg-6 col-md-6${a.colMod ? " " + a.colMod : ""}`}
            >
              <div className="news-card-items-2">
                <div className="news-image">
                  <img src={a.image} alt="img" />
                  <a href={a.href} className="theme-btn-2">{data.readMoreLabel}</a>
                  <div className="news-content">
                    <h3>
                      <a href={a.href}>{a.title}</a>
                    </h3>
                    <p>{a.description}</p>
                    <div className="tag">
                      <span>
                        <i className="fa-regular fa-calendar"></i> {a.date}
                      </span>
                      <span>
                        <i className="fa-regular fa-comment"></i> {a.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
