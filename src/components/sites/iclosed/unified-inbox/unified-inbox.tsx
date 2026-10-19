import { InboxStage } from "./inbox-stage";
import styles from "./unified-inbox.module.css";

export function UnifiedInbox() {
  return (
    <section data-section="unified-inbox" className={styles.outer}>
      <div className={styles.band}>
        <div className={styles.wrap}>
          <div className={styles.root}>
            <div className={styles.head}>
              <h2 className={styles.heading}>
                Your whole team,
                <br />
                <span className={styles.headingAccent}>closing in one inbox.</span>
              </h2>
              <p className={styles.subcopy}>
                iMessage, WhatsApp, SMS and email land in one shared thread. Assign owners, drop internal notes, and
                close faster because nothing slips between tools.
              </p>
            </div>
            <InboxStage />
          </div>
        </div>
      </div>
    </section>
  );
}
