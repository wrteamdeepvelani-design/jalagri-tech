/**
 * About page — assembles Breadcrumb + 10 sections in the exact same order
 * as the original about.html. Header and Footer come from layout.tsx so
 * they appear on every route.
 *   Breadcrumb → AboutHero → CounterInner → OurHistory → WorkProcess →
 *   Team → FaqInner → AboutTestimonial → AboutBrand → AboutFeature →
 *   LetterImage
 */
import Breadcrumb from "@/components/shared/Breadcrumb";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import CounterInnerSection from "@/components/about/CounterInnerSection";
import OurHistorySection from "@/components/about/OurHistorySection";
import WorkProcessSection from "@/components/about/WorkProcessSection";
import TeamSection from "@/components/about/TeamSection";
import FaqInnerSection from "@/components/about/FaqInnerSection";
import AboutTestimonialSection from "@/components/about/AboutTestimonialSection";
import AboutBrandSection from "@/components/about/AboutBrandSection";
import AboutFeatureSection from "@/components/about/AboutFeatureSection";
import LetterImageSection from "@/components/about/LetterImageSection";

export const metadata = {
  title: "About Us - Agriva",
  description: "Agriva - Agriculture Farming Template",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb title="About us" />
      <AboutHeroSection />
      <CounterInnerSection />
      <OurHistorySection />
      <WorkProcessSection />
      {/* <TeamSection /> */}
      {/* <FaqInnerSection /> */}
      <AboutTestimonialSection />
      <AboutBrandSection />
      <AboutFeatureSection />
      <LetterImageSection />
    </>
  );
}
