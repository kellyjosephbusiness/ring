import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/** Standard security headers on every response, the ones enterprise buyers'
 * security scanners look for. HSTS is already set by Vercel. */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

/** Blog posts are MDX (src/content/blog). Plugins are named as strings so
 * Turbopack can load them: GitHub tables, and ids on headings for deep links. */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
