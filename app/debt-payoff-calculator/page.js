'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "What is the debt avalanche method?",
    "a": "The debt avalanche method pays minimum payments on all debts, then puts all extra money toward the highest interest rate debt first. Once that is paid off, attack the next highest rate. This is mathematically optimal — you pay the least total interest. It is best for disciplined people who can stay motivated without quick wins."
  },
  {
    "q": "What is the debt snowball method?",
    "a": "The debt snowball method (popularized by Dave Ramsey) pays minimum payments on all debts, then targets the smallest balance first regardless of interest rate. As each debt is eliminated, the payment rolls to the next. Psychologically powerful — quick wins maintain momentum. Costs slightly more in interest than avalanche."
  },
  {
    "q": "How much extra should I pay on debt?",
    "a": "Every extra dollar beyond the minimum payment saves significant interest and reduces payoff time. On a $30,000 debt at 18% APR: minimum payments ($600/month) take 7+ years and cost $20,000+ in interest. Adding just $200/month cuts payoff to 4 years and saves $8,000. The extra payment ROI is enormous."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [debtBalance, setDebtBalance] = useState(30000)
  const [avgInterestRate, setAvgInterestRate] = useState(18)
  const [minimumPayment, setMinimumPayment] = useState(600)
  const [extraPayment, setExtraPayment] = useState(300)
  const [method, setMethod] = useState('avalanche')

  const result = useMemo(() => {
    try {
      const totalPayment = minimumPayment + extraPayment
      const r = avgInterestRate / 100 / 12
      let bal = debtBalance
      let months = 0
      let totalInterest = 0
      while (bal > 0 && months < 600) {
        const interest = bal * r
        totalInterest += interest
        bal = bal + interest - totalPayment
        if (bal < 0) bal = 0
        months++
      }
      const minMonths = Math.ceil(-Math.log(1 - (debtBalance * r) / minimumPayment) / Math.log(1 + r))
      const interestSaved = (minimumPayment * minMonths - debtBalance) - totalInterest
      return {
        months: months + ' months',
        totalInterest,
        interestSaved: Math.max(0, interestSaved),
        totalPaid: debtBalance + totalInterest
      }
    } catch(e) { return null }
  }, [debtBalance, avgInterestRate, minimumPayment, extraPayment, method])

  const pdfRows = result ? [
    { label: "Months to Debt Freedom', value: result.months !== undefined ? (String(result.months)) : "' },
    { label: "Total Interest Paid', value: result.totalInterest !== undefined ? (fmt(result.totalInterest)) : "' },
    { label: "Interest Saved vs Minimum', value: result.interestSaved !== undefined ? (fmt(result.interestSaved)) : "' },
    { label: "Total Amount Paid', value: result.totalPaid !== undefined ? (fmt(result.totalPaid)) : "' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Payoff Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find the fastest path to becoming debt-free with avalanche or snowball method.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Debt Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(debtBalance)}</span>
                </div>
                <input type="range" min={500} max={500000} step={500}
                  value={debtBalance} onChange={e => setDebtBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Average Interest Rate</label>
                  <span className="text-white font-bold text-sm">{avgInterestRate + '%'}</span>
                </div>
                <input type="range" min={1} max={36} step={0.25}
                  value={avgInterestRate} onChange={e => setAvgInterestRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Minimum Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(minimumPayment)}</span>
                </div>
                <input type="range" min={50} max={5000} step={25}
                  value={minimumPayment} onChange={e => setMinimumPayment(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Extra Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(extraPayment)}</span>
                </div>
                <input type="range" min={0} max={5000} step={25}
                  value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Payoff Strategy</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":"avalanche","l":"Avalanche (high rate first)"},{"v":"snowball","l":"Snowball (low balance first)"}].map(o => (
                    <button key={o.v} onClick={() => setMethod(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:method===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:method===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:method===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
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
                    <span className="text-slate-400 text-sm">Months to Debt Freedom</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.months}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalInterest)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Saved vs Minimum</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.interestSaved)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalPaid)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              ⚠️ Results are estimates for educational purposes only. Not financial advice.
              Consult a qualified professional before making financial decisions.
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Card Payoff</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/payoff-vs-invest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Payoff vs Invest</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the debt avalanche method?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The debt avalanche method pays minimum payments on all debts, then puts all extra money toward the highest interest rate debt first. Once that is paid off, attack the next highest rate. This is mathematically optimal — you pay the least total interest. It is best for disciplined people who can stay motivated without quick wins.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the debt snowball method?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The debt snowball method (popularized by Dave Ramsey) pays minimum payments on all debts, then targets the smallest balance first regardless of interest rate. As each debt is eliminated, the payment rolls to the next. Psychologically powerful — quick wins maintain momentum. Costs slightly more in interest than avalanche.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much extra should I pay on debt?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Every extra dollar beyond the minimum payment saves significant interest and reduces payoff time. On a $30,000 debt at 18% APR: minimum payments ($600/month) take 7+ years and cost $20,000+ in interest. Adding just $200/month cuts payoff to 4 years and saves $8,000. The extra payment ROI is enormous.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
