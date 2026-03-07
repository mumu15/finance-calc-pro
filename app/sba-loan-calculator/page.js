'use client'
export { metadata } from './metadata'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [loanAmount, setLoanAmount] = useState(250000)
  const [loanType, setLoanType] = useState('7a')
  const [termYears, setTermYears] = useState(10)
  const [baseRate, setBaseRate] = useState(8.5)

  const result = useMemo(() => {
    try {
      // SBA rate spreads above prime
      const spread    = loanType === '7a' ? (loanAmount < 25000 ? 4.25 : loanAmount < 50000 ? 3.25 : 2.25) : loanType === '504' ? 1.5 : 6.5
      const rate      = baseRate + spread
      const r         = rate / 100 / 12
      const n         = termYears * 12
      const monthly   = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - loanAmount
      // SBA guarantee fee approx (varies by amount and term)
      const guaranteeFee  = loanAmount > 150000 ? loanAmount * 0.03 : loanAmount * 0.02
      const totalCost     = totalPaid + guaranteeFee
      const effectiveRate = rate.toFixed(2) + '%'
      return { monthly, totalInterest, totalCost, guaranteeFee, effectiveRate, rate: rate.toFixed(2) + '%' }
    } catch(e) { return null }
  }, [loanAmount, loanType, termYears, baseRate])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "SBA Guarantee Fee", value: result.guaranteeFee !== undefined ? String(fmt(result.guaranteeFee)) : "" },
    { label: "Total Loan Cost", value: result.totalCost !== undefined ? String(fmt(result.totalCost)) : "" },
    { label: "Effective Interest Rate", value: result.effectiveRate !== undefined ? String(result.effectiveRate) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SBA Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate SBA 7(a) and 504 loan payments, fees and total cost for small business financing.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(loanAmount)}</span>
                </div>
                <input type="range" min={10000} max={5000000} step={10000}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">SBA Loan Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"7a","l":"SBA 7(a)"},{"v":"504","l":"SBA 504"},{"v":"micro","l":"SBA Microloan"}]).map(o => (
                    <button key={o.v} onClick={() => setLoanType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: loanType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: loanType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: loanType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":7,"l":"7 yrs"},{"v":10,"l":"10 yrs"},{"v":25,"l":"25 yrs (real estate)"}]).map(o => (
                    <button key={o.v} onClick={() => setTermYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: termYears === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: termYears === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: termYears === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Base Prime Rate</label>
                  <span className="text-white font-bold text-sm">{`${baseRate}%`}</span>
                </div>
                <input type="range" min={3} max={12} step={0.25}
                  value={baseRate} onChange={e => setBaseRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="SBA Loan Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">SBA Guarantee Fee</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.guaranteeFee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Loan Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Interest Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveRate}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or business advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/business-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Loan</h3>
            </a>

            <a href="/debt-service-coverage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Coverage</h3>
            </a>

            <a href="/working-capital-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Working Capital</h3>
            </a>

            <a href="/startup-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Startup Cost</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is an SBA 7(a) loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The SBA 7(a) is the most common small business loan, guaranteed up to 85% by the Small Business Administration. Maximum loan amount is $5 million. Rates are prime plus a spread (capped by SBA). Terms up to 10 years for working capital, 25 years for real estate. Requires strong personal credit (640+), 2+ years in business, and ability to repay from cash flow.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">SBA 7(a) vs SBA 504 loan: what is the difference?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">SBA 7(a) is general purpose — working capital, equipment, real estate, acquisitions. SBA 504 is specifically for major fixed assets (real estate, large equipment). 504 loans typically offer lower rates and longer terms (up to 25 years) for real estate. 504 requires a Certified Development Company (CDC) partner and at least 10% borrower equity contribution.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How long does SBA loan approval take?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">SBA Express loans (up to $500,000): 36-hour approval, 2-4 weeks to fund. Standard SBA 7(a): 30-90 days. SBA 504: 60-90 days. Working with an SBA Preferred Lender (PLP) speeds up approval significantly as they can approve in-house. Prepare 2 years of business and personal tax returns, financial statements, and a business plan to expedite the process.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
