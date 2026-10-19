import type { CSSProperties, ReactNode } from "react";

import { ANCHORS } from "../links";
import { Reveal } from "../shared/reveal";
import styles from "./offers.module.css";

type Offer = {
  id: string;
  icon: ReactNode;
  title: string;
  amount: string;
  unit: string;
  body: string;
  link: string;
};

/** Handset with an outgoing arrow: a call passed on to the firm. */
function TransferIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.2 3.75h3.1l1.55 3.9-2.05 1.25a10.6 10.6 0 0 0 5.3 5.3l1.25-2.05 3.9 1.55v3.1a1.55 1.55 0 0 1-1.55 1.55A14.05 14.05 0 0 1 3.65 5.3 1.55 1.55 0 0 1 5.2 3.75Z" />
      <path d="M15 3.75h5.25V9" />
      <path d="M20.25 3.75 14.25 9.75" />
    </svg>
  );
}

/** Document with a signature line and a check: a signed retainer. */
function SignedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.5 3H7.25A2.25 2.25 0 0 0 5 5.25v13.5A2.25 2.25 0 0 0 7.25 21h9.5A2.25 2.25 0 0 0 19 18.75V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" />
      <path d="M8.5 13h4" />
      <path d="M8.5 17.25c.9-1.1 1.6-1.1 2.1 0 .5 1.1 1.2 1.1 2.1 0" />
      <path d="m14.25 16 1.25 1.25 2.25-2.5" />
    </svg>
  );
}

const OFFERS: Offer[] = [
  {
    id: "live-transfers",
    icon: <TransferIcon />,
    title: "Live transfers",
    amount: "$550",
    unit: "per transfer",
    body: "Our intake team screens every caller against your criteria and transfers them to your phone while they are still on the line. You get a guaranteed cost per signed case. If you do not hit it, we keep sending transfers free until you do.",
    link: "See how live transfers work",
  },
  {
    id: "pre-signed-cases",
    icon: <SignedIcon />,
    title: "Pre-signed cases",
    amount: "$2,500",
    unit: "per signed case",
    body: "We run the ads, do the full intake, and sign the claimant to your retainer. You pay for signed retainers only. If a case falls out inside 28 days, we replace it.",
    link: "See how pre-signed cases work",
  },
];

/** "2 ways to get cases from us": the two offers, each with its price. */
export function Offers() {
  return (
    <section className={styles.section} data-section="offers" aria-labelledby="offers-heading">
      <div className={styles.inner}>
        <h2 id="offers-heading" className={styles.heading}>
          2 ways to get <br />
          <span className={styles.headingAccent}>cases from us</span>
        </h2>

        <Reveal className={styles.reveal}>
          <div className={styles.grid}>
            {OFFERS.map((offer, index) => (
              <article
                key={offer.id}
                id={offer.id}
                className={styles.card}
                style={{ "--i": index } as CSSProperties}
                aria-labelledby={`${offer.id}-title`}
              >
                <span className={styles.icon}>{offer.icon}</span>
                <div className={styles.head}>
                  <h3 id={`${offer.id}-title`} className={styles.title}>
                    {offer.title}
                  </h3>
                  <p className={styles.price}>
                    <span className={styles.amount}>{offer.amount}</span>{" "}
                    <span className={styles.unit}>{offer.unit}</span>
                  </p>
                </div>
                <p className={styles.body}>{offer.body}</p>
                <a className={styles.link} href={ANCHORS.howItWorks}>
                  {offer.link}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
