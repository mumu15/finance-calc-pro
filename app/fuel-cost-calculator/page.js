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
  const [milesPerYear, setMilesPerYear] = useState(15000)
  const [mpg1, setMpg1] = useState(28)
  const [fuelPrice, setFuelPrice] = useState(3.5)
  const [mpg2, setMpg2] = useState(45)

  const result = useMemo(() => {
    try {
      const gallons1     = milesPerYear / mpg1
      const annualCost1  = gallons1 * fuelPrice
      const costPerMile1 = annualCost1 / milesPerYear
      const gallons2     = milesPerYear / mpg2
      const annualCost2  = gallons2 * fuelPrice
      const annualSaving = annualCost1 - annualCost2
      const fiveYrSaving = annualSaving * 5
      return {
        annualCost1, costPerMile1: costPerMile1.toFixed(3),
        annualCost2, annualSaving, fiveYrSaving
      }
    } catch(e) { return null }
  }, [milesPerYear, mpg1, fuelPrice, mpg2])

  const pdfRows = result ? [
    { label: "Vehicle 1 Annual Fuel Cost", value: result.annualCost1 !== undefined ? String(fmt(result.annualCost1)) : "" },
    { label: "Vehicle 1 Cost Per Mile", value: result.costPerMile1 !== undefined ? String(result.costPerMile1) : "" },
    { label: "Vehicle 2 Annual Fuel Cost", value: result.annualCost2 !== undefined ? String(fmt(result.annualCost2)) : "" },
    { label: "Annual Savings (V2 vs V1)", value: result.annualSaving !== undefined ? String(fmt(result.annualSaving)) : "" },
    { label: "5-Year Fuel Savings", value: result.fiveYrSaving !== undefined ? String(fmt(result.fiveYrSaving)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⛽</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fuel Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate annual fuel costs, cost per mile and compare fuel expenses between two vehicles.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Miles Driven Per Year</label>
                  <span className="text-white font-bold text-sm">{`${milesPerYear} mi`}</span>
                </div>
                <input type="range" min={1000} max={100000} step={500}
                  value={milesPerYear} onChange={e => setMilesPerYear(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Vehicle 1 Fuel Economy</label>
                  <span className="text-white font-bold text-sm">{`${mpg1} mpg`}</span>
                </div>
                <input type="range" min={5} max={150} step={1}
                  value={mpg1} onChange={e => setMpg1(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Fuel Price Per Gallon</label>
                  <span className="text-white font-bold text-sm">{fmt(fuelPrice)}</span>
                </div>
                <input type="range" min={1} max={10} step={0.05}
                  value={fuelPrice} onChange={e => setFuelPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Vehicle 2 Fuel Economy (comparison)</label>
                  <span className="text-white font-bold text-sm">{`${mpg2} mpg`}</span>
                </div>
                <input type="range" min={5} max={150} step={1}
                  value={mpg2} onChange={e => setMpg2(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Fuel Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Vehicle 1 Annual Fuel Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualCost1)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Vehicle 1 Cost Per Mile</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.costPerMile1}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Vehicle 2 Annual Fuel Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualCost2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Savings (V2 vs V1)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualSaving)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">5-Year Fuel Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fiveYrSaving)}
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

            <a href="/car-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Loan</h3>
            </a>

            <a href="/car-depreciation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Depreciation</h3>
            </a>

            <a href="/lease-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Lease vs Buy</h3>
            </a>

            <a href="/car-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚘</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Affordability</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I calculate fuel cost per mile?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Fuel cost per mile = Fuel price per gallon divided by MPG. At $3.50/gallon and 28 MPG: $3.50 / 28 = $0.125 per mile. For 15,000 miles/year that is $1,875 annually. The IRS standard mileage rate of $0.67/mile (2024) covers fuel plus depreciation, insurance and maintenance.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much do I save by switching to a more fuel efficient car?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Upgrading from 25 MPG to 40 MPG at $3.50/gallon driving 15,000 miles/year saves about $788/year in fuel. Over 5 years that is $3,940 in fuel savings. Compare this to the premium price of a more efficient vehicle to calculate your payback period.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do electric vehicles compare on fuel cost?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">EVs cost roughly $0.03-$0.05 per mile in electricity vs $0.10-$0.15 per mile for gasoline cars. At 15,000 miles/year an EV saves $750-$1,500/year in fuel. However higher purchase price (though falling), charging infrastructure and range considerations affect total ownership cost comparison.</p>
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
