import { AGENT_DEMO, AGENT_START_DELAY, agentPlayMs } from "./agent-data";
import { ENGAGE_RUNTIME } from "./engage-script";

export type TabId = "qualify" | "engage" | "measure" | "agent";

export type TabConfig = {
  id: TabId;
  label: string;
  /** How long autoplay stays on the tab (the progress bar's sweep). */
  dwell: number;
};

/** Reading time left on the AI Agent tab once its answer has settled. */
const AGENT_READ_MS = 5000;

export const TABS: TabConfig[] = [
  { id: "qualify", label: "Qualify & Route", dwell: 12000 },
  // One full pass of the inbox storyboard (40,350ms).
  { id: "engage", label: "Engage", dwell: ENGAGE_RUNTIME },
  { id: "measure", label: "Measure", dwell: 7000 },
  // Typing the ask, the turn, then time to read (10,784ms).
  { id: "agent", label: "AI Agent", dwell: AGENT_START_DELAY + agentPlayMs(AGENT_DEMO.ask) + AGENT_READ_MS },
];

/** Autoplay runs while at least this much of the section is on screen. */
export const AUTOPLAY_VISIBLE = 0.15;
