'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is inflation?', a: 'Inflation is the rate at which the general level of prices for goods and services rises over time, reducing the purchasing power of money. When inflation is 3%, something that cost $100 last year costs $103 this year.' },
  { q: 'What is the average inflation rate?', a: 'The US Federal Reserve targets an average inflation rate of 2% per year. Historical average US inflation has been around 3% per year. In 2022 inflation peaked at over 9% before declining.' },
  { q: 'How does inflation affect savings?', a: 'Inflation erodes the purchasing power of savings. If your savings account earns 1% interest but inflation is 3%, you are effectively losing 2% of purchasing power per year. This is why investing is important for long term wealth.' },
  { q: 'What causes inflation?', a: 'Inflation is caused by increased demand for goods and services, rising production costs, expansion of the money supply, and supply chain disruptions. Central banks use interest rates to control inflation.' },
  { q: 'Is this inflation calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function InflationCalculator() {
  const [form, setForm] = useState({ amount: 1000, startYear: 2010, endYear: 2024, rate: 3 })
  const [result, setResult] = useState(null)

  const update = (k,v) => setForm(f=>({...f,[k]:parseFloat(v)||0}))

  const calculate = () => {
    const years = form.endYear - form.startYear
    if (years <= 0) return
    const futureValue = form.amount * Math.pow(1 + form.rate/100, years)
    const purchasingPowerLoss = futureValue - form.amount
    const purchasingPowerPct = ((purchasingPowerLoss/futureValue)*100).toFixed(1)
    setResult({ futureValue: futureValue.toFixed(2), purchasingPowerLoss: purchasingPowerLoss.toFixed(2), purchasingPowerPct, years })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})

  return (
    <>
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema items={[{"name":"Home","url":"https://www.freefincalc.net"},{"name":"Inflation Calculator","url":"https://www.freefincalc.net/inflation-calculator"}]} />
      <WebAppSchema name="Free Inflation Calculator" description="Calculate how inflation affects the purchasing power of your money over time. Free inflation calculator." url="https://www.freefincalc.net/inflation-calculator" />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Inflation Calculator</h1>
          <p className="text-slate-400 text-lg">See how inflation affects the value of money over time</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.1)',borderRadius:'16px',padding:'24px'}}>
            {[
              {label:'Amount ($)',key:'amount'},
              {label:'Start Year',key:'startYear'},
              {label:'End Year',key:'endYear'},
              {label:'Annual Inflation Rate (%)',key:'rate'},
            ].map(f => (
              <div key={f.key}>
                <label className="text-white text-sm font-medium block mb-1">{f.label}</label>
                <input type="number" value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Inflation</button>
          </div>
          <div>
            {!result ? (
              <div className="result-box text-center py-16"><div className="text-5xl mb-4">📉</div><p className="text-slate-500">Fill in your details and click Calculate</p></div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Value Needed in {form.endYear}</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.futureValue)}</div>
                  <p className="text-slate-500 text-sm">to match {fmt(form.amount)} from {form.startYear}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {label:'Original Amount',value:fmt(form.amount)},
                    {label:'Adjusted Amount',value:fmt(result.futureValue)},
                    {label:'Purchasing Power Loss',value:fmt(result.purchasingPowerLoss)},
                    {label:'Years',value:result.years},
                  ].map((s,i) => (
                    <div key={i} className="stat-card">
                      <div className="text-xl font-bold text-white">{s.value}</div>
                      <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="result-box">
                  <p className="text-slate-400 text-sm">Money loses <span className="text-red-400 font-bold">{result.purchasingPowerPct}%</span> of its purchasing power over {result.years} years at {form.rate}% inflation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6 mt-12">
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Free Inflation Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free inflation calculator shows you how inflation affects the value of money over time. Enter an amount, a start year, an end year and an inflation rate to see how much that amount would be worth in today's dollars. Understanding inflation is essential for financial planning, salary negotiations and investment decisions.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              {faqs.map((faq,i) => (
                <div key={i} className={i<faqs.length-1?"border-b pb-4":"pb-4"} style={{borderColor:"rgba(240,200,66,0.1)"}}>
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🏦</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate how your savings grow</p>
              </a>
              <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📈</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
                <p className="text-slate-500 text-xs leading-relaxed">See how compound interest grows money</p>
              </a>
              <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">👴</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Retirement Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Plan your retirement savings</p>
              </a>
              <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Net Worth Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate your total net worth</p>
              </a>
            </div>
          </div>
      </main>

          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/how-does-inflation-affect-savings" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How Does Inflation Affect Your Savings? (2026 Guide)</a>
          </div>
      <Footer />
    </>
  )
}
