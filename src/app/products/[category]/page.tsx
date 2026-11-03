/**
 * Product category page (/products/[category]) — one page per category in
 * src/data/products/products.json. The navbar "Products" dropdown and the
 * sitemap read the same JSON, so adding a category there wires everything.
 *
 * Category switching happens in place in ProductCategoryBrowser (no
 * navigation, no scroll jump).
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/components/products/ProductCard";
import ProductCategoryBrowser from "@/components/products/ProductCategoryBrowser";
import data from "@/data/products/products.json";

type Params = { category: string };

type Category = {
  slug: string;
  title: string;
  heroImage: string;
  intro: string;
  seo: { title: string; description: string; keywords: string };
  products: Product[];
};

const categories = data.categories as Category[];

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category } = await params;
  const content = categories.find((c) => c.slug === category);
  if (!content) return { title: "Page not found" };

  return {
    // The JSON title already carries the brand; bypass the root template.
    title: { absolute: content.seo.title },
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: { canonical: `/products/${category}` },
    openGraph: {
      type: "website",
      url: `/products/${category}`,
      title: content.seo.title,
      description: content.seo.description,
      images: [content.heroImage],
    },
  };
}

export default async function ProductCategoryPage(
  { params }: { params: Promise<Params> }
) {
  const { category } = await params;
  if (!categories.some((c) => c.slug === category)) notFound();

  return (
    <ProductCategoryBrowser
      initialSlug={category}
      categories={categories.map((c) => ({
        slug: c.slug,
        title: c.title,
        intro: c.intro,
        seoTitle: c.seo.title,
        products: c.products,
      }))}
    />
  );
}
