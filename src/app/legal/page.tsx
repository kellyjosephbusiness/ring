import type { Metadata } from "next";
import { ClipboardList, Megaphone, MessageSquareText, PhoneForwarded } from "lucide-react";

import { CallSources } from "@/components/sites/ringondemand/call-sources/call-sources";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { AttorneyCall } from "@/components/sites/ringondemand/legal/attorney-call";
import { PRACTICE_AREAS, practiceAreaHref } from "@/components/sites/ringondemand/legal/practice-areas";
import { BOOK_CALL_URL } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { LinkGrid } from "@/components/sites/ringondemand/page-kit/link-grid";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { PROOF } from "@/components/sites/ringondemand/shared/proof-list";

const title = "Live Transfers and Signed Cases for Law Firms | RingOnDemand";
const description =
  "You give us your case criteria. We run the ads, screen every caller, and send you a live transfer or a signed retainer, in motor vehicle accidents, workers' comp, lemon law, medical malpractice and pre-settlement funding.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/legal" },
  openGraph: { type: "website", title, description },
  twitter: { card: "summary", title, description },
};

export default function LegalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        headline={["Live Transfers and Signed Cases", "for Law Firms"]}
        sub="You give us your case criteria. We run the ads, screen every caller, and send you a live transfer or a signed retainer. Pick your practice area to see what we check."
        note="The call is with a licensed attorney on our team, not a sales rep."
        proof={[PROOF.signedRetainers, PROOF.legalTransfers]}
      />
      <Divider />
      <LinkGrid
        heading={{
          id: "practice-areas-heading",
          eyebrow: "Practice areas",
          heading: { lead: "Pick your", accent: "practice area" },
          sub: "The same process in every area: your criteria in our intake script, our ads, and a live transfer or a signed retainer when a caller qualifies.",
        }}
        items={[
          ...PRACTICE_AREAS.map((area) => ({
            href: practiceAreaHref(area),
            icon: area.icon,
            title: area.name,
            body: area.summary,
          })),
          {
            href: BOOK_CALL_URL,
            icon: MessageSquareText,
            title: "Another practice area?",
            body: "Tell us your case criteria and we will tell you what we can deliver.",
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
            body: "The case types, dates and states you take. We write your criteria into the intake script.",
          },
          {
            icon: Megaphone,
            title: "We run the ads and screen every caller",
            body: "Our own ads plus a vetted publisher network. Every caller answers your qualifying questions before anything reaches you.",
          },
          {
            icon: PhoneForwarded,
            title: "You get the transfer or the signed retainer",
            body: "Live transfers go to your intake line during the hours you set. Pre-signed cases come to you with the completed intake and the signed retainer.",
          },
        ]}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      />
      <CallSources />
      <AttorneyCall />
      <FinalCta />
    </PageShell>
  );
}
