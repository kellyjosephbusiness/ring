import styles from "./api.module.css";

const IMG = "/sites/iclosed/images";
const API_DOCS_URL = "https://developer.iclosed.io/";

export function ApiSection() {
  return (
    <div className={styles.outer} data-section="api">
      <div className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.panel}>
            <div className={styles.text}>
              <p className={styles.eyebrow}>API</p>
              <h2 className={styles.heading}>
                <span>Build on iClosed</span>
              </h2>
              <p className={styles.body}>
                Public REST API &amp; webhooks — pipe captured leads, recovery events and revenue
                data straight into the systems you run.
              </p>
              <a className={styles.cta} href={API_DOCS_URL}>
                Read the API Docs →
              </a>
            </div>
            <div className={styles.visual}>
              <img className={styles.visualBg} src={`${IMG}/9efd9fe8bde8.webp`} alt="" aria-hidden="true" />
              <div className={styles.shotClip}>
                <img
                  className={styles.shot}
                  src={`${IMG}/67839f900603.webp`}
                  alt="The iClosed API reference, showing base URLs and a quick-start guide"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
