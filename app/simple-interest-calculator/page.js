'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "What is the simple interest formula?",
    "a": "Simple Interest = Principal × Rate × Time (in years). For example: $10,000 × 8% × 5 years = $4,000 in interest. Total amount = $14,000. Simple interest is used in short-term loans, car loans and some savings accounts."
  },
  {
    "q": "Simple interest vs compound interest — what is the difference?",
    "a": "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest. $10,000 at 8% for 10 years: simple interest = $8,000 total interest; compound interest = $11,589. The gap grows enormously over time."
  },
  {
    "q": "When is simple interest used?",
    "a": "Simple interest is used for most auto loans, some personal loans, US Treasury bills and short-term loans. Mortgages, savings accounts, credit cards and most long-term investments use compound interest. Knowing which applies affects how you calculate true cost or return."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)

  const result = useMemo(() => {
    try {
      const simpleInterest = principal * (rate / 100) * years
      const totalSimple = principal + simpleInterest
      const totalCompound = principal * Math.pow(1 + rate/100, years)
      const compoundInterest = totalCompound - principal
      const difference = compoundInterest - simpleInterest
      return { simpleInterest, totalSimple, compoundInterest: compoundInterest.toFixed(2), difference: difference.toFixed(2) }
    } catch(e) { return null }
  }, [principal, rate, years])

  const pdfRows = result ? [
    { label: "Simple Interest Earned', value: result.simpleInterest !== undefined ? (fmt(result.simpleInterest)) : "' },
    { label: "Total Amount (Simple)', value: result.totalSimple !== undefined ? (fmt(result.totalSimple)) : "' },
    { label: "Compound Interest (for comparison)', value: result.compoundInterest !== undefined ? (String(result.compoundInterest)) : "' },
    { label: "Extra from Compounding', value: result.difference !== undefined ? (String(result.difference)) : "' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">➕</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Interest Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate simple interest, total amount and compare with compound interest quickly.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Principal Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(principal)}</span>
                </div>
                <input type="range" min={100} max={1000000} step={500}
                  value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{rate + '%'}</span>
                </div>
                <input type="range" min={0.5} max={30} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Time Period</label>
                  <span className="text-white font-bold text-sm">{years + ' yrs'}</span>
                </div>
                <input type="range" min={1} max={30} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Simple Interest Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Simple Interest Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.simpleInterest)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount (Simple)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalSimple)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Compound Interest (for comparison)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.compoundInterest}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Extra from Compounding</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.difference}</span>
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

            <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
            </a>

            <a href="/apr-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">APR Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the simple interest formula?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Simple Interest = Principal × Rate × Time (in years). For example: $10,000 × 8% × 5 years = $4,000 in interest. Total amount = $14,000. Simple interest is used in short-term loans, car loans and some savings accounts.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Simple interest vs compound interest — what is the difference?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest. $10,000 at 8% for 10 years: simple interest = $8,000 total interest; compound interest = $11,589. The gap grows enormously over time.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When is simple interest used?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Simple interest is used for most auto loans, some personal loans, US Treasury bills and short-term loans. Mortgages, savings accounts, credit cards and most long-term investments use compound interest. Knowing which applies affects how you calculate true cost or return.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
