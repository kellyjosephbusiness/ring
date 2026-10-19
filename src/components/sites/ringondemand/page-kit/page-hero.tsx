import { BOOK_CALL_URL } from "../links";
import { ProofList, type ProofLine } from "../shared/proof-list";
import { CtaLink } from "./cta-link";
import { Eyebrow } from "./eyebrow";
import styles from "./page-hero.module.css";

export interface PageHeroProps {
  eyebrow: string;
  /** Two headline lines; the second carries the blue accent. */
  headline: [string, string];
  sub?: string;
  cta?: { label: string; href: string };
  /** Small line under the button. */
  note?: string;
  /** Proof lines with verified badges, under the button. */
  proof?: readonly ProofLine[];
}

/** Interior page hero, after iClosed's /product/analytics hero: centred
 * eyebrow and a two-line Poppins headline, here with a subline and a CTA. */
export function PageHero({
  eyebrow,
  headline,
  sub,
  cta = { label: "Book a call", href: BOOK_CALL_URL },
  note,
  proof,
}: PageHeroProps) {
  return (
    <section className={styles.root} data-section="page-hero">
      <div className={styles.inner}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={styles.h1}>
          <span className={styles.line}>{headline[0]}</span>{" "}
          <span className={`${styles.line} ${styles.accent}`}>{headline[1]}</span>
        </h1>
        {sub ? <p className={styles.sub}>{sub}</p> : null}
        <div className={styles.ctaGroup}>
          <CtaLink href={cta.href}>{cta.label}</CtaLink>
          {note ? <p className={styles.note}>{note}</p> : null}
        </div>
        {proof ? <ProofList className={styles.proof} lines={proof} align="center" /> : null}
      </div>
    </section>
  );
}
