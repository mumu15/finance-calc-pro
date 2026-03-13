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
  const [currentAge, setCurrentAge] = useState(35)
  const [retireAge, setRetireAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(75000)
  const [annualIncome, setAnnualIncome] = useState(75000)
  const [savingsRate, setSavingsRate] = useState(15)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(() => {
    try {
      const yearsToRetire = retireAge - currentAge
      const annualContrib = annualIncome * (savingsRate / 100)
      const r = returnRate / 100
      const rMonthly = r / 12
      const nMonths = yearsToRetire * 12
      const monthlyContrib = annualContrib / 12
      const fvCurrent = currentSavings * Math.pow(1+r, yearsToRetire)
      const fvContribs = monthlyContrib * (Math.pow(1+rMonthly,nMonths)-1) / rMonthly
      const projectedSavings = fvCurrent + fvContribs
      const targetSavings = annualIncome * 0.80 * 25
      const onTrack = projectedSavings >= targetSavings ? 'On Track' : 'Behind - increase savings rate'
      const gap = Math.max(0, targetSavings - projectedSavings)
      return { projectedSavings, targetSavings, onTrack, gap, annualContrib, fvCurrent }
    } catch(e) { return null }
  }, [currentAge, retireAge, currentSavings, annualIncome, savingsRate, returnRate])

  const pdfRows = result ? [
    { label: "Projected Savings at Retirement", value: result.projectedSavings !== undefined ? String(fmt(result.projectedSavings)) : "" },
    { label: "Target Savings Needed", value: result.targetSavings !== undefined ? String(fmt(result.targetSavings)) : "" },
    { label: "Retirement Status", value: result.onTrack !== undefined ? String(result.onTrack) : "" },
    { label: "Savings Gap (if any)", value: result.gap !== undefined ? String(fmt(result.gap)) : "" },
    { label: "Annual Contribution", value: result.annualContrib !== undefined ? String(fmt(result.annualContrib)) : "" },
    { label: "Current Savings at Retirement", value: result.fvCurrent !== undefined ? String(fmt(result.fvCurrent)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🌅</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Retirement Savings Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much you need to save for retirement and if you are on track.</p>
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
                <input type="range" min={18} max={65} step={1}
                  value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Retirement Age</label>
                  <span className="text-white font-bold text-sm">{`${retireAge} yrs`}</span>
                </div>
                <input type="range" min={45} max={75} step={1}
                  value={retireAge} onChange={e => setRetireAge(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Retirement Savings</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSavings)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={5000}
                  value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Annual Income</label>
                  <span className="text-white font-bold text-sm">{fmt(annualIncome)}</span>
                </div>
                <input type="range" min={10000} max={500000} step={1000}
                  value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Savings Rate</label>
                  <span className="text-white font-bold text-sm">{`${savingsRate}%`}</span>
                </div>
                <input type="range" min={1} max={50} step={1}
                  value={savingsRate} onChange={e => setSavingsRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Investment Return</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="range" min={1} max={12} step={0.25}
                  value={returnRate} onChange={e =>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Retirement Savings Calculator", "item": "https://freefincalc.net/retirement-savings-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Retirement Savings Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} /> setReturnRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Retirement Savings Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Savings at Retirement</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.projectedSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Target Savings Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.targetSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Retirement Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.onTrack}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Savings Gap (if any)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.gap)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Contribution</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualContrib)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Savings at Retirement</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fvCurrent)}
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

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/401k-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💼</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">401k Calculator</h3>
            </a>

            <a href="/roth-ira-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Roth IRA</h3>
            </a>

            <a href="/fire-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">FIRE Calculator</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much do I need to retire comfortably?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The most common benchmark is 25x your annual expenses (the 4% rule). If you plan to spend $60,000/year in retirement, you need $1.5M. Fidelity suggests saving 10x your final salary by age 67. Vanguard recommends 12x. The right number depends on your lifestyle, Social Security income, pension income, healthcare costs, and how long you expect to live.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Am I saving enough for retirement?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Benchmarks by age: by 30 save 1x salary, by 40 save 3x, by 50 save 6x, by 60 save 8x, by 67 save 10x. If you are behind, increase your savings rate by 1% per year until you reach 15-20%. Catch-up contributions are allowed from age 50: extra $7,500/year in 401k, extra $1,000 in IRA. Even starting late is far better than not starting.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What order should I save for retirement?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Optimal order: (1) 401k up to employer match (free money — always capture 100%). (2) HSA if available (triple tax advantage). (3) Max Roth IRA ($7,000 limit, income restricted). (4) Max 401k ($23,000 limit). (5) Taxable brokerage for additional savings. This order minimizes lifetime taxes and maximizes every dollar saved for retirement.</p>
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
