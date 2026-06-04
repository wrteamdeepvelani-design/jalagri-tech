import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project. Without this, Next.js
  // walks up looking for a lockfile and picks the wrong directory (there's
  // a stray package-lock.json at C:\Deep\). See Next.js 16 turbopack.root docs.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
