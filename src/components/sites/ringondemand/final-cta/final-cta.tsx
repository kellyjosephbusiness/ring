"use client";

import { useEffect, useRef, useState } from "react";

import { BOOK_CALL_TARGET, BOOK_CALL_URL } from "../links";
import styles from "./final-cta.module.css";

type Reveal = "idle" | "armed" | "shown";

/** Fades the band's content up the first time it scrolls into view. Content
 * that is already on screen when the page loads (or with reduced motion)
 * never hides. */
function useRevealOnEnter() {
  const ref = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<Reveal>("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let first = true;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (first) {
          first = false;
          if (visible) observer.disconnect();
          else setReveal("armed");
          return;
        }
        if (visible) {
          setReveal("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, reveal };
}

export function FinalCta() {
  const { ref, reveal } = useRevealOnEnter();

  return (
    <section
      ref={ref}
      id="book-a-call"
      className={styles.outer}
      data-section="final-cta"
      data-reveal={reveal}
    >
      <div className={styles.band}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>
            Tell us your case criteria and{" "}
            <span className={styles.headingAccent}>we will tell you what we can deliver</span>
          </h2>
          <p className={styles.subcopy}>
            Book a call with a licensed attorney on our team. We show you the ads, the intake
            questions, and the firms we already work with, and you decide.
          </p>
          <a
            className={styles.cta}
            href={BOOK_CALL_URL}
            target={BOOK_CALL_TARGET}
            rel={BOOK_CALL_TARGET ? "noopener" : undefined}
          >
            <span>Book a call</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
