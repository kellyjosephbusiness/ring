import type { Metadata } from "next";
import { ClipboardList, Megaphone, MessageSquareText, PhoneForwarded } from "lucide-react";

import { CallSources } from "@/components/sites/ringondemand/call-sources/call-sources";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { INSURANCE_CTA } from "@/components/sites/ringondemand/insurance/insurance-cta";
import {
  INSURANCE_LINES,
  STEP_DELIVER,
  STEP_SCREEN,
  insuranceLineHref,
} from "@/components/sites/ringondemand/insurance/insurance-lines";
import { BOOK_CALL_URL } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { LinkGrid } from "@/components/sites/ringondemand/page-kit/link-grid";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { PROOF } from "@/components/sites/ringondemand/shared/proof-list";

const title = "Inbound Calls and Live Transfers for Insurance Agencies | RingOnDemand";
const description =
  "You give us your criteria. We run the ads, screen every caller, and send the ones who qualify to your licensed agents as inbound calls or live transfers: final expense, auto, home and Medicare.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/insurance" },
  openGraph: { type: "website", title, description },
  twitter: { card: "summary", title, description },
};

export default function InsurancePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Insurance"
        headline={["Inbound Calls and Live Transfers", "for Insurance Agencies"]}
        sub="You give us your criteria. We run the ads, screen every caller, and send the ones who qualify to your licensed agents as inbound calls or live transfers. Pick your line to see what we check."
        proof={[PROOF.liveTransfers, PROOF.trustedInsurance]}
      />
      <Divider />
      <LinkGrid
        heading={{
          id: "insurance-lines-heading",
          eyebrow: "Lines of insurance",
          heading: { lead: "Pick your", accent: "line of insurance" },
          sub: "The same process for every line: your criteria in our intake script, our ads, and an inbound call or live transfer to your agents when a caller qualifies.",
        }}
        items={[
          ...INSURANCE_LINES.map((line) => ({
            href: insuranceLineHref(line),
            icon: line.icon,
            title: line.name,
            body: line.summary,
          })),
          {
            href: BOOK_CALL_URL,
            icon: MessageSquareText,
            title: "Another line of insurance?",
            body: "Tell us who your agents want to talk to and we will tell you what we can deliver.",
            more: "Book a call",
            muted: true,
          },
        ]}
      />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "How it works" } }}
        items={[
          {
            icon: ClipboardList,
            title: "You set the criteria",
            body: "The callers your agents want, by line, state and the questions you ask. We write your criteria into the intake script.",
          },
          { icon: Megaphone, ...STEP_SCREEN },
          { icon: PhoneForwarded, ...STEP_DELIVER },
        ]}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      />
      <CallSources />
      <FinalCta {...INSURANCE_CTA} />
    </PageShell>
  );
}
