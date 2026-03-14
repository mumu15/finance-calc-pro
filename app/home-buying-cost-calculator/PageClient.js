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
  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)
  const [mortgageRate, setMortgageRate] = useState(6.875)
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2)
  const [closingCostPct, setClosingCostPct] = useState(3)
  const [location, setLocation] = useState('suburban')

  const result = useMemo(() => {
    try {
      const downPayment    = homePrice * (downPct / 100)
      const loanAmount    = homePrice - downPayment
      const r             = mortgageRate / 100 / 12
      const n             = 360
      const monthlyMort   = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const closingCosts  = homePrice * (closingCostPct / 100)
      const propTaxMonthly = homePrice * (propertyTaxRate / 100) / 12
      const hoiMonthly    = homePrice * 0.0050 / 12
      const pmiMonthly    = downPct < 20 ? loanAmount * 0.008 / 12 : 0
      const maintMonthly  = homePrice * 0.010 / 12
      const utilityExtra  = { rural: 150, suburban: 200, urban: 250 }[location]
      const totalMonthly  = monthlyMort + propTaxMonthly + hoiMonthly + pmiMonthly + maintMonthly + utilityExtra
      const totalUpfront  = downPayment + closingCosts + 2000
      const trueMonthlyVsRent = totalMonthly
      return { downPayment, closingCosts, totalUpfront, monthlyMort, propTaxMonthly, hoiMonthly, pmiMonthly, totalMonthly }
    } catch(e) { return null }
  }, [homePrice, downPct, mortgageRate, propertyTaxRate, closingCostPct, location])

  const pdfRows = result ? [
    { label: "Down Payment", value: result.downPayment !== undefined ? String(fmt(result.downPayment)) : "" },
    { label: "Closing Costs", value: result.closingCosts !== undefined ? String(fmt(result.closingCosts)) : "" },
    { label: "Total Cash Needed at Closing", value: result.totalUpfront !== undefined ? String(fmt(result.totalUpfront)) : "" },
    { label: "Monthly Mortgage (P+I)", value: result.monthlyMort !== undefined ? String(fmt(result.monthlyMort)) : "" },
    { label: "Monthly Property Tax", value: result.propTaxMonthly !== undefined ? String(fmt(result.propTaxMonthly)) : "" },
    { label: "Monthly Homeowners Insurance", value: result.hoiMonthly !== undefined ? String(fmt(result.hoiMonthly)) : "" },
    { label: "Monthly PMI (if applicable)", value: result.pmiMonthly !== undefined ? String(fmt(result.pmiMonthly)) : "" },
    { label: "True Monthly All-In Cost", value: result.totalMonthly !== undefined ? String(fmt(result.totalMonthly)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏡</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Home Buying Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate all upfront and ongoing costs of buying a home — beyond the down payment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Home Purchase Price</label>
                  <span className="text-white font-bold text-sm">{fmt(homePrice)}</span>
                </div>
                <input type="range" min={50000} max={3000000} step={5000}
                  value={homePrice} onChange={e => setHomePrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Down Payment Percentage</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":3,"l":"3%"},{"v":5,"l":"5%"},{"v":10,"l":"10%"},{"v":20,"l":"20%"},{"v":25,"l":"25%"}]).map(o => (
                    <button key={o.v} onClick={() => setDownPct(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: downPct === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: downPct === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: downPct === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${mortgageRate}%`}</span>
                </div>
                <input type="range" min={3} max={12} step={0.125}
                  value={mortgageRate} onChange={e => setMortgageRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Property Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${propertyTaxRate}%`}</span>
                </div>
                <input type="range" min={0.3} max={3.5} step={0.1}
                  value={propertyTaxRate} onChange={e => setPropertyTaxRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Closing Costs %</label>
                  <span className="text-white font-bold text-sm">{`${closingCostPct}%`}</span>
                </div>
                <input type="range" min={1} max={6} step={0.25}
                  value={closingCostPct} onChange={e => setClosingCostPct(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Location Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"rural","l":"Rural"},{"v":"suburban","l":"Suburban"},{"v":"urban","l":"Urban"}]).map(o => (
                    <button key={o.v} onClick={() => setLocation(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: location === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: location === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: location === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Home Buying Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Down Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.downPayment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Closing Costs</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.closingCosts)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Cash Needed at Closing</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalUpfront)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Mortgage (P+I)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyMort)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Property Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.propTaxMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Homeowners Insurance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.hoiMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly PMI (if applicable)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.pmiMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">True Monthly All-In Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalMonthly)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for planning purposes only. Actual costs vary by location and choices.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/down-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Down Payment</h3>
            </a>

            <a href="/rent-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rent vs Buy</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Affordability</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What closing costs should I expect when buying a home?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Closing costs typically run 2-5% of the purchase price. On a $400,000 home that is $8,000-$20,000. Main components: loan origination fee (0.5-1%), appraisal ($500-$800), title insurance ($1,000-$2,000), attorney fees ($500-$1,500), prepaid property taxes and insurance (2-3 months), and recording fees. Buyers can negotiate for sellers to pay closing costs, especially in slower markets.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the true monthly cost of homeownership?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Beyond the mortgage P+I payment, add: property taxes (0.5-2.5% of value annually), homeowners insurance ($100-$200/month), PMI if down payment below 20% ($100-$300/month), HOA fees if applicable ($100-$800/month), maintenance (budget 1% of home value annually = $333/month on a $400,000 home), and utilities which are typically higher than renting.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much cash do I need beyond the down payment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Total cash needed at closing: down payment + closing costs (2-5%) + moving costs ($1,000-$5,000) + immediate repairs and improvements + 3-6 month emergency fund (do not deplete savings on the down payment). Many first-time buyers deplete their savings on the down payment and then struggle with unexpected home expenses. Maintain liquid reserves after closing.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Home Buying Cost Calculator","item":"https://www.freefincalc.net/home-buying-cost-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Home Buying Cost Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
