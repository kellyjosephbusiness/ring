"use client";

import { useEffect, useRef, useState } from "react";

import { BookingWidget } from "./booking-widget";
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

interface FinalCtaProps {
  /** Heading, split where the blue accent starts. */
  heading?: { lead: string; accent: string };
  body?: string;
}

const DEFAULT_HEADING = {
  lead: "Tell us your case criteria and",
  accent: "we will tell you what we can deliver",
};

const DEFAULT_BODY =
  "Book a call with a licensed attorney on our team. We show you the ads, the intake questions, and the firms we already work with, and you decide.";

/** The closing band every page ends with. It is the "Book a call" anchor
 * (#book-a-call) and holds the iClosed booking widget. */
export function FinalCta({ heading = DEFAULT_HEADING, body = DEFAULT_BODY }: FinalCtaProps) {
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
            {heading.lead} <span className={styles.headingAccent}>{heading.accent}</span>
          </h2>
          <p className={styles.subcopy}>{body}</p>
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
