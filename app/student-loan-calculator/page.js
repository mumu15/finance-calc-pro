'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "What is the average student loan debt?",
    "a": "The average US student loan borrower owes approximately $37,000. Federal student loans for undergraduates are capped at $31,000 for dependent students and $57,500 for independent students. Graduate students can borrow significantly more."
  },
  {
    "q": "Should I pay off student loans or invest?",
    "a": "If your student loan rate is below 6%, investing in an index fund earning 7-10% historically makes more financial sense. If your rate is above 6-7%, paying off debt first is usually better. High-interest private loans should always be prioritized."
  },
  {
    "q": "What is income-driven repayment?",
    "a": "Income-driven repayment (IDR) plans cap federal student loan payments at 5-20% of your discretionary income. Plans include SAVE, PAYE, IBR and ICR. After 10-25 years of qualifying payments, any remaining balance may be forgiven. IDR is best for low income relative to debt."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [balance, setBalance] = useState(35000)
  const [rate, setRate] = useState(5.5)
  const [termYears, setTermYears] = useState(10)

  const result = useMemo(() => {
    try {
      const r = rate / 100 / 12
      const n = termYears * 12
      const monthly = r === 0 ? balance/n : balance * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - balance
      const interestPct = ((totalInterest / balance) * 100).toFixed(1) + '%'
      return { monthly, totalInterest, totalPaid, interestPct }
    } catch(e) { return null }
  }, [balance, rate, termYears])

  const pdfRows = result ? [
    { label: "Monthly Payment', value: result.monthly !== undefined ? (fmt(result.monthly)) : "' },
    { label: "Total Interest', value: result.totalInterest !== undefined ? (fmt(result.totalInterest)) : "' },
    { label: "Total Paid', value: result.totalPaid !== undefined ? (fmt(result.totalPaid)) : "' },
    { label: "Interest as % of Loan', value: result.interestPct !== undefined ? (String(result.interestPct)) : "' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Student Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your student loan monthly payments, total interest and time to pay off.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance)}</span>
                </div>
                <input type="range" min={1000} max={200000} step={500}
                  value={balance} onChange={e => setBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Interest Rate</label>
                  <span className="text-white font-bold text-sm">{rate + '%'}</span>
                </div>
                <input type="range" min={1} max={15} step={0.125}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Repayment Term</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":5,"l":"5 yrs"},{"v":10,"l":"10 yrs"},{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"},{"v":25,"l":"25 yrs"}].map(o => (
                    <button key={o.v} onClick={() => setTermYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:termYears===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:termYears===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:termYears===o.v?'#f0c842':'#64748b'}}>
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
                {result && <PdfDownload title="Student Loan Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.monthly)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalInterest)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalPaid)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest as % of Loan</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.interestPct}</span>
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

            <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the average student loan debt?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The average US student loan borrower owes approximately $37,000. Federal student loans for undergraduates are capped at $31,000 for dependent students and $57,500 for independent students. Graduate students can borrow significantly more.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I pay off student loans or invest?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">If your student loan rate is below 6%, investing in an index fund earning 7-10% historically makes more financial sense. If your rate is above 6-7%, paying off debt first is usually better. High-interest private loans should always be prioritized.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is income-driven repayment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Income-driven repayment (IDR) plans cap federal student loan payments at 5-20% of your discretionary income. Plans include SAVE, PAYE, IBR and ICR. After 10-25 years of qualifying payments, any remaining balance may be forgiven. IDR is best for low income relative to debt.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
