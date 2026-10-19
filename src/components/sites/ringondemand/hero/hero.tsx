import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import { TransferVisual } from "./transfer-visual";
import styles from "./hero.module.css";

const HEADLINE_LINE_1 = "Inbound Calls for";

/** Verified badge (scalloped seal with a check), drawn at 18px beside the proof line. */
function CheckBadge() {
  return (
    <svg className={styles.badge} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.root} data-section="hero">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Inbound calls and live transfers</p>
            <div className={styles.text}>
              <h1 className={styles.h1}>
                <span>{HEADLINE_LINE_1}</span>
                <span>
                  {" "}
                  <br className={styles.h1Break} />
                  8- and 9-Figure Companies
                </span>
              </h1>
              <p className={styles.sub}>
                You set the criteria. We run the ads, screen every caller, and send the ones who
                qualify to your team as inbound calls or live transfers.
              </p>
            </div>
            <div className={styles.ctaGroup}>
              <a
                className={styles.cta}
                href={BOOK_CALL_URL}
                target={BOOK_CALL_TARGET}
                rel={BOOK_CALL_TARGET ? "noopener noreferrer" : undefined}
              >
                Book a call
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </a>
              <p className={styles.micro}>
                Tell us your criteria. We tell you what we can deliver.
              </p>
            </div>
            <p className={styles.proof}>
              <CheckBadge />
              <span>
                Over <b className={styles.proofStrong}>1,500 signed retainers</b> delivered to
                personal injury firms last quarter
              </span>
            </p>
          </div>
          <div className={styles.visual}>
            <TransferVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
