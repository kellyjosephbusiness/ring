"use client";

import clsx from "clsx";
import { useId } from "react";

import { useSteps } from "./bento-hooks";
import { CountUp } from "./count-up";
import { SchedulerLogo } from "./scheduler-logo";
import styles from "./routing.module.css";

const AGES = ["18-25", "26-35", "35-40", "40+"] as const;
const PICKED_AGE = "35-40";

/** Beats (ms after play starts); each switches on one more state class. */
const BEAT_TIMES = [400, 900, 1300, 1900, 2150, 2600, 2800] as const;
const BEAT_CLASSES = [
  styles.stSel, // the 35-40 radio pops
  styles.stPill, // "Age 35-40" pill appears
  styles.stLine, // connector draws to the closers and down to the chip
  styles.stAssign, // middle closer is assigned
  styles.stCheck, // blue check pops on the closer
  styles.stChip, // "21% more conversions" chip rises (counter starts)
  styles.stArrow, // green arrow pops
];

const CLOSERS = [
  { src: "/sites/iclosed/images/86c310987a46.webp", className: clsx(styles.avSm, styles.avL) },
  { src: "/sites/iclosed/images/b75fb6aa9930.webp", className: styles.avMid },
  { src: "/sites/iclosed/images/c39c6a5402e1.webp", className: clsx(styles.avSm, styles.avR) },
];

/** Card 2 — "Conditional routing": an age answer routes the lead to a closer. */
export function RoutingGraphic({ play = false }: { play?: boolean }) {
  const uid = useId();
  const beats = useSteps(play, BEAT_TIMES);
  const gradientId = `${uid}rtConn`;

  return (
    <div className={clsx(styles.root, play && styles.isPlay, ...(play ? BEAT_CLASSES.slice(0, beats) : []))}>
      <svg className={styles.connector} viewBox="0 0 384 260" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="145" y1="0" x2="304" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#aec6f4" />
            <stop offset="1" stopColor="#5e86d5" />
          </linearGradient>
        </defs>
        <path
          className={styles.connPath}
          d="M145 66.4 H304 V140"
          pathLength={1}
          stroke={`url(#${gradientId})`}
          strokeWidth="1.3"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      </svg>

      <div className={styles.scheduler}>
        <div className={styles.schedHead}>
          <span className={styles.logo} aria-hidden="true">
            <SchedulerLogo />
          </span>
          <span className={styles.schedTitle}>Your Scheduler</span>
        </div>
        <div className={styles.schedBody}>
          <div className={styles.fields}>
            <div className={styles.question}>What is your age?</div>
            <div className={styles.radios}>
              {AGES.map((age) => (
                <div key={age} className={clsx(styles.radio, age === PICKED_AGE && styles.radioSel)}>
                  <span className={styles.radioDot} />
                  <span className={styles.radioLabel}>{age}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.agepill}>
        <div className={styles.agepillK}>Age</div>
        <div className={styles.agepillV}>{PICKED_AGE}</div>
      </div>

      <div className={styles.avatars}>
        <div className={styles.avRow}>
          {CLOSERS.map((closer) => (
            <span key={closer.src} className={clsx(styles.av, closer.className)} aria-hidden="true">
              <img src={closer.src} alt="" width={96} height={96} />
            </span>
          ))}
        </div>
        <span className={styles.check} aria-hidden="true">
          <svg viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6.2" fill="#3f83f8" stroke="#ffffff" strokeWidth="1.1" />
            <path
              d="M4.3 7.15 L6.15 9 L9.7 5.2"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className={styles.chip}>
        <div className={styles.chipInner}>
          <div className={styles.chipRow}>
            <span className={styles.chipPct}>
              <CountUp play={play} to={21} delay={2600} duration={700} suffix="%" />
            </span>
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10.6" fill="#31c48d" />
                <path
                  className={styles.arrowPath}
                  d="M11 15.6 V7.1 M7.2 10.9 L11 7 L14.8 10.9"
                  stroke="#ffffff"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className={styles.chipSub}>more conversions</div>
        </div>
      </div>
    </div>
  );
}
