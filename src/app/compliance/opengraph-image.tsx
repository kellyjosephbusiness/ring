import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand compliance: consent, call recording and publisher controls";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Compliance",
    headline: ["Compliance Built Into", "Every Call"],
    footer: "Consent, call recording, DNC scrubbing and publisher controls",
  });
}
