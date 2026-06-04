/**
 * BlogGridSection — theme markup from news-grid.html lines 407-611.
 * 6-card grid (.news-card-items-2 .style-inner) + pagination.
 * Each card links to /blog/{slug}. WOW fadeInUp via WOW.js.
 */
import Link from "next/link";
import data from "@/data/blog/blog.json";

type Post = {
  slug: string;
  card: {
    title: string;
    image: string;
    date: string;
    comments: string;
    excerpt: string;
    delay: string;
  };
};

export default function BlogGridSection() {
  const posts = data.posts as Post[];
  const pagination = data.pagination;

  return (
    <section className="news-section-2 section-padding fix">
      <div className="container">
        <div className="row g-4">
          {posts.map((p) => (
            <div
              key={p.slug}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={p.card.delay}
            >
              <div className="news-card-items-2 style-inner">
                <div className="news-image">
                  <img src={p.card.image} alt={p.card.title} />
                  <Link href={`/blog/${p.slug}`} className="theme-btn theme-btn-3">
                    Read More
                  </Link>
                  <div className="news-content">
                    <h3>
                      <Link href={`/blog/${p.slug}`}>{p.card.title}</Link>
                    </h3>
                    <p>{p.card.excerpt}</p>
                    <div className="tag">
                      <span>
                        <i className="fa-regular fa-calendar"></i> {p.card.date}
                      </span>
                      <span>
                        <i className="fa-regular fa-comment"></i> {p.card.comments}
                      </span>
                    </div>
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
