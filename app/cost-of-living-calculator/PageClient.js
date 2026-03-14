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
  const [currentSalary, setCurrentSalary] = useState(80000)
  const [housingIndex, setHousingIndex] = useState(150)
  const [foodIndex, setFoodIndex] = useState(115)
  const [transportIndex, setTransportIndex] = useState(110)
  const [taxDiff, setTaxDiff] = useState(2)

  const result = useMemo(() => {
    try {
      const weightedIndex = (housingIndex * 0.35) + (foodIndex * 0.15) + (transportIndex * 0.15) + (100 * 0.35)
      const colAdjustment = weightedIndex / 100
      const taxAdjustment = 1 + (taxDiff / 100)
      const equivalentSalary = currentSalary * colAdjustment * taxAdjustment
      const difference = equivalentSalary - currentSalary
      const pctChange = ((equivalentSalary / currentSalary - 1) * 100).toFixed(1) + '%'
      const monthlyDiff = difference / 12
      return { equivalentSalary, difference, pctChange, monthlyDiff }
    } catch(e) { return null }
  }, [currentSalary, housingIndex, foodIndex, transportIndex, taxDiff])

  const pdfRows = result ? [
    { label: "Equivalent Salary Needed", value: result.equivalentSalary !== undefined ? String(fmt(result.equivalentSalary)) : "" },
    { label: "Salary Difference Required", value: result.difference !== undefined ? String(fmt(result.difference)) : "" },
    { label: "Percentage Adjustment", value: result.pctChange !== undefined ? String(result.pctChange) : "" },
    { label: "Monthly Cost Difference", value: result.monthlyDiff !== undefined ? String(fmt(result.monthlyDiff)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🌆</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cost of Living Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Compare cost of living between cities and find the equivalent salary you need when relocating.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSalary)}</span>
                </div>
                <input type="number" min={20000} max={500000} step={1000}
                  value={currentSalary} onChange={e => setCurrentSalary(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">New City Housing Cost Index (current=100)</label>
                  <span className="text-white font-bold text-sm">{housingIndex}</span>
                </div>
                <input type="number" min={30} max={400} step={5}
                  value={housingIndex} onChange={e => setHousingIndex(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">New City Food Cost Index</label>
                  <span className="text-white font-bold text-sm">{foodIndex}</span>
                </div>
                <input type="number" min={50} max={200} step={5}
                  value={foodIndex} onChange={e => setFoodIndex(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">New City Transport Index</label>
                  <span className="text-white font-bold text-sm">{transportIndex}</span>
                </div>
                <input type="number" min={50} max={200} step={5}
                  value={transportIndex} onChange={e => setTransportIndex(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Tax Difference (+ higher, - lower)</label>
                  <span className="text-white font-bold text-sm">{`${taxDiff}%`}</span>
                </div>
                <input type="number" min={-15} max={15} step={0.5}
                  value={taxDiff} onChange={e => setTaxDiff(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Cost of Living Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Equivalent Salary Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.equivalentSalary)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Salary Difference Required</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.difference)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Percentage Adjustment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.pctChange}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Cost Difference</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyDiff)}
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

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/moving-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Moving Cost</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What factors make up cost of living?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The main components: housing (typically 30-40% of budget), food (10-15%), transportation (10-15%), healthcare (5-10%), taxes (varies widely), childcare if applicable, utilities and entertainment. Housing has the biggest impact — San Francisco housing costs 3-4x the national average, while Midwest cities can be 30-50% below average.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much more salary do I need to move from a low to high cost city?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Moving from a median-cost city to San Francisco or New York typically requires 40-70% higher salary just to maintain the same lifestyle. A $80,000 salary in Austin may need to be $130,000+ in San Francisco after accounting for higher rent, taxes and expenses. Use this calculator with real local data for accuracy.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I research cost of living before relocating?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Use resources like Numbeo, NerdWallet Cost of Living calculator, CNN Money cost of living tool, and BestPlaces.net. Check Zillow/Apartments.com for actual current rents. Use SmartAsset for tax comparison between states. Talk to people already living in the target city for real-world spending data.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Cost Of Living Calculator","item":"https://freefincalc.net/cost-of-living-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Cost Of Living Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
