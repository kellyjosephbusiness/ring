import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { SectionHeading, type SectionHeadingProps } from "./section-heading";
import styles from "./link-grid.module.css";

export interface LinkGridItem {
  href: string;
  icon: LucideIcon;
  title: string;
  body: string;
  /** Small blue label above the title (a blog post's topic). */
  kicker?: string;
  /** Small grey line under the body (a blog post's date and length). */
  meta?: string;
  /** Link label; "See how it works" by default. */
  more?: string;
  /** Shaded cell, for the closing "something else?" cell. */
  muted?: boolean;
}

export interface LinkGridProps {
  heading: SectionHeadingProps;
  items: readonly LinkGridItem[];
}

/** An index of pages (practice areas, insurance lines, blog posts): one
 * linked cell each, in the feature columns' hairline grid, three across. */
export function LinkGrid({ heading, items }: LinkGridProps) {
  return (
    <section className={styles.section} data-section="link-grid" aria-labelledby={heading.id}>
      <div className={styles.headWrap}>
        <SectionHeading {...heading} />
      </div>
      <div className={styles.band}>
        <ul className={styles.cells}>
          {items.map(({ href, icon: Icon, title, body, kicker, meta, more = "See how it works", muted }) => {
            const className = muted ? `${styles.cell} ${styles.cellAlt}` : styles.cell;
            const content = (
              <>
                <span className={styles.iconBox}>
                  <Icon className={styles.iconGlyph} strokeWidth={1.75} aria-hidden="true" />
                </span>
                {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
                <span className={styles.title}>{title}</span>
                <span className={styles.body}>{body}</span>
                {meta ? <span className={styles.meta}>{meta}</span> : null}
                <span className={styles.more}>
                  {more}
                  <ArrowRight className={styles.moreIcon} strokeWidth={2} aria-hidden="true" />
                </span>
              </>
            );
            return (
              <li key={href + title} className={styles.cellItem}>
                {href.startsWith("/") ? (
                  <Link className={className} href={href}>
                    {content}
                  </Link>
                ) : (
                  <a className={className} href={href}>
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
