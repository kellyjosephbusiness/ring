import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostPage } from "@/components/sites/ringondemand/blog/post-page";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { BLOG_TOPICS, POSTS, getPost, postHref } from "@/content/blog/posts";

interface BlogPostRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  // Long post titles skip the brand suffix so search results show the title.
  const suffixed = `${post.title} | RingOnDemand`;
  return pageMetadata({
    title: suffixed.length <= 70 ? suffixed : post.title,
    description: post.description,
    path: postHref(post),
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: BLOG_TOPICS[post.topic].label,
      tags: post.tags,
      author: { name: post.author.name, url: post.author.linkedin },
    },
  });
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <PostPage post={post} />;
}
