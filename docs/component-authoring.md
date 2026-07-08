# Component Authoring

## Package shape

Every component lives at `src/library/<category>/<ComponentName>/` and must
include exactly these five files:

```
ComponentName.tsx     # component + prop/style types + defaults + default export
ComponentName.css     # imported directly by the .tsx file
manifest.ts           # ComponentManifest — the Builder/Playground/export's only view of this component
README.md             # purpose, props, variants, style controls, accessibility notes
index.ts              # re-exports component, props type, defaults, manifest
```

`index.ts` convention (matches every existing component):

```ts
export { default } from './ComponentName'
export type { ComponentNameProps } from './ComponentName'
export { componentNameDefaultProps } from './ComponentName'
export { default as ComponentNameManifest } from './manifest'
```

Registration is one line in `src/config/libraries.ts` (`coreLibrary.manifests`)
— nothing else needs to change for a new component to appear in the Builder
sidebar, category pages, and Playground, since all three read from
`componentRegistry`, which is derived from `libraries.ts`.

## Manifest correctness

`manifest.ts` is the single source of truth the Builder, Playground, and
Export Engine all read from — it must exactly match the implementation:

- **`props`** — one entry per prop the component actually accepts, `type`
  matching what the Builder's `PropsEditor` should render for it
  (`text`/`textarea`/`select`/`boolean`/`image`/...), `defaultValue` pulled
  from the component's own exported `xDefaultProps` (never hand-duplicated).
- **`styleControls`** — same rule, sourced from `xDefaultStyle`. Every
  `select`-type control's `options` array must match the component's own
  style type exactly — this is the exact class of bug
  `verify-templates-export.mjs` exists to catch (a style value valid for one
  component but not another passes the source app's own `npm run build`
  silently, because `BuilderSection.style` is loosely typed, and only fails
  once the exported project's strictly-typed props are checked).
- **`variants`** — must match the component's own `xVariants` array and
  `resolveXVariant` fallback exactly.
- **`exportFiles`** — must list real files that exist in the component's
  folder (`['ComponentName.tsx', 'ComponentName.css', 'index.ts']`). The
  Export Engine copies exactly these files verbatim (with import-path
  rewriting) into the exported project — a mismatch here means either a
  missing file in the export or a component that fails to import.

## Implementation conventions

- **Root section element**: `<section>` with `aria-labelledby={titleId}`,
  where `titleId = useId()` — generated per-instance so multiple copies of
  the same component on one page never collide.
- **Heading structure**: the section's own title is the heading referenced
  by `aria-labelledby` (typically `<h2>`); repeated inner items use one
  level down consistently (e.g. `<h3>` per plan/testimonial/FAQ item).
- **Optional links/CTAs**: never render an anchor with an empty or
  meaningless target. Check the label (and href where relevant) is
  non-empty before rendering the `<a>` at all — omit it entirely otherwise,
  the same way `CTA01`'s secondary button and `Form01`'s CTA/side-panel
  links do.
- **Image props**: accept an optional `assets?: ProjectAsset[]` prop,
  resolve `assets.find(item => item.id === xAssetId)`, and render an inline
  SVG placeholder (not an `<img>`) when unresolved — never a bare `<img
  src="">`. See [`assets.md`](assets.md) for why this matters for exports.
- **Self-contained by default**: a new component should not reach for a
  shared abstraction (a shared icon map, a shared button primitive, a
  shared hook) unless at least 3 existing components would genuinely
  benefit from it. Two components with similar-looking buttons is not
  sufficient justification — duplication is preferred until the pattern is
  proven, not assumed.

## Notable component behavior: Form01

`Form01` is intentionally **static by default** — exported sites have no
server, and the component never implies otherwise:

- With `formAction` empty (the default), submitting the form calls
  `event.preventDefault()`: no navigation, nothing sent anywhere, and a
  fixed, non-removable notice renders below the submit button explaining
  this is a template/demo form. This notice cannot be turned off via props
  — it's a safety guarantee, not decorative copy.
- With a real `formAction` URL set (e.g. a Formspree or Netlify Forms
  endpoint), the `<form method="post" action={formAction}>` submits
  natively — no interception, no fake success state.
- There is no client-side "thank you"/success state anywhere in the
  component. Wiring up real submission handling is entirely the
  responsibility of whatever backend `formAction` points to.

Do not add a fake success state to `Form01` to make it "feel" more finished
— that would misrepresent what a static export actually does.

## Verifying a new or changed component

`npm run build` catches type errors in the source app. It does **not**
catch every class of mistake a new component can introduce into an
*exported* project (see [`templates.md`](templates.md) and
[`export-verification.md`](export-verification.md)). If a component is used
by any of the 4 production templates, run `npm run verify:templates` after
changing it.
