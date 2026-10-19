import type { CSSProperties } from "react";

import panel from "../shared/split-panel.module.css";
import { CheckDisc } from "../shared/check-disc";
import { Reveal } from "../shared/reveal";
import styles from "./reporting.module.css";

const BODY =
  "Every transfer is posted to you with the caller's intake answers, and you get delivery updates while the campaign runs, so you always know what came in and what you paid for.";

/** Intake answers on the posted record, restated from the screening checks. */
const ANSWERS = [
  { question: "Accident date", answer: "Inside your window" },
  { question: "At fault", answer: "No" },
  { question: "Treatment", answer: "Received" },
  { question: "At-fault driver insured", answer: "Yes" },
  { question: "Statute of limitations", answer: "Inside" },
] as const;

/** "You see every transfer": Getting started's panel, mirrored. */
export function Reporting() {
  return (
    <section className={panel.outer} data-section="reporting" aria-labelledby="reporting-heading">
      <div className={panel.band}>
        <div className={panel.wrap}>
          <div className={`${panel.panel} ${panel.panelReverse}`}>
            <div className={panel.text}>
              <h2 id="reporting-heading" className={panel.heading}>
                You see <span className={panel.headingAccent}>every transfer</span>
              </h2>
              <p className={panel.body}>{BODY}</p>
            </div>

            {/* Restates the body, so it stays out of the reading order. */}
            <Reveal className={`${panel.visual} ${styles.visual}`} aria-hidden="true">
              <div className={panel.window}>
                <div className={`${panel.card} ${styles.card}`}>
                  <div className={styles.head}>
                    <span className={styles.liveDot} />
                    <span className={styles.headTitle}>Transfer posted</span>
                  </div>

                  <p className={styles.caption}>Intake answers</p>

                  <ul className={styles.answers}>
                    {ANSWERS.map((row, index) => (
                      <li key={row.question} className={styles.answer} style={{ "--i": index } as CSSProperties}>
                        <span className={styles.swap}>
                          <span className={styles.swapDim} />
                          <CheckDisc className={styles.swapCheck} />
                        </span>
                        <span className={styles.question}>{row.question}</span>
                        <span className={styles.badge}>{row.answer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <span className={styles.chip}>
                <span className={styles.chipPulse} />
                Delivery update
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
