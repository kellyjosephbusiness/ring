import type { CSSProperties } from "react";

import { Reveal } from "../shared/reveal";
import styles from "./results.module.css";

const STATS = [
  { figure: "1,500+", label: "Signed retainers delivered last quarter" },
  { figure: "25 to 35%", label: "Of live transfers signed, higher in California" },
  { figure: "24 hours", label: "From signed order to first transfer" },
] as const;

/** "What firms see": three figures in the clone's hairline-divided strip.
 * The figures are personal injury results, so pages that cover more than
 * legal pass a heading that says so. */
export function Results({ heading = "What firms see" }: { heading?: string }) {
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
            {STATS.map((stat, index) => (
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
