/**
 * Manufacturing page (/manufacturing). All copy comes unchanged from
 * src/data/manufacturing/manufacturing.json (the former
 * /what-we-do/manufacturing content). Reading order:
 *   1. lead chapter (topic 0): title, its card summary and lead paragraph
 *      beside the two product photos; the remaining paragraphs in columns
 *   2. proof band — the statistics block on deep green
 *   3. chapters 2 and 3 side by side, each with its card summary
 *   4. the Fencing Solutions products (same data and cards as
 *      /products/fencing-solutions)
 * Each topic keeps its #topic-N anchor. `impact` stays in the JSON but is
 * not shown, as on the original page.
 */
import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProductCard, { type Product } from "@/components/products/ProductCard";
import data from "@/data/manufacturing/manufacturing.json";
import productData from "@/data/products/products.json";

const fencing = productData.categories.find((c) => c.slug === "fencing-solutions")!;

export const metadata: Metadata = {
  // The JSON title already carries the brand; bypass the root template.
  title: { absolute: data.seo.title },
  description: data.seo.description,
  keywords: data.seo.keywords,
  alternates: { canonical: "/manufacturing" },
  openGraph: {
    type: "website",
    url: "/manufacturing",
    title: data.seo.title,
    description: data.seo.description,
    images: [data.statistics.image],
  },
};

// counterUp (main.js) animates `.count`, but turns text like "ISO" into 0.
const isNumeric = (v: string) => /^[\d,.]+$/.test(v);

type Topic = (typeof data.topics)[number];

function ChapterHead({ index, topic }: { index: number; topic: Topic }) {
  return (
    <header className="mfg-head">
      <span className="mfg-head__num" aria-hidden="true">
        {data.cards[index]?.number}
      </span>
      <h2>{topic.title}</h2>
    </header>
  );
}

export default function ManufacturingPage() {
  const { cards, topics, statistics } = data;
  const [lead, ...pair] = topics;
  const [leadPara, ...morePara] = lead.intro;

  return (
    <div className="mfg">
      <Breadcrumb title={data.title} />

      {/* 1. Lead chapter */}
      <section id="topic-0" className="mfg-lead">
        <div className="container">
          <div className="mfg-lead__grid">
            <div className="mfg-lead__text">
              <ChapterHead index={0} topic={lead} />
              <p className="mfg-summary">{cards[0]?.description}</p>
              <p className="mfg-lead__para">{leadPara}</p>
            </div>
            {lead.thumbnails.length > 0 && (
              <div className="mfg-lead__media">
                {lead.thumbnails.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={lead.title}
                    className={i === 0 ? "mfg-lead__img-main" : "mfg-lead__img-inset"}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mfg-lead__more">
            {morePara.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Proof band */}
      <section className="mfg-proof">
        <div className="container">
          <div className="mfg-proof__grid">
            <div className="mfg-proof__image">
              <img src={statistics.image} alt={statistics.headline} loading="lazy" />
            </div>
            <div className="mfg-proof__content">
              <span className="mfg-proof__eyebrow">{statistics.eyebrow}</span>
              <h2>{statistics.headline}</h2>
              <p className="mfg-proof__lead">{statistics.description}</p>
              <dl className="mfg-proof__stats">
                {statistics.stats.map((s) => (
                  <div key={s.description} className="mfg-proof__stat">
                    <dt>
                      <span className={isNumeric(s.value) ? "count" : undefined}>
                        {s.value}
                      </span>
                      {s.suffix}
                    </dt>
                    <dd>{s.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chapters 2 and 3, side by side */}
      <section className="mfg-pair">
        <div className="container">
          <div className="mfg-pair__grid">
            {pair.map((topic, j) => {
              const i = j + 1;
              const [first, ...rest] = topic.intro;
              return (
                <article key={topic.title} id={`topic-${i}`} className="mfg-pair__item">
                  <ChapterHead index={i} topic={topic} />
                  <p className="mfg-summary">{cards[i]?.description}</p>
                  <p className="mfg-pair__first">{first}</p>
                  {rest.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Fencing Solutions products */}
      <section className="product-section mfg-products">
        <div className="container">
          <header className="mfg-products__head">
            <h2>{fencing.title}</h2>
            <p>{fencing.intro}</p>
          </header>
          <div className="row g-4">
            {(fencing.products as Product[]).map((p) => (
              <div key={p.title} className="col-xl-4 col-lg-6 col-md-6">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
