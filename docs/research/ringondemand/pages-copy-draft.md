# Site pages: draft copy for review

**Status: DRAFT.** The legal copy doc ([`website-copy.md`](./website-copy.md))
now lives on the MVA page (`/legal/mva`), which also carries its pricing and
FAQ. The homepage, the insurance pages and the other pages below reuse those
facts wherever they apply. Anything not in that doc was drafted for these pages
and needs a yes, an edit or a cut before launch.

House rules followed:
- No new prices, quotes or guarantees, and no stats beyond the copy doc's and
  the proof figures RingOnDemand supplied (below).
- Only MVA shows prices ($550 / $2,500) and the MVA guarantees (guaranteed
  cost per signed case, 28-day replacement).
- The other practice areas and every insurance line say "Book a call for …
  pricing".
- No client names or testimonials.

Where the copy lives in code:
- Practice areas: `src/components/sites/ringondemand/legal/practice-areas.ts`
- Insurance lines: `src/components/sites/ringondemand/insurance/insurance-lines.ts`
  (closing-band copy in `insurance/insurance-cta.ts`)
- Homepage sections: `hero/`, `industries/`, `how-it-works/` and `audience/`
  in `src/components/sites/ringondemand/`
- Legal and insurance indexes, Results, Partners and About: the route files in
  `src/app/`
- Shared blocks: `src/components/sites/ringondemand/legal/attorney-call.tsx`
  (the attorney call card)
- Proof lines: `src/components/sites/ringondemand/shared/proof-list.tsx`
  (`PROOF`); the general stats strip: `results/results.tsx` (`GENERAL_STATS`)
- The general closing section (homepage, Results, About):
  `final-cta/general-cta.ts`

## Proof lines

Supplied by RingOnDemand. Each shows behind a blue verified badge under the
hero button.

| Line | Shown on |
|---|---|
| Over **2,000 signed retainers** delivered | Homepage, Results, `/legal` and the practice-area pages |
| Over **1,000 live transfers** delivered | `/legal` and the practice-area pages |
| Over **5,000 live transfers** delivered | Homepage, Results, Partners, `/insurance` and the insurance line pages |
| Trusted by the **largest insurance and legal organizations** in the US | Results (also the homepage stats heading) |
| Trusted by the **largest insurance organizations** in the US | `/insurance` and the insurance line pages |
| Your calls go to the **largest insurance and legal organizations** in the US | Partners |

## Please confirm

1. **Offers per practice area.**
   - Workers' comp, lemon law and medical malpractice offer both live
     transfers and pre-signed cases.
   - Pre-settlement funding offers live transfers only, sold to funding
     companies, not law firms.
2. **Pricing model outside MVA.** These pages say "You pay per transfer or per
   signed case" (funding: "You pay per transfer"), without "and nothing else".
3. **Screening checks (drafted).** The checklists for workers' comp, lemon law,
   medical malpractice and funding are typical criteria, written as checks the
   buyer can set. Edit them to match the intake scripts you actually run.
4. **Partners page.**
   - The page claims publishers are vetted before calls go live, and that you
     buy calls in every legal and insurance vertical listed.
   - It promises strong payouts, payouts agreed per vertical before the first
     call, and payment for every call that qualifies. It names no rates or
     payment terms; add them if you want them on the page.
   - It books the *Publisher Intro Call* (set in `links.ts`,
     `BOOKING_EVENTS.publisher`).
5. **About page.** It says nothing about the company beyond the copy doc (no
   founding story, team or location). Add those if you want them.
6. **Results page.**
   - It is now general (legal and insurance), with the supplied figures.
   - The MVA prices are no longer on it; they stay on `/legal/mva`.
   - The copy doc's note still applies: no client quotes until one is approved
     in writing.
