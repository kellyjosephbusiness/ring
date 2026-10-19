"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Live `prefers-reduced-motion: reduce`; false while server rendering. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Choreography clock. Once `active` is true, step `i` is reached `times[i]`
 * ms later; returns how many steps have been reached so far. `times` must be
 * sorted and referentially stable (a module constant). A graphic is remounted
 * for every replay, so the count always starts from zero.
 */
export function useSteps(active: boolean, times: readonly number[]): number {
  const [reached, setReached] = useState(0);
  useEffect(() => {
    if (!active) return;
    const ids = times.map((ms, i) =>
      window.setTimeout(() => setReached((n) => Math.max(n, i + 1)), ms),
    );
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [active, times]);
  return reached;
}

type CountUpOptions = {
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Counts from 0 to `target` with an ease-out cubic once `active` turns true
 * (after `delay` ms, over `duration` ms). Idle graphics show the final value.
 */
export function useCountUp(
  active: boolean,
  target: number,
  { delay = 0, duration = 900, prefix = "", suffix = "" }: CountUpOptions = {},
): string {
  const [value, setValue] = useState(active ? 0 : target);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const startAt = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - startAt) / duration));
      setValue(target * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Background tabs throttle rAF; make sure the final value always lands.
    const settle = window.setTimeout(() => setValue(target), delay + duration + 60);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [active, target, delay, duration]);
  return `${prefix}${Math.round(value).toLocaleString("en-US")}${suffix}`;
}

type TypingStep =
  | { type: string; cps?: number }
  | { pause: number }
  | { backspace: number; cps?: number };

export type TypingFrame = { at: number; text: string };

/** Expands a typing script into timestamped text frames, starting at `startMs`. */
export function buildTypingFrames(steps: readonly TypingStep[], startMs = 0): TypingFrame[] {
  const frames: TypingFrame[] = [];
  let at = startMs;
  let text = "";
  for (const step of steps) {
    if ("pause" in step) {
      at += step.pause;
    } else if ("type" in step) {
      const interval = 1000 / (step.cps ?? 14);
      for (const char of step.type) {
        at += interval;
        text += char;
        frames.push({ at: Math.round(at), text });
      }
    } else {
      const interval = 1000 / (step.cps ?? 30);
      for (let i = 0; i < step.backspace; i += 1) {
        at += interval;
        text = text.slice(0, -1);
        frames.push({ at: Math.round(at), text });
      }
    }
  }
  return frames;
}
