# Hero02

Photographic, image-first hero for the ALai design system.

## Purpose

Hero02 sits at the very top of the page, directly after Header01 — the
photographic alternative to Hero01's classic, text-first SaaS/editorial
hero. Where Hero01 pairs its content with an abstract visual placeholder
panel, Hero02 is built entirely around one real photograph, making it the
stronger choice for hotels, restaurants, photographers, architects,
interior designers, artisans, and other visually-led businesses.

## Includes

- Eyebrow / `<h1>` title / subtitle / two CTAs
- Exactly one hero photograph
- Three layout variants sharing the same content
- Image radius, ratio, alignment, border, and surface style controls

## Props

- `eyebrow`
- `title` — rendered as the page's `<h1>`
- `subtitle`
- `primaryCtaText` / `primaryCtaHref`
- `secondaryCtaText` / `secondaryCtaHref` (optional — omitted entirely
  from the DOM when `secondaryCtaText` is empty, never rendered as an
  empty anchor)
- `heroImageAssetId` / `heroImageAlt` (alt text is optional — leaving it
  empty renders the image as decorative, `alt=""`)

No video, carousel, form, logo cloud, or second image — exactly one
photograph and the same content shape Hero01 already establishes.

## Variants

- **Split Image** (default) — text on one side, the photograph filling
  the other, side by side at desktop width.
- **Image First** — a compact text column beside a larger photograph,
  the image doing most of the visual work.
- **Editorial Overlay** — text sits directly over a full-bleed photograph,
  behind a scrim that exists purely to guarantee contrast.

All three variants render the identical content model — only arrangement
changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `imageRadius` — `small`, `medium` (default), `large`, or `full`.
  A documented no-op in Editorial Overlay, where the image is full-bleed
  and has no visible corner to round.
- `imageRatio` — `square`, `portrait`, `landscape` (default), or
  `original`. A documented no-op in Editorial Overlay, where the image
  fills the section rather than a fixed box.
- `contentAlignment` — `left` (default) or `center`. Meaningful in all
  three variants.
- `showImageBorder` — adds a subtle hairline border around the
  photograph. Off by default. A documented no-op in Editorial Overlay.
- `contentSurface` — adds an optional tinted background panel behind the
  text content block, clarifying that only the text block (not the image)
  receives this treatment. A documented no-op in Editorial Overlay, where
  the contrast scrim already exists structurally.

## Assets

The hero photograph resolves through the existing Asset Manager `assets`
array via `heroImageAssetId`, exactly like Hero01/Testimonials01/
LogoCloud01/Gallery01/Team01. If the id doesn't resolve to a project
asset, the component renders the same placeholder philosophy already
established by Gallery01: a muted background, a subtle local image glyph,
the correct aspect ratio, and no placeholder text — so the layout never
shifts while a project is still being assembled. This is a temporary
editing-time state, unlike Hero01's permanent, intentional visual panel.

## Accessibility

- `title` renders as the page's `<h1>` — Hero02 owns the page's primary
  heading, exactly as Hero01 does.
- `heroImageAlt` is authored, not derived, since a general photograph has
  no reliable field (like a name) to infer meaning from.
- **Text must never sit directly on an uncontrolled image area.** In
  Editorial Overlay, the scrim behind the text exists specifically to
  guarantee WCAG-compliant contrast against an arbitrary, unpredictable
  photograph — it cannot be disabled by any style control, and text color
  is forced to white in that variant regardless of the project's theme
  text color, since deferring to an arbitrary theme color would defeat the
  contrast guarantee. Readability always takes priority over matching the
  theme's aesthetics in this one, deliberate case.
- The secondary CTA is removed from the DOM entirely (not just visually
  hidden) when `secondaryCtaText` is empty, so keyboard and screen reader
  users never encounter a dead control.
- The unresolved-image placeholder carries `role="img"` and
  `aria-label={heroImageAlt}` when alt text is provided; when it's empty,
  the placeholder is `aria-hidden="true"` instead — the same logic already
  established by Gallery01.
- Reading order always matches DOM order in every variant.

## Developer Notes

- Follows the same variant-resolver, style-merge, and image-asset
  resolution patterns as Hero01/Gallery01/Team01.
- **Static hero component only.** No video, carousel, parallax, scroll
  animation, form capture, multiple-image gallery, or dynamic image
  optimization — any of these belongs to future framework work or a
  distinct future component.
- Hero02 is an entirely independent implementation from Hero01 — not a
  shared base or a variant of a common "Hero" component. Sharing
  infrastructure between exactly two components isn't warranted by this
  library's 3+-component threshold for extraction.
- The Editorial Overlay scrim is a `linear-gradient` used purely for text
  contrast, explicitly not the kind of decorative gradient this library's
  design direction otherwise avoids.
