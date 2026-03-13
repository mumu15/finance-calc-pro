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
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlyContrib, setMonthlyContrib] = useState(800)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [desiredIncome, setDesiredIncome] = useState(60000)
  const [inflationRate, setInflationRate] = useState(3)

  const result = useMemo(() => {
    try {
      const years      = retireAge - currentAge
      if (years <= 0) return null
      const r          = annualReturn / 100 / 12
      const n          = years * 12
      const fvSavings  = currentSavings * Math.pow(1 + annualReturn/100, years)
      const fvContribs = monthlyContrib * (Math.pow(1+r, n) - 1) / r
      const totalAtRetire = fvSavings + fvContribs
      const neededAt4pct  = desiredIncome / 0.04
      const onTrack       = totalAtRetire >= neededAt4pct
      const monthlyIncome = totalAtRetire * 0.04 / 12
      const gap           = neededAt4pct - totalAtRetire
      const addlMonthly   = gap > 0 ? gap * r / (Math.pow(1+r,n) - 1) : 0
      const status        = onTrack ? 'On Track' : 'Behind Goal'
      return { totalAtRetire, neededAt4pct, monthlyIncome, gap: Math.max(0, gap), addlMonthly: Math.max(0, addlMonthly), status }
    } catch(e) { return null }
  }, [currentAge, retireAge, currentSavings, monthlyContrib, annualReturn, desiredIncome, inflationRate])

  const pdfRows = result ? [
    { label: "Projected Retirement Savings", value: result.totalAtRetire !== undefined ? String(fmt(result.totalAtRetire)) : "" },
    { label: "Amount Needed (4% Rule)", value: result.neededAt4pct !== undefined ? String(fmt(result.neededAt4pct)) : "" },
    { label: "Monthly Income at Retirement", value: result.monthlyIncome !== undefined ? String(fmt(result.monthlyIncome)) : "" },
    { label: "Savings Gap", value: result.gap !== undefined ? String(fmt(result.gap)) : "" },
    { label: "Extra Monthly Needed", value: result.addlMonthly !== undefined ? String(fmt(result.addlMonthly)) : "" },
    { label: "Status", value: result.status !== undefined ? String(result.status) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🌅</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Retirement Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much you need to retire and whether you are on track to reach your goal.</p>
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
                <input type="range" min={18} max={70} step={1}
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
                <input type="range" min={0} max={2000000} step={5000}
                  value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Contribution</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyContrib)}</span>
                </div>
                <input type="range" min={0} max={10000} step={50}
                  value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{`${annualReturn}%`}</span>
                </div>
                <input type="range" min={1} max={15} step={0.25}
                  value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Desired Annual Retirement Income</label>
                  <span className="text-white font-bold text-sm">{fmt(desiredIncome)}</span>
                </div>
                <input type="range" min={10000} max={300000} step={1000}
                  value={desiredIncome} onChange={e => setDesiredIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Inflation Rate</label>
                  <span className="text-white font-bold text-sm">{`${inflationRate}%`}</span>
                </div>
                <input type="range" min={1} max={8} step={0.25}
                  value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Retirement Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Retirement Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalAtRetire)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Amount Needed (4% Rule)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.neededAt4pct)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Income at Retirement</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyIncome)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Savings Gap</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.gap)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Extra Monthly Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.addlMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.status}
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

            <a href="/401k-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">401k Calculator</h3>
            </a>

            <a href="/roth-ira-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Roth IRA</h3>
            </a>

            <a href="/fire-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">FIRE Calculator</h3>
            </a>

            <a href="/pension-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Pension Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much do I need to retire?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The most common benchmark is 25x your desired annual expenses (the 4% rule). To spend $60,000/year in retirement you need $1,500,000 saved. For a longer retirement (40+ years) many advisors suggest 28-33x expenses (3-3.5% withdrawal rate). Social Security and pension income reduce how much you personally need to save.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the 4% rule for retirement?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 4% rule states that withdrawing 4% of your portfolio in year one, then adjusting for inflation, has historically sustained a portfolio for 30 years in most market scenarios (based on the 1994 Trinity Study). For retirements longer than 30 years, a 3-3.5% rate is safer. The rule assumes a diversified stock/bond portfolio.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much should I save for retirement each month?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most financial advisors recommend saving 15% of gross income for retirement (including any employer match). If starting late, aim for 20-25%. At minimum, always contribute enough to get the full employer 401k match — that is an instant 50-100% return. Use this calculator to find your specific number based on your timeline and goals.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Retirement Calculator","item":"https://freefincalc.net/retirement-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Retirement Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
