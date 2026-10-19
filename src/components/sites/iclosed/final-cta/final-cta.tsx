import { START_FREE_URL } from "../links";
import styles from "./final-cta.module.css";

export function FinalCta() {
  return (
    <section className={styles.outer} data-section="final-cta">
      <div className={styles.band}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Stop leaking pipeline</p>
          <h2 className={styles.heading}>
            Turn your scheduler into a{" "}
            <span className={styles.headingAccent}>profit maximizer</span>
          </h2>
          <p className={styles.subcopy}>
            Same traffic. More leads captured, qualified and booked — on autopilot. See it live in
            under 5 minutes.
          </p>
          <a className={styles.cta} href={START_FREE_URL}>
            Start for free →
          </a>
          <p className={styles.note} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
