/**
 * The cover scenes. Each draws inside the 640 x 360 viewBox below the label
 * (x 28 to 612, y 72 to 340), with white cards on the topic's panel.
 */
import { ListChecks, Phone, PhoneForwarded, ShieldCheck } from "lucide-react";

import {
  Arrow,
  BODY,
  Card,
  GREEN,
  Glyph,
  HAIRLINE,
  INK,
  MUTED,
  Tick,
  Txt,
  Wave,
  approxWidth,
  waveWidth,
  type SceneContext,
} from "./cover-parts";
import {
  COVER_ICONS,
  type ChannelsCover,
  type ChecklistCover,
  type CompareCover,
  type CoverScene,
  type FunnelCover,
  type LadderCover,
  type NetworkCover,
  type RecordCover,
  type StepsCover,
  type TransferCover,
} from "./cover-spec";

const LEFT = 28;
const WIDTH = 584;
const CENTER_X = 320;
/** Vertical room under the label. */
const TOP = 72;
const ROOM = 268;

interface SceneProps<T> {
  scene: T;
  ctx: SceneContext;
}

/** Caller card, screening checks, then the buyer's line. */
function TransferScene({ scene, ctx }: SceneProps<TransferCover>) {
  const { tone } = ctx;
  const cy = 206;
  const sideW = 150;
  const sideH = 164;
  const top = cy - sideH / 2;
  const callerX = LEFT;
  const destX = LEFT + WIDTH - sideW;
  const checksW = 200;
  const checksX = CENTER_X - checksW / 2;
  const checksH = 38 + scene.checks.length * 34 + 10;
  const checksY = cy - checksH / 2;
  const callerCx = callerX + sideW / 2;
  const destCx = destX + sideW / 2;

  return (
    <g>
      <Card x={callerX} y={top} w={sideW} h={sideH} ctx={ctx} />
      <circle cx={callerCx} cy={top + 46} r={26} fill={tone.tint} />
      <Glyph icon={COVER_ICONS[scene.callerIcon]} x={callerCx - 12} y={top + 34} size={24} color={tone.accent} />
      <Txt x={callerCx} y={top + 100} size={15} weight={600} fill={INK} anchor="middle">
        {scene.caller}
      </Txt>
      <rect x={callerCx - 40} y={top + 116} width={80} height={26} rx={13} fill={GREEN.fill} stroke={GREEN.stroke} />
      <Wave x={callerCx - 28} cy={top + 129} color={GREEN.dot} bars={[5, 10, 7, 4]} gap={3.5} />
      <Txt x={callerCx - 10} y={top + 133.5} size={12} weight={600} fill={GREEN.ink}>
        On call
      </Txt>

      <Arrow x1={callerX + sideW + 6} y1={cy} x2={checksX - 6} y2={cy} color={tone.arrow} />

      <Card x={checksX} y={checksY} w={checksW} h={checksH} ctx={ctx} />
      <Txt x={CENTER_X} y={checksY + 24} size={13} weight={600} fill={INK} anchor="middle">
        Screening
      </Txt>
      <line x1={checksX} y1={checksY + 38} x2={checksX + checksW} y2={checksY + 38} stroke={HAIRLINE} />
      {scene.checks.map((check, i) => {
        const rowCy = checksY + 38 + 5 + i * 34 + 17;
        return (
          <g key={check}>
            <Tick cx={checksX + 24} cy={rowCy} />
            <Txt x={checksX + 42} y={rowCy + 5} size={14} fill={INK}>
              {check}
            </Txt>
          </g>
        );
      })}

      <Arrow x1={checksX + checksW + 6} y1={cy} x2={destX - 6} y2={cy} color={tone.arrow} />

      <Card x={destX} y={top} w={sideW} h={sideH} ctx={ctx} />
      <circle cx={destCx} cy={top + 46} r={26} fill={tone.accent} />
      <Glyph icon={COVER_ICONS.headset} x={destCx - 12} y={top + 34} size={24} color="#ffffff" />
      <Txt x={destCx} y={top + 100} size={15} weight={600} fill={INK} anchor="middle">
        {scene.to}
      </Txt>
      <rect x={destCx - 48} y={top + 116} width={96} height={26} rx={13} fill={GREEN.fill} stroke={GREEN.stroke} />
      <circle cx={destCx - 34} cy={top + 129} r={3.5} fill={GREEN.dot} />
      <Txt x={destCx - 25} y={top + 133.5} size={12} weight={600} fill={GREEN.ink}>
        Connected
      </Txt>
    </g>
  );
}

