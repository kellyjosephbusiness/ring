import { JsonLd } from "../seo/json-ld";
import { faqPage } from "../seo/schema";
import { FIRM_FAQ } from "./faq-content";
import { FaqList, type FaqItem } from "./faq-list";
import styles from "./faq.module.css";

interface FaqProps {
  heading?: string;
  items?: readonly FaqItem[];
}

/** A centred accordion, every answer closed, plus the same questions as
 * FAQPage structured data so answer engines read exactly what is shown. */
export function Faq({ heading = "Questions firms ask us", items = FIRM_FAQ }: FaqProps) {
  return (
    <section id="faq" className={styles.section} data-section="faq" aria-labelledby="faq-heading">
      <JsonLd data={faqPage(items)} />
      <div className={styles.inner}>
        <h2 id="faq-heading" className={styles.heading}>
          {heading}
        </h2>
        <FaqList items={items} />
      </div>
    </section>
  );
}
