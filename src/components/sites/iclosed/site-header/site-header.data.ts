import { sourceUrl } from "../links";

export type TileIcon = "calendar" | "chat" | "barChart" | "credit" | "lineChart";

export interface NavTile {
  title: string;
  description: string;
  href: string;
  icon: TileIcon;
  newTab?: boolean;
  /** Fixed tile height in the phone accordion (the source sizes these by hand). */
  mobileHeight: number;
  /** The source collapses this tile to a 1px row in the phone accordion. */
  mobileCollapsed?: boolean;
}

export interface NavVideo {
  title: string;
  description: string;
  href: string;
  newTab?: boolean;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

export interface NavMenu {
  id: "product" | "resources";
  label: string;
  /** Desktop panel width; the source ships 940px for Product and 939px for Resources. */
  width: number;
  tiles: NavTile[];
  video: NavVideo;
}

const IMG = "/sites/iclosed/images";

export const ANNOUNCEMENT = {
  label: "Unified Inbox is now live",
  href: sourceUrl("./product/unified-inbox"),
};

export const LOGO_SRC = `${IMG}/2612750bf6f6.avif`;

export const PRODUCT_MENU: NavMenu = {
  id: "product",
  label: "Product",
  width: 940,
  tiles: [
    {
      title: "AI Scheduler",
      description: "Get more out of your funnel by capturing, qualifying, and routing leads instantly.",
      href: sourceUrl("./product/ai-scheduler"),
      icon: "calendar",
      mobileHeight: 160,
    },
    {
      title: "Unified Inbox",
      description: "Bring every conversation together in one shared inbox.",
      href: sourceUrl("./product/unified-inbox"),
      icon: "chat",
      mobileHeight: 160,
    },
    {
      title: "Analytics",
      description: "Outperform competitors with first sales tracking built for high ticket sales team.",
      href: sourceUrl("./product/analytics"),
      icon: "barChart",
      mobileHeight: 180,
    },
    {
      title: "Credit Score",
      description: "Filter & prioritize leads using real-time credit insights from your scheduler.",
      href: sourceUrl("./product/credit-score"),
      icon: "credit",
      mobileHeight: 160,
    },
  ],
  video: {
    title: "The Sales Engine Behind The Fastest-Growing Teams",
    description:
      "Watch the replay of Ismael, CEO of iClosed, live on stage as he revealed the hidden leaks costing teams millions — and the 3 levers that turn any high-ticket funnel into a scaling machine",
    href: sourceUrl("./results"),
    image: `${IMG}/nav-product-sales-engine-thumb.webp`,
    imageWidth: 1024,
    imageHeight: 573,
  },
};

export const RESOURCES_MENU: NavMenu = {
  id: "resources",
  label: "Resources",
  width: 939,
  tiles: [
    {
      title: "Documentation",
      description:
        "From getting started to advanced setups. Everything you need to use iClosed to its full potential.",
      href: "https://docs.iclosed.io",
      icon: "lineChart",
      newTab: true,
      mobileHeight: 200,
    },
    {
      title: "University",
      description:
        "Get direct access to advanced strategies, frameworks, and systems for building lead generation funnels.",
      href: "https://university.iclosed.io",
      icon: "barChart",
      newTab: true,
      mobileHeight: 32,
      mobileCollapsed: true,
    },
    {
      title: "Developers",
      description: "Build with the iClosed API and developer tools.",
      href: sourceUrl("./product/api"),
      icon: "lineChart",
      mobileHeight: 160,
    },
  ],
  video: {
    title: "The iClosed Revenue Engine",
    description:
      "The flagship masterclass where the founder walks through the complete strategic philosophy behind iClosed, why it exists, what problems it solves, and how to think about lead generation systems at a fundamental level.",
    href: "https://university.iclosed.io/courses/1SuchdoDHlVERiHhgTGAdO",
    newTab: true,
    image: `${IMG}/nav-resources-revenue-engine-thumb.webp`,
    imageWidth: 1024,
    imageHeight: 574,
  },
};

export const MENUS = [PRODUCT_MENU, RESOURCES_MENU] as const;

export const NAV_LINKS = {
  results: { label: "Results", href: sourceUrl("./results") },
  pricing: { label: "Pricing", href: sourceUrl("./pricing") },
  mcp: { label: "MCP", href: sourceUrl("./mcp") },
} as const;
