# RingOnDemand site

The homepage (`/`) uses the iclosed.io clone's design (see
`docs/research/iclosed/`) with general copy covering legal and insurance. The
legal copy doc ([`website-copy.md`](./website-copy.md)) lives on `/legal/mva`,
which also carries its pricing and FAQ.

The interior pages reuse the layouts of iclosed.io's `/product/analytics` and
`/results` pages (see `docs/research/iclosed/LAYOUTS_analytics_results.md`).
Everything outside the copy doc is a **draft for review**:
[`pages-copy-draft.md`](./pages-copy-draft.md).

## Routes

| Route | Page |
|---|---|
| `/` | Homepage (general: inbound calls and live transfers) |
| `/legal` | Practice-area index |
| `/legal/mva`, `/legal/workers-comp`, `/legal/lemon-law`, `/legal/medical-malpractice`, `/legal/pre-settlement-funding` | One page per practice area (`legal/practice-areas.ts`); MVA adds the copy doc's results, pricing and FAQ |
| `/insurance` | Insurance index |
| `/insurance/final-expense`, `/insurance/auto`, `/insurance/home`, `/insurance/medicare` | One page per line (`insurance/insurance-lines.ts`) |
| `/results` | General results: proof figures, reporting, getting started |
| `/partners` | Call publishers |
| `/about` | Company |
| `/blog`, `/blog/<slug>` | Blog index and posts (`src/content/blog/`) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt` | Generated for search engines and AI assistants |

Components live in `src/components/sites/ringondemand/`. There is one folder
per homepage section. The other folders:
- `page-kit/` — the interior-page blocks
- `page-shell/` — header, rails and footer
- `legal/` — practice-area data and pages
- `insurance/` — insurance-line data and pages
- `shared/` — shared bits
- `faq/faq-content.ts` — every page's FAQ copy
- `blog/` — the blog's post page, related posts and styles
- `seo/` — site facts, page metadata, structured data, share images, llms.txt

Every destination is in `links.ts`.

## SEO and AI search

Everything a search engine or answer engine (Google AI Overviews, ChatGPT,
Perplexity, Claude) reads is generated from the same data as the pages, so
it cannot drift from what visitors see.

- **Site facts:** `seo/site.ts` holds the production URL
  (`https://www.ringondemand.com`, or `NEXT_PUBLIC_SITE_URL`), the one-line
  company description and the topics we want to be known for. Canonical URLs,
  the sitemap and structured data all use it.
- **Page metadata:** every route calls `pageMetadata()` (`seo/page-metadata.ts`):
  title, description, canonical URL, Open Graph and a large X card.
- **Share images:** each route has an `opengraph-image.tsx` that renders its
  own headline on the closing band's navy (`seo/og-image.tsx`). They are built
  at build time. `seo/fonts/` holds TTF copies of Poppins and Inter because
  the image renderer cannot read WOFF2.
- **Structured data (JSON-LD):** Organization and WebSite on every page (root
  layout); Service with offers (and MVA prices) on each practice-area and
  insurance-line page; FAQPage wherever an FAQ shows; BreadcrumbList on
  interior pages; Blog and BlogPosting on the blog.
- **FAQs:** `faq/faq-content.ts`. The homepage, every practice area, every
  insurance line and Partners show an FAQ, and each FAQ publishes the same
  questions as FAQPage data. Practice-area and insurance-line checks questions
  are built from the page's own screening checklist.
- **Crawlers:** `app/robots.ts` allows everything and names the AI crawlers
  (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and
  others). `app/sitemap.ts` lists every page and post.
- **llms.txt:** `/llms.txt` is a short index of the site for AI assistants;
  `/llms-full.txt` holds every page's facts, checks, offers and FAQs, and
  every blog post in full (`seo/llms.ts`).

### Adding a blog post

1. Write `src/content/blog/<slug>.mdx`: no H1, open with a one-paragraph direct
   answer to the title's question, use question-style `##` headings, and link
   to the service pages it supports (`/legal/mva`, `/partners`, …).
