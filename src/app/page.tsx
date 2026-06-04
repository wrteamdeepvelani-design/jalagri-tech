/**
 * Home page — assembles all 10 homepage sections in the exact same order
 * as the original index.html (Maize Farming theme).
 *   Hero → Feature → About → WhyChoose → Service → Faq →
 *   Project → Testimonial → News → Brand
 * Header and Footer come from layout.tsx so they appear on every route.
 */
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import ServiceSection from "@/components/home/ServiceSection";
import FaqSection from "@/components/home/FaqSection";
import ProjectSection from "@/components/home/ProjectSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsSection from "@/components/home/NewsSection";
import BrandSection from "@/components/home/BrandSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <WhyChooseSection />
      <ServiceSection />
      {/* <FaqSection /> */}
      <ProjectSection />
      {/* <TestimonialSection /> */}
      {/* <NewsSection /> */}
      <BrandSection />
    </>
  );
}
