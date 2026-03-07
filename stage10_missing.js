/**
 * FreeFinCalc.net — STAGE 10: 21 More Missing Calculators
 * node stage10_missing.js
 *
 *  1.  boat-loan-calculator
 *  2.  commission-calculator
 *  3.  contractor-pay-calculator
 *  4.  credit-card-minimum-payment-calculator
 *  5.  credit-utilization-calculator
 *  6.  debt-avalanche-calculator
 *  7.  debt-payoff-time-calculator
 *  8.  debt-snowball-calculator
 *  9.  equipment-loan-calculator
 * 10.  fire-retirement-calculator
 * 11.  loan-interest-calculator
 * 12.  loan-payment-calculator
 * 13.  overtime-pay-calculator
 * 14.  passive-income-calculator
 * 15.  portfolio-growth-calculator
 * 16.  retirement-savings-calculator
 * 17.  rv-loan-calculator
 * 18.  salary-to-hourly-calculator
 * 19.  savings-growth-calculator
 * 20.  total-debt-calculator
 * 21.  truck-loan-calculator
 */

const fs = require('fs')
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }
function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅  app/' + dir)
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

// 1. Boat Loan Calculator
write('boat-loan-calculator', page(
  'Boat Loan Calculator',
  'Calculate monthly payments, total interest and true cost of financing a boat purchase.',
  '⛵',
  [
    { s:'boatPrice',   label:'Boat Price',               type:'range', min:1000,  max:2000000, step:500,  cur:true, def:50000 },
    { s:'downPayment', label:'Down Payment',             type:'range', min:0,     max:500000,  step:500,  cur:true, def:10000 },
    { s:'rate',        label:'Annual Interest Rate',     type:'range', min:1,     max:20,      step:0.25, pct:true, def:7.5   },
    { s:'termYears',   label:'Loan Term',                type:'select', def:15, opts:[{v:5,l:'5 yrs'},{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:20,l:'20 yrs'}] },
  ],
  `      const loan    = boatPrice - downPayment
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n
      const interest= total - loan
      const annualCost = monthly * 12 + boatPrice * 0.015
      return { loan, monthly, interest, total, annualCost }`,
  [
    { label:'Loan Amount',              k:'loan',       cur:true },
    { label:'Monthly Payment',          k:'monthly',    cur:true },
    { label:'Total Interest',           k:'interest',   cur:true },
    { label:'Total Loan Cost',          k:'total',      cur:true },
    { label:'Est. Annual Ownership Cost',k:'annualCost',cur:true },
  ],
  [
    { q:'What credit score do I need for a boat loan?', a:'Most lenders require 680+ for competitive boat loan rates. Below 680 you may still qualify but at higher rates (10-15%+). Marine lenders like Essex Credit, Southeast Financial, and credit unions often have more flexible requirements than banks. A larger down payment (20-30%) can compensate for a lower credit score.' },
    { q:'How much should I put down on a boat?', a:'Most lenders require 10-20% down on boat loans. Putting down 20%+ gets you the best rates, avoids being underwater on a depreciating asset, and lowers monthly payments significantly. Boats depreciate 10-20% in year one and 5-10% annually after that — similar to cars. Never finance 100% of a boat purchase.' },
    { q:'What are hidden costs of boat ownership?', a:'Annual ownership costs beyond the loan: marina slip or storage ($1,500-$10,000/year), insurance ($500-$2,000/year), fuel ($500-$5,000/year depending on use), maintenance ($500-$3,000/year), winterization, registration fees, and repairs. Budget 1.5-2% of boat value annually for maintenance and operating costs on top of loan payments.' },
  ],
  [
    { href:'/rv-loan-calculator',      icon:'🚐', name:'RV Loan'           },
    { href:'/car-loan-calculator',     icon:'🚗', name:'Car Loan'          },
    { href:'/personal-loan-calculator',icon:'👤', name:'Personal Loan'     },
    { href:'/loan-comparison-calculator',icon:'🔍',name:'Loan Comparison'  },
  ]
))

// 2. Commission Calculator
write('commission-calculator', page(
  'Commission Calculator',
  'Calculate commission earnings, take-home pay and annual income for any commission structure.',
  '💼',
  [
    { s:'salesAmount',   label:'Total Sales Amount',        type:'range', min:0,    max:10000000, step:1000, cur:true, def:100000 },
    { s:'commRate',      label:'Commission Rate',           type:'range', min:0,    max:50,       step:0.25, pct:true, def:5      },
    { s:'baseSalary',    label:'Base Salary (monthly)',     type:'range', min:0,    max:20000,    step:100,  cur:true, def:3000   },
    { s:'commType',      label:'Commission Structure',      type:'select', def:'flat', opts:[{v:'flat',l:'Flat Rate'},{v:'tiered',l:'Tiered (1.5x above quota)'},{v:'gross',l:'Gross Profit Only'}] },
    { s:'quota',         label:'Monthly Sales Quota',       type:'range', min:0,    max:1000000,  step:1000, cur:true, def:80000  },
    { s:'taxRate',       label:'Tax Rate Estimate',         type:'range', min:0,    max:45,       step:1,    pct:true, def:28     },
  ],
  `      let commission
      if (commType === 'flat') {
        commission = salesAmount * (commRate / 100)
      } else if (commType === 'tiered') {
        const base = Math.min(salesAmount, quota) * (commRate / 100)
        const bonus = Math.max(0, salesAmount - quota) * (commRate / 100) * 1.5
        commission = base + bonus
      } else {
        commission = salesAmount * 0.35 * (commRate / 100)
      }
      const grossMonthly = baseSalary + commission
      const annualGross  = grossMonthly * 12
      const afterTax     = grossMonthly * (1 - taxRate / 100)
      const annualNet    = afterTax * 12
      const commPct      = grossMonthly > 0 ? (commission / grossMonthly * 100).toFixed(1) + '%' : '0%'
      return { commission, grossMonthly, annualGross, afterTax, annualNet, commPct }`,
  [
    { label:'Commission Earned',         k:'commission',    cur:true  },
    { label:'Gross Monthly Income',      k:'grossMonthly',  cur:true  },
    { label:'Annual Gross Income',       k:'annualGross',   cur:true  },
    { label:'Monthly Take-Home',         k:'afterTax',      cur:true  },
    { label:'Annual Net Income',         k:'annualNet',     cur:true  },
    { label:'Commission as % of Pay',    k:'commPct',       cur:false },
  ],
  [
    { q:'How do tiered commission structures work?', a:'Tiered commissions pay higher rates as you hit higher sales levels. Example: 3% on first $50,000 in sales, 5% on $50,000-$100,000, and 8% above $100,000. This incentivizes exceeding quotas. Accelerator structures pay a multiplier (1.5x or 2x the base rate) on sales above quota — common in SaaS and enterprise sales roles.' },
    { q:'What is a good commission rate?', a:'Commission rates vary widely by industry: real estate 2.5-3% (of sale price), SaaS software 8-12% (of annual contract value), insurance 5-20% (first year premium), retail 1-5%, car sales $200-$500 flat per car, financial services 0.5-1% AUM, B2B sales 5-10%. The right rate depends on average deal size, sales cycle length, and how much base salary is included.' },
    { q:'Is it better to have high base or high commission?', a:'High base with low commission is better for: long sales cycles, complex enterprise deals, or if you value stability. High commission with low base is better for: transactional sales with short cycles, high-volume roles, or experienced sellers confident in their ability. Most top performers prefer uncapped commission plans where exceptional performance is directly rewarded.' },
  ],
  [
    { href:'/salary-after-tax-calculator', icon:'💵', name:'Salary After Tax'  },
    { href:'/hourly-to-salary-calculator', icon:'⏰', name:'Hourly to Salary'  },
    { href:'/freelance-rate-calculator',   icon:'🎯', name:'Freelance Rate'    },
    { href:'/raise-calculator',            icon:'📈', name:'Raise Calculator'  },
  ]
))

// 3. Contractor Pay Calculator
write('contractor-pay-calculator', page(
  'Contractor Pay Calculator',
  'Calculate contractor hourly rate, take-home pay and equivalent salary after self-employment tax.',
  '🔧',
  [
    { s:'hourlyRate',    label:'Contractor Hourly Rate',    type:'range', min:10,   max:500,    step:5,    cur:true, def:75    },
    { s:'hoursPerWeek',  label:'Hours Per Week',            type:'range', min:1,    max:60,     step:1,    sfx:' hrs', def:40  },
    { s:'weeksPerYear',  label:'Billable Weeks Per Year',   type:'range', min:20,   max:52,     step:1,    sfx:' wks', def:48  },
    { s:'expenses',      label:'Annual Business Expenses',  type:'range', min:0,    max:50000,  step:250,  cur:true, def:5000  },
    { s:'taxRate',       label:'Income Tax Rate',           type:'range', min:0,    max:45,     step:1,    pct:true, def:22    },
  ],
  `      const grossAnnual    = hourlyRate * hoursPerWeek * weeksPerYear
      const netProfit      = grossAnnual - expenses
      const seTax          = netProfit * 0.9235 * 0.153
      const seDeduction    = seTax / 2
      const taxableIncome  = netProfit - seDeduction
      const incomeTax      = taxableIncome * (taxRate / 100)
      const totalTax       = seTax + incomeTax
      const takeHome       = grossAnnual - expenses - totalTax
      const effectiveRate  = (totalTax / grossAnnual * 100).toFixed(1) + '%'
      const monthlyTakeHome = takeHome / 12
      const equivSalary    = takeHome / 0.72
      return { grossAnnual, netProfit, seTax, incomeTax, takeHome, monthlyTakeHome, effectiveRate, equivSalary }`,
  [
    { label:'Annual Gross Revenue',       k:'grossAnnual',    cur:true  },
    { label:'Net Profit After Expenses',  k:'netProfit',      cur:true  },
    { label:'Self-Employment Tax',        k:'seTax',          cur:true  },
    { label:'Income Tax',                 k:'incomeTax',      cur:true  },
    { label:'Annual Take-Home Pay',       k:'takeHome',       cur:true  },
    { label:'Monthly Take-Home',          k:'monthlyTakeHome',cur:true  },
    { label:'Effective Tax Rate',         k:'effectiveRate',  cur:false },
    { label:'Equivalent Employee Salary', k:'equivSalary',    cur:true  },
  ],
  [
    { q:'How much more should a contractor charge vs an employee salary?', a:'Contractors should charge 1.4-1.6x the equivalent employee hourly rate to break even. As a contractor you pay both halves of FICA (15.3%), receive no benefits (health insurance $500-$700/month), no paid time off, no 401k match, and must cover your own equipment and software. Divide your target take-home by 0.65 to account for taxes, then add benefit costs.' },
    { q:'How do I set my contractor hourly rate?', a:'Formula: (Target annual salary + benefits value + business expenses + taxes) / billable hours. On a $100,000 target salary: add $15,000 benefits, $5,000 expenses, $30,000 taxes = $150,000 needed. Divide by 1,920 billable hours = $78/hour minimum. Research market rates on Glassdoor, LinkedIn Salary, and industry surveys to validate competitiveness.' },
    { q:'Should I form an LLC as a contractor?', a:'An LLC provides personal liability protection and potential tax benefits. With a single-member LLC taxed as sole proprietor, tax treatment is identical to freelancing. An S-Corp election (typically worth it above $60,000-$80,000 net profit) lets you split income between salary and distributions, potentially saving $5,000-$15,000 in SE tax annually. Consult a CPA before electing S-Corp status.' },
  ],
  [
    { href:'/self-employment-tax-calculator',icon:'🧾',name:'SE Tax'           },
    { href:'/freelance-rate-calculator',     icon:'🎯',name:'Freelance Rate'    },
    { href:'/invoice-calculator',            icon:'📄',name:'Invoice'          },
    { href:'/hourly-to-salary-calculator',   icon:'⏰',name:'Hourly to Salary' },
  ]
))

