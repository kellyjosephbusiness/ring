import { useId } from "react";

import type { BlogPost, BlogTopic } from "@/content/blog/posts";

import { SITE } from "../../seo/site";
import { TOPIC_ICONS } from "../post-grid";
import { Glyph, type SceneContext, type Tone } from "./cover-parts";
import { Scene } from "./scenes";
import styles from "./post-cover.module.css";

const LIGHT = { glow: "#ffffff", glowOpacity: 0.85, dotOpacity: 0.7, ink: "#0a1329", sub: "#475467", dark: false };

/** One panel colour per topic, so the blog grid reads by topic at a glance:
 * blue for MVA, indigo for legal, amber for workers' comp, teal for
 * insurance, green for compliance and navy for publishers. */
const TONES: Record<BlogTopic, Tone> = {
  mva: {
    ...LIGHT,
    from: "#f7fbff",
    to: "#d5e7fd",
    dot: "#b3cdf3",
    accent: "#1c64f2",
    tint: "#e1effe",
    arrow: "#1c64f2",
    shadow: "#1c3d7a",
  },
  legal: {
    ...LIGHT,
    from: "#f9f9ff",
    to: "#dfe3fb",
    dot: "#c1c8f1",
    accent: "#3f51d6",
    tint: "#e7e9fd",
    arrow: "#3f51d6",
    shadow: "#2a3270",
  },
  "workers-comp": {
    ...LIGHT,
    from: "#fffcf5",
    to: "#f8e9c8",
    dot: "#e8cf96",
    accent: "#b45309",
    tint: "#fdf0d5",
    arrow: "#b45309",
    shadow: "#6b4a12",
  },
  insurance: {
    ...LIGHT,
    from: "#f4fcfd",
    to: "#cfeef4",
    dot: "#a2d8e2",
    accent: "#0e7490",
    tint: "#d9f3f7",
    arrow: "#0e7490",
    shadow: "#0d4f5e",
  },
  compliance: {
    ...LIGHT,
    from: "#f5fdf9",
    to: "#d1f0e0",
    dot: "#9fd9bb",
    accent: "#057a55",
    tint: "#def7ec",
    arrow: "#057a55",
    shadow: "#0b5137",
  },
  publishers: {
    from: "#0c1838",
    to: "#0b2c80",
    dot: "#ffffff",
    dotOpacity: 0.09,
    glow: "#3f83f8",
    glowOpacity: 0.45,
    accent: "#1c64f2",
    tint: "#e1effe",
    ink: "#ffffff",
    sub: "#c3ddfd",
    arrow: "#76a9fa",
    shadow: "#000000",
    dark: true,
  },
};

interface PostCoverProps {
  post: Pick<BlogPost, "topic" | "cover">;
  className?: string;
}

/** A post's cover illustration: the topic label over the post's scene, drawn
 * as inline SVG so it stays sharp from a thumbnail to the post header. The
 * picture repeats what the card and post say, so it is hidden from screen
 * readers. */
export function PostCover({ post, className }: PostCoverProps) {
  const uid = `c${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const tone = TONES[post.topic];
  const ids = { bg: `${uid}-bg`, dots: `${uid}-dots`, glow: `${uid}-glow`, shadow: `${uid}-shadow` };
  const ctx: SceneContext = { tone, shadow: `url(#${ids.shadow})` };
  const TopicIcon = TOPIC_ICONS[post.topic];

  return (
    <div
      className={className ? `${styles.cover} ${className}` : styles.cover}
      data-cover={post.cover.scene.kind}
      data-topic={post.topic}
    >
      <svg className={styles.svg} viewBox="0 0 640 360" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={ids.bg} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor={tone.from} />
            <stop offset="1" stopColor={tone.to} />
          </linearGradient>
          <pattern id={ids.dots} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.3" fill={tone.dot} />
          </pattern>
          <radialGradient id={ids.glow} cx="0.88" cy="0.08" r="0.62">
            <stop offset="0" stopColor={tone.glow} stopOpacity={tone.glowOpacity} />
            <stop offset="1" stopColor={tone.glow} stopOpacity="0" />
          </radialGradient>
          <filter
            id={ids.shadow}
            filterUnits="userSpaceOnUse"
            x="-40"
            y="-40"
            width="720"
            height="440"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor={tone.shadow} floodOpacity="0.08" />
            <feDropShadow dx="0" dy="10" stdDeviation="11" floodColor={tone.shadow} floodOpacity="0.14" />
          </filter>
        </defs>
        <rect width="640" height="360" fill={`url(#${ids.bg})`} />
        <rect width="640" height="360" fill={`url(#${ids.dots})`} opacity={tone.dotOpacity} />
        <rect width="640" height="360" fill={`url(#${ids.glow})`} />

        <rect
          x="28"
          y="24"
          width="30"
          height="30"
          rx="8"
          fill={tone.dark ? "rgba(255, 255, 255, 0.12)" : "#ffffff"}
          stroke={tone.dark ? "rgba(255, 255, 255, 0.24)" : "rgba(10, 19, 41, 0.1)"}
        />
        <Glyph icon={TopicIcon} x={35} y={31} size={16} color={tone.dark ? "#ffffff" : tone.accent} />
        <text x="68" y="44" fontSize="12.5" fontWeight="600" letterSpacing="1.2" fill={tone.ink}>
          {post.cover.label.toUpperCase()}
        </text>
        <text
          x="612"
          y="44"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.1"
          fill={tone.sub}
          textAnchor="end"
        >
          {SITE.name.toUpperCase()}
        </text>

        <Scene scene={post.cover.scene} ctx={ctx} />
      </svg>
    </div>
  );
}
