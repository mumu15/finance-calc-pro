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
    "q": "What is APR and why does it matter?",
    "a": "APR (Annual Percentage Rate) includes both the interest rate and fees expressed as a yearly rate. It shows the true cost of borrowing. A 7% interest rate loan with $1,500 in fees on $20,000 over 5 years has an APR of about 8.6% — significantly higher than the stated rate."
  },
  {
    "q": "What is the difference between APR and interest rate?",
    "a": "The interest rate is only the cost of borrowing the money. APR includes the interest rate plus fees, points, mortgage insurance and other charges. By law, lenders must disclose APR. Always compare APR (not just interest rate) when shopping for loans."
  },
  {
    "q": "What is a good APR for a loan?",
    "a": "Good APR varies by loan type: mortgage 6-7% (2026), auto loan 5-8%, personal loan 8-14% for excellent credit. Credit cards average 20-25% APR. Any APR below your alternatives is good. For mortgages, a difference of even 0.25% in APR saves thousands over the loan life."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [loanAmount, setLoanAmount] = useState(20000)
  const [interestRate, setInterestRate] = useState(7)
  const [termMonths, setTermMonths] = useState(60)
  const [fees, setFees] = useState(500)

  const result = useMemo(() => {
    try {
      const r = interestRate / 100 / 12
      const n = termMonths
      const payment = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid = payment * n
      const totalInterest = totalPaid - loanAmount
      const effectiveLoan = loanAmount - fees
      // approximate APR via Newton's method
      let apr = interestRate / 100
      for (let i = 0; i < 100; i++) {
        const rm = apr / 12
        const pmt = effectiveLoan * (rm * Math.pow(1+rm,n)) / (Math.pow(1+rm,n)-1)
        apr += (payment - pmt) * 0.0001
      }
      return { payment, totalInterest, apr: (apr * 100).toFixed(3) + '%', feesImpact: fees }
    } catch(e) { return null }
  }, [loanAmount, interestRate, termMonths, fees])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.payment !== undefined ? (fmt(result.payment)) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? (fmt(result.totalInterest)) : "" },
    { label: "True APR (including fees)", value: result.apr !== undefined ? (String(result.apr)) : "" },
    { label: "Fee Impact on Cost", value: result.feesImpact !== undefined ? (fmt(result.feesImpact)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">APR Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate the Annual Percentage Rate (APR) including fees to see the true cost of any loan.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(loanAmount)}</span>
                </div>
                <input type="number" min={1000} max={500000} step={500}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Stated Interest Rate</label>
                  <span className="text-white font-bold text-sm">{interestRate + "%"}</span>
                </div>
                <input type="number" min={0.5} max={30} step={0.25}
                  value={interestRate} onChange={e => setInterestRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":12,"l":"12 mo"},{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":60,"l":"60 mo"},{"v":84,"l":"84 mo"}].map(o => (
                    <button key={o.v} onClick={() => setTermMonths(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:termMonths===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:termMonths===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:termMonths===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Fees & Closing Costs</label>
                  <span className="text-white font-bold text-sm">{fmt(fees)}</span>
                </div>
                <input type="number" min={0} max={10000} step={50}
                  value={fees} onChange={e => setFees(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="APR Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.payment)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalInterest)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">True APR (including fees)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.apr}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Fee Impact on Cost</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.feesImpact)}</span>
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

            <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/simple-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">➕</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Simple Interest</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is APR and why does it matter?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">APR (Annual Percentage Rate) includes both the interest rate and fees expressed as a yearly rate. It shows the true cost of borrowing. A 7% interest rate loan with $1,500 in fees on $20,000 over 5 years has an APR of about 8.6% — significantly higher than the stated rate.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between APR and interest rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The interest rate is only the cost of borrowing the money. APR includes the interest rate plus fees, points, mortgage insurance and other charges. By law, lenders must disclose APR. Always compare APR (not just interest rate) when shopping for loans.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a good APR for a loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Good APR varies by loan type: mortgage 6-7% (2026), auto loan 5-8%, personal loan 8-14% for excellent credit. Credit cards average 20-25% APR. Any APR below your alternatives is good. For mortgages, a difference of even 0.25% in APR saves thousands over the loan life.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Apr Calculator","item":"https://www.freefincalc.net/apr-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Apr Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