// 4. Credit Card Minimum Payment Calculator
write('credit-card-minimum-payment-calculator', page(
  'Credit Card Minimum Payment Calculator',
  'See how long minimum payments take to pay off your credit card and how much interest you pay.',
  '💳',
  [
    { s:'balance',    label:'Credit Card Balance',        type:'range', min:100,  max:100000, step:100,  cur:true, def:5000  },
    { s:'apr',        label:'Credit Card APR',            type:'range', min:1,    max:36,     step:0.25, pct:true, def:22    },
    { s:'minPctType', label:'Minimum Payment Type',       type:'select', def:'pct', opts:[{v:'pct',l:'% of Balance (typical)'},{v:'fixed',l:'Fixed Amount'}] },
    { s:'minPct',     label:'Minimum Payment % or Amount',type:'range', min:1,    max:5,      step:0.25, pct:true, def:2     },
  ],
  `      const r = apr / 100 / 12
      let bal = balance
      let months = 0
      let totalPaid = 0
      const minFloor = 25
      while (bal > 0.01 && months < 1200) {
        const interest = bal * r
        const minPmt = minPctType === 'pct'
          ? Math.max(minFloor, bal * (minPct / 100))
          : Math.max(minFloor, minPct)
        const payment = Math.min(bal + interest, minPmt)
        bal = bal + interest - payment
        totalPaid += payment
        months++
        if (months > 1200) break
      }
      const totalInterest = totalPaid - balance
      const years = (months / 12).toFixed(1)
      // Fixed payment comparison
      const fixedPmt = balance * 0.03
      const rFixed = r
      const monthsFixed = Math.ceil(-Math.log(1 - balance * rFixed / fixedPmt) / Math.log(1 + rFixed))
      const interestFixed = fixedPmt * monthsFixed - balance
      return {
        months: months + ' months',
        years: years + ' years',
        totalInterest,
        totalPaid,
        interestFixed,
        monthsSaved: (months - monthsFixed) + ' months'
      }`,
  [
    { label:'Payoff Time (minimum)',      k:'months',       cur:false },
    { label:'Payoff Time in Years',       k:'years',        cur:false },
    { label:'Total Interest Paid',        k:'totalInterest',cur:true  },
    { label:'Total Amount Paid',          k:'totalPaid',    cur:true  },
    { label:'Interest at Fixed 3% Pmt',  k:'interestFixed',cur:true  },
    { label:'Time Saved at Fixed 3%',    k:'monthsSaved',  cur:false },
  ],
  [
    { q:'Why does paying only the minimum take so long?', a:'Minimum payments are typically 1-2% of your balance, barely covering interest. At 22% APR on a $5,000 balance, the first minimum payment is about $100 — but $92 of that is interest, leaving only $8 reducing the principal. As the balance slowly drops, so does the minimum payment, extending payoff to 20-30 years and costing 2-3x the original balance in interest.' },
    { q:'What is the fastest way to pay off credit card debt?', a:'Pay as much above the minimum as possible every month. Even doubling your minimum payment dramatically cuts payoff time and interest. Use the debt avalanche (highest APR first) or debt snowball (smallest balance first) method if you have multiple cards. Stop using the card for new purchases while paying it off. Consider a 0% balance transfer to stop interest accumulation.' },
    { q:'Does paying minimum hurt my credit score?', a:'Paying the minimum keeps your account in good standing and avoids late fees — it does not directly hurt your score. However it keeps your credit utilization high (ideally under 30%), which does negatively impact your score. Carrying high balances relative to your limit is the second most important credit score factor after payment history.' },
  ],
  [
    { href:'/credit-card-payoff-calculator', icon:'💳', name:'Card Payoff'       },
    { href:'/balance-transfer-calculator',   icon:'🔄', name:'Balance Transfer'  },
    { href:'/debt-payoff-calculator',        icon:'🎯', name:'Debt Payoff'       },
    { href:'/credit-utilization-calculator', icon:'📊', name:'Credit Utilization'},
  ]
))

// 5. Credit Utilization Calculator
write('credit-utilization-calculator', page(
  'Credit Utilization Calculator',
  'Calculate your credit utilization ratio and see how it impacts your credit score.',
  '📊',
  [
    { s:'balance1',  label:'Card 1 Balance',              type:'range', min:0,    max:50000, step:50,   cur:true, def:2000  },
    { s:'limit1',    label:'Card 1 Credit Limit',         type:'range', min:100,  max:100000,step:100,  cur:true, def:8000  },
    { s:'balance2',  label:'Card 2 Balance',              type:'range', min:0,    max:50000, step:50,   cur:true, def:500   },
    { s:'limit2',    label:'Card 2 Credit Limit',         type:'range', min:0,    max:100000,step:100,  cur:true, def:5000  },
    { s:'balance3',  label:'Card 3 Balance',              type:'range', min:0,    max:50000, step:50,   cur:true, def:0     },
    { s:'limit3',    label:'Card 3 Credit Limit',         type:'range', min:0,    max:100000,step:100,  cur:true, def:3000  },
  ],
  `      const totalBal   = balance1 + balance2 + balance3
      const totalLimit = limit1 + limit2 + limit3
      const overallUtil = totalLimit > 0 ? (totalBal / totalLimit * 100).toFixed(1) + '%' : '0%'
      const util1 = limit1 > 0 ? (balance1 / limit1 * 100).toFixed(1) + '%' : 'N/A'
      const util2 = limit2 > 0 ? (balance2 / limit2 * 100).toFixed(1) + '%' : 'N/A'
      const util3 = limit3 > 0 ? (balance3 / limit3 * 100).toFixed(1) + '%' : 'N/A'
      const utilPct = parseFloat(overallUtil)
      const scoreImpact = utilPct <= 10 ? 'Excellent (under 10%)' : utilPct <= 30 ? 'Good (under 30%)' : utilPct <= 50 ? 'Fair (30-50%)' : 'Poor (above 50%)'
      const targetBalance = totalLimit * 0.10
      const paydownNeeded = Math.max(0, totalBal - targetBalance)
      return { totalBal, totalLimit, overallUtil, util1, util2, util3, scoreImpact, paydownNeeded }`,
  [
    { label:'Total Balances',             k:'totalBal',      cur:true  },
    { label:'Total Credit Limits',        k:'totalLimit',    cur:true  },
    { label:'Overall Utilization',        k:'overallUtil',   cur:false },
    { label:'Card 1 Utilization',         k:'util1',         cur:false },
    { label:'Card 2 Utilization',         k:'util2',         cur:false },
    { label:'Card 3 Utilization',         k:'util3',         cur:false },
    { label:'Credit Score Impact',        k:'scoreImpact',   cur:false },
    { label:'Pay Down to Reach 10%',      k:'paydownNeeded', cur:true  },
  ],
  [
    { q:'What is a good credit utilization ratio?', a:'Under 30% is the widely cited guideline, but under 10% is ideal for maximum credit score benefit. Credit utilization accounts for about 30% of your FICO score — the second most important factor after payment history. At 0% utilization (no balances reported) some scoring models may actually score slightly lower than at 1-5% utilization.' },
    { q:'How quickly does paying down balances improve credit score?', a:'Credit card balances are typically reported to credit bureaus once per month on your statement closing date. Once your lower balance is reported, your score can improve within 30-45 days. Paying down high utilization cards is one of the fastest ways to improve your score — some people see 20-50 point improvements within one to two billing cycles.' },
    { q:'Does requesting a credit limit increase help utilization?', a:'Yes — a higher limit with the same balance lowers utilization immediately. Example: $2,000 balance on $5,000 limit = 40% utilization. After a $10,000 limit increase: $2,000 / $15,000 = 13% utilization. However requesting a limit increase may trigger a hard inquiry (-5 points temporarily). The net effect is usually positive if you do not increase spending.' },
  ],
  [
    { href:'/credit-card-minimum-payment-calculator',icon:'💳',name:'Min Payment'       },
    { href:'/credit-card-payoff-calculator',icon:'💳',name:'Card Payoff'          },
    { href:'/debt-payoff-calculator',       icon:'🎯',name:'Debt Payoff'          },
    { href:'/net-worth-calculator',         icon:'💰',name:'Net Worth'            },
  ]
))

