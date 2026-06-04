/**
 * Projects listing page (/projects) — matches project.html structure:
 *   Breadcrumb → ProjectGrid (6 cards + pagination)
 * Header + Footer come from layout.tsx.
 */
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProjectGridSection from "@/components/projects/ProjectGridSection";

export const metadata = {
  title: "Projects - Agriva",
  description: "Explore our portfolio of completed agriculture, irrigation, and landscape projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb title="Project" />
      <ProjectGridSection />
    </>
  );
}
