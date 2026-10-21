/**
 * The blog: one entry per post, newest first. The body of each post is the
 * MDX file with the same slug; everything else (title, dates, key takeaways,
 * FAQ, related pages) lives here so the post page, the blog index, the
 * sitemap, llms.txt and the share images all read the same data.
 *
 * To add a post: write `<slug>.mdx` in this folder (no H1, open with a
 * one-paragraph direct answer, use question-style ## headings), then add an
 * entry below. DRAFT COPY for review — see
 * docs/research/ringondemand/pages-copy-draft.md.
 */
import type { MDXContent } from "mdx/types";

import type { FaqItem } from "@/components/sites/ringondemand/faq/faq-list";

import HowToScreenMvaCallers from "./how-to-screen-motor-vehicle-accident-callers.mdx";
import HowToSellCalls from "./how-to-sell-legal-and-insurance-calls.mdx";
import HowToStartMva from "./how-to-start-mva-live-transfers-in-24-hours.mdx";
import InsuranceInboundVsTransfers from "./insurance-inbound-calls-vs-live-transfers.mdx";
import MvaTransfersVsPreSigned from "./mva-live-transfers-vs-pre-signed-cases.mdx";
import PayPerCallVsForms from "./pay-per-call-vs-web-form-leads-personal-injury.mdx";
import WhatIsMvaTransfer from "./what-is-an-mva-live-transfer.mdx";

export type BlogTopic = "mva" | "legal" | "insurance" | "publishers";

/** Topic labels, and who each topic's readers book a call with. */
export const BLOG_TOPICS: Record<BlogTopic, { label: string; audience: "firms" | "agencies" | "publishers" }> = {
  mva: { label: "MVA", audience: "firms" },
  legal: { label: "Legal", audience: "firms" },
  insurance: { label: "Insurance", audience: "agencies" },
  publishers: { label: "Publishers", audience: "publishers" },
};

export interface BlogPost {
  slug: string;
  /** H1 and page title. */
  title: string;
  /** Meta description and the lead under the H1. */
  description: string;
  topic: BlogTopic;
  tags: readonly string[];
  /** ISO dates. */
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  /** Answer-first summary at the top of the post. Answer engines quote
   * short, self-contained statements like these. */
  takeaways: readonly string[];
  faq: readonly FaqItem[];
  /** Service pages the post supports, shown beside it. */
  related: readonly { label: string; href: string }[];
  Body: MDXContent;
}

const MVA_PAGE = { label: "MVA live transfers and signed cases", href: "/legal/mva" };
const LEGAL_PAGE = { label: "All practice areas", href: "/legal" };
const INSURANCE_PAGE = { label: "All lines of insurance", href: "/insurance" };
const PARTNERS_PAGE = { label: "Join our publisher network", href: "/partners" };
const RESULTS_PAGE = { label: "Results", href: "/results" };

