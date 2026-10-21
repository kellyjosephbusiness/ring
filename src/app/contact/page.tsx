import { Radio, Scale, ShieldCheck } from "lucide-react";

import { FinalCta } from "@/components/sites/ringondemand/final-cta/final-cta";
import { GENERAL_CTA } from "@/components/sites/ringondemand/final-cta/general-cta";
import { BOOKING_EVENTS } from "@/components/sites/ringondemand/links";
import { Divider } from "@/components/sites/ringondemand/page-kit/divider";
import { LinkGrid } from "@/components/sites/ringondemand/page-kit/link-grid";
import { PageHero } from "@/components/sites/ringondemand/page-kit/page-hero";
import { PageShell } from "@/components/sites/ringondemand/page-shell/page-shell";
import { JsonLd } from "@/components/sites/ringondemand/seo/json-ld";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import { ORGANIZATION_ID, breadcrumbList } from "@/components/sites/ringondemand/seo/schema";
import { absoluteUrl } from "@/components/sites/ringondemand/seo/site";
import { TeamGrid } from "@/components/sites/ringondemand/shared/team-grid";

export const metadata = pageMetadata({
  title: "Contact RingOnDemand: Book a Call",
  description:
    "Book a call with RingOnDemand. Law firms and funding companies, insurance agencies and call publishers each have their own call: pick yours and choose a time.",
  path: "/contact",
});

/** Contact: one booking call per audience, the team on LinkedIn, and the
 * general booking band. */
export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          name: "Contact RingOnDemand",
          about: { "@id": ORGANIZATION_ID },
        }}
      />
      <JsonLd data={breadcrumbList([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        headline={["Talk to", "RingOnDemand"]}
        sub="The fastest way to reach us is a short call. Pick the call that fits you and choose a time on the calendar."
      />
      <Divider />
      <LinkGrid
        heading={{
          id: "contact-calls-heading",
          eyebrow: "Book a call",
          heading: { lead: "Pick the call", accent: "that fits you" },
        }}
        items={[
          {
            href: BOOKING_EVENTS.discovery.url,
            icon: Scale,
            title: "Law firms and funding companies",
            body: "Talk to a licensed attorney on our team about live transfers and signed cases.",
            more: "Book this call",
          },
          {
            href: BOOKING_EVENTS.partner.url,
            icon: ShieldCheck,
            title: "Insurance agencies and other buyers",
            body: "We show you the ads and the intake questions, and you decide.",
            more: "Book this call",
          },
          {
            href: BOOKING_EVENTS.publisher.url,
            icon: Radio,
            title: "Call publishers",
            body: "Agree on verticals, states and payouts, then start sending calls.",
            more: "Book this call",
          },
        ]}
      />
      <Divider />
      <TeamGrid id="contact-team-heading" />
      <FinalCta {...GENERAL_CTA} />
    </PageShell>
  );
}
