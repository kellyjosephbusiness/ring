import type { CSSProperties } from "react";

import { CheckDisc } from "../shared/check-disc";
import { Reveal } from "../shared/reveal";
import styles from "./screening.module.css";

const CHECKS = [
  "The accident happened inside 30 or 90 days. You pick the window.",
  "The caller was not at fault.",
  "The caller already received treatment or already seen a doctor.",
  "The at fault driver has insurance.",
  "The claim is inside the statute of limitations.",
  "Anything else you add to the script.",
] as const;

/** "What we check before a caller reaches you": the six intake checks. */
export function Screening() {
  return (
    <section className={styles.section} data-section="screening" aria-labelledby="screening-heading">
      <div className={styles.inner}>
        <h2 id="screening-heading" className={styles.heading}>
          What we check before <br className={styles.headingBreak} />
          <span className={styles.headingAccent}>a caller reaches you</span>
        </h2>

        <Reveal className={styles.reveal}>
          <ul className={styles.grid}>
            {CHECKS.map((check, index) => (
              <li key={check} className={styles.item} style={{ "--i": index } as CSSProperties}>
                <CheckDisc className={styles.disc} />
                <span className={styles.itemText}>{check}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className={styles.note}>
          If a caller fails one of your questions, we do not transfer them and{" "}
          <span className={styles.noteMark}>you do not pay for them.</span>
        </p>
      </div>
    </section>
  );
}
