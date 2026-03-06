/**
 * FreeFinCalc.net — STAGE 9b: 11 More Missing Calculators
 * node stage9b_missing.js
 *
 *  1.  markup-calculator
 *  2.  discount-calculator
 *  3.  loan-comparison-calculator
 *  4.  biweekly-mortgage-calculator
 *  5.  extra-payment-calculator
 *  6.  cd-calculator
 *  7.  savings-goal-calculator
 *  8.  fire-calculator
 *  9.  debt-consolidation-calculator
 * 10.  balance-transfer-calculator
 * 11.  insurance-calculator
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

// ── 1. Markup Calculator ─────────────────────────────────────────────────────
write('markup-calculator', page(
  'Markup Calculator',
  'Calculate selling price from cost and markup percentage, or find your profit margin.',
  '🏷️',
  [
    { s:'cost',         label:'Cost Price',                  type:'range', min:0.01, max:100000, step:0.01, cur:true, def:50    },
    { s:'markupPct',    label:'Markup Percentage',           type:'range', min:0,    max:500,    step:1,    pct:true, def:40    },
    { s:'units',        label:'Units Sold Per Month',        type:'range', min:1,    max:100000, step:1,    sfx:' units', def:100},
  ],
  `      const sellingPrice = cost * (1 + markupPct / 100)
      const grossProfit  = sellingPrice - cost
      const marginPct    = (grossProfit / sellingPrice * 100).toFixed(2) + '%'
      const monthlyRevenue = sellingPrice * units
      const monthlyProfit  = grossProfit * units
      const monthlyCogsTotal = cost * units
      return { sellingPrice, grossProfit, marginPct, monthlyRevenue, monthlyProfit, monthlyCogsTotal }`,
  [
    { label:'Selling Price',             k:'sellingPrice',    cur:true  },
    { label:'Gross Profit Per Unit',     k:'grossProfit',     cur:true  },
    { label:'Profit Margin %',           k:'marginPct',       cur:false },
    { label:'Monthly Revenue',           k:'monthlyRevenue',  cur:true  },
    { label:'Monthly Gross Profit',      k:'monthlyProfit',   cur:true  },
    { label:'Monthly Total COGS',        k:'monthlyCogsTotal',cur:true  },
  ],
  [
    { q:'What is the difference between markup and margin?', a:'Markup is calculated on cost: a 40% markup on a $50 product = $20 profit, selling at $70. Margin is calculated on selling price: $20 / $70 = 28.6% margin. The same profit looks like a bigger number as markup vs margin. To convert: Margin = Markup / (1 + Markup). A 40% markup equals a 28.6% margin. Retailers typically discuss margin; manufacturers discuss markup.' },
    { q:'What is a good markup percentage?', a:'Markup varies widely by industry: grocery retail 15-25%, restaurants 300% on food (food cost target is 25-35%), clothing retail 50-100%, electronics 10-20%, jewelry 50-100%, software 80-90%+. The right markup must cover all operating costs beyond COGS and still generate profit. Work backwards from desired net profit margin and total fixed costs to find your minimum viable markup.' },
    { q:'How do I price my products profitably?', a:'Cost-plus pricing (cost + markup) is simple but ignores competition and perceived value. Value-based pricing charges what customers are willing to pay, often yielding higher margins. Competitive pricing matches or undercuts rivals. For new products: research competitor prices, calculate break-even markup, then test price points. Premium pricing with strong branding often outperforms cost-plus significantly.' },
  ],
  [
    { href:'/profit-margin-calculator',   icon:'📈', name:'Profit Margin'    },
    { href:'/break-even-calculator',      icon:'⚖️', name:'Break-Even'       },
    { href:'/discount-calculator',        icon:'🏷️', name:'Discount'         },
    { href:'/ecommerce-profit-calculator',icon:'🛒', name:'Ecommerce Profit' },
  ]
))

// ── 2. Discount Calculator ───────────────────────────────────────────────────
write('discount-calculator', page(
  'Discount Calculator',
  'Calculate sale price, savings amount and percentage off for any discount.',
  '🎯',
  [
    { s:'originalPrice', label:'Original Price',               type:'range', min:0.01, max:100000, step:0.01, cur:true, def:120  },
    { s:'discountPct',   label:'Discount Percentage',          type:'range', min:0,    max:100,    step:0.5,  pct:true, def:25   },
    { s:'taxRate',       label:'Sales Tax Rate',               type:'range', min:0,    max:15,     step:0.25, pct:true, def:8    },
    { s:'qty',           label:'Quantity',                     type:'range', min:1,    max:1000,   step:1,    sfx:' units', def:1 },
  ],
  `      const discountAmt  = originalPrice * (discountPct / 100)
      const salePrice    = originalPrice - discountAmt
      const taxAmount    = salePrice * (taxRate / 100)
      const finalPrice   = salePrice + taxAmount
      const totalSavings = discountAmt * qty
      const totalFinal   = finalPrice * qty
      const totalOriginal= (originalPrice + originalPrice * taxRate / 100) * qty
      return { discountAmt, salePrice, taxAmount, finalPrice, totalSavings, totalFinal, totalOriginal }`,
  [
    { label:'Discount Amount',           k:'discountAmt',  cur:true },
    { label:'Sale Price (before tax)',   k:'salePrice',    cur:true },
    { label:'Tax Amount',                k:'taxAmount',    cur:true },
    { label:'Final Price Per Unit',      k:'finalPrice',   cur:true },
    { label:'Total Savings',             k:'totalSavings', cur:true },
    { label:'Total Final Price',         k:'totalFinal',   cur:true },
  ],
  [
    { q:'How do I calculate percent off?', a:'Percent off = (Discount Amount / Original Price) x 100. For a $30 discount on a $120 item: $30 / $120 x 100 = 25% off. To find the sale price: Sale Price = Original Price x (1 - Discount%). For 25% off $120: $120 x 0.75 = $90. Always calculate the final price including sales tax to know true cost before purchasing.' },
    { q:'Are stacked discounts the same as adding percentages?', a:'No — stacked discounts multiply, not add. A 20% off coupon applied to a 30% off sale is not 50% off. You first pay 70% of original price, then 80% of that: 0.70 x 0.80 = 0.56, so 44% off total. This matters when comparing bundle deals. Always calculate step by step when combining multiple discounts.' },
    { q:'What is the best day to shop for discounts?', a:'Historically best discount periods: Black Friday / Cyber Monday (electronics, appliances — 20-40% off), Amazon Prime Day (July — similar savings), end of season clearance (clothing — 50-70% off), holiday weekends (Memorial Day, Labor Day — furniture, mattresses, appliances), and end of model year for cars (August-October when dealers clear inventory).' },
  ],
  [
    { href:'/markup-calculator',          icon:'🏷️', name:'Markup Calculator' },
    { href:'/sales-tax-calculator',       icon:'🧾', name:'Sales Tax'         },
    { href:'/tip-calculator',             icon:'💡', name:'Tip Calculator'    },
    { href:'/profit-margin-calculator',   icon:'📈', name:'Profit Margin'     },
  ]
))

// ── 3. Loan Comparison Calculator ───────────────────────────────────────────
write('loan-comparison-calculator', page(
  'Loan Comparison Calculator',
  'Compare two loans side by side to find the best deal including total cost and monthly payment.',
  '🔍',
  [
    { s:'amount1',      label:'Loan 1 Amount',               type:'range', min:1000, max:1000000, step:500,  cur:true, def:25000 },
    { s:'rate1',        label:'Loan 1 Interest Rate',        type:'range', min:0,    max:36,      step:0.25, pct:true, def:7     },
    { s:'term1',        label:'Loan 1 Term',                 type:'select', def:60, opts:[{v:12,l:'12 mo'},{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:84,l:'84 mo'},{v:120,l:'120 mo'},{v:180,l:'180 mo'},{v:360,l:'360 mo'}] },
    { s:'amount2',      label:'Loan 2 Amount',               type:'range', min:1000, max:1000000, step:500,  cur:true, def:25000 },
    { s:'rate2',        label:'Loan 2 Interest Rate',        type:'range', min:0,    max:36,      step:0.25, pct:true, def:9.5   },
    { s:'term2',        label:'Loan 2 Term',                 type:'select', def:36, opts:[{v:12,l:'12 mo'},{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'},{v:84,l:'84 mo'},{v:120,l:'120 mo'},{v:180,l:'180 mo'},{v:360,l:'360 mo'}] },
  ],
  `      const calc = (amt, rate, term) => {
        const r = rate / 100 / 12
        const monthly = r > 0 ? amt * (r * Math.pow(1+r,term)) / (Math.pow(1+r,term)-1) : amt/term
        const total = monthly * term
        const interest = total - amt
        return { monthly, total, interest }
      }
      const l1 = calc(amount1, rate1, term1)
      const l2 = calc(amount2, rate2, term2)
      const betterMonthly = l1.monthly <= l2.monthly ? 'Loan 1 lower payment' : 'Loan 2 lower payment'
      const betterTotal   = l1.total <= l2.total ? 'Loan 1 cheaper overall' : 'Loan 2 cheaper overall'
      const totalDiff     = Math.abs(l1.total - l2.total)
      return {
        monthly1: l1.monthly, total1: l1.total, interest1: l1.interest,
        monthly2: l2.monthly, total2: l2.total, interest2: l2.interest,
        betterMonthly, betterTotal, totalDiff
      }`,
  [
    { label:'Loan 1 Monthly Payment',    k:'monthly1',      cur:true  },
    { label:'Loan 1 Total Cost',         k:'total1',        cur:true  },
    { label:'Loan 1 Total Interest',     k:'interest1',     cur:true  },
    { label:'Loan 2 Monthly Payment',    k:'monthly2',      cur:true  },
    { label:'Loan 2 Total Cost',         k:'total2',        cur:true  },
    { label:'Loan 2 Total Interest',     k:'interest2',     cur:true  },
    { label:'Lower Monthly Payment',     k:'betterMonthly', cur:false },
    { label:'Cheaper Overall',           k:'betterTotal',   cur:false },
    { label:'Total Cost Difference',     k:'totalDiff',     cur:true  },
  ],
  [
    { q:'How do I choose between two loan offers?', a:'Compare total cost (not just monthly payment). A lower monthly payment with a longer term often costs more overall. Check: total interest paid, all fees (origination, prepayment penalties), APR (includes fees — more accurate than rate alone), flexibility (can I pay extra without penalty?), and lender reputation. The lowest APR with no prepayment penalties is usually the best deal.' },
    { q:'When is a higher monthly payment worth it?', a:'A higher monthly payment (shorter term loan) is worth it when: total interest savings are significant, you have stable income to handle the payment, and you want to pay off debt faster. Paying $200 more per month on a $25,000 loan at 7% by choosing 36 months over 60 months saves over $2,000 in interest and gets you debt-free 2 years sooner.' },
    { q:'What fees should I look for when comparing loans?', a:'Key fees to compare: origination fee (0-5% of loan amount), prepayment penalty (charged if you pay off early — avoid), late payment fees, returned payment fees, and annual fees on lines of credit. Always ask for the APR which includes all fees for an apples-to-apples rate comparison between lenders.' },
  ],
  [
    { href:'/personal-loan-calculator',   icon:'👤', name:'Personal Loan'    },
    { href:'/mortgage-calculator',        icon:'🏠', name:'Mortgage'         },
    { href:'/apr-calculator',             icon:'📊', name:'APR Calculator'   },
    { href:'/debt-consolidation-calculator',icon:'🔗',name:'Debt Consolidation'},
  ]
))

// ── 4. Biweekly Mortgage Calculator ─────────────────────────────────────────
write('biweekly-mortgage-calculator', page(
  'Biweekly Mortgage Calculator',
  'See how biweekly mortgage payments save interest and pay off your mortgage years early.',
  '🏠',
  [
    { s:'loanAmount',   label:'Loan Amount',                 type:'range', min:50000,  max:2000000, step:5000, cur:true, def:350000 },
    { s:'rate',         label:'Annual Interest Rate',        type:'range', min:1,      max:12,      step:0.125,pct:true, def:6.875  },
    { s:'termYears',    label:'Loan Term',                   type:'select', def:30, opts:[{v:15,l:'15 yrs'},{v:20,l:'20 yrs'},{v:30,l:'30 yrs'}] },
  ],
  `      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const biweekly = monthly / 2
      // Biweekly means 26 payments/year = 13 monthly payments equivalent
      const extraMonthly = monthly / 12
      const newRate = rate / 100 / 12
      // Find months to payoff with extra monthly
      const newMonths = Math.ceil(-Math.log(1 - loanAmount * newRate / (monthly + extraMonthly)) / Math.log(1 + newRate))
      const monthlyTotal = monthly * n
      const biweeklyTotal = (monthly + extraMonthly) * newMonths
      const interestSaved = monthlyTotal - biweeklyTotal
      const yearsSaved    = ((n - newMonths) / 12).toFixed(1)
      return { monthly, biweekly, newMonths: newMonths + ' months', yearsSaved: yearsSaved + ' years', interestSaved, monthlyTotal, biweeklyTotal }`,
  [
    { label:'Standard Monthly Payment',     k:'monthly',       cur:true  },
    { label:'Biweekly Payment Amount',      k:'biweekly',      cur:true  },
    { label:'Payoff with Biweekly',         k:'newMonths',     cur:false },
    { label:'Years Saved',                  k:'yearsSaved',    cur:false },
    { label:'Interest Saved',               k:'interestSaved', cur:true  },
    { label:'Standard Total Cost',          k:'monthlyTotal',  cur:true  },
    { label:'Biweekly Total Cost',          k:'biweeklyTotal', cur:true  },
  ],
  [
    { q:'How do biweekly mortgage payments work?', a:'Instead of 12 monthly payments, you make 26 half-payments per year. Since 26 half-payments equal 13 full monthly payments (not 12), you make one extra payment per year. On a 30-year $350,000 mortgage at 6.875%, this saves approximately $80,000-$100,000 in interest and pays off the loan 5-6 years early. The savings compound because you reduce principal faster.' },
    { q:'How do I set up biweekly mortgage payments?', a:'Three options: (1) Ask your lender or servicer directly — many offer official biweekly programs, sometimes for a fee. (2) Set up automatic biweekly transfers from your bank to a separate account, then manually pay monthly. (3) Simply divide your monthly payment by 12 and add that amount to each monthly payment as extra principal — same math, no biweekly logistics needed.' },
    { q:'Are biweekly payment programs worth the fees?', a:'Third-party biweekly programs that charge setup fees ($300-$400) and transaction fees ($5-$10 per payment) are generally not worth it. You get the same benefit for free by adding 1/12 of your monthly payment as extra principal each month. If your lender charges no fees for biweekly enrollment, it can be a convenient way to automate the extra payment discipline.' },
  ],
  [
    { href:'/mortgage-calculator',        icon:'🏠', name:'Mortgage'           },
    { href:'/extra-payment-calculator',   icon:'💰', name:'Extra Payment'      },
    { href:'/amortization-calculator',    icon:'📋', name:'Amortization'       },
    { href:'/refinance-calculator',       icon:'🔄', name:'Refinance'          },
  ]
))

// ── 5. Extra Payment Calculator ──────────────────────────────────────────────
write('extra-payment-calculator', page(
  'Extra Mortgage Payment Calculator',
  'See how extra mortgage payments reduce interest and shorten your loan payoff date.',
  '💰',
  [
    { s:'balance',      label:'Current Loan Balance',         type:'range', min:10000,  max:2000000, step:5000, cur:true, def:320000 },
    { s:'rate',         label:'Annual Interest Rate',         type:'range', min:1,      max:12,      step:0.125,pct:true, def:6.875  },
    { s:'remainMonths', label:'Remaining Loan Term',          type:'range', min:12,     max:360,     step:6,    sfx:' mo', def:300   },
    { s:'extraType',    label:'Extra Payment Type',           type:'select', def:'monthly', opts:[{v:'monthly',l:'Extra Monthly'},{v:'annual',l:'Extra Annual'},{v:'onetime',l:'One-Time Lump Sum'}] },
    { s:'extraAmount',  label:'Extra Payment Amount',         type:'range', min:0,      max:50000,   step:50,   cur:true, def:200    },
  ],
  `      const r = rate / 100 / 12
      const n = remainMonths
      const basePayment = balance * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      // Months without extra
      const totalBase = basePayment * n
      const interestBase = totalBase - balance
      // With extra payments
      let bal = balance
      let months = 0
      let totalPaid = 0
      // Apply one-time lump sum upfront
      if (extraType === 'onetime') bal = Math.max(0, bal - extraAmount)
      while (bal > 0.01 && months < n + 600) {
        const intCharge = bal * r
        const extraM    = extraType === 'monthly' ? extraAmount : 0
        const annualM   = extraType === 'annual' && months % 12 === 0 ? extraAmount : 0
        const pmt       = Math.min(bal + intCharge, basePayment + extraM + annualM)
        bal = bal + intCharge - pmt
        totalPaid += pmt
        months++
      }
      const interestNew  = totalPaid - balance + (extraType === 'onetime' ? extraAmount : 0)
      const interestSaved = Math.max(0, interestBase - interestNew)
      const monthsSaved   = n - months
      return { basePayment, months: months + ' months', monthsSaved: monthsSaved + ' months', interestSaved, totalPaid }`,
  [
    { label:'Base Monthly Payment',       k:'basePayment',   cur:true  },
    { label:'New Payoff Period',          k:'months',        cur:false },
    { label:'Months Saved',              k:'monthsSaved',   cur:false },
    { label:'Interest Saved',            k:'interestSaved', cur:true  },
    { label:'New Total Cost',            k:'totalPaid',     cur:true  },
  ],
  [
    { q:'How much does an extra $200/month save on a mortgage?', a:'On a $320,000 mortgage at 6.875% with 25 years remaining, an extra $200/month saves approximately $55,000-$70,000 in interest and cuts payoff time by 5-7 years. The savings are largest early in the loan when the balance is highest. Even $100/month extra makes a meaningful difference over a 30-year loan.' },
    { q:'Should I make extra mortgage payments or invest?', a:'The math favors investing if your expected investment return exceeds your mortgage rate. With a 6.875% mortgage and 8-10% expected stock market returns, investing wins long-term. However, paying down the mortgage offers guaranteed, risk-free return equal to your rate, plus psychological security. Many people split the difference: make extra payments and invest simultaneously.' },
    { q:'Should I pay a lump sum or monthly extra?', a:'A large lump sum applied immediately saves more than the same amount spread over time because it starts reducing interest right away. However, consistent monthly extra payments are more practical for most budgets and still save significantly. The key is applying extra payments to principal directly — confirm with your lender that extra amounts reduce principal, not future payments.' },
  ],
  [
    { href:'/mortgage-calculator',         icon:'🏠', name:'Mortgage'           },
    { href:'/biweekly-mortgage-calculator',icon:'📅', name:'Biweekly Mortgage'  },
    { href:'/amortization-calculator',     icon:'📋', name:'Amortization'       },
    { href:'/refinance-calculator',        icon:'🔄', name:'Refinance'          },
  ]
))

// ── 6. CD Calculator ─────────────────────────────────────────────────────────
write('cd-calculator', page(
  'CD Calculator',
  'Calculate Certificate of Deposit earnings, APY and maturity value for any term.',
  '🏦',
  [
    { s:'principal',    label:'Initial Deposit',              type:'range', min:500,  max:1000000, step:100,  cur:true, def:10000 },
    { s:'apy',          label:'Annual Percentage Yield (APY)',type:'range', min:0.01, max:10,      step:0.05, pct:true, def:5.0   },
    { s:'termMonths',   label:'CD Term',                      type:'select', def:12, opts:[{v:3,l:'3 months'},{v:6,l:'6 months'},{v:9,l:'9 months'},{v:12,l:'12 months'},{v:18,l:'18 months'},{v:24,l:'24 months'},{v:36,l:'36 months'},{v:60,l:'60 months'}] },
    { s:'compFreq',     label:'Compounding Frequency',        type:'select', def:12, opts:[{v:365,l:'Daily'},{v:12,l:'Monthly'},{v:4,l:'Quarterly'},{v:1,l:'Annually'}] },
    { s:'taxRate',      label:'Marginal Tax Rate',            type:'range', min:0,    max:45,      step:1,    pct:true, def:22    },
  ],
  `      const r         = apy / 100 / compFreq
      const n         = termMonths / 12 * compFreq
      const maturity  = principal * Math.pow(1 + r, n)
      const interest  = maturity - principal
      const afterTax  = maturity - interest * (taxRate / 100)
      const afterTaxInterest = interest * (1 - taxRate / 100)
      const effectiveAPY = (Math.pow(1 + apy/100/compFreq, compFreq) - 1) * 100
      const months    = termMonths
      return { maturity, interest, afterTax, afterTaxInterest, effectiveAPY: effectiveAPY.toFixed(3) + '%', months: months + ' months' }`,
  [
    { label:'Maturity Value',              k:'maturity',         cur:true  },
    { label:'Interest Earned',             k:'interest',         cur:true  },
    { label:'After-Tax Maturity Value',    k:'afterTax',         cur:true  },
    { label:'After-Tax Interest',          k:'afterTaxInterest', cur:true  },
    { label:'Effective APY',               k:'effectiveAPY',     cur:false },
    { label:'CD Term',                     k:'months',           cur:false },
  ],
  [
    { q:'Are CDs worth it in 2026?', a:'CDs are worth considering when: you have cash you will not need for the CD term, you want guaranteed returns without market risk, and CD rates exceed high-yield savings account rates. In 2026, competitive CD rates range from 4-5.5% APY. The trade-off is liquidity — early withdrawal penalties (typically 3-6 months of interest) apply if you need the funds before maturity.' },
    { q:'What is a CD ladder strategy?', a:'A CD ladder splits your investment across multiple CDs with staggered maturities. For example: 25% in a 1-year CD, 25% in 2-year, 25% in 3-year, 25% in 4-year CD. As each matures, reinvest in a new 4-year CD. This provides liquidity every year while capturing longer-term rates. It eliminates the risk of locking up all your money when rates later increase.' },
    { q:'How is CD interest taxed?', a:'CD interest is taxed as ordinary income in the year it is earned, even if you do not withdraw it (for multi-year CDs, you owe tax on accrued interest annually). This differs from stocks where you control when gains are realized. Consider holding CDs in tax-advantaged accounts (IRA, HSA) if you are in a high tax bracket to defer or eliminate the tax on interest.' },
  ],
  [
    { href:'/savings-interest-calculator', icon:'🏦', name:'Savings Interest'  },
    { href:'/compound-interest',           icon:'💹', name:'Compound Interest' },
    { href:'/savings-goal-calculator',     icon:'🎯', name:'Savings Goal'      },
    { href:'/emergency-fund-calculator',   icon:'🛡️', name:'Emergency Fund'    },
  ]
))

// ── 7. Savings Goal Calculator ───────────────────────────────────────────────
write('savings-goal-calculator', page(
  'Savings Goal Calculator',
  'Calculate how long it takes to reach any savings goal or how much to save each month.',
  '🎯',
  [
    { s:'goalAmount',   label:'Savings Goal',                 type:'range', min:100,  max:1000000, step:100,  cur:true, def:20000 },
    { s:'currentSaved', label:'Amount Already Saved',         type:'range', min:0,    max:900000,  step:100,  cur:true, def:2000  },
    { s:'calcType',     label:'Calculate',                    type:'select', def:'time', opts:[{v:'time',l:'Time to Reach Goal'},{v:'monthly',l:'Monthly Savings Needed'}] },
    { s:'monthlyContrib',label:'Monthly Contribution',        type:'range', min:0,    max:20000,   step:25,   cur:true, def:500   },
    { s:'targetMonths', label:'Target Timeframe',             type:'range', min:1,    max:360,     step:1,    sfx:' mo', def:36   },
    { s:'returnRate',   label:'Annual Return Rate',           type:'range', min:0,    max:12,      step:0.25, pct:true, def:4.5   },
  ],
  `      const remaining = Math.max(0, goalAmount - currentSaved)
      const r = returnRate / 100 / 12
      let months, monthly
      if (calcType === 'time') {
        if (r === 0) {
          months = Math.ceil(remaining / monthlyContrib)
        } else {
          months = Math.ceil(Math.log(1 + remaining * r / monthlyContrib) / Math.log(1 + r))
        }
        monthly = monthlyContrib
      } else {
        months = targetMonths
        if (r === 0) {
          monthly = remaining / months
        } else {
          monthly = remaining * r / (Math.pow(1+r, months) - 1)
        }
      }
      const totalContribs = monthly * months
      const interestEarned = goalAmount - currentSaved - totalContribs
      return {
        months: months + ' months',
        monthly,
        totalContribs,
        interestEarned: Math.max(0, interestEarned),
        yearsFraction: (months / 12).toFixed(1) + ' years'
      }`,
  [
    { label:'Time to Reach Goal',         k:'months',        cur:false },
    { label:'Time in Years',              k:'yearsFraction', cur:false },
    { label:'Monthly Savings Required',   k:'monthly',       cur:true  },
    { label:'Total Contributions',        k:'totalContribs', cur:true  },
    { label:'Interest Earned',            k:'interestEarned',cur:true  },
  ],
  [
    { q:'How do I set a realistic savings goal?', a:'Use the SMART framework: Specific (exact dollar amount), Measurable (track monthly progress), Achievable (verify the monthly contribution fits your budget), Relevant (aligned with your priorities), Time-bound (set a deadline). Break large goals into milestones. Automate transfers on payday so savings happen before spending. Even small consistent amounts compound significantly over time.' },
    { q:'Where should I keep my savings for a goal?', a:'Match the account to your timeline. Under 1 year: high-yield savings account (liquid, currently 4-5% APY). 1-3 years: CDs or money market accounts (slightly higher yield, some restrictions). Over 3 years: consider I-bonds (inflation protection), bond funds, or a conservative stock/bond mix. Never put money you need within 1-2 years in the stock market.' },
    { q:'How much of my income should I save?', a:'The 50/30/20 rule suggests 20% for savings and debt. For aggressive goal achievement, 30-40% savings rate is effective. The most important factor is automating savings before it hits your spending account. Even starting with 5% and increasing by 1% every 6 months builds excellent habits. The best savings rate is the highest one you can sustain without sacrificing essential needs.' },
  ],
  [
    { href:'/emergency-fund-calculator',   icon:'🛡️', name:'Emergency Fund'   },
    { href:'/savings-interest-calculator', icon:'🏦', name:'Savings Interest'  },
    { href:'/cd-calculator',               icon:'🏦', name:'CD Calculator'     },
    { href:'/compound-interest',           icon:'💹', name:'Compound Interest' },
  ]
))

// ── 8. FIRE Calculator ───────────────────────────────────────────────────────
write('fire-calculator', page(
  'FIRE Calculator',
  'Calculate your Financial Independence Retire Early number and timeline to freedom.',
  '🔥',
  [
    { s:'annualExpenses', label:'Current Annual Expenses',       type:'range', min:10000, max:300000, step:1000, cur:true, def:50000 },
    { s:'currentSavings', label:'Current Investment Portfolio',  type:'range', min:0,     max:5000000,step:5000, cur:true, def:150000},
    { s:'annualSavings',  label:'Annual Savings (investing)',    type:'range', min:0,     max:300000, step:1000, cur:true, def:30000 },
    { s:'fireType',       label:'FIRE Type',                     type:'select', def:'lean', opts:[{v:'lean',l:'Lean FIRE (3.5% rule)'},{v:'standard',l:'FIRE (4% rule)'},{v:'fat',l:'Fat FIRE (3% rule)'}] },
    { s:'returnRate',     label:'Expected Annual Return',        type:'range', min:1,     max:15,     step:0.25, pct:true, def:7     },
    { s:'inflationRate',  label:'Inflation Rate',                type:'range', min:1,     max:8,      step:0.25, pct:true, def:3     },
  ],
  `      const withdrawalRate = fireType === 'lean' ? 0.035 : fireType === 'standard' ? 0.04 : 0.03
      const fireNumber     = annualExpenses / withdrawalRate
      const remaining      = Math.max(0, fireNumber - currentSavings)
      const realReturn     = (1 + returnRate/100) / (1 + inflationRate/100) - 1
      const r              = realReturn / 1
      const rMonthly       = Math.pow(1 + r, 1/12) - 1
      const monthlyContrib = annualSavings / 12
      // Years to FIRE
      const yearsToFire    = rMonthly > 0 && remaining > 0
        ? Math.log(1 + remaining * rMonthly / monthlyContrib) / Math.log(1 + rMonthly) / 12
        : remaining / annualSavings
      const savingsRate    = annualSavings > 0 ? (annualSavings / (annualExpenses + annualSavings) * 100).toFixed(1) + '%' : '0%'
      const monthlyIncome  = fireNumber * withdrawalRate / 12
      return {
        fireNumber,
        remaining,
        yearsToFire: yearsToFire.toFixed(1) + ' years',
        savingsRate,
        monthlyIncome,
        withdrawalRate: (withdrawalRate * 100) + '%'
      }`,
  [
    { label:'Your FIRE Number',           k:'fireNumber',     cur:true  },
    { label:'Amount Still to Save',       k:'remaining',      cur:true  },
    { label:'Years to FIRE',              k:'yearsToFire',    cur:false },
    { label:'Current Savings Rate',       k:'savingsRate',    cur:false },
    { label:'Monthly Retirement Income',  k:'monthlyIncome',  cur:true  },
    { label:'Safe Withdrawal Rate',       k:'withdrawalRate', cur:false },
  ],
  [
    { q:'What is the FIRE number?', a:'Your FIRE number is the amount you need invested to retire permanently: Annual Expenses / Withdrawal Rate. At the 4% rule it is 25x annual expenses. To spend $50,000/year in retirement you need $1,250,000 invested. This is based on the Trinity Study showing a 4% withdrawal rate historically sustained a 30-year retirement in 95%+ of scenarios with a diversified stock/bond portfolio.' },
    { q:'What are the different types of FIRE?', a:'Lean FIRE: live on $25,000-$40,000/year in retirement, very frugal lifestyle, FIRE number $625,000-$1M. Standard FIRE: $40,000-$80,000/year, FIRE number $1M-$2M. Fat FIRE: $80,000-$200,000+/year in retirement, FIRE number $2M-$5M+. Barista FIRE: partially retire, work part-time to cover expenses and let investments grow. Coast FIRE: save enough early that investments will reach FIRE number by traditional retirement age.' },
    { q:'What savings rate do I need to retire early?', a:'The higher your savings rate, the faster you reach FIRE. Saving 10% takes about 43 years. Saving 25% takes about 32 years. Saving 50% takes about 17 years. Saving 70% takes about 8.5 years. The math works because a high savings rate both accelerates portfolio growth and signals lower lifestyle expenses — reducing your FIRE number at the same time as increasing your contributions.' },
  ],
  [
    { href:'/retirement-calculator',         icon:'🌅', name:'Retirement'           },
    { href:'/savings-goal-calculator',       icon:'🎯', name:'Savings Goal'         },
    { href:'/investment-return-calculator',  icon:'📈', name:'Investment Return'    },
    { href:'/compound-interest',             icon:'💹', name:'Compound Interest'    },
  ]
))

// ── 9. Debt Consolidation Calculator ────────────────────────────────────────
write('debt-consolidation-calculator', page(
  'Debt Consolidation Calculator',
  'See how consolidating multiple debts into one loan saves money and simplifies payments.',
  '🔗',
  [
    { s:'debt1',        label:'Debt 1 Balance',               type:'range', min:0,    max:100000, step:100,  cur:true, def:8000  },
    { s:'rate1',        label:'Debt 1 APR',                   type:'range', min:0,    max:40,     step:0.25, pct:true, def:24    },
    { s:'debt2',        label:'Debt 2 Balance',               type:'range', min:0,    max:100000, step:100,  cur:true, def:5000  },
    { s:'rate2',        label:'Debt 2 APR',                   type:'range', min:0,    max:40,     step:0.25, pct:true, def:21    },
    { s:'debt3',        label:'Debt 3 Balance',               type:'range', min:0,    max:100000, step:100,  cur:true, def:3000  },
    { s:'rate3',        label:'Debt 3 APR',                   type:'range', min:0,    max:40,     step:0.25, pct:true, def:18    },
    { s:'consolidationRate',label:'Consolidation Loan Rate',  type:'range', min:1,    max:25,     step:0.25, pct:true, def:11    },
    { s:'consolidationTerm',label:'Consolidation Term',       type:'select', def:48, opts:[{v:24,l:'24 mo'},{v:36,l:'36 mo'},{v:48,l:'48 mo'},{v:60,l:'60 mo'}] },
  ],
  `      const totalDebt = debt1 + debt2 + debt3
      // Current weighted average rate and minimum payments
      const weightedRate = (debt1*rate1 + debt2*rate2 + debt3*rate3) / totalDebt
      const minPmt = d => d * (weightedRate/100/12) * Math.pow(1+weightedRate/100/12,60) / (Math.pow(1+weightedRate/100/12,60)-1)
      const currentMonthly = minPmt(totalDebt)
      // Consolidation loan
      const r = consolidationRate / 100 / 12
      const n = consolidationTerm
      const newMonthly = totalDebt * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalOld = currentMonthly * 60
      const totalNew = newMonthly * n
      const interestSaved = Math.max(0, totalOld - totalNew - (totalOld - totalDebt - (totalNew - totalDebt)))
      const monthlySaving = currentMonthly - newMonthly
      return { totalDebt, weightedRate: weightedRate.toFixed(2) + '%', currentMonthly, newMonthly, monthlySaving, totalNew, interestSaved }`,
  [
    { label:'Total Debt to Consolidate',   k:'totalDebt',      cur:true  },
    { label:'Current Weighted Rate',       k:'weightedRate',   cur:false },
    { label:'Current Est. Monthly Payment',k:'currentMonthly', cur:true  },
    { label:'New Monthly Payment',         k:'newMonthly',     cur:true  },
    { label:'Monthly Savings',             k:'monthlySaving',  cur:true  },
    { label:'New Total Loan Cost',         k:'totalNew',       cur:true  },
    { label:'Estimated Interest Saved',    k:'interestSaved',  cur:true  },
  ],
  [
    { q:'Is debt consolidation a good idea?', a:'Consolidation is good when: you qualify for a meaningfully lower interest rate, you will not accumulate new debt on paid-off cards, the new monthly payment fits your budget, and the total cost is lower. Warning signs: extending the payoff period so much that you pay more total interest, consolidating into a secured loan (risking your home) for unsecured debt, and not addressing the spending habits that caused the debt.' },
    { q:'Debt consolidation vs debt settlement: what is the difference?', a:'Consolidation combines debts into one new loan at (ideally) a lower rate — you pay 100% of what you owe. Debt settlement negotiates with creditors to accept less than the full balance — damages your credit severely (stays 7 years), you may owe income tax on forgiven amounts, and it only makes sense if you are already severely delinquent. Consolidation is almost always the better choice for people still current on payments.' },
    { q:'What credit score do I need for a debt consolidation loan?', a:'Good rates (under 12%) typically require 700+ credit score. Fair rates (12-18%) require 640-700. Below 640, consolidation rates may not be lower than your current debt rates, eliminating the benefit. Options for lower credit: balance transfer to a 0% card (requires 670+), credit union personal loans (more flexible than banks), or a debt management plan through a nonprofit credit counselor.' },
  ],
  [
    { href:'/debt-payoff-calculator',      icon:'🎯', name:'Debt Payoff'       },
    { href:'/credit-card-payoff-calculator',icon:'💳',name:'Credit Card Payoff'},
    { href:'/personal-loan-calculator',    icon:'👤', name:'Personal Loan'     },
    { href:'/balance-transfer-calculator', icon:'🔄', name:'Balance Transfer'  },
  ]
))

// ── 10. Balance Transfer Calculator ─────────────────────────────────────────
write('balance-transfer-calculator', page(
  'Balance Transfer Calculator',
  'Calculate if a 0% balance transfer saves money versus keeping your current card.',
  '🔄',
  [
    { s:'balance',       label:'Balance to Transfer',          type:'range', min:100,  max:100000, step:100,  cur:true, def:8000  },
    { s:'currentAPR',    label:'Current Card APR',             type:'range', min:1,    max:36,     step:0.25, pct:true, def:24    },
    { s:'transferFee',   label:'Balance Transfer Fee',         type:'range', min:0,    max:5,      step:0.25, pct:true, def:3     },
    { s:'promoMonths',   label:'0% Promo Period',              type:'select', def:15, opts:[{v:12,l:'12 months'},{v:15,l:'15 months'},{v:18,l:'18 months'},{v:21,l:'21 months'}] },
    { s:'monthlyPmt',    label:'Monthly Payment',              type:'range', min:50,   max:10000,  step:25,   cur:true, def:400   },
    { s:'postPromoAPR',  label:'APR After Promo Expires',      type:'range', min:1,    max:30,     step:0.25, pct:true, def:20    },
  ],
  `      const fee = balance * (transferFee / 100)
      const newBalance = balance + fee
      // Months to pay off with current card
      const rCurrent = currentAPR / 100 / 12
      const mosCurrent = Math.ceil(-Math.log(1 - balance * rCurrent / monthlyPmt) / Math.log(1 + rCurrent))
      const totalCurrent = monthlyPmt * mosCurrent
      const interestCurrent = totalCurrent - balance
      // Balance transfer scenario
      const balAfterPromo = Math.max(0, newBalance - monthlyPmt * promoMonths)
      const rPost = postPromoAPR / 100 / 12
      const mosPost = balAfterPromo > 0 ? Math.ceil(-Math.log(1 - balAfterPromo * rPost / monthlyPmt) / Math.log(1 + rPost)) : 0
      const totalTransfer = fee + monthlyPmt * promoMonths + monthlyPmt * mosPost - Math.max(0, monthlyPmt * promoMonths - newBalance)
      const interestTransfer = balAfterPromo > 0 ? monthlyPmt * mosPost - balAfterPromo : 0
      const totalSaved = totalCurrent - totalTransfer - fee
      const worthIt = totalSaved > 0 ? 'Yes - saves money' : 'No - not worth it'
      return { fee, interestCurrent, interestTransfer: Math.max(0,interestTransfer), totalSaved: Math.abs(totalSaved), worthIt }`,
  [
    { label:'Transfer Fee',               k:'fee',              cur:true  },
    { label:'Interest Without Transfer',  k:'interestCurrent',  cur:true  },
    { label:'Interest After Transfer',    k:'interestTransfer', cur:true  },
    { label:'Net Savings',                k:'totalSaved',       cur:true  },
    { label:'Is Transfer Worth It?',      k:'worthIt',          cur:false },
  ],
  [
    { q:'How does a 0% balance transfer work?', a:'A balance transfer moves debt from one or more high-interest cards to a new card with a 0% introductory APR for 12-21 months. You typically pay a transfer fee of 3-5% upfront. During the promo period, all payments reduce principal (no interest). At the end of the promo, any remaining balance accrues interest at the card normal APR (usually 19-29%). The strategy only works if you pay off the balance before the promo expires.' },
    { q:'What credit score do I need for a balance transfer card?', a:'Most balance transfer cards with 0% promo periods require good to excellent credit: 670+ for approval, 720+ for the best offers (longest promo periods, lowest fees). Check for pre-qualification with soft pulls before applying to avoid hard inquiry score impacts. Cards like Chase Slate Edge, Citi Simplicity, and Wells Fargo Reflect consistently offer competitive balance transfer terms.' },
    { q:'What mistakes should I avoid with balance transfers?', a:'Key mistakes: continuing to use the old card and accumulating new debt, missing a payment (often voids the 0% promo immediately), not paying off the full balance before promo ends (remaining balance suddenly accrues high APR), not accounting for the transfer fee in your savings calculation, and applying for multiple cards simultaneously (hurts credit score). Create a payoff plan before transferring.' },
  ],
  [
    { href:'/credit-card-payoff-calculator',icon:'💳',name:'Credit Card Payoff'  },
    { href:'/debt-consolidation-calculator',icon:'🔗',name:'Debt Consolidation'  },
    { href:'/debt-payoff-calculator',      icon:'🎯', name:'Debt Payoff'         },
    { href:'/personal-loan-calculator',    icon:'👤', name:'Personal Loan'       },
  ]
))

// ── 11. Insurance Calculator ─────────────────────────────────────────────────
write('insurance-calculator', page(
  'Insurance Needs Calculator',
  'Estimate how much coverage you need for life, disability and emergency insurance.',
  '🛡️',
  [
    { s:'annualIncome',  label:'Annual Income',                type:'range', min:10000, max:500000, step:1000, cur:true, def:75000 },
    { s:'monthlyExpenses',label:'Monthly Living Expenses',     type:'range', min:500,   max:20000,  step:100,  cur:true, def:4000  },
    { s:'dependents',    label:'Number of Dependents',         type:'range', min:0,     max:8,      step:1,    sfx:' people', def:2},
    { s:'totalDebt',     label:'Total Outstanding Debts',      type:'range', min:0,     max:2000000,step:5000, cur:true, def:350000},
    { s:'existingCoverage',label:'Existing Life Insurance',    type:'range', min:0,     max:5000000,step:5000, cur:true, def:0    },
  ],
  `      // Life insurance need
      const lifeNeed       = annualIncome * 10 + totalDebt + (dependents * 50000) - existingCoverage
      // Disability insurance need (60-70% of income)
      const disabilityMonthly = annualIncome * 0.65 / 12
      // Emergency fund target
      const emergencyTarget   = monthlyExpenses * (dependents > 0 ? 6 : 3)
      // Health insurance estimate
      const healthMonthly     = dependents > 0 ? 600 + dependents * 150 : 350
      const totalAnnualInsur  = healthMonthly * 12 + (lifeNeed > 0 ? lifeNeed * 0.0003 : 0) + disabilityMonthly * 12 * 0.02
      return { lifeNeed: Math.max(0, lifeNeed), disabilityMonthly, emergencyTarget, healthMonthly, totalAnnualInsur }`,
  [
    { label:'Recommended Life Insurance',    k:'lifeNeed',          cur:true },
    { label:'Disability Insurance (monthly)',k:'disabilityMonthly', cur:true },
    { label:'Emergency Fund Target',         k:'emergencyTarget',   cur:true },
    { label:'Est. Health Insurance (monthly)',k:'healthMonthly',    cur:true },
    { label:'Est. Total Annual Insurance',   k:'totalAnnualInsur',  cur:true },
  ],
  [
    { q:'What types of insurance are most important?', a:'Priority order for most people: (1) Health insurance — a single hospitalization can cost $30,000-$100,000+. (2) Life insurance — if anyone depends on your income. (3) Disability insurance — you are 3-4x more likely to become disabled than to die during your working years. (4) Auto insurance — legally required in most states. (5) Homeowners or renters insurance — protects your largest asset or personal belongings.' },
    { q:'What is disability insurance and do I need it?', a:'Disability insurance replaces 60-70% of your income if you cannot work due to illness or injury. Short-term disability covers 3-6 months; long-term covers years or until retirement. Many employers offer group policies, but they are often insufficient. If your employer does not offer it or coverage is under 60% of income, individual supplemental disability coverage is worth considering, especially for high earners.' },
    { q:'How much does insurance typically cost?', a:'Average monthly costs (2026): health insurance $450-$700 individual, $1,200-$1,800 family (employer plans average $600/month employer + $300/month employee). Life insurance $25-$75 for $500,000 term policy for healthy 35-year-old. Disability insurance 1-3% of annual income. Auto insurance $100-$250/month. Homeowners $100-$250/month. Renters insurance $15-$30/month (great value).' },
  ],
  [
    { href:'/life-insurance-calculator',  icon:'🛡️', name:'Life Insurance'    },
    { href:'/emergency-fund-calculator',  icon:'🛡️', name:'Emergency Fund'    },
    { href:'/net-worth-calculator',       icon:'💰', name:'Net Worth'         },
    { href:'/budget-planner-calculator',  icon:'📋', name:'Budget Planner'    },
  ]
))

console.log(`
════════════════════════════════════════════════════
  STAGE 9b COMPLETE — 11 more missing calculators
════════════════════════════════════════════════════
   1.  /markup-calculator
   2.  /discount-calculator
   3.  /loan-comparison-calculator
   4.  /biweekly-mortgage-calculator
   5.  /extra-payment-calculator
   6.  /cd-calculator
   7.  /savings-goal-calculator
   8.  /fire-calculator
   9.  /debt-consolidation-calculator
  10.  /balance-transfer-calculator
  11.  /insurance-calculator
════════════════════════════════════════════════════
  GRAND TOTAL: 80 + 23 = 103 calculators
════════════════════════════════════════════════════
`)
