/**
 * Blog listing page (/blog) — matches news-grid.html structure:
 *   Breadcrumb → BlogGrid (6 cards + pagination)
 * Header + Footer come from layout.tsx.
 */
import Breadcrumb from "@/components/shared/Breadcrumb";
import BlogGridSection from "@/components/blog/BlogGridSection";

export const metadata = {
  title: "Blog - Agriva",
  description: "Latest news, farming insights, and stories from the field.",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb title="Blog Grid" />
      <BlogGridSection />
    </>
  );
}
