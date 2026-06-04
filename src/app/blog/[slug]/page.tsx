/**
 * Blog detail page (/blog/[slug]) — Next.js 16 dynamic route.
 * Same pattern as services/[slug] and projects/[slug].
 *   - generateStaticParams pre-builds all 6 post routes at build time
 *   - generateMetadata feeds Next.js per-post SEO (title, description,
 *     keywords, OpenGraph) from each post's `seo` object in blog.json
 *   - Breadcrumb shows post title and links back to /blog
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogDetailSection from "@/components/blog/BlogDetailSection";
import data from "@/data/blog/blog.json";

type Params = { slug: string };

export function generateStaticParams() {
  return data.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = data.posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [post.card.image],
      type: "article",
    },
  };
}

export default async function BlogDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const post = data.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Breadcrumb
        title={post.detail.title}
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.detail.title },
        ]}
      />
      <BlogDetailSection post={post} />
    </>
  );
}
