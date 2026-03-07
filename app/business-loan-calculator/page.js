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
  const [loanAmount, setLoanAmount] = useState(100000)
  const [rate, setRate] = useState(9)
  const [termMonths, setTermMonths] = useState(60)
  const [originFee, setOriginFee] = useState(2000)
  const [annualRevenue, setAnnualRevenue] = useState(500000)

  const result = useMemo(() => {
    try {
      const r           = rate / 100 / 12
      const n           = termMonths
      const monthly     = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid   = monthly * n + originFee
      const totalInterest = monthly * n - loanAmount
      const debtToRev   = (loanAmount / annualRevenue * 100).toFixed(1) + '%'
      const monthlyRevCoverage = annualRevenue > 0
        ? (annualRevenue / 12 / monthly).toFixed(1) + 'x'
        : 'N/A'
      return { monthly, totalInterest, totalPaid, debtToRev, monthlyRevCoverage }
    } catch(e) { return null }
  }, [loanAmount, rate, termMonths, originFee, annualRevenue])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest Cost", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Loan Cost", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Loan to Annual Revenue", value: result.debtToRev !== undefined ? String(result.debtToRev) : "" },
    { label: "Revenue Coverage Ratio", value: result.monthlyRevCoverage !== undefined ? String(result.monthlyRevCoverage) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly payments, total interest and true cost for any business loan.</p>
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
                <input type="range" min={5000} max={5000000} step={5000}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="range" min={1} max={40} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"12 mo"},{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":60,"l":"60 mo"},{"v":84,"l":"84 mo"},{"v":120,"l":"120 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setTermMonths(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: termMonths === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: termMonths === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: termMonths === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Origination Fee</label>
                  <span className="text-white font-bold text-sm">{fmt(originFee)}</span>
                </div>
                <input type="range" min={0} max={20000} step={100}
                  value={originFee} onChange={e => setOriginFee(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Business Revenue</label>
                  <span className="text-white font-bold text-sm">{fmt(annualRevenue)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={10000}
                  value={annualRevenue} onChange={e => setAnnualRevenue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Business Loan Calculator" rows={pdfRows} />}
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
                    <span className="text-slate-400 text-sm">Total Interest Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Loan Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan to Annual Revenue</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.debtToRev}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Revenue Coverage Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.monthlyRevCoverage}
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

            <a href="/sba-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SBA Loan</h3>
            </a>

            <a href="/debt-service-coverage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Coverage</h3>
            </a>

            <a href="/working-capital-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Working Capital</h3>
            </a>

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What credit score do I need for a business loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Requirements vary by lender and loan type: SBA loans typically require 640-680+ personal credit score. Traditional bank loans 680-720+. Online lenders 550-600+. Some revenue-based lenders focus more on cash flow than credit score. A strong business revenue history (2+ years) and healthy cash flow often matter as much as the score itself.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What types of business loans are available?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Main business loan types: Term loans (lump sum, fixed payments), SBA loans (government-backed, best rates), Business lines of credit (revolving, flexible), Equipment financing (collateral is the equipment), Invoice factoring (advance on receivables), Merchant cash advance (high cost, avoid if possible), and Commercial real estate loans.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does a business loan affect my personal credit?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most small business loans require a personal guarantee, meaning your personal credit is on the line. Hard inquiries appear on your personal report. Missed payments are reported personally. Building business credit (Dun and Bradstreet, PAYDEX score) over time allows you to qualify for business-only credit without personal guarantees.</p>
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
