/**
 * FreeFinCalc — FIX: Unquoted string defaults in useState()
 * Fixes: useState(pct) → useState('pct')
 *        useState(add) → useState('add')  etc.
 * Run from project root: node fix_usestate.js
 */
const fs = require('fs')
const path = require('path')

// All known string-valued select defaults across Stage 2 pages
const STRING_DEFAULTS = [
  'pct', 'flat',         // raise-calculator
  'add', 'remove',       // vat-calculator, sales-tax-calculator
  'avalanche', 'snowball', // payoff-vs-invest-calculator, debt-payoff-calculator
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR', 'AED', 'SGD', 'JPY', 'CNY', 'CHF', 'MXN', 'BRL', 'ZAR', // currency-converter
]

let totalFixed = 0

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  for (const val of STRING_DEFAULTS) {
    // Match: useState(val)  where val is NOT already quoted
    const pattern = new RegExp(`useState\\(${val}\\)`, 'g')
    if (pattern.test(content)) {
      content = content.replace(new RegExp(`useState\\(${val}\\)`, 'g'), `useState('${val}')`)
      changed = true
    }
  }

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
    else if (entry.name === 'page.js' || entry.name === 'page.jsx') fixFile(full)
  }
}

walk('app')

console.log(`
════════════════════════════════════════════
  ✅  FIX COMPLETE — ${totalFixed} files patched
════════════════════════════════════════════
  Root cause: The page generator wrote
    useState(pct)  instead of useState('pct')
    useState(add)  instead of useState('add')
  for string-typed select field defaults.
  JavaScript tried to evaluate them as
  variable names → ReferenceError.

  Affected calculators:
  • raise-calculator        (pct / flat)
  • vat-calculator          (add / remove)
  • sales-tax-calculator    (add / remove)
  • payoff-vs-invest-calc   (avalanche)
  • debt-payoff-calculator  (avalanche)
  • currency-converter      (USD / EUR)

  Deploy:
  git add .
  git commit -m "Fix: quote string defaults in useState"
  git push origin master:main
════════════════════════════════════════════
`)
