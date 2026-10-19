import type { CSSProperties } from "react";

import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import { CheckDisc } from "../shared/check-disc";
import { Reveal } from "../shared/reveal";
import styles from "./pricing.module.css";

type Plan = {
  id: string;
  title: string;
  amount: string;
  unit: string;
  terms: readonly string[];
};

const PLANS: Plan[] = [
  {
    id: "pricing-live-transfers",
    title: "Live transfers",
    amount: "$550",
    unit: "per transfer",
    terms: ["Guaranteed cost per signed case.", "Prepaid order.", "Transfers start within 24 hours."],
  },
  {
    id: "pricing-pre-signed-cases",
    title: "Pre-signed cases",
    amount: "$2,500",
    unit: "per signed case",
    terms: [
      "You pay for signed retainers only.",
      "28 day replacement on any case that falls out.",
      "Prepaid order.",
    ],
  },
];

/** Gift box: the first order's no-upfront-payment offer. */
function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.75" y="8.25" width="16.5" height="4" rx="1" />
      <path d="M5.25 12.25v6.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5v-6.5" />
      <path d="M12 8.25v12" />
      <path d="M12 8.25S10.9 4 8.6 4a2.1 2.1 0 0 0 0 4.25H12Z" />
      <path d="M12 8.25S13.1 4 15.4 4a2.1 2.1 0 0 1 0 4.25H12Z" />
    </svg>
  );
}

/** "Pricing": the two options, the first-order note and the call button. */
export function Pricing() {
  return (
    <section
      id="pricing"
      className={styles.section}
      data-section="pricing"
      aria-labelledby="pricing-heading"
    >
      <div className={styles.inner}>
        <h2 id="pricing-heading" className={styles.heading}>
          Pricing
        </h2>

        <Reveal className={styles.reveal}>
          <div className={styles.grid}>
            {PLANS.map((plan, index) => (
              <article
                key={plan.id}
                className={styles.card}
                style={{ "--i": index } as CSSProperties}
                aria-labelledby={`${plan.id}-title`}
              >
                <div className={styles.head}>
                  <h3 id={`${plan.id}-title`} className={styles.title}>
                    {plan.title}
                  </h3>
                  <p className={styles.price}>
                    <span className={styles.amount}>{plan.amount}</span>{" "}
                    <span className={styles.unit}>{plan.unit}</span>
                  </p>
                </div>
                <ul className={styles.terms}>
                  {plan.terms.map((term) => (
                    <li key={term} className={styles.term}>
                      <CheckDisc className={styles.disc} />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className={styles.note}>
            <span className={styles.noteIcon}>
              <GiftIcon />
            </span>
            <span className={styles.noteText}>
              <b className={styles.noteLead}>First order with no upfront payment.</b> We send live
              transfers until you sign 2 cases, and you pay after you sign them.
            </span>
          </p>
        </Reveal>

        <div className={styles.cta}>
          <a
            className={styles.ctaLink}
            href={BOOK_CALL_URL}
            target={BOOK_CALL_TARGET}
            rel={BOOK_CALL_TARGET ? "noopener noreferrer" : undefined}
          >
            Book a call
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
