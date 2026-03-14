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
    "q": "What is a HELOC and how does it work?",
    "a": "A HELOC (Home Equity Line of Credit) lets you borrow against your home equity up to a set limit. During the draw period (typically 10 years) you can borrow and repay as needed, paying interest only. During the repayment period (10-20 years) you repay principal and interest."
  },
  {
    "q": "What is the maximum HELOC amount?",
    "a": "Most lenders allow you to borrow up to 80-90% of your home's value minus your mortgage balance. On a $450,000 home with $280,000 mortgage at 85% LTV: ($450,000 × 0.85) - $280,000 = $102,500 maximum HELOC."
  },
  {
    "q": "HELOC vs home equity loan — what is the difference?",
    "a": "A HELOC is a revolving line of credit with a variable rate — you borrow as needed. A home equity loan is a lump sum with a fixed rate and fixed payments. HELOCs are better for ongoing expenses; home equity loans are better for one-time large expenses where you want payment certainty."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [homeValue, setHomeValue] = useState(450000)
  const [mortgageBalance, setMortgageBalance] = useState(280000)
  const [ltv, setLtv] = useState(85)
  const [helocRate, setHelocRate] = useState(8.5)
  const [drawAmount, setDrawAmount] = useState(50000)

  const result = useMemo(() => {
    try {
      const equity = homeValue - mortgageBalance
      const maxBorrow = (homeValue * ltv / 100) - mortgageBalance
      if (maxBorrow <= 0) return null
      const monthlyInterestOnly = drawAmount * (helocRate / 100 / 12)
      const annualInterest = drawAmount * (helocRate / 100)
      return { equity, maxBorrow, monthlyInterestOnly, annualInterest }
    } catch(e) { return null }
  }, [homeValue, mortgageBalance, ltv, helocRate, drawAmount])

  const pdfRows = result ? [
    { label: "Current Home Equity", value: result.equity !== undefined ? (fmt(result.equity)) : "" },
    { label: "Max HELOC Credit Limit", value: result.maxBorrow !== undefined ? (fmt(result.maxBorrow)) : "" },
    { label: "Monthly Interest-Only Payment", value: result.monthlyInterestOnly !== undefined ? (fmt(result.monthlyInterestOnly)) : "" },
    { label: "Annual Interest Cost", value: result.annualInterest !== undefined ? (fmt(result.annualInterest)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">HELOC Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate available home equity, line of credit limit and interest-only payment on a HELOC.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Home Value</label>
                  <span className="text-white font-bold text-sm">{fmt(homeValue)}</span>
                </div>
                <input type="text" inputMode="decimal" min={50000} max={2000000} step={5000}
                  value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Remaining Mortgage Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(mortgageBalance)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={1500000} step={5000}
                  value={mortgageBalance} onChange={e => setMortgageBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Max LTV Ratio</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":80,"l":"80%"},{"v":85,"l":"85%"},{"v":90,"l":"90%"}].map(o => (
                    <button key={o.v} onClick={() => setLtv(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:ltv===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:ltv===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:ltv===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">HELOC Interest Rate</label>
                  <span className="text-white font-bold text-sm">{helocRate + "%"}</span>
                </div>
                <input type="text" inputMode="decimal" min={4} max={15} step={0.25}
                  value={helocRate} onChange={e => setHelocRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Amount to Draw</label>
                  <span className="text-white font-bold text-sm">{fmt(drawAmount)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={500000} step={1000}
                  value={drawAmount} onChange={e => setDrawAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="HELOC Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Home Equity</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.equity)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max HELOC Credit Limit</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.maxBorrow)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Interest-Only Payment</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.monthlyInterestOnly)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Interest Cost</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.annualInterest)}</span>
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

            <a href="/refinance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Refinance Calculator</h3>
            </a>

            <a href="/debt-to-income-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">DTI Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a HELOC and how does it work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A HELOC (Home Equity Line of Credit) lets you borrow against your home equity up to a set limit. During the draw period (typically 10 years) you can borrow and repay as needed, paying interest only. During the repayment period (10-20 years) you repay principal and interest.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the maximum HELOC amount?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most lenders allow you to borrow up to 80-90% of your home's value minus your mortgage balance. On a $450,000 home with $280,000 mortgage at 85% LTV: ($450,000 × 0.85) - $280,000 = $102,500 maximum HELOC.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">HELOC vs home equity loan — what is the difference?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A HELOC is a revolving line of credit with a variable rate — you borrow as needed. A home equity loan is a lump sum with a fixed rate and fixed payments. HELOCs are better for ongoing expenses; home equity loans are better for one-time large expenses where you want payment certainty.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Heloc Calculator","item":"https://www.freefincalc.net/heloc-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Heloc Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
