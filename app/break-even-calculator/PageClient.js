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
  const [fixedCosts, setFixedCosts] = useState(20000)
  const [pricePerUnit, setPricePerUnit] = useState(50)
  const [varCostUnit, setVarCostUnit] = useState(30)
  const [targetProfit, setTargetProfit] = useState(5000)

  const result = useMemo(() => {
    try {
      const contribution  = pricePerUnit - varCostUnit
      if (contribution <= 0) return null
      const breakEvenUnits   = Math.ceil(fixedCosts / contribution)
      const breakEvenRevenue = breakEvenUnits * pricePerUnit
      const unitsForProfit   = Math.ceil((fixedCosts + targetProfit) / contribution)
      const revenueForProfit = unitsForProfit * pricePerUnit
      const marginOfSafety   = ((revenueForProfit - breakEvenRevenue) / revenueForProfit * 100).toFixed(1) + '%'
      return { contribution, breakEvenUnits, breakEvenRevenue, unitsForProfit, revenueForProfit, marginOfSafety }
    } catch(e) { return null }
  }, [fixedCosts, pricePerUnit, varCostUnit, targetProfit])

  const pdfRows = result ? [
    { label: "Contribution Margin Per Unit", value: result.contribution !== undefined ? String(fmt(result.contribution)) : "" },
    { label: "Break-Even Units", value: result.breakEvenUnits !== undefined ? String(result.breakEvenUnits) : "" },
    { label: "Break-Even Revenue", value: result.breakEvenRevenue !== undefined ? String(fmt(result.breakEvenRevenue)) : "" },
    { label: "Units Needed for Target Profit", value: result.unitsForProfit !== undefined ? String(result.unitsForProfit) : "" },
    { label: "Revenue for Target Profit", value: result.revenueForProfit !== undefined ? String(fmt(result.revenueForProfit)) : "" },
    { label: "Margin of Safety", value: result.marginOfSafety !== undefined ? String(result.marginOfSafety) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚖️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Break-Even Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find the sales volume needed to cover all costs and start making profit.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Fixed Costs (monthly)</label>
                  <span className="text-white font-bold text-sm">{fmt(fixedCosts)}</span>
                </div>
                <input type="range" min={100} max={1000000} step={100}
                  value={fixedCosts} onChange={e => setFixedCosts(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Selling Price Per Unit</label>
                  <span className="text-white font-bold text-sm">{fmt(pricePerUnit)}</span>
                </div>
                <input type="range" min={0.01} max={10000} step={1}
                  value={pricePerUnit} onChange={e => setPricePerUnit(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Variable Cost Per Unit</label>
                  <span className="text-white font-bold text-sm">{fmt(varCostUnit)}</span>
                </div>
                <input type="range" min={0} max={9999} step={1}
                  value={varCostUnit} onChange={e => setVarCostUnit(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Monthly Profit</label>
                  <span className="text-white font-bold text-sm">{fmt(targetProfit)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={targetProfit} onChange={e => setTargetProfit(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Break-Even Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Contribution Margin Per Unit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.contribution)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even Units</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.breakEvenUnits}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even Revenue</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.breakEvenRevenue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Units Needed for Target Profit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.unitsForProfit}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Revenue for Target Profit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.revenueForProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Margin of Safety</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.marginOfSafety}
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

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/markup-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏷️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Markup Calculator</h3>
            </a>

            <a href="/business-valuation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Valuation</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a break-even analysis?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Break-even analysis identifies the sales volume at which total revenue equals total costs — the point of zero profit or loss. Break-even units = Fixed Costs ÷ (Price − Variable Cost Per Unit). Understanding your break-even point is essential for pricing decisions, budgeting and assessing business viability.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is contribution margin?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Contribution margin = Selling Price − Variable Cost Per Unit. It represents how much each unit sold contributes toward covering fixed costs and generating profit. A $50 product with $30 variable cost has a $20 contribution margin. You need to sell enough units to cover all fixed costs before making any profit.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I lower my break-even point?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Three levers: (1) Raise prices — increases contribution margin per unit, but risks lower sales volume. (2) Reduce variable costs — better supplier terms, process efficiency. (3) Reduce fixed costs — renegotiate rent, reduce headcount, eliminate non-essential expenses. Usually a combination delivers the best result.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Break Even Calculator","item":"https://www.freefincalc.net/break-even-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Break Even Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
