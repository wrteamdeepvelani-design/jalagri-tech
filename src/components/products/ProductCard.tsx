"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * ProductCard — one product with its photo gallery. All photos are stacked
 * in the frame, shown whole (contain) over a blurred copy, and cross-fade;
 * the thumbnails sit on the photo and switch it on hover (desktop) or tap
 * (touch). A product with no photos yet shows a placeholder.
 */

export type Product = {
  title: string;
  description: string;
  images: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const { title, description, images } = product;

  return (
    <article className="product-card">
      <div className="product-card__media">
        {images.length > 0 ? (
          <>
            {/* Blurred copy of the active photo fills the frame around it,
                so the photo itself can show in full without bare bars. */}
            <img
              src={images[active]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="product-card__backdrop"
            />
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === active ? title : ""}
                loading="lazy"
                className={"product-card__photo" + (i === active ? " is-active" : "")}
              />
            ))}
          </>
        ) : (
          <div className="product-card__placeholder">
            <i className="fa-solid fa-seedling" aria-hidden="true"></i>
            <span>Photo coming soon</span>
          </div>
        )}

        {images.length > 1 && (
          <>
            <span className="product-card__count">
              {active + 1} / {images.length}
            </span>
            <div className="product-card__thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === active ? "is-active" : undefined}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={`Show ${title} photo ${i + 1}`}
                  aria-pressed={i === active}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="product-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href="/contact" className="theme-btn product-card__cta">
          Enquire <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
    </article>
  );
}
