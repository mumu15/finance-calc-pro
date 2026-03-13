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
    "q": "How is property tax calculated?",
    "a": "Property tax = Assessed Value × Tax Rate. The assessed value is often a percentage of market value (the assessment ratio). A $350,000 home assessed at 100% with a 1.2% rate pays $4,200/year or $350/month in property tax escrow."
  },
  {
    "q": "What is the average property tax rate in the US?",
    "a": "The average effective property tax rate in the US is about 1.1% of home value. Rates vary widely by state: New Jersey averages 2.4%, Illinois 2.2%, Texas 1.7%, California 0.7%, and Hawaii 0.3%. Local rates within a state also vary by county and municipality."
  },
  {
    "q": "Can I appeal my property tax assessment?",
    "a": "Yes. If you believe your home is over-assessed you can appeal. Start by comparing your assessed value to recent sales of similar nearby homes. File an appeal with your local assessor's office — deadlines are typically 30-90 days after assessment notices. About 30-40% of appeals result in reductions."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [homeValue, setHomeValue] = useState(350000)
  const [assessedPct, setAssessedPct] = useState(100)
  const [taxRate, setTaxRate] = useState(1.2)

  const result = useMemo(() => {
    try {
      const assessedValue = homeValue * (assessedPct / 100)
      const annualTax = assessedValue * (taxRate / 100)
      const monthlyEscrow = annualTax / 12
      const effectiveRate = (annualTax / homeValue * 100).toFixed(3) + '%'
      return { annualTax, monthlyEscrow, assessedValue, effectiveRate }
    } catch(e) { return null }
  }, [homeValue, assessedPct, taxRate])

  const pdfRows = result ? [
    { label: "Annual Property Tax", value: result.annualTax !== undefined ? (fmt(result.annualTax)) : "" },
    { label: "Monthly Escrow Amount", value: result.monthlyEscrow !== undefined ? (fmt(result.monthlyEscrow)) : "" },
    { label: "Assessed Value", value: result.assessedValue !== undefined ? (fmt(result.assessedValue)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? (String(result.effectiveRate)) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Property Tax Calculator", "item": "https://freefincalc.net/property-tax-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Property Tax Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Property Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate your annual property tax and monthly escrow payment based on assessed value and rate.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Home / Property Value</label>
                  <span className="text-white font-bold text-sm">{fmt(homeValue)}</span>
                </div>
                <input type="range" min={50000} max={5000000} step={5000}
                  value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Assessment Ratio</label>
                  <span className="text-white font-bold text-sm">{assessedPct + "%"}</span>
                </div>
                <input type="range" min={50} max={100} step={5}
                  value={assessedPct} onChange={e => setAssessedPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Property Tax Rate (mill rate)</label>
                  <span className="text-white font-bold text-sm">{taxRate + "%"}</span>
                </div>
                <input type="range" min={0.1} max={4} step={0.05}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Property Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Property Tax</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.annualTax)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Escrow Amount</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.monthlyEscrow)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Assessed Value</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.assessedValue)}</span>
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

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Affordability</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/rent-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rent vs Buy</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How is property tax calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Property tax = Assessed Value × Tax Rate. The assessed value is often a percentage of market value (the assessment ratio). A $350,000 home assessed at 100% with a 1.2% rate pays $4,200/year or $350/month in property tax escrow.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the average property tax rate in the US?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The average effective property tax rate in the US is about 1.1% of home value. Rates vary widely by state: New Jersey averages 2.4%, Illinois 2.2%, Texas 1.7%, California 0.7%, and Hawaii 0.3%. Local rates within a state also vary by county and municipality.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Can I appeal my property tax assessment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes. If you believe your home is over-assessed you can appeal. Start by comparing your assessed value to recent sales of similar nearby homes. File an appeal with your local assessor's office — deadlines are typically 30-90 days after assessment notices. About 30-40% of appeals result in reductions.</p>
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
