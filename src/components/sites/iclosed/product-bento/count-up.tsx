"use client";

import { useCountUp } from "./bento-hooks";

type CountUpProps = {
  play: boolean;
  to: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Animated number as a bare text node. Kept as its own component so each
 * per-frame tick re-renders only this text, not the whole graphic around it.
 */
export function CountUp({ play, to, ...options }: CountUpProps) {
  return <>{useCountUp(play, to, options)}</>;
}
