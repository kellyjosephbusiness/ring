/**
 * llms.txt (https://llmstxt.org) and llms-full.txt: the site as plain
 * Markdown for AI assistants and answer engines. Built from the same data as
 * the pages (practice areas, insurance lines, FAQs, blog posts), so the two
 * never drift apart.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BLOG_TOPICS, POSTS, postHref } from "@/content/blog/posts";

import { HOME_FAQ, PUBLISHER_FAQ, insuranceLineFaq, practiceAreaFaq } from "../faq/faq-content";
import type { FaqItem } from "../faq/faq-list";
import { INSURANCE_LINES, STEP_DELIVER, STEP_SCREEN, insuranceLineHref } from "../insurance/insurance-lines";
import { PRACTICE_AREAS, practiceAreaHref } from "../legal/practice-areas";
import { ROUTES } from "../links";
import { GENERAL_STATS } from "../results/results";
import { SITE, TEAM, absoluteUrl } from "./site";

const KEY_FACTS = [
  "Offers: live transfers and pre-signed cases (signed retainers) for law firms; live transfers for pre-settlement funding companies; inbound calls and live transfers for insurance agencies.",
  "Legal verticals: motor vehicle accidents (MVA), workers' compensation, lemon law, medical malpractice, pre-settlement funding.",
  "Insurance verticals: final expense, auto, home, Medicare.",
  "MVA pricing: $550 per live transfer with a guaranteed cost per signed case; $2,500 per pre-signed case with a 28-day replacement on any case that falls out. Other verticals: book a call for pricing.",
  "Firms sign 25 to 35% of MVA live transfers, higher in California.",
  ...GENERAL_STATS.map((stat) => `${stat.figure} ${stat.label.toLowerCase()}.`),
  "Calls come from RingOnDemand's own ads plus a vetted publisher network; every caller goes through the same intake script built from the buyer's criteria.",
  "No web form leads. No recurring volume commitment: buyers place an order and reorder when they want more.",
  "Coverage: any U.S. state. In California, legal ads run under the firm's name and the firm approves every creative.",
  "Call publishers can join the vetted publisher network; payouts are agreed per vertical before the first call.",
  `Team: ${Object.values(TEAM)
    .map((member) => `${member.name}, ${member.role} (${member.linkedin})`)
    .join("; ")}. Company LinkedIn: ${SITE.profiles.linkedin}.`,
];

function link(title: string, path: string, note: string): string {
  return `- [${title}](${absoluteUrl(path)}): ${note}`;
}

/** The short index: who we are, key facts, and every page with one line. */
export function llmsIndex(): string {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "Key facts:",
    "",
    ...KEY_FACTS.map((fact) => `- ${fact}`),
    "",
    "## Legal: calls and cases for law firms",
    "",
    link("All practice areas", ROUTES.legal, "How live transfers and pre-signed cases work for law firms."),
    ...PRACTICE_AREAS.map((area) => link(area.name, practiceAreaHref(area), area.meta.description)),
    "",
    "## Insurance: calls for insurance agencies",
    "",
    link("All lines of insurance", ROUTES.insurance, "Inbound calls and live transfers for licensed agents."),
    ...INSURANCE_LINES.map((line) => link(line.name, insuranceLineHref(line), line.meta.description)),
    "",
    "## Call publishers",
    "",
    link(
      "Publisher network",
      ROUTES.partners,
      "Sell MVA, legal and insurance calls to RingOnDemand: verticals, qualification, payouts and how to join.",
    ),
    "",
    "## Company",
    "",
    link("Home", ROUTES.home, "What RingOnDemand does across legal and insurance."),
    link("Results", ROUTES.results, "Signed retainers and live transfers delivered."),
    link("About", ROUTES.about, "How RingOnDemand runs the ads and screens every caller, and the team."),
    link("Contact", ROUTES.contact, "Book a call: law firms and funding companies, insurance agencies, or call publishers."),
    link("Privacy Policy", ROUTES.privacy, "How RingOnDemand handles information."),
    link("Terms of Service", ROUTES.terms, "Terms for using the site."),
    "",
    "## Blog",
    "",
    ...POSTS.map((post) => link(post.title, postHref(post), post.description)),
    "",
    "## Optional",
    "",
    link("Full content", "/llms-full.txt", "Every page's facts, screening checks, offers and FAQs, and every blog post, in one file."),
    "",
  ].join("\n");
}

function faqSection(items: readonly FaqItem[]): string[] {
  return items.flatMap((item) => [`**${item.question}**`, "", item.answer, ""]);
}

/** Everything: each vertical's steps, checks, offers and FAQ, the publisher
 * FAQ, and the full text of every blog post. */
export async function llmsFull(): Promise<string> {
  const posts = await Promise.all(
    POSTS.map(async (post) => ({
      post,
      body: await readFile(join(process.cwd(), "src/content/blog", `${post.slug}.mdx`), "utf8"),
    })),
  );

  return [
    `# ${SITE.name}: full content`,
    "",
    `> ${SITE.description}`,
    "",
    `Source: ${absoluteUrl("/")}. ${SITE.legalName}.`,
    "",
    "## Key facts",
    "",
    ...KEY_FACTS.map((fact) => `- ${fact}`),
    "",
    "## Questions buyers ask",
    "",
    ...faqSection(HOME_FAQ),
    ...PRACTICE_AREAS.flatMap((area) => [
      `## ${area.name} (${absoluteUrl(practiceAreaHref(area))})`,
      "",
      area.hero.sub,
      "",
      "How it works:",
      "",
      ...area.steps.map((step, index) => `${index + 1}. ${step.title}. ${step.body}`),
      "",
      "What we check before a caller reaches you:",
      "",
      ...area.checks.map((check) => `- ${check}`),
      "",
      "Offers:",
      "",
      ...area.offers.map(
        (offer) => `- ${offer.title}${offer.price ? ` (${offer.price.amount} ${offer.price.unit})` : ""}: ${offer.body}`,
      ),
      "",
      ...faqSection(practiceAreaFaq(area)),
    ]),
    ...INSURANCE_LINES.flatMap((line) => [
      `## ${line.name} (${absoluteUrl(insuranceLineHref(line))})`,
      "",
      line.hero.sub,
      "",
      "How it works:",
      "",
      `1. You set the criteria. ${line.criteria}`,
      `2. ${STEP_SCREEN.title}. ${STEP_SCREEN.body}`,
      `3. ${STEP_DELIVER.title}. ${STEP_DELIVER.body}`,
      "",
      "What we check before a caller reaches your agents:",
      "",
      ...line.checks.map((check) => `- ${check}`),
      "",
      ...faqSection(insuranceLineFaq(line)),
    ]),
    `## Call publishers (${absoluteUrl(ROUTES.partners)})`,
    "",
    ...faqSection(PUBLISHER_FAQ),
    ...posts.flatMap(({ post, body }) => [
      `## Blog: ${post.title} (${absoluteUrl(postHref(post))})`,
      "",
      `By ${post.author.name}, ${post.author.role}. Topic: ${BLOG_TOPICS[post.topic].label}. Published ${post.publishedAt}. Updated ${post.updatedAt}.`,
      "",
      "Key takeaways:",
      "",
      ...post.takeaways.map((takeaway) => `- ${takeaway}`),
      "",
      // Post headings drop one level so they sit under this post's heading.
      body.trim().replace(/^(#{2,5}) /gm, "#$1 "),
      "",
      ...faqSection(post.faq),
    ]),
  ].join("\n");
}
