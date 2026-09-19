/**
 * Blog listing page (/blog) — matches news-grid.html structure:
 *   Breadcrumb → BlogGrid (6 cards + pagination)
 * Header + Footer come from layout.tsx.
 */
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogGridSection from "@/components/blog/BlogGridSection";

export const metadata = {
  title: "Blog",
  description: "Latest news, farming insights, and stories from the field.",
  openGraph: {
    title: "Blog | Jal Agritech India Pvt Ltd",
    description: "Latest news, farming insights, and stories from the field.",
    // Declaring openGraph here overrides the root metadata, so the
    // site-wide social card has to be re-attached explicitly.
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb title="Blog Grid" />
      <BlogGridSection />
    </>
  );
}
