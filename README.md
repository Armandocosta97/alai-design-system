# ALai Studio

A React + TypeScript website builder: a component library, a set of ready-made
templates, a visual Builder, a per-component Playground, and a static-site ZIP
export flow. Exported sites are plain, standalone Vite + React projects with
no runtime dependency on ALai Studio itself.

## What's here

- **Component library** — versioned, self-contained component packages under
  `src/library/**` (e.g. `Hero02`, `Pricing01`, `Form01`), each with its own
  manifest describing editable props, style controls, and variants.
- **Templates** — four full starter sites (`Agency`, `Restaurant`, `SaaS`,
  `Portfolio`) under `src/config/templates/`, browsable at `/templates` with
  a detail page per template at `/templates/:id`.
- **Builder** (`/builder`) — compose pages from library components, edit
  props/style/variants, and export the current project as a ZIP.
- **Playground** (`/playground/:componentId`) — isolated, local-only preview
  of a single component with live prop/style/variant editing.
- **Export Engine** (`src/export/`) — turns a `Project` into a set of
  standalone project files (components, pages, theme, assets, tooling),
  zipped for download from the Builder.

## Documentation

- [`docs/templates.md`](docs/templates.md) — what a template is, the rules
  that keep template metadata out of exports, and immutability guarantees.
- [`docs/assets.md`](docs/assets.md) — the current asset strategy: why
  templates are asset-free today, and what would have to be true before that
  changes.
- [`docs/component-authoring.md`](docs/component-authoring.md) — the package
  shape every component follows and the conventions new components must match.
- [`docs/export-verification.md`](docs/export-verification.md) — what
  `npm run verify:templates` actually checks and when to run it.

## Development commands

```bash
npm install
npm run dev              # start the dev server
npm run build             # tsc -b && vite build — source app only
npm run verify:templates  # end-to-end template export verification (see below)
```

### When to run `npm run verify:templates`

`npm run build` only proves the *source app* compiles. It does not prove an
exported template compiles, runs, or renders correctly — the exported
project is strictly typed in ways the Builder's own `Record<string, unknown>`
style/prop fields are not, and it's a separate, standalone codebase. Run
`npm run verify:templates`:

- after changing any template's content, section list, or order
  (`src/config/templates/*.ts`);
- after changing a component's prop or style *types* (even if the source app
  still builds — the exported project's stricter typing is what catches
  invalid values, e.g. a style control set to an option that belongs to a
  different component's variant);
- after changing a component's manifest (props, style controls, variants,
  `exportFiles`);
- after changing anything in `src/export/` (Export Engine logic);
- after any change to asset handling (`Project.assets`, `ProjectAsset`, how
  image props resolve to `<img>` elements).

It is not required for pure UI/copy polish outside `src/config/templates/`,
`src/export/`, `src/library/**/manifest.ts`, or component prop/style types —
but running it anyway is always safe and cheap relative to catching a broken
export late.

## v0.1 baseline

See [`docs/templates.md`](docs/templates.md) and
[`docs/export-verification.md`](docs/export-verification.md) for the current
stable baseline: 4 production templates, `Pricing01` and `Form01`, static
template thumbnails, per-template detail pages, the export theme background
fix, and runtime broken-image verification in `verify:templates`.

## Known non-blocking warnings / backlog

- **Bundle-size warning** — `npm run build` reports the main JS chunk
  exceeding Vite's 500 kB guidance threshold. Non-blocking; code-splitting
  (e.g. `dynamic import()` per route) may be worth considering later, not
  urgent for v0.1.
- **No global `box-sizing: border-box` reset in generated exports** —
  the source app's own `global.css` has one; the Export Engine's generated
  theme CSS does not. This was the root cause of a real bug (CTA/Hero/Contact
  buttons overflowing the viewport in exported sites at mobile widths,
  fixed by adding `box-sizing: border-box` directly to the affected
  component classes). The currently-shipped, verified components are fixed
  at the component level. Adding the reset to the Export Engine's generated
  output would close this gap generically for future components, but is a
  deliberate, separate Export Engine change, not something to fold into
  unrelated work.
- **Raster demo asset support** — see [`docs/assets.md`](docs/assets.md).
  Real photo support requires an explicit, reviewed Export Engine change
  (a binary-aware asset write step); it is not a template-authoring task.
