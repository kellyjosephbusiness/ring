"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import {
  BASE_AMOUNT,
  BRAND_LOGO,
  CHART_SEED,
  CLOSER_AVATARS,
  RECOVERIES,
  SKY_IMAGE,
  TIMING,
  formatUsd,
} from "./pipeline.data";
import styles from "./pipeline.module.css";

const CHART_W = 456;
const CHART_H = 101.156;
const CHART_TOP = 1;
const CHART_BOTTOM = 100.218;

/** Line, filled area and end point for the series, scaled so its first value
 * sits on the baseline and its last touches the top. */
function chartPaths(series: readonly number[]) {
  const count = series.length;
  const range = Math.max(1e-6, series[count - 1] - series[0]);
  const points = series.map((value, index): [number, number] => [
    (index / (count - 1)) * CHART_W,
    CHART_BOTTOM - ((value - series[0]) / range) * (CHART_BOTTOM - CHART_TOP),
  ]);
  const line = points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  return { line, area: `${line} L${CHART_W} ${CHART_H} L0 ${CHART_H} Z`, tip: points[count - 1] };
}

type PipelineBandProps = {
  /** Left column: eyebrow, heading, CTA and note. */
  copy: ReactNode;
  /** Step cards, connectors and pill. */
  bottom: ReactNode;
};

/**
 * The dark band and its live-pipeline card. When a quarter of the band is in
 * view it switches on the connector/pill animations, counts the total up from
 * $0, then every 3.2s raises the next closer's avatar with a "+$x" chip, bumps
 * the total (briefly green) and shifts the chart by one point.
 */
export function PipelineBand({ copy, bottom }: PipelineBandProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();
  const [inView, setInView] = useState(false);
  const [amount, setAmount] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const [activeCloser, setActiveCloser] = useState(-1);
  const [chipLabel, setChipLabel] = useState("");
  const [series, setSeries] = useState<readonly number[]>(CHART_SEED);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeouts = new Set<number>();
    let frame = 0;
    let interval = 0;
    let started = false;
    let current = 0;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, ms);
      timeouts.add(id);
    };

    // Ease-out-cubic tween of the counter from its current value.
    const tweenTo = (target: number, duration: number, done?: () => void) => {
      const from = current;
      const startedAt = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - (1 - progress) ** 3;
        current = from + (target - from) * eased;
        setAmount(current);
        if (progress < 1) frame = requestAnimationFrame(step);
        else done?.();
      };
      frame = requestAnimationFrame(step);
    };

    const startTicking = () => {
      let tick = 0;
      interval = window.setInterval(() => {
        const recovered = RECOVERIES[tick % RECOVERIES.length];
        const closer = tick % CLOSER_AVATARS.length;
        tick += 1;
        setActiveCloser(closer);
        setChipLabel(`+${formatUsd(recovered)}`);
        later(() => setActiveCloser(-1), TIMING.activeMs);
        later(() => {
          setHighlight(true);
          later(() => setHighlight(false), TIMING.highlightMs);
          tweenTo(current + recovered, TIMING.incrementMs);
          setSeries((prev) => [...prev.slice(1), prev[prev.length - 1] + recovered / 400]);
        }, TIMING.counterDelayMs);
      }, TIMING.tickEveryMs);
    };

    const start = () => {
      if (started) return;
      started = true;
      setInView(true);
      if (reduceMotion) {
        current = BASE_AMOUNT;
        setAmount(BASE_AMOUNT);
        return;
      }
      tweenTo(BASE_AMOUNT, TIMING.countUpMs, startTicking);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(band);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const chart = chartPaths(series);

  return (
    <div ref={bandRef} className={`${styles.band}${inView ? ` ${styles.inView}` : ""}`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {copy}
          <div className={styles.visual}>
            <img className={styles.visualBg} src={SKY_IMAGE} alt="" />
            <div className={styles.closers}>
              <p className={styles.closersLabel}>Sales teams recovering pipeline right now</p>
              <div className={styles.avatars}>
                {CLOSER_AVATARS.map((avatar, index) => (
                  <span
                    key={avatar}
                    className={`${styles.avatarWrap}${activeCloser === index ? ` ${styles.avatarWrapActive}` : ""}`}
                  >
                    <img className={styles.avatar} src={avatar} alt="" />
                    <span className={styles.chip}>{chipLabel}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.panel}>
              <div className={styles.panelBrand}>
                <img src={BRAND_LOGO} alt="iClosed" />
              </div>
              <div className={styles.panelCard}>
                <p className={styles.liveRow}>
                  <span className={styles.liveDot} />
                  Live Pipeline recovered
                </p>
                <p className={`${styles.amount}${highlight ? ` ${styles.amountTick}` : ""}`}>{formatUsd(amount)}</p>
                <div className={styles.deltaRow}>
                  <span className={styles.delta}>↗ 22.5%</span>
                  <span className={styles.period}>Last 90 days</span>
                </div>
                <svg className={styles.chart} viewBox={`0 0 ${CHART_W} ${CHART_H}`} fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0e9f6e" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#0e9f6e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={chart.area} fill={`url(#${gradientId})`} />
                  <path d={chart.line} stroke="#0e9f6e" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx={chart.tip[0]} cy={chart.tip[1]} r="3.5" fill="#0e9f6e" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {bottom}
      </div>
    </div>
  );
}
