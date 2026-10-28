import { PolicyPage } from "@/components/sites/ringondemand/policies/policy-page";
import { pageMetadata } from "@/components/sites/ringondemand/seo/page-metadata";
import TermsOfService from "@/content/legal/terms-of-service.mdx";

export const metadata = pageMetadata({
  title: "Terms of Service | RingOnDemand",
  description: "The terms that govern your use of ringondemand.com, operated by Ring On Demand Inc.",
  path: "/terms",
});

export default function TermsPage() {
  return <PolicyPage title="Terms of Service" path="/terms" updatedAt="2026-10-28" Body={TermsOfService} />;
}
