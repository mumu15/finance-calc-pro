'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)
  const [currentSavings, setCurrentSavings] = useState(20000)
  const [monthlySave, setMonthlySave] = useState(1500)
  const [returnRate, setReturnRate] = useState(4.5)

  const result = useMemo(() => {
    try {
      const targetDown   = homePrice * (downPct / 100)
      const stillNeeded  = Math.max(0, targetDown - currentSavings)
      const r = returnRate / 100 / 12
      const monthsNeeded = stillNeeded <= 0 ? 0 :
        r === 0 ? Math.ceil(stillNeeded / monthlySave)
        : Math.ceil(Math.log(1 + stillNeeded * r / monthlySave) / Math.log(1 + r))
      const pmiMonthly   = downPct < 20 ? homePrice * 0.005 / 12 : 0
      const pmiTotal     = pmiMonthly * Math.max(0, (homePrice * 0.20 - (homePrice * downPct/100)) / (homePrice * 0.005 / 12))
      return { targetDown, stillNeeded, monthsNeeded: monthsNeeded + ' months', pmiMonthly, pmiTotal }
    } catch(e) { return null }
  }, [homePrice, downPct, currentSavings, monthlySave, returnRate])

  const pdfRows = result ? [
    { label: "Down Payment Target", value: result.targetDown !== undefined ? String(fmt(result.targetDown)) : "" },
    { label: "Still Need to Save", value: result.stillNeeded !== undefined ? String(fmt(result.stillNeeded)) : "" },
    { label: "Time to Save Goal", value: result.monthsNeeded !== undefined ? String(result.monthsNeeded) : "" },
    { label: "Estimated Monthly PMI", value: result.pmiMonthly !== undefined ? String(fmt(result.pmiMonthly)) : "" },
    { label: "Total PMI Until 20% Equity", value: result.pmiTotal !== undefined ? String(fmt(result.pmiTotal)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏙️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Down Payment Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much down payment you need, how long to save it and the PMI impact.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Home Purchase Price</label>
                  <span className="text-white font-bold text-sm">{fmt(homePrice)}</span>
                </div>
                <input type="range" min={50000} max={3000000} step={5000}
                  value={homePrice} onChange={e => setHomePrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Target Down Payment %</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":3,"l":"3% (FHA min)"},{"v":5,"l":"5%"},{"v":10,"l":"10%"},{"v":20,"l":"20% (no PMI)"},{"v":25,"l":"25%"}]).map(o => (
                    <button key={o.v} onClick={() => setDownPct(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: downPct === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: downPct === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: downPct === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Savings</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSavings)}</span>
                </div>
                <input type="range" min={0} max={500000} step={1000}
                  value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Savings Rate</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlySave)}</span>
                </div>
                <input type="range" min={100} max={10000} step={100}
                  value={monthlySave} onChange={e => setMonthlySave(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Savings Return Rate</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="range" min={0} max={8} step={0.25}
                  value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Down Payment Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Down Payment Target</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.targetDown)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Still Need to Save</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.stillNeeded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Save Goal</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.monthsNeeded}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Monthly PMI</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.pmiMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total PMI Until 20% Equity</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.pmiTotal)}
                    </span>
                  </div>
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

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Affordability</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/rent-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rent vs Buy</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much down payment do I need to buy a house?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Minimum down payments: Conventional loan 3-5%, FHA loan 3.5% (with 580+ credit score), VA loan 0% (veterans), USDA loan 0% (rural areas). Putting down 20% eliminates PMI, which can save $100-$300/month. A larger down payment also gives better mortgage rates and lower monthly payments.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is PMI and how do I avoid it?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">PMI (Private Mortgage Insurance) protects the lender if you default. It costs 0.3-1.5% of the loan annually (typically $100-$300/month). Avoid it by putting down 20%+, using a piggyback loan (80/10/10), or choosing a lender-paid PMI option (slightly higher rate). PMI can be cancelled once you reach 20% equity.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Where should I save my down payment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Keep your down payment in safe, liquid accounts — not stocks. Best options: high-yield savings account (4-5% APY in 2026), money market account, short-term CDs, or I-bonds for portions you will not need for 1+ year. Never invest a down payment you will need within 2-3 years in the stock market.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <Footer />
    </>
  )
}
