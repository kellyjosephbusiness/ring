import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { GettingStarted } from "@/components/sites/ringondemand/getting-started/getting-started";
import { ROUTES } from "@/components/sites/ringondemand/links";
import { CtaCards } from "@/components/sites/ringondemand/page-kit/cta-cards";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { Reporting } from "@/components/sites/ringondemand/reporting/reporting";
import { GENERAL_STATS, Results } from "@/components/sites/ringondemand/results/results";
import { JsonLd } from "@/components/sites/ringondemand/seo/json-ld";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { breadcrumbList } from "@/components/sites/ringondemand/seo/schema";
import { PROOF } from "@/components/sites/ringondemand/shared/proof-list";

export const metadata = pageMetadata({
  title: "Results: Signed Retainers and Live Transfers Delivered | RingOnDemand",
  description:
    "Over 2,000 signed retainers and over 5,000 live transfers delivered. Trusted by the largest insurance and legal organizations in the US.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbList([{ name: "Results", path: "/results" }])} />
      <PageHero
        eyebrow="Results"
        headline={["Calls That Convert", "Across Legal and Insurance"]}
        sub="Signed retainers for law firms, inbound calls and live transfers for law firms and insurance agencies, and a record of every call we send."
        proof={[PROOF.signedRetainers, PROOF.liveTransfers, PROOF.trusted]}
      />
      <Divider />
      <Results heading="What our buyers see" stats={GENERAL_STATS} />
      <Reporting />
      <GettingStarted />
      <CtaCards
        heading={{
          eyebrow: "Industries",
          heading: { lead: "See what we deliver", accent: "in your industry" },
        }}
        cards={[
          {
            eyebrow: "Legal",
            title: "Signed retainers and live transfers",
            body: (
              <p>
                <strong>For law firms and funding companies:</strong> motor vehicle accidents,
                workers&apos; comp, lemon law, medical malpractice and pre-settlement funding.
              </p>
            ),
            cta: { label: "See legal", href: ROUTES.legal },
          },
          {
            eyebrow: "Insurance",
            title: "Inbound calls and live transfers",
            body: (
              <p>
                <strong>For insurance agencies:</strong> final expense, auto, home and Medicare.
              </p>
            ),
            cta: { label: "See insurance", href: ROUTES.insurance },
            tone: "blue",
          },
        ]}
      />
      <FinalCta {...GENERAL_CTA} />
    </PageShell>
  );
}
