import type { LucideIcon } from "lucide-react";

import { CtaLink } from "./cta-link";
import { SectionHeading, type SectionHeadingProps } from "./section-heading";
import styles from "./feature-columns.module.css";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface FeatureColumnsProps {
  id?: string;
  heading?: SectionHeadingProps;
  items: readonly FeatureItem[];
  cta?: { label: string; href: string };
  /** Three across (default), or two across for four items. */
  layout?: "row" | "grid";
}

/** iClosed's three feature columns under the analytics video: icon, title
 * and body in hairline-divided cells, then a centred button. */
export function FeatureColumns({ id, heading, items, cta, layout = "row" }: FeatureColumnsProps) {
  return (
    <section
      id={id}
      className={styles.section}
      data-section="feature-columns"
      data-heading={heading ? "" : undefined}
    >
      {heading ? (
        <div className={styles.headWrap}>
          <SectionHeading {...heading} />
        </div>
      ) : null}
      <div className={styles.band}>
        <ul className={styles.cells} data-layout={layout}>
          {items.map(({ icon: Icon, title, body }) => (
            <li key={title} className={styles.cell}>
              <Icon className={styles.icon} strokeWidth={1.5} aria-hidden="true" />
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </li>
          ))}
        </ul>
      </div>
      {cta ? (
        <div className={styles.ctaRow}>
          <CtaLink href={cta.href}>{cta.label}</CtaLink>
        </div>
      ) : null}
    </section>
  );
}
