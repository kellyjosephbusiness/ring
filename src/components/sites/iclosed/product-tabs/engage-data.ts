import { IMG } from "./assets";
import type { ChannelId, PreviewKey, StatusId } from "./engage-script";

/** Selected-row preview for each storyboard beat: [time, text, outgoing]. */
export const PREVIEWS: Record<PreviewKey, [string, string, boolean]> = {
  new: ["21:02", "Lead captured as potential", false],
  agent: ["21:03", "Hey Sara! Looks like you didn’t get to pick a time…", true],
  reply: ["21:05", "so glad you texted! got pulled away halfway through…", false],
  booked: ["21:06", "Booked — Strategy Call, Tue 2:30 PM · recovered in 3m 42s", true],
  rec: ["15:04", "Recording ready — Strategy Call (34:12)", true],
  link: ["15:12", "Your Scaling Accelerator onboarding link", true],
  paid: ["15:41", "Payment received — $5,000 · Scaling Accelerator", true],
};

export type InboxRow = {
  name: string;
  photo?: string;
  ini?: string;
  time: string;
  prev: string;
  unread?: string;
  out?: boolean;
};

/** The rest of the conversation list, under Sara's row. */
export const OTHER_ROWS: InboxRow[] = [
  { name: "@growwithjess", photo: IMG.jess, time: "20:58", prev: "Commented “roadmap” on your reel", unread: "1" },
  { name: "Rachel Donnelly", ini: "RD", time: "20:44", prev: "Booked — Strategy Call, Fri 10:30 AM", out: true },
  { name: "Jannice Halvorson", photo: IMG.jannice, time: "18:12", prev: "Can you send over the proposal?", unread: "2" },
  { name: "Julien Mercier", ini: "JM", time: "17:05", prev: "Booked — Strategy Call, Thu 15:30", out: true },
  { name: "Nora Vance", ini: "NV", time: "14:20", prev: "Revised proposal — Scale Program · v2", out: true },
  {
    name: "Brooke Callahan",
    ini: "BC",
    time: "Yesterday",
    prev: "Payment received — $8,000 · Growth Accelerator",
    out: true,
  },
];

export type ThreadItem = "sepY" | "act" | "asgn" | "agent" | "sara1" | "booked" | "sepT" | "rec" | "email" | "paid";

/** Thread items in order; the storyboard reveals the first `n`. */
export const THREAD: ThreadItem[] = ["sepY", "act", "asgn", "agent", "sara1", "booked", "sepT", "rec", "email", "paid"];

/** The recording is 34:12 long; the scrubber fills against this many seconds. */
export const RECORDING_SECONDS = 2052;
/** Width of the comment-marker lane in the player. */
export const LANE_WIDTH = 716;

export type CallComment = {
  id: string;
  name: string;
  photo?: string;
  ini?: string;
  ts: string;
  ago: string;
  /** Position along the recording, 0–1. */
  pct: number;
  ment: string;
  post: string;
  replies?: boolean;
};

export const CALL_COMMENTS: CallComment[] = [
  {
    id: "scott",
    name: "Scott Bennett",
    ini: "S",
    ts: "04:12",
    ago: "1 hour ago",
    pct: 0.123,
    ment: "",
    post: "Strong discovery. She put a number on the cost of waiting herself.",
  },
  {
    id: "joanna",
    name: "Joanna Reyes",
    photo: IMG.joanna,
    ts: "18:40",
    ago: "40 min ago",
    pct: 0.546,
    ment: "",
    post: "This is where she commits. Clip it for Friday’s review.",
    replies: true,
  },
  {
    id: "john",
    name: "John Doe",
    photo: IMG.john,
    ts: "24:10",
    ago: "12 min ago",
    pct: 0.707,
    ment: "@Joanna",
    post: " she’s ready. Send the Stripe link after the call.",
  },
];

export const CHANNELS: { id: ChannelId; label: string; sub: string; icon: string }[] = [
  { id: "wa", label: "WhatsApp", sub: "+1 415 902 9123", icon: IMG.whatsapp },
  { id: "imsg", label: "iMessage", sub: "via Sendblue", icon: IMG.imessage },
  { id: "sms", label: "SMS", sub: "via Twilio", icon: IMG.twilio },
  { id: "email", label: "Email", sub: "sara.mitchell@gmail.com", icon: IMG.gmail },
  { id: "ig", label: "Instagram", sub: "@sara.mitchell", icon: IMG.instagram },
  { id: "msgr", label: "Messenger", sub: "Sara Mitchell", icon: IMG.messenger },
];

