/**
 * FreeFinCalc.net — STAGE 2: 25 New Calculator Pages
 * Run from project root: node stage2_calculators.js
 *
 * Calculators:
 *  1. amortization-calculator
 *  2. student-loan-calculator
 *  3. refinance-calculator
 *  4. debt-to-income-calculator
 *  5. home-affordability-calculator
 *  6. heloc-calculator
 *  7. property-tax-calculator
 *  8. rent-vs-buy-calculator
 *  9. emergency-fund-calculator
 * 10. 401k-calculator
 * 11. roth-ira-calculator
 * 12. dividend-calculator
 * 13. stock-profit-calculator
 * 14. simple-interest-calculator
 * 15. apr-calculator
 * 16. interest-rate-calculator
 * 17. paycheck-calculator
 * 18. raise-calculator
 * 19. tip-calculator
 * 20. sales-tax-calculator
 * 21. vat-calculator
 * 22. currency-converter
 * 23. payoff-vs-invest-calculator
 * 24. net-worth-calculator
 * 25. debt-payoff-calculator
 */

const fs = require('fs')

// ─── shared page template ──────────────────────────────────────────────────
function page(slug, title, desc, icon, inputs, formula, results, faqs, related) {
  const states = inputs.map(f => `  const [${f.s}, set${cap(f.s)}] = useState(${f.def})`).join('\n')
  const deps   = inputs.map(f => f.s).join(', ')

  const inputsJSX = inputs.map(f => {
    if (f.type === 'range') {
      const display = f.cur
        ? `fmt(${f.s})`
        : f.pct
        ? `${f.s} + '%'`
        : `${f.s}${f.sfx ? ` + '${f.sfx}'` : ''}`
      return `
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">${f.label}</label>
                  <span className="text-white font-bold text-sm">{${display}}</span>
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
                  {${JSON.stringify(f.opts)}.map(o => (
                    <button key={o.v} onClick={() => set${cap(f.s)}(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:${f.s}===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:${f.s}===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:${f.s}===o.v?'#f0c842':'#64748b'}}>
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
                    <span className="font-bold" style={{color:'#f0c842'}}>{${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}}</span>
                  </div>`).join('\n')

  const pdfRows = results.map(r =>
    `    { label: '${r.label}', value: result.${r.k} !== undefined ? (${r.cur ? `fmt(result.${r.k})` : `String(result.${r.k})`}) : '' },`
  ).join('\n')

  const relatedJSX = related.map(r => `
            <a href="${r.href}" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">${r.icon}</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">${r.name}</h3>
            </a>`).join('\n')

  const faqsJSX = faqs.map((f, i) => `
            <div className="${i < faqs.length - 1 ? "border-b pb-4" : "pb-4"}" style={{borderColor:'rgba(240,200,66,0.1)'}}>
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

export const metadata = undefined

const faqs = ${JSON.stringify(faqs, null, 2)}

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

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">${icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">${title}</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">${desc}</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">
${inputsJSX}
            </div>
          </div>

          {/* Results */}
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
              ⚠️ Results are estimates for educational purposes only. Not financial advice.
              Consult a qualified professional before making financial decisions.
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
${relatedJSX}
          </div>
        </div>

        {/* FAQ */}
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

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅ app/' + dir)
}

// ══════════════════════════════════════════════════════════════════════
// CALCULATORS
// ══════════════════════════════════════════════════════════════════════

// 1. Amortization Calculator
write('amortization-calculator', page(
  'amortization-calculator',
  'Amortization Calculator',
  'See your full loan amortization schedule — principal, interest and balance for every payment.',
  '📋',
  [
    { s:'loanAmount', label:'Loan Amount', type:'range', min:5000, max:1000000, step:1000, cur:true, def:250000 },
    { s:'rate', label:'Annual Interest Rate', type:'range', min:0.5, max:20, step:0.25, pct:true, def:6.5 },
    { s:'termYears', label:'Loan Term', type:'select', def:30, opts:[{v:5,l:'5 yrs'},{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:20,l:'20 yrs'},{v:30,l:'30 yrs'}] },
  ],
  `      const r = rate / 100 / 12
      const n = termYears * 12
      const monthly = r === 0 ? loanAmount/n : loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - loanAmount
      const year1Interest = (() => { let b=loanAmount,int=0; for(let i=0;i<12;i++){const ip=b*r;int+=ip;b-=(monthly-ip);} return int })()
      return { monthly, totalInterest, totalPaid, year1Interest }`,
  [
    { label:'Monthly Payment', k:'monthly', cur:true },
    { label:'Total Interest Paid', k:'totalInterest', cur:true },
    { label:'Total Amount Paid', k:'totalPaid', cur:true },
    { label:'Year 1 Interest', k:'year1Interest', cur:true },
  ],
  [
    { q:'What is an amortization schedule?', a:'An amortization schedule is a table showing each loan payment broken down into principal and interest. Early payments are mostly interest; later payments are mostly principal. Seeing this schedule helps you understand how your debt decreases over time.' },
    { q:'How does extra payment affect amortization?', a:'Making extra payments toward principal reduces the loan balance faster, saving significant interest. On a $250,000 30-year mortgage at 6.5%, paying $100 extra per month saves over $30,000 in interest and cuts the loan by 4 years.' },
    { q:'What is a fully amortizing loan?', a:'A fully amortizing loan is one where equal regular payments pay off the entire balance (principal + interest) by the end of the term. Most mortgages, car loans and personal loans are fully amortizing. The opposite is a bullet or balloon loan.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/refinance-calculator', icon:'🔄', name:'Refinance Calculator' },
    { href:'/loan-calculator', icon:'💳', name:'Loan Calculator' },
    { href:'/down-payment-calculator', icon:'🏙️', name:'Down Payment' },
  ]
))

// 2. Student Loan Calculator
write('student-loan-calculator', page(
  'student-loan-calculator',
  'Student Loan Calculator',
  'Calculate your student loan monthly payments, total interest and time to pay off.',
  '🎓',
  [
    { s:'balance', label:'Loan Balance', type:'range', min:1000, max:200000, step:500, cur:true, def:35000 },
    { s:'rate', label:'Interest Rate', type:'range', min:1, max:15, step:0.125, pct:true, def:5.5 },
    { s:'termYears', label:'Repayment Term', type:'select', def:10, opts:[{v:5,l:'5 yrs'},{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:20,l:'20 yrs'},{v:25,l:'25 yrs'}] },
  ],
  `      const r = rate / 100 / 12
      const n = termYears * 12
      const monthly = r === 0 ? balance/n : balance * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - balance
      const interestPct = ((totalInterest / balance) * 100).toFixed(1) + '%'
      return { monthly, totalInterest, totalPaid, interestPct }`,
  [
    { label:'Monthly Payment', k:'monthly', cur:true },
    { label:'Total Interest', k:'totalInterest', cur:true },
    { label:'Total Paid', k:'totalPaid', cur:true },
    { label:'Interest as % of Loan', k:'interestPct', cur:false },
  ],
  [
    { q:'What is the average student loan debt?', a:'The average US student loan borrower owes approximately $37,000. Federal student loans for undergraduates are capped at $31,000 for dependent students and $57,500 for independent students. Graduate students can borrow significantly more.' },
    { q:'Should I pay off student loans or invest?', a:'If your student loan rate is below 6%, investing in an index fund earning 7-10% historically makes more financial sense. If your rate is above 6-7%, paying off debt first is usually better. High-interest private loans should always be prioritized.' },
    { q:'What is income-driven repayment?', a:'Income-driven repayment (IDR) plans cap federal student loan payments at 5-20% of your discretionary income. Plans include SAVE, PAYE, IBR and ICR. After 10-25 years of qualifying payments, any remaining balance may be forgiven. IDR is best for low income relative to debt.' },
  ],
  [
    { href:'/loan-calculator', icon:'💳', name:'Loan Calculator' },
    { href:'/debt-payoff-calculator', icon:'🎯', name:'Debt Payoff' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
  ]
))

// 3. Refinance Calculator
write('refinance-calculator', page(
  'refinance-calculator',
  'Refinance Calculator',
  'Find out if refinancing your loan saves money and how long to break even on closing costs.',
  '🔄',
  [
    { s:'currentBalance', label:'Current Loan Balance', type:'range', min:10000, max:1000000, step:5000, cur:true, def:300000 },
    { s:'currentRate', label:'Current Interest Rate', type:'range', min:1, max:15, step:0.125, pct:true, def:7.5 },
    { s:'newRate', label:'New Interest Rate', type:'range', min:1, max:15, step:0.125, pct:true, def:6.0 },
    { s:'termYears', label:'New Loan Term', type:'select', def:30, opts:[{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:20,l:'20 yrs'},{v:30,l:'30 yrs'}] },
    { s:'closingCosts', label:'Closing Costs', type:'range', min:0, max:20000, step:250, cur:true, def:5000 },
  ],
  `      const r1 = currentRate / 100 / 12
      const r2 = newRate / 100 / 12
      const n = termYears * 12
      const oldMonthly = r1 === 0 ? currentBalance/n : currentBalance*(r1*Math.pow(1+r1,n))/(Math.pow(1+r1,n)-1)
      const newMonthly = r2 === 0 ? currentBalance/n : currentBalance*(r2*Math.pow(1+r2,n))/(Math.pow(1+r2,n)-1)
      const monthlySavings = oldMonthly - newMonthly
      if (monthlySavings <= 0) return { monthlySavings, newMonthly, breakEven: 'Not worth it', totalSavings: 0 }
      const breakEvenMonths = Math.ceil(closingCosts / monthlySavings)
      const totalSavings = (monthlySavings * n) - closingCosts
      return { newMonthly, monthlySavings, breakEven: breakEvenMonths + ' months', totalSavings }`,
  [
    { label:'New Monthly Payment', k:'newMonthly', cur:true },
    { label:'Monthly Savings', k:'monthlySavings', cur:true },
    { label:'Break-Even Period', k:'breakEven', cur:false },
    { label:'Total Lifetime Savings', k:'totalSavings', cur:true },
  ],
  [
    { q:'When should I refinance my mortgage?', a:'Refinancing is worth it when: (1) you can lower your rate by at least 0.5-1%, (2) you plan to stay in the home long enough to recoup closing costs (break-even), and (3) your credit score has improved since origination. The break-even point is typically 2-4 years.' },
    { q:'What are typical refinance closing costs?', a:'Refinance closing costs typically run 2-5% of the loan amount — about $6,000-$15,000 on a $300,000 loan. Costs include origination fees, appraisal, title insurance, escrow and attorney fees. Some lenders offer no-closing-cost refinances at a slightly higher rate.' },
    { q:'Does refinancing hurt your credit?', a:'Refinancing causes a temporary credit score dip of 5-15 points due to the hard credit inquiry and new account opening. The effect is minor and usually recovers within 6-12 months of on-time payments. Multiple mortgage inquiries within 45 days are typically treated as one.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/amortization-calculator', icon:'📋', name:'Amortization' },
    { href:'/home-affordability-calculator', icon:'🏡', name:'Home Affordability' },
    { href:'/loan-calculator', icon:'💳', name:'Loan Calculator' },
  ]
))

// 4. Debt-to-Income Calculator
write('debt-to-income-calculator', page(
  'debt-to-income-calculator',
  'Debt-to-Income Calculator',
  'Calculate your debt-to-income (DTI) ratio and see if you qualify for a mortgage or loan.',
  '⚖️',
  [
    { s:'grossMonthlyIncome', label:'Gross Monthly Income', type:'range', min:1000, max:50000, step:250, cur:true, def:7000 },
    { s:'mortgageRent', label:'Mortgage / Rent Payment', type:'range', min:0, max:10000, step:50, cur:true, def:1800 },
    { s:'carPayments', label:'Car Loan Payments', type:'range', min:0, max:3000, step:25, cur:true, def:400 },
    { s:'creditCards', label:'Min Credit Card Payments', type:'range', min:0, max:2000, step:25, cur:true, def:150 },
    { s:'otherDebts', label:'Other Monthly Debts', type:'range', min:0, max:5000, step:25, cur:true, def:200 },
  ],
  `      const totalDebt = mortgageRent + carPayments + creditCards + otherDebts
      const dti = (totalDebt / grossMonthlyIncome) * 100
      const frontEnd = (mortgageRent / grossMonthlyIncome) * 100
      let status = 'Excellent'
      if (dti > 43) status = 'Too High — Loan Approval Difficult'
      else if (dti > 36) status = 'High — Some Lenders May Decline'
      else if (dti > 28) status = 'Acceptable'
      else if (dti > 20) status = 'Good'
      return {
        dti: dti.toFixed(1) + '%',
        frontEnd: frontEnd.toFixed(1) + '%',
        totalDebt,
        status
      }`,
  [
    { label:'Total Debt-to-Income Ratio', k:'dti', cur:false },
    { label:'Front-End Ratio (housing only)', k:'frontEnd', cur:false },
    { label:'Total Monthly Debt', k:'totalDebt', cur:true },
    { label:'Loan Approval Status', k:'status', cur:false },
  ],
  [
    { q:'What is a good debt-to-income ratio?', a:'Below 36% is considered good. Most conventional mortgage lenders require a DTI of 43% or less. The best mortgage rates go to borrowers with DTI below 28%. FHA loans allow DTI up to 50% with compensating factors like excellent credit or large down payment.' },
    { q:'How do I lower my debt-to-income ratio?', a:'To lower DTI: (1) pay down existing debts, especially high minimum payment balances, (2) increase income through a raise, second job or freelance work, (3) avoid taking on new debt before applying for a loan. Even paying off a small $200/month debt can meaningfully shift your DTI.' },
    { q:'What is front-end vs back-end DTI?', a:'Front-end DTI includes only housing costs (mortgage/rent, taxes, insurance) divided by income. Back-end DTI includes all monthly debt payments. Conventional lenders prefer front-end DTI below 28% and back-end below 36%. FHA uses 31%/43% guidelines.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/home-affordability-calculator', icon:'🏡', name:'Home Affordability' },
    { href:'/debt-payoff-calculator', icon:'🎯', name:'Debt Payoff' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
  ]
))

// 5. Home Affordability Calculator
write('home-affordability-calculator', page(
  'home-affordability-calculator',
  'Home Affordability Calculator',
  'Find out how much house you can afford based on your income, debts and down payment.',
  '🏡',
  [
    { s:'annualIncome', label:'Annual Gross Income', type:'range', min:20000, max:500000, step:1000, cur:true, def:90000 },
    { s:'monthlyDebts', label:'Monthly Debt Payments', type:'range', min:0, max:5000, step:50, cur:true, def:500 },
    { s:'downPayment', label:'Down Payment Available', type:'range', min:0, max:200000, step:1000, cur:true, def:40000 },
    { s:'rate', label:'Mortgage Interest Rate', type:'range', min:2, max:12, step:0.125, pct:true, def:6.75 },
    { s:'termYears', label:'Loan Term', type:'select', def:30, opts:[{v:15,l:'15 yrs'},{v:20,l:'20 yrs'},{v:30,l:'30 yrs'}] },
  ],
  `      const maxDTI = 0.43
      const monthlyIncome = annualIncome / 12
      const maxTotalDebt = monthlyIncome * maxDTI
      const maxMortgagePayment = maxTotalDebt - monthlyDebts
      if (maxMortgagePayment <= 0) return null
      const r = rate / 100 / 12
      const n = termYears * 12
      const maxLoan = maxMortgagePayment / (r === 0 ? 1/n : (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1))
      const maxHomePrice = maxLoan + downPayment
      const conservativePrice = maxHomePrice * 0.8
      return { maxHomePrice, conservativePrice, maxLoan, maxMortgagePayment }`,
  [
    { label:'Maximum Home Price', k:'maxHomePrice', cur:true },
    { label:'Conservative Budget (80%)', k:'conservativePrice', cur:true },
    { label:'Max Mortgage Loan', k:'maxLoan', cur:true },
    { label:'Max Monthly Payment', k:'maxMortgagePayment', cur:true },
  ],
  [
    { q:'How much house can I afford on my salary?', a:'A common rule is the 28/36 rule: spend no more than 28% of gross monthly income on housing and 36% on total debt. On a $90,000 salary that is $2,100/month for housing. With a 6.75% rate on a 30-year loan this supports a mortgage of about $325,000.' },
    { q:'What is the 28/36 rule for buying a home?', a:'The 28/36 rule states your mortgage payment should not exceed 28% of gross monthly income (front-end DTI) and all debt payments should not exceed 36% (back-end DTI). This is a conservative guideline; FHA loans allow higher ratios, up to 31% front-end and 43% back-end.' },
    { q:'What costs beyond the mortgage should I budget for?', a:'Beyond your mortgage budget for: property taxes (0.5-2.5% of home value annually), homeowners insurance (~$1,200-$2,500/year), HOA fees if applicable, PMI if down payment is under 20% ($50-$200/month), maintenance (1-2% of home value/year) and utilities.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/debt-to-income-calculator', icon:'⚖️', name:'DTI Calculator' },
    { href:'/down-payment-calculator', icon:'🏙️', name:'Down Payment' },
    { href:'/rent-vs-buy-calculator', icon:'🏘️', name:'Rent vs Buy' },
  ]
))

// 6. HELOC Calculator
write('heloc-calculator', page(
  'heloc-calculator',
  'HELOC Calculator',
  'Calculate available home equity, line of credit limit and interest-only payment on a HELOC.',
  '🏦',
  [
    { s:'homeValue', label:'Current Home Value', type:'range', min:50000, max:2000000, step:5000, cur:true, def:450000 },
    { s:'mortgageBalance', label:'Remaining Mortgage Balance', type:'range', min:0, max:1500000, step:5000, cur:true, def:280000 },
    { s:'ltv', label:'Max LTV Ratio', type:'select', def:85, opts:[{v:80,l:'80%'},{v:85,l:'85%'},{v:90,l:'90%'}] },
    { s:'helocRate', label:'HELOC Interest Rate', type:'range', min:4, max:15, step:0.25, pct:true, def:8.5 },
    { s:'drawAmount', label:'Amount to Draw', type:'range', min:0, max:500000, step:1000, cur:true, def:50000 },
  ],
  `      const equity = homeValue - mortgageBalance
      const maxBorrow = (homeValue * ltv / 100) - mortgageBalance
      if (maxBorrow <= 0) return null
      const monthlyInterestOnly = drawAmount * (helocRate / 100 / 12)
      const annualInterest = drawAmount * (helocRate / 100)
      return { equity, maxBorrow, monthlyInterestOnly, annualInterest }`,
  [
    { label:'Current Home Equity', k:'equity', cur:true },
    { label:'Max HELOC Credit Limit', k:'maxBorrow', cur:true },
    { label:'Monthly Interest-Only Payment', k:'monthlyInterestOnly', cur:true },
    { label:'Annual Interest Cost', k:'annualInterest', cur:true },
  ],
  [
    { q:'What is a HELOC and how does it work?', a:'A HELOC (Home Equity Line of Credit) lets you borrow against your home equity up to a set limit. During the draw period (typically 10 years) you can borrow and repay as needed, paying interest only. During the repayment period (10-20 years) you repay principal and interest.' },
    { q:'What is the maximum HELOC amount?', a:'Most lenders allow you to borrow up to 80-90% of your home\'s value minus your mortgage balance. On a $450,000 home with $280,000 mortgage at 85% LTV: ($450,000 × 0.85) - $280,000 = $102,500 maximum HELOC.' },
    { q:'HELOC vs home equity loan — what is the difference?', a:'A HELOC is a revolving line of credit with a variable rate — you borrow as needed. A home equity loan is a lump sum with a fixed rate and fixed payments. HELOCs are better for ongoing expenses; home equity loans are better for one-time large expenses where you want payment certainty.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/home-affordability-calculator', icon:'🏡', name:'Home Affordability' },
    { href:'/refinance-calculator', icon:'🔄', name:'Refinance Calculator' },
    { href:'/debt-to-income-calculator', icon:'⚖️', name:'DTI Calculator' },
  ]
))

// 7. Property Tax Calculator
write('property-tax-calculator', page(
  'property-tax-calculator',
  'Property Tax Calculator',
  'Estimate your annual property tax and monthly escrow payment based on assessed value and rate.',
  '🏛️',
  [
    { s:'homeValue', label:'Home / Property Value', type:'range', min:50000, max:5000000, step:5000, cur:true, def:350000 },
    { s:'assessedPct', label:'Assessment Ratio', type:'range', min:50, max:100, step:5, pct:true, def:100 },
    { s:'taxRate', label:'Property Tax Rate (mill rate)', type:'range', min:0.1, max:4, step:0.05, pct:true, def:1.2 },
  ],
  `      const assessedValue = homeValue * (assessedPct / 100)
      const annualTax = assessedValue * (taxRate / 100)
      const monthlyEscrow = annualTax / 12
      const effectiveRate = (annualTax / homeValue * 100).toFixed(3) + '%'
      return { annualTax, monthlyEscrow, assessedValue, effectiveRate }`,
  [
    { label:'Annual Property Tax', k:'annualTax', cur:true },
    { label:'Monthly Escrow Amount', k:'monthlyEscrow', cur:true },
    { label:'Assessed Value', k:'assessedValue', cur:true },
    { label:'Effective Tax Rate', k:'effectiveRate', cur:false },
  ],
  [
    { q:'How is property tax calculated?', a:'Property tax = Assessed Value × Tax Rate. The assessed value is often a percentage of market value (the assessment ratio). A $350,000 home assessed at 100% with a 1.2% rate pays $4,200/year or $350/month in property tax escrow.' },
    { q:'What is the average property tax rate in the US?', a:'The average effective property tax rate in the US is about 1.1% of home value. Rates vary widely by state: New Jersey averages 2.4%, Illinois 2.2%, Texas 1.7%, California 0.7%, and Hawaii 0.3%. Local rates within a state also vary by county and municipality.' },
    { q:'Can I appeal my property tax assessment?', a:'Yes. If you believe your home is over-assessed you can appeal. Start by comparing your assessed value to recent sales of similar nearby homes. File an appeal with your local assessor\'s office — deadlines are typically 30-90 days after assessment notices. About 30-40% of appeals result in reductions.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/home-affordability-calculator', icon:'🏡', name:'Home Affordability' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/rent-vs-buy-calculator', icon:'🏘️', name:'Rent vs Buy' },
  ]
))

// 8. Rent vs Buy Calculator
write('rent-vs-buy-calculator', page(
  'rent-vs-buy-calculator',
  'Rent vs Buy Calculator',
  'Compare the true financial cost of renting versus buying a home over time.',
  '🏘️',
  [
    { s:'homePrice', label:'Home Purchase Price', type:'range', min:50000, max:2000000, step:5000, cur:true, def:400000 },
    { s:'downPct', label:'Down Payment %', type:'select', def:20, opts:[{v:5,l:'5%'},{v:10,l:'10%'},{v:20,l:'20%'},{v:25,l:'25%'}] },
    { s:'mortgageRate', label:'Mortgage Rate', type:'range', min:2, max:12, step:0.125, pct:true, def:6.75 },
    { s:'monthlyRent', label:'Monthly Rent (alternative)', type:'range', min:500, max:10000, step:50, cur:true, def:2200 },
    { s:'years', label:'Comparison Period', type:'select', def:7, opts:[{v:3,l:'3 yrs'},{v:5,l:'5 yrs'},{v:7,l:'7 yrs'},{v:10,l:'10 yrs'}] },
  ],
  `      const dp = homePrice * downPct / 100
      const loan = homePrice - dp
      const r = mortgageRate / 100 / 12
      const n = 30 * 12
      const mortgagePayment = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalBuyCost = (mortgagePayment + homePrice * 0.015/12) * years * 12 + dp
      const totalRentCost = monthlyRent * years * 12
      const homeAppreciation = homePrice * (Math.pow(1.04, years) - 1)
      const buyNetCost = totalBuyCost - homeAppreciation
      const diff = totalRentCost - buyNetCost
      const better = diff > 0 ? 'Buying saves ' : 'Renting saves '
      return { mortgagePayment, totalBuyCost, totalRentCost, homeAppreciation, saving: Math.abs(diff), better }`,
  [
    { label:'Monthly Mortgage Payment', k:'mortgagePayment', cur:true },
    { label:'Total Cost of Buying', k:'totalBuyCost', cur:true },
    { label:'Total Cost of Renting', k:'totalRentCost', cur:true },
    { label:'Est. Home Appreciation', k:'homeAppreciation', cur:true },
  ],
  [
    { q:'Is it better to rent or buy a home?', a:'It depends on timeline, finances and market. Buying is better if you plan to stay 5+ years, can afford a 10-20% down payment, and home prices are reasonable relative to rents. Renting is better for flexibility, expensive markets (NYC, SF) and when you lack a down payment or have high debt.' },
    { q:'What is the price-to-rent ratio?', a:'The price-to-rent ratio compares home prices to annual rents. Divide home price by annual rent. A ratio below 15 favors buying; 15-20 is neutral; above 20 favors renting. In San Francisco the ratio exceeds 40, strongly favoring renting. In many Midwest cities it is below 15, favoring buying.' },
    { q:'How long do you need to stay to make buying worth it?', a:'The break-even point for buying vs renting is typically 3-7 years depending on transaction costs, mortgage rate and market appreciation. The 5-year rule suggests staying at least 5 years to recoup transaction costs (real estate agent fees, closing costs, moving). Shorter stays usually favor renting.' },
  ],
  [
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/rent-affordability-calculator', icon:'🏡', name:'Rent Affordability' },
    { href:'/home-affordability-calculator', icon:'🏘️', name:'Home Affordability' },
    { href:'/down-payment-calculator', icon:'🏙️', name:'Down Payment' },
  ]
))

// 9. Emergency Fund Calculator
write('emergency-fund-calculator', page(
  'emergency-fund-calculator',
  'Emergency Fund Calculator',
  'Calculate exactly how large your emergency fund should be and how long to build it.',
  '🛡️',
  [
    { s:'monthlyExpenses', label:'Monthly Essential Expenses', type:'range', min:500, max:20000, step:100, cur:true, def:3500 },
    { s:'monthsCoverage', label:'Months of Coverage', type:'select', def:6, opts:[{v:3,l:'3 months'},{v:6,l:'6 months'},{v:9,l:'9 months'},{v:12,l:'12 months'}] },
    { s:'currentSavings', label:'Current Emergency Savings', type:'range', min:0, max:100000, step:500, cur:true, def:2000 },
    { s:'monthlySave', label:'Monthly Savings Contribution', type:'range', min:50, max:5000, step:50, cur:true, def:500 },
  ],
  `      const target = monthlyExpenses * monthsCoverage
      const stillNeeded = Math.max(0, target - currentSavings)
      const monthsToGoal = stillNeeded > 0 ? Math.ceil(stillNeeded / monthlySave) : 0
      const pctComplete = Math.min(100, (currentSavings / target * 100)).toFixed(1) + '%'
      return { target, stillNeeded, monthsToGoal: monthsToGoal > 0 ? monthsToGoal + ' months' : 'Goal reached! 🎉', pctComplete }`,
  [
    { label:'Emergency Fund Target', k:'target', cur:true },
    { label:'Still Need to Save', k:'stillNeeded', cur:true },
    { label:'Time to Reach Goal', k:'monthsToGoal', cur:false },
    { label:'% of Goal Reached', k:'pctComplete', cur:false },
  ],
  [
    { q:'How large should my emergency fund be?', a:'Financial experts recommend 3-6 months of essential living expenses. Use 3 months if you have a stable job, low debt, dual income and low fixed expenses. Use 6-12 months if you are self-employed, have variable income, are a single-income household, or work in a volatile industry.' },
    { q:'Where should I keep my emergency fund?', a:'Keep your emergency fund in a high-yield savings account (HYSA) or money market account. These are FDIC insured, earn 4-5% interest (as of 2026) and are accessible within 1-3 days. Do not invest emergency funds in stocks — they can lose value exactly when you need them.' },
    { q:'Should I build an emergency fund or pay off debt first?', a:'Build a small starter emergency fund ($1,000-$2,000) first to avoid using credit cards for unexpected expenses, then focus aggressively on high-interest debt. Once high-interest debt is paid off, build your full emergency fund. Low-interest debt (under 5%) can be repaid more slowly while building your fund.' },
  ],
  [
    { href:'/savings-calculator', icon:'🏦', name:'Savings Calculator' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/debt-payoff-calculator', icon:'🎯', name:'Debt Payoff' },
    { href:'/net-worth-calculator', icon:'💰', name:'Net Worth' },
  ]
))

// 10. 401k Calculator
write('401k-calculator', page(
  '401k-calculator',
  '401k Calculator',
  'Project your 401k balance at retirement based on contributions, employer match and growth.',
  '👴',
  [
    { s:'currentBalance', label:'Current 401k Balance', type:'range', min:0, max:500000, step:1000, cur:true, def:25000 },
    { s:'annualSalary', label:'Annual Salary', type:'range', min:20000, max:500000, step:1000, cur:true, def:75000 },
    { s:'contribution', label:'Your Contribution %', type:'range', min:1, max:30, step:1, pct:true, def:10 },
    { s:'employerMatch', label:'Employer Match %', type:'range', min:0, max:10, step:0.5, pct:true, def:4 },
    { s:'growthRate', label:'Expected Annual Return', type:'range', min:1, max:15, step:0.5, pct:true, def:7 },
    { s:'yearsToRetire', label:'Years Until Retirement', type:'range', min:1, max:45, step:1, sfx:' yrs', def:30 },
  ],
  `      const annualContrib = annualSalary * (contribution / 100)
      const employerContrib = annualSalary * (Math.min(contribution, employerMatch) / 100)
      const totalAnnual = annualContrib + employerContrib
      const r = growthRate / 100
      const futureBalance = currentBalance * Math.pow(1+r, yearsToRetire) +
        totalAnnual * (Math.pow(1+r, yearsToRetire) - 1) / r
      const totalContributed = totalAnnual * yearsToRetire + currentBalance
      const growthEarned = futureBalance - totalContributed
      const monthlyRetirement = futureBalance * 0.04 / 12
      return { futureBalance, totalContributed, growthEarned, monthlyRetirement }`,
  [
    { label:'Projected Balance at Retirement', k:'futureBalance', cur:true },
    { label:'Total Amount Contributed', k:'totalContributed', cur:true },
    { label:'Investment Growth Earned', k:'growthEarned', cur:true },
    { label:'Est. Monthly Retirement Income (4%)', k:'monthlyRetirement', cur:true },
  ],
  [
    { q:'How much should I contribute to my 401k?', a:'At minimum, contribute enough to get your full employer match — that is a 50-100% instant return. Beyond that, aim for 15% of income including employer contributions. The 2026 401k contribution limit is $23,500 ($31,000 if age 50+). Starting early has an enormous impact due to compound growth.' },
    { q:'What is the employer 401k match?', a:'A common employer match is 50% of contributions up to 6% of salary — meaning if you contribute 6%, your employer adds 3%. Some employers match 100% up to 3-4%. Always contribute at least enough to capture the full employer match; not doing so is leaving free money on the table.' },
    { q:'What is the 4% rule for retirement?', a:'The 4% rule states you can safely withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, with a high probability your money lasts 30+ years. A $1,000,000 portfolio supports $40,000/year or $3,333/month. It is a guideline, not a guarantee.' },
  ],
  [
    { href:'/roth-ira-calculator', icon:'📊', name:'Roth IRA Calculator' },
    { href:'/retirement-calculator', icon:'👴', name:'Retirement Calculator' },
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
  ]
))

// 11. Roth IRA Calculator
write('roth-ira-calculator', page(
  'roth-ira-calculator',
  'Roth IRA Calculator',
  'Project your Roth IRA balance at retirement with tax-free growth and withdrawals.',
  '📊',
  [
    { s:'currentBalance', label:'Current Roth IRA Balance', type:'range', min:0, max:500000, step:500, cur:true, def:5000 },
    { s:'annualContrib', label:'Annual Contribution', type:'range', min:0, max:7000, step:250, cur:true, def:7000 },
    { s:'growthRate', label:'Expected Annual Return', type:'range', min:1, max:15, step:0.5, pct:true, def:8 },
    { s:'years', label:'Years Until Retirement', type:'range', min:1, max:50, step:1, sfx:' yrs', def:30 },
    { s:'taxRate', label:'Current Tax Rate (for comparison)', type:'range', min:10, max:40, step:1, pct:true, def:22 },
  ],
  `      const r = growthRate / 100
      const futureBalance = currentBalance * Math.pow(1+r, years) +
        annualContrib * (Math.pow(1+r, years) - 1) / r
      const totalContributed = annualContrib * years + currentBalance
      const growthEarned = futureBalance - totalContributed
      const taxSavedVsTaxable = growthEarned * (taxRate / 100)
      const monthlyTaxFree = futureBalance * 0.04 / 12
      return { futureBalance, totalContributed, growthEarned, taxSavedVsTaxable, monthlyTaxFree }`,
  [
    { label:'Projected Roth IRA Balance', k:'futureBalance', cur:true },
    { label:'Total Contributions', k:'totalContributed', cur:true },
    { label:'Tax-Free Growth', k:'growthEarned', cur:true },
    { label:'Tax Savings vs Taxable Account', k:'taxSavedVsTaxable', cur:true },
    { label:'Est. Monthly Tax-Free Income', k:'monthlyTaxFree', cur:true },
  ],
  [
    { q:'What is a Roth IRA and who is it best for?', a:'A Roth IRA is a retirement account funded with after-tax dollars. Investments grow tax-free and qualified withdrawals in retirement are completely tax-free. It is best for young people in low tax brackets who expect to be in a higher bracket at retirement, and for those who want tax diversification.' },
    { q:'What is the 2026 Roth IRA contribution limit?', a:'The 2026 Roth IRA contribution limit is $7,000 ($8,000 if age 50+). Income limits apply: single filers with MAGI above $150,000 face reduced limits; above $165,000 you cannot contribute directly. High earners can use the backdoor Roth IRA strategy.' },
    { q:'Roth IRA vs Traditional IRA — which is better?', a:'Roth IRA = pay tax now, withdraw tax-free. Traditional IRA = deduct now, pay tax at withdrawal. Roth is better if your tax rate will be higher in retirement. Traditional is better if your tax rate will be lower. Young earners typically benefit more from Roth; high earners near retirement often prefer Traditional.' },
  ],
  [
    { href:'/401k-calculator', icon:'👴', name:'401k Calculator' },
    { href:'/retirement-calculator', icon:'🌅', name:'Retirement Calculator' },
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
  ]
))

// 12. Dividend Calculator
write('dividend-calculator', page(
  'dividend-calculator',
  'Dividend Calculator',
  'Calculate dividend income, yield and the power of dividend reinvestment (DRIP) over time.',
  '💸',
  [
    { s:'shares', label:'Number of Shares', type:'range', min:1, max:10000, step:10, sfx:' shares', def:500 },
    { s:'sharePrice', label:'Share Price', type:'range', min:1, max:5000, step:1, cur:true, def:80 },
    { s:'annualDividend', label:'Annual Dividend Per Share', type:'range', min:0.01, max:50, step:0.01, cur:true, def:3.20 },
    { s:'growthRate', label:'Dividend Growth Rate (annual)', type:'range', min:0, max:20, step:0.5, pct:true, def:5 },
    { s:'years', label:'Investment Horizon', type:'range', min:1, max:40, step:1, sfx:' yrs', def:20 },
  ],
  `      const portfolioValue = shares * sharePrice
      const annualIncome = shares * annualDividend
      const dividendYield = (annualDividend / sharePrice * 100).toFixed(2) + '%'
      const monthlyIncome = annualIncome / 12
      const futureAnnualIncome = annualIncome * Math.pow(1 + growthRate/100, years)
      const totalDividends = annualIncome * (Math.pow(1 + growthRate/100, years) - 1) / (growthRate/100)
      return { annualIncome, monthlyIncome, dividendYield, futureAnnualIncome, totalDividends }`,
  [
    { label:'Annual Dividend Income', k:'annualIncome', cur:true },
    { label:'Monthly Dividend Income', k:'monthlyIncome', cur:true },
    { label:'Dividend Yield', k:'dividendYield', cur:false },
    { label:`Future Annual Income (${'{years}'} yrs)`, k:'futureAnnualIncome', cur:true },
    { label:'Total Dividends Over Period', k:'totalDividends', cur:true },
  ],
  [
    { q:'What is a good dividend yield?', a:'A good dividend yield is typically 2-5%. Yields above 6-7% can signal risk — the stock price may have fallen sharply or the dividend may be unsustainable. Blue-chip dividend stocks (Dividend Aristocrats with 25+ years of increases) typically yield 2-4% with reliable growth.' },
    { q:'What is dividend reinvestment (DRIP)?', a:'DRIP (Dividend Reinvestment Plan) automatically reinvests your dividends to buy more shares instead of paying cash. Over time this creates compounding — more shares generate more dividends which buy even more shares. DRIP can dramatically increase total returns over 20-30 years.' },
    { q:'Are dividends taxed?', a:'Qualified dividends (from US stocks held over 60 days) are taxed at 0%, 15% or 20% depending on your income — much lower than ordinary income tax rates. Ordinary dividends (REITs, some foreign stocks) are taxed as ordinary income. Dividends in Roth IRA or 401k accounts grow tax-free.' },
  ],
  [
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
    { href:'/stock-profit-calculator', icon:'📊', name:'Stock Profit' },
    { href:'/retirement-calculator', icon:'🌅', name:'Retirement' },
  ]
))

// 13. Stock Profit Calculator
write('stock-profit-calculator', page(
  'stock-profit-calculator',
  'Stock Profit Calculator',
  'Calculate profit, loss, ROI and break-even price on any stock trade including fees.',
  '📈',
  [
    { s:'shares', label:'Number of Shares', type:'range', min:1, max:10000, step:1, sfx:' shares', def:100 },
    { s:'buyPrice', label:'Buy Price Per Share', type:'range', min:0.01, max:5000, step:0.5, cur:true, def:50 },
    { s:'sellPrice', label:'Sell Price Per Share', type:'range', min:0.01, max:10000, step:0.5, cur:true, def:75 },
    { s:'tradingFees', label:'Total Trading Fees', type:'range', min:0, max:500, step:5, cur:true, def:10 },
    { s:'taxRate', label:'Capital Gains Tax Rate', type:'range', min:0, max:40, step:1, pct:true, def:15 },
  ],
  `      const invested = shares * buyPrice + tradingFees
      const proceeds = shares * sellPrice - tradingFees
      const grossProfit = proceeds - invested + tradingFees * 2
      const profitBeforeTax = proceeds - invested
      const taxDue = profitBeforeTax > 0 ? profitBeforeTax * (taxRate / 100) : 0
      const netProfit = profitBeforeTax - taxDue
      const roi = (profitBeforeTax / invested * 100).toFixed(2) + '%'
      const breakEven = ((invested + tradingFees) / shares).toFixed(2)
      return { invested, netProfit, roi, taxDue, breakEven }`,
  [
    { label:'Total Amount Invested', k:'invested', cur:true },
    { label:'Net Profit (after tax)', k:'netProfit', cur:true },
    { label:'Return on Investment', k:'roi', cur:false },
    { label:'Tax Due on Gains', k:'taxDue', cur:true },
    { label:'Break-Even Price', k:'breakEven', cur:false },
  ],
  [
    { q:'How is stock profit calculated?', a:'Stock profit = (Sell Price - Buy Price) × Shares - Fees. For example: (75 - 50) × 100 shares - $10 fees = $2,490 gross profit. Subtract capital gains tax for net profit. Use this to evaluate trades and understand true returns.' },
    { q:'What are capital gains tax rates on stocks?', a:'Long-term capital gains (held over 1 year) are taxed at 0%, 15% or 20% based on income. Short-term gains (under 1 year) are taxed as ordinary income (10-37%). For most investors, holding stocks over 1 year significantly reduces the tax burden.' },
    { q:'What is the wash sale rule?', a:'The wash sale rule prevents claiming a tax loss if you buy the same or substantially identical security within 30 days before or after the sale. If triggered, the loss is disallowed and added to the cost basis of the new shares. This only applies to taxable accounts, not Roth IRAs or 401ks.' },
  ],
  [
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
    { href:'/dividend-calculator', icon:'💸', name:'Dividend Calculator' },
    { href:'/roi-calculator', icon:'💎', name:'ROI Calculator' },
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
  ]
))

// 14. Simple Interest Calculator
write('simple-interest-calculator', page(
  'simple-interest-calculator',
  'Simple Interest Calculator',
  'Calculate simple interest, total amount and compare with compound interest quickly.',
  '➕',
  [
    { s:'principal', label:'Principal Amount', type:'range', min:100, max:1000000, step:500, cur:true, def:10000 },
    { s:'rate', label:'Annual Interest Rate', type:'range', min:0.5, max:30, step:0.25, pct:true, def:8 },
    { s:'years', label:'Time Period', type:'range', min:1, max:30, step:1, sfx:' yrs', def:5 },
  ],
  `      const simpleInterest = principal * (rate / 100) * years
      const totalSimple = principal + simpleInterest
      const totalCompound = principal * Math.pow(1 + rate/100, years)
      const compoundInterest = totalCompound - principal
      const difference = compoundInterest - simpleInterest
      return { simpleInterest, totalSimple, compoundInterest: compoundInterest.toFixed(2), difference: difference.toFixed(2) }`,
  [
    { label:'Simple Interest Earned', k:'simpleInterest', cur:true },
    { label:'Total Amount (Simple)', k:'totalSimple', cur:true },
    { label:'Compound Interest (for comparison)', k:'compoundInterest', cur:false },
    { label:'Extra from Compounding', k:'difference', cur:false },
  ],
  [
    { q:'What is the simple interest formula?', a:'Simple Interest = Principal × Rate × Time (in years). For example: $10,000 × 8% × 5 years = $4,000 in interest. Total amount = $14,000. Simple interest is used in short-term loans, car loans and some savings accounts.' },
    { q:'Simple interest vs compound interest — what is the difference?', a:'Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest. $10,000 at 8% for 10 years: simple interest = $8,000 total interest; compound interest = $11,589. The gap grows enormously over time.' },
    { q:'When is simple interest used?', a:'Simple interest is used for most auto loans, some personal loans, US Treasury bills and short-term loans. Mortgages, savings accounts, credit cards and most long-term investments use compound interest. Knowing which applies affects how you calculate true cost or return.' },
  ],
  [
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
    { href:'/savings-calculator', icon:'🏦', name:'Savings Calculator' },
    { href:'/loan-calculator', icon:'💳', name:'Loan Calculator' },
    { href:'/apr-calculator', icon:'📊', name:'APR Calculator' },
  ]
))

// 15. APR Calculator
write('apr-calculator', page(
  'apr-calculator',
  'APR Calculator',
  'Calculate the Annual Percentage Rate (APR) including fees to see the true cost of any loan.',
  '📊',
  [
    { s:'loanAmount', label:'Loan Amount', type:'range', min:1000, max:500000, step:500, cur:true, def:20000 },
    { s:'interestRate', label:'Stated Interest Rate', type:'range', min:0.5, max:30, step:0.25, pct:true, def:7 },
    { s:'termMonths', label:'Loan Term', type:'select', def:60, opts:[{v:12,l:'12 mo'},{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:60,l:'60 mo'},{v:84,l:'84 mo'}] },
    { s:'fees', label:'Loan Fees & Closing Costs', type:'range', min:0, max:10000, step:50, cur:true, def:500 },
  ],
  `      const r = interestRate / 100 / 12
      const n = termMonths
      const payment = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = payment * n
      const totalInterest = totalPaid - loanAmount
      const effectiveLoan = loanAmount - fees
      // approximate APR via Newton's method
      let apr = interestRate / 100
      for (let i = 0; i < 100; i++) {
        const rm = apr / 12
        const pmt = effectiveLoan * (rm * Math.pow(1+rm,n)) / (Math.pow(1+rm,n)-1)
        apr += (payment - pmt) * 0.0001
      }
      return { payment, totalInterest, apr: (apr * 100).toFixed(3) + '%', feesImpact: fees }`,
  [
    { label:'Monthly Payment', k:'payment', cur:true },
    { label:'Total Interest Paid', k:'totalInterest', cur:true },
    { label:'True APR (including fees)', k:'apr', cur:false },
    { label:'Fee Impact on Cost', k:'feesImpact', cur:true },
  ],
  [
    { q:'What is APR and why does it matter?', a:'APR (Annual Percentage Rate) includes both the interest rate and fees expressed as a yearly rate. It shows the true cost of borrowing. A 7% interest rate loan with $1,500 in fees on $20,000 over 5 years has an APR of about 8.6% — significantly higher than the stated rate.' },
    { q:'What is the difference between APR and interest rate?', a:'The interest rate is only the cost of borrowing the money. APR includes the interest rate plus fees, points, mortgage insurance and other charges. By law, lenders must disclose APR. Always compare APR (not just interest rate) when shopping for loans.' },
    { q:'What is a good APR for a loan?', a:'Good APR varies by loan type: mortgage 6-7% (2026), auto loan 5-8%, personal loan 8-14% for excellent credit. Credit cards average 20-25% APR. Any APR below your alternatives is good. For mortgages, a difference of even 0.25% in APR saves thousands over the loan life.' },
  ],
  [
    { href:'/loan-calculator', icon:'💳', name:'Loan Calculator' },
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage Calculator' },
    { href:'/simple-interest-calculator', icon:'➕', name:'Simple Interest' },
    { href:'/personal-loan-calculator', icon:'👤', name:'Personal Loan' },
  ]
))

// 16. Interest Rate Calculator
write('interest-rate-calculator', page(
  'interest-rate-calculator',
  'Interest Rate Calculator',
  'Find the interest rate needed to reach a savings goal or reverse-calculate loan rates.',
  '🔢',
  [
    { s:'presentValue', label:'Starting Amount (PV)', type:'range', min:100, max:500000, step:500, cur:true, def:10000 },
    { s:'futureValue', label:'Target Amount (FV)', type:'range', min:100, max:2000000, step:500, cur:true, def:20000 },
    { s:'years', label:'Time Period', type:'range', min:1, max:40, step:1, sfx:' yrs', def:10 },
    { s:'compoundFreq', label:'Compounding Frequency', type:'select', def:12, opts:[{v:1,l:'Annual'},{v:4,l:'Quarterly'},{v:12,l:'Monthly'},{v:365,l:'Daily'}] },
  ],
  `      if (futureValue <= presentValue) return null
      const rate = compoundFreq * (Math.pow(futureValue / presentValue, 1 / (years * compoundFreq)) - 1)
      const annualRate = rate * compoundFreq
      const simpleRate = (futureValue - presentValue) / presentValue / years * 100
      const doubleTime = 72 / (annualRate * 100)
      return {
        annualRate: (annualRate * 100).toFixed(3) + '%',
        monthlyRate: (rate * 100).toFixed(4) + '%',
        simpleRate: simpleRate.toFixed(2) + '%',
        doubleTime: doubleTime.toFixed(1) + ' years'
      }`,
  [
    { label:'Required Annual Interest Rate', k:'annualRate', cur:false },
    { label:'Monthly Rate', k:'monthlyRate', cur:false },
    { label:'Simple Rate (for comparison)', k:'simpleRate', cur:false },
    { label:'Time to Double (at this rate)', k:'doubleTime', cur:false },
  ],
  [
    { q:'How do I calculate the interest rate needed to reach a goal?', a:'Use the compound interest formula rearranged for rate: r = (FV/PV)^(1/n) - 1, where FV is future value, PV is present value and n is years. For example, to grow $10,000 to $20,000 in 10 years requires a 7.18% annual rate.' },
    { q:'What is the Rule of 72?', a:'The Rule of 72 estimates how long it takes to double money: divide 72 by the annual interest rate. At 6%, money doubles in 12 years. At 8%, in 9 years. At 12%, in 6 years. It also works in reverse: to double money in 8 years, you need a 9% rate.' },
    { q:'What interest rate does the stock market return?', a:'The S&P 500 has historically returned about 10% annually before inflation, or approximately 7% after inflation. However returns vary enormously year to year. Individual stocks, real estate and other assets have different expected return rates and risk levels.' },
  ],
  [
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
    { href:'/savings-calculator', icon:'🏦', name:'Savings Calculator' },
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
    { href:'/simple-interest-calculator', icon:'➕', name:'Simple Interest' },
  ]
))

// 17. Paycheck Calculator
write('paycheck-calculator', page(
  'paycheck-calculator',
  'Paycheck Calculator',
  'Estimate your net take-home pay per paycheck after taxes and deductions.',
  '💵',
  [
    { s:'grossSalary', label:'Annual Gross Salary', type:'range', min:10000, max:500000, step:1000, cur:true, def:65000 },
    { s:'payFrequency', label:'Pay Frequency', type:'select', def:26, opts:[{v:52,l:'Weekly'},{v:26,l:'Bi-Weekly'},{v:24,l:'Semi-Monthly'},{v:12,l:'Monthly'}] },
    { s:'federalRate', label:'Federal Tax Rate', type:'range', min:0, max:37, step:1, pct:true, def:22 },
    { s:'stateRate', label:'State Tax Rate', type:'range', min:0, max:15, step:0.25, pct:true, def:5 },
    { s:'preTaxDeductions', label:'Pre-Tax Deductions (401k, HSA etc.)', type:'range', min:0, max:30000, step:250, cur:true, def:3000 },
  ],
  `      const perPaycheck = grossSalary / payFrequency
      const annualTaxable = grossSalary - preTaxDeductions
      const fica = annualTaxable * 0.0765
      const federal = annualTaxable * (federalRate / 100)
      const state = annualTaxable * (stateRate / 100)
      const totalAnnualTax = fica + federal + state + preTaxDeductions
      const netAnnual = grossSalary - totalAnnualTax
      const netPaycheck = netAnnual / payFrequency
      const effectiveRate = ((totalAnnualTax - preTaxDeductions) / grossSalary * 100).toFixed(1) + '%'
      return { perPaycheck, netPaycheck, netAnnual, effectiveRate }`,
  [
    { label:'Gross Pay Per Paycheck', k:'perPaycheck', cur:true },
    { label:'Net Take-Home Per Paycheck', k:'netPaycheck', cur:true },
    { label:'Annual Net Take-Home', k:'netAnnual', cur:true },
    { label:'Effective Tax Rate', k:'effectiveRate', cur:false },
  ],
  [
    { q:'How is my paycheck calculated?', a:'Your gross paycheck = Annual Salary ÷ Pay Periods. From that, subtract: federal income tax (based on your W-4 and bracket), state income tax, FICA (Social Security 6.2% + Medicare 1.45%), and any pre-tax deductions (401k, health insurance, FSA). What remains is your net take-home pay.' },
    { q:'What is FICA tax on my paycheck?', a:'FICA (Federal Insurance Contributions Act) consists of Social Security tax (6.2% on income up to $168,600 in 2026) and Medicare tax (1.45% on all income, plus 0.9% on income over $200,000). Your employer matches these contributions. Total FICA is 7.65% of your paycheck.' },
    { q:'How do I reduce taxes on my paycheck?', a:'Maximize pre-tax deductions: 401k contributions, HSA contributions ($4,150 single, $8,300 family in 2026), FSA contributions, and health insurance premiums. These reduce your taxable income dollar-for-dollar. Claiming the right allowances on your W-4 also adjusts withholding to avoid over-paying.' },
  ],
  [
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
    { href:'/hourly-to-salary-calculator', icon:'⏰', name:'Hourly to Salary' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/401k-calculator', icon:'👴', name:'401k Calculator' },
  ]
))

// 18. Raise Calculator
write('raise-calculator', page(
  'raise-calculator',
  'Raise Calculator',
  'Calculate the impact of a salary raise on your annual income, monthly pay and take-home.',
  '📈',
  [
    { s:'currentSalary', label:'Current Annual Salary', type:'range', min:10000, max:500000, step:1000, cur:true, def:65000 },
    { s:'raiseType', label:'Raise Type', type:'select', def:'pct', opts:[{v:'pct',l:'% Raise'},{v:'flat',l:'$ Amount'}] },
    { s:'raisePct', label:'Raise Percentage', type:'range', min:0.5, max:50, step:0.5, pct:true, def:10 },
    { s:'raiseFlat', label:'Raise Dollar Amount', type:'range', min:500, max:100000, step:500, cur:true, def:6500 },
    { s:'taxRate', label:'Estimated Tax Rate', type:'range', min:10, max:45, step:1, pct:true, def:28 },
  ],
  `      const raiseAmount = raiseType === 'pct' ? currentSalary * (raisePct / 100) : raiseFlat
      const newSalary = currentSalary + raiseAmount
      const newPct = (raiseAmount / currentSalary * 100).toFixed(2) + '%'
      const monthlyIncrease = raiseAmount / 12
      const takeHomeIncrease = monthlyIncrease * (1 - taxRate / 100)
      const annualTakeHomeGain = takeHomeIncrease * 12
      return { newSalary, raiseAmount, newPct, takeHomeIncrease, annualTakeHomeGain }`,
  [
    { label:'New Annual Salary', k:'newSalary', cur:true },
    { label:'Raise Amount', k:'raiseAmount', cur:true },
    { label:'Raise Percentage', k:'newPct', cur:false },
    { label:'Extra Monthly Take-Home (after tax)', k:'takeHomeIncrease', cur:true },
    { label:'Extra Annual Take-Home', k:'annualTakeHomeGain', cur:true },
  ],
  [
    { q:'What is a good salary raise percentage?', a:'A typical cost-of-living raise is 2-4% annually. A merit raise is usually 4-8%. A promotion raise is typically 10-20%. In a high-inflation environment, raises under 5% may not maintain purchasing power. Negotiating a higher raise at a new job is often more effective than annual increments.' },
    { q:'How do I negotiate a salary raise?', a:'Research market salaries on Glassdoor, LinkedIn Salary, and Levels.fyi. Document your accomplishments with specific metrics ($X revenue generated, Y% cost reduction). Ask for a meeting, present your case and request a specific number. Target 10-20% above your minimum acceptable figure to leave negotiation room.' },
    { q:'When is the best time to ask for a raise?', a:'Ask during annual reviews, after completing a major project, when you have taken on new responsibilities, when you have a competing offer, or when the company is performing well. Avoid asking during budget cuts, layoffs or immediately after a poor performance period.' },
  ],
  [
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
    { href:'/hourly-to-salary-calculator', icon:'⏰', name:'Hourly to Salary' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/paycheck-calculator', icon:'💵', name:'Paycheck Calculator' },
  ]
))

// 19. Tip Calculator
write('tip-calculator', page(
  'tip-calculator',
  'Tip Calculator',
  'Calculate tip amount, total bill and split evenly between any number of people.',
  '🍽️',
  [
    { s:'billAmount', label:'Bill Amount', type:'range', min:1, max:2000, step:1, cur:true, def:85 },
    { s:'tipPct', label:'Tip Percentage', type:'select', def:18, opts:[{v:10,l:'10%'},{v:15,l:'15%'},{v:18,l:'18%'},{v:20,l:'20%'},{v:22,l:'22%'},{v:25,l:'25%'}] },
    { s:'people', label:'Split Between', type:'range', min:1, max:20, step:1, sfx:' people', def:2 },
  ],
  `      const tipAmount = billAmount * (tipPct / 100)
      const totalBill = billAmount + tipAmount
      const perPerson = totalBill / people
      const tipPerPerson = tipAmount / people
      return { tipAmount, totalBill, perPerson, tipPerPerson }`,
  [
    { label:'Tip Amount', k:'tipAmount', cur:true },
    { label:'Total Bill', k:'totalBill', cur:true },
    { label:'Per Person Total', k:'perPerson', cur:true },
    { label:'Tip Per Person', k:'tipPerPerson', cur:true },
  ],
  [
    { q:'How much should I tip at a restaurant?', a:'Standard US tipping etiquette: restaurant server 15-20%, bar 15-20%, food delivery 15-20%, coffee barista 10-15%, rideshare 10-15%, hotel housekeeping $2-5/night. Fine dining typically warrants 20%+. Tip is always based on the pre-tax amount technically, though most people tip on the total.' },
    { q:'How do I split a bill with different items?', a:'For exact splitting: each person pays for their items plus their share of tax and tip. For equal splitting: divide the total bill (including tax and tip) by number of diners. Apps like Splitwise, Venmo and Tab make exact splitting easy. For simplicity many groups just split equally.' },
    { q:'Is it rude not to tip?', a:'In the US, tipping is culturally expected and servers often earn below minimum wage relying on tips to reach a living wage. In many other countries (Japan, Australia, much of Europe) tipping is not expected or even considered rude. When travelling, research local customs.' },
  ],
  [
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/sales-tax-calculator', icon:'🧾', name:'Sales Tax Calculator' },
    { href:'/cost-of-living-calculator', icon:'🌆', name:'Cost of Living' },
    { href:'/currency-converter', icon:'💱', name:'Currency Converter' },
  ]
))

// 20. Sales Tax Calculator
write('sales-tax-calculator', page(
  'sales-tax-calculator',
  'Sales Tax Calculator',
  'Calculate sales tax amount, total price and reverse-calculate pre-tax price instantly.',
  '🧾',
  [
    { s:'price', label:'Price / Amount', type:'range', min:0.01, max:100000, step:1, cur:true, def:100 },
    { s:'taxRate', label:'Sales Tax Rate', type:'range', min:0, max:15, step:0.25, pct:true, def:8.5 },
    { s:'calcType', label:'Calculate', type:'select', def:'add', opts:[{v:'add',l:'Add tax to price'},{v:'remove',l:'Remove tax from total'}] },
  ],
  `      let preTax, taxAmount, total
      if (calcType === 'add') {
        preTax = price
        taxAmount = price * (taxRate / 100)
        total = price + taxAmount
      } else {
        total = price
        preTax = price / (1 + taxRate / 100)
        taxAmount = total - preTax
      }
      const effectiveRate = (taxAmount / preTax * 100).toFixed(3) + '%'
      return { preTax, taxAmount, total, effectiveRate }`,
  [
    { label:'Pre-Tax Price', k:'preTax', cur:true },
    { label:'Tax Amount', k:'taxAmount', cur:true },
    { label:'Total Price', k:'total', cur:true },
    { label:'Effective Tax Rate', k:'effectiveRate', cur:false },
  ],
  [
    { q:'What is the average sales tax rate in the US?', a:'The US has no federal sales tax. Combined state and local sales tax averages about 7.12% nationwide. States range from 0% (Oregon, Montana, New Hampshire, Delaware, Alaska) to 9.5%+ (Louisiana, Tennessee). Some cities add additional local taxes on top of the state rate.' },
    { q:'How do I calculate sales tax?', a:'Sales tax = Price × Tax Rate. Total = Price + (Price × Tax Rate) = Price × (1 + Tax Rate). To find pre-tax price from a total: Pre-Tax = Total ÷ (1 + Tax Rate). For example, $108.50 total at 8.5% tax: pre-tax = $108.50 ÷ 1.085 = $100.' },
    { q:'Are all purchases subject to sales tax?', a:'No. Most states exempt groceries, prescription medications and medical devices. Some states also exempt clothing below a certain price. Online purchases are now subject to sales tax in most states following the 2018 South Dakota v. Wayfair Supreme Court ruling.' },
  ],
  [
    { href:'/vat-calculator', icon:'🌍', name:'VAT Calculator' },
    { href:'/tip-calculator', icon:'🍽️', name:'Tip Calculator' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/profit-margin-calculator', icon:'📈', name:'Profit Margin' },
  ]
))

// 21. VAT Calculator
write('vat-calculator', page(
  'vat-calculator',
  'VAT Calculator',
  'Add or remove VAT from any price. Works for UK, EU, UAE, India (GST) and all VAT rates.',
  '🌍',
  [
    { s:'amount', label:'Amount', type:'range', min:0.01, max:100000, step:1, cur:true, def:100 },
    { s:'vatRate', label:'VAT / GST Rate', type:'select', def:20, opts:[{v:5,l:'5%'},{v:7.5,l:'7.5%'},{v:10,l:'10%'},{v:12,l:'12%'},{v:15,l:'15%'},{v:18,l:'18% (India GST)'},{v:20,l:'20% (UK)'},{v:21,l:'21%'},{v:23,l:'23%'},{v:25,l:'25%'}] },
    { s:'calcType', label:'Calculate', type:'select', def:'add', opts:[{v:'add',l:'Add VAT to price'},{v:'remove',l:'Remove VAT from total'}] },
  ],
  `      let exVat, vatAmount, incVat
      if (calcType === 'add') {
        exVat = amount
        vatAmount = amount * (vatRate / 100)
        incVat = amount + vatAmount
      } else {
        incVat = amount
        exVat = amount / (1 + vatRate / 100)
        vatAmount = incVat - exVat
      }
      return { exVat, vatAmount, incVat }`,
  [
    { label:'Price Excluding VAT', k:'exVat', cur:true },
    { label:'VAT Amount', k:'vatAmount', cur:true },
    { label:'Price Including VAT', k:'incVat', cur:true },
  ],
  [
    { q:'What is VAT and who pays it?', a:'VAT (Value Added Tax) is a consumption tax applied at each stage of production. Businesses collect VAT on sales and reclaim VAT on purchases. Consumers ultimately pay VAT as it is included in the final price. Most countries use VAT or a similar goods and services tax (GST).' },
    { q:'What are common VAT rates in Europe?', a:'Standard EU VAT rates: UK 20%, Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%, Ireland 23%, Sweden 25%. Reduced rates apply to food, books and children\'s items. Zero rates apply to exports. The EU requires a minimum standard VAT rate of 15%.' },
    { q:'Can I reclaim VAT as a business?', a:'VAT-registered businesses can reclaim VAT paid on business purchases (input tax) against VAT collected on sales (output tax). If input tax exceeds output tax, HMRC/tax authority refunds the difference. Small businesses below the registration threshold (£90,000 in UK) may not need to register.' },
  ],
  [
    { href:'/sales-tax-calculator', icon:'🧾', name:'Sales Tax Calculator' },
    { href:'/profit-margin-calculator', icon:'📈', name:'Profit Margin' },
    { href:'/currency-converter', icon:'💱', name:'Currency Converter' },
    { href:'/invoice-calculator', icon:'📄', name:'Invoice Calculator' },
  ]
))

// 22. Currency Converter
write('currency-converter', page(
  'currency-converter',
  'Currency Converter',
  'Convert between 20+ major currencies with indicative exchange rates instantly.',
  '💱',
  [
    { s:'amount', label:'Amount to Convert', type:'range', min:1, max:100000, step:10, cur:false, def:1000 },
    { s:'fromCurrency', label:'From Currency', type:'select', def:'USD', opts:[{v:'USD',l:'USD – US Dollar'},{v:'EUR',l:'EUR – Euro'},{v:'GBP',l:'GBP – British Pound'},{v:'CAD',l:'CAD – Canadian Dollar'},{v:'AUD',l:'AUD – Australian Dollar'},{v:'INR',l:'INR – Indian Rupee'},{v:'AED',l:'AED – UAE Dirham'},{v:'SGD',l:'SGD – Singapore Dollar'},{v:'JPY',l:'JPY – Japanese Yen'},{v:'CNY',l:'CNY – Chinese Yuan'},{v:'CHF',l:'CHF – Swiss Franc'},{v:'MXN',l:'MXN – Mexican Peso'},{v:'BRL',l:'BRL – Brazilian Real'},{v:'ZAR',l:'ZAR – South African Rand'}] },
    { s:'toCurrency', label:'To Currency', type:'select', def:'EUR', opts:[{v:'USD',l:'USD – US Dollar'},{v:'EUR',l:'EUR – Euro'},{v:'GBP',l:'GBP – British Pound'},{v:'CAD',l:'CAD – Canadian Dollar'},{v:'AUD',l:'AUD – Australian Dollar'},{v:'INR',l:'INR – Indian Rupee'},{v:'AED',l:'AED – UAE Dirham'},{v:'SGD',l:'SGD – Singapore Dollar'},{v:'JPY',l:'JPY – Japanese Yen'},{v:'CNY',l:'CNY – Chinese Yuan'},{v:'CHF',l:'CHF – Swiss Franc'},{v:'MXN',l:'MXN – Mexican Peso'},{v:'BRL',l:'BRL – Brazilian Real'},{v:'ZAR',l:'ZAR – South African Rand'}] },
  ],
  `      const RATES = {USD:1,EUR:0.92,GBP:0.79,CAD:1.36,AUD:1.53,INR:83.1,AED:3.67,SGD:1.34,JPY:149.5,CNY:7.24,CHF:0.89,MXN:17.1,BRL:4.97,ZAR:18.6}
      const rateFrom = RATES[fromCurrency] || 1
      const rateTo = RATES[toCurrency] || 1
      const converted = (amount / rateFrom) * rateTo
      const rate1 = rateTo / rateFrom
      const rateInverse = rateFrom / rateTo
      const SYMBOLS = {USD:'$',EUR:'€',GBP:'£',CAD:'CA$',AUD:'A$',INR:'₹',AED:'AED ',SGD:'S$',JPY:'¥',CNY:'¥',CHF:'CHF ',MXN:'MX$',BRL:'R$',ZAR:'R'}
      const sym = SYMBOLS[toCurrency] || ''
      return {
        converted: sym + converted.toFixed(2),
        rate1: '1 ' + fromCurrency + ' = ' + rate1.toFixed(4) + ' ' + toCurrency,
        rateInverse: '1 ' + toCurrency + ' = ' + rateInverse.toFixed(4) + ' ' + fromCurrency,
        amount100: sym + (100 / rateFrom * rateTo).toFixed(2)
      }`,
  [
    { label:'Converted Amount', k:'converted', cur:false },
    { label:'Exchange Rate', k:'rate1', cur:false },
    { label:'Inverse Rate', k:'rateInverse', cur:false },
    { label:'100 unit equivalent', k:'amount100', cur:false },
  ],
  [
    { q:'How are exchange rates determined?', a:'Exchange rates are determined by supply and demand in the foreign exchange (forex) market — the largest financial market in the world with $7.5 trillion/day in volume. Rates are influenced by interest rate differentials, inflation, economic performance, trade balances and market sentiment.' },
    { q:'What is the difference between mid-market and retail exchange rates?', a:'The mid-market rate (interbank rate) is the midpoint between buy and sell prices used for large bank-to-bank transactions. Retail rates (what you get at a bank, exchange bureau or PayPal) include a markup of 1-5%. For best rates use services like Wise, Revolut or your bank\'s international transfer service.' },
    { q:'When is the best time to exchange currency?', a:'Exchange rates fluctuate constantly. Avoid airports and hotel exchange desks (worst rates). Use ATMs in the local currency for better rates. For large amounts, watch rates over 2-4 weeks and exchange when the rate is favorable. Forward contracts let businesses lock in rates for future transactions.' },
  ],
  [
    { href:'/sales-tax-calculator', icon:'🧾', name:'Sales Tax Calculator' },
    { href:'/vat-calculator', icon:'🌍', name:'VAT Calculator' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/cost-of-living-calculator', icon:'🌆', name:'Cost of Living' },
  ]
))

// 23. Payoff vs Invest Calculator
write('payoff-vs-invest-calculator', page(
  'payoff-vs-invest-calculator',
  'Pay Off Debt vs Invest Calculator',
  'Decide whether to pay off debt early or invest the extra money based on rates and returns.',
  '⚡',
  [
    { s:'debtBalance', label:'Debt Balance', type:'range', min:1000, max:500000, step:500, cur:true, def:25000 },
    { s:'debtRate', label:'Debt Interest Rate', type:'range', min:1, max:30, step:0.25, pct:true, def:8 },
    { s:'investReturn', label:'Expected Investment Return', type:'range', min:1, max:20, step:0.25, pct:true, def:9 },
    { s:'extraMonthly', label:'Extra Money Available / Month', type:'range', min:50, max:5000, step:50, cur:true, def:500 },
    { s:'years', label:'Time Horizon', type:'range', min:1, max:30, step:1, sfx:' yrs', def:10 },
  ],
  `      const n = years * 12
      // Payoff path: save debt interest, then invest freed-up money
      const monthsToPayoff = Math.min(n, Math.ceil(Math.log(1 + debtBalance * (debtRate/100/12) / extraMonthly) / Math.log(1 + debtRate/100/12)))
      const remainingMonths = n - monthsToPayoff
      const interestSaved = debtBalance * (debtRate / 100) * (monthsToPayoff / 12)
      const investAfterPayoff = extraMonthly * (Math.pow(1 + investReturn/100/12, remainingMonths) - 1) / (investReturn/100/12)
      const payoffNetBenefit = interestSaved + investAfterPayoff
      // Invest path: invest all extra money, debt stays
      const investValue = extraMonthly * (Math.pow(1 + investReturn/100/12, n) - 1) / (investReturn/100/12)
      const debtGrown = debtBalance * Math.pow(1 + debtRate/100/12, n)
      const investNetBenefit = investValue - (debtGrown - debtBalance)
      const recommendation = payoffNetBenefit >= investNetBenefit ? 'Pay off debt first' : 'Invest first'
      const difference = Math.abs(payoffNetBenefit - investNetBenefit)
      return { payoffNetBenefit, investNetBenefit, recommendation, difference }`,
  [
    { label:'Net Benefit: Pay Off Debt', k:'payoffNetBenefit', cur:true },
    { label:'Net Benefit: Invest Instead', k:'investNetBenefit', cur:true },
    { label:'Recommendation', k:'recommendation', cur:false },
    { label:'Difference', k:'difference', cur:true },
  ],
  [
    { q:'Should I pay off debt or invest?', a:'The mathematical answer: if your debt rate exceeds expected investment returns, pay off debt. If investment returns exceed debt rate, invest. In practice, the break-even is around 6-7%. Credit card debt at 20%? Pay it off. Mortgage at 6.5% and stock market returning 9%? The math slightly favors investing, but emotional factors matter too.' },
    { q:'Does paying off debt count as an investment?', a:'Paying off a 10% interest rate loan is equivalent to a guaranteed 10% return — better than most investments after tax and risk adjustment. High-interest debt payoff is often the highest "return on investment" available, especially when accounting for the guaranteed, risk-free nature of the return.' },
    { q:'What debts should I always pay off before investing?', a:'Always pay off: credit cards (15-25% APR), payday loans (300%+ APR), personal loans above 8-10%, and private student loans above 7%. The minimum threshold varies: some say pay all debt over 5-6% before investing; others say capture employer 401k match first (it\'s a 50-100% instant return) regardless.' },
  ],
  [
    { href:'/debt-payoff-calculator', icon:'🎯', name:'Debt Payoff' },
    { href:'/compound-interest', icon:'📈', name:'Compound Interest' },
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
    { href:'/credit-card-payoff-calculator', icon:'💳', name:'Credit Card Payoff' },
  ]
))

// 24. Net Worth Calculator
write('net-worth-calculator', page(
  'net-worth-calculator',
  'Net Worth Calculator',
  'Calculate your total net worth by adding assets and subtracting all liabilities.',
  '💰',
  [
    { s:'cash', label:'Cash & Savings', type:'range', min:0, max:500000, step:500, cur:true, def:15000 },
    { s:'investments', label:'Investments (stocks, ETFs, crypto)', type:'range', min:0, max:1000000, step:1000, cur:true, def:45000 },
    { s:'retirement', label:'Retirement Accounts (401k, IRA)', type:'range', min:0, max:2000000, step:1000, cur:true, def:80000 },
    { s:'homeValue', label:'Home / Real Estate Value', type:'range', min:0, max:2000000, step:5000, cur:true, def:350000 },
    { s:'otherAssets', label:'Other Assets (car, business, etc.)', type:'range', min:0, max:500000, step:1000, cur:true, def:20000 },
    { s:'mortgageDebt', label:'Mortgage Balance', type:'range', min:0, max:1500000, step:5000, cur:true, def:280000 },
    { s:'carDebt', label:'Car Loans', type:'range', min:0, max:100000, step:500, cur:true, def:12000 },
    { s:'creditCardDebt', label:'Credit Card Debt', type:'range', min:0, max:100000, step:250, cur:true, def:3000 },
    { s:'otherDebt', label:'Student Loans & Other Debt', type:'range', min:0, max:300000, step:1000, cur:true, def:25000 },
  ],
  `      const totalAssets = cash + investments + retirement + homeValue + otherAssets
      const totalLiabilities = mortgageDebt + carDebt + creditCardDebt + otherDebt
      const netWorth = totalAssets - totalLiabilities
      const debtToAsset = ((totalLiabilities / totalAssets) * 100).toFixed(1) + '%'
      return { netWorth, totalAssets, totalLiabilities, debtToAsset }`,
  [
    { label:'Net Worth', k:'netWorth', cur:true },
    { label:'Total Assets', k:'totalAssets', cur:true },
    { label:'Total Liabilities', k:'totalLiabilities', cur:true },
    { label:'Debt-to-Asset Ratio', k:'debtToAsset', cur:false },
  ],
  [
    { q:'What is the average net worth by age?', a:'Median US net worth by age (2024 Fed data): Under 35: $39,000. 35-44: $135,000. 45-54: $247,000. 55-64: $365,000. 65-74: $410,000. 75+: $335,000. The mean (average) is much higher due to wealthy outliers. Focus on improving your own trajectory rather than comparing to averages.' },
    { q:'How do I build net worth quickly?', a:'The fastest net worth builders: (1) increase income aggressively — raises, promotion, side income, (2) keep fixed expenses low — housing and car are the biggest levers, (3) invest early and consistently — compound growth takes time, (4) eliminate high-interest debt — it is anti-wealth, (5) avoid lifestyle inflation as income rises.' },
    { q:'Should I include home equity in net worth?', a:'Yes, home equity (home value minus mortgage) is a legitimate asset that counts toward net worth. However, since you cannot easily spend home equity without selling or borrowing against it, many financial planners track both total net worth and "liquid net worth" (excluding home equity and retirement accounts with penalties).' },
  ],
  [
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
    { href:'/debt-payoff-calculator', icon:'🎯', name:'Debt Payoff' },
    { href:'/retirement-calculator', icon:'🌅', name:'Retirement Calculator' },
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
  ]
))

// 25. Debt Payoff Calculator
write('debt-payoff-calculator', page(
  'debt-payoff-calculator',
  'Debt Payoff Calculator',
  'Find the fastest path to becoming debt-free with avalanche or snowball method.',
  '🎯',
  [
    { s:'debtBalance', label:'Total Debt Balance', type:'range', min:500, max:500000, step:500, cur:true, def:30000 },
    { s:'avgInterestRate', label:'Average Interest Rate', type:'range', min:1, max:36, step:0.25, pct:true, def:18 },
    { s:'minimumPayment', label:'Minimum Monthly Payment', type:'range', min:50, max:5000, step:25, cur:true, def:600 },
    { s:'extraPayment', label:'Extra Monthly Payment', type:'range', min:0, max:5000, step:25, cur:true, def:300 },
    { s:'method', label:'Payoff Strategy', type:'select', def:'avalanche', opts:[{v:'avalanche',l:'Avalanche (high rate first)'},{v:'snowball',l:'Snowball (low balance first)'}] },
  ],
  `      const totalPayment = minimumPayment + extraPayment
      const r = avgInterestRate / 100 / 12
      let bal = debtBalance
      let months = 0
      let totalInterest = 0
      while (bal > 0 && months < 600) {
        const interest = bal * r
        totalInterest += interest
        bal = bal + interest - totalPayment
        if (bal < 0) bal = 0
        months++
      }
      const minMonths = Math.ceil(-Math.log(1 - (debtBalance * r) / minimumPayment) / Math.log(1 + r))
      const interestSaved = (minimumPayment * minMonths - debtBalance) - totalInterest
      return {
        months: months + ' months',
        totalInterest,
        interestSaved: Math.max(0, interestSaved),
        totalPaid: debtBalance + totalInterest
      }`,
  [
    { label:'Months to Debt Freedom', k:'months', cur:false },
    { label:'Total Interest Paid', k:'totalInterest', cur:true },
    { label:'Interest Saved vs Minimum', k:'interestSaved', cur:true },
    { label:'Total Amount Paid', k:'totalPaid', cur:true },
  ],
  [
    { q:'What is the debt avalanche method?', a:'The debt avalanche method pays minimum payments on all debts, then puts all extra money toward the highest interest rate debt first. Once that is paid off, attack the next highest rate. This is mathematically optimal — you pay the least total interest. It is best for disciplined people who can stay motivated without quick wins.' },
    { q:'What is the debt snowball method?', a:'The debt snowball method (popularized by Dave Ramsey) pays minimum payments on all debts, then targets the smallest balance first regardless of interest rate. As each debt is eliminated, the payment rolls to the next. Psychologically powerful — quick wins maintain momentum. Costs slightly more in interest than avalanche.' },
    { q:'How much extra should I pay on debt?', a:'Every extra dollar beyond the minimum payment saves significant interest and reduces payoff time. On a $30,000 debt at 18% APR: minimum payments ($600/month) take 7+ years and cost $20,000+ in interest. Adding just $200/month cuts payoff to 4 years and saves $8,000. The extra payment ROI is enormous.' },
  ],
  [
    { href:'/credit-card-payoff-calculator', icon:'💳', name:'Credit Card Payoff' },
    { href:'/personal-loan-calculator', icon:'👤', name:'Personal Loan' },
    { href:'/payoff-vs-invest-calculator', icon:'⚡', name:'Payoff vs Invest' },
    { href:'/budget-calculator', icon:'📋', name:'Budget Calculator' },
  ]
))

// ══════════════════════════════════════════════════════════════════════
// UPDATE HOMEPAGE to include Stage 2 tools in the grid
// ══════════════════════════════════════════════════════════════════════
console.log('\n✅ All 25 Stage 2 calculator pages created!')
console.log('═══════════════════════════════════════════════')
console.log('  1.  /amortization-calculator')
console.log('  2.  /student-loan-calculator')
console.log('  3.  /refinance-calculator')
console.log('  4.  /debt-to-income-calculator')
console.log('  5.  /home-affordability-calculator')
console.log('  6.  /heloc-calculator')
console.log('  7.  /property-tax-calculator')
console.log('  8.  /rent-vs-buy-calculator')
console.log('  9.  /emergency-fund-calculator')
console.log(' 10.  /401k-calculator')
console.log(' 11.  /roth-ira-calculator')
console.log(' 12.  /dividend-calculator')
console.log(' 13.  /stock-profit-calculator')
console.log(' 14.  /simple-interest-calculator')
console.log(' 15.  /apr-calculator')
console.log(' 16.  /interest-rate-calculator')
console.log(' 17.  /paycheck-calculator')
console.log(' 18.  /raise-calculator')
console.log(' 19.  /tip-calculator')
console.log(' 20.  /sales-tax-calculator')
console.log(' 21.  /vat-calculator')
console.log(' 22.  /currency-converter')
console.log(' 23.  /payoff-vs-invest-calculator')
console.log(' 24.  /net-worth-calculator')
console.log(' 25.  /debt-payoff-calculator')
console.log('═══════════════════════════════════════════════')
console.log('\nDeploy:')
console.log('  git add .')
console.log('  git commit -m "Stage 2: 25 new calculator pages"')
console.log('  git push origin master:main')
console.log('═══════════════════════════════════════════════')
