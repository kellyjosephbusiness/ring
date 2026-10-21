import { ClipboardList, Megaphone, PhoneForwarded } from "lucide-react";

import { postsOn } from "@/content/blog/posts";

import { RelatedPosts } from "../blog/related-posts";
import { CallSources } from "../call-sources/call-sources";
import { Faq } from "../faq/faq";
import { insuranceLineFaq } from "../faq/faq-content";
import { FinalCta } from "../final-cta/final-cta";
import { BOOK_CALL_URL } from "../links";
import { CtaCards } from "../page-kit/cta-cards";
import { Divider } from "../page-kit/divider";
import { FeatureColumns } from "../page-kit/feature-columns";
import { FeatureRow } from "../page-kit/feature-row";
import { PageHero } from "../page-kit/page-hero";
import { CriteriaCard } from "../page-kit/visuals";
import { PageShell } from "../page-shell/page-shell";
import { JsonLd } from "../seo/json-ld";
import { breadcrumbList, service } from "../seo/schema";
import { PROOF } from "../shared/proof-list";
import { INSURANCE_CTA } from "./insurance-cta";
import { STEP_DELIVER, STEP_SCREEN, insuranceLineHref, type InsuranceLine } from "./insurance-lines";

const SCREENING_NOTE =
  "If a caller fails one of your questions, we do not send them to you and you do not pay for them.";

const INBOUND_CALLS =
  "Callers who match your criteria ring straight through to your agents' line, from our own ads and our vetted publisher network.";

const LIVE_TRANSFERS =
  "Our intake team screens every caller against your criteria and transfers them to your agents while they are still on the line.";

/** One insurance line, on the same page kit as the legal practice areas:
 * hero, three steps, the screening checklist, call sources, the two offers
 * (inbound calls and live transfers), the FAQ, related posts and the booking
 * band. */
export function InsuranceLinePage({ line }: { line: InsuranceLine }) {
  const path = insuranceLineHref(line);
  return (
    <PageShell>
      <JsonLd
        data={service({
          path,
          name: `${line.name} Live Transfers and Inbound Calls`,
          serviceType: "Pay-per-call insurance calls",
          description: line.hero.sub,
          audience: "Insurance agencies with licensed agents",
          offers: [
            { name: "Inbound calls", description: INBOUND_CALLS },
            { name: "Live transfers", description: LIVE_TRANSFERS },
          ],
        })}
      />
      <JsonLd
        data={breadcrumbList([
          { name: "Insurance", path: "/insurance" },
          { name: line.name, path },
        ])}
      />
      <PageHero
        eyebrow={line.hero.eyebrow}
        headline={line.hero.headline}
        sub={line.hero.sub}
        proof={[PROOF.liveTransfers, PROOF.trustedInsurance]}
      />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "How it works" } }}
        items={[
          { icon: ClipboardList, title: "You set the criteria", body: line.criteria },
          { icon: Megaphone, ...STEP_SCREEN },
          { icon: PhoneForwarded, ...STEP_DELIVER },
        ]}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      />
      <Divider />
      <FeatureRow
        eyebrow="Screening"
        heading={{ lead: "What we check before", accent: "a caller reaches you" }}
        body={<p>{SCREENING_NOTE}</p>}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
        visual={<CriteriaCard label={line.navLabel} checks={line.checks} />}
      />
      <CallSources />
      <CtaCards
        heading={{
          eyebrow: "Offers",
          heading: { lead: "2 ways to get", accent: "calls from us" },
          sub: `Book a call for ${line.inSentence} pricing.`,
        }}
        cards={[
          {
            id: "inbound-calls",
            eyebrow: "Straight to your agents",
            title: "Inbound calls",
            body: <p>{INBOUND_CALLS}</p>,
            cta: { label: "Book a call", href: BOOK_CALL_URL },
          },
          {
            id: "live-transfers",
            eyebrow: "Screened by our intake team",
            title: "Live transfers",
            body: <p>{LIVE_TRANSFERS}</p>,
            cta: { label: "Book a call", href: BOOK_CALL_URL },
            tone: "blue",
          },
        ]}
      />
      <Faq heading="Questions agencies ask us" items={insuranceLineFaq(line)} />
      <RelatedPosts posts={postsOn(["insurance"])} />
      <FinalCta {...INSURANCE_CTA} />
    </PageShell>
  );
}
