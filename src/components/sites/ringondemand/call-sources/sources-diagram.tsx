"use client";

import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";

import styles from "./call-sources.module.css";

type Point = { x: number; y: number };

type Box = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  cx: number;
  cy: number;
};

type Geometry = {
  width: number;
  height: number;
  wires: readonly string[];
  arrows: readonly string[];
};

/** Corner radius of the wire elbows (the pipeline band's elbows use 16). */
const RADIUS = 12;
/** Arrowhead: the pipeline band's 5.77 x 5 triangle. */
const ARROW_LENGTH = 5;
const ARROW_HALF_WIDTH = 2.887;
/** Air between an arrowhead's tip and the tile it points at. */
const TIP_GAP = 3;
/** Air between the end of a wire and the base of its arrowhead. */
const WIRE_GAP = 3;

const round = (value: number) => Math.round(value * 100) / 100;

/** Drops repeated points and the middle of any straight run, so a wire whose
 * ends already line up draws as one straight segment. */
function simplify(points: readonly Point[]): Point[] {
  const unique = points.filter(
    (point, index) =>
      index === 0 ||
      Math.abs(point.x - points[index - 1].x) > 0.5 ||
      Math.abs(point.y - points[index - 1].y) > 0.5,
  );
  return unique.filter((point, index) => {
    if (index === 0 || index === unique.length - 1) return true;
    const prev = unique[index - 1];
    const next = unique[index + 1];
    const sameX = Math.abs(prev.x - point.x) < 0.5 && Math.abs(point.x - next.x) < 0.5;
    const sameY = Math.abs(prev.y - point.y) < 0.5 && Math.abs(point.y - next.y) < 0.5;
    return !sameX && !sameY;
  });
}

/** An orthogonal polyline with its corners rounded. A segment shared by two
 * corners gives each of them at most half its length. */
function wirePath(input: readonly Point[]): string {
  const points = simplify(input);
  const last = points.length - 1;
  let d = `M${round(points[0].x)} ${round(points[0].y)}`;
  for (let index = 1; index < last; index += 1) {
    const prev = points[index - 1];
    const corner = points[index];
    const next = points[index + 1];
    const lengthIn = Math.hypot(corner.x - prev.x, corner.y - prev.y);
    const lengthOut = Math.hypot(next.x - corner.x, next.y - corner.y);
    const radius = Math.min(
      RADIUS,
      index - 1 === 0 ? lengthIn : lengthIn / 2,
      index + 1 === last ? lengthOut : lengthOut / 2,
    );
    const from = {
      x: corner.x - ((corner.x - prev.x) / lengthIn) * radius,
      y: corner.y - ((corner.y - prev.y) / lengthIn) * radius,
    };
    const to = {
      x: corner.x + ((next.x - corner.x) / lengthOut) * radius,
      y: corner.y + ((next.y - corner.y) / lengthOut) * radius,
    };
    d += `L${round(from.x)} ${round(from.y)}Q${round(corner.x)} ${round(corner.y)} ${round(to.x)} ${round(to.y)}`;
  }
  d += `L${round(points[last].x)} ${round(points[last].y)}`;
  return d;
}

function arrowPath(tip: Point, direction: "right" | "down"): string {
  const x = round(tip.x);
  const y = round(tip.y);
  if (direction === "right") {
    return `M${x} ${y}L${round(x - ARROW_LENGTH)} ${round(y - ARROW_HALF_WIDTH)}V${round(y + ARROW_HALF_WIDTH)}Z`;
  }
  return `M${x} ${y}L${round(x + ARROW_HALF_WIDTH)} ${round(y - ARROW_LENGTH)}H${round(x - ARROW_HALF_WIDTH)}Z`;
}

/** Wires from the two sources into the intake script, and on to the intake
 * line. Left to right when the tiles sit in a row, top down when stacked. */
