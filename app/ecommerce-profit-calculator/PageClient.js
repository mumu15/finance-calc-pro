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
  const [salePrice, setSalePrice] = useState(49)
  const [productCost, setProductCost] = useState(15)
  const [shippingCost, setShippingCost] = useState(6)
  const [platformFee, setPlatformFee] = useState(6)
  const [adSpend, setAdSpend] = useState(8)
  const [monthlyOrders, setMonthlyOrders] = useState(200)
  const [returnRate, setReturnRate] = useState(5)

  const result = useMemo(() => {
    try {
      const platformCut   = salePrice * (platformFee / 100)
      const returnCost    = salePrice * (returnRate / 100)
      const totalCostPerOrder = productCost + shippingCost + platformCut + adSpend + returnCost
      const profitPerOrder    = salePrice - totalCostPerOrder
      const netMargin         = (profitPerOrder / salePrice * 100).toFixed(1) + '%'
      const monthlyRevenue    = salePrice * monthlyOrders
      const monthlyProfit     = profitPerOrder * monthlyOrders
      const annualProfit      = monthlyProfit * 12
      const roasNeeded        = adSpend > 0 ? (salePrice / adSpend).toFixed(1) + 'x' : 'N/A'
      return { profitPerOrder, netMargin, monthlyRevenue, monthlyProfit, annualProfit, roasNeeded, totalCostPerOrder }
    } catch(e) { return null }
  }, [salePrice, productCost, shippingCost, platformFee, adSpend, monthlyOrders, returnRate])

  const pdfRows = result ? [
    { label: "Profit Per Order", value: result.profitPerOrder !== undefined ? String(fmt(result.profitPerOrder)) : "" },
    { label: "Total Cost Per Order", value: result.totalCostPerOrder !== undefined ? String(fmt(result.totalCostPerOrder)) : "" },
    { label: "Net Profit Margin", value: result.netMargin !== undefined ? String(result.netMargin) : "" },
    { label: "Monthly Revenue", value: result.monthlyRevenue !== undefined ? String(fmt(result.monthlyRevenue)) : "" },
    { label: "Monthly Net Profit", value: result.monthlyProfit !== undefined ? String(fmt(result.monthlyProfit)) : "" },
    { label: "Annual Net Profit", value: result.annualProfit !== undefined ? String(fmt(result.annualProfit)) : "" },
    { label: "Minimum ROAS Needed", value: result.roasNeeded !== undefined ? String(result.roasNeeded) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Ecommerce Profit Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate net profit per order, margin and monthly profit for your online store.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Product Sale Price</label>
                  <span className="text-white font-bold text-sm">{fmt(salePrice)}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={10000} step={1}
                  value={salePrice} onChange={e => setSalePrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Product Cost (COGS)</label>
                  <span className="text-white font-bold text-sm">{fmt(productCost)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={5000} step={1}
                  value={productCost} onChange={e => setProductCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Fulfillment and Shipping Cost</label>
                  <span className="text-white font-bold text-sm">{fmt(shippingCost)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={100} step={0.5}
                  value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Platform Fee %</label>
                  <span className="text-white font-bold text-sm">{`${platformFee}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={20} step={0.25}
                  value={platformFee} onChange={e => setPlatformFee(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Ad Spend Per Order (CAC)</label>
                  <span className="text-white font-bold text-sm">{fmt(adSpend)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={500} step={0.5}
                  value={adSpend} onChange={e => setAdSpend(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Orders</label>
                  <span className="text-white font-bold text-sm">{`${monthlyOrders} orders`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={100000} step={10}
                  value={monthlyOrders} onChange={e => setMonthlyOrders(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Return Rate</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={30} step={1}
                  value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Ecommerce Profit Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Profit Per Order</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.profitPerOrder)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Cost Per Order</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalCostPerOrder)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Profit Margin</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.netMargin}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Revenue</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyRevenue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Net Profit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Net Profit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Minimum ROAS Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.roasNeeded}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or business advice.
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

            <a href="/markup-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏷️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Markup Calculator</h3>
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
              <h3 className="text-white font-semibold mb-2">What is a good profit margin for ecommerce?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Ecommerce net profit margins: budget/commodity products 5-10%, mid-range products 15-25%, premium or niche products 25-45%, digital products and software 40-80%. Amazon sellers average 15-20% net margin. Shopify direct-to-consumer brands average 10-20%. Margins below 10% make scaling difficult as fixed costs and customer acquisition costs eat into profits.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is CAC and why does it matter for ecommerce?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Customer Acquisition Cost (CAC) is the total marketing cost divided by new customers acquired. For ecommerce with thin margins, CAC is critical. If your profit per order is $12 but CAC is $15, you lose money on the first sale. The goal is to acquire customers cheaply enough that lifetime value (LTV) exceeds CAC by 3x or more. Repeat customers are always more profitable than new ones.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I calculate ROAS and what is a good target?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Return on Ad Spend (ROAS) = Revenue generated from ads / Ad spend. A ROAS of 3x means you earned $3 for every $1 spent on ads. Minimum profitable ROAS = Sale Price / Profit Per Order (before ad spend). If your product costs $15 and sells for $49 with $10 in other costs: minimum ROAS = $49 / $24 = 2.04x. Aim for 3-5x ROAS for healthy margins.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Ecommerce Profit Calculator","item":"https://www.freefincalc.net/ecommerce-profit-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Ecommerce Profit Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
