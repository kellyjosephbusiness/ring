import Link from "next/link";

import { BLOG_TOPICS, POSTS, formatPostDate, postHref, postsOn, type BlogPost } from "@/content/blog/posts";

import { Faq } from "../faq/faq";
import { FinalCta } from "../final-cta/final-cta";
import { BOOK_CALL_URL } from "../links";
import { CtaLink } from "../page-kit/cta-link";
import { Divider } from "../page-kit/divider";
import { Eyebrow } from "../page-kit/eyebrow";
import { PageShell } from "../page-shell/page-shell";
import { JsonLd } from "../seo/json-ld";
import { breadcrumbList } from "../seo/schema";
import { CheckDisc } from "../shared/check-disc";
import { BLOG_CTA } from "./blog-cta";
import { blogPosting } from "./blog-schema";
import { RelatedPosts } from "./related-posts";
import prose from "./prose.module.css";
import styles from "./post-page.module.css";

/** Up to three other posts: the same topic first, then the newest. */
function morePosts(post: BlogPost): BlogPost[] {
  const sameTopic = postsOn([post.topic], post.slug);
  const others = POSTS.filter((other) => other.topic !== post.topic);
  return [...sameTopic, ...others].slice(0, 3);
}

/** One blog post: breadcrumbs, title and byline, the key takeaways, the MDX
 * body beside a booking card, then the post's FAQ, more posts and the booking
 * band for the post's audience. */
export function PostPage({ post }: { post: BlogPost }) {
  const { Body } = post;
  const topic = BLOG_TOPICS[post.topic];
  const cta = BLOG_CTA[topic.audience];
  const updated = post.updatedAt !== post.publishedAt;

  return (
    <PageShell>
      <JsonLd data={blogPosting(post)} />
      <JsonLd
        data={breadcrumbList([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: postHref(post) },
        ])}
      />
      <article className={styles.article}>
        <header className={styles.header}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <ol className={styles.crumbList}>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li aria-current="page">{topic.label}</li>
            </ol>
          </nav>
          <Eyebrow>{topic.label}</Eyebrow>
          <h1 className={styles.h1}>{post.title}</h1>
          <p className={styles.lead}>{post.description}</p>
          <p className={styles.byline}>
            <span>By RingOnDemand</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            {updated ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                </span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </p>
        </header>
        <Divider />
        <div className={styles.layout}>
          <div className={styles.main}>
            <section className={styles.takeaways} aria-labelledby="key-takeaways">
              <h2 id="key-takeaways" className={styles.takeawaysHeading}>
                Key takeaways
              </h2>
              <ul className={styles.takeawayList}>
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway} className={styles.takeaway}>
                    <CheckDisc className={styles.disc} />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
            <div className={prose.prose}>
              <Body />
            </div>
          </div>
          <aside className={styles.aside} aria-label="Book a call">
            <div className={styles.asideInner}>
              <div className={styles.asideCard}>
                <p className={styles.asideEyebrow}>{cta.aside.eyebrow}</p>
                <p className={styles.asideTitle}>{cta.aside.title}</p>
                <p className={styles.asideBody}>{cta.aside.body}</p>
                <CtaLink href={BOOK_CALL_URL}>{cta.aside.label}</CtaLink>
              </div>
              <nav className={styles.related} aria-label="Related pages">
                <p className={styles.relatedHeading}>Related pages</p>
                <ul className={styles.relatedList}>
                  {post.related.map((link) => (
                    <li key={link.href}>
                      <Link className={styles.relatedLink} href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </article>
      <Faq heading="Frequently asked questions" items={post.faq} />
      <RelatedPosts posts={morePosts(post)} heading={{ lead: "Keep", accent: "reading" }} />
      <FinalCta {...cta.final} />
    </PageShell>
  );
}
