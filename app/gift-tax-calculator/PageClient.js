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
  const [giftAmount, setGiftAmount] = useState(50000)
  const [numRecipients, setNumRecipients] = useState(1)
  const [priorLifetime, setPriorLifetime] = useState(0)
  const [filingStatus, setFilingStatus] = useState('individual')

  const result = useMemo(() => {
    try {
      const ANNUAL_EXCL  = 18000
      const LIFETIME     = 13610000
      const annualExcl   = ANNUAL_EXCL * numRecipients * (filingStatus === 'married' ? 2 : 1)
      const taxableGift  = Math.max(0, giftAmount - annualExcl)
      const lifetimeUsed = priorLifetime + taxableGift
      const lifetimeLeft = Math.max(0, LIFETIME - lifetimeUsed)
      const taxDue       = lifetimeUsed > LIFETIME ? (lifetimeUsed - LIFETIME) * 0.40 : 0
      const form709Required = taxableGift > 0
      return {
        annualExcl,
        taxableGift,
        lifetimeUsed,
        lifetimeLeft,
        taxDue,
        form709Required: form709Required ? 'Yes - File Form 709' : 'No - Below annual exclusion'
      }
    } catch(e) { return null }
  }, [giftAmount, numRecipients, priorLifetime, filingStatus])

  const pdfRows = result ? [
    { label: "Annual Exclusion Available", value: result.annualExcl !== undefined ? String(fmt(result.annualExcl)) : "" },
    { label: "Taxable Gift Amount", value: result.taxableGift !== undefined ? String(fmt(result.taxableGift)) : "" },
    { label: "Lifetime Exemption Used", value: result.lifetimeUsed !== undefined ? String(fmt(result.lifetimeUsed)) : "" },
    { label: "Lifetime Exemption Remaining", value: result.lifetimeLeft !== undefined ? String(fmt(result.lifetimeLeft)) : "" },
    { label: "Gift Tax Due Now", value: result.taxDue !== undefined ? String(fmt(result.taxDue)) : "" },
    { label: "Form 709 Required?", value: result.form709Required !== undefined ? String(result.form709Required) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎁</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gift Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate gift tax exclusions, lifetime exemption usage and potential tax on large gifts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Gift Amount This Year</label>
                  <span className="text-white font-bold text-sm">{fmt(giftAmount)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={1000}
                  value={giftAmount} onChange={e => setGiftAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Recipients</label>
                  <span className="text-white font-bold text-sm">{`${numRecipients} people`}</span>
                </div>
                <input type="range" min={1} max={20} step={1}
                  value={numRecipients} onChange={e => setNumRecipients(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Prior Lifetime Gifts Used</label>
                  <span className="text-white font-bold text-sm">{fmt(priorLifetime)}</span>
                </div>
                <input type="range" min={0} max={13000000} step={10000}
                  value={priorLifetime} onChange={e => setPriorLifetime(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filer Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"individual","l":"Individual"},{"v":"married","l":"Married Couple (gift splitting)"}]).map(o => (
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
                {result && <PdfDownload title="Gift Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Exclusion Available</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualExcl)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Taxable Gift Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxableGift)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lifetime Exemption Used</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lifetimeUsed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lifetime Exemption Remaining</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lifetimeLeft)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gift Tax Due Now</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxDue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Form 709 Required?</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.form709Required}
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

            <a href="/estate-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Estate Tax</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Calculator</h3>
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
              <h3 className="text-white font-semibold mb-2">How does the gift tax annual exclusion work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">You can give up to $18,000 per recipient per year (2024) without any gift tax or reporting requirements. Married couples can combine exclusions to give $36,000 per recipient. These are per-recipient limits — you can give $18,000 to as many people as you want. The exclusion adjusts for inflation periodically.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the lifetime gift tax exemption?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The lifetime gift and estate tax exemption is $13.61 million per person in 2024. Gifts above the annual exclusion reduce this lifetime exemption. No tax is actually due until you exhaust the entire lifetime exemption. Once exceeded, gifts are taxed at 40%. The exemption is unified with the estate tax exemption.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are gifts to a spouse taxable?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gifts between US citizen spouses are completely tax-free with no dollar limit (unlimited marital deduction). Gifts to a non-citizen spouse are limited to $185,000 per year (2024) before gift tax applies. Gifts to charities are also generally tax-free and may be deductible as charitable contributions on your income tax return.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Gift Tax Calculator","item":"https://freefincalc.net/gift-tax-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Gift Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
