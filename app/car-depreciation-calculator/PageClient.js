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
  const [purchasePrice, setPurchasePrice] = useState(35000)
  const [year1Rate, setYear1Rate] = useState(20)
  const [annualRate, setAnnualRate] = useState(15)
  const [years, setYears] = useState(5)
  const [mileageYr, setMileageYr] = useState(12000)

  const result = useMemo(() => {
    try {
      const y1Loss  = purchasePrice * (year1Rate / 100)
      const afterY1 = purchasePrice - y1Loss
      let value = afterY1
      let totalDepreciation = y1Loss
      for (let i = 2; i <= years; i++) {
        const loss = value * (annualRate / 100)
        value -= loss
        totalDepreciation += loss
      }
      const finalValue      = years === 1 ? afterY1 : value
      const retainedPct     = (finalValue / purchasePrice * 100).toFixed(1) + '%'
      const costPerMile     = (totalDepreciation / (mileageYr * years)).toFixed(3)
      const annualAvgLoss   = totalDepreciation / years
      return { finalValue, totalDepreciation, retainedPct, costPerMile, annualAvgLoss }
    } catch(e) { return null }
  }, [purchasePrice, year1Rate, annualRate, years, mileageYr])

  const pdfRows = result ? [
    { label: "Estimated Value After {years} Years", value: result.finalValue !== undefined ? String(fmt(result.finalValue)) : "" },
    { label: "Total Depreciation Loss", value: result.totalDepreciation !== undefined ? String(fmt(result.totalDepreciation)) : "" },
    { label: "Value Retained", value: result.retainedPct !== undefined ? String(result.retainedPct) : "" },
    { label: "Depreciation Cost Per Mile", value: result.costPerMile !== undefined ? String(result.costPerMile) : "" },
    { label: "Average Annual Value Lost", value: result.annualAvgLoss !== undefined ? String(fmt(result.annualAvgLoss)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚗</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Car Depreciation Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much your car loses in value each year and its resale value over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Purchase Price</label>
                  <span className="text-white font-bold text-sm">{fmt(purchasePrice)}</span>
                </div>
                <input type="range" min={1000} max={200000} step={500}
                  value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Year 1 Depreciation</label>
                  <span className="text-white font-bold text-sm">{`${year1Rate}%`}</span>
                </div>
                <input type="range" min={5} max={35} step={1}
                  value={year1Rate} onChange={e => setYear1Rate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Rate (Year 2+)</label>
                  <span className="text-white font-bold text-sm">{`${annualRate}%`}</span>
                </div>
                <input type="range" min={5} max={25} step={1}
                  value={annualRate} onChange={e => setAnnualRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years to Calculate</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="range" min={1} max={15} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Miles Driven Per Year</label>
                  <span className="text-white font-bold text-sm">{`${mileageYr} mi`}</span>
                </div>
                <input type="range" min={5000} max={50000} step={1000}
                  value={mileageYr} onChange={e => setMileageYr(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Car Depreciation Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Value After {years} Years</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.finalValue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Depreciation Loss</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.totalDepreciation)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Value Retained</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.retainedPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Depreciation Cost Per Mile</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.costPerMile}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Average Annual Value Lost</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.annualAvgLoss)}
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

            <a href="/car-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚘</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Affordability</h3>
            </a>

            <a href="/car-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Loan</h3>
            </a>

            <a href="/lease-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Lease vs Buy</h3>
            </a>

            <a href="/fuel-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⛽</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Fuel Cost</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How fast do cars depreciate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">New cars lose 15-25% in the first year and roughly 10-15% per year after. After 5 years the typical car retains about 40% of its original value. Luxury cars, sports cars and some EVs depreciate faster. Trucks and SUVs from Toyota and Honda tend to hold value best.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Which cars depreciate the least?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Lowest depreciation (best resale value): Toyota Tacoma, Honda Civic/Accord, Toyota 4Runner, Subaru Outback, and Jeep Wrangler. Highest depreciation: Maserati, Jaguar, Lincoln, Cadillac, and most luxury sedans. Fuel efficiency, reliability reputation and brand desirability drive resale value.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How does depreciation affect car buying decisions?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Depreciation is often the biggest cost of car ownership — far exceeding fuel and insurance on newer vehicles. Buying a 2-3 year old used car lets someone else absorb the steep first-year drop. CPO (certified pre-owned) vehicles offer warranty protection alongside reduced depreciation cost.</p>
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
