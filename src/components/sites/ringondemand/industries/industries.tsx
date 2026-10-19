import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { INSURANCE_LINES } from "../insurance/insurance-lines";
import { PRACTICE_AREAS } from "../legal/practice-areas";
import { ROUTES } from "../links";
import { Reveal } from "../shared/reveal";
import styles from "./industries.module.css";

type Industry = {
  id: string;
  icon: ReactNode;
  title: string;
  kicker: string;
  body: string;
  areas: readonly string[];
  href: string;
  link: string;
};

/** Balance scale: legal. */
function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M4.5 7h15" />
      <path d="M6.5 7 3.5 13.5a3 3 0 0 0 6 0L6.5 7Z" />
      <path d="M17.5 7l-3 6.5a3 3 0 0 0 6 0l-3-6.5Z" />
    </svg>
  );
}

/** Shield with a check: insurance. */
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.25s7.5-3.25 7.5-9.75V5.5L12 2.75 4.5 5.5v6c0 6.5 7.5 9.75 7.5 9.75Z" />
      <path d="m8.75 12 2.25 2.25 4.25-4.5" />
    </svg>
  );
}

const INDUSTRIES: readonly Industry[] = [
  {
    id: "legal",
    icon: <ScaleIcon />,
    title: "Legal",
    kicker: "Live transfers and signed retainers",
    body: "For law firms and funding companies. Every caller answers your qualifying questions before they reach your intake team, or we sign them to your retainer.",
    areas: PRACTICE_AREAS.map((area) => area.navLabel),
    href: ROUTES.legal,
    link: "See legal",
  },
  {
    id: "insurance",
    icon: <ShieldIcon />,
    title: "Insurance",
    kicker: "Inbound calls and live transfers",
    body: "For insurance agencies. Every caller is screened against your criteria before they reach your licensed agents.",
    areas: INSURANCE_LINES.map((line) => line.navLabel),
    href: ROUTES.insurance,
    link: "See insurance",
  },
];

/** The two industries we run calls for, each linking to its index page, in
 * the homepage's original offer-card layout. */
export function Industries() {
  return (
    <section className={styles.section} data-section="industries" aria-labelledby="industries-heading">
      <div className={styles.inner}>
        <h2 id="industries-heading" className={styles.heading}>
          Calls for legal <br />
          <span className={styles.headingAccent}>and insurance</span>
        </h2>

        <Reveal className={styles.reveal}>
          <div className={styles.grid}>
            {INDUSTRIES.map((industry, index) => (
              <article
                key={industry.id}
                id={industry.id}
                className={styles.card}
                style={{ "--i": index } as CSSProperties}
                aria-labelledby={`${industry.id}-title`}
              >
                <span className={styles.icon}>{industry.icon}</span>
                <div className={styles.head}>
                  <h3 id={`${industry.id}-title`} className={styles.title}>
                    {industry.title}
                  </h3>
                  <p className={styles.kicker}>{industry.kicker}</p>
                </div>
                <p className={styles.body}>{industry.body}</p>
                <ul className={styles.areas}>
                  {industry.areas.map((area) => (
                    <li key={area} className={styles.areaChip}>
                      {area}
                    </li>
                  ))}
                </ul>
                <Link className={styles.link} href={industry.href}>
                  {industry.link}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
