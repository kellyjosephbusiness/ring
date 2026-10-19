"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CASE_STUDIES, READ_LABEL, caseStudyHref } from "./case-studies-data";
import styles from "./case-studies.module.css";

/** Autoplay advances one card every 5s while the rail is ≥35% on screen and
 * not hovered or focused. An arrow click restarts the interval. */
const AUTOPLAY_MS = 5000;
const IN_VIEW_THRESHOLD = 0.35;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path
        d={dir === "left" ? "M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" : "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CaseStudyRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [nudges, setNudges] = useState(0);

  /** The lit card is whichever is nearest the rail's centre. */
  const measure = useCallback(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    const box = ticker.getBoundingClientRect();
    const centre = box.left + box.width / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - centre);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    activeRef.current = best;
    setActive(best);
    setLive(true);
  }, []);

  /** Centre card `index` (wrapping at both ends) with a smooth scroll. */
  const goTo = useCallback((index: number) => {
    const ticker = tickerRef.current;
    const count = CASE_STUDIES.length;
    const card = cardRefs.current[((index % count) + count) % count];
    if (!ticker || !card) return;
    const box = ticker.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    ticker.scrollTo({
      left: ticker.scrollLeft + (r.left + r.width / 2) - (box.left + box.width / 2),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  const step = (dir: 1 | -1) => {
    setNudges((n) => n + 1);
    goTo(activeRef.current + dir);
  };

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    const frame = requestAnimationFrame(measure);
    ticker.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      ticker.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), {
      threshold: IN_VIEW_THRESHOLD,
    });
    io.observe(rail);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || held || prefersReducedMotion()) return;
    const id = window.setInterval(() => goTo(activeRef.current + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [inView, held, nudges, goTo]);

  return (
    <div
      ref={railRef}
      className={styles.rail}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div
        ref={tickerRef}
        className={styles.ticker}
        role="region"
        aria-label="Case studies"
        tabIndex={0}
        data-live={live ? "" : undefined}
        data-cs-ticker=""
      >
        {CASE_STUDIES.map((study, i) => (
          <article
            key={study.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={i === active ? `${styles.card} ${styles.cardActive}` : styles.card}
            data-cs-card=""
            data-active={live && i === active ? "" : undefined}
          >
            <img
              className={styles.media}
              src={study.photo.src}
              srcSet={study.photo.srcSet}
              sizes="(max-width: 1100px) 100vw, 1008px"
              loading="lazy"
              decoding="async"
              alt=""
            />
            <span className={styles.scrim} aria-hidden="true" />
            <div className={styles.panel}>
              <div className={styles.metrics}>
                {study.metrics.map(([stat, label]) => (
                  <div key={label} className={styles.metric}>
                    <p className={styles.stat}>{stat}</p>
                    <p className={styles.statLabel}>{label}</p>
                  </div>
                ))}
              </div>
              <span className={styles.read}>{READ_LABEL}</span>
            </div>
            <div className={styles.quoteBlock}>
              <p className={styles.quote}>{study.quote}</p>
              <div className={styles.who}>
                <span className={styles.name}>{study.name}</span>
                <span className={styles.org}>{study.org}</span>
              </div>
            </div>
            <a
              className={styles.cardLink}
              href={caseStudyHref(study.slug)}
              aria-label={`Read case study — ${study.org}`}
            />
          </article>
        ))}
      </div>
      <div className={styles.nav} data-cs-nav="">
        <button type="button" className={styles.navBtn} onClick={() => step(-1)} aria-label="Previous case study">
          <Arrow dir="left" />
        </button>
        <button type="button" className={styles.navBtn} onClick={() => step(1)} aria-label="Next case study">
          <Arrow dir="right" />
        </button>
      </div>
    </div>
  );
}
