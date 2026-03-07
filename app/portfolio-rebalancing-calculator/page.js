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
  const [stocks, setStocks] = useState(70000)
  const [bonds, setBonds] = useState(20000)
  const [cash, setCash] = useState(10000)
  const [tgtStocks, setTgtStocks] = useState(70)
  const [tgtBonds, setTgtBonds] = useState(20)

  const result = useMemo(() => {
    try {
      const total      = stocks + bonds + cash
      if (total <= 0) return null
      const tgtCash    = 100 - tgtStocks - tgtBonds
      const wantStocks = total * (tgtStocks / 100)
      const wantBonds  = total * (tgtBonds  / 100)
      const wantCash   = total * (tgtCash   / 100)
      const adjStocks  = wantStocks - stocks
      const adjBonds   = wantBonds  - bonds
      const adjCash    = wantCash   - cash
      const fmt2 = v => (v >= 0 ? '+' : '') + Math.round(v).toLocaleString()
      return {
        total,
        adjStocks: fmt2(adjStocks),
        adjBonds:  fmt2(adjBonds),
        adjCash:   fmt2(adjCash),
        curStocksPct: (stocks / total * 100).toFixed(1) + '%',
        curBondsPct:  (bonds  / total * 100).toFixed(1) + '%',
      }
    } catch(e) { return null }
  }, [stocks, bonds, cash, tgtStocks, tgtBonds])

  const pdfRows = result ? [
    { label: "Total Portfolio Value", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Stocks Adjustment (+ buy / - sell)", value: result.adjStocks !== undefined ? String(result.adjStocks) : "" },
    { label: "Bonds Adjustment (+ buy / - sell)", value: result.adjBonds !== undefined ? String(result.adjBonds) : "" },
    { label: "Cash Adjustment (+ add / - reduce)", value: result.adjCash !== undefined ? String(result.adjCash) : "" },
    { label: "Current Stocks Allocation", value: result.curStocksPct !== undefined ? String(result.curStocksPct) : "" },
    { label: "Current Bonds Allocation", value: result.curBondsPct !== undefined ? String(result.curBondsPct) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚖️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Portfolio Rebalancing Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find out exactly how much to buy or sell to rebalance your portfolio to target allocations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Stocks Value</label>
                  <span className="text-white font-bold text-sm">{fmt(stocks)}</span>
                </div>
                <input type="range" min={0} max={1000000} step={500}
                  value={stocks} onChange={e => setStocks(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Bonds Value</label>
                  <span className="text-white font-bold text-sm">{fmt(bonds)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={bonds} onChange={e => setBonds(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Cash / Other</label>
                  <span className="text-white font-bold text-sm">{fmt(cash)}</span>
                </div>
                <input type="range" min={0} max={200000} step={500}
                  value={cash} onChange={e => setCash(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Stocks Allocation</label>
                  <span className="text-white font-bold text-sm">{`${tgtStocks}%`}</span>
                </div>
                <input type="range" min={0} max={100} step={5}
                  value={tgtStocks} onChange={e => setTgtStocks(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Bonds Allocation</label>
                  <span className="text-white font-bold text-sm">{`${tgtBonds}%`}</span>
                </div>
                <input type="range" min={0} max={100} step={5}
                  value={tgtBonds} onChange={e => setTgtBonds(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Portfolio Rebalancing Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Portfolio Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Stocks Adjustment (+ buy / - sell)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.adjStocks}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Bonds Adjustment (+ buy / - sell)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.adjBonds}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cash Adjustment (+ add / - reduce)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.adjCash}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Stocks Allocation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.curStocksPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Bonds Allocation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.curBondsPct}
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

            <a href="/401k-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">401k Calculator</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How often should I rebalance my portfolio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most financial advisors recommend rebalancing annually or when any asset class drifts more than 5% from target. Calendar rebalancing (once a year, same date) is simple and effective. Threshold rebalancing (triggered by drift) is more precise. Tax-advantaged accounts (IRA, 401k) are ideal for rebalancing since there are no tax consequences for selling.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the right asset allocation?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Classic rules of thumb: subtract your age from 110-120 to get your stock percentage (age 35 = 75-85% stocks). Vanguard Target Date funds use roughly 90% stocks at age 25, declining to 50% by retirement. Your allocation depends on risk tolerance, time horizon and other income sources. More stocks = higher expected return with more volatility.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does rebalancing improve returns?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Rebalancing does not reliably improve raw returns, but it enforces buy low, sell high discipline and controls risk. It prevents your portfolio from becoming dangerously concentrated in one asset class after a long bull run. Studies show rebalanced portfolios have meaningfully lower volatility than drifting portfolios, which matters most near retirement.</p>
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
