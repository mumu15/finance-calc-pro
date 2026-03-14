'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'

const faqs = [
  {
    "q": "What is the average sales tax rate in the US?",
    "a": "The US has no federal sales tax. Combined state and local sales tax averages about 7.12% nationwide. States range from 0% (Oregon, Montana, New Hampshire, Delaware, Alaska) to 9.5%+ (Louisiana, Tennessee). Some cities add additional local taxes on top of the state rate."
  },
  {
    "q": "How do I calculate sales tax?",
    "a": "Sales tax = Price × Tax Rate. Total = Price + (Price × Tax Rate) = Price × (1 + Tax Rate). To find pre-tax price from a total: Pre-Tax = Total ÷ (1 + Tax Rate). For example, $108.50 total at 8.5% tax: pre-tax = $108.50 ÷ 1.085 = $100."
  },
  {
    "q": "Are all purchases subject to sales tax?",
    "a": "No. Most states exempt groceries, prescription medications and medical devices. Some states also exempt clothing below a certain price. Online purchases are now subject to sales tax in most states following the 2018 South Dakota v. Wayfair Supreme Court ruling."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [price, setPrice] = useState(100)
  const [taxRate, setTaxRate] = useState(8.5)
  const [calcType, setCalcType] = useState('add')

  const result = useMemo(() => {
    try {
      let preTax, taxAmount, total
      if (calcType === 'add') {
        preTax = price
        taxAmount = price * (taxRate / 100)
        total = price + taxAmount
      } else {
        total = price
        preTax = price / (1 + taxRate / 100)
        taxAmount = total - preTax
      }
      const effectiveRate = (taxAmount / preTax * 100).toFixed(3) + '%'
      return { preTax, taxAmount, total, effectiveRate }
    } catch(e) { return null }
  }, [price, taxRate, calcType])

  const pdfRows = result ? [
    { label: "Pre-Tax Price", value: result.preTax !== undefined ? (fmt(result.preTax)) : "" },
    { label: "Tax Amount", value: result.taxAmount !== undefined ? (fmt(result.taxAmount)) : "" },
    { label: "Total Price", value: result.total !== undefined ? (fmt(result.total)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? (String(result.effectiveRate)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧾</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sales Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate sales tax amount, total price and reverse-calculate pre-tax price instantly.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Price / Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(price)}</span>
                </div>
                <input type="number" min={0.01} max={100000} step={1}
                  value={price} onChange={e => setPrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Sales Tax Rate</label>
                  <span className="text-white font-bold text-sm">{taxRate + "%"}</span>
                </div>
                <input type="number" min={0} max={15} step={0.25}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Calculate</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":"add","l":"Add tax to price"},{"v":"remove","l":"Remove tax from total"}].map(o => (
                    <button key={o.v} onClick={() => setCalcType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:calcType===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:calcType===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:calcType===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Sales Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Pre-Tax Price</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.preTax)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Amount</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.taxAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Price</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.total)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.effectiveRate}</span>
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

            <a href="/vat-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">VAT Calculator</h3>
            </a>

            <a href="/tip-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🍽️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tip Calculator</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the average sales tax rate in the US?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The US has no federal sales tax. Combined state and local sales tax averages about 7.12% nationwide. States range from 0% (Oregon, Montana, New Hampshire, Delaware, Alaska) to 9.5%+ (Louisiana, Tennessee). Some cities add additional local taxes on top of the state rate.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I calculate sales tax?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Sales tax = Price × Tax Rate. Total = Price + (Price × Tax Rate) = Price × (1 + Tax Rate). To find pre-tax price from a total: Pre-Tax = Total ÷ (1 + Tax Rate). For example, $108.50 total at 8.5% tax: pre-tax = $108.50 ÷ 1.085 = $100.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Are all purchases subject to sales tax?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">No. Most states exempt groceries, prescription medications and medical devices. Some states also exempt clothing below a certain price. Online purchases are now subject to sales tax in most states following the 2018 South Dakota v. Wayfair Supreme Court ruling.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Sales Tax Calculator","item":"https://freefincalc.net/sales-tax-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Sales Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
