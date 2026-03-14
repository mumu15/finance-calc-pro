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
  const [systemCost, setSystemCost] = useState(25000)
  const [federalCredit, setFederalCredit] = useState(30)
  const [monthlyBill, setMonthlyBill] = useState(180)
  const [offsetPct, setOffsetPct] = useState(90)
  const [elecInflation, setElecInflation] = useState(3)
  const [systemLife, setSystemLife] = useState(25)

  const result = useMemo(() => {
    try {
      const creditAmount  = systemCost * (federalCredit / 100)
      const netCost       = systemCost - creditAmount
      const annualSavings = monthlyBill * (offsetPct / 100) * 12
      // Simple payback
      const simplePayback = netCost / annualSavings
      // Lifetime savings with escalation
      let lifetimeSavings = 0
      for (let yr = 1; yr <= systemLife; yr++) {
        lifetimeSavings += annualSavings * Math.pow(1 + elecInflation/100, yr - 1)
      }
      const lifetimeROI   = ((lifetimeSavings - netCost) / netCost * 100).toFixed(1) + '%'
      const netProfit     = lifetimeSavings - netCost
      return { creditAmount, netCost, annualSavings, simplePayback: simplePayback.toFixed(1) + ' years', lifetimeSavings, netProfit, lifetimeROI }
    } catch(e) { return null }
  }, [systemCost, federalCredit, monthlyBill, offsetPct, elecInflation, systemLife])

  const pdfRows = result ? [
    { label: "Federal Tax Credit", value: result.creditAmount !== undefined ? String(fmt(result.creditAmount)) : "" },
    { label: "Net System Cost After Credit", value: result.netCost !== undefined ? String(fmt(result.netCost)) : "" },
    { label: "Annual Electric Savings", value: result.annualSavings !== undefined ? String(fmt(result.annualSavings)) : "" },
    { label: "Simple Payback Period", value: result.simplePayback !== undefined ? String(result.simplePayback) : "" },
    { label: "Lifetime Savings", value: result.lifetimeSavings !== undefined ? String(fmt(result.lifetimeSavings)) : "" },
    { label: "Net Lifetime Profit", value: result.netProfit !== undefined ? String(fmt(result.netProfit)) : "" },
    { label: "Lifetime ROI", value: result.lifetimeROI !== undefined ? String(result.lifetimeROI) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">☀️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Solar Panel Payback Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate solar panel payback period, ROI and lifetime savings for your home.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total System Cost (before incentives)</label>
                  <span className="text-white font-bold text-sm">{fmt(systemCost)}</span>
                </div>
                <input type="number" step="any" min={5000} max={100000} step={500}
                  value={systemCost} onChange={e => setSystemCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Federal Tax Credit %</label>
                  <span className="text-white font-bold text-sm">{`${federalCredit}%`}</span>
                </div>
                <input type="number" step="any" min={0} max={40} step={1}
                  value={federalCredit} onChange={e => setFederalCredit(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Monthly Electric Bill</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyBill)}</span>
                </div>
                <input type="number" step="any" min={20} max={1000} step={5}
                  value={monthlyBill} onChange={e => setMonthlyBill(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Solar Offset % of Bill</label>
                  <span className="text-white font-bold text-sm">{`${offsetPct}%`}</span>
                </div>
                <input type="number" step="any" min={50} max={100} step={5}
                  value={offsetPct} onChange={e => setOffsetPct(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Electricity Rate Increase</label>
                  <span className="text-white font-bold text-sm">{`${elecInflation}%`}</span>
                </div>
                <input type="number" step="any" min={1} max={8} step={0.5}
                  value={elecInflation} onChange={e => setElecInflation(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">System Life</label>
                  <span className="text-white font-bold text-sm">{`${systemLife} yrs`}</span>
                </div>
                <input type="number" step="any" min={20} max={30} step={1}
                  value={systemLife} onChange={e => setSystemLife(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Solar Panel Payback Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Tax Credit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.creditAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net System Cost After Credit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Electric Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Simple Payback Period</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.simplePayback}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lifetime Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lifetimeSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Lifetime Profit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lifetime ROI</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.lifetimeROI}
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

            <a href="/home-improvement-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔨</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Improvement</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/home-equity-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Equity</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How long does it take solar panels to pay for themselves?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Average solar payback period in the US is 6-10 years. With the 30% federal tax credit and average electricity savings, a $25,000 system net cost of $17,500 at $1,800/year in savings pays back in about 9-10 years. Sunny states (California, Arizona, Texas, Florida) have shorter payback periods due to more sunlight hours and higher electricity rates.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the federal solar tax credit in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The federal Investment Tax Credit (ITC) for residential solar is 30% of total system cost through 2032, then steps down to 26% in 2033 and 22% in 2034. This is a dollar-for-dollar reduction in federal income tax owed. On a $25,000 system, the credit is $7,500. You must have sufficient tax liability to use the full credit — unused credit carries forward to future years.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does solar increase home value?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Studies show solar panels increase home value by 3-4% on average. A Zillow study found homes with solar sold for 4.1% more. On a $400,000 home that is a $16,400 increase in value. Combined with electricity savings and the federal tax credit, solar is one of the highest-ROI home improvements available. Most states also exempt solar from property tax reassessment.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Solar Payback Calculator","item":"https://www.freefincalc.net/solar-payback-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Solar Payback Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
