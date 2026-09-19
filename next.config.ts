import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-host build: emits .next/standalone with a minimal server.js and only
  // the traced node_modules, so the site can run on any Node host without a
  // full `npm install`. Vercel ignores this setting.
  output: "standalone",
  // Pin Turbopack's workspace root to this project. Without this, Next.js
  // walks up looking for a lockfile and picks the wrong directory (there's
  // a stray package-lock.json at C:\Deep\). See Next.js 16 turbopack.root docs.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
