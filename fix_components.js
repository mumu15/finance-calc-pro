/**
 * FreeFinCalc — SURGICAL FIX for components
 * Fixes exact broken patterns in Footer.js, Header.js, PdfDownload.js,
 * TrustSection.js, and app/page.js
 * Run from project root: node fix_components.js
 */
const fs = require('fs')

let fixed = 0

function patch(file, replacements) {
  if (!fs.existsSync(file)) { console.log('⚠️  Not found: ' + file); return }
  let content = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to)
      changed = true
      console.log(`  ✅ Fixed in ${file}:\n     ${from.slice(0,80)}`)
    }
  }
  if (changed) { fs.writeFileSync(file, content, 'utf8'); fixed++ }
  else console.log(`  ℹ️  No matches in ${file}`)
}

// ── Footer.js ─────────────────────────────────────────────────────
patch('components/Footer.js', [
  // fontFamily with double-quoted font name was corrupted: ""DM Serif Display",serif"
  // should be: '"DM Serif Display",serif'
  [`fontFamily:""DM Serif Display",serif"`,  `fontFamily:'"DM Serif Display",serif'`],
  [`fontFamily: ""DM Serif Display",serif"`, `fontFamily: '"DM Serif Display",serif'`],
  [`fontFamily:""DM Sans",sans-serif"`,       `fontFamily:'"DM Sans",sans-serif'`],
  [`fontFamily: ""DM Sans",sans-serif"`,      `fontFamily: '"DM Sans",sans-serif'`],
  // Also fix any variant with single-quote wrapper corrupted
  [`fontFamily:"'DM Serif Display',serif"`,  `fontFamily:"'DM Serif Display',serif"`],
])

// ── Header.js ─────────────────────────────────────────────────────
patch('components/Header.js', [
  // Template literal corrupted: '': '"  should be  '': ''
  [`dropdownOpen ? 'rotate-180' : '"}\`}`,  "dropdownOpen ? 'rotate-180' : ''}\`}"],
  [`dropdownOpen ? 'rotate-180' : "\`}`,    "dropdownOpen ? 'rotate-180' : ''}\`}"],
  // fontFamily corruptions
  [`fontFamily:""DM Serif Display",serif"`,  `fontFamily:'"DM Serif Display",serif'`],
  [`fontFamily: ""DM Serif Display",serif"`, `fontFamily: '"DM Serif Display",serif'`],
  [`fontFamily:""DM Sans",sans-serif"`,       `fontFamily:'"DM Sans",sans-serif'`],
  [`fontFamily: ""DM Sans",sans-serif"`,      `fontFamily: '"DM Sans",sans-serif'`],
])

// ── PdfDownload.js ────────────────────────────────────────────────
patch('components/PdfDownload.js', [
  [`fontFamily: ""DM Sans", sans-serif"`,    `fontFamily: '"DM Sans", sans-serif'`],
  [`fontFamily:""DM Sans",sans-serif"`,      `fontFamily:'"DM Sans",sans-serif'`],
  [`fontFamily: ""DM Sans",sans-serif"`,     `fontFamily: '"DM Sans",sans-serif'`],
  [`fontFamily: ""DM Serif Display",serif"`, `fontFamily: '"DM Serif Display",serif'`],
])

// ── TrustSection.js ───────────────────────────────────────────────
patch('components/TrustSection.js', [
  [`fontFamily:""DM Serif Display",Georgia,serif"`,  `fontFamily:'"DM Serif Display",Georgia,serif'`],
  [`fontFamily: ""DM Serif Display",Georgia,serif"`, `fontFamily: '"DM Serif Display",Georgia,serif'`],
  [`fontFamily:""DM Sans",sans-serif"`,              `fontFamily:'"DM Sans",sans-serif'`],
  [`fontFamily: ""DM Sans",sans-serif"`,             `fontFamily: '"DM Sans",sans-serif'`],
])

// ── app/page.js ───────────────────────────────────────────────────
patch('app/page.js', [
  [`fontFamily:""DM Serif Display",Georgia,serif"`,  `fontFamily:'"DM Serif Display",Georgia,serif'`],
  [`fontFamily: ""DM Serif Display",Georgia,serif"`, `fontFamily: '"DM Serif Display",Georgia,serif'`],
  [`fontFamily:""DM Serif Display",serif"`,          `fontFamily:'"DM Serif Display",serif'`],
  [`fontFamily: ""DM Serif Display",serif"`,         `fontFamily: '"DM Serif Display",serif'`],
  [`fontFamily:""DM Sans",sans-serif"`,              `fontFamily:'"DM Sans",sans-serif'`],
  [`fontFamily: ""DM Sans",sans-serif"`,             `fontFamily: '"DM Sans",sans-serif'`],
])

// ── Also scan ALL app pages for the same fontFamily corruption ────
const path = require('path')
function walkPages(dir) {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules','.next','.git'].includes(e.name)) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walkPages(full)
    else if (e.name.endsWith('.js') || e.name.endsWith('.jsx')) {
      patch(full, [
        [`fontFamily:""DM Serif Display",Georgia,serif"`,  `fontFamily:'"DM Serif Display",Georgia,serif'`],
        [`fontFamily: ""DM Serif Display",Georgia,serif"`, `fontFamily: '"DM Serif Display",Georgia,serif'`],
        [`fontFamily:""DM Serif Display",serif"`,          `fontFamily:'"DM Serif Display",serif'`],
        [`fontFamily: ""DM Serif Display",serif"`,         `fontFamily: '"DM Serif Display",serif'`],
        [`fontFamily:""DM Sans",sans-serif"`,              `fontFamily:'"DM Sans",sans-serif'`],
        [`fontFamily: ""DM Sans",sans-serif"`,             `fontFamily: '"DM Sans",sans-serif'`],
        [`fontFamily: ""DM Sans", sans-serif"`,            `fontFamily: '"DM Sans", sans-serif'`],
        // Header template literal fix
        [`dropdownOpen ? 'rotate-180' : '"}\`}`,  "dropdownOpen ? 'rotate-180' : ''}\`}"],
      ])
    }
  }
}
walkPages('app')
walkPages('components')

console.log(`
════════════════════════════════════════════
  ✅  ${fixed} file(s) patched

  Root cause: Previous fix scripts saw
  fontFamily: '"DM Serif Display",serif'
  and wrongly "fixed" the inner " to become
  fontFamily: ""DM Serif Display",serif"
  — breaking the JS string.

  Also fixed Header.js template literal:
  dropdownOpen ? 'rotate-180' : '"}\`
  → dropdownOpen ? 'rotate-180' : ''}\`

  Deploy:
  git add .
  git commit -m "Fix: restore font family strings and Header template literal"
  git push origin master:main
════════════════════════════════════════════
`)
