/* The Engage panel's storyboard: a lead (Sara) is recovered by the AI agent,
   books, has her call recorded, gets reassigned and emailed a payment link,
   and pays. Two cursors — John (closer, blue) and Joanna (sales manager,
   purple) — drive it. Each step patches the state and holds for `d` ms; the
   state at step i is every patch from 0 to i applied over the start state. */

export type CursorPos = { x: number; y: number; show: boolean };

export type PreviewKey = "new" | "agent" | "reply" | "booked" | "rec" | "link" | "paid";
export type ChannelId = "wa" | "imsg" | "sms" | "email" | "ig" | "msgr";
export type StatusId = "cold" | "warm" | "hot" | "nofit";

export type EngageState = {
  /** How many thread items are visible. */
  n: number;
  /** Which preview the selected conversation row shows. */
  prev: PreviewKey;
  rowNew: boolean;
  stage: "lead" | "booked" | "won";
  asg: 1 | 2;
  status: StatusId;
  chan: ChannelId;
  chanDD: boolean;
  chHov: string;
  tip: boolean;
  aiTyping: boolean;
  typing: string;
  compText: boolean;
  modal: boolean;
  playing: boolean;
  hover: string;
  recHover: boolean;
  statusDD: boolean;
  stHov: boolean;
  dd: boolean;
  a: CursorPos;
  b: CursorPos;
};

type Step = Partial<Omit<EngageState, "a" | "b">> & {
  /** Hold time in ms before the next step. */
  d: number;
  /** Click ring on cursor A / B during this step only. */
  ca?: boolean;
  cb?: boolean;
  a?: Partial<CursorPos>;
  b?: Partial<CursorPos>;
};

const START: EngageState = {
  n: 0,
  prev: "new",
  rowNew: false,
  stage: "lead",
  asg: 1,
  status: "warm",
  chan: "wa",
  chanDD: false,
  chHov: "",
  tip: false,
  aiTyping: false,
  typing: "",
  compText: false,
  modal: false,
  playing: false,
  hover: "",
  recHover: false,
  statusDD: false,
  stHov: false,
  dd: false,
  a: { x: 742, y: 530, show: false },
  b: { x: 548, y: 634, show: false },
};

export const ENGAGE_STEPS: Step[] = [
  { d: 1700, n: 2, prev: "new", rowNew: true },
  { d: 1400, rowNew: false, n: 3, a: { show: true } },
  { d: 1300, aiTyping: true },
  { d: 900, aiTyping: false, n: 4, prev: "agent", a: { x: 942, y: 508 } },
  { d: 2400, tip: true },
  { d: 1600, tip: false, n: 5, prev: "reply", a: { x: 788, y: 400 } },
  { d: 2000, n: 6, prev: "booked", stage: "booked" },
  { d: 1200, n: 8, prev: "rec", a: { x: 858, y: 494 } },
  { d: 450, ca: true, recHover: true },
  { d: 1300, recHover: false, modal: true, playing: false, a: { x: 446, y: 346 } },
  { d: 400, ca: true, playing: true },
  { d: 1700, a: { x: 479, y: 576 } },
  { d: 2600, hover: "joanna" },
  { d: 800, a: { x: 1222, y: 41 } },
  { d: 400, ca: true },
  { d: 1100, modal: false, playing: false, hover: "", a: { x: 1144, y: 262 } },
  { d: 400, ca: true, statusDD: true },
  { d: 900, stHov: true, a: { x: 1168, y: 367 } },
  { d: 400, ca: true, statusDD: false, stHov: false, status: "hot" },
  { d: 1300 },
  { d: 1000, a: { x: 900, y: 29 } },
  { d: 400, ca: true },
  { d: 1100, dd: true, a: { x: 800, y: 194 } },
  { d: 400, ca: true, asg: 2 },
  { d: 1000, dd: false, a: { x: 668, y: 330 }, b: { x: 548, y: 520, show: true } },
  { d: 800, b: { x: 388, y: 592 } },
  { d: 400, cb: true, chanDD: true },
  { d: 900, chHov: "email", b: { x: 418, y: 479 } },
  { d: 400, cb: true, chanDD: false, chHov: "", chan: "email" },
  { d: 2600, typing: "Joanna", compText: true, b: { x: 648, y: 636 } },
  { d: 900, b: { x: 906, y: 676 } },
  { d: 400, cb: true },
  { d: 2000, typing: "", compText: false, n: 9, prev: "link", b: { x: 768, y: 610 } },
  { d: 3400, n: 10, prev: "paid", stage: "won" },
];

export const ENGAGE_LAST_STEP = ENGAGE_STEPS.length - 1;

/** The graphic holds still until 60% of it is on screen, then starts 400ms later. */
export const ENGAGE_START_VISIBLE = 0.6;
export const ENGAGE_START_DELAY = 400;
/** It pauses while less than 15% of it is on screen. */
export const ENGAGE_PAUSE_VISIBLE = 0.15;

/** One full pass: the start delay plus every step's hold. */
export const ENGAGE_RUNTIME = ENGAGE_START_DELAY + ENGAGE_STEPS.reduce((sum, step) => sum + step.d, 0);

export type EngageFrame = EngageState & { ca: boolean; cb: boolean };

export function engageStateAt(index: number): EngageFrame {
  const state: EngageState = { ...START, a: { ...START.a }, b: { ...START.b } };
  for (let i = 0; i <= index; i++) {
    const { d: _hold, ca: _ca, cb: _cb, a, b, ...patch } = ENGAGE_STEPS[i];
    Object.assign(state, patch);
    if (a) state.a = { ...state.a, ...a };
    if (b) state.b = { ...state.b, ...b };
  }
  return { ...state, ca: !!ENGAGE_STEPS[index].ca, cb: !!ENGAGE_STEPS[index].cb };
}
