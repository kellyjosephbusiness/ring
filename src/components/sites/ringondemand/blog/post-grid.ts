import { Car, FileCheck2, HardHat, Radio, Scale, ShieldCheck, type LucideIcon } from "lucide-react";

import { formatPostDate, type BlogPost, type BlogTopic } from "@/content/blog/posts";

/** One icon per blog topic: the cover label and the cards' topic. */
export const TOPIC_ICONS: Record<BlogTopic, LucideIcon> = {
  mva: Car,
  "workers-comp": HardHat,
  legal: Scale,
  insurance: ShieldCheck,
  publishers: Radio,
  compliance: FileCheck2,
};

/** "Oct 21, 2026 · 5 min read". */
export function postMeta(post: BlogPost): string {
  return `${formatPostDate(post.publishedAt)} · ${post.readingMinutes} min read`;
}
