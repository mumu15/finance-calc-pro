const fs = require('fs');

// ── LOAN CALCULATOR ───────────────────────────────────────────────────────────
const newLoan = `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'How is a loan payment calculated?', a: 'Monthly loan payment is calculated using the formula M = P[r(1+r)^n]/[(1+r)^n-1] where P is the loan amount, r is monthly interest rate and n is total number of payments.' },
  { q: 'What is the difference between interest rate and APR?', a: 'Interest rate is the base cost of borrowing. APR (Annual Percentage Rate) includes interest plus all fees and is the true cost of the loan. Always compare APR when shopping for loans.' },
  { q: 'How can I pay off my loan faster?', a: 'Make extra payments toward the principal, make biweekly payments instead of monthly, refinance to a lower rate or shorter term, or pay a lump sum when possible.' },
  { q: 'What is a good interest rate for a personal loan?', a: 'A good personal loan rate is 6-12% APR for borrowers with good credit (700+). Average rates are 11-24%. Rates above 24% are considered high and should be avoided if possible.' },
  { q: 'How does loan term affect monthly payment?', a: 'A longer loan term means lower monthly payments but more total interest paid. A shorter term means higher payments but less total interest. Choose the shortest term you can comfortably afford.' },
]

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000)
  const [interestRate, setInterestRate] = useState(8)
  const [loanTerm, setLoanTerm] = useState(3)
  const [termType, setTermType] = useState('years')
  const [showAmort, setShowAmort] = useState(false)
  const [showFull, setShowFull] = useState(false)

  const calc = useMemo(() => {
    const months = termType === 'years' ? loanTerm * 12 : loanTerm
    const monthlyRate = interestRate / 100 / 12
    const payment = monthlyRate === 0 ? loanAmount / months :
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalInterest = (payment * months) - loanAmount
    const totalCost = loanAmount + totalInterest

    const payoffDate = new Date()
    payoffDate.setMonth(payoffDate.getMonth() + months)

    let balance = loanAmount
    const schedule = []
    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = payment - interestPayment
      balance -= principalPayment
      schedule.push({
        month: i,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }

    return { payment, totalInterest, totalCost, months, schedule, payoffDate }
  }, [loanAmount, interestRate, loanTerm, termType])

  const fmt = (n) => '$' + Math.abs(Math.round(n)).toLocaleString()
  const displayed = showFull ? calc.schedule : calc.schedule.slice(0, 24)

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Loan Payment Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate monthly payments, total interest and full amortization schedule for any loan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Loan Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Loan Amount', value: loanAmount, set: setLoanAmount, min: 500, max: 100000, step: 500, prefix: '$' },
                { label: 'Interest Rate (APR)', value: interestRate, set: setInterestRate, min: 1, max: 36, step: 0.25, suffix: '%' },
              ].map((field, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-slate-400 text-sm">{field.label}</label>
                    <span className="text-white font-bold text-sm">{field.prefix || ''}{field.value.toLocaleString()}{field.suffix || ''}</span>
                  </div>
                  <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                    onChange={e => field.set(Number(e.target.value))}
                    className="w-full accent-yellow-400" />
                </div>
              ))}

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex gap-2 mb-2">
                  {['years','months'].map(t => (
                    <button key={t} onClick={() => setTermType(t)}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize"
                      style={{background: termType === t ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)', border: termType === t ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)', color: termType === t ? '#f0c842' : '#64748b'}}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-bold text-sm">{loanTerm} {termType}</span>
                </div>
                <input type="range" min={1} max={termType === 'years' ? 10 : 84} step={1} value={loanTerm}
                  onChange={e => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              {/* Quick Loan Presets */}
              <div>
                <label className="text-slate-400 text-sm block mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Car Loan', amount: 25000, rate: 6.5, term: 5 },
                    { label: 'Personal', amount: 10000, rate: 12, term: 3 },
                    { label: 'Student', amount: 30000, rate: 5, term: 10 },
                  ].map((p, i) => (
                    <button key={i} onClick={() => { setLoanAmount(p.amount); setInterestRate(p.rate); setLoanTerm(p.term); setTermType('years') }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',color:'#f0c842'}}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box text-center py-6">
              <div className="text-slate-400 text-sm mb-2">Monthly Payment</div>
              <div className="text-5xl font-bold mb-1" style={{color:'#f0c842'}}>{fmt(calc.payment)}</div>
              <div className="text-slate-500 text-sm">per month for {calc.months} months</div>
            </div>

            <div className="result-box">
              <h2 className="text-white font-bold mb-3">Loan Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Loan Amount', value: fmt(loanAmount), color: 'text-white' },
                  { label: 'Total Interest', value: fmt(calc.totalInterest), color: 'text-red-400' },
                  { label: 'Total Cost', value: fmt(calc.totalCost), color: 'text-yellow-400' },
                  { label: 'Payoff Date', value: calc.payoffDate.toLocaleDateString('en-US',{month:'short',year:'numeric'}), color: 'text-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className={\`text-lg font-bold \${item.color}\`}>{item.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Interest vs Principal Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Principal {Math.round(loanAmount / calc.totalCost * 100)}%</span>
                  <span>Interest {Math.round(calc.totalInterest / calc.totalCost * 100)}%</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex">
                  <div className="h-full bg-yellow-400 transition-all duration-500" style={{width: \`\${(loanAmount / calc.totalCost) * 100}%\`}}/>
                  <div className="h-full bg-red-400 transition-all duration-500" style={{width: \`\${(calc.totalInterest / calc.totalCost) * 100}%\`}}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization */}
        <div className="mt-6 result-box">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">Amortization Schedule</h2>
            <button onClick={() => setShowAmort(!showAmort)}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.3)',color:'#f0c842'}}>
              {showAmort ? 'Hide ↑' : 'Show Schedule ↓'}
            </button>
          </div>
          {showAmort && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}>
                    {['Month','Payment','Principal','Interest','Balance'].map(h => (
                      <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((row, i) => (
                    <tr key={i} className="border-b" style={{borderColor:'rgba(255,255,255,0.03)'}}>
                      <td className="text-slate-400 py-1.5 pr-4">{row.month}</td>
                      <td className="text-white py-1.5 pr-4">{fmt(row.payment)}</td>
                      <td className="text-emerald-400 py-1.5 pr-4">{fmt(row.principal)}</td>
                      <td className="text-red-400 py-1.5 pr-4">{fmt(row.interest)}</td>
                      <td className="text-slate-300 py-1.5">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {calc.schedule.length > 24 && (
                <button onClick={() => setShowFull(!showFull)} className="mt-4 text-yellow-400 text-sm hover:underline">
                  {showFull ? 'Show Less ↑' : \`Show All \${calc.schedule.length} Months ↓\`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Related Guide */}
        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-to-calculate-loan-payment" className="text-yellow-400 font-semibold hover:underline">How to Calculate Your Loan Payment: Complete Guide (2026)</a>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/mortgage-calculator',icon:'🏠',name:'Mortgage Calculator',desc:'Calculate your mortgage payment'},
              {href:'/debt-payoff-calculator',icon:'💰',name:'Debt Payoff',desc:'Plan your debt payoff strategy'},
              {href:'/budget-calculator',icon:'📋',name:'Budget Calculator',desc:'Create a monthly budget'},
              {href:'/net-worth-calculator',icon:'💎',name:'Net Worth',desc:'Calculate your total net worth'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="result-box">
            <div className="space-y-4 text-sm">
              {faqs.map((faq, i) => (
                <div key={i} className={i < faqs.length - 1 ? "border-b pb-4" : "pb-4"} style={{borderColor:"rgba(240,200,66,0.1)"}}>
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
`;

