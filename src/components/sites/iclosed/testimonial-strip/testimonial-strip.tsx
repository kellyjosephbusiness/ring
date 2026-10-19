import { Fragment } from "react";

import styles from "./testimonial-strip.module.css";

const IMG = "/sites/iclosed/images";

type Segment = { text: string; mark?: boolean };

type Quote = {
  /** One array per rendered line; lines after the first start on a new row. */
  lines: Segment[][];
  name: string;
  avatar: string;
  company: string;
  companyAlt: string;
};

const QUOTES: readonly Quote[] = [
  {
    lines: [
      [{ text: "“iClosed is everything you would want in a calendar" }],
      [{ text: "but 10× better for sales teams.", mark: true }, { text: "”" }],
    ],
    name: "Sam Queen",
    avatar: `${IMG}/062bfaa2ee43.webp`,
    company: `${IMG}/0d6f7d98af1d.webp`,
    companyAlt: "Sendblue",
  },
  {
    lines: [
      [
        { text: "“" },
        { text: "By far the best call booking software ", mark: true },
        { text: "and it’s not even close. Blows Calendly out of the water.”" },
      ],
    ],
    name: "Alex Becker",
    avatar: `${IMG}/30b2ec10355a.webp`,
    company: `${IMG}/f36cfad503b2.webp`,
    companyAlt: "HYROS",
  },
  {
    lines: [
      [{ text: "“Everyone doing " }, { text: "high-ticket", mark: true }],
      [{ text: "sales funnels is using iClosed.", mark: true }, { text: "”" }],
    ],
    name: "Hunter Dickson",
    avatar: `${IMG}/a0924f01ae81.webp`,
    company: `${IMG}/e8e70e48d46b.webp`,
    companyAlt: "Whop",
  },
];

function QuoteColumn({ quote }: { quote: Quote }) {
  return (
    <div className={styles.col}>
      <p className={styles.quote}>
        {quote.lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {line.map((segment, segmentIndex) => (
              <span key={segmentIndex} className={segment.mark ? styles.mark : undefined}>
                {segment.text}
              </span>
            ))}
            {lineIndex < quote.lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
      <div className={styles.person}>
        <img className={styles.avatar} src={quote.avatar} alt="" />
        <div className={styles.meta}>
          <span className={styles.name}>{quote.name}</span>
          <img className={styles.company} src={quote.company} alt={quote.companyAlt} />
        </div>
      </div>
    </div>
  );
}

export function TestimonialStrip() {
  return (
    <div className={styles.outer} data-section="testimonial-strip">
      <div className={styles.band}>
        <div className={styles.wrap}>
          <div className={styles.row}>
            {QUOTES.map((quote, index) => (
              <Fragment key={quote.name}>
                {index > 0 ? <span className={styles.divider} aria-hidden="true" /> : null}
                <QuoteColumn quote={quote} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
