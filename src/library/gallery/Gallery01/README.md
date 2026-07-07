# Gallery01

Editorial six-image gallery for the ALai design system.

## Purpose

Placed after Hero/Services/Features/Stats and before
Testimonials/FAQ/Contact, Gallery01 lets the work speak for itself — six
images, composed with generous negative space, no captions, no links, no
filtering. It's a static presentation component, not an interactive
viewer.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly six images (asset, optional alt text)
- Three layout/emphasis variants sharing the same content
- Radius, gap, ratio, and border style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `image1AssetId` / `image1Alt`
- `image2AssetId` / `image2Alt`
- `image3AssetId` / `image3Alt`
- `image4AssetId` / `image4Alt`
- `image5AssetId` / `image5Alt`
- `image6AssetId` / `image6Alt`

`imageAlt` is optional. Leaving it empty renders the image as decorative
(`alt=""`) — appropriate when a photo carries no meaning beyond its visual
composition. No captions, descriptions, links, or categories — exactly six
image/alt pairs.

## Variants

- **Grid** — six images at a uniform aspect ratio, in an even 3×2 grid.
- **Editorial** — the same six images with intentionally varied
  proportions (some wider, some taller) for a magazine-style rhythm.
- **Featured** — the first image renders large, the other five smaller
  beneath it.

All three variants render the identical content model — only arrangement
and emphasis change. **The first image is always the featured one in the
Featured variant.** There is no `featuredImageIndex` prop — to feature a
different photo, reorder which image sits in the first slot.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `imageRadius` — corner rounding applied uniformly to all six images.
- `imageGap` — spacing between images.
- `imageRatio` — `square`, `portrait`, `landscape`, or `original` (the
  image's own intrinsic ratio, uncropped). Applies to Grid and to the five
  supporting images in Featured. Editorial's whole premise is intentionally
  varied proportions per position, so this control is a documented no-op
  there.
- `showBorder` — adds a subtle hairline border around each image. Off by
  default — no borders or shadows unless explicitly enabled.

No per-image style overrides — one shared radius/ratio/border setting
governs all six images.

## Assets

Each image resolves through the existing Asset Manager `assets` array via
`imageNAssetId`, exactly like Hero01/Testimonials01/LogoCloud01. If an id
doesn't resolve to a project asset, that slot renders a clean placeholder —
a muted box at the same aspect ratio, with a single subtle image glyph and
no placeholder text — so the layout never shifts while a project is still
being assembled.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- The six images render as a semantic list (`<ul>`/`<li>`), giving screen
  reader users an accurate sense of the section's shape.
- Real images use `imageAlt` when provided, or `alt=""` when left empty
  (decorative).
- Placeholders carry `role="img"` and `aria-label={imageAlt}` when alt text
  is provided, so the intended image is still announced before it's
  uploaded; when alt text is empty, the placeholder is `aria-hidden="true"`
  instead — the same decorative-vs-meaningful distinction applied
  consistently in both the resolved and unresolved case. The placeholder's
  glyph icon is always `aria-hidden`.
- Reading order always matches DOM order in every variant, including
  Editorial and Featured, where images are visually different sizes but
  never reordered.

## Developer Notes

- Follows the same variant-resolver, style-merge, and image-asset
  resolution patterns as Hero01/Testimonials01/LogoCloud01.
- **Static presentation only.** No lightbox, zoom, fullscreen viewer,
  lazy-loading, or image-optimization pipeline — images render exactly as
  the Asset Manager already serves them everywhere else. Any interactive
  viewer belongs to a future, distinct component.
- Hover feedback is intentionally minimal: a `scale(1.02)` transform using
  `var(--transition-base)`, disabled entirely under
  `prefers-reduced-motion: reduce`.
- `imageRatio` is a declarative CSS `aspect-ratio` value, not a cropping
  calculation.