export const POSTS: readonly BlogPost[] = [
  {
    slug: "what-is-an-mva-live-transfer",
    title: "What Is an MVA Live Transfer? A Guide for Personal Injury Firms",
    description:
      "An MVA live transfer is a motor vehicle accident caller who passed your qualifying questions and is connected to your intake line while still on the phone. How they work, what they cost and what to ask before you buy.",
    topic: "mva",
    tags: ["MVA live transfers", "motor vehicle accident cases", "personal injury", "pay-per-call"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 5,
    takeaways: [
      "An MVA live transfer is a motor vehicle accident caller who passed your qualifying questions and is connected to your intake line while still on the phone.",
      "Before the transfer, every caller is checked for the accident date window, fault, treatment, the at-fault driver's insurance and the statute of limitations, plus anything you add.",
      "RingOnDemand charges $550 per MVA live transfer, with a guaranteed cost per signed case.",
      "Firms sign 25 to 35% of RingOnDemand's MVA live transfers, higher in California.",
      "Transfers usually start within 24 hours of the signed order, with no recurring volume commitment.",
    ],
    faq: [
      {
        question: "What does MVA stand for?",
        answer:
          "MVA stands for motor vehicle accident. In personal injury, MVA cases are claims from car and other motor vehicle accidents.",
      },
      {
        question: "Is an MVA live transfer the same as an MVA lead?",
        answer:
          "No. A lead is usually contact details from a web form that your team has to call back. A live transfer is a screened caller connected to your intake line while still on the phone.",
      },
      {
        question: "Do I pay for MVA callers who fail my questions?",
        answer: "No. If a caller fails one of your questions, we do not transfer them and you do not pay for them.",
      },
      {
        question: "Who runs the ads in California?",
        answer: "In California, our ads run under your firm's name and you approve every creative before it runs.",
      },
    ],
    related: [MVA_PAGE, RESULTS_PAGE],
    Body: WhatIsMvaTransfer,
  },
  {
    slug: "mva-live-transfers-vs-pre-signed-cases",
    title: "MVA Live Transfers vs. Pre-Signed Cases: Which Should Your Firm Buy?",
    description:
      "Live transfers put a screened accident caller on your intake line. Pre-signed cases arrive with the retainer already signed. Compare price, intake work and guarantees to choose the right MVA offer.",
    topic: "mva",
    tags: ["MVA live transfers", "pre-signed cases", "signed retainers", "personal injury"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 4,
    takeaways: [
      "Live transfers ($550 per transfer) suit firms with their own intake team: your team takes the call and signs the case.",
      "Pre-signed cases ($2,500 per signed case) suit firms that want signed cases only: we do the full intake and sign the claimant to your retainer.",
      "Live transfers come with a guaranteed cost per signed case; pre-signed cases come with a 28-day replacement on any case that falls out.",
      "Compare the two on cost per signed case: for live transfers, divide the price per transfer by your sign rate.",
      "Both use the same ads, the same publisher network and the same intake script, with no volume commitment.",
    ],
    faq: [
      {
        question: "What is a pre-signed MVA case?",
        answer:
          "A motor vehicle accident case where we run the ads, do the full intake, and sign the claimant to your retainer. You receive the completed intake and the signed retainer, and you pay for signed retainers only.",
      },
      {
        question: "What happens if a pre-signed case falls out?",
        answer: "If it falls out inside 28 days, we replace it.",
      },
      {
        question: "What if my firm does not hit its cost per signed case on live transfers?",
        answer: "We keep sending transfers free until you do.",
      },
    ],
    related: [MVA_PAGE, LEGAL_PAGE],
    Body: MvaTransfersVsPreSigned,
  },
  {
    slug: "how-to-screen-motor-vehicle-accident-callers",
    title: "How to Screen Motor Vehicle Accident Callers Before They Reach Intake",
    description:
      "The five questions that decide whether an MVA caller is a case: accident date, fault, treatment, the at-fault driver's insurance and the statute of limitations. What each one checks and how to set it.",
    topic: "mva",
    tags: ["MVA intake", "screening questions", "motor vehicle accident cases", "personal injury intake"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 3,
    takeaways: [
      "Screen every MVA caller before they reach your intake team, not after.",
      "The five default checks: the accident happened inside your window (30 or 90 days), the caller was not at fault, has already received treatment or seen a doctor, the at-fault driver has insurance, and the claim is inside the statute of limitations.",
      "Add your own questions, such as the states you take cases in.",
      "A caller who fails a question is never transferred and never billed.",
    ],
    faq: [
      {
        question: "Can I change the accident date window?",
        answer: "Yes. You pick the window: 30 or 90 days.",
      },
      {
        question: "Are callers from publishers screened the same way?",
        answer:
          "Yes. Every caller, from our own ads or our vetted publisher network, goes through the same intake script before they reach you.",
      },
      {
        question: "Can I see how each caller answered?",
        answer: "Yes. Every transfer is posted to you with the caller's intake answers.",
      },
    ],
    related: [MVA_PAGE, LEGAL_PAGE],
    Body: HowToScreenMvaCallers,
  },
  {
    slug: "how-to-start-mva-live-transfers-in-24-hours",
    title: "How to Start Receiving MVA Live Transfers Within 24 Hours",
    description:
      "What a personal injury firm needs to start MVA live transfers: a phone number, intake hours and a daily cap. Every step from the first call to the first transfer.",
    topic: "mva",
    tags: ["MVA live transfers", "getting started", "personal injury intake"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 3,
    takeaways: [
      "You need three things: the phone number that receives the calls, the hours you take them and a daily cap.",
      "Transfers usually start within 24 hours of the signed order.",
      "There is no recurring volume commitment: you buy an order, we deliver it, and you reorder when you want more.",
      "Every transfer is posted to you with the caller's intake answers.",
    ],
    faq: [
      {
        question: "Who do I talk to on the first call?",
        answer:
          "A licensed attorney on our team. On the call you will see our ads, our landing pages, our intake questions, and the names of firms we work with.",
      },
      {
        question: "Is there a monthly minimum?",
        answer: "No. You buy an order, we deliver it, and you reorder when you want more.",
      },
      {
        question: "Can I limit how many transfers I get?",
        answer: "Yes. You set a daily cap, and transfers only arrive during the hours you take them.",
      },
    ],
    related: [MVA_PAGE, RESULTS_PAGE],
    Body: HowToStartMva,
  },
  {
    slug: "pay-per-call-vs-web-form-leads-personal-injury",
    title: "Pay-Per-Call vs. Web Form Leads for Personal Injury Firms",
    description:
      "What pay-per-call means for a personal injury firm, how live transfers and pre-signed cases compare with web form leads, and what to ask a pay-per-call vendor before you buy.",
    topic: "legal",
    tags: ["pay-per-call", "personal injury leads", "live transfers", "web form leads"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 3,
    takeaways: [
      "Pay-per-call means a firm pays for phone calls from people who match its case criteria, not for web form leads.",
      "A live transfer connects a screened caller to your intake line while they are still on the phone; a web form lead is contact details your team has to call back.",
      "RingOnDemand sells calls, live transfers and pre-signed cases only, because calls and live transfers convert better in legal.",
      "Before buying, ask where the calls come from, what counts as a billable call and whether you see every caller's intake answers.",
    ],
    faq: [
      {
        question: "What is pay-per-call for law firms?",
        answer:
          "A way to buy cases where the firm pays for phone calls from people who match its case criteria, rather than for web form leads.",
      },
      {
        question: "Which practice areas can I buy calls in?",
        answer:
          "Motor vehicle accidents, workers' compensation, lemon law and medical malpractice, and live transfers for pre-settlement funding companies.",
      },
      {
        question: "Does RingOnDemand sell web form leads?",
        answer: "No. Calls and live transfers convert better in legal, so that is all we sell.",
      },
    ],
    related: [LEGAL_PAGE, MVA_PAGE],
    Body: PayPerCallVsForms,
  },
  {
    slug: "how-to-sell-legal-and-insurance-calls",
    title: "How to Sell Legal and Insurance Calls: A Guide for Pay-Per-Call Publishers",
    description:
      "Which legal and insurance calls RingOnDemand buys, how qualification and payouts work, and how to start selling MVA, legal and insurance calls through our vetted publisher network.",
    topic: "publishers",
    tags: ["pay-per-call publishers", "sell calls", "MVA calls", "insurance calls", "publisher network"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 3,
    takeaways: [
      "RingOnDemand buys calls in nine verticals: MVA, workers' comp, lemon law, medical malpractice, pre-settlement funding, final expense, auto, home and Medicare.",
      "Payouts are set per vertical and agreed before you send a single call.",
      "Every vertical has one written intake script, and you get paid for every call that qualifies.",
      "Every publisher is vetted before calls go live.",
      "Getting started takes one intro call to agree on verticals, states and payouts.",
    ],
    faq: [
      {
        question: "Do you buy MVA calls from publishers?",
        answer:
          "Yes. Motor vehicle accident calls are one of the nine verticals we buy. MVA callers answer the same questions as callers from our own ads.",
      },
      {
        question: "When do I learn the payout?",
        answer: "Before you send a single call. Payouts are set per vertical on the intro call.",
      },
      {
        question: "How do I apply?",
        answer: "Book a publisher intro call and tell us the verticals, states and sources you run calls from.",
      },
    ],
    related: [PARTNERS_PAGE, MVA_PAGE, INSURANCE_PAGE],
    Body: HowToSellCalls,
  },
  {
    slug: "insurance-inbound-calls-vs-live-transfers",
    title: "Inbound Calls vs. Live Transfers for Insurance Agencies",
    description:
      "Inbound calls ring straight to your agents. Live transfers are screened by an intake team first. How each works for final expense, auto, home and Medicare agencies, and how to choose.",
    topic: "insurance",
    tags: ["insurance live transfers", "inbound insurance calls", "final expense", "Medicare", "auto insurance"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-10-21",
    readingMinutes: 3,
    takeaways: [
      "An inbound call rings straight through to your agents' line from ads and publisher traffic matched to your criteria.",
      "A live transfer is screened by an intake team against your criteria, then transferred while the caller is still on the line.",
      "RingOnDemand delivers both for final expense, auto, home and Medicare, and you pay per call.",
      "Every caller goes through the same intake script, from our own ads or our vetted publisher network.",
    ],
    faq: [
      {
        question: "How do I pay for insurance calls?",
        answer: "You pay per call. Book a call for pricing on your line of insurance.",
      },
      {
        question: "Which lines of insurance do you cover?",
        answer: "Final expense, auto, home and Medicare.",
      },
      {
        question: "Do I pay for callers who do not qualify?",
        answer: "No. If a caller fails one of your questions, we do not send them to you and you do not pay for them.",
      },
    ],
    related: [INSURANCE_PAGE, { label: "Final expense calls", href: "/insurance/final-expense" }],
    Body: InsuranceInboundVsTransfers,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function postHref(post: Pick<BlogPost, "slug">): string {
  return `/blog/${post.slug}`;
}

/** Posts on the given topics, newest first, optionally leaving one out. */
export function postsOn(topics: readonly BlogTopic[], exclude?: string): BlogPost[] {
  return POSTS.filter((post) => topics.includes(post.topic) && post.slug !== exclude);
}

/** "Oct 21, 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
