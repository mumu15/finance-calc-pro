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
  const [cost, setCost] = useState(50)
  const [markupPct, setMarkupPct] = useState(40)
  const [units, setUnits] = useState(100)

  const result = useMemo(() => {
    try {
      const sellingPrice = cost * (1 + markupPct / 100)
      const grossProfit  = sellingPrice - cost
      const marginPct    = (grossProfit / sellingPrice * 100).toFixed(2) + '%'
      const monthlyRevenue = sellingPrice * units
      const monthlyProfit  = grossProfit * units
      const monthlyCogsTotal = cost * units
      return { sellingPrice, grossProfit, marginPct, monthlyRevenue, monthlyProfit, monthlyCogsTotal }
    } catch(e) { return null }
  }, [cost, markupPct, units])

  const pdfRows = result ? [
    { label: "Selling Price", value: result.sellingPrice !== undefined ? String(fmt(result.sellingPrice)) : "" },
    { label: "Gross Profit Per Unit", value: result.grossProfit !== undefined ? String(fmt(result.grossProfit)) : "" },
    { label: "Profit Margin %", value: result.marginPct !== undefined ? String(result.marginPct) : "" },
    { label: "Monthly Revenue", value: result.monthlyRevenue !== undefined ? String(fmt(result.monthlyRevenue)) : "" },
    { label: "Monthly Gross Profit", value: result.monthlyProfit !== undefined ? String(fmt(result.monthlyProfit)) : "" },
    { label: "Monthly Total COGS", value: result.monthlyCogsTotal !== undefined ? String(fmt(result.monthlyCogsTotal)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏷️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Markup Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate selling price from cost and markup percentage, or find your profit margin.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cost Price</label>
                  <span className="text-white font-bold text-sm">{fmt(cost)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0.01} max={100000} step={0.01}
                  value={cost} onChange={e => setCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Markup Percentage</label>
                  <span className="text-white font-bold text-sm">{`${markupPct}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={500} step={1}
                  value={markupPct} onChange={e => setMarkupPct(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Units Sold Per Month</label>
                  <span className="text-white font-bold text-sm">{`${units} units`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={100000} step={1}
                  value={units} onChange={e => setUnits(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Markup Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Selling Price</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.sellingPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Profit Per Unit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.grossProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Profit Margin %</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.marginPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Revenue</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyRevenue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Gross Profit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Total COGS</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyCogsTotal)}
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

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>

            <a href="/discount-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏷️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Discount</h3>
            </a>

            <a href="/ecommerce-profit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛒</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Ecommerce Profit</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between markup and margin?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Markup is calculated on cost: a 40% markup on a $50 product = $20 profit, selling at $70. Margin is calculated on selling price: $20 / $70 = 28.6% margin. The same profit looks like a bigger number as markup vs margin. To convert: Margin = Markup / (1 + Markup). A 40% markup equals a 28.6% margin. Retailers typically discuss margin; manufacturers discuss markup.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good markup percentage?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Markup varies widely by industry: grocery retail 15-25%, restaurants 300% on food (food cost target is 25-35%), clothing retail 50-100%, electronics 10-20%, jewelry 50-100%, software 80-90%+. The right markup must cover all operating costs beyond COGS and still generate profit. Work backwards from desired net profit margin and total fixed costs to find your minimum viable markup.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I price my products profitably?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Cost-plus pricing (cost + markup) is simple but ignores competition and perceived value. Value-based pricing charges what customers are willing to pay, often yielding higher margins. Competitive pricing matches or undercuts rivals. For new products: research competitor prices, calculate break-even markup, then test price points. Premium pricing with strong branding often outperforms cost-plus significantly.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Markup Calculator","item":"https://www.freefincalc.net/markup-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Markup Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