fs.writeFileSync('app/loan-calculator/page.js', newLoan, 'utf8');
console.log('✅ Loan calculator upgraded!');

// ── COMPOUND INTEREST ─────────────────────────────────────────────────────────
const newCompound = `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest. This means your money grows exponentially over time rather than linearly.' },
  { q: 'How often does compound interest compound?', a: 'Interest can compound daily, monthly, quarterly or annually. The more frequently it compounds the more you earn. Most savings accounts compound daily or monthly.' },
  { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual interest rate. At 6% your money doubles in approximately 72/6 = 12 years.' },
  { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is calculated only on the principal. Compound interest is calculated on principal plus accumulated interest. Compound interest grows much faster over time.' },
  { q: 'How much should I invest per month to become a millionaire?', a: 'At 7% annual return you need to invest about $500/month for 30 years to reach $1 million. Starting earlier dramatically reduces the monthly amount needed due to compound interest.' },
]

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000)
  const [monthlyContrib, setMonthlyContrib] = useState(500)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(20)
  const [frequency, setFrequency] = useState(12)
  const [showTable, setShowTable] = useState(false)

  const calc = useMemo(() => {
    const r = rate / 100 / frequency
    const n = years * frequency
    const futureValue = principal * Math.pow(1 + r, n) +
      monthlyContrib * (frequency / 12) * ((Math.pow(1 + r, n) - 1) / r)

    const totalContributions = principal + (monthlyContrib * 12 * years)
    const totalInterest = futureValue - totalContributions

    const yearlyData = []
    let runningBalance = principal
    for (let y = 1; y <= years; y++) {
      const rY = rate / 100 / frequency
      const nY = frequency
      runningBalance = runningBalance * Math.pow(1 + rY, nY) +
        monthlyContrib * (frequency / 12) * ((Math.pow(1 + rY, nY) - 1) / rY)
      const contrib = principal + monthlyContrib * 12 * y
      yearlyData.push({
        year: y,
        balance: runningBalance,
        contributions: contrib,
        interest: runningBalance - contrib,
      })
    }

    const doubleYears = (Math.log(2) / Math.log(1 + rate / 100)).toFixed(1)

    return { futureValue, totalContributions, totalInterest, yearlyData, doubleYears }
  }, [principal, monthlyContrib, rate, years, frequency])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Compound Interest Calculator</h1>
          <p className="text-slate-400 text-lg">See how your money grows with compound interest and monthly contributions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Investment Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Initial Investment', value: principal, set: setPrincipal, min: 0, max: 100000, step: 500, prefix: '$' },
                { label: 'Monthly Contribution', value: monthlyContrib, set: setMonthlyContrib, min: 0, max: 5000, step: 50, prefix: '$' },
                { label: 'Annual Interest Rate', value: rate, set: setRate, min: 1, max: 20, step: 0.5, suffix: '%' },
                { label: 'Time Period', value: years, set: setYears, min: 1, max: 50, step: 1, suffix: ' years' },
              ].map((field, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-slate-400 text-sm">{field.label}</label>
                    <span className="text-white font-bold text-sm">{field.prefix || ''}{field.value.toLocaleString()}{field.suffix || ''}</span>
                  </div>
                  <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                    onChange={e => field.set(Number(e.target.value))}
                    className="w-full accent-yellow-400" />
                </div>
              ))}

              <div>
                <label className="text-slate-400 text-sm block mb-2">Compounding Frequency</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{label:'Monthly',val:12},{label:'Quarterly',val:4},{label:'Semi-Annual',val:2},{label:'Annual',val:1}].map(f => (
                    <button key={f.val} onClick={() => setFrequency(f.val)}
                      className="py-2 rounded-xl text-sm font-medium transition-all"
                      style={{background: frequency === f.val ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)', border: frequency === f.val ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)', color: frequency === f.val ? '#f0c842' : '#64748b'}}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box text-center py-6">
              <div className="text-slate-400 text-sm mb-2">Future Value</div>
              <div className="text-5xl font-bold mb-1" style={{color:'#f0c842'}}>{fmt(calc.futureValue)}</div>
              <div className="text-slate-500 text-sm">after {years} years</div>
            </div>

            <div className="result-box">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Contributed', value: fmt(calc.totalContributions), color: 'text-white' },
                  { label: 'Interest Earned', value: fmt(calc.totalInterest), color: 'text-emerald-400' },
                  { label: 'Money Doubled In', value: calc.doubleYears + ' yrs', color: 'text-yellow-400' },
                  { label: 'Return', value: Math.round((calc.totalInterest / calc.totalContributions) * 100) + '%', color: 'text-blue-400' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className={\`text-lg font-bold \${item.color}\`}>{item.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Contributions vs Interest Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Contributions {Math.round(calc.totalContributions / calc.futureValue * 100)}%</span>
                  <span>Interest {Math.round(calc.totalInterest / calc.futureValue * 100)}%</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-400 transition-all duration-500" style={{width:\`\${(calc.totalContributions / calc.futureValue) * 100}%\`}}/>
                  <div className="h-full bg-yellow-400 transition-all duration-500" style={{width:\`\${(calc.totalInterest / calc.futureValue) * 100}%\`}}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year by Year Table */}
        <div className="mt-6 result-box">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">Year by Year Growth</h2>
            <button onClick={() => setShowTable(!showTable)}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.3)',color:'#f0c842'}}>
              {showTable ? 'Hide ↑' : 'Show Table ↓'}
            </button>
          </div>
          {showTable && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}>
                    {['Year','Balance','Contributions','Interest Earned'].map(h => (
                      <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calc.yearlyData.map((row, i) => (
                    <tr key={i} className="border-b" style={{borderColor:'rgba(255,255,255,0.03)'}}>
                      <td className="text-slate-400 py-1.5 pr-4">{row.year}</td>
                      <td className="text-yellow-400 font-bold py-1.5 pr-4">{fmt(row.balance)}</td>
                      <td className="text-white py-1.5 pr-4">{fmt(row.contributions)}</td>
                      <td className="text-emerald-400 py-1.5">{fmt(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Related Guide */}
        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/what-is-compound-interest" className="text-yellow-400 font-semibold hover:underline">What is Compound Interest and How Does It Work? (2026 Guide)</a>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/savings-calculator',icon:'🏦',name:'Savings Calculator',desc:'Calculate how your savings grow'},
              {href:'/retirement-calculator',icon:'👴',name:'Retirement Calculator',desc:'Plan your retirement savings'},
              {href:'/inflation-calculator',icon:'📉',name:'Inflation Calculator',desc:'See how inflation affects savings'},
              {href:'/net-worth-calculator',icon:'💎',name:'Net Worth',desc:'Calculate your total net worth'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="result-box">
            <div className="space-y-4 text-sm">
              {faqs.map((faq, i) => (
                <div key={i} className={i < faqs.length - 1 ? "border-b pb-4" : "pb-4"} style={{borderColor:"rgba(240,200,66,0.1)"}}>
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
`;

fs.writeFileSync('app/compound-interest/page.js', newCompound, 'utf8');
console.log('✅ Compound interest calculator upgraded!');
console.log('Run: git add . && git commit -m "Upgrade loan and compound interest calculators" && git push origin master:main');
