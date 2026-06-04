export const SITE_NAME = "Agriva";
export const SITE_DESCRIPTION = "Fresh Organic Farm Products – Straight from Farm to Your Table";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  PROFILE: "/profile",
  LOGIN: "/login",
  REGISTER: "/register",
  CONTACT: "/contact",
  BLOG: "/blog",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
} as const;

export const IMAGE_PLACEHOLDER = "/images/placeholder.png";
