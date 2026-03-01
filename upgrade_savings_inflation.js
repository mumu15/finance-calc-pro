const fs = require('fs');

// ── SAVINGS CALCULATOR ────────────────────────────────────────────────────────
const newSavings = `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'How much should I have in savings?', a: 'Start with an emergency fund of 3-6 months of expenses. After that save 15-20% of income for long term goals. Keep 1-3 months expenses in a high yield savings account for short term needs.' },
  { q: 'What is a high yield savings account?', a: 'A high yield savings account pays significantly more interest than a standard savings account. In 2026 the best high yield savings accounts pay around 4-5% APY compared to 0.5% at traditional banks.' },
  { q: 'How long does it take to save $10,000?', a: 'Saving $500/month with a 4.5% interest rate takes about 19 months to reach $10,000. At $1,000/month it takes about 10 months.' },
  { q: 'How long does it take to save $100,000?', a: 'Saving $1,000/month at 5% interest takes about 7.5 years to reach $100,000. Starting with $10,000 already saved reduces the time to about 6.5 years.' },
  { q: 'What is APY vs APR for savings?', a: 'APY (Annual Percentage Yield) accounts for compound interest and shows what you actually earn in a year. APR is the simple annual rate without compounding. Always compare APY when choosing savings accounts.' },
]

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(5000)
  const [monthlyDeposit, setMonthlyDeposit] = useState(500)
  const [interestRate, setInterestRate] = useState(4.5)
  const [years, setYears] = useState(10)
  const [showTable, setShowTable] = useState(false)

  const calc = useMemo(() => {
    const r = interestRate / 100 / 12
    const n = years * 12
    const futureValue = initialDeposit * Math.pow(1 + r, n) +
      monthlyDeposit * ((Math.pow(1 + r, n) - 1) / r)
    const totalDeposited = initialDeposit + monthlyDeposit * n
    const interestEarned = futureValue - totalDeposited

    const yearlyData = []
    let balance = initialDeposit
    for (let y = 1; y <= years; y++) {
      const prev = balance
      balance = balance * Math.pow(1 + r, 12) + monthlyDeposit * ((Math.pow(1 + r, 12) - 1) / r)
      const deposited = initialDeposit + monthlyDeposit * 12 * y
      yearlyData.push({
        year: y,
        balance,
        deposited,
        interest: balance - deposited,
        yearGrowth: balance - prev - monthlyDeposit * 12,
      })
    }

    return { futureValue, totalDeposited, interestEarned, yearlyData }
  }, [initialDeposit, monthlyDeposit, interestRate, years])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Savings Calculator</h1>
          <p className="text-slate-400 text-lg">See exactly how your savings grow year by year with compound interest</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Savings Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Initial Deposit', value: initialDeposit, set: setInitialDeposit, min: 0, max: 100000, step: 500, prefix: '$' },
                { label: 'Monthly Deposit', value: monthlyDeposit, set: setMonthlyDeposit, min: 0, max: 5000, step: 50, prefix: '$' },
                { label: 'Annual Interest Rate (APY)', value: interestRate, set: setInterestRate, min: 0.5, max: 10, step: 0.25, suffix: '%' },
                { label: 'Time Period', value: years, set: setYears, min: 1, max: 40, step: 1, suffix: ' years' },
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

              {/* Rate Presets */}
              <div>
                <label className="text-slate-400 text-sm block mb-2">Rate Presets</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Regular Bank', rate: 0.5 },
                    { label: 'High Yield', rate: 4.5 },
                    { label: 'S&P 500 avg', rate: 7 },
                  ].map((p, i) => (
                    <button key={i} onClick={() => setInterestRate(p.rate)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{background: interestRate === p.rate ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)', border: interestRate === p.rate ? '1px solid rgba(240,200,66,0.4)' : '1px solid rgba(255,255,255,0.08)', color: interestRate === p.rate ? '#f0c842' : '#64748b'}}>
                      {p.label} ({p.rate}%)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box text-center py-6">
              <div className="text-slate-400 text-sm mb-2">Total Savings After {years} Years</div>
              <div className="text-5xl font-bold mb-1" style={{color:'#f0c842'}}>{fmt(calc.futureValue)}</div>
            </div>

            <div className="result-box">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Deposited', value: fmt(calc.totalDeposited), color: 'text-white' },
                  { label: 'Interest Earned', value: fmt(calc.interestEarned), color: 'text-emerald-400' },
                  { label: 'Return on Investment', value: Math.round((calc.interestEarned / calc.totalDeposited) * 100) + '%', color: 'text-yellow-400' },
                  { label: 'Monthly at Retirement', value: fmt(calc.futureValue * 0.04 / 12), color: 'text-blue-400' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className={\`text-lg font-bold \${item.color}\`}>{item.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Deposits {Math.round(calc.totalDeposited / calc.futureValue * 100)}%</span>
                  <span>Interest {Math.round(calc.interestEarned / calc.futureValue * 100)}%</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-400 transition-all duration-500" style={{width:\`\${(calc.totalDeposited / calc.futureValue) * 100}%\`}}/>
                  <div className="h-full bg-yellow-400 transition-all duration-500" style={{width:\`\${(calc.interestEarned / calc.futureValue) * 100}%\`}}/>
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
                    {['Year','Balance','Total Deposited','Interest Earned','Annual Growth'].map(h => (
                      <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calc.yearlyData.map((row, i) => (
                    <tr key={i} className="border-b" style={{borderColor:'rgba(255,255,255,0.03)'}}>
                      <td className="text-slate-400 py-1.5 pr-4">{row.year}</td>
                      <td className="text-yellow-400 font-bold py-1.5 pr-4">{fmt(row.balance)}</td>
                      <td className="text-white py-1.5 pr-4">{fmt(row.deposited)}</td>
                      <td className="text-emerald-400 py-1.5 pr-4">{fmt(row.interest)}</td>
                      <td className="text-blue-400 py-1.5">{fmt(row.yearGrowth)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-to-save-money-fast" className="text-yellow-400 font-semibold hover:underline">How to Save Money Fast: 15 Proven Strategies (2026)</a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/compound-interest',icon:'📈',name:'Compound Interest',desc:'See how compound interest grows money'},
              {href:'/retirement-calculator',icon:'👴',name:'Retirement Calculator',desc:'Plan your retirement savings'},
              {href:'/emergency-fund-calculator',icon:'🛡️',name:'Emergency Fund',desc:'Calculate your emergency fund'},
              {href:'/inflation-calculator',icon:'📉',name:'Inflation Calculator',desc:'See how inflation affects savings'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

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

fs.writeFileSync('app/savings-calculator/page.js', newSavings, 'utf8');
console.log('✅ Savings calculator upgraded!');

// ── INFLATION CALCULATOR ──────────────────────────────────────────────────────
const newInflation = `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is inflation?', a: 'Inflation is the rate at which the general level of prices rises over time, reducing purchasing power. When inflation is 3% annually, $100 today will only buy what $97 worth of goods buys next year.' },
  { q: 'What is the average inflation rate?', a: 'The US Federal Reserve targets 2% annual inflation. The historical average US inflation rate is about 3.1% per year. Periods of high inflation like 2021-2023 saw rates of 7-9%.' },
  { q: 'How does inflation affect savings?', a: 'If your savings earn less interest than the inflation rate your money is losing purchasing power. At 3% inflation $100,000 today will only be worth about $74,000 in purchasing power after 10 years.' },
  { q: 'What is the best protection against inflation?', a: 'Investing in assets that historically outpace inflation such as stocks, real estate, TIPS (Treasury Inflation-Protected Securities) and I-bonds. Keeping cash in a high yield savings account helps too.' },
  { q: 'How do I calculate inflation?', a: 'Future value = Present value × (1 + inflation rate)^years. For example $100,000 at 3% inflation over 10 years = $100,000 × (1.03)^10 = $134,392 needed to maintain the same purchasing power.' },
]

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000)
  const [inflationRate, setInflationRate] = useState(3)
  const [years, setYears] = useState(20)

  const calc = useMemo(() => {
    const futureNeeded = amount * Math.pow(1 + inflationRate / 100, years)
    const purchasingPower = amount / Math.pow(1 + inflationRate / 100, years)
    const lostValue = amount - purchasingPower
    const lostPct = Math.round((lostValue / amount) * 100)

    const yearlyData = []
    for (let y = 1; y <= years; y++) {
      yearlyData.push({
        year: y,
        purchasingPower: amount / Math.pow(1 + inflationRate / 100, y),
        neededToMatch: amount * Math.pow(1 + inflationRate / 100, y),
      })
    }

    return { futureNeeded, purchasingPower, lostValue, lostPct, yearlyData }
  }, [amount, inflationRate, years])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Inflation Calculator</h1>
          <p className="text-slate-400 text-lg">See how inflation erodes your purchasing power — and how much you need to keep up</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Inflation Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Amount Today', value: amount, set: setAmount, min: 1000, max: 1000000, step: 1000, prefix: '$' },
                { label: 'Annual Inflation Rate', value: inflationRate, set: setInflationRate, min: 0.5, max: 15, step: 0.5, suffix: '%' },
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

              {/* Rate Presets */}
              <div>
                <label className="text-slate-400 text-sm block mb-2">Historical Presets</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Fed Target', rate: 2 },
                    { label: 'Historical Avg', rate: 3.1 },
                    { label: '2022 Peak', rate: 8 },
                  ].map((p, i) => (
                    <button key={i} onClick={() => setInflationRate(p.rate)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{background: inflationRate === p.rate ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)', border: inflationRate === p.rate ? '1px solid rgba(240,200,66,0.4)' : '1px solid rgba(255,255,255,0.08)', color: inflationRate === p.rate ? '#f0c842' : '#64748b'}}>
                      {p.label} ({p.rate}%)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="result-box text-center py-5">
                <div className="text-slate-400 text-sm mb-1">Purchasing Power of {fmt(amount)} in {years} Years</div>
                <div className="text-4xl font-bold mb-1" style={{color:'#ef4444'}}>{fmt(calc.purchasingPower)}</div>
                <div className="text-slate-500 text-sm">Lost {fmt(calc.lostValue)} in purchasing power ({calc.lostPct}%)</div>
              </div>

              <div className="result-box text-center py-5">
                <div className="text-slate-400 text-sm mb-1">Amount Needed in {years} Years to Match Today</div>
                <div className="text-4xl font-bold mb-1" style={{color:'#f0c842'}}>{fmt(calc.futureNeeded)}</div>
                <div className="text-slate-500 text-sm">To maintain the same purchasing power as {fmt(amount)} today</div>
              </div>
            </div>

            {/* Purchasing Power Bar */}
            <div className="result-box">
              <h3 className="text-white font-bold mb-3">Purchasing Power Lost</h3>
              <div className="w-full h-4 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-400 transition-all duration-500" style={{width:\`\${100 - calc.lostPct}%\`}}/>
                <div className="h-full bg-red-400 transition-all duration-500" style={{width:\`\${calc.lostPct}%\`}}/>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Remaining {100 - calc.lostPct}%</span>
                <span>Lost to inflation {calc.lostPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Year by Year */}
        <div className="mt-6 result-box">
          <h2 className="text-white font-bold text-lg mb-4">Purchasing Power Over Time</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}>
                  {['Year','Purchasing Power','Needed to Match Today','Value Lost'].map(h => (
                    <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calc.yearlyData.filter((_, i) => i % (years > 20 ? 5 : years > 10 ? 2 : 1) === 0 || i === years - 1).map((row, i) => (
                  <tr key={i} className="border-b" style={{borderColor:'rgba(255,255,255,0.03)'}}>
                    <td className="text-slate-400 py-1.5 pr-4">{row.year}</td>
                    <td className="text-red-400 py-1.5 pr-4">{fmt(row.purchasingPower)}</td>
                    <td className="text-yellow-400 py-1.5 pr-4">{fmt(row.neededToMatch)}</td>
                    <td className="text-slate-400 py-1.5">{fmt(amount - row.purchasingPower)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-does-inflation-affect-savings" className="text-yellow-400 font-semibold hover:underline">How Does Inflation Affect Your Savings? (2026 Guide)</a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/savings-calculator',icon:'🏦',name:'Savings Calculator',desc:'Calculate how your savings grow'},
              {href:'/compound-interest',icon:'📈',name:'Compound Interest',desc:'See how compound interest works'},
              {href:'/retirement-calculator',icon:'👴',name:'Retirement Calculator',desc:'Plan your retirement savings'},
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

fs.writeFileSync('app/inflation-calculator/page.js', newInflation, 'utf8');
console.log('✅ Inflation calculator upgraded!');
console.log('\n🎉 ALL 12 calculators fully upgraded!');
console.log('Run: git add . && git commit -m "Upgrade savings and inflation calculators — all 12 done!" && git push origin master:main');
