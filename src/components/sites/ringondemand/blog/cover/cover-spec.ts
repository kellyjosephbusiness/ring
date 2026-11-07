/**
 * Blog cover graphics: what each post's illustration shows. Every post in
 * content/blog/posts.ts carries one spec; PostCover draws it as an inline
 * SVG in the site's own style (white cards on a pale panel, green ticks, the
 * brand blue), so the card on the blog index shows what the post explains
 * before anyone clicks.
 *
 * Labels are drawn as SVG text at fixed sizes, so keep them short: the limits
 * noted on each field keep text inside its card from a phone-width thumbnail
 * up to the post header.
 */
import {
  Archive,
  BadgeCheck,
  BadgeDollarSign,
  Banknote,
  Building2,
  Car,
  Clock,
  FileText,
  HandCoins,
  HardHat,
  Headset,
  Heart,
  ListChecks,
  Mic,
  MousePointerClick,
  PenLine,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  Radio,
  ScrollText,
  Search,
  Signature,
  Star,
  Tv,
  User,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export const COVER_ICONS = {
  archive: Archive,
  badgeCheck: BadgeCheck,
  banknote: Banknote,
  building: Building2,
  car: Car,
  clock: Clock,
  click: MousePointerClick,
  dollar: BadgeDollarSign,
  form: FileText,
  handCoins: HandCoins,
  hardHat: HardHat,
  headset: Headset,
  heart: Heart,
  listChecks: ListChecks,
  mic: Mic,
  penLine: PenLine,
  phone: Phone,
  phoneCall: PhoneCall,
  phoneForwarded: PhoneForwarded,
  phoneIncoming: PhoneIncoming,
  radio: Radio,
  scroll: ScrollText,
  search: Search,
  signature: Signature,
  star: Star,
  tv: Tv,
  user: User,
  userCheck: UserCheck,
  users: Users,
} as const satisfies Record<string, LucideIcon>;

export type CoverIcon = keyof typeof COVER_ICONS;

/** A caller passing screening checks, then connected to the buyer. */
export interface TransferCover {
  kind: "transfer";
  /** Who is calling: up to 16 characters. */
  caller: string;
  callerIcon: CoverIcon;
  /** 3 to 5 checks, up to 20 characters each. */
  checks: readonly string[];
  /** Who takes the transfer: up to 17 characters. */
  to: string;
}

/** Two or three options side by side. */
export interface CompareCover {
  kind: "compare";
  /** Titles up to 15 characters. Lines up to 24 characters with two
   * columns, 16 with three. */
  columns: readonly { title: string; icon: CoverIcon; lines: readonly string[]; highlight?: boolean }[];
}

/** Products ordered by how much is done for the buyer, as rising bars. */
export interface LadderCover {
  kind: "ladder";
  /** 3 or 4 steps. Labels up to 13 characters, subs up to 16. */
  steps: readonly { label: string; sub: string; icon: CoverIcon }[];
  /** The arrow's label under the bars. */
  axis: string;
}

/** A card of questions or checks. */
export interface ChecklistCover {
  kind: "checklist";
  title: string;
  /** Small text at the card's top right. */
  badge?: string;
  /** Up to 6 items, up to 34 characters each. */
  items: readonly string[];
  /** Number the items instead of ticking them. */
  numbered?: boolean;
  /** A closing row in blue, such as "+ 8 more questions". */
  more?: string;
}

/** A grid of channels, one of them highlighted. */
export interface ChannelsCover {
  kind: "channels";
  /** Up to 8 tiles, labels up to 14 characters. */
  items: readonly { label: string; icon: CoverIcon; highlight?: boolean }[];
  caption: string;
}

/** A call's compliance record. */
export interface RecordCover {
  kind: "record";
  title: string;
  /** Pill at the card's top right: up to 10 characters. */
  badge: string;
  /** Up to 4 rows, labels up to 22 characters. A "wave" row shows a
   * recording waveform instead of a tick. */
  rows: readonly { label: string; icon: CoverIcon; status: "check" | "wave" }[];
}

/** Numbered steps on a line, with an optional pill underneath. */
export interface StepsCover {
  kind: "steps";
  /** 3 to 5 steps. Labels up to 14 characters with 5 steps, 20 with 3.
   * Subs (3 steps only) up to 26 characters. */
  steps: readonly { label: string; icon: CoverIcon; sub?: string }[];
  badge?: { label: string; icon: CoverIcon };
}

/** A hub with the verticals around it. */
export interface NetworkCover {
  kind: "network";
  /** Inside the hub: up to 10 characters. */
  center: string;
  centerIcon: CoverIcon;
  /** Up to 9 nodes, up to 14 characters each. The first `split` are legal
   * (blue dot), the rest insurance (green dot). */
  nodes: readonly string[];
  split: number;
}

/** Callers filtered by each check in turn; failures are not billed. */
export interface FunnelCover {
  kind: "funnel";
  /** 4 or 5 checks, up to 20 characters each. */
  checks: readonly string[];
  /** The pill under the funnel: up to 26 characters. */
  result: string;
  /** The chip beside the funnel for callers who fail: up to 12 characters. */
  rejected: string;
}

export type CoverScene =
  | TransferCover
  | CompareCover
  | LadderCover
  | ChecklistCover
  | ChannelsCover
  | RecordCover
  | StepsCover
  | NetworkCover
  | FunnelCover;

export interface PostCoverSpec {
  /** Small caps label at the top left: up to 30 characters. */
  label: string;
  scene: CoverScene;
}
