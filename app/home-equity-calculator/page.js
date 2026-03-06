'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [homeValue, setHomeValue] = useState(450000)
  const [mortgageBalance, setMortgageBalance] = useState(280000)
  const [maxLTV, setMaxLTV] = useState(85)
  const [appreciation, setAppreciation] = useState(4)
  const [projYears, setProjYears] = useState(5)

  const result = useMemo(() => {
    try {
      const equity          = homeValue - mortgageBalance
      const ltv             = (mortgageBalance / homeValue * 100).toFixed(1) + '%'
      const maxBorrow       = Math.max(0, homeValue * (maxLTV/100) - mortgageBalance)
      const futureValue     = homeValue * Math.pow(1 + appreciation/100, projYears)
      const futureEquity    = futureValue - mortgageBalance
      const equityPct       = (equity / homeValue * 100).toFixed(1) + '%'
      return { equity, ltv, maxBorrow, futureValue, futureEquity, equityPct }
    } catch(e) { return null }
  }, [homeValue, mortgageBalance, maxLTV, appreciation, projYears])

  const pdfRows = result ? [
    { label: 'Current Home Equity', value: result.equity !== undefined ? String(fmt(result.equity)) : '' },
    { label: 'Equity as % of Home Value', value: result.equityPct !== undefined ? String(result.equityPct) : '' },
    { label: 'Current LTV Ratio', value: result.ltv !== undefined ? String(result.ltv) : '' },
    { label: 'Max Amount You Can Borrow', value: result.maxBorrow !== undefined ? String(fmt(result.maxBorrow)) : '' },
    { label: 'Projected Home Value', value: result.futureValue !== undefined ? String(fmt(result.futureValue)) : '' },
    { label: 'Projected Equity', value: result.futureEquity !== undefined ? String(fmt(result.futureEquity)) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Home Equity Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your current home equity, LTV ratio and how much you could borrow.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Home Value</label>
                  <span className="text-white font-bold text-sm">{fmt(homeValue)}</span>
                </div>
                <input type="range" min={50000} max={3000000} step={5000}
                  value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Remaining Mortgage Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(mortgageBalance)}</span>
                </div>
                <input type="range" min={0} max={2000000} step={5000}
                  value={mortgageBalance} onChange={e => setMortgageBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Lender Max LTV</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":80,"l":"80%"},{"v":85,"l":"85%"},{"v":90,"l":"90%"}]).map(o => (
                    <button key={o.v} onClick={() => setMaxLTV(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: maxLTV === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: maxLTV === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: maxLTV === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Appreciation Rate</label>
                  <span className="text-white font-bold text-sm">{`${appreciation}%`}</span>
                </div>
                <input type="range" min={0} max={10} step={0.5}
                  value={appreciation} onChange={e => setAppreciation(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Projection Years</label>
                  <span className="text-white font-bold text-sm">{`${projYears} yrs`}</span>
                </div>
                <input type="range" min={1} max={15} step={1}
                  value={projYears} onChange={e => setProjYears(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Home Equity Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Home Equity</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.equity)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Equity as % of Home Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.equityPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current LTV Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.ltv}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Amount You Can Borrow</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxBorrow)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Home Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.futureValue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Equity</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.futureEquity)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or tax advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/heloc-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">HELOC Calculator</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>

            <a href="/refinance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Refinance</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Affordability</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is home equity calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Home equity = Current Market Value − Remaining Mortgage Balance. If your home is worth $450,000 and you owe $280,000, your equity is $170,000. Equity increases as you pay down the mortgage and as the home appreciates in value. It decreases if the home value drops or you take out additional loans against it.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How can I access my home equity?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Three main ways: (1) Cash-out refinance — refinance for more than you owe and pocket the difference; (2) Home Equity Loan — fixed lump sum at a fixed rate, repaid separately from your mortgage; (3) HELOC — revolving credit line at a variable rate. Each has different costs, risks and best-use cases.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the minimum equity required to avoid PMI?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Conventional lenders require 20% equity (80% LTV) to eliminate Private Mortgage Insurance (PMI), which costs $50-$200/month. You can request PMI removal once you reach 20% equity based on original value. Lenders must automatically cancel it at 22% equity. Refinancing or getting a new appraisal can accelerate PMI removal.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
