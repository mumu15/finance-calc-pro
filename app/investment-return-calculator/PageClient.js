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
  const [startValue, setStartValue] = useState(10000)
  const [endValue, setEndValue] = useState(18000)
  const [years, setYears] = useState(5)
  const [dividends, setDividends] = useState(1200)
  const [inflationRate, setInflationRate] = useState(3)

  const result = useMemo(() => {
    try {
      const totalGain   = endValue - startValue + dividends
      const totalReturn = (totalGain / startValue * 100).toFixed(2) + '%'
      const cagr        = ((Math.pow((endValue + dividends) / startValue, 1/years) - 1) * 100).toFixed(2)
      const realCagr    = (((1 + parseFloat(cagr)/100) / (1 + inflationRate/100) - 1) * 100).toFixed(2)
      const doublingYrs = (72 / parseFloat(cagr)).toFixed(1) + ' years'
      const inflation5yr = startValue * Math.pow(1 + inflationRate/100, years)
      const beatInflation = endValue + dividends > inflation5yr ? 'Yes' : 'No'
      return { totalGain, totalReturn, cagr: cagr + '%', realCagr: realCagr + '%', doublingYrs, beatInflation }
    } catch(e) { return null }
  }, [startValue, endValue, years, dividends, inflationRate])

  const pdfRows = result ? [
    { label: "Total Gain (incl. dividends)", value: result.totalGain !== undefined ? String(fmt(result.totalGain)) : "" },
    { label: "Total Return", value: result.totalReturn !== undefined ? String(result.totalReturn) : "" },
    { label: "CAGR (annualised return)", value: result.cagr !== undefined ? String(result.cagr) : "" },
    { label: "Real Return (after inflation)", value: result.realCagr !== undefined ? String(result.realCagr) : "" },
    { label: "Time to Double at This Rate", value: result.doublingYrs !== undefined ? String(result.doublingYrs) : "" },
    { label: "Beat Inflation?", value: result.beatInflation !== undefined ? String(result.beatInflation) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investment Return Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate total return, CAGR and compare performance across different investment scenarios.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Starting Investment Value</label>
                  <span className="text-white font-bold text-sm">{fmt(startValue)}</span>
                </div>
                <input type="number" min={100} max={1000000} step={100}
                  value={startValue} onChange={e => setStartValue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Ending Investment Value</label>
                  <span className="text-white font-bold text-sm">{fmt(endValue)}</span>
                </div>
                <input type="number" min={100} max={5000000} step={100}
                  value={endValue} onChange={e => setEndValue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investment Period</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="number" min={1} max={50} step={0.5}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Dividends Received</label>
                  <span className="text-white font-bold text-sm">{fmt(dividends)}</span>
                </div>
                <input type="number" min={0} max={500000} step={100}
                  value={dividends} onChange={e => setDividends(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Inflation Rate (for real return)</label>
                  <span className="text-white font-bold text-sm">{`${inflationRate}%`}</span>
                </div>
                <input type="number" min={0} max={10} step={0.25}
                  value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Investment Return Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Gain (incl. dividends)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalGain)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Return</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.totalReturn}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">CAGR (annualised return)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.cagr}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Real Return (after inflation)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.realCagr}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Double at This Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.doublingYrs}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Beat Inflation?</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.beatInflation}
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

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/stock-profit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Stock Profit</h3>
            </a>

            <a href="/inflation-impact-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Inflation Impact</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is CAGR and why does it matter?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">CAGR (Compound Annual Growth Rate) is the steady annual rate that would produce the same result as the actual investment over a multi-year period. It smooths out year-to-year volatility to show the true annual return. A $10,000 investment growing to $18,000 over 5 years has a CAGR of about 12.5%, regardless of how returns varied each year.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good investment return?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The S and P 500 has averaged about 10% annually (7% real after inflation) over long periods. For context: savings accounts earn 4-5%, bonds 3-6%, real estate 8-12% total return, individual stocks vary widely. A real return (above inflation) of 5-7% is considered solid for a diversified long-term portfolio.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between nominal and real return?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Nominal return is the raw percentage gain before adjusting for inflation. Real return = ((1 + nominal) / (1 + inflation) - 1). At 8% nominal with 3% inflation, real return is about 4.85%. Real return shows actual purchasing power gained. Long-term investors should focus on real returns to understand true wealth growth.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Investment Return Calculator","item":"https://www.freefincalc.net/investment-return-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Investment Return Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