/** Two or three option cards, with "vs" between a pair. */
function CompareScene({ scene, ctx }: SceneProps<CompareCover>) {
  const { tone } = ctx;
  const count = scene.columns.length;
  const gap = count === 2 ? 84 : 19;
  const w = (WIDTH - gap * (count - 1)) / count;
  const y = 86;
  const h = 240;

  return (
    <g>
      {scene.columns.map((column, i) => {
        const x = LEFT + i * (w + gap);
        const lit = Boolean(column.highlight);
        return (
          <g key={column.title}>
            <Card
              x={x}
              y={y}
              w={w}
              h={h}
              r={12}
              ctx={ctx}
              stroke={lit ? tone.accent : undefined}
              strokeWidth={lit ? 2 : 1}
            />
            <rect x={x + 20} y={y + 20} width={44} height={44} rx={10} fill={lit ? tone.accent : tone.tint} />
            <Glyph
              icon={COVER_ICONS[column.icon]}
              x={x + 31}
              y={y + 31}
              size={22}
              color={lit ? "#ffffff" : tone.accent}
            />
            <Txt x={x + 20} y={y + 98} size={17} weight={600} fill={INK}>
              {column.title}
            </Txt>
            <line x1={x + 20} y1={y + 116} x2={x + w - 20} y2={y + 116} stroke={HAIRLINE} />
            {column.lines.map((line, row) => {
              const rowY = y + 146 + row * 30;
              return (
                <g key={line}>
                  <Tick cx={x + 28} cy={rowY - 5} r={8} />
                  <Txt x={x + 44} y={rowY} size={14} fill={BODY}>
                    {line}
                  </Txt>
                </g>
              );
            })}
          </g>
        );
      })}
      {count === 2 ? (
        <g>
          <circle cx={CENTER_X} cy={y + h / 2} r={22} fill="#ffffff" filter={ctx.shadow} />
          <Txt x={CENTER_X} y={y + h / 2 + 5} size={14} weight={700} fill={tone.accent} anchor="middle">
            vs
          </Txt>
        </g>
      ) : null}
    </g>
  );
}

/** Rising bars: each product does more of the work for the buyer. */
function LadderScene({ scene, ctx }: SceneProps<LadderCover>) {
  const { tone } = ctx;
  const count = scene.steps.length;
  const w = count >= 4 ? 122 : 164;
  const gap = (WIDTH - count * w) / (count - 1);
  const base = 292;

  return (
    <g>
      {scene.steps.map((step, i) => {
        const h = 100 + (i * 96) / (count - 1);
        const x = LEFT + i * (w + gap);
        const top = base - h;
        const lit = i === count - 1;
        const cx = x + w / 2;
        return (
          <g key={step.label}>
            <Card
              x={x}
              y={top}
              w={w}
              h={h}
              r={12}
              ctx={ctx}
              fill={lit ? tone.accent : "#ffffff"}
              stroke={lit ? tone.accent : undefined}
            />
            <Glyph
              icon={COVER_ICONS[step.icon]}
              x={cx - 12}
              y={top + 18}
              size={24}
              color={lit ? "#ffffff" : tone.accent}
            />
            <Txt x={cx} y={top + 64} size={14} weight={600} fill={lit ? "#ffffff" : INK} anchor="middle">
              {step.label}
            </Txt>
            <Txt
              x={cx}
              y={top + 84}
              size={12}
              fill={lit ? "#ffffff" : MUTED}
              opacity={lit ? 0.85 : undefined}
              anchor="middle"
            >
              {step.sub}
            </Txt>
          </g>
        );
      })}
      <Arrow x1={LEFT} y1={314} x2={LEFT + WIDTH} y2={314} color={tone.sub} dashed={false} width={1.5} />
      <Txt x={CENTER_X} y={340} size={13} fill={tone.sub} anchor="middle">
        {scene.axis}
      </Txt>
    </g>
  );
}

