import { Eyebrow } from "./eyebrow";
import styles from "./section-heading.module.css";

export interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  /** Heading, split where the blue accent starts. */
  heading: { lead: string; accent?: string };
  sub?: string;
  /** Heading level; sections default to h2. */
  as?: "h2" | "h3";
}

/** Centred eyebrow, heading and intro (iClosed "Features Heading"). */
export function SectionHeading({ id, eyebrow, heading, sub, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={styles.heading}>
        {heading.lead}
        {heading.accent ? (
          <>
            {" "}
            <span className={styles.accent}>{heading.accent}</span>
          </>
        ) : null}
      </Tag>
      {sub ? <p className={styles.sub}>{sub}</p> : null}
    </div>
  );
}
