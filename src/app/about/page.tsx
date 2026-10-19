import type { Metadata } from "next";
import { Eye, MapPin, Megaphone, PhoneCall, PhoneForwarded, Repeat, ShieldCheck } from "lucide-react";

import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { AttorneyCall } from "@/components/sites/ringondemand/legal/attorney-call";
import { BOOK_CALL_URL } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";

const title = "About | RingOnDemand";
const description =
  "RingOnDemand runs the ads, screens every caller against your criteria, and delivers live transfers to law firms and insurance agencies, and signed retainers to law firms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", title, description },
  twitter: { card: "summary", title, description },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        headline={["We Run the Ads and", "Screen Every Caller"]}
        sub="RingOnDemand delivers live transfers to law firms and insurance agencies, and signed retainers to law firms. You give us your criteria. We run the ads, screen every caller, and send you only the ones who pass."
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
      <AttorneyCall />
      <FinalCta />
    </PageShell>
  );
}
