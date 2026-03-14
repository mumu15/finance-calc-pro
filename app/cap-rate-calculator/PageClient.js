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
  const [calcMode, setCalcMode] = useState('caprate')
  const [annualRent, setAnnualRent] = useState(26400)
  const [opExpenses, setOpExpenses] = useState(8000)
  const [propertyPrice, setPropertyPrice] = useState(350000)
  const [targetCapRate, setTargetCapRate] = useState(6)

  const result = useMemo(() => {
    try {
      const noi = annualRent - opExpenses
      let capRate, propertyValue, noiResult
      if (calcMode === 'caprate') {
        capRate       = (noi / propertyPrice * 100).toFixed(2) + '%'
        propertyValue = propertyPrice
        noiResult     = noi
      } else if (calcMode === 'value') {
        capRate       = targetCapRate + '%'
        propertyValue = noi / (targetCapRate / 100)
        noiResult     = noi
      } else {
        noiResult     = propertyPrice * (targetCapRate / 100)
        capRate       = targetCapRate + '%'
        propertyValue = propertyPrice
      }
      const grossYield = (annualRent / propertyValue * 100).toFixed(2) + '%'
      const expRatio   = (opExpenses / annualRent * 100).toFixed(1) + '%'
      return { noiResult, capRate, propertyValue, grossYield, expRatio }
    } catch(e) { return null }
  }, [calcMode, annualRent, opExpenses, propertyPrice, targetCapRate])

  const pdfRows = result ? [
    { label: "Net Operating Income (NOI)", value: result.noiResult !== undefined ? String(fmt(result.noiResult)) : "" },
    { label: "Cap Rate", value: result.capRate !== undefined ? String(result.capRate) : "" },
    { label: "Property Value", value: result.propertyValue !== undefined ? String(fmt(result.propertyValue)) : "" },
    { label: "Gross Rental Yield", value: result.grossYield !== undefined ? String(result.grossYield) : "" },
    { label: "Expense Ratio", value: result.expRatio !== undefined ? String(result.expRatio) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cap Rate Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate capitalization rate for any investment property and determine property value from NOI.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <label className="text-slate-400 text-sm block mb-2">Calculate</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"caprate","l":"Cap Rate from NOI + Price"},{"v":"value","l":"Property Value from NOI + Cap Rate"},{"v":"noi","l":"NOI from Price + Cap Rate"}]).map(o => (
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
                  <label className="text-slate-400 text-sm">Annual Gross Rent</label>
                  <span className="text-white font-bold text-sm">{fmt(annualRent)}</span>
                </div>
                <input type="range" min={1000} max={1000000} step={500}
                  value={annualRent} onChange={e => setAnnualRent(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Operating Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(opExpenses)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={opExpenses} onChange={e => setOpExpenses(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Property Price</label>
                  <span className="text-white font-bold text-sm">{fmt(propertyPrice)}</span>
                </div>
                <input type="range" min={50000} max={10000000} step={5000}
                  value={propertyPrice} onChange={e => setPropertyPrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Cap Rate (for valuation)</label>
                  <span className="text-white font-bold text-sm">{`${targetCapRate}%`}</span>
                </div>
                <input type="range" min={1} max={15} step={0.25}
                  value={targetCapRate} onChange={e => setTargetCapRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Cap Rate Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Operating Income (NOI)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.noiResult)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cap Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.capRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Property Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.propertyValue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Rental Yield</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.grossYield}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Expense Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.expRatio}
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

            <a href="/rental-property-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rental Property</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/house-flipping-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔨</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">House Flipping</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is cap rate and how is it calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Capitalization rate = Net Operating Income (NOI) / Property Value. NOI = Gross rent minus all operating expenses (taxes, insurance, maintenance, management) but excluding mortgage payments. Cap rate measures the unlevered yield of a property — useful for comparing properties regardless of financing. A $350,000 property with $21,000 NOI has a 6% cap rate.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good cap rate in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Cap rates in 2026 vary by property type and market: multifamily 4-6% in gateway cities, 6-8% in secondary markets. Industrial 4-6%. Retail 5-7%. Office 6-9% (higher due to uncertainty). Single-family rentals 4-7%. Higher cap rates generally mean higher risk or lower growth markets. Rising interest rates push cap rates up (prices down).</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Cap rate vs cash-on-cash return: what is the difference?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Cap rate ignores financing — it measures the property yield as if bought all-cash. Cash-on-cash return includes your mortgage payment and measures actual cash flow relative to cash invested. If you buy at a 6% cap rate with a 7% mortgage rate, you may have negative cash flow despite a good cap rate. Use cap rate for valuation, cash-on-cash for investment decisions.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Cap Rate Calculator","item":"https://www.freefincalc.net/cap-rate-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Cap Rate Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
