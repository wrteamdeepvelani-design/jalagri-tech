/**
 * Project detail page (/projects/[slug]) — Next.js 16 dynamic route.
 * Same pattern as services/[slug]:
 *   - generateStaticParams pre-builds every project route at build time
 *   - generateMetadata feeds per-project SEO from the JSON's seo field
 *   - Page renders Breadcrumb + ProjectDetailSection with the matched project
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProjectDetailSection from "@/components/projects/ProjectDetailSection";
import WorkGallerySection from "@/components/projects/WorkGallerySection";
import data from "@/data/projects/projects.json";

type Params = { slug: string };

export function generateStaticParams() {
  return data.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };

  return {
    // The JSON title already carries the brand; bypass the root template.
    title: { absolute: project.seo.title },
    description: project.seo.description,
    keywords: project.seo.keywords,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "website",
      url: `/projects/${slug}`,
      title: project.seo.title,
      description: project.seo.description,
      images: [project.card.image],
    },
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Breadcrumb
        title={project.detail.title}
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.detail.title },
        ]}
      />
      <ProjectDetailSection project={project} />
      <WorkGallerySection />
    </>
  );
}
