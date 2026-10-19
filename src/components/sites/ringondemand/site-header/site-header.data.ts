import { Scale, type LucideIcon } from "lucide-react";

import { PRACTICE_AREAS, practiceAreaHref } from "../legal/practice-areas";
import { ANCHORS, ROUTES } from "../links";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavTile extends NavLink {
  description: string;
  icon: LucideIcon;
}

/** The "Legal" menu: one tile per practice area, then the index page. */
export const LEGAL_MENU = {
  label: "Legal",
  tiles: [
    ...PRACTICE_AREAS.map(
      (area): NavTile => ({
        label: area.navLabel,
        href: practiceAreaHref(area),
        description: area.summary,
        icon: area.icon,
      }),
    ),
    {
      label: "All practice areas",
      href: ROUTES.legal,
      description: "How it works across every area we run calls in.",
      icon: Scale,
    },
  ] satisfies NavTile[],
} as const;

/** Plain links after the menu. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Pricing", href: ANCHORS.pricing },
  { label: "Results", href: ROUTES.results },
  { label: "Partners", href: ROUTES.partners },
  { label: "About", href: ROUTES.about },
];

export const BOOK_CALL_LABEL = "Book a call";
