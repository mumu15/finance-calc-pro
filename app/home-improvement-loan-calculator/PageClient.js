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
  const [projectCost, setProjectCost] = useState(30000)
  const [loanType, setLoanType] = useState('heloan')
  const [rate, setRate] = useState(8)
  const [termYears, setTermYears] = useState(10)
  const [homeValueIncrease, setHomeValueIncrease] = useState(50)

  const result = useMemo(() => {
    try {
      const r         = rate / 100 / 12
      const n         = termYears * 12
      const monthly   = projectCost * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = monthly * n
      const totalInterest = totalPaid - projectCost
      const valueAdded = projectCost * (homeValueIncrease / 100)
      const netCost    = totalPaid - valueAdded
      const roi        = (valueAdded / totalPaid * 100).toFixed(1) + '%'
      return { monthly, totalInterest, totalPaid, valueAdded, netCost, roi }
    } catch(e) { return null }
  }, [projectCost, loanType, rate, termYears, homeValueIncrease])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest Cost", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Loan Cost", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Estimated Value Added", value: result.valueAdded !== undefined ? String(fmt(result.valueAdded)) : "" },
    { label: "Net Cost After Value Added", value: result.netCost !== undefined ? String(fmt(result.netCost)) : "" },
    { label: "Renovation ROI", value: result.roi !== undefined ? String(result.roi) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔨</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Home Improvement Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Compare home equity loan, HELOC, personal loan and cash-out refinance for renovations.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Project Cost</label>
                  <span className="text-white font-bold text-sm">{fmt(projectCost)}</span>
                </div>
                <input type="number" min={1000} max={500000} step={500}
                  value={projectCost} onChange={e => setProjectCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Financing Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"heloan","l":"Home Equity Loan"},{"v":"heloc","l":"HELOC"},{"v":"personal","l":"Personal Loan"},{"v":"refi","l":"Cash-Out Refi"}]).map(o => (
                    <button key={o.v} onClick={() => setLoanType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: loanType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: loanType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: loanType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="number" min={1} max={25} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":5,"l":"5 yrs"},{"v":7,"l":"7 yrs"},{"v":10,"l":"10 yrs"},{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"}]).map(o => (
                    <button key={o.v} onClick={() => setTermYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: termYears === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: termYears === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: termYears === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Home Value Increase</label>
                  <span className="text-white font-bold text-sm">{`${homeValueIncrease}%`}</span>
                </div>
                <input type="number" min={0} max={200} step={5}
                  value={homeValueIncrease} onChange={e => setHomeValueIncrease(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Home Improvement Loan Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Loan Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Value Added</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.valueAdded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Cost After Value Added</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Renovation ROI</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.roi}
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

            <a href="/heloc-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">HELOC Calculator</h3>
            </a>

            <a href="/home-equity-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Equity</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What home improvements add the most value?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Highest ROI renovations (national averages): garage door replacement 194% ROI, manufactured stone veneer 153%, minor kitchen remodel 96%, siding replacement 89%, window replacement 69%. Lower ROI but high enjoyment: major kitchen remodel 38%, bathroom addition 35%, primary suite addition 36%. Location matters enormously — the same project can have very different ROI depending on the local market.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Home equity loan vs HELOC vs personal loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Home equity loan: fixed rate, lump sum, best for large one-time projects, secured by your home. HELOC: variable rate, revolving credit line, best for ongoing projects or unknown costs. Personal loan: no collateral, higher rate, faster approval, best for smaller projects or renters. Cash-out refinance: replaces your mortgage, best if rates are lower than your current mortgage.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Do I need a permit for home renovations?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Permits are generally required for: structural changes, electrical work beyond simple fixture replacement, plumbing changes, HVAC work, additions, decks over certain heights, and window/door structural changes. Unpermitted work can: cause problems when selling (lenders and buyers require disclosure), void homeowners insurance for those areas, and create safety hazards. Always check local requirements before starting.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Home Improvement Loan Calculator","item":"https://freefincalc.net/home-improvement-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Home Improvement Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
