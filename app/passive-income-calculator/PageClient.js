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
  const [targetMonthly, setTargetMonthly] = useState(3000)
  const [yieldRate, setYieldRate] = useState(5)
  const [incomeType, setIncomeType] = useState('dividend')
  const [taxRate, setTaxRate] = useState(20)

  const result = useMemo(() => {
    try {
      const targetAnnual   = targetMonthly * 12
      const grossNeeded    = targetAnnual / (1 - taxRate / 100)
      const portfolioNeeded = grossNeeded / (yieldRate / 100)
      const taxCost        = grossNeeded - targetAnnual
      const monthlyGross   = grossNeeded / 12
      const timeToGoal     = (portfolioNeeded / 12000).toFixed(1) + ' years (saving $1,000/mo at ' + yieldRate + '% return)'
      return { portfolioNeeded, grossNeeded, taxCost, monthlyGross, targetMonthly, timeToGoal }
    } catch(e) { return null }
  }, [targetMonthly, yieldRate, incomeType, taxRate])

  const pdfRows = result ? [
    { label: "Portfolio / Asset Value Needed", value: result.portfolioNeeded !== undefined ? String(fmt(result.portfolioNeeded)) : "" },
    { label: "Annual Gross Income Needed", value: result.grossNeeded !== undefined ? String(fmt(result.grossNeeded)) : "" },
    { label: "Annual Tax Cost", value: result.taxCost !== undefined ? String(fmt(result.taxCost)) : "" },
    { label: "Monthly Gross Income", value: result.monthlyGross !== undefined ? String(fmt(result.monthlyGross)) : "" },
    { label: "Target Monthly Net Income", value: result.targetMonthly !== undefined ? String(fmt(result.targetMonthly)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Passive Income Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much you need invested to generate your target passive income.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Monthly Passive Income</label>
                  <span className="text-white font-bold text-sm">{fmt(targetMonthly)}</span>
                </div>
                <input type="range" min={100} max={50000} step={100}
                  value={targetMonthly} onChange={e => setTargetMonthly(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Yield / Return</label>
                  <span className="text-white font-bold text-sm">{`${yieldRate}%`}</span>
                </div>
                <input type="range" min={1} max={15} step={0.25}
                  value={yieldRate} onChange={e => setYieldRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Income Source</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"dividend","l":"Dividend Stocks"},{"v":"rental","l":"Rental Property"},{"v":"bond","l":"Bonds / CDs"},{"v":"business","l":"Business / Side Income"}]).map(o => (
                    <button key={o.v} onClick={() => setIncomeType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: incomeType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: incomeType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: incomeType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Tax Rate on Passive Income</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Passive Income Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Portfolio / Asset Value Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.portfolioNeeded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Gross Income Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.grossNeeded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Tax Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Gross Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyGross)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Target Monthly Net Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.targetMonthly)}
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

            <a href="/dividend-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Dividend</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are the best sources of passive income?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Top passive income sources ranked by typical yield: dividend stocks 2-6%, REITs 4-8%, rental property 5-10% cash-on-cash, high-yield savings and CDs 4-5.5%, peer-to-peer lending 5-9% (higher risk), bonds 4-6%, covered calls on stocks 8-15% (requires active management), and digital products (highest potential but requires upfront work to create).</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much do I need invested to live off passive income?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">At a 4% withdrawal rate (the FIRE standard) you need 25x your annual expenses. For $3,000/month ($36,000/year) net you need approximately $900,000-$1,200,000 invested depending on tax rate and yield. With dividend stocks at 4% yield you need $900,000. With bonds at 5% yield you need $720,000 gross. Tax-advantaged accounts (Roth IRA) reduce the gross amount needed.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is rental property good passive income?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Rental property generates 5-10% cash-on-cash returns but is not truly passive — it requires tenant management, maintenance, and occasional large capital expenditures. Professional management costs 8-12% of rent. REITs provide similar real estate exposure with true passive income: no tenants, no maintenance, fully liquid, and dividends paid quarterly. For most investors REITs are more practical than direct ownership.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Passive Income Calculator","item":"https://freefincalc.net/passive-income-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Passive Income Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
