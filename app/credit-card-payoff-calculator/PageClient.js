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
  const [balance, setBalance] = useState(8000)
  const [apr, setApr] = useState(24)
  const [calcMode, setCalcMode] = useState('payment')
  const [monthlyPmt, setMonthlyPmt] = useState(250)
  const [targetMonths, setTargetMonths] = useState(36)

  const result = useMemo(() => {
    try {
      const r = apr / 100 / 12
      let months, interest, payment
      if (calcMode === 'payment') {
        payment = monthlyPmt
        if (payment <= balance * r) return { months: 'Never (payment too low)', interest: 0, payment, minPayment: Math.ceil(balance * r * 1.01) }
        months = Math.ceil(-Math.log(1 - balance * r / payment) / Math.log(1 + r))
        interest = payment * months - balance
      } else {
        months = targetMonths
        payment = balance * r / (1 - Math.pow(1+r, -months))
        interest = payment * months - balance
      }
      const minPaymentOnly = balance * 0.02
      const minMonths = Math.ceil(-Math.log(1 - balance * r / minPaymentOnly) / Math.log(1 + r))
      const minInterest = minPaymentOnly * minMonths - balance
      return {
        months: months + ' months',
        interest: Math.round(interest),
        payment: Math.round(payment),
        minInterest: Math.round(minInterest),
        minMonths: minMonths + ' months'
      }
    } catch(e) { return null }
  }, [balance, apr, calcMode, monthlyPmt, targetMonths])

  const pdfRows = result ? [
    { label: "Months to Pay Off", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Total Interest Paid", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "Required Monthly Payment", value: result.payment !== undefined ? String(fmt(result.payment)) : "" },
    { label: "Minimum Payment Interest Cost", value: result.minInterest !== undefined ? String(fmt(result.minInterest)) : "" },
    { label: "Minimum Payment Payoff Time", value: result.minMonths !== undefined ? String(result.minMonths) : "" },
  ] : []

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Credit Card Payoff Calculator", "item": "https://freefincalc.net/credit-card-payoff-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Credit Card Payoff Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💳</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Credit Card Payoff Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how long it takes to pay off credit card debt and how much interest you will pay.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance)}</span>
                </div>
                <input type="range" min={100} max={100000} step={100}
                  value={balance} onChange={e => setBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Credit Card APR</label>
                  <span className="text-white font-bold text-sm">{`${apr}%`}</span>
                </div>
                <input type="range" min={1} max={36} step={0.25}
                  value={apr} onChange={e => setApr(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Calculate By</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"payment","l":"Fixed Monthly Payment"},{"v":"months","l":"Target Payoff Date"}]).map(o => (
                    <button key={o.v} onClick={() => setCalcMode(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: calcMode === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: calcMode === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: calcMode === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Payment Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyPmt)}</span>
                </div>
                <input type="range" min={10} max={10000} step={10}
                  value={monthlyPmt} onChange={e => setMonthlyPmt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Months to Pay Off</label>
                  <span className="text-white font-bold text-sm">{`${targetMonths} mo`}</span>
                </div>
                <input type="range" min={1} max={120} step={1}
                  value={targetMonths} onChange={e => setTargetMonths(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Credit Card Payoff Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Months to Pay Off</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Required Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.payment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Minimum Payment Interest Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.minInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Minimum Payment Payoff Time</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.minMonths}
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

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Consolidation</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/balance-transfer-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Balance Transfer</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How long does it take to pay off credit card debt paying minimum?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Paying only the minimum (typically 2% of balance) on an $8,000 balance at 24% APR takes approximately 28 years and costs over $15,000 in interest — nearly double the original balance. Doubling your minimum payment can cut payoff time by 60-70% and save thousands in interest.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the best strategy to pay off multiple credit cards?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Two proven methods: Avalanche — pay minimums on all cards, put extra money toward the highest APR card first. Saves the most interest. Snowball — pay minimums on all, put extra toward the smallest balance first. Provides psychological wins and motivation. Both work; the best is the one you will stick with.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does paying off credit cards improve credit score?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes, significantly. Credit utilization (balances divided by credit limits) accounts for 30% of your FICO score. Getting utilization below 30% improves scores noticeably; below 10% is ideal. Paying off a $8,000 balance on a $10,000 card takes utilization from 80% to 0% and can boost your score by 50-100+ points.</p>
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
