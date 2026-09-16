/**
 * WorkGallerySection — shared "More of Our Work" strip shown on every project
 * detail page. Deliberately company-wide, not the photos of the project being
 * viewed, so it is labelled as such. Content: src/data/projects/gallery.json.
 *
 * Scrolls horizontally (CSS scroll-snap, no Swiper) and opens a lightbox on
 * click, so it does not depend on the theme's main.js.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import data from "@/data/projects/gallery.json";

type GalleryImage = { src: string; category: string; caption: string };

const ALL = "All";

export default function WorkGallerySection() {
  const allImages = data.images as GalleryImage[];
  const categories = [ALL, ...(data.categories as string[])];
  const [active, setActive] = useState(ALL);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openAt, setOpenAt] = useState<number | null>(null);

  const images =
    active === ALL ? allImages : allImages.filter((i) => i.category === active);

  /* ScrollSmoother puts a transform on #smooth-content, which makes
     position:fixed resolve against that element instead of the viewport — so
     the lightbox has to be portalled to <body> to cover the screen. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (openAt === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openAt]);

  const step = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const move = useCallback(
    (delta: number) =>
      setOpenAt((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openAt, move]);

  return (
    <section className="work-gallery section-padding pt-0">
      <div className="container">
        <div className="work-gallery__head">
          <div>
            <span className="work-gallery__eyebrow">{data.eyebrow}</span>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
          <div className="work-gallery__nav">
            <button type="button" onClick={() => step(-1)} aria-label="Scroll left">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Scroll right">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="work-gallery__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={cat === active ? "is-active" : ""}
              onClick={() => {
                setActive(cat);
                trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="work-gallery__track" ref={trackRef}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className="work-gallery__item"
              onClick={() => setOpenAt(i)}
              aria-label={`View ${img.caption}`}
            >
              <img src={img.src} alt={img.caption} loading="lazy" />
              <span>{img.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {mounted && openAt !== null && createPortal(
        <div className="work-gallery__lightbox" onClick={() => setOpenAt(null)} role="dialog">
          <button className="work-gallery__close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <button
            className="work-gallery__prev"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); move(-1); }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={images[openAt].src} alt={images[openAt].caption} />
            <figcaption>{images[openAt].caption}</figcaption>
          </figure>
          <button
            className="work-gallery__next"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); move(1); }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>,
        document.body
      )}
    </section>
  );
}