2. Add an entry to `POSTS` in `src/content/blog/posts.ts`: title,
   description, topic (`mva`, `legal`, `insurance` or `publishers`), dates,
   reading time, 3 to 5 key takeaways, 3 or 4 FAQ questions and the related
   service pages.

The post then appears on `/blog`, the homepage (if it is among the 3 newest),
the related reading on its topic's pages, the sitemap, `llms.txt` and its own
share image. Only state facts already on the site: no new prices, stats,
guarantees or client names.

### After launch

- Verify the domain in **Google Search Console** and **Bing Webmaster Tools**
  (Bing feeds ChatGPT search and Copilot) and submit `/sitemap.xml` in both.
- Test a few pages in Google's Rich Results Test and the Schema Markup
  Validator.
- Add the company's LinkedIn and other official profiles to the Organization
  data as `sameAs` (`seo/schema.ts`) once there are URLs to add.
- Replace the placeholder Contact, Privacy Policy and Terms of Service links:
  answer engines and Google weigh those trust pages.
- Keep publishing: one MVA post a month keeps the topic fresh.

## Logo

`public/sites/ringondemand/brand/` holds the logo as vector SVGs, traced from
the supplied PNG (kept in [`brand/logo-original-white.png`](./brand/)). The
call bars and "On" are the site's accent blue (`#1c64f2`, the blue of the
headline accents) in both files, in place of the original purple/blue
gradients.

| File | Used for |
|---|---|
| `logo-black.svg` | Header. Black "Ring" and "Demand", for light backgrounds |
| `logo-white.svg` | Footer. White lettering, as in the original, for dark backgrounds |

The favicon (`meta/favicon.svg`) is the blue call bars on their own. Both
logos render through `shared/logo.tsx`.

## Booking

Every "Book a call" button scrolls to the closing section (`#book-a-call`),
which every page ends with. That section holds the iClosed inline widget
(`final-cta/booking-widget.tsx`) for one of the events in `BOOKING_EVENTS`
(`links.ts`):

| Event | Pages |
|---|---|
| Ring On Demand - Personal Injury Discovery Call (`discovery`) | `/legal` and the practice-area pages |
| Ring On Demand - Partner Discovery Call (`partner`) | Homepage, Results, About, `/insurance` and the insurance line pages |
| Publisher Intro Call (`publisher`) | `/partners` |

- **Loading.** iClosed's `widget.js` loads once. It picks up new widgets after
  client-side navigation. The widget mounts when the section is within 1200px
  of the viewport.
- **Fallback.** A "Calendar not loading?" link opens the booking page directly.
- **Local testing.** iClosed refuses to be framed when the embedding page is
  `localhost`: it sends `frame-ancestors 'none'` when `referrerUrl` is
  localhost. On a real domain it sends `frame-ancestors *`. Local tests rewrite
  that parameter.

## Open items before launch

- **Draft copy:** review [`pages-copy-draft.md`](./pages-copy-draft.md),
  especially its "Please confirm" list.
- **Proof figures:** the 2,000 / 1,000 / 5,000 figures and the "largest
  insurance and legal organizations" line were supplied by RingOnDemand
  (`shared/proof-list.tsx`). `/legal/mva` still shows the copy doc's
  "1,500+ last quarter" stat beside them.
- **Footer pages:** Contact, Privacy Policy and Terms of Service use
  `PENDING_PAGES` placeholders (`#`).
- **SEO and blog draft copy:** the new FAQs, meta titles and blog posts are
  drafts for review; see "SEO, FAQs and blog" in
  [`pages-copy-draft.md`](./pages-copy-draft.md).
- **Notes in the copy doc still apply:**
  - No client quotes until one is approved in writing.
  - Cut the pilot line under Pricing if the pilot isn't running.
  - Prices stay flat ($550 / $2,500) unless volume tiers move to a pricing
    page.

Illustrations (hero transfer card, setup card, transfer record, call-source
diagram, intake-script card, call agenda) restate facts from the copy only: no
names, numbers or dates.
