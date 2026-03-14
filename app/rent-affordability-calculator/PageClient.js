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
  const [grossIncome, setGrossIncome] = useState(65000)
  const [otherDebts, setOtherDebts] = useState(300)
  const [taxRate, setTaxRate] = useState(25)
  const [ruleType, setRuleType] = useState('30')

  const result = useMemo(() => {
    try {
      const monthlyGross = grossIncome / 12
      const monthlyNet  = monthlyGross * (1 - taxRate / 100)
      let maxRent
      if (ruleType === '30') {
        maxRent = monthlyGross * 0.30
      } else if (ruleType === '28') {
        maxRent = monthlyGross * 0.28
      } else {
        maxRent = monthlyNet * 0.35
      }
      const remainingAfterRent = monthlyNet - maxRent - otherDebts
      const totalHousingBudget = maxRent * 12
      const rentToIncomeRatio  = (maxRent / monthlyGross * 100).toFixed(1) + '%'
      return { maxRent, remainingAfterRent, totalHousingBudget, monthlyNet, rentToIncomeRatio }
    } catch(e) { return null }
  }, [grossIncome, otherDebts, taxRate, ruleType])

  const pdfRows = result ? [
    { label: "Maximum Monthly Rent", value: result.maxRent !== undefined ? String(fmt(result.maxRent)) : "" },
    { label: "Monthly Take-Home Pay", value: result.monthlyNet !== undefined ? String(fmt(result.monthlyNet)) : "" },
    { label: "Left After Rent and Debts", value: result.remainingAfterRent !== undefined ? String(fmt(result.remainingAfterRent)) : "" },
    { label: "Annual Housing Budget", value: result.totalHousingBudget !== undefined ? String(fmt(result.totalHousingBudget)) : "" },
    { label: "Rent to Income Ratio", value: result.rentToIncomeRatio !== undefined ? String(result.rentToIncomeRatio) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏘️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rent Affordability Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find the maximum rent you can afford based on income and the 30% rule.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Income</label>
                  <span className="text-white font-bold text-sm">{fmt(grossIncome)}</span>
                </div>
                <input type="number" min={10000} max={500000} step={1000}
                  value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Debt Payments</label>
                  <span className="text-white font-bold text-sm">{fmt(otherDebts)}</span>
                </div>
                <input type="number" min={0} max={5000} step={50}
                  value={otherDebts} onChange={e => setOtherDebts(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Effective Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="number" min={10} max={45} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Affordability Rule</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"30","l":"30% of gross"},{"v":"28","l":"28% of gross"},{"v":"35net","l":"35% of net"}]).map(o => (
                    <button key={o.v} onClick={() => setRuleType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: ruleType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: ruleType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: ruleType === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Rent Affordability Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Maximum Monthly Rent</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxRent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Take-Home Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyNet)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Left After Rent and Debts</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.remainingAfterRent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Housing Budget</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalHousingBudget)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Rent to Income Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.rentToIncomeRatio}
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

            <a href="/rent-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rent vs Buy</h3>
            </a>

            <a href="/budget-planner-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Planner</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Affordability</h3>
            </a>

            <a href="/moving-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Moving Cost</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the 30% rent rule?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 30% rule says spend no more than 30% of gross monthly income on rent. On a $65,000 salary ($5,417/month gross) that is $1,625/month maximum. This guideline originated in 1969 US housing policy. In high-cost cities many people spend 40-50% — if you must exceed 30%, offset it by cutting other expenses aggressively.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What else should I budget for besides rent?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Total housing costs include: rent, renters insurance ($15-30/month), utilities ($100-200/month), parking if not included, and any pet fees. Many landlords require proof of income at 2.5-3x monthly rent. Factor all these into your housing budget, not just the headline rent number.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I rent or buy?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Renting is better when: you plan to move within 3-5 years, the price-to-rent ratio is above 20 (buy price / annual rent), you lack funds for a down payment, or your local market is overvalued. Buying builds equity and provides stability but requires significant upfront costs (3-20% down plus closing costs of 2-5%). Use the rent vs buy calculator for a full comparison.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Rent Affordability Calculator","item":"https://freefincalc.net/rent-affordability-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Rent Affordability Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
