import { Car, Radio, Scale, ShieldCheck, type LucideIcon } from "lucide-react";

import { BLOG_TOPICS, formatPostDate, postHref, type BlogPost, type BlogTopic } from "@/content/blog/posts";

import type { LinkGridItem } from "../page-kit/link-grid";

const TOPIC_ICONS: Record<BlogTopic, LucideIcon> = {
  mva: Car,
  legal: Scale,
  insurance: ShieldCheck,
  publishers: Radio,
};

/** "Oct 21, 2026 · 5 min read". */
export function postMeta(post: BlogPost): string {
  return `${formatPostDate(post.publishedAt)} · ${post.readingMinutes} min read`;
}

/** A post as a cell in the page kit's link grid. */
export function postGridItem(post: BlogPost): LinkGridItem {
  return {
    href: postHref(post),
    icon: TOPIC_ICONS[post.topic],
    kicker: BLOG_TOPICS[post.topic].label,
    title: post.title,
    body: post.description,
    meta: postMeta(post),
    more: "Read the post",
  };
}
