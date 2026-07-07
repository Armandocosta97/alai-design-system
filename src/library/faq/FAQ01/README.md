# FAQ01

Calm editorial FAQ accordion for the ALai design system.

## Purpose

Placed near the end of the page — after Services/Features/Testimonials and
before Contact/CTA/Footer — FAQ01 removes the last few doubts before someone
reaches out or converts. Six questions, six answers, one quiet interaction:
click a question, see its answer. No support-portal styling, no loud
animation, no categories or search.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly six FAQ items (question, answer)
- A simple local accordion — only one answer open at a time
- Three layout variants sharing the same content

## Props

- `eyebrow`
- `title`
- `subtitle`
- `faq1Question` / `faq1Answer`
- `faq2Question` / `faq2Answer`
- `faq3Question` / `faq3Answer`
- `faq4Question` / `faq4Answer`
- `faq5Question` / `faq5Answer`
- `faq6Question` / `faq6Answer`

Answers may contain multiple paragraphs. Line breaks are preserved exactly
as entered — no HTML and no Markdown is parsed.

## Interaction

The accordion is local component state (`useState`), not project data —
opening or closing an answer never touches the Builder, the project, or an
export. Only one answer can be open at a time; opening one closes any
other. Which item is open on first render is controlled by an internal
`faq01DefaultOpenIndex` constant (default `0`; `-1` means every item starts
collapsed) — this is fixed component behavior, not a Style Control, so it
is not exposed in the Inspector.

## Variants

- **Centered** (default) — header and list centered, single column.
- **Split** — header aligned left, list aligned right, on one row at
  desktop width; stacks vertically below 720px.
- **Minimal List** — tighter row rhythm, the quietest possible treatment.

All three variants render the identical content model and interaction —
only arrangement changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `alignment` — `center` (default) or `left`. Only affects Centered and
  Minimal List; Split already fixes its own left-header/right-list layout,
  so this control is a documented no-op on Split.
- `showDivider` — toggles a hairline divider between FAQ rows.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Each question is a real `<button>` inside an `<h3>` — the standard
  disclosure pattern.
- Each button carries `aria-expanded` and `aria-controls`; each answer
  panel carries `role="region"` and `aria-labelledby` pointing back at its
  button.
- Fully keyboard operable — native `<button>` elements need no custom key
  handling.
- The reveal animation respects `prefers-reduced-motion: reduce` and is
  disabled entirely for users who request it.
- The chevron indicator is `aria-hidden`; state is always communicated via
  `aria-expanded`, never by the icon's rotation alone.
- Answers are never truncated or clipped once open.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Services01/Contact01.
- The accordion's open/closed state uses the same local `useState`
  approach Header01 already uses for its mobile menu toggle — not a new
  interaction paradigm for ALai, and invisible to Builder/project/export.
- Only one `openIndex: number` is tracked, not a boolean per item, since
  only one answer can ever be open at once.
- No images, icons requiring upload, or Asset Manager dependency — the
  chevron is a single local inline SVG.
