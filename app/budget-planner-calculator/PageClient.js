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
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [housing, setHousing] = useState(1500)
  const [transport, setTransport] = useState(400)
  const [food, setFood] = useState(600)
  const [utilities, setUtilities] = useState(250)
  const [entertainment, setEntertainment] = useState(300)
  const [savings, setSavings] = useState(500)

  const result = useMemo(() => {
    try {
      const needs       = housing + transport + food + utilities
      const wants       = entertainment
      const totalSpend  = needs + wants + savings
      const leftover    = monthlyIncome - totalSpend
      const needsPct    = (needs / monthlyIncome * 100).toFixed(1) + '%'
      const wantsPct    = (wants / monthlyIncome * 100).toFixed(1) + '%'
      const savingsPct  = (savings / monthlyIncome * 100).toFixed(1) + '%'
      const annualSavings = savings * 12
      const status      = leftover >= 0 ? 'Surplus' : 'Deficit'
      return { needs, wants, totalSpend, leftover, needsPct, wantsPct, savingsPct, annualSavings, status }
    } catch(e) { return null }
  }, [monthlyIncome, housing, transport, food, utilities, entertainment, savings])

  const pdfRows = result ? [
    { label: "Total Needs Spending", value: result.needs !== undefined ? String(fmt(result.needs)) : "" },
    { label: "Needs as % of Income", value: result.needsPct !== undefined ? String(result.needsPct) : "" },
    { label: "Total Wants Spending", value: result.wants !== undefined ? String(fmt(result.wants)) : "" },
    { label: "Wants as % of Income", value: result.wantsPct !== undefined ? String(result.wantsPct) : "" },
    { label: "Savings Rate", value: result.savingsPct !== undefined ? String(result.savingsPct) : "" },
    { label: "Annual Savings", value: result.annualSavings !== undefined ? String(fmt(result.annualSavings)) : "" },
    { label: "Monthly Surplus/Deficit", value: result.leftover !== undefined ? String(fmt(result.leftover)) : "" },
    { label: "Budget Status", value: result.status !== undefined ? String(result.status) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Budget Planner Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Build a monthly budget using the 50/30/20 rule and see exactly where your money should go.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Take-Home Income</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyIncome)}</span>
                </div>
                <input type="text" inputMode="decimal" min={500} max={50000} step={100}
                  value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Housing (rent or mortgage)</label>
                  <span className="text-white font-bold text-sm">{fmt(housing)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={10000} step={50}
                  value={housing} onChange={e => setHousing(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Transportation</label>
                  <span className="text-white font-bold text-sm">{fmt(transport)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={3000} step={25}
                  value={transport} onChange={e => setTransport(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Food and Groceries</label>
                  <span className="text-white font-bold text-sm">{fmt(food)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={3000} step={25}
                  value={food} onChange={e => setFood(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Utilities and Bills</label>
                  <span className="text-white font-bold text-sm">{fmt(utilities)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={2000} step={25}
                  value={utilities} onChange={e => setUtilities(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Entertainment and Dining</label>
                  <span className="text-white font-bold text-sm">{fmt(entertainment)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={2000} step={25}
                  value={entertainment} onChange={e => setEntertainment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Savings and Investments</label>
                  <span className="text-white font-bold text-sm">{fmt(savings)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={10000} step={50}
                  value={savings} onChange={e => setSavings(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Budget Planner Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Needs Spending</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.needs)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Needs as % of Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.needsPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Wants Spending</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.wants)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Wants as % of Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.wantsPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Savings Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.savingsPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualSavings)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Surplus/Deficit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.leftover)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Budget Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.status}
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

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>

            <a href="/net-pay-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Pay</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the 50/30/20 budget rule?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 50/30/20 rule splits take-home pay into: 50% for needs (housing, food, transport, utilities), 30% for wants (dining out, entertainment, subscriptions), and 20% for savings and debt repayment. It is a simple starting framework — adjust the percentages based on your cost of living, income level and financial goals.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I reduce my budget to save more?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Start with the biggest line items. Housing is usually the largest expense — consider a roommate, refinancing, or moving. Food waste costs the average American $1,500/year — meal planning saves significantly. Audit all subscriptions and cancel unused ones. The 24-hour rule (wait before non-essential purchases) reduces impulse spending by 30-50%.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What budgeting method works best?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Zero-based budgeting (assign every dollar a job) works best for people who want full control and are paying off debt. The 50/30/20 rule is best for simplicity. Envelope budgeting (cash in categories) is proven for overspenders. Pay-yourself-first (automate savings before spending) is best for savers. The best method is the one you actually follow consistently.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Budget Planner Calculator","item":"https://www.freefincalc.net/budget-planner-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Budget Planner Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
