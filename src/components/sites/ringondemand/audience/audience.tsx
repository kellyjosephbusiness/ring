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
    title: "Law firms",
    body: "Live transfers to your intake team, or signed retainers if you want us to do the whole intake. Motor vehicle accidents, workers' comp, lemon law, medical malpractice and pre-settlement funding.",
    tag: "Legal",
    icon: (
      <Icon>
        <path d="M12 3v18" />
        <path d="M7 21h10" />
        <path d="M4.5 7h15" />
        <path d="M6.5 7 3.5 13.5a3 3 0 0 0 6 0L6.5 7Z" />
        <path d="M17.5 7l-3 6.5a3 3 0 0 0 6 0l-3-6.5Z" />
      </Icon>
    ),
  },
  {
    title: "Insurance agencies",
    body: "Live transfers to your licensed agents, screened against your criteria. Final expense, auto, home and Medicare.",
    tag: "Insurance",
    icon: (
      <Icon>
        <path d="M12 21.25s7.5-3.25 7.5-9.75V5.5L12 2.75 4.5 5.5v6c0 6.5 7.5 9.75 7.5 9.75Z" />
        <path d="m8.75 12 2.25 2.25 4.25-4.5" />
      </Icon>
    ),
  },
  {
    title: "Call publishers",
    body: "Send us your calls. Every caller goes through the same intake script as the callers from our own ads.",
    tag: "Partners",
    icon: (
      <Icon>
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
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