// 6. Debt Avalanche Calculator
write('debt-avalanche-calculator', page(
  'Debt Avalanche Calculator',
  'Pay off debts in highest-interest-rate order to minimize total interest paid.',
  '🏔️',
  [
    { s:'debt1Bal',   label:'Debt 1 Balance',             type:'range', min:0,   max:100000, step:100,  cur:true, def:5000  },
    { s:'debt1Rate',  label:'Debt 1 APR',                 type:'range', min:0,   max:40,     step:0.25, pct:true, def:24    },
    { s:'debt2Bal',   label:'Debt 2 Balance',             type:'range', min:0,   max:100000, step:100,  cur:true, def:8000  },
    { s:'debt2Rate',  label:'Debt 2 APR',                 type:'range', min:0,   max:40,     step:0.25, pct:true, def:18    },
    { s:'debt3Bal',   label:'Debt 3 Balance',             type:'range', min:0,   max:100000, step:100,  cur:true, def:12000 },
    { s:'debt3Rate',  label:'Debt 3 APR',                 type:'range', min:0,   max:40,     step:0.25, pct:true, def:7     },
    { s:'extraPmt',   label:'Extra Monthly Payment',      type:'range', min:0,   max:5000,   step:25,   cur:true, def:200   },
  ],
  `      const debts = [
        { bal: debt1Bal, rate: debt1Rate, min: Math.max(25, debt1Bal * 0.02) },
        { bal: debt2Bal, rate: debt2Rate, min: Math.max(25, debt2Bal * 0.02) },
        { bal: debt3Bal, rate: debt3Rate, min: Math.max(25, debt3Bal * 0.02) },
      ].filter(d => d.bal > 0).sort((a,b) => b.rate - a.rate)
      const totalMin = debts.reduce((s,d) => s + d.min, 0)
      const totalMonthly = totalMin + extraPmt
      let bals = debts.map(d => d.bal)
      let months = 0, totalInterest = 0
      while (bals.some(b => b > 0.01) && months < 600) {
        let remaining = totalMonthly
        for (let i = 0; i < debts.length; i++) {
          if (bals[i] <= 0) continue
          const int = bals[i] * debts[i].rate / 100 / 12
          totalInterest += int
          const pmt = i === 0 ? Math.min(bals[i] + int, remaining) : Math.min(bals[i] + int, debts[i].min)
          bals[i] = bals[i] + int - pmt
          remaining -= pmt
          if (bals[i] <= 0) bals[i] = 0
        }
        months++
      }
      const totalDebt = debt1Bal + debt2Bal + debt3Bal
      return { totalDebt, months: months + ' months', totalInterest, totalMonthly, years: (months/12).toFixed(1) + ' years' }`,
  [
    { label:'Total Debt',                k:'totalDebt',    cur:true  },
    { label:'Payoff Time',               k:'months',       cur:false },
    { label:'Payoff Time in Years',      k:'years',        cur:false },
    { label:'Total Interest Paid',       k:'totalInterest',cur:true  },
    { label:'Total Monthly Payment',     k:'totalMonthly', cur:true  },
  ],
  [
    { q:'What is the debt avalanche method?', a:'The debt avalanche method prioritizes paying off the debt with the highest interest rate first while paying minimums on all others. Once the highest-rate debt is eliminated, roll that payment to the next highest rate. This is mathematically optimal — it minimizes total interest paid and total time to debt freedom compared to any other payoff order.' },
    { q:'Avalanche vs snowball: which saves more money?', a:'The avalanche method almost always saves more money in interest. On $25,000 of mixed debt, the avalanche can save $1,000-$5,000 in interest compared to the snowball depending on the rate differences and balances. The snowball provides faster psychological wins (eliminating accounts sooner) which some research suggests leads to higher completion rates despite the higher total cost.' },
    { q:'How do I stay motivated with the avalanche method?', a:'Track your progress visually — graph your debt balances weekly. Celebrate when each debt hits zero even if it takes longer. Calculate your net worth monthly so you can see the overall improvement. Set a reward for completing the payoff. Consider hybrid approaches: use avalanche order but start with one small quick win to build momentum.' },
  ],
  [
    { href:'/debt-snowball-calculator',  icon:'❄️', name:'Debt Snowball'    },
    { href:'/debt-payoff-calculator',    icon:'🎯', name:'Debt Payoff'      },
    { href:'/debt-consolidation-calculator',icon:'🔗',name:'Debt Consolidation'},
    { href:'/budget-planner-calculator', icon:'📋', name:'Budget Planner'   },
  ]
))

// 7. Debt Payoff Time Calculator
write('debt-payoff-time-calculator', page(
  'Debt Payoff Time Calculator',
  'Calculate exactly how long it will take to pay off any debt at your current payment level.',
  '⏱️',
  [
    { s:'balance',    label:'Current Balance',             type:'range', min:100,   max:500000, step:100,  cur:true, def:15000 },
    { s:'apr',        label:'Annual Interest Rate (APR)',  type:'range', min:0,     max:36,     step:0.25, pct:true, def:18    },
    { s:'monthlyPmt', label:'Monthly Payment',             type:'range', min:10,    max:20000,  step:10,   cur:true, def:350   },
  ],
  `      const r = apr / 100 / 12
      if (r > 0 && monthlyPmt <= balance * r) {
        return { months: 'Never (payment too low)', years: 'Increase payment', totalInterest: 0, totalPaid: 0, minRequired: Math.ceil(balance * r + 1) }
      }
      const months = r > 0
        ? Math.ceil(-Math.log(1 - balance * r / monthlyPmt) / Math.log(1 + r))
        : Math.ceil(balance / monthlyPmt)
      const totalPaid = monthlyPmt * months
      const totalInterest = totalPaid - balance
      const years = (months / 12).toFixed(1)
      const minRequired = Math.ceil(balance * r + 1)
      return { months: months + ' months', years: years + ' years', totalInterest, totalPaid, minRequired }`,
  [
    { label:'Time to Pay Off',           k:'months',        cur:false },
    { label:'Time in Years',             k:'years',         cur:false },
    { label:'Total Interest Paid',       k:'totalInterest', cur:true  },
    { label:'Total Amount Paid',         k:'totalPaid',     cur:true  },
    { label:'Minimum Payment Required',  k:'minRequired',   cur:true  },
  ],
  [
    { q:'What happens if my payment is too low to pay off the debt?', a:'If your monthly payment is less than or equal to the monthly interest charge, your balance never decreases — it actually grows. At 18% APR on $15,000, monthly interest is $225. If you pay only $200/month, you fall $25 further behind every month. You must pay more than the interest charge to make progress. Contact your lender about hardship programs if this is your situation.' },
    { q:'How can I calculate the minimum payment needed?', a:'Minimum payment to avoid growing balance = Balance x (APR / 12). On $15,000 at 18% APR: $15,000 x 0.015 = $225/month minimum just to break even. To actually pay it off in a reasonable time, you need to pay significantly above this. Use this calculator to find exactly when different payment amounts will free you from the debt.' },
    { q:'What is the psychological impact of a payoff date?', a:'Having a specific payoff date dramatically increases debt repayment success. Research shows people with concrete goals and timelines are 2-3x more likely to complete debt payoff than those with vague intentions. Set a calendar reminder for your payoff date, automate your payments so the decision is removed from your monthly routine, and track the countdown to stay motivated.' },
  ],
  [
    { href:'/debt-payoff-calculator',    icon:'🎯', name:'Debt Payoff'      },
    { href:'/credit-card-payoff-calculator',icon:'💳',name:'Card Payoff'    },
    { href:'/debt-avalanche-calculator', icon:'🏔️', name:'Debt Avalanche'   },
    { href:'/debt-snowball-calculator',  icon:'❄️', name:'Debt Snowball'    },
  ]
))

// 8. Debt Snowball Calculator
write('debt-snowball-calculator', page(
  'Debt Snowball Calculator',
  'Pay off smallest debts first to build momentum and eliminate accounts faster.',
  '❄️',
  [
    { s:'debt1Bal',   label:'Debt 1 Balance (smallest)',   type:'range', min:0,   max:100000, step:100,  cur:true, def:1500  },
    { s:'debt1Rate',  label:'Debt 1 APR',                  type:'range', min:0,   max:40,     step:0.25, pct:true, def:15    },
    { s:'debt2Bal',   label:'Debt 2 Balance',              type:'range', min:0,   max:100000, step:100,  cur:true, def:5000  },
    { s:'debt2Rate',  label:'Debt 2 APR',                  type:'range', min:0,   max:40,     step:0.25, pct:true, def:22    },
    { s:'debt3Bal',   label:'Debt 3 Balance (largest)',    type:'range', min:0,   max:100000, step:100,  cur:true, def:12000 },
    { s:'debt3Rate',  label:'Debt 3 APR',                  type:'range', min:0,   max:40,     step:0.25, pct:true, def:18    },
    { s:'extraPmt',   label:'Extra Monthly Payment',       type:'range', min:0,   max:5000,   step:25,   cur:true, def:200   },
  ],
  `      const debts = [
        { bal: debt1Bal, rate: debt1Rate, min: Math.max(25, debt1Bal * 0.02) },
        { bal: debt2Bal, rate: debt2Rate, min: Math.max(25, debt2Bal * 0.02) },
        { bal: debt3Bal, rate: debt3Rate, min: Math.max(25, debt3Bal * 0.02) },
      ].filter(d => d.bal > 0).sort((a,b) => a.bal - b.bal)
      const totalMin = debts.reduce((s,d) => s + d.min, 0)
      const totalMonthly = totalMin + extraPmt
      let bals = debts.map(d => d.bal)
      let months = 0, totalInterest = 0
      while (bals.some(b => b > 0.01) && months < 600) {
        let remaining = totalMonthly
        for (let i = 0; i < debts.length; i++) {
          if (bals[i] <= 0) continue
          const int = bals[i] * debts[i].rate / 100 / 12
          totalInterest += int
          const pmt = i === 0 ? Math.min(bals[i] + int, remaining) : Math.min(bals[i] + int, debts[i].min)
          bals[i] = bals[i] + int - pmt
          remaining -= pmt
          if (bals[i] <= 0) bals[i] = 0
        }
        months++
      }
      const totalDebt = debt1Bal + debt2Bal + debt3Bal
      return { totalDebt, months: months + ' months', totalInterest, totalMonthly, years: (months/12).toFixed(1) + ' years' }`,
  [
    { label:'Total Debt',                k:'totalDebt',    cur:true  },
    { label:'Payoff Time',               k:'months',       cur:false },
    { label:'Payoff Time in Years',      k:'years',        cur:false },
    { label:'Total Interest Paid',       k:'totalInterest',cur:true  },
    { label:'Total Monthly Payment',     k:'totalMonthly', cur:true  },
  ],
  [
    { q:'How does the debt snowball work?', a:'List all debts smallest to largest balance. Pay minimums on everything, then throw every extra dollar at the smallest balance. When that debt is paid off, take the entire payment (minimum + extra) and add it to the next smallest debt. Each payoff accelerates the next one like a growing snowball. You eliminate accounts quickly which builds psychological momentum.' },
    { q:'Is the snowball or avalanche method better?', a:'Mathematically the avalanche saves more money. Behaviorally the snowball may work better for many people. Dave Ramsey popularized the snowball because real people need motivation to stick with a debt payoff plan for years. Research from Harvard Business Review found snowball users were more likely to pay off all their debt than avalanche users, despite paying more in interest.' },
    { q:'How long does the debt snowball take?', a:'Payoff time depends on total debt, interest rates, and how much extra you can pay monthly. The single biggest factor is your extra monthly payment. Even $100-$200 extra per month dramatically accelerates payoff. With $200/month extra on $18,500 of debt at average 18% APR, the snowball pays off in roughly 4 years vs 9+ years paying minimums only.' },
  ],
  [
    { href:'/debt-avalanche-calculator', icon:'🏔️', name:'Debt Avalanche'    },
    { href:'/debt-payoff-calculator',    icon:'🎯', name:'Debt Payoff'       },
    { href:'/debt-consolidation-calculator',icon:'🔗',name:'Consolidation'   },
    { href:'/budget-planner-calculator', icon:'📋', name:'Budget Planner'    },
  ]
))

