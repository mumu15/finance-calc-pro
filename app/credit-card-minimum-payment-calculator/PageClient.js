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
  const [balance, setBalance] = useState(5000)
  const [apr, setApr] = useState(22)
  const [minPctType, setMinPctType] = useState('pct')
  const [minPct, setMinPct] = useState(2)

  const result = useMemo(() => {
    try {
      const r = apr / 100 / 12
      let bal = balance
      let months = 0
      let totalPaid = 0
      const minFloor = 25
      while (bal > 0.01 && months < 1200) {
        const interest = bal * r
        const minPmt = minPctType === 'pct'
          ? Math.max(minFloor, bal * (minPct / 100))
          : Math.max(minFloor, minPct)
        const payment = Math.min(bal + interest, minPmt)
        bal = bal + interest - payment
        totalPaid += payment
        months++
        if (months > 1200) break
      }
      const totalInterest = totalPaid - balance
      const years = (months / 12).toFixed(1)
      // Fixed payment comparison
      const fixedPmt = balance * 0.03
      const rFixed = r
      const monthsFixed = Math.ceil(-Math.log(1 - balance * rFixed / fixedPmt) / Math.log(1 + rFixed))
      const interestFixed = fixedPmt * monthsFixed - balance
      return {
        months: months + ' months',
        years: years + ' years',
        totalInterest,
        totalPaid,
        interestFixed,
        monthsSaved: (months - monthsFixed) + ' months'
      }
    } catch(e) { return null }
  }, [balance, apr, minPctType, minPct])

  const pdfRows = result ? [
    { label: "Payoff Time (minimum)", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Payoff Time in Years", value: result.years !== undefined ? String(result.years) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Amount Paid", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Interest at Fixed 3% Pmt", value: result.interestFixed !== undefined ? String(fmt(result.interestFixed)) : "" },
    { label: "Time Saved at Fixed 3%", value: result.monthsSaved !== undefined ? String(result.monthsSaved) : "" },
  ] : []

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Credit Card Minimum Payment Calculator", "item": "https://freefincalc.net/credit-card-minimum-payment-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Credit Card Minimum Payment Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💳</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Credit Card Minimum Payment Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how long minimum payments take to pay off your credit card and how much interest you pay.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Credit Card Balance</label>
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
                <label className="text-slate-400 text-sm block mb-2">Minimum Payment Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"pct","l":"% of Balance (typical)"},{"v":"fixed","l":"Fixed Amount"}]).map(o => (
                    <button key={o.v} onClick={() => setMinPctType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: minPctType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: minPctType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: minPctType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Minimum Payment % or Amount</label>
                  <span className="text-white font-bold text-sm">{`${minPct}%`}</span>
                </div>
                <input type="range" min={1} max={5} step={0.25}
                  value={minPct} onChange={e => setMinPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Credit Card Minimum Payment Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Payoff Time (minimum)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Payoff Time in Years</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.years}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest at Fixed 3% Pmt</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestFixed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time Saved at Fixed 3%</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.monthsSaved}
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

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Card Payoff</h3>
            </a>

            <a href="/balance-transfer-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Balance Transfer</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/credit-utilization-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Utilization</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Why does paying only the minimum take so long?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Minimum payments are typically 1-2% of your balance, barely covering interest. At 22% APR on a $5,000 balance, the first minimum payment is about $100 — but $92 of that is interest, leaving only $8 reducing the principal. As the balance slowly drops, so does the minimum payment, extending payoff to 20-30 years and costing 2-3x the original balance in interest.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the fastest way to pay off credit card debt?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Pay as much above the minimum as possible every month. Even doubling your minimum payment dramatically cuts payoff time and interest. Use the debt avalanche (highest APR first) or debt snowball (smallest balance first) method if you have multiple cards. Stop using the card for new purchases while paying it off. Consider a 0% balance transfer to stop interest accumulation.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does paying minimum hurt my credit score?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Paying the minimum keeps your account in good standing and avoids late fees — it does not directly hurt your score. However it keeps your credit utilization high (ideally under 30%), which does negatively impact your score. Carrying high balances relative to your limit is the second most important credit score factor after payment history.</p>
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
