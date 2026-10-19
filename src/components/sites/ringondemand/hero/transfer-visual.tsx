"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import styles from "./transfer-visual.module.css";

/** Screening checks any buyer sets, ticked in order. */
const CHECKS = [
  "Inside the states you work in",
  "Fits your criteria",
  "Answered every qualifying question",
  "Wants to talk now",
] as const;

/** Share of the frame that must be on screen before the checks tick in. */
const IN_VIEW_THRESHOLD = 0.35;

type IndexStyle = CSSProperties & { "--i": number };

function PersonGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8.25" r="4.25" />
      <path d="M3.75 20.1c.6-4.05 4-6.6 8.25-6.6s7.65 2.55 8.25 6.6a.9.9 0 0 1-.9 1.05H4.65a.9.9 0 0 1-.9-1.05Z" />
    </svg>
  );
}

function PhoneGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

function Tick() {
  return (
    <svg className={styles.tick} viewBox="0 0 20 20" aria-hidden="true">
      <circle className={styles.tickDisc} cx="10" cy="10" r="9.25" />
      <path className={styles.tickMark} d="M6.25 10.4l2.45 2.4 5.05-5.3" pathLength={1} />
    </svg>
  );
}

/**
 * Hero illustration: a live transfer passing the firm's screening checks.
 * Rendered in its pending state; once the frame is in view the checks tick in
 * one by one and the transfer line goes live. Without JavaScript, or with
 * reduced motion, it shows the finished state.
 */
export function TransferVisual() {
  const frameRef = useRef<HTMLDivElement>(null);

  // `data-play` releases the CSS choreography; it is set on the node directly
  // and only once, so React never has to re-render the illustration.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const play = () => {
      frame.dataset.play = "";
    };
    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        play();
      },
      { threshold: IN_VIEW_THRESHOLD },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={styles.frame} aria-hidden="true">
      <div className={styles.top}>
        <div className={styles.window}>
          <div className={styles.windowBar}>Live transfer</div>

          <div className={styles.caller}>
            <span className={styles.avatar}>
              <PersonGlyph className={styles.avatarGlyph} />
            </span>
            <span className={styles.skeleton}>
              <span className={styles.skeletonLine} />
              <span className={styles.skeletonLineShort} />
            </span>
            <span className={styles.onCall}>
              <PhoneGlyph className={styles.onCallGlyph} />
              <span className={styles.wave}>
                <span />
                <span />
                <span />
                <span />
              </span>
            </span>
          </div>

          <ul className={styles.checks}>
            {CHECKS.map((label, i) => (
              <li key={label} className={styles.check} style={{ "--i": i } as IndexStyle}>
                <Tick />
                <span className={styles.checkLabel}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.status}>
          <p className={styles.statusRow}>
            <span className={styles.liveDot} />
            <span className={styles.statusText}>Transferring to your team</span>
          </p>
          <div className={styles.route}>
            <span className={styles.routeCaller}>
              <PersonGlyph className={styles.routeGlyph} />
            </span>
            <span className={styles.track}>
              <span className={styles.trackDash} />
              <span className={styles.trackPulse} />
            </span>
            <span className={styles.routeFirm}>
              <PhoneGlyph className={styles.routeGlyph} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