// 9. Equipment Loan Calculator
write('equipment-loan-calculator', page(
  'Equipment Loan Calculator',
  'Calculate monthly payments and total cost for financing business or personal equipment.',
  '⚙️',
  [
    { s:'equipCost',  label:'Equipment Cost',              type:'range', min:1000,  max:2000000, step:500,  cur:true, def:50000 },
    { s:'downPmt',    label:'Down Payment',                type:'range', min:0,     max:500000,  step:500,  cur:true, def:10000 },
    { s:'rate',       label:'Annual Interest Rate',        type:'range', min:1,     max:20,      step:0.25, pct:true, def:7     },
    { s:'termYears',  label:'Loan Term',                   type:'select', def:5, opts:[{v:2,l:'2 yrs'},{v:3,l:'3 yrs'},{v:5,l:'5 yrs'},{v:7,l:'7 yrs'},{v:10,l:'10 yrs'}] },
    { s:'taxBenefit', label:'Tax Bracket (for deduction)', type:'range', min:0,     max:40,      step:1,    pct:true, def:25    },
  ],
  `      const loan    = equipCost - downPmt
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n + downPmt
      const interest= monthly * n - loan
      // Section 179 deduction benefit (full cost deductible in year 1)
      const taxSaving = equipCost * (taxBenefit / 100)
      const netCost  = total - taxSaving
      return { loan, monthly, interest, total, taxSaving, netCost }`,
  [
    { label:'Loan Amount',               k:'loan',      cur:true },
    { label:'Monthly Payment',           k:'monthly',   cur:true },
    { label:'Total Interest',            k:'interest',  cur:true },
    { label:'Total Cost',                k:'total',     cur:true },
    { label:'Sec 179 Tax Saving (est.)', k:'taxSaving', cur:true },
    { label:'Net Cost After Tax Benefit',k:'netCost',   cur:true },
  ],
  [
    { q:'What is Section 179 equipment deduction?', a:'Section 179 allows businesses to deduct the full purchase price of qualifying equipment in the year of purchase rather than depreciating it over years. In 2024 the limit is $1,160,000 of equipment with a phase-out starting at $2,890,000. This can create significant first-year tax savings — a $50,000 equipment purchase at 25% tax rate saves $12,500 in taxes in year one.' },
    { q:'Equipment loan vs equipment lease: which is better?', a:'Buy (loan) when: you will use the equipment for its full useful life, it holds value, and you want the Section 179 deduction upfront. Lease when: you need to upgrade frequently (technology equipment), you want lower monthly payments, or you want off-balance-sheet financing. Operating leases also allow full deduction of lease payments as business expenses.' },
    { q:'What types of equipment qualify for financing?', a:'Virtually any business equipment qualifies: heavy machinery, construction equipment, medical equipment, restaurant equipment, IT and technology, vehicles, manufacturing equipment, agricultural equipment, and office furniture. Most lenders require the equipment to have a useful life matching or exceeding the loan term. Used equipment typically qualifies for shorter terms.' },
  ],
  [
    { href:'/business-loan-calculator',  icon:'🏦', name:'Business Loan'    },
    { href:'/sba-loan-calculator',       icon:'🏛️', name:'SBA Loan'         },
    { href:'/startup-cost-calculator',   icon:'🚀', name:'Startup Cost'     },
    { href:'/loan-comparison-calculator',icon:'🔍', name:'Loan Comparison'  },
  ]
))

// 10. FIRE Retirement Calculator
write('fire-retirement-calculator', page(
  'FIRE Retirement Calculator',
  'Calculate your Financial Independence number and exact age you can retire early.',
  '🔥',
  [
    { s:'currentAge',    label:'Current Age',               type:'range', min:18,   max:60,     step:1,    sfx:' yrs', def:30  },
    { s:'annualExpenses',label:'Expected Annual Expenses',  type:'range', min:10000,max:300000, step:1000, cur:true, def:45000  },
    { s:'currentSavings',label:'Current Investments',       type:'range', min:0,    max:5000000,step:5000, cur:true, def:80000  },
    { s:'annualSavings', label:'Annual Savings Amount',     type:'range', min:0,    max:300000, step:1000, cur:true, def:25000  },
    { s:'returnRate',    label:'Expected Annual Return',    type:'range', min:1,    max:15,     step:0.25, pct:true, def:7      },
  ],
  `      const fireNumber   = annualExpenses * 25
      const remaining    = Math.max(0, fireNumber - currentSavings)
      const r            = returnRate / 100
      const rMonthly     = Math.pow(1 + r, 1/12) - 1
      const monthlyContrib = annualSavings / 12
      const yearsToFire  = rMonthly > 0 && remaining > 0
        ? Math.log(1 + remaining * rMonthly / monthlyContrib) / Math.log(1 + rMonthly) / 12
        : remaining / annualSavings
      const fireAge      = (currentAge + yearsToFire).toFixed(1)
      const monthlyIncome = fireNumber * 0.04 / 12
      return {
        fireNumber,
        remaining,
        yearsToFire: yearsToFire.toFixed(1) + ' years',
        fireAge: fireAge + ' years old',
        monthlyIncome
      }`,
  [
    { label:'FIRE Number (25x expenses)', k:'fireNumber',   cur:true  },
    { label:'Amount Still Needed',        k:'remaining',    cur:true  },
    { label:'Years Until FIRE',           k:'yearsToFire',  cur:false },
    { label:'Age at FIRE',                k:'fireAge',      cur:false },
    { label:'Monthly Income at FIRE',     k:'monthlyIncome',cur:true  },
  ],
  [
    { q:'What age can I retire early with the FIRE method?', a:'FIRE retirement age depends entirely on your savings rate. Saving 10% of income typically reaches FIRE at traditional retirement age. Saving 25% reaches FIRE around age 55-60. Saving 50% can reach FIRE in your 40s. Saving 70%+ can reach FIRE in your 30s. The formula: FIRE Number (25x annual expenses) divided by annual savings rate determines the timeline.' },
    { q:'What is the 4% safe withdrawal rate?', a:'The 4% rule comes from the Trinity Study (1998) which found a 4% annual withdrawal from a diversified stock/bond portfolio historically lasted 30+ years in 95% of historical scenarios. For early retirees with 40-50 year horizons, many FIRE advocates use 3-3.5% to add margin of safety. Your FIRE number = Annual expenses / withdrawal rate.' },
    { q:'What happens to healthcare before Medicare at age 65?', a:'This is a major FIRE planning consideration. Options: ACA marketplace plans (subsidized based on income — low withdrawal income can qualify for heavy subsidies), COBRA from last employer (expensive, 18 months only), spouse employer coverage, health sharing ministries, or part-time work with benefits (Barista FIRE). Budget $500-$1,500/month for healthcare premiums pre-Medicare.' },
  ],
  [
    { href:'/fire-calculator',            icon:'🔥', name:'FIRE Calculator'  },
    { href:'/retirement-calculator',      icon:'🌅', name:'Retirement'       },
    { href:'/savings-goal-calculator',    icon:'🎯', name:'Savings Goal'     },
    { href:'/investment-return-calculator',icon:'📈',name:'Investment Return'},
  ]
))

