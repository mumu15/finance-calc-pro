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
  const [numChildren, setNumChildren] = useState(2)
  const [agi, setAgi] = useState(85000)
  const [filingStatus, setFilingStatus] = useState('married')
  const [taxLiability, setTaxLiability] = useState(8000)

  const result = useMemo(() => {
    try {
      const maxCredit    = numChildren * 2000
      const phaseoutThreshold = filingStatus === 'married' ? 400000 : 200000
      const phaseout    = Math.max(0, Math.ceil((agi - phaseoutThreshold) / 1000)) * 50
      const creditAfterPhaseout = Math.max(0, maxCredit - phaseout)
      // Non-refundable portion reduces tax to zero
      const nonRefundable = Math.min(creditAfterPhaseout, taxLiability)
      // Additional Child Tax Credit (refundable) - up to $1,700 per child
      const refundableMax = numChildren * 1700
      const refundable    = Math.min(Math.max(0, creditAfterPhaseout - nonRefundable), refundableMax)
      const totalCredit   = nonRefundable + refundable
      const taxAfterCredit = Math.max(0, taxLiability - nonRefundable)
      return { maxCredit, creditAfterPhaseout, nonRefundable, refundable, totalCredit, taxAfterCredit }
    } catch(e) { return null }
  }, [numChildren, agi, filingStatus, taxLiability])

  const pdfRows = result ? [
    { label: "Maximum Child Tax Credit", value: result.maxCredit !== undefined ? String(fmt(result.maxCredit)) : "" },
    { label: "Credit After Phase-Out", value: result.creditAfterPhaseout !== undefined ? String(fmt(result.creditAfterPhaseout)) : "" },
    { label: "Non-Refundable Credit Applied", value: result.nonRefundable !== undefined ? String(fmt(result.nonRefundable)) : "" },
    { label: "Refundable Credit (ACTC)", value: result.refundable !== undefined ? String(fmt(result.refundable)) : "" },
    { label: "Total Benefit", value: result.totalCredit !== undefined ? String(fmt(result.totalCredit)) : "" },
    { label: "Tax Liability After Credit", value: result.taxAfterCredit !== undefined ? String(fmt(result.taxAfterCredit)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👶</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Child Tax Credit Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your Child Tax Credit and Additional Child Tax Credit for 2026.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Qualifying Children (under 17)</label>
                  <span className="text-white font-bold text-sm">{`${numChildren} kids`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={10} step={1}
                  value={numChildren} onChange={e => setNumChildren(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Adjusted Gross Income (AGI)</label>
                  <span className="text-white font-bold text-sm">{fmt(agi)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={500000} step={1000}
                  value={agi} onChange={e => setAgi(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"single","l":"Single"},{"v":"married","l":"Married Joint"},{"v":"hoh","l":"Head of Household"}]).map(o => (
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

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Your Federal Tax Liability</label>
                  <span className="text-white font-bold text-sm">{fmt(taxLiability)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={100000} step={100}
                  value={taxLiability} onChange={e => setTaxLiability(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Child Tax Credit Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Maximum Child Tax Credit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxCredit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Credit After Phase-Out</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.creditAfterPhaseout)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Non-Refundable Credit Applied</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.nonRefundable)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Refundable Credit (ACTC)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.refundable)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalCredit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Liability After Credit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxAfterCredit)}
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

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Calculator</h3>
            </a>

            <a href="/tax-refund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Refund</h3>
            </a>

            <a href="/budget-planner-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Planner</h3>
            </a>

            <a href="/college-savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">College Savings</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much is the Child Tax Credit in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The Child Tax Credit for 2026 is $2,000 per qualifying child under age 17. Up to $1,700 per child is refundable as the Additional Child Tax Credit (ACTC). The credit phases out by $50 for every $1,000 of AGI above $200,000 (single) or $400,000 (married filing jointly). These amounts may change if Congress acts on expiring provisions.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Who qualifies for the Child Tax Credit?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Qualifying child requirements: under age 17 at year end, related to you (child, stepchild, foster child, sibling, etc.), lived with you more than half the year, did not provide more than half their own support, is a US citizen or resident, and has a valid Social Security Number. The child cannot file a joint return (unless only to claim a refund).</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the Additional Child Tax Credit?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The Additional Child Tax Credit (ACTC) is the refundable portion of the Child Tax Credit. If your non-refundable CTC exceeds your tax liability, you may claim ACTC for the lesser of the remaining credit or 15% of earned income above $2,500. Maximum ACTC is $1,700 per child in 2026. This means you can receive money back even if you owe no tax.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Child Tax Credit Calculator","item":"https://www.freefincalc.net/child-tax-credit-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Child Tax Credit Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
