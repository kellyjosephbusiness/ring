/**
 * The blog: one entry per post, newest first. The body of each post is the
 * MDX file with the same slug; everything else (title, dates, key takeaways,
 * FAQ, related pages) lives here so the post page, the blog index, the
 * sitemap, llms.txt and the share images all read the same data.
 *
 * To add a post: write `<slug>.mdx` in this folder (no H1, open with a
 * one-paragraph direct answer, use question-style ## headings), then add an
 * entry below. Authors come from TEAM in seo/site.ts. DRAFT COPY for review — see
 * docs/research/ringondemand/pages-copy-draft.md.
 */
import type { MDXContent } from "mdx/types";

import type { BlogAudience } from "@/components/sites/ringondemand/blog/blog-cta";
import type { FaqItem } from "@/components/sites/ringondemand/faq/faq-list";
import { TEAM, type TeamMember } from "@/components/sites/ringondemand/seo/site";

import FinalExpenseTransfers from "./final-expense-live-transfers.mdx";
import HowToChoosePiVendor from "./how-to-choose-a-personal-injury-lead-generation-company.mdx";
import HowToGetCarAccidentCases from "./how-to-get-more-car-accident-cases.mdx";
import HowToScreenMvaCallers from "./how-to-screen-motor-vehicle-accident-callers.mdx";
import HowToSellCalls from "./how-to-sell-legal-and-insurance-calls.mdx";
import HowToSellMvaCalls from "./how-to-sell-mva-calls.mdx";
import HowToStartMva from "./how-to-start-mva-live-transfers-in-24-hours.mdx";
import InsuranceInboundVsTransfers from "./insurance-inbound-calls-vs-live-transfers.mdx";
import InsuranceLeadGeneration from "./insurance-lead-generation.mdx";
import LegalLeadGeneration from "./legal-lead-generation.mdx";
import MedicareTransfers from "./medicare-live-transfers.mdx";
import MvaLeads from "./mva-leads.mdx";
import MvaTransfersVsPreSigned from "./mva-live-transfers-vs-pre-signed-cases.mdx";
import PayPerCallOffers from "./pay-per-call-offers-legal-insurance.mdx";
import PayPerCallVsForms from "./pay-per-call-vs-web-form-leads-personal-injury.mdx";
import PreSettlementFundingLeads from "./pre-settlement-funding-leads.mdx";
import TcpaCompliantTransfers from "./tcpa-compliant-live-transfers.mdx";
import WhatIsMvaTransfer from "./what-is-an-mva-live-transfer.mdx";
import WorkersCompIntake from "./workers-comp-intake-questions.mdx";
import WorkersCompLeads from "./workers-comp-leads-for-attorneys.mdx";

export type BlogTopic = "mva" | "workers-comp" | "legal" | "insurance" | "publishers" | "compliance";

/** Topic labels, and who each topic's readers book a call with. */
export const BLOG_TOPICS: Record<BlogTopic, { label: string; audience: BlogAudience }> = {
  mva: { label: "MVA", audience: "firms" },
  "workers-comp": { label: "Workers' Comp", audience: "firms" },
  legal: { label: "Legal", audience: "firms" },
  insurance: { label: "Insurance", audience: "agencies" },
  publishers: { label: "Publishers", audience: "publishers" },
  compliance: { label: "Compliance", audience: "buyers" },
};

/** The guide the blog index leads with. */
export const FEATURED_SLUG = "what-is-an-mva-live-transfer";

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
  /** Byline, linked to the author's LinkedIn. */
  author: TeamMember;
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
const WORKERS_COMP_PAGE = { label: "Workers' comp live transfers and signed cases", href: "/legal/workers-comp" };
const FUNDING_PAGE = { label: "Pre-settlement funding live transfers", href: "/legal/pre-settlement-funding" };
const FINAL_EXPENSE_PAGE = { label: "Final expense calls", href: "/insurance/final-expense" };
const MEDICARE_PAGE = { label: "Medicare calls", href: "/insurance/medicare" };
const COMPLIANCE_PAGE = { label: "Compliance", href: "/compliance" };

