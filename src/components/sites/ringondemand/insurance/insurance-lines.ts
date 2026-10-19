/**
 * The insurance lines, one page each under /insurance/<slug>.
 *
 * DRAFT COPY for review — see docs/research/ringondemand/pages-copy-draft.md.
 * No prices, stats, quotes or guarantees; insurance buyers get inbound calls
 * and live transfers.
 */
import { CarFront, HeartHandshake, HeartPulse, House, type LucideIcon } from "lucide-react";

import type { Step } from "../legal/practice-areas";

export interface InsuranceLine {
  slug: string;
  /** Full name, used in headings and the footer. */
  name: string;
  /** Short label for the nav menu. */
  navLabel: string;
  /** The name mid-sentence ("Book a call for … pricing"). */
  inSentence: string;
  /** One line for the nav menu and the /insurance cards. */
  summary: string;
  icon: LucideIcon;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: [string, string];
    sub: string;
  };
  /** Step 1's body: the criteria this line's buyers usually set. */
  criteria: string;
  checks: string[];
}

const ANYTHING_ELSE = "Anything else you add to the script.";

export const STEP_SCREEN: Step = {
  title: "We run the ads and screen every caller",
  body: "Our own ads plus a vetted publisher network. Every caller answers your qualifying questions before anything reaches you.",
};

export const STEP_DELIVER: Step = {
  title: "Your agents get the call",
  body: "Inbound calls and live transfers go to your agents' line during the hours you set.",
};

export const INSURANCE_LINES: readonly InsuranceLine[] = [
  {
    slug: "final-expense",
    name: "Final Expense",
    navLabel: "Final Expense",
    inSentence: "final expense",
    summary: "Callers shopping for final expense coverage, sent to your agents.",
    icon: HeartHandshake,
    meta: {
      title: "Final Expense Inbound Calls and Live Transfers | RingOnDemand",
      description:
        "You give us your criteria. We run the ads, screen every caller, and send the ones who qualify to your licensed agents as inbound calls or live transfers.",
    },
    hero: {
      eyebrow: "Insurance : Final expense",
      headline: ["Final Expense Calls", "That Convert Like Crazy"],
      sub: "You give us your criteria. We run the ads, screen every caller, and send the ones who qualify to your licensed agents as inbound calls or live transfers. You pay per call.",
    },
    criteria:
      "Age range, coverage amount, how the caller will pay premiums, and the states your agents are licensed in. We write your criteria into the intake script.",
    checks: [
      "The caller is inside the age range you write.",
      "The caller lives in a state your agents are licensed in.",
      "The coverage amount they want is one you offer.",
      "The caller has a way to pay premiums, such as a bank account or card.",
      ANYTHING_ELSE,
    ],
  },
  {
    slug: "auto",
    name: "Auto Insurance",
    navLabel: "Auto Insurance",
    inSentence: "auto insurance",
    summary: "Drivers looking for a quote, screened by state, vehicle and coverage.",
    icon: CarFront,
    meta: {
      title: "Auto Insurance Inbound Calls and Live Transfers | RingOnDemand",
      description:
        "You give us your criteria. We run the ads, screen every driver who calls, and send the ones who qualify to your licensed agents as inbound calls or live transfers.",
    },
    hero: {
      eyebrow: "Insurance : Auto",
      headline: ["Auto Insurance Calls", "That Convert Like Crazy"],
      sub: "You give us your criteria. We run the ads, screen every driver who calls, and send the ones who qualify to your licensed agents as inbound calls or live transfers. You pay per call.",
    },
    criteria:
      "States and ZIP codes, vehicles and drivers, current coverage, and driving history. We write your criteria into the intake script.",
    checks: [
      "The caller lives in a state or ZIP code you write.",
      "The caller has a valid driver's license.",
      "The number of vehicles and drivers is inside your limits.",
      "The caller is currently insured, or not, as you choose.",
      "The driving history fits the rules you set.",
      ANYTHING_ELSE,
    ],
  },
  {
    slug: "home",
    name: "Home Insurance",
    navLabel: "Home Insurance",
    inSentence: "home insurance",
    summary: "Homeowners looking for coverage, screened by property and location.",
    icon: House,
    meta: {
      title: "Home Insurance Inbound Calls and Live Transfers | RingOnDemand",
      description:
        "You give us your criteria. We run the ads, screen every homeowner who calls, and send the ones who qualify to your licensed agents as inbound calls or live transfers.",
    },
    hero: {
      eyebrow: "Insurance : Home",
      headline: ["Home Insurance Calls", "That Convert Like Crazy"],
      sub: "You give us your criteria. We run the ads, screen every homeowner who calls, and send the ones who qualify to your licensed agents as inbound calls or live transfers. You pay per call.",
    },
    criteria:
      "Property type, ownership, location, and when the caller needs coverage. We write your criteria into the intake script.",
    checks: [
      "The caller owns the home.",
      "The property is in a state or ZIP code you write.",
      "The property type is one you cover.",
      "The caller needs coverage inside the window you pick.",
      ANYTHING_ELSE,
    ],
  },
  {
    slug: "medicare",
    name: "Medicare",
    navLabel: "Medicare",
    inSentence: "Medicare",
    summary: "Medicare-eligible callers, screened by eligibility and location.",
    icon: HeartPulse,
    meta: {
      title: "Medicare Inbound Calls and Live Transfers | RingOnDemand",
      description:
        "You give us your criteria. We run the ads, screen every caller, and send the ones who qualify to your licensed agents as inbound calls or live transfers.",
    },
    hero: {
      eyebrow: "Insurance : Medicare",
      headline: ["Medicare Calls", "That Convert Like Crazy"],
      sub: "You give us your criteria. We run the ads, screen every caller, and send the ones who qualify to your licensed agents as inbound calls or live transfers. You pay per call.",
    },
    criteria:
      "Eligibility, the plans your agents offer, the counties and states you cover, and the enrollment periods you work. We write your criteria into the intake script.",
    checks: [
      "The caller is eligible for Medicare.",
      "The caller lives in a county where your plans are offered.",
      "The caller is calling during an enrollment period you work.",
      "The caller wants to talk to a licensed agent now.",
      ANYTHING_ELSE,
    ],
  },
];

export function getInsuranceLine(slug: string): InsuranceLine | undefined {
  return INSURANCE_LINES.find((line) => line.slug === slug);
}

export function insuranceLineHref(line: Pick<InsuranceLine, "slug">): string {
  return `/insurance/${line.slug}`;
}