/** A card of ticked or numbered rows, with a second sheet behind it. */
function ChecklistScene({ scene, ctx }: SceneProps<ChecklistCover>) {
  const { tone } = ctx;
  const rowH = 32;
  const rows = scene.items.length + (scene.more ? 1 : 0);
  const w = 420;
  const x = CENTER_X - w / 2;
  const h = 52 + rows * rowH + 12;
  const y = Math.round(TOP + Math.max(0, (ROOM - h) / 2));
  const rowCy = (i: number) => y + 52 + 6 + i * rowH + rowH / 2;

  return (
    <g>
      <rect
        x={x + 18}
        y={y - 10}
        width={w - 36}
        height={h}
        rx={12}
        fill="#ffffff"
        opacity={tone.dark ? 0.16 : 0.55}
      />
      <Card x={x} y={y} w={w} h={h} r={12} ctx={ctx} />
      <rect x={x + 18} y={y + 12} width={28} height={28} rx={8} fill={tone.tint} />
      <Glyph icon={ListChecks} x={x + 24} y={y + 18} size={16} color={tone.accent} />
      <Txt x={x + 56} y={y + 31} size={15} weight={600} fill={INK}>
        {scene.title}
      </Txt>
      {scene.badge ? (
        <Txt x={x + w - 18} y={y + 31} size={12} weight={600} fill={tone.accent} anchor="end">
          {scene.badge}
        </Txt>
      ) : null}
      <line x1={x} y1={y + 52} x2={x + w} y2={y + 52} stroke={HAIRLINE} />
      {scene.items.map((item, i) => (
        <g key={item}>
          {scene.numbered ? (
            <>
              <circle cx={x + 30} cy={rowCy(i)} r={11} fill={tone.tint} />
              <Txt x={x + 30} y={rowCy(i) + 4.2} size={12} weight={700} fill={tone.accent} anchor="middle">
                {i + 1}
              </Txt>
            </>
          ) : (
            <Tick cx={x + 30} cy={rowCy(i)} r={10} />
          )}
          <Txt x={x + 52} y={rowCy(i) + 5} size={14} fill={INK}>
            {item}
          </Txt>
        </g>
      ))}
      {scene.more ? (
        <Txt x={x + 52} y={rowCy(scene.items.length) + 5} size={14} weight={600} fill={tone.accent}>
          {scene.more}
        </Txt>
      ) : null}
    </g>
  );
}

/** Channel tiles in two rows, one highlighted, over a caption. */
function ChannelsScene({ scene, ctx }: SceneProps<ChannelsCover>) {
  const { tone } = ctx;
  const gap = 16;
  const h = 100;
  const firstRow = Math.ceil(scene.items.length / 2);
  const w = (WIDTH - (firstRow - 1) * gap) / firstRow;
  const rows = [scene.items.slice(0, firstRow), scene.items.slice(firstRow)];

  return (
    <g>
      {rows.map((row, r) => {
        const rowWidth = row.length * w + (row.length - 1) * gap;
        const startX = LEFT + (WIDTH - rowWidth) / 2;
        const y = 80 + r * (h + gap);
        return row.map((item, i) => {
          const x = startX + i * (w + gap);
          const lit = Boolean(item.highlight);
          return (
            <g key={item.label}>
              <Card
                x={x}
                y={y}
                w={w}
                h={h}
                ctx={ctx}
                fill={lit ? tone.accent : "#ffffff"}
                stroke={lit ? tone.accent : undefined}
              />
              <rect
                x={x + 16}
                y={y + 16}
                width={34}
                height={34}
                rx={9}
                fill={lit ? "#ffffff" : tone.tint}
                opacity={lit ? 0.18 : 1}
              />
              <Glyph
                icon={COVER_ICONS[item.icon]}
                x={x + 24}
                y={y + 24}
                size={18}
                color={lit ? "#ffffff" : tone.accent}
              />
              <Txt x={x + 16} y={y + 80} size={14} weight={600} fill={lit ? "#ffffff" : INK}>
                {item.label}
              </Txt>
            </g>
          );
        });
      })}
      <Txt x={CENTER_X} y={330} size={13} fill={tone.sub} anchor="middle">
        {scene.caption}
      </Txt>
    </g>
  );
}

