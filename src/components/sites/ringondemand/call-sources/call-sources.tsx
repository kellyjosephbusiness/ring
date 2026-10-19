import styles from "./call-sources.module.css";
import { SourcesDiagram } from "./sources-diagram";

export function CallSources() {
  return (
    <section className={styles.section} data-section="call-sources" aria-labelledby="call-sources-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 id="call-sources-heading" className={styles.heading}>
            Where the calls come from
          </h2>
          <p className={styles.body}>
            We run our own ads and we buy from a vetted publisher network. Every caller, from either
            source, goes through the same intake script before they reach you.
          </p>
        </div>
        <div className={styles.panel}>
          <SourcesDiagram />
        </div>
      </div>
    </section>
  );
}
