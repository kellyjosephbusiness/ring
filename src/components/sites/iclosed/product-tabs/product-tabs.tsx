"use client";

import { useEffect, useRef, useState } from "react";

import { AgentPanel } from "./agent-panel";
import { AGENT_MARKS } from "./assets";
import { EngagePanel } from "./engage-panel";
import { MeasurePanel } from "./measure-panel";
import styles from "./product-tabs.module.css";
import { QualifyPanel } from "./qualify-panel";
import { AUTOPLAY_VISIBLE, TABS } from "./tabs-config";
import { useShotFit } from "./use-shot-fit";
import { cx } from "./utils";

/* "Keep the same funnels." — four product tabs that auto-advance while the
   section is on screen. The active tab's black bar sweeps across it over the
   tab's dwell; picking a tab by hand stops autoplay for good. Each panel
   remounts when it becomes active, so its demo replays from the start. */

export function ProductTabs() {
  const [active, setActive] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef = useRef<number | null>(null);

  useShotFit(panelRef, active);

  // Autoplay is gated on the section being (at least 15%) on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let disposed = false;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => {
        if (!disposed) setInView(true);
      });
      return () => {
        disposed = true;
      };
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!disposed) setInView(entries.some((e) => e.isIntersecting));
      },
      { threshold: AUTOPLAY_VISIBLE },
    );
    io.observe(root);
    return () => {
      disposed = true;
      io.disconnect();
    };
  }, []);

  // Progress bars + the advance timer. Without autoplay the active bar sits
  // full; with it, the bar restarts from 0 and sweeps linearly over the dwell.
  useEffect(() => {
    const autoplay = inView && !userPicked;
    progRefs.current.forEach((bar, i) => {
      if (!bar) return;
      const isActive = i === active;
      bar.style.transition = "none";
      bar.style.width = isActive ? (autoplay ? "0%" : "100%") : "0%";
      if (isActive && autoplay) {
        void bar.offsetWidth; // commit the 0% before transitioning
        bar.style.transition = `width ${TABS[active].dwell}ms linear`;
        bar.style.width = "100%";
      }
    });
    if (!autoplay) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = window.setTimeout(() => {
      setActive((i) => (i + 1) % TABS.length);
    }, TABS[active].dwell);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [active, userPicked, inView]);

  const pick = (index: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setUserPicked(true);
    setActive(index);
  };

  return (
    <div className={styles.outer} data-section="product-tabs">
      <div className={cx(styles.surface, styles.rule, styles.root)} ref={rootRef}>
        <div className={styles.wrap}>
          <h2 className={styles.heading}>
            Keep the same funnels. <br />
            <span className={styles.headingAccent}>Change the scheduler, make more profit.</span>
          </h2>
        </div>

        <div className={styles.tabBand}>
          <div className={styles.wrap}>
            <div className={styles.tabs} role="tablist" aria-label="iClosed product features">
              {TABS.map((tab, i) => (
                <div className={styles.tabSlot} key={tab.id}>
                  {i > 0 ? <span className={styles.tabDivider} aria-hidden="true" /> : null}
                  <button
                    type="button"
                    role="tab"
                    id={`product-tab-${tab.id}`}
                    aria-selected={active === i}
                    aria-controls="product-tabs-panel"
                    className={cx(styles.tab, active === i && styles.tabOn, tab.id === "agent" && styles.tabAgent)}
                    onClick={() => pick(i)}
                  >
                    {tab.id === "agent" ? (
                      <span className={styles.agentMarks} aria-hidden="true">
                        {AGENT_MARKS.map((mark) => (
                          <span key={mark.src}>
                            <img src={mark.src} alt="" />
                          </span>
                        ))}
                      </span>
                    ) : null}
                    {tab.label}
                    <span
                      className={styles.prog}
                      aria-hidden="true"
                      ref={(el) => {
                        progRefs.current[i] = el;
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.wrap}>
          <div
            className={styles.panel}
            role="tabpanel"
            id="product-tabs-panel"
            aria-labelledby={`product-tab-${TABS[active].id}`}
            ref={panelRef}
          >
            {active === 0 ? <QualifyPanel /> : null}
            {active === 1 ? (
              <div className={styles.inboxCanvas} data-shot="">
                <div className={styles.inboxWindow}>
                  <EngagePanel />
                </div>
              </div>
            ) : null}
            {active === 2 ? <MeasurePanel /> : null}
            {active === 3 ? <AgentPanel /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
