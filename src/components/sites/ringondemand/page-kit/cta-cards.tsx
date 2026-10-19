import type { ReactNode } from "react";

import { CtaLink } from "./cta-link";
import { SectionHeading, type SectionHeadingProps } from "./section-heading";
import styles from "./cta-cards.module.css";

export interface CtaCard {
  id?: string;
  eyebrow: string;
  title: string;
  /** Large figure beside a unit, for priced offers. */
  price?: { amount: string; unit: string };
  body: ReactNode;
  cta: { label: string; href: string };
  /** Small line beside the button. */
  aside?: string;
  /** "plain" grey card or the blue-tinted, blue-edged card. */
  tone?: "plain" | "blue";
}

export interface CtaCardsProps {
  id?: string;
  heading?: SectionHeadingProps;
  cards: readonly CtaCard[];
}

/** iClosed /results' pair of cards ("Start your Free Trial" / "Book a 5-min
 * demo"), reused for offers and next steps. One card centres on its own. */
export function CtaCards({ id, heading, cards }: CtaCardsProps) {
  return (
    <section
      id={id}
      className={styles.section}
      data-section="cta-cards"
      data-heading={heading ? "" : undefined}
    >
      {heading ? (
        <div className={styles.headWrap}>
          <SectionHeading {...heading} />
        </div>
      ) : null}
      <div className={styles.inner} data-count={cards.length}>
        {cards.map((card) => (
          <article
            key={card.title}
            id={card.id}
            className={styles.card}
            data-tone={card.tone ?? "plain"}
          >
            <div className={styles.cardHead}>
              <p className={styles.eyebrow}>{card.eyebrow}</p>
              <h3 className={styles.title}>{card.title}</h3>
              {card.price ? (
                <p className={styles.price}>
                  <span className={styles.amount}>{card.price.amount}</span>{" "}
                  <span className={styles.unit}>{card.price.unit}</span>
                </p>
              ) : null}
              <div className={styles.body}>{card.body}</div>
            </div>
            <div className={styles.actions}>
              <CtaLink href={card.cta.href} variant={card.tone === "blue" ? "blue" : "outline"}>
                {card.cta.label}
              </CtaLink>
              {card.aside ? <p className={styles.aside}>{card.aside}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
