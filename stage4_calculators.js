/**
 * FreeFinCalc.net — STAGE 4: 10 Calculator Pages
 * Income & Vehicle
 * Run from project root: node stage4_calculators.js
 *
 *  1. hourly-to-salary-calculator
 *  2. salary-after-tax-calculator
 *  3. overtime-calculator
 *  4. cost-of-living-calculator
 *  5. moving-cost-calculator
 *  6. lease-vs-buy-calculator
 *  7. car-loan-calculator
 *  8. fuel-cost-calculator
 *  9. down-payment-calculator
 * 10. mortgage-points-calculator
 */

const fs = require('fs')

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }
function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅ app/' + dir)
}

// RULES followed in this file:
// 1. No "export const metadata" — pages are 'use client'
// 2. All string useState defaults are quoted: useState('value')
// 3. pdfRows labels use double quotes, no apostrophes — use "dont" not "don't"
// 4. Template literals for pct display: `${val}%`
// 5. No regex fix scripts needed — code is correct from the start

function page(title, desc, icon, inputs, formula, results, faqs, related) {
  // Build useState declarations — string defaults get quoted
  const states = inputs.map(f => {
    const def = typeof f.def === 'string' ? `'${f.def}'` : f.def
    return `  const [${f.s}, set${cap(f.s)}] = useState(${def})`
  }).join('\n')

  const deps = inputs.map(f => f.s).join(', ')

  // Build input JSX
  const inputsJSX = inputs.map(f => {
    if (f.type === 'range') {
      // Use template literal for pct, sfx display — careful with backtick escaping
      let displayExpr
      if (f.cur) {
        displayExpr = `fmt(${f.s})`
      } else if (f.pct) {
        displayExpr = `\`\${${f.s}}%\``
      } else if (f.sfx) {
        displayExpr = `\`\${${f.s}}${f.sfx}\``
      } else {
        displayExpr = f.s
      }
      return `
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">${f.label}</label>
                  <span className="text-white font-bold text-sm">{${displayExpr}}</span>
                </div>
                <input type="range" min={${f.min}} max={${f.max}} step={${f.step}}
                  value={${f.s}} onChange={e => set${cap(f.s)}(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>`
    }
    if (f.type === 'select') {
      // Safe stringify then literal injection
      const optsJson = JSON.stringify(f.opts)
      return `
              <div>
                <label className="text-slate-400 text-sm block mb-2">${f.label}</label>
                <div className="flex flex-wrap gap-2">
                  {(${optsJson}).map(o => (
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

  // Build results JSX
  const resultsJSX = results.map(r => `
                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">${r.label}</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}}
                    </span>
                  </div>`).join('\n')

  // pdfRows — ALL labels use double quotes, NO apostrophes
  const pdfRows = results.map(r =>
    `    { label: "${r.label}", value: result.${r.k} !== undefined ? String(${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}) : "" },`
  ).join('\n')

  const relatedJSX = related.map(r => `
            <a href="${r.href}" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">${r.icon}</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">${r.name}</h3>
            </a>`).join('\n')

  // FAQs — replace any apostrophe in q/a with HTML entity or reword
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
              Results are estimates for educational purposes only. Not financial advice.
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
// 1. Hourly to Salary Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('hourly-to-salary-calculator', page(
  'Hourly to Salary Calculator',
  'Convert any hourly wage to annual, monthly, weekly and daily salary — and back again.',
  '⏰',
  [
    { s:'hourlyRate',   label:'Hourly Rate',           type:'range', min:7.25, max:500,  step:0.25, cur:true, def:25    },
    { s:'hoursPerWeek', label:'Hours Per Week',        type:'range', min:1,    max:80,   step:0.5,  sfx:' hrs', def:40  },
    { s:'weeksPerYear', label:'Weeks Worked Per Year', type:'range', min:1,    max:52,   step:1,    sfx:' wks', def:52  },
  ],
  `      const annualSalary  = hourlyRate * hoursPerWeek * weeksPerYear
      const monthlySalary = annualSalary / 12
      const weeklySalary  = hourlyRate * hoursPerWeek
      const dailySalary   = hourlyRate * (hoursPerWeek / 5)
      const annualHours   = hoursPerWeek * weeksPerYear
      return { annualSalary, monthlySalary, weeklySalary, dailySalary, annualHours: annualHours + ' hrs' }`,
  [
    { label:'Annual Salary',   k:'annualSalary',  cur:true  },
    { label:'Monthly Salary',  k:'monthlySalary', cur:true  },
    { label:'Weekly Pay',      k:'weeklySalary',  cur:true  },
    { label:'Daily Pay',       k:'dailySalary',   cur:true  },
    { label:'Annual Hours',    k:'annualHours',   cur:false },
  ],
  [
    { q:'How do I convert hourly wage to annual salary?', a:'Multiply your hourly rate by hours per week, then by weeks worked per year. At 40 hrs/week for 52 weeks: Annual = Hourly x 2,080. A $25/hr wage equals $52,000/year. For part-time at 20 hrs/week: $25 x 1,040 = $26,000/year.' },
    { q:'What is the US federal minimum wage in 2026?', a:'The federal minimum wage remains $7.25/hour as of 2026. However many states and cities have higher minimums. California, New York, Washington and others are at $15-$17+/hour. Some cities like Seattle and San Francisco exceed $17/hour. Tipped workers have a separate federal minimum of $2.13/hour.' },
    { q:'Should I compare job offers using hourly or salary?', a:'Always convert to the same unit for fair comparison. Calculate total compensation: base pay plus benefits value (health insurance worth $5,000-$15,000/year), retirement match, paid time off (PTO days x daily rate), bonuses, and remote work savings on commuting. Total comp can differ hugely from the headline number.' },
  ],
  [
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
    { href:'/paycheck-calculator',         icon:'💵', name:'Paycheck Calculator' },
    { href:'/raise-calculator',            icon:'📈', name:'Raise Calculator' },
    { href:'/overtime-calculator',         icon:'⏱️', name:'Overtime Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 2. Salary After Tax Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('salary-after-tax-calculator', page(
  'Salary After Tax Calculator',
  'Calculate your exact take-home pay after federal tax, state tax and FICA deductions.',
  '💰',
  [
    { s:'grossSalary',    label:'Annual Gross Salary',        type:'range', min:10000, max:500000, step:1000, cur:true, def:75000 },
    { s:'filingStatus',   label:'Filing Status',              type:'select', def:'single', opts:[{v:'single',l:'Single'},{v:'married',l:'Married Joint'},{v:'hoh',l:'Head of Household'}] },
    { s:'stateRate',      label:'State Income Tax Rate',      type:'range', min:0,     max:13,     step:0.25, pct:true, def:5     },
    { s:'preTaxDeduct',   label:'Pre-Tax Deductions (401k etc)', type:'range', min:0,  max:30000,  step:250,  cur:true, def:5000  },
  ],
  `      const taxable = Math.max(0, grossSalary - preTaxDeduct)
      // 2026 federal brackets single/married/hoh
      const brackets = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : filingStatus === 'hoh'
        ? [[0,0.10,16550],[16550,0.12,63100],[63100,0.22,100500],[100500,0.24,191950],[191950,0.32,243700],[243700,0.35,609350],[609350,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let fedTax = 0
      for (const [lo, rate, hi] of brackets) {
        if (taxable <= lo) break
        fedTax += (Math.min(taxable, hi) - lo) * rate
      }
      const fica       = Math.min(grossSalary, 168600) * 0.0765
      const stateTax   = grossSalary * (stateRate / 100)
      const totalTax   = fedTax + fica + stateTax
      const takeHome   = grossSalary - totalTax - preTaxDeduct
      const monthly    = takeHome / 12
      const effectiveR = (totalTax / grossSalary * 100).toFixed(1) + '%'
      return { takeHome, monthly, fedTax, fica, stateTax, effectiveR }`,
  [
    { label:'Annual Take-Home Pay',   k:'takeHome',  cur:true  },
    { label:'Monthly Take-Home',      k:'monthly',   cur:true  },
    { label:'Federal Income Tax',     k:'fedTax',    cur:true  },
    { label:'FICA Tax',               k:'fica',      cur:true  },
    { label:'State Tax',              k:'stateTax',  cur:true  },
    { label:'Effective Tax Rate',     k:'effectiveR',cur:false },
  ],
  [
    { q:'How much tax do I pay on a $75,000 salary?', a:'A single filer earning $75,000 in 2026 pays approximately: federal income tax $10,300, FICA $5,738, and state tax varies (at 5% = $3,750). Total tax around $19,800, leaving about $55,200 take-home or $4,600/month. A $5,000 401k contribution reduces taxable income and lowers federal tax further.' },
    { q:'What are pre-tax deductions and why do they matter?', a:'Pre-tax deductions (401k, HSA, health insurance premiums, FSA) reduce your taxable income before federal and state taxes are calculated. A $5,000 401k contribution at a 22% federal rate saves $1,100 in federal tax alone. This is why maxing pre-tax benefits is one of the highest-return financial moves available.' },
    { q:'What is the difference between gross and net salary?', a:'Gross salary is your pay before any deductions. Net salary (take-home pay) is what hits your bank account after all taxes and deductions. The gap between gross and net depends on your tax bracket, state, filing status and pre-tax elections. Understanding this gap is essential for accurate budgeting.' },
  ],
  [
    { href:'/paycheck-calculator',        icon:'💵', name:'Paycheck Calculator' },
    { href:'/tax-calculator',             icon:'🧮', name:'Tax Calculator' },
    { href:'/hourly-to-salary-calculator',icon:'⏰', name:'Hourly to Salary' },
    { href:'/raise-calculator',           icon:'📈', name:'Raise Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 3. Overtime Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('overtime-calculator', page(
  'Overtime Calculator',
  'Calculate overtime pay, total earnings and effective hourly rate for any pay period.',
  '⏱️',
  [
    { s:'regularRate',    label:'Regular Hourly Rate',      type:'range', min:7.25, max:500,  step:0.25, cur:true, def:20   },
    { s:'regularHours',   label:'Regular Hours Per Week',   type:'range', min:1,    max:40,   step:0.5,  sfx:' hrs', def:40 },
    { s:'overtimeHours',  label:'Overtime Hours Per Week',  type:'range', min:0,    max:40,   step:0.5,  sfx:' hrs', def:10 },
    { s:'otMultiplier',   label:'Overtime Multiplier',      type:'select', def:'1.5', opts:[{v:'1.5',l:'1.5x (standard)'},{v:'2',l:'2x (double time)'},{v:'2.5',l:'2.5x (holiday)'}] },
    { s:'weeksPerYear',   label:'Weeks Per Year',           type:'range', min:1,    max:52,   step:1,    sfx:' wks', def:52 },
  ],
  `      const otRate         = regularRate * parseFloat(otMultiplier)
      const weeklyRegular  = regularRate * regularHours
      const weeklyOvertime = otRate * overtimeHours
      const weeklyTotal    = weeklyRegular + weeklyOvertime
      const annualTotal    = weeklyTotal * weeksPerYear
      const annualOvertime = weeklyOvertime * weeksPerYear
      const totalHours     = regularHours + overtimeHours
      const effectiveRate  = (weeklyTotal / totalHours).toFixed(2)
      return { weeklyTotal, weeklyOvertime, annualTotal, annualOvertime, otRate, effectiveRate }`,
  [
    { label:'Weekly Total Pay',         k:'weeklyTotal',    cur:true  },
    { label:'Weekly Overtime Pay',      k:'weeklyOvertime', cur:true  },
    { label:'Overtime Hourly Rate',     k:'otRate',         cur:true  },
    { label:'Annual Total Pay',         k:'annualTotal',    cur:true  },
    { label:'Annual Overtime Earnings', k:'annualOvertime', cur:true  },
    { label:'Effective Hourly Rate',    k:'effectiveRate',  cur:false },
  ],
  [
    { q:'How is overtime calculated in the US?', a:'Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive 1.5x their regular rate for all hours over 40 in a workweek. There is no federal requirement for daily overtime, but some states (California) require 1.5x after 8 hours/day and 2x after 12 hours/day or on the 7th consecutive day.' },
    { q:'Who is exempt from overtime pay?', a:'Exempt employees (not entitled to overtime) typically include: executive, administrative and professional employees earning at least $684/week ($35,568/year in 2024), outside salespeople, and certain computer employees. Misclassification of employees as exempt is a common wage violation — if in doubt, check with the Department of Labor.' },
    { q:'Is overtime taxed at a higher rate?', a:'No — overtime is taxed at the same marginal rates as regular income. However because overtime increases your total income for the pay period, withholding may be higher that period (pushing you into a higher bracket temporarily). Your actual tax rate depends on your total annual income, not the individual paycheck amount.' },
  ],
  [
    { href:'/hourly-to-salary-calculator', icon:'⏰', name:'Hourly to Salary' },
    { href:'/paycheck-calculator',         icon:'💵', name:'Paycheck Calculator' },
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
    { href:'/raise-calculator',            icon:'📈', name:'Raise Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 4. Cost of Living Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('cost-of-living-calculator', page(
  'Cost of Living Calculator',
  'Compare cost of living between cities and find the equivalent salary you need when relocating.',
  '🌆',
  [
    { s:'currentSalary', label:'Current Salary',          type:'range', min:20000, max:500000, step:1000, cur:true, def:80000 },
    { s:'housingIndex',  label:'New City Housing Cost Index (current=100)', type:'range', min:30, max:400, step:5, sfx:'', def:150 },
    { s:'foodIndex',     label:'New City Food Cost Index',     type:'range', min:50, max:200, step:5, sfx:'', def:115 },
    { s:'transportIndex',label:'New City Transport Index',     type:'range', min:50, max:200, step:5, sfx:'', def:110 },
    { s:'taxDiff',       label:'Tax Difference (+ higher, - lower)', type:'range', min:-15, max:15, step:0.5, pct:true, def:2 },
  ],
  `      const weightedIndex = (housingIndex * 0.35) + (foodIndex * 0.15) + (transportIndex * 0.15) + (100 * 0.35)
      const colAdjustment = weightedIndex / 100
      const taxAdjustment = 1 + (taxDiff / 100)
      const equivalentSalary = currentSalary * colAdjustment * taxAdjustment
      const difference = equivalentSalary - currentSalary
      const pctChange = ((equivalentSalary / currentSalary - 1) * 100).toFixed(1) + '%'
      const monthlyDiff = difference / 12
      return { equivalentSalary, difference, pctChange, monthlyDiff }`,
  [
    { label:'Equivalent Salary Needed',    k:'equivalentSalary', cur:true  },
    { label:'Salary Difference Required',  k:'difference',       cur:true  },
    { label:'Percentage Adjustment',       k:'pctChange',        cur:false },
    { label:'Monthly Cost Difference',     k:'monthlyDiff',      cur:true  },
  ],
  [
    { q:'What factors make up cost of living?', a:'The main components: housing (typically 30-40% of budget), food (10-15%), transportation (10-15%), healthcare (5-10%), taxes (varies widely), childcare if applicable, utilities and entertainment. Housing has the biggest impact — San Francisco housing costs 3-4x the national average, while Midwest cities can be 30-50% below average.' },
    { q:'How much more salary do I need to move from a low to high cost city?', a:'Moving from a median-cost city to San Francisco or New York typically requires 40-70% higher salary just to maintain the same lifestyle. A $80,000 salary in Austin may need to be $130,000+ in San Francisco after accounting for higher rent, taxes and expenses. Use this calculator with real local data for accuracy.' },
    { q:'How do I research cost of living before relocating?', a:'Use resources like Numbeo, NerdWallet Cost of Living calculator, CNN Money cost of living tool, and BestPlaces.net. Check Zillow/Apartments.com for actual current rents. Use SmartAsset for tax comparison between states. Talk to people already living in the target city for real-world spending data.' },
  ],
  [
    { href:'/salary-after-tax-calculator', icon:'💰', name:'After-Tax Salary' },
    { href:'/budget-calculator',           icon:'📋', name:'Budget Calculator' },
    { href:'/moving-cost-calculator',      icon:'📦', name:'Moving Cost' },
    { href:'/net-worth-calculator',        icon:'💎', name:'Net Worth' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 5. Moving Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('moving-cost-calculator', page(
  'Moving Cost Calculator',
  'Estimate the total cost of moving including movers, truck rental, packing and travel.',
  '📦',
  [
    { s:'moveType',     label:'Move Type',            type:'select', def:'local', opts:[{v:'local',l:'Local (under 50 mi)'},{v:'instate',l:'In-State (50-500 mi)'},{v:'longdist',l:'Long Distance (500+ mi)'}] },
    { s:'homeSize',     label:'Home Size',            type:'select', def:'2br', opts:[{v:'studio',l:'Studio/1BR'},{v:'2br',l:'2-3 Bedroom'},{v:'4br',l:'4+ Bedroom / House'}] },
    { s:'movingHelp',   label:'Moving Help',          type:'select', def:'fullservice', opts:[{v:'diy',l:'DIY (truck rental)'},{v:'hybrid',l:'Hybrid (labor only)'},{v:'fullservice',l:'Full Service Movers'}] },
    { s:'extraServices',label:'Extra Services Budget',type:'range', min:0, max:5000, step:100, cur:true, def:500 },
  ],
  `      const baseCosts = {
        local:    { studio: 400,  br2: 900,   br4: 1500  },
        instate:  { studio: 900,  br2: 2000,  br4: 3500  },
        longdist: { studio: 1500, br2: 4000,  br4: 8000  },
      }
      const helpMultiplier = { diy: 0.4, hybrid: 0.7, fullservice: 1.0 }
      const sizeKey = homeSize === 'studio' ? 'studio' : homeSize === '2br' ? 'br2' : 'br4'
      const base = baseCosts[moveType][sizeKey] * helpMultiplier[movingHelp]
      const packing    = homeSize === 'studio' ? 150 : homeSize === '2br' ? 300 : 600
      const insurance  = base * 0.05
      const tips       = movingHelp !== 'diy' ? (homeSize === 'studio' ? 50 : homeSize === '2br' ? 100 : 200) : 0
      const total      = base + packing + insurance + tips + extraServices
      const lowEstimate  = total * 0.8
      const highEstimate = total * 1.3
      return { base, packing, total, lowEstimate, highEstimate, insurance }`,
  [
    { label:'Base Moving Cost',     k:'base',          cur:true },
    { label:'Packing Materials',    k:'packing',       cur:true },
    { label:'Moving Insurance',     k:'insurance',     cur:true },
    { label:'Total Estimated Cost', k:'total',         cur:true },
    { label:'Low Estimate',         k:'lowEstimate',   cur:true },
    { label:'High Estimate',        k:'highEstimate',  cur:true },
  ],
  [
    { q:'How much does it cost to move in 2026?', a:'Average moving costs: local move $800-$2,500, in-state $1,500-$5,000, long-distance $3,000-$10,000+. Full-service movers cost 2-3x more than DIY truck rental. A 2-bedroom local move with movers averages $1,200-$1,800. Long-distance full-service for a 3-bedroom house averages $5,000-$10,000.' },
    { q:'Should I hire movers or do it myself?', a:'DIY with a rented truck saves 50-60% but requires significant physical effort and time. Consider hiring movers if you have: many heavy items (furniture, appliances), a third floor or no elevator, a long distance move, limited time or help, or items of high value. The time and physical cost of DIY often outweighs the savings.' },
    { q:'What moving costs are tax deductible?', a:'Moving expenses are no longer deductible for most Americans after the 2017 Tax Cuts and Jobs Act. The exception is active-duty military members who move due to orders. Some states still allow moving expense deductions. Employer moving reimbursements are generally taxable income to the employee.' },
  ],
  [
    { href:'/cost-of-living-calculator',   icon:'🌆', name:'Cost of Living' },
    { href:'/budget-calculator',           icon:'📋', name:'Budget Calculator' },
    { href:'/rent-vs-buy-calculator',      icon:'🏘️', name:'Rent vs Buy' },
    { href:'/home-affordability-calculator',icon:'🏡', name:'Home Affordability' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 6. Lease vs Buy Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('lease-vs-buy-calculator', page(
  'Lease vs Buy Calculator',
  'Compare the true total cost of leasing versus buying a car over the same period.',
  '🔄',
  [
    { s:'carPrice',       label:'Car Price',                  type:'range', min:5000,  max:150000, step:500,   cur:true, def:35000 },
    { s:'downPayment',    label:'Down Payment (buy)',         type:'range', min:0,     max:50000,  step:500,   cur:true, def:5000  },
    { s:'loanRate',       label:'Loan Interest Rate (buy)',   type:'range', min:0,     max:20,     step:0.25,  pct:true, def:7     },
    { s:'loanTermMo',     label:'Loan Term (buy)',            type:'select', def:60, opts:[{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:72,l:'72 mo'}] },
    { s:'leasePayment',   label:'Monthly Lease Payment',      type:'range', min:100,   max:2000,   step:25,    cur:true, def:450   },
    { s:'leaseTerm',      label:'Lease Term (months)',        type:'select', def:36, opts:[{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:39,l:'39 mo'},{v:48,l:'48 mo'}] },
    { s:'leaseDown',      label:'Lease Down / Cap Reduction', type:'range', min:0,     max:10000,  step:250,   cur:true, def:2000  },
  ],
  `      const r = loanRate / 100 / 12
      const n = loanTermMo
      const loanAmount = carPrice - downPayment
      const monthlyLoan = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalBuyCost = downPayment + monthlyLoan * n
      // Residual value after loan term (depreciation ~50% over 5 yrs)
      const residualValue = carPrice * Math.pow(0.85, loanTermMo/12)
      const netBuyCost = totalBuyCost - residualValue
      // Lease cost over same period (may need multiple lease cycles)
      const leaseCycles = Math.ceil(loanTermMo / leaseTerm)
      const totalLeaseCost = (leasePayment * leaseTerm + leaseDown) * leaseCycles
      const winner = netBuyCost < totalLeaseCost ? 'Buying is cheaper' : 'Leasing is cheaper'
      const saving = Math.abs(netBuyCost - totalLeaseCost)
      return { monthlyLoan, totalBuyCost, netBuyCost, totalLeaseCost, winner, saving }`,
  [
    { label:'Monthly Loan Payment (buy)',   k:'monthlyLoan',    cur:true  },
    { label:'Total Buy Cost (loan term)',   k:'totalBuyCost',   cur:true  },
    { label:'Net Buy Cost (after resale)',  k:'netBuyCost',     cur:true  },
    { label:'Total Lease Cost',             k:'totalLeaseCost', cur:true  },
    { label:'Better Option',               k:'winner',         cur:false },
    { label:'Amount Saved',                k:'saving',         cur:true  },
  ],
  [
    { q:'Is it better to lease or buy a car?', a:'Buying is better long-term — you build equity, have no mileage limits, and eventually own the car free and clear. Leasing is better if you want lower monthly payments, a new car every 2-3 years, or always want to be under warranty. Leasing costs more over the long run but provides flexibility and predictable costs.' },
    { q:'What are the hidden costs of leasing?', a:'Watch for: acquisition fee ($500-$1,000), disposition fee at end ($300-$500), excess mileage charges ($0.15-$0.30/mile over limit), wear-and-tear charges, gap insurance requirement, early termination penalties (very expensive), and the fact that you have nothing to show for payments at the end.' },
    { q:'What is a money factor in a lease?', a:'The money factor is the lease equivalent of an interest rate. To convert to APR multiply by 2,400. A money factor of 0.00125 = 3% APR. A good money factor is below 0.0020 (4.8% APR). Always ask the dealer for the money factor — they are not required to disclose it upfront.' },
  ],
  [
    { href:'/car-loan-calculator',          icon:'🚗', name:'Car Loan' },
    { href:'/car-affordability-calculator', icon:'🚘', name:'Car Affordability' },
    { href:'/car-depreciation-calculator',  icon:'📉', name:'Car Depreciation' },
    { href:'/fuel-cost-calculator',         icon:'⛽', name:'Fuel Cost' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 7. Car Loan Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('car-loan-calculator', page(
  'Car Loan Calculator',
  'Calculate monthly car loan payments, total interest and true cost of financing a vehicle.',
  '🚗',
  [
    { s:'vehiclePrice',  label:'Vehicle Price',         type:'range', min:1000,  max:200000, step:500,  cur:true, def:35000 },
    { s:'downPayment',   label:'Down Payment',          type:'range', min:0,     max:100000, step:500,  cur:true, def:5000  },
    { s:'tradeIn',       label:'Trade-In Value',        type:'range', min:0,     max:50000,  step:250,  cur:true, def:0     },
    { s:'loanRate',      label:'Annual Interest Rate',  type:'range', min:0,     max:25,     step:0.25, pct:true, def:7     },
    { s:'termMonths',    label:'Loan Term',             type:'select', def:60, opts:[{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:72,l:'72 mo'},{v:84,l:'84 mo'}] },
  ],
  `      const loanAmount   = vehiclePrice - downPayment - tradeIn
      if (loanAmount <= 0) return null
      const r            = loanRate / 100 / 12
      const n            = termMonths
      const monthly      = r === 0 ? loanAmount/n : loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid    = monthly * n + downPayment + tradeIn
      const totalInterest= monthly * n - loanAmount
      const costPerMonth = totalPaid / n
      return { loanAmount, monthly, totalInterest, totalPaid, costPerMonth }`,
  [
    { label:'Loan Amount',        k:'loanAmount',    cur:true },
    { label:'Monthly Payment',    k:'monthly',       cur:true },
    { label:'Total Interest Paid',k:'totalInterest', cur:true },
    { label:'Total Vehicle Cost', k:'totalPaid',     cur:true },
    { label:'True Monthly Cost',  k:'costPerMonth',  cur:true },
  ],
  [
    { q:'What is a good interest rate for a car loan in 2026?', a:'Average car loan rates in 2026: new car excellent credit 5-6%, good credit 7-9%, fair credit 10-15%, poor credit 15-20%+. Used car rates run 1-3% higher. Credit unions typically offer rates 1-2% lower than banks. Always get pre-approved before visiting a dealer to negotiate from a position of strength.' },
    { q:'Should I put more money down on a car loan?', a:'A larger down payment reduces your loan amount, monthly payment and total interest. Aim for at least 20% down on a new car to avoid being underwater (owing more than the car is worth). With 0% or low promotional rates, a smaller down payment can make sense — invest the difference instead.' },
    { q:'What is the best car loan term length?', a:'Shorter terms (36-48 months) cost less in total interest but have higher monthly payments. Longer terms (72-84 months) have lower payments but much higher total cost and risk being underwater on the loan. Most financial advisors recommend no more than 60 months for new cars and 48 months for used.' },
  ],
  [
    { href:'/lease-vs-buy-calculator',      icon:'🔄', name:'Lease vs Buy' },
    { href:'/car-affordability-calculator', icon:'🚘', name:'Car Affordability' },
    { href:'/car-depreciation-calculator',  icon:'📉', name:'Car Depreciation' },
    { href:'/loan-calculator',              icon:'💳', name:'Loan Calculator' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 8. Fuel Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('fuel-cost-calculator', page(
  'Fuel Cost Calculator',
  'Calculate annual fuel costs, cost per mile and compare fuel expenses between two vehicles.',
  '⛽',
  [
    { s:'milesPerYear',  label:'Miles Driven Per Year',    type:'range', min:1000,  max:100000, step:500,  sfx:' mi', def:15000 },
    { s:'mpg1',          label:'Vehicle 1 Fuel Economy',   type:'range', min:5,     max:150,    step:1,    sfx:' mpg', def:28   },
    { s:'fuelPrice',     label:'Fuel Price Per Gallon',    type:'range', min:1,     max:10,     step:0.05, cur:true, def:3.50  },
    { s:'mpg2',          label:'Vehicle 2 Fuel Economy (comparison)', type:'range', min:5, max:150, step:1, sfx:' mpg', def:45 },
  ],
  `      const gallons1     = milesPerYear / mpg1
      const annualCost1  = gallons1 * fuelPrice
      const costPerMile1 = annualCost1 / milesPerYear
      const gallons2     = milesPerYear / mpg2
      const annualCost2  = gallons2 * fuelPrice
      const annualSaving = annualCost1 - annualCost2
      const fiveYrSaving = annualSaving * 5
      return {
        annualCost1, costPerMile1: costPerMile1.toFixed(3),
        annualCost2, annualSaving, fiveYrSaving
      }`,
  [
    { label:'Vehicle 1 Annual Fuel Cost',   k:'annualCost1',   cur:true  },
    { label:'Vehicle 1 Cost Per Mile',       k:'costPerMile1',  cur:false },
    { label:'Vehicle 2 Annual Fuel Cost',   k:'annualCost2',   cur:true  },
    { label:'Annual Savings (V2 vs V1)',     k:'annualSaving',  cur:true  },
    { label:'5-Year Fuel Savings',           k:'fiveYrSaving',  cur:true  },
  ],
  [
    { q:'How do I calculate fuel cost per mile?', a:'Fuel cost per mile = Fuel price per gallon divided by MPG. At $3.50/gallon and 28 MPG: $3.50 / 28 = $0.125 per mile. For 15,000 miles/year that is $1,875 annually. The IRS standard mileage rate of $0.67/mile (2024) covers fuel plus depreciation, insurance and maintenance.' },
    { q:'How much do I save by switching to a more fuel efficient car?', a:'Upgrading from 25 MPG to 40 MPG at $3.50/gallon driving 15,000 miles/year saves about $788/year in fuel. Over 5 years that is $3,940 in fuel savings. Compare this to the premium price of a more efficient vehicle to calculate your payback period.' },
    { q:'How do electric vehicles compare on fuel cost?', a:'EVs cost roughly $0.03-$0.05 per mile in electricity vs $0.10-$0.15 per mile for gasoline cars. At 15,000 miles/year an EV saves $750-$1,500/year in fuel. However higher purchase price (though falling), charging infrastructure and range considerations affect total ownership cost comparison.' },
  ],
  [
    { href:'/car-loan-calculator',          icon:'🚗', name:'Car Loan' },
    { href:'/car-depreciation-calculator',  icon:'📉', name:'Car Depreciation' },
    { href:'/lease-vs-buy-calculator',      icon:'🔄', name:'Lease vs Buy' },
    { href:'/car-affordability-calculator', icon:'🚘', name:'Car Affordability' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 9. Down Payment Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('down-payment-calculator', page(
  'Down Payment Calculator',
  'Calculate how much down payment you need, how long to save it and the PMI impact.',
  '🏙️',
  [
    { s:'homePrice',      label:'Home Purchase Price',         type:'range', min:50000,  max:3000000, step:5000, cur:true, def:400000 },
    { s:'downPct',        label:'Target Down Payment %',       type:'select', def:20, opts:[{v:3,l:'3% (FHA min)'},{v:5,l:'5%'},{v:10,l:'10%'},{v:20,l:'20% (no PMI)'},{v:25,l:'25%'}] },
    { s:'currentSavings', label:'Current Savings',             type:'range', min:0,      max:500000,  step:1000, cur:true, def:20000  },
    { s:'monthlySave',    label:'Monthly Savings Rate',        type:'range', min:100,    max:10000,   step:100,  cur:true, def:1500   },
    { s:'returnRate',     label:'Savings Return Rate',         type:'range', min:0,      max:8,       step:0.25, pct:true, def:4.5   },
  ],
  `      const targetDown   = homePrice * (downPct / 100)
      const stillNeeded  = Math.max(0, targetDown - currentSavings)
      const r = returnRate / 100 / 12
      const monthsNeeded = stillNeeded <= 0 ? 0 :
        r === 0 ? Math.ceil(stillNeeded / monthlySave)
        : Math.ceil(Math.log(1 + stillNeeded * r / monthlySave) / Math.log(1 + r))
      const pmiMonthly   = downPct < 20 ? homePrice * 0.005 / 12 : 0
      const pmiTotal     = pmiMonthly * Math.max(0, (homePrice * 0.20 - (homePrice * downPct/100)) / (homePrice * 0.005 / 12))
      return { targetDown, stillNeeded, monthsNeeded: monthsNeeded + ' months', pmiMonthly, pmiTotal }`,
  [
    { label:'Down Payment Target',         k:'targetDown',     cur:true  },
    { label:'Still Need to Save',          k:'stillNeeded',    cur:true  },
    { label:'Time to Save Goal',           k:'monthsNeeded',   cur:false },
    { label:'Estimated Monthly PMI',       k:'pmiMonthly',     cur:true  },
    { label:'Total PMI Until 20% Equity',  k:'pmiTotal',       cur:true  },
  ],
  [
    { q:'How much down payment do I need to buy a house?', a:'Minimum down payments: Conventional loan 3-5%, FHA loan 3.5% (with 580+ credit score), VA loan 0% (veterans), USDA loan 0% (rural areas). Putting down 20% eliminates PMI, which can save $100-$300/month. A larger down payment also gives better mortgage rates and lower monthly payments.' },
    { q:'What is PMI and how do I avoid it?', a:'PMI (Private Mortgage Insurance) protects the lender if you default. It costs 0.3-1.5% of the loan annually (typically $100-$300/month). Avoid it by putting down 20%+, using a piggyback loan (80/10/10), or choosing a lender-paid PMI option (slightly higher rate). PMI can be cancelled once you reach 20% equity.' },
    { q:'Where should I save my down payment?', a:'Keep your down payment in safe, liquid accounts — not stocks. Best options: high-yield savings account (4-5% APY in 2026), money market account, short-term CDs, or I-bonds for portions you will not need for 1+ year. Never invest a down payment you will need within 2-3 years in the stock market.' },
  ],
  [
    { href:'/mortgage-calculator',            icon:'🏠', name:'Mortgage Calculator' },
    { href:'/home-affordability-calculator',  icon:'🏡', name:'Home Affordability' },
    { href:'/savings-goal-calculator',        icon:'🎯', name:'Savings Goal' },
    { href:'/rent-vs-buy-calculator',         icon:'🏘️', name:'Rent vs Buy' },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 10. Mortgage Points Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('mortgage-points-calculator', page(
  'Mortgage Points Calculator',
  'Calculate whether buying mortgage discount points saves money and how long to break even.',
  '📍',
  [
    { s:'loanAmount',    label:'Loan Amount',              type:'range', min:50000,  max:2000000, step:5000,  cur:true, def:350000 },
    { s:'baseRate',      label:'Base Interest Rate',       type:'range', min:2,      max:12,      step:0.125, pct:true, def:7.0    },
    { s:'pointsToBuy',   label:'Discount Points to Buy',   type:'range', min:0,      max:4,       step:0.25,  sfx:' pts', def:1    },
    { s:'rateReduction', label:'Rate Reduction Per Point', type:'range', min:0.1,    max:0.5,     step:0.05,  pct:true, def:0.25   },
    { s:'termYears',     label:'Loan Term',                type:'select', def:30, opts:[{v:15,l:'15 yrs'},{v:20,l:'20 yrs'},{v:30,l:'30 yrs'}] },
  ],
  `      const pointsCost   = loanAmount * (pointsToBuy / 100)
      const newRate      = baseRate - (pointsToBuy * rateReduction)
      const r1 = baseRate / 100 / 12
      const r2 = newRate  / 100 / 12
      const n  = termYears * 12
      const pmt1 = loanAmount * (r1 * Math.pow(1+r1,n)) / (Math.pow(1+r1,n)-1)
      const pmt2 = loanAmount * (r2 * Math.pow(1+r2,n)) / (Math.pow(1+r2,n)-1)
      const monthlySaving  = pmt1 - pmt2
      const breakEvenMonths = Math.ceil(pointsCost / monthlySaving)
      const lifetimeSaving = monthlySaving * n - pointsCost
      return {
        pointsCost, newRate: newRate.toFixed(3) + '%',
        monthlySaving, breakEvenMonths: breakEvenMonths + ' months', lifetimeSaving
      }`,
  [
    { label:'Cost of Points',          k:'pointsCost',      cur:true  },
    { label:'New Interest Rate',       k:'newRate',         cur:false },
    { label:'Monthly Payment Savings', k:'monthlySaving',   cur:true  },
    { label:'Break-Even Period',       k:'breakEvenMonths', cur:false },
    { label:'Lifetime Interest Saved', k:'lifetimeSaving',  cur:true  },
  ],
  [
    { q:'What are mortgage discount points?', a:'Mortgage points are upfront fees paid to the lender in exchange for a lower interest rate. One point = 1% of the loan amount. On a $350,000 loan, one point costs $3,500 and typically reduces the rate by 0.20-0.25%. Points make sense if you plan to keep the loan long enough to recoup the upfront cost via monthly savings.' },
    { q:'When is it worth buying mortgage points?', a:'Buying points is worth it when: your break-even period (cost divided by monthly savings) is less than how long you plan to keep the loan. If you will refinance or sell within 5 years, points rarely make sense. If you are in your forever home with a 30-year loan and have cash available, points can save tens of thousands.' },
    { q:'Are mortgage points tax deductible?', a:'Yes — for your primary residence, mortgage discount points are generally deductible as mortgage interest in the year of purchase (if buying a home) or amortised over the loan life (if refinancing). Consult a tax professional as rules vary based on loan purpose, amount and use. Points on rental properties are typically deductible over the loan life.' },
  ],
  [
    { href:'/mortgage-calculator',   icon:'🏠', name:'Mortgage Calculator' },
    { href:'/refinance-calculator',  icon:'🔄', name:'Refinance Calculator' },
    { href:'/amortization-calculator',icon:'📋', name:'Amortization' },
    { href:'/down-payment-calculator',icon:'🏙️', name:'Down Payment' },
  ]
))

console.log(`
════════════════════════════════════════════════════
  ✅  STAGE 4 COMPLETE — 10 calculators created
════════════════════════════════════════════════════
   1.  /hourly-to-salary-calculator
   2.  /salary-after-tax-calculator
   3.  /overtime-calculator
   4.  /cost-of-living-calculator
   5.  /moving-cost-calculator
   6.  /lease-vs-buy-calculator
   7.  /car-loan-calculator
   8.  /fuel-cost-calculator
   9.  /down-payment-calculator
  10.  /mortgage-points-calculator

  Deploy:
  git add .
  git commit -m "Stage 4: income and vehicle calculators"
  git push origin master:main
════════════════════════════════════════════════════
`)