// 11. Loan Interest Calculator
write('loan-interest-calculator', page(
  'Loan Interest Calculator',
  'Calculate total interest paid on any loan and compare simple vs compound interest.',
  '💸',
  [
    { s:'principal',  label:'Loan Principal',              type:'range', min:100,  max:2000000, step:100,  cur:true, def:20000 },
    { s:'rate',       label:'Annual Interest Rate',        type:'range', min:0,    max:36,      step:0.25, pct:true, def:8     },
    { s:'termYears',  label:'Loan Term',                   type:'range', min:1,    max:30,      step:1,    sfx:' yrs', def:5   },
    { s:'intType',    label:'Interest Type',               type:'select', def:'compound', opts:[{v:'compound',l:'Compound (amortizing)'},{v:'simple',l:'Simple Interest'}] },
  ],
  `      const r = rate / 100 / 12
      const n = termYears * 12
      let monthly, totalInterest, totalPaid
      if (intType === 'compound') {
        monthly      = principal * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
        totalPaid    = monthly * n
        totalInterest = totalPaid - principal
      } else {
        totalInterest = principal * (rate / 100) * termYears
        totalPaid     = principal + totalInterest
        monthly       = totalPaid / n
      }
      const interestPct = (totalInterest / principal * 100).toFixed(1) + '%'
      const firstMonthInterest = principal * r
      return { monthly, totalInterest, totalPaid, interestPct, firstMonthInterest }`,
  [
    { label:'Monthly Payment',              k:'monthly',           cur:true  },
    { label:'Total Interest Paid',          k:'totalInterest',     cur:true  },
    { label:'Total Amount Paid',            k:'totalPaid',         cur:true  },
    { label:'Interest as % of Principal',   k:'interestPct',       cur:false },
    { label:'First Month Interest Charge',  k:'firstMonthInterest',cur:true  },
  ],
  [
    { q:'What is the difference between APR and interest rate?', a:'The interest rate is the cost of borrowing the principal only. APR (Annual Percentage Rate) includes the interest rate plus fees (origination fees, closing costs, etc.) expressed as a yearly rate. APR is always equal to or higher than the interest rate. When comparing loan offers always compare APRs, not just interest rates, for a true apples-to-apples comparison.' },
    { q:'How does compound interest work on a loan?', a:'On an amortizing loan (mortgage, car loan, personal loan), interest compounds monthly. Each payment covers that month interest first, then the remainder reduces the principal. Early in the loan, most of each payment is interest. As the balance decreases, more goes to principal. This is why extra early payments are so powerful — they reduce the principal that future interest is calculated on.' },
    { q:'What factors most affect total interest paid?', a:'The three biggest factors in order of impact: (1) Interest rate — a 1% rate difference on a $200,000 mortgage over 30 years changes total interest by $40,000+. (2) Loan term — a 30-year vs 15-year mortgage at the same rate roughly doubles total interest paid. (3) Loan amount — every dollar borrowed costs more than a dollar to repay. A larger down payment saves disproportionately in total interest.' },
  ],
  [
    { href:'/loan-comparison-calculator',  icon:'🔍', name:'Loan Comparison'  },
    { href:'/apr-calculator',              icon:'📊', name:'APR Calculator'   },
    { href:'/amortization-calculator',     icon:'📋', name:'Amortization'     },
    { href:'/simple-interest-calculator',  icon:'📐', name:'Simple Interest'  },
  ]
))

// 12. Loan Payment Calculator
write('loan-payment-calculator', page(
  'Loan Payment Calculator',
  'Calculate monthly loan payments for any loan amount, interest rate and term.',
  '📋',
  [
    { s:'principal',  label:'Loan Amount',                 type:'range', min:100,  max:2000000, step:100,  cur:true, def:25000 },
    { s:'rate',       label:'Annual Interest Rate',        type:'range', min:0,    max:36,      step:0.25, pct:true, def:7.5   },
    { s:'termMonths', label:'Loan Term',                   type:'select', def:60, opts:[{v:12,l:'12 mo'},{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:72,l:'72 mo'},{v:84,l:'84 mo'},{v:120,l:'120 mo'},{v:180,l:'180 mo'},{v:240,l:'240 mo'},{v:360,l:'360 mo'}] },
    { s:'extraPmt',   label:'Extra Monthly Payment',       type:'range', min:0,    max:5000,    step:25,   cur:true, def:0     },
  ],
  `      const r = rate / 100 / 12
      const n = termMonths
      const monthly = r > 0 ? principal * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1) : principal/n
      const totalPaid = monthly * n
      const totalInterest = totalPaid - principal
      // With extra payment
      const newMonthly = monthly + extraPmt
      const newMonths = extraPmt > 0 && r > 0
        ? Math.ceil(-Math.log(1 - principal * r / newMonthly) / Math.log(1 + r))
        : termMonths
      const interestSaved = Math.max(0, totalInterest - (newMonthly * newMonths - principal))
      return { monthly, totalInterest, totalPaid, newMonths: newMonths + ' months', interestSaved }`,
  [
    { label:'Monthly Payment',            k:'monthly',       cur:true  },
    { label:'Total Interest',             k:'totalInterest', cur:true  },
    { label:'Total Amount Paid',          k:'totalPaid',     cur:true  },
    { label:'Payoff with Extra Payment',  k:'newMonths',     cur:false },
    { label:'Interest Saved',             k:'interestSaved', cur:true  },
  ],
  [
    { q:'How is a monthly loan payment calculated?', a:'Monthly payment = Principal x [r(1+r)^n] / [(1+r)^n - 1], where r = monthly rate (APR/12) and n = number of months. For a $25,000 loan at 7.5% for 60 months: r = 0.00625, n = 60, payment = $500.47. This formula ensures equal payments throughout the loan while fully paying off interest and principal by the final payment.' },
    { q:'What loan term gives the best value?', a:'Shorter terms mean higher monthly payments but dramatically less total interest. On a $25,000 loan at 7.5%: 36 months costs $775/month and $2,900 total interest. 60 months costs $501/month and $5,028 total interest. 84 months costs $386/month and $7,408 total interest. Choose the shortest term your budget can comfortably handle.' },
    { q:'Can I pay off a loan early without penalty?', a:'Most personal loans and mortgages originated after 2014 have no prepayment penalty. However some lenders still charge prepayment penalties — typically 1-2% of the remaining balance if paid off within 3-5 years. Always check your loan agreement for a prepayment penalty clause before making extra payments or paying off early. Ask your lender directly if unsure.' },
  ],
  [
    { href:'/loan-comparison-calculator', icon:'🔍', name:'Loan Comparison'  },
    { href:'/loan-interest-calculator',   icon:'💸', name:'Loan Interest'    },
    { href:'/personal-loan-calculator',   icon:'👤', name:'Personal Loan'    },
    { href:'/amortization-calculator',    icon:'📋', name:'Amortization'     },
  ]
))

// 13. Overtime Pay Calculator
write('overtime-pay-calculator', page(
  'Overtime Pay Calculator',
  'Calculate overtime pay, total weekly earnings and annual income including overtime hours.',
  '⏰',
  [
    { s:'hourlyRate',    label:'Regular Hourly Rate',        type:'range', min:7.25, max:500,   step:0.25, cur:true, def:22    },
    { s:'regularHours', label:'Regular Hours Per Week',      type:'range', min:1,    max:40,    step:1,    sfx:' hrs', def:40  },
    { s:'otHours',       label:'Overtime Hours Per Week',    type:'range', min:0,    max:40,    step:0.5,  sfx:' hrs', def:5   },
    { s:'otMultiplier',  label:'Overtime Rate',              type:'select', def:1.5, opts:[{v:1.5,l:'1.5x (time and a half)'},{v:2.0,l:'2.0x (double time)'},{v:2.5,l:'2.5x (triple time)'}] },
    { s:'weeksPerYear',  label:'Weeks With Overtime Per Year',type:'range', min:1,   max:52,    step:1,    sfx:' wks', def:20  },
  ],
  `      const regularPay   = hourlyRate * regularHours
      const otRate       = hourlyRate * otMultiplier
      const weeklyOT     = otRate * otHours
      const totalWeekly  = regularPay + weeklyOT
      const regularAnnual = hourlyRate * regularHours * 52
      const otAnnual     = weeklyOT * weeksPerYear
      const totalAnnual  = regularAnnual + otAnnual
      const effectiveRate = (totalAnnual / (regularHours * 52 + otHours * weeksPerYear)).toFixed(2)
      return { regularPay, otRate, weeklyOT, totalWeekly, regularAnnual, otAnnual, totalAnnual, effectiveRate }`,
  [
    { label:'Regular Weekly Pay',         k:'regularPay',   cur:true },
    { label:'Overtime Hourly Rate',       k:'otRate',       cur:true },
    { label:'Weekly Overtime Pay',        k:'weeklyOT',     cur:true },
    { label:'Total Weekly Pay',           k:'totalWeekly',  cur:true },
    { label:'Regular Annual Pay',         k:'regularAnnual',cur:true },
    { label:'Annual Overtime Earnings',   k:'otAnnual',     cur:true },
    { label:'Total Annual Earnings',      k:'totalAnnual',  cur:true },
  ],
  [
    { q:'Who qualifies for overtime pay?', a:'Under the federal FLSA, non-exempt employees earn 1.5x their regular rate for hours over 40 per week. Employees earning under $684/week ($35,568/year) are automatically non-exempt. Many states have stricter rules: California requires daily overtime (over 8 hours/day), double time over 12 hours/day, and overtime on the 7th consecutive day. Salaried workers may still qualify depending on their actual duties.' },
    { q:'How is overtime calculated for hourly workers?', a:'Federal overtime = regular hourly rate x 1.5 x hours over 40 in a workweek. A workweek is a fixed 168-hour period (7 consecutive 24-hour days). Employers cannot average hours across multiple weeks to avoid overtime. Bonuses and certain other compensation may need to be included in the regular rate for overtime calculation purposes.' },
    { q:'Can employers force you to work overtime?', a:'In most US states (at-will employment), employers can require overtime as a condition of employment and can terminate employees who refuse, unless there is a union contract, employment contract, or state law that limits mandatory overtime. Healthcare workers have additional protections in many states. Employers cannot punish employees for overtime work that was authorized or required.' },
  ],
  [
    { href:'/overtime-calculator',        icon:'⏱️', name:'Overtime Calculator'},
    { href:'/hourly-to-salary-calculator',icon:'💵', name:'Hourly to Salary'  },
    { href:'/paycheck-calculator',        icon:'💰', name:'Paycheck'          },
    { href:'/raise-calculator',           icon:'📈', name:'Raise Calculator'  },
  ]
))

