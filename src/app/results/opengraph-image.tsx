import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand results: over 2,000 signed retainers and 5,000 live transfers delivered";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Results",
    headline: ["Calls That Convert", "Across Legal and Insurance"],
    footer: "Over 2,000 signed retainers and 5,000 live transfers delivered",
  });
}
