'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'

const faqs = [
  {
    "q": "How do I calculate the interest rate needed to reach a goal?",
    "a": "Use the compound interest formula rearranged for rate: r = (FV/PV)^(1/n) - 1, where FV is future value, PV is present value and n is years. For example, to grow $10,000 to $20,000 in 10 years requires a 7.18% annual rate."
  },
  {
    "q": "What is the Rule of 72?",
    "a": "The Rule of 72 estimates how long it takes to double money: divide 72 by the annual interest rate. At 6%, money doubles in 12 years. At 8%, in 9 years. At 12%, in 6 years. It also works in reverse: to double money in 8 years, you need a 9% rate."
  },
  {
    "q": "What interest rate does the stock market return?",
    "a": "The S&P 500 has historically returned about 10% annually before inflation, or approximately 7% after inflation. However returns vary enormously year to year. Individual stocks, real estate and other assets have different expected return rates and risk levels."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [presentValue, setPresentValue] = useState(10000)
  const [futureValue, setFutureValue] = useState(20000)
  const [years, setYears] = useState(10)
  const [compoundFreq, setCompoundFreq] = useState(12)

  const result = useMemo(() => {
    try {
      if (futureValue <= presentValue) return null
      const rate = compoundFreq * (Math.pow(futureValue / presentValue, 1 / (years * compoundFreq)) - 1)
      const annualRate = rate * compoundFreq
      const simpleRate = (futureValue - presentValue) / presentValue / years * 100
      const doubleTime = 72 / (annualRate * 100)
      return {
        annualRate: (annualRate * 100).toFixed(3) + '%',
        monthlyRate: (rate * 100).toFixed(4) + '%',
        simpleRate: simpleRate.toFixed(2) + '%',
        doubleTime: doubleTime.toFixed(1) + ' years'
      }
    } catch(e) { return null }
  }, [presentValue, futureValue, years, compoundFreq])

  const pdfRows = result ? [
    { label: "Required Annual Interest Rate", value: result.annualRate !== undefined ? (String(result.annualRate)) : "" },
    { label: "Monthly Rate", value: result.monthlyRate !== undefined ? (String(result.monthlyRate)) : "" },
    { label: "Simple Rate (for comparison)", value: result.simpleRate !== undefined ? (String(result.simpleRate)) : "" },
    { label: "Time to Double (at this rate)", value: result.doubleTime !== undefined ? (String(result.doubleTime)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔢</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Interest Rate Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find the interest rate needed to reach a savings goal or reverse-calculate loan rates.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Starting Amount (PV)</label>
                  <span className="text-white font-bold text-sm">{fmt(presentValue)}</span>
                </div>
                <input type="range" min={100} max={500000} step={500}
                  value={presentValue} onChange={e => setPresentValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Amount (FV)</label>
                  <span className="text-white font-bold text-sm">{fmt(futureValue)}</span>
                </div>
                <input type="range" min={100} max={2000000} step={500}
                  value={futureValue} onChange={e => setFutureValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Time Period</label>
                  <span className="text-white font-bold text-sm">{years + " yrs"}</span>
                </div>
                <input type="range" min={1} max={40} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Compounding Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":1,"l":"Annual"},{"v":4,"l":"Quarterly"},{"v":12,"l":"Monthly"},{"v":365,"l":"Daily"}].map(o => (
                    <button key={o.v} onClick={() => setCompoundFreq(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:compoundFreq===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:compoundFreq===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:compoundFreq===o.v?'#f0c842':'#64748b'}}>
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
                {result && <PdfDownload title="Interest Rate Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Required Annual Interest Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.annualRate}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.monthlyRate}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Simple Rate (for comparison)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.simpleRate}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Double (at this rate)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.doubleTime}</span>
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

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/simple-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">➕</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Simple Interest</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I calculate the interest rate needed to reach a goal?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Use the compound interest formula rearranged for rate: r = (FV/PV)^(1/n) - 1, where FV is future value, PV is present value and n is years. For example, to grow $10,000 to $20,000 in 10 years requires a 7.18% annual rate.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the Rule of 72?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The Rule of 72 estimates how long it takes to double money: divide 72 by the annual interest rate. At 6%, money doubles in 12 years. At 8%, in 9 years. At 12%, in 6 years. It also works in reverse: to double money in 8 years, you need a 9% rate.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What interest rate does the stock market return?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The S&P 500 has historically returned about 10% annually before inflation, or approximately 7% after inflation. However returns vary enormously year to year. Individual stocks, real estate and other assets have different expected return rates and risk levels.</p>
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
