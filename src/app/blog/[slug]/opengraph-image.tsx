import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";
import { BLOG_TOPICS, POSTS, getPost } from "@/content/blog/posts";

export const alt = "A RingOnDemand blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Rendered at build time, one per page; other slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOgImage({
    eyebrow: post ? `Blog : ${BLOG_TOPICS[post.topic].label}` : "Blog",
    headline: [post?.title ?? "Pay-Per-Call Guides"],
    footer: post ? `${post.readingMinutes} min read` : undefined,
  });
}
