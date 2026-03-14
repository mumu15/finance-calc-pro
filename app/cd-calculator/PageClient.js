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
  const [principal, setPrincipal] = useState(10000)
  const [apy, setApy] = useState(5)
  const [termMonths, setTermMonths] = useState(12)
  const [compFreq, setCompFreq] = useState(12)
  const [taxRate, setTaxRate] = useState(22)

  const result = useMemo(() => {
    try {
      const r         = apy / 100 / compFreq
      const n         = termMonths / 12 * compFreq
      const maturity  = principal * Math.pow(1 + r, n)
      const interest  = maturity - principal
      const afterTax  = maturity - interest * (taxRate / 100)
      const afterTaxInterest = interest * (1 - taxRate / 100)
      const effectiveAPY = (Math.pow(1 + apy/100/compFreq, compFreq) - 1) * 100
      const months    = termMonths
      return { maturity, interest, afterTax, afterTaxInterest, effectiveAPY: effectiveAPY.toFixed(3) + '%', months: months + ' months' }
    } catch(e) { return null }
  }, [principal, apy, termMonths, compFreq, taxRate])

  const pdfRows = result ? [
    { label: "Maturity Value", value: result.maturity !== undefined ? String(fmt(result.maturity)) : "" },
    { label: "Interest Earned", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "After-Tax Maturity Value", value: result.afterTax !== undefined ? String(fmt(result.afterTax)) : "" },
    { label: "After-Tax Interest", value: result.afterTaxInterest !== undefined ? String(fmt(result.afterTaxInterest)) : "" },
    { label: "Effective APY", value: result.effectiveAPY !== undefined ? String(result.effectiveAPY) : "" },
    { label: "CD Term", value: result.months !== undefined ? String(result.months) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">CD Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate Certificate of Deposit earnings, APY and maturity value for any term.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Initial Deposit</label>
                  <span className="text-white font-bold text-sm">{fmt(principal)}</span>
                </div>
                <input type="text" inputMode="decimal" min={500} max={1000000} step={100}
                  value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Percentage Yield (APY)</label>
                  <span className="text-white font-bold text-sm">{`${apy}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0.01} max={10} step={0.05}
                  value={apy} onChange={e => setApy(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">CD Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":3,"l":"3 months"},{"v":6,"l":"6 months"},{"v":9,"l":"9 months"},{"v":12,"l":"12 months"},{"v":18,"l":"18 months"},{"v":24,"l":"24 months"},{"v":36,"l":"36 months"},{"v":60,"l":"60 months"}]).map(o => (
                    <button key={o.v} onClick={() => setTermMonths(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: termMonths === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: termMonths === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: termMonths === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Compounding Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":365,"l":"Daily"},{"v":12,"l":"Monthly"},{"v":4,"l":"Quarterly"},{"v":1,"l":"Annually"}]).map(o => (
                    <button key={o.v} onClick={() => setCompFreq(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: compFreq === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: compFreq === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: compFreq === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Marginal Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={45} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="CD Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Maturity Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maturity)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">After-Tax Maturity Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.afterTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">After-Tax Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.afterTaxInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective APY</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveAPY}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">CD Term</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
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

            <a href="/savings-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Interest</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are CDs worth it in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">CDs are worth considering when: you have cash you will not need for the CD term, you want guaranteed returns without market risk, and CD rates exceed high-yield savings account rates. In 2026, competitive CD rates range from 4-5.5% APY. The trade-off is liquidity — early withdrawal penalties (typically 3-6 months of interest) apply if you need the funds before maturity.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a CD ladder strategy?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A CD ladder splits your investment across multiple CDs with staggered maturities. For example: 25% in a 1-year CD, 25% in 2-year, 25% in 3-year, 25% in 4-year CD. As each matures, reinvest in a new 4-year CD. This provides liquidity every year while capturing longer-term rates. It eliminates the risk of locking up all your money when rates later increase.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is CD interest taxed?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">CD interest is taxed as ordinary income in the year it is earned, even if you do not withdraw it (for multi-year CDs, you owe tax on accrued interest annually). This differs from stocks where you control when gains are realized. Consider holding CDs in tax-advantaged accounts (IRA, HSA) if you are in a high tax bracket to defer or eliminate the tax on interest.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Cd Calculator","item":"https://www.freefincalc.net/cd-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Cd Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
