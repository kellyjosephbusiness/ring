"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import {
  AGENT_CHATS,
  AGENT_DEMO,
  AGENT_FINAL_STEP,
  AGENT_START_DELAY,
  TYPE_TICK_MS,
  agentStepTimes,
  type AgentChat,
} from "./agent-data";
import { AGENT_MARKS } from "./assets";
import styles from "./agent-panel.module.css";
import { cx, prefersReducedMotion } from "./utils";

/* "AI Agent": the chat window types the question into its composer, sends it,
   thinks, runs three tool calls (iClosed, the connector, the working-out) and
   answers with a table and a recommendation. Reduced motion shows the settled
   answer. */

export function AgentPanel() {
  const [still] = useState(prefersReducedMotion);
  const [step, setStep] = useState(still ? AGENT_FINAL_STEP : 0);
  const [typed, setTyped] = useState(0);
  const timers = useRef<number[]>([]);
  const ticker = useRef<number | null>(null);

  useEffect(() => {
    if (still) return;
    const pending = timers.current;
    const ask = AGENT_DEMO.ask;
    const start = window.setTimeout(() => {
      let count = 0;
      ticker.current = window.setInterval(() => {
        count = Math.min(ask.length, count + 2);
        setTyped(count);
        if (count >= ask.length && ticker.current) {
          window.clearInterval(ticker.current);
          ticker.current = null;
        }
      }, TYPE_TICK_MS);
      agentStepTimes(ask).forEach(([at, next]) => {
        pending.push(window.setTimeout(() => setStep(next), at));
      });
    }, AGENT_START_DELAY);
    pending.push(start);
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
      pending.length = 0;
      if (ticker.current) window.clearInterval(ticker.current);
      ticker.current = null;
    };
  }, [still]);

  return (
    <div className={styles.canvas} data-shot="">
      <p className={styles.sr}>
        {`Asked an AI agent: “${AGENT_DEMO.ask}” It read iClosed and ${AGENT_DEMO.name}, then answered: ${AGENT_DEMO.decision}`}
      </p>
      <AgentChatWindow chat={AGENT_DEMO} step={step} typed={typed} />
    </div>
  );
}

function IClosedMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 19.2 17.09" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0.461606 0C1.00927 0 9.76942 0 9.76942 0C8.83456 0.491847 6.88333 1.70389 6.55728 2.62987C11.2214 -0.293603 18.7181 0.331243 18.8735 0.378922C19.0288 0.429111 19.2632 0.501884 19.1842 0.805524C19.1052 1.10665 10.4292 16.1507 10.0573 16.8206C9.91462 17.0767 9.49176 17.2975 9.07655 16.7203C8.66135 16.1431 6.92918 13.0089 6.54455 12.2334C6.65153 10.4292 9.52743 7.51321 12.7956 5.2748C9.935 6.43165 6.95976 8.75789 5.75234 11.0139C5.18684 10.0603 4.63152 9.12175 4.51944 8.92602C4.14244 8.26603 1.60025 4.25598 0.130457 1.05647C-0.0758737 0.612299 -0.0860622 0 0.461606 0Z"
      />
    </svg>
  );
}

