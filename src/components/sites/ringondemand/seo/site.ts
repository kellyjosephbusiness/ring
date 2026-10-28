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
  /** The company's official profiles, published as the Organization's sameAs. */
  profiles: { linkedin: "https://www.linkedin.com/company/117245086/" },
  /** Business contact details, as entered in the company's business listings:
   * they must match those listings word for word (name above as legalName). */
  contact: {
    email: "info@ringondemand.com",
    phone: "203-455-7147",
    /** E.164, for tel: links and structured data. */
    phoneE164: "+12034557147",
    address: {
      street: "616 E Glenoaks Blvd Suite 204",
      city: "Glendale",
      region: "CA",
      postalCode: "91207",
      country: "US",
    },
  },
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

/** "Glendale, CA 91207". */
export const CITY_LINE = `${SITE.contact.address.city}, ${SITE.contact.address.region} ${SITE.contact.address.postalCode}`;

/** The full address on one line. */
export const ADDRESS_LINE = `${SITE.contact.address.street}, ${CITY_LINE}`;

/** Absolute URL on the production domain for a site path. */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface TeamMember {
  /** Anchor for the person's structured data (`${SITE.url}/#<id>`). */
  id: string;
  name: string;
  role: string;
  linkedin: string;
}

/** The people shown on About and Contact and in structured data. Sam writes
 * the blog. */
export const TEAM = {
  kellyJoseph: {
    id: "kelly-joseph",
    name: "Kelly Joseph",
    role: "Co-owner",
    linkedin: "https://www.linkedin.com/in/kelly-joseph-paypercall/",
  },
  samHosey: {
    id: "sam-hosey",
    name: "Sam Hosey",
    role: "Director of Marketing",
    linkedin: "https://www.linkedin.com/in/samhosey/",
  },
} as const satisfies Record<string, TeamMember>;
