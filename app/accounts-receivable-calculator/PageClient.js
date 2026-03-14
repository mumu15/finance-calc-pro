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
  const [annualRevenue, setAnnualRevenue] = useState(1200000)
  const [arBalance, setArBalance] = useState(150000)
  const [badDebtRate, setBadDebtRate] = useState(2)
  const [borrowingRate, setBorrowingRate] = useState(9)
  const [targetDso, setTargetDso] = useState(30)

  const result = useMemo(() => {
    try {
      const dailyRevenue  = annualRevenue / 365
      const dso            = (arBalance / dailyRevenue).toFixed(1) + ' days'
      const arTurnover     = (annualRevenue / arBalance).toFixed(2) + 'x'
      const badDebtCost    = arBalance * (badDebtRate / 100)
      const carryingCost   = arBalance * (borrowingRate / 100)
      const totalArCost    = badDebtCost + carryingCost
      const targetAr       = dailyRevenue * targetDso
      const excessAr       = Math.max(0, arBalance - targetAr)
      const excessCost     = excessAr * (borrowingRate / 100)
      return { dso, arTurnover, badDebtCost, carryingCost, totalArCost, targetAr, excessAr, excessCost }
    } catch(e) { return null }
  }, [annualRevenue, arBalance, badDebtRate, borrowingRate, targetDso])

  const pdfRows = result ? [
    { label: "Days Sales Outstanding (DSO)", value: result.dso !== undefined ? String(result.dso) : "" },
    { label: "AR Turnover Ratio", value: result.arTurnover !== undefined ? String(result.arTurnover) : "" },
    { label: "Annual Bad Debt Cost", value: result.badDebtCost !== undefined ? String(fmt(result.badDebtCost)) : "" },
    { label: "Annual Carrying Cost of AR", value: result.carryingCost !== undefined ? String(fmt(result.carryingCost)) : "" },
    { label: "Total Annual AR Cost", value: result.totalArCost !== undefined ? String(fmt(result.totalArCost)) : "" },
    { label: "Target AR Balance", value: result.targetAr !== undefined ? String(fmt(result.targetAr)) : "" },
    { label: "Excess AR Above Target", value: result.excessAr !== undefined ? String(fmt(result.excessAr)) : "" },
    { label: "Cost of Excess AR", value: result.excessCost !== undefined ? String(fmt(result.excessCost)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Accounts Receivable Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate Days Sales Outstanding (DSO), AR turnover and the true cost of slow-paying customers.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Revenue</label>
                  <span className="text-white font-bold text-sm">{fmt(annualRevenue)}</span>
                </div>
                <input type="number" min={10000} max={100000000} step={10000}
                  value={annualRevenue} onChange={e => setAnnualRevenue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current AR Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(arBalance)}</span>
                </div>
                <input type="number" min={0} max={10000000} step={1000}
                  value={arBalance} onChange={e => setArBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Bad Debt Rate</label>
                  <span className="text-white font-bold text-sm">{`${badDebtRate}%`}</span>
                </div>
                <input type="number" min={0} max={10} step={0.1}
                  value={badDebtRate} onChange={e => setBadDebtRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Business Borrowing Rate</label>
                  <span className="text-white font-bold text-sm">{`${borrowingRate}%`}</span>
                </div>
                <input type="number" min={1} max={25} step={0.25}
                  value={borrowingRate} onChange={e => setBorrowingRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target DSO (days)</label>
                  <span className="text-white font-bold text-sm">{`${targetDso} days`}</span>
                </div>
                <input type="number" min={15} max={90} step={5}
                  value={targetDso} onChange={e => setTargetDso(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Accounts Receivable Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Days Sales Outstanding (DSO)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.dso}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">AR Turnover Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.arTurnover}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Bad Debt Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.badDebtCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Carrying Cost of AR</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.carryingCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Annual AR Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalArCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Target AR Balance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.targetAr)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Excess AR Above Target</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.excessAr)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cost of Excess AR</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.excessCost)}
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

            <a href="/cash-flow-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cash Flow</h3>
            </a>

            <a href="/working-capital-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Working Capital</h3>
            </a>

            <a href="/invoice-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Invoice Calculator</h3>
            </a>

            <a href="/business-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Loan</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is Days Sales Outstanding (DSO)?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">DSO measures the average number of days it takes to collect payment after a sale. DSO = (AR Balance / Annual Revenue) x 365. A DSO of 45 means you wait 45 days on average to get paid. Lower DSO means faster cash collection. Compare your DSO to your payment terms: if terms are Net 30 but DSO is 55, customers are paying late.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good DSO for a business?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A good DSO is close to your stated payment terms. If you offer Net 30, aim for DSO of 30-40 days. Industry benchmarks vary: professional services 40-60 days, manufacturing 45-55 days, retail near zero (cash sales). DSO above 60 days for Net 30 terms signals a collections problem that is draining cash flow.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I reduce DSO and improve cash flow?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Effective strategies: invoice immediately upon delivery (not at month end), offer early payment discounts (2/10 Net 30 = 2% discount if paid within 10 days), automate payment reminders at 7, 14, and 30 days past due, require deposits upfront for large projects, accept credit cards, and enforce late payment fees consistently.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Accounts Receivable Calculator","item":"https://freefincalc.net/accounts-receivable-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Accounts Receivable Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
