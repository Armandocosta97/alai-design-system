# Services01

Editorial six-service section for the ALai design system.

## Purpose

Placed immediately after the Hero, Services01 answers the visitor's first
real question — what does this business actually offer? It is deliberately
generic: icon, title, one-sentence description, six times over, with no
pricing and no CTA. That restraint is what makes it reusable across
agencies, restaurants, hotels, healthcare, consultants, artisans, and
photographers alike.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly six service items (icon, title, description)
- Three layout variants sharing the same content
- Icon style, divider, and spacing style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `service1Icon` / `service1Title` / `service1Description`
- `service2Icon` / `service2Title` / `service2Description`
- `service3Icon` / `service3Title` / `service3Description`
- `service4Icon` / `service4Title` / `service4Description`
- `service5Icon` / `service5Title` / `service5Description`
- `service6Icon` / `service6Title` / `service6Description`

Icon props accept one of: `compass`, `layers`, `tool`, `chart`, `shield`,
`spark`, `leaf`, `camera`.

## Variants

- **Grid** (default) — six items in a 3-column × 2-row grid.
- **List** — six items stacked in a single column, icon beside title.
- **Two Column** — six items in a 2-column × 3-row grid.

All three variants render the identical content model — only arrangement
changes. No variant treats any service as more important than another.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `iconStyle` — `line` (default), `tinted`, or `none`. `none` removes the
  icon entirely for a fully typographic look — the title alone still
  carries full meaning, so nothing is lost.
- `divider` — toggles thin hairline dividers between items (left borders
  between columns, top borders between rows). Dividers are a desktop
  refinement; below 640px they collapse to a single top-border-per-row
  rhythm as columns stack, so separation is always visible without ever
  requiring more DOM than the six items already provide.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Section title is an `<h2>`; each service title is an `<h3>` — a single
  consistent heading level under the section.
- Icons are always `aria-hidden` — meaning is carried by the title text
  alone, so `iconStyle: none` never removes information, only decoration.
- DOM order always matches visual order in every variant; nothing is
  reordered with CSS in a way that would desync reading order from layout.
- No truncation and no line-clamping — full descriptions always render.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Header01/Features01/CTA01/Testimonials01.
- Icons are a local inline SVG map defined inside `Services01.tsx` —
  intentionally independent from Features01's icon map, per the
  Simplicity Rule (not shared until 3+ components would benefit).
- No images, uploads, or Theme/Design Token changes required.
