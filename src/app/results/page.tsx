import type { Metadata } from "next";

import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GettingStarted } from "@/components/sites/ringondemand/getting-started/getting-started";
import { ANCHORS, BOOK_CALL_URL } from "@/components/sites/ringondemand/links";
import { CtaCards } from "@/components/sites/ringondemand/page-kit/cta-cards";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { Reporting } from "@/components/sites/ringondemand/reporting/reporting";
import { Results } from "@/components/sites/ringondemand/results/results";

const title = "Results | RingOnDemand";
const description =
  "Over 1,500 signed retainers delivered last quarter. 25 to 35% of live transfers signed, higher in California. 24 hours from signed order to first transfer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/results" },
  openGraph: { type: "website", title, description },
  twitter: { card: "summary", title, description },
};

export default function ResultsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Results"
        headline={["Signed Retainers, Sign Rates", "and Speed to First Transfer"]}
        sub="What personal injury firms see when they work with us, and how you see every transfer we send."
      />
      <Divider />
      <Results />
      <Reporting />
      <GettingStarted />
      <CtaCards
        cards={[
          {
            eyebrow: "Pricing",
            title: "Flat prices for MVA",
            body: (
              <p>
                <strong>Live transfers at $550 per transfer.</strong> Pre-signed cases at $2,500 per
                signed case. You pay per transfer or per signed case and nothing else.
              </p>
            ),
            cta: { label: "See pricing", href: ANCHORS.pricing },
          },
          {
            eyebrow: "Book a call",
            title: "See the ads and the intake script",
            body: (
              <p>
                On the call you will see <strong>our ads, our landing pages, our intake questions</strong>, and
                the names of firms we work with.
              </p>
            ),
            cta: { label: "Book a call", href: BOOK_CALL_URL },
            aside: "With a licensed attorney on our team",
            tone: "blue",
          },
        ]}
      />
      <FinalCta />
    </PageShell>
  );
}
