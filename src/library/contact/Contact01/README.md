# Contact01

Premium editorial contact section for the ALai design system.

## Purpose

Placed near the end of the page — after Services/Features/Testimonials/FAQ
and before the closing CTA/Footer — Contact01 makes reaching the business
effortless. No persuasion left to do here: just business name, address,
phone, email, and opening hours, presented as the visual centerpiece of the
section rather than buried in a decorative card grid.

## Includes

- Centered eyebrow / title / subtitle header
- Business name, address, phone, email, and opening hours
- Real `tel:` and `mailto:` links
- Optional primary CTA and directions link
- Three layout variants sharing the same content

## Props

- `eyebrow`
- `title`
- `subtitle`
- `businessName`
- `address`
- `phone`
- `email`
- `openingHours`
- `ctaLabel` / `ctaHref` (optional — omitted entirely when `ctaLabel` is empty)
- `directionsLabel` / `directionsUrl` (optional — omitted entirely when
  `directionsLabel` is empty)

`directionsUrl` accepts any map provider's URL — Google Maps, Apple Maps,
OpenStreetMap, or otherwise. The component is provider-agnostic by design.

No form fields, no embedded map, no social links — those belong to future
components.

## Variants

- **Centered** (default) — header and details centered, single column.
- **Split** — header aligned left, details aligned right, on one row at
  desktop width; stacks vertically below 720px.
- **Information Card** — same centered header, details inset into a
  bordered, surfaced panel.

All three variants render the identical content model — only arrangement
changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `alignment` — `center` (default) or `left`. Only affects Centered and
  Information Card; Split already fixes its own left-header/right-details
  layout, so this control is a documented no-op on Split.
- `surface` — toggles an optional tinted/bordered background panel behind
  the details, independent of variant. Information Card already has this
  treatment structurally, so the control has no additional visible effect
  there.
- `dividerStyle` — `none` or `line` (default) hairline divider between
  detail rows (business name excluded).

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Business details are marked up as a semantic `<address>` element.
- Phone renders as a real `<a href="tel:...">` link; email renders as a
  real `<a href="mailto:...">` link — both fully keyboard-focusable.
- Detail labels ("Address", "Phone", "Email", "Opening Hours") are plain
  text, never fake headings.
- The optional CTA and directions links are removed from the DOM entirely
  (not just visually hidden) when their label is empty, so screen readers
  and keyboard tab order never encounter a dead control.
- No truncation — address and opening hours text wraps naturally at every
  width.

## Developer Notes

- Follows the same variant-resolver, style-merge, and optional-action
  patterns as CTA01 (`surface`, `alignment`, empty-label-omits-element)
  and Services01 (`dividerStyle`).
- `tel:`/`mailto:` hrefs are derived from `phone`/`email` at render time via
  a small local formatting helper — not a shared utility, since no other
  component currently needs it.
- No images, icons, or Asset Manager dependency.
