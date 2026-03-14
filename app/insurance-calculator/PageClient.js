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
  const [annualIncome, setAnnualIncome] = useState(75000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000)
  const [dependents, setDependents] = useState(2)
  const [totalDebt, setTotalDebt] = useState(350000)
  const [existingCoverage, setExistingCoverage] = useState(0)

  const result = useMemo(() => {
    try {
      // Life insurance need
      const lifeNeed       = annualIncome * 10 + totalDebt + (dependents * 50000) - existingCoverage
      // Disability insurance need (60-70% of income)
      const disabilityMonthly = annualIncome * 0.65 / 12
      // Emergency fund target
      const emergencyTarget   = monthlyExpenses * (dependents > 0 ? 6 : 3)
      // Health insurance estimate
      const healthMonthly     = dependents > 0 ? 600 + dependents * 150 : 350
      const totalAnnualInsur  = healthMonthly * 12 + (lifeNeed > 0 ? lifeNeed * 0.0003 : 0) + disabilityMonthly * 12 * 0.02
      return { lifeNeed: Math.max(0, lifeNeed), disabilityMonthly, emergencyTarget, healthMonthly, totalAnnualInsur }
    } catch(e) { return null }
  }, [annualIncome, monthlyExpenses, dependents, totalDebt, existingCoverage])

  const pdfRows = result ? [
    { label: "Recommended Life Insurance", value: result.lifeNeed !== undefined ? String(fmt(result.lifeNeed)) : "" },
    { label: "Disability Insurance (monthly)", value: result.disabilityMonthly !== undefined ? String(fmt(result.disabilityMonthly)) : "" },
    { label: "Emergency Fund Target", value: result.emergencyTarget !== undefined ? String(fmt(result.emergencyTarget)) : "" },
    { label: "Est. Health Insurance (monthly)", value: result.healthMonthly !== undefined ? String(fmt(result.healthMonthly)) : "" },
    { label: "Est. Total Annual Insurance", value: result.totalAnnualInsur !== undefined ? String(fmt(result.totalAnnualInsur)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Insurance Needs Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate how much coverage you need for life, disability and emergency insurance.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Income</label>
                  <span className="text-white font-bold text-sm">{fmt(annualIncome)}</span>
                </div>
                <input type="text" inputMode="decimal" min={10000} max={500000} step={1000}
                  value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Living Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyExpenses)}</span>
                </div>
                <input type="text" inputMode="decimal" min={500} max={20000} step={100}
                  value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Dependents</label>
                  <span className="text-white font-bold text-sm">{`${dependents} people`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={8} step={1}
                  value={dependents} onChange={e => setDependents(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Outstanding Debts</label>
                  <span className="text-white font-bold text-sm">{fmt(totalDebt)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={2000000} step={5000}
                  value={totalDebt} onChange={e => setTotalDebt(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Existing Life Insurance</label>
                  <span className="text-white font-bold text-sm">{fmt(existingCoverage)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={5000000} step={5000}
                  value={existingCoverage} onChange={e => setExistingCoverage(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Insurance Needs Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Recommended Life Insurance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lifeNeed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Disability Insurance (monthly)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.disabilityMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Emergency Fund Target</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.emergencyTarget)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Health Insurance (monthly)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.healthMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Total Annual Insurance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalAnnualInsur)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial advice.
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/life-insurance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Life Insurance</h3>
            </a>

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>

            <a href="/budget-planner-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Planner</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What types of insurance are most important?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Priority order for most people: (1) Health insurance — a single hospitalization can cost $30,000-$100,000+. (2) Life insurance — if anyone depends on your income. (3) Disability insurance — you are 3-4x more likely to become disabled than to die during your working years. (4) Auto insurance — legally required in most states. (5) Homeowners or renters insurance — protects your largest asset or personal belongings.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is disability insurance and do I need it?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Disability insurance replaces 60-70% of your income if you cannot work due to illness or injury. Short-term disability covers 3-6 months; long-term covers years or until retirement. Many employers offer group policies, but they are often insufficient. If your employer does not offer it or coverage is under 60% of income, individual supplemental disability coverage is worth considering, especially for high earners.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much does insurance typically cost?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Average monthly costs (2026): health insurance $450-$700 individual, $1,200-$1,800 family (employer plans average $600/month employer + $300/month employee). Life insurance $25-$75 for $500,000 term policy for healthy 35-year-old. Disability insurance 1-3% of annual income. Auto insurance $100-$250/month. Homeowners $100-$250/month. Renters insurance $15-$30/month (great value).</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Insurance Calculator","item":"https://www.freefincalc.net/insurance-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Insurance Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
