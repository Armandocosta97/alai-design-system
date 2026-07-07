# Features01

Editorial three-feature section for the ALai design system.

## Purpose

Placed after a Hero and before Pricing/Testimonials, Features01 turns a
product's claims into evidence — three concrete reasons to believe the Hero's
promise, each led by an icon, a short title, and a one- or two-sentence
explanation.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly three feature items (icon, title, description)
- Three layout variants sharing the same content
- Icon, container width, and card-border style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `feature1Icon` / `feature1Title` / `feature1Description`
- `feature2Icon` / `feature2Title` / `feature2Description`
- `feature3Icon` / `feature3Title` / `feature3Description`

Icon props accept one of: `bolt`, `shield`, `chart`, `layers`, `globe`,
`sparkles`, `lock`, `puzzle`.

## Variants

- **Grid** (default) — three-column card grid, icon above text.
- **Minimal** — same three items, plain stacked column, no card framing.
- **Icon Left** — same three items, icon beside text instead of above it.

All three variants render the identical content model — only arrangement
changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `iconStyle` — `tinted` (default), `outline`, or `solid` icon badge treatment.
- `cardBorder` — toggles the Grid variant's card border/shadow. Minimal and
  Icon Left are borderless by design regardless of this control, since their
  whole visual identity is the absence of card framing.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Icons are `aria-hidden` — meaning is always carried by the title and
  description text alone.
- Section title is an `<h2>`; each feature title is an `<h3>`.
- Content reflows at every width; nothing is truncated or clipped.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Header01/Hero01/Footer01.
- Icons are a local inline SVG map defined inside `Features01.tsx` — not a
  shared icon system, and not an Asset Manager dependency.
- No images, uploads, or Theme/Design Token changes required.
