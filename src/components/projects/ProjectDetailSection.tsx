/**
 * ProjectDetailSection — theme markup from project-details.html lines 407-468.
 * Takes a single project object and renders the full detail body:
 * hero image + main content with 2 thumbnails + sub-sections + info sidebar.
 * data-speed=".8" enables parallax via main.js (parallaxie plugin).
 */
type SubSection = { title: string; paragraph: string };
type InfoItem = { label: string; value: string };

type ProjectDetail = {
  heroImage: string;
  title: string;
  intro: string[];
  thumbnails: string[];
  midParagraph: string;
  subSections: SubSection[];
  info: {
    title: string;
    items: InfoItem[];
  };
};

type Project = {
  slug: string;
  card: { tag: string; title: string; image: string };
  detail: ProjectDetail;
};

export default function ProjectDetailSection({ project }: { project: Project }) {
  const { detail } = project;

  return (
    <section className="project-details section-padding fix">
      <div className="container">
        <div className="project-details-wrapper">
          <div className="row">
            <div className="col-xl-12">
              <div className="project-details-image">
                <img data-speed=".8" src={detail.heroImage} alt={project.card.title} />
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-8 col-12">
              <div className="project-details-content">
                <h2>{detail.title}</h2>
                <p>{detail.intro[0]}</p>
                {detail.intro[1] && (
                  <p className="mt-3 mb-4">{detail.intro[1]}</p>
                )}
                <div className="row g-4">
                  {detail.thumbnails.map((src, i) => (
                    <div key={i} className="col-lg-6">
                      <div className="thumb">
                        <img data-speed=".8" src={src} alt="img" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 mb-4">{detail.midParagraph}</p>
                {detail.subSections.map((s, i) => (
                  <div key={i}>
                    <h3>{s.title}</h3>
                    <p className={i === detail.subSections.length - 1 ? "mt-3" : "mt-3 mb-4"}>
                      {s.paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="project-information">
                <h3>{detail.info.title}</h3>
                <ul className="information-list">
                  {detail.info.items.map((item, i) => (
                    <li key={i}>
                      <span>{item.label}</span> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
