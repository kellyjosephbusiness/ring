# iclosed.io — page brief

Source: https://www.iclosed.io/ (Framer site, inspected 2026-10-19).
Clone route: `/` → `src/app/page.tsx`.

## Route map

| Source | Local | Notes |
|---|---|---|
| `https://www.iclosed.io/` | `/` | Full homepage |
| `./product/*`, `./results`, `./pricing`, `./mcp`, legal pages, etc. | not cloned | Links point to `https://www.iclosed.io/...` via `sourceUrl()` in `src/components/sites/iclosed/links.ts` |
| `app.iclosed.io` (signup / login), `docs.iclosed.io`, `university.iclosed.io` | external | Kept as-is |

## Page-wide facts

- Width: container max 1440px; most sections use a 40px gutter (20px under 810px).
- Framer breakpoints: desktop ≥1280, tablet 810–1279, phone <810. The section
  stylesheets use container queries `(max-width: 1279px)` / `(max-width: 809px)`
  on each section's outer element (`container-type: inline-size`).
- Fonts (actual source files in `public/sites/iclosed/fonts/`, loaded with
  `next/font/local` in `src/app/layout.tsx`):
  - Poppins 500/600 (headings) → `var(--ic-font-display)`
  - Inter 400/500/600/700 (body/UI) → `var(--ic-font-body)`
  - Inter Display 500 (announcement bar only) → `var(--ic-font-inter-display)`
- Core colors: heading `#0a0d14`, text `#111928`, accent `#1c64f2`, CTA `#0236c2`,
  hairline `#e5e7eb`, dark band `rgb(2, 4, 24)`.
- CTA shadow: `inset 0 1px 4px 1px rgba(255,255,255,.24), inset 0 4px 16px 1px rgba(255,255,255,.2)`.
- Rails: fixed 1px `#e5e7eb` vertical lines at the edges of `min(1440px, 100% - 64px)`,
  hidden at ≤810px (`src/components/sites/iclosed/rails/`).
- Header: fixed, 104px tall (40px black announcement bar + 64px nav). Visible at
  scrollY≈0; slides up (`translateY(-110px)`, opacity 0) once the page is scrolled
  and returns only near the top. The source hero starts at y=81 (1px modal
  anchor + 80px frame padding; 100px below 810px), reproduced by `main`'s
  padding in `src/app/page.module.css` — section components add no top offset.
- Cookie consent (Cookiebot), analytics, Hyros and FirstPromoter scripts are
  third-party and intentionally not cloned.
- A/B test: the source randomly serves a variant hero ("Triple your leads
  using", inbox visual) plus an extra "Book a 5-min demo" scheduler embed. The
  statically served control variant ("Triple your leads with", scheduler
  visual) is the one cloned.

## Section order (source `[data-framer-name="Main"]` children)

| # | Slug / local component | Source CSS prefix | Source module (behavior evidence) | Height @1440 |
|---|---|---|---|---|
| 0 | `hero` | `icnhi` | (static) | 708 |
| 1 | `testimonial-strip` | `icts` | Use_Cases | 185 |
| 2 | `logo-wall` | `iclw` | Case_Study_Rail | 88 |
| 3 | `product-tabs` | `icpt*` | ProductTabs | 999 |
| 4 | `creator-wall` | `iccw` | CreatorWall | 1117 |
| 5 | `pipeline` | `icft` | Case_Study_Rail | 1085 |
| 6 | `product-bento` | `icpb` | Use_Cases | 1389 |
| 7 | `unified-inbox` | `icui*` | Use_Cases | 970 |
| 8 | `use-cases` | `icuc` | Use_Cases | 786 |
| 9 | `integrations` | `icint` | Use_Cases | 899 |
| 10 | `api` | `icapi` | API | 493 |
| 11 | `testimonials` | `ictt` | Testomials | 784 |
| 12 | `case-studies` | `iccs` | Case_Study_Rail | 938 |
| 13 | `final-cta` | `icuic` | FinalCTA | 492 |
| — | footer | Framer native | — | 509 |

## Evidence files

- `sections/NN-slug.html` — rendered source markup (1440px) with every embedded
  data-URI and CDN image rewritten to local `/sites/iclosed/images/<hash>.<ext>`.
- `sections/NN-slug.css` — the section's own stylesheet as the source ships it
  (readable, commented; includes the shared `--band` token preamble).
- `nav-computed.jsonl`, `footer-computed.jsonl` — computed geometry/type for the
  Framer-native header and footer at 1440px.
- `asset-manifest.json` — local image → source origin.
- Screenshots: `docs/design-references/iclosed/{desktop-1440,mobile-390}/`.

## File ownership

`src/components/sites/iclosed/<slug>/<slug>.tsx` (+ `<slug>.module.css`, optional
data/sub-component files in the same folder). Shared: `links.ts`, `rails/`.
Header/footer: `site-header/`, `site-footer/`.

Every section root carries `data-section="<slug>"`.
