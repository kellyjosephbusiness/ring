import { PolicyPage } from "@/components/sites/ringondemand/policies/policy-page";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import PrivacyPolicy from "@/content/legal/privacy-policy.mdx";

export const metadata = pageMetadata({
  title: "Privacy Policy | RingOnDemand",
  description:
    "How Ring On Demand Inc. collects, uses and shares information on ringondemand.com and when someone speaks with our intake team: call recording, consent certificates, Do Not Call scrubbing and your choices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PolicyPage title="Privacy Policy" path="/privacy" updatedAt="2026-10-24" Body={PrivacyPolicy} />;
}