function measure(root: HTMLElement, tiles: readonly HTMLElement[]): Geometry {
  const origin = root.getBoundingClientRect();
  const [ads, publishers, script, line] = tiles.map((tile): Box => {
    const rect = tile.getBoundingClientRect();
    const left = rect.left - origin.left;
    const top = rect.top - origin.top;
    return {
      left,
      top,
      right: left + rect.width,
      bottom: top + rect.height,
      cx: left + rect.width / 2,
      cy: top + rect.height / 2,
    };
  });
  const wires: string[] = [];
  const arrows: string[] = [];
  const lead = ARROW_LENGTH + WIRE_GAP;

  if (script.left >= Math.max(ads.right, publishers.right) - 1) {
    const joinX = (Math.max(ads.right, publishers.right) + script.left) / 2;
    const stemX = joinX + RADIUS;
    for (const source of [ads, publishers]) {
      wires.push(
        wirePath([
          { x: source.right, y: source.cy },
          { x: joinX, y: source.cy },
          { x: joinX, y: script.cy },
          { x: stemX, y: script.cy },
        ]),
      );
    }
    const scriptTip = { x: script.left - TIP_GAP, y: script.cy };
    wires.push(wirePath([{ x: stemX, y: script.cy }, { x: scriptTip.x - lead, y: script.cy }]));
    arrows.push(arrowPath(scriptTip, "right"));

    const bendX = (script.right + line.left) / 2;
    const lineTip = { x: line.left - TIP_GAP, y: line.cy };
    wires.push(
      wirePath([
        { x: script.right, y: script.cy },
        { x: bendX, y: script.cy },
        { x: bendX, y: line.cy },
        { x: lineTip.x - lead, y: line.cy },
      ]),
    );
    arrows.push(arrowPath(lineTip, "right"));
  } else {
    const joinY = (Math.max(ads.bottom, publishers.bottom) + script.top) / 2;
    const stemY = joinY + RADIUS;
    for (const source of [ads, publishers]) {
      wires.push(
        wirePath([
          { x: source.cx, y: source.bottom },
          { x: source.cx, y: joinY },
          { x: script.cx, y: joinY },
          { x: script.cx, y: stemY },
        ]),
      );
    }
    const scriptTip = { x: script.cx, y: script.top - TIP_GAP };
    wires.push(wirePath([{ x: script.cx, y: stemY }, { x: script.cx, y: scriptTip.y - lead }]));
    arrows.push(arrowPath(scriptTip, "down"));

    const bendY = (script.bottom + line.top) / 2;
    const lineTip = { x: line.cx, y: line.top - TIP_GAP };
    wires.push(
      wirePath([
        { x: script.cx, y: script.bottom },
        { x: script.cx, y: bendY },
        { x: line.cx, y: bendY },
        { x: line.cx, y: lineTip.y - lead },
      ]),
    );
    arrows.push(arrowPath(lineTip, "down"));
  }

  return { width: round(origin.width), height: round(origin.height), wires, arrows };
}

const sameGeometry = (a: Geometry | null, b: Geometry) =>
  a !== null &&
  a.width === b.width &&
  a.height === b.height &&
  a.wires.join() === b.wires.join() &&
  a.arrows.join() === b.arrows.join();

/** 18px line icons, drawn on the lucide grid. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className={styles.tileIconSvg}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

type TileProps = {
  ref: Ref<HTMLDivElement>;
  variant: "source" | "script" | "line";
  icon: ReactNode;
  label: string;
};

const VARIANT_CLASS: Record<TileProps["variant"], string> = {
  source: styles.tileSource,
  script: styles.tileScript,
  line: styles.tileLine,
};

function Tile({ ref, variant, icon, label }: TileProps) {
  return (
    <div ref={ref} className={`${styles.tile} ${VARIANT_CLASS[variant]}`}>
      <span className={styles.tileIcon}>{icon}</span>
      <span className={styles.tileLabel}>{label}</span>
    </div>
  );
}

/**
 * Two source tiles whose dashed wires merge into the intake script, which
 * leads on to the firm's intake line. The wires are measured from the tiles,
 * so they follow the layout at any width, and their dashes flow while the
 * diagram is in view.
 */
export function SourcesDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const adsRef = useRef<HTMLDivElement>(null);
  const publishersRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const tiles = [adsRef.current, publishersRef.current, scriptRef.current, lineRef.current];
    if (!root || tiles.some((tile) => tile === null)) return;
    const elements = tiles as HTMLElement[];

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = measure(root, elements);
        setGeometry((current) => (sameGeometry(current, next) ? current : next));
      });
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(root);
    elements.forEach((element) => resizeObserver.observe(element));

    const viewObserver = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "0px 0px -10% 0px" },
    );
    viewObserver.observe(root);

    update();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className={inView ? `${styles.diagram} ${styles.inView}` : styles.diagram}>
      {geometry ? (
        <svg
          className={styles.wires}
          width={geometry.width}
          height={geometry.height}
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          fill="none"
          aria-hidden="true"
        >
          {geometry.wires.map((d) => (
            <path key={d} className={styles.wire} d={d} />
          ))}
          {geometry.arrows.map((d) => (
            <path key={d} className={styles.arrow} d={d} />
          ))}
        </svg>
      ) : null}
      <div className={styles.sources}>
        <Tile
          ref={adsRef}
          variant="source"
          label="Our own ads"
          icon={
            <Icon>
              <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
              <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
              <path d="M8 6v8" />
            </Icon>
          }
        />
        <Tile
          ref={publishersRef}
          variant="source"
          label="Vetted publisher network"
          icon={
            <Icon>
              <rect x="16" y="16" width="6" height="6" rx="1" />
              <rect x="2" y="16" width="6" height="6" rx="1" />
              <rect x="9" y="2" width="6" height="6" rx="1" />
              <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
              <path d="M12 12V8" />
            </Icon>
          }
        />
      </div>
      <Tile
        ref={scriptRef}
        variant="script"
        label="Same intake script"
        icon={
          <Icon>
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
          </Icon>
        }
      />
      <Tile
        ref={lineRef}
        variant="line"
        label="Your intake line"
        icon={
          <Icon>
            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
          </Icon>
        }
      />
    </div>
  );
}
