import { INSURANCE_LINES, getInsuranceLine } from "@/components/sites/ringondemand/insurance/insurance-lines";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand: inbound calls and live transfers for insurance agencies";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Rendered at build time, one per page; other slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return INSURANCE_LINES.map((line) => ({ line: line.slug }));
}

export default async function Image({ params }: { params: Promise<{ line: string }> }) {
  const line = getInsuranceLine((await params).line);
  return renderOgImage({
    eyebrow: line?.hero.eyebrow ?? "Insurance",
    headline: line?.hero.headline ?? ["Inbound Calls and Live Transfers", "for Insurance Agencies"],
    footer: line?.summary,
  });
}
