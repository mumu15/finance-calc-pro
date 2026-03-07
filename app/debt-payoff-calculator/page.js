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
  const [balance, setBalance] = useState(25000)
  const [rate, setRate] = useState(18)
  const [monthlyPmt, setMonthlyPmt] = useState(600)
  const [extraPmt, setExtraPmt] = useState(0)

  const result = useMemo(() => {
    try {
      const r = rate / 100 / 12
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
      return { months: months + ' months', interest, totalPaid, timeSaved, interestSaved }
    } catch(e) { return null }
  }, [balance, rate, monthlyPmt, extraPmt])

  const pdfRows = result ? [
    { label: "Months to Pay Off", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Total Interest Paid", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "Total Amount Paid", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Time Saved with Extra Pmt", value: result.timeSaved !== undefined ? String(result.timeSaved) : "" },
    { label: "Interest Saved", value: result.interestSaved !== undefined ? String(fmt(result.interestSaved)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Payoff Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how long it takes to pay off any debt and compare avalanche vs snowball strategies.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Debt Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance)}</span>
                </div>
                <input type="range" min={100} max={500000} step={100}
                  value={balance} onChange={e => setBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Average Interest Rate (APR)</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="range" min={0} max={36} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyPmt)}</span>
                </div>
                <input type="range" min={10} max={20000} step={10}
                  value={monthlyPmt} onChange={e => setMonthlyPmt(Number(e.target.value))}
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
                {result && <PdfDownload title="Debt Payoff Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Months to Pay Off</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time Saved with Extra Pmt</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.timeSaved}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Saved</span>
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

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Card Payoff</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Consolidation</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
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
              <h3 className="text-white font-semibold mb-2">What is the debt avalanche method?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Pay minimums on all debts, then put every extra dollar toward the highest interest rate debt first. Once that is paid off, roll that payment to the next highest rate. This method saves the most money in interest over time and is mathematically optimal. Best for people who are motivated by numbers and long-term savings.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the debt snowball method?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Pay minimums on all debts, then attack the smallest balance first regardless of interest rate. Each payoff gives a psychological win and frees up cash flow. Research shows snowball users pay off debt faster in practice because the motivation keeps them going. Best for people who need early wins to stay on track.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much extra should I pay toward debt each month?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Even an extra $50-$100/month makes a dramatic difference. On a $25,000 debt at 18% APR with $600 minimum payments, an extra $200/month cuts payoff time from 5.5 years to 3.2 years and saves over $4,000 in interest. Use any windfalls (tax refunds, bonuses) as lump-sum extra payments for maximum impact.</p>
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
