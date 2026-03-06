'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "How is stock profit calculated?",
    "a": "Stock profit = (Sell Price - Buy Price) × Shares - Fees. For example: (75 - 50) × 100 shares - $10 fees = $2,490 gross profit. Subtract capital gains tax for net profit. Use this to evaluate trades and understand true returns."
  },
  {
    "q": "What are capital gains tax rates on stocks?",
    "a": "Long-term capital gains (held over 1 year) are taxed at 0%, 15% or 20% based on income. Short-term gains (under 1 year) are taxed as ordinary income (10-37%). For most investors, holding stocks over 1 year significantly reduces the tax burden."
  },
  {
    "q": "What is the wash sale rule?",
    "a": "The wash sale rule prevents claiming a tax loss if you buy the same or substantially identical security within 30 days before or after the sale. If triggered, the loss is disallowed and added to the cost basis of the new shares. This only applies to taxable accounts, not Roth IRAs or 401ks."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [shares, setShares] = useState(100)
  const [buyPrice, setBuyPrice] = useState(50)
  const [sellPrice, setSellPrice] = useState(75)
  const [tradingFees, setTradingFees] = useState(10)
  const [taxRate, setTaxRate] = useState(15)

  const result = useMemo(() => {
    try {
      const invested = shares * buyPrice + tradingFees
      const proceeds = shares * sellPrice - tradingFees
      const grossProfit = proceeds - invested + tradingFees * 2
      const profitBeforeTax = proceeds - invested
      const taxDue = profitBeforeTax > 0 ? profitBeforeTax * (taxRate / 100) : 0
      const netProfit = profitBeforeTax - taxDue
      const roi = (profitBeforeTax / invested * 100).toFixed(2) + '%'
      const breakEven = ((invested + tradingFees) / shares).toFixed(2)
      return { invested, netProfit, roi, taxDue, breakEven }
    } catch(e) { return null }
  }, [shares, buyPrice, sellPrice, tradingFees, taxRate])

  const pdfRows = result ? [
    { label: "Total Amount Invested", value: result.invested !== undefined ? (fmt(result.invested)) : "" },
    { label: "Net Profit (after tax)", value: result.netProfit !== undefined ? (fmt(result.netProfit)) : "" },
    { label: "Return on Investment", value: result.roi !== undefined ? (String(result.roi)) : "" },
    { label: "Tax Due on Gains", value: result.taxDue !== undefined ? (fmt(result.taxDue)) : "" },
    { label: "Break-Even Price", value: result.breakEven !== undefined ? (String(result.breakEven)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Stock Profit Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate profit, loss, ROI and break-even price on any stock trade including fees.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Shares</label>
                  <span className="text-white font-bold text-sm">{shares + ' shares'}</span>
                </div>
                <input type="range" min={1} max={10000} step={1}
                  value={shares} onChange={e => setShares(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Buy Price Per Share</label>
                  <span className="text-white font-bold text-sm">{fmt(buyPrice)}</span>
                </div>
                <input type="range" min={0.01} max={5000} step={0.5}
                  value={buyPrice} onChange={e => setBuyPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Sell Price Per Share</label>
                  <span className="text-white font-bold text-sm">{fmt(sellPrice)}</span>
                </div>
                <input type="range" min={0.01} max={10000} step={0.5}
                  value={sellPrice} onChange={e => setSellPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Trading Fees</label>
                  <span className="text-white font-bold text-sm">{fmt(tradingFees)}</span>
                </div>
                <input type="range" min={0} max={500} step={5}
                  value={tradingFees} onChange={e => setTradingFees(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Capital Gains Tax Rate</label>
                  <span className="text-white font-bold text-sm">{taxRate + '%'}</span>
                </div>
                <input type="range" min={0} max={40} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Stock Profit Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Invested</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.invested)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Profit (after tax)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.netProfit)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Return on Investment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.roi}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Due on Gains</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.taxDue)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even Price</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{result.breakEven}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              ⚠️ Results are estimates for educational purposes only. Not financial advice.
              Consult a qualified professional before making financial decisions.
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/dividend-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Dividend Calculator</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is stock profit calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Stock profit = (Sell Price - Buy Price) × Shares - Fees. For example: (75 - 50) × 100 shares - $10 fees = $2,490 gross profit. Subtract capital gains tax for net profit. Use this to evaluate trades and understand true returns.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are capital gains tax rates on stocks?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Long-term capital gains (held over 1 year) are taxed at 0%, 15% or 20% based on income. Short-term gains (under 1 year) are taxed as ordinary income (10-37%). For most investors, holding stocks over 1 year significantly reduces the tax burden.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the wash sale rule?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The wash sale rule prevents claiming a tax loss if you buy the same or substantially identical security within 30 days before or after the sale. If triggered, the loss is disallowed and added to the cost basis of the new shares. This only applies to taxable accounts, not Roth IRAs or 401ks.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
