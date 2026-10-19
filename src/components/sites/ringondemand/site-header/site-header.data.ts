import { ANCHORS } from "../links";

export interface NavLink {
  label: string;
  href: string;
}

/** The four in-page links, in the order the copy lists them. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Live Transfers", href: ANCHORS.liveTransfers },
  { label: "Pre-Signed Cases", href: ANCHORS.preSignedCases },
  { label: "Pricing", href: ANCHORS.pricing },
  { label: "Results", href: ANCHORS.results },
];

export const BOOK_CALL_LABEL = "Book a call";
