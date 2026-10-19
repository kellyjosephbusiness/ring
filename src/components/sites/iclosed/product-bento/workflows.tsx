import clsx from "clsx";
import { useId } from "react";

import styles from "./workflows.module.css";

const CLOCK_PATH =
  "M6.55994 4.37329V6.55994L8.19992 8.19992M11.4799 6.55994C11.4799 7.20604 11.3526 7.84581 11.1054 8.44272C10.8581 9.03964 10.4957 9.58201 10.0389 10.0389C9.58201 10.4957 9.03964 10.8581 8.44272 11.1054C7.84581 11.3526 7.20604 11.4799 6.55994 11.4799C5.91384 11.4799 5.27407 11.3526 4.67715 11.1054C4.08024 10.8581 3.53787 10.4957 3.08101 10.0389C2.62415 9.58201 2.26174 9.03964 2.01449 8.44272C1.76724 7.84581 1.63998 7.20604 1.63998 6.55994C1.63998 5.25509 2.15834 4.00368 3.08101 3.08101C4.00368 2.15834 5.25509 1.63998 6.55994 1.63998C7.86479 1.63998 9.1162 2.15834 10.0389 3.08101C10.9615 4.00368 11.4799 5.25509 11.4799 6.55994Z";
const MAIL_PATH =
  "M1.63998 4.37329L5.95315 7.24873C6.13281 7.3686 6.34396 7.43257 6.55994 7.43257C6.77592 7.43257 6.98707 7.3686 7.16673 7.24873L11.4799 4.37329M2.73331 10.3866H10.3866C10.6765 10.3866 10.9546 10.2714 11.1597 10.0663C11.3647 9.8613 11.4799 9.58321 11.4799 9.29325V3.82663C11.4799 3.53666 11.3647 3.25857 11.1597 3.05353C10.9546 2.8485 10.6765 2.73331 10.3866 2.73331H2.73331C2.44334 2.73331 2.16525 2.8485 1.96021 3.05353C1.75517 3.25857 1.63998 3.53666 1.63998 3.82663V9.29325C1.63998 9.58321 1.75517 9.8613 1.96021 10.0663C2.16525 10.2714 2.44334 10.3866 2.73331 10.3866Z";
const PHONE_PATH =
  "M6.55994 9.83991H6.56541M4.37329 11.4799H8.74659C9.03655 11.4799 9.31464 11.3647 9.51968 11.1597C9.72472 10.9546 9.83991 10.6765 9.83991 10.3866V2.73331C9.83991 2.44334 9.72472 2.16525 9.51968 1.96021C9.31464 1.75517 9.03655 1.63998 8.74659 1.63998H4.37329C4.08333 1.63998 3.80523 1.75517 3.6002 1.96021C3.39516 2.16525 3.27997 2.44334 3.27997 2.73331V10.3866C3.27997 10.6765 3.39516 10.9546 3.6002 11.1597C3.80523 11.3647 4.08333 11.4799 4.37329 11.4799Z";

function RowIcon({ d, stroke, className }: { d: string; stroke: string; className?: string }) {
  return (
    <svg
      className={clsx(styles.rowIcon, className)}
      viewBox="0 0 13.1199 13.1199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={d} stroke={stroke} strokeWidth="0.983991" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Card 3 — "SMS & email workflows": two reminder steps fire in sequence.
 * Pure CSS choreography (delays 250–2800 ms) once `.isPlay` is set. */
export function WorkflowsGraphic({ play = false }: { play?: boolean }) {
  const blurId = `${useId()}wfBlur`;

  return (
    <div className={clsx(styles.root, play && styles.isPlay)}>
      <div className={styles.panel}>
        <svg
          className={styles.blob}
          width="346.941"
          height="203.008"
          viewBox="0 0 346.941 203.008"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g filter={`url(#${blurId})`}>
            <path
              d="M267.673 131.423C229.924 165.571 187.205 179.858 172.258 163.335C157.311 146.811 175.795 105.734 213.544 71.5856C251.293 37.4375 294.011 23.15 308.959 39.6735C323.906 56.197 305.422 97.2745 267.673 131.423Z"
              fill="#C3DDFD"
            />
            <path
              d="M114.474 111.843C68.4005 108.095 31.8421 95.3232 32.8188 83.3173C33.7955 71.3113 71.9376 64.6171 118.011 68.3654C164.085 72.1137 200.644 84.885 199.667 96.891C198.69 108.897 160.548 115.591 114.474 111.843Z"
              fill="#C3DDFD"
            />
          </g>
          <defs>
            <filter
              id={blurId}
              x="0"
              y="0"
              width="346.941"
              height="203.008"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="16.3998" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>

        <div className={styles.header}>
          <svg
            className={styles.icon}
            viewBox="-2.7515 -2.7135 22.012 21.704"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="7.33721" height="7.23483" rx="1.31199" fill="#3F83F8" />
            <path
              d="M3.6686 7.23483V11.349C3.6686 12.0736 4.256 12.661 4.98059 12.661H9.17151"
              stroke="#A4CAFE"
              strokeWidth="1.96798"
              fill="none"
            />
            <rect x="9.17151" y="9.04354" width="7.33721" height="7.23483" rx="1.31199" fill="#3F83F8" />
          </svg>
          <span className={styles.title}>Workflows</span>
        </div>

        <div className={styles.steps}>
          <div className={styles.connector} />
          <div className={clsx(styles.card, styles.card1)}>
            <div className={styles.clockrow}>
              <RowIcon d={CLOCK_PATH} stroke="#6B7280" className={styles.iconClock1} />
              <span className={styles.clocktext}>2 days before event starts at 9am</span>
            </div>
            <div className={styles.actionrow}>
              <RowIcon d={MAIL_PATH} stroke="#1C64F2" className={styles.iconMail} />
              <span className={styles.actiontext}>Send email to invitee</span>
            </div>
          </div>
          <div className={clsx(styles.card, styles.card2)}>
            <div className={styles.clockrow}>
              <RowIcon d={CLOCK_PATH} stroke="#6B7280" />
              <span className={styles.clocktext}>2 hours before the event starts</span>
            </div>
            <div className={styles.actionrow}>
              <RowIcon d={PHONE_PATH} stroke="#7E3AF2" className={styles.iconPhone} />
              <span className={styles.actiontext}>Send SMS to invitee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
