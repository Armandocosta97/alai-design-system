# Asset Strategy

## Current default: templates are asset-free

All 4 production templates ship with `assets: []` and every `*AssetId` prop
set to `''`. Components with image props (`Hero02`, `Gallery01`,
`LogoCloud01`, `Team01`, `Testimonials01`, and others) resolve an empty or
unmatched asset id to an inline SVG placeholder, never a broken `<img>` —
this is what makes the current baseline provably safe.

Template thumbnails (`public/template-thumbnails/*.png`, referenced via
`Template.thumbnailPath`) are static metadata, rendered only on `/templates`
and `/templates/:id`. They are not part of any `Project`, are never touched
by the Export Engine, and are not exported.

## Why not real demo images yet

The Export Engine's `generateAssets.ts` can only safely turn a
`Project.assets` entry into a real file in the exported project if its `url`
is a **plain-text data URI** (`data:mime,payload` — no `;base64,`). This
covers inline SVG. It does **not** cover:

- **Base64 raster images** (`data:image/jpeg;base64,...`) — the pattern
  match requires a bare `,` right after the MIME type, so `;base64` breaks
  the match. The asset still "works" (its `url` gets inlined verbatim as a
  JS string), but as a multi-hundred-KB string literal in generated source,
  not a real image file.
- **Public-relative paths** (`/assets/hero.jpg`) — exported projects have no
  `public/` folder at all (confirmed: nothing in `src/export/*.ts`
  generates one). A template asset with this kind of `url` exports
  successfully (`npm run build` passes — this is a compile check, not a
  runtime check) and then 404s the moment a real visitor loads the page.
- **Remote URLs** — outside this repo's control, and a standalone export
  should not depend on a third party being up.

## Rules — do / do not

**Do**
- Keep `Project.assets: []` and every `*AssetId` prop `''` in all template
  content, unless a specific asset addition has been explicitly reviewed
  against this document.
- Treat template thumbnails as metadata-only, presentational, and entirely
  separate from `Project.assets`.

**Do not**
- Reference a public-relative path (`/assets/...`, `/template-thumbnails/...`)
  from a template's `Project.assets` or section props.
- Reference a remote URL from a template's `Project.assets`.
- Add raster (JPEG/PNG) demo photos to any template yet — the Export Engine
  cannot round-trip them into a clean, correctly-sized local file today.

## The narrow future exception

A small, curated SVG data-URI asset (a logo mark, a simple decorative
graphic — never a photo) may be considered for a specific template, but
only after:

1. Explicit review against this document (not a default to reach for).
2. `scripts/verify-templates-export.mjs`'s runtime image check
   (see [`export-verification.md`](export-verification.md)) has run clean
   against it — this is what actually proves the asset resolves and renders
   with no broken `<img>` in the standalone export, which `npm run build`
   cannot prove on its own.

Real raster photo support would require an explicit Export Engine change
(a binary-aware asset write step) — that is out of scope for template
authoring and should be its own reviewed piece of work, not something a
template edit backs into.

## Why this matters for standalone exports

Every exported project must run and render correctly with **zero
dependency on ALai Studio's own dev server, `public/` folder, or network
access**. An asset strategy that works in the Builder's live preview but
not in the exported build is not safe — the Builder preview and the
`npm run dev` server can mask a broken path that only shows up once someone
actually deploys the export. This is exactly the failure mode
`verify-templates-export.mjs`'s runtime check exists to catch.
