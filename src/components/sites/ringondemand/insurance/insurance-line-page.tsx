import { ClipboardList, Megaphone, PhoneForwarded } from "lucide-react";

import { CallSources } from "../call-sources/call-sources";
import { FinalCta } from "../final-cta/final-cta";
import { BOOK_CALL_URL } from "../links";
import { CtaCards } from "../page-kit/cta-cards";
import { Divider } from "../page-kit/divider";
import { FeatureColumns } from "../page-kit/feature-columns";
import { FeatureRow } from "../page-kit/feature-row";
import { PageHero } from "../page-kit/page-hero";
import { CriteriaCard } from "../page-kit/visuals";
import { PageShell } from "../page-shell/page-shell";
import { INSURANCE_CTA } from "./insurance-cta";
import { STEP_SCREEN, STEP_TRANSFER, type InsuranceLine } from "./insurance-lines";

const SCREENING_NOTE =
  "If a caller fails one of your questions, we do not transfer them and you do not pay for them.";

/** One insurance line, on the same page kit as the legal practice areas:
 * hero, three steps, the screening checklist, call sources, the live
 * transfer offer and the booking band. */
export function InsuranceLinePage({ line }: { line: InsuranceLine }) {
  return (
    <PageShell>
      <PageHero eyebrow={line.hero.eyebrow} headline={line.hero.headline} sub={line.hero.sub} />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "How it works" } }}
        items={[
          { icon: ClipboardList, title: "You set the criteria", body: line.criteria },
          { icon: Megaphone, ...STEP_SCREEN },
          { icon: PhoneForwarded, ...STEP_TRANSFER },
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
          heading: { lead: "Live transfers", accent: "to your agents" },
          sub: `Book a call for ${line.inSentence} pricing.`,
        }}
        cards={[
          {
            id: "live-transfers",
            eyebrow: "For agencies with licensed agents",
            title: "Live transfers",
            body: (
              <p>
                Our intake team screens every caller against your criteria and transfers them to
                your agents while they are still on the line.
              </p>
            ),
            cta: { label: "Book a call", href: BOOK_CALL_URL },
            tone: "blue",
          },
        ]}
      />
      <FinalCta {...INSURANCE_CTA} />
    </PageShell>
  );
}
