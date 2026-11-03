/**
 * Home page — assembles the homepage sections, based on the original
 * index.html (Maize Farming theme), with client logos laid over the hero
 * (HeroClients) and an Outlets section added:
 *   Hero → Feature → About → WhyChoose → Service → Outlets →
 *   Project
 * Header and Footer come from layout.tsx so they appear on every route.
 */
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ServiceSection from "@/components/home/ServiceSection";
import FaqSection from "@/components/home/FaqSection";
import OutletsSection from "@/components/home/OutletsSection";
import ProjectSection from "@/components/home/ProjectSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsSection from "@/components/home/NewsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <WhyChooseSection />
      <ServiceSection />
      {/* <FaqSection /> */}
      <OutletsSection />
      <ProjectSection />
      {/* <TestimonialSection /> */}
      {/* <NewsSection /> */}
    </>
  );
}
