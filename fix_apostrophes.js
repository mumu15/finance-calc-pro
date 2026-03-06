/**
 * FreeFinCalc — FIX: Unescaped apostrophes in label strings
 * Fixes: { label: 'Today's ...' }  →  { label: "Today's ..." }
 * Run from project root: node fix_apostrophes.js
 */
const fs = require('fs')
const path = require('path')

let totalFixed = 0

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  // Fix pdfRows label strings that contain apostrophes:
  // { label: 'it's ...' }  →  { label: "it's ..." }
  // Strategy: find single-quoted strings inside { label: '...' } that contain an apostrophe
  const fixed = content.replace(
    /\{ label: '([^']*'[^']*)'/g,
    (match, inner) => `{ label: "${inner.replace(/'/g, "'")}"`
  )

  // Also fix any label with a curly apostrophe or straight apostrophe inside single quotes
  // More robust: replace all single-quoted label values that contain apostrophes with double quotes
  const fixed2 = fixed.replace(
    /label: '((?:[^'\\]|\\.)*)'/g,
    (match, inner) => {
      if (inner.includes("'")) {
        return `label: "${inner}"`
      }
      return match
    }
  )

  if (fixed2 !== content) {
    fs.writeFileSync(filePath, fixed2, 'utf8')
    console.log('✅ Fixed: ' + filePath)
    totalFixed++
    changed = true
  }
  return changed
}

// Also do a targeted replacement for the known broken file
function fixKnown() {
  const known = [
    'app/inflation-impact-calculator/page.js',
    'app/home-equity-calculator/page.js',
    'app/car-depreciation-calculator/page.js',
  ]
  for (const f of known) {
    if (!fs.existsSync(f)) continue
    let content = fs.readFileSync(f, 'utf8')
    // Replace any label: '...apostrophe...' with double-quoted version
    const updated = content.replace(
      /label: '([^'\n]*'[^'\n]*)'/g,
      (match, inner) => `label: "${inner}"`
    )
    if (updated !== content) {
      fs.writeFileSync(f, updated, 'utf8')
      console.log('✅ Targeted fix: ' + f)
      totalFixed++
    }
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name === 'page.js' || entry.name === 'page.jsx') fixFile(full)
  }
}

fixKnown()
walk('app')

console.log(`
════════════════════════════════════════════
  ✅  FIX COMPLETE — ${totalFixed} file(s) patched
════════════════════════════════════════════
  Root cause:
  Label strings like { label: 'Today's ...' }
  contain an apostrophe that terminates the
  JS string early → syntax error.

  Fix: switched those labels to double-quoted
  strings so the apostrophe is safe.

  Deploy:
  git add .
  git commit -m "Fix: escape apostrophes in label strings"
  git push origin master:main
════════════════════════════════════════════
`)
