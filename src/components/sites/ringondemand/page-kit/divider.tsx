import styles from "./divider.module.css";

/** iClosed's 40px hatched band between sections, drawn between the rails. */
export function Divider() {
  return <div className={styles.divider} aria-hidden="true" />;
}
