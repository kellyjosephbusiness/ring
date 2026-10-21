/** Who RingOnDemand is, for metadata, structured data, robots, the sitemap
 * and llms.txt. Canonical URLs always point at the production domain, so
 * preview and local builds never canonicalise to themselves. */

export const SITE = {
  name: "RingOnDemand",
  alternateName: "Ring On Demand",
  legalName: "Ring On Demand Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ringondemand.com").replace(/\/$/, ""),
  locale: "en_US",
  /** One-sentence definition of the company; AI answers quote sentences like
   * this, so keep it plain and factual. */
  description:
    "RingOnDemand is a pay-per-call company. We run the ads, screen every caller against your criteria, and deliver the ones who qualify as inbound calls, live transfers or signed retainers to personal injury law firms, pre-settlement funding companies and insurance agencies across the US.",
  /** Square raster mark, for the Organization logo and the touch icon. */
  logo: "/sites/ringondemand/brand/logo-mark-512.png",
  knowsAbout: [
    "Pay-per-call",
    "Live transfers",
    "Inbound calls",
    "Pre-signed cases",
    "Motor vehicle accident cases",
    "MVA live transfers",
    "Personal injury case acquisition",
    "Workers' compensation cases",
    "Lemon law cases",
    "Medical malpractice cases",
    "Pre-settlement funding",
    "Final expense insurance calls",
    "Auto insurance calls",
    "Home insurance calls",
    "Medicare calls",
    "Pay-per-call publisher networks",
  ],
} as const;

/** Absolute URL on the production domain for a site path. */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
