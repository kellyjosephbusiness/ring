import type { ReactNode } from "react";

import { CtaLink } from "./cta-link";
import { Eyebrow } from "./eyebrow";
import styles from "./feature-row.module.css";

export interface FeatureRowProps {
  id?: string;
  eyebrow?: string;
  heading: { lead: string; accent?: string };
  body: ReactNode;
  cta?: { label: string; href: string };
  visual: ReactNode;
  /** Text on the left and the visual on the right. */
  reverse?: boolean;
}

/** iClosed's two-column feature row: a grey visual panel beside an eyebrow,
 * heading, paragraph and button. */
export function FeatureRow({ id, eyebrow, heading, body, cta, visual, reverse = false }: FeatureRowProps) {
  return (
    <section
      id={id}
      className={styles.section}
      data-section="feature-row"
      data-reverse={reverse || undefined}
    >
      <div className={styles.inner}>
        <div className={styles.visual}>{visual}</div>
        <div className={styles.text}>
          <div className={styles.head}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2 className={styles.heading}>
              {heading.lead}
              {heading.accent ? (
                <>
                  {" "}
                  <span className={styles.accent}>{heading.accent}</span>
                </>
              ) : null}
            </h2>
            <div className={styles.body}>{body}</div>
          </div>
          {cta ? <CtaLink href={cta.href}>{cta.label}</CtaLink> : null}
        </div>
      </div>
    </section>
  );
}
