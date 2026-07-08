#!/usr/bin/env node
// Verifies all four ALai templates end to end: load -> Builder -> export ZIP
// -> extract -> check component folders -> check for template-metadata
// leakage -> npm install -> npm run build -> serve the built project and
// check for runtime console errors / broken images.
//
// This exists because a template's `style`/`props` data is only loosely
// typed at authoring time (Record<string, unknown>) — an invalid value
// (e.g. Services01's iconStyle set to Features01's 'outline') passes the
// source app's own `npm run build` silently and only fails once the
// *exported* project's strictly-typed component props are checked by
// `tsc`. Run this after editing any template so that class of bug is
// caught locally instead of by whoever tries the export next.
//
// The runtime image check exists because `npm run build` only proves the
// exported project *compiles* — a template could reference a broken image
// path (e.g. a public-relative URL with no `public/` folder to resolve
// against in a standalone export) and still build successfully, only
// 404ing once a real visitor loads the page. See the Demo Asset Strategy
// Audit for the full analysis of why this gap exists. Current templates
// never reference an image asset id, so components always fall back to an
// inline SVG placeholder (never an `<img>` tag) — this check is here to
// hold that guarantee for whenever real demo assets are added later.
//
// Usage:
//   npm run verify:templates
//   node scripts/verify-templates-export.mjs [--keep] [--url http://localhost:5173]
//
// --keep   don't delete the scratch directory (.tmp/verify-templates) on exit
// --url    verify against an already-running dev server instead of starting one

import { chromium } from 'playwright'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const SCRATCH_DIR = path.join(REPO_ROOT, '.tmp', 'verify-templates')

const args = process.argv.slice(2)
const KEEP_SCRATCH = args.includes('--keep')
const urlFlagIndex = args.indexOf('--url')
const FIXED_URL = urlFlagIndex !== -1 ? args[urlFlagIndex + 1] : null
const DEFAULT_URL = 'http://localhost:5173'

// Each template's expected exported component folders, in no particular
// order. Update this list if a template's section list is intentionally
// changed — that's the point of keeping it explicit rather than inferred.
const TEMPLATES = [
  {
    name: 'Agency',
    expectedComponents: [
      'CTA01', 'FAQ01', 'Features01', 'Footer01', 'Form01', 'Header01',
      'Hero02', 'LogoCloud01', 'Pricing01', 'Process01', 'Services01', 'Stats01', 'Testimonials01',
    ],
  },
  {
    name: 'Restaurant',
    expectedComponents: [
      'CTA01', 'FAQ01', 'Features01', 'Footer01', 'Form01', 'Gallery01',
      'Header01', 'Hero02', 'Services01', 'Stats01', 'Testimonials01',
    ],
  },
  {
    name: 'SaaS',
    expectedComponents: [
      'CTA01', 'FAQ01', 'Features01', 'Footer01', 'Form01', 'Header01',
      'Hero02', 'LogoCloud01', 'Pricing01', 'Process01', 'Services01', 'Stats01', 'Testimonials01',
    ],
  },
  {
    name: 'Portfolio',
    expectedComponents: [
      'CTA01', 'FAQ01', 'Features01', 'Footer01', 'Form01', 'Gallery01',
      'Header01', 'Hero02', 'Process01', 'Services01', 'Testimonials01',
    ],
  },
]

// Strings that must never appear in an exported project. Template metadata
// (category/industry/thumbnailPath/tags/the *Preset variable names/the
// thumbnail static-asset path) is presentational only and belongs to
// src/config/templates/*, never to the Project data the Export Engine reads.
const LEAK_TERMS = [
  'category:',
  'industry:',
  'thumbnailPath',
  '"tags"',
  'agencyPreset',
  'restaurantPreset',
  'saasPreset',
  'portfolioPreset',
  'template-thumbnails',
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function isServerUp(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) })
    return res.status < 500
  } catch {
    return false
  }
}

/**
 * Uses an already-running dev server if one is reachable at the default
 * (or --url-provided) address. Otherwise spawns `npm run dev` itself,
 * parses the real port Vite picked (it shifts if 5173 is busy), waits
 * until it responds, and hands back the child process so the caller can
 * shut it down when done. Never kills a server this script didn't start.
 */
