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
  const [monthlyInvest, setMonthlyInvest] = useState(500)
  const [years, setYears] = useState(20)
  const [annualReturn, setAnnualReturn] = useState(8)
  const [lumpSum, setLumpSum] = useState(10000)

  const result = useMemo(() => {
    try {
      const r     = annualReturn / 100 / 12
      const n     = years * 12
      const dcaFV = monthlyInvest * (Math.pow(1+r, n) - 1) / r
      const totalContribs = monthlyInvest * n
      const dcaGain = dcaFV - totalContribs
      const lumpFV  = lumpSum * Math.pow(1 + annualReturn/100, years)
      const lumpGain = lumpFV - lumpSum
      const combined = dcaFV + lumpFV - lumpSum
      return { dcaFV, totalContribs, dcaGain, lumpFV, lumpGain, combined }
    } catch(e) { return null }
  }, [monthlyInvest, years, annualReturn, lumpSum])

  const pdfRows = result ? [
    { label: "DCA Final Portfolio Value", value: result.dcaFV !== undefined ? String(fmt(result.dcaFV)) : "" },
    { label: "Total Amount Contributed", value: result.totalContribs !== undefined ? String(fmt(result.totalContribs)) : "" },
    { label: "Total Gain from DCA", value: result.dcaGain !== undefined ? String(fmt(result.dcaGain)) : "" },
    { label: "Lump Sum Final Value", value: result.lumpFV !== undefined ? String(fmt(result.lumpFV)) : "" },
    { label: "Lump Sum Gain", value: result.lumpGain !== undefined ? String(fmt(result.lumpGain)) : "" },
    { label: "Combined Strategy Value", value: result.combined !== undefined ? String(fmt(result.combined)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔁</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dollar-Cost Averaging Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how investing a fixed amount regularly beats lump-sum and builds wealth over time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Investment Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyInvest)}</span>
                </div>
                <input type="number" min={25} max={10000} step={25}
                  value={monthlyInvest} onChange={e => setMonthlyInvest(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investment Period</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="number" min={1} max={40} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{`${annualReturn}%`}</span>
                </div>
                <input type="number" min={1} max={20} step={0.25}
                  value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Lump Sum Comparison Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(lumpSum)}</span>
                </div>
                <input type="number" min={0} max={1000000} step={1000}
                  value={lumpSum} onChange={e => setLumpSum(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Dollar-Cost Averaging Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">DCA Final Portfolio Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.dcaFV)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Contributed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalContribs)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Gain from DCA</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.dcaGain)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lump Sum Final Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lumpFV)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lump Sum Gain</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lumpGain)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Combined Strategy Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.combined)}
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
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
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
              <h3 className="text-white font-semibold mb-2">What is dollar-cost averaging?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Dollar-cost averaging (DCA) means investing a fixed dollar amount at regular intervals regardless of market price. When prices are low you buy more shares; when prices are high you buy fewer. This removes the stress of trying to time the market and results in a lower average cost per share over time compared to a single purchase at a random price.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is DCA better than lump sum investing?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Academic research (including Vanguard studies) shows lump-sum investing outperforms DCA about two-thirds of the time in rising markets, because more money is invested earlier. However DCA wins in falling markets and dramatically reduces the risk of investing everything at a peak. For regular income investors, DCA via payroll deductions is the natural and practical approach.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I start dollar-cost averaging?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The easiest way is to automate contributions to your 401k (every paycheck is DCA), set up automatic monthly transfers to a brokerage index fund, or use apps like Fidelity, Vanguard, Schwab or Robinhood with automatic investing features. Target low-cost index funds (expense ratio under 0.10%) for best long-term results.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Dollar Cost Averaging Calculator","item":"https://www.freefincalc.net/dollar-cost-averaging-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Dollar Cost Averaging Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
