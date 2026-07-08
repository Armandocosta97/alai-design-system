# Form01

Contact/lead form section for the ALai design system.

## Purpose

Placed as the closing conversion point of a page, Form01 gives visitors a
direct way to reach out — name, email, phone, and message — alongside an
optional side panel with direct contact details. It is deliberately
generic across industries: nothing about its content model assumes a
specific business type.

## Static by default — read this before using

**ALai exports fully static websites. There is no server.** Form01 never
pretends otherwise:

- With no `formAction` configured (the default), submitting the form calls
  `event.preventDefault()` — the page does not navigate away, nothing is
  sent anywhere, and a fixed, non-removable notice renders below the
  submit button: *"This is a template form — no data is sent yet. Connect
  a form backend (e.g. Formspree, Netlify Forms) via the Form Action
  setting to start receiving submissions."* This notice cannot be turned
  off from props — it is a safety guarantee, not decorative copy, so an
  exported site can never silently imply a message was received when
  nothing was actually sent.
- Once a real `formAction` URL is set (e.g. a Formspree or Netlify Forms
  endpoint), the `<form>` submits natively via `method="post"` to that
  URL — Form01 does not intercept or fake the submission in any way. The
  optional `helperNote` prop then renders in that same slot instead of the
  demo notice.
- There is no client-side "thank you" state, no fake success animation,
  and no `fetch`/`XMLHttpRequest` call bundled in — wiring up real
  behavior (success/error handling, redirects) is the responsibility of
  whatever backend `formAction` points to.

## Includes

- Centered or left-aligned eyebrow / title / subtitle header
- A real `<form>` with labelled name, email, phone, and message fields
- A real `<button type="submit">`, never a styled `<div>` or link
- An optional side panel with title, description, and email/phone/address/
  opening hours, matching the mailto/tel-link pattern used by Contact01
- Three layout variants sharing the same content

## Props

- `eyebrow`, `title`, `subtitle`
- `formTitle`, `formDescription` (description optional)
- `nameLabel`, `emailLabel`, `phoneLabel`, `messageLabel`, `submitLabel`
- `formAction` — optional real endpoint URL; see "Static by default" above
- `helperNote` — optional; only shown once `formAction` is set
- `sideTitle`, `sideDescription` (description optional)
- `email`, `phone`, `address`, `openingHours` — all optional

Every optional field is omitted cleanly when left empty rather than
rendering blank: an empty `email` means no mailto link at all, an empty
`address` means no address line, and so on. There are never empty anchors
in the markup — `email`/`phone` only render as `<a>` elements when they
have real values.

## Variants

- **Split** (default) — form and side panel side by side; stacks into a
  single column below 860px.
- **Card** — the form is inset into a bordered/surfaced card in a single
  column; the side panel (if shown) sits below it, separated by a hairline
  rule.
- **Stacked** — single column, form above the side panel, no card framing.
  Suited to narrower embeds or secondary form placements further down a
  page.

All three variants render the identical content model — only arrangement
changes.

## Style Controls

- `containerWidth` — max width of the section content.
- `paddingTop` / `paddingBottom` — section vertical padding.
- `alignment` — `center` (default) or `left`. Controls the eyebrow/title/
  subtitle header only.
- `surface` — toggles a bordered/surfaced background panel behind the form
  on Split and Stacked. Card already has this treatment structurally, so
  the control has no additional visible effect there.
- `fieldStyle` — `outline` (default), `filled`, or `underline`. Controls
  the visual treatment of every input and the textarea.
- `showSidePanel` — toggles the side contact panel on or off, independent
  of variant. When off, the form alone fills the content area.

## Accessibility

- The section is labelled via `aria-labelledby`, generated with React's
  `useId` so multiple instances on one page never collide.
- Every input and the textarea has a real, associated `<label>` via a
  second `useId`-derived id — never a placeholder standing in for a label.
- Section title is an `<h2>`; the form title and side panel title are both
  `<h3>` — a single consistent heading level under the section.
- The submit control is a real `<button type="submit">`, not a styled
  `<div>` or an anchor.
- There are no nested interactive elements and no clickable `<div>`s
  anywhere in the markup.

## Developer Notes

- Follows the same variant-resolver and style-merge patterns as
  Header01/Features01/CTA01/Contact01.
- The demo-notice guarantee lives entirely in `Form01.tsx` (`hasFormAction`
  branch) — it is not something a manifest prop can disable, by design.
- Reuses the mailto/tel-link helpers and detail-row markup pattern from
  Contact01 for the side panel, rather than introducing a second
  implementation of the same idea.
- No images, uploads, or Theme/Design Token changes required.