/** A call record: consent, recording and scrub rows, with a shield badge. */
function RecordScene({ scene, ctx }: SceneProps<RecordCover>) {
  const { tone } = ctx;
  const rowH = 48;
  const w = 400;
  const x = 100;
  const h = 56 + scene.rows.length * rowH + 8;
  const y = Math.round(TOP + Math.max(0, (ROOM - h) / 2));
  const badgeW = approxWidth(scene.badge, 12) + 24;
  const bars = [6, 12, 8, 16, 10, 14, 7, 11, 5];

  return (
    <g>
      <Card x={x} y={y} w={w} h={h} r={12} ctx={ctx} />
      <rect x={x + 18} y={y + 14} width={28} height={28} rx={8} fill={tone.tint} />
      <Glyph icon={Phone} x={x + 24} y={y + 20} size={16} color={tone.accent} />
      <Txt x={x + 56} y={y + 33} size={15} weight={600} fill={INK}>
        {scene.title}
      </Txt>
      <rect x={x + w - 18 - badgeW} y={y + 15} width={badgeW} height={26} rx={13} fill={tone.tint} />
      <Txt x={x + w - 18 - badgeW / 2} y={y + 32} size={12} weight={600} fill={tone.accent} anchor="middle">
        {scene.badge}
      </Txt>
      <line x1={x} y1={y + 56} x2={x + w} y2={y + 56} stroke={HAIRLINE} />
      {scene.rows.map((row, i) => {
        const top = y + 56 + 4 + i * rowH;
        const cy = top + rowH / 2;
        return (
          <g key={row.label}>
            {i > 0 ? <line x1={x + 18} y1={top} x2={x + w - 18} y2={top} stroke="#f3f4f6" /> : null}
            <rect x={x + 18} y={cy - 16} width={32} height={32} rx={8} fill={tone.tint} />
            <Glyph icon={COVER_ICONS[row.icon]} x={x + 26} y={cy - 8} size={16} color={tone.accent} />
            <Txt x={x + 62} y={cy + 5} size={15} fill={INK}>
              {row.label}
            </Txt>
            {row.status === "check" ? (
              <Tick cx={x + w - 32} cy={cy} r={11} />
            ) : (
              <Wave x={x + w - 20 - waveWidth(bars.length)} cy={cy} color={tone.accent} bars={bars} />
            )}
          </g>
        );
      })}
      <circle cx={560} cy={y + 46} r={34} fill="#ffffff" filter={ctx.shadow} />
      <circle cx={560} cy={y + 46} r={25} fill={tone.tint} />
      <Glyph icon={ShieldCheck} x={546} y={y + 32} size={28} color={tone.accent} />
    </g>
  );
}

/** Numbered steps joined by arrows, with an optional pill under them. */
function StepsScene({ scene, ctx }: SceneProps<StepsCover>) {
  const { tone } = ctx;
  const count = scene.steps.length;
  const colW = WIDTH / count;
  const hasSub = scene.steps.some((step) => step.sub);
  const cy = scene.badge || hasSub ? 160 : 184;
  const cx = (i: number) => LEFT + colW * (i + 0.5);
  const badgeY = cy + (hasSub ? 112 : 104);
  const badgeW = scene.badge ? 48 + approxWidth(scene.badge.label, 15) + 22 : 0;

  return (
    <g>
      {scene.steps.slice(1).map((step, i) => (
        <Arrow key={step.label} x1={cx(i) + 38} y1={cy} x2={cx(i + 1) - 38} y2={cy} color={tone.arrow} />
      ))}
      {scene.steps.map((step, i) => {
        const lit = i === count - 1;
        return (
          <g key={step.label}>
            <Txt x={cx(i)} y={cy - 44} size={11} weight={600} fill={tone.sub} anchor="middle" spacing={1.2}>
              {`STEP ${i + 1}`}
            </Txt>
            <circle
              cx={cx(i)}
              cy={cy}
              r={30}
              fill={lit ? tone.accent : "#ffffff"}
              stroke={lit ? (tone.dark ? "#ffffff" : tone.accent) : "rgba(10, 19, 41, 0.1)"}
              strokeWidth={lit && tone.dark ? 2 : 1}
              filter={ctx.shadow}
            />
            <Glyph
              icon={COVER_ICONS[step.icon]}
              x={cx(i) - 12}
              y={cy - 12}
              size={24}
              color={lit ? "#ffffff" : tone.accent}
            />
            <Txt x={cx(i)} y={cy + 56} size={14} weight={600} fill={tone.ink} anchor="middle">
              {step.label}
            </Txt>
            {step.sub ? (
              <Txt x={cx(i)} y={cy + 76} size={12} fill={tone.sub} anchor="middle">
                {step.sub}
              </Txt>
            ) : null}
          </g>
        );
      })}
      {scene.badge ? (
        <g>
          <rect
            x={CENTER_X - badgeW / 2}
            y={badgeY}
            width={badgeW}
            height={40}
            rx={20}
            fill="#ffffff"
            filter={ctx.shadow}
          />
          <Glyph
            icon={COVER_ICONS[scene.badge.icon]}
            x={CENTER_X - badgeW / 2 + 20}
            y={badgeY + 11}
            size={18}
            color={tone.accent}
          />
          <Txt x={CENTER_X - badgeW / 2 + 48} y={badgeY + 25.5} size={15} weight={600} fill={INK}>
            {scene.badge.label}
          </Txt>
        </g>
      ) : null}
    </g>
  );
}

