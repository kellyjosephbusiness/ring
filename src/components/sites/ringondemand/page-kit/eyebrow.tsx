import styles from "./eyebrow.module.css";

/** Small uppercase kicker above a heading, in iClosed's dark-to-blue
 * gradient text. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <p className={styles.eyebrow}>
      <span className={styles.text}>{children}</span>
    </p>
  );
}
