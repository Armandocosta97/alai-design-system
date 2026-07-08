# Pricing01

Three-plan pricing section for the ALai design system.

## Purpose

Placed after Features or Services, Pricing01 answers the visitor's next
question — what does this cost? It renders exactly three plans side by
side, with one optional highlighted/recommended plan, and works equally
well for SaaS tiers, agency retainers, or freelance service packages.

## Includes

- Centered or left-aligned eyebrow / title / subtitle header
- Exactly three plan cards (name, price, billing label, description, up to
  five features, call-to-action)
- An optional highlighted plan with a "Most Popular" badge and accent
  border/CTA treatment
- Three layout variants sharing the same content
- Card style, divider, surface, and spacing style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `plan1Name` / `plan1Price` / `plan1BillingLabel` / `plan1Description` /
  `plan1CtaLabel` / `plan1CtaHref` / `plan1Feature1`–`plan1Feature5` /
  `plan1Highlighted`
- `plan2Name` / `plan2Price` / `plan2BillingLabel` / `plan2Description` /
  `plan2CtaLabel` / `plan2CtaHref` / `plan2Feature1`–`plan2Feature5` /
  `plan2Highlighted`
- `plan3Name` / `plan3Price` / `plan3BillingLabel` / `plan3Description` /
  `plan3CtaLabel` / `plan3CtaHref` / `plan3Feature1`–`plan3Feature5` /
  `plan3Highlighted`

`billingLabel`, `description`, each `featureN` line, and the CTA
label/link are all optional per plan:

- An empty `billingLabel` omits the label next to the price entirely.
- An empty `description` omits the description paragraph entirely.
- Empty feature lines are filtered out before rendering, so a plan with
  three real features and two blank ones renders a clean three-item list,
  never blank list items.
- A plan only renders a call-to-action `<a>` when `ctaLabel` is non-empty —
  it never renders an anchor with empty, meaningless link text.

`planNHighlighted` is a boolean. Exactly zero or one plan is expected to be
highlighted at a time; the component does not enforce this, so setting more
than one is visually supported but not the intended use.

## Variants

- **Cards** (default) — three equal-width cards in a row.
- **Featured Center** — the highlighted plan (whichever one has
  `planNHighlighted: true`, regardless of column position) is lifted and
  scaled up for emphasis. If no plan is highlighted, all three render
  identically to Cards.
- **Compact** — tighter padding and a smaller type scale, for denser
  layouts or secondary pricing sections further down a page.

All three variants render the identical content model — only arrangement
and emphasis change. DOM order always matches the order plans were
authored in; highlighting never reorders cards.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `alignment` — `center` (default) or `left`. Controls the eyebrow/title/
  subtitle header only; the plan grid itself is always evenly distributed.
- `surface` — toggles a faint full-bleed background tint behind the whole
  section, independent of variant or card style.
- `showDivider` — toggles thin hairline dividers between plan cards on
  desktop; collapses to top-border-per-row on narrow widths as cards stack.
- `cardStyle` — `flat`, `bordered` (default), or `elevated`. Controls each
  plan card's border/shadow treatment. The highlighted plan always keeps
  its accent border regardless of this setting, since that signal is
  independent of the base card style.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Section title is an `<h2>`; each plan name is an `<h3>` — a single
  consistent heading level under the section.
- Features render as a real `<ul>`/`<li>` list, not styled `<div>`s, so
  screen readers announce the item count.
- The "Most Popular" badge is plain visible text, not `aria-hidden` — the
  recommendation is meaningful information, not decoration.
- Call-to-action links are real `<a>` elements; there are no nested
  interactive elements and no clickable `<div>`s anywhere in the markup.
- DOM order always matches visual order in every variant, including
  Featured Center, where emphasis is applied with `transform: scale()`
  rather than reordering.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Header01/Features01/CTA01/Services01/Contact01.
- Plan data is flattened into individual props (`plan1Name`, `plan2Name`,
  ...) rather than an array prop, matching how every other multi-item
  component in this library (Services01, Testimonials01, FAQ01) exposes
  editable content to the Builder's props editor.
- No images, uploads, or Theme/Design Token changes required.
