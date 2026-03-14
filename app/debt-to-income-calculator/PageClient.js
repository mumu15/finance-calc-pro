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
    "q": "What is a good debt-to-income ratio?",
    "a": "Below 36% is considered good. Most conventional mortgage lenders require a DTI of 43% or less. The best mortgage rates go to borrowers with DTI below 28%. FHA loans allow DTI up to 50% with compensating factors like excellent credit or large down payment."
  },
  {
    "q": "How do I lower my debt-to-income ratio?",
    "a": "To lower DTI: (1) pay down existing debts, especially high minimum payment balances, (2) increase income through a raise, second job or freelance work, (3) avoid taking on new debt before applying for a loan. Even paying off a small $200/month debt can meaningfully shift your DTI."
  },
  {
    "q": "What is front-end vs back-end DTI?",
    "a": "Front-end DTI includes only housing costs (mortgage/rent, taxes, insurance) divided by income. Back-end DTI includes all monthly debt payments. Conventional lenders prefer front-end DTI below 28% and back-end below 36%. FHA uses 31%/43% guidelines."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(7000)
  const [mortgageRent, setMortgageRent] = useState(1800)
  const [carPayments, setCarPayments] = useState(400)
  const [creditCards, setCreditCards] = useState(150)
  const [otherDebts, setOtherDebts] = useState(200)

  const result = useMemo(() => {
    try {
      const totalDebt = mortgageRent + carPayments + creditCards + otherDebts
      const dti = (totalDebt / grossMonthlyIncome) * 100
      const frontEnd = (mortgageRent / grossMonthlyIncome) * 100
      let status = 'Excellent'
      if (dti > 43) status = 'Too High — Loan Approval Difficult'
      else if (dti > 36) status = 'High — Some Lenders May Decline'
      else if (dti > 28) status = 'Acceptable'
      else if (dti > 20) status = 'Good'
      return {
        dti: dti.toFixed(1) + '%',
        frontEnd: frontEnd.toFixed(1) + '%',
        totalDebt,
        status
      }
    } catch(e) { return null }
  }, [grossMonthlyIncome, mortgageRent, carPayments, creditCards, otherDebts])

  const pdfRows = result ? [
    { label: "Total Debt-to-Income Ratio", value: result.dti !== undefined ? (String(result.dti)) : "" },
    { label: "Front-End Ratio (housing only)", value: result.frontEnd !== undefined ? (String(result.frontEnd)) : "" },
    { label: "Total Monthly Debt", value: result.totalDebt !== undefined ? (fmt(result.totalDebt)) : "" },
    { label: "Loan Approval Status", value: result.status !== undefined ? (String(result.status)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚖️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt-to-Income Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your debt-to-income (DTI) ratio and see if you qualify for a mortgage or loan.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Gross Monthly Income</label>
                  <span className="text-white font-bold text-sm">{fmt(grossMonthlyIncome)}</span>
                </div>
                <input type="number" step="any" min={1000} max={50000} step={250}
                  value={grossMonthlyIncome} onChange={e => setGrossMonthlyIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage / Rent Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(mortgageRent)}</span>
                </div>
                <input type="number" step="any" min={0} max={10000} step={50}
                  value={mortgageRent} onChange={e => setMortgageRent(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Car Loan Payments</label>
                  <span className="text-white font-bold text-sm">{fmt(carPayments)}</span>
                </div>
                <input type="number" step="any" min={0} max={3000} step={25}
                  value={carPayments} onChange={e => setCarPayments(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Min Credit Card Payments</label>
                  <span className="text-white font-bold text-sm">{fmt(creditCards)}</span>
                </div>
                <input type="number" step="any" min={0} max={2000} step={25}
                  value={creditCards} onChange={e => setCreditCards(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other Monthly Debts</label>
                  <span className="text-white font-bold text-sm">{fmt(otherDebts)}</span>
                </div>
                <input type="number" step="any" min={0} max={5000} step={25}
                  value={otherDebts} onChange={e => setOtherDebts(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Debt-to-Income Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Debt-to-Income Ratio</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.dti}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Front-End Ratio (housing only)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.frontEnd}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Monthly Debt</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalDebt)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan Approval Status</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.status}</span>
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

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a good debt-to-income ratio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Below 36% is considered good. Most conventional mortgage lenders require a DTI of 43% or less. The best mortgage rates go to borrowers with DTI below 28%. FHA loans allow DTI up to 50% with compensating factors like excellent credit or large down payment.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I lower my debt-to-income ratio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">To lower DTI: (1) pay down existing debts, especially high minimum payment balances, (2) increase income through a raise, second job or freelance work, (3) avoid taking on new debt before applying for a loan. Even paying off a small $200/month debt can meaningfully shift your DTI.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is front-end vs back-end DTI?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Front-end DTI includes only housing costs (mortgage/rent, taxes, insurance) divided by income. Back-end DTI includes all monthly debt payments. Conventional lenders prefer front-end DTI below 28% and back-end below 36%. FHA uses 31%/43% guidelines.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Debt To Income Calculator","item":"https://www.freefincalc.net/debt-to-income-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Debt To Income Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
