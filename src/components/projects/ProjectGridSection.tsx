/**
 * ProjectGridSection — theme markup from project.html lines 407-488.
 * Project cards + working pagination. Page size follows the grid columns
 * so every page fills whole rows: 9 on the 3-column layout, 6 below it.
 * Editable content lives in src/data/projects/projects.json.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import data from "@/data/projects/projects.json";

type Project = {
  slug: string;
  card: { tag: string; title: string; image: string };
};

const THREE_COLUMN_PER_PAGE = 9;
const COMPACT_PER_PAGE = 6;

function perPageForWidth(width: number) {
  return width >= 1200 ? THREE_COLUMN_PER_PAGE : COMPACT_PER_PAGE;
}

export default function ProjectGridSection() {
  const projects = data.projects as Project[];
  const [perPage, setPerPage] = useState(THREE_COLUMN_PER_PAGE);
  const [page, setPage] = useState(1);
  const pageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sync = () => setPerPage(perPageForWidth(window.innerWidth));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const visible = projects.slice(start, start + perPage);

  useEffect(() => {
    pageListRef.current
      ?.querySelector("li.active")
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [page, perPage]);

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 1), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="project-section-4 section-padding fix">
      <div className="container">
        <div className="row g-4">
          {visible.map((p) => (
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
        {totalPages > 1 && (
          <div className="page-nav-wrap text-center">
            <div className="page-nav-inner">
              <button
                type="button"
                className="page-numbers"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <i className="fa-solid fa-arrow-up-left"></i>
              </button>
              <ul ref={pageListRef}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <li key={n} className={n === currentPage ? "active" : ""}>
                    <button
                      type="button"
                      className="page-numbers"
                      onClick={() => goTo(n)}
                      aria-current={n === currentPage ? "page" : undefined}
                    >
                      {String(n).padStart(2, "0")}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="page-numbers"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <i className="fa-solid fa-arrow-up-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
