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
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [finalValue, setFinalValue] = useState(15000)
  const [holdingYears, setHoldingYears] = useState(3)
  const [additionalCosts, setAdditionalCosts] = useState(200)

  const result = useMemo(() => {
    try {
      const netReturn       = finalValue - initialInvestment - additionalCosts
      const roi             = (netReturn / initialInvestment * 100).toFixed(2) + '%'
      const annualisedROI   = ((Math.pow(finalValue / (initialInvestment + additionalCosts), 1/holdingYears) - 1) * 100).toFixed(2) + '%'
      const totalReturn     = ((finalValue / (initialInvestment + additionalCosts) - 1) * 100).toFixed(2) + '%'
      const ruleOf72Years   = (72 / parseFloat(annualisedROI)).toFixed(1) + ' yrs to double'
      return { netReturn, roi, annualisedROI, totalReturn, ruleOf72Years }
    } catch(e) { return null }
  }, [initialInvestment, finalValue, holdingYears, additionalCosts])

  const pdfRows = result ? [
    { label: "Net Return (profit/loss)", value: result.netReturn !== undefined ? String(fmt(result.netReturn)) : "" },
    { label: "ROI %", value: result.roi !== undefined ? String(result.roi) : "" },
    { label: "Annualised ROI", value: result.annualisedROI !== undefined ? String(result.annualisedROI) : "" },
    { label: "Total Return %", value: result.totalReturn !== undefined ? String(result.totalReturn) : "" },
    { label: "Time to Double at This Rate", value: result.ruleOf72Years !== undefined ? String(result.ruleOf72Years) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💎</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">ROI Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate Return on Investment (ROI) and annualised return for any investment or project.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Initial Investment</label>
                  <span className="text-white font-bold text-sm">{fmt(initialInvestment)}</span>
                </div>
                <input type="number" step="any" min={1} max={10000000} step={100}
                  value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Final Value / Return</label>
                  <span className="text-white font-bold text-sm">{fmt(finalValue)}</span>
                </div>
                <input type="number" step="any" min={1} max={20000000} step={100}
                  value={finalValue} onChange={e => setFinalValue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Holding Period</label>
                  <span className="text-white font-bold text-sm">{`${holdingYears} yrs`}</span>
                </div>
                <input type="number" step="any" min={0.25} max={30} step={0.25}
                  value={holdingYears} onChange={e => setHoldingYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Fees & Additional Costs</label>
                  <span className="text-white font-bold text-sm">{fmt(additionalCosts)}</span>
                </div>
                <input type="number" step="any" min={0} max={500000} step={50}
                  value={additionalCosts} onChange={e => setAdditionalCosts(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="ROI Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Return (profit/loss)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.netReturn)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">ROI %</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.roi}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annualised ROI</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.annualisedROI}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Return %</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.totalReturn}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Double at This Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.ruleOf72Years}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or tax advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>

            <a href="/stock-profit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Stock Profit</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How is ROI calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">ROI = (Net Return ÷ Cost of Investment) × 100. Net Return = Final Value − Initial Investment − Additional Costs. A $10,000 investment that grows to $15,000 with $200 in fees: ROI = ($4,800 ÷ $10,000) × 100 = 48%. Annualised ROI accounts for how long the money was invested.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a good ROI?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Context determines good ROI. Stock market: 7-10% annualised is excellent. Real estate: 8-12% annualised is good. Business investment: 15-30%+ is typical target. Marketing campaigns: 300-500% ROI is benchmark for paid ads. Always compare ROI to the opportunity cost — what you could have earned elsewhere with the same money.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between ROI and IRR?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">ROI is a simple percentage return on an investment. IRR (Internal Rate of Return) is the annualised compound rate that makes the net present value of all cash flows equal zero. IRR is more sophisticated and handles multiple cash flows over time. For simple one-time investments they are similar; for complex multi-year projects use IRR.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Roi Calculator","item":"https://www.freefincalc.net/roi-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Roi Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
