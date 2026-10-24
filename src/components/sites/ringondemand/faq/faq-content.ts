/**
 * FAQ copy for every page that has an FAQ. Each list is shown as an accordion
 * and also published as FAQPage structured data, so answer engines (Google AI
 * Overviews, ChatGPT, Perplexity, Claude) can quote it.
 *
 * The firm questions are the legal copy doc's
 * (docs/research/ringondemand/website-copy.md). Everything else restates
 * facts already on the site and is DRAFT COPY for review — see
 * docs/research/ringondemand/pages-copy-draft.md. No new prices, stats or
 * guarantees: only MVA states prices.
 */
import type { InsuranceLine } from "../insurance/insurance-lines";
import type { PracticeArea } from "../legal/practice-areas";
import type { FaqItem } from "./faq-list";

/** The copy doc's "Questions firms ask us", by topic. */
export const FIRM_QUESTIONS = {
  webLeads: {
    question: "Do you sell web form leads?",
    answer: "No. Calls and live transfers convert better in legal, so that is all we sell.",
  },
  paidTransfer: {
    question: "What counts as a transfer I pay for?",
    answer: "A caller who passed your qualifying questions and was connected live to your intake line.",
  },
  fallout: {
    question: "What happens if a signed case falls out?",
    answer: "If it falls out inside 28 days, we replace it.",
  },
  volume: {
    question: "Do I have to commit to a monthly volume?",
    answer: "No. You buy an order, we deliver it, and you reorder when you want more.",
  },
  whoOnCall: {
    question: "Who do I talk to on the call?",
    answer:
      "A licensed attorney on our team. On the call you will see our ads, our landing pages, our intake questions, and the names of firms we work with.",
  },
  states: {
    question: "Which states do you cover?",
    answer: "Any U.S. state. In California we advertise under your firm's name and you approve every creative first.",
  },
  speed: {
    question: "How fast can transfers start?",
    answer: "Usually within 24 hours of the signed order.",
  },
} as const satisfies Record<string, FaqItem>;

/** The copy doc's FAQ in its own order (the MVA page). */
export const FIRM_FAQ: readonly FaqItem[] = Object.values(FIRM_QUESTIONS);

const ANYTHING_ELSE = "Anything else you add to the script.";

/** "The caller was hurt on the job." → "the caller was hurt on the job". */
function clause(check: string): string {
  return check.charAt(0).toLowerCase() + check.slice(1).replace(/\.$/, "");
}

/** A page's screening checklist as one answer, so the FAQ never drifts from
 * the "What we check" card above it. */
export function checksAnswer(checks: readonly string[]): string {
  const clauses = checks.filter((check) => check !== ANYTHING_ELSE).map(clause);
  const last = clauses.pop();
  const list = clauses.length ? `${clauses.join("; ")}; and ${last}` : last;
  return `Every caller answers your qualifying questions before they reach you. By default the script checks that ${list}. You can add anything else to the script.`;
}

/** "an auto insurance", "a lemon law", and "an MVA": acronyms take the
 * article of their first letter's name. */
function withArticle(noun: string): string {
  const vowelSound = /^[aeiou]/i.test(noun) || /^[AEFHILMNORSX][A-Z]/.test(noun);
  return `${vowelSound ? "an" : "a"} ${noun}`;
}

/** A practice area's FAQ: its own questions, its screening checks, then the
 * copy doc's firm questions that apply to it. Only MVA carries the 28-day
 * replacement; funding companies get their own wording where it differs. */
export function practiceAreaFaq(area: PracticeArea): FaqItem[] {
  const checks = {
    question: `What do you check before ${withArticle(area.shortName)} caller reaches ${
      area.buyer === "funders" ? "my team" : "my firm"
    }?`,
    answer: checksAnswer(area.checks),
  };
  const intro = [...area.faq.slice(0, 1), checks, ...area.faq.slice(1)];

  if (area.slug === "mva") return [...intro, ...FIRM_FAQ];

  const { webLeads, paidTransfer, volume, whoOnCall, states, speed } = FIRM_QUESTIONS;
  if (area.buyer === "funders") {
    return [
      ...intro,
      webLeads,
      {
        question: paidTransfer.question,
        answer: "A caller who passed your funding questions and was connected live to your team's line.",
      },
      volume,
      whoOnCall,
      { question: states.question, answer: "Any U.S. state. You choose the states you fund in." },
      speed,
    ];
  }
  return [...intro, webLeads, paidTransfer, volume, whoOnCall, states, speed];
}

/** Questions every insurance line shares. */
const INSURANCE_QUESTIONS = {
  inboundVsTransfer: {
    question: "What is the difference between an inbound call and a live transfer?",
    answer:
      "An inbound call rings straight through to your agents' line from our own ads and our vetted publisher network. A live transfer is screened by our intake team first, then transferred to your agents while the caller is still on the line.",
  },
  sources: {
    question: "Where do the calls come from?",
    answer:
      "Our own ads plus a vetted publisher network. Every caller, from either source, goes through the same intake script before they reach your agents.",
  },
  volume: FIRM_QUESTIONS.volume,
  speed: {
    question: "How fast can calls start?",
    answer:
      "Usually within 24 hours of the signed order. We need the phone number that receives the calls, the hours you take them, and a daily cap.",
  },
} as const satisfies Record<string, FaqItem>;

/** An insurance line's FAQ. */
export function insuranceLineFaq(line: InsuranceLine): FaqItem[] {
  return [
    {
      question: `What is ${withArticle(line.inSentence)} live transfer?`,
      answer:
        "A caller who passed your qualifying questions and was transferred to your licensed agents by our intake team while still on the line.",
    },
    INSURANCE_QUESTIONS.inboundVsTransfer,
    {
      question: `What do you check before ${withArticle(line.inSentence)} caller reaches my agents?`,
      answer: checksAnswer(line.checks),
    },
    {
      question: `How much do ${line.inSentence} calls cost?`,
      answer: `You pay per call. Book a call for ${line.inSentence} pricing.`,
    },
    INSURANCE_QUESTIONS.sources,
    INSURANCE_QUESTIONS.volume,
    INSURANCE_QUESTIONS.speed,
  ];
}

