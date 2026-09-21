/**
 * sitemap.xml — written to out/sitemap.xml at build time. Routes are read from
 * the same JSON the pages render from, so a new project or post appears here
 * automatically.
 */
import type { MetadataRoute } from "next";
import { url } from "@/lib/site";
import projects from "@/data/projects/projects.json";
import blog from "@/data/blog/blog.json";
import categories from "@/data/what-we-do/categories.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const top: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/blog"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const services = categories.categories.map((c: { slug: string }) => ({
    url: url(`/what-we-do/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const projectPages = projects.projects.map((p: { slug: string }) => ({
    url: url(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const posts = blog.posts.map((p: { slug: string }) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...top, ...services, ...projectPages, ...posts];
}
