/**
 * FreeFinCalc.net — STAGE 6: 10 Calculator Pages
 * Budget & Housing
 * Run from project root: node stage6_calculators.js
 *
 *  1. budget-planner-calculator
 *  2. rent-affordability-calculator
 *  3. net-pay-calculator
 *  4. tax-refund-calculator
 *  5. child-tax-credit-calculator
 *  6. estate-tax-calculator
 *  7. gift-tax-calculator
 *  8. rental-property-calculator
 *  9. cap-rate-calculator
 * 10. house-flipping-calculator
 *
 * CLEAN CODE RULES:
 * - No apostrophes in any string or JSX text (use "dont" not "don't")
 * - All pdfRows labels in double quotes only
 * - String useState defaults: useState('value')
 * - No font family strings with embedded quotes
 * - No export const metadata in client components
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
              Results are estimates for educational purposes only. Not financial or tax advice.
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
// 1. Budget Planner Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('budget-planner-calculator', page(
  'Budget Planner Calculator',
  'Build a monthly budget using the 50/30/20 rule and see exactly where your money should go.',
  '📋',
  [
    { s:'monthlyIncome',  label:'Monthly Take-Home Income',  type:'range', min:500,   max:50000, step:100, cur:true, def:5000 },
    { s:'housing',        label:'Housing (rent or mortgage)',type:'range', min:0,     max:10000, step:50,  cur:true, def:1500 },
    { s:'transport',      label:'Transportation',            type:'range', min:0,     max:3000,  step:25,  cur:true, def:400  },
    { s:'food',           label:'Food and Groceries',        type:'range', min:0,     max:3000,  step:25,  cur:true, def:600  },
    { s:'utilities',      label:'Utilities and Bills',       type:'range', min:0,     max:2000,  step:25,  cur:true, def:250  },
    { s:'entertainment',  label:'Entertainment and Dining',  type:'range', min:0,     max:2000,  step:25,  cur:true, def:300  },
    { s:'savings',        label:'Savings and Investments',   type:'range', min:0,     max:10000, step:50,  cur:true, def:500  },
  ],
  `      const needs       = housing + transport + food + utilities
      const wants       = entertainment
      const totalSpend  = needs + wants + savings
      const leftover    = monthlyIncome - totalSpend
      const needsPct    = (needs / monthlyIncome * 100).toFixed(1) + '%'
      const wantsPct    = (wants / monthlyIncome * 100).toFixed(1) + '%'
      const savingsPct  = (savings / monthlyIncome * 100).toFixed(1) + '%'
      const annualSavings = savings * 12
      const status      = leftover >= 0 ? 'Surplus' : 'Deficit'
      return { needs, wants, totalSpend, leftover, needsPct, wantsPct, savingsPct, annualSavings, status }`,
  [
    { label:'Total Needs Spending',    k:'needs',        cur:true  },
    { label:'Needs as % of Income',    k:'needsPct',     cur:false },
    { label:'Total Wants Spending',    k:'wants',        cur:true  },
    { label:'Wants as % of Income',    k:'wantsPct',     cur:false },
    { label:'Savings Rate',            k:'savingsPct',   cur:false },
    { label:'Annual Savings',          k:'annualSavings',cur:true  },
    { label:'Monthly Surplus/Deficit', k:'leftover',     cur:true  },
    { label:'Budget Status',           k:'status',       cur:false },
  ],
  [
    { q:'What is the 50/30/20 budget rule?', a:'The 50/30/20 rule splits take-home pay into: 50% for needs (housing, food, transport, utilities), 30% for wants (dining out, entertainment, subscriptions), and 20% for savings and debt repayment. It is a simple starting framework — adjust the percentages based on your cost of living, income level and financial goals.' },
    { q:'How do I reduce my budget to save more?', a:'Start with the biggest line items. Housing is usually the largest expense — consider a roommate, refinancing, or moving. Food waste costs the average American $1,500/year — meal planning saves significantly. Audit all subscriptions and cancel unused ones. The 24-hour rule (wait before non-essential purchases) reduces impulse spending by 30-50%.' },
    { q:'What budgeting method works best?', a:'Zero-based budgeting (assign every dollar a job) works best for people who want full control and are paying off debt. The 50/30/20 rule is best for simplicity. Envelope budgeting (cash in categories) is proven for overspenders. Pay-yourself-first (automate savings before spending) is best for savers. The best method is the one you actually follow consistently.' },
  ],
  [
    { href:'/savings-goal-calculator',    icon:'🎯', name:'Savings Goal'    },
    { href:'/emergency-fund-calculator',  icon:'🛡️', name:'Emergency Fund'  },
    { href:'/net-pay-calculator',         icon:'💵', name:'Net Pay'         },
    { href:'/debt-payoff-calculator',     icon:'💳', name:'Debt Payoff'     },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 2. Rent Affordability Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('rent-affordability-calculator', page(
  'Rent Affordability Calculator',
  'Find the maximum rent you can afford based on income and the 30% rule.',
  '🏘️',
  [
    { s:'grossIncome',   label:'Annual Gross Income',        type:'range', min:10000, max:500000, step:1000, cur:true, def:65000 },
    { s:'otherDebts',    label:'Monthly Debt Payments',      type:'range', min:0,     max:5000,   step:50,   cur:true, def:300   },
    { s:'taxRate',       label:'Effective Tax Rate',         type:'range', min:10,    max:45,     step:1,    pct:true, def:25    },
    { s:'ruleType',      label:'Affordability Rule',         type:'select', def:'30', opts:[{v:'30',l:'30% of gross'},{v:'28',l:'28% of gross'},{v:'35net',l:'35% of net'}] },
  ],
  `      const monthlyGross = grossIncome / 12
      const monthlyNet  = monthlyGross * (1 - taxRate / 100)
      let maxRent
      if (ruleType === '30') {
        maxRent = monthlyGross * 0.30
      } else if (ruleType === '28') {
        maxRent = monthlyGross * 0.28
      } else {
        maxRent = monthlyNet * 0.35
      }
      const remainingAfterRent = monthlyNet - maxRent - otherDebts
      const totalHousingBudget = maxRent * 12
      const rentToIncomeRatio  = (maxRent / monthlyGross * 100).toFixed(1) + '%'
      return { maxRent, remainingAfterRent, totalHousingBudget, monthlyNet, rentToIncomeRatio }`,
  [
    { label:'Maximum Monthly Rent',      k:'maxRent',             cur:true  },
    { label:'Monthly Take-Home Pay',     k:'monthlyNet',          cur:true  },
    { label:'Left After Rent and Debts', k:'remainingAfterRent',  cur:true  },
    { label:'Annual Housing Budget',     k:'totalHousingBudget',  cur:true  },
    { label:'Rent to Income Ratio',      k:'rentToIncomeRatio',   cur:false },
  ],
  [
    { q:'What is the 30% rent rule?', a:'The 30% rule says spend no more than 30% of gross monthly income on rent. On a $65,000 salary ($5,417/month gross) that is $1,625/month maximum. This guideline originated in 1969 US housing policy. In high-cost cities many people spend 40-50% — if you must exceed 30%, offset it by cutting other expenses aggressively.' },
    { q:'What else should I budget for besides rent?', a:'Total housing costs include: rent, renters insurance ($15-30/month), utilities ($100-200/month), parking if not included, and any pet fees. Many landlords require proof of income at 2.5-3x monthly rent. Factor all these into your housing budget, not just the headline rent number.' },
    { q:'Should I rent or buy?', a:'Renting is better when: you plan to move within 3-5 years, the price-to-rent ratio is above 20 (buy price / annual rent), you lack funds for a down payment, or your local market is overvalued. Buying builds equity and provides stability but requires significant upfront costs (3-20% down plus closing costs of 2-5%). Use the rent vs buy calculator for a full comparison.' },
  ],
  [
    { href:'/rent-vs-buy-calculator',     icon:'🏘️', name:'Rent vs Buy'         },
    { href:'/budget-planner-calculator',  icon:'📋', name:'Budget Planner'       },
    { href:'/home-affordability-calculator',icon:'🏡',name:'Home Affordability'  },
    { href:'/moving-cost-calculator',     icon:'📦', name:'Moving Cost'          },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 3. Net Pay Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('net-pay-calculator', page(
  'Net Pay Calculator',
  'Calculate your exact net pay per paycheck after all federal, state and local deductions.',
  '💵',
  [
    { s:'grossPay',      label:'Gross Pay Per Period',         type:'range', min:100,  max:50000, step:50,   cur:true, def:3000  },
    { s:'payFreq',       label:'Pay Frequency',                type:'select', def:'biweekly', opts:[{v:'weekly',l:'Weekly'},{v:'biweekly',l:'Bi-Weekly'},{v:'semimonthly',l:'Semi-Monthly'},{v:'monthly',l:'Monthly'}] },
    { s:'fedAllowances', label:'Federal Withholding (W-4 extra)', type:'range', min:0, max:2000, step:50,   cur:true, def:0     },
    { s:'stateRate',     label:'State Income Tax Rate',        type:'range', min:0,    max:13,    step:0.25, pct:true, def:5     },
    { s:'retirement401k',label:'401k Contribution %',         type:'range', min:0,    max:30,    step:0.5,  pct:true, def:6     },
    { s:'healthInsur',   label:'Health Insurance Premium',     type:'range', min:0,    max:1000,  step:10,   cur:true, def:150   },
  ],
  `      const freqMap   = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 }
      const perYear   = freqMap[payFreq] || 26
      const annualGross = grossPay * perYear
      const k401       = grossPay * (retirement401k / 100)
      const preTax     = k401 + healthInsur
      const taxableGross = grossPay - preTax
      // Federal withholding estimate
      const annualTaxable = taxableGross * perYear
      const brackets = [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let annualFed = 0
      for (const [lo, rate, hi] of brackets) {
        if (annualTaxable <= lo) break
        annualFed += (Math.min(annualTaxable, hi) - lo) * rate
      }
      const fedWithholding  = annualFed / perYear + fedAllowances / perYear
      const ficaWithholding = taxableGross * 0.0765
      const stateWithholding = taxableGross * (stateRate / 100)
      const totalDeductions  = preTax + fedWithholding + ficaWithholding + stateWithholding
      const netPay           = grossPay - totalDeductions
      return { netPay, k401, fedWithholding, ficaWithholding, stateWithholding, totalDeductions }`,
  [
    { label:'Net Pay Per Paycheck',      k:'netPay',           cur:true },
    { label:'401k Contribution',         k:'k401',             cur:true },
    { label:'Federal Tax Withheld',      k:'fedWithholding',   cur:true },
    { label:'FICA Withheld',             k:'ficaWithholding',  cur:true },
    { label:'State Tax Withheld',        k:'stateWithholding', cur:true },
    { label:'Total Deductions',          k:'totalDeductions',  cur:true },
  ],
  [
    { q:'How do I increase my net pay?', a:'Increase net pay by: increasing pre-tax deductions (401k, HSA, FSA) which lower taxable income, adjusting W-4 withholding if you consistently get large refunds, checking that your filing status is correct, and ensuring all eligible deductions are claimed. Paradoxically, contributing more to a 401k often has a smaller net pay impact than expected due to tax savings.' },
    { q:'What is the difference between gross and net pay?', a:'Gross pay is your salary or hourly rate before any deductions. Net pay is what you actually receive after federal income tax withholding, FICA (Social Security and Medicare), state and local taxes, and voluntary pre-tax deductions like 401k and health insurance. Net pay is typically 65-80% of gross depending on your tax situation.' },
    { q:'Why does my paycheck vary each period?', a:'Paychecks vary due to: overtime worked, bonuses paid, changes in health insurance premiums, 401k contribution adjustments, commissions, reaching Social Security wage base ($168,600 in 2024 — FICA stops after this), or state/local tax changes. Year-end paychecks may also differ due to annual benefit adjustments.' },
  ],
  [
    { href:'/paycheck-calculator',        icon:'💵', name:'Paycheck Calculator' },
    { href:'/salary-after-tax-calculator',icon:'💰', name:'After-Tax Salary'   },
    { href:'/budget-planner-calculator',  icon:'📋', name:'Budget Planner'     },
    { href:'/tax-refund-calculator',      icon:'💸', name:'Tax Refund'         },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 4. Tax Refund Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('tax-refund-calculator', page(
  'Tax Refund Calculator',
  'Estimate your federal tax refund or amount owed before you file your return.',
  '💸',
  [
    { s:'grossIncome',   label:'Total Annual Gross Income',   type:'range', min:5000,  max:500000, step:1000, cur:true, def:75000 },
    { s:'withheld',      label:'Total Federal Tax Withheld',  type:'range', min:0,     max:100000, step:100,  cur:true, def:9000  },
    { s:'filingStatus',  label:'Filing Status',               type:'select', def:'single', opts:[{v:'single',l:'Single'},{v:'married',l:'Married Joint'},{v:'hoh',l:'Head of Household'}] },
    { s:'deductions',    label:'Deductions (standard or itemized)', type:'range', min:0, max:80000, step:500, cur:true, def:14600 },
    { s:'taxCredits',    label:'Tax Credits (child, education etc)', type:'range', min:0, max:20000, step:100, cur:true, def:0    },
    { s:'otherIncome',   label:'Other Income (freelance, investments)', type:'range', min:0, max:200000, step:500, cur:true, def:0 },
  ],
  `      const totalIncome  = grossIncome + otherIncome
      const taxableIncome = Math.max(0, totalIncome - deductions)
      const brackets = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : filingStatus === 'hoh'
        ? [[0,0.10,16550],[16550,0.12,63100],[63100,0.22,100500],[100500,0.24,191950],[191950,0.32,243700],[243700,0.35,609350],[609350,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let fedTax = 0
      for (const [lo, rate, hi] of brackets) {
        if (taxableIncome <= lo) break
        fedTax += (Math.min(taxableIncome, hi) - lo) * rate
      }
      fedTax = Math.max(0, fedTax - taxCredits)
      const refundOrOwed = withheld - fedTax
      const status       = refundOrOwed >= 0 ? 'Refund' : 'Amount Owed'
      const amount       = Math.abs(refundOrOwed)
      const effectiveRate = (fedTax / totalIncome * 100).toFixed(1) + '%'
      return { fedTax, refundOrOwed: amount, status, effectiveRate, taxableIncome }`,
  [
    { label:'Estimated Federal Tax',    k:'fedTax',        cur:true  },
    { label:'Taxable Income',           k:'taxableIncome', cur:true  },
    { label:'Effective Tax Rate',       k:'effectiveRate', cur:false },
    { label:'Refund or Amount Owed',    k:'refundOrOwed',  cur:true  },
    { label:'Result',                   k:'status',        cur:false },
  ],
  [
    { q:'When will I get my tax refund?', a:'The IRS issues most refunds within 21 days of accepting an e-filed return. Paper returns take 4-8 weeks. Refunds claiming the Earned Income Tax Credit or Additional Child Tax Credit are held until mid-February by law. You can track your refund at IRS.gov using the Where is My Refund tool. Direct deposit is 2-3 days faster than a check.' },
    { q:'Is a large tax refund a good thing?', a:'A large refund means you overpaid taxes throughout the year — essentially giving the government an interest-free loan. Ideally you aim to break even (small refund or small amount owed). Adjust your W-4 withholding to keep more money in each paycheck throughout the year, then invest the difference rather than waiting for an annual refund.' },
    { q:'What tax credits give the biggest refunds?', a:'High-value refundable tax credits: Earned Income Tax Credit ($632-$7,830 for 2024 depending on income and children), Child Tax Credit ($2,000 per child, up to $1,700 refundable), Child and Dependent Care Credit (up to $1,050 for one child), American Opportunity Tax Credit ($2,500 for college, 40% refundable), and Premium Tax Credit for ACA marketplace insurance.' },
  ],
  [
    { href:'/tax-calculator',           icon:'🧮', name:'Tax Calculator'    },
    { href:'/paycheck-calculator',      icon:'💵', name:'Paycheck Calculator'},
    { href:'/net-pay-calculator',       icon:'💵', name:'Net Pay'           },
    { href:'/self-employment-tax-calculator', icon:'🧾', name:'SE Tax'      },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 5. Child Tax Credit Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('child-tax-credit-calculator', page(
  'Child Tax Credit Calculator',
  'Calculate your Child Tax Credit and Additional Child Tax Credit for 2026.',
  '👶',
  [
    { s:'numChildren',   label:'Number of Qualifying Children (under 17)', type:'range', min:1, max:10, step:1, sfx:' kids', def:2 },
    { s:'agi',           label:'Adjusted Gross Income (AGI)',  type:'range', min:0,     max:500000, step:1000, cur:true, def:85000 },
    { s:'filingStatus',  label:'Filing Status',                type:'select', def:'married', opts:[{v:'single',l:'Single'},{v:'married',l:'Married Joint'},{v:'hoh',l:'Head of Household'}] },
    { s:'taxLiability',  label:'Your Federal Tax Liability',   type:'range', min:0,     max:100000, step:100,  cur:true, def:8000  },
  ],
  `      const maxCredit    = numChildren * 2000
      const phaseoutThreshold = filingStatus === 'married' ? 400000 : 200000
      const phaseout    = Math.max(0, Math.ceil((agi - phaseoutThreshold) / 1000)) * 50
      const creditAfterPhaseout = Math.max(0, maxCredit - phaseout)
      // Non-refundable portion reduces tax to zero
      const nonRefundable = Math.min(creditAfterPhaseout, taxLiability)
      // Additional Child Tax Credit (refundable) - up to $1,700 per child
      const refundableMax = numChildren * 1700
      const refundable    = Math.min(Math.max(0, creditAfterPhaseout - nonRefundable), refundableMax)
      const totalCredit   = nonRefundable + refundable
      const taxAfterCredit = Math.max(0, taxLiability - nonRefundable)
      return { maxCredit, creditAfterPhaseout, nonRefundable, refundable, totalCredit, taxAfterCredit }`,
  [
    { label:'Maximum Child Tax Credit',      k:'maxCredit',           cur:true },
    { label:'Credit After Phase-Out',        k:'creditAfterPhaseout', cur:true },
    { label:'Non-Refundable Credit Applied', k:'nonRefundable',       cur:true },
    { label:'Refundable Credit (ACTC)',      k:'refundable',          cur:true },
    { label:'Total Benefit',                 k:'totalCredit',         cur:true },
    { label:'Tax Liability After Credit',    k:'taxAfterCredit',      cur:true },
  ],
  [
    { q:'How much is the Child Tax Credit in 2026?', a:'The Child Tax Credit for 2026 is $2,000 per qualifying child under age 17. Up to $1,700 per child is refundable as the Additional Child Tax Credit (ACTC). The credit phases out by $50 for every $1,000 of AGI above $200,000 (single) or $400,000 (married filing jointly). These amounts may change if Congress acts on expiring provisions.' },
    { q:'Who qualifies for the Child Tax Credit?', a:'Qualifying child requirements: under age 17 at year end, related to you (child, stepchild, foster child, sibling, etc.), lived with you more than half the year, did not provide more than half their own support, is a US citizen or resident, and has a valid Social Security Number. The child cannot file a joint return (unless only to claim a refund).' },
    { q:'What is the Additional Child Tax Credit?', a:'The Additional Child Tax Credit (ACTC) is the refundable portion of the Child Tax Credit. If your non-refundable CTC exceeds your tax liability, you may claim ACTC for the lesser of the remaining credit or 15% of earned income above $2,500. Maximum ACTC is $1,700 per child in 2026. This means you can receive money back even if you owe no tax.' },
  ],
  [
    { href:'/tax-calculator',         icon:'🧮', name:'Tax Calculator'   },
    { href:'/tax-refund-calculator',  icon:'💸', name:'Tax Refund'       },
    { href:'/budget-planner-calculator',icon:'📋',name:'Budget Planner'  },
    { href:'/college-savings-calculator',icon:'🎓',name:'College Savings'},
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 6. Estate Tax Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('estate-tax-calculator', page(
  'Estate Tax Calculator',
  'Estimate federal estate tax liability and how much your heirs will inherit after taxes.',
  '🏛️',
  [
    { s:'estateValue',    label:'Total Estate Value',            type:'range', min:0,  max:100000000, step:10000, cur:true, def:5000000 },
    { s:'debts',          label:'Total Debts and Liabilities',   type:'range', min:0,  max:50000000,  step:10000, cur:true, def:200000  },
    { s:'charitableGifts',label:'Charitable Bequests',           type:'range', min:0,  max:20000000,  step:10000, cur:true, def:0       },
    { s:'maritalDeduct',  label:'Marital Deduction (to spouse)', type:'range', min:0,  max:50000000,  step:10000, cur:true, def:0       },
    { s:'stateEstateTax', label:'State Estate Tax Rate',         type:'range', min:0,  max:20,        step:0.5,   pct:true, def:0       },
  ],
  `      const EXEMPTION_2026 = 13610000
      const grossEstate   = estateValue - debts
      const taxableEstate = Math.max(0, grossEstate - charitableGifts - maritalDeduct)
      const overExemption = Math.max(0, taxableEstate - EXEMPTION_2026)
      // Federal estate tax: 40% on amount over exemption
      const federalTax    = overExemption * 0.40
      const stateTax      = taxableEstate * (stateEstateTax / 100)
      const totalTax      = federalTax + stateTax
      const heirsReceive  = grossEstate - totalTax - charitableGifts - maritalDeduct
      const taxRate       = taxableEstate > 0 ? (totalTax / taxableEstate * 100).toFixed(1) + '%' : '0%'
      return { taxableEstate, federalTax, stateTax, totalTax, heirsReceive, taxRate }`,
  [
    { label:'Taxable Estate',          k:'taxableEstate', cur:true  },
    { label:'Federal Estate Tax (40%)',k:'federalTax',    cur:true  },
    { label:'State Estate Tax',        k:'stateTax',      cur:true  },
    { label:'Total Tax',               k:'totalTax',      cur:true  },
    { label:'Heirs Receive',           k:'heirsReceive',  cur:true  },
    { label:'Effective Tax Rate',      k:'taxRate',       cur:false },
  ],
  [
    { q:'Who pays federal estate tax in 2026?', a:'Only estates exceeding the federal exemption of $13.61 million per person ($27.22 million for married couples with portability election) pay federal estate tax. This means fewer than 0.1% of estates owe any federal estate tax. The top rate is 40% on amounts above the exemption. Note: the exemption is scheduled to drop to roughly $7 million in 2026 if the TCJA is not extended.' },
    { q:'What is the marital deduction?', a:'The unlimited marital deduction allows you to transfer any amount to a US citizen spouse at death completely free of estate tax. This defers the tax until the surviving spouse dies. The estate then uses the deceased spouses unused exemption (portability) plus their own, potentially shielding $27+ million from tax with proper planning.' },
    { q:'How can I reduce estate taxes?', a:'Key strategies: annual gifting ($18,000 per recipient per year in 2024, tax-free), irrevocable trusts (removes assets from estate), charitable giving (deductible from taxable estate), life insurance in an ILIT (proceeds outside estate), 529 plans (5-year gift tax election), and family limited partnerships. Work with an estate planning attorney for strategies above $10 million.' },
  ],
  [
    { href:'/gift-tax-calculator',    icon:'🎁', name:'Gift Tax'         },
    { href:'/net-worth-calculator',   icon:'💰', name:'Net Worth'        },
    { href:'/retirement-calculator',  icon:'🌅', name:'Retirement'       },
    { href:'/life-insurance-calculator',icon:'🛡️',name:'Life Insurance'  },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 7. Gift Tax Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('gift-tax-calculator', page(
  'Gift Tax Calculator',
  'Calculate gift tax exclusions, lifetime exemption usage and potential tax on large gifts.',
  '🎁',
  [
    { s:'giftAmount',    label:'Total Gift Amount This Year',  type:'range', min:0,   max:10000000, step:1000, cur:true, def:50000 },
    { s:'numRecipients', label:'Number of Recipients',         type:'range', min:1,   max:20,       step:1,    sfx:' people', def:1 },
    { s:'priorLifetime', label:'Prior Lifetime Gifts Used',    type:'range', min:0,   max:13000000, step:10000,cur:true, def:0     },
    { s:'filingStatus',  label:'Filer Type',                   type:'select', def:'individual', opts:[{v:'individual',l:'Individual'},{v:'married',l:'Married Couple (gift splitting)'}] },
  ],
  `      const ANNUAL_EXCL  = 18000
      const LIFETIME     = 13610000
      const annualExcl   = ANNUAL_EXCL * numRecipients * (filingStatus === 'married' ? 2 : 1)
      const taxableGift  = Math.max(0, giftAmount - annualExcl)
      const lifetimeUsed = priorLifetime + taxableGift
      const lifetimeLeft = Math.max(0, LIFETIME - lifetimeUsed)
      const taxDue       = lifetimeUsed > LIFETIME ? (lifetimeUsed - LIFETIME) * 0.40 : 0
      const form709Required = taxableGift > 0
      return {
        annualExcl,
        taxableGift,
        lifetimeUsed,
        lifetimeLeft,
        taxDue,
        form709Required: form709Required ? 'Yes - File Form 709' : 'No - Below annual exclusion'
      }`,
  [
    { label:'Annual Exclusion Available',    k:'annualExcl',     cur:true  },
    { label:'Taxable Gift Amount',           k:'taxableGift',    cur:true  },
    { label:'Lifetime Exemption Used',       k:'lifetimeUsed',   cur:true  },
    { label:'Lifetime Exemption Remaining',  k:'lifetimeLeft',   cur:true  },
    { label:'Gift Tax Due Now',              k:'taxDue',         cur:true  },
    { label:'Form 709 Required?',            k:'form709Required',cur:false },
  ],
  [
    { q:'How does the gift tax annual exclusion work?', a:'You can give up to $18,000 per recipient per year (2024) without any gift tax or reporting requirements. Married couples can combine exclusions to give $36,000 per recipient. These are per-recipient limits — you can give $18,000 to as many people as you want. The exclusion adjusts for inflation periodically.' },
    { q:'What is the lifetime gift tax exemption?', a:'The lifetime gift and estate tax exemption is $13.61 million per person in 2024. Gifts above the annual exclusion reduce this lifetime exemption. No tax is actually due until you exhaust the entire lifetime exemption. Once exceeded, gifts are taxed at 40%. The exemption is unified with the estate tax exemption.' },
    { q:'Are gifts to a spouse taxable?', a:'Gifts between US citizen spouses are completely tax-free with no dollar limit (unlimited marital deduction). Gifts to a non-citizen spouse are limited to $185,000 per year (2024) before gift tax applies. Gifts to charities are also generally tax-free and may be deductible as charitable contributions on your income tax return.' },
  ],
  [
    { href:'/estate-tax-calculator',  icon:'🏛️', name:'Estate Tax'      },
    { href:'/net-worth-calculator',   icon:'💰', name:'Net Worth'        },
    { href:'/tax-calculator',         icon:'🧮', name:'Tax Calculator'   },
    { href:'/college-savings-calculator',icon:'🎓',name:'College Savings'},
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 8. Rental Property Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('rental-property-calculator', page(
  'Rental Property Calculator',
  'Analyze rental property cash flow, ROI, cap rate and return on investment.',
  '🏠',
  [
    { s:'purchasePrice',  label:'Purchase Price',               type:'range', min:50000,  max:5000000, step:5000,  cur:true, def:350000 },
    { s:'downPct',        label:'Down Payment',                 type:'range', min:5,      max:50,      step:5,     pct:true, def:25     },
    { s:'mortgageRate',   label:'Mortgage Rate',                type:'range', min:1,      max:15,      step:0.25,  pct:true, def:7      },
    { s:'monthlyRent',    label:'Monthly Gross Rent',           type:'range', min:200,    max:20000,   step:50,    cur:true, def:2200   },
    { s:'vacancyRate',    label:'Vacancy Rate',                 type:'range', min:0,      max:20,      step:1,     pct:true, def:5      },
    { s:'expenses',       label:'Monthly Operating Expenses',  type:'range', min:0,      max:5000,    step:50,    cur:true, def:600    },
  ],
  `      const downPayment   = purchasePrice * (downPct / 100)
      const loanAmount    = purchasePrice - downPayment
      const r             = mortgageRate / 100 / 12
      const n             = 30 * 12
      const mortgage      = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const effectiveRent = monthlyRent * (1 - vacancyRate/100)
      const noi           = effectiveRent - expenses
      const cashFlow      = noi - mortgage
      const annualCashFlow = cashFlow * 12
      const capRate       = (noi * 12 / purchasePrice * 100).toFixed(2) + '%'
      const cashOnCash    = (annualCashFlow / downPayment * 100).toFixed(2) + '%'
      const grossYield    = (monthlyRent * 12 / purchasePrice * 100).toFixed(2) + '%'
      return { mortgage, effectiveRent, noi, cashFlow, annualCashFlow, capRate, cashOnCash, grossYield }`,
  [
    { label:'Monthly Mortgage Payment',  k:'mortgage',      cur:true  },
    { label:'Effective Monthly Rent',    k:'effectiveRent', cur:true  },
    { label:'Net Operating Income (NOI)',k:'noi',           cur:true  },
    { label:'Monthly Cash Flow',         k:'cashFlow',      cur:true  },
    { label:'Annual Cash Flow',          k:'annualCashFlow',cur:true  },
    { label:'Cap Rate',                  k:'capRate',       cur:false },
    { label:'Cash-on-Cash Return',       k:'cashOnCash',    cur:false },
    { label:'Gross Rental Yield',        k:'grossYield',    cur:false },
  ],
  [
    { q:'What is a good cap rate for rental property?', a:'A cap rate of 5-10% is generally considered good for residential rental property. Urban/coastal markets (NYC, SF, LA) often have cap rates of 3-5% due to appreciation potential. Midwest and Sun Belt markets may offer 7-10%+ cap rates. Cap rate = NOI / Purchase Price. Higher cap rates mean more income relative to price but may reflect higher risk.' },
    { q:'What is cash-on-cash return?', a:'Cash-on-cash return measures annual cash flow as a percentage of your actual cash invested (down payment plus closing costs). It is the most practical measure of rental property performance for leveraged investors. A cash-on-cash return of 6-12% is considered solid. Unlike cap rate, it accounts for your financing structure.' },
    { q:'What expenses should I budget for a rental property?', a:'Budget for: property taxes (1-2% of value/year), insurance ($100-200/month), maintenance (1% of value/year), property management (8-12% of rent if using a manager), vacancy (5-10%), CapEx reserves for big repairs like roof, HVAC, appliances (5-10% of rent). New landlords frequently underestimate expenses by 30-50%.' },
  ],
  [
    { href:'/cap-rate-calculator',        icon:'📊', name:'Cap Rate'           },
    { href:'/mortgage-calculator',        icon:'🏠', name:'Mortgage'           },
    { href:'/roi-calculator',             icon:'💎', name:'ROI Calculator'     },
    { href:'/house-flipping-calculator',  icon:'🔨', name:'House Flipping'     },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 9. Cap Rate Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('cap-rate-calculator', page(
  'Cap Rate Calculator',
  'Calculate capitalization rate for any investment property and determine property value from NOI.',
  '📊',
  [
    { s:'calcMode',      label:'Calculate',                    type:'select', def:'caprate', opts:[{v:'caprate',l:'Cap Rate from NOI + Price'},{v:'value',l:'Property Value from NOI + Cap Rate'},{v:'noi',l:'NOI from Price + Cap Rate'}] },
    { s:'annualRent',    label:'Annual Gross Rent',            type:'range', min:1000,   max:1000000, step:500,  cur:true, def:26400 },
    { s:'opExpenses',    label:'Annual Operating Expenses',    type:'range', min:0,      max:500000,  step:500,  cur:true, def:8000  },
    { s:'propertyPrice', label:'Property Price',               type:'range', min:50000,  max:10000000,step:5000, cur:true, def:350000},
    { s:'targetCapRate', label:'Target Cap Rate (for valuation)', type:'range', min:1,   max:15,      step:0.25, pct:true, def:6     },
  ],
  `      const noi = annualRent - opExpenses
      let capRate, propertyValue, noiResult
      if (calcMode === 'caprate') {
        capRate       = (noi / propertyPrice * 100).toFixed(2) + '%'
        propertyValue = propertyPrice
        noiResult     = noi
      } else if (calcMode === 'value') {
        capRate       = targetCapRate + '%'
        propertyValue = noi / (targetCapRate / 100)
        noiResult     = noi
      } else {
        noiResult     = propertyPrice * (targetCapRate / 100)
        capRate       = targetCapRate + '%'
        propertyValue = propertyPrice
      }
      const grossYield = (annualRent / propertyValue * 100).toFixed(2) + '%'
      const expRatio   = (opExpenses / annualRent * 100).toFixed(1) + '%'
      return { noiResult, capRate, propertyValue, grossYield, expRatio }`,
  [
    { label:'Net Operating Income (NOI)', k:'noiResult',     cur:true  },
    { label:'Cap Rate',                   k:'capRate',       cur:false },
    { label:'Property Value',             k:'propertyValue', cur:true  },
    { label:'Gross Rental Yield',         k:'grossYield',    cur:false },
    { label:'Expense Ratio',              k:'expRatio',      cur:false },
  ],
  [
    { q:'What is cap rate and how is it calculated?', a:'Capitalization rate = Net Operating Income (NOI) / Property Value. NOI = Gross rent minus all operating expenses (taxes, insurance, maintenance, management) but excluding mortgage payments. Cap rate measures the unlevered yield of a property — useful for comparing properties regardless of financing. A $350,000 property with $21,000 NOI has a 6% cap rate.' },
    { q:'What is a good cap rate in 2026?', a:'Cap rates in 2026 vary by property type and market: multifamily 4-6% in gateway cities, 6-8% in secondary markets. Industrial 4-6%. Retail 5-7%. Office 6-9% (higher due to uncertainty). Single-family rentals 4-7%. Higher cap rates generally mean higher risk or lower growth markets. Rising interest rates push cap rates up (prices down).' },
    { q:'Cap rate vs cash-on-cash return: what is the difference?', a:'Cap rate ignores financing — it measures the property yield as if bought all-cash. Cash-on-cash return includes your mortgage payment and measures actual cash flow relative to cash invested. If you buy at a 6% cap rate with a 7% mortgage rate, you may have negative cash flow despite a good cap rate. Use cap rate for valuation, cash-on-cash for investment decisions.' },
  ],
  [
    { href:'/rental-property-calculator', icon:'🏠', name:'Rental Property'   },
    { href:'/roi-calculator',             icon:'💎', name:'ROI Calculator'    },
    { href:'/house-flipping-calculator',  icon:'🔨', name:'House Flipping'    },
    { href:'/mortgage-calculator',        icon:'🏡', name:'Mortgage'          },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 10. House Flipping Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('house-flipping-calculator', page(
  'House Flipping Calculator',
  'Calculate profit, ROI and break-even for a house flip including all costs and carrying expenses.',
  '🔨',
  [
    { s:'purchasePrice',  label:'Purchase Price',               type:'range', min:20000,  max:2000000, step:5000,  cur:true, def:200000 },
    { s:'rehabCost',      label:'Renovation Budget',            type:'range', min:0,      max:500000,  step:1000,  cur:true, def:45000  },
    { s:'holdingMonths',  label:'Holding Period',               type:'range', min:1,      max:24,      step:1,     sfx:' mo', def:6     },
    { s:'monthlyCarry',   label:'Monthly Carrying Costs',       type:'range', min:0,      max:10000,   step:100,   cur:true, def:2000   },
    { s:'arvPrice',       label:'After Repair Value (ARV)',     type:'range', min:50000,  max:3000000, step:5000,  cur:true, def:320000 },
    { s:'closingCostPct', label:'Closing Costs (buy+sell)',     type:'range', min:2,      max:12,      step:0.5,   pct:true, def:8      },
  ],
  `      const closingCosts  = (purchasePrice + arvPrice) * (closingCostPct / 100)
      const carryingCosts = monthlyCarry * holdingMonths
      const totalCost     = purchasePrice + rehabCost + closingCosts + carryingCosts
      const grossProfit   = arvPrice - totalCost
      const roi           = (grossProfit / totalCost * 100).toFixed(1) + '%'
      const annualisedRoi = ((Math.pow(1 + grossProfit/totalCost, 12/holdingMonths) - 1) * 100).toFixed(1) + '%'
      // 70% rule check
      const rule70max     = arvPrice * 0.70 - rehabCost
      const rule70ok      = purchasePrice <= rule70max ? 'Pass - Good deal' : 'Fail - Overpaying'
      return { totalCost, grossProfit, roi, annualisedRoi, closingCosts, carryingCosts, rule70max, rule70ok }`,
  [
    { label:'Total All-In Cost',          k:'totalCost',      cur:true  },
    { label:'Gross Profit',               k:'grossProfit',    cur:true  },
    { label:'ROI on this Flip',           k:'roi',            cur:false },
    { label:'Annualised ROI',             k:'annualisedRoi',  cur:false },
    { label:'Closing Costs Total',        k:'closingCosts',   cur:true  },
    { label:'Total Carrying Costs',       k:'carryingCosts',  cur:true  },
    { label:'70% Rule Max Offer',         k:'rule70max',      cur:true  },
    { label:'70% Rule Check',             k:'rule70ok',       cur:false },
  ],
  [
    { q:'What is the 70% rule in house flipping?', a:'The 70% rule: maximum purchase price = ARV x 70% minus rehab costs. On a property with $320,000 ARV and $45,000 rehab: max offer = $224,000 - $45,000 = $179,000. This leaves 30% for costs, holding expenses and profit. It is a quick filter — use detailed calculations before making actual offers.' },
    { q:'How much profit should a house flip make?', a:'Most experienced flippers target at least $25,000-$30,000 minimum profit per flip to justify the risk. In terms of ROI, aim for 15-20%+ return on total invested capital. Annualised returns of 20-40% are achievable on successful flips. Margins are compressed in competitive markets — always account for overruns (add 15-20% to rehab budget).' },
    { q:'What are the biggest risks in house flipping?', a:'Top risks: unexpected structural issues (foundation, roof, plumbing) blowing the rehab budget, holding too long due to slow sales market or financing delays, overpaying for the property, underestimating renovation time and cost, and short-term capital gains tax (taxed as ordinary income if held under 1 year). Always get a professional inspection before buying.' },
  ],
  [
    { href:'/rental-property-calculator', icon:'🏠', name:'Rental Property'   },
    { href:'/cap-rate-calculator',        icon:'📊', name:'Cap Rate'           },
    { href:'/roi-calculator',             icon:'💎', name:'ROI Calculator'     },
    { href:'/home-improvement-loan-calculator',icon:'🔨',name:'Home Improvement'},
  ]
))

console.log(`
════════════════════════════════════════════════════
  STAGE 6 COMPLETE — 10 calculators created
════════════════════════════════════════════════════
   1.  /budget-planner-calculator
   2.  /rent-affordability-calculator
   3.  /net-pay-calculator
   4.  /tax-refund-calculator
   5.  /child-tax-credit-calculator
   6.  /estate-tax-calculator
   7.  /gift-tax-calculator
   8.  /rental-property-calculator
   9.  /cap-rate-calculator
  10.  /house-flipping-calculator

  Deploy:
  git add .
  git commit -m "Stage 6: budget and housing calculators"
  git push origin master:main
════════════════════════════════════════════════════
`)
