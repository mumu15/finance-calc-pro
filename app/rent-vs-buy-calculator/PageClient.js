'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'

const faqs = [
  {
    "q": "Is it better to rent or buy a home?",
    "a": "It depends on timeline, finances and market. Buying is better if you plan to stay 5+ years, can afford a 10-20% down payment, and home prices are reasonable relative to rents. Renting is better for flexibility, expensive markets (NYC, SF) and when you lack a down payment or have high debt."
  },
  {
    "q": "What is the price-to-rent ratio?",
    "a": "The price-to-rent ratio compares home prices to annual rents. Divide home price by annual rent. A ratio below 15 favors buying; 15-20 is neutral; above 20 favors renting. In San Francisco the ratio exceeds 40, strongly favoring renting. In many Midwest cities it is below 15, favoring buying."
  },
  {
    "q": "How long do you need to stay to make buying worth it?",
    "a": "The break-even point for buying vs renting is typically 3-7 years depending on transaction costs, mortgage rate and market appreciation. The 5-year rule suggests staying at least 5 years to recoup transaction costs (real estate agent fees, closing costs, moving). Shorter stays usually favor renting."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)
  const [mortgageRate, setMortgageRate] = useState(6.75)
  const [monthlyRent, setMonthlyRent] = useState(2200)
  const [years, setYears] = useState(7)

  const result = useMemo(() => {
    try {
      const dp = homePrice * downPct / 100
      const loan = homePrice - dp
      const r = mortgageRate / 100 / 12
      const n = 30 * 12
      const mortgagePayment = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalBuyCost = (mortgagePayment + homePrice * 0.015/12) * years * 12 + dp
      const totalRentCost = monthlyRent * years * 12
      const homeAppreciation = homePrice * (Math.pow(1.04, years) - 1)
      const buyNetCost = totalBuyCost - homeAppreciation
      const diff = totalRentCost - buyNetCost
      const better = diff > 0 ? 'Buying saves ' : 'Renting saves '
      return { mortgagePayment, totalBuyCost, totalRentCost, homeAppreciation, saving: Math.abs(diff), better }
    } catch(e) { return null }
  }, [homePrice, downPct, mortgageRate, monthlyRent, years])

  const pdfRows = result ? [
    { label: "Monthly Mortgage Payment", value: result.mortgagePayment !== undefined ? (fmt(result.mortgagePayment)) : "" },
    { label: "Total Cost of Buying", value: result.totalBuyCost !== undefined ? (fmt(result.totalBuyCost)) : "" },
    { label: "Total Cost of Renting", value: result.totalRentCost !== undefined ? (fmt(result.totalRentCost)) : "" },
    { label: "Est. Home Appreciation", value: result.homeAppreciation !== undefined ? (fmt(result.homeAppreciation)) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Rent vs Buy Calculator", "item": "https://freefincalc.net/rent-vs-buy-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Rent vs Buy Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏘️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rent vs Buy Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Compare the true financial cost of renting versus buying a home over time.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Home Purchase Price</label>
                  <span className="text-white font-bold text-sm">{fmt(homePrice)}</span>
                </div>
                <input type="range" min={50000} max={2000000} step={5000}
                  value={homePrice} onChange={e => setHomePrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Down Payment %</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":5,"l":"5%"},{"v":10,"l":"10%"},{"v":20,"l":"20%"},{"v":25,"l":"25%"}].map(o => (
                    <button key={o.v} onClick={() => setDownPct(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:downPct===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:downPct===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:downPct===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage Rate</label>
                  <span className="text-white font-bold text-sm">{mortgageRate + "%"}</span>
                </div>
                <input type="range" min={2} max={12} step={0.125}
                  value={mortgageRate} onChange={e => setMortgageRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Rent (alternative)</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyRent)}</span>
                </div>
                <input type="range" min={500} max={10000} step={50}
                  value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Comparison Period</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":3,"l":"3 yrs"},{"v":5,"l":"5 yrs"},{"v":7,"l":"7 yrs"},{"v":10,"l":"10 yrs"}].map(o => (
                    <button key={o.v} onClick={() => setYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:years===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:years===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:years===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Rent vs Buy Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Mortgage Payment</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.mortgagePayment)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Cost of Buying</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalBuyCost)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Cost of Renting</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalRentCost)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Home Appreciation</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.homeAppreciation)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              ⚠️ Results are estimates for educational purposes only. Not financial advice.
              Consult a qualified professional before making financial decisions.
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/rent-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rent Affordability</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Affordability</h3>
            </a>

            <a href="/down-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Down Payment</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Is it better to rent or buy a home?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">It depends on timeline, finances and market. Buying is better if you plan to stay 5+ years, can afford a 10-20% down payment, and home prices are reasonable relative to rents. Renting is better for flexibility, expensive markets (NYC, SF) and when you lack a down payment or have high debt.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the price-to-rent ratio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The price-to-rent ratio compares home prices to annual rents. Divide home price by annual rent. A ratio below 15 favors buying; 15-20 is neutral; above 20 favors renting. In San Francisco the ratio exceeds 40, strongly favoring renting. In many Midwest cities it is below 15, favoring buying.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How long do you need to stay to make buying worth it?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The break-even point for buying vs renting is typically 3-7 years depending on transaction costs, mortgage rate and market appreciation. The 5-year rule suggests staying at least 5 years to recoup transaction costs (real estate agent fees, closing costs, moving). Shorter stays usually favor renting.</p>
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
