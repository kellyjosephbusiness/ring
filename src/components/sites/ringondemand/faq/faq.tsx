import { FaqList, type FaqItem } from "./faq-list";
import styles from "./faq.module.css";

const ITEMS: readonly FaqItem[] = [
  {
    question: "Do you sell web form leads?",
    answer: "No. Calls and live transfers convert better in legal, so that is all we sell.",
  },
  {
    question: "What counts as a transfer I pay for?",
    answer: "A caller who passed your qualifying questions and was connected live to your intake line.",
  },
  {
    question: "What happens if a signed case falls out?",
    answer: "If it falls out inside 28 days, we replace it.",
  },
  {
    question: "Do I have to commit to a monthly volume?",
    answer: "No. You buy an order, we deliver it, and you reorder when you want more.",
  },
  {
    question: "Who do I talk to on the call?",
    answer:
      "A licensed attorney on our team. On the call you will see our ads, our landing pages, our intake questions, and the names of firms we work with.",
  },
  {
    question: "Which states do you cover?",
    answer: "Any U.S. state. In California we advertise under your firm's name and you approve every creative first.",
  },
  {
    question: "How fast can transfers start?",
    answer: "Usually within 24 hours of the signed order.",
  },
];

/** "Questions firms ask us": a centred accordion, every answer closed. */
export function Faq() {
  return (
    <section id="faq" className={styles.section} data-section="faq" aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <h2 id="faq-heading" className={styles.heading}>
          Questions firms ask us
        </h2>
        <FaqList items={ITEMS} />
      </div>
    </section>
  );
}
