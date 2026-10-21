/** schema.org builders. Every page carries the Organization and WebSite graph
 * (root layout); pages add their own Service, FAQPage, BreadcrumbList or
 * BlogPosting, pointing back at the Organization by @id. Only facts already on
 * the page go in here. */
import { SITE, absoluteUrl } from "./site";

type Schema = Record<string, unknown>;

const CONTEXT = "https://schema.org";

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

const US = { "@type": "Country", name: "United States" } as const;

/** Who we are, on every page. */
export function siteGraph(): Schema {
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE.name,
        alternateName: SITE.alternateName,
        legalName: SITE.legalName,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo), width: 512, height: 512 },
        description: SITE.description,
        areaServed: US,
        knowsAbout: [...SITE.knowsAbout],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: SITE.name,
        alternateName: SITE.alternateName,
        description: SITE.description,
        inLanguage: "en-US",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** Home › … › this page. */
export function breadcrumbList(crumbs: readonly Crumb[]): Schema {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

/** The questions and answers shown in a page's FAQ. */
export function faqPage(items: readonly QuestionAnswer[]): Schema {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export interface ServiceOffer {
  name: string;
  description: string;
  /** Only where the page shows a price (MVA). */
  price?: { amount: string; unit: string };
}

interface ServiceInput {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  /** Who buys it, e.g. "Personal injury law firms". */
  audience: string;
  offers: readonly ServiceOffer[];
}

/** One vertical we sell calls in, with its offers. */
export function service({ path, name, serviceType, description, audience, offers }: ServiceInput): Schema {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: US,
    audience: { "@type": "BusinessAudience", audienceType: audience },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        ...(offer.price
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: Number(offer.price.amount.replace(/[^0-9.]/g, "")),
                priceCurrency: "USD",
                unitText: offer.price.unit,
              },
            }
          : {}),
      })),
    },
  };
}