function DoneTick() {
  return (
    <span className={styles.ok}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function AgentMarks({ size = "sm", only }: { size?: "sm" | "lg"; only?: number }) {
  const marks = only === undefined ? AGENT_MARKS : [AGENT_MARKS[only]];
  return (
    <span className={cx(styles.agents, size === "lg" && styles.agentsLg)}>
      {marks.map((mark) => (
        <span className={styles.agent} key={mark.src}>
          <img src={mark.src} alt="" className={mark.invert ? styles.invert : undefined} />
        </span>
      ))}
    </span>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    </svg>
  );
}

const RECENTS = ["Monday pipeline check-in", "Prep for Morgan Lee", "Q3 webinar recap"];

type ChatWindowProps = { chat: AgentChat; step: number; typed: number };

function AgentChatWindow({ chat, step, typed }: ChatWindowProps) {
  const typing = step === 0 && typed > 0;
  return (
    <div className={cx(styles.window, styles.shot)} aria-hidden="true">
      <aside className={styles.side}>
        <div className={styles.sideTop}>
          <span className={styles.lights}>
            <i />
            <i />
            <i />
          </span>
          <svg viewBox="0 0 24 24" className={styles.search}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </div>
        <span className={styles.newChat}>
          <span>
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          New chat
        </span>
        <span className={styles.sideLabel}>Recents</span>
        <span className={cx(styles.sideItem, styles.sideItemOn)}>{chat.title}</span>
        {RECENTS.map((title) => (
          <span className={styles.sideItem} key={title}>
            {title}
          </span>
        ))}
        <span className={styles.sideLabel}>Connectors</span>
        <span className={styles.sideItem}>
          <span className={styles.icMark}>
            <IClosedMark />
          </span>
          iClosed
          <i className={styles.dot} />
        </span>
        {AGENT_CHATS.map((c) => (
          <span className={styles.sideItem} key={c.name}>
            <img src={c.logo} alt="" />
            {c.name}
            <i className={styles.dot} />
          </span>
        ))}
      </aside>

      <div className={styles.main}>
        <div className={styles.bar}>
          <span className={styles.model}>
            <AgentMarks />
            Your AI agent
          </span>
          <span className={styles.barTitle}>{chat.title}</span>
          <span className={styles.share}>Share</span>
        </div>

        <div className={styles.thread}>
          {step === 0 ? (
            <div className={styles.greet}>
              <AgentMarks size="lg" only={chat.agent} />
              <b>What do you want to know?</b>
              <span>iClosed and 6 more connectors are on.</span>
            </div>
          ) : null}
          <div className={styles.col}>
            {step >= 1 ? <div className={cx(styles.you, styles.rise)}>{chat.ask}</div> : null}
            {step >= 2 ? <Turn chat={chat} step={step} /> : null}
            {step >= 5 ? <Answer chat={chat} /> : null}
          </div>
        </div>

        <div className={styles.composerWrap}>
          <div className={styles.composer}>
            <div className={styles.input}>
              {typing ? (
                <>
                  {chat.ask.slice(0, typed)}
                  <i className={styles.caret} />
                </>
              ) : (
                <span className={styles.placeholder}>
                  {step >= AGENT_FINAL_STEP ? `${chat.follow}…` : "Ask your agent anything…"}
                </span>
              )}
            </div>
            <div className={styles.tools}>
              <span className={styles.plus}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <span className={styles.connChip}>
                <svg viewBox="0 0 24 24">
                  <path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0zM12 16v5" />
                </svg>
                7 connectors
              </span>
              <span className={cx(styles.send, typing && styles.sendOn)}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Turn({ chat, step }: { chat: AgentChat; step: number }) {
  return (
    <div className={cx(styles.turn, styles.rise)}>
      <div className={cx(styles.who, step >= 3 && styles.whoDone)}>
        <AgentMarks only={chat.agent} />
        {step === 2 ? (
          <span className={styles.shim}>Thinking…</span>
        ) : (
          <span className={styles.thought}>Thought for 4s</span>
        )}
      </div>
      <div className={cx(styles.acts, step >= 5 && styles.actsDone)}>
        <div className={styles.actsHead}>
          {step < 5 ? (
            <span className={styles.shim}>Working across your connectors…</span>
          ) : (
            <span>Used iClosed and {chat.name} · 3 steps</span>
          )}
        </div>
        <ToolCall
          rising={step === 2}
          running={step === 2}
          logo={
            <span className={cx(styles.actLogo, styles.icMarkLg)}>
              <IClosedMark />
            </span>
          }
          runLabel={chat.aRun}
          done={
            <span>
              <b>iClosed</b> · {chat.aDone}
              <span className={styles.meta}>{chat.aMeta}</span>
            </span>
          }
        />
        {step >= 3 ? (
          <ToolCall
            rising={step === 3}
            running={step === 3}
            logo={
              <span className={styles.actLogo}>
                <img src={chat.logo} alt="" />
              </span>
            }
            runLabel={chat.bRun}
            done={
              <span>
                <b>{chat.name}</b> · {chat.bDone}
                <span className={styles.meta}>{chat.bMeta}</span>
              </span>
            }
          />
        ) : null}
        {step >= 4 ? (
          <ToolCall
            rising={step === 4}
            running={step === 4}
            logo={
              <span className={cx(styles.actLogo, styles.spark)}>
                <Spark />
              </span>
            }
            runLabel={chat.cRun}
            done={<span className={styles.strong}>{chat.cDone}</span>}
          />
        ) : null}
      </div>
    </div>
  );
}

type ToolCallProps = {
  rising: boolean;
  running: boolean;
  logo: React.ReactNode;
  runLabel: string;
  done: React.ReactNode;
};

function ToolCall({ rising, running, logo, runLabel, done }: ToolCallProps) {
  return (
    <div className={cx(styles.act, rising && styles.rise)}>
      {logo}
      {running ? (
        <>
          <span className={styles.shim}>{runLabel}</span>
          <span className={styles.spin} />
        </>
      ) : (
        <>
          {done}
          <DoneTick />
        </>
      )}
    </div>
  );
}

function Answer({ chat }: { chat: AgentChat }) {
  return (
    <div className={cx(styles.answer, styles.rise)}>
      <p>{chat.intro}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            {chat.cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chat.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <Fragment key={i}>
                  <td>{cell}</td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.rec}>
        <span>Recommendation</span>
        <b>{chat.decision}</b>
      </div>
    </div>
  );
}
