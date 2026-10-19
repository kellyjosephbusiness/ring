# New pages: draft copy for review

**Status: DRAFT.** The homepage copy comes from
[`website-copy.md`](./website-copy.md). The pages below reuse those facts
wherever they apply. Anything not in that doc was drafted for these pages and
needs a yes, an edit or a cut before launch.

House rules followed:
- No new prices, stats, quotes or guarantees.
- Only MVA shows prices ($550 / $2,500) and the MVA guarantees (guaranteed
  cost per signed case, 28-day replacement).
- The other practice areas say "Book a call for … pricing".
- No client names or testimonials.

Where the copy lives in code:
- Practice areas: `src/components/sites/ringondemand/legal/practice-areas.ts`
- Legal index, Results, Partners and About: the route files in `src/app/`
- Shared blocks: `src/components/sites/ringondemand/legal/attorney-call.tsx`
  (the attorney call card) and `legal/area-grid.tsx` (the practice-area grid)

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
     buy calls in all five practice areas.
   - Its buttons go to the same booking widget, the *Personal Injury Discovery
     Call*. A publisher-specific iClosed event or contact link should replace
     it. Set it in `src/app/partners/page.tsx`.
5. **About page.** It says nothing about the company beyond the copy doc (no
   founding story, team or location). Add those if you want them.
6. **Results page.**
   - It shows the copy doc's 3 stats.
   - Its hero reads "What personal injury firms see when they work with us".
   - Its pricing card repeats the MVA prices.
   - The copy doc's note still applies: no client quotes until one is approved
     in writing.

## Navigation

- **Header:** Legal ▾ (the 5 practice areas + All practice areas) · Pricing (→
  homepage pricing) · Results · Partners · About · **Book a call**.
  - The copy doc's Live Transfers and Pre-Signed Cases links moved to the
    footer.
- **Footer:** Practice areas · Offers · Company (Results, About, Partners,
  Contact) · Legal.
  - "Publishers" is now "Partners" → `/partners`.
  - Contact, Privacy Policy and Terms of Service are still placeholders.
- **Every "Book a call"** scrolls to the closing section, which holds the
  iClosed booking widget.

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
- Sub: We buy legal calls from a vetted publisher network. Every call you send
  goes through the same intake script as the calls from our own ads.
- Button: Talk to our team
- **How it works for publishers**
  - Tell us about your traffic: The practice areas, states and sources you run
    calls from.
  - We vet your sources: Every publisher in our network is vetted before calls
    go live.
  - Calls run through our intake script: Every caller answers the same
    qualifying questions as the callers from our own ads.
- **Calls we buy** (eyebrow: Practice areas): We take calls in every practice
  area we run for law firms and funding companies: motor vehicle accidents,
  workers' compensation, lemon law, medical malpractice and pre-settlement
  funding.
- Where the calls come from (copy doc)
- Closing section:
  - Heading: Want to send us calls? **Tell us about your traffic**
  - Body: Book a call with our team. Tell us the practice areas, states and
    sources you run, and we will tell you where your calls fit.

## /about — About

- Eyebrow: About
- Headline: We Run the Ads and Screen / **Every Caller for Law Firms**
- Sub: RingOnDemand delivers live transfers and signed retainers to law firms
  in any U.S. state. You give us your case criteria. We run the ads, screen
  every caller, and send you only the ones who pass.
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
