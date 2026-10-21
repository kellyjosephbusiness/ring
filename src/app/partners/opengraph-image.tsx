import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand publisher network: sell legal and insurance calls";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Partners : Call publishers",
    headline: ["Join Our Vetted", "Publisher Network"],
    footer: "Sell your MVA, legal and insurance calls",
  });
}
