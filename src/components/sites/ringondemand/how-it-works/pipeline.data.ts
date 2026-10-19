const IMG = "/sites/iclosed/images";

export const SKY_IMAGE = `${IMG}/60589f7f2593.webp`;
export const BRAND_LOGO = `${IMG}/b18ed4885329.webp`;

export const CLOSER_AVATARS: readonly string[] = [
  `${IMG}/46713262a4dd.webp`,
  `${IMG}/3bd5cc7e1139.webp`,
  `${IMG}/232c008e0b43.webp`,
  `${IMG}/4161addcba43.webp`,
  `${IMG}/98bd18049d62.webp`,
];

export type Step = { num: string; title: string; body: string };

export const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "Recover the revenue",
    body: "Catch every lead who drops and text them back in seconds — dead pipeline turns into booked calls.",
  },
  {
    num: "02",
    title: "Qualify the leads",
    body: "Screen every booking so closers only ever spend time on buyers who can actually pay.",
  },
  {
    num: "03",
    title: "Route to the right rep",
    body: "Send each buyer to the best-fit rep by offer, geo or intent — no lead waits, none slip.",
  },
];

/** The live counter's resting value once the intro count-up finishes. */
export const BASE_AMOUNT = 1_160_000;
/** Recoveries cycled through on each tick, one per closer avatar in turn. */
export const RECOVERIES: readonly number[] = [1240, 2875, 1580, 3420, 960, 2210, 1835, 4160];
/** Seed values for the 90-day chart; each recovery shifts the series by one. */
export const CHART_SEED: readonly number[] = [0.98, 31, 44.85, 50.62, 58.69, 72.93, 87.16, 91, 96.77, 100.23];

export const TIMING = {
  /** Intro count-up from $0 to BASE_AMOUNT. */
  countUpMs: 1800,
  /** Gap between recoveries. */
  tickEveryMs: 3200,
  /** Delay between a chip appearing and the counter reacting. */
  counterDelayMs: 280,
  /** Duration of each counter increment. */
  incrementMs: 600,
  /** How long the counter stays green after an increment. */
  highlightMs: 900,
  /** How long an avatar stays raised with its chip showing. */
  activeMs: 1900,
} as const;

export function formatUsd(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}
