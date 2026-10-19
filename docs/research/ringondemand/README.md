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
| `/` | Homepage (legal and insurance) |
| `/legal` | Practice-area index |
| `/legal/mva`, `/legal/workers-comp`, `/legal/lemon-law`, `/legal/medical-malpractice`, `/legal/pre-settlement-funding` | One page per practice area (`legal/practice-areas.ts`); MVA adds the copy doc's results, pricing and FAQ |
| `/insurance` | Insurance index |
| `/insurance/final-expense`, `/insurance/auto`, `/insurance/home`, `/insurance/medicare` | One page per line (`insurance/insurance-lines.ts`) |
| `/results` | Stats, reporting, getting started |
| `/partners` | Call publishers |
| `/about` | Company |

Components live in `src/components/sites/ringondemand/`. There is one folder
per homepage section. The other folders:
- `page-kit/` — the interior-page blocks
- `page-shell/` — header, rails and footer
- `legal/` — practice-area data and pages
- `insurance/` — insurance-line data and pages
- `shared/` — shared bits

Every destination is in `links.ts`.

## Logo

`public/sites/ringondemand/brand/` holds the logo as vector SVGs, traced from
the supplied PNG (kept in [`brand/logo-original-white.png`](./brand/)). The
call bars and "On" are the site's button blue (`#0037c2`, the "Book a call"
button) in both files, in place of the original purple/blue gradients.

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
| Ring On Demand - Personal Injury Discovery Call (`discovery`) | Everything except `/partners` |
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
- **Insurance booking:** the homepage and insurance pages book the
  personal-injury discovery call until there is an insurance or general event.
  Add it to `BOOKING_EVENTS` and pass it to `FinalCta` as `booking`.
- **Footer pages:** Contact, Privacy Policy and Terms of Service use
  `PENDING_PAGES` placeholders (`#`).
- **Notes in the copy doc still apply:**
  - No client quotes until one is approved in writing.
  - Cut the pilot line under Pricing if the pilot isn't running.
  - Prices stay flat ($550 / $2,500) unless volume tiers move to a pricing
    page.

Illustrations (hero transfer card, setup card, transfer record, call-source
diagram, intake-script card, call agenda) restate facts from the copy only: no
names, numbers or dates.
