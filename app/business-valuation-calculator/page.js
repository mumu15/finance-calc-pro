'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [annualRevenue, setAnnualRevenue] = useState(500000)
  const [ebitda, setEbitda] = useState(100000)
  const [netProfit, setNetProfit] = useState(75000)
  const [totalAssets, setTotalAssets] = useState(200000)
  const [totalLiabilities, setTotalLiabilities] = useState(80000)
  const [industry, setIndustry] = useState('service')

  const result = useMemo(() => {
    try {
      const multiples = {
        service: { rev: 1.0, ebitda: 4, pe: 10 },
        saas:    { rev: 4.0, ebitda: 12, pe: 20 },
        retail:  { rev: 0.5, ebitda: 5, pe:  8 },
        manufacturing: { rev: 0.8, ebitda: 6, pe: 10 },
        ecommerce: { rev: 1.5, ebitda: 8, pe: 12 },
      }
      const m = multiples[industry] || multiples.service
      const revenueVal  = annualRevenue * m.rev
      const ebitdaVal   = ebitda * m.ebitda
      const earningsVal = netProfit * m.pe
      const assetVal    = totalAssets - totalLiabilities
      const avgVal      = (revenueVal + ebitdaVal + earningsVal + assetVal) / 4
      return { revenueVal, ebitdaVal, earningsVal, assetVal, avgVal }
    } catch(e) { return null }
  }, [annualRevenue, ebitda, netProfit, totalAssets, totalLiabilities, industry])

  const pdfRows = result ? [
    { label: 'Revenue Multiple Valuation', value: result.revenueVal !== undefined ? String(fmt(result.revenueVal)) : '' },
    { label: 'EBITDA Multiple Valuation', value: result.ebitdaVal !== undefined ? String(fmt(result.ebitdaVal)) : '' },
    { label: 'Earnings (P/E) Valuation', value: result.earningsVal !== undefined ? String(fmt(result.earningsVal)) : '' },
    { label: 'Asset-Based Valuation', value: result.assetVal !== undefined ? String(fmt(result.assetVal)) : '' },
    { label: 'Average Estimated Value', value: result.avgVal !== undefined ? String(fmt(result.avgVal)) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏢</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Valuation Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate your business value using multiple methods — earnings multiples, revenue and assets.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Revenue</label>
                  <span className="text-white font-bold text-sm">{fmt(annualRevenue)}</span>
                </div>
                <input type="range" min={10000} max={50000000} step={10000}
                  value={annualRevenue} onChange={e => setAnnualRevenue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">EBITDA (annual earnings)</label>
                  <span className="text-white font-bold text-sm">{fmt(ebitda)}</span>
                </div>
                <input type="range" min={0} max={20000000} step={5000}
                  value={ebitda} onChange={e => setEbitda(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Net Profit (annual)</label>
                  <span className="text-white font-bold text-sm">{fmt(netProfit)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={5000}
                  value={netProfit} onChange={e => setNetProfit(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Business Assets</label>
                  <span className="text-white font-bold text-sm">{fmt(totalAssets)}</span>
                </div>
                <input type="range" min={0} max={20000000} step={10000}
                  value={totalAssets} onChange={e => setTotalAssets(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Liabilities</label>
                  <span className="text-white font-bold text-sm">{fmt(totalLiabilities)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={10000}
                  value={totalLiabilities} onChange={e => setTotalLiabilities(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Industry</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"service","l":"Service / Consulting"},{"v":"saas","l":"SaaS / Tech"},{"v":"retail","l":"Retail"},{"v":"manufacturing","l":"Manufacturing"},{"v":"ecommerce","l":"E-Commerce"}]).map(o => (
                    <button key={o.v} onClick={() => setIndustry(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: industry === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: industry === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: industry === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Business Valuation Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Revenue Multiple Valuation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.revenueVal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">EBITDA Multiple Valuation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.ebitdaVal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Earnings (P/E) Valuation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.earningsVal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Asset-Based Valuation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.assetVal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Average Estimated Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.avgVal)}
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

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/cash-flow-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cash Flow</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is a small business valued?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Small businesses are typically valued using: (1) EBITDA multiple (most common) — 3-8x earnings before interest, tax, depreciation, amortisation; (2) Revenue multiple — more common for high-growth or SaaS businesses; (3) Asset-based — useful for asset-heavy businesses; (4) Discounted Cash Flow (DCF) — complex but most theoretically rigorous.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What multiple is typical for selling a business?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Typical EBITDA multiples: service businesses 3-5x, SaaS 8-15x, retail 3-5x, manufacturing 4-7x, e-commerce 4-8x. Multiples rise with: strong recurring revenue, low customer concentration, proven management team, clean financials, growth trajectory and proprietary IP or brand. Multiples have compressed since 2022 as rates rose.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What makes a business worth more?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Value drivers: recurring/predictable revenue (subscriptions beat project work), diversified customer base (no single client over 15%), documented processes that work without the owner, strong margins, IP or brand moat, growth trajectory, clean books audited for 3 years, and a strong management team. Address these before any planned sale.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
