import { CaseStudyRail } from "./case-study-rail";
import styles from "./case-studies.module.css";

export function CaseStudies() {
  return (
    <section data-section="case-studies" className={styles.outer}>
      <div className={styles.band}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>What operators get</p>
            <h2 className={styles.heading}>
              The lift, measured in cold <span className={styles.headingAccent}>dollars</span>
            </h2>
            <p className={styles.subcopy}>Numbers high-ticket teams pulled after switching to iClosed.</p>
          </div>
          <CaseStudyRail />
        </div>
      </div>
    </section>
  );
}
