/**
 * Projects listing page (/projects) — matches project.html structure:
 *   Breadcrumb → ProjectGrid (6 cards + pagination)
 * Header + Footer come from layout.tsx.
 */
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProjectGridSection from "@/components/projects/ProjectGridSection";

export const metadata = {
  title: "Projects",
  description:
    "Explore our portfolio of completed agriculture, irrigation, and landscape projects.",
  openGraph: {
    title: "Projects | Jal Agritech India Pvt Ltd",
    description:
      "Explore our portfolio of completed agriculture, irrigation, and landscape projects.",
    // Declaring openGraph here overrides the root metadata, so the
    // site-wide social card has to be re-attached explicitly.
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb title="Project" />
      <ProjectGridSection />
    </>
  );
}
