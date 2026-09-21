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
  keywords: [
    "about jal agritech",
    "irrigation company Bhuj",
    "landscaping company Kutch",
    "agriculture company Gujarat",
    "jal agritech directors",
  ],
  alternates: { canonical: "/about" },
  title: "About Us",
  description:
    "Meet the team behind Jal Agritech India Pvt Ltd — 15+ years of irrigation, plantation and landscape delivery from Bhuj-Kutch across India.",
  openGraph: {
    type: "website",
    url: "/about",
    title: "About Us | Jal Agritech India Pvt Ltd",
    description:
      "Meet the team behind Jal Agritech India Pvt Ltd — 15+ years of irrigation, plantation and landscape delivery from Bhuj-Kutch across India.",
    // Declaring openGraph here overrides the root metadata, so the
    // site-wide social card has to be re-attached explicitly.
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb title="About us" />
      <AboutHeroSection />
      <CounterInnerSection />
      <OurHistorySection />
      <WorkProcessSection />
      <TeamSection />
      {/* <FaqInnerSection /> */}
      <AboutTestimonialSection />
      <AboutBrandSection />
      <AboutFeatureSection />
      <LetterImageSection />
    </>
  );
}
