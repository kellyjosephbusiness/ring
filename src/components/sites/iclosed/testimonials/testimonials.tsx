import { START_FREE_URL } from "../links";
import { REVIEWS, STAR_ICON, VERIFIED_ICON, type Review } from "./testimonials.data";
import styles from "./testimonials.module.css";

/** Card width plus the gap that follows it. */
const CARD_STEP_PX = 404;
/** Loop time per card, so the ticker keeps one speed (≈43px/s) whatever the
 * number of reviews. */
const SECONDS_PER_CARD = 9.3;
/** Enough cards for one pass to cover a 1440 frame, so the loop never shows
 * a gap even with a short review list. */
const MIN_CARDS = Math.ceil(1440 / CARD_STEP_PX) + 1;

const PASS: readonly Review[] = Array.from(
  { length: Math.max(REVIEWS.length, MIN_CARDS) },
  (_, index) => REVIEWS[index % REVIEWS.length],
);

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.stars} aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((star) => (
            <img key={star} className={styles.star} src={STAR_ICON} alt="" />
          ))}
        </div>
        <p className={styles.quote}>
          {review.pre}
          <strong className={styles.quoteBold}>{review.bold}</strong>
          {review.post}
        </p>
      </div>
      <div className={styles.person}>
        {review.avatar ? (
          <img className={styles.avatar} src={review.avatar} alt="" />
        ) : (
          <span className={`${styles.avatar} ${styles.avatarFallback}`} aria-hidden="true">
            {initials(review.name)}
          </span>
        )}
        <div className={styles.personMeta}>
          <span className={styles.nameRow}>
            <span className={styles.name}>{review.name}</span>
            <img className={styles.tick} src={VERIFIED_ICON} alt="Verified" />
          </span>
          <span className={styles.role}>{review.role}</span>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  return (
    <div className={styles.outer} data-section="testimonials">
      <div className={styles.band}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>What operators say</p>
            <h2 className={styles.heading}>
              Proof, in their <span className={styles.headingAccent}>own words</span>
            </h2>
            <p className={styles.subcopy}>
              One embed sits in front of your funnel and syncs both ways with your CRM, ads and messaging.
            </p>
          </div>

          {/* Two identical passes; the track travels -50% (one pass) per loop. */}
          <div className={styles.ticker}>
            <div className={styles.track} style={{ animationDuration: `${PASS.length * SECONDS_PER_CARD}s` }}>
              <div className={styles.pass}>
                {PASS.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
              <div className={styles.pass} aria-hidden="true">
                {PASS.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          </div>

          <a className={styles.cta} href={START_FREE_URL}>
            Join 20,000 high ticket funnels →
          </a>
        </div>
      </div>
    </div>
  );
}
