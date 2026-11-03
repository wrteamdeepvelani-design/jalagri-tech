"use client";

import { useEffect, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard, { type Product } from "@/components/products/ProductCard";

/**
 * ProductCategoryBrowser — the body of /products/[category]. Category pills
 * switch in place: no page navigation, no scroll jump, no theme re-init. The
 * URL still updates (history.pushState, which Next.js syncs to usePathname),
 * so each category keeps a shareable address and Back/Forward work. Every
 * category URL is also prerendered for direct visits and search engines.
 */

export type BrowserCategory = {
  slug: string;
  title: string;
  intro: string;
  seoTitle: string;
  products: Product[];
};

function slugFromPath(pathname: string | null) {
  return pathname?.match(/\/products\/([^/]+)/)?.[1];
}

export default function ProductCategoryBrowser({
  categories,
  initialSlug,
}: {
  categories: BrowserCategory[];
  initialSlug: string;
}) {
  const pathname = usePathname();
  const pathSlug = slugFromPath(pathname);
  const active =
    categories.find((c) => c.slug === pathSlug) ??
    categories.find((c) => c.slug === initialSlug)!;

  const select = (e: MouseEvent<HTMLAnchorElement>, c: BrowserCategory) => {
    // Let modified clicks (new tab/window) behave like normal links.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (c.slug === active.slug) return;
    window.history.pushState(null, "", `/products/${c.slug}/`);
  };

  // Keep the tab title in step with the category, including Back/Forward.
  useEffect(() => {
    document.title = active.seoTitle;
  }, [active.seoTitle]);

  return (
    <>
      <Breadcrumb
        title={active.title}
        items={[{ label: "Products", href: "#" }, { label: active.title }]}
      />

      <section className="product-section section-padding pb-0 fix">
        <div className="container">
          <div className="section-title text-center product-section__head">
            <span className="sub-title-2">
              <img src="/images/home-2/icon/04.svg" alt="img" /> our products
              <img src="/images/home-2/icon/04.svg" alt="img" className="ms-2" />
            </span>
            <h2>{active.title}</h2>
            <p>{active.intro}</p>
          </div>

          <nav className="product-section__tabs" aria-label="Product categories">
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`/products/${c.slug}/`}
                onClick={(e) => select(e, c)}
                className={c.slug === active.slug ? "is-active" : undefined}
                aria-current={c.slug === active.slug ? "page" : undefined}
              >
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="product-section section-padding pt-0 fix">
        <div className="container">
          {/* Keyed by category so each card's photo state starts fresh. */}
          <div key={active.slug} className="row g-4">
            {active.products.map((p) => (
              <div key={p.title} className="col-xl-4 col-lg-6 col-md-6">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
