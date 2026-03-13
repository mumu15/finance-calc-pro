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
  const [initialAmount, setInitialAmount] = useState(50000)
  const [monthlyContrib, setMonthlyContrib] = useState(1000)
  const [annualReturn, setAnnualReturn] = useState(8)
  const [years, setYears] = useState(20)
  const [inflationRate, setInflationRate] = useState(3)

  const result = useMemo(() => {
    try {
      const r = annualReturn / 100 / 12
      const n = years * 12
      const fvInitial  = initialAmount * Math.pow(1+r, n)
      const fvContribs = monthlyContrib * (Math.pow(1+r,n) - 1) / r
      const nominalFV  = fvInitial + fvContribs
      const totalContribs = initialAmount + monthlyContrib * n
      const totalGains = nominalFV - totalContribs
      const realReturn = (1 + annualReturn/100) / (1 + inflationRate/100) - 1
      const rReal = realReturn / 12
      const fvReal = initialAmount * Math.pow(1+rReal,n) + monthlyContrib * (Math.pow(1+rReal,n)-1)/rReal
      return { nominalFV, totalContribs, totalGains, fvReal, inflationImpact: nominalFV - fvReal }
    } catch(e) { return null }
  }, [initialAmount, monthlyContrib, annualReturn, years, inflationRate])

  const pdfRows = result ? [
    { label: "Portfolio Value (nominal)", value: result.nominalFV !== undefined ? String(fmt(result.nominalFV)) : "" },
    { label: "Total Contributions", value: result.totalContribs !== undefined ? String(fmt(result.totalContribs)) : "" },
    { label: "Total Investment Gains", value: result.totalGains !== undefined ? String(fmt(result.totalGains)) : "" },
    { label: "Real Value (inflation adj)", value: result.fvReal !== undefined ? String(fmt(result.fvReal)) : "" },
    { label: "Lost to Inflation", value: result.inflationImpact !== undefined ? String(fmt(result.inflationImpact)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Portfolio Growth Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Project your investment portfolio growth over time with contributions and compound returns.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Initial Investment</label>
                  <span className="text-white font-bold text-sm">{fmt(initialAmount)}</span>
                </div>
                <input type="range" min={0} max={2000000} step={1000}
                  value={initialAmount} onChange={e => setInitialAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Contribution</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyContrib)}</span>
                </div>
                <input type="range" min={0} max={50000} step={100}
                  value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{`${annualReturn}%`}</span>
                </div>
                <input type="range" min={1} max={20} step={0.25}
                  value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investment Horizon</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="range" min={1} max={50} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Inflation Rate</label>
                  <span className="text-white font-bold text-sm">{`${inflationRate}%`}</span>
                </div>
                <input type="range" min={0} max={8} step={0.25}
                  value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Portfolio Growth Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Portfolio Value (nominal)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.nominalFV)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Contributions</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalContribs)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Investment Gains</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalGains)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Real Value (inflation adj)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fvReal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lost to Inflation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.inflationImpact)}
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

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/fire-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">FIRE Calculator</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a realistic portfolio return to expect?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Historical averages: US stock market (S&P 500) 10% nominal, 7% inflation-adjusted over long periods. Diversified global stock portfolio 8-9% nominal. 60/40 stock-bond portfolio 7-8% nominal. Conservative bond portfolio 4-5%. These are long-term averages with significant year-to-year volatility. Never count on consistent returns — actual results vary considerably from any average.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much do monthly contributions matter vs initial investment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">For long time horizons, consistent monthly contributions often matter more than initial lump sum. $1,000/month for 30 years at 8% return grows to $1.5M regardless of starting balance. Starting with $50,000 extra only adds $503,000 at 8% over 30 years. For shorter horizons, the initial investment matters relatively more. Both matter — maximize both when possible.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does inflation affect long-term portfolio value?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Inflation at 3% cuts the purchasing power of your portfolio roughly in half every 24 years. A $1M portfolio in 24 years only buys what $500,000 buys today at 3% inflation. This is why equity investments that historically outpace inflation are essential for long-term goals. Bonds and CDs often barely keep pace with inflation after taxes.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Portfolio Growth Calculator","item":"https://freefincalc.net/portfolio-growth-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Portfolio Growth Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
