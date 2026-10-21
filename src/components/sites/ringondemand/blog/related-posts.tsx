import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BLOG_TOPICS, postHref, type BlogPost } from "@/content/blog/posts";

import { SectionHeading } from "../page-kit/section-heading";
import { postMeta } from "./post-grid";
import styles from "./related-posts.module.css";

interface RelatedPostsProps {
  posts: readonly BlogPost[];
  heading?: { lead: string; accent?: string };
}

/** Blog posts linked from a service page or another post: hairline rows in
 * the FAQ's centred column, so one post reads as well as three. */
export function RelatedPosts({ posts, heading = { lead: "Related", accent: "reading" } }: RelatedPostsProps) {
  if (!posts.length) return null;
  return (
    <section className={styles.section} data-section="related-posts" aria-labelledby="related-posts-heading">
      <div className={styles.inner}>
        <SectionHeading id="related-posts-heading" eyebrow="Blog" heading={heading} />
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link className={styles.link} href={postHref(post)}>
                <span className={styles.text}>
                  <span className={styles.kicker}>{BLOG_TOPICS[post.topic].label}</span>
                  <span className={styles.title}>{post.title}</span>
                  <span className={styles.body}>{post.description}</span>
                  <span className={styles.meta}>{postMeta(post)}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowRight className={styles.arrowIcon} strokeWidth={2} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className={styles.all} href="/blog">
          All posts
          <ArrowRight className={styles.allIcon} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
