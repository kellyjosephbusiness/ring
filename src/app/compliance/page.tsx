import { Ban, BadgeCheck, HeartPulse, Lock, Megaphone, PhoneOff, Scale, ShieldCheck } from "lucide-react";

import { Faq } from "@/components/sites/ringondemand/faq/faq";
import { COMPLIANCE_FAQ } from "@/components/sites/ringondemand/faq/faq-content";
import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { BOOK_CALL_URL, ROUTES } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { FeatureColumns } from "@/components/sites/ringondemand/page-kit/feature-columns";
import { FeatureRow } from "@/components/sites/ringondemand/page-kit/feature-row";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { CriteriaCard } from "@/components/sites/ringondemand/page-kit/visuals";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { JsonLd } from "@/components/sites/ringondemand/seo/json-ld";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { breadcrumbList } from "@/components/sites/ringondemand/seo/schema";

export const metadata = pageMetadata({
  title: "Compliance: Consent, Call Recording and Publisher Controls | RingOnDemand",
  description:
    "How RingOnDemand handles consent, call recording, consent certificates, Do Not Call scrubbing, publisher vetting, California legal advertising and CMS rules for Medicare calls.",
  path: ROUTES.compliance,
});

/** What every transfer carries, for the record card. */
const CALL_RECORD = [
  "The caller agreed to be connected.",
  "A third-party consent certificate was captured.",
  "The call was recorded, and the recording is yours on request.",
  "The caller's intake answers are posted with the transfer.",
];

/** Compliance: the controls on every call, on the publisher network, and the
 * industry rules RingOnDemand works under. DRAFT COPY from practices
 * RingOnDemand confirmed — see docs/research/ringondemand/pages-copy-draft.md. */
export default function CompliancePage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbList([{ name: "Compliance", path: ROUTES.compliance }])} />
      <PageHero
        eyebrow="Compliance"
        headline={["Compliance Built Into", "Every Call"]}
        sub="Large buyers ask how every caller reached us and what they agreed to. Here is how we record, screen and deliver calls, the controls on our publisher network, and the rules we follow."
      />
      <Divider />
      <FeatureRow
        eyebrow="Every call"
        heading={{ lead: "Every call,", accent: "on the record" }}
        body={
          <>
            <p>
              Every caller agrees to be connected before we transfer them to your team. Every intake
              call is recorded, and you can get the recording of any call we send you.
            </p>
            <p>
              We capture third-party consent certificates, so there is an independent record of how
              and when consent was given, and every transfer is posted to you with the caller&apos;s
              intake answers.
            </p>
          </>
        }
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
        visual={<CriteriaCard title="Call record" label="Every transfer" checks={CALL_RECORD} />}
      />
      <Divider />
      <FeatureColumns
        heading={{
          eyebrow: "Publisher network",
          heading: { lead: "Controls on", accent: "every publisher" },
          sub: "Calls from our publisher network meet the same standard as calls from our own ads.",
        }}
        layout="grid"
        items={[
          {
            icon: ShieldCheck,
            title: "Vetted before calls go live",
            body: "Every publisher in our network is vetted before their first call, and every caller goes through the same intake script as callers from our own ads.",
          },
          {
            icon: Megaphone,
            title: "Ads approved before they run",
            body: "Every publisher's ads and creatives are approved before they run.",
          },
          {
            icon: Ban,
            title: "Banned traffic",
            body: "No robocalls, no incentivized traffic and no misleading ads.",
          },
          {
            icon: BadgeCheck,
            title: "Audits and removal",
            body: "We audit sources and can remove a publisher at any time.",
          },
        ]}
      />
      <Divider />
      <FeatureColumns
        heading={{
          eyebrow: "Rules we follow",
          heading: { lead: "Built for", accent: "regulated industries" },
        }}
        layout="grid"
        items={[
          {
            icon: PhoneOff,
            title: "Do Not Call",
            body: "Numbers are scrubbed against the National Do Not Call Registry before we call or text them.",
          },
          {
            icon: Scale,
            title: "Legal advertising",
            body: "In California, ads run under your firm's name and you approve every creative before it runs. Discovery calls are with a licensed attorney on our team.",
          },
          {
            icon: HeartPulse,
            title: "Medicare (CMS)",
            body: "Medicare calls follow CMS rules for third-party marketing organizations, including the required disclaimer, and recordings are kept for 10 years.",
          },
          {
            icon: Lock,
            title: "Caller data",
            body: "Caller data is encrypted, and only staff who need it can see it. Our Privacy Policy explains what we collect and who we share it with.",
          },
        ]}
        cta={{ label: "Book a call", href: BOOK_CALL_URL }}
      />
      <Faq heading="Compliance questions buyers ask" items={COMPLIANCE_FAQ} />
      <FinalCta {...GENERAL_CTA} />
    </PageShell>
  );
}
