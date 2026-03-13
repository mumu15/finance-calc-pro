'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'


export const metadata = {
  title: 'Personal Loan Calculator — Free Online Personal Loan Calculator | FreeFinCalc',
  description: 'Free Personal Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/personal-loan-calculator' },
  openGraph: {
    title: 'Personal Loan Calculator — Free Online Personal Loan Calculator | FreeFinCalc',
    description: 'Free Personal Loan Calculator — calculate monthly payments, total interest, and payoff schedule. Instant results, no sign-up required.',
    url: 'https://freefincalc.net/personal-loan-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [loanAmount, setLoanAmount] = useState(15000)
  const [rate, setRate] = useState(11)
  const [termMonths, setTermMonths] = useState(36)
  const [originFee, setOriginFee] = useState(300)

  const result = useMemo(() => {
    try {
      const r         = rate / 100 / 12
      const n         = termMonths
      const monthly   = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n + originFee
      const totalInterest = monthly * n - loanAmount
      const trueAPR   = (() => {
        // Newton method to find APR including fee
        const netAmount = loanAmount - originFee
        let apr = rate / 100 / 12
        for (let i = 0; i < 100; i++) {
          const pv = monthly * (1 - Math.pow(1+apr,-n)) / apr
          const dpv = monthly * (Math.pow(1+apr,-n)*n/apr - (1-Math.pow(1+apr,-n))/(apr*apr))
          apr -= (pv - netAmount) / dpv
        }
        return (apr * 12 * 100).toFixed(2) + '%'
      })()
      return { monthly, totalInterest, totalPaid, trueAPR }
    } catch(e) { return null }
  }, [loanAmount, rate, termMonths, originFee])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest Cost", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Loan Cost", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "True APR (with fees)", value: result.trueAPR !== undefined ? String(result.trueAPR) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👤</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Personal Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly payments, total interest and amortization for any personal loan.</p>
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
                <input type="range" min={500} max={200000} step={500}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="range" min={1} max={36} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"12 mo"},{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":84,"l":"84 mo"}]).map(o => (
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
                <input type="range" min={0} max={5000} step={50}
                  value={originFee} onChange={e => setOriginFee(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Personal Loan Calculator" rows={pdfRows} />}
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
                    <span className="text-slate-400 text-sm">True APR (with fees)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.trueAPR}
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

            <a href="/loan-comparison-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Comparison</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Consolidation</h3>
            </a>

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Card Payoff</h3>
            </a>

            <a href="/apr-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">APR Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good personal loan rate in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Personal loan rates in 2026 range from about 7-8% for excellent credit (760+) to 30-36% for poor credit. The average across all borrowers is around 12-15%. Credit unions typically offer 2-3% lower rates than banks. To get the best rate: improve your credit score above 720, reduce existing debt, and compare at least 3-5 lenders before accepting an offer.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Personal loan vs credit card for debt consolidation?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Personal loans typically have lower rates (8-20%) than credit cards (18-29%) and a fixed payoff date, making them better for consolidation. Credit cards with 0% balance transfer offers (12-21 months) can be cheaper for smaller balances you can pay off within the promo period. Personal loans win for larger balances or when you need more time.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does a personal loan affect my credit score?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Short-term impact: the hard inquiry drops your score 5-10 points. Opening a new account reduces average account age, also slightly negative. Long-term impact: making on-time payments builds positive history and can improve your score significantly over 12-24 months. Paying off credit card debt with a personal loan also improves your credit utilization ratio.</p>
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
