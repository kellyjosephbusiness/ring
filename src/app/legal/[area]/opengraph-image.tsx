import { PRACTICE_AREAS, getPracticeArea } from "@/components/sites/ringondemand/legal/practice-areas";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/sites/ringondemand/seo/og-image";

export const alt = "RingOnDemand: live transfers and signed cases for law firms";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Rendered at build time, one per page; other slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PRACTICE_AREAS.map((area) => ({ area: area.slug }));
}

export default async function Image({ params }: { params: Promise<{ area: string }> }) {
  const area = getPracticeArea((await params).area);
  return renderOgImage({
    eyebrow: area?.hero.eyebrow ?? "Legal",
    headline: area?.hero.headline ?? ["Live Transfers and Signed Cases", "for Law Firms"],
    footer: area?.summary,
  });
}
