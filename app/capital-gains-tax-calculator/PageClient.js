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
  const [salePrice, setSalePrice] = useState(50000)
  const [costBasis, setCostBasis] = useState(20000)
  const [holdingPeriod, setHoldingPeriod] = useState('long')
  const [annualIncome, setAnnualIncome] = useState(85000)
  const [filingStatus, setFilingStatus] = useState('single')

  const result = useMemo(() => {
    try {
      const gain = Math.max(0, salePrice - costBasis)
      let taxRate
      if (holdingPeriod === 'short') {
        // Taxed as ordinary income — approximate marginal rate
        taxRate = annualIncome > 609350 ? 0.37 : annualIncome > 243725 ? 0.35 : annualIncome > 191950 ? 0.32 : annualIncome > 100525 ? 0.24 : annualIncome > 47150 ? 0.22 : annualIncome > 11600 ? 0.12 : 0.10
      } else {
        // Long-term rates for 2026
        const ltThresh = filingStatus === 'married' ? [0, 94050, 583750] : [0, 47025, 518900]
        taxRate = annualIncome > ltThresh[2] ? 0.20 : annualIncome > ltThresh[1] ? 0.15 : 0.00
      }
      // Net Investment Income Tax (3.8%) on high earners
      const niitThresh = filingStatus === 'married' ? 250000 : 200000
      const niit = annualIncome > niitThresh ? gain * 0.038 : 0
      const taxDue = gain * taxRate + niit
      const netProfit = salePrice - costBasis - taxDue
      const effectiveGainRate = gain > 0 ? (taxDue / gain * 100).toFixed(1) + '%' : '0%'
      return { gain, taxRate: (taxRate * 100).toFixed(0) + '%', taxDue, niit, netProfit, effectiveGainRate }
    } catch(e) { return null }
  }, [salePrice, costBasis, holdingPeriod, annualIncome, filingStatus])

  const pdfRows = result ? [
    { label: "Capital Gain", value: result.gain !== undefined ? String(fmt(result.gain)) : "" },
    { label: "Applicable Tax Rate", value: result.taxRate !== undefined ? String(result.taxRate) : "" },
    { label: "Capital Gains Tax Due", value: result.taxDue !== undefined ? String(fmt(result.taxDue)) : "" },
    { label: "Net Investment Income Tax", value: result.niit !== undefined ? String(fmt(result.niit)) : "" },
    { label: "Net Profit After Tax", value: result.netProfit !== undefined ? String(fmt(result.netProfit)) : "" },
    { label: "Effective Rate on Gain", value: result.effectiveGainRate !== undefined ? String(result.effectiveGainRate) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📈</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Capital Gains Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate short-term and long-term capital gains tax on stocks, real estate and other assets.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Sale Price</label>
                  <span className="text-white font-bold text-sm">{fmt(salePrice)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={500}
                  value={salePrice} onChange={e => setSalePrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cost Basis (original price)</label>
                  <span className="text-white font-bold text-sm">{fmt(costBasis)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={500}
                  value={costBasis} onChange={e => setCostBasis(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Holding Period</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"short","l":"Short-Term (under 1 year)"},{"v":"long","l":"Long-Term (1 year or more)"}]).map(o => (
                    <button key={o.v} onClick={() => setHoldingPeriod(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: holdingPeriod === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: holdingPeriod === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: holdingPeriod === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Taxable Income</label>
                  <span className="text-white font-bold text-sm">{fmt(annualIncome)}</span>
                </div>
                <input type="range" min={0} max={1000000} step={1000}
                  value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"single","l":"Single"},{"v":"married","l":"Married Joint"}]).map(o => (
                    <button key={o.v} onClick={() => setFilingStatus(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: filingStatus === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: filingStatus === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: filingStatus === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Capital Gains Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Capital Gain</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.gain)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Applicable Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.taxRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Capital Gains Tax Due</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxDue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Investment Income Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.niit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Profit After Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Rate on Gain</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveGainRate}
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

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Income Tax</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/stock-profit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Stock Profit</h3>
            </a>

            <a href="/tax-refund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Refund</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the long-term capital gains tax rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Long-term capital gains rates for 2026: 0% for taxable income up to $47,025 (single) or $94,050 (married). 15% for income up to $518,900 (single) or $583,750 (married). 20% above those thresholds. Assets must be held more than 12 months to qualify. High earners also pay a 3.8% Net Investment Income Tax on top.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I avoid or reduce capital gains tax?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Strategies: hold assets over 12 months to qualify for long-term rates, harvest tax losses to offset gains, donate appreciated assets to charity (avoid tax entirely), use 1031 exchanges for real estate, contribute gains to Opportunity Zone funds (deferral), use Roth accounts for high-growth investments, and time sales in low-income years when you may qualify for the 0% rate.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does selling my home trigger capital gains tax?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Primary residence exclusion: single filers can exclude up to $250,000 of gain, married filers up to $500,000, if you owned and lived in the home for at least 2 of the last 5 years. Gain above the exclusion is taxed at long-term capital gains rates. Investment properties do not get the exclusion but may qualify for 1031 exchange tax deferral.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Capital Gains Tax Calculator","item":"https://www.freefincalc.net/capital-gains-tax-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Capital Gains Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/how-to-lower-tax-bill" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How to Lower Your Tax Bill</a>
        </div>
      <Footer />
    </>
  )
}
