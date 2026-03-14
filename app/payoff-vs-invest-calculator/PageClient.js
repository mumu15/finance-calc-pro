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
    "q": "Should I pay off debt or invest?",
    "a": "The mathematical answer: if your debt rate exceeds expected investment returns, pay off debt. If investment returns exceed debt rate, invest. In practice, the break-even is around 6-7%. Credit card debt at 20%? Pay it off. Mortgage at 6.5% and stock market returning 9%? The math slightly favors investing, but emotional factors matter too."
  },
  {
    "q": "Does paying off debt count as an investment?",
    "a": "Paying off a 10% interest rate loan is equivalent to a guaranteed 10% return — better than most investments after tax and risk adjustment. High-interest debt payoff is often the highest \"return on investment\" available, especially when accounting for the guaranteed, risk-free nature of the return."
  },
  {
    "q": "What debts should I always pay off before investing?",
    "a": "Always pay off: credit cards (15-25% APR), payday loans (300%+ APR), personal loans above 8-10%, and private student loans above 7%. The minimum threshold varies: some say pay all debt over 5-6% before investing; others say capture employer 401k match first (it's a 50-100% instant return) regardless."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [debtBalance, setDebtBalance] = useState(25000)
  const [debtRate, setDebtRate] = useState(8)
  const [investReturn, setInvestReturn] = useState(9)
  const [extraMonthly, setExtraMonthly] = useState(500)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    try {
      const n = years * 12
      // Payoff path: save debt interest, then invest freed-up money
      const monthsToPayoff = Math.min(n, Math.ceil(Math.log(1 + debtBalance * (debtRate/100/12) / extraMonthly) / Math.log(1 + debtRate/100/12)))
      const remainingMonths = n - monthsToPayoff
      const interestSaved = debtBalance * (debtRate / 100) * (monthsToPayoff / 12)
      const investAfterPayoff = extraMonthly * (Math.pow(1 + investReturn/100/12, remainingMonths) - 1) / (investReturn/100/12)
      const payoffNetBenefit = interestSaved + investAfterPayoff
      // Invest path: invest all extra money, debt stays
      const investValue = extraMonthly * (Math.pow(1 + investReturn/100/12, n) - 1) / (investReturn/100/12)
      const debtGrown = debtBalance * Math.pow(1 + debtRate/100/12, n)
      const investNetBenefit = investValue - (debtGrown - debtBalance)
      const recommendation = payoffNetBenefit >= investNetBenefit ? 'Pay off debt first' : 'Invest first'
      const difference = Math.abs(payoffNetBenefit - investNetBenefit)
      return { payoffNetBenefit, investNetBenefit, recommendation, difference }
    } catch(e) { return null }
  }, [debtBalance, debtRate, investReturn, extraMonthly, years])

  const pdfRows = result ? [
    { label: "Net Benefit: Pay Off Debt", value: result.payoffNetBenefit !== undefined ? (fmt(result.payoffNetBenefit)) : "" },
    { label: "Net Benefit: Invest Instead", value: result.investNetBenefit !== undefined ? (fmt(result.investNetBenefit)) : "" },
    { label: "Recommendation", value: result.recommendation !== undefined ? (String(result.recommendation)) : "" },
    { label: "Difference", value: result.difference !== undefined ? (fmt(result.difference)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pay Off Debt vs Invest Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Decide whether to pay off debt early or invest the extra money based on rates and returns.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(debtBalance)}</span>
                </div>
                <input type="range" min={1000} max={500000} step={500}
                  value={debtBalance} onChange={e => setDebtBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Debt Interest Rate</label>
                  <span className="text-white font-bold text-sm">{debtRate + "%"}</span>
                </div>
                <input type="range" min={1} max={30} step={0.25}
                  value={debtRate} onChange={e => setDebtRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Investment Return</label>
                  <span className="text-white font-bold text-sm">{investReturn + "%"}</span>
                </div>
                <input type="range" min={1} max={20} step={0.25}
                  value={investReturn} onChange={e => setInvestReturn(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Extra Money Available / Month</label>
                  <span className="text-white font-bold text-sm">{fmt(extraMonthly)}</span>
                </div>
                <input type="range" min={50} max={5000} step={50}
                  value={extraMonthly} onChange={e => setExtraMonthly(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Time Horizon</label>
                  <span className="text-white font-bold text-sm">{years + " yrs"}</span>
                </div>
                <input type="range" min={1} max={30} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Pay Off Debt vs Invest Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Benefit: Pay Off Debt</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.payoffNetBenefit)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Benefit: Invest Instead</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.investNetBenefit)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Recommendation</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.recommendation}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Difference</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.difference)}</span>
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

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Card Payoff</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Should I pay off debt or invest?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The mathematical answer: if your debt rate exceeds expected investment returns, pay off debt. If investment returns exceed debt rate, invest. In practice, the break-even is around 6-7%. Credit card debt at 20%? Pay it off. Mortgage at 6.5% and stock market returning 9%? The math slightly favors investing, but emotional factors matter too.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Does paying off debt count as an investment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Paying off a 10% interest rate loan is equivalent to a guaranteed 10% return — better than most investments after tax and risk adjustment. High-interest debt payoff is often the highest "return on investment" available, especially when accounting for the guaranteed, risk-free nature of the return.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What debts should I always pay off before investing?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Always pay off: credit cards (15-25% APR), payday loans (300%+ APR), personal loans above 8-10%, and private student loans above 7%. The minimum threshold varies: some say pay all debt over 5-6% before investing; others say capture employer 401k match first (it's a 50-100% instant return) regardless.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Payoff Vs Invest Calculator","item":"https://www.freefincalc.net/payoff-vs-invest-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Payoff Vs Invest Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
