import Link from "next/link";
import { ArrowRight, MessageSquareText } from "lucide-react";

import { BOOK_CALL_URL } from "../links";
import { SectionHeading } from "../page-kit/section-heading";
import { PRACTICE_AREAS, practiceAreaHref } from "./practice-areas";
import styles from "./area-grid.module.css";

/** The /legal index: one linked cell per practice area, in the feature
 * columns' hairline grid, plus a cell for anything not listed. */
export function AreaGrid() {
  return (
    <section className={styles.section} data-section="area-grid" aria-labelledby="area-grid-heading">
      <div className={styles.headWrap}>
        <SectionHeading
          id="area-grid-heading"
          eyebrow="Practice areas"
          heading={{ lead: "Pick your", accent: "practice area" }}
          sub="The same process in every area: your criteria in our intake script, our ads, and a live transfer or a signed retainer when a caller qualifies."
        />
      </div>
      <div className={styles.band}>
        <ul className={styles.cells}>
          {PRACTICE_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <li key={area.slug} className={styles.cellItem}>
                <Link className={styles.cell} href={practiceAreaHref(area)}>
                  <span className={styles.iconBox}>
                    <Icon className={styles.iconGlyph} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className={styles.title}>{area.name}</span>
                  <span className={styles.body}>{area.summary}</span>
                  <span className={styles.more}>
                    See how it works
                    <ArrowRight className={styles.moreIcon} strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
          <li className={styles.cellItem}>
            <a className={`${styles.cell} ${styles.cellAlt}`} href={BOOK_CALL_URL}>
              <span className={styles.iconBox}>
                <MessageSquareText className={styles.iconGlyph} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className={styles.title}>Another practice area?</span>
              <span className={styles.body}>
                Tell us your case criteria and we will tell you what we can deliver.
              </span>
              <span className={styles.more}>
                Book a call
                <ArrowRight className={styles.moreIcon} strokeWidth={2} aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
