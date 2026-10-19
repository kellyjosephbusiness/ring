/**
 * The legal practice areas, one page each under /legal/<slug>.
 *
 * DRAFT COPY: everything here except the MVA facts (which come from
 * docs/research/ringondemand/website-copy.md) was drafted for review — see
 * docs/research/ringondemand/pages-copy-draft.md. Only MVA shows prices.
 */
import { Car, HandCoins, HardHat, Stethoscope, Wrench, type LucideIcon } from "lucide-react";

export interface Step {
  title: string;
  body: string;
}

export interface Offer {
  /** Anchor id on the page (lets the homepage-style links land on a card). */
  id: string;
  title: string;
  /** Shown only where the copy doc sets a price (MVA). */
  price?: { amount: string; unit: string };
  body: string;
}

export interface PracticeArea {
  slug: string;
  /** Full name, used in headings and the footer. */
  name: string;
  /** Short label for the nav menu. */
  navLabel: string;
  /** One line for the nav menu and the /legal cards. */
  summary: string;
  icon: LucideIcon;
  /** Who buys the calls: law firms, or funding companies. */
  buyer: "firms" | "funders";
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: [string, string];
    sub: string;
  };
  steps: [Step, Step, Step];
  checks: string[];
  offers: Offer[];
}

const STEP_SCREEN: Step = {
  title: "We run the ads and screen every caller",
  body: "Our own ads plus a vetted publisher network. Every caller answers your qualifying questions before anything reaches you.",
};

const STEP_DELIVER: Step = {
  title: "You get the transfer or the signed retainer",
  body: "Live transfers go to your intake line during the hours you set. Pre-signed cases come to you with the completed intake and the signed retainer.",
};

const ANYTHING_ELSE = "Anything else you add to the script.";

const LIVE_TRANSFERS: Offer = {
  id: "live-transfers",
  title: "Live transfers",
  body: "Our intake team screens every caller against your criteria and transfers them to your phone while they are still on the line.",
};

const PRE_SIGNED: Offer = {
  id: "pre-signed-cases",
  title: "Pre-signed cases",
  body: "We run the ads, do the full intake, and sign the claimant to your retainer. You pay for signed retainers only.",
};