export const STATUSES: { id: StatusId; label: string; dot: string }[] = [
  { id: "cold", label: "Cold", dot: "#60A5FA" },
  { id: "warm", label: "Warm", dot: "#F59E0B" },
  { id: "hot", label: "Hot lead", dot: "#EF4444" },
  { id: "nofit", label: "Not a fit", dot: "#9CA3AF" },
];

/** 24 x 24 icon paths (stroke icons unless drawn with the filled variant). */
export const ICON = {
  chevD: "M6 9l6 6 6-6",
  chevU: "M6 15l6-6 6 6",
  chevR: "M9 6l6 6-6 6",
  back: "M9 14l-4-4 4-4M5 10h11a4 4 0 1 1 0 8h-1",
  checks: "M7 12l5 5L22 7M2 12l5 5m5-5l5-5",
  check: "M5 12l5 5L20 7",
  ccheck: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9 12l2 2 4-4",
  play: "M6 4v16a1 1 0 0 0 1.5.9l13-8a1 1 0 0 0 0-1.8l-13-8A1 1 0 0 0 6 4z",
  pause:
    "M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM17 4h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z",
  rwd: "M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5",
  fwd: "M19.95 11a8 8 0 1 0-.5 4m.5 5v-5h-5",
  msgPlus: "M8 9h8M8 13h6M12 18.6L8 21v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5.5M16 19h6M19 16v6",
  vol: "M15 8a5 5 0 0 1 0 8M17.7 5a9 9 0 0 1 0 14M6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l3.5-4.5A.8.8 0 0 1 11 5v14a.8.8 0 0 1-1.5.5z",
  max: "M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2",
  smile: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0",
  at: "M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.3",
  mic: "M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0zM5 10a7 7 0 0 0 14 0M8 21h8M12 17v4",
  upload: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 9l5-5 5 5M12 4v12",
  variable:
    "M5 4c-2.5 5-2.5 10 0 16M19 4c2.5 5 2.5 10 0 16M9 9h1c1 0 1 1 2 3.5s1 3.5 2 3.5h1M8 16c1.5 0 3-2 4-3.5S14.5 9 16 9",
  template:
    "M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 13a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM14 12h6M14 16h6M14 20h6",
  note: "M13 20l7-7M13 20v-6a1 1 0 0 1 1-1h6V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7",
  send: "M10 14L21 3M21 3l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1z",
  user: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  video:
    "M15 10l4.6-2.3a1 1 0 0 1 1.4.9v6.8a1 1 0 0 1-1.4.9L15 14zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  x: "M18 6L6 18M6 6l12 12",
  link: "M9 15l6-6M11 6l.5-.5a5 5 0 0 1 7 7l-.5.5M13 18l-.4.5a5 5 0 0 1-7.1 0 5 5 0 0 1 0-7l.5-.5",
  msg: "M3 20l1.3-3.9C2 12.7 2.9 8.2 6.4 5.7c3.5-2.5 8.6-2.3 11.8.5 3.3 2.8 3.7 7.3 1 10.5-2.7 3.2-7.6 4.2-11.6 2.3L3 20",
  notes: "M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM9 7h6M9 11h6M9 15h4",
  mail: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7l9 6 9-6",
  cal: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16",
  status: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0M11 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0",
  stairs: "M4 18h4v-4h4v-4h4V6h4",
  listd:
    "M13 5h8M13 9h5M13 15h8M13 19h5M3 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM3 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
  help: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 17v.01M12 13.5a1.5 1.5 0 0 1 1-1.5 2.6 2.6 0 1 0-3-4",
  expand: "M16 4h4v4M14 10l6-6M8 20H4v-4M4 20l6-6",
  bolt: "M13 3v7h6l-8 11v-7H5z",
  dollar: "M16.7 8A3 3 0 0 0 14 6h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1-2.7-2M12 3v3m0 12v3",
  userPlus: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M16 19h6M19 16v6M6 21v-2a4 4 0 0 1 4-4h4",
  calCheck: "M11.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M16 3v4M8 3v4M4 11h16M15 19l2 2 4-4",
  trophy:
    "M8 21h8M12 17v4M7 4h10M17 4v8a5 5 0 0 1-10 0V4M3 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0M17 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
  userMinus: "M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4c.35 0 .69.05 1 .13M16 19h6",
  search: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0M21 21l-6-6",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
} as const;

/** Formats whole seconds as mm:ss. */
export function clock(seconds: number): string {
  const pad = (n: number) => (n < 10 ? "0" : "") + n;
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}
