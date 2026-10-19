import type { ReactNode } from "react";

import styles from "./audience.module.css";

type AudienceCard = {
  title: string;
  body: string;
  tag: string;
  icon: ReactNode;
};

/** 24px line icons, drawn on the lucide grid. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const CARDS: readonly AudienceCard[] = [
  {
    title: "Firms with their own intake team",
    body: "Your intake team takes the call and signs the case. This is for firms that already have intake staff and want more cases this week.",
    tag: "Live transfers",
    icon: (
      <Icon>
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
      </Icon>
    ),
  },
  {
    title: "Firms that want signed cases only",
    body: "We handle the whole intake and you get the signed retainer. This is for firms that want to grow caseload without adding intake staff.",
    tag: "Pre-signed cases",
    icon: (
      <Icon>
        <path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" />
        <path d="M14.487 7.858A1 1 0 0 1 14 7V2" />
        <path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" />
        <path d="M8 18h1" />
      </Icon>
    ),
  },
  {
    title: "Where we work",
    body: "In California, ads run under your firm's name and you approve every creative before it runs.",
    tag: "Any U.S. state",
    icon: (
      <Icon>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </Icon>
    ),
  },
];

export function Audience() {
  return (
    <section className={styles.outer} data-section="audience" aria-labelledby="audience-heading">
      <div className={styles.section}>
        <div className={styles.inner}>
          <h2 id="audience-heading" className={styles.heading}>
            Who this is for
          </h2>
          <ul className={styles.cards}>
            {CARDS.map((card) => (
              <li key={card.title} className={styles.card}>
                <span className={styles.iconDisc}>{card.icon}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.body}</p>
                <p className={styles.cardBadge}>{card.tag}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
