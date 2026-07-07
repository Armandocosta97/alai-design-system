# Stats01

Restrained editorial statistics section for the ALai design system.

## Purpose

Placed after Hero/LogoCloud/Services/Features, Stats01 reinforces
credibility through numbers — four value/label/description facts,
presented with typographic confidence rather than charts, counters, or
decoration. The value is the visually dominant element; the description
stays quiet.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly four statistics (value, label, optional description)
- Three layout/emphasis variants sharing the same content
- Alignment and divider style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `stat1Value` / `stat1Label` / `stat1Description`
- `stat2Value` / `stat2Label` / `stat2Description`
- `stat3Value` / `stat3Label` / `stat3Description`
- `stat4Value` / `stat4Label` / `stat4Description`

**`value` is always plain text.** It is never parsed, formatted, validated
as a number, or animated. `"12+"`, `"98%"`, `"< 24h"`, `"250+"`, `"24/7"`,
and `"#1"` are all equally valid values and render exactly as entered.

Descriptions are optional — leaving one empty removes that statistic's
description element from the DOM entirely, rather than rendering an empty
paragraph.

## Variants

- **Four Column** (default) — all four statistics in a single row.
- **Two-by-Two Grid** — the same four statistics in a 2×2 grid.
- **Featured** — the first statistic rendered large and prominent, the
  other three smaller in a row beneath it.

All three variants render the identical content model — only arrangement
and emphasis change. Featured never hides or drops the other three
statistics; it only shifts visual weight toward the first one.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `alignment` — `center` (default) or `left`. Only affects Four Column and
  Two-by-Two Grid; Featured already establishes its own emphasis-driven
  layout, so this control is a documented no-op there.
- `showDivider` — toggles a hairline divider between statistics.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- The four statistics render as a semantic list (`<ul>`/`<li>`), giving
  screen reader users an accurate sense of the section's shape.
- The section title is the only `<h2>`. Each statistic's label is an
  `<h3>` — a real heading, giving each statistic its own place in the
  page's heading hierarchy. `value` and `description` are plain text.
- Reading order always matches DOM order in every variant, including
  Featured, where one item is visually larger but never reordered.
- Descriptions never truncate or clip at any width.

## Developer Notes

- Follows the same variant-resolver, style-merge, and
  `showDivider`/`alignment` patterns as Services01/Contact01/FAQ01.
- Featured's emphasis is pure CSS (`:first-child` sizing) — not a special
  prop, so which statistic reads as "featured" is just a matter of which
  prop group is entered first.
- No images, icons, illustrations, or Asset Manager dependency — pure
  typography.
