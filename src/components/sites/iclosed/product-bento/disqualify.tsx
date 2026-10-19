"use client";

import clsx from "clsx";
import { useId } from "react";

import { buildTypingFrames, useSteps } from "./bento-hooks";
import { SchedulerLogo } from "./scheduler-logo";
import styles from "./disqualify.module.css";

/** What the idle (and reduced-motion) graphic shows in the email field. */
const IDLE_EMAIL = "jacob@gmail.com";

/** The lead types a personal address, pauses, then corrects it to a work one. */
const TYPING = buildTypingFrames(
  [
    { type: "jacob@gmail.com", cps: 13 },
    { pause: 1546 },
    { backspace: 9, cps: 30 },
    { type: "acme.com", cps: 13 },
  ],
  300,
);
const TYPING_TIMES = TYPING.map((frame) => frame.at);

/** Choreography beats (ms after play starts) → state class they switch on. */
const BEATS = [
  [1600, styles.stConn1],
  [2050, styles.stChip1],
  [3000, styles.stChip1Relax],
  [4100, styles.stValid],
  [4600, styles.stR1],
  [4800, styles.stConn2],
  [5200, styles.stChip2],
  [6000, styles.stR2],
  [6000, styles.stChip2Relax],
  [6200, styles.stConn3],
  [6600, styles.stChip3],
  [7400, styles.stSettle],
] as const;
const BEAT_TIMES = BEATS.map(([ms]) => ms);

const CONNECTOR_STOPS = (
  <>
    <stop stopColor="#1C64F2" stopOpacity="0.17" />
    <stop offset="1" stopColor="#527CCF" />
  </>
);

function RadioOff({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(styles.radio, styles.radioUnsel, className)}
      viewBox="0 0 11.6979 11.6979"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="5.84893" cy="5.84893" r="5.50488" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="0.688109" />
    </svg>
  );
}

function RadioOn({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(styles.radio, styles.radioSel, className)}
      viewBox="0 0 12.8182 12.9414"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.40918 1.40234C9.16186 1.40239 11.416 3.65868 11.416 6.4707C11.416 9.28274 9.16187 11.539 6.40918 11.5391C3.65645 11.5391 1.40234 9.28277 1.40234 6.4707C1.40235 3.65865 3.65646 1.40234 6.40918 1.40234Z"
        fill="#F9FAFB"
        stroke="#1C64F2"
        strokeWidth="2.80398"
      />
    </svg>
  );
}

function ChipRadio({ stroke }: { stroke: string }) {
  return (
    <svg
      className={styles.chipRadio}
      viewBox="0 0 12.5585 12.5585"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="6.27925" cy="6.27925" r="6" fill="none" stroke="#D1D5DB" strokeWidth="0.558495" />
      <circle cx="6.27925" cy="6.27925" r="4.82725" fill="#F9FAFB" stroke={stroke} strokeWidth="2.3455" />
    </svg>
  );
}

/** The email field's text; its own component so keystrokes re-render only it. */
function TypedEmail({ play }: { play: boolean }) {
  const typed = useSteps(play, TYPING_TIMES);
  return <>{typed > 0 ? TYPING[typed - 1].text : play ? "" : IDLE_EMAIL}</>;
}

/** Card 1 — "Disqualify automatically": a scheduler form whose answers light
 * up Qualify / Disqualify rules one after another. */
