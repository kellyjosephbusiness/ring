import { BLOG_TOPICS, postHref, type BlogPost } from "@/content/blog/posts";

import { ORGANIZATION_ID } from "../seo/schema";
import { SITE, absoluteUrl } from "../seo/site";

const BLOG_ID = `${SITE.url}/blog#blog`;

const AUTHOR = { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE.name, url: absoluteUrl("/") };

/** One post, as BlogPosting. */
export function blogPosting(post: BlogPost): Record<string, unknown> {
  const url = absoluteUrl(postHref(post));
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`${postHref(post)}/opengraph-image`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-US",
    articleSection: BLOG_TOPICS[post.topic].label,
    keywords: post.tags.join(", "),
    author: AUTHOR,
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": BLOG_ID },
  };
}

/** The blog index, as a Blog listing every post. */
export function blogListing(posts: readonly BlogPost[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": BLOG_ID,
    name: `${SITE.name} Blog`,
    url: absoluteUrl("/blog"),
    inLanguage: "en-US",
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(postHref(post))}#article`,
      headline: post.title,
      url: absoluteUrl(postHref(post)),
      datePublished: post.publishedAt,
    })),
  };
}
