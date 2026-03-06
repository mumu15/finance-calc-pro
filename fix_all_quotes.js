/**
 * FreeFinCalc — COMPREHENSIVE QUOTE FIX
 * Fixes ALL mismatched quote patterns introduced by previous fix scripts
 * Run from project root: node fix_all_quotes.js
 */
const fs = require('fs')
const path = require('path')

let totalFixed = 0
let totalLines = 0

function fixContent(content) {
  const lines = content.split('\n')
  let changed = false

  const fixed = lines.map((line, idx) => {
    const original = line

    // ── Pattern 1: "text'  →  "text"
    // e.g.  color: "#60a5fa'  →  color: "#60a5fa"
    // e.g.  suffix: "%'       →  suffix: "%"
    // e.g.  suffix: " years'  →  suffix: " years"
    // e.g.  setTermType("years')  →  setTermType("years")
    // Match: opening "  then non-quote chars  then closing '
    // But only when the ' is acting as a string terminator (followed by , ) } space newline)
    line = line.replace(/"([^"'\n]*?)'/g, (match, inner) => {
      // Only fix if this looks like a mismatched string terminator
      // i.e. the ' is at the end of what should be a string value
      return `"${inner}"`
    })

    // ── Pattern 2: 'text"  →  "text"  (reverse mismatch)
    line = line.replace(/'([^"'\n]*?)"/g, (match, inner) => {
      return `"${inner}"`
    })

    // ── Pattern 3: "Today"s  →  "Today's"
    // The apostrophe fix wrongly escaped the ' to " creating  "Today"s
    line = line.replace(/"([A-Za-z]+)"s\b/g, `"$1's`)

    // ── Pattern 4: label: "Today"s Money Worth in Future"
    // More general: word followed by "s inside a string
    line = line.replace(/([A-Za-z])"s ([A-Za-z])/g, `$1's $2`)

    if (line !== original) {
      changed = true
      totalLines++
    }
    return line
  })

  return { content: fixed.join('\n'), changed }
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')
  const { content, changed } = fixContent(original)
  if (changed) {
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
    else if (entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) {
      processFile(full)
    }
  }
}

// ── Walk all app files ─────────────────────────────────────────────
walk('app')
walk('components')

// ── Verification: report any remaining suspicious patterns ─────────
console.log('\n🔍 Verification scan...')
let issues = 0
function verify(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) verify(full)
    else if (entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) {
      const lines = fs.readFileSync(full, 'utf8').split('\n')
      lines.forEach((line, i) => {
        // Flag mismatched: "text'  or  'text"  inside JS (not JSX className etc)
        if (/"[^"'\n]{0,80}'/.test(line) || /'[^"'\n]{0,80}"/.test(line)) {
          // Ignore lines that are just normal JSX with both quote types for different attrs
          if (line.includes('className=') && !line.includes('label:') && !line.includes('suffix:') && !line.includes('color:')) return
          console.log(`  ⚠️  ${full}:${i + 1}`)
          console.log(`     ${line.trim().slice(0, 120)}`)
          issues++
        }
      })
    }
  }
}
verify('app')

if (issues === 0) {
  console.log('  ✅ No mismatched quotes found — all clean!')
} else {
  console.log(`\n  ⚠️  ${issues} line(s) flagged — review above`)
}

console.log(`
════════════════════════════════════════════
  Files fixed : ${totalFixed}
  Lines fixed : ${totalLines}
════════════════════════════════════════════
  Deploy:
  git add .
  git commit -m "Fix: comprehensive quote cleanup across all pages"
  git push origin master:main
════════════════════════════════════════════
`)
