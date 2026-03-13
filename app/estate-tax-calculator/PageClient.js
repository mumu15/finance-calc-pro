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
  const [estateValue, setEstateValue] = useState(5000000)
  const [debts, setDebts] = useState(200000)
  const [charitableGifts, setCharitableGifts] = useState(0)
  const [maritalDeduct, setMaritalDeduct] = useState(0)
  const [stateEstateTax, setStateEstateTax] = useState(0)

  const result = useMemo(() => {
    try {
      const EXEMPTION_2026 = 13610000
      const grossEstate   = estateValue - debts
      const taxableEstate = Math.max(0, grossEstate - charitableGifts - maritalDeduct)
      const overExemption = Math.max(0, taxableEstate - EXEMPTION_2026)
      // Federal estate tax: 40% on amount over exemption
      const federalTax    = overExemption * 0.40
      const stateTax      = taxableEstate * (stateEstateTax / 100)
      const totalTax      = federalTax + stateTax
      const heirsReceive  = grossEstate - totalTax - charitableGifts - maritalDeduct
      const taxRate       = taxableEstate > 0 ? (totalTax / taxableEstate * 100).toFixed(1) + '%' : '0%'
      return { taxableEstate, federalTax, stateTax, totalTax, heirsReceive, taxRate }
    } catch(e) { return null }
  }, [estateValue, debts, charitableGifts, maritalDeduct, stateEstateTax])

  const pdfRows = result ? [
    { label: "Taxable Estate", value: result.taxableEstate !== undefined ? String(fmt(result.taxableEstate)) : "" },
    { label: "Federal Estate Tax (40%)", value: result.federalTax !== undefined ? String(fmt(result.federalTax)) : "" },
    { label: "State Estate Tax", value: result.stateTax !== undefined ? String(fmt(result.stateTax)) : "" },
    { label: "Total Tax", value: result.totalTax !== undefined ? String(fmt(result.totalTax)) : "" },
    { label: "Heirs Receive", value: result.heirsReceive !== undefined ? String(fmt(result.heirsReceive)) : "" },
    { label: "Effective Tax Rate", value: result.taxRate !== undefined ? String(result.taxRate) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Estate Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate federal estate tax liability and how much your heirs will inherit after taxes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Estate Value</label>
                  <span className="text-white font-bold text-sm">{fmt(estateValue)}</span>
                </div>
                <input type="range" min={0} max={100000000} step={10000}
                  value={estateValue} onChange={e => setEstateValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Debts and Liabilities</label>
                  <span className="text-white font-bold text-sm">{fmt(debts)}</span>
                </div>
                <input type="range" min={0} max={50000000} step={10000}
                  value={debts} onChange={e => setDebts(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Charitable Bequests</label>
                  <span className="text-white font-bold text-sm">{fmt(charitableGifts)}</span>
                </div>
                <input type="range" min={0} max={20000000} step={10000}
                  value={charitableGifts} onChange={e => setCharitableGifts(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Marital Deduction (to spouse)</label>
                  <span className="text-white font-bold text-sm">{fmt(maritalDeduct)}</span>
                </div>
                <input type="range" min={0} max={50000000} step={10000}
                  value={maritalDeduct} onChange={e => setMaritalDeduct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">State Estate Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${stateEstateTax}%`}</span>
                </div>
                <input type="range" min={0} max={20} step={0.5}
                  value={stateEstateTax} onChange={e => setStateEstateTax(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Estate Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Taxable Estate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxableEstate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Estate Tax (40%)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.federalTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">State Estate Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.stateTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Heirs Receive</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.heirsReceive)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.taxRate}
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

            <a href="/gift-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Gift Tax</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/life-insurance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Life Insurance</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Who pays federal estate tax in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Only estates exceeding the federal exemption of $13.61 million per person ($27.22 million for married couples with portability election) pay federal estate tax. This means fewer than 0.1% of estates owe any federal estate tax. The top rate is 40% on amounts above the exemption. Note: the exemption is scheduled to drop to roughly $7 million in 2026 if the TCJA is not extended.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the marital deduction?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The unlimited marital deduction allows you to transfer any amount to a US citizen spouse at death completely free of estate tax. This defers the tax until the surviving spouse dies. The estate then uses the deceased spouses unused exemption (portability) plus their own, potentially shielding $27+ million from tax with proper planning.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How can I reduce estate taxes?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Key strategies: annual gifting ($18,000 per recipient per year in 2024, tax-free), irrevocable trusts (removes assets from estate), charitable giving (deductible from taxable estate), life insurance in an ILIT (proceeds outside estate), 529 plans (5-year gift tax election), and family limited partnerships. Work with an estate planning attorney for strategies above $10 million.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Estate Tax Calculator","item":"https://freefincalc.net/estate-tax-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Estate Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
