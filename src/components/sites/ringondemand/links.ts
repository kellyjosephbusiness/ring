/** Destinations shared across the RingOnDemand site. */

/**
 * Every "Book a call" button scrolls to the closing call-to-action section,
 * which every page ends with and which holds the iClosed booking widget.
 */
export const BOOK_CALL_URL = "#book-a-call";

/** Opens the booking page in a new tab if it is ever an external URL. */
export const BOOK_CALL_TARGET = BOOK_CALL_URL.startsWith("http") ? "_blank" : undefined;

/** The iClosed event the inline booking widget shows. */
export const BOOKING_EVENT = {
  url: "https://app.iclosed.io/e/ringondemand1/ring-on-demand-personal-injury-discovery-call",
  title: "Ring On Demand - Personal Injury Discovery Call",
} as const;

/** iClosed's embed script; it turns `.iclosed-widget` boxes into the scheduler. */
export const ICLOSED_WIDGET_SCRIPT = "https://app.iclosed.io/assets/widget.js";

/** Site routes. */
export const ROUTES = {
  home: "/",
  legal: "/legal",
  results: "/results",
  partners: "/partners",
  about: "/about",
} as const;

/** Homepage section anchors, usable from any page. */
export const ANCHORS = {
  liveTransfers: "/#live-transfers",
  preSignedCases: "/#pre-signed-cases",
  howItWorks: "/#how-it-works",
  pricing: "/#pricing",
  faq: "/#faq",
} as const;

/** Pages that do not exist yet; replace with real URLs when they are live. */
export const PENDING_PAGES = {
  contact: "#",
  privacyPolicy: "#",
  termsOfService: "#",
} as const;
