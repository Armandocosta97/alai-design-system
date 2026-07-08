# Export Verification

## Why this exists

`npm run build` (the source app's own `tsc -b && vite build`) proves the
*ALai Studio app* compiles. It proves nothing about whether an exported
template project compiles, builds, or renders correctly at runtime — that's
a separate, standalone codebase with its own, stricter TypeScript checking
(`BuilderSection.style` is a loosely-typed `Record<string, unknown>` in the
source app, but flows into strictly-typed component props once exported),
and a real browser runtime `npm run build` never executes.

`scripts/verify-templates-export.mjs` (`npm run verify:templates`) closes
that gap by actually driving the Builder, exporting each template, and
building + running the result.

## What it checks, per template

For each of Agency, Restaurant, SaaS, Portfolio, in order:

1. **Template card exists** on `/templates`.
2. **Builder opens** — clicking "Use Template" navigates to `/builder` with
   the template loaded.
3. **ZIP exports** — "Download ZIP" produces a real file.
4. **Expected component folders exist** — the extracted ZIP's
   `src/components/` matches a hardcoded expected list per template (kept
   explicit rather than inferred, so an unintended component
   addition/removal is caught immediately).
5. **Metadata leak scan** — every extracted file is scanned for
   `category:`, `industry:`, `thumbnailPath`, `"tags"`, `template-thumbnails`,
   and each template's own `*Preset` variable name.
6. **`npm install`** inside the extracted project.
7. **`npm run build`** inside the extracted project — this is what actually
   catches the "valid in the loosely-typed Builder, invalid once strictly
   typed" class of bug.
8. **Runtime check** — only runs if the build above succeeded:
   - Serves the built `dist/` via `npx vite preview`.
   - Loads the page in a real (headless) browser and asserts **zero console
     errors** (`console.error` and uncaught page errors).
   - Watches network responses/failures scoped to `resourceType() ===
     'image'` and asserts none failed.
   - Inspects every rendered `<img>` element and asserts none has
     `naturalWidth === 0`, `naturalHeight === 0`, or `!complete` — this is
     the check that actually proves an image resolved and rendered, and is
     robust even against a dev/preview server masking a 404 behind a
     200-status SPA fallback page (confirmed during this check's own
     negative-testing).

An unresolved image-asset id never produces an `<img>` at all (see
[`component-authoring.md`](component-authoring.md) — it falls back to an
inline SVG placeholder), so templates with placeholder-only image sections
pass this step trivially, with nothing to special-case.

The script exits non-zero if any step for any template fails, and prints a
concise pass/fail summary per template plus a final table.

## When to run it

See the README's "When to run `npm run verify:templates`" section — in
short: after any change to template content, component prop/style types,
manifests, the Export Engine, or asset handling.

## Usage

```bash
npm run verify:templates
# or directly:
node scripts/verify-templates-export.mjs [--keep] [--url http://localhost:5173]
```

- `--keep` — don't delete the scratch directory (`.tmp/verify-templates`) on
  exit, useful for inspecting a failure's extracted project by hand.
- `--url` — verify against an already-running dev server instead of letting
  the script start (and later stop) its own.

The script auto-starts `npm run dev` if nothing answers at the default URL,
and only ever kills a dev server it started itself. It requires `unzip` on
`PATH` (macOS/Linux) and is safe to re-run repeatedly — the scratch
directory is wiped at both start and end unless `--keep` is passed.