7. **Insurance offers.** Every insurance line offers inbound calls and live
   transfers, sold to agencies with licensed agents, priced per call ("You pay
   per call"). No prices are shown.
8. **Insurance screening checks (drafted).** The final expense, auto, home and
   Medicare checklists are typical criteria. Edit them to match the intake
   scripts you run. **Medicare:** have the page reviewed against the CMS
   marketing rules you work under before launch.
9. **Booking.**
   - The homepage, Results, About and the insurance pages book the
     *Ring On Demand - Partner Discovery Call*.
   - `/legal` and the practice-area pages book the *Personal Injury Discovery
     Call*.
   - Partners books the *Publisher Intro Call*.
10. **Homepage (general).**
    - The headline is "Inbound Calls for Enterprise Companies"
      (`hero/hero.tsx`).
    - Check the hero, industry cards, steps and "Who this is for" copy below.
11. **MVA stats.** `/legal/mva` still shows the copy doc's 3 stats, including
    "1,500+ signed retainers delivered last quarter", under a hero that says
    "Over 2,000 signed retainers delivered". Keep both, or switch the MVA
    page to the general figures.
12. **Search titles.** The homepage's browser and search title is now "Pay-Per-Call
    Live Transfers for Legal and Insurance | RingOnDemand". The visible
    headline is unchanged ("Inbound Calls for Enterprise Companies"). Other
    pages' titles and descriptions now lead with the terms buyers search for;
    see "SEO, FAQs and blog" below.
13. **New FAQs.** Every practice area, insurance line, the homepage and
    Partners now have an FAQ (below). MVA keeps the copy doc's 7 questions and
    adds 5. The homepage FAQ names no prices (only MVA shows prices).
14. **Blog.** Seven posts restate the copy doc's facts, including the MVA
    prices, the guarantees and the 25 to 35% sign rate. If a price or
    guarantee changes, update the posts too (`src/content/blog/`).
15. **Blog byline.** Posts are by Sam Hosey, Director of Marketing, linked to
    their LinkedIn profile.
16. **Policies.** The Privacy Policy and Terms of Service are drafts; have
    them reviewed before relying on them. See "Contact, team and policies"
    below.

## Navigation

- **Header:** Legal ▾ (the 5 practice areas + All practice areas) · Insurance ▾
  (the 4 lines + All insurance lines) · Results · Partners · About · **Book a
  call**.
  - Pricing left the header: the only prices are MVA's, on `/legal/mva#pricing`.
- **Footer:** Legal · Insurance · Company (Results, About, Partners, Contact) ·
  Policies.
  - The Offers column is gone (offers are on each vertical's page).
  - The privacy and terms column is now "Policies", so it isn't confused with
    the Legal column.
  - Contact (`/contact`), Privacy Policy (`/privacy`) and Terms of Service
    (`/terms`) are live pages. Company also links to the company LinkedIn
    page.
  - Tagline: "Screened inbound calls and live transfers."
- **Every "Book a call"** scrolls to the closing section, which holds the
  iClosed booking widget.
- **Blog** sits in the header after Partners and in the footer's Company
  column.

## / — Homepage (general)

Same sections and styling as before, with general copy. The MVA-only sections
(the screening list, pricing and FAQ) moved to `/legal/mva`.

- Eyebrow: Inbound calls and live transfers
- Headline: Inbound Calls for / **Enterprise Companies**
- Sub: You set the criteria. We run the ads, screen every caller, and send the
  ones who qualify to your team as inbound calls or live transfers.
- Under the button: Tell us your criteria. We tell you what we can deliver.
- Proof lines: Over 2,000 signed retainers delivered · Over 5,000 live
  transfers delivered
- Hero card checks:
  - Inside the states you work in
  - Fits your criteria
  - Answered every qualifying question
  - Wants to talk now

  Then "Transferring to your team".
- **Calls for legal and insurance**, two cards:
  - **Legal**: Live transfers and signed retainers. For law firms and funding
    companies. Every caller answers your qualifying questions before they
    reach your intake team, or we sign them to your retainer. Chips: the 5
    practice areas. → See legal
  - **Insurance**: Inbound calls and live transfers. For insurance agencies.
    Every caller is screened against your criteria before they reach your
    licensed agents. Chips: the 4 lines. → See insurance
- **How it works**
  1. You set the criteria: The case types or lines of insurance you want, the
     questions every caller must pass, and the states you work in. We write
     your criteria into the intake script.
  2. We run the ads and screen every caller: copy doc
  3. Your team gets the call: Inbound calls and live transfers go to your line
     during the hours you set. Law firms can also take pre-signed cases, with
     the completed intake and the signed retainer.
- Copy doc sections kept as they were:
  - Transfers can start within 24 hours
  - You see every transfer
  - Where the calls come from
- **Who this is for**
  - Law firms (Legal): Live transfers to your intake team, or signed retainers
    if you want us to do the whole intake. Motor vehicle accidents, workers'
    comp, lemon law, medical malpractice and pre-settlement funding.
  - Insurance agencies (Insurance): Inbound calls and live transfers to your
    licensed agents, screened against your criteria. Final expense, auto, home
    and Medicare.
  - Call publishers (Partners): Send us your calls. Every caller goes through
    the same intake script as the callers from our own ads.
- **Trusted by the largest insurance and legal organizations in the US**:
  2,000+ Signed retainers delivered · 5,000+ Live transfers delivered ·
  24 hours From signed order to first transfer (copy doc).
- Closing section, booking the **Partner Discovery Call**: Tell us your
  criteria and **we will tell you what we can deliver**. Book a call with our
  team. We show you the ads, the intake questions, and how calls reach your
  team, and you decide.

## /legal — Legal (index)

- Eyebrow: Legal
- Headline: Live Transfers and Signed Cases / **for Law Firms**
- Sub: You give us your case criteria. We run the ads, screen every caller, and
  send you a live transfer or a signed retainer. Pick your practice area to see
  what we check.
- Under the button: The call is with a licensed attorney on our team, not a
  sales rep.
- Proof lines: Over 2,000 signed retainers delivered · Over 1,000 live
  transfers delivered
- **Pick your practice area** (eyebrow: Practice areas)
  - Intro: The same process in every area: your criteria in our intake script,
    our ads, and a live transfer or a signed retainer when a caller qualifies.
  - One card per practice area (its one-line summary, below) and "See how it
    works".
  - Last card: Another practice area? Tell us your case criteria and we will
    tell you what we can deliver. → Book a call
- **How it works**, 3 steps from the copy doc. Step 1 is generalised: "The case
  types, dates and states you take. We write your criteria into the intake
  script."
- Then: Where the calls come from (copy doc), the attorney call card, and the
  closing section.

## /legal/[area] — practice-area pages

Every practice-area page has the same sections, in this order:

1. Hero, with the legal proof lines (2,000 signed retainers, 1,000 live
   transfers)
2. How it works (3 steps)
3. "What we check before a caller reaches you", with the screening checklist
   and the copy doc's line "If a caller fails one of your questions, we do not
   transfer them and you do not pay for them."
4. Where the calls come from
5. Offers
6. Attorney call card:
   - Heading: "Talk to a licensed attorney, not a sales rep"
   - Body: copy doc FAQ, "Who do I talk to on the call?"
7. Booking section

Offer card labels come from the copy doc's "Who this is for":
- Live transfers: For firms with their own intake team
- Pre-signed cases: For firms that want signed cases only
- Funding: For funding companies

### Motor vehicle accidents (`/legal/mva`)

Copy doc throughout.
- Eyebrow: Legal : Motor vehicle accidents
- Headline: MVA Cases / **That Close Like Crazy**
- Sub: copy doc subheadline
- Menu line: Signed MVA cases and live transfers for personal injury firms.
- Steps and checks: copy doc
- Offers: the copy doc's two cards with $550 / $2,500 and their guarantees
- Also shows the 3 Results stats

### Workers' compensation (`/legal/workers-comp`)

- Eyebrow: Legal : Workers' compensation
- Headline: Workers' Comp Cases / **That Close Like Crazy**
- Sub: You give us your case criteria. We run the ads, screen every injured
  worker who calls, and send you a live transfer or a signed retainer. You pay
  per transfer or per signed case.
- Menu line: Calls from injured workers, screened to your case criteria.
- Step 1: Where and when the injury happened, whether it was reported,
  treatment, and the states you take cases in. We write your criteria into the
  intake script.
- Checks:
  - The caller was hurt on the job.
  - The caller is an employee, not an independent contractor.
  - The injury was reported to the employer inside the window you pick.
  - The caller has already seen a doctor or received treatment.
  - The claim is inside the filing deadline for your state.
  - Anything else you add to the script.
- Offers (no prices):
  - Live transfers: Our intake team screens every caller against your criteria
    and transfers them to your phone while they are still on the line.
  - Pre-signed cases: We run the ads, do the full intake, and sign the claimant
    to your retainer. You pay for signed retainers only.
  - Under the heading: Book a call for workers' compensation pricing.

### Lemon law (`/legal/lemon-law`)

- Eyebrow: Legal : Lemon law
- Headline: Lemon Law Cases / **That Close Like Crazy**
- Sub: …screen every vehicle owner who calls… (otherwise as workers' comp)
- Menu line: Calls from vehicle owners with repeat defects, screened to your
  criteria.
- Step 1: Vehicle age and mileage, warranty coverage, repair attempts, and the
  states you take cases in. We write your criteria into the intake script.
- Checks:
  - The vehicle was bought or leased in a state you take cases in.
  - The defect is covered by the manufacturer's warranty.
  - The vehicle has been in for repair on the same problem more than once.
  - The caller has the repair orders.
  - The vehicle's age and mileage are inside your limits.
  - Anything else you add to the script.
- Offers: as workers' comp

### Medical malpractice (`/legal/medical-malpractice`)

- Eyebrow: Legal : Medical malpractice
- Headline: Medical Malpractice Cases / **That Close Like Crazy**
- Sub: as the MVA sub without "and nothing else"
- Menu line: Calls screened for the injury, the provider and the timing you
  take.
- Step 1: Type of injury, type of provider, when the treatment happened, and
  the states you take cases in. We write your criteria into the intake script.
- Checks:
  - The caller or a family member was harmed during medical care.
  - The injury is one of the types you take.
  - The treatment happened inside the window you pick.
  - The caller can name the provider and the facility.
  - The claim is inside the statute of limitations.
  - Anything else you add to the script.
- Offers: as workers' comp

### Pre-settlement funding (`/legal/pre-settlement-funding`)

- Eyebrow: Legal : Pre-settlement funding
- Headline: Pre-Settlement Funding Calls / **That Convert Like Crazy**
- Sub: You give us your funding criteria. We run the ads, screen every caller,
  and transfer the ones who qualify to your team while they are still on the
  line. You pay per transfer.
- Menu line: Live transfers of plaintiffs with pending cases, for funding
  companies.
- Steps:
  - You set the criteria: Case type, attorney representation, where the case
    stands, and the states you fund in. We write your criteria into the intake
    script.
  - We run the ads and screen every caller: copy doc
  - You get the live transfer: Callers who pass your questions go to your line
    during the hours you set.
- Checks:
  - The caller has a pending personal injury case.
  - The caller is represented by an attorney.
  - The case type is one you fund.
  - The caller lives in a state you fund in.
  - The caller agrees to let you contact their attorney.
  - Anything else you add to the script.
- Offers: Live transfers to your team, one card (live transfers text as
  above). Under the heading: Book a call for pre-settlement funding pricing.

## /insurance — Insurance (index)

- Eyebrow: Insurance
- Headline: Inbound Calls and Live Transfers / **for Insurance Agencies**
- Sub: You give us your criteria. We run the ads, screen every caller, and send
  the ones who qualify to your licensed agents as inbound calls or live
  transfers. Pick your line to see what we check.
- Proof lines: Over 5,000 live transfers delivered · Trusted by the largest
  insurance organizations in the US
- **Pick your line of insurance** (eyebrow: Lines of insurance)
  - Intro: The same process for every line: your criteria in our intake
    script, our ads, and an inbound call or live transfer to your agents when
    a caller qualifies.
  - One card per line (its menu line, below).
  - Last card: Another line of insurance? Tell us who your agents want to talk
    to and we will tell you what we can deliver. → Book a call
- **How it works**
  1. You set the criteria: The callers your agents want, by line, state and the
     questions you ask. We write your criteria into the intake script.
  2. We run the ads and screen every caller: copy doc
  3. Your agents get the call: Inbound calls and live transfers go to your
     agents' line during the hours you set.
- Then: Where the calls come from, and the closing section: Tell us your
  criteria and **we will tell you what we can deliver**. Book a call with our
  team. We show you the ads and the intake questions, and you decide.

## /insurance/[line] — insurance line pages

Same page kit and order as the practice-area pages:
1. Hero, with the insurance proof lines (5,000 live transfers, largest
   insurance organizations)
2. How it works: step 1 is the line's own criteria; steps 2 and 3 are as on
   the index
3. "What we check before a caller reaches you", with the checklist and the
   line "If a caller fails one of your questions, we do not send them to you
   and you do not pay for them."
4. Where the calls come from
5. **2 ways to get calls from us**: "Book a call for … pricing" and two cards.
   - **Inbound calls** (Straight to your agents): Callers who match your
     criteria ring straight through to your agents' line, from our own ads and
     our vetted publisher network.
   - **Live transfers** (Screened by our intake team): Our intake team screens
     every caller against your criteria and transfers them to your agents while
     they are still on the line.
6. Booking section (Partner Discovery Call)

No attorney call card.

Every hero sub reads: You give us your criteria. We run the ads, screen every
caller (auto: "every driver who calls"; home: "every homeowner who calls"), and
send the ones who qualify to your licensed agents as inbound calls or live
transfers. You pay per call.

### Final expense (`/insurance/final-expense`)

- Headline: Final Expense Calls / **That Convert Like Crazy**
- Menu line: Callers shopping for final expense coverage, sent to your agents.
- Step 1: Age range, coverage amount, how the caller will pay premiums, and
  the states your agents are licensed in.
- Checks:
  - The caller is inside the age range you write.
  - The caller lives in a state your agents are licensed in.
  - The coverage amount they want is one you offer.
  - The caller has a way to pay premiums, such as a bank account or card.
  - Anything else you add to the script.

### Auto insurance (`/insurance/auto`)

- Headline: Auto Insurance Calls / **That Convert Like Crazy**
- Menu line: Drivers looking for a quote, screened by state, vehicle and
  coverage.
- Step 1: States and ZIP codes, vehicles and drivers, current coverage, and
  driving history.
- Checks:
  - The caller lives in a state or ZIP code you write.
  - The caller has a valid driver's license.
  - The number of vehicles and drivers is inside your limits.
  - The caller is currently insured, or not, as you choose.
  - The driving history fits the rules you set.
  - Anything else you add to the script.

### Home insurance (`/insurance/home`)

- Headline: Home Insurance Calls / **That Convert Like Crazy**
- Menu line: Homeowners looking for coverage, screened by property and
  location.
- Step 1: Property type, ownership, location, and when the caller needs
  coverage.
- Checks:
  - The caller owns the home.
  - The property is in a state or ZIP code you write.
  - The property type is one you cover.
  - The caller needs coverage inside the window you pick.
  - Anything else you add to the script.

### Medicare (`/insurance/medicare`)

- Headline: Medicare Calls / **That Convert Like Crazy**
- Menu line: Medicare-eligible callers, screened by eligibility and location.
- Step 1: Eligibility, the plans your agents offer, the counties and states
  you cover, and the enrollment periods you work.
- Checks:
  - The caller is eligible for Medicare.
  - The caller lives in a county where your plans are offered.
  - The caller is calling during an enrollment period you work.
  - The caller wants to talk to a licensed agent now.
  - Anything else you add to the script.

## /results — Results

General, across legal and insurance.
- Eyebrow: Results
- Headline: Calls That Convert / **Across Legal and Insurance**
- Sub: Signed retainers for law firms, inbound calls and live transfers for law
  firms and insurance agencies, and a record of every call we send.
- Proof lines: Over 2,000 signed retainers delivered · Over 5,000 live
  transfers delivered · Trusted by the largest insurance and legal
  organizations in the US
- **What our buyers see**: the homepage's 3 stats (2,000+, 5,000+, 24 hours)
- Sections from the copy doc:
  - You see every transfer
  - Transfers can start within 24 hours
- **See what we deliver in your industry** (eyebrow: Industries), two cards:
  - Legal — **Signed retainers and live transfers**: For law firms and funding
    companies: the 5 practice areas. → See legal
  - Insurance — **Inbound calls and live transfers**: For insurance agencies:
    final expense, auto, home and Medicare. → See insurance
- Closing section: as the homepage (Partner Discovery Call)

## /partners — Partners (call publishers)

Built to get a publisher to the booking form fast: every button reads "Book an
intro call" and scrolls to it. The "Where the calls come from" section is gone
from this page.

- Eyebrow: Partners : Call publishers
- Headline: Join Our Vetted / **Publisher Network**
- Sub: Send us your legal and insurance calls and get paid well for every one
  that qualifies. Clear criteria, steady demand, and one short call to get
  started.
- Button: Book an intro call
- Proof lines: Over 5,000 live transfers delivered · Your calls go to the
  largest insurance and legal organizations in the US
- **Why publishers work with us**
  - Strong payouts: We pay well for calls that qualify, and you know the payout
    for each vertical before you send a single call.
  - Steady demand: We buy in nine verticals across legal and insurance, for
    buyers across the US, so there is room for your volume.
  - Clear criteria: Every vertical has one written intake script. You know
    what qualifies before a call goes live.
  - Simple setup: One intro call to agree on verticals, states and payouts.
    Then you start sending calls.
- **How it works for publishers**
  - Tell us about your traffic: The verticals, states and sources you run calls
    from.
  - We vet your sources: Every publisher in our network is vetted before calls
    go live, and you get your payouts up front.
  - Send calls, get paid: Every caller answers the same qualifying questions as
    the callers from our own ads. You get paid for every call that qualifies.
- **Calls we buy** (eyebrow: Verticals): We take calls in every vertical we
  run. In legal: motor vehicle accidents, workers' compensation, lemon law,
  medical malpractice and pre-settlement funding. In insurance: final expense,
  auto, home and Medicare.
- Closing section, booking the **Publisher Intro Call**:
  - Heading: Ready to send us calls? **Book a publisher intro call**
  - Body: Tell us the verticals, states and sources you run. We will tell you
    where your calls fit and what they pay.

## /about — About

- Eyebrow: About
- Headline: We Run the Ads and / **Screen Every Caller**
- Sub: RingOnDemand delivers inbound calls and live transfers to insurance
  agencies, and live transfers and signed retainers to law firms. You give us
  your criteria. We run the ads, screen every caller, and send you only the
  ones who pass.
- **From the ad to your intake line** (eyebrow: What we do)
  - We run the ads: Our own ads plus a vetted publisher network. In
    California, ads run under your firm's name and you approve every creative
    before it runs.
  - We screen every caller: Every caller answers your qualifying questions
    before anything reaches you.
  - We deliver the case: Live transfers go to your intake line during the
    hours you set. Pre-signed cases come to you with the completed intake and
    the signed retainer.
- **How we work with firms** (eyebrow: How we work), all from the copy doc's
  FAQ and reporting copy:
  - Calls, not form leads: Calls and live transfers convert better in legal,
    so that is all we sell.
  - No volume commitment: You buy an order, we deliver it, and you reorder
    when you want more.
  - You see every transfer: Every transfer is posted to you with the caller's
    intake answers.
  - Any U.S. state: In California we advertise under your firm's name and you
    approve every creative first.
- Then the attorney call card and the closing section (as the homepage,
  booking the Partner Discovery Call).

## SEO, FAQs and blog

Draft copy added for search engines and AI answers. Every FAQ is shown on
the page and also published as FAQPage structured data. FAQ copy lives in
`src/components/sites/ringondemand/faq/faq-content.ts` and, for each practice
area, in `legal/practice-areas.ts` (`faq`).

### Search titles and descriptions

| Page | Title |
|---|---|
| `/` | Pay-Per-Call Live Transfers for Legal and Insurance \| RingOnDemand |
| `/legal` | Personal Injury Live Transfers and Signed Cases \| RingOnDemand |
| `/legal/mva` | MVA Live Transfers and Signed Car Accident Cases \| RingOnDemand |
| `/insurance` | Insurance Live Transfers and Inbound Calls for Agencies \| RingOnDemand |
| `/insurance/<line>` | *Line* Live Transfers and Inbound Calls \| RingOnDemand |
| `/partners` | Pay-Per-Call Publisher Network: Sell Legal and Insurance Calls \| RingOnDemand |
| `/results` | Results: Signed Retainers and Live Transfers Delivered \| RingOnDemand |
| `/about` | About RingOnDemand: Pay-Per-Call for Legal and Insurance |
| `/blog` | Blog: MVA Live Transfers, Pay-Per-Call and Selling Calls \| RingOnDemand |

The MVA description: "Motor vehicle accident live transfers at $550 and
pre-signed MVA cases at $2,500 for personal injury firms. Screened to your
case criteria. Transfers start within 24 hours."

### FAQs

- **Homepage, "Questions buyers ask us" (10):** what RingOnDemand does, what a
  live transfer is, what a pre-signed case is, the verticals, no web form
  leads, where calls come from, how fast calls start, no volume commitment,
  pricing ("MVA prices are on our MVA page; book a call for the rest"), and
  whether publishers can sell us calls.
- **MVA (12):** five new questions (what an MVA live transfer is, what we
  check, what MVA transfers and signed cases cost, how many transfers sign,
  live transfers or pre-signed cases), then the copy doc's 7.
- **Other practice areas (9):** what a live transfer is in that area, what we
  check (built from the page's checklist), "Book a call for … pricing", then
  the copy doc's questions minus the 28-day replacement. Funding companies get
  their own wording for "what counts as a transfer" and "which states".
- **Insurance lines (7):** what a live transfer is, inbound call vs. live
  transfer, what we check (from the checklist), "You pay per call. Book a call
  for … pricing", where calls come from, no volume commitment, how fast calls
  start.
- **Partners, "Questions publishers ask us" (7):** which calls we buy, how to
  become a publisher, payouts (set per vertical, known before the first call),
  what makes a call qualify, whether we buy MVA calls, publisher vetting, and
  who buys the calls.

### Blog posts (`src/content/blog/`)

All published 2026-10-21, by RingOnDemand.

| Post | Topic | Books |
|---|---|---|
| What Is an MVA Live Transfer? A Guide for Personal Injury Firms | MVA | Personal Injury Discovery Call |
| MVA Live Transfers vs. Pre-Signed Cases: Which Should Your Firm Buy? | MVA | Personal Injury Discovery Call |
| How to Screen Motor Vehicle Accident Callers Before They Reach Intake | MVA | Personal Injury Discovery Call |
| How to Start Receiving MVA Live Transfers Within 24 Hours | MVA | Personal Injury Discovery Call |
| Pay-Per-Call vs. Web Form Leads for Personal Injury Firms | Legal | Personal Injury Discovery Call |
| How to Sell Legal and Insurance Calls: A Guide for Pay-Per-Call Publishers | Publishers | Publisher Intro Call |
| Inbound Calls vs. Live Transfers for Insurance Agencies | Insurance | Partner Discovery Call |

Every post opens with a direct answer, then key takeaways, question-style
sections, an FAQ, related service pages and a booking card. Beyond the copy
doc they add only general explanation (why each MVA screening question
matters, how to compare cost per signed case, what to bring to a publisher
intro call), with no new numbers.

## Contact, team and policies

### /contact — Contact

- Eyebrow: Contact
- Headline: Talk to / **RingOnDemand**
- Sub: The fastest way to reach us is a short call. Pick the call that fits you
  and choose a time on the calendar.
- **Pick the call that fits you** (eyebrow: Book a call), each card opening its
  iClosed booking page:
  - Law firms and funding companies: Talk to a licensed attorney on our team
    about live transfers and signed cases. (Personal Injury Discovery Call)
  - Insurance agencies and other buyers: We show you the ads and the intake
    questions, and you decide. (Partner Discovery Call)
  - Call publishers: Agree on verticals, states and payouts, then start sending
    calls. (Publisher Intro Call)
- The team block (below), then the closing section (Partner Discovery Call).
- No email, phone or address yet: add them when you have the ones to publish.

### Team (Contact and About)

**The people behind RingOnDemand** (eyebrow: Team). "Find us and the team on
LinkedIn." Three cards, each linking to LinkedIn: RingOnDemand (Our company
page), Kelly Joseph (Co-owner), Sam Hosey (Director of Marketing).

### /privacy and /terms

Drafts in `src/content/legal/`, dated October 21, 2026.

- **Privacy Policy** covers the site and people who call our ads: what the
  booking calendar (iClosed) and hosting (Vercel) collect, that the site runs
  no analytics or advertising cookies, that a qualified caller's contact
  details and intake answers go to the buyer they are transferred to, service
  providers, legal and business-transfer disclosures, "We do not sell
  information about visitors to this site", rights requests through the
  Contact page, retention, security, children and changes.
- **Terms of Service** covers use of the site only: orders, prices, guarantees
  and payouts are set in a separate order or agreement; content is not legal
  advice and creates no attorney-client relationship; figures are past
  results; acceptable use; ownership of content; third-party links;
  disclaimers; a $100 liability cap; changes. No governing-law clause until
  you name the state.
