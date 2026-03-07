/**
 * FreeFinCalc.net — Add PdfDownload to mortgage calculator
 * node fix_mortgage_pdf.js
 */

const fs = require('fs')
const path = 'app/mortgage-calculator/page.js'
let code = fs.readFileSync(path, 'utf8')

// 1. Add PdfDownload import after AdUnit import
if (!code.includes("import PdfDownload")) {
  code = code.replace(
    "import AdUnit from '../components/AdUnit'",
    "import AdUnit from '../components/AdUnit'\nimport PdfDownload from '../../components/PdfDownload'"
  )
  console.log('✅ PdfDownload import added')
}

// 2. Add pdfRows const after the calc useMemo block (before downPct line)
const pdfRowsBlock = `
  const pdfRows = [
    { label: "Home Price",          value: String(fmt(homePrice))          },
    { label: "Down Payment",        value: String(fmt(downPayment)) + " (" + downPct + "%)" },
    { label: "Loan Amount",         value: String(fmt(calc.loanAmount))     },
    { label: "Interest Rate",       value: String(interestRate) + "%"       },
    { label: "Loan Term",           value: String(loanTerm) + " years"      },
    { label: "Monthly Payment",     value: String(fmt(calc.total))          },
    { label: "Principal & Interest",value: String(fmt(calc.pi))             },
    { label: "Property Tax",        value: String(fmt(calc.monthlyTax)) + "/mo" },
    { label: "Home Insurance",      value: String(fmt(calc.monthlyIns)) + "/mo" },
    { label: "Total Interest",      value: String(fmt(calc.totalInterest))  },
    { label: "Total Cost",          value: String(fmt(calc.totalCost))      },
  ]

`

if (!code.includes('pdfRows')) {
  code = code.replace(
    '  const downPct = Math.round',
    pdfRowsBlock + '  const downPct = Math.round'
  )
  console.log('✅ pdfRows block added')
}

// 3. Add PdfDownload button to Monthly Payment results header
// The results box has: <h2 className="text-white font-bold text-lg mb-4">Monthly Payment</h2>
// We need to wrap it in a flex div and add the button
if (!code.includes('PdfDownload title=')) {
  code = code.replace(
    '<h2 className="text-white font-bold text-lg mb-4">Monthly Payment</h2>',
    `<div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Monthly Payment</h2>
                <PdfDownload title="Mortgage Calculator" rows={pdfRows} />
              </div>`
  )
  console.log('✅ PdfDownload button added to results header')
}

fs.writeFileSync(path, code, 'utf8')

console.log(`
════════════════════════════════════════════════
  MORTGAGE CALCULATOR PDF FIXED
════════════════════════════════════════════════
  ✅ Import added
  ✅ pdfRows with 11 fields added
  ✅ Download button in Monthly Payment header
════════════════════════════════════════════════
`)
