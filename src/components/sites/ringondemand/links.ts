/** Destinations shared across the RingOnDemand site. */

/**
 * Every "Book a call" button scrolls to the closing call-to-action section,
 * which every page ends with and which holds the iClosed booking widget.
 */
export const BOOK_CALL_URL = "#book-a-call";

/** Opens the booking page in a new tab if it is ever an external URL. */
export const BOOK_CALL_TARGET = BOOK_CALL_URL.startsWith("http") ? "_blank" : undefined;

export interface BookingEvent {
  url: string;
  title: string;
}

/** The iClosed events the inline booking widget can show. */
export const BOOKING_EVENTS = {
  /** Law firms, on the legal pages. */
  discovery: {
    url: "https://app.iclosed.io/e/ringondemand1/ring-on-demand-personal-injury-discovery-call",
    title: "Ring On Demand - Personal Injury Discovery Call",
  },
  /** Everyone else: the homepage, Results, About and the insurance pages. */
  partner: {
    url: "https://app.iclosed.io/e/ringondemand1/ring-on-demand-broker-partner-discovery-call",
    title: "Ring On Demand - Partner Discovery Call",
  },
  /** Call publishers, on /partners. */
  publisher: {
    url: "https://app.iclosed.io/e/ringondemand1/publisher-intro-call",
    title: "Publisher Intro Call",
  },
} as const satisfies Record<string, BookingEvent>;

/** iClosed's embed script; it turns `.iclosed-widget` boxes into the scheduler. */
export const ICLOSED_WIDGET_SCRIPT = "https://app.iclosed.io/assets/widget.js";

/** Site routes. */
export const ROUTES = {
  home: "/",
  legal: "/legal",
  insurance: "/insurance",
  results: "/results",
  partners: "/partners",
  about: "/about",
} as const;

/** Pages that do not exist yet; replace with real URLs when they are live. */
export const PENDING_PAGES = {
  contact: "#",
  privacyPolicy: "#",
  termsOfService: "#",
} as const;