export const PRACTICE_AREAS: readonly PracticeArea[] = [
  {
    slug: "mva",
    name: "Motor Vehicle Accidents",
    navLabel: "Motor Vehicle Accidents",
    summary: "Signed MVA cases and live transfers for personal injury firms.",
    icon: Car,
    buyer: "firms",
    meta: {
      title: "Signed MVA Cases and Live Transfers | RingOnDemand",
      description:
        "You give us your case criteria. We run the ads, screen every caller, and send you a live transfer or a signed retainer. You pay per transfer or per signed case and nothing else.",
    },
    hero: {
      eyebrow: "Legal : Motor vehicle accidents",
      headline: ["MVA Cases", "That Close Like Crazy"],
      sub: "You give us your case criteria. We run the ads, screen every caller, and send you a live transfer or a signed retainer. You pay per transfer or per signed case and nothing else.",
    },
    steps: [
      {
        title: "You set the criteria",
        body: "Accident date window, treatment, fault, insurance, and the states you take cases in. We write your criteria into the intake script.",
      },
      STEP_SCREEN,
      STEP_DELIVER,
    ],
    checks: [
      "The accident happened inside 30 or 90 days. You pick the window.",
      "The caller was not at fault.",
      "The caller already received treatment or already seen a doctor.",
      "The at fault driver has insurance.",
      "The claim is inside the statute of limitations.",
      ANYTHING_ELSE,
    ],
    offers: [
      {
        ...LIVE_TRANSFERS,
        price: { amount: "$550", unit: "per transfer" },
        body: "Our intake team screens every caller against your criteria and transfers them to your phone while they are still on the line. You get a guaranteed cost per signed case. If you do not hit it, we keep sending transfers free until you do.",
      },
      {
        ...PRE_SIGNED,
        price: { amount: "$2,500", unit: "per signed case" },
        body: "We run the ads, do the full intake, and sign the claimant to your retainer. You pay for signed retainers only. If a case falls out inside 28 days, we replace it.",
      },
    ],
  },
  {
    slug: "workers-comp",
    name: "Workers' Compensation",
    navLabel: "Workers' Comp",
    summary: "Calls from injured workers, screened to your case criteria.",
    icon: HardHat,
    buyer: "firms",
    meta: {
      title: "Workers' Comp Live Transfers and Signed Cases | RingOnDemand",
      description:
        "You give us your case criteria. We run the ads, screen every injured worker who calls, and send you a live transfer or a signed retainer.",
    },
    hero: {
      eyebrow: "Legal : Workers' compensation",
      headline: ["Workers' Comp Cases", "That Close Like Crazy"],
      sub: "You give us your case criteria. We run the ads, screen every injured worker who calls, and send you a live transfer or a signed retainer. You pay per transfer or per signed case.",
    },
    steps: [
      {
        title: "You set the criteria",
        body: "Where and when the injury happened, whether it was reported, treatment, and the states you take cases in. We write your criteria into the intake script.",
      },
      STEP_SCREEN,
      STEP_DELIVER,
    ],
    checks: [
      "The caller was hurt on the job.",
      "The caller is an employee, not an independent contractor.",
      "The injury was reported to the employer inside the window you pick.",
      "The caller has already seen a doctor or received treatment.",
      "The claim is inside the filing deadline for your state.",
      ANYTHING_ELSE,
    ],
    offers: [LIVE_TRANSFERS, PRE_SIGNED],
  },
  {
    slug: "lemon-law",
    name: "Lemon Law",
    navLabel: "Lemon Law",
    summary: "Calls from vehicle owners with repeat defects, screened to your criteria.",
    icon: Wrench,
    buyer: "firms",
    meta: {
      title: "Lemon Law Live Transfers and Signed Cases | RingOnDemand",
      description:
        "You give us your case criteria. We run the ads, screen every vehicle owner who calls, and send you a live transfer or a signed retainer.",
    },
    hero: {
      eyebrow: "Legal : Lemon law",
      headline: ["Lemon Law Cases", "That Close Like Crazy"],
      sub: "You give us your case criteria. We run the ads, screen every vehicle owner who calls, and send you a live transfer or a signed retainer. You pay per transfer or per signed case.",
    },
    steps: [
      {
        title: "You set the criteria",
        body: "Vehicle age and mileage, warranty coverage, repair attempts, and the states you take cases in. We write your criteria into the intake script.",
      },
      STEP_SCREEN,
      STEP_DELIVER,
    ],
    checks: [
      "The vehicle was bought or leased in a state you take cases in.",
      "The defect is covered by the manufacturer's warranty.",
      "The vehicle has been in for repair on the same problem more than once.",
      "The caller has the repair orders.",
      "The vehicle's age and mileage are inside your limits.",
      ANYTHING_ELSE,
    ],
    offers: [LIVE_TRANSFERS, PRE_SIGNED],
  },
  {
    slug: "medical-malpractice",
    name: "Medical Malpractice",
    navLabel: "Medical Malpractice",
    summary: "Calls screened for the injury, the provider and the timing you take.",
    icon: Stethoscope,
    buyer: "firms",
    meta: {
      title: "Medical Malpractice Live Transfers and Signed Cases | RingOnDemand",
      description:
        "You give us your case criteria. We run the ads, screen every caller, and send you a live transfer or a signed retainer.",
    },
    hero: {
      eyebrow: "Legal : Medical malpractice",
      headline: ["Medical Malpractice Cases", "That Close Like Crazy"],
      sub: "You give us your case criteria. We run the ads, screen every caller, and send you a live transfer or a signed retainer. You pay per transfer or per signed case.",
    },
    steps: [
      {
        title: "You set the criteria",
        body: "Type of injury, type of provider, when the treatment happened, and the states you take cases in. We write your criteria into the intake script.",
      },
      STEP_SCREEN,
      STEP_DELIVER,
    ],
    checks: [
      "The caller or a family member was harmed during medical care.",
      "The injury is one of the types you take.",
      "The treatment happened inside the window you pick.",
      "The caller can name the provider and the facility.",
      "The claim is inside the statute of limitations.",
      ANYTHING_ELSE,
    ],
    offers: [LIVE_TRANSFERS, PRE_SIGNED],
  },
  {
    slug: "pre-settlement-funding",
    name: "Pre-Settlement Funding",
    navLabel: "Pre-Settlement Funding",
    summary: "Live transfers of plaintiffs with pending cases, for funding companies.",
    icon: HandCoins,
    buyer: "funders",
    meta: {
      title: "Pre-Settlement Funding Live Transfers | RingOnDemand",
      description:
        "You give us your funding criteria. We run the ads, screen every caller, and transfer the ones who qualify to your team while they are still on the line.",
    },
    hero: {
      eyebrow: "Legal : Pre-settlement funding",
      headline: ["Pre-Settlement Funding Calls", "That Convert Like Crazy"],
      sub: "You give us your funding criteria. We run the ads, screen every caller, and transfer the ones who qualify to your team while they are still on the line. You pay per transfer.",
    },
    steps: [
      {
        title: "You set the criteria",
        body: "Case type, attorney representation, where the case stands, and the states you fund in. We write your criteria into the intake script.",
      },
      STEP_SCREEN,
      {
        title: "You get the live transfer",
        body: "Callers who pass your questions go to your line during the hours you set.",
      },
    ],
    checks: [
      "The caller has a pending personal injury case.",
      "The caller is represented by an attorney.",
      "The case type is one you fund.",
      "The caller lives in a state you fund in.",
      "The caller agrees to let you contact their attorney.",
      ANYTHING_ELSE,
    ],
    offers: [LIVE_TRANSFERS],
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((area) => area.slug === slug);
}

export function practiceAreaHref(area: Pick<PracticeArea, "slug">): string {
  return `/legal/${area.slug}`;
}
