import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "About RingOnDemand";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    headline: ["We Run the Ads and", "Screen Every Caller"],
  });
}
