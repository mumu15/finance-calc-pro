/**
 * FreeFinCalc.net — STAGE 3: 10 Calculator Pages
 * Taxes + Business Basics
 * Run from project root: node stage3_calculators.js
 *
 *  1. payroll-tax-calculator
 *  2. bond-yield-calculator
 *  3. car-depreciation-calculator
 *  4. home-equity-calculator
 *  5. inflation-impact-calculator
 *  6. profit-margin-calculator
 *  7. break-even-calculator
 *  8. roi-calculator
 *  9. freelance-rate-calculator
 * 10. business-valuation-calculator
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
      const display = f.cur
        ? `fmt(${f.s})`
        : f.pct
        ? `\`\${${f.s}}%\``
        : f.sfx
        ? `\`\${${f.s}}${f.sfx}\``
        : `${f.s}`
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
    `    { label: '${r.label}', value: result.${r.k} !== undefined ? String(${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}) : '' },`
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
// 1. Payroll Tax Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('payroll-tax-calculator', page(
  'Payroll Tax Calculator',
  'Calculate employer and employee payroll taxes — FICA, FUTA and state unemployment — per paycheck.',
  '👥',
  [
    { s:'grossWages', label:'Annual Gross Wages', type:'range', min:10000, max:300000, step:1000, cur:true, def:65000 },
    { s:'payFreq', label:'Pay Frequency', type:'select', def:26, opts:[{v:52,l:'Weekly'},{v:26,l:'Bi-Weekly'},{v:24,l:'Semi-Monthly'},{v:12,l:'Monthly'}] },
    { s:'sutaRate', label:'State Unemployment Rate (SUTA)', type:'range', min:0, max:10, step:0.1, pct:true, def:2.7 },
    { s:'sutaWageBase', label:'State Unemployment Wage Base', type:'range', min:7000, max:60000, step:1000, cur:true, def:7000 },
  ],
  `      const perPaycheck = grossWages / payFreq
      const employeeSS   = Math.min(grossWages, 168600) * 0.062
      const employeeMed  = grossWages * 0.0145
      const addlMed      = grossWages > 200000 ? (grossWages - 200000) * 0.009 : 0
      const employeeFICA = employeeSS + employeeMed + addlMed
      const employerSS   = Math.min(grossWages, 168600) * 0.062
      const employerMed  = grossWages * 0.0145
      const futa         = Math.min(grossWages, 7000) * 0.006
      const suta         = Math.min(grossWages, sutaWageBase) * (sutaRate / 100)
      const employerTotal = employerSS + employerMed + futa + suta
      const totalCost    = grossWages + employerTotal
      return { perPaycheck, employeeFICA, employerTotal, futa, suta, totalCost }`,
  [
    { label:'Gross Pay Per Paycheck', k:'perPaycheck', cur:true },
    { label:'Employee FICA (annual)', k:'employeeFICA', cur:true },
    { label:'Employer Payroll Tax (annual)', k:'employerTotal', cur:true },
    { label:'FUTA — Federal Unemployment', k:'futa', cur:true },
    { label:'SUTA — State Unemployment', k:'suta', cur:true },
    { label:'Total Employer Cost of Employee', k:'totalCost', cur:true },
  ],
  [
    { q:'What payroll taxes does an employer pay?', a:'Employers pay the employer share of FICA (6.2% Social Security + 1.45% Medicare = 7.65%), FUTA (0.6% on first $7,000 after state credit), and SUTA (varies by state, typically 1-5% on the first $7,000-$50,000 of wages). The true cost of an employee is about 7-10% above their gross wages.' },
    { q:'What is the difference between FICA and income tax withholding?', a:'FICA (Social Security + Medicare) is split equally between employer and employee — each pays 7.65%. Income tax withholding is the employee\'s estimated federal and state income tax held by the employer and remitted to the IRS. Employers do not pay income tax on behalf of employees — they only withhold and forward it.' },
    { q:'When must payroll taxes be deposited?', a:'Deposit schedule depends on your lookback period tax liability. Monthly depositors must deposit by the 15th of the following month. Semi-weekly depositors deposit within 2-3 business days after payday. Very small employers (under $2,500/quarter) can pay with their quarterly Form 941. Penalties for late deposits are 2-15%.' },
  ],
  [
    { href:'/tax-calculator', icon:'🧮', name:'Tax Calculator' },
    { href:'/self-employment-tax-calculator', icon:'🧾', name:'Self-Employment Tax' },
    { href:'/paycheck-calculator', icon:'💵', name:'Paycheck Calculator' },
    { href:'/employee-cost-calculator', icon:'👔', name:'Employee Cost' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 2. Bond Yield Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('bond-yield-calculator', page(
  'Bond Yield Calculator',
  'Calculate bond current yield, yield to maturity (YTM) and total return for any bond.',
  '📉',
  [
    { s:'faceValue',    label:'Face Value (Par Value)',  type:'range', min:100,   max:1000000, step:100,  cur:true, def:1000  },
    { s:'couponRate',   label:'Coupon Rate',              type:'range', min:0,     max:20,      step:0.25, pct:true, def:5     },
    { s:'marketPrice',  label:'Current Market Price',     type:'range', min:50,    max:200000,  step:10,   cur:true, def:950   },
    { s:'yearsToMaturity', label:'Years to Maturity',     type:'range', min:1,     max:30,      step:1,    sfx:' yrs', def:10  },
    { s:'payFreq',      label:'Coupon Payment Frequency', type:'select', def:2, opts:[{v:1,l:'Annual'},{v:2,l:'Semi-Annual'},{v:4,l:'Quarterly'}] },
  ],
  `      const annualCoupon  = faceValue * (couponRate / 100)
      const couponPayment = annualCoupon / payFreq
      const currentYield  = (annualCoupon / marketPrice * 100).toFixed(3) + '%'
      const n = yearsToMaturity * payFreq
      // YTM via Newton approximation
      let ytm = couponRate / 100 / payFreq
      for (let i = 0; i < 200; i++) {
        const pv = couponPayment * (1 - Math.pow(1+ytm,-n)) / ytm + faceValue * Math.pow(1+ytm,-n)
        const dPv = -couponPayment * n * Math.pow(1+ytm,-n-1) / ytm
                  + couponPayment * (1 - Math.pow(1+ytm,-n)) / (ytm*ytm)
                  - faceValue * n * Math.pow(1+ytm,-n-1)
        const delta = (pv - marketPrice) / dPv
        ytm -= delta
        if (Math.abs(delta) < 1e-10) break
      }
      const ytmAnnual = (ytm * payFreq * 100).toFixed(3) + '%'
      const premDisc  = marketPrice < faceValue ? 'Discount' : marketPrice > faceValue ? 'Premium' : 'Par'
      const totalReturn = (annualCoupon * yearsToMaturity + (faceValue - marketPrice))
      return { annualCoupon, currentYield, ytmAnnual, premDisc, totalReturn }`,
  [
    { label:'Annual Coupon Payment', k:'annualCoupon', cur:true },
    { label:'Current Yield',         k:'currentYield', cur:false },
    { label:'Yield to Maturity (YTM)', k:'ytmAnnual',  cur:false },
    { label:'Bond Trading At',        k:'premDisc',    cur:false },
    { label:'Total Return to Maturity', k:'totalReturn', cur:true },
  ],
  [
    { q:'What is yield to maturity (YTM)?', a:'YTM is the total annualised return you earn if you buy a bond at its current price and hold it until maturity, assuming all coupon payments are reinvested at the same rate. It is the most comprehensive measure of a bond\'s return and accounts for both the coupon income and any capital gain or loss.' },
    { q:'Why do bond prices fall when interest rates rise?', a:'Bond prices and interest rates move inversely. When new bonds offer higher coupons, existing lower-coupon bonds become less attractive and must fall in price until their yield matches the market. A 1% rise in rates causes a roughly 1% drop per year of duration — a 10-year bond falls about 8-10%.' },
    { q:'What is the difference between current yield and YTM?', a:'Current yield = annual coupon ÷ market price. It ignores the capital gain or loss at maturity. YTM includes that gain/loss spread over the remaining years. If you buy a $1,000 par bond for $950 with a 5% coupon, current yield is 5.26% but YTM is higher because you also gain $50 at maturity.' },
  ],
  [
    { href:'/investment-return-calculator', icon:'📈', name:'Investment Return' },
    { href:'/compound-interest', icon:'💹', name:'Compound Interest' },
    { href:'/dividend-calculator', icon:'💸', name:'Dividend Calculator' },
    { href:'/roi-calculator', icon:'💎', name:'ROI Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 3. Car Depreciation Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('car-depreciation-calculator', page(
  'Car Depreciation Calculator',
  'Calculate how much your car loses in value each year and its resale value over time.',
  '🚗',
  [
    { s:'purchasePrice', label:'Purchase Price',        type:'range', min:1000,  max:200000, step:500,  cur:true, def:35000 },
    { s:'year1Rate',     label:'Year 1 Depreciation',  type:'range', min:5,     max:35,     step:1,    pct:true, def:20    },
    { s:'annualRate',    label:'Annual Rate (Year 2+)', type:'range', min:5,     max:25,     step:1,    pct:true, def:15    },
    { s:'years',         label:'Years to Calculate',    type:'range', min:1,     max:15,     step:1,    sfx:' yrs', def:5  },
    { s:'mileageYr',     label:'Miles Driven Per Year', type:'range', min:5000,  max:50000,  step:1000, sfx:' mi', def:12000 },
  ],
  `      const y1Loss  = purchasePrice * (year1Rate / 100)
      const afterY1 = purchasePrice - y1Loss
      let value = afterY1
      let totalDepreciation = y1Loss
      for (let i = 2; i <= years; i++) {
        const loss = value * (annualRate / 100)
        value -= loss
        totalDepreciation += loss
      }
      const finalValue      = years === 1 ? afterY1 : value
      const retainedPct     = (finalValue / purchasePrice * 100).toFixed(1) + '%'
      const costPerMile     = (totalDepreciation / (mileageYr * years)).toFixed(3)
      const annualAvgLoss   = totalDepreciation / years
      return { finalValue, totalDepreciation, retainedPct, costPerMile, annualAvgLoss }`,
  [
    { label:'Estimated Value After ' + '{years}' + ' Years', k:'finalValue',       cur:true  },
    { label:'Total Depreciation Loss',                        k:'totalDepreciation', cur:true  },
    { label:'Value Retained',                                  k:'retainedPct',      cur:false },
    { label:'Depreciation Cost Per Mile',                      k:'costPerMile',      cur:false },
    { label:'Average Annual Value Lost',                       k:'annualAvgLoss',    cur:true  },
  ],
  [
    { q:'How fast do cars depreciate?', a:'New cars lose 15-25% in the first year and roughly 10-15% per year after. After 5 years the typical car retains about 40% of its original value. Luxury cars, sports cars and some EVs depreciate faster. Trucks and SUVs from Toyota and Honda tend to hold value best.' },
    { q:'Which cars depreciate the least?', a:'Lowest depreciation (best resale value): Toyota Tacoma, Honda Civic/Accord, Toyota 4Runner, Subaru Outback, and Jeep Wrangler. Highest depreciation: Maserati, Jaguar, Lincoln, Cadillac, and most luxury sedans. Fuel efficiency, reliability reputation and brand desirability drive resale value.' },
    { q:'How does depreciation affect car buying decisions?', a:'Depreciation is often the biggest cost of car ownership — far exceeding fuel and insurance on newer vehicles. Buying a 2-3 year old used car lets someone else absorb the steep first-year drop. CPO (certified pre-owned) vehicles offer warranty protection alongside reduced depreciation cost.' },
  ],
  [
    { href:'/car-affordability-calculator', icon:'🚘', name:'Car Affordability' },
    { href:'/car-loan-calculator', icon:'💳', name:'Car Loan' },
    { href:'/lease-vs-buy-calculator', icon:'🔄', name:'Lease vs Buy' },
    { href:'/fuel-cost-calculator', icon:'⛽', name:'Fuel Cost' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 4. Home Equity Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('home-equity-calculator', page(
  'Home Equity Calculator',
  'Calculate your current home equity, LTV ratio and how much you could borrow.',
  '🏠',
  [
    { s:'homeValue',     label:'Current Home Value',       type:'range', min:50000,  max:3000000, step:5000, cur:true, def:450000 },
    { s:'mortgageBalance', label:'Remaining Mortgage Balance', type:'range', min:0, max:2000000, step:5000, cur:true, def:280000 },
    { s:'maxLTV',        label:'Lender Max LTV',           type:'select', def:85, opts:[{v:80,l:'80%'},{v:85,l:'85%'},{v:90,l:'90%'}] },
    { s:'appreciation',  label:'Annual Appreciation Rate', type:'range', min:0, max:10, step:0.5, pct:true, def:4 },
    { s:'projYears',     label:'Projection Years',         type:'range', min:1, max:15, step:1, sfx:' yrs', def:5 },
  ],
  `      const equity          = homeValue - mortgageBalance
      const ltv             = (mortgageBalance / homeValue * 100).toFixed(1) + '%'
      const maxBorrow       = Math.max(0, homeValue * (maxLTV/100) - mortgageBalance)
      const futureValue     = homeValue * Math.pow(1 + appreciation/100, projYears)
      const futureEquity    = futureValue - mortgageBalance
      const equityPct       = (equity / homeValue * 100).toFixed(1) + '%'
      return { equity, ltv, maxBorrow, futureValue, futureEquity, equityPct }`,
  [
    { label:'Current Home Equity',        k:'equity',       cur:true  },
    { label:'Equity as % of Home Value',  k:'equityPct',    cur:false },
    { label:'Current LTV Ratio',          k:'ltv',          cur:false },
    { label:'Max Amount You Can Borrow',  k:'maxBorrow',    cur:true  },
    { label:'Projected Home Value',       k:'futureValue',  cur:true  },
    { label:'Projected Equity',           k:'futureEquity', cur:true  },
  ],
  [
    { q:'How is home equity calculated?', a:'Home equity = Current Market Value − Remaining Mortgage Balance. If your home is worth $450,000 and you owe $280,000, your equity is $170,000. Equity increases as you pay down the mortgage and as the home appreciates in value. It decreases if the home value drops or you take out additional loans against it.' },
    { q:'How can I access my home equity?', a:'Three main ways: (1) Cash-out refinance — refinance for more than you owe and pocket the difference; (2) Home Equity Loan — fixed lump sum at a fixed rate, repaid separately from your mortgage; (3) HELOC — revolving credit line at a variable rate. Each has different costs, risks and best-use cases.' },
    { q:'What is the minimum equity required to avoid PMI?', a:'Conventional lenders require 20% equity (80% LTV) to eliminate Private Mortgage Insurance (PMI), which costs $50-$200/month. You can request PMI removal once you reach 20% equity based on original value. Lenders must automatically cancel it at 22% equity. Refinancing or getting a new appraisal can accelerate PMI removal.' },
  ],
  [
    { href:'/heloc-calculator', icon:'💳', name:'HELOC Calculator' },
    { href:'/mortgage-calculator', icon:'🏠', name:'Mortgage' },
    { href:'/refinance-calculator', icon:'🔄', name:'Refinance' },
    { href:'/home-affordability-calculator', icon:'🏡', name:'Affordability' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 5. Inflation Impact Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('inflation-impact-calculator', page(
  'Inflation Impact Calculator',
  'See how inflation erodes purchasing power and what your money will be worth in the future.',
  '📊',
  [
    { s:'amount',      label:'Current Amount',          type:'range', min:100,   max:1000000, step:100, cur:true, def:10000 },
    { s:'inflRate',    label:'Annual Inflation Rate',   type:'range', min:0.5,   max:15,      step:0.25, pct:true, def:3    },
    { s:'years',       label:'Years Into The Future',   type:'range', min:1,     max:50,      step:1,    sfx:' yrs', def:20  },
    { s:'investReturn', label:'Investment Return (to beat inflation)', type:'range', min:0, max:15, step:0.25, pct:true, def:7 },
  ],
  `      const futureEquivalent = amount / Math.pow(1 + inflRate/100, years)
      const neededToMaintain = amount * Math.pow(1 + inflRate/100, years)
      const purchasingLost   = amount - futureEquivalent
      const investedValue    = amount * Math.pow(1 + investReturn/100, years)
      const realReturn       = ((investReturn - inflRate)).toFixed(2) + '%'
      const lostPct          = (purchasingLost / amount * 100).toFixed(1) + '%'
      return { futureEquivalent, neededToMaintain, purchasingLost, lostPct, investedValue, realReturn }`,
  [
    { label:"Today's Money Worth in Future", k:'futureEquivalent',  cur:true  },
    { label:'Purchasing Power Lost',          k:'purchasingLost',    cur:true  },
    { label:'% of Value Eroded',              k:'lostPct',           cur:false },
    { label:'Needed to Maintain Buying Power', k:'neededToMaintain', cur:true  },
    { label:'Invested Value (vs inflation)',   k:'investedValue',     cur:true  },
    { label:'Real Rate of Return',             k:'realReturn',        cur:false },
  ],
  [
    { q:'What is inflation and how does it affect savings?', a:'Inflation is the general rise in prices over time, reducing what each dollar can buy. At 3% inflation, $10,000 today has the purchasing power of only $5,537 in 20 years. Cash savings in a low-interest account lose real value every year. This is why investing — earning returns above inflation — is essential for long-term wealth.' },
    { q:'What is the historical average inflation rate?', a:'US inflation has averaged about 3.3% annually since 1913. The 2021-2023 inflation surge peaked at 9.1% (June 2022) before cooling. The Fed targets 2% annual inflation. High inflation periods (1970s, 2021-23) dramatically erode fixed incomes and bond returns but can benefit owners of hard assets like real estate.' },
    { q:'How do I protect my money from inflation?', a:'Best inflation hedges: equities (stocks historically return 7% real), real estate (rents and values rise with inflation), TIPS (Treasury Inflation-Protected Securities), I-bonds (rate adjusts with CPI), commodities, and REITs. The worst places to hold money during high inflation: cash, fixed-rate bonds, and traditional savings accounts.' },
  ],
  [
    { href:'/investment-return-calculator', icon:'📈', name:'Investment Return' },
    { href:'/savings-calculator', icon:'🏦', name:'Savings Calculator' },
    { href:'/compound-interest', icon:'💹', name:'Compound Interest' },
    { href:'/fire-calculator', icon:'🔥', name:'FIRE Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 6. Profit Margin Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('profit-margin-calculator', page(
  'Profit Margin Calculator',
  'Calculate gross, operating and net profit margins to measure your business profitability.',
  '📈',
  [
    { s:'revenue',    label:'Total Revenue',           type:'range', min:100,  max:10000000, step:100, cur:true, def:500000 },
    { s:'cogs',       label:'Cost of Goods Sold (COGS)', type:'range', min:0, max:5000000,  step:100, cur:true, def:200000 },
    { s:'opExpenses', label:'Operating Expenses',      type:'range', min:0,   max:3000000,  step:100, cur:true, def:150000 },
    { s:'taxes',      label:'Taxes & Interest',        type:'range', min:0,   max:1000000,  step:100, cur:true, def:30000  },
  ],
  `      if (revenue <= 0) return null
      const grossProfit   = revenue - cogs
      const operatingProfit = grossProfit - opExpenses
      const netProfit     = operatingProfit - taxes
      const grossMargin   = (grossProfit / revenue * 100).toFixed(2) + '%'
      const opMargin      = (operatingProfit / revenue * 100).toFixed(2) + '%'
      const netMargin     = (netProfit / revenue * 100).toFixed(2) + '%'
      return { grossProfit, grossMargin, operatingProfit, opMargin, netProfit, netMargin }`,
  [
    { label:'Gross Profit',          k:'grossProfit',    cur:true  },
    { label:'Gross Margin %',        k:'grossMargin',    cur:false },
    { label:'Operating Profit',      k:'operatingProfit', cur:true },
    { label:'Operating Margin %',    k:'opMargin',       cur:false },
    { label:'Net Profit',            k:'netProfit',      cur:true  },
    { label:'Net Profit Margin %',   k:'netMargin',      cur:false },
  ],
  [
    { q:'What is a good profit margin?', a:'Benchmarks vary by industry. Gross margin: software 70-80%, retail 25-50%, restaurants 60-70% (food only). Net margin: tech companies 20-30%, retail 2-5%, restaurants 3-6%, healthcare 5-10%. A net margin above 10% is generally considered strong across most industries.' },
    { q:'What is the difference between gross, operating and net margin?', a:'Gross margin = (Revenue − COGS) ÷ Revenue. It measures production efficiency. Operating margin deducts operating expenses (salaries, rent, marketing) — it shows core business profitability. Net margin is the bottom line after everything including taxes and interest. Track all three to diagnose where profits are being lost.' },
    { q:'How do I improve my profit margin?', a:'Increase gross margin: raise prices, reduce COGS through better supplier negotiations or product mix. Improve operating margin: cut overhead, automate processes, reduce headcount costs. Increase net margin: minimise debt interest, optimise tax strategy. Often a combination of small wins across all three lines is more sustainable than one large cut.' },
  ],
  [
    { href:'/break-even-calculator', icon:'⚖️', name:'Break-Even' },
    { href:'/roi-calculator', icon:'💎', name:'ROI Calculator' },
    { href:'/markup-calculator', icon:'🏷️', name:'Markup Calculator' },
    { href:'/business-valuation-calculator', icon:'🏢', name:'Business Valuation' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 7. Break-Even Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('break-even-calculator', page(
  'Break-Even Calculator',
  'Find the sales volume needed to cover all costs and start making profit.',
  '⚖️',
  [
    { s:'fixedCosts',   label:'Total Fixed Costs (monthly)', type:'range', min:100,   max:1000000, step:100, cur:true, def:20000 },
    { s:'pricePerUnit', label:'Selling Price Per Unit',      type:'range', min:0.01,  max:10000,   step:1,   cur:true, def:50    },
    { s:'varCostUnit',  label:'Variable Cost Per Unit',      type:'range', min:0,     max:9999,    step:1,   cur:true, def:30    },
    { s:'targetProfit', label:'Target Monthly Profit',       type:'range', min:0,     max:500000,  step:500, cur:true, def:5000  },
  ],
  `      const contribution  = pricePerUnit - varCostUnit
      if (contribution <= 0) return null
      const breakEvenUnits   = Math.ceil(fixedCosts / contribution)
      const breakEvenRevenue = breakEvenUnits * pricePerUnit
      const unitsForProfit   = Math.ceil((fixedCosts + targetProfit) / contribution)
      const revenueForProfit = unitsForProfit * pricePerUnit
      const marginOfSafety   = ((revenueForProfit - breakEvenRevenue) / revenueForProfit * 100).toFixed(1) + '%'
      return { contribution, breakEvenUnits, breakEvenRevenue, unitsForProfit, revenueForProfit, marginOfSafety }`,
  [
    { label:'Contribution Margin Per Unit', k:'contribution',      cur:true  },
    { label:'Break-Even Units',             k:'breakEvenUnits',    cur:false },
    { label:'Break-Even Revenue',           k:'breakEvenRevenue',  cur:true  },
    { label:'Units Needed for Target Profit', k:'unitsForProfit',  cur:false },
    { label:'Revenue for Target Profit',    k:'revenueForProfit',  cur:true  },
    { label:'Margin of Safety',             k:'marginOfSafety',    cur:false },
  ],
  [
    { q:'What is a break-even analysis?', a:'Break-even analysis identifies the sales volume at which total revenue equals total costs — the point of zero profit or loss. Break-even units = Fixed Costs ÷ (Price − Variable Cost Per Unit). Understanding your break-even point is essential for pricing decisions, budgeting and assessing business viability.' },
    { q:'What is contribution margin?', a:'Contribution margin = Selling Price − Variable Cost Per Unit. It represents how much each unit sold contributes toward covering fixed costs and generating profit. A $50 product with $30 variable cost has a $20 contribution margin. You need to sell enough units to cover all fixed costs before making any profit.' },
    { q:'How do I lower my break-even point?', a:'Three levers: (1) Raise prices — increases contribution margin per unit, but risks lower sales volume. (2) Reduce variable costs — better supplier terms, process efficiency. (3) Reduce fixed costs — renegotiate rent, reduce headcount, eliminate non-essential expenses. Usually a combination delivers the best result.' },
  ],
  [
    { href:'/profit-margin-calculator', icon:'📈', name:'Profit Margin' },
    { href:'/roi-calculator', icon:'💎', name:'ROI Calculator' },
    { href:'/markup-calculator', icon:'🏷️', name:'Markup Calculator' },
    { href:'/business-valuation-calculator', icon:'🏢', name:'Business Valuation' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 8. ROI Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('roi-calculator', page(
  'ROI Calculator',
  'Calculate Return on Investment (ROI) and annualised return for any investment or project.',
  '💎',
  [
    { s:'initialInvestment', label:'Initial Investment',    type:'range', min:1,    max:10000000, step:100, cur:true, def:10000 },
    { s:'finalValue',        label:'Final Value / Return',  type:'range', min:1,    max:20000000, step:100, cur:true, def:15000 },
    { s:'holdingYears',      label:'Holding Period',        type:'range', min:0.25, max:30,       step:0.25, sfx:' yrs', def:3  },
    { s:'additionalCosts',   label:'Fees & Additional Costs', type:'range', min:0, max:500000,   step:50,  cur:true, def:200   },
  ],
  `      const netReturn       = finalValue - initialInvestment - additionalCosts
      const roi             = (netReturn / initialInvestment * 100).toFixed(2) + '%'
      const annualisedROI   = ((Math.pow(finalValue / (initialInvestment + additionalCosts), 1/holdingYears) - 1) * 100).toFixed(2) + '%'
      const totalReturn     = ((finalValue / (initialInvestment + additionalCosts) - 1) * 100).toFixed(2) + '%'
      const ruleOf72Years   = (72 / parseFloat(annualisedROI)).toFixed(1) + ' yrs to double'
      return { netReturn, roi, annualisedROI, totalReturn, ruleOf72Years }`,
  [
    { label:'Net Return (profit/loss)',   k:'netReturn',      cur:true  },
    { label:'ROI %',                      k:'roi',            cur:false },
    { label:'Annualised ROI',             k:'annualisedROI',  cur:false },
    { label:'Total Return %',             k:'totalReturn',    cur:false },
    { label:'Time to Double at This Rate', k:'ruleOf72Years', cur:false },
  ],
  [
    { q:'How is ROI calculated?', a:'ROI = (Net Return ÷ Cost of Investment) × 100. Net Return = Final Value − Initial Investment − Additional Costs. A $10,000 investment that grows to $15,000 with $200 in fees: ROI = ($4,800 ÷ $10,000) × 100 = 48%. Annualised ROI accounts for how long the money was invested.' },
    { q:'What is a good ROI?', a:'Context determines good ROI. Stock market: 7-10% annualised is excellent. Real estate: 8-12% annualised is good. Business investment: 15-30%+ is typical target. Marketing campaigns: 300-500% ROI is benchmark for paid ads. Always compare ROI to the opportunity cost — what you could have earned elsewhere with the same money.' },
    { q:'What is the difference between ROI and IRR?', a:'ROI is a simple percentage return on an investment. IRR (Internal Rate of Return) is the annualised compound rate that makes the net present value of all cash flows equal zero. IRR is more sophisticated and handles multiple cash flows over time. For simple one-time investments they are similar; for complex multi-year projects use IRR.' },
  ],
  [
    { href:'/investment-return-calculator', icon:'📉', name:'Investment Return' },
    { href:'/profit-margin-calculator', icon:'📈', name:'Profit Margin' },
    { href:'/break-even-calculator', icon:'⚖️', name:'Break-Even' },
    { href:'/stock-profit-calculator', icon:'📊', name:'Stock Profit' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 9. Freelance Rate Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('freelance-rate-calculator', page(
  'Freelance Rate Calculator',
  'Calculate the minimum hourly or project rate you need to charge to meet your income goals.',
  '🎯',
  [
    { s:'desiredIncome',    label:'Desired Annual Income',       type:'range', min:10000,  max:500000, step:1000, cur:true, def:80000 },
    { s:'hoursPerWeek',     label:'Billable Hours Per Week',     type:'range', min:5,      max:60,     step:1,    sfx:' hrs', def:30   },
    { s:'weeksPerYear',     label:'Weeks Worked Per Year',       type:'range', min:20,     max:52,     step:1,    sfx:' wks', def:48   },
    { s:'businessExpenses', label:'Annual Business Expenses',    type:'range', min:0,      max:100000, step:500,  cur:true, def:5000   },
    { s:'taxRate',          label:'Effective Tax Rate (SE + income)', type:'range', min:15, max:50,   step:1,    pct:true, def:30      },
    { s:'nonBillablePct',   label:'Non-Billable Time %',         type:'range', min:0,      max:60,     step:5,    pct:true, def:25     },
  ],
  `      const totalBillableHours = hoursPerWeek * weeksPerYear * (1 - nonBillablePct/100)
      const grossNeeded        = (desiredIncome + businessExpenses) / (1 - taxRate/100)
      const minHourlyRate      = grossNeeded / totalBillableHours
      const dayRate            = minHourlyRate * 8
      const weekRate           = minHourlyRate * hoursPerWeek
      const projectRate40h     = minHourlyRate * 40
      const annualRevNeeded    = grossNeeded
      return { minHourlyRate, dayRate, weekRate, projectRate40h, annualRevNeeded, totalBillableHours: Math.round(totalBillableHours) }`,
  [
    { label:'Minimum Hourly Rate',          k:'minHourlyRate',     cur:true  },
    { label:'Day Rate (8 hrs)',              k:'dayRate',           cur:true  },
    { label:'Weekly Rate',                  k:'weekRate',          cur:true  },
    { label:'Project Rate (40 hrs)',         k:'projectRate40h',    cur:true  },
    { label:'Annual Revenue Needed',         k:'annualRevNeeded',   cur:true  },
    { label:'Total Billable Hours / Year',   k:'totalBillableHours', cur:false },
  ],
  [
    { q:'How do I set my freelance rate?', a:'Start with your minimum viable rate (this calculator). Then research what the market pays for your skill level on Upwork, LinkedIn, and industry salary surveys. Differentiate by specialisation, results and reputation. Most freelancers undercharge initially — market rates for senior-level work are often 2-4x what beginners charge.' },
    { q:'Why do freelancers need to charge more than employees?', a:'Freelancers bear costs employees do not: self-employment tax (15.3%), health insurance, retirement contributions, unpaid vacation, business expenses, and non-billable time (marketing, admin, chasing payments). A full-time employee earning $60,000 costs their employer ~$80,000. A freelancer charging the equivalent needs to earn even more due to uncertainty and gaps.' },
    { q:'Should I charge hourly or project rates?', a:'Project rates are generally better for experienced freelancers — you are paid for the value delivered, not hours spent. As you get faster and better, project rates increase your effective hourly rate. Hourly is better for ongoing or open-ended work where scope is unclear. Never use hourly rates that expose you to scope creep without change-order agreements.' },
  ],
  [
    { href:'/self-employment-tax-calculator', icon:'🧾', name:'SE Tax' },
    { href:'/invoice-calculator', icon:'📄', name:'Invoice' },
    { href:'/hourly-to-salary-calculator', icon:'⏰', name:'Hourly to Salary' },
    { href:'/profit-margin-calculator', icon:'📈', name:'Profit Margin' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 10. Business Valuation Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('business-valuation-calculator', page(
  'Business Valuation Calculator',
  'Estimate your business value using multiple methods — earnings multiples, revenue and assets.',
  '🏢',
  [
    { s:'annualRevenue',  label:'Annual Revenue',            type:'range', min:10000,  max:50000000, step:10000, cur:true, def:500000  },
    { s:'ebitda',         label:'EBITDA (annual earnings)',  type:'range', min:0,      max:20000000, step:5000,  cur:true, def:100000  },
    { s:'netProfit',      label:'Net Profit (annual)',       type:'range', min:0,      max:10000000, step:5000,  cur:true, def:75000   },
    { s:'totalAssets',    label:'Total Business Assets',     type:'range', min:0,      max:20000000, step:10000, cur:true, def:200000  },
    { s:'totalLiabilities', label:'Total Liabilities',      type:'range', min:0,      max:10000000, step:10000, cur:true, def:80000   },
    { s:'industry',       label:'Industry',                  type:'select', def:'service', opts:[{v:'service',l:'Service / Consulting'},{v:'saas',l:'SaaS / Tech'},{v:'retail',l:'Retail'},{v:'manufacturing',l:'Manufacturing'},{v:'ecommerce',l:'E-Commerce'}] },
  ],
  `      const multiples = {
        service: { rev: 1.0, ebitda: 4, pe: 10 },
        saas:    { rev: 4.0, ebitda: 12, pe: 20 },
        retail:  { rev: 0.5, ebitda: 5, pe:  8 },
        manufacturing: { rev: 0.8, ebitda: 6, pe: 10 },
        ecommerce: { rev: 1.5, ebitda: 8, pe: 12 },
      }
      const m = multiples[industry] || multiples.service
      const revenueVal  = annualRevenue * m.rev
      const ebitdaVal   = ebitda * m.ebitda
      const earningsVal = netProfit * m.pe
      const assetVal    = totalAssets - totalLiabilities
      const avgVal      = (revenueVal + ebitdaVal + earningsVal + assetVal) / 4
      return { revenueVal, ebitdaVal, earningsVal, assetVal, avgVal }`,
  [
    { label:'Revenue Multiple Valuation',   k:'revenueVal',   cur:true },
    { label:'EBITDA Multiple Valuation',    k:'ebitdaVal',    cur:true },
    { label:'Earnings (P/E) Valuation',     k:'earningsVal',  cur:true },
    { label:'Asset-Based Valuation',        k:'assetVal',     cur:true },
    { label:'Average Estimated Value',      k:'avgVal',       cur:true },
  ],
  [
    { q:'How is a small business valued?', a:'Small businesses are typically valued using: (1) EBITDA multiple (most common) — 3-8x earnings before interest, tax, depreciation, amortisation; (2) Revenue multiple — more common for high-growth or SaaS businesses; (3) Asset-based — useful for asset-heavy businesses; (4) Discounted Cash Flow (DCF) — complex but most theoretically rigorous.' },
    { q:'What multiple is typical for selling a business?', a:'Typical EBITDA multiples: service businesses 3-5x, SaaS 8-15x, retail 3-5x, manufacturing 4-7x, e-commerce 4-8x. Multiples rise with: strong recurring revenue, low customer concentration, proven management team, clean financials, growth trajectory and proprietary IP or brand. Multiples have compressed since 2022 as rates rose.' },
    { q:'What makes a business worth more?', a:'Value drivers: recurring/predictable revenue (subscriptions beat project work), diversified customer base (no single client over 15%), documented processes that work without the owner, strong margins, IP or brand moat, growth trajectory, clean books audited for 3 years, and a strong management team. Address these before any planned sale.' },
  ],
  [
    { href:'/profit-margin-calculator', icon:'📈', name:'Profit Margin' },
    { href:'/break-even-calculator', icon:'⚖️', name:'Break-Even' },
    { href:'/roi-calculator', icon:'💎', name:'ROI Calculator' },
    { href:'/cash-flow-calculator', icon:'💰', name:'Cash Flow' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
console.log(`
════════════════════════════════════════════════════
  ✅  STAGE 3 COMPLETE — 10 calculators created
════════════════════════════════════════════════════
   1.  /payroll-tax-calculator
   2.  /bond-yield-calculator
   3.  /car-depreciation-calculator
   4.  /home-equity-calculator
   5.  /inflation-impact-calculator
   6.  /profit-margin-calculator
   7.  /break-even-calculator
   8.  /roi-calculator
   9.  /freelance-rate-calculator
  10.  /business-valuation-calculator

  Deploy:
  git add .
  git commit -m "Stage 3: taxes + business calculators"
  git push origin master:main
════════════════════════════════════════════════════
`)