async function ensureDevServer() {
  if (FIXED_URL) {
    if (!(await isServerUp(FIXED_URL))) {
      throw new Error(`--url ${FIXED_URL} was given but nothing answered there.`)
    }
    console.log(`Using already-running dev server at ${FIXED_URL}`)
    return { proc: null, url: FIXED_URL }
  }

  if (await isServerUp(DEFAULT_URL)) {
    console.log(`Using already-running dev server at ${DEFAULT_URL}`)
    return { proc: null, url: DEFAULT_URL }
  }

  console.log('No dev server detected — starting one (npm run dev)...')
  const proc = spawn('npm', ['run', 'dev'], { cwd: REPO_ROOT, stdio: ['ignore', 'pipe', 'pipe'] })

  let resolvedUrl = null
  proc.stdout.on('data', (chunk) => {
    const match = chunk.toString().match(/Local:\s+(http:\/\/localhost:\d+)\//)
    if (match) resolvedUrl = match[1]
  })

  for (let i = 0; i < 30 && !resolvedUrl; i++) {
    await sleep(500)
  }
  if (!resolvedUrl) {
    proc.kill()
    throw new Error('Dev server did not print a Local: URL within 15s.')
  }

  for (let i = 0; i < 20; i++) {
    if (await isServerUp(resolvedUrl)) {
      console.log(`Dev server ready at ${resolvedUrl}`)
      return { proc, url: resolvedUrl }
    }
    await sleep(500)
  }

  proc.kill()
  throw new Error(`Dev server printed ${resolvedUrl} but never became reachable.`)
}

function runCommand(cmd, cmdArgs, cwd) {
  const res = spawnSync(cmd, cmdArgs, { cwd, encoding: 'utf-8' })
  const output = `${res.stdout ?? ''}${res.stderr ?? ''}`
  return { ok: res.status === 0, output }
}

/**
 * Serves an exported project's already-built `dist/` via `vite preview`,
 * same "spawn, parse the real port, poll until reachable" pattern as
 * ensureDevServer — `vite preview` also shifts port if the default is busy.
 */
async function startPreviewServer(cwd) {
  const proc = spawn('npx', ['vite', 'preview'], { cwd, stdio: ['ignore', 'pipe', 'pipe'] })

  let resolvedUrl = null
  let stderr = ''
  proc.stdout.on('data', (chunk) => {
    const match = chunk.toString().match(/Local:\s+(http:\/\/localhost:\d+)\//)
    if (match) resolvedUrl = match[1]
  })
  proc.stderr.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  for (let i = 0; i < 30 && !resolvedUrl; i++) {
    await sleep(500)
  }
  if (!resolvedUrl) {
    proc.kill()
    throw new Error(`Preview server did not print a Local: URL within 15s.${stderr ? `\n${stderr}` : ''}`)
  }

  for (let i = 0; i < 20; i++) {
    if (await isServerUp(resolvedUrl)) {
      return { proc, url: resolvedUrl }
    }
    await sleep(500)
  }

  proc.kill()
  throw new Error(`Preview server printed ${resolvedUrl} but never became reachable.`)
}

function stopPreviewServer(proc) {
  if (proc && !proc.killed) {
    proc.kill()
  }
}

/**
 * Loads the exported project's built site and checks for the two classes of
 * runtime-only failure `npm run build` can't catch: console/page errors, and
 * broken images. An `<img>` only ever appears in these components when a
 * real asset resolved (see Hero02/Gallery01/etc.) — unresolved image props
 * fall back to an inline SVG placeholder, never an `<img>` tag — so this
 * never needs to special-case "intentional" placeholders; any `<img>` found
 * is expected to have actually loaded.
 */
async function checkRuntimeImages(browser, url) {
  const context = await browser.newContext()
  const page = await context.newPage()

  const consoleErrors = []
  const failedRequests = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => {
    consoleErrors.push(err instanceof Error ? err.message : String(err))
  })
  page.on('requestfailed', (request) => {
    if (request.resourceType() === 'image') {
      failedRequests.push(`${request.url()} (${request.failure()?.errorText ?? 'failed'})`)
    }
  })
  page.on('response', (response) => {
    if (response.request().resourceType() === 'image' && !response.ok()) {
      failedRequests.push(`${response.url()} (HTTP ${response.status()})`)
    }
  })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)

  const brokenImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .filter((img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
      .map((img) => img.currentSrc || img.src)
  })

  await context.close()

  return { consoleErrors, failedRequests, brokenImages }
}

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(full, out)
    } else {
      out.push(full)
    }
  }
  return out
}

async function scanForLeaks(dir) {
  const leaks = []
  for (const file of walkFiles(dir)) {
    let content
    try {
      content = await readFile(file, 'utf-8')
    } catch {
      continue // binary/unreadable file — not a place a metadata string would leak as text anyway
    }
    for (const term of LEAK_TERMS) {
      if (content.includes(term)) {
        leaks.push(`"${term}" found in ${path.relative(dir, file)}`)
      }
    }
  }
  return leaks
}

// Vite's dev-server HMR websocket keeps a connection open, so
// 'networkidle' is an unreliable wait condition and this goto can
// occasionally collide with a navigation still settling from the
// previous template's click. Retry rather than fail the whole template
// on what is just page-load flakiness.
async function gotoTemplatesPage(page, baseUrl, attempts = 3) {
  let lastErr
  for (let i = 0; i < attempts; i++) {
    try {
      await page.goto(`${baseUrl}/templates`, { waitUntil: 'domcontentloaded' })
      await page.waitForSelector('.template-card', { timeout: 10000 })
      return
    } catch (err) {
      lastErr = err
      await sleep(500)
    }
  }
  throw lastErr
}

