import { Eye, MapPin, Megaphone, PhoneCall, PhoneForwarded, Repeat, ShieldCheck } from "lucide-react";

import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { AttorneyCall } from "@/components/sites/ringondemand/legal/attorney-call";
import { BOOK_CALL_URL } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { JsonLd } from "@/components/sites/ringondemand/seo/json-ld";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { breadcrumbList } from "@/components/sites/ringondemand/seo/schema";
import { TeamGrid } from "@/components/sites/ringondemand/shared/team-grid";

export const metadata = pageMetadata({
  title: "About RingOnDemand: Pay-Per-Call for Legal and Insurance",
  description:
    "RingOnDemand runs the ads, screens every caller against your criteria, and delivers inbound calls and live transfers to insurance agencies, and live transfers and signed retainers to law firms.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbList([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About"
        headline={["We Run the Ads and", "Screen Every Caller"]}
        sub="RingOnDemand delivers inbound calls and live transfers to insurance agencies, and live transfers and signed retainers to law firms. You give us your criteria. We run the ads, screen every caller, and send you only the ones who pass."
      />
      <Divider />
      <FeatureColumns
        heading={{ eyebrow: "What we do", heading: { lead: "From the ad", accent: "to your intake line" } }}
        items={[
          {
            icon: Megaphone,
            title: "We run the ads",
            body: "Our own ads plus a vetted publisher network. In California, ads run under your firm's name and you approve every creative before it runs.",
          },
          {
            icon: ShieldCheck,
            title: "We screen every caller",
            body: "Every caller answers your qualifying questions before anything reaches you.",
          },
          {
            icon: PhoneForwarded,
            title: "We deliver the case",
            body: "Live transfers go to your intake line during the hours you set. Pre-signed cases come to you with the completed intake and the signed retainer.",
          },
        ]}
      />
      <Divider />
      <FeatureColumns
        heading={{ eyebrow: "How we work", heading: { lead: "How we work", accent: "with firms" } }}
        layout="grid"
        items={[
          {
            icon: PhoneCall,
            title: "Calls, not form leads",
            body: "Calls and live transfers convert better in legal, so that is all we sell.",
          },
          {
            icon: Repeat,
            title: "No volume commitment",
            body: "You buy an order, we deliver it, and you reorder when you want more.",
          },
          {
            icon: Eye,
            title: "You see every transfer",
            body: "Every transfer is posted to you with the caller's intake answers.",
          },
          {
            icon: MapPin,
            title: "Any U.S. state",
            body: "In California we advertise under your firm's name and you approve every creative first.",
          },
        ]}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      />
      <Divider />
      <TeamGrid id="about-team-heading" />
      <AttorneyCall />
      <FinalCta {...GENERAL_CTA} />
    </PageShell>
  );
}
