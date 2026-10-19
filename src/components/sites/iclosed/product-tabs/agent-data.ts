import { IMG } from "./assets";

/* The "AI Agent" tab: an agent chat window (in the style of Claude / Codex /
   Cursor) with iClosed and six other connectors switched on. The tab plays the
   first conversation: the question types into the composer, then the turn
   steps through thinking → three tool calls → the answer table. */

export type AgentChat = {
  name: string;
  logo: string;
  title: string;
  ask: string;
  aRun: string;
  aDone: string;
  aMeta: string;
  bRun: string;
  bDone: string;
  bMeta: string;
  cRun: string;
  cDone: string;
  intro: string;
  cols: string[];
  rows: string[][];
  decision: string;
  follow: string;
  /** Which agent mark (Claude, Codex, Cursor) answers. */
  agent: number;
};

export const AGENT_CHATS: AgentChat[] = [
  {
    name: "Meta Ads",
    logo: IMG.logoMetaAds,
    title: "Ad budget check",
    ask: "Which campaigns book qualified calls, and where should next week’s budget go?",
    aRun: "Searching iClosed…",
    aDone: "read qualified calls by campaign",
    aMeta: "52 calls",
    bRun: "Reading Meta Ads…",
    bDone: "read spend by campaign",
    bMeta: "3 campaigns",
    cRun: "Working out cost per qualified call…",
    cDone: "Worked out cost per qualified call",
    intro: "Q3 webinar is doing the heavy lifting. Here’s what each qualified call cost you:",
    cols: ["Campaign", "Qualified calls", "Spend", "Per call"],
    rows: [
      ["Q3 webinar", "31", "$4,200", "$135"],
      ["Retargeting", "9", "$1,600", "$178"],
      ["Free audit offer", "12", "$3,100", "$258"],
    ],
    decision: "Move about $2,000 from “Free audit” to “Q3 webinar” next week.",
    follow: "Show last month too",
    agent: 0,
  },
  {
    name: "Stripe",
    logo: IMG.logoStripe,
    title: "Unpaid deals",
    ask: "Which deals closed this month that still haven’t paid?",
    aRun: "Searching iClosed…",
    aDone: "read deals closed this month",
    aMeta: "9 deals",
    bRun: "Reading Stripe…",
    bDone: "read payments and invoices",
    bMeta: "9 customers",
    cRun: "Matching deals to payments…",
    cDone: "Matched every deal to its payments",
    intro: "Three closed deals are short on payment:",
    cols: ["Lead", "Closed", "Paid", "Still owed"],
    rows: [
      ["Morgan Lee", "$6,800", "$0", "$6,800"],
      ["Dan Ortiz", "$3,200", "$0", "$3,200"],
      ["Priya Shah", "$4,500", "$2,250", "$2,250"],
    ],
    decision: "Chase $12,250, starting with Morgan. Her invoice is 12 days old.",
    follow: "Draft a reminder to Morgan",
    agent: 1,
  },
  {
    name: "Gmail",
    logo: IMG.logoGmail,
    title: "No-show follow-ups",
    ask: "Which of this week’s no-shows have emailed us since?",
    aRun: "Searching iClosed…",
    aDone: "read this week’s no-shows",
    aMeta: "3 leads",
    bRun: "Searching Gmail…",
    bDone: "searched your inbox for their replies",
    bMeta: "1 found",
    cRun: "Ranking by deal value…",
    cDone: "Ranked them by deal value and who replied",
    intro: "One of them already wrote back:",
    cols: ["Lead", "Deal", "Since the no-show"],
    rows: [
      ["Lena Park", "$9,500", "“Can we do Thursday?”"],
      ["Sam Rivera", "$6,000", "No reply"],
      ["Dan Ortiz", "$4,200", "No reply"],
    ],
    decision: "Call Lena first. She asked to reschedule, and she’s your biggest no-show.",
    follow: "Draft a reply to Lena",
    agent: 2,
  },
  {
    name: "HubSpot",
    logo: IMG.logoHubspot,
    title: "CRM clean-up",
    ask: "Who closed in iClosed this week but is still a Lead in HubSpot?",
    aRun: "Searching iClosed…",
    aDone: "read calls closed this week",
    aMeta: "7 deals",
    bRun: "Reading HubSpot…",
    bDone: "read lifecycle stages",
    bMeta: "7 contacts",
    cRun: "Looking for mismatches…",
    cDone: "Found 2 mismatches",
    intro: "Two customers are still marked as leads in HubSpot:",
    cols: ["Contact", "In iClosed", "In HubSpot"],
    rows: [
      ["Morgan Lee", "Closed", "Lead"],
      ["Lena Park", "Closed", "Lead"],
      ["Priya Shah", "Closed", "Customer"],
    ],
    decision: "Update Morgan and Lena to Customer, so your nurture emails stop selling to them.",
    follow: "Update them in HubSpot",
    agent: 0,
  },
  {
    name: "Google Ads",
    logo: IMG.logoGoogleAds,
    title: "Ad copy review",
    ask: "Compare what our won deals say on the form with the ads we’re running.",
    aRun: "Searching iClosed…",
    aDone: "read form answers from won deals",
    aMeta: "23 deals",
    bRun: "Reading Google Ads…",
    bDone: "read your top search ads",
    bMeta: "12 ads",
    cRun: "Comparing the wording…",
    cDone: "Compared your buyers’ words with your ads",
    intro: "Your buyers and your ads are talking about different problems:",
    cols: ["What won deals say", "Share", "Your top ad says"],
    rows: [
      ["Leads go cold before we call", "38%", "“Best scheduling tool”"],
      ["Too many no-shows", "27%", "“Calendar for coaches”"],
      ["Setters can’t keep up", "21%", "“Booking page software”"],
    ],
    decision: "Rewrite your top ads around speed to lead, in your buyers’ own words.",
    follow: "Draft 3 new headlines",
    agent: 1,
  },
  {
    name: "Slack",
    logo: IMG.logoSlack,
    title: "Weekly show-rate check",
    ask: "Every Friday, post show rate by closer to #sales-managers and flag anyone under 70%.",
    aRun: "Searching iClosed…",
    aDone: "read show rate by closer",
    aMeta: "this week",
    bRun: "Finding the channel in Slack…",
    bDone: "found #sales-managers",
    bMeta: "6 members",
    cRun: "Scheduling it…",
    cDone: "Posted it, and scheduled it for Fridays at 4:00 PM",
    intro: "Done. Here’s what I posted to #sales-managers:",
    cols: ["Closer", "Show rate", "Flag"],
    rows: [
      ["Jamie Alvarez", "84%", "–"],
      ["Nora Kim", "79%", "–"],
      ["Alex Reed", "61%", "Under 70%"],
    ],
    decision: "Alex is 18 points under the team. I’ll post this every Friday at 4:00 PM.",
    follow: "Change the threshold",
    agent: 2,
  },
];

/** The conversation the tab plays. */
export const AGENT_DEMO = AGENT_CHATS[0];

/** Typing: two characters every 26ms. */
export const TYPE_TICK_MS = 26;
/** Steps: 0 greeting/typing, 1 question sent, 2 thinking + first tool, 3 second
 * tool, 4 third tool, 5 answer, 6 settled (follow-up suggestion). */
export const AGENT_FINAL_STEP = 6;
/** Delay after mount before the question starts typing. */
export const AGENT_START_DELAY = 400;

/** When each step lands, relative to the moment typing starts. */
export function agentStepTimes(ask: string): [number, number][] {
  const typed = Math.ceil(ask.length / 2) * TYPE_TICK_MS + 420;
  return [
    [typed, 1],
    [typed + 650, 2],
    [typed + 1550, 3],
    [typed + 2500, 4],
    [typed + 3400, 5],
    [typed + 3950, 6],
  ];
}

/** Typing plus the whole turn, until the answer has settled. */
export function agentPlayMs(ask: string): number {
  return Math.ceil(ask.length / 2) * TYPE_TICK_MS + 420 + 3950;
}
