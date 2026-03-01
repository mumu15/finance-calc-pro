'use client'
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
                <div className="h-full bg-emerald-400 transition-all duration-500" style={{width:`${100 - calc.lostPct}%`}}/>
                <div className="h-full bg-red-400 transition-all duration-500" style={{width:`${calc.lostPct}%`}}/>
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
