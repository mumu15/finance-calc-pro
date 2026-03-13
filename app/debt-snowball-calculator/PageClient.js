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
  const [debt1Bal, setDebt1Bal] = useState(1500)
  const [debt1Rate, setDebt1Rate] = useState(15)
  const [debt2Bal, setDebt2Bal] = useState(5000)
  const [debt2Rate, setDebt2Rate] = useState(22)
  const [debt3Bal, setDebt3Bal] = useState(12000)
  const [debt3Rate, setDebt3Rate] = useState(18)
  const [extraPmt, setExtraPmt] = useState(200)

  const result = useMemo(() => {
    try {
      const debts = [
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
      return { totalDebt, months: months + ' months', totalInterest, totalMonthly, years: (months/12).toFixed(1) + ' years' }
    } catch(e) { return null }
  }, [debt1Bal, debt1Rate, debt2Bal, debt2Rate, debt3Bal, debt3Rate, extraPmt])

  const pdfRows = result ? [
    { label: "Total Debt", value: result.totalDebt !== undefined ? String(fmt(result.totalDebt)) : "" },
    { label: "Payoff Time", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Payoff Time in Years", value: result.years !== undefined ? String(result.years) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Monthly Payment", value: result.totalMonthly !== undefined ? String(fmt(result.totalMonthly)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">❄️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Snowball Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Pay off smallest debts first to build momentum and eliminate accounts faster.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 1 Balance (smallest)</label>
                  <span className="text-white font-bold text-sm">{fmt(debt1Bal)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={debt1Bal} onChange={e => setDebt1Bal(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 1 APR</label>
                  <span className="text-white font-bold text-sm">{`${debt1Rate}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.25}
                  value={debt1Rate} onChange={e => setDebt1Rate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 2 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(debt2Bal)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={debt2Bal} onChange={e => setDebt2Bal(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 2 APR</label>
                  <span className="text-white font-bold text-sm">{`${debt2Rate}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.25}
                  value={debt2Rate} onChange={e => setDebt2Rate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 3 Balance (largest)</label>
                  <span className="text-white font-bold text-sm">{fmt(debt3Bal)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={debt3Bal} onChange={e => setDebt3Bal(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 3 APR</label>
                  <span className="text-white font-bold text-sm">{`${debt3Rate}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.25}
                  value={debt3Rate} onChange={e => setDebt3Rate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Extra Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(extraPmt)}</span>
                </div>
                <input type="range" min={0} max={5000} step={25}
                  value={extraPmt} onChange={e => setExtraPmt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Debt Snowball Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Debt</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDebt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Payoff Time</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Payoff Time in Years</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.years}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalMonthly)}
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

            <a href="/debt-avalanche-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏔️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Avalanche</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Consolidation</h3>
            </a>

            <a href="/budget-planner-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Planner</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does the debt snowball work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">List all debts smallest to largest balance. Pay minimums on everything, then throw every extra dollar at the smallest balance. When that debt is paid off, take the entire payment (minimum + extra) and add it to the next smallest debt. Each payoff accelerates the next one like a growing snowball. You eliminate accounts quickly which builds psychological momentum.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is the snowball or avalanche method better?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Mathematically the avalanche saves more money. Behaviorally the snowball may work better for many people. Dave Ramsey popularized the snowball because real people need motivation to stick with a debt payoff plan for years. Research from Harvard Business Review found snowball users were more likely to pay off all their debt than avalanche users, despite paying more in interest.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How long does the debt snowball take?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Payoff time depends on total debt, interest rates, and how much extra you can pay monthly. The single biggest factor is your extra monthly payment. Even $100-$200 extra per month dramatically accelerates payoff. With $200/month extra on $18,500 of debt at average 18% APR, the snowball pays off in roughly 4 years vs 9+ years paying minimums only.</p>
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
