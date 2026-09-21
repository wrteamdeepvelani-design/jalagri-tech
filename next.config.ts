import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — `next build` writes a fully static site to out/ that can
  // be dropped on any host with no Node process. Every route in this project
  // is prerendered, so nothing is lost.
  output: "export",
  // Static hosts serve /about/ as a directory; emit about/index.html so the
  // URLs work without server rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  // Pin Turbopack's workspace root to this project. Without this, Next.js
  // walks up looking for a lockfile and picks the wrong directory (there's
  // a stray package-lock.json at C:\Deep\). See Next.js 16 turbopack.root docs.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
