import type { CSSProperties } from "react";

import { Reveal } from "../shared/reveal";
import styles from "./results.module.css";

export interface Stat {
  figure: string;
  label: string;
}

/** The legal copy doc's figures (personal injury), shown on the MVA page. */
const PI_STATS: readonly Stat[] = [
  { figure: "1,500+", label: "Signed retainers delivered last quarter" },
  { figure: "25 to 35%", label: "Of live transfers signed, higher in California" },
  { figure: "24 hours", label: "From signed order to first transfer" },
];

/** Company-wide figures supplied by RingOnDemand, for the general pages. */
export const GENERAL_STATS: readonly Stat[] = [
  { figure: "2,000+", label: "Signed retainers delivered" },
  { figure: "5,000+", label: "Live transfers delivered" },
  { figure: "24 hours", label: "From signed order to first transfer" },
];

/** Three figures in the clone's hairline-divided strip, under a heading. */
export function Results({
  heading = "What firms see",
  stats = PI_STATS,
}: {
  heading?: string;
  stats?: readonly Stat[];
}) {
  return (
    <section id="results" className={styles.section} data-section="results" aria-labelledby="results-heading">
      <div className={styles.inner}>
        <h2 id="results-heading" className={styles.heading}>
          {heading}
        </h2>
      </div>

      <div className={styles.strip}>
        <Reveal className={styles.wrap}>
          <ul className={styles.row}>
            {stats.map((stat, index) => (
              <li key={stat.figure} className={styles.col} style={{ "--i": index } as CSSProperties}>
                <p className={styles.figure}>{stat.figure}</p>
                <p className={styles.label}>{stat.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
