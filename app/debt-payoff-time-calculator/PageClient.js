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
  const [balance, setBalance] = useState(15000)
  const [apr, setApr] = useState(18)
  const [monthlyPmt, setMonthlyPmt] = useState(350)

  const result = useMemo(() => {
    try {
      const r = apr / 100 / 12
      if (r > 0 && monthlyPmt <= balance * r) {
        return { months: 'Never (payment too low)', years: 'Increase payment', totalInterest: 0, totalPaid: 0, minRequired: Math.ceil(balance * r + 1) }
      }
      const months = r > 0
        ? Math.ceil(-Math.log(1 - balance * r / monthlyPmt) / Math.log(1 + r))
        : Math.ceil(balance / monthlyPmt)
      const totalPaid = monthlyPmt * months
      const totalInterest = totalPaid - balance
      const years = (months / 12).toFixed(1)
      const minRequired = Math.ceil(balance * r + 1)
      return { months: months + ' months', years: years + ' years', totalInterest, totalPaid, minRequired }
    } catch(e) { return null }
  }, [balance, apr, monthlyPmt])

  const pdfRows = result ? [
    { label: "Time to Pay Off", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Time in Years", value: result.years !== undefined ? String(result.years) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Amount Paid", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Minimum Payment Required", value: result.minRequired !== undefined ? String(fmt(result.minRequired)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⏱️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Payoff Time Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate exactly how long it will take to pay off any debt at your current payment level.</p>
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
                <input type="number" step="any" min={100} max={500000} step={100}
                  value={balance} onChange={e => setBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate (APR)</label>
                  <span className="text-white font-bold text-sm">{`${apr}%`}</span>
                </div>
                <input type="number" step="any" min={0} max={36} step={0.25}
                  value={apr} onChange={e => setApr(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyPmt)}</span>
                </div>
                <input type="number" step="any" min={10} max={20000} step={10}
                  value={monthlyPmt} onChange={e => setMonthlyPmt(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Debt Payoff Time Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Pay Off</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time in Years</span>
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
                    <span className="text-slate-400 text-sm">Minimum Payment Required</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.minRequired)}
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

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Card Payoff</h3>
            </a>

            <a href="/debt-avalanche-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏔️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Avalanche</h3>
            </a>

            <a href="/debt-snowball-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">❄️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Snowball</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What happens if my payment is too low to pay off the debt?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">If your monthly payment is less than or equal to the monthly interest charge, your balance never decreases — it actually grows. At 18% APR on $15,000, monthly interest is $225. If you pay only $200/month, you fall $25 further behind every month. You must pay more than the interest charge to make progress. Contact your lender about hardship programs if this is your situation.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How can I calculate the minimum payment needed?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Minimum payment to avoid growing balance = Balance x (APR / 12). On $15,000 at 18% APR: $15,000 x 0.015 = $225/month minimum just to break even. To actually pay it off in a reasonable time, you need to pay significantly above this. Use this calculator to find exactly when different payment amounts will free you from the debt.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the psychological impact of a payoff date?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Having a specific payoff date dramatically increases debt repayment success. Research shows people with concrete goals and timelines are 2-3x more likely to complete debt payoff than those with vague intentions. Set a calendar reminder for your payoff date, automate your payments so the decision is removed from your monthly routine, and track the countdown to stay motivated.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Debt Payoff Time Calculator","item":"https://www.freefincalc.net/debt-payoff-time-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Debt Payoff Time Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
