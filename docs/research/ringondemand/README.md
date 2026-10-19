# RingOnDemand homepage

The homepage (`/`) uses the iclosed.io clone's design (see
`docs/research/iclosed/`) with RingOnDemand's copy from
[`website-copy.md`](./website-copy.md), placed verbatim. The one change from
the doc: the hero headline is "Signed MVA Cases for Personal Injury Firms".

Components live in `src/components/sites/ringondemand/`, one folder per section
in the copy doc's order; shared bits are in `shared/` and every destination is
in `links.ts`.

## Open items before launch

- **Booking URL** — every "Book a call" uses `BOOK_CALL_URL` in `links.ts`. It
  points at the closing call-to-action section until the iClosed booking page
  URL is set (external URLs open in a new tab automatically).
- **Footer pages** — Contact, Publishers, Privacy Policy and Terms of Service
  use `PENDING_PAGES` placeholders (`#`).
- **Logo** — the header and footer use a "RingOnDemand" text wordmark and the
  favicon is a simple "R" monogram until brand files are supplied.
- **Notes in the copy doc** still apply: no client quotes until approved in
  writing; the pilot line under Pricing should be cut if the pilot isn't
  running; prices stay flat ($550 / $2,500) unless volume tiers move to a
  pricing page.

Illustrations (hero transfer card, setup card, transfer record, call-source
diagram) restate facts from the copy only — no names, numbers or dates.
