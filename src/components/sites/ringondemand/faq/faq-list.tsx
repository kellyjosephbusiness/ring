"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import styles from "./faq.module.css";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: readonly FaqItem[];
};

/**
 * Accordion: each question is a heading-wrapped button that expands its own
 * answer region. Any number can be open at once; all start closed. Arrow
 * Up/Down, Home and End move between the questions.
 */
export function FaqList({ items }: FaqListProps) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    let target: number;
    switch (event.key) {
      case "ArrowDown":
        target = index === last ? 0 : index + 1;
        break;
      case "ArrowUp":
        target = index === 0 ? last : index - 1;
        break;
      case "Home":
        target = 0;
        break;
      case "End":
        target = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    triggers.current[target]?.focus();
  };

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const triggerId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className={isOpen ? `${styles.item} ${styles.itemOpen}` : styles.item}>
            <h3 className={styles.question}>
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                id={triggerId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} className={styles.panel}>
              <div className={styles.panelClip}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
