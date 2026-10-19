import type { Metadata } from "next";
import {
  BadgeDollarSign,
  Banknote,
  ListChecks,
  Radio,
  Rocket,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { BOOK_CALL_URL, BOOKING_EVENTS } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { FeatureRow } from "@/components/sites/ringondemand/page-kit/feature-row";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { AreaList } from "@/components/sites/ringondemand/page-kit/visuals";
import { INSURANCE_LINES, insuranceLineHref } from "@/components/sites/ringondemand/insurance/insurance-lines";
import { PRACTICE_AREAS, practiceAreaHref } from "@/components/sites/ringondemand/legal/practice-areas";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { PROOF } from "@/components/sites/ringondemand/shared/proof-list";

const title = "Partners: Join Our Publisher Network | RingOnDemand";
const description =
  "Join our vetted publisher network. Strong payouts for legal and insurance calls that qualify, clear criteria for every vertical, and a simple setup.";

const CTA = { label: "Book an intro call", href: BOOK_CALL_URL };

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/partners" },
  openGraph: { type: "website", title, description },
  twitter: { card: "summary", title, description },
};

export default function PartnersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Partners : Call publishers"
        headline={["Join Our Vetted", "Publisher Network"]}
        sub="Send us your legal and insurance calls and get paid well for every one that qualifies. Clear criteria, steady demand, and one short call to get started."
        cta={CTA}
        proof={[PROOF.liveTransfers, PROOF.buyers]}
      />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "Why publishers", accent: "work with us" } }}
        layout="grid"
        items={[
          {
            icon: BadgeDollarSign,
            title: "Strong payouts",
            body: "We pay well for calls that qualify, and you know the payout for each vertical before you send a single call.",
          },
          {
            icon: TrendingUp,
            title: "Steady demand",
            body: "We buy in nine verticals across legal and insurance, for buyers across the US, so there is room for your volume.",
          },
          {
            icon: ListChecks,
            title: "Clear criteria",
            body: "Every vertical has one written intake script. You know what qualifies before a call goes live.",
          },
          {
            icon: Rocket,
            title: "Simple setup",
            body: "One intro call to agree on verticals, states and payouts. Then you start sending calls.",
          },
        ]}
        cta={CTA}
      />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "How it works", accent: "for publishers" } }}
        items={[
          {
            icon: Radio,
            title: "Tell us about your traffic",
            body: "The verticals, states and sources you run calls from.",
          },
          {
            icon: ShieldCheck,
            title: "We vet your sources",
            body: "Every publisher in our network is vetted before calls go live, and you get your payouts up front.",
          },
          {
            icon: Banknote,
            title: "Send calls, get paid",
            body: "Every caller answers the same qualifying questions as the callers from our own ads. You get paid for every call that qualifies.",
          },
        ]}
        cta={CTA}
      />
      <Divider />
      <FeatureRow
        eyebrow="Verticals"
        heading={{ lead: "Calls we", accent: "buy" }}
        body={
          <p>
            We take calls in every vertical we run. In legal: motor vehicle accidents,
            workers&apos; compensation, lemon law, medical malpractice and pre-settlement funding.
            In insurance: final expense, auto, home and Medicare.
          </p>
        }
        cta={CTA}
        visual={
          <AreaList
            label="Verticals"
            items={[
              ...PRACTICE_AREAS.map((area) => ({
                href: practiceAreaHref(area),
                name: area.name,
                icon: area.icon,
              })),
              ...INSURANCE_LINES.map((line) => ({
                href: insuranceLineHref(line),
                name: line.name,
                icon: line.icon,
              })),
            ]}
          />
        }
      />
      <FinalCta
        heading={{ lead: "Ready to send us calls?", accent: "Book a publisher intro call" }}
        body="Tell us the verticals, states and sources you run. We will tell you where your calls fit and what they pay."
        booking={BOOKING_EVENTS.publisher}
      />
    </PageShell>
  );
}
