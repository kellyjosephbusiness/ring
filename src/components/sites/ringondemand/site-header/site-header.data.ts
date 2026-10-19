import { Scale, ShieldCheck, type LucideIcon } from "lucide-react";

import { INSURANCE_LINES, insuranceLineHref } from "../insurance/insurance-lines";
import { PRACTICE_AREAS, practiceAreaHref } from "../legal/practice-areas";
import { ROUTES } from "../links";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavTile extends NavLink {
  description: string;
  icon: LucideIcon;
}

export interface NavMenu {
  id: "legal" | "insurance";
  label: string;
  tiles: readonly NavTile[];
}

/** The two industry menus: one tile per page, then the industry's index. */
export const MENUS: readonly NavMenu[] = [
  {
    id: "legal",
    label: "Legal",
    tiles: [
      ...PRACTICE_AREAS.map((area) => ({
        label: area.navLabel,
        href: practiceAreaHref(area),
        description: area.summary,
        icon: area.icon,
      })),
      {
        label: "All practice areas",
        href: ROUTES.legal,
        description: "How it works across every area we run calls in.",
        icon: Scale,
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    tiles: [
      ...INSURANCE_LINES.map((line) => ({
        label: line.navLabel,
        href: insuranceLineHref(line),
        description: line.summary,
        icon: line.icon,
      })),
      {
        label: "All insurance lines",
        href: ROUTES.insurance,
        description: "How it works across every line we run calls in.",
        icon: ShieldCheck,
      },
    ],
  },
];

export type MenuId = NavMenu["id"];

/** Plain links after the menus. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Results", href: ROUTES.results },
  { label: "Partners", href: ROUTES.partners },
  { label: "About", href: ROUTES.about },
];

export const BOOK_CALL_LABEL = "Book a call";