/** The homepage: what RingOnDemand is and how buying calls works. */
export const HOME_FAQ: readonly FaqItem[] = [
  {
    question: "What does RingOnDemand do?",
    answer:
      "RingOnDemand is a pay-per-call company. We run the ads, screen every caller against your criteria, and send the ones who qualify to your team as inbound calls or live transfers. Law firms can also buy pre-signed cases. We work with personal injury law firms, pre-settlement funding companies and insurance agencies across the US.",
  },
  {
    question: "What is a live transfer?",
    answer:
      "A caller who passed your qualifying questions and was connected to your team while still on the phone. Our intake team screens every caller against your criteria before the transfer.",
  },
  {
    question: "What is a pre-signed case?",
    answer:
      "A case where we run the ads, do the full intake, and sign the claimant to your retainer. You get the completed intake and the signed retainer, and you pay for signed retainers only. Pre-signed cases are for law firms.",
  },
  {
    question: "Which verticals do you run calls in?",
    answer:
      "In legal: motor vehicle accidents (MVA), workers' compensation, lemon law, medical malpractice and pre-settlement funding. In insurance: final expense, auto, home and Medicare.",
  },
  {
    question: "Do you sell web form leads?",
    answer: "No. We sell calls, live transfers and signed retainers, not web form leads.",
  },
  INSURANCE_QUESTIONS.sources,
  {
    question: "How fast can calls start?",
    answer:
      "Transfers can start within 24 hours of the signed order. We need the phone number that receives the calls, the hours you take them, and a daily cap.",
  },
  FIRM_QUESTIONS.volume,
  {
    question: "How much do calls cost?",
    answer:
      "It depends on the vertical and the offer. Motor vehicle accident prices are on our MVA page. For every other practice area and line of insurance, book a call for pricing.",
  },
  {
    question: "Can I sell my calls to RingOnDemand?",
    answer:
      "Yes. Call publishers can join our vetted publisher network. We buy calls in nine verticals across legal and insurance, and you know the payout for each vertical before you send a single call. Book a publisher intro call on our Partners page.",
  },
];

/** The Partners page: questions call publishers ask. */
export const PUBLISHER_FAQ: readonly FaqItem[] = [
  {
    question: "What calls does RingOnDemand buy?",
    answer:
      "Calls in nine verticals. In legal: motor vehicle accidents, workers' compensation, lemon law, medical malpractice and pre-settlement funding. In insurance: final expense, auto, home and Medicare.",
  },
  {
    question: "How do I become a RingOnDemand publisher?",
    answer:
      "Book a publisher intro call. We agree on verticals, states and payouts, we vet your sources, and then you start sending calls.",
  },
  {
    question: "How much do you pay per call?",
    answer:
      "Payouts are set per vertical. You know the payout for each vertical before you send a single call, and you get paid for every call that qualifies.",
  },
  {
    question: "What makes a call qualify?",
    answer:
      "Every vertical has one written intake script. A call qualifies when the caller passes its qualifying questions, the same questions callers from our own ads answer. You know what qualifies before a call goes live.",
  },
  {
    question: "Do you buy MVA calls?",
    answer:
      "Yes. Motor vehicle accident calls are one of the nine verticals we buy. MVA callers answer the same questions as callers from our own ads: when the accident happened, fault, treatment, the at-fault driver's insurance and the statute of limitations.",
  },
  {
    question: "Do you vet publishers?",
    answer: "Yes. Every publisher in our network is vetted before calls go live.",
  },
  {
    question: "Who buys the calls?",
    answer:
      "Personal injury law firms, pre-settlement funding companies and insurance agencies across the US. Your calls go to the largest insurance and legal organizations in the US.",
  },
];

/** The Compliance page: questions buyers' compliance and procurement teams
 * ask. Every answer is a practice RingOnDemand confirmed. */
export const COMPLIANCE_FAQ: readonly FaqItem[] = [
  {
    question: "Do callers agree to be transferred?",
    answer: "Yes. Every caller agrees to be connected before we transfer them to your team.",
  },
  {
    question: "Are calls recorded?",
    answer: "Yes. Every intake call is recorded, and you can get the recording of any call we send you.",
  },
  {
    question: "Do you capture consent certificates?",
    answer:
      "Yes. We capture third-party consent certificates, so there is an independent record of how and when consent was given.",
  },
  {
    question: "Do you scrub against the Do Not Call Registry?",
    answer: "Yes. Numbers are scrubbed against the National Do Not Call Registry before we call or text them.",
  },
  {
    question: "How do you control publisher traffic?",
    answer:
      "Every publisher is vetted before calls go live, and every publisher's ads and creatives are approved before they run. Robocalls, incentivized traffic and misleading ads are not allowed. We audit sources and can remove a publisher at any time, and every caller goes through the same intake script as callers from our own ads.",
  },
  {
    question: "Do Medicare calls follow CMS rules?",
    answer:
      "Yes. Medicare calls follow CMS rules for third-party marketing organizations, including the required disclaimer, and recordings are kept for 10 years.",
  },
  {
    question: "Who approves legal ads in California?",
    answer: "Your firm. In California, ads run under your firm's name and you approve every creative before it runs.",
  },
  {
    question: "How is caller data protected?",
    answer:
      "Caller data is encrypted, and only staff who need it can see it. Our Privacy Policy explains what we collect and who we share it with.",
  },
];
