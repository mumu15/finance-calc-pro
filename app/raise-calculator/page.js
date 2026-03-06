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
    "q": "What is a good salary raise percentage?",
    "a": "A typical cost-of-living raise is 2-4% annually. A merit raise is usually 4-8%. A promotion raise is typically 10-20%. In a high-inflation environment, raises under 5% may not maintain purchasing power. Negotiating a higher raise at a new job is often more effective than annual increments."
  },
  {
    "q": "How do I negotiate a salary raise?",
    "a": "Research market salaries on Glassdoor, LinkedIn Salary, and Levels.fyi. Document your accomplishments with specific metrics ($X revenue generated, Y% cost reduction). Ask for a meeting, present your case and request a specific number. Target 10-20% above your minimum acceptable figure to leave negotiation room."
  },
  {
    "q": "When is the best time to ask for a raise?",
    "a": "Ask during annual reviews, after completing a major project, when you have taken on new responsibilities, when you have a competing offer, or when the company is performing well. Avoid asking during budget cuts, layoffs or immediately after a poor performance period."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [currentSalary, setCurrentSalary] = useState(65000)
  const [raiseType, setRaiseType] = useState(pct)
  const [raisePct, setRaisePct] = useState(10)
  const [raiseFlat, setRaiseFlat] = useState(6500)
  const [taxRate, setTaxRate] = useState(28)

  const result = useMemo(() => {
    try {
      const raiseAmount = raiseType === 'pct' ? currentSalary * (raisePct / 100) : raiseFlat
      const newSalary = currentSalary + raiseAmount
      const newPct = (raiseAmount / currentSalary * 100).toFixed(2) + '%'
      const monthlyIncrease = raiseAmount / 12
      const takeHomeIncrease = monthlyIncrease * (1 - taxRate / 100)
      const annualTakeHomeGain = takeHomeIncrease * 12
      return { newSalary, raiseAmount, newPct, takeHomeIncrease, annualTakeHomeGain }
    } catch(e) { return null }
  }, [currentSalary, raiseType, raisePct, raiseFlat, taxRate])

  const pdfRows = result ? [
    { label: 'New Annual Salary', value: result.newSalary !== undefined ? (fmt(result.newSalary)) : '' },
    { label: 'Raise Amount', value: result.raiseAmount !== undefined ? (fmt(result.raiseAmount)) : '' },
    { label: 'Raise Percentage', value: result.newPct !== undefined ? (String(result.newPct)) : '' },
    { label: 'Extra Monthly Take-Home (after tax)', value: result.takeHomeIncrease !== undefined ? (fmt(result.takeHomeIncrease)) : '' },
    { label: 'Extra Annual Take-Home', value: result.annualTakeHomeGain !== undefined ? (fmt(result.annualTakeHomeGain)) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Raise Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate the impact of a salary raise on your annual income, monthly pay and take-home.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Annual Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSalary)}</span>
                </div>
                <input type="range" min={10000} max={500000} step={1000}
                  value={currentSalary} onChange={e => setCurrentSalary(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Raise Type</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":"pct","l":"% Raise"},{"v":"flat","l":"$ Amount"}].map(o => (
                    <button key={o.v} onClick={() => setRaiseType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:raiseType===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:raiseType===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:raiseType===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Raise Percentage</label>
                  <span className="text-white font-bold text-sm">{raisePct + '%'}</span>
                </div>
                <input type="range" min={0.5} max={50} step={0.5}
                  value={raisePct} onChange={e => setRaisePct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Raise Dollar Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(raiseFlat)}</span>
                </div>
                <input type="range" min={500} max={100000} step={500}
                  value={raiseFlat} onChange={e => setRaiseFlat(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Estimated Tax Rate</label>
                  <span className="text-white font-bold text-sm">{taxRate + '%'}</span>
                </div>
                <input type="range" min={10} max={45} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Raise Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Annual Salary</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.newSalary)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Raise Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.raiseAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Raise Percentage</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.newPct}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Extra Monthly Take-Home (after tax)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.takeHomeIncrease)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Extra Annual Take-Home</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.annualTakeHomeGain)}</span>
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

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good salary raise percentage?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A typical cost-of-living raise is 2-4% annually. A merit raise is usually 4-8%. A promotion raise is typically 10-20%. In a high-inflation environment, raises under 5% may not maintain purchasing power. Negotiating a higher raise at a new job is often more effective than annual increments.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I negotiate a salary raise?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Research market salaries on Glassdoor, LinkedIn Salary, and Levels.fyi. Document your accomplishments with specific metrics ($X revenue generated, Y% cost reduction). Ask for a meeting, present your case and request a specific number. Target 10-20% above your minimum acceptable figure to leave negotiation room.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When is the best time to ask for a raise?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Ask during annual reviews, after completing a major project, when you have taken on new responsibilities, when you have a competing offer, or when the company is performing well. Avoid asking during budget cuts, layoffs or immediately after a poor performance period.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
