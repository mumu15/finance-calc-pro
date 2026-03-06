/**
 * FreeFinCalc.net — STAGE 7: 10 Calculator Pages
 * Business & Advanced
 * Run from project root: node stage7_calculators.js
 *
 *  1. business-loan-calculator
 *  2. sba-loan-calculator
 *  3. accounts-receivable-calculator
 *  4. cash-flow-calculator
 *  5. working-capital-calculator
 *  6. debt-service-coverage-calculator
 *  7. employee-cost-calculator
 *  8. startup-cost-calculator
 *  9. ecommerce-profit-calculator
 * 10. saas-metrics-calculator
 *
 * CLEAN CODE RULES (strictly followed):
 * - Zero apostrophes in any string, label or JSX text
 * - All pdfRows labels in double quotes only
 * - String useState defaults: useState('value')
 * - No font family strings with embedded quotes
 * - No export const metadata in client components
 * - Template literals only inside {}, never in JSX attributes
 */

const fs = require('fs')

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅ app/' + dir)
}

function page(title, desc, icon, inputs, formula, results, faqs, related) {
  const states = inputs.map(f => {
    const def = typeof f.def === 'string' ? `'${f.def}'` : f.def
    return `  const [${f.s}, set${cap(f.s)}] = useState(${def})`
  }).join('\n')

  const deps = inputs.map(f => f.s).join(', ')

  const inputsJSX = inputs.map(f => {
    if (f.type === 'range') {
      let disp
      if (f.cur)      disp = `fmt(${f.s})`
      else if (f.pct) disp = `\`\${${f.s}}%\``
      else if (f.sfx) disp = `\`\${${f.s}}${f.sfx}\``
      else            disp = f.s
      return `
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">${f.label}</label>
                  <span className="text-white font-bold text-sm">{${disp}}</span>
                </div>
                <input type="range" min={${f.min}} max={${f.max}} step={${f.step}}
                  value={${f.s}} onChange={e => set${cap(f.s)}(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>`
    }
    if (f.type === 'select') {
      return `
              <div>
                <label className="text-slate-400 text-sm block mb-2">${f.label}</label>
                <div className="flex flex-wrap gap-2">
                  {(${JSON.stringify(f.opts)}).map(o => (
                    <button key={o.v} onClick={() => set${cap(f.s)}(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: ${f.s} === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: ${f.s} === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: ${f.s} === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>`
    }
    return ''
  }).join('\n')

  const resultsJSX = results.map(r => `
                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">${r.label}</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}}
                    </span>
                  </div>`).join('\n')

  const pdfRows = results.map(r =>
    `    { label: "${r.label}", value: result.${r.k} !== undefined ? String(${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}) : "" },`
  ).join('\n')

  const relatedJSX = related.map(r => `
            <a href="${r.href}" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">${r.icon}</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">${r.name}</h3>
            </a>`).join('\n')

  const faqsJSX = faqs.map((f, i) => `
            <div className="${i < faqs.length - 1 ? 'border-b pb-4' : 'pb-4'}" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">${f.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">${f.a}</p>
            </div>`).join('\n')

  return `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
${states}

  const result = useMemo(() => {
    try {
${formula}
    } catch(e) { return null }
  }, [${deps}])

  const pdfRows = result ? [
${pdfRows}
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">${icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">${title}</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">${desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">
${inputsJSX}
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="${title}" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">
${resultsJSX}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or business advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
${relatedJSX}
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
${faqsJSX}
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
`
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Business Loan Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('business-loan-calculator', page(
  'Business Loan Calculator',
  'Calculate monthly payments, total interest and true cost for any business loan.',
  '🏦',
  [
    { s:'loanAmount',   label:'Loan Amount',             type:'range', min:5000,   max:5000000, step:5000,  cur:true, def:100000 },
    { s:'rate',         label:'Annual Interest Rate',    type:'range', min:1,      max:40,      step:0.25,  pct:true, def:9      },
    { s:'termMonths',   label:'Loan Term',               type:'select', def:60, opts:[{v:12,l:'12 mo'},{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:60,l:'60 mo'},{v:84,l:'84 mo'},{v:120,l:'120 mo'}] },
    { s:'originFee',    label:'Origination Fee',         type:'range', min:0,      max:20000,   step:100,   cur:true, def:2000   },
    { s:'annualRevenue',label:'Annual Business Revenue', type:'range', min:0,      max:10000000,step:10000, cur:true, def:500000 },
  ],
  `      const r           = rate / 100 / 12
      const n           = termMonths
      const monthly     = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid   = monthly * n + originFee
      const totalInterest = monthly * n - loanAmount
      const debtToRev   = (loanAmount / annualRevenue * 100).toFixed(1) + '%'
      const monthlyRevCoverage = annualRevenue > 0
        ? (annualRevenue / 12 / monthly).toFixed(1) + 'x'
        : 'N/A'
      return { monthly, totalInterest, totalPaid, debtToRev, monthlyRevCoverage }`,
  [
    { label:'Monthly Payment',            k:'monthly',             cur:true  },
    { label:'Total Interest Cost',        k:'totalInterest',       cur:true  },
    { label:'Total Loan Cost',            k:'totalPaid',           cur:true  },
    { label:'Loan to Annual Revenue',     k:'debtToRev',           cur:false },
    { label:'Revenue Coverage Ratio',     k:'monthlyRevCoverage',  cur:false },
  ],
  [
    { q:'What credit score do I need for a business loan?', a:'Requirements vary by lender and loan type: SBA loans typically require 640-680+ personal credit score. Traditional bank loans 680-720+. Online lenders 550-600+. Some revenue-based lenders focus more on cash flow than credit score. A strong business revenue history (2+ years) and healthy cash flow often matter as much as the score itself.' },
    { q:'What types of business loans are available?', a:'Main business loan types: Term loans (lump sum, fixed payments), SBA loans (government-backed, best rates), Business lines of credit (revolving, flexible), Equipment financing (collateral is the equipment), Invoice factoring (advance on receivables), Merchant cash advance (high cost, avoid if possible), and Commercial real estate loans.' },
    { q:'How does a business loan affect my personal credit?', a:'Most small business loans require a personal guarantee, meaning your personal credit is on the line. Hard inquiries appear on your personal report. Missed payments are reported personally. Building business credit (Dun and Bradstreet, PAYDEX score) over time allows you to qualify for business-only credit without personal guarantees.' },
  ],
  [
    { href:'/sba-loan-calculator',              icon:'🏛️', name:'SBA Loan'           },
    { href:'/debt-service-coverage-calculator', icon:'📊', name:'Debt Coverage'      },
    { href:'/working-capital-calculator',       icon:'💰', name:'Working Capital'    },
    { href:'/break-even-calculator',            icon:'⚖️', name:'Break-Even'         },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 2. SBA Loan Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('sba-loan-calculator', page(
  'SBA Loan Calculator',
  'Calculate SBA 7(a) and 504 loan payments, fees and total cost for small business financing.',
  '🏛️',
  [
    { s:'loanAmount',  label:'Loan Amount',              type:'range', min:10000,  max:5000000, step:10000, cur:true, def:250000 },
    { s:'loanType',    label:'SBA Loan Type',            type:'select', def:'7a', opts:[{v:'7a',l:'SBA 7(a)'},{v:'504',l:'SBA 504'},{v:'micro',l:'SBA Microloan'}] },
    { s:'termYears',   label:'Loan Term',                type:'select', def:10, opts:[{v:7,l:'7 yrs'},{v:10,l:'10 yrs'},{v:25,l:'25 yrs (real estate)'}] },
    { s:'baseRate',    label:'Base Prime Rate',          type:'range', min:3,      max:12,      step:0.25,  pct:true, def:8.5    },
  ],
  `      // SBA rate spreads above prime
      const spread    = loanType === '7a' ? (loanAmount < 25000 ? 4.25 : loanAmount < 50000 ? 3.25 : 2.25) : loanType === '504' ? 1.5 : 6.5
      const rate      = baseRate + spread
      const r         = rate / 100 / 12
      const n         = termYears * 12
      const monthly   = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - loanAmount
      // SBA guarantee fee approx (varies by amount and term)
      const guaranteeFee  = loanAmount > 150000 ? loanAmount * 0.03 : loanAmount * 0.02
      const totalCost     = totalPaid + guaranteeFee
      const effectiveRate = rate.toFixed(2) + '%'
      return { monthly, totalInterest, totalCost, guaranteeFee, effectiveRate, rate: rate.toFixed(2) + '%' }`,
  [
    { label:'Monthly Payment',         k:'monthly',       cur:true  },
    { label:'Total Interest',          k:'totalInterest', cur:true  },
    { label:'SBA Guarantee Fee',       k:'guaranteeFee',  cur:true  },
    { label:'Total Loan Cost',         k:'totalCost',     cur:true  },
    { label:'Effective Interest Rate', k:'effectiveRate', cur:false },
  ],
  [
    { q:'What is an SBA 7(a) loan?', a:'The SBA 7(a) is the most common small business loan, guaranteed up to 85% by the Small Business Administration. Maximum loan amount is $5 million. Rates are prime plus a spread (capped by SBA). Terms up to 10 years for working capital, 25 years for real estate. Requires strong personal credit (640+), 2+ years in business, and ability to repay from cash flow.' },
    { q:'SBA 7(a) vs SBA 504 loan: what is the difference?', a:'SBA 7(a) is general purpose — working capital, equipment, real estate, acquisitions. SBA 504 is specifically for major fixed assets (real estate, large equipment). 504 loans typically offer lower rates and longer terms (up to 25 years) for real estate. 504 requires a Certified Development Company (CDC) partner and at least 10% borrower equity contribution.' },
    { q:'How long does SBA loan approval take?', a:'SBA Express loans (up to $500,000): 36-hour approval, 2-4 weeks to fund. Standard SBA 7(a): 30-90 days. SBA 504: 60-90 days. Working with an SBA Preferred Lender (PLP) speeds up approval significantly as they can approve in-house. Prepare 2 years of business and personal tax returns, financial statements, and a business plan to expedite the process.' },
  ],
  [
    { href:'/business-loan-calculator',         icon:'🏦', name:'Business Loan'     },
    { href:'/debt-service-coverage-calculator', icon:'📊', name:'Debt Coverage'     },
    { href:'/working-capital-calculator',       icon:'💰', name:'Working Capital'   },
    { href:'/startup-cost-calculator',          icon:'🚀', name:'Startup Cost'      },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 3. Accounts Receivable Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('accounts-receivable-calculator', page(
  'Accounts Receivable Calculator',
  'Calculate Days Sales Outstanding (DSO), AR turnover and the true cost of slow-paying customers.',
  '📬',
  [
    { s:'annualRevenue',  label:'Annual Revenue',             type:'range', min:10000,  max:100000000, step:10000, cur:true, def:1200000 },
    { s:'arBalance',      label:'Current AR Balance',         type:'range', min:0,      max:10000000,  step:1000,  cur:true, def:150000  },
    { s:'badDebtRate',    label:'Bad Debt Rate',              type:'range', min:0,      max:10,        step:0.1,   pct:true, def:2       },
    { s:'borrowingRate',  label:'Business Borrowing Rate',    type:'range', min:1,      max:25,        step:0.25,  pct:true, def:9       },
    { s:'targetDso',      label:'Target DSO (days)',          type:'range', min:15,     max:90,        step:5,     sfx:' days', def:30   },
  ],
  `      const dailyRevenue  = annualRevenue / 365
      const dso            = (arBalance / dailyRevenue).toFixed(1) + ' days'
      const arTurnover     = (annualRevenue / arBalance).toFixed(2) + 'x'
      const badDebtCost    = arBalance * (badDebtRate / 100)
      const carryingCost   = arBalance * (borrowingRate / 100)
      const totalArCost    = badDebtCost + carryingCost
      const targetAr       = dailyRevenue * targetDso
      const excessAr       = Math.max(0, arBalance - targetAr)
      const excessCost     = excessAr * (borrowingRate / 100)
      return { dso, arTurnover, badDebtCost, carryingCost, totalArCost, targetAr, excessAr, excessCost }`,
  [
    { label:'Days Sales Outstanding (DSO)', k:'dso',          cur:false },
    { label:'AR Turnover Ratio',            k:'arTurnover',   cur:false },
    { label:'Annual Bad Debt Cost',         k:'badDebtCost',  cur:true  },
    { label:'Annual Carrying Cost of AR',   k:'carryingCost', cur:true  },
    { label:'Total Annual AR Cost',         k:'totalArCost',  cur:true  },
    { label:'Target AR Balance',            k:'targetAr',     cur:true  },
    { label:'Excess AR Above Target',       k:'excessAr',     cur:true  },
    { label:'Cost of Excess AR',            k:'excessCost',   cur:true  },
  ],
  [
    { q:'What is Days Sales Outstanding (DSO)?', a:'DSO measures the average number of days it takes to collect payment after a sale. DSO = (AR Balance / Annual Revenue) x 365. A DSO of 45 means you wait 45 days on average to get paid. Lower DSO means faster cash collection. Compare your DSO to your payment terms: if terms are Net 30 but DSO is 55, customers are paying late.' },
    { q:'What is a good DSO for a business?', a:'A good DSO is close to your stated payment terms. If you offer Net 30, aim for DSO of 30-40 days. Industry benchmarks vary: professional services 40-60 days, manufacturing 45-55 days, retail near zero (cash sales). DSO above 60 days for Net 30 terms signals a collections problem that is draining cash flow.' },
    { q:'How do I reduce DSO and improve cash flow?', a:'Effective strategies: invoice immediately upon delivery (not at month end), offer early payment discounts (2/10 Net 30 = 2% discount if paid within 10 days), automate payment reminders at 7, 14, and 30 days past due, require deposits upfront for large projects, accept credit cards, and enforce late payment fees consistently.' },
  ],
  [
    { href:'/cash-flow-calculator',         icon:'💰', name:'Cash Flow'         },
    { href:'/working-capital-calculator',   icon:'⚙️', name:'Working Capital'   },
    { href:'/invoice-calculator',           icon:'📄', name:'Invoice Calculator'},
    { href:'/business-loan-calculator',     icon:'🏦', name:'Business Loan'     },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 4. Cash Flow Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('cash-flow-calculator', page(
  'Cash Flow Calculator',
  'Calculate operating cash flow, free cash flow and cash runway for your business.',
  '💰',
  [
    { s:'revenue',       label:'Monthly Revenue',              type:'range', min:0,   max:10000000, step:1000, cur:true, def:80000  },
    { s:'cogs',          label:'Cost of Goods Sold (COGS)',    type:'range', min:0,   max:5000000,  step:500,  cur:true, def:30000  },
    { s:'opExpenses',    label:'Monthly Operating Expenses',   type:'range', min:0,   max:2000000,  step:500,  cur:true, def:25000  },
    { s:'debtPayments',  label:'Monthly Debt Payments',        type:'range', min:0,   max:500000,   step:250,  cur:true, def:5000   },
    { s:'capex',         label:'Monthly Capital Expenditures', type:'range', min:0,   max:500000,   step:250,  cur:true, def:2000   },
    { s:'cashReserves',  label:'Current Cash Reserves',        type:'range', min:0,   max:10000000, step:1000, cur:true, def:150000 },
  ],
  `      const grossProfit  = revenue - cogs
      const ebitda        = grossProfit - opExpenses
      const operatingCF   = ebitda - debtPayments
      const freeCF        = operatingCF - capex
      const burnRate      = freeCF < 0 ? Math.abs(freeCF) : 0
      const runway        = burnRate > 0 ? (cashReserves / burnRate).toFixed(1) + ' months' : 'Positive cash flow'
      const grossMargin   = revenue > 0 ? (grossProfit / revenue * 100).toFixed(1) + '%' : '0%'
      const opMargin      = revenue > 0 ? (operatingCF / revenue * 100).toFixed(1) + '%' : '0%'
      return { grossProfit, ebitda, operatingCF, freeCF, burnRate, runway, grossMargin, opMargin }`,
  [
    { label:'Gross Profit',           k:'grossProfit',  cur:true  },
    { label:'EBITDA',                 k:'ebitda',       cur:true  },
    { label:'Operating Cash Flow',    k:'operatingCF',  cur:true  },
    { label:'Free Cash Flow',         k:'freeCF',       cur:true  },
    { label:'Monthly Burn Rate',      k:'burnRate',     cur:true  },
    { label:'Cash Runway',            k:'runway',       cur:false },
    { label:'Gross Margin',           k:'grossMargin',  cur:false },
    { label:'Operating Margin',       k:'opMargin',     cur:false },
  ],
  [
    { q:'What is free cash flow and why does it matter?', a:'Free cash flow (FCF) = Operating cash flow minus capital expenditures. It represents cash the business generates after maintaining and growing its asset base. FCF is what can be used to pay investors, reduce debt, or fund growth. Profitable companies can still fail with negative FCF if profits are tied up in inventory or receivables.' },
    { q:'What is a good cash runway for a startup?', a:'Most financial advisors recommend at least 12-18 months of cash runway at all times. Startups raising funding should begin the process with 9-12 months of runway — fundraising takes 3-6 months. A runway below 6 months is a critical situation requiring immediate action: expense cuts, revenue acceleration, or emergency bridge funding.' },
    { q:'How is cash flow different from profit?', a:'Profit is an accounting concept (revenue minus expenses on an accrual basis). Cash flow is actual money moving in and out of the bank. They differ due to: timing of payments (invoiced but not yet paid), depreciation (expense with no cash outflow), capital expenditures (cash out with no immediate expense), and inventory changes. A business can be profitable but cash flow negative.' },
  ],
  [
    { href:'/working-capital-calculator',       icon:'⚙️', name:'Working Capital'   },
    { href:'/accounts-receivable-calculator',   icon:'📬', name:'Accounts Receivable'},
    { href:'/profit-margin-calculator',         icon:'📈', name:'Profit Margin'     },
    { href:'/business-loan-calculator',         icon:'🏦', name:'Business Loan'     },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 5. Working Capital Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('working-capital-calculator', page(
  'Working Capital Calculator',
  'Calculate working capital, current ratio and liquidity metrics for your business.',
  '⚙️',
  [
    { s:'cash',           label:'Cash and Cash Equivalents',   type:'range', min:0,   max:10000000, step:1000, cur:true, def:100000 },
    { s:'receivables',    label:'Accounts Receivable',         type:'range', min:0,   max:10000000, step:1000, cur:true, def:80000  },
    { s:'inventory',      label:'Inventory',                   type:'range', min:0,   max:10000000, step:1000, cur:true, def:60000  },
    { s:'otherCurrentA',  label:'Other Current Assets',        type:'range', min:0,   max:5000000,  step:1000, cur:true, def:10000  },
    { s:'payables',       label:'Accounts Payable',            type:'range', min:0,   max:5000000,  step:1000, cur:true, def:50000  },
    { s:'shortTermDebt',  label:'Short-Term Debt and Accruals',type:'range', min:0,   max:5000000,  step:1000, cur:true, def:40000  },
  ],
  `      const currentAssets      = cash + receivables + inventory + otherCurrentA
      const currentLiabilities = payables + shortTermDebt
      const workingCapital     = currentAssets - currentLiabilities
      const currentRatio       = (currentAssets / currentLiabilities).toFixed(2)
      const quickRatio         = ((cash + receivables) / currentLiabilities).toFixed(2)
      const cashRatio          = (cash / currentLiabilities).toFixed(2)
      const wcRatio            = workingCapital > 0 ? 'Positive - Healthy' : 'Negative - At Risk'
      return { currentAssets, currentLiabilities, workingCapital, currentRatio, quickRatio, cashRatio, wcRatio }`,
  [
    { label:'Total Current Assets',      k:'currentAssets',      cur:true  },
    { label:'Total Current Liabilities', k:'currentLiabilities', cur:true  },
    { label:'Net Working Capital',        k:'workingCapital',     cur:true  },
    { label:'Current Ratio',             k:'currentRatio',       cur:false },
    { label:'Quick Ratio',               k:'quickRatio',         cur:false },
    { label:'Cash Ratio',                k:'cashRatio',          cur:false },
    { label:'Working Capital Status',    k:'wcRatio',            cur:false },
  ],
  [
    { q:'What is working capital?', a:'Working capital = Current Assets minus Current Liabilities. It measures a business ability to cover short-term obligations with short-term assets. Positive working capital means you can pay bills and still have assets left. Negative working capital means current liabilities exceed current assets — a warning sign unless the business model (like retail) naturally runs negative.' },
    { q:'What is a good current ratio?', a:'A current ratio between 1.5 and 2.0 is generally considered healthy. Below 1.0 means current liabilities exceed current assets (potential liquidity crisis). Above 3.0 may indicate inefficient use of assets (too much cash sitting idle). The quick ratio (excludes inventory) is more stringent — above 1.0 is considered safe for most businesses.' },
    { q:'How do I improve working capital?', a:'Strategies: accelerate collections (reduce DSO), negotiate longer payment terms with suppliers (extend DPO), reduce inventory levels with just-in-time ordering, convert short-term debt to long-term financing, increase sales with faster inventory turnover, or raise equity capital. Improving working capital reduces the need for short-term borrowing and improves creditworthiness.' },
  ],
  [
    { href:'/cash-flow-calculator',             icon:'💰', name:'Cash Flow'         },
    { href:'/accounts-receivable-calculator',   icon:'📬', name:'AR Calculator'     },
    { href:'/business-loan-calculator',         icon:'🏦', name:'Business Loan'     },
    { href:'/debt-service-coverage-calculator', icon:'📊', name:'Debt Coverage'     },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 6. Debt Service Coverage Ratio Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('debt-service-coverage-calculator', page(
  'Debt Service Coverage Calculator',
  'Calculate DSCR to determine if your business income can cover loan payments.',
  '📊',
  [
    { s:'annualNOI',      label:'Annual Net Operating Income',  type:'range', min:0,   max:10000000, step:5000, cur:true, def:180000 },
    { s:'annualDebtSvc',  label:'Annual Debt Service (P+I)',    type:'range', min:1000,max:5000000,  step:1000, cur:true, def:120000 },
    { s:'newLoanAmount',  label:'New Loan Being Evaluated',     type:'range', min:0,   max:5000000,  step:5000, cur:true, def:200000 },
    { s:'newLoanRate',    label:'New Loan Rate',                type:'range', min:1,   max:20,       step:0.25, pct:true, def:8      },
    { s:'newLoanYears',   label:'New Loan Term',                type:'select', def:10, opts:[{v:5,l:'5 yrs'},{v:7,l:'7 yrs'},{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:25,l:'25 yrs'}] },
  ],
  `      const dscr           = (annualNOI / annualDebtSvc).toFixed(2)
      const dscrStatus     = parseFloat(dscr) >= 1.25 ? 'Bankable (1.25+)' : parseFloat(dscr) >= 1.0 ? 'Borderline (1.0-1.25)' : 'Below Minimum (<1.0)'
      // New loan debt service
      const r              = newLoanRate / 100 / 12
      const n              = newLoanYears * 12
      const newMonthly     = newLoanAmount > 0 ? newLoanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1) : 0
      const newAnnualDS    = newMonthly * 12
      const combinedDS     = annualDebtSvc + newAnnualDS
      const combinedDSCR   = (annualNOI / combinedDS).toFixed(2)
      const combinedStatus = parseFloat(combinedDSCR) >= 1.25 ? 'Bankable' : parseFloat(combinedDSCR) >= 1.0 ? 'Borderline' : 'Below Minimum'
      return { dscr, dscrStatus, newMonthly, newAnnualDS, combinedDSCR, combinedStatus }`,
  [
    { label:'Current DSCR',               k:'dscr',           cur:false },
    { label:'Current Loan Status',        k:'dscrStatus',     cur:false },
    { label:'New Loan Monthly Payment',   k:'newMonthly',     cur:true  },
    { label:'New Annual Debt Service',    k:'newAnnualDS',    cur:true  },
    { label:'Combined DSCR',              k:'combinedDSCR',   cur:false },
    { label:'Combined Loan Status',       k:'combinedStatus', cur:false },
  ],
  [
    { q:'What is Debt Service Coverage Ratio (DSCR)?', a:'DSCR = Net Operating Income / Total Debt Service. It measures how many times your income can cover your debt payments. A DSCR of 1.25 means income is 25% higher than debt payments. Most lenders require a minimum DSCR of 1.20-1.25 for business loans and 1.15-1.25 for commercial real estate. SBA loans typically require 1.15+.' },
    { q:'What DSCR do lenders require?', a:'Minimum requirements by loan type: SBA 7(a) 1.15x, conventional business loans 1.25x, commercial real estate 1.20-1.30x, construction loans 1.25-1.40x. The higher the DSCR, the better your loan terms. A DSCR of 1.5x or above gives you negotiating power for lower rates and better terms.' },
    { q:'How do I improve my DSCR?', a:'Increase the numerator (NOI): grow revenue, cut operating expenses, improve margins. Decrease the denominator (debt service): refinance at lower rates, extend loan terms, pay down principal, or consolidate higher-rate debt. Some lenders also allow adding back depreciation and amortization to NOI. Timing a loan application after a strong revenue quarter also helps.' },
  ],
  [
    { href:'/business-loan-calculator',   icon:'🏦', name:'Business Loan'     },
    { href:'/sba-loan-calculator',        icon:'🏛️', name:'SBA Loan'          },
    { href:'/cash-flow-calculator',       icon:'💰', name:'Cash Flow'         },
    { href:'/working-capital-calculator', icon:'⚙️', name:'Working Capital'   },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 7. Employee Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('employee-cost-calculator', page(
  'Employee Cost Calculator',
  'Calculate the true total cost of an employee including taxes, benefits and overhead.',
  '👔',
  [
    { s:'baseSalary',    label:'Base Annual Salary',            type:'range', min:20000,  max:500000, step:1000, cur:true, def:65000 },
    { s:'healthBenefit', label:'Annual Health Insurance Cost',  type:'range', min:0,      max:30000,  step:250,  cur:true, def:7000  },
    { s:'retirement401k',label:'401k Employer Match %',        type:'range', min:0,      max:10,     step:0.5,  pct:true, def:4     },
    { s:'otherBenefits', label:'Other Benefits (PTO cash value, etc)', type:'range', min:0, max:20000,step:250, cur:true, def:3000  },
    { s:'overheadPct',   label:'Overhead Allocation %',        type:'range', min:0,      max:50,     step:5,    pct:true, def:20    },
  ],
  `      const employerFICA   = Math.min(baseSalary, 168600) * 0.062 + baseSalary * 0.0145
      const futa           = Math.min(baseSalary, 7000) * 0.006
      const suta           = Math.min(baseSalary, 7000) * 0.027
      const match401k      = baseSalary * (retirement401k / 100)
      const overhead       = baseSalary * (overheadPct / 100)
      const totalCost      = baseSalary + employerFICA + futa + suta + healthBenefit + match401k + otherBenefits + overhead
      const costMultiplier = (totalCost / baseSalary).toFixed(2) + 'x'
      const hourlyTrueCost = (totalCost / 2080).toFixed(2)
      return { totalCost, employerFICA, futa, suta, match401k, overhead, costMultiplier, hourlyTrueCost }`,
  [
    { label:'Total Annual Employee Cost',   k:'totalCost',      cur:true  },
    { label:'Employer FICA Taxes',          k:'employerFICA',   cur:true  },
    { label:'Federal Unemployment (FUTA)',  k:'futa',           cur:true  },
    { label:'State Unemployment (SUTA)',    k:'suta',           cur:true  },
    { label:'401k Match Cost',              k:'match401k',      cur:true  },
    { label:'Overhead Allocation',          k:'overhead',       cur:true  },
    { label:'Cost Multiplier',             k:'costMultiplier',  cur:false },
    { label:'True Hourly Cost',            k:'hourlyTrueCost',  cur:false },
  ],
  [
    { q:'How much does an employee really cost beyond salary?', a:'Total employee cost is typically 1.25-1.40x base salary for hourly workers and 1.30-1.50x for salaried employees with full benefits. On a $65,000 salary: employer FICA $4,972, FUTA/SUTA ~$500, health insurance $7,000+, 401k match $2,600, overhead $13,000. Total can easily reach $90,000-$100,000 per year.' },
    { q:'What is included in employer payroll taxes?', a:'Employer payroll taxes include: Social Security employer share (6.2% on wages up to $168,600), Medicare employer share (1.45% on all wages), FUTA (0.6% on first $7,000 after state credit), and SUTA (varies by state, typically 1-5% on first $7,000-$50,000). These add approximately 7.5-10% to base wages.' },
    { q:'How does hiring a contractor compare to an employee?', a:'Contractors cost no employer taxes, no benefits, no unemployment insurance, and no overhead. However contractors typically charge 20-40% more per hour than an equivalent employee to cover their own taxes and benefits. For short-term or specialized work contractors are cheaper. For ongoing full-time roles, employees are usually more cost-effective after factoring productivity and loyalty.' },
  ],
  [
    { href:'/payroll-tax-calculator',     icon:'👥', name:'Payroll Tax'       },
    { href:'/freelance-rate-calculator',  icon:'🎯', name:'Freelance Rate'    },
    { href:'/startup-cost-calculator',    icon:'🚀', name:'Startup Cost'      },
    { href:'/break-even-calculator',      icon:'⚖️', name:'Break-Even'        },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 8. Startup Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('startup-cost-calculator', page(
  'Startup Cost Calculator',
  'Estimate total startup costs, funding needed and months to break even for a new business.',
  '🚀',
  [
    { s:'setupCosts',     label:'One-Time Setup Costs (legal, equipment, etc)', type:'range', min:0, max:500000, step:500, cur:true, def:15000 },
    { s:'monthlyFixed',   label:'Monthly Fixed Expenses',     type:'range', min:0,   max:200000, step:250,  cur:true, def:8000  },
    { s:'monthlyVariable',label:'Monthly Variable Costs (at target revenue)', type:'range', min:0, max:200000, step:250, cur:true, def:5000 },
    { s:'targetRevenue',  label:'Target Monthly Revenue',     type:'range', min:0,   max:500000, step:500,  cur:true, def:20000 },
    { s:'rampMonths',     label:'Months to Reach Full Revenue',type:'range', min:1,  max:24,     step:1,    sfx:' mo', def:6    },
    { s:'cashBuffer',     label:'Cash Buffer (months of expenses)', type:'range', min:1, max:12,  step:1,    sfx:' mo', def:3   },
  ],
  `      const monthlyTotal   = monthlyFixed + monthlyVariable
      const breakEvenRev   = monthlyFixed / (1 - monthlyVariable / Math.max(targetRevenue, 1))
      // Ramp period burn
      let rampBurn = 0
      for (let m = 1; m <= rampMonths; m++) {
        const rev = targetRevenue * (m / rampMonths)
        const varCost = monthlyVariable * (m / rampMonths)
        rampBurn += Math.max(0, monthlyFixed + varCost - rev)
      }
      const bufferNeeded   = monthlyTotal * cashBuffer
      const totalFunding   = setupCosts + rampBurn + bufferNeeded
      const monthlyProfit  = targetRevenue - monthlyTotal
      const status         = monthlyProfit > 0 ? 'Profitable at target' : 'Not profitable at target'
      return { totalFunding, setupCosts, rampBurn, bufferNeeded, breakEvenRev, monthlyProfit, status }`,
  [
    { label:'Total Funding Required',      k:'totalFunding',  cur:true  },
    { label:'One-Time Setup Costs',        k:'setupCosts',    cur:true  },
    { label:'Ramp Period Burn',            k:'rampBurn',      cur:true  },
    { label:'Cash Buffer Needed',          k:'bufferNeeded',  cur:true  },
    { label:'Break-Even Monthly Revenue',  k:'breakEvenRev',  cur:true  },
    { label:'Monthly Profit at Target',    k:'monthlyProfit', cur:true  },
    { label:'Profitability Status',        k:'status',        cur:false },
  ],
  [
    { q:'How much does it cost to start a business?', a:'Average startup costs by type: online business or service $500-$5,000. Brick and mortar retail $50,000-$250,000. Restaurant $175,000-$500,000. Franchise $100,000-$1,000,000+. SaaS or tech startup $20,000-$150,000. Home-based service $1,000-$20,000. The biggest variables are inventory, equipment, leasehold improvements, and payroll before revenue ramps up.' },
    { q:'What are the most common startup mistakes with money?', a:'Top financial mistakes: underestimating time to profitability (plan for 2x your estimate), skipping the cash buffer (minimum 3-6 months of expenses), mixing personal and business finances, not tracking cash flow weekly in early stages, over-investing in fixed assets before validating the business model, and taking on equity investors before exploring loans or bootstrapping.' },
    { q:'Should I get a business loan or investor funding for my startup?', a:'Loans are better when: you have predictable revenue, the business model is proven, and you want to keep full ownership. Investor funding (equity) is better when: you need large capital for rapid growth, the business is pre-revenue, or you need strategic partnerships beyond just money. Equity is expensive long-term — you give up ownership and control permanently.' },
  ],
  [
    { href:'/business-loan-calculator',  icon:'🏦', name:'Business Loan'    },
    { href:'/break-even-calculator',     icon:'⚖️', name:'Break-Even'       },
    { href:'/cash-flow-calculator',      icon:'💰', name:'Cash Flow'        },
    { href:'/employee-cost-calculator',  icon:'👔', name:'Employee Cost'    },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 9. Ecommerce Profit Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('ecommerce-profit-calculator', page(
  'Ecommerce Profit Calculator',
  'Calculate net profit per order, margin and monthly profit for your online store.',
  '🛒',
  [
    { s:'salePrice',      label:'Product Sale Price',           type:'range', min:1,    max:10000,  step:1,    cur:true, def:49    },
    { s:'productCost',    label:'Product Cost (COGS)',          type:'range', min:0,    max:5000,   step:1,    cur:true, def:15    },
    { s:'shippingCost',   label:'Fulfillment and Shipping Cost',type:'range', min:0,    max:100,    step:0.5,  cur:true, def:6     },
    { s:'platformFee',    label:'Platform Fee %',               type:'range', min:0,    max:20,     step:0.25, pct:true, def:6     },
    { s:'adSpend',        label:'Ad Spend Per Order (CAC)',     type:'range', min:0,    max:500,    step:0.5,  cur:true, def:8     },
    { s:'monthlyOrders',  label:'Monthly Orders',               type:'range', min:1,    max:100000, step:10,   sfx:' orders', def:200 },
    { s:'returnRate',     label:'Return Rate',                  type:'range', min:0,    max:30,     step:1,    pct:true, def:5     },
  ],
  `      const platformCut   = salePrice * (platformFee / 100)
      const returnCost    = salePrice * (returnRate / 100)
      const totalCostPerOrder = productCost + shippingCost + platformCut + adSpend + returnCost
      const profitPerOrder    = salePrice - totalCostPerOrder
      const netMargin         = (profitPerOrder / salePrice * 100).toFixed(1) + '%'
      const monthlyRevenue    = salePrice * monthlyOrders
      const monthlyProfit     = profitPerOrder * monthlyOrders
      const annualProfit      = monthlyProfit * 12
      const roasNeeded        = adSpend > 0 ? (salePrice / adSpend).toFixed(1) + 'x' : 'N/A'
      return { profitPerOrder, netMargin, monthlyRevenue, monthlyProfit, annualProfit, roasNeeded, totalCostPerOrder }`,
  [
    { label:'Profit Per Order',          k:'profitPerOrder',    cur:true  },
    { label:'Total Cost Per Order',      k:'totalCostPerOrder', cur:true  },
    { label:'Net Profit Margin',         k:'netMargin',         cur:false },
    { label:'Monthly Revenue',           k:'monthlyRevenue',    cur:true  },
    { label:'Monthly Net Profit',        k:'monthlyProfit',     cur:true  },
    { label:'Annual Net Profit',         k:'annualProfit',      cur:true  },
    { label:'Minimum ROAS Needed',       k:'roasNeeded',        cur:false },
  ],
  [
    { q:'What is a good profit margin for ecommerce?', a:'Ecommerce net profit margins: budget/commodity products 5-10%, mid-range products 15-25%, premium or niche products 25-45%, digital products and software 40-80%. Amazon sellers average 15-20% net margin. Shopify direct-to-consumer brands average 10-20%. Margins below 10% make scaling difficult as fixed costs and customer acquisition costs eat into profits.' },
    { q:'What is CAC and why does it matter for ecommerce?', a:'Customer Acquisition Cost (CAC) is the total marketing cost divided by new customers acquired. For ecommerce with thin margins, CAC is critical. If your profit per order is $12 but CAC is $15, you lose money on the first sale. The goal is to acquire customers cheaply enough that lifetime value (LTV) exceeds CAC by 3x or more. Repeat customers are always more profitable than new ones.' },
    { q:'How do I calculate ROAS and what is a good target?', a:'Return on Ad Spend (ROAS) = Revenue generated from ads / Ad spend. A ROAS of 3x means you earned $3 for every $1 spent on ads. Minimum profitable ROAS = Sale Price / Profit Per Order (before ad spend). If your product costs $15 and sells for $49 with $10 in other costs: minimum ROAS = $49 / $24 = 2.04x. Aim for 3-5x ROAS for healthy margins.' },
  ],
  [
    { href:'/profit-margin-calculator',   icon:'📈', name:'Profit Margin'    },
    { href:'/break-even-calculator',      icon:'⚖️', name:'Break-Even'       },
    { href:'/markup-calculator',          icon:'🏷️', name:'Markup Calculator'},
    { href:'/roi-calculator',             icon:'💎', name:'ROI Calculator'   },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 10. SaaS Metrics Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('saas-metrics-calculator', page(
  'SaaS Metrics Calculator',
  'Calculate MRR, ARR, LTV, CAC ratio, churn impact and key SaaS health metrics.',
  '💻',
  [
    { s:'mrr',           label:'Monthly Recurring Revenue (MRR)', type:'range', min:0,   max:10000000, step:1000, cur:true, def:50000 },
    { s:'customers',     label:'Total Active Customers',          type:'range', min:1,   max:100000,   step:10,   sfx:' customers', def:200 },
    { s:'churnRate',     label:'Monthly Churn Rate',              type:'range', min:0.1, max:20,       step:0.1,  pct:true, def:2     },
    { s:'cac',           label:'Customer Acquisition Cost (CAC)', type:'range', min:0,   max:50000,    step:50,   cur:true, def:500   },
    { s:'grossMargin',   label:'Gross Margin',                    type:'range', min:10,  max:95,       step:5,    pct:true, def:75    },
    { s:'mrrGrowthRate', label:'Monthly MRR Growth Rate',         type:'range', min:0,   max:30,       step:0.5,  pct:true, def:5     },
  ],
  `      const arr           = mrr * 12
      const arpu          = mrr / customers
      const ltv           = (arpu * (grossMargin / 100)) / (churnRate / 100)
      const ltvCacRatio   = (ltv / cac).toFixed(1) + 'x'
      const paybackMonths = (cac / (arpu * grossMargin / 100)).toFixed(1) + ' months'
      const churnedMRR    = mrr * (churnRate / 100)
      const newMRRNeeded  = churnedMRR.toFixed(0)
      const rule40        = mrrGrowthRate * 12 + (mrr > 0 ? (mrr * grossMargin / 100 - mrr * churnRate / 100) / mrr * 100 : 0)
      const rule40status  = rule40 >= 40 ? 'Pass (healthy)' : 'Below 40 (needs work)'
      const projMRR12     = mrr * Math.pow(1 + mrrGrowthRate/100, 12)
      return { arr, arpu, ltv, ltvCacRatio, paybackMonths, churnedMRR, rule40status, projMRR12 }`,
  [
    { label:'Annual Recurring Revenue (ARR)', k:'arr',           cur:true  },
    { label:'Average Revenue Per User (ARPU)', k:'arpu',         cur:true  },
    { label:'Customer Lifetime Value (LTV)',  k:'ltv',           cur:true  },
    { label:'LTV to CAC Ratio',              k:'ltvCacRatio',   cur:false },
    { label:'CAC Payback Period',            k:'paybackMonths', cur:false },
    { label:'Monthly Churned MRR',           k:'churnedMRR',    cur:true  },
    { label:'Rule of 40 Status',             k:'rule40status',  cur:false },
    { label:'Projected MRR in 12 Months',    k:'projMRR12',     cur:true  },
  ],
  [
    { q:'What is a good LTV to CAC ratio for SaaS?', a:'The benchmark LTV:CAC ratio for a healthy SaaS business is 3:1 or higher. A ratio of 1:1 means you spend as much to acquire a customer as they are worth — unsustainable. A ratio of 5:1 or higher suggests you may be underinvesting in growth. Most VCs look for 3x+ LTV:CAC before Series A. Improve the ratio by increasing LTV (reduce churn, expand revenue) or decreasing CAC (improve conversion rates, referral programs).' },
    { q:'What is the Rule of 40 for SaaS?', a:'The Rule of 40 states that a healthy SaaS company growth rate plus profit margin should equal or exceed 40%. Example: 30% YoY growth + 15% profit margin = 45% (passes). A high-growth startup at 80% growth + negative 40% margin = 40% (passes). Below 40 signals the company is neither growing fast enough nor profitable enough. It is a key metric for investors evaluating SaaS businesses.' },
    { q:'What monthly churn rate is acceptable for SaaS?', a:'Monthly churn benchmarks: excellent under 0.5%, good 0.5-1%, acceptable 1-2%, concerning 2-5%, problematic above 5%. Annual equivalents: 1% monthly = 11.4% annual, 2% monthly = 21.5% annual. Even small improvements in churn compound significantly over time. A SaaS business losing 5% of customers monthly loses over half its base annually.' },
  ],
  [
    { href:'/ecommerce-profit-calculator', icon:'🛒', name:'Ecommerce Profit'  },
    { href:'/business-valuation-calculator',icon:'🏢',name:'Business Valuation'},
    { href:'/roi-calculator',              icon:'💎', name:'ROI Calculator'    },
    { href:'/break-even-calculator',       icon:'⚖️', name:'Break-Even'        },
  ]
))

console.log(`
════════════════════════════════════════════════════
  STAGE 7 COMPLETE — 10 calculators created
════════════════════════════════════════════════════
   1.  /business-loan-calculator
   2.  /sba-loan-calculator
   3.  /accounts-receivable-calculator
   4.  /cash-flow-calculator
   5.  /working-capital-calculator
   6.  /debt-service-coverage-calculator
   7.  /employee-cost-calculator
   8.  /startup-cost-calculator
   9.  /ecommerce-profit-calculator
  10.  /saas-metrics-calculator

  Deploy:
  git add .
  git commit -m "Stage 7: business and advanced calculators"
  git push origin master:main
════════════════════════════════════════════════════
`)
