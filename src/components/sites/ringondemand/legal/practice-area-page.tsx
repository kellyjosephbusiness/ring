import { ClipboardList, Megaphone, PhoneForwarded } from "lucide-react";

import { CallSources } from "../call-sources/call-sources";
import { Faq } from "../faq/faq";
import { FinalCta } from "../final-cta/final-cta";
import { BOOK_CALL_URL } from "../links";
import { CtaCards, type CtaCard } from "../page-kit/cta-cards";
import { Divider } from "../page-kit/divider";
import { FeatureColumns } from "../page-kit/feature-columns";
import { FeatureRow } from "../page-kit/feature-row";
import { PageHero } from "../page-kit/page-hero";
import { CriteriaCard } from "../page-kit/visuals";
import { PageShell } from "../page-shell/page-shell";
import { PROOF } from "../shared/proof-list";
import { Pricing } from "../pricing/pricing";
import { Results } from "../results/results";
import { AttorneyCall } from "./attorney-call";
import type { PracticeArea } from "./practice-areas";

const STEP_ICONS = [ClipboardList, Megaphone, PhoneForwarded] as const;

const SCREENING_NOTE =
  "If a caller fails one of your questions, we do not transfer them and you do not pay for them.";

/** Who each offer is for, from the copy doc's "Who this is for" blocks. */
function offerAudience(area: PracticeArea, offer: PracticeArea["offers"][number]): string {
  if (area.buyer === "funders") return "For funding companies";
  return offer.id === "live-transfers"
    ? "For firms with their own intake team"
    : "For firms that want signed cases only";
}

function offerCards(area: PracticeArea): CtaCard[] {
  return area.offers.map((offer, index) => ({
    id: offer.id,
    eyebrow: offerAudience(area, offer),
    title: offer.title,
    price: offer.price,
    body: <p>{offer.body}</p>,
    cta: { label: "Book a call", href: BOOK_CALL_URL },
    tone: index === area.offers.length - 1 ? "blue" : "plain",
  }));
}

/** One legal practice area, laid out on iClosed's analytics page: hero,
 * three steps, the screening checklist, call sources, the offers, the
 * attorney call and the booking band. MVA, the copy doc's page, also carries
 * its results, pricing and FAQ. */
export function PracticeAreaPage({ area }: { area: PracticeArea }) {
  const priced = area.offers.some((offer) => offer.price);
  const isMva = area.slug === "mva";

  return (
    <PageShell>
      <PageHero
        eyebrow={area.hero.eyebrow}
        headline={area.hero.headline}
        sub={area.hero.sub}
        note="The call is with a licensed attorney on our team, not a sales rep."
        proof={[PROOF.signedRetainers, PROOF.legalTransfers]}
      />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "How it works" } }}
        items={area.steps.map((step, index) => ({ ...step, icon: STEP_ICONS[index] }))}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      />
      <Divider />
      <FeatureRow
        eyebrow="Screening"
        heading={{ lead: "What we check before", accent: "a caller reaches you" }}
        body={<p>{SCREENING_NOTE}</p>}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
        visual={<CriteriaCard label={area.navLabel} checks={area.checks} />}
      />
      <CallSources />
      <CtaCards
        heading={{
          eyebrow: "Offers",
          heading:
            area.offers.length > 1
              ? { lead: "2 ways to get", accent: "cases from us" }
              : { lead: "Live transfers", accent: "to your team" },
          sub: priced ? undefined : `Book a call for ${area.name.toLowerCase()} pricing.`,
        }}
        cards={offerCards(area)}
      />
      {isMva ? (
        <>
          <Results />
          <Pricing />
        </>
      ) : null}
      <AttorneyCall />
      {isMva ? <Faq /> : null}
      <FinalCta />
    </PageShell>
  );
}
