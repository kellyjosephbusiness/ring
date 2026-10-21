import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
