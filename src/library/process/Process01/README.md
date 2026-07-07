# Process01

Calm, editorial process section for the ALai design system.

## Purpose

Placed after Services/Features/Stats and before Testimonials/FAQ/Contact,
Process01 answers "how does this actually work?" — four steps, explained
plainly, in order. No timeline graphic, no connecting arrows, no
flowchart. The sequence is communicated by number and document order
alone, which is calmer and more premium than any decorative alternative.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly four steps (number, title, description)
- Three layout/emphasis variants sharing the same content
- Divider, step number treatment, and alignment style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `step1Number` / `step1Title` / `step1Description`
- `step2Number` / `step2Title` / `step2Description`
- `step3Number` / `step3Title` / `step3Description`
- `step4Number` / `step4Title` / `step4Description`

**`stepNumber` is always plain text.** It is never validated, parsed, or
auto-generated. The recommended format is:

```
01
02
03
04
```

This is guidance only — any text (`"Step One"`, `"First"`, `"1"`) is
equally valid and renders exactly as entered.

No icons, images, CTAs, or links — exactly four number/title/description
triples.

## Variants

- **Horizontal Steps** (default) — four equal columns in a single row.
- **Vertical Steps** — the same four steps stacked in a single column.
- **Editorial** — the first step rendered larger and more prominent, the
  remaining three following beneath at their normal size.

All three variants render the identical content model — only arrangement
and emphasis change. **The first step is always the featured one in
Editorial.** There is no `featuredStepIndex` prop — to feature a different
step, reorder which step sits in the first slot.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `showDivider` — hairline divider between steps (vertical rule between
  columns in Horizontal, horizontal rule between rows in Vertical).
- `stepNumberStyle` — `badge` (tinted background), `plain` (default, bare
  text), or `outline` (bordered).
- `alignment` — `center` (default) or `left`. Only affects Horizontal and
  Vertical; Editorial already establishes its own emphasis-driven layout,
  so this control is a documented no-op there.

No per-step style overrides — one shared number treatment, divider, and
alignment setting governs all four steps.

## Assets

None. No images, icons, illustrations, or Asset Manager dependency — pure
typography.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- The four steps render inside a semantic `<ol>`, not a `<ul>` — sequence
  genuinely matters here, so screen readers announce each step's position
  ("1 of 4," "2 of 4," etc.) automatically.
- The section title is the only `<h2>`. Each step's title is an `<h3>` —
  a real heading. `stepNumber` and `stepDescription` are plain text, never
  headings.
- Reading order always matches DOM order in every variant, including
  Editorial, where one step is visually larger but never reordered.
- Descriptions never truncate or clip at any width.

## Developer Notes

- Follows the same variant-resolver, style-merge, and
  `showDivider`/`alignment` patterns as Services01/Contact01/FAQ01/
  Stats01.
- **Static presentation only.** No progress bars, animations, interactive
  timelines, expanding steps, or collapsible content. An interactive
  timeline, if ever requested, belongs to a separate future component.
- Hover feedback is intentionally motion-free: only a subtle color
  transition on the step number and a slight opacity change on the
  description, both using `var(--transition-base)`. No transforms, no
  scaling, no movement — disabled entirely under
  `prefers-reduced-motion: reduce`.
