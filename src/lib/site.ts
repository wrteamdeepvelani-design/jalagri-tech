/**
 * Single source of truth for site-wide SEO values. Everything that needs the
 * canonical host — metadata, sitemap, robots, JSON-LD — reads it from here so
 * a domain change is one edit (or one NEXT_PUBLIC_SITE_URL env var).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jalagri-tech.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Jal Agritech India Pvt Ltd";

export const SITE_TAGLINE = "Irrigation, Landscaping & Agriculture Solutions";

export const SITE_DESCRIPTION =
  "Jal Agritech India Pvt Ltd — 15+ years of turnkey irrigation, plantation, landscaping and agriculture solutions from Bhuj-Kutch, Gujarat, delivered across India.";

export const CONTACT = {
  phone: "+91 98794 47399",
  phoneE164: "+919879447399",
  whatsapp: "919879447399",
  email: "jalagritechindiapvtltd@gmail.com",
  street: "Bhuj-Kutch",
  city: "Bhuj",
  region: "Gujarat",
  postalCode: "370001",
  country: "IN",
};

/** Absolute URL for a route, with the trailing slash the export uses. */
export const url = (path = "/") => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean === "/" ? "/" : clean.replace(/\/?$/, "/");
  return `${SITE_URL}${withSlash}`;
};
