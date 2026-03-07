/**
 * FreeFinCalc.net — Fix mortgage PDF (TDZ fix)
 * node fix_mortgage_pdf_v2.js
 *
 * Problem: pdfRows was inserted BEFORE downPct const,
 * but pdfRows references downPct → TDZ crash at prerender.
 *
 * Fix: move pdfRows AFTER downPct + displayedSchedule,
 * and compute downPct inline to be safe.
 */

const fs = require('fs')
const path = 'app/mortgage-calculator/page.js'
let code = fs.readFileSync(path, 'utf8')

// ── Step 1: Remove any pdfRows block that was added previously ─────────────
// Remove from the misplaced location (before downPct)
code = code.replace(
  /\n\s*const pdfRows = \[[\s\S]*?\]\n\n\s*const downPct/,
  '\n\n  const downPct'
)

// Also remove any stray pdfRows block anywhere else (safety)
code = code.replace(/\n\s*const pdfRows = \[[\s\S]*?\n  \]\n/g, '\n')

console.log('✅ Removed any existing pdfRows blocks')

// ── Step 2: Add import if not present ─────────────────────────────────────
if (!code.includes("import PdfDownload")) {
  code = code.replace(
    "import AdUnit from '../components/AdUnit'",
    "import AdUnit from '../components/AdUnit'\nimport PdfDownload from '../../components/PdfDownload'"
  )
  console.log('✅ PdfDownload import added')
} else {
  console.log('ℹ️  PdfDownload import already present')
}

// ── Step 3: Insert pdfRows AFTER displayedSchedule (safe location) ─────────
// Both downPct and calc are defined before displayedSchedule
const insertAfter = '  const displayedSchedule = showFull ? calc.schedule : calc.schedule.slice(0, 24)'

const pdfRowsBlock = `
  const _downPct = Math.round((downPayment / homePrice) * 100)
  const pdfRows = [
    { label: "Home Price",           value: String(fmt(homePrice))                          },
    { label: "Down Payment",         value: String(fmt(downPayment)) + " (" + _downPct + "%)" },
    { label: "Loan Amount",          value: String(fmt(calc.loanAmount))                    },
    { label: "Interest Rate",        value: String(interestRate) + "%"                      },
    { label: "Loan Term",            value: String(loanTerm) + " years"                     },
    { label: "Monthly Payment",      value: String(fmt(calc.total))                         },
    { label: "Principal & Interest", value: String(fmt(calc.pi)) + "/mo"                   },
    { label: "Property Tax",         value: String(fmt(calc.monthlyTax)) + "/mo"            },
    { label: "Home Insurance",       value: String(fmt(calc.monthlyIns)) + "/mo"            },
    { label: "Total Interest",       value: String(fmt(calc.totalInterest))                 },
    { label: "Total Cost",           value: String(fmt(calc.totalCost))                     },
  ]`

if (!code.includes('const pdfRows')) {
  if (code.includes(insertAfter)) {
    code = code.replace(insertAfter, insertAfter + '\n' + pdfRowsBlock)
    console.log('✅ pdfRows inserted after displayedSchedule')
  } else {
    console.error('❌ Could not find insertion point:', insertAfter)
    process.exit(1)
  }
}

// ── Step 4: Add PdfDownload button to Monthly Payment header ───────────────
// Remove old wrapper if already applied (idempotent)
code = code.replace(
  /<div className="flex justify-between items-center mb-4">\s*<h2 className="text-white font-bold text-lg">Monthly Payment<\/h2>\s*<PdfDownload[^\/]*\/>\s*<\/div>/,
  '<h2 className="text-white font-bold text-lg mb-4">Monthly Payment</h2>'
)

// Now apply fresh
if (!code.includes('PdfDownload title=')) {
  code = code.replace(
    '<h2 className="text-white font-bold text-lg mb-4">Monthly Payment</h2>',
    `<div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Monthly Payment</h2>
                <PdfDownload title="Mortgage Calculator" rows={pdfRows} />
              </div>`
  )
  console.log('✅ PdfDownload button added to Monthly Payment header')
} else {
  console.log('ℹ️  PdfDownload button already present')
}

fs.writeFileSync(path, code, 'utf8')

console.log(`
════════════════════════════════════════════════════
  MORTGAGE PDF FIX v2 COMPLETE
════════════════════════════════════════════════════
  ✅ pdfRows placed AFTER displayedSchedule
  ✅ downPct computed inline as _downPct (no TDZ)
  ✅ PdfDownload button in Monthly Payment header
  ✅ Build should pass on Vercel now
════════════════════════════════════════════════════
`)
