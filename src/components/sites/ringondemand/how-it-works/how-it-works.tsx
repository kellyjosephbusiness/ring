import { Fragment } from "react";

import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import styles from "./how-it-works.module.css";
import { InViewBand } from "./in-view-band";

type Step = { num: string; title: string; body: string };

const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "You set the criteria",
    body: "The case types or lines of insurance you want, the questions every caller must pass, and the states you work in. We write your criteria into the intake script.",
  },
  {
    num: "02",
    title: "We run the ads and screen every caller",
    body: "Our own ads plus a vetted publisher network. Every caller answers your qualifying questions before anything reaches you.",
  },
  {
    num: "03",
    title: "Your team gets the call",
    body: "Inbound calls and live transfers go to your line during the hours you set. Law firms can also take pre-signed cases, with the completed intake and the signed retainer.",
  },
];

/** Dashed elbow dropping from an outer step card and turning in to the
 * centre line. The right one is the same shape, mirrored in CSS. */
function ConnectorElbow() {
  return (
    <svg
      className={styles.connectorSvg}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      viewBox="0 0 429.816 68.4854"
      fill="none"
      aria-hidden="true"
    >
      <path
        className={styles.dash}
        d="M0.5 0V38.8379C0.5 47.6745 7.66344 54.8379 16.5 54.8379H415.669C423.206 54.8379 429.316 60.9481 429.316 68.4854"
        stroke="#76A9FA"
        strokeDasharray="6 6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Centre run from the middle card down to the arrowhead over the pill. The
 * line stretches with the row; the arrowhead keeps its size. */
function ConnectorStem() {
  return (
    <>
      <svg
        className={styles.stemLine}
        preserveAspectRatio="none"
        viewBox="0 0 5.7735 90"
        fill="none"
        aria-hidden="true"
      >
        <path
          className={styles.dash}
          d="M2.88675 0V90"
          stroke="#76A9FA"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg className={styles.stemArrow} viewBox="0 0 5.7735 5" fill="none" aria-hidden="true">
        <path d="M2.88675 5L5.7735 0H0L2.88675 5Z" fill="#76A9FA" />
      </svg>
    </>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={styles.outer}
      data-section="how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      <InViewBand className={styles.band} activeClassName={styles.inView}>
        <div className={styles.inner}>
          <h2 id="how-it-works-heading" className={styles.heading}>
            How it works
          </h2>
          <div className={styles.bottom}>
            <ol className={styles.steps}>
              {STEPS.map((step, index) => (
                <Fragment key={step.num}>
                  {index > 0 ? (
                    <li className={styles.plus} aria-hidden="true">
                      +
                    </li>
                  ) : null}
                  <li className={styles.step}>
                    <p className={styles.stepNum} aria-hidden="true">
                      {step.num}
                    </p>
                    <div className={styles.stepText}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepBody}>{step.body}</p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ol>
            <div className={styles.connectors} aria-hidden="true">
              <div className={styles.connectorLeft}>
                <ConnectorElbow />
              </div>
              <div className={styles.connectorRight}>
                <ConnectorElbow />
              </div>
              <div className={styles.connectorMid}>
                <ConnectorStem />
              </div>
            </div>
            <div className={styles.pillRow}>
              <a
                className={styles.pill}
                href={BOOK_CALL_URL}
                target={BOOK_CALL_TARGET}
                rel={BOOK_CALL_TARGET ? "noopener noreferrer" : undefined}
              >
                <span className={styles.pillLabel}>Book a call</span>
                <span className={styles.pillArrow} aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </InViewBand>
    </section>
  );
}
