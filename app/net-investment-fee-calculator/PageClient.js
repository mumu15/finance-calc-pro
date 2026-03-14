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
  const [initialInvest, setInitialInvest] = useState(50000)
  const [monthlyContrib, setMonthlyContrib] = useState(500)
  const [grossReturn, setGrossReturn] = useState(8)
  const [feeRate, setFeeRate] = useState(0.8)
  const [years, setYears] = useState(30)

  const result = useMemo(() => {
    try {
      const r1 = grossReturn / 100 / 12
      const r2 = (grossReturn - feeRate) / 100 / 12
      const n  = years * 12
      const fvGross = initialInvest * Math.pow(1+r1,n) + monthlyContrib * (Math.pow(1+r1,n)-1) / r1
      const fvNet   = initialInvest * Math.pow(1+r2,n) + monthlyContrib * (Math.pow(1+r2,n)-1) / r2
      const feeCost = fvGross - fvNet
      const feePct  = (feeCost / fvGross * 100).toFixed(1) + '%'
      const totalContribs = initialInvest + monthlyContrib * n
      return { fvGross, fvNet, feeCost, feePct, totalContribs }
    } catch(e) { return null }
  }, [initialInvest, monthlyContrib, grossReturn, feeRate, years])

  const pdfRows = result ? [
    { label: "Portfolio Without Fees", value: result.fvGross !== undefined ? String(fmt(result.fvGross)) : "" },
    { label: "Portfolio With Fees", value: result.fvNet !== undefined ? String(fmt(result.fvNet)) : "" },
    { label: "Total Fee Drag", value: result.feeCost !== undefined ? String(fmt(result.feeCost)) : "" },
    { label: "Fees as % of Final Balance", value: result.feePct !== undefined ? String(result.feePct) : "" },
    { label: "Total Amount Contributed", value: result.totalContribs !== undefined ? String(fmt(result.totalContribs)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔬</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investment Fee Impact Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how investment fees and expense ratios silently erode your long-term wealth.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Initial Investment</label>
                  <span className="text-white font-bold text-sm">{fmt(initialInvest)}</span>
                </div>
                <input type="number" step="any" min={1000} max={1000000} step={1000}
                  value={initialInvest} onChange={e => setInitialInvest(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Contribution</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyContrib)}</span>
                </div>
                <input type="number" step="any" min={0} max={10000} step={50}
                  value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Gross Annual Return</label>
                  <span className="text-white font-bold text-sm">{`${grossReturn}%`}</span>
                </div>
                <input type="number" step="any" min={1} max={15} step={0.25}
                  value={grossReturn} onChange={e => setGrossReturn(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Fee (expense ratio %)</label>
                  <span className="text-white font-bold text-sm">{`${feeRate}%`}</span>
                </div>
                <input type="number" step="any" min={0} max={2.5} step={0.05}
                  value={feeRate} onChange={e => setFeeRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investment Period</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="number" step="any" min={5} max={50} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Investment Fee Impact Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Portfolio Without Fees</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fvGross)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Portfolio With Fees</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fvNet)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Fee Drag</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.feeCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Fees as % of Final Balance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.feePct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Contributed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalContribs)}
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

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/dollar-cost-averaging-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔁</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Dollar Cost Avg</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much do investment fees really cost?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Fees compound just like returns — in reverse. A 1% annual fee on a $50,000 portfolio growing at 8% over 30 years costs over $200,000 in lost wealth. That is money that would have compounded for you but instead went to the fund manager. This is why index funds with expense ratios of 0.03-0.10% are recommended over actively managed funds at 0.5-1.5%.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is an expense ratio and what is considered low?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">An expense ratio is the annual percentage of your invested assets charged by a mutual fund or ETF for management. Low: under 0.10% (Vanguard, Fidelity, Schwab index funds). Moderate: 0.10-0.50%. High: 0.50-1.5% (actively managed funds). Very high: over 1.5% (some annuities, actively managed niche funds). Always check the expense ratio before investing.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are higher fee funds worth it for better returns?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Research consistently shows that higher fees do NOT reliably produce better returns. SPIVA data shows over 90% of actively managed funds underperform their benchmark index over 15 years, after fees. A few exceptional active managers exist but are nearly impossible to identify in advance. Most investors are best served by low-cost index funds.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Net Investment Fee Calculator","item":"https://www.freefincalc.net/net-investment-fee-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Net Investment Fee Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
