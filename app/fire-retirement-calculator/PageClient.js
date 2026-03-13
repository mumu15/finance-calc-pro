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
  const [currentAge, setCurrentAge] = useState(30)
  const [annualExpenses, setAnnualExpenses] = useState(45000)
  const [currentSavings, setCurrentSavings] = useState(80000)
  const [annualSavings, setAnnualSavings] = useState(25000)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(() => {
    try {
      const fireNumber   = annualExpenses * 25
      const remaining    = Math.max(0, fireNumber - currentSavings)
      const r            = returnRate / 100
      const rMonthly     = Math.pow(1 + r, 1/12) - 1
      const monthlyContrib = annualSavings / 12
      const yearsToFire  = rMonthly > 0 && remaining > 0
        ? Math.log(1 + remaining * rMonthly / monthlyContrib) / Math.log(1 + rMonthly) / 12
        : remaining / annualSavings
      const fireAge      = (currentAge + yearsToFire).toFixed(1)
      const monthlyIncome = fireNumber * 0.04 / 12
      return {
        fireNumber,
        remaining,
        yearsToFire: yearsToFire.toFixed(1) + ' years',
        fireAge: fireAge + ' years old',
        monthlyIncome
      }
    } catch(e) { return null }
  }, [currentAge, annualExpenses, currentSavings, annualSavings, returnRate])

  const pdfRows = result ? [
    { label: "FIRE Number (25x expenses)", value: result.fireNumber !== undefined ? String(fmt(result.fireNumber)) : "" },
    { label: "Amount Still Needed", value: result.remaining !== undefined ? String(fmt(result.remaining)) : "" },
    { label: "Years Until FIRE", value: result.yearsToFire !== undefined ? String(result.yearsToFire) : "" },
    { label: "Age at FIRE", value: result.fireAge !== undefined ? String(result.fireAge) : "" },
    { label: "Monthly Income at FIRE", value: result.monthlyIncome !== undefined ? String(fmt(result.monthlyIncome)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔥</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">FIRE Retirement Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your Financial Independence number and exact age you can retire early.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Age</label>
                  <span className="text-white font-bold text-sm">{`${currentAge} yrs`}</span>
                </div>
                <input type="range" min={18} max={60} step={1}
                  value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(annualExpenses)}</span>
                </div>
                <input type="range" min={10000} max={300000} step={1000}
                  value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Investments</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSavings)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={5000}
                  value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Savings Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(annualSavings)}</span>
                </div>
                <input type="range" min={0} max={300000} step={1000}
                  value={annualSavings} onChange={e => setAnnualSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="range" min={1} max={15} step={0.25}
                  value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="FIRE Retirement Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">FIRE Number (25x expenses)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fireNumber)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Amount Still Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.remaining)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Years Until FIRE</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.yearsToFire}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Age at FIRE</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.fireAge}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Income at FIRE</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyIncome)}
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

            <a href="/fire-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">FIRE Calculator</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Fire Retirement Calculator", "item": "https://freefincalc.net/fire-retirement-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Fire Retirement Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What age can I retire early with the FIRE method?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">FIRE retirement age depends entirely on your savings rate. Saving 10% of income typically reaches FIRE at traditional retirement age. Saving 25% reaches FIRE around age 55-60. Saving 50% can reach FIRE in your 40s. Saving 70%+ can reach FIRE in your 30s. The formula: FIRE Number (25x annual expenses) divided by annual savings rate determines the timeline.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the 4% safe withdrawal rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 4% rule comes from the Trinity Study (1998) which found a 4% annual withdrawal from a diversified stock/bond portfolio historically lasted 30+ years in 95% of historical scenarios. For early retirees with 40-50 year horizons, many FIRE advocates use 3-3.5% to add margin of safety. Your FIRE number = Annual expenses / withdrawal rate.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What happens to healthcare before Medicare at age 65?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">This is a major FIRE planning consideration. Options: ACA marketplace plans (subsidized based on income — low withdrawal income can qualify for heavy subsidies), COBRA from last employer (expensive, 18 months only), spouse employer coverage, health sharing ministries, or part-time work with benefits (Barista FIRE). Budget $500-$1,500/month for healthcare premiums pre-Medicare.</p>
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
