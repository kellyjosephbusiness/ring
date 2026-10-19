# iclosed.io `/product/analytics` and `/results` — layout brief

Inspected 2026-10-19 at 1440px and 390px. Screenshots:
`docs/design-references/iclosed/analytics/` and `docs/design-references/iclosed/results/`.

These two pages were **not** cloned pixel-for-pixel. As agreed, their layouts
were reused as the page kit for RingOnDemand's interior pages
(`src/components/sites/ringondemand/page-kit/`), with RingOnDemand copy and no
iClosed testimonials, dashboards, logos or video.

## Section order

`/product/analytics` (7447px tall at 1440):

| # | Source frame | Height | Reused as |
|---|---|---|---|
| 1 | Hero (eyebrow + 2-line Poppins headline, accent on line 2) | 392 | `PageHero` |
| 2 | Testimonial strip (avatar, name, quote, arrows) | 134 | not reused (no approved quotes) |
| 3 | Divider (hatched 40px band) | 40 | `Divider` |
| 4 | Video + 3 feature columns + centred CTA | 1069 | `FeatureColumns` (no video) |
| 5 | Widgets heading + dashboard card grid | 1485 | `SectionHeading` only |
| 6 | Testimonial cards | 1040 | not reused |
| 7 | Features heading | 324 | `SectionHeading` |
| 8 | Feature row, visual left / text right | 592 | `FeatureRow` |
| 9 | Feature row, text left / visual right | 632 | `FeatureRow reverse` |
| 10 | 1-1 Onboarding card (grey card, text + dark visual) | 572 | `SplitCard` |
| 11 | CTA 3 dark band | 465 | existing `FinalCta` (with booking widget) |

`/results` (14072px tall at 1440): hero (478), logo row, video tabs, two CTA
cards (365), testimonial walls and cards (~8,000px), "Trusted by" grid, G2
award row (346), onboarding card, CTA cards again, CTA 3 band. Reused: hero,
the two-card CTA row (`CtaCards`), the award-row split (`SplitCard` variant)
and the closing band. The testimonial walls were skipped by agreement.

## Measurements (1440)

- Hero: `padding: 180px 0 64px`; eyebrow Inter 12/20 w500, `letter-spacing:
  .72px`, uppercase, gradient text `linear-gradient(90deg, #020418, #0236c2)`;
  headline Poppins 42/56 w500 `-0.42px` `#020418`, second line accent gradient.
  Phone: 32/42, `-0.32px`; padding top 176.
- Divider: 40px tall, 1400px wide inside 20px gutters, background is a 40×40
  SVG of 45° `#EAEAEA` hairlines.
- Feature columns: three 400px cells starting at x=120 (1200px block), padding
  `32px 20px`, icon 42px, title Inter 20/32 w500 `#020418`, body Inter 18/24
  w400 `-0.18px` `#31353f`. Centred blue CTA 72px below. Phone: stacked.
- Section heading: eyebrow (as hero) + Inter 50/64 w400 `-0.5px` heading
  (accent gradient on the key words) + Inter 16/26 `#31353f` subcopy, max 600px.
- Feature row: `padding: 40px 0 72px` (or `72px 0 80px`), two 656px columns,
  48px gap, 40px gutters. Visual panel `#f9fafb`, 480px tall. Text: eyebrow,
  Inter 32/42 w500 `-0.32px` heading, Inter 16/26 body `#31353f` max 640px,
  blue CTA. Phone: heading 24/32, stacked, visual below.
- Onboarding card: `#f7f8fa` card 1360px wide with 48px padding, text left
  (heading 32/42, body 16/26 `#737373`), visual right.
- CTA cards (`/results`): two 556px cards, 20px gap, 20px padding. Left
  `#f8f9fa`; right `linear-gradient(#e6ebf6, #f8f9fa)` with a 1px blue edge.
  Eyebrow Inter 10/16.5 w500 `.6px`; heading Inter 32/42 w500; body Inter 15/20
  `#737373` with key phrases in `#31353f`.
- Buttons: blue `rgb(0,55,194)`, radius 8px, `padding: 14px 24px`, Inter 14/22,
  inset white glow shadow (same as the homepage CTA).
