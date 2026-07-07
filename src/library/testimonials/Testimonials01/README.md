# Testimonials01

Editorial three-testimonial section for the ALai design system.

## Purpose

Placed after Features/Pricing and before the closing CTA/Footer,
Testimonials01 turns claims into proof — three real voices, each with a
quote and attribution. It deliberately avoids the card-heavy, star-rated
testimonial cliché: no stars, no scores, no decorative badges. Typography,
spacing, and editorial rhythm carry the design instead.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly three testimonials (avatar, name, role, company, quote)
- Semantic `<figure>` / `<blockquote>` / `<figcaption>` markup
- Three layout variants sharing the same content
- Density, avatar size, alignment, divider, and quote-mark style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `testimonial1AvatarAssetId` / `testimonial1Name` / `testimonial1Role` /
  `testimonial1Company` / `testimonial1Text`
- `testimonial2AvatarAssetId` / `testimonial2Name` / `testimonial2Role` /
  `testimonial2Company` / `testimonial2Text`
- `testimonial3AvatarAssetId` / `testimonial3Name` / `testimonial3Role` /
  `testimonial3Company` / `testimonial3Text`

No extra props beyond this content model.

## Variants

- **Row** (default) — three testimonials side by side.
- **Stacked** — single column, full-width items.
- **Featured** — the first testimonial rendered large and centered, the
  other two smaller in a row beneath it.

All three variants render the identical content model — only arrangement
changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `density` — `compact` or `comfortable` (default) spacing between and
  within items.
- `avatarSize` — avatar image diameter, in pixels.
- `alignment` — `left` (default) or `center` text/attribution alignment
  within each item.
- `dividerStyle` — `none` or `line` (default) divider between items
  (vertical in Row, horizontal in Stacked/Featured).

## Assets

Avatars use the existing Asset Manager image prop flow —
`testimonialNAvatarAssetId` values resolve through the `assets` array
passed to the component, exactly like Hero01's `heroImageAssetId`. If an
id doesn't resolve to a project asset, that testimonial simply renders
without an avatar image. Avatar alt text is always derived from the
person's name as `"Photo of {name}"`, never left to a separate prop.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Quotes are real `<blockquote>` elements; attribution is a `<figcaption>`
  inside a `<figure>` — never a fake heading for the person's name.
- The decorative quote mark is `aria-hidden` and carries no content.
- No truncation and no line-clamping — full testimonial text always
  renders in full, at every width.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Header01/Features01/CTA01.
- No stars, scores, or review badges — by design, not omission.
- No carousel, video, or logo-wall variant — each would require new
  content semantics or new interaction/asset capability outside this
  component's approved scope.
