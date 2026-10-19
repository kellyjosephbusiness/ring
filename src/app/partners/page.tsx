import type { Metadata } from "next";
import { ListChecks, Radio, ShieldCheck } from "lucide-react";

import { CallSources } from "@/components/sites/ringondemand/call-sources/call-sources";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { BOOK_CALL_URL } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { FeatureRow } from "@/components/sites/ringondemand/page-kit/feature-row";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { AreaList } from "@/components/sites/ringondemand/page-kit/visuals";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";

const title = "Partners: Call Publishers | RingOnDemand";
const description =
  "We buy legal calls from a vetted publisher network. Every call goes through the same intake script as the calls from our own ads.";

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
        sub="We buy legal calls from a vetted publisher network. Every call you send goes through the same intake script as the calls from our own ads."
        cta={{ label: "Talk to our team", href: BOOK_CALL_URL }}
      />
      <Divider />
      <FeatureColumns
        heading={{ heading: { lead: "How it works", accent: "for publishers" } }}
        items={[
          {
            icon: Radio,
            title: "Tell us about your traffic",
            body: "The practice areas, states and sources you run calls from.",
          },
          {
            icon: ShieldCheck,
            title: "We vet your sources",
            body: "Every publisher in our network is vetted before calls go live.",
          },
          {
            icon: ListChecks,
            title: "Calls run through our intake script",
            body: "Every caller answers the same qualifying questions as the callers from our own ads.",
          },
        ]}
        cta={{ label: "Talk to our team", href: BOOK_CALL_URL }}
      />
      <Divider />
      <FeatureRow
        eyebrow="Practice areas"
        heading={{ lead: "Calls we", accent: "buy" }}
        body={
          <p>
            We take calls in every practice area we run for law firms and funding companies: motor
            vehicle accidents, workers&apos; compensation, lemon law, medical malpractice and
            pre-settlement funding.
          </p>
        }
        cta={{ label: "Talk to our team", href: BOOK_CALL_URL }}
        visual={<AreaList />}
      />
      <CallSources />
      <FinalCta
        heading={{ lead: "Want to send us calls?", accent: "Tell us about your traffic" }}
        body="Book a call with our team. Tell us the practice areas, states and sources you run, and we will tell you where your calls fit."
      />
    </PageShell>
  );
}
