'use client'
export { metadata } from './metadata'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "What is an amortization schedule?",
    "a": "An amortization schedule is a table showing each loan payment broken down into principal and interest. Early payments are mostly interest; later payments are mostly principal. Seeing this schedule helps you understand how your debt decreases over time."
  },
  {
    "q": "How does extra payment affect amortization?",
    "a": "Making extra payments toward principal reduces the loan balance faster, saving significant interest. On a $250,000 30-year mortgage at 6.5%, paying $100 extra per month saves over $30,000 in interest and cuts the loan by 4 years."
  },
  {
    "q": "What is a fully amortizing loan?",
    "a": "A fully amortizing loan is one where equal regular payments pay off the entire balance (principal + interest) by the end of the term. Most mortgages, car loans and personal loans are fully amortizing. The opposite is a bullet or balloon loan."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [loanAmount, setLoanAmount] = useState(250000)
  const [rate, setRate] = useState(6.5)
  const [termYears, setTermYears] = useState(30)

  const result = useMemo(() => {
    try {
      const r = rate / 100 / 12
      const n = termYears * 12
      const monthly = r === 0 ? loanAmount/n : loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - loanAmount
      const year1Interest = (() => { let b=loanAmount,int=0; for(let i=0;i<12;i++){const ip=b*r;int+=ip;b-=(monthly-ip);} return int })()
      return { monthly, totalInterest, totalPaid, year1Interest }
    } catch(e) { return null }
  }, [loanAmount, rate, termYears])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? (fmt(result.monthly)) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? (fmt(result.totalInterest)) : "" },
    { label: "Total Amount Paid", value: result.totalPaid !== undefined ? (fmt(result.totalPaid)) : "" },
    { label: "Year 1 Interest", value: result.year1Interest !== undefined ? (fmt(result.year1Interest)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Amortization Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See your full loan amortization schedule — principal, interest and balance for every payment.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(loanAmount)}</span>
                </div>
                <input type="range" min={5000} max={1000000} step={1000}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{rate + "%"}</span>
                </div>
                <input type="range" min={0.5} max={20} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":5,"l":"5 yrs"},{"v":10,"l":"10 yrs"},{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"},{"v":30,"l":"30 yrs"}].map(o => (
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
                {result && <PdfDownload title="Amortization Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.monthly)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalInterest)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Paid</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalPaid)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Year 1 Interest</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.year1Interest)}</span>
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

            <a href="/refinance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Refinance Calculator</h3>
            </a>

            <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
            </a>

            <a href="/down-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Down Payment</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is an amortization schedule?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">An amortization schedule is a table showing each loan payment broken down into principal and interest. Early payments are mostly interest; later payments are mostly principal. Seeing this schedule helps you understand how your debt decreases over time.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How does extra payment affect amortization?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Making extra payments toward principal reduces the loan balance faster, saving significant interest. On a $250,000 30-year mortgage at 6.5%, paying $100 extra per month saves over $30,000 in interest and cuts the loan by 4 years.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a fully amortizing loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A fully amortizing loan is one where equal regular payments pay off the entire balance (principal + interest) by the end of the term. Most mortgages, car loans and personal loans are fully amortizing. The opposite is a bullet or balloon loan.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