// 14. Passive Income Calculator
write('passive-income-calculator', page(
  'Passive Income Calculator',
  'Calculate how much you need invested to generate your target passive income.',
  '💰',
  [
    { s:'targetMonthly', label:'Target Monthly Passive Income', type:'range', min:100,  max:50000,  step:100,  cur:true, def:3000  },
    { s:'yieldRate',     label:'Expected Annual Yield / Return',type:'range', min:1,    max:15,     step:0.25, pct:true, def:5     },
    { s:'incomeType',    label:'Income Source',                  type:'select', def:'dividend', opts:[{v:'dividend',l:'Dividend Stocks'},{v:'rental',l:'Rental Property'},{v:'bond',l:'Bonds / CDs'},{v:'business',l:'Business / Side Income'}] },
    { s:'taxRate',       label:'Tax Rate on Passive Income',     type:'range', min:0,    max:40,     step:1,    pct:true, def:20    },
  ],
  `      const targetAnnual   = targetMonthly * 12
      const grossNeeded    = targetAnnual / (1 - taxRate / 100)
      const portfolioNeeded = grossNeeded / (yieldRate / 100)
      const taxCost        = grossNeeded - targetAnnual
      const monthlyGross   = grossNeeded / 12
      const timeToGoal     = (portfolioNeeded / 12000).toFixed(1) + ' years (saving $1,000/mo at ' + yieldRate + '% return)'
      return { portfolioNeeded, grossNeeded, taxCost, monthlyGross, targetMonthly, timeToGoal }`,
  [
    { label:'Portfolio / Asset Value Needed', k:'portfolioNeeded',cur:true  },
    { label:'Annual Gross Income Needed',     k:'grossNeeded',    cur:true  },
    { label:'Annual Tax Cost',                k:'taxCost',        cur:true  },
    { label:'Monthly Gross Income',           k:'monthlyGross',   cur:true  },
    { label:'Target Monthly Net Income',      k:'targetMonthly',  cur:true  },
  ],
  [
    { q:'What are the best sources of passive income?', a:'Top passive income sources ranked by typical yield: dividend stocks 2-6%, REITs 4-8%, rental property 5-10% cash-on-cash, high-yield savings and CDs 4-5.5%, peer-to-peer lending 5-9% (higher risk), bonds 4-6%, covered calls on stocks 8-15% (requires active management), and digital products (highest potential but requires upfront work to create).' },
    { q:'How much do I need invested to live off passive income?', a:'At a 4% withdrawal rate (the FIRE standard) you need 25x your annual expenses. For $3,000/month ($36,000/year) net you need approximately $900,000-$1,200,000 invested depending on tax rate and yield. With dividend stocks at 4% yield you need $900,000. With bonds at 5% yield you need $720,000 gross. Tax-advantaged accounts (Roth IRA) reduce the gross amount needed.' },
    { q:'Is rental property good passive income?', a:'Rental property generates 5-10% cash-on-cash returns but is not truly passive — it requires tenant management, maintenance, and occasional large capital expenditures. Professional management costs 8-12% of rent. REITs provide similar real estate exposure with true passive income: no tenants, no maintenance, fully liquid, and dividends paid quarterly. For most investors REITs are more practical than direct ownership.' },
  ],
  [
    { href:'/fire-calculator',           icon:'🔥', name:'FIRE Calculator'  },
    { href:'/dividend-calculator',       icon:'💹', name:'Dividend'         },
    { href:'/investment-return-calculator',icon:'📈',name:'Investment Return'},
    { href:'/savings-goal-calculator',   icon:'🎯', name:'Savings Goal'     },
  ]
))

// 15. Portfolio Growth Calculator
write('portfolio-growth-calculator', page(
  'Portfolio Growth Calculator',
  'Project your investment portfolio growth over time with contributions and compound returns.',
  '📈',
  [
    { s:'initialAmount', label:'Initial Investment',          type:'range', min:0,    max:2000000, step:1000, cur:true, def:50000 },
    { s:'monthlyContrib',label:'Monthly Contribution',        type:'range', min:0,    max:50000,   step:100,  cur:true, def:1000  },
    { s:'annualReturn',  label:'Expected Annual Return',      type:'range', min:1,    max:20,      step:0.25, pct:true, def:8     },
    { s:'years',         label:'Investment Horizon',          type:'range', min:1,    max:50,      step:1,    sfx:' yrs', def:20  },
    { s:'inflationRate', label:'Inflation Rate',              type:'range', min:0,    max:8,       step:0.25, pct:true, def:3     },
  ],
  `      const r = annualReturn / 100 / 12
      const n = years * 12
      const fvInitial  = initialAmount * Math.pow(1+r, n)
      const fvContribs = monthlyContrib * (Math.pow(1+r,n) - 1) / r
      const nominalFV  = fvInitial + fvContribs
      const totalContribs = initialAmount + monthlyContrib * n
      const totalGains = nominalFV - totalContribs
      const realReturn = (1 + annualReturn/100) / (1 + inflationRate/100) - 1
      const rReal = realReturn / 12
      const fvReal = initialAmount * Math.pow(1+rReal,n) + monthlyContrib * (Math.pow(1+rReal,n)-1)/rReal
      return { nominalFV, totalContribs, totalGains, fvReal, inflationImpact: nominalFV - fvReal }`,
  [
    { label:'Portfolio Value (nominal)',  k:'nominalFV',     cur:true },
    { label:'Total Contributions',       k:'totalContribs', cur:true },
    { label:'Total Investment Gains',    k:'totalGains',    cur:true },
    { label:'Real Value (inflation adj)',k:'fvReal',        cur:true },
    { label:'Lost to Inflation',         k:'inflationImpact',cur:true},
  ],
  [
    { q:'What is a realistic portfolio return to expect?', a:'Historical averages: US stock market (S&P 500) 10% nominal, 7% inflation-adjusted over long periods. Diversified global stock portfolio 8-9% nominal. 60/40 stock-bond portfolio 7-8% nominal. Conservative bond portfolio 4-5%. These are long-term averages with significant year-to-year volatility. Never count on consistent returns — actual results vary considerably from any average.' },
    { q:'How much do monthly contributions matter vs initial investment?', a:'For long time horizons, consistent monthly contributions often matter more than initial lump sum. $1,000/month for 30 years at 8% return grows to $1.5M regardless of starting balance. Starting with $50,000 extra only adds $503,000 at 8% over 30 years. For shorter horizons, the initial investment matters relatively more. Both matter — maximize both when possible.' },
    { q:'How does inflation affect long-term portfolio value?', a:'Inflation at 3% cuts the purchasing power of your portfolio roughly in half every 24 years. A $1M portfolio in 24 years only buys what $500,000 buys today at 3% inflation. This is why equity investments that historically outpace inflation are essential for long-term goals. Bonds and CDs often barely keep pace with inflation after taxes.' },
  ],
  [
    { href:'/investment-return-calculator',icon:'📊',name:'Investment Return' },
    { href:'/compound-interest',           icon:'💹',name:'Compound Interest' },
    { href:'/fire-calculator',             icon:'🔥',name:'FIRE Calculator'   },
    { href:'/retirement-calculator',       icon:'🌅',name:'Retirement'        },
  ]
))

// 16. Retirement Savings Calculator
write('retirement-savings-calculator', page(
  'Retirement Savings Calculator',
  'Calculate how much you need to save for retirement and if you are on track.',
  '🌅',
  [
    { s:'currentAge',    label:'Current Age',               type:'range', min:18,   max:65,     step:1,    sfx:' yrs', def:35  },
    { s:'retireAge',     label:'Target Retirement Age',     type:'range', min:45,   max:75,     step:1,    sfx:' yrs', def:65  },
    { s:'currentSavings',label:'Current Retirement Savings',type:'range', min:0,    max:5000000,step:5000, cur:true, def:75000  },
    { s:'annualIncome',  label:'Current Annual Income',     type:'range', min:10000,max:500000, step:1000, cur:true, def:75000  },
    { s:'savingsRate',   label:'Savings Rate',              type:'range', min:1,    max:50,     step:1,    pct:true, def:15    },
    { s:'returnRate',    label:'Expected Investment Return', type:'range', min:1,   max:12,     step:0.25, pct:true, def:7     },
  ],
  `      const yearsToRetire = retireAge - currentAge
      const annualContrib = annualIncome * (savingsRate / 100)
      const r = returnRate / 100
      const rMonthly = r / 12
      const nMonths = yearsToRetire * 12
      const monthlyContrib = annualContrib / 12
      const fvCurrent = currentSavings * Math.pow(1+r, yearsToRetire)
      const fvContribs = monthlyContrib * (Math.pow(1+rMonthly,nMonths)-1) / rMonthly
      const projectedSavings = fvCurrent + fvContribs
      const targetSavings = annualIncome * 0.80 * 25
      const onTrack = projectedSavings >= targetSavings ? 'On Track' : 'Behind - increase savings rate'
      const gap = Math.max(0, targetSavings - projectedSavings)
      return { projectedSavings, targetSavings, onTrack, gap, annualContrib, fvCurrent }`,
  [
    { label:'Projected Savings at Retirement', k:'projectedSavings',cur:true  },
    { label:'Target Savings Needed',           k:'targetSavings',   cur:true  },
    { label:'Retirement Status',               k:'onTrack',         cur:false },
    { label:'Savings Gap (if any)',            k:'gap',             cur:true  },
    { label:'Annual Contribution',             k:'annualContrib',   cur:true  },
    { label:'Current Savings at Retirement',   k:'fvCurrent',       cur:true  },
  ],
  [
    { q:'How much do I need to retire comfortably?', a:'The most common benchmark is 25x your annual expenses (the 4% rule). If you plan to spend $60,000/year in retirement, you need $1.5M. Fidelity suggests saving 10x your final salary by age 67. Vanguard recommends 12x. The right number depends on your lifestyle, Social Security income, pension income, healthcare costs, and how long you expect to live.' },
    { q:'Am I saving enough for retirement?', a:'Benchmarks by age: by 30 save 1x salary, by 40 save 3x, by 50 save 6x, by 60 save 8x, by 67 save 10x. If you are behind, increase your savings rate by 1% per year until you reach 15-20%. Catch-up contributions are allowed from age 50: extra $7,500/year in 401k, extra $1,000 in IRA. Even starting late is far better than not starting.' },
    { q:'What order should I save for retirement?', a:'Optimal order: (1) 401k up to employer match (free money — always capture 100%). (2) HSA if available (triple tax advantage). (3) Max Roth IRA ($7,000 limit, income restricted). (4) Max 401k ($23,000 limit). (5) Taxable brokerage for additional savings. This order minimizes lifetime taxes and maximizes every dollar saved for retirement.' },
  ],
  [
    { href:'/retirement-calculator',      icon:'🌅', name:'Retirement'         },
    { href:'/401k-calculator',            icon:'💼', name:'401k Calculator'    },
    { href:'/roth-ira-calculator',        icon:'💰', name:'Roth IRA'           },
    { href:'/fire-calculator',            icon:'🔥', name:'FIRE Calculator'    },
  ]
))

