/**
 * FreeFinCalc.net — STAGE 9a: 12 Missing Calculators
 * node stage9a_missing.js
 *
 *  1.  debt-payoff-calculator
 *  2.  tax-calculator
 *  3.  capital-gains-tax-calculator
 *  4.  self-employment-tax-calculator
 *  5.  pension-calculator
 *  6.  annuity-calculator
 *  7.  life-insurance-calculator
 *  8.  college-savings-calculator
 *  9.  car-affordability-calculator
 * 10.  home-improvement-loan-calculator
 * 11.  solar-payback-calculator
 * 12.  invoice-calculator
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

// ── 1. Debt Payoff Calculator ────────────────────────────────────────────────
write('debt-payoff-calculator', page(
  'Debt Payoff Calculator',
  'Calculate how long it takes to pay off any debt and compare avalanche vs snowball strategies.',
  '🎯',
  [
    { s:'balance',     label:'Total Debt Balance',         type:'range', min:100,  max:500000, step:100,  cur:true, def:25000 },
    { s:'rate',        label:'Average Interest Rate (APR)',type:'range', min:0,    max:36,     step:0.25, pct:true, def:18    },
    { s:'monthlyPmt',  label:'Monthly Payment',            type:'range', min:10,   max:20000,  step:10,   cur:true, def:600   },
    { s:'extraPmt',    label:'Extra Monthly Payment',      type:'range', min:0,    max:5000,   step:25,   cur:true, def:0     },
  ],
  `      const r = rate / 100 / 12
      const totalPmt = monthlyPmt + extraPmt
      if (totalPmt <= balance * r) return { months: 'Never (payment too low)', interest: 0, totalPaid: 0, timeSaved: 'N/A', interestSaved: 0 }
      const months = Math.ceil(-Math.log(1 - balance * r / totalPmt) / Math.log(1 + r))
      const interest = totalPmt * months - balance
      const totalPaid = totalPmt * months
      // Without extra payment
      const months0 = extraPmt > 0 ? Math.ceil(-Math.log(1 - balance * r / monthlyPmt) / Math.log(1 + r)) : months
      const interest0 = monthlyPmt * months0 - balance
      const timeSaved = extraPmt > 0 ? (months0 - months) + ' months' : 'N/A'
      const interestSaved = Math.max(0, interest0 - interest)
      return { months: months + ' months', interest, totalPaid, timeSaved, interestSaved }`,
  [
    { label:'Months to Pay Off',        k:'months',       cur:false },
    { label:'Total Interest Paid',      k:'interest',     cur:true  },
    { label:'Total Amount Paid',        k:'totalPaid',    cur:true  },
    { label:'Time Saved with Extra Pmt',k:'timeSaved',    cur:false },
    { label:'Interest Saved',           k:'interestSaved',cur:true  },
  ],
  [
    { q:'What is the debt avalanche method?', a:'Pay minimums on all debts, then put every extra dollar toward the highest interest rate debt first. Once that is paid off, roll that payment to the next highest rate. This method saves the most money in interest over time and is mathematically optimal. Best for people who are motivated by numbers and long-term savings.' },
    { q:'What is the debt snowball method?', a:'Pay minimums on all debts, then attack the smallest balance first regardless of interest rate. Each payoff gives a psychological win and frees up cash flow. Research shows snowball users pay off debt faster in practice because the motivation keeps them going. Best for people who need early wins to stay on track.' },
    { q:'How much extra should I pay toward debt each month?', a:'Even an extra $50-$100/month makes a dramatic difference. On a $25,000 debt at 18% APR with $600 minimum payments, an extra $200/month cuts payoff time from 5.5 years to 3.2 years and saves over $4,000 in interest. Use any windfalls (tax refunds, bonuses) as lump-sum extra payments for maximum impact.' },
  ],
  [
    { href:'/credit-card-payoff-calculator', icon:'💳', name:'Credit Card Payoff' },
    { href:'/debt-consolidation-calculator', icon:'🔗', name:'Debt Consolidation'  },
    { href:'/personal-loan-calculator',      icon:'👤', name:'Personal Loan'       },
    { href:'/budget-planner-calculator',     icon:'📋', name:'Budget Planner'      },
  ]
))

// ── 2. Tax Calculator ───────────────────────────────────────────────────────
write('tax-calculator', page(
  'Income Tax Calculator',
  'Calculate your federal income tax for 2026 based on filing status and deductions.',
  '🧮',
  [
    { s:'income',       label:'Annual Gross Income',         type:'range', min:0,     max:1000000, step:1000, cur:true, def:85000 },
    { s:'filingStatus', label:'Filing Status',               type:'select', def:'single', opts:[{v:'single',l:'Single'},{v:'married',l:'Married Joint'},{v:'hoh',l:'Head of Household'}] },
    { s:'deductType',   label:'Deduction Type',              type:'select', def:'standard', opts:[{v:'standard',l:'Standard Deduction'},{v:'itemized',l:'Itemized Deductions'}] },
    { s:'itemized',     label:'Itemized Deductions Amount',  type:'range', min:0,     max:200000,  step:500,  cur:true, def:0     },
    { s:'credits',      label:'Tax Credits',                 type:'range', min:0,     max:20000,   step:100,  cur:true, def:0     },
  ],
  `      const stdDeduct = filingStatus === 'married' ? 29200 : filingStatus === 'hoh' ? 21900 : 14600
      const deduction = deductType === 'standard' ? stdDeduct : Math.max(stdDeduct, itemized)
      const taxable   = Math.max(0, income - deduction)
      const brackets  = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : filingStatus === 'hoh'
        ? [[0,0.10,16550],[16550,0.12,63100],[63100,0.22,100500],[100500,0.24,191950],[191950,0.32,243700],[243700,0.35,609350],[609350,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let tax = 0
      for (const [lo, rate, hi] of brackets) {
        if (taxable <= lo) break
        tax += (Math.min(taxable, hi) - lo) * rate
      }
      tax = Math.max(0, tax - credits)
      const fica = Math.min(income, 168600) * 0.062 + income * 0.0145
      const totalTax = tax + fica
      const effectiveRate = income > 0 ? (tax / income * 100).toFixed(2) + '%' : '0%'
      const marginalRate  = taxable > 609350 ? '37%' : taxable > 243725 ? '35%' : taxable > 191950 ? '32%' : taxable > 100525 ? '24%' : taxable > 47150 ? '22%' : taxable > 11600 ? '12%' : '10%'
      return { taxable, deduction, tax, fica, totalTax, effectiveRate, marginalRate }`,
  [
    { label:'Standard / Itemized Deduction', k:'deduction',     cur:true  },
    { label:'Taxable Income',                k:'taxable',       cur:true  },
    { label:'Federal Income Tax',            k:'tax',           cur:true  },
    { label:'FICA Tax (SS + Medicare)',      k:'fica',          cur:true  },
    { label:'Total Federal Tax',             k:'totalTax',      cur:true  },
    { label:'Effective Tax Rate',            k:'effectiveRate', cur:false },
    { label:'Marginal Tax Rate',             k:'marginalRate',  cur:false },
  ],
  [
    { q:'What is the standard deduction for 2026?', a:'The 2026 standard deduction is $14,600 for single filers, $29,200 for married filing jointly, and $21,900 for head of household. These amounts are indexed for inflation annually. You should itemize only if your itemized deductions (mortgage interest, state taxes up to $10,000, charitable gifts, medical expenses) exceed the standard deduction.' },
    { q:'What is the difference between effective and marginal tax rate?', a:'The marginal tax rate is the rate on your last dollar of income. The effective rate is your total tax divided by total income. Someone earning $85,000 single has a 22% marginal rate but roughly 15% effective rate because lower income portions are taxed at 10% and 12%. The marginal rate matters most for decisions about earning additional income.' },
    { q:'How can I reduce my federal income tax?', a:'Key strategies: maximize pre-tax retirement contributions (401k up to $23,000, IRA up to $7,000 in 2024), contribute to an HSA ($4,150 single, $8,300 family), harvest tax losses in investment accounts, defer income to lower-earning years, bunch charitable donations to exceed standard deduction in alternating years, and use qualified opportunity zone investments.' },
  ],
  [
    { href:'/tax-refund-calculator',          icon:'💸', name:'Tax Refund'        },
    { href:'/capital-gains-tax-calculator',   icon:'📈', name:'Capital Gains Tax' },
    { href:'/self-employment-tax-calculator', icon:'🧾', name:'SE Tax'            },
    { href:'/paycheck-calculator',            icon:'💵', name:'Paycheck'          },
  ]
))

// ── 3. Capital Gains Tax Calculator ─────────────────────────────────────────
write('capital-gains-tax-calculator', page(
  'Capital Gains Tax Calculator',
  'Calculate short-term and long-term capital gains tax on stocks, real estate and other assets.',
  '📈',
  [
    { s:'salePrice',    label:'Sale Price',                  type:'range', min:0,     max:5000000, step:500,  cur:true, def:50000  },
    { s:'costBasis',    label:'Cost Basis (original price)',  type:'range', min:0,     max:5000000, step:500,  cur:true, def:20000  },
    { s:'holdingPeriod',label:'Holding Period',               type:'select', def:'long', opts:[{v:'short',l:'Short-Term (under 1 year)'},{v:'long',l:'Long-Term (1 year or more)'}] },
    { s:'annualIncome', label:'Annual Taxable Income',        type:'range', min:0,     max:1000000, step:1000, cur:true, def:85000  },
    { s:'filingStatus', label:'Filing Status',                type:'select', def:'single', opts:[{v:'single',l:'Single'},{v:'married',l:'Married Joint'}] },
  ],
  `      const gain = Math.max(0, salePrice - costBasis)
      let taxRate
      if (holdingPeriod === 'short') {
        // Taxed as ordinary income — approximate marginal rate
        taxRate = annualIncome > 609350 ? 0.37 : annualIncome > 243725 ? 0.35 : annualIncome > 191950 ? 0.32 : annualIncome > 100525 ? 0.24 : annualIncome > 47150 ? 0.22 : annualIncome > 11600 ? 0.12 : 0.10
      } else {
        // Long-term rates for 2026
        const ltThresh = filingStatus === 'married' ? [0, 94050, 583750] : [0, 47025, 518900]
        taxRate = annualIncome > ltThresh[2] ? 0.20 : annualIncome > ltThresh[1] ? 0.15 : 0.00
      }
      // Net Investment Income Tax (3.8%) on high earners
      const niitThresh = filingStatus === 'married' ? 250000 : 200000
      const niit = annualIncome > niitThresh ? gain * 0.038 : 0
      const taxDue = gain * taxRate + niit
      const netProfit = salePrice - costBasis - taxDue
      const effectiveGainRate = gain > 0 ? (taxDue / gain * 100).toFixed(1) + '%' : '0%'
      return { gain, taxRate: (taxRate * 100).toFixed(0) + '%', taxDue, niit, netProfit, effectiveGainRate }`,
  [
    { label:'Capital Gain',             k:'gain',             cur:true  },
    { label:'Applicable Tax Rate',      k:'taxRate',          cur:false },
    { label:'Capital Gains Tax Due',    k:'taxDue',           cur:true  },
    { label:'Net Investment Income Tax',k:'niit',             cur:true  },
    { label:'Net Profit After Tax',     k:'netProfit',        cur:true  },
    { label:'Effective Rate on Gain',   k:'effectiveGainRate',cur:false },
  ],
  [
    { q:'What is the long-term capital gains tax rate?', a:'Long-term capital gains rates for 2026: 0% for taxable income up to $47,025 (single) or $94,050 (married). 15% for income up to $518,900 (single) or $583,750 (married). 20% above those thresholds. Assets must be held more than 12 months to qualify. High earners also pay a 3.8% Net Investment Income Tax on top.' },
    { q:'How do I avoid or reduce capital gains tax?', a:'Strategies: hold assets over 12 months to qualify for long-term rates, harvest tax losses to offset gains, donate appreciated assets to charity (avoid tax entirely), use 1031 exchanges for real estate, contribute gains to Opportunity Zone funds (deferral), use Roth accounts for high-growth investments, and time sales in low-income years when you may qualify for the 0% rate.' },
    { q:'Does selling my home trigger capital gains tax?', a:'Primary residence exclusion: single filers can exclude up to $250,000 of gain, married filers up to $500,000, if you owned and lived in the home for at least 2 of the last 5 years. Gain above the exclusion is taxed at long-term capital gains rates. Investment properties do not get the exclusion but may qualify for 1031 exchange tax deferral.' },
  ],
  [
    { href:'/tax-calculator',           icon:'🧮', name:'Income Tax'        },
    { href:'/investment-return-calculator',icon:'📊',name:'Investment Return'},
    { href:'/stock-profit-calculator',  icon:'💹', name:'Stock Profit'      },
    { href:'/tax-refund-calculator',    icon:'💸', name:'Tax Refund'        },
  ]
))

// ── 4. Self-Employment Tax Calculator ───────────────────────────────────────
write('self-employment-tax-calculator', page(
  'Self-Employment Tax Calculator',
  'Calculate self-employment tax, quarterly estimated payments and deductions for freelancers.',
  '🧾',
  [
    { s:'netProfit',    label:'Annual Net Self-Employment Profit', type:'range', min:400, max:500000, step:500, cur:true, def:75000 },
    { s:'otherIncome',  label:'Other W-2 or Taxable Income',       type:'range', min:0,   max:500000, step:500, cur:true, def:0     },
    { s:'filingStatus', label:'Filing Status',                     type:'select', def:'single', opts:[{v:'single',l:'Single'},{v:'married',l:'Married Joint'}] },
    { s:'retirement',   label:'Self-Employed Retirement Contrib',  type:'range', min:0,   max:69000,  step:500, cur:true, def:5000  },
  ],
  `      // Self-employment tax calculation
      const seIncome      = netProfit * 0.9235
      const ssTax         = Math.min(seIncome, 168600) * 0.124
      const medicareTax   = seIncome * 0.029
      const addlMedicare  = (netProfit + otherIncome) > (filingStatus === 'married' ? 250000 : 200000) ? seIncome * 0.009 : 0
      const seTax         = ssTax + medicareTax + addlMedicare
      // Deductions
      const seDeduction   = seTax / 2
      const sepContrib    = Math.min(retirement, netProfit * 0.25)
      const totalDeduct   = seDeduction + sepContrib
      const taxableIncome = Math.max(0, netProfit + otherIncome - totalDeduct)
      // Federal income tax estimate
      const stdDeduct     = filingStatus === 'married' ? 29200 : 14600
      const taxable2      = Math.max(0, taxableIncome - stdDeduct)
      const brackets      = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let incomeTax = 0
      for (const [lo, r, hi] of brackets) { if (taxable2 <= lo) break; incomeTax += (Math.min(taxable2, hi) - lo) * r }
      const totalTax      = seTax + incomeTax
      const quarterlyEst  = totalTax / 4
      return { seTax, seDeduction, incomeTax, totalTax, quarterlyEst, totalDeduct }`,
  [
    { label:'Self-Employment Tax',       k:'seTax',        cur:true },
    { label:'SE Tax Deduction (half)',   k:'seDeduction',  cur:true },
    { label:'Federal Income Tax Est.',   k:'incomeTax',    cur:true },
    { label:'Total Tax Owed',            k:'totalTax',     cur:true },
    { label:'Quarterly Estimated Pmt',   k:'quarterlyEst', cur:true },
    { label:'Total Deductions',          k:'totalDeduct',  cur:true },
  ],
  [
    { q:'What is self-employment tax?', a:'Self-employment tax (SE tax) covers Social Security (12.4%) and Medicare (2.9%) on 92.35% of your net self-employment income — a total of 15.3%. Employees split this 50/50 with employers, but self-employed individuals pay both halves. You can deduct half of SE tax from your gross income, and your net SE income qualifies for retirement contribution deductions.' },
    { q:'When must I pay quarterly estimated taxes?', a:'You must pay quarterly estimated taxes if you expect to owe $1,000+ in federal tax for the year. Due dates: April 15 (Q1), June 15 (Q2), September 15 (Q3), January 15 of next year (Q4). Missing or underpaying triggers an underpayment penalty. Safe harbor: pay 100% of prior year tax (110% if prior year AGI exceeded $150,000) to avoid penalties.' },
    { q:'What retirement accounts are available to self-employed people?', a:'Best options: SEP-IRA (contribute up to 25% of net SE income, max $69,000 in 2024 — easiest to set up). Solo 401k (up to $23,000 employee + 25% employer contribution, max $69,000 — best for higher earners, allows Roth contributions). SIMPLE IRA (up to $16,000 employee contributions). A SEP-IRA or Solo 401k dramatically reduces SE tax burden.' },
  ],
  [
    { href:'/tax-calculator',          icon:'🧮', name:'Income Tax'      },
    { href:'/freelance-rate-calculator',icon:'🎯',name:'Freelance Rate'   },
    { href:'/invoice-calculator',      icon:'📄', name:'Invoice'         },
    { href:'/tax-refund-calculator',   icon:'💸', name:'Tax Refund'      },
  ]
))

// ── 5. Pension Calculator ────────────────────────────────────────────────────
write('pension-calculator', page(
  'Pension Calculator',
  'Calculate your defined benefit pension payout at retirement and compare to a lump sum.',
  '🏛️',
  [
    { s:'yearsService',  label:'Years of Service',            type:'range', min:1,    max:45,     step:1,    sfx:' yrs', def:25   },
    { s:'finalSalary',   label:'Final Average Salary',        type:'range', min:10000,max:500000, step:1000, cur:true, def:80000  },
    { s:'multiplier',    label:'Benefit Multiplier Per Year', type:'range', min:0.5,  max:3.0,    step:0.1,  pct:true, def:1.5   },
    { s:'retireAge',     label:'Retirement Age',              type:'range', min:50,   max:70,     step:1,    sfx:' yrs', def:62   },
    { s:'survivorBenefit',label:'Survivor Benefit Option',   type:'select', def:'50', opts:[{v:'0',l:'Single Life (max payout)'},{v:'50',l:'50% Survivor Benefit'},{v:'100',l:'100% Survivor Benefit'}] },
  ],
  `      const rawPension   = finalSalary * (multiplier / 100) * yearsService
      const survivorMult = survivorBenefit === '0' ? 1.0 : survivorBenefit === '50' ? 0.94 : 0.88
      const monthlyPension = rawPension * survivorMult / 12
      const annualPension  = monthlyPension * 12
      // Lump sum estimate (20x annual pension is common)
      const lumpSumEst     = annualPension * 20
      // Break-even vs lump sum invested at 5%
      const breakEvenYrs   = lumpSumEst / annualPension
      const pensionAt85    = monthlyPension * 12 * (85 - retireAge)
      return { monthlyPension, annualPension, lumpSumEst, breakEvenYrs: breakEvenYrs.toFixed(1) + ' years', pensionAt85 }`,
  [
    { label:'Monthly Pension Benefit',   k:'monthlyPension', cur:true  },
    { label:'Annual Pension Benefit',    k:'annualPension',  cur:true  },
    { label:'Estimated Lump Sum Value',  k:'lumpSumEst',     cur:true  },
    { label:'Break-Even vs Lump Sum',    k:'breakEvenYrs',   cur:false },
    { label:'Total Pension to Age 85',   k:'pensionAt85',    cur:true  },
  ],
  [
    { q:'Should I take a pension or lump sum?', a:'Take the pension if: you are in good health and expect to live past the break-even age (usually 78-82), you have no other guaranteed income, or you are risk-averse. Take the lump sum if: you have health issues reducing life expectancy, you have investment expertise, you want to leave money to heirs, or the pension plan is underfunded (check the funded status). Many financial advisors suggest taking the pension for its longevity insurance value.' },
    { q:'What is a survivor benefit on a pension?', a:'A survivor benefit provides income to your spouse or beneficiary after your death. Choosing 100% survivor benefit typically reduces your monthly payment by 10-15%, but your spouse receives your full pension for life. The 50% option reduces your payment by 5-8% and your spouse gets half. Single life (no survivor benefit) maximizes your payout but leaves your spouse with nothing if you die first.' },
    { q:'Are pension benefits taxable?', a:'Yes — pension income is generally taxable as ordinary income at the federal level. Most states tax pension income, though some states exempt government and military pensions. If you contributed after-tax dollars to the pension, a portion of each payment may be tax-free (your cost basis recovered pro-rata over your expected lifetime). Contact your pension administrator for your specific tax exclusion ratio.' },
  ],
  [
    { href:'/retirement-calculator',        icon:'🌅', name:'Retirement'         },
    { href:'/social-security-calculator',   icon:'🛡️', name:'Social Security'   },
    { href:'/annuity-calculator',           icon:'📅', name:'Annuity Calculator' },
    { href:'/rmd-calculator',               icon:'📋', name:'RMD Calculator'     },
  ]
))

// ── 6. Annuity Calculator ────────────────────────────────────────────────────
write('annuity-calculator', page(
  'Annuity Calculator',
  'Calculate annuity payments, future value and present value for fixed annuities.',
  '📅',
  [
    { s:'calcType',     label:'Calculate',                   type:'select', def:'payment', opts:[{v:'payment',l:'Payment from Lump Sum'},{v:'fv',l:'Future Value of Payments'},{v:'pv',l:'Lump Sum Needed for Income'}] },
    { s:'amount',       label:'Amount (lump sum or payment)',type:'range', min:100,  max:5000000, step:100,  cur:true, def:500000 },
    { s:'rate',         label:'Annual Interest Rate',        type:'range', min:0.5,  max:12,      step:0.25, pct:true, def:5      },
    { s:'years',        label:'Annuity Period',              type:'range', min:1,    max:40,      step:1,    sfx:' yrs', def:20   },
    { s:'payFreq',      label:'Payment Frequency',           type:'select', def:'monthly', opts:[{v:'monthly',l:'Monthly'},{v:'annual',l:'Annually'}] },
  ],
  `      const n = payFreq === 'monthly' ? years * 12 : years
      const r = payFreq === 'monthly' ? rate / 100 / 12 : rate / 100
      let payment, fv, pv
      if (calcType === 'payment') {
        payment = amount * r / (1 - Math.pow(1+r, -n))
        pv = amount
        fv = payment * (Math.pow(1+r, n) - 1) / r
      } else if (calcType === 'fv') {
        payment = amount
        fv = amount * (Math.pow(1+r, n) - 1) / r
        pv = amount * (1 - Math.pow(1+r, -n)) / r
      } else {
        payment = amount
        pv = amount * (1 - Math.pow(1+r, -n)) / r
        fv = amount * (Math.pow(1+r, n) - 1) / r
      }
      const totalPaid = payment * n
      const totalInterest = calcType === 'payment' ? totalPaid - amount : fv - payment * n
      return { payment, pv, fv, totalPaid, totalInterest }`,
  [
    { label:'Payment Amount',          k:'payment',       cur:true },
    { label:'Present Value (lump sum)',k:'pv',            cur:true },
    { label:'Future Value',            k:'fv',            cur:true },
    { label:'Total Payments Made',     k:'totalPaid',     cur:true },
    { label:'Total Interest Earned',   k:'totalInterest', cur:true },
  ],
  [
    { q:'What is an annuity?', a:'An annuity is a financial product where you make a lump-sum payment (or series of payments) in exchange for regular disbursements beginning immediately or at some future date. They are commonly used for retirement income. Types: immediate annuity (payments start now), deferred annuity (grows first, pays later), fixed (guaranteed rate), variable (market-linked), and indexed (tied to a market index with downside protection).' },
    { q:'Are annuities a good investment?', a:'Annuities provide guaranteed income and longevity protection, but often come with high fees (1-3% annually), surrender charges (5-10 years), low returns vs market investments, and complexity. They make sense for retirees who: have maxed all tax-advantaged accounts, want guaranteed lifetime income beyond Social Security, or are extremely risk-averse. For most investors under 60, low-cost index funds outperform annuities.' },
    { q:'How are annuity payments taxed?', a:'For non-qualified annuities (funded with after-tax money), each payment is split between a taxable earnings portion and a tax-free return of principal using the exclusion ratio. For qualified annuities (funded with pre-tax money like in an IRA), the entire payment is taxable as ordinary income. Withdrawals before age 59.5 trigger a 10% early withdrawal penalty on the earnings portion.' },
  ],
  [
    { href:'/pension-calculator',      icon:'🏛️', name:'Pension'          },
    { href:'/retirement-calculator',   icon:'🌅', name:'Retirement'       },
    { href:'/compound-interest',       icon:'💹', name:'Compound Interest'},
    { href:'/savings-interest-calculator',icon:'🏦',name:'Savings Interest'},
  ]
))

// ── 7. Life Insurance Calculator ─────────────────────────────────────────────
write('life-insurance-calculator', page(
  'Life Insurance Calculator',
  'Calculate how much life insurance coverage you need to protect your family.',
  '🛡️',
  [
    { s:'annualIncome',   label:'Annual Income to Replace',   type:'range', min:10000, max:500000, step:1000, cur:true, def:80000 },
    { s:'yearsToReplace', label:'Years of Income to Replace', type:'range', min:1,    max:30,     step:1,    sfx:' yrs', def:20  },
    { s:'existingDebt',   label:'Total Debts to Pay Off',     type:'range', min:0,    max:2000000,step:5000, cur:true, def:250000},
    { s:'childrenCosts',  label:'Future Education Costs',     type:'range', min:0,    max:500000, step:5000, cur:true, def:80000 },
    { s:'existingAssets', label:'Existing Assets and Savings',type:'range', min:0,    max:2000000,step:5000, cur:true, def:100000},
    { s:'existingCoverage',label:'Existing Life Insurance',   type:'range', min:0,    max:5000000,step:5000, cur:true, def:0     },
  ],
  `      const incomeNeed    = annualIncome * yearsToReplace
      const totalNeed     = incomeNeed + existingDebt + childrenCosts
      const netNeed       = Math.max(0, totalNeed - existingAssets - existingCoverage)
      const dimeMethod    = annualIncome * 10 + existingDebt + childrenCosts + (annualIncome * 4)
      const humanLifeVal  = annualIncome * yearsToReplace
      return { incomeNeed, totalNeed, netNeed, dimeMethod, humanLifeVal }`,
  [
    { label:'Income Replacement Need',   k:'incomeNeed',   cur:true },
    { label:'Total Coverage Needed',     k:'totalNeed',    cur:true },
    { label:'Net Additional Coverage',   k:'netNeed',      cur:true },
    { label:'DIME Method Estimate',      k:'dimeMethod',   cur:true },
    { label:'Human Life Value Estimate', k:'humanLifeVal', cur:true },
  ],
  [
    { q:'How much life insurance do I need?', a:'A common rule of thumb is 10-12x your annual income. For more precision use the DIME method: Debt + Income (years needed x annual income) + Mortgage + Education. A $80,000 earner with $300,000 mortgage, $80,000 education costs and 20-year need = approximately $1,980,000 in coverage. Subtract existing savings and any current coverage to find the gap.' },
    { q:'Term vs whole life insurance: which is better?', a:'Term life insurance is almost always the better financial choice for most people. A 20-year $1M term policy for a healthy 35-year-old costs $40-$60/month. The same coverage in whole life costs $600-$900/month. The standard advice: buy term and invest the difference. Whole life can make sense in very specific estate planning scenarios for high-net-worth individuals.' },
    { q:'When should I buy life insurance?', a:'Buy as early as possible — premiums are lowest when you are young and healthy. Key life triggers: marriage, having children, buying a home, starting a business, or becoming someone primary breadwinner. Do not wait for health issues to develop. A 30-year-old in good health pays 50-70% less than a 45-year-old for the same coverage. Lock in low rates while you can.' },
  ],
  [
    { href:'/estate-tax-calculator',   icon:'🏛️', name:'Estate Tax'       },
    { href:'/net-worth-calculator',    icon:'💰', name:'Net Worth'         },
    { href:'/retirement-calculator',   icon:'🌅', name:'Retirement'        },
    { href:'/pension-calculator',      icon:'🏛️', name:'Pension'           },
  ]
))

// ── 8. College Savings Calculator ───────────────────────────────────────────
write('college-savings-calculator', page(
  'College Savings Calculator',
  'Calculate how much to save in a 529 plan to cover tuition and college costs.',
  '🎓',
  [
    { s:'childAge',      label:'Child Current Age',           type:'range', min:0,    max:17,     step:1,    sfx:' yrs', def:5   },
    { s:'collegeYears',  label:'Years of College',            type:'range', min:2,    max:6,      step:1,    sfx:' yrs', def:4   },
    { s:'annualCost',    label:'Current Annual College Cost', type:'range', min:5000, max:100000, step:1000, cur:true, def:35000  },
    { s:'inflation',     label:'College Inflation Rate',      type:'range', min:2,    max:8,      step:0.25, pct:true, def:5     },
    { s:'currentSaved',  label:'Already Saved',               type:'range', min:0,    max:500000, step:500,  cur:true, def:5000  },
    { s:'returnRate',    label:'Expected Investment Return',  type:'range', min:1,    max:12,     step:0.25, pct:true, def:7     },
  ],
  `      const yearsToCollege = 18 - childAge
      if (yearsToCollege <= 0) return null
      // Project total college cost with inflation
      let totalCost = 0
      for (let yr = 0; yr < collegeYears; yr++) {
        totalCost += annualCost * Math.pow(1 + inflation/100, yearsToCollege + yr)
      }
      const fvCurrent   = currentSaved * Math.pow(1 + returnRate/100, yearsToCollege)
      const remaining   = Math.max(0, totalCost - fvCurrent)
      const r           = returnRate / 100 / 12
      const n           = yearsToCollege * 12
      const monthlyNeeded = remaining > 0 ? remaining * r / (Math.pow(1+r,n) - 1) : 0
      const taxFreeBenefit = monthlyNeeded * n * 0.22
      return { totalCost, fvCurrent, remaining, monthlyNeeded, taxFreeBenefit }`,
  [
    { label:'Projected Total College Cost', k:'totalCost',       cur:true },
    { label:'Current Savings at Maturity',  k:'fvCurrent',       cur:true },
    { label:'Additional Amount Needed',     k:'remaining',       cur:true },
    { label:'Monthly Savings Required',     k:'monthlyNeeded',   cur:true },
    { label:'Estimated Tax-Free Growth Benefit', k:'taxFreeBenefit', cur:true },
  ],
  [
    { q:'What is a 529 plan and how does it work?', a:'A 529 plan is a tax-advantaged savings account for education expenses. Contributions grow tax-free and withdrawals for qualified education expenses (tuition, room and board, books, computers) are tax-free federally. Many states offer a tax deduction for contributions. The SECURE 2.0 Act allows rolling unused 529 funds into a Roth IRA (up to $35,000 lifetime, subject to rules).' },
    { q:'How much should I save in a 529 plan?', a:'A 4-year public university currently costs $110,000-$130,000 total (in-state). A private university costs $250,000-$350,000. Starting at birth, saving $300-$500/month in a 529 with a 7% return covers most 4-year public university costs. Starting later requires significantly more monthly contributions. Even partial funding reduces student loan burden dramatically.' },
    { q:'What if my child does not go to college?', a:'If a 529 beneficiary does not attend college: change the beneficiary to another family member (sibling, cousin, parent — for grad school), use for trade school or vocational programs (qualified expenses), roll up to $35,000 into a Roth IRA (SECURE 2.0, requires 529 to be open 15+ years), or withdraw non-qualified funds (earnings taxed + 10% penalty, but principal returned tax-free).' },
  ],
  [
    { href:'/child-tax-credit-calculator',  icon:'👶', name:'Child Tax Credit'  },
    { href:'/savings-goal-calculator',      icon:'🎯', name:'Savings Goal'      },
    { href:'/compound-interest',            icon:'💹', name:'Compound Interest' },
    { href:'/student-loan-calculator',      icon:'📚', name:'Student Loan'      },
  ]
))

// ── 9. Car Affordability Calculator ─────────────────────────────────────────
write('car-affordability-calculator', page(
  'Car Affordability Calculator',
  'Find out the maximum car price you can afford based on income and the 20/4/10 rule.',
  '🚘',
  [
    { s:'monthlyIncome',  label:'Monthly Gross Income',        type:'range', min:1000,  max:50000, step:100, cur:true, def:6000  },
    { s:'downPayment',    label:'Available Down Payment',      type:'range', min:0,     max:100000,step:500, cur:true, def:5000  },
    { s:'tradeIn',        label:'Trade-In Value',              type:'range', min:0,     max:50000, step:250, cur:true, def:0     },
    { s:'loanRate',       label:'Expected Loan Rate',          type:'range', min:0,     max:25,    step:0.25,pct:true, def:7     },
    { s:'termMonths',     label:'Loan Term',                   type:'select', def:60, opts:[{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:72,l:'72 mo'}] },
  ],
  `      // 20/4/10 rule: 20% down, max 4 yr loan, max 10% gross income on transport
      const maxMonthlyPmt  = monthlyIncome * 0.10
      const r              = loanRate / 100 / 12
      const n              = termMonths
      const maxLoan        = r > 0 ? maxMonthlyPmt * (1 - Math.pow(1+r,-n)) / r : maxMonthlyPmt * n
      const downPayAvail   = downPayment + tradeIn
      const maxCar         = maxLoan + downPayAvail
      // Conservative 15% rule
      const maxPmt15       = monthlyIncome * 0.15
      const maxLoan15      = r > 0 ? maxPmt15 * (1 - Math.pow(1+r,-n)) / r : maxPmt15 * n
      const maxCar15       = maxLoan15 + downPayAvail
      const recDownPct     = (downPayAvail / maxCar * 100).toFixed(1) + '%'
      return { maxCar, maxLoan, maxMonthlyPmt, maxCar15, recDownPct }`,
  [
    { label:'Max Affordable Car (10% rule)', k:'maxCar',        cur:true  },
    { label:'Max Loan Amount',               k:'maxLoan',       cur:true  },
    { label:'Max Monthly Payment (10%)',     k:'maxMonthlyPmt', cur:true  },
    { label:'Max Car (15% relaxed rule)',    k:'maxCar15',      cur:true  },
    { label:'Down Payment as % of Max Car', k:'recDownPct',    cur:false },
  ],
  [
    { q:'What is the 20/4/10 rule for buying a car?', a:'The 20/4/10 rule: put at least 20% down, finance for no more than 4 years, and keep total vehicle expenses (payment + insurance + gas) under 10% of gross monthly income. On a $6,000/month income that is $600 max. With insurance and gas taking $250-$350, your loan payment should stay under $250-$350/month, pointing to a car in the $15,000-$20,000 range with 20% down.' },
    { q:'How much car can I afford on my salary?', a:'General guidance: spend no more than 20-35% of your annual take-home pay on a car. On a $60,000 take-home ($5,000/month) that is $12,000-$21,000. The lower end is financially safer. Remember the purchase price is only part of the cost — insurance, fuel, maintenance and registration add $200-$800/month on top of the loan payment.' },
    { q:'Should I buy new or used?', a:'Used cars typically offer 30-50% lower purchase price, lower insurance premiums, slower depreciation (new cars lose 20% in year one), and similar reliability for models 2-4 years old (still under warranty). Buy new when: 0% financing promotions make it cost-competitive, you plan to keep the car 10+ years, or the specific model has poor used car reliability history.' },
  ],
  [
    { href:'/car-loan-calculator',         icon:'🚗', name:'Car Loan'         },
    { href:'/lease-vs-buy-calculator',     icon:'🔄', name:'Lease vs Buy'     },
    { href:'/car-depreciation-calculator', icon:'📉', name:'Car Depreciation' },
    { href:'/fuel-cost-calculator',        icon:'⛽', name:'Fuel Cost'        },
  ]
))

// ── 10. Home Improvement Loan Calculator ─────────────────────────────────────
write('home-improvement-loan-calculator', page(
  'Home Improvement Loan Calculator',
  'Compare home equity loan, HELOC, personal loan and cash-out refinance for renovations.',
  '🔨',
  [
    { s:'projectCost',   label:'Total Project Cost',          type:'range', min:1000,  max:500000, step:500,  cur:true, def:30000 },
    { s:'loanType',      label:'Financing Type',              type:'select', def:'heloan', opts:[{v:'heloan',l:'Home Equity Loan'},{v:'heloc',l:'HELOC'},{v:'personal',l:'Personal Loan'},{v:'refi',l:'Cash-Out Refi'}] },
    { s:'rate',          label:'Interest Rate',               type:'range', min:1,     max:25,     step:0.25, pct:true, def:8     },
    { s:'termYears',     label:'Loan Term',                   type:'select', def:10, opts:[{v:5,l:'5 yrs'},{v:7,l:'7 yrs'},{v:10,l:'10 yrs'},{v:15,l:'15 yrs'},{v:20,l:'20 yrs'}] },
    { s:'homeValueIncrease', label:'Expected Home Value Increase', type:'range', min:0, max:200, step:5, pct:true, def:50 },
  ],
  `      const r         = rate / 100 / 12
      const n         = termYears * 12
      const monthly   = projectCost * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - projectCost
      const valueAdded = projectCost * (homeValueIncrease / 100)
      const netCost    = totalPaid - valueAdded
      const roi        = (valueAdded / totalPaid * 100).toFixed(1) + '%'
      return { monthly, totalInterest, totalPaid, valueAdded, netCost, roi }`,
  [
    { label:'Monthly Payment',            k:'monthly',       cur:true  },
    { label:'Total Interest Cost',        k:'totalInterest', cur:true  },
    { label:'Total Loan Cost',            k:'totalPaid',     cur:true  },
    { label:'Estimated Value Added',      k:'valueAdded',    cur:true  },
    { label:'Net Cost After Value Added', k:'netCost',       cur:true  },
    { label:'Renovation ROI',             k:'roi',           cur:false },
  ],
  [
    { q:'What home improvements add the most value?', a:'Highest ROI renovations (national averages): garage door replacement 194% ROI, manufactured stone veneer 153%, minor kitchen remodel 96%, siding replacement 89%, window replacement 69%. Lower ROI but high enjoyment: major kitchen remodel 38%, bathroom addition 35%, primary suite addition 36%. Location matters enormously — the same project can have very different ROI depending on the local market.' },
    { q:'Home equity loan vs HELOC vs personal loan?', a:'Home equity loan: fixed rate, lump sum, best for large one-time projects, secured by your home. HELOC: variable rate, revolving credit line, best for ongoing projects or unknown costs. Personal loan: no collateral, higher rate, faster approval, best for smaller projects or renters. Cash-out refinance: replaces your mortgage, best if rates are lower than your current mortgage.' },
    { q:'Do I need a permit for home renovations?', a:'Permits are generally required for: structural changes, electrical work beyond simple fixture replacement, plumbing changes, HVAC work, additions, decks over certain heights, and window/door structural changes. Unpermitted work can: cause problems when selling (lenders and buyers require disclosure), void homeowners insurance for those areas, and create safety hazards. Always check local requirements before starting.' },
  ],
  [
    { href:'/heloc-calculator',          icon:'🏠', name:'HELOC Calculator'  },
    { href:'/home-equity-calculator',    icon:'💰', name:'Home Equity'       },
    { href:'/personal-loan-calculator',  icon:'👤', name:'Personal Loan'     },
    { href:'/mortgage-calculator',       icon:'🏠', name:'Mortgage'          },
  ]
))

// ── 11. Solar Payback Calculator ─────────────────────────────────────────────
write('solar-payback-calculator', page(
  'Solar Panel Payback Calculator',
  'Calculate solar panel payback period, ROI and lifetime savings for your home.',
  '☀️',
  [
    { s:'systemCost',    label:'Total System Cost (before incentives)', type:'range', min:5000, max:100000, step:500, cur:true, def:25000 },
    { s:'federalCredit', label:'Federal Tax Credit %',                  type:'range', min:0,   max:40,     step:1,   pct:true, def:30    },
    { s:'monthlyBill',   label:'Current Monthly Electric Bill',         type:'range', min:20,  max:1000,   step:5,   cur:true, def:180   },
    { s:'offsetPct',     label:'Solar Offset % of Bill',                type:'range', min:50,  max:100,    step:5,   pct:true, def:90    },
    { s:'elecInflation', label:'Annual Electricity Rate Increase',      type:'range', min:1,   max:8,      step:0.5, pct:true, def:3     },
    { s:'systemLife',    label:'System Life',                           type:'range', min:20,  max:30,     step:1,   sfx:' yrs', def:25  },
  ],
  `      const creditAmount  = systemCost * (federalCredit / 100)
      const netCost       = systemCost - creditAmount
      const annualSavings = monthlyBill * (offsetPct / 100) * 12
      // Simple payback
      const simplePayback = netCost / annualSavings
      // Lifetime savings with escalation
      let lifetimeSavings = 0
      for (let yr = 1; yr <= systemLife; yr++) {
        lifetimeSavings += annualSavings * Math.pow(1 + elecInflation/100, yr - 1)
      }
      const lifetimeROI   = ((lifetimeSavings - netCost) / netCost * 100).toFixed(1) + '%'
      const netProfit     = lifetimeSavings - netCost
      return { creditAmount, netCost, annualSavings, simplePayback: simplePayback.toFixed(1) + ' years', lifetimeSavings, netProfit, lifetimeROI }`,
  [
    { label:'Federal Tax Credit',         k:'creditAmount',   cur:true  },
    { label:'Net System Cost After Credit',k:'netCost',       cur:true  },
    { label:'Annual Electric Savings',    k:'annualSavings',  cur:true  },
    { label:'Simple Payback Period',      k:'simplePayback',  cur:false },
    { label:'Lifetime Savings',           k:'lifetimeSavings',cur:true  },
    { label:'Net Lifetime Profit',        k:'netProfit',      cur:true  },
    { label:'Lifetime ROI',               k:'lifetimeROI',    cur:false },
  ],
  [
    { q:'How long does it take solar panels to pay for themselves?', a:'Average solar payback period in the US is 6-10 years. With the 30% federal tax credit and average electricity savings, a $25,000 system net cost of $17,500 at $1,800/year in savings pays back in about 9-10 years. Sunny states (California, Arizona, Texas, Florida) have shorter payback periods due to more sunlight hours and higher electricity rates.' },
    { q:'What is the federal solar tax credit in 2026?', a:'The federal Investment Tax Credit (ITC) for residential solar is 30% of total system cost through 2032, then steps down to 26% in 2033 and 22% in 2034. This is a dollar-for-dollar reduction in federal income tax owed. On a $25,000 system, the credit is $7,500. You must have sufficient tax liability to use the full credit — unused credit carries forward to future years.' },
    { q:'Does solar increase home value?', a:'Studies show solar panels increase home value by 3-4% on average. A Zillow study found homes with solar sold for 4.1% more. On a $400,000 home that is a $16,400 increase in value. Combined with electricity savings and the federal tax credit, solar is one of the highest-ROI home improvements available. Most states also exempt solar from property tax reassessment.' },
  ],
  [
    { href:'/home-improvement-loan-calculator',icon:'🔨',name:'Home Improvement' },
    { href:'/roi-calculator',             icon:'💎', name:'ROI Calculator'    },
    { href:'/home-equity-calculator',     icon:'💰', name:'Home Equity'       },
    { href:'/mortgage-calculator',        icon:'🏠', name:'Mortgage'          },
  ]
))

// ── 12. Invoice Calculator ───────────────────────────────────────────────────
write('invoice-calculator', page(
  'Invoice Calculator',
  'Create professional invoice calculations with tax, discounts and late fee estimates.',
  '📄',
  [
    { s:'subtotal',      label:'Invoice Subtotal',             type:'range', min:0,   max:500000, step:10,   cur:true, def:2500  },
    { s:'discountPct',   label:'Discount',                     type:'range', min:0,   max:50,     step:0.5,  pct:true, def:0     },
    { s:'taxRate',       label:'Sales Tax Rate',               type:'range', min:0,   max:15,     step:0.25, pct:true, def:8     },
    { s:'daysPastDue',   label:'Days Past Due (for late fee)', type:'range', min:0,   max:120,    step:1,    sfx:' days', def:0  },
    { s:'lateFeeRate',   label:'Late Fee Rate (monthly)',      type:'range', min:0,   max:5,      step:0.25, pct:true, def:1.5   },
  ],
  `      const discount    = subtotal * (discountPct / 100)
      const afterDiscount = subtotal - discount
      const taxAmount   = afterDiscount * (taxRate / 100)
      const invoiceTotal = afterDiscount + taxAmount
      const lateFee     = daysPastDue > 0 ? invoiceTotal * (lateFeeRate / 100) * (daysPastDue / 30) : 0
      const totalOwed   = invoiceTotal + lateFee
      const annualRate  = lateFeeRate * 12
      return { discount, afterDiscount, taxAmount, invoiceTotal, lateFee, totalOwed, annualRate: annualRate.toFixed(1) + '%' }`,
  [
    { label:'Discount Amount',           k:'discount',      cur:true  },
    { label:'Subtotal After Discount',   k:'afterDiscount', cur:true  },
    { label:'Tax Amount',                k:'taxAmount',     cur:true  },
    { label:'Invoice Total',             k:'invoiceTotal',  cur:true  },
    { label:'Late Fee',                  k:'lateFee',       cur:true  },
    { label:'Total Amount Owed',         k:'totalOwed',     cur:true  },
    { label:'Late Fee Annual Rate',      k:'annualRate',    cur:false },
  ],
  [
    { q:'What is a standard late fee for invoices?', a:'Standard late fees for B2B invoices: 1-2% per month (12-24% annually) is common in the US. Many states cap late fees at 1.5% per month (18% annually). Always state the late fee terms clearly on the invoice before work begins and in the contract. Net 30 with 1.5%/month late fee is a widely accepted standard. Always check your state regulations.' },
    { q:'How do I get clients to pay invoices faster?', a:'Most effective methods: require a 25-50% upfront deposit before starting work, offer 2% early payment discount (2/10 Net 30), send invoices immediately upon project completion (not at month end), use automated follow-up reminders at 7, 14, and 30 days, accept credit cards and ACH to remove payment friction, and for repeat late payers require prepayment going forward.' },
    { q:'What should every invoice include?', a:'Required elements: your business name, address and contact info, client name and address, unique invoice number, invoice date, payment due date, itemized services or products with quantities and unit prices, subtotal, any discounts, sales tax (if applicable), total amount due, payment methods accepted, and your late fee policy. A professional invoice reduces disputes and speeds payment.' },
  ],
  [
    { href:'/self-employment-tax-calculator',icon:'🧾',name:'SE Tax'          },
    { href:'/freelance-rate-calculator',  icon:'🎯', name:'Freelance Rate'    },
    { href:'/sales-tax-calculator',       icon:'🧾', name:'Sales Tax'         },
    { href:'/accounts-receivable-calculator',icon:'📬',name:'AR Calculator'  },
  ]
))

console.log(`
════════════════════════════════════════════════════
  STAGE 9a COMPLETE — 12 missing calculators built
════════════════════════════════════════════════════
   1.  /debt-payoff-calculator
   2.  /tax-calculator
   3.  /capital-gains-tax-calculator
   4.  /self-employment-tax-calculator
   5.  /pension-calculator
   6.  /annuity-calculator
   7.  /life-insurance-calculator
   8.  /college-savings-calculator
   9.  /car-affordability-calculator
  10.  /home-improvement-loan-calculator
  11.  /solar-payback-calculator
  12.  /invoice-calculator
════════════════════════════════════════════════════
`)
