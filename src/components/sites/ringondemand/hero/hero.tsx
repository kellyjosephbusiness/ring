import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import { PROOF, ProofList } from "../shared/proof-list";
import { TransferVisual } from "./transfer-visual";
import styles from "./hero.module.css";

const HEADLINE_LINE_1 = "Inbound Calls for";

export function Hero() {
  return (
    <section className={styles.root} data-section="hero">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Inbound calls and live transfers</p>
            <div className={styles.text}>
              <h1 className={styles.h1}>
                <span>{HEADLINE_LINE_1}</span>
                <span className={styles.h1Accent}>
                  {" "}
                  <br className={styles.h1Break} />
                  Enterprise Companies
                </span>
              </h1>
              <p className={styles.sub}>
                You set the criteria. We run the ads, screen every caller, and send the ones who
                qualify to your team as inbound calls or live transfers.
              </p>
            </div>
            <div className={styles.ctaGroup}>
              <a
                className={styles.cta}
                href={BOOK_CALL_URL}
                target={BOOK_CALL_TARGET}
                rel={BOOK_CALL_TARGET ? "noopener noreferrer" : undefined}
              >
                Book a call
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </a>
              <p className={styles.micro}>
                Tell us your criteria. We tell you what we can deliver.
              </p>
            </div>
            <ProofList className={styles.proof} lines={[PROOF.signedRetainers, PROOF.liveTransfers]} />
          </div>
          <div className={styles.visual}>
            <TransferVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
