import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand blog: pay-per-call guides for law firms, agencies and publishers";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    headline: ["Pay-Per-Call Guides for", "Law Firms, Agencies and Publishers"],
  });
}
