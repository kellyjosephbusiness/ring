import type { MetadataRoute } from "next";

import { INSURANCE_LINES, insuranceLineHref } from "@/components/sites/ringondemand/insurance/insurance-lines";
import { PRACTICE_AREAS, practiceAreaHref } from "@/components/sites/ringondemand/legal/practice-areas";
import { ROUTES } from "@/components/sites/ringondemand/links";
import { absoluteUrl } from "@/components/sites/ringondemand/seo/site";
import { POSTS, postHref } from "@/content/blog/posts";

type Entry = MetadataRoute.Sitemap[number];

/** Every public page. MVA, the lead offer, ranks with the indexes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = POSTS.reduce((latest, post) => (post.updatedAt > latest ? post.updatedAt : latest), "");

  const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });

  return [
    page(ROUTES.home, 1, "weekly"),
    page(ROUTES.legal, 0.9),
    ...PRACTICE_AREAS.map((area) => page(practiceAreaHref(area), area.slug === "mva" ? 0.9 : 0.8)),
    page(ROUTES.insurance, 0.9),
    ...INSURANCE_LINES.map((line) => page(insuranceLineHref(line), 0.8)),
    page(ROUTES.partners, 0.8),
    page(ROUTES.results, 0.7),
    page(ROUTES.about, 0.6),
    page(ROUTES.contact, 0.6),
    page(ROUTES.privacy, 0.2, "yearly"),
    page(ROUTES.terms, 0.2, "yearly"),
    { ...page(ROUTES.blog, 0.7, "weekly"), ...(latestPost ? { lastModified: latestPost } : {}) },
    ...POSTS.map((post) => ({ ...page(postHref(post), 0.6), lastModified: post.updatedAt })),
  ];
}