// 17. RV Loan Calculator
write('rv-loan-calculator', page(
  'RV Loan Calculator',
  'Calculate monthly payments, total interest and true cost of financing a recreational vehicle.',
  '🚐',
  [
    { s:'rvPrice',     label:'RV Price',                   type:'range', min:5000,  max:1000000, step:1000, cur:true, def:80000 },
    { s:'downPayment', label:'Down Payment',               type:'range', min:0,     max:200000,  step:500,  cur:true, def:16000 },
    { s:'rate',        label:'Annual Interest Rate',       type:'range', min:1,     max:20,      step:0.25, pct:true, def:8     },
    { s:'termYears',   label:'Loan Term',                  type:'select', def:15, opts:[{v:5,l:'5 yrs'},{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:20,l:'20 yrs'}] },
  ],
  `      const loan    = rvPrice - downPayment
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n + downPayment
      const interest= monthly * n - loan
      const annualOwnership = monthly * 12 + rvPrice * 0.02 + 2000
      return { loan, monthly, interest, total, annualOwnership }`,
  [
    { label:'Loan Amount',                k:'loan',            cur:true },
    { label:'Monthly Payment',            k:'monthly',         cur:true },
    { label:'Total Interest',             k:'interest',        cur:true },
    { label:'Total Purchase Cost',        k:'total',           cur:true },
    { label:'Est. Annual Ownership Cost', k:'annualOwnership', cur:true },
  ],
  [
    { q:'What credit score do I need for an RV loan?', a:'Most RV lenders require 660+ for standard approval, 700+ for the best rates. RV loans under $10,000 may be treated as personal loans with higher rates. Lenders like Good Sam Finance, Bank of the West, and local credit unions specialize in RV lending. Rates range from 6-15% depending on credit, down payment, RV age, and loan term.' },
    { q:'New vs used RV financing: what is different?', a:'New RVs: easier to finance, longer terms available (up to 20 years), better rates. Used RVs: higher rates, shorter max terms (typically 10-15 years for units under 10 years old, 5-10 years for older units), and some lenders will not finance RVs over 10-15 years old. Private party purchases may require personal loans instead of RV-specific financing.' },
    { q:'What are true annual costs of RV ownership?', a:'Beyond the loan: insurance $800-$2,500/year, storage $1,200-$4,800/year (if not stored at home), fuel $0.12-0.25/mile depending on RV size and MPG, maintenance and repairs $1,500-$5,000/year (budget 1-2% of purchase price), campsite fees $20-$150/night, and depreciation (Class A motorhomes lose 30% in first year, towable RVs 15-20%). Total annual cost typically $5,000-$15,000+ beyond the loan.' },
  ],
  [
    { href:'/boat-loan-calculator',       icon:'⛵', name:'Boat Loan'         },
    { href:'/car-loan-calculator',        icon:'🚗', name:'Car Loan'          },
    { href:'/personal-loan-calculator',   icon:'👤', name:'Personal Loan'     },
    { href:'/loan-comparison-calculator', icon:'🔍', name:'Loan Comparison'   },
  ]
))

// 18. Salary to Hourly Calculator
write('salary-to-hourly-calculator', page(
  'Salary to Hourly Calculator',
  'Convert annual salary to hourly rate based on hours worked per week.',
  '🔄',
  [
    { s:'annualSalary', label:'Annual Salary',               type:'range', min:10000, max:1000000, step:1000, cur:true, def:65000 },
    { s:'hoursPerWeek', label:'Hours Worked Per Week',       type:'range', min:1,     max:80,      step:1,    sfx:' hrs', def:40  },
    { s:'weeksPerYear', label:'Weeks Worked Per Year',       type:'range', min:40,    max:52,      step:1,    sfx:' wks', def:50  },
    { s:'unpaidBreaks', label:'Unpaid Break Minutes Per Day',type:'range', min:0,     max:60,      step:5,    sfx:' min', def:30  },
  ],
  `      const totalHours    = hoursPerWeek * weeksPerYear
      const breakHoursDay = unpaidBreaks / 60
      const paidHoursDay  = (hoursPerWeek / 5) - breakHoursDay
      const paidHoursYear = paidHoursDay * 5 * weeksPerYear
      const hourlyRate    = annualSalary / totalHours
      const paidHourlyRate= annualSalary / paidHoursYear
      const dailyRate     = annualSalary / (weeksPerYear * 5)
      const weeklyRate    = annualSalary / weeksPerYear
      const monthlyRate   = annualSalary / 12
      return { hourlyRate, paidHourlyRate, dailyRate, weeklyRate, monthlyRate, totalHours }`,
  [
    { label:'Hourly Rate (scheduled)',    k:'hourlyRate',     cur:true  },
    { label:'Hourly Rate (paid hours)',   k:'paidHourlyRate', cur:true  },
    { label:'Daily Rate',                k:'dailyRate',      cur:true  },
    { label:'Weekly Rate',               k:'weeklyRate',     cur:true  },
    { label:'Monthly Rate',              k:'monthlyRate',    cur:true  },
    { label:'Total Hours Worked Per Year',k:'totalHours',    cur:false },
  ],
  [
    { q:'How do you convert salary to hourly rate?', a:'Hourly rate = Annual salary / (Hours per week x Weeks per year). For a $65,000 salary at 40 hours/week for 50 weeks: $65,000 / 2,000 = $32.50/hour. The standard formula uses 2,080 hours (40 hours x 52 weeks) for a full-year comparison. Actual effective hourly rate is higher if you get paid time off included in your salary.' },
    { q:'What is a good hourly rate equivalent for a salary?', a:'By income level: $50,000 salary = $24/hr, $75,000 = $36/hr, $100,000 = $48/hr, $150,000 = $72/hr, $200,000 = $96/hr. For comparison, US federal minimum wage is $7.25/hr. The median US hourly wage is approximately $22/hr. When comparing a salary job to hourly contract work, add 20-30% to the salary equivalent rate for the contractor to break even after self-employment taxes and no benefits.' },
    { q:'Does salary always equal more money than hourly?', a:'Not necessarily. Hourly workers may earn more if they get paid for actual overtime worked. A salaried worker required to work 50 hours/week effectively earns less per hour than their nominal rate. Some salaried roles are exempt from overtime and regularly work 50-60 hours, dramatically reducing their effective hourly rate. Always calculate effective hourly rate before accepting a salaried offer.' },
  ],
  [
    { href:'/hourly-to-salary-calculator', icon:'💵', name:'Hourly to Salary'  },
    { href:'/overtime-pay-calculator',     icon:'⏰', name:'Overtime Pay'      },
    { href:'/paycheck-calculator',         icon:'💰', name:'Paycheck'          },
    { href:'/raise-calculator',            icon:'📈', name:'Raise Calculator'  },
  ]
))

// 19. Savings Growth Calculator
write('savings-growth-calculator', page(
  'Savings Growth Calculator',
  'See how your savings grow over time with regular contributions and compound interest.',
  '🌱',
  [
    { s:'initialDeposit',label:'Initial Deposit',            type:'range', min:0,    max:1000000, step:500,  cur:true, def:10000 },
    { s:'monthlyDeposit',label:'Monthly Deposit',            type:'range', min:0,    max:20000,   step:50,   cur:true, def:500   },
    { s:'annualRate',    label:'Annual Interest Rate',       type:'range', min:0.1,  max:12,      step:0.1,  pct:true, def:4.5   },
    { s:'years',         label:'Savings Period',             type:'range', min:1,    max:50,      step:1,    sfx:' yrs', def:10  },
    { s:'compFreq',      label:'Compounding',                type:'select', def:12, opts:[{v:365,l:'Daily'},{v:12,l:'Monthly'},{v:4,l:'Quarterly'},{v:1,l:'Annually'}] },
  ],
  `      const r  = annualRate / 100 / compFreq
      const n  = years * compFreq
      const periodsPerMonth = compFreq / 12
      const depositPerPeriod = monthlyDeposit / periodsPerMonth
      const fvInitial  = initialDeposit * Math.pow(1+r, n)
      const fvDeposits = depositPerPeriod * (Math.pow(1+r,n) - 1) / r
      const finalBalance  = fvInitial + fvDeposits
      const totalDeposited = initialDeposit + monthlyDeposit * years * 12
      const interestEarned = finalBalance - totalDeposited
      const doublingYears  = (Math.log(2) / Math.log(1 + annualRate/100)).toFixed(1)
      return { finalBalance, totalDeposited, interestEarned, doublingYears: doublingYears + ' years' }`,
  [
    { label:'Final Balance',              k:'finalBalance',    cur:true  },
    { label:'Total Amount Deposited',     k:'totalDeposited',  cur:true  },
    { label:'Total Interest Earned',      k:'interestEarned',  cur:true  },
    { label:'Money Doubling Time',        k:'doublingYears',   cur:false },
  ],
  [
    { q:'How does compound interest grow savings?', a:'Compound interest earns returns on both your principal and previously earned interest. At 4.5%, $10,000 grows to $10,450 after year 1. In year 2 you earn interest on $10,450, not just $10,000. Over 10 years this compounds to $15,530 — 55% growth on the original deposit. Over 30 years: $37,850 — nearly 4x. Adding regular deposits multiplies this effect dramatically.' },
    { q:'Where should I keep short-term savings?', a:'Best options for different goals: Emergency fund (under 1 year): high-yield savings account (currently 4-5% APY, FDIC insured, fully liquid). Short-term goals (1-3 years): CDs, Treasury bills, money market accounts. Medium-term (3-5 years): CD ladders, I-bonds, short-term bond funds. Never put money you need within 2 years in stock market investments.' },
    { q:'What is the Rule of 72?', a:'The Rule of 72 estimates how long it takes to double your money: divide 72 by the annual interest rate. At 4%: 72/4 = 18 years to double. At 6%: 12 years. At 9%: 8 years. At 12%: 6 years. This quick mental math tool helps evaluate investment options. It also works in reverse for inflation: at 3% inflation, purchasing power halves in 72/3 = 24 years.' },
  ],
  [
    { href:'/compound-interest',           icon:'💹', name:'Compound Interest' },
    { href:'/savings-goal-calculator',     icon:'🎯', name:'Savings Goal'      },
    { href:'/cd-calculator',               icon:'🏦', name:'CD Calculator'     },
    { href:'/emergency-fund-calculator',   icon:'🛡️', name:'Emergency Fund'    },
  ]
))

