'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export const metadata = undefined

const faqs = [
  {
    "q": "When should I refinance my mortgage?",
    "a": "Refinancing is worth it when: (1) you can lower your rate by at least 0.5-1%, (2) you plan to stay in the home long enough to recoup closing costs (break-even), and (3) your credit score has improved since origination. The break-even point is typically 2-4 years."
  },
  {
    "q": "What are typical refinance closing costs?",
    "a": "Refinance closing costs typically run 2-5% of the loan amount — about $6,000-$15,000 on a $300,000 loan. Costs include origination fees, appraisal, title insurance, escrow and attorney fees. Some lenders offer no-closing-cost refinances at a slightly higher rate."
  },
  {
    "q": "Does refinancing hurt your credit?",
    "a": "Refinancing causes a temporary credit score dip of 5-15 points due to the hard credit inquiry and new account opening. The effect is minor and usually recovers within 6-12 months of on-time payments. Multiple mortgage inquiries within 45 days are typically treated as one."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [currentBalance, setCurrentBalance] = useState(300000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [newRate, setNewRate] = useState(6)
  const [termYears, setTermYears] = useState(30)
  const [closingCosts, setClosingCosts] = useState(5000)

  const result = useMemo(() => {
    try {
      const r1 = currentRate / 100 / 12
      const r2 = newRate / 100 / 12
      const n = termYears * 12
      const oldMonthly = r1 === 0 ? currentBalance/n : currentBalance*(r1*Math.pow(1+r1,n))/(Math.pow(1+r1,n)-1)
      const newMonthly = r2 === 0 ? currentBalance/n : currentBalance*(r2*Math.pow(1+r2,n))/(Math.pow(1+r2,n)-1)
      const monthlySavings = oldMonthly - newMonthly
      if (monthlySavings <= 0) return { monthlySavings, newMonthly, breakEven: 'Not worth it', totalSavings: 0 }
      const breakEvenMonths = Math.ceil(closingCosts / monthlySavings)
      const totalSavings = (monthlySavings * n) - closingCosts
      return { newMonthly, monthlySavings, breakEven: breakEvenMonths + ' months', totalSavings }
    } catch(e) { return null }
  }, [currentBalance, currentRate, newRate, termYears, closingCosts])

  const pdfRows = result ? [
    { label: 'New Monthly Payment', value: result.newMonthly !== undefined ? (fmt(result.newMonthly)) : '' },
    { label: 'Monthly Savings', value: result.monthlySavings !== undefined ? (fmt(result.monthlySavings)) : '' },
    { label: 'Break-Even Period', value: result.breakEven !== undefined ? (String(result.breakEven)) : '' },
    { label: 'Total Lifetime Savings', value: result.totalSavings !== undefined ? (fmt(result.totalSavings)) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔄</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Refinance Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find out if refinancing your loan saves money and how long to break even on closing costs.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Loan Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(currentBalance)}</span>
                </div>
                <input type="range" min={10000} max={1000000} step={5000}
                  value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Interest Rate</label>
                  <span className="text-white font-bold text-sm">{currentRate + '%'}</span>
                </div>
                <input type="range" min={1} max={15} step={0.125}
                  value={currentRate} onChange={e => setCurrentRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">New Interest Rate</label>
                  <span className="text-white font-bold text-sm">{newRate + '%'}</span>
                </div>
                <input type="range" min={1} max={15} step={0.125}
                  value={newRate} onChange={e => setNewRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">New Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":10,"l":"10 yrs"},{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"},{"v":30,"l":"30 yrs"}].map(o => (
                    <button key={o.v} onClick={() => setTermYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:termYears===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:termYears===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:termYears===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Closing Costs</label>
                  <span className="text-white font-bold text-sm">{fmt(closingCosts)}</span>
                </div>
                <input type="range" min={0} max={20000} step={250}
                  value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Refinance Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.newMonthly)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.monthlySavings)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even Period</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.breakEven}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Lifetime Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalSavings)}</span>
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

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/amortization-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Amortization</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Affordability</h3>
            </a>

            <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When should I refinance my mortgage?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Refinancing is worth it when: (1) you can lower your rate by at least 0.5-1%, (2) you plan to stay in the home long enough to recoup closing costs (break-even), and (3) your credit score has improved since origination. The break-even point is typically 2-4 years.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are typical refinance closing costs?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Refinance closing costs typically run 2-5% of the loan amount — about $6,000-$15,000 on a $300,000 loan. Costs include origination fees, appraisal, title insurance, escrow and attorney fees. Some lenders offer no-closing-cost refinances at a slightly higher rate.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does refinancing hurt your credit?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Refinancing causes a temporary credit score dip of 5-15 points due to the hard credit inquiry and new account opening. The effect is minor and usually recovers within 6-12 months of on-time payments. Multiple mortgage inquiries within 45 days are typically treated as one.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
