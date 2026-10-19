/** Destinations shared across the RingOnDemand site. */

/**
 * Every "Book a call" button goes to the iClosed booking page. Until that URL
 * is supplied, the buttons scroll to the closing call-to-action section.
 */
export const BOOK_CALL_URL = "#book-a-call";

/** Opens the booking page in a new tab once it is an external URL. */
export const BOOK_CALL_TARGET = BOOK_CALL_URL.startsWith("http") ? "_blank" : undefined;

/** In-page section anchors used by the header and footer. */
export const ANCHORS = {
  liveTransfers: "#live-transfers",
  preSignedCases: "#pre-signed-cases",
  howItWorks: "#how-it-works",
  results: "#results",
  pricing: "#pricing",
  faq: "#faq",
  bookACall: "#book-a-call",
} as const;

/** Pages that do not exist yet; replace with real URLs when they are live. */
export const PENDING_PAGES = {
  contact: "#",
  publishers: "#",
  privacyPolicy: "#",
  termsOfService: "#",
} as const;

// TEMPORARY: aliases for components not yet rewritten for RingOnDemand.
// Removed once every section uses the exports above.
export const START_FREE_URL = BOOK_CALL_URL;
export const LOGIN_URL = BOOK_CALL_URL;
export function sourceUrl(path: string): string {
  return path;
}