// 20. Total Debt Calculator
write('total-debt-calculator', page(
  'Total Debt Calculator',
  'Add up all your debts, calculate total interest burden and create a payoff plan.',
  '📊',
  [
    { s:'mortgageBalance', label:'Mortgage Balance',           type:'range', min:0,  max:2000000, step:1000, cur:true, def:280000 },
    { s:'carBalance',      label:'Car Loan Balance',           type:'range', min:0,  max:200000,  step:500,  cur:true, def:18000  },
    { s:'studentBalance',  label:'Student Loan Balance',       type:'range', min:0,  max:300000,  step:500,  cur:true, def:25000  },
    { s:'creditCards',     label:'Credit Card Balances',       type:'range', min:0,  max:100000,  step:100,  cur:true, def:6000   },
    { s:'otherDebt',       label:'Other Debt (personal, etc)', type:'range', min:0,  max:200000,  step:500,  cur:true, def:0      },
    { s:'annualIncome',    label:'Annual Gross Income',        type:'range', min:10000,max:1000000,step:1000, cur:true, def:75000  },
  ],
  `      const totalDebt = mortgageBalance + carBalance + studentBalance + creditCards + otherDebt
      const nonMortgage = carBalance + studentBalance + creditCards + otherDebt
      const dtiRatio   = (totalDebt / annualIncome * 100).toFixed(1) + '%'
      const nonMortDTI = (nonMortgage / annualIncome * 100).toFixed(1) + '%'
      const monthlyMinEst = totalDebt * 0.02
      const debtFreeYears = (totalDebt / (annualIncome * 0.20)).toFixed(1)
      const healthStatus  = nonMortgage / annualIncome < 0.5 ? 'Manageable' : nonMortgage / annualIncome < 1.0 ? 'High' : 'Critical'
      return { totalDebt, nonMortgage, dtiRatio, nonMortDTI, monthlyMinEst, debtFreeYears, healthStatus }`,
  [
    { label:'Total Debt',                   k:'totalDebt',      cur:true  },
    { label:'Non-Mortgage Debt',            k:'nonMortgage',    cur:true  },
    { label:'Total Debt to Income Ratio',   k:'dtiRatio',       cur:false },
    { label:'Non-Mortgage DTI',             k:'nonMortDTI',     cur:false },
    { label:'Est. Monthly Minimum Payments',k:'monthlyMinEst',  cur:true  },
    { label:'Years to Debt-Free (20% income)',k:'debtFreeYears',cur:false },
    { label:'Debt Health Status',           k:'healthStatus',   cur:false },
  ],
  [
    { q:'What is a healthy debt-to-income ratio?', a:'Total DTI under 36% is considered healthy by most lenders. Non-housing DTI under 20% is ideal. Mortgage lenders prefer total DTI under 43% for approval (some allow up to 50% with strong credit). Consumer financial health benchmarks: under 15% non-mortgage DTI is excellent, 15-35% is manageable, 35-50% is high, above 50% is concerning and needs immediate attention.' },
    { q:'What debts should I pay off first?', a:'Priority order: (1) Any debt in collections or severely past due (stop credit damage). (2) High-interest credit cards and payday loans (highest cost debt). (3) Other unsecured debt over 10% interest. (4) Student loans over 7% interest. (5) Car loans. (6) Student loans under 7%. (7) Mortgage (lowest rate, tax deductible interest, builds equity). Never neglect minimum payments on any debt.' },
    { q:'How long does it take to become debt-free?', a:'With focused effort: credit cards (using avalanche or snowball) 2-5 years, car loans 3-5 years, student loans 5-10 years, mortgages 15-30 years (or earlier with extra payments). The most powerful accelerator is increasing income and directing 100% of new income to debt. Side income of $500-$1,000/month applied to debt can cut payoff time in half.' },
  ],
  [
    { href:'/debt-payoff-calculator',      icon:'🎯', name:'Debt Payoff'       },
    { href:'/debt-to-income-calculator',   icon:'📋', name:'Debt to Income'    },
    { href:'/debt-consolidation-calculator',icon:'🔗',name:'Debt Consolidation'},
    { href:'/net-worth-calculator',        icon:'💰', name:'Net Worth'         },
  ]
))

// 21. Truck Loan Calculator
write('truck-loan-calculator', page(
  'Truck Loan Calculator',
  'Calculate monthly payments and total cost for financing a pickup truck or commercial truck.',
  '🚛',
  [
    { s:'truckPrice',  label:'Truck Price',                  type:'range', min:5000,  max:500000, step:500,  cur:true, def:55000 },
    { s:'downPayment', label:'Down Payment',                 type:'range', min:0,     max:200000, step:500,  cur:true, def:10000 },
    { s:'tradeIn',     label:'Trade-In Value',               type:'range', min:0,     max:100000, step:500,  cur:true, def:0     },
    { s:'rate',        label:'Annual Interest Rate',         type:'range', min:1,     max:20,     step:0.25, pct:true, def:7     },
    { s:'termMonths',  label:'Loan Term',                    type:'select', def:60, opts:[{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:72,l:'72 mo'},{v:84,l:'84 mo'}] },
    { s:'truckUse',    label:'Primary Use',                  type:'select', def:'personal', opts:[{v:'personal',l:'Personal / Family'},{v:'business',l:'Business Use'}] },
  ],
  `      const loan    = truckPrice - downPayment - tradeIn
      const r       = rate / 100 / 12
      const n       = termMonths
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n + downPayment + tradeIn
      const interest= monthly * n - loan
      const annualFuel = 15000 / 18 * 3.50 * 12
      const taxDeduct  = truckUse === 'business' ? truckPrice * 0.25 : 0
      return { loan, monthly, interest, total, annualFuel, taxDeduct }`,
  [
    { label:'Loan Amount',                k:'loan',      cur:true  },
    { label:'Monthly Payment',            k:'monthly',   cur:true  },
    { label:'Total Interest',             k:'interest',  cur:true  },
    { label:'Total Vehicle Cost',         k:'total',     cur:true  },
    { label:'Est. Annual Fuel Cost',      k:'annualFuel',cur:true  },
    { label:'Business Tax Deduction Est.',k:'taxDeduct', cur:true  },
  ],
  [
    { q:'Are truck loans different from car loans?', a:'Truck loans use the same structure as car loans — same lenders, same credit requirements, same amortization. However trucks (especially heavy-duty and commercial trucks) may have longer max terms (up to 84 months for personal, up to 84-120 months for commercial). Commercial truck loans for business use may qualify for SBA financing or equipment loans with potentially better rates.' },
    { q:'Can I deduct a truck purchase for business?', a:'Yes — if the truck is used for business, Section 179 allows deducting up to $28,900 for SUVs/trucks over 6,000 lbs GVWR in 2024, or the full purchase price for trucks over 14,000 lbs GVWR. Bonus depreciation allows additional deductions. For mixed personal/business use, only the business use percentage is deductible. Keep detailed mileage logs to support business use claims.' },
    { q:'What is a good truck loan rate in 2026?', a:'Competitive rates for pickup trucks in 2026: excellent credit (720+) 5-7%, good credit (680-720) 7-10%, fair credit (620-680) 10-16%, poor credit below 620 may not qualify for direct lending. Credit unions typically offer 0.5-1% lower rates than dealerships. Getting pre-approved before going to the dealership gives you negotiating power and prevents dealer markup on financing.' },
  ],
  [
    { href:'/car-loan-calculator',         icon:'🚗', name:'Car Loan'          },
    { href:'/car-affordability-calculator',icon:'🚘', name:'Car Affordability' },
    { href:'/equipment-loan-calculator',   icon:'⚙️', name:'Equipment Loan'    },
    { href:'/lease-vs-buy-calculator',     icon:'🔄', name:'Lease vs Buy'      },
  ]
))

console.log(`
════════════════════════════════════════════════════
  STAGE 10 COMPLETE — 21 missing calculators built
════════════════════════════════════════════════════
   1.  /boat-loan-calculator
   2.  /commission-calculator
   3.  /contractor-pay-calculator
   4.  /credit-card-minimum-payment-calculator
   5.  /credit-utilization-calculator
   6.  /debt-avalanche-calculator
   7.  /debt-payoff-time-calculator
   8.  /debt-snowball-calculator
   9.  /equipment-loan-calculator
  10.  /fire-retirement-calculator
  11.  /loan-interest-calculator
  12.  /loan-payment-calculator
  13.  /overtime-pay-calculator
  14.  /passive-income-calculator
  15.  /portfolio-growth-calculator
  16.  /retirement-savings-calculator
  17.  /rv-loan-calculator
  18.  /salary-to-hourly-calculator
  19.  /savings-growth-calculator
  20.  /total-debt-calculator
  21.  /truck-loan-calculator
════════════════════════════════════════════════════
  GRAND TOTAL: 103 + 21 = 124 calculators
════════════════════════════════════════════════════
`)