async function verifyTemplate(browser, page, baseUrl, template) {
  const result = { name: template.name, ok: true, steps: [] }

  function step(label, ok, detail) {
    result.steps.push({ label, ok, detail })
    if (!ok) result.ok = false
    return ok
  }

  try {
    await gotoTemplatesPage(page, baseUrl)
    const card = page.locator('.template-card').filter({ hasText: template.name })
    const cardCount = await card.count()
    if (!step('template card present on /templates', cardCount === 1, `found ${cardCount}`)) return result

    await card.locator('button', { hasText: 'Use Template' }).click()
    await page.waitForURL('**/builder', { timeout: 15000 }).catch(() => {})
    if (!step('clicking "Use Template" opens Builder', page.url().includes('/builder'), page.url())) return result

    await page.waitForSelector('text=Composer', { timeout: 15000 }).catch(() => {})

    await page.locator('button', { hasText: 'Generated Files Preview' }).first().click()
    await page.waitForTimeout(300)
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 15000 }),
      page.locator('button', { hasText: 'Download ZIP' }).first().click(),
    ])
    const zipPath = path.join(SCRATCH_DIR, `${template.name.toLowerCase()}.zip`)
    await download.saveAs(zipPath)
    if (!step('export ZIP downloads', existsSync(zipPath))) return result

    const extractDir = path.join(SCRATCH_DIR, template.name.toLowerCase())
    const unzip = spawnSync('unzip', ['-q', zipPath, '-d', extractDir])
    if (!step('extract ZIP', unzip.status === 0, unzip.stderr?.toString())) return result

    const componentsDir = path.join(extractDir, 'src', 'components')
    const foundComponents = existsSync(componentsDir) ? readdirSync(componentsDir).sort() : []
    const expected = [...template.expectedComponents].sort()
    const missing = expected.filter((c) => !foundComponents.includes(c))
    const extra = foundComponents.filter((c) => !expected.includes(c))
    step(
      `expected component folders present (${expected.length})`,
      missing.length === 0 && extra.length === 0,
      missing.length || extra.length ? `missing=[${missing}] extra=[${extra}]` : foundComponents.join(', '),
    )

    const leaks = await scanForLeaks(extractDir)
    step('no template-metadata leakage', leaks.length === 0, leaks.length ? leaks.join('; ') : 'clean')

    const install = runCommand('npm', ['install'], extractDir)
    if (!step('npm install', install.ok, install.ok ? undefined : install.output.slice(-800))) return result

    const build = runCommand('npm', ['run', 'build'], extractDir)
    if (!step('npm run build', build.ok, build.ok ? undefined : build.output.slice(-1500))) return result

    let previewServer
    try {
      previewServer = await startPreviewServer(extractDir)
      const runtime = await checkRuntimeImages(browser, previewServer.url)

      step(
        'exported page loads with zero console errors',
        runtime.consoleErrors.length === 0,
        runtime.consoleErrors.length ? runtime.consoleErrors.join('; ') : undefined,
      )
      step(
        'no failed image network requests',
        runtime.failedRequests.length === 0,
        runtime.failedRequests.length ? runtime.failedRequests.join('; ') : undefined,
      )
      step(
        'no broken <img> elements',
        runtime.brokenImages.length === 0,
        runtime.brokenImages.length ? runtime.brokenImages.join('; ') : undefined,
      )
    } finally {
      stopPreviewServer(previewServer?.proc)
    }
  } catch (err) {
    step('unexpected error', false, err instanceof Error ? err.message : String(err))
  }

  return result
}

function printResult(result) {
  console.log(`\n${result.ok ? '✅' : '❌'} ${result.name}`)
  for (const s of result.steps) {
    console.log(`   ${s.ok ? '✓' : '✗'} ${s.label}${s.detail && !s.ok ? `\n     -> ${s.detail}` : ''}`)
  }
}

function printSummary(results) {
  console.log('\n' + '─'.repeat(48))
  console.log('Template export verification summary')
  console.log('─'.repeat(48))
  for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}`)
  }
  console.log('─'.repeat(48))
}

async function main() {
  rmSync(SCRATCH_DIR, { recursive: true, force: true })
  mkdirSync(SCRATCH_DIR, { recursive: true })

  let devServer = { proc: null, url: DEFAULT_URL }
  let browser = null

  try {
    devServer = await ensureDevServer()
    browser = await chromium.launch()
    const context = await browser.newContext({ acceptDownloads: true })
    const page = await context.newPage()

    const results = []
    for (const template of TEMPLATES) {
      console.log(`\n▶ Verifying ${template.name}...`)
      const result = await verifyTemplate(browser, page, devServer.url, template)
      results.push(result)
      printResult(result)
    }

    printSummary(results)

    const anyFailed = results.some((r) => !r.ok)
    process.exitCode = anyFailed ? 1 : 0
  } finally {
    if (browser) await browser.close()
    if (devServer.proc) devServer.proc.kill()
    if (KEEP_SCRATCH) {
      console.log(`\nScratch directory kept at ${SCRATCH_DIR}`)
    } else {
      rmSync(SCRATCH_DIR, { recursive: true, force: true })
    }
  }
}

main()
