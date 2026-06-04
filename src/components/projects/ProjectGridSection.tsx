/**
 * ProjectGridSection — theme markup from project.html lines 407-488.
 * 6 project cards + pagination at bottom. Each card links to
 * /projects/{slug}. Editable content lives in src/data/projects/projects.json.
 */
import Link from "next/link";
import data from "@/data/projects/projects.json";

type Project = {
  slug: string;
  card: { tag: string; title: string; image: string };
};

export default function ProjectGridSection() {
  const projects = data.projects as Project[];
  const pagination = data.pagination;

  return (
    <section className="project-section-4 section-padding fix">
      <div className="container">
        <div className="row g-4">
          {projects.map((p) => (
            <div key={p.slug} className="col-xl-4 col-lg-6 col-md-6">
              <div className="project-card-items-4">
                <div className="project-image">
                  <img src={p.card.image} alt={p.card.title} />
                  <div className="content">
                    <p>{p.card.tag}</p>
                    <h2>
                      <Link href={`/projects/${p.slug}`}>{p.card.title}</Link>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="page-nav-wrap text-center">
          <ul>
            <li>
              <a className="page-numbers" href="#">
                <i className="fa-solid fa-arrow-up-left"></i>
              </a>
            </li>
            {pagination.pages.map((page) => (
              <li key={page} className={page === pagination.current ? "active" : ""}>
                <a className="page-numbers" href="#">{page}</a>
              </li>
            ))}
            <li>
              <a className="page-numbers" href="#">
                <i className="fa-solid fa-arrow-up-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