/** A hub with vertical chips around it on an ellipse. */
function NetworkScene({ scene, ctx }: SceneProps<NetworkCover>) {
  const { tone } = ctx;
  const hub = { x: CENTER_X, y: 204 };
  const radius = { x: 236, y: 110 };
  const nodes = scene.nodes.map((label, i) => {
    const angle = ((-90 + (i * 360) / scene.nodes.length) * Math.PI) / 180;
    const w = 30 + approxWidth(label, 13) + 14;
    const px = hub.x + radius.x * Math.cos(angle);
    const py = hub.y + radius.y * Math.sin(angle);
    const x = Math.min(Math.max(px - w / 2, LEFT), LEFT + WIDTH - w);
    return { label, w, px, py, x, legal: i < scene.split };
  });
  const LEGAL_DOT = "#1c64f2";
  const INSURANCE_DOT = "#0e9f6e";

  return (
    <g>
      {nodes.map((node) => (
        <line
          key={`spoke-${node.label}`}
          x1={hub.x}
          y1={hub.y}
          x2={node.x + node.w / 2}
          y2={node.py}
          stroke={tone.arrow}
          strokeOpacity={0.55}
          strokeWidth={1.5}
          strokeDasharray="3 5"
        />
      ))}
      <circle cx={hub.x} cy={hub.y} r={62} fill={tone.accent} opacity={tone.dark ? 0.22 : 0.1} />
      <circle
        cx={hub.x}
        cy={hub.y}
        r={46}
        fill={tone.accent}
        stroke={tone.dark ? "#ffffff" : "none"}
        strokeWidth={2}
        filter={ctx.shadow}
      />
      <Glyph icon={COVER_ICONS[scene.centerIcon]} x={hub.x - 12} y={hub.y - 22} size={24} color="#ffffff" />
      <Txt x={hub.x} y={hub.y + 20} size={12} weight={600} fill="#ffffff" anchor="middle">
        {scene.center}
      </Txt>
      {nodes.map((node) => (
        <g key={node.label}>
          <Card x={node.x} y={node.py - 17} w={node.w} h={34} r={17} ctx={ctx} />
          <circle cx={node.x + 16} cy={node.py} r={4} fill={node.legal ? LEGAL_DOT : INSURANCE_DOT} />
          <Txt x={node.x + 28} y={node.py + 4.5} size={13} weight={600} fill={INK}>
            {node.label}
          </Txt>
        </g>
      ))}
      <circle cx={LEFT + 6} cy={337} r={4} fill={LEGAL_DOT} stroke={tone.dark ? "#ffffff" : "none"} />
      <Txt x={LEFT + 16} y={341} size={12} fill={tone.sub}>
        Legal
      </Txt>
      <circle cx={LEFT + 66} cy={337} r={4} fill={INSURANCE_DOT} stroke={tone.dark ? "#ffffff" : "none"} />
      <Txt x={LEFT + 76} y={341} size={12} fill={tone.sub}>
        Insurance
      </Txt>
    </g>
  );
}

