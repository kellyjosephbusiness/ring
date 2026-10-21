import type { Metadata } from "next";

import { SITE } from "./site";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Site path, e.g. "/legal/mva"; becomes the canonical URL. */
  path: string;
  /** Blog posts are articles; every other page is a website page. */
  article?: {
    publishedTime: string;
    modifiedTime: string;
    section: string;
    tags: readonly string[];
  };
}

/** Title, description, canonical URL and social cards for one page. The share
 * image comes from the route's opengraph-image file. */
export function pageMetadata({ title, description, path, article }: PageMetadataInput): Metadata {
  const shared = { title, description, url: path, siteName: SITE.name, locale: SITE.locale };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...shared,
          type: "article",
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          section: article.section,
          tags: [...article.tags],
          authors: [SITE.name],
        }
      : { ...shared, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
