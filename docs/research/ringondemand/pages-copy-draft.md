# Site pages: draft copy for review

**Status: DRAFT.** The legal copy doc ([`website-copy.md`](./website-copy.md))
now lives on the MVA page (`/legal/mva`), which also carries its pricing and
FAQ. The homepage, the insurance pages and the other pages below reuse those
facts wherever they apply. Anything not in that doc was drafted for these pages
and needs a yes, an edit or a cut before launch.

House rules followed:
- No new prices, stats, quotes or guarantees.
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
   - It books the *Publisher Intro Call* (set in `links.ts`,
     `BOOKING_EVENTS.publisher`).
5. **About page.** It says nothing about the company beyond the copy doc (no
   founding story, team or location). Add those if you want them.
6. **Results page.**
   - It shows the copy doc's 3 stats.
   - Its hero reads "What personal injury firms see when they work with us".
   - Its pricing card repeats the MVA prices.
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
   - The insurance pages book the *Ring On Demand - Partner Discovery Call*.
   - The homepage, About, Results and the legal pages still book the
     *Personal Injury Discovery Call*.
   - If the homepage should book a general event, add it to `BOOKING_EVENTS`
     in `links.ts`, then pass it to `FinalCta` as `booking`.
10. **Homepage (general).**
    - The headline is "Inbound Calls for 8- and 9-Figure Companies".
      "Inbound Calls for Enterprise Companies" is the alternative (`hero/hero.tsx`).
    - Check the hero, industry cards, steps and "Who this is for" copy below.
    - It keeps the copy doc's proof line, scoped as "Over 1,500 signed
      retainers delivered to personal injury firms last quarter".
    - It shows the 3 stats under "What personal injury firms see".

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
  - Contact, Privacy Policy and Terms of Service are still placeholders.
  - Tagline: "Screened inbound calls and live transfers."
- **Every "Book a call"** scrolls to the closing section, which holds the
  iClosed booking widget.

## / — Homepage (general)

Same sections and styling as before, with general copy. The MVA-only sections
(the screening list, pricing and FAQ) moved to `/legal/mva`.

- Eyebrow: Inbound calls and live transfers
- Headline: Inbound Calls for / **8- and 9-Figure Companies**
- Sub: You set the criteria. We run the ads, screen every caller, and send the
  ones who qualify to your team as inbound calls or live transfers.
- Under the button: Tell us your criteria. We tell you what we can deliver.
- Proof line: Over 1,500 signed retainers delivered to personal injury firms
  last quarter
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
- **What personal injury firms see**: the copy doc's 3 stats.
- Closing section: Tell us your criteria and **we will tell you what we can
  deliver**. Book a call with our team. We show you the ads, the intake
  questions, and how calls reach your team, and you decide.

## /legal — Legal (index)

- Eyebrow: Legal
- Headline: Live Transfers and Signed Cases / **for Law Firms**
- Sub: You give us your case criteria. We run the ads, screen every caller, and
  send you a live transfer or a signed retainer. Pick your practice area to see
  what we check.
- Under the button: The call is with a licensed attorney on our team, not a
  sales rep.
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

1. Hero
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
- Headline: Signed MVA Cases and Live Transfers / **for Personal Injury Firms**
- Sub: copy doc subheadline
- Menu line: Signed MVA cases and live transfers for personal injury firms.
- Steps and checks: copy doc
- Offers: the copy doc's two cards with $550 / $2,500 and their guarantees
- Also shows the 3 Results stats

### Workers' compensation (`/legal/workers-comp`)

- Eyebrow: Legal : Workers' compensation
- Headline: Workers' Comp Cases, / **Screened to Your Criteria**
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
- Headline: Lemon Law Cases, / **Screened to Your Criteria**
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
- Headline: Medical Malpractice Cases, / **Screened to Your Criteria**
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
- Headline: Pre-Settlement Funding Calls, / **Screened to Your Criteria**
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
1. Hero
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

- Headline: Final Expense Calls, / **Screened to Your Criteria**
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

- Headline: Auto Insurance Calls, / **Screened to Your Criteria**
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

- Headline: Home Insurance Calls, / **Screened to Your Criteria**
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

- Headline: Medicare Calls, / **Screened to Your Criteria**
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

- Eyebrow: Results
- Headline: Signed Retainers, Sign Rates / **and Speed to First Transfer**
- Sub: What personal injury firms see when they work with us, and how you see
  every transfer we send.
- Sections from the copy doc:
  - What firms see (3 stats)
  - You see every transfer
  - Transfers can start within 24 hours
- Cards:
  - Pricing — **Flat prices for MVA**: Live transfers at $550 per transfer.
    Pre-signed cases at $2,500 per signed case. You pay per transfer or per
    signed case and nothing else. → See pricing
  - Book a call — **See the ads and the intake script**: On the call you will
    see our ads, our landing pages, our intake questions, and the names of
    firms we work with. → Book a call. Beside the button: "With a licensed
    attorney on our team".

## /partners — Partners (call publishers)

- Eyebrow: Partners : Call publishers
- Headline: Join Our Vetted / **Publisher Network**
- Sub: We buy legal and insurance calls from a vetted publisher network. Every
  call you send goes through the same intake script as the calls from our own
  ads.
- Button: Talk to our team
- **How it works for publishers**
  - Tell us about your traffic: The verticals, states and sources you run calls
    from.
  - We vet your sources: Every publisher in our network is vetted before calls
    go live.
  - Calls run through our intake script: Every caller answers the same
    qualifying questions as the callers from our own ads.
- **Calls we buy** (eyebrow: Verticals): We take calls in every vertical we
  run. In legal: motor vehicle accidents, workers' compensation, lemon law,
  medical malpractice and pre-settlement funding. In insurance: final expense,
  auto, home and Medicare.
- Where the calls come from (copy doc)
- Closing section, booking the **Publisher Intro Call**:
  - Heading: Want to send us calls? **Tell us about your traffic**
  - Body: Book a call with our team. Tell us the verticals, states and sources
    you run, and we will tell you where your calls fit.

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
- Then the attorney call card and the closing section.
