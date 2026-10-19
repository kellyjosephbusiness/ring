import type { ReactNode } from "react";

import { CtaLink } from "./cta-link";
import { Eyebrow } from "./eyebrow";
import styles from "./split-card.module.css";

export interface SplitCardProps {
  id?: string;
  eyebrow?: string;
  heading: string;
  body: ReactNode;
  cta?: { label: string; href: string };
  visual: ReactNode;
}

/** iClosed's "1-1 Onboarding" card: a pale grey card with the text on the
 * left and a dark visual on the right. */
export function SplitCard({ id, eyebrow, heading, body, cta, visual }: SplitCardProps) {
  return (
    <section id={id} className={styles.section} data-section="split-card">
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.text}>
            <div className={styles.head}>
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h2 className={styles.heading}>{heading}</h2>
              <div className={styles.body}>{body}</div>
            </div>
            {cta ? <CtaLink href={cta.href}>{cta.label}</CtaLink> : null}
          </div>
          <div className={styles.visual}>{visual}</div>
        </div>
      </div>
    </section>
  );
}
