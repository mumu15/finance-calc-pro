'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'


export const metadata = {
  title: 'Debt Consolidation Calculator — Free Online Debt Consolidation Calculator | FreeFinCalc',
  description: 'Free Debt Consolidation Calculator — find the fastest way to pay off your debt, see interest saved, and create a payoff plan. No sign-up.',
  alternates: { canonical: 'https://freefincalc.net/debt-consolidation-calculator' },
  openGraph: {
    title: 'Debt Consolidation Calculator — Free Online Debt Consolidation Calculator | FreeFinCalc',
    description: 'Free Debt Consolidation Calculator — find the fastest way to pay off your debt, see interest saved, and create a payoff plan. No sign-up.',
    url: 'https://freefincalc.net/debt-consolidation-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [debt1, setDebt1] = useState(8000)
  const [rate1, setRate1] = useState(24)
  const [debt2, setDebt2] = useState(5000)
  const [rate2, setRate2] = useState(21)
  const [debt3, setDebt3] = useState(3000)
  const [rate3, setRate3] = useState(18)
  const [consolidationRate, setConsolidationRate] = useState(11)
  const [consolidationTerm, setConsolidationTerm] = useState(48)

  const result = useMemo(() => {
    try {
      const totalDebt = debt1 + debt2 + debt3
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
      return { totalDebt, weightedRate: weightedRate.toFixed(2) + '%', currentMonthly, newMonthly, monthlySaving, totalNew, interestSaved }
    } catch(e) { return null }
  }, [debt1, rate1, debt2, rate2, debt3, rate3, consolidationRate, consolidationTerm])

  const pdfRows = result ? [
    { label: "Total Debt to Consolidate", value: result.totalDebt !== undefined ? String(fmt(result.totalDebt)) : "" },
    { label: "Current Weighted Rate", value: result.weightedRate !== undefined ? String(result.weightedRate) : "" },
    { label: "Current Est. Monthly Payment", value: result.currentMonthly !== undefined ? String(fmt(result.currentMonthly)) : "" },
    { label: "New Monthly Payment", value: result.newMonthly !== undefined ? String(fmt(result.newMonthly)) : "" },
    { label: "Monthly Savings", value: result.monthlySaving !== undefined ? String(fmt(result.monthlySaving)) : "" },
    { label: "New Total Loan Cost", value: result.totalNew !== undefined ? String(fmt(result.totalNew)) : "" },
    { label: "Estimated Interest Saved", value: result.interestSaved !== undefined ? String(fmt(result.interestSaved)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔗</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Consolidation Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how consolidating multiple debts into one loan saves money and simplifies payments.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 1 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(debt1)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={debt1} onChange={e => setDebt1(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 1 APR</label>
                  <span className="text-white font-bold text-sm">{`${rate1}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.25}
                  value={rate1} onChange={e => setRate1(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 2 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(debt2)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={debt2} onChange={e => setDebt2(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 2 APR</label>
                  <span className="text-white font-bold text-sm">{`${rate2}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.25}
                  value={rate2} onChange={e => setRate2(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 3 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(debt3)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={debt3} onChange={e => setDebt3(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt 3 APR</label>
                  <span className="text-white font-bold text-sm">{`${rate3}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.25}
                  value={rate3} onChange={e => setRate3(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Consolidation Loan Rate</label>
                  <span className="text-white font-bold text-sm">{`${consolidationRate}%`}</span>
                </div>
                <input type="range" min={1} max={25} step={0.25}
                  value={consolidationRate} onChange={e => setConsolidationRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Consolidation Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setConsolidationTerm(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: consolidationTerm === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: consolidationTerm === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: consolidationTerm === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Debt Consolidation Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Debt to Consolidate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDebt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Weighted Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.weightedRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Est. Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.currentMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.newMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlySaving)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Total Loan Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalNew)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Interest Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestSaved)}
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

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Card Payoff</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/balance-transfer-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Balance Transfer</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is debt consolidation a good idea?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Consolidation is good when: you qualify for a meaningfully lower interest rate, you will not accumulate new debt on paid-off cards, the new monthly payment fits your budget, and the total cost is lower. Warning signs: extending the payoff period so much that you pay more total interest, consolidating into a secured loan (risking your home) for unsecured debt, and not addressing the spending habits that caused the debt.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Debt consolidation vs debt settlement: what is the difference?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Consolidation combines debts into one new loan at (ideally) a lower rate — you pay 100% of what you owe. Debt settlement negotiates with creditors to accept less than the full balance — damages your credit severely (stays 7 years), you may owe income tax on forgiven amounts, and it only makes sense if you are already severely delinquent. Consolidation is almost always the better choice for people still current on payments.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What credit score do I need for a debt consolidation loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Good rates (under 12%) typically require 700+ credit score. Fair rates (12-18%) require 640-700. Below 640, consolidation rates may not be lower than your current debt rates, eliminating the benefit. Options for lower credit: balance transfer to a 0% card (requires 670+), credit union personal loans (more flexible than banks), or a debt management plan through a nonprofit credit counselor.</p>
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
