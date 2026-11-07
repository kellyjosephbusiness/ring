import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BLOG_TOPICS, postHref, type BlogPost } from "@/content/blog/posts";

import { SectionHeading, type SectionHeadingProps } from "../page-kit/section-heading";
import { PostCover } from "./cover/post-cover";
import { postMeta } from "./post-grid";
import styles from "./post-cards.module.css";

interface PostCardsProps {
  heading: SectionHeadingProps;
  posts: readonly BlogPost[];
  /** A link under the grid, such as "All posts" on the homepage. */
  more?: { label: string; href: string };
}

/** Blog posts as cards: the cover illustration, then the topic, title,
 * summary and date, in the link grid's hairline cells, three across. */
export function PostCards({ heading, posts, more }: PostCardsProps) {
  return (
    <section className={styles.section} data-section="post-cards" aria-labelledby={heading.id}>
      <div className={styles.headWrap}>
        <SectionHeading {...heading} />
      </div>
      <div className={styles.band}>
        <ul className={styles.cells}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.cellItem}>
              <Link className={styles.cell} href={postHref(post)}>
                <PostCover post={post} className={styles.cover} />
                <span className={styles.kicker}>{BLOG_TOPICS[post.topic].label}</span>
                <span className={styles.title}>{post.title}</span>
                <span className={styles.body}>{post.description}</span>
                <span className={styles.meta}>{postMeta(post)}</span>
                <span className={styles.more}>
                  Read the post
                  <ArrowRight className={styles.moreIcon} strokeWidth={2} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {more ? (
        <div className={styles.footer}>
          <Link className={styles.all} href={more.href}>
            {more.label}
            <ArrowRight className={styles.allIcon} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
