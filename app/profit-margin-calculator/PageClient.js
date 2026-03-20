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
  const [revenue, setRevenue] = useState(500000)
  const [cogs, setCogs] = useState(200000)
  const [opExpenses, setOpExpenses] = useState(150000)
  const [taxes, setTaxes] = useState(30000)

  const result = useMemo(() => {
    try {
      if (revenue <= 0) return null
      const grossProfit   = revenue - cogs
      const operatingProfit = grossProfit - opExpenses
      const netProfit     = operatingProfit - taxes
      const grossMargin   = (grossProfit / revenue * 100).toFixed(2) + '%'
      const opMargin      = (operatingProfit / revenue * 100).toFixed(2) + '%'
      const netMargin     = (netProfit / revenue * 100).toFixed(2) + '%'
      return { grossProfit, grossMargin, operatingProfit, opMargin, netProfit, netMargin }
    } catch(e) { return null }
  }, [revenue, cogs, opExpenses, taxes])

  const pdfRows = result ? [
    { label: "Gross Profit", value: result.grossProfit !== undefined ? String(fmt(result.grossProfit)) : "" },
    { label: "Gross Margin %", value: result.grossMargin !== undefined ? String(result.grossMargin) : "" },
    { label: "Operating Profit", value: result.operatingProfit !== undefined ? String(fmt(result.operatingProfit)) : "" },
    { label: "Operating Margin %", value: result.opMargin !== undefined ? String(result.opMargin) : "" },
    { label: "Net Profit", value: result.netProfit !== undefined ? String(fmt(result.netProfit)) : "" },
    { label: "Net Profit Margin %", value: result.netMargin !== undefined ? String(result.netMargin) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Profit Margin Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate gross, operating and net profit margins to measure your business profitability.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Revenue</label>
                  <span className="text-white font-bold text-sm">{fmt(revenue)}</span>
                </div>
                <input type="range" min={100} max={10000000} step={100}
                  value={revenue} onChange={e => setRevenue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cost of Goods Sold (COGS)</label>
                  <span className="text-white font-bold text-sm">{fmt(cogs)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={100}
                  value={cogs} onChange={e => setCogs(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Operating Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(opExpenses)}</span>
                </div>
                <input type="range" min={0} max={3000000} step={100}
                  value={opExpenses} onChange={e => setOpExpenses(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Taxes & Interest</label>
                  <span className="text-white font-bold text-sm">{fmt(taxes)}</span>
                </div>
                <input type="range" min={0} max={1000000} step={100}
                  value={taxes} onChange={e => setTaxes(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Profit Margin Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Profit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.grossProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Margin %</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.grossMargin}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Operating Profit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.operatingProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Operating Margin %</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.opMargin}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Profit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.netProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Profit Margin %</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.netMargin}
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

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/markup-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏷️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Markup Calculator</h3>
            </a>

            <a href="/business-valuation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Valuation</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a good profit margin?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Benchmarks vary by industry. Gross margin: software 70-80%, retail 25-50%, restaurants 60-70% (food only). Net margin: tech companies 20-30%, retail 2-5%, restaurants 3-6%, healthcare 5-10%. A net margin above 10% is generally considered strong across most industries.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between gross, operating and net margin?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gross margin = (Revenue − COGS) ÷ Revenue. It measures production efficiency. Operating margin deducts operating expenses (salaries, rent, marketing) — it shows core business profitability. Net margin is the bottom line after everything including taxes and interest. Track all three to diagnose where profits are being lost.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I improve my profit margin?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Increase gross margin: raise prices, reduce COGS through better supplier negotiations or product mix. Improve operating margin: cut overhead, automate processes, reduce headcount costs. Increase net margin: minimise debt interest, optimise tax strategy. Often a combination of small wins across all three lines is more sustainable than one large cut.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Profit Margin Calculator","item":"https://www.freefincalc.net/profit-margin-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Profit Margin Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Explore More Tools</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/break-even-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Break-Even</a>
            <a href="/roi-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>ROI Calculator</a>
            <a href="/markup-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Markup</a>
            <a href="/cash-flow-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Cash Flow</a>
            <a href="/business-valuation-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Business Valuation</a>
          </div>
        </div>
      <Footer />
    </>
  )
}