export const POSTS: readonly BlogPost[] = [
  {
    slug: "mva-leads",
    title: "MVA Leads: What They Are and How Law Firms Buy Them",
    description:
      "MVA leads are motor vehicle accident clients a personal injury firm buys instead of generating itself: web form leads, live transfers or pre-signed cases. How each works, how they are priced and how to buy leads that sign.",
    topic: "mva",
    tags: ["MVA leads", "motor vehicle accident leads", "car accident leads", "personal injury leads", "live transfers"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 4,
    author: TEAM.samHosey,
    takeaways: [
      "MVA leads come in three forms: web form leads to call back, live transfers connected to your intake line, and pre-signed cases with the retainer already signed.",
      "The form you buy decides how much screening and signing your own intake team has to do.",
      "Compare vendors on cost per signed case: for live transfers, divide the price per transfer by your sign rate.",
      "Screen MVA callers for the accident window, fault, treatment, the at-fault driver's insurance and the statute of limitations.",
      "Firms sign 25 to 35% of RingOnDemand's MVA live transfers, higher in California.",
    ],
    faq: [
      {
        question: "What is an MVA lead?",
        answer:
          "A potential motor vehicle accident client that a personal injury firm buys from a marketing company, as a web form lead, a live transfer or a pre-signed case.",
      },
      {
        question: "Are MVA live transfers better than MVA web leads?",
        answer:
          "For firms with an intake team, usually yes: a live transfer is a screened caller on your intake line, while a web lead is contact details your team has to call back and qualify from scratch.",
      },
      {
        question: "How are MVA leads priced?",
        answer:
          "Per lead, per transfer or per signed case. RingOnDemand prices MVA live transfers per transfer, with a guaranteed cost per signed case, and pre-signed cases per signed case. Book a call for current pricing.",
      },
    ],
    related: [MVA_PAGE, RESULTS_PAGE],
    Body: MvaLeads,
  },
  {
    slug: "how-to-get-more-car-accident-cases",
    title: "How to Get More Car Accident Cases: 7 Channels for PI Firms",
    description:
      "Seven ways personal injury firms get more car accident cases: referrals, SEO, paid search, TV and radio, reviews, lead generation companies, and live transfers or pre-signed cases. Which to add first.",
    topic: "mva",
    tags: ["car accident cases", "personal injury marketing", "MVA cases", "law firm growth", "live transfers"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "The seven main channels are referrals, SEO, paid search, TV and radio, reviews, lead generation companies, and live transfers or pre-signed cases.",
      "Referrals, SEO, broadcast and reviews build demand over months; live transfers and pre-signed cases add cases on demand.",
      "Judge every channel by cost per signed case, and fix intake speed first.",
      "RingOnDemand's live transfers usually start within 24 hours of a signed order, with no recurring volume commitment.",
    ],
    faq: [
      {
        question: "What is the fastest way to get more car accident cases?",
        answer:
          "Buying live transfers or pre-signed cases. With RingOnDemand, transfers usually start within 24 hours of the signed order.",
      },
      {
        question: "Should a personal injury firm use more than one channel?",
        answer:
          "Most growing firms do: long-term channels like referrals and SEO alongside on-demand channels like live transfers, all judged on cost per signed case.",
      },
      {
        question: "What if my firm has no intake team?",
        answer:
          "Buy pre-signed cases: we run the ads, do the full intake and sign the claimant to your retainer, and you pay for signed retainers only.",
      },
    ],
    related: [MVA_PAGE, LEGAL_PAGE],
    Body: HowToGetCarAccidentCases,
  },
  {
    slug: "workers-comp-leads-for-attorneys",
    title: "Workers' Comp Leads for Attorneys: Live Transfers and Signed Cases",
    description:
      "How law firms buy workers' compensation leads: web form leads, live transfers of screened injured workers, or pre-signed cases. What makes a good lead and what to ask a vendor.",
    topic: "workers-comp",
    tags: ["workers comp leads", "workers compensation leads for attorneys", "live transfers", "signed cases"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "Workers' comp leads come as web form leads, live transfers or pre-signed cases.",
      "Live transfers suit firms with their own intake team; pre-signed cases suit firms that want signed cases only.",
      "A good lead was hurt on the job, is an employee, reported the injury, has been treated and is inside the filing deadline.",
      "With RingOnDemand you pay only for callers who passed your questions, and transfers usually start within 24 hours.",
    ],
    faq: [
      {
        question: "What is a workers' comp live transfer?",
        answer:
          "An injured worker who passed your qualifying questions and was transferred to your intake line while still on the phone.",
      },
      {
        question: "Can I buy signed workers' comp cases?",
        answer:
          "Yes. With pre-signed cases we run the ads, do the full intake and sign the claimant to your retainer, and you pay for signed retainers only.",
      },
      {
        question: "Do I pay for injured workers who do not qualify?",
        answer: "No. If a caller fails one of your questions, we do not transfer them and you do not pay for them.",
      },
    ],
    related: [WORKERS_COMP_PAGE, LEGAL_PAGE],
    Body: WorkersCompLeads,
  },
  {
    slug: "workers-comp-intake-questions",
    title: "Workers' Comp Intake Questions: How to Screen Injured Workers",
    description:
      "The five questions that decide whether a workers' compensation caller is a case: hurt on the job, employee status, injury reported, treatment, and the filing deadline. What each checks and how to set it.",
    topic: "workers-comp",
    tags: ["workers comp intake", "screening questions", "workers compensation cases", "law firm intake"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "Screen workers' comp callers before they reach your intake team, not after.",
      "The five default checks: hurt on the job, an employee rather than a contractor, injury reported inside your window, already treated, and inside your state's filing deadline.",
      "Add your own questions, such as states, injury types or whether the caller already has a lawyer.",
      "Every transfer is posted with the caller's intake answers, so you can see how each one was screened.",
    ],
    faq: [
      {
        question: "Why screen for employee status?",
        answer:
          "Workers' comp generally covers employees, so a caller paid as an independent contractor may not be covered.",
      },
      {
        question: "Can I set the injury-reporting window?",
        answer: "Yes. You pick the window, and it goes into the intake script every caller answers.",
      },
      {
        question: "Do filing deadlines differ by state?",
        answer: "Yes. Every state sets its own deadline, so the script should reflect the states you take cases in.",
      },
    ],
    related: [WORKERS_COMP_PAGE, LEGAL_PAGE],
    Body: WorkersCompIntake,
  },
  {
    slug: "legal-lead-generation",
    title: "Legal Lead Generation: How Law Firms Buy Cases, Calls and Leads",
    description:
      "How legal lead generation works: web form leads, inbound calls, live transfers and pre-signed cases compared, which practice areas buy them, and how to judge a vendor on cost per signed case.",
    topic: "legal",
    tags: ["legal lead generation", "law firm leads", "personal injury leads", "live transfers", "pre-signed cases"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "Law firms buy four main products: web form leads, inbound calls, live transfers and pre-signed cases.",
      "They differ in how much screening happens first, who signs the case and what the firm pays for.",
      "Judge every vendor on cost per signed case, not cost per lead.",
      "Ask where calls come from, what you are billed for, and how consent is captured.",
    ],
    faq: [
      {
        question: "What is legal lead generation?",
        answer:
          "The way law firms buy potential clients from outside marketing companies, as web form leads, inbound calls, live transfers or pre-signed cases.",
      },
      {
        question: "Which practice areas does RingOnDemand run?",
        answer:
          "Motor vehicle accidents, workers' compensation, lemon law and medical malpractice, plus live transfers for pre-settlement funding companies.",
      },
      {
        question: "How fast can legal live transfers start?",
        answer: "Usually within 24 hours of the signed order, with no recurring volume commitment.",
      },
    ],
    related: [LEGAL_PAGE, MVA_PAGE],
    Body: LegalLeadGeneration,
  },
  {
    slug: "how-to-choose-a-personal-injury-lead-generation-company",
    title: "How to Choose a Personal Injury Lead Generation Company: 12 Questions",
    description:
      "Twelve questions to ask a personal injury lead generation company before you buy: lead sources, screening, billing, call recordings, consent, publisher controls, guarantees and commitments.",
    topic: "legal",
    tags: ["personal injury lead generation company", "PI leads", "lead vendor checklist", "live transfers"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 4,
    author: TEAM.samHosey,
    takeaways: [
      "Compare personal injury lead vendors on cost per signed case first.",
      "Get in writing what you are billed for, where leads come from and who writes the screening questions.",
      "Ask for call recordings, consent records and how publishers are vetted and controlled.",
      "Ask what is guaranteed if cases do not sign or fall out, and start with a small order.",
    ],
    faq: [
      {
        question: "What is the most important question to ask a PI lead vendor?",
        answer:
          "What exactly you are billed for. With RingOnDemand, a billable transfer is a caller who passed your qualifying questions and was connected live to your intake line.",
      },
      {
        question: "Should a lead vendor record calls?",
        answer: "Yes. Every intake call we handle is recorded, and you can get the recording of any call we send you.",
      },
      {
        question: "Who will I talk to on a first call with RingOnDemand?",
        answer:
          "A licensed attorney on our team, who will show you our ads, our landing pages, our intake questions, and the names of firms we work with.",
      },
    ],
    related: [LEGAL_PAGE, COMPLIANCE_PAGE],
    Body: HowToChoosePiVendor,
  },
  {
    slug: "pre-settlement-funding-leads",
    title: "Pre-Settlement Funding Leads: How Funding Companies Buy Live Transfers",
    description:
      "How pre-settlement funding companies buy leads: live transfers of plaintiffs with pending personal injury cases, screened for representation, case type and state before they reach your team.",
    topic: "legal",
    tags: ["pre-settlement funding leads", "lawsuit funding leads", "live transfers", "plaintiff leads"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "Pre-settlement funding leads are plaintiffs with pending personal injury cases who want an advance.",
      "Live transfers put a screened plaintiff on your team's line while they are still on the phone.",
      "Screen for a pending case, attorney representation, a case type and state you fund, and permission to contact the attorney.",
      "You pay per transfer, only for callers who passed your funding questions.",
    ],
    faq: [
      {
        question: "What is a pre-settlement funding live transfer?",
        answer:
          "A plaintiff with a pending personal injury case who passed your funding questions and was transferred to your team while still on the phone.",
      },
      {
        question: "Why screen for attorney representation?",
        answer:
          "Funding decisions usually depend on the plaintiff's attorney, so screening for representation, and for permission to contact the attorney, keeps your team on cases it can fund.",
      },
      {
        question: "How do funding companies pay?",
        answer: "Per transfer. Book a call for pre-settlement funding pricing.",
      },
    ],
    related: [FUNDING_PAGE, LEGAL_PAGE],
    Body: PreSettlementFundingLeads,
  },
  {
    slug: "insurance-lead-generation",
    title: "Insurance Lead Generation: Leads, Inbound Calls or Live Transfers?",
    description:
      "How insurance agencies buy prospects: internet leads, inbound calls and live transfers compared, the criteria for final expense, Medicare, auto and home, and what to ask a vendor.",
    topic: "insurance",
    tags: ["insurance lead generation", "insurance live transfers", "inbound insurance calls", "insurance leads"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "Agencies buy three main products: internet leads, inbound calls and live transfers.",
      "Calls and transfers cost agents the least time chasing, because the prospect is already on the phone.",
      "Each line of insurance has its own criteria, written into the intake script.",
      "Ask about call sources, recordings, consent, Do Not Call scrubbing and Medicare rules.",
    ],
    faq: [
      {
        question: "What is the difference between an insurance lead and a live transfer?",
        answer:
          "An internet lead is contact details your agent calls back. A live transfer is a caller screened against your criteria and connected to your agent while still on the line.",
      },
      {
        question: "Which lines of insurance does RingOnDemand run?",
        answer: "Final expense, auto, home and Medicare.",
      },
      {
        question: "How do agencies pay?",
        answer: "Per call, and only for callers who passed your questions. Book a call for pricing on your line.",
      },
    ],
    related: [INSURANCE_PAGE, COMPLIANCE_PAGE],
    Body: InsuranceLeadGeneration,
  },
  {
    slug: "final-expense-live-transfers",
    title: "Final Expense Live Transfers: How They Work and What to Ask",
    description:
      "Final expense live transfers connect screened callers to your licensed agents while they are still on the line. What gets checked, how they compare with leads, and what to ask a vendor.",
    topic: "insurance",
    tags: ["final expense live transfers", "final expense leads", "final expense calls", "insurance live transfers"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "A final expense live transfer is a screened caller connected to your licensed agents while still on the line.",
      "Callers are checked for age range, licensed state, coverage amount and a way to pay premiums.",
      "Every caller agrees to be connected, every call is recorded, and consent certificates are captured.",
      "You pay per call, and transfers usually start within 24 hours of the signed order.",
    ],
    faq: [
      {
        question: "What is a final expense live transfer?",
        answer:
          "A caller shopping for final expense coverage who passed your qualifying questions and was transferred to your licensed agents while still on the line.",
      },
      {
        question: "Can I get the recording of a final expense call?",
        answer: "Yes. Every intake call is recorded, and you can get the recording of any call we send you.",
      },
      {
        question: "Do I pay for callers outside my age range or states?",
        answer: "No. If a caller fails one of your questions, we do not send them to you and you do not pay for them.",
      },
    ],
    related: [FINAL_EXPENSE_PAGE, INSURANCE_PAGE],
    Body: FinalExpenseTransfers,
  },
  {
    slug: "medicare-live-transfers",
    title: "Medicare Live Transfers: How They Work Under CMS Rules",
    description:
      "Medicare live transfers connect eligible callers to licensed agents. How they work, what gets checked, and what CMS rules for third-party marketing organizations mean for the vendor you buy from.",
    topic: "insurance",
    tags: ["Medicare live transfers", "Medicare leads", "CMS TPMO rules", "Medicare calls"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "A Medicare live transfer is an eligible caller who passed your questions, connected to a licensed agent.",
      "Vendors that generate Medicare calls must follow CMS rules for third-party marketing organizations, including the disclaimer and call recording.",
      "RingOnDemand's Medicare calls follow those rules, and Medicare recordings are kept for 10 years.",
      "Calls cluster around enrollment periods, above all the Annual Enrollment Period from October 15 to December 7.",
    ],
    faq: [
      {
        question: "What is a TPMO?",
        answer:
          "A third-party marketing organization: a company that markets Medicare Advantage or Part D plans for plans or agents, including companies that generate and hand off Medicare calls.",
      },
      {
        question: "Do your Medicare calls include the TPMO disclaimer?",
        answer:
          "Yes. Our Medicare calls follow CMS rules for third-party marketing organizations, including the required disclaimer.",
      },
      {
        question: "Can I limit transfers to the enrollment periods I work?",
        answer: "Yes. Tell us the periods you work and we write them into the intake script.",
      },
    ],
    related: [MEDICARE_PAGE, COMPLIANCE_PAGE],
    Body: MedicareTransfers,
  },
  {
    slug: "how-to-sell-mva-calls",
    title: "How to Sell MVA Calls: A Guide for Pay-Per-Call Publishers",
    description:
      "How pay-per-call publishers sell motor vehicle accident calls: what makes an MVA call qualify, how payouts are set, what traffic buyers allow, and how to join RingOnDemand's publisher network.",
    topic: "publishers",
    tags: ["sell MVA calls", "MVA pay-per-call", "pay-per-call publishers", "legal calls", "publisher network"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "MVA calls qualify when the accident is recent, the caller was not at fault, has been treated, the other driver was insured and the claim is inside the statute of limitations.",
      "RingOnDemand's payouts are set per vertical and agreed before you send a single call.",
      "Publishers are vetted, their ads approved, and robocalls, incentivized and misleading traffic banned.",
      "MVA is one of nine legal and insurance verticals we buy.",
    ],
    faq: [
      {
        question: "Does RingOnDemand buy MVA calls?",
        answer:
          "Yes. Motor vehicle accident calls are one of the nine verticals we buy, and MVA callers answer the same questions as callers from our own ads.",
      },
      {
        question: "When do I learn the MVA payout?",
        answer: "Before you send a single call. Payouts are set per vertical on the intro call.",
      },
      {
        question: "What traffic is not allowed?",
        answer: "Robocalls, incentivized traffic and misleading ads.",
      },
    ],
    related: [PARTNERS_PAGE, MVA_PAGE],
    Body: HowToSellMvaCalls,
  },
  {
    slug: "pay-per-call-offers-legal-insurance",
    title: "Legal and Insurance Pay-Per-Call Offers: How Publishers Pick a Buyer",
    description:
      "How pay-per-call publishers choose legal and insurance buyers: verticals, written qualification scripts, payouts agreed up front, traffic rules, compliance and steady demand.",
    topic: "publishers",
    tags: ["pay-per-call offers", "legal pay-per-call", "insurance pay-per-call", "pay-per-call buyers", "publishers"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "The best pay-per-call offers have a written script, a payout agreed up front, clear traffic rules and steady demand.",
      "RingOnDemand buys calls in nine legal and insurance verticals.",
      "Serious buyers require consent, call recording, Do Not Call scrubbing and, for Medicare, CMS rules.",
      "Joining takes one intro call to agree on verticals, states and payouts.",
    ],
    faq: [
      {
        question: "What should a pay-per-call publisher look for in a buyer?",
        answer:
          "A written qualification script, a payout agreed before you send traffic, clear traffic rules, compliance requirements and steady demand.",
      },
      {
        question: "Which verticals does RingOnDemand buy?",
        answer:
          "MVA, workers' compensation, lemon law, medical malpractice and pre-settlement funding in legal; final expense, auto, home and Medicare in insurance.",
      },
      {
        question: "How do I join?",
        answer: "Book a publisher intro call and tell us the verticals, states and sources you run calls from.",
      },
    ],
    related: [PARTNERS_PAGE, COMPLIANCE_PAGE],
    Body: PayPerCallOffers,
  },
  {
    slug: "tcpa-compliant-live-transfers",
    title: "TCPA-Compliant Live Transfers: What Buyers Should Ask Their Vendor",
    description:
      "What makes a live transfer TCPA-compliant: consent to be connected, consent certificates, call recordings, Do Not Call scrubbing and traffic controls. The questions law firms and insurance agencies should ask.",
    topic: "compliance",
    tags: ["TCPA compliant live transfers", "TCPA compliance", "consent certificates", "pay-per-call compliance"],
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
    takeaways: [
      "A compliant live transfer can show the caller's consent, a Do Not Call check before outbound contact, and the recording of the call.",
      "Ask your vendor how every caller reached them and what they agreed to.",
      "RingOnDemand captures consent to transfer and third-party consent certificates, and records every intake call.",
      "Legal advertising and Medicare carry their own rules on top of the TCPA.",
    ],
    faq: [
      {
        question: "What is the TCPA?",
        answer:
          "The Telephone Consumer Protection Act, the federal law that limits telemarketing calls and texts, including autodialed and prerecorded calls and calls to numbers on the National Do Not Call Registry.",
      },
      {
        question: "What proof of consent should a call vendor provide?",
        answer:
          "Ask for an independent record. We capture third-party consent certificates, every caller agrees to be connected before a transfer, and every intake call is recorded.",
      },
      {
        question: "Is this legal advice?",
        answer: "No. It is general information about how we handle calls. Talk to your own counsel about your obligations.",
      },
    ],
    related: [COMPLIANCE_PAGE, INSURANCE_PAGE, LEGAL_PAGE],
    Body: TcpaCompliantTransfers,
  },
  {
    slug: "what-is-an-mva-live-transfer",
    title: "What Is an MVA Live Transfer? A Guide for Personal Injury Firms",
    description:
      "An MVA live transfer is a motor vehicle accident caller who passed your qualifying questions and is connected to your intake line while still on the phone. How they work, how they are priced and what to ask before you buy.",
    topic: "mva",
    tags: ["MVA live transfers", "motor vehicle accident cases", "personal injury", "pay-per-call"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-11-04",
    readingMinutes: 5,
    author: TEAM.samHosey,
    takeaways: [
      "An MVA live transfer is a motor vehicle accident caller who passed your qualifying questions and is connected to your intake line while still on the phone.",
      "Before the transfer, every caller is checked for the accident date window, fault, treatment, the at-fault driver's insurance and the statute of limitations, plus anything you add.",
      "MVA live transfers are priced per transfer, with a guaranteed cost per signed case.",
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
      "Live transfers put a screened accident caller on your intake line. Pre-signed cases arrive with the retainer already signed. Compare how you pay, the intake work and the guarantees to choose the right MVA offer.",
    topic: "mva",
    tags: ["MVA live transfers", "pre-signed cases", "signed retainers", "personal injury"],
    publishedAt: "2026-10-21",
    updatedAt: "2026-11-04",
    readingMinutes: 4,
    author: TEAM.samHosey,
    takeaways: [
      "Live transfers, priced per transfer, suit firms with their own intake team: your team takes the call and signs the case.",
      "Pre-signed cases, priced per signed case, suit firms that want signed cases only: we do the full intake and sign the claimant to your retainer.",
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
    author: TEAM.samHosey,
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
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
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
    updatedAt: "2026-11-04",
    readingMinutes: 3,
    author: TEAM.samHosey,
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
    author: TEAM.samHosey,
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
    author: TEAM.samHosey,
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
