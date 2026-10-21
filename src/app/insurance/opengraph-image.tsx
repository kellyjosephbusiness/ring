import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand: inbound calls and live transfers for insurance agencies";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Insurance",
    headline: ["Inbound Calls and Live Transfers", "for Insurance Agencies"],
  });
}
