/**
 * What We Do detail page (/what-we-do/[slug]) — Next.js 16 dynamic route.
 *
 * Per-slug layout — each category renders a different mix of the available
 * blocks so no two pages look identical. The `layoutBySlug` map below is
 * the source of truth for which blocks render and in what order.
 *
 * Available blocks (all in src/components/what-we-do/):
 *   - cards   → ServiceCardsSection     (Service Two big-number cards)
 *   - grid    → ServiceGridSection      (Service One tag + image grid)
 *   - impact  → ImpactBannerSection     (bg-cover banner + counters)
 *   - stats   → StatisticsSection       (image + percentage stat cards)
 *   - detail  → WhatWeDoDetailSection   (rich topic content + sidebar)
 *   - mask    → MaskBannerSection       (animated text banner)
 *
 * Adding/replacing a category:
 *   1. categories.json — add slug with available: true
 *   2. src/data/what-we-do/{slug}.json mirroring an existing JSON
 *   3. Add import + content/SEO map entries + layout below
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ServiceCardsSection from "@/components/what-we-do/ServiceCardsSection";
import ServiceGridSection from "@/components/what-we-do/ServiceGridSection";
import ImpactBannerSection from "@/components/what-we-do/ImpactBannerSection";
import StatisticsSection from "@/components/what-we-do/StatisticsSection";
import MaskBannerSection from "@/components/what-we-do/MaskBannerSection";
import WhatWeDoDetailSection from "@/components/what-we-do/WhatWeDoDetailSection";
import categoriesData from "@/data/what-we-do/categories.json";

import irrigationData from "@/data/what-we-do/irrigation-and-landscaping.json";
import servicesData from "@/data/what-we-do/services.json";
import maintenanceData from "@/data/what-we-do/maintenance.json";
import outletsData from "@/data/what-we-do/outlets.json";
import manufacturingData from "@/data/what-we-do/manufacturing.json";
import tradingData from "@/data/what-we-do/trading.json";

type Params = { slug: string };

// Use a flexible content type — different blocks read different fields.
type AnyContent = Record<string, unknown> & {
  title: string;
  seo: { title: string; description: string; keywords: string };
};

const contentBySlug: Record<string, AnyContent> = {
  "irrigation-and-landscaping": irrigationData as unknown as AnyContent,
  "services":                   servicesData as unknown as AnyContent,
  "maintenance":                maintenanceData as unknown as AnyContent,
  "outlets":                    outletsData as unknown as AnyContent,
  "manufacturing":              manufacturingData as unknown as AnyContent,
  "trading":                    tradingData as unknown as AnyContent,
};

type Block = "cards" | "grid" | "impact" | "stats" | "detail" | "mask";

// Distinct layout per category — no two pages render the same block order.
const layoutBySlug: Record<string, Block[]> = {
  "irrigation-and-landscaping": ["cards",  "impact", "stats",  "detail"],
  "services":                   ["grid",                       "detail", "mask"],
  "maintenance":                [          "impact",           "detail", "stats"],
  "outlets":                    ["grid",                       "detail", "mask"],
  "manufacturing":              ["cards",            "stats",  "detail", "mask"],
  "trading":                    ["grid",   "impact",           "detail"],
};

export function generateStaticParams() {
  return categoriesData.categories
    .filter((c) => c.available)
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const content = contentBySlug[slug];
  if (!content) return { title: "Page not found" };

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
    },
  };
}

export default async function WhatWeDoDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const content = contentBySlug[slug];
  if (!content) notFound();
  const layout = layoutBySlug[slug] ?? ["detail"];

  return (
    <>
      <Breadcrumb
        title={content.title}
        items={[
          { label: "What We Do", href: "#" },
          { label: content.title },
        ]}
      />
      {layout.map((block, i) => {
        switch (block) {
          case "cards":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <ServiceCardsSection key={i} cards={(content as any).cards} />;
          case "grid":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <ServiceGridSection key={i} cards={(content as any).gridCards} />;
          case "impact":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <ImpactBannerSection key={i} impact={(content as any).impact} />;
          case "stats":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <StatisticsSection key={i} statistics={(content as any).statistics} />;
          case "detail":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <WhatWeDoDetailSection key={i} content={content as any} />;
          case "mask":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <MaskBannerSection key={i} image={(content as any).maskImage} />;
          default:
            return null;
        }
      })}
    </>
  );
}