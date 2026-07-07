# Team01

Warm, editorial team section for the ALai design system.

## Purpose

Placed after Services/Features/Stats/Gallery and before
Testimonials/FAQ/Contact/CTA/Footer, Team01 humanizes the business —
four real people, presented warmly rather than as corporate ID badges.
A photo, a name, a role, one short sentence. No social links, no modals,
no filtering — a static, calm introduction to the people behind the work.

## Includes

- Centered eyebrow / title / subtitle header
- Exactly four team members (photo, name, role, short bio)
- Three layout/emphasis variants sharing the same content
- Radius, ratio, bio visibility, and border style controls

## Props

- `eyebrow`
- `title`
- `subtitle`
- `member1PhotoAssetId` / `member1Name` / `member1Role` / `member1ShortBio`
- `member2PhotoAssetId` / `member2Name` / `member2Role` / `member2ShortBio`
- `member3PhotoAssetId` / `member3Name` / `member3Role` / `member3ShortBio`
- `member4PhotoAssetId` / `member4Name` / `member4Role` / `member4ShortBio`

No social links, email links, long biographies, modal profiles, or
categories — exactly four photo/name/role/bio quadruples.

## Variants

- **Grid** — four equal-weight member cards in a single row.
- **Editorial** — the first member renders larger (a "lead" treatment),
  the remaining three smaller alongside.
- **Compact List** — image + text rows, stacked in a single column,
  useful for small studios and local businesses.

All three variants render the identical content model — only arrangement
and emphasis change. **The first member is always the emphasized one in
Editorial.** There is no special "lead" prop — reorder which member sits
in the first slot to change who's featured.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `imageRadius` — `small`, `medium` (default), `large`, or `full` (fully
  rounded/circular).
- `imageRatio` — `square` (default), `portrait`, or `original`. `landscape`
  is deliberately not offered — it rarely suits a headshot.
- `showBio` — shows or hides each member's short bio. **This only affects
  rendering — it never removes or clears the `shortBio` content itself.**
  Turning it off and back on always restores exactly what was entered.
- `showBorder` — adds a subtle hairline border around each photo. Off by
  default — no decorative borders unless explicitly enabled.

No per-person style overrides — one shared radius/ratio/bio-visibility/
border setting governs all four members.

## Assets

Each photo resolves through the existing Asset Manager `assets` array via
`memberNPhotoAssetId`, exactly like Hero01/Testimonials01/LogoCloud01/
Gallery01. If an id doesn't resolve to a project asset, that slot renders
a clean placeholder at the same aspect ratio — the person's initials when
a name is entered, or a neutral user glyph when the name is empty — so the
layout never shifts while a project is still being assembled.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Each photo's alt text is derived automatically as `"Photo of {name}"` —
  never a separate authored prop.
- Placeholders carry `role="img"` and `aria-label="Photo of {name}"` when
  a name is entered; when the name is empty, the placeholder is
  `aria-hidden="true"` instead, since there's no meaningful label to
  construct. The initials or neutral glyph shown inside are always
  `aria-hidden`.
- The four members render as a semantic list (`<ul>`/`<li>`).
- The section title is the only `<h2>`; each member's name is an `<h3>`.
  `role` and `shortBio` are plain text.
- Reading order always matches DOM order in every variant, including
  Editorial, where one member is visually larger but never reordered.

## Developer Notes

- Follows the same variant-resolver, style-merge, and image-asset
  resolution patterns as Hero01/Testimonials01/LogoCloud01/Gallery01.
- **Static presentation only.** No social links, modal profiles,
  click-to-expand bios, filtering, staff categories, or carousel
  behavior — any of these belongs to a future, distinct component.
- Hover feedback is intentionally minimal: a `scale(1.02)` transform using
  `var(--transition-base)`, disabled entirely under
  `prefers-reduced-motion: reduce`.
- Alt-text derivation and initials/placeholder logic are implemented
  locally inside Team01 — conceptually similar to LogoCloud01/
  Testimonials01's equivalents, but not imported from them.
