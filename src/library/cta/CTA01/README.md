# CTA01

Premium editorial closing call-to-action section for the ALai design system.

## Purpose

Placed as the last persuasive beat before the footer, CTA01 converts
attention into action after Features/Pricing/Testimonials have already made
the case. It carries less content and more weight per word than a hero:
an eyebrow, a confident title, a short subtitle, and two actions.

## Includes

- Centered eyebrow / title / subtitle content block
- Primary and secondary call-to-action buttons
- Optional background surface, independent of variant
- Three layout variants sharing the same content

## Props

- `eyebrow`
- `title`
- `subtitle`
- `primaryLabel` / `primaryHref`
- `secondaryLabel` / `secondaryHref`

`primaryHref` and `secondaryHref` should point to real URLs or in-page
anchors in production — they render as plain `<a>` elements, so an empty or
placeholder link will be a dead control for visitors.

The secondary button is omitted entirely (not just hidden) when
`secondaryLabel` is left empty, so a single-button CTA doesn't require its
own variant.

## Variants

- **Centered** (default) — everything centered, single column, no surface.
- **Boxed** — same content, inset into a bordered, surfaced card.
- **Split** — content aligned left, actions aligned right, on one row at
  desktop width; stacks vertically below 720px.

All three variants render the identical content model — only arrangement
changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `surface` — toggles an optional tinted/bordered background panel behind
  the content, independent of variant. Boxed already has this treatment
  structurally, so the control has no additional visible effect there.
- `alignment` — `center` (default) or `left`. Only affects Centered and
  Boxed; Split already fixes its own left-content/right-actions layout, so
  this control is a documented no-op on Split.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Primary and secondary actions are real `<a>` elements, since they are
  navigational rather than in-page controls.
- The secondary link is removed from the DOM (not just visually hidden)
  when unused, so screen readers never announce a dead control.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Header01/Features01.
- No images, icons, or Asset Manager dependency.
- Button styling stays local to CTA01 rather than becoming a shared
  primitive — revisit only once 3+ components need identical button
  treatment.
