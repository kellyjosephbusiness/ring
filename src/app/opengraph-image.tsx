import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand: pay-per-call live transfers for law firms and insurance agencies";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Inbound calls and live transfers",
    headline: ["Pay-Per-Call Live Transfers", "for Legal and Insurance"],
  });
}
