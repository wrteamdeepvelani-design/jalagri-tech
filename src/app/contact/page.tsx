/**
 * Contact page (/contact) — matches contact.html structure:
 *   Breadcrumb → ContactInfo → ContactForm (with Bhuj-Kutch Google Map) →
 *   DroneSpecification (drag gallery)
 * Header + Footer from layout.tsx. SEO metadata read from contact.json.
 */
import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import DroneSpecificationSection from "@/components/contact/DroneSpecificationSection";
import data from "@/data/contact/contact.json";

export const metadata: Metadata = {
  title: data.seo.title,
  description: data.seo.description,
  keywords: data.seo.keywords,
  openGraph: {
    title: data.seo.title,
    description: data.seo.description,
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb title="Contact" />
      <ContactInfoSection />
      <ContactFormSection />
      <DroneSpecificationSection />
    </>
  );
}
