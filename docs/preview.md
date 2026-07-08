# Preview Mode

## What it is

Preview Mode is an interactive, read-only rendering of a `Project` inside
ALai Studio — a clean simulated website, not a static screenshot and not the
ZIP export. It exists so you can see and click through a real, working page
without leaving the app or running an export.

## Builder vs. Preview vs. Export — three different things

| | Builder | Preview | Export |
|---|---|---|---|
| Editable? | Yes — props, style, variants, drag/reorder | No — read-only | N/A, produces a separate project |
| Shows Builder chrome (sidebar, Inspector, selection, drag handles)? | Yes | No | N/A |
| Runs in | ALai Studio, same document | ALai Studio, inside an iframe | A separate, standalone project you run yourself |
| Proves the code compiles/builds? | No | No | Yes (`npm install && npm run build`) |
| Where | `/builder` | `/preview`, `/templates/:id/preview` | `Download ZIP` in the Builder |

Preview does not replace `npm run verify:templates` — it's a fast, in-app way
to *look at* a project; verification is what proves an exported project
actually installs, builds, and runs with no broken images. See
[`export-verification.md`](export-verification.md).

## Routes

- **`/preview`** — renders the current Builder project (from
  `ProjectContext`). Back link goes to `/builder`.
- **`/templates/:templateId/preview`** — renders one of the 4 production
  templates read-only. Back link goes to that template's detail page
  (`/templates/:templateId`). An unknown `:templateId` shows a not-found
  state with a link back to `/templates`.

Reached via: the "Preview" button in the Builder toolbar (→ `/preview`), and
"Preview Full Site" on a template's detail page (→
`/templates/:templateId/preview`).

## Current-project preview vs. template preview

Both routes render through the same `PreviewShell` /
`ProjectPreviewRenderer` components — the only difference is where the
`Project` comes from and where "back" goes:

- `/preview` reads the live `Project` out of `ProjectContext` — whatever is
  currently in the Builder, edited or not.
- `/templates/:templateId/preview` calls `loadTemplate(template)` — the same
  read-only function "Use Template" uses — but **never calls `setProject`**.
  Previewing a template can never mutate the current Builder project, and
  previewing never mutates the template's own definition either (`Template`
  data is immutable regardless of which route reads it — see
  [`templates.md`](templates.md)).

If there's nothing meaningful to preview (the current project has no
section with a component assigned), `/preview` shows an empty state with
links to the Builder and to `/templates` instead of an empty frame.

## How viewport simulation works

The preview frame is a real `<iframe>`, not a resized `<div>`, with the
`Project`'s React tree rendered into it via a React portal
(`createPortal`). This is the detail that makes the viewport controls
actually work: an iframe is its own browsing context with its own CSS
viewport, so changing its `width` genuinely changes what width every
component's own `@media` queries see and react to — exactly like resizing a
real browser window. A resized `<div>` would not do this; the components'
CSS would keep responding to the *host* window's width, not the simulated
one.

Viewport controls and their iframe widths:

| Control | Width |
|---|---|
| Desktop | `1440px` |
| Tablet | `1024px` |
| Mobile | `390px` |
| Full width | `100%` (fills the available preview stage) |

Switching viewport only resizes the iframe element — its document and React
tree are never remounted, so state inside (an open FAQ item, scroll
position) survives a viewport switch.

Because an iframe is a separate document, it starts with zero styling.
`PreviewFrame` clones every `<style>`/`<link rel="stylesheet">` from the
host document's `<head>` into the iframe's `<head>` once, on mount — this is
what brings in both the component library's CSS and the theme's CSS custom
properties (`--color-primary`, etc.), so the preview's colors and fonts
genuinely match the project's theme.

## Interactivity

Everything rendered inside the preview is the real, live component tree —
not a screenshot — so interactive behavior works exactly like it would on a
real page:

- FAQ accordions open/close normally (real component state).
- Buttons and CTAs are clickable.
- `Form01` behaves exactly as documented in
  [`component-authoring.md`](component-authoring.md#notable-component-behavior-form01)
  — with no `formAction` configured, submitting shows the static demo notice
  and never navigates.
- Same-page hash links (`#faq`, `#contact`) use the iframe's own native
  anchor-scroll behavior.
- Links to `http://`/`https://` URLs are intercepted and opened in a new tab
  (`window.open(..., '_blank', 'noopener,noreferrer')`) instead of
  navigating the iframe away from the preview. `mailto:`/`tel:` links are
  left to normal OS handling.

There is no Builder sidebar, no Inspector, no section-selection chrome, and
no drag handles anywhere in Preview Mode — `ProjectPreviewRenderer` is a
separate, minimal renderer, not `BuilderCanvas` with editing disabled.

## Known limitations

- **Iframe stylesheets are cloned once, at mount.** A Vite HMR CSS update
  during an active dev session won't propagate into an already-open preview
  tab without a manual reload. Not a concern in a production build (CSS is
  bundled statically), and the rendered *content* is always live either way
  since the React tree itself re-renders normally.
- **Only the first page renders.** `ProjectPreviewRenderer` renders
  `project.pages[0]` — matches every current template, all of which put
  their entire site on a single Home page. Multi-page preview is not
  implemented yet.
- **Preview does not run the exported project's build.** It proves the
  project *renders and behaves* inside ALai Studio; it does not prove the
  code compiles standalone, installs, or builds with no broken images. That
  guarantee only comes from `npm run verify:templates` — see
  [`export-verification.md`](export-verification.md). Preview and export
  verification are complementary, not substitutes for each other.
- **Per-breakpoint prop overrides/visibility are intentionally not
  applied.** The Export Engine doesn't act on `responsiveOverrides` or
  `visibility` today, so Preview doesn't either — applying them would make
  Preview diverge from what actually exports rather than match it. Layout
  responsiveness at each simulated width comes entirely from each
  component's own CSS media queries reacting to the iframe's real width.

## Verification

```bash
npm run build              # source app compiles
npm run verify:templates   # exported projects still install/build/run correctly
```

Preview Mode adds new pages and a new renderer, but touches no template
content, no manifests, no component source, and no Export Engine code — a
green `verify:templates` run confirms the ZIP export flow is unaffected.
