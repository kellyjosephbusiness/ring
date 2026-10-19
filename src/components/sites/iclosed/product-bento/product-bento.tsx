import { START_FREE_URL } from "../links";
import { BentoCard, type BentoGraphicName } from "./bento-card";
import styles from "./product-bento.module.css";

type BentoItem = {
  graphic: BentoGraphicName;
  size: "sm" | "md";
  title: string;
  body: string;
};

const ROWS: BentoItem[][] = [
  [
    {
      graphic: "disqualify",
      size: "sm",
      title: "Disqualify automatically, save +100 hours",
      body: "Turn on credit qualification for any scheduler event instantly, using the same booking flow your leads already use.",
    },
    {
      graphic: "routing",
      size: "sm",
      title: "Conditional routing, close more deals",
      body: "View credit score, debt-to-income ratio, and related financial signals for every lead entering your scheduler.",
    },
    {
      graphic: "workflows",
      size: "sm",
      title: "SMS & email workflows, reduce no-shows",
      body: "Based on rules matching your offer price, each lead is approved, blocked, or routed to the right closer — before a call is booked.",
    },
  ],
  [
    {
      graphic: "analytics",
      size: "md",
      title: "Your CMO & sales manager won’t believe it!",
      body: "Revenue, bookings and your full scheduling funnel in one view — so every dollar is finally accounted for.",
    },
    {
      graphic: "tracker",
      size: "md",
      title: "The most accurate scheduling tracker",
      body: "Every contact, activity and outcome synced in one place and pushed straight to your CRM.",
    },
  ],
];

/** "The Product" — five animated feature cards and the sign-up CTA. */
export function ProductBento() {
  return (
    <section className={styles.section} data-section="product-bento">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>The Product</p>
          <h2 className={styles.heading}>
            Everything your booking page <br />
            <span className={styles.headingAccent}>should’ve done all along.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {ROWS.map((row, r) => (
            <div key={r} className={styles.row}>
              {row.map((item) => (
                <BentoCard key={item.graphic} {...item} />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a className={styles.ctaLink} href={START_FREE_URL}>
            Start for free →
          </a>
        </div>
      </div>
    </section>
  );
}
