"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

import { AnalyticsGraphic } from "./analytics";
import { usePrefersReducedMotion } from "./bento-hooks";
import { DisqualifyGraphic } from "./disqualify";
import { RoutingGraphic } from "./routing";
import { TrackerGraphic } from "./tracker";
import { WorkflowsGraphic } from "./workflows";
import styles from "./product-bento.module.css";

type GraphicProps = { play?: boolean };

/** Graphic registry: component + the fixed width it is authored at (all are 260px tall). */
const GRAPHICS = {
  disqualify: { Graphic: DisqualifyGraphic, width: 384 },
  routing: { Graphic: RoutingGraphic, width: 384 },
  workflows: { Graphic: WorkflowsGraphic, width: 384 },
  analytics: { Graphic: AnalyticsGraphic, width: 588 },
  tracker: { Graphic: TrackerGraphic, width: 585 },
} satisfies Record<string, { Graphic: ComponentType<GraphicProps>; width: number }>;

export type BentoGraphicName = keyof typeof GRAPHICS;

/** A played graphic can't be restarted (by hover) until this long after it began. */
const REPLAY_COOLDOWN_MS = 8500;
/** Share of the card that must be on screen before its graphic first plays. */
const IN_VIEW_THRESHOLD = 0.35;

type BentoCardProps = {
  size: "sm" | "md";
  graphic: BentoGraphicName;
  title: string;
  body: string;
};

/**
 * Card frame. The graphic renders its finished, static state until the card
 * is 35% in view, then remounts and plays its choreography once; hovering the
 * card replays it (at most once per 8.5s). Reduced motion keeps it static.
 */
export function BentoCard({ size, graphic, title, body }: BentoCardProps) {
  const { Graphic, width } = GRAPHICS[graphic];
  const cardRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const illusRef = useRef<HTMLDivElement>(null);
  const cooldownUntil = useRef(0);
  const [run, setRun] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const replay = useCallback(() => {
    const now = Date.now();
    if (now < cooldownUntil.current) return;
    cooldownUntil.current = now + REPLAY_COOLDOWN_MS;
    setRun((n) => n + 1);
  }, []);

  // First play: when the card scrolls into view (once).
  useEffect(() => {
    const card = cardRef.current;
    if (reducedMotion || !card || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        replay();
      },
      { threshold: IN_VIEW_THRESHOLD },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [reducedMotion, replay]);

  // Fit the fixed-size graphic to the card's inner width (never upscale).
  useEffect(() => {
    const wrap = wrapRef.current;
    const illus = illusRef.current;
    if (!wrap || !illus) return;
    const fit = () => {
      const scale = Math.min(1, wrap.clientWidth / width);
      illus.style.transform = `translateX(-50%) scale(${scale})`;
    };
    fit();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit);
    observer?.observe(wrap);
    window.addEventListener("resize", fit);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [width]);

  return (
    <article
      ref={cardRef}
      className={clsx(styles.card, size === "sm" ? styles.cardSm : styles.cardMd)}
      data-bento-card={graphic}
      onMouseEnter={reducedMotion ? undefined : replay}
    >
      <div ref={wrapRef} className={styles.illusWrap} style={{ aspectRatio: `${width} / 260` }} aria-hidden="true">
        <div ref={illusRef} className={styles.illus}>
          <Graphic key={run} play={run > 0 && !reducedMotion} />
        </div>
      </div>
      <div className={styles.copy}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
    </article>
  );
}
