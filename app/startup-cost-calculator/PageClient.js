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
  const [setupCosts, setSetupCosts] = useState(15000)
  const [monthlyFixed, setMonthlyFixed] = useState(8000)
  const [monthlyVariable, setMonthlyVariable] = useState(5000)
  const [targetRevenue, setTargetRevenue] = useState(20000)
  const [rampMonths, setRampMonths] = useState(6)
  const [cashBuffer, setCashBuffer] = useState(3)

  const result = useMemo(() => {
    try {
      const monthlyTotal   = monthlyFixed + monthlyVariable
      const breakEvenRev   = monthlyFixed / (1 - monthlyVariable / Math.max(targetRevenue, 1))
      // Ramp period burn
      let rampBurn = 0
      for (let m = 1; m <= rampMonths; m++) {
        const rev = targetRevenue * (m / rampMonths)
        const varCost = monthlyVariable * (m / rampMonths)
        rampBurn += Math.max(0, monthlyFixed + varCost - rev)
      }
      const bufferNeeded   = monthlyTotal * cashBuffer
      const totalFunding   = setupCosts + rampBurn + bufferNeeded
      const monthlyProfit  = targetRevenue - monthlyTotal
      const status         = monthlyProfit > 0 ? 'Profitable at target' : 'Not profitable at target'
      return { totalFunding, setupCosts, rampBurn, bufferNeeded, breakEvenRev, monthlyProfit, status }
    } catch(e) { return null }
  }, [setupCosts, monthlyFixed, monthlyVariable, targetRevenue, rampMonths, cashBuffer])

  const pdfRows = result ? [
    { label: "Total Funding Required", value: result.totalFunding !== undefined ? String(fmt(result.totalFunding)) : "" },
    { label: "One-Time Setup Costs", value: result.setupCosts !== undefined ? String(fmt(result.setupCosts)) : "" },
    { label: "Ramp Period Burn", value: result.rampBurn !== undefined ? String(fmt(result.rampBurn)) : "" },
    { label: "Cash Buffer Needed", value: result.bufferNeeded !== undefined ? String(fmt(result.bufferNeeded)) : "" },
    { label: "Break-Even Monthly Revenue", value: result.breakEvenRev !== undefined ? String(fmt(result.breakEvenRev)) : "" },
    { label: "Monthly Profit at Target", value: result.monthlyProfit !== undefined ? String(fmt(result.monthlyProfit)) : "" },
    { label: "Profitability Status", value: result.status !== undefined ? String(result.status) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Startup Cost Calculator", "item": "https://freefincalc.net/startup-cost-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Startup Cost Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Startup Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate total startup costs, funding needed and months to break even for a new business.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">One-Time Setup Costs (legal, equipment, etc)</label>
                  <span className="text-white font-bold text-sm">{fmt(setupCosts)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={setupCosts} onChange={e => setSetupCosts(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Fixed Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyFixed)}</span>
                </div>
                <input type="range" min={0} max={200000} step={250}
                  value={monthlyFixed} onChange={e => setMonthlyFixed(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Variable Costs (at target revenue)</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyVariable)}</span>
                </div>
                <input type="range" min={0} max={200000} step={250}
                  value={monthlyVariable} onChange={e => setMonthlyVariable(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Monthly Revenue</label>
                  <span className="text-white font-bold text-sm">{fmt(targetRevenue)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={targetRevenue} onChange={e => setTargetRevenue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Months to Reach Full Revenue</label>
                  <span className="text-white font-bold text-sm">{`${rampMonths} mo`}</span>
                </div>
                <input type="range" min={1} max={24} step={1}
                  value={rampMonths} onChange={e => setRampMonths(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cash Buffer (months of expenses)</label>
                  <span className="text-white font-bold text-sm">{`${cashBuffer} mo`}</span>
                </div>
                <input type="range" min={1} max={12} step={1}
                  value={cashBuffer} onChange={e => setCashBuffer(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Startup Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Funding Required</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalFunding)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">One-Time Setup Costs</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.setupCosts)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Ramp Period Burn</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.rampBurn)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cash Buffer Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.bufferNeeded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even Monthly Revenue</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.breakEvenRev)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Profit at Target</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Profitability Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.status}
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

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>

            <a href="/cash-flow-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cash Flow</h3>
            </a>

            <a href="/employee-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👔</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Employee Cost</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much does it cost to start a business?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Average startup costs by type: online business or service $500-$5,000. Brick and mortar retail $50,000-$250,000. Restaurant $175,000-$500,000. Franchise $100,000-$1,000,000+. SaaS or tech startup $20,000-$150,000. Home-based service $1,000-$20,000. The biggest variables are inventory, equipment, leasehold improvements, and payroll before revenue ramps up.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are the most common startup mistakes with money?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Top financial mistakes: underestimating time to profitability (plan for 2x your estimate), skipping the cash buffer (minimum 3-6 months of expenses), mixing personal and business finances, not tracking cash flow weekly in early stages, over-investing in fixed assets before validating the business model, and taking on equity investors before exploring loans or bootstrapping.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I get a business loan or investor funding for my startup?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Loans are better when: you have predictable revenue, the business model is proven, and you want to keep full ownership. Investor funding (equity) is better when: you need large capital for rapid growth, the business is pre-revenue, or you need strategic partnerships beyond just money. Equity is expensive long-term — you give up ownership and control permanently.</p>
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
