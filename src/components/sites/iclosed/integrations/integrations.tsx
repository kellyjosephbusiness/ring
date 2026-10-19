import { START_FREE_URL } from "../links";
import { LOGOS, PARTNERS, PASSES, TICKER_ONE, TICKER_TWO, type Partner } from "./integrations.data";
import styles from "./integrations.module.css";

/** One copy of a ticker's icon list. It carries its own trailing gap, so the
 * track is a whole number of passes wide and -50% lands exactly on pass 3. */
function TickerPass({ icons }: { icons: readonly string[] }) {
  return (
    <div className={styles.pass}>
      {icons.map((icon) => (
        <span key={icon} className={styles.tile}>
          <img src={icon} alt="" width={68} height={68} />
        </span>
      ))}
    </div>
  );
}

function PartnerLogo({ name }: { name: Partner["name"] }) {
  switch (name) {
    case "Zapier":
      return (
        <span className={`${styles.lockup} ${styles.zapierLockup}`}>
          <img className={`${styles.mark} ${styles.zapierMark}`} src={LOGOS.zapierMark} alt="Zapier" />
          <img className={`${styles.word} ${styles.zapierWord}`} src={LOGOS.zapierWord} alt="" />
        </span>
      );
    case "HighLevel":
      return (
        <span className={`${styles.lockup} ${styles.highLevelLockup}`}>
          <img className={`${styles.mark} ${styles.highLevelMark}`} src={LOGOS.highLevelMark} alt="HighLevel" />
          <img className={`${styles.word} ${styles.highLevelWord}`} src={LOGOS.highLevelWord} alt="" />
        </span>
      );
    case "HYROS":
      return <img className={`${styles.wholeLogo} ${styles.hyrosLogo}`} src={LOGOS.hyros} alt="HYROS" />;
    case "Stripe":
      return <img className={`${styles.wholeLogo} ${styles.stripeLogo}`} src={LOGOS.stripe} alt="Stripe" />;
  }
}

export function Integrations() {
  return (
    <div className={styles.outer} data-section="integrations">
      <div className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>INTEGRATIONS</p>
            <h2 className={styles.heading}>
              Drops into the stack
              <br />
              <span className={styles.headingAccent}>you already have</span>
            </h2>
            <p className={styles.subcopy}>
              One embed sits in front of your funnel and syncs both ways with your CRM, ads and messaging.
            </p>
            <a className={styles.cta} href={START_FREE_URL}>
              Start for Free
            </a>
          </div>

          <div className={styles.tickers} aria-hidden="true">
            <div className={styles.row}>
              <div className={styles.track}>
                {PASSES.map((pass) => (
                  <TickerPass key={pass} icons={TICKER_ONE} />
                ))}
              </div>
            </div>
            <div className={`${styles.row} ${styles.rowReverse}`}>
              <div className={styles.track}>
                {PASSES.map((pass) => (
                  <TickerPass key={pass} icons={TICKER_TWO} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.strip}>
            <ul className={styles.stripGrid}>
              {PARTNERS.map((partner) => (
                <li key={partner.name} className={styles.cell}>
                  <span className={styles.logoRow}>
                    <PartnerLogo name={partner.name} />
                  </span>
                  <p className={styles.cellBody}>{partner.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
