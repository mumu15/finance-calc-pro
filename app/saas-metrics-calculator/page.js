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
  const [mrr, setMrr] = useState(50000)
  const [customers, setCustomers] = useState(200)
  const [churnRate, setChurnRate] = useState(2)
  const [cac, setCac] = useState(500)
  const [grossMargin, setGrossMargin] = useState(75)
  const [mrrGrowthRate, setMrrGrowthRate] = useState(5)

  const result = useMemo(() => {
    try {
      const arr           = mrr * 12
      const arpu          = mrr / customers
      const ltv           = (arpu * (grossMargin / 100)) / (churnRate / 100)
      const ltvCacRatio   = (ltv / cac).toFixed(1) + 'x'
      const paybackMonths = (cac / (arpu * grossMargin / 100)).toFixed(1) + ' months'
      const churnedMRR    = mrr * (churnRate / 100)
      const newMRRNeeded  = churnedMRR.toFixed(0)
      const rule40        = mrrGrowthRate * 12 + (mrr > 0 ? (mrr * grossMargin / 100 - mrr * churnRate / 100) / mrr * 100 : 0)
      const rule40status  = rule40 >= 40 ? 'Pass (healthy)' : 'Below 40 (needs work)'
      const projMRR12     = mrr * Math.pow(1 + mrrGrowthRate/100, 12)
      return { arr, arpu, ltv, ltvCacRatio, paybackMonths, churnedMRR, rule40status, projMRR12 }
    } catch(e) { return null }
  }, [mrr, customers, churnRate, cac, grossMargin, mrrGrowthRate])

  const pdfRows = result ? [
    { label: "Annual Recurring Revenue (ARR)", value: result.arr !== undefined ? String(fmt(result.arr)) : "" },
    { label: "Average Revenue Per User (ARPU)", value: result.arpu !== undefined ? String(fmt(result.arpu)) : "" },
    { label: "Customer Lifetime Value (LTV)", value: result.ltv !== undefined ? String(fmt(result.ltv)) : "" },
    { label: "LTV to CAC Ratio", value: result.ltvCacRatio !== undefined ? String(result.ltvCacRatio) : "" },
    { label: "CAC Payback Period", value: result.paybackMonths !== undefined ? String(result.paybackMonths) : "" },
    { label: "Monthly Churned MRR", value: result.churnedMRR !== undefined ? String(fmt(result.churnedMRR)) : "" },
    { label: "Rule of 40 Status", value: result.rule40status !== undefined ? String(result.rule40status) : "" },
    { label: "Projected MRR in 12 Months", value: result.projMRR12 !== undefined ? String(fmt(result.projMRR12)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💻</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">SaaS Metrics Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate MRR, ARR, LTV, CAC ratio, churn impact and key SaaS health metrics.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Recurring Revenue (MRR)</label>
                  <span className="text-white font-bold text-sm">{fmt(mrr)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={1000}
                  value={mrr} onChange={e => setMrr(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Active Customers</label>
                  <span className="text-white font-bold text-sm">{`${customers} customers`}</span>
                </div>
                <input type="range" min={1} max={100000} step={10}
                  value={customers} onChange={e => setCustomers(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Churn Rate</label>
                  <span className="text-white font-bold text-sm">{`${churnRate}%`}</span>
                </div>
                <input type="range" min={0.1} max={20} step={0.1}
                  value={churnRate} onChange={e => setChurnRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Customer Acquisition Cost (CAC)</label>
                  <span className="text-white font-bold text-sm">{fmt(cac)}</span>
                </div>
                <input type="range" min={0} max={50000} step={50}
                  value={cac} onChange={e => setCac(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Gross Margin</label>
                  <span className="text-white font-bold text-sm">{`${grossMargin}%`}</span>
                </div>
                <input type="range" min={10} max={95} step={5}
                  value={grossMargin} onChange={e => setGrossMargin(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly MRR Growth Rate</label>
                  <span className="text-white font-bold text-sm">{`${mrrGrowthRate}%`}</span>
                </div>
                <input type="range" min={0} max={30} step={0.5}
                  value={mrrGrowthRate} onChange={e => setMrrGrowthRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="SaaS Metrics Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Recurring Revenue (ARR)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.arr)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Average Revenue Per User (ARPU)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.arpu)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Customer Lifetime Value (LTV)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.ltv)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">LTV to CAC Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.ltvCacRatio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">CAC Payback Period</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.paybackMonths}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Churned MRR</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.churnedMRR)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Rule of 40 Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.rule40status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected MRR in 12 Months</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.projMRR12)}
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

            <a href="/ecommerce-profit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛒</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Ecommerce Profit</h3>
            </a>

            <a href="/business-valuation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Valuation</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
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
              <h3 className="text-white font-semibold mb-2">What is a good LTV to CAC ratio for SaaS?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The benchmark LTV:CAC ratio for a healthy SaaS business is 3:1 or higher. A ratio of 1:1 means you spend as much to acquire a customer as they are worth — unsustainable. A ratio of 5:1 or higher suggests you may be underinvesting in growth. Most VCs look for 3x+ LTV:CAC before Series A. Improve the ratio by increasing LTV (reduce churn, expand revenue) or decreasing CAC (improve conversion rates, referral programs).</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the Rule of 40 for SaaS?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The Rule of 40 states that a healthy SaaS company growth rate plus profit margin should equal or exceed 40%. Example: 30% YoY growth + 15% profit margin = 45% (passes). A high-growth startup at 80% growth + negative 40% margin = 40% (passes). Below 40 signals the company is neither growing fast enough nor profitable enough. It is a key metric for investors evaluating SaaS businesses.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What monthly churn rate is acceptable for SaaS?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Monthly churn benchmarks: excellent under 0.5%, good 0.5-1%, acceptable 1-2%, concerning 2-5%, problematic above 5%. Annual equivalents: 1% monthly = 11.4% annual, 2% monthly = 21.5% annual. Even small improvements in churn compound significantly over time. A SaaS business losing 5% of customers monthly loses over half its base annually.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