export function DisqualifyGraphic({ play = false }: { play?: boolean }) {
  const uid = useId();
  const beats = useSteps(play, BEAT_TIMES);
  const gradient = (n: number) => `${uid}dqC${n}`;

  return (
    <div className={clsx(styles.root, play && styles.isPlay, ...BEATS.slice(0, beats).map(([, cls]) => cls))}>
      <svg
        className={styles.connectors}
        viewBox="0 0 384 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradient(1)} x1="-7.85421" y1="-16.5344" x2="72.4712" y2="8.07965" gradientUnits="userSpaceOnUse">
            {CONNECTOR_STOPS}
          </linearGradient>
          <linearGradient id={gradient(2)} x1="-7.85421" y1="-6.82303" x2="51.8498" y2="34.183" gradientUnits="userSpaceOnUse">
            {CONNECTOR_STOPS}
          </linearGradient>
          <linearGradient id={gradient(3)} x1="-7.85421" y1="-7.09278" x2="53.1312" y2="33.3972" gradientUnits="userSpaceOnUse">
            {CONNECTOR_STOPS}
          </linearGradient>
        </defs>
        <g transform="translate(171.99 49.6)">
          <path
            className={clsx(styles.conn, styles.conn1)}
            pathLength={1}
            d="M0 66H9.38806C16.5678 66 22.3881 60.1797 22.3881 53V14C22.3881 6.8203 28.2084 1 35.3881 1H50"
            stroke={`url(#${gradient(1)})`}
            strokeWidth="2"
            fill="none"
          />
        </g>
        <g transform="translate(171.99 132.6) scale(1 -1) translate(0 -31)">
          <path
            className={clsx(styles.conn, styles.conn2)}
            pathLength={1}
            d="M0 1H6.97068C14.1504 1 19.9707 6.8203 19.9707 14V17C19.9707 24.1797 25.791 30 32.9707 30H50"
            stroke={`url(#${gradient(2)})`}
            strokeWidth="2"
            fill="none"
          />
        </g>
        <g transform="translate(171.99 174.6)">
          <path
            className={clsx(styles.conn, styles.conn3)}
            pathLength={1}
            d="M0 1H6.97068C14.1504 1 19.9707 6.8203 19.9707 14V18C19.9707 25.1797 25.791 31 32.9707 31H50"
            stroke={`url(#${gradient(3)})`}
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>

      <div className={styles.card}>
        <div className={styles.cardHead}>
          <SchedulerLogo className={styles.logo} />
          <span className={styles.cardTitle}>Your Scheduler</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.field}>
            <span className={styles.label}>Email</span>
            <div className={styles.input}>
              <span className={styles.inputText}>
                <TypedEmail play={play} />
                <span className={styles.caret} aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className={styles.company}>
            <div className={styles.companyLabel}>
              <span className={styles.label}>If Company size is </span>
            </div>
            <div className={styles.radioRow}>
              <RadioOff className={styles.r1Unsel} />
              <RadioOn className={styles.r1Sel} />
              <span className={styles.radioTxt}>1-10</span>
            </div>
            <div className={styles.radioRow}>
              <RadioOff />
              <span className={styles.radioTxt}>10-50</span>
            </div>
            <div className={styles.radioRow}>
              <RadioOff className={styles.r3Unsel} />
              <RadioOn className={styles.r3Sel} />
              <span className={styles.radioTxt}>50-100</span>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.chip, styles.chipRed, styles.chip1)}>
        <span className={clsx(styles.chipHead, styles.chipHeadRed)}>
          <span className={styles.c1Bad}>Disqualify</span>
          <span className={styles.c1Good}>Qualify</span>
        </span>
        <div className={styles.chipRow}>
          <span className={styles.chipVal}>
            <span className={styles.c1Bad}>Non business email</span>
            <span className={styles.c1Good}>Business email</span>
          </span>
        </div>
      </div>

      <div className={clsx(styles.chip, styles.chipRed, styles.chip2)}>
        <span className={clsx(styles.chipHead, styles.chipHeadRed)}>Disqualify</span>
        <div className={styles.chipRow}>
          <ChipRadio stroke="#E02424" />
          <span className={styles.chipVal}>1-10</span>
        </div>
      </div>

      <div className={clsx(styles.chip, styles.chipGreen, styles.chip3)}>
        <span className={clsx(styles.chipHead, styles.chipHeadGreen)}>Qualify</span>
        <div className={styles.chipRow}>
          <ChipRadio stroke="#0E9F6E" />
          <span className={styles.chipVal}>50-100</span>
        </div>
      </div>
    </div>
  );
}
