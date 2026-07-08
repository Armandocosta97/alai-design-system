# Templates

## What a template is

```ts
type Template = {
  id: string
  name: string
  description: string
  category: string
  industry: string
  thumbnailPath: string
  tags: string[]
  project: Project        // a normal Project — same shape the Builder edits
}
```

A `Template` is a `Project` plus presentational metadata. `project` is not a
special type — it's the exact same `Project` shape a user builds by hand in
the Builder. Templates live in `src/config/templates/*.ts`; the registry is
`src/config/templates/index.ts`.

## Current v0.1 baseline

4 production templates, all with real (non-skeleton) content and 11–13
sections each:

- **Agency** (`Fieldnote Studio`) — includes `Pricing01` and `Form01`.
- **Restaurant** (`Luma Bistro`) — includes `Form01`, no `Pricing01`.
- **SaaS** (`Northstar`) — includes `Pricing01` and `Form01`.
- **Portfolio** (`Mara Vale`) — includes `Form01`, no `Pricing01`.

None of the four use `Contact01` — `Form01` covers the inquiry/contact role
everywhere it's used. Each has a static thumbnail (`public/template-thumbnails/*.png`)
and is browsable at `/templates` (grid) and `/templates/:id` (detail page,
with a "Use Template" CTA, a "Preview Full Site" link to an interactive
read-only preview at `/templates/:id/preview` — see
[`preview.md`](preview.md) — and a "Back to Templates" link).

## Loading a template

`src/utils/loadTemplate.ts`:

```ts
export function loadTemplate(template: Template): Project {
  return importProject(template.project).project
}
```

This is the *only* load path. It goes through the same `importProject`
validator/repair pipeline used by pasted-JSON import — a loaded template
always produces a normal, independent `Project`. There is no back-reference
from the loaded `Project` to the `Template` it came from.

## Rules — do / do not

**Do**
- Treat a template's `project` field as ordinary `Project` data — build it
  the same way you'd build a project by hand in the Builder.
- Keep every `*AssetId` prop an empty string (`''`) unless you have a
  verified, reviewed reason not to — see [`assets.md`](assets.md).
- Keep template `Project.assets` as `[]` unless following the asset strategy
  in [`assets.md`](assets.md).
- Re-read a component's manifest before writing template content that uses
  it — variant ids and style-control option values are component-specific
  and not cross-checked by the source app's own `npm run build`.

**Do not**
- Put `thumbnailPath`, `category`, `industry`, or `tags` anywhere inside
  `template.project`. These are `Template`-level metadata only, and belong
  in `src/config/templates/index.ts`, never in the `Project` the Export
  Engine reads.
- Hardcode public-relative paths like `/assets/hero.jpg` or
  `/template-thumbnails/agency.png` inside a template's `Project.assets` or
  section props. Exported projects have no `public/` folder — a path that
  resolves inside this app 404s in every standalone export.
- Mutate a template's `Project` in place anywhere. Templates are immutable;
  every "Use Template" click must produce an independent copy.

## Why metadata can't leak

Metadata isolation is structural, not a convention that has to be
remembered: `Template` and `Project` are different objects, and only
`template.project` is ever passed to `loadTemplate` / the Export Engine.
`scripts/verify-templates-export.mjs` scans every exported file for
`category:`, `industry:`, `thumbnailPath`, `"tags"`, `template-thumbnails`,
and each template's own `*Preset` variable name — this is a regression
check, not the primary safety mechanism.
