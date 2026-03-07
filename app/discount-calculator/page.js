'use client'
export { metadata } from './metadata'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [originalPrice, setOriginalPrice] = useState(120)
  const [discountPct, setDiscountPct] = useState(25)
  const [taxRate, setTaxRate] = useState(8)
  const [qty, setQty] = useState(1)

  const result = useMemo(() => {
    try {
      const discountAmt  = originalPrice * (discountPct / 100)
      const salePrice    = originalPrice - discountAmt
      const taxAmount    = salePrice * (taxRate / 100)
      const finalPrice   = salePrice + taxAmount
      const totalSavings = discountAmt * qty
      const totalFinal   = finalPrice * qty
      const totalOriginal= (originalPrice + originalPrice * taxRate / 100) * qty
      return { discountAmt, salePrice, taxAmount, finalPrice, totalSavings, totalFinal, totalOriginal }
    } catch(e) { return null }
  }, [originalPrice, discountPct, taxRate, qty])

  const pdfRows = result ? [
    { label: "Discount Amount", value: result.discountAmt !== undefined ? String(fmt(result.discountAmt)) : "" },
    { label: "Sale Price (before tax)", value: result.salePrice !== undefined ? String(fmt(result.salePrice)) : "" },
    { label: "Tax Amount", value: result.taxAmount !== undefined ? String(fmt(result.taxAmount)) : "" },
    { label: "Final Price Per Unit", value: result.finalPrice !== undefined ? String(fmt(result.finalPrice)) : "" },
    { label: "Total Savings", value: result.totalSavings !== undefined ? String(fmt(result.totalSavings)) : "" },
    { label: "Total Final Price", value: result.totalFinal !== undefined ? String(fmt(result.totalFinal)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discount Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate sale price, savings amount and percentage off for any discount.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Original Price</label>
                  <span className="text-white font-bold text-sm">{fmt(originalPrice)}</span>
                </div>
                <input type="range" min={0.01} max={100000} step={0.01}
                  value={originalPrice} onChange={e => setOriginalPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Discount Percentage</label>
                  <span className="text-white font-bold text-sm">{`${discountPct}%`}</span>
                </div>
                <input type="range" min={0} max={100} step={0.5}
                  value={discountPct} onChange={e => setDiscountPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Sales Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="range" min={0} max={15} step={0.25}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Quantity</label>
                  <span className="text-white font-bold text-sm">{`${qty} units`}</span>
                </div>
                <input type="range" min={1} max={1000} step={1}
                  value={qty} onChange={e => setQty(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Discount Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Discount Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.discountAmt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Sale Price (before tax)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.salePrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Final Price Per Unit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.finalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Final Price</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalFinal)}
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

            <a href="/markup-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏷️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Markup Calculator</h3>
            </a>

            <a href="/sales-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Sales Tax</h3>
            </a>

            <a href="/tip-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tip Calculator</h3>
            </a>

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I calculate percent off?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Percent off = (Discount Amount / Original Price) x 100. For a $30 discount on a $120 item: $30 / $120 x 100 = 25% off. To find the sale price: Sale Price = Original Price x (1 - Discount%). For 25% off $120: $120 x 0.75 = $90. Always calculate the final price including sales tax to know true cost before purchasing.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are stacked discounts the same as adding percentages?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">No — stacked discounts multiply, not add. A 20% off coupon applied to a 30% off sale is not 50% off. You first pay 70% of original price, then 80% of that: 0.70 x 0.80 = 0.56, so 44% off total. This matters when comparing bundle deals. Always calculate step by step when combining multiple discounts.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the best day to shop for discounts?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Historically best discount periods: Black Friday / Cyber Monday (electronics, appliances — 20-40% off), Amazon Prime Day (July — similar savings), end of season clearance (clothing — 50-70% off), holiday weekends (Memorial Day, Labor Day — furniture, mattresses, appliances), and end of model year for cars (August-October when dealers clear inventory).</p>
            </div>
          </div>
        </div>
      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
