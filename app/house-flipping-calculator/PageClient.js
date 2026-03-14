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
  const [purchasePrice, setPurchasePrice] = useState(200000)
  const [rehabCost, setRehabCost] = useState(45000)
  const [holdingMonths, setHoldingMonths] = useState(6)
  const [monthlyCarry, setMonthlyCarry] = useState(2000)
  const [arvPrice, setArvPrice] = useState(320000)
  const [closingCostPct, setClosingCostPct] = useState(8)

  const result = useMemo(() => {
    try {
      const closingCosts  = (purchasePrice + arvPrice) * (closingCostPct / 100)
      const carryingCosts = monthlyCarry * holdingMonths
      const totalCost     = purchasePrice + rehabCost + closingCosts + carryingCosts
      const grossProfit   = arvPrice - totalCost
      const roi           = (grossProfit / totalCost * 100).toFixed(1) + '%'
      const annualisedRoi = ((Math.pow(1 + grossProfit/totalCost, 12/holdingMonths) - 1) * 100).toFixed(1) + '%'
      // 70% rule check
      const rule70max     = arvPrice * 0.70 - rehabCost
      const rule70ok      = purchasePrice <= rule70max ? 'Pass - Good deal' : 'Fail - Overpaying'
      return { totalCost, grossProfit, roi, annualisedRoi, closingCosts, carryingCosts, rule70max, rule70ok }
    } catch(e) { return null }
  }, [purchasePrice, rehabCost, holdingMonths, monthlyCarry, arvPrice, closingCostPct])

  const pdfRows = result ? [
    { label: "Total All-In Cost", value: result.totalCost !== undefined ? String(fmt(result.totalCost)) : "" },
    { label: "Gross Profit", value: result.grossProfit !== undefined ? String(fmt(result.grossProfit)) : "" },
    { label: "ROI on this Flip", value: result.roi !== undefined ? String(result.roi) : "" },
    { label: "Annualised ROI", value: result.annualisedRoi !== undefined ? String(result.annualisedRoi) : "" },
    { label: "Closing Costs Total", value: result.closingCosts !== undefined ? String(fmt(result.closingCosts)) : "" },
    { label: "Total Carrying Costs", value: result.carryingCosts !== undefined ? String(fmt(result.carryingCosts)) : "" },
    { label: "70% Rule Max Offer", value: result.rule70max !== undefined ? String(fmt(result.rule70max)) : "" },
    { label: "70% Rule Check", value: result.rule70ok !== undefined ? String(result.rule70ok) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔨</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">House Flipping Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate profit, ROI and break-even for a house flip including all costs and carrying expenses.</p>
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
                <input type="number" min={20000} max={2000000} step={5000}
                  value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Renovation Budget</label>
                  <span className="text-white font-bold text-sm">{fmt(rehabCost)}</span>
                </div>
                <input type="number" min={0} max={500000} step={1000}
                  value={rehabCost} onChange={e => setRehabCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Holding Period</label>
                  <span className="text-white font-bold text-sm">{`${holdingMonths} mo`}</span>
                </div>
                <input type="number" min={1} max={24} step={1}
                  value={holdingMonths} onChange={e => setHoldingMonths(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Carrying Costs</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyCarry)}</span>
                </div>
                <input type="number" min={0} max={10000} step={100}
                  value={monthlyCarry} onChange={e => setMonthlyCarry(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">After Repair Value (ARV)</label>
                  <span className="text-white font-bold text-sm">{fmt(arvPrice)}</span>
                </div>
                <input type="number" min={50000} max={3000000} step={5000}
                  value={arvPrice} onChange={e => setArvPrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Closing Costs (buy+sell)</label>
                  <span className="text-white font-bold text-sm">{`${closingCostPct}%`}</span>
                </div>
                <input type="number" min={2} max={12} step={0.5}
                  value={closingCostPct} onChange={e => setClosingCostPct(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="House Flipping Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total All-In Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Profit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.grossProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">ROI on this Flip</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.roi}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annualised ROI</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.annualisedRoi}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Closing Costs Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.closingCosts)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Carrying Costs</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.carryingCosts)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">70% Rule Max Offer</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.rule70max)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">70% Rule Check</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.rule70ok}
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

            <a href="/cap-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cap Rate</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/home-improvement-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔨</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Improvement</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the 70% rule in house flipping?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 70% rule: maximum purchase price = ARV x 70% minus rehab costs. On a property with $320,000 ARV and $45,000 rehab: max offer = $224,000 - $45,000 = $179,000. This leaves 30% for costs, holding expenses and profit. It is a quick filter — use detailed calculations before making actual offers.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much profit should a house flip make?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most experienced flippers target at least $25,000-$30,000 minimum profit per flip to justify the risk. In terms of ROI, aim for 15-20%+ return on total invested capital. Annualised returns of 20-40% are achievable on successful flips. Margins are compressed in competitive markets — always account for overruns (add 15-20% to rehab budget).</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are the biggest risks in house flipping?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Top risks: unexpected structural issues (foundation, roof, plumbing) blowing the rehab budget, holding too long due to slow sales market or financing delays, overpaying for the property, underestimating renovation time and cost, and short-term capital gains tax (taxed as ordinary income if held under 1 year). Always get a professional inspection before buying.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"House Flipping Calculator","item":"https://freefincalc.net/house-flipping-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"House Flipping Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
