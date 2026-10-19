import type { CSSProperties } from "react";

import { CheckDisc } from "../shared/check-disc";
import { Reveal } from "../shared/reveal";
import styles from "./getting-started.module.css";
import panel from "../shared/split-panel.module.css";

const BODY =
  "To start live transfers we need 3 things from you. The phone number that receives the calls, the hours you take them, and a daily cap. There is no recurring volume commitment. You buy an order, we deliver it, and you reorder when you want more.";

/** The three things the body lists, restated as the setup card's rows. */
const NEEDS = ["The phone number that receives the calls", "The hours you take them", "A daily cap"] as const;

/** "Transfers can start within 24 hours", in the clone's light API panel. */
export function GettingStarted() {
  return (
    <section className={panel.outer} data-section="getting-started" aria-labelledby="getting-started-heading">
      <div className={panel.band}>
        <div className={panel.wrap}>
          <div className={panel.panel}>
            <div className={panel.text}>
              <h2 id="getting-started-heading" className={panel.heading}>
                Transfers can start <br className={panel.headingBreak} />
                <span className={panel.headingAccent}>within 24 hours</span>
              </h2>
              <p className={panel.body}>{BODY}</p>
            </div>

            {/* Restates the body, so it stays out of the reading order. */}
            <Reveal className={panel.visual} aria-hidden="true">
              <div className={panel.window}>
                <div className={`${panel.card} ${styles.card}`}>
                  <div className={styles.head}>
                    <span className={styles.headDot} />
                    <span>To start live transfers</span>
                  </div>

                  <ol className={styles.needs}>
                    {NEEDS.map((need, index) => (
                      <li key={need} className={styles.need} style={{ "--i": index } as CSSProperties}>
                        <span className={styles.num}>{index + 1}</span>
                        <span className={styles.needBody}>
                          <span className={styles.label}>{need}</span>
                          <span className={styles.field}>
                            <span className={styles.fieldBar} />
                            <CheckDisc className={styles.fieldCheck} />
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className={styles.foot}>
                    <CheckDisc className={styles.footCheck} />
                    <span>No recurring volume commitment</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
