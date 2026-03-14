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
  const [balance1, setBalance1] = useState(2000)
  const [limit1, setLimit1] = useState(8000)
  const [balance2, setBalance2] = useState(500)
  const [limit2, setLimit2] = useState(5000)
  const [balance3, setBalance3] = useState(0)
  const [limit3, setLimit3] = useState(3000)

  const result = useMemo(() => {
    try {
      const totalBal   = balance1 + balance2 + balance3
      const totalLimit = limit1 + limit2 + limit3
      const overallUtil = totalLimit > 0 ? (totalBal / totalLimit * 100).toFixed(1) + '%' : '0%'
      const util1 = limit1 > 0 ? (balance1 / limit1 * 100).toFixed(1) + '%' : 'N/A'
      const util2 = limit2 > 0 ? (balance2 / limit2 * 100).toFixed(1) + '%' : 'N/A'
      const util3 = limit3 > 0 ? (balance3 / limit3 * 100).toFixed(1) + '%' : 'N/A'
      const utilPct = parseFloat(overallUtil)
      const scoreImpact = utilPct <= 10 ? 'Excellent (under 10%)' : utilPct <= 30 ? 'Good (under 30%)' : utilPct <= 50 ? 'Fair (30-50%)' : 'Poor (above 50%)'
      const targetBalance = totalLimit * 0.10
      const paydownNeeded = Math.max(0, totalBal - targetBalance)
      return { totalBal, totalLimit, overallUtil, util1, util2, util3, scoreImpact, paydownNeeded }
    } catch(e) { return null }
  }, [balance1, limit1, balance2, limit2, balance3, limit3])

  const pdfRows = result ? [
    { label: "Total Balances", value: result.totalBal !== undefined ? String(fmt(result.totalBal)) : "" },
    { label: "Total Credit Limits", value: result.totalLimit !== undefined ? String(fmt(result.totalLimit)) : "" },
    { label: "Overall Utilization", value: result.overallUtil !== undefined ? String(result.overallUtil) : "" },
    { label: "Card 1 Utilization", value: result.util1 !== undefined ? String(result.util1) : "" },
    { label: "Card 2 Utilization", value: result.util2 !== undefined ? String(result.util2) : "" },
    { label: "Card 3 Utilization", value: result.util3 !== undefined ? String(result.util3) : "" },
    { label: "Credit Score Impact", value: result.scoreImpact !== undefined ? String(result.scoreImpact) : "" },
    { label: "Pay Down to Reach 10%", value: result.paydownNeeded !== undefined ? String(fmt(result.paydownNeeded)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Credit Utilization Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your credit utilization ratio and see how it impacts your credit score.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Card 1 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance1)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={50000} step={50}
                  value={balance1} onChange={e => setBalance1(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Card 1 Credit Limit</label>
                  <span className="text-white font-bold text-sm">{fmt(limit1)}</span>
                </div>
                <input type="text" inputMode="decimal" min={100} max={100000} step={100}
                  value={limit1} onChange={e => setLimit1(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Card 2 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance2)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={50000} step={50}
                  value={balance2} onChange={e => setBalance2(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Card 2 Credit Limit</label>
                  <span className="text-white font-bold text-sm">{fmt(limit2)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={100000} step={100}
                  value={limit2} onChange={e => setLimit2(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Card 3 Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance3)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={50000} step={50}
                  value={balance3} onChange={e => setBalance3(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Card 3 Credit Limit</label>
                  <span className="text-white font-bold text-sm">{fmt(limit3)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={100000} step={100}
                  value={limit3} onChange={e => setLimit3(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Credit Utilization Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Balances</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalBal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Credit Limits</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalLimit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Overall Utilization</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.overallUtil}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Card 1 Utilization</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.util1}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Card 2 Utilization</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.util2}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Card 3 Utilization</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.util3}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Credit Score Impact</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.scoreImpact}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Pay Down to Reach 10%</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.paydownNeeded)}
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

            <a href="/credit-card-minimum-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Min Payment</h3>
            </a>

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Card Payoff</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good credit utilization ratio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Under 30% is the widely cited guideline, but under 10% is ideal for maximum credit score benefit. Credit utilization accounts for about 30% of your FICO score — the second most important factor after payment history. At 0% utilization (no balances reported) some scoring models may actually score slightly lower than at 1-5% utilization.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How quickly does paying down balances improve credit score?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Credit card balances are typically reported to credit bureaus once per month on your statement closing date. Once your lower balance is reported, your score can improve within 30-45 days. Paying down high utilization cards is one of the fastest ways to improve your score — some people see 20-50 point improvements within one to two billing cycles.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does requesting a credit limit increase help utilization?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes — a higher limit with the same balance lowers utilization immediately. Example: $2,000 balance on $5,000 limit = 40% utilization. After a $10,000 limit increase: $2,000 / $15,000 = 13% utilization. However requesting a limit increase may trigger a hard inquiry (-5 points temporarily). The net effect is usually positive if you do not increase spending.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Credit Utilization Calculator","item":"https://www.freefincalc.net/credit-utilization-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Credit Utilization Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
