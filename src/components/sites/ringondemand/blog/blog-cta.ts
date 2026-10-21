import { PUBLISHER_CTA } from "../final-cta/publisher-cta";
import { INSURANCE_CTA } from "../insurance/insurance-cta";
import { BOOKING_EVENTS, type BookingEvent } from "../links";

export type BlogAudience = "firms" | "agencies" | "publishers";

interface BlogCta {
  /** The card beside the post. */
  aside: { eyebrow: string; title: string; body: string; label: string };
  /** The closing band, and which call it books. */
  final: { heading: { lead: string; accent: string }; body: string; booking: BookingEvent };
}

/** Who a post's readers talk to: law firms book the attorney discovery call,
 * agencies the partner call, publishers the publisher intro call. */
export const BLOG_CTA: Record<BlogAudience, BlogCta> = {
  firms: {
    aside: {
      eyebrow: "Book a call",
      title: "Talk to a licensed attorney, not a sales rep",
      body: "See our ads, our landing pages and our intake questions. Tell us your case criteria and we will tell you what we can deliver.",
      label: "Book a call",
    },
    final: {
      heading: {
        lead: "Tell us your case criteria and",
        accent: "we will tell you what we can deliver",
      },
      body: "Book a call with a licensed attorney on our team. We show you the ads, the intake questions, and the firms we already work with, and you decide.",
      booking: BOOKING_EVENTS.discovery,
    },
  },
  agencies: {
    aside: {
      eyebrow: "Book a call",
      title: "Screened calls for your agents",
      body: "Tell us your criteria and we will tell you what we can deliver. We show you the ads and the intake questions, and you decide.",
      label: "Book a call",
    },
    final: INSURANCE_CTA,
  },
  publishers: {
    aside: {
      eyebrow: "Publishers",
      title: "Send us your calls",
      body: "One intro call to agree on verticals, states and payouts. Then you start sending calls.",
      label: "Book an intro call",
    },
    final: PUBLISHER_CTA,
  },
};
