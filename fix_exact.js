/**
 * EXACT STRING REPLACEMENT — no regex, no scanning
 * Fixes only the 3 files shown in the latest build log
 * node fix_exact.js
 */
const fs = require('fs')

function fix(file, from, to) {
  if (!fs.existsSync(file)) { console.log('NOT FOUND: ' + file); return }
  const src = fs.readFileSync(file, 'utf8')
  if (!src.includes(from)) { console.log('STRING NOT FOUND in ' + file + ':\n  ' + from); return }
  fs.writeFileSync(file, src.split(from).join(to), 'utf8')
  console.log('✅ Fixed: ' + file)
}

// ── 1. CurrencySelector.js:42 ─────────────────────────────────────
// BROKEN:  ${open ? 'rotate-180' : '"}`
// FIXED:   ${open ? 'rotate-180' : ''}`
fix(
  'components/CurrencySelector.js',
  `\${open ? 'rotate-180' : '"}\`}`,
  `\${open ? 'rotate-180' : ''}\`}`
)

// ── 2. app/page.js:98 ─────────────────────────────────────────────
// BROKEN:  paddingRight:tool.badge?"52px':'0'
// FIXED:   paddingRight:tool.badge?'52px':'0'
fix(
  'app/page.js',
  `paddingRight:tool.badge?"52px':'0'`,
  `paddingRight:tool.badge?'52px':'0'`
)

// ── 3. app/tax-calculator/page.js:166 ────────────────────────────
// BROKEN:  style={{"--hover':'1'}}
// FIXED:   (remove the broken style prop entirely — it does nothing useful)
fix(
  'app/tax-calculator/page.js',
  ` style={{"--hover':'1'"}}`,
  ''
)
// alternate form in case spacing differs
fix(
  'app/tax-calculator/page.js',
  `style={{"--hover':'1'"}}`,
  ''
)
fix(
  'app/tax-calculator/page.js',
  `style={{"--hover':'1'}}`,
  ''
)

console.log(`
════════════════════════════════
  Deploy:
  git add .
  git commit -m "Fix: exact surgical quote fixes"
  git push origin master:main
════════════════════════════════`)
