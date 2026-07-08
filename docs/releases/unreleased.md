# Unreleased

Changes since [v0.1](v0.1.md), not yet cut into a numbered release.

## Preview Mode

An interactive, read-only, in-app rendering of a project or template — a
clean simulated website, not a static screenshot and not the ZIP export.
See [`docs/preview.md`](../preview.md) for full documentation.

- **Routes**: `/preview` (current Builder project) and
  `/templates/:templateId/preview` (any of the 4 production templates,
  read-only).
- **Entry points**: a "Preview" link in the Builder toolbar; a "Preview Full
  Site" link on each template's detail page.
- **Viewport controls**: Desktop (`1440px`), Tablet (`1024px`), Mobile
  (`390px`), Full width (`100%`) — implemented as a real `<iframe>` with the
  project rendered into it via a React portal, so simulated widths trigger
  each component's actual CSS media queries, not just a resized box.
- **Interactive**: FAQ accordions, buttons/CTAs, and `Form01`'s static
  behavior (no-op submit when `formAction` is empty) all work exactly as
  they would on a real page, because it's the real component tree, not a
  screenshot. Same-page hash links scroll natively inside the frame;
  `http(s)://` links open in a new tab instead of navigating the preview
  away.
- **No Builder chrome**: no sidebar, no Inspector, no section-selection
  chrome, no drag handles — `ProjectPreviewRenderer` is a separate, minimal
  renderer, not `BuilderCanvas` in a read-only mode.
- **Does not mutate anything**: template preview loads the template
  read-only (same `loadTemplate` function "Use Template" uses, but never
  calls `setProject`), so the current Builder project is never touched, and
  the template's own data is never touched either.
- **Export Engine unchanged**: no Export Engine, component source, manifest,
  or template content changes were part of this work. `npm run
  verify:templates` passes unchanged, confirming the ZIP export flow is
  unaffected.

### Known limitations

- Iframe stylesheets are cloned once, at mount — a Vite HMR CSS update
  during an active dev session won't propagate into an already-open preview
  tab without a manual reload.
- Only the first page of a project renders (`project.pages[0]`) — matches
  every current template today, but multi-page preview isn't implemented.
- Preview does not run the exported project's build — it proves the project
  renders and behaves inside ALai Studio, not that it compiles standalone.
  `npm run verify:templates` is still the source of truth for that.

### Verification

```bash
npm run build
npm run verify:templates
```

Both pass unchanged. See [`docs/preview.md`](../preview.md) for the full
verification note.
