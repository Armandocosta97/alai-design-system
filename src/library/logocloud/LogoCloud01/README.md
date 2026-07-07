# LogoCloud01

Understated six-logo trust section for the ALai design system.

## Purpose

Placed immediately after the Hero, LogoCloud01 establishes trust before the
visitor starts reading the main content. Six logos, a short header, nothing
else — muted by default, never competing visually with the Hero or the
sections that follow.

## Includes

- Small centered eyebrow / title / subtitle header
- Exactly six logo slots (image, company name)
- Two layout variants sharing the same content
- Size, color treatment, and caption style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `logo1AssetId` / `logo1CompanyName`
- `logo2AssetId` / `logo2CompanyName`
- `logo3AssetId` / `logo3CompanyName`
- `logo4AssetId` / `logo4CompanyName`
- `logo5AssetId` / `logo5CompanyName`
- `logo6AssetId` / `logo6CompanyName`

No links, ratings, testimonials, or descriptions — the content model is
exactly six logo/name pairs.

## Variants

- **Grid** (default) — six logos in a balanced, evenly-gapped grid.
- **Centered Strip** — all six logos in a single centered row, wrapping
  only at narrower widths.

Both variants render the identical content model — only arrangement
changes. Compactness is a Style Control (`logoSize`), not a variant.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `logoTreatment` — `color` or `grayscale` (default). Grayscale keeps the
  section as quiet as possible; hovering an item briefly reveals full
  color/opacity as a subtle interaction cue.
- `showCaptions` — shows the company name as visible text beneath each
  logo. The company name always drives the image's alt text regardless of
  this control.
- `logoSize` — `small`, `medium`, or `large`. A single shared size applied
  uniformly to all six logos.

## Assets

Each logo resolves through the existing Asset Manager `assets` array via
`logoNAssetId`, exactly like Hero01's `heroImageAssetId` and Testimonials01's
avatar props. If an id doesn't resolve to a project asset, that slot
renders a clean placeholder (a bordered box with the company's initial)
instead of disappearing — so the layout never shifts while a project is
still being assembled.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Each logo's alt text is derived automatically as `"{companyName} logo"` —
  never a separate authored prop, so it can never drift out of sync with
  the company name.
- The placeholder box carries `role="img"` and the same derived
  `aria-label`, so unresolved logos are still announced meaningfully.
- Logos render as a semantic list (six `<li>` items), giving screen reader
  users an accurate sense of the section's shape.
- Nothing in this component is interactive — no links, no buttons — so
  keyboard users tab straight through with zero stops, which is correct
  given the "no links" content-model rule.

## Developer Notes

- Follows the same variant-resolver, style-merge, and image-asset
  resolution patterns as Hero01/Testimonials01.
- Hover and grayscale transitions use `var(--transition-base)`, the
  existing design token — no new timing values introduced.
- No images, uploads, or Theme/Design Token changes required beyond the
  existing image-prop flow.
