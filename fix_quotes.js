/**
 * FreeFinCalc — FIX: Mismatched quotes in pdfRows label strings
 * Caused by previous partial fix that swapped opening ' to " but left closing '
 * Result: { label: "Today's Money Worth...' }  ← broken
 * Fix:    { label: "Today's Money Worth..." }   ← correct
 *
 * Run from project root: node fix_quotes.js
 */
const fs = require('fs')
const path = require('path')

let totalFixed = 0

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content

  // Pattern 1: mismatched  "text'  →  "text"
  // Handles: { label: "Some text', value: ... : "' }
  // The broken pattern is: opening double-quote, content, closing single-quote
  // We need to find label: "...'  and value: ...: "'  and fix both ends

  // Fix label: "...text...'  →  label: "...text..."
  // This regex finds a double-quoted string that ends with a single quote before a comma
  content = content.replace(/label: "([^"'\n]*?)'/g, (match, inner) => {
    return `label: "${inner}"`
  })

  // Fix the empty fallback value  : "'  →  : ""
  content = content.replace(/: "'\s*}/g, ': "" }')
  content = content.replace(/: "' }/g, ': "" }')
  content = content.replace(/: "'}/g, ': ""}')

  // Fix any remaining  "'  at end of a ternary expression line
  content = content.replace(/: "'(\s*[,\]])/g, ': ""$1')

  // Also fix the reverse: single-quoted label that has double-quote terminator
  // e.g.  label: 'text"  →  label: "text"
  content = content.replace(/label: '([^'"]*?)"/g, (match, inner) => {
    return `label: "${inner}"`
  })

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('✅ Fixed: ' + filePath)
    totalFixed++
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

walk('app')

// ── Verification pass ──────────────────────────────────────────────
console.log('\n🔍 Running verification scan...')
let issues = 0
function verify(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) verify(full)
    else if (entry.name === 'page.js') {
      const lines = fs.readFileSync(full, 'utf8').split('\n')
      lines.forEach((line, i) => {
        // flag lines inside pdfRows with mismatched quotes
        if (line.includes('label:') && (
          /label: "[^"]*'/.test(line) ||
          /label: '[^']*"/.test(line)
        )) {
          console.log(`  ⚠️  Still broken → ${full}:${i+1}`)
          console.log(`     ${line.trim()}`)
          issues++
        }
      })
    }
  }
}
verify('app')

if (issues === 0) {
  console.log('  ✅ No mismatched label quotes found!')
} else {
  console.log(`  ⚠️  ${issues} line(s) may still need manual review`)
}

console.log(`
════════════════════════════════════════════
  ✅  FIX COMPLETE — ${totalFixed} file(s) patched
════════════════════════════════════════════
  Root cause:
  Previous fix swapped opening ' → " in label
  strings but left the closing ' unchanged,
  creating mismatched "text' pairs.

  This script closes all label strings with
  matching double quotes and fixes the empty
  fallback value  : "'  →  : ""

  Deploy:
  git add .
  git commit -m "Fix: correct mismatched quotes in pdfRows"
  git push origin master:main
════════════════════════════════════════════
`)
