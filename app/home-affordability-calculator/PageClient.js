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
    "q": "How much house can I afford on my salary?",
    "a": "A common rule is the 28/36 rule: spend no more than 28% of gross monthly income on housing and 36% on total debt. On a $90,000 salary that is $2,100/month for housing. With a 6.75% rate on a 30-year loan this supports a mortgage of about $325,000."
  },
  {
    "q": "What is the 28/36 rule for buying a home?",
    "a": "The 28/36 rule states your mortgage payment should not exceed 28% of gross monthly income (front-end DTI) and all debt payments should not exceed 36% (back-end DTI). This is a conservative guideline; FHA loans allow higher ratios, up to 31% front-end and 43% back-end."
  },
  {
    "q": "What costs beyond the mortgage should I budget for?",
    "a": "Beyond your mortgage budget for: property taxes (0.5-2.5% of home value annually), homeowners insurance (~$1,200-$2,500/year), HOA fees if applicable, PMI if down payment is under 20% ($50-$200/month), maintenance (1-2% of home value/year) and utilities."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [annualIncome, setAnnualIncome] = useState(90000)
  const [monthlyDebts, setMonthlyDebts] = useState(500)
  const [downPayment, setDownPayment] = useState(40000)
  const [rate, setRate] = useState(6.75)
  const [termYears, setTermYears] = useState(30)

  const result = useMemo(() => {
    try {
      const maxDTI = 0.43
      const monthlyIncome = annualIncome / 12
      const maxTotalDebt = monthlyIncome * maxDTI
      const maxMortgagePayment = maxTotalDebt - monthlyDebts
      if (maxMortgagePayment <= 0) return null
      const r = rate / 100 / 12
      const n = termYears * 12
      const maxLoan = maxMortgagePayment / (r === 0 ? 1/n : (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1))
      const maxHomePrice = maxLoan + downPayment
      const conservativePrice = maxHomePrice * 0.8
      return { maxHomePrice, conservativePrice, maxLoan, maxMortgagePayment }
    } catch(e) { return null }
  }, [annualIncome, monthlyDebts, downPayment, rate, termYears])

  const pdfRows = result ? [
    { label: "Maximum Home Price", value: result.maxHomePrice !== undefined ? (fmt(result.maxHomePrice)) : "" },
    { label: "Conservative Budget (80%)", value: result.conservativePrice !== undefined ? (fmt(result.conservativePrice)) : "" },
    { label: "Max Mortgage Loan", value: result.maxLoan !== undefined ? (fmt(result.maxLoan)) : "" },
    { label: "Max Monthly Payment", value: result.maxMortgagePayment !== undefined ? (fmt(result.maxMortgagePayment)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏡</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Home Affordability Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find out how much house you can afford based on your income, debts and down payment.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Income</label>
                  <span className="text-white font-bold text-sm">{fmt(annualIncome)}</span>
                </div>
                <input type="number" min={20000} max={500000} step={1000}
                  value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Debt Payments</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyDebts)}</span>
                </div>
                <input type="number" min={0} max={5000} step={50}
                  value={monthlyDebts} onChange={e => setMonthlyDebts(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment Available</label>
                  <span className="text-white font-bold text-sm">{fmt(downPayment)}</span>
                </div>
                <input type="number" min={0} max={200000} step={1000}
                  value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage Interest Rate</label>
                  <span className="text-white font-bold text-sm">{rate + "%"}</span>
                </div>
                <input type="number" min={2} max={12} step={0.125}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"},{"v":30,"l":"30 yrs"}].map(o => (
                    <button key={o.v} onClick={() => setTermYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:termYears===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:termYears===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:termYears===o.v?'#f0c842':'#64748b'}}>
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
                {result && <PdfDownload title="Home Affordability Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Maximum Home Price</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.maxHomePrice)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Conservative Budget (80%)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.conservativePrice)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Mortgage Loan</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.maxLoan)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Monthly Payment</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.maxMortgagePayment)}</span>
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

            <a href="/debt-to-income-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">DTI Calculator</h3>
            </a>

            <a href="/down-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Down Payment</h3>
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
              <h3 className="text-white font-semibold mb-2">How much house can I afford on my salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A common rule is the 28/36 rule: spend no more than 28% of gross monthly income on housing and 36% on total debt. On a $90,000 salary that is $2,100/month for housing. With a 6.75% rate on a 30-year loan this supports a mortgage of about $325,000.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the 28/36 rule for buying a home?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 28/36 rule states your mortgage payment should not exceed 28% of gross monthly income (front-end DTI) and all debt payments should not exceed 36% (back-end DTI). This is a conservative guideline; FHA loans allow higher ratios, up to 31% front-end and 43% back-end.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What costs beyond the mortgage should I budget for?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Beyond your mortgage budget for: property taxes (0.5-2.5% of home value annually), homeowners insurance (~$1,200-$2,500/year), HOA fees if applicable, PMI if down payment is under 20% ($50-$200/month), maintenance (1-2% of home value/year) and utilities.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Home Affordability Calculator","item":"https://freefincalc.net/home-affordability-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Home Affordability Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