/** Callers narrowing through each check to a transfer; failures drop out
 * to a "not billed" chip. */
function FunnelScene({ scene, ctx }: SceneProps<FunnelCover>) {
  const { tone } = ctx;
  const count = scene.checks.length;
  const topW = 500;
  const bottomW = 220;
  const layerH = 38;
  const gap = 6;
  const step = (topW - bottomW) / (count - 1);
  const taper = (step * layerH) / (layerH + gap);
  const y0 = 76;
  const bottom = y0 + count * layerH + (count - 1) * gap;
  const resultW = 40 + approxWidth(scene.result, 14) + 18;
  const resultX = CENTER_X - resultW / 2;
  const resultY = bottom + 16;

  const dropRow = Math.min(3, count - 2);
  const dropY = y0 + dropRow * (layerH + gap) + layerH / 2;
  const dropEdge = CENTER_X + (topW - dropRow * step) / 2 - taper / 2;
  const chipW = 32 + approxWidth(scene.rejected, 12) + 12;
  const chipX = LEFT + WIDTH - chipW;

  return (
    <g>
      {scene.checks.map((check, i) => {
        const w = topW - i * step;
        const y = y0 + i * (layerH + gap);
        const left = CENTER_X - w / 2;
        const right = CENTER_X + w / 2;
        const points = [
          [left, y],
          [right, y],
          [right - taper / 2, y + layerH],
          [left + taper / 2, y + layerH],
        ]
          .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
          .join(" ");
        const groupW = 26 + approxWidth(check, 14);
        const startX = CENTER_X - groupW / 2;
        return (
          <g key={check}>
            <polygon
              points={points}
              fill={i === count - 1 ? tone.tint : "#ffffff"}
              stroke="rgba(10, 19, 41, 0.1)"
              strokeLinejoin="round"
              filter={ctx.shadow}
            />
            <Tick cx={startX + 9} cy={y + layerH / 2} />
            <Txt x={startX + 26} y={y + layerH / 2 + 5} size={14} weight={600} fill={INK}>
              {check}
            </Txt>
          </g>
        );
      })}

      <Arrow x1={dropEdge + 8} y1={dropY} x2={chipX - 8} y2={dropY} color={tone.sub} />
      <rect x={chipX} y={dropY - 14} width={chipW} height={28} rx={14} fill="#ffffff" filter={ctx.shadow} />
      <circle cx={chipX + 18} cy={dropY} r={8} fill="#fde8e8" />
      <path
        d={`M${chipX + 15} ${dropY - 3}L${chipX + 21} ${dropY + 3}M${chipX + 21} ${dropY - 3}L${chipX + 15} ${dropY + 3}`}
        stroke="#c81e1e"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Txt x={chipX + 32} y={dropY + 4.5} size={12} weight={600} fill="#9b1c1c">
        {scene.rejected}
      </Txt>

      <rect
        x={resultX}
        y={resultY}
        width={resultW}
        height={32}
        rx={16}
        fill={GREEN.fill}
        stroke={GREEN.stroke}
        filter={ctx.shadow}
      />
      <Glyph icon={PhoneForwarded} x={resultX + 16} y={resultY + 8} size={16} color={GREEN.ink} />
      <Txt x={resultX + 40} y={resultY + 21} size={14} weight={600} fill={GREEN.ink}>
        {scene.result}
      </Txt>
    </g>
  );
}

export function Scene({ scene, ctx }: SceneProps<CoverScene>) {
  switch (scene.kind) {
    case "transfer":
      return <TransferScene scene={scene} ctx={ctx} />;
    case "compare":
      return <CompareScene scene={scene} ctx={ctx} />;
    case "ladder":
      return <LadderScene scene={scene} ctx={ctx} />;
    case "checklist":
      return <ChecklistScene scene={scene} ctx={ctx} />;
    case "channels":
      return <ChannelsScene scene={scene} ctx={ctx} />;
    case "record":
      return <RecordScene scene={scene} ctx={ctx} />;
    case "steps":
      return <StepsScene scene={scene} ctx={ctx} />;
    case "network":
      return <NetworkScene scene={scene} ctx={ctx} />;
    case "funnel":
      return <FunnelScene scene={scene} ctx={ctx} />;
  }
}
