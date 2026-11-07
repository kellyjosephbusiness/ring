/**
 * Drawing primitives shared by the cover scenes: white cards with the
 * cover's drop shadow, icons placed in SVG space, the green tick, a
 * recording waveform, arrows and text. Coordinates are in the cover's
 * 640 x 360 viewBox.
 */
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/** Colours for one blog topic. Cards are always white; `ink` and `sub` are
 * for text drawn straight on the panel. */
export interface Tone {
  from: string;
  to: string;
  dot: string;
  dotOpacity: number;
  glow: string;
  glowOpacity: number;
  accent: string;
  tint: string;
  ink: string;
  sub: string;
  arrow: string;
  shadow: string;
  dark: boolean;
}

export interface SceneContext {
  tone: Tone;
  /** `url(#…)` of this cover's drop-shadow filter. */
  shadow: string;
}

/** Text on white cards. */
export const INK = "#111928";
export const BODY = "#374151";
export const MUTED = "#6b7280";
export const HAIRLINE = "#e5e7eb";
export const GREEN = { fill: "#def7ec", stroke: "#bcf0da", ink: "#057a55", dot: "#0e9f6e" } as const;

/** Rough rendered width of Inter text, for pills that must hug their label.
 * Within a few percent for the short labels used here. */
export function approxWidth(text: string, size: number, weight = 600): number {
  let em = 0;
  for (const char of text) {
    if (" ".includes(char)) em += 0.28;
    else if ("ijl'.,:;|!".includes(char)) em += 0.26;
    else if ("ftrI".includes(char)) em += 0.36;
    else if ("mwMW".includes(char)) em += 0.86;
    else if (/[A-Z]/.test(char)) em += 0.68;
    else if (/[0-9]/.test(char)) em += 0.6;
    else em += 0.56;
  }
  return em * size * (weight >= 600 ? 1.03 : 1);
}

interface CardProps {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  ctx: SceneContext;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function Card({ x, y, w, h, r = 10, ctx, fill = "#ffffff", stroke, strokeWidth = 1 }: CardProps) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={stroke ?? "rgba(10, 19, 41, 0.1)"}
      strokeWidth={strokeWidth}
      filter={ctx.shadow}
    />
  );
}

interface GlyphProps {
  icon: LucideIcon;
  x: number;
  y: number;
  size: number;
  color: string;
  strokeWidth?: number;
}

/** A Lucide icon as a nested SVG at (x, y). */
export function Glyph({ icon: Icon, x, y, size, color, strokeWidth = 2 }: GlyphProps) {
  return <Icon x={x} y={y} size={size} color={color} strokeWidth={strokeWidth} />;
}

/** The checklist's green tick disc. */
export function Tick({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  const s = r / 9;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={GREEN.fill} />
      <path
        d={`M${cx - 3.8 * s} ${cy + 0.2 * s}L${cx - 1 * s} ${cy + 3 * s}L${cx + 4 * s} ${cy - 2.6 * s}`}
        fill="none"
        stroke={GREEN.ink}
        strokeWidth={1.9 * s}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A recording waveform starting at x, centred on cy. */
export function Wave({
  x,
  cy,
  color,
  bars = [6, 12, 8, 16, 10, 14, 7, 11, 5],
  gap = 4,
}: {
  x: number;
  cy: number;
  color: string;
  bars?: readonly number[];
  gap?: number;
}) {
  return (
    <g fill={color}>
      {bars.map((height, i) => (
        <rect key={i} x={x + i * gap} y={cy - height / 2} width={2.2} height={height} rx={1.1} />
      ))}
    </g>
  );
}

/** Width of a Wave, to right-align one. */
export function waveWidth(bars: number, gap = 4): number {
  return (bars - 1) * gap + 2.2;
}

/** A straight arrow ending in a small head at (x2, y2). */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dashed = true,
  width = 2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dashed?: boolean;
  width?: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const head = [
    [x2, y2],
    [x2 - 8 * cos + 4.5 * sin, y2 - 8 * sin - 4.5 * cos],
    [x2 - 8 * cos - 4.5 * sin, y2 - 8 * sin + 4.5 * cos],
  ]
    .map(([px, py]) => `${px.toFixed(2)},${py.toFixed(2)}`)
    .join(" ");
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 6 * cos}
        y2={y2 - 6 * sin}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "4 5" : undefined}
      />
      <polygon points={head} fill={color} />
    </g>
  );
}

interface TxtProps {
  x: number;
  y: number;
  size: number;
  fill: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  spacing?: number;
  opacity?: number;
  children: ReactNode;
}

export function Txt({ x, y, size, fill, weight = 500, anchor, spacing, opacity, children }: TxtProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      letterSpacing={spacing}
      opacity={opacity}
    >
      {children}
    </text>
  );
}
