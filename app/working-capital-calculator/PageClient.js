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
  const [cash, setCash] = useState(100000)
  const [receivables, setReceivables] = useState(80000)
  const [inventory, setInventory] = useState(60000)
  const [otherCurrentA, setOtherCurrentA] = useState(10000)
  const [payables, setPayables] = useState(50000)
  const [shortTermDebt, setShortTermDebt] = useState(40000)

  const result = useMemo(() => {
    try {
      const currentAssets      = cash + receivables + inventory + otherCurrentA
      const currentLiabilities = payables + shortTermDebt
      const workingCapital     = currentAssets - currentLiabilities
      const currentRatio       = (currentAssets / currentLiabilities).toFixed(2)
      const quickRatio         = ((cash + receivables) / currentLiabilities).toFixed(2)
      const cashRatio          = (cash / currentLiabilities).toFixed(2)
      const wcRatio            = workingCapital > 0 ? 'Positive - Healthy' : 'Negative - At Risk'
      return { currentAssets, currentLiabilities, workingCapital, currentRatio, quickRatio, cashRatio, wcRatio }
    } catch(e) { return null }
  }, [cash, receivables, inventory, otherCurrentA, payables, shortTermDebt])

  const pdfRows = result ? [
    { label: "Total Current Assets", value: result.currentAssets !== undefined ? String(fmt(result.currentAssets)) : "" },
    { label: "Total Current Liabilities", value: result.currentLiabilities !== undefined ? String(fmt(result.currentLiabilities)) : "" },
    { label: "Net Working Capital", value: result.workingCapital !== undefined ? String(fmt(result.workingCapital)) : "" },
    { label: "Current Ratio", value: result.currentRatio !== undefined ? String(result.currentRatio) : "" },
    { label: "Quick Ratio", value: result.quickRatio !== undefined ? String(result.quickRatio) : "" },
    { label: "Cash Ratio", value: result.cashRatio !== undefined ? String(result.cashRatio) : "" },
    { label: "Working Capital Status", value: result.wcRatio !== undefined ? String(result.wcRatio) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Working Capital Calculator", "item": "https://freefincalc.net/working-capital-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Working Capital Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚙️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Working Capital Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate working capital, current ratio and liquidity metrics for your business.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cash and Cash Equivalents</label>
                  <span className="text-white font-bold text-sm">{fmt(cash)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={1000}
                  value={cash} onChange={e => setCash(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Accounts Receivable</label>
                  <span className="text-white font-bold text-sm">{fmt(receivables)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={1000}
                  value={receivables} onChange={e => setReceivables(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Inventory</label>
                  <span className="text-white font-bold text-sm">{fmt(inventory)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={1000}
                  value={inventory} onChange={e => setInventory(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other Current Assets</label>
                  <span className="text-white font-bold text-sm">{fmt(otherCurrentA)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={1000}
                  value={otherCurrentA} onChange={e => setOtherCurrentA(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Accounts Payable</label>
                  <span className="text-white font-bold text-sm">{fmt(payables)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={1000}
                  value={payables} onChange={e => setPayables(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Short-Term Debt and Accruals</label>
                  <span className="text-white font-bold text-sm">{fmt(shortTermDebt)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={1000}
                  value={shortTermDebt} onChange={e => setShortTermDebt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Working Capital Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Current Assets</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.currentAssets)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Current Liabilities</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.currentLiabilities)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Working Capital</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.workingCapital)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.currentRatio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Quick Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.quickRatio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cash Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.cashRatio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Working Capital Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.wcRatio}
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

            <a href="/cash-flow-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cash Flow</h3>
            </a>

            <a href="/accounts-receivable-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📬</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">AR Calculator</h3>
            </a>

            <a href="/business-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Loan</h3>
            </a>

            <a href="/debt-service-coverage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Coverage</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is working capital?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Working capital = Current Assets minus Current Liabilities. It measures a business ability to cover short-term obligations with short-term assets. Positive working capital means you can pay bills and still have assets left. Negative working capital means current liabilities exceed current assets — a warning sign unless the business model (like retail) naturally runs negative.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good current ratio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A current ratio between 1.5 and 2.0 is generally considered healthy. Below 1.0 means current liabilities exceed current assets (potential liquidity crisis). Above 3.0 may indicate inefficient use of assets (too much cash sitting idle). The quick ratio (excludes inventory) is more stringent — above 1.0 is considered safe for most businesses.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I improve working capital?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Strategies: accelerate collections (reduce DSO), negotiate longer payment terms with suppliers (extend DPO), reduce inventory levels with just-in-time ordering, convert short-term debt to long-term financing, increase sales with faster inventory turnover, or raise equity capital. Improving working capital reduces the need for short-term borrowing and improves creditworthiness.</p>
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
