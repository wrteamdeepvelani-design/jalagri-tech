/**
 * BlogDetailSection — theme markup from news-details.html lines 407-675.
 * Takes a single post object + pulls sharedSidebar / sharedComments from
 * blog.json. data-speed parallax wired by main.js (parallaxie). Bootstrap
 * sticky-style sidebar handled by main.css.
 */
import Link from "next/link";
import data from "@/data/blog/blog.json";

type Post = {
  slug: string;
  card: { title: string; image: string };
  detail: {
    heroImage: string;
    meta: { author: string; date: string; category: string };
    title: string;
    intro: string[];
    highlight: string;
    midParagraph: string;
    detailImages: string[];
    outro: string;
    tags: string[];
  };
};

export default function BlogDetailSection({ post }: { post: Post }) {
  const { detail } = post;
  const sidebar = data.sharedSidebar;
  const commentsBlock = data.sharedComments;
  const stars = Array.from({ length: commentsBlock.rating });

  return (
    <section className="news-details-section section-padding">
      <div className="container">
        <div className="news-details-area">
          <div className="row g-4">
            {/* Main column */}
            <div className="col-12 col-lg-8">
              <div className="blog-post-details">
                <div className="single-blog-post">
                  <div className="post-featured-thumb fix">
                    <img data-speed=".8" src={detail.heroImage} alt={detail.title} />
                  </div>
                  <div className="post-content">
                    <ul className="post-list d-flex align-items-center">
                      <li>
                        <i className="fa-regular fa-user"></i> {detail.meta.author}
                      </li>
                      <li>
                        <i className="fa-solid fa-calendar-days"></i> {detail.meta.date}
                      </li>
                      <li>
                        <i className="fa-solid fa-tag"></i> {detail.meta.category}
                      </li>
                    </ul>
                    <h2>{detail.title}</h2>
                    {detail.intro.map((p, i) => (
                      <p key={i} className={i === detail.intro.length - 1 ? "" : "mb-3"}>
                        {p}
                      </p>
                    ))}
                    <div className="hilight-text mt-4 mb-4">
                      <p>{detail.highlight}</p>
                      <div className="icon">
                        <i className="fa-solid fa-quote-right"></i>
                      </div>
                    </div>
                    <p className="mt-4 mb-5">{detail.midParagraph}</p>
                    <div className="row g-4">
                      {detail.detailImages.map((img) => (
                        <div key={img} className="col-lg-6">
                          <div className="details-image">
                            <img src={img} alt="img" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4">{detail.outro}</p>
                  </div>
                </div>

                <div className="row tag-share-wrap mt-4 mb-5">
                  <div className="col-lg-8 col-12">
                    <div className="tagcloud">
                      {detail.tags.map((tag) => (
                        <Link key={tag} href={`/blog/${post.slug}`}>{tag}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end">
                    <div className="social-share">
                      <span className="me-3">{data.shareLabel}</span>
                      {data.socialShare.map((s) => (
                        <a key={s.icon} href={s.href}>
                          <i className={`fab ${s.icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="comments-area">
                  <div className="comments-heading">
                    <h3>{commentsBlock.heading}</h3>
                  </div>
                  {commentsBlock.comments.map((c, i) => (
                    <div
                      key={i}
                      className={`blog-single-comment ${c.lastBorder ? "bb-none " : ""}d-flex gap-4 ${i === 0 ? "pt-4 pb-5" : "pt-5"}`}
                    >
                      <div className="image">
                        <img src={c.image} alt="image" />
                      </div>
                      <div className="content">
                        <div className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="con">
                            <h4>
                              <Link href={`/blog/${post.slug}`}>{c.name}</Link>
                            </h4>
                            <span>{c.date}</span>
                          </div>
                          <div className="star">
                            {stars.map((_, j) => (
                              <i key={j} className="fa-solid fa-star"></i>
                            ))}
                          </div>
                        </div>
                        <p className="mt-30 mb-4">{c.body}</p>
                        <Link href={`/blog/${post.slug}`} className="reply">
                          {c.replyLabel}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="comment-form-wrap">
                  <h3>{commentsBlock.form.title}</h3>
                  <form action="#" id="contact-form" method="POST">
                    <div className="row g-4">
                      {commentsBlock.form.fields.map((f) => (
                        <div key={f.id} className={f.col}>
                          <div className="form-clt">
                            {f.type === "textarea" ? (
                              <textarea
                                name={f.name}
                                id={f.id}
                                placeholder={f.placeholder}
                              />
                            ) : (
                              <input
                                type={f.type}
                                name={f.name}
                                id={f.id}
                                placeholder={f.placeholder}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="col-lg-6">
                        <button type="submit" className="theme-btn theme-btn-3">
                          {commentsBlock.form.submitLabel}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-12">
              <div className="main-sideber sticky-style">
                <div className="single-sideber-widget">
                  <div className="widget-title">
                    <h3>{sidebar.search.title}</h3>
                  </div>
                  <div className="search-widget">
                    <form action="#">
                      <input type="text" placeholder={sidebar.search.placeholder} />
                      <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </form>
                  </div>
                </div>
                <div className="single-sideber-widget">
                  <div className="widget-title">
                    <h3>{sidebar.categories.title}</h3>
                  </div>
                  <ul className="category-list">
                    {sidebar.categories.items.map((c) => (
                      <li key={c.label}>
                        <Link href={`/blog/${post.slug}`}>{c.label}</Link>
                        <span>{c.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="single-sideber-widget">
                  <div className="widget-title">
                    <h3>{sidebar.recentPosts.title}</h3>
                  </div>
                  <div className="recent-post-area">
                    {sidebar.recentPosts.items.map((r, i) => (
                      <div key={i} className="recent-items">
                        <div className="recent-thumb">
                          <img src={r.image} alt="img" />
                        </div>
                        <div className="recent-content">
                          <h4>
                            <Link href={`/blog/${post.slug}`}>{r.title}</Link>
                          </h4>
                          <ul>
                            <li>{r.date}</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="single-sideber-widget mb-0">
                  <div className="widget-title">
                    <h3>{sidebar.popularTags.title}</h3>
                  </div>
                  <div className="tagcloud">
                    {sidebar.popularTags.tags.map((tag) => (
                      <Link key={tag} href={`/blog/${post.slug}`}>{tag}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
