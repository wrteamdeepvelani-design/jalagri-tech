/**
 * WhatWeDoDetailSection — rich content for each topic. Reuses theme's
 * service-detail layout (.service-details-section) + sidebar pattern.
 * Each topic gets id={`topic-${i}`} so cards above can jump-scroll here.
 *
 * Sidebar uses .sticky-style helper (main.css:13787) — position:sticky,
 * top:100px so it follows scroll on long pages.
 */
import Link from "next/link";
import categoriesData from "@/data/what-we-do/categories.json";
import StickySidebarPin from "@/components/what-we-do/StickySidebarPin";

type Component = {
  name: string;
  description: string;
  bullets: string[];
  footer?: string;
};
type Spec = { label: string; value: string };
type Section = {
  title: string;
  intro?: string;
  list?: string[];
  components?: Component[];
  specs?: Spec[];
};
type Topic = {
  title: string;
  intro?: string[];
  highlight?: string;
  thumbnails?: string[];
  sections?: Section[];
  outro?: string;
};

export type WhatWeDoContent = {
  slug: string;
  title: string;
  heroImage: string;
  topics: Topic[];
};

type Category = { slug: string; title: string; available: boolean };

function splitInTwo<T>(items: T[]): [T[], T[]] {
  const half = Math.ceil(items.length / 2);
  return [items.slice(0, half), items.slice(half)];
}

export default function WhatWeDoDetailSection({
  content,
}: {
  content: WhatWeDoContent;
}) {
  const sidebar = categoriesData.sharedSidebar;
  const categories = categoriesData.categories as Category[];

  return (
    <section className="service-details-section fix section-padding">
      <StickySidebarPin />
      <div className="container">
        <div className="service-details-wrapper">
          <div className="service-top-img fix">
            <img data-speed=".8" src={content.heroImage} alt={content.title} />
          </div>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="service-details-content">
                {content.topics.map((topic, ti) => (
                  <div
                    key={ti}
                    id={`topic-${ti}`}
                    className={ti > 0 ? "mt-5 pt-4" : ""}
                  >
                    <h2>{topic.title}</h2>
                    {topic.intro?.map((para, i) => (
                      <p key={i} className={i === 0 ? "mt-3" : "mt-4"}>
                        {para}
                      </p>
                    ))}

                    {topic.highlight && (
                      <div className="hilight-text mt-4 mb-4">
                        <p>{topic.highlight}</p>
                        <div className="icon">
                          <i className="fa-solid fa-quote-right"></i>
                        </div>
                      </div>
                    )}

                    {topic.thumbnails && topic.thumbnails.length > 0 && (
                      <div className="row g-4 mt-4 mb-4">
                        {topic.thumbnails.map((src, i) => (
                          <div key={i} className="col-lg-6">
                            <div className="thumb">
                              {/* No data-speed here: the ScrollSmoother
                                  parallax sets inline transforms/height on the
                                  img and fights the fixed 300px thumb box,
                                  making the height track the source image.
                                  Plain img → CSS controls it, always 300px. */}
                              <img src={src} alt="img" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {topic.sections?.map((section, si) => (
                      <div key={si} className="mt-5">
                        <h3>{section.title}</h3>
                        {section.intro && <p className="mt-3">{section.intro}</p>}

                        {section.list && (
                          <div className="service-list-items mt-3">
                            {section.list.length >= 4
                              ? splitInTwo(section.list).map((col, ci) => (
                                  <ul key={ci}>
                                    {col.map((item, i) => (
                                      <li key={i}>
                                        <i className="fa-solid fa-circle-check"></i>
                                        {" "}{item}
                                      </li>
                                    ))}
                                  </ul>
                                ))
                              : (
                                  <ul>
                                    {section.list.map((item, i) => (
                                      <li key={i}>
                                        <i className="fa-solid fa-circle-check"></i>
                                        {" "}{item}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                          </div>
                        )}

                        {section.components && (
                          <div className="service-box-area mt-4">
                            <div className="row g-4">
                              {section.components.map((comp, i) => (
                                <div key={i} className="col-lg-6 col-md-6">
                                  <div className="service-box-items">
                                    <span className="number">
                                      {String(i + 1).padStart(2, "0")}.
                                    </span>
                                    <h4>{comp.name}</h4>
                                    <p>{comp.description}</p>
                                    {comp.bullets.length > 0 && (
                                      <div className="service-list-items mt-3">
                                        <ul>
                                          {comp.bullets.map((b, j) => (
                                            <li key={j}>
                                              <i className="fa-solid fa-circle-check"></i>
                                              {" "}{b}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {comp.footer && (
                                      <p className="mt-3">{comp.footer}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.specs && (
                          <ul className="information-list mt-3">
                            {section.specs.map((s, i) => (
                              <li key={i}>
                                <span>{s.label}:</span> {s.value}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {topic.outro && <p className="mt-4">{topic.outro}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="service-details-sidebar sticky-style">
                <div className="sidebar-widget">
                  <div className="sideber-title">
                    <h3 className="wow fadeInUp" data-wow-delay=".2s">
                      <i className="fa-solid fa-star"></i>
                      {" "}{sidebar.moreServicesTitle}
                    </h3>
                  </div>
                  <ul className="service-list-item wow fadeInUp" data-wow-delay=".4s">
                    {categories.map((cat) => {
                      const href = cat.available
                        ? `/what-we-do/${cat.slug}`
                        : "/contact";
                      return (
                        <li key={cat.slug}>
                          <Link href={href}>
                            <span>{cat.title}</span>
                            <span><i className="fa-solid fa-chevron-right"></i></span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}