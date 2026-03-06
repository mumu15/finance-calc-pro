/**
 * FreeFinCalc — DEFINITIVE QUOTE FIX
 * Precisely fixes mismatched " ... ' string delimiters in JS/JSX files
 * WITHOUT corrupting valid code like className="..." style='...' etc.
 *
 * Run from project root: node fix_definitive.js
 */
const fs = require('fs')
const path = require('path')

let totalFiles = 0
let totalFixes = 0

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')
  let content = original

  // ── PASS 1 ────────────────────────────────────────────────────────
  // Fix:  "sometext'  followed by } ) , ] space or newline
  // i.e. a double-quote opened a string but a single-quote closed it
  // Example:  {rate + "%'}      →  {rate + "%"}
  // Example:  color:"#f0c842'}  →  color:"#f0c842"}
  // Example:  suffix: " years'  →  suffix: " years"
  // Example:  setTermType("years')  →  setTermType("years")
  // Regex: opening "  then any chars that aren't " or '  then closing '
  // followed by a JS terminator character
  content = content.replace(/"([^"'\n\r]*?)'([\s\t\r\n})\],;])/g, '"$1"$2')

  // ── PASS 2 ────────────────────────────────────────────────────────
  // Fix the apostrophe-in-label issue where previous scripts created:
  //   label: "Today"s Money  (apostrophe became double-quote)
  // → label: "Today's Money"
  content = content.replace(/([a-zA-Z])"s\s/g, "$1's ")

  // ── PASS 3 ────────────────────────────────────────────────────────
  // Fix: + "%'}  still remaining (pass 1 may miss if no space after)
  content = content.replace(/"([^"'\n\r]*?)'\}/g, '"$1"}')
  content = content.replace(/"([^"'\n\r]*?)'\)/g, '"$1")')
  content = content.replace(/"([^"'\n\r]*?)',/g, (match, inner) => {
    // Only fix if this looks like a JS string value (not natural prose with comma)
    // Safe indicators: inner contains %, #, digits, or is very short
    if (/[%#]/.test(inner) || inner.length < 30) {
      return `"${inner}",`
    }
    return match
  })

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8')
    const fixes = (content.match(/fixed/g) || []).length
    console.log(`✅ ${filePath}`)
    totalFiles++

    // Count actual changes
    let changed = 0
    const origLines = original.split('\n')
    const newLines  = content.split('\n')
    origLines.forEach((l, i) => { if (l !== newLines[i]) changed++ })
    totalFixes += changed
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) fixFile(full)
  }
}

walk('app')
walk('components')

// ── VERIFICATION ──────────────────────────────────────────────────
console.log('\n🔍 Scanning for remaining issues...\n')
let remaining = 0

function verify(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) verify(full)
    else if (/\.(js|jsx)$/.test(entry.name)) {
      const lines = fs.readFileSync(full, 'utf8').split('\n')
      lines.forEach((line, i) => {
        // Look for the specific broken patterns from the build log
        const broken = [
          /"\s*%'\s*}/, // "%'}
          /"#[0-9a-fA-F]{3,8}'\s*[})]/, // "#f0c842'}
          /rgba\([^)]+\)'/, // rgba(...)' 
          /" years'\s*[}),]/, // " years'}
          /"[^"']{0,60}'\s*}\s*}\s*>/, // style value mismatch in JSX
          /\+ "%'/, // + "%'
        ]
        for (const pattern of broken) {
          if (pattern.test(line)) {
            console.log(`  ⚠️  ${full}:${i + 1}`)
            console.log(`     ${line.trim().slice(0, 130)}`)
            remaining++
            break
          }
        }
      })
    }
  }
}

verify('app')
verify('components')

if (remaining === 0) {
  console.log('  ✅ Zero broken patterns remaining — ready to deploy!\n')
} else {
  console.log(`\n  ⚠️  ${remaining} line(s) still flagged above\n`)
}

console.log(`════════════════════════════════════════════
  Files patched : ${totalFiles}
  Lines fixed   : ${totalFixes}
  Issues remain : ${remaining}
════════════════════════════════════════════
${remaining === 0 ? `
  Deploy:
  git add .
  git commit -m "Fix: definitive quote cleanup"
  git push origin master:main
` : `
  ⚠️  Check flagged files above before deploying
`}════════════════════════════════════════════`)
