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
  const [targetIncome, setTargetIncome] = useState(80000)
  const [billableHours, setBillableHours] = useState(1200)
  const [expenses, setExpenses] = useState(5000)
  const [taxRate, setTaxRate] = useState(28)
  const [vacationWeeks, setVacationWeeks] = useState(3)

  const result = useMemo(() => {
    try {
      const workWeeks = 52 - vacationWeeks
      const totalHours = billableHours
      const grossNeeded = (targetIncome + expenses) / (1 - taxRate / 100)
      const hourlyRate = grossNeeded / totalHours
      const dailyRate = hourlyRate * 8
      const monthlyTarget = grossNeeded / 12
      const utilization = (billableHours / (workWeeks * 40) * 100).toFixed(1) + '%'
      return { hourlyRate, dailyRate, monthlyTarget, grossNeeded, utilization }
    } catch(e) { return null }
  }, [targetIncome, billableHours, expenses, taxRate, vacationWeeks])

  const pdfRows = result ? [
    { label: "Minimum Hourly Rate", value: result.hourlyRate !== undefined ? String(fmt(result.hourlyRate)) : "" },
    { label: "Daily Rate", value: result.dailyRate !== undefined ? String(fmt(result.dailyRate)) : "" },
    { label: "Monthly Revenue Target", value: result.monthlyTarget !== undefined ? String(fmt(result.monthlyTarget)) : "" },
    { label: "Annual Gross Revenue Needed", value: result.grossNeeded !== undefined ? String(fmt(result.grossNeeded)) : "" },
    { label: "Billable Utilization Rate", value: result.utilization !== undefined ? String(result.utilization) : "" },
  ] : []

  const fields = [
    { label: 'Target Annual Take-Home', val: fmt(targetIncome), min: 10000, max: 500000, step: 1000, set: setTargetIncome, v: targetIncome },
    { label: 'Billable Hours Per Year', val: billableHours + ' hrs', min: 100, max: 2500, step: 50, set: setBillableHours, v: billableHours },
    { label: 'Annual Business Expenses', val: fmt(expenses), min: 0, max: 100000, step: 500, set: setExpenses, v: expenses },
    { label: 'Effective Tax Rate', val: taxRate + '%', min: 5, max: 50, step: 1, set: setTaxRate, v: taxRate },
    { label: 'Vacation Weeks Per Year', val: vacationWeeks + ' wks', min: 0, max: 12, step: 1, set: setVacationWeeks, v: vacationWeeks },
  ]

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Freelance Rate Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate the minimum hourly rate you need to charge as a freelancer to meet your income goals.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">
              {fields.map(f => (
                <div key={f.label}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-slate-400 text-sm">{f.label}</label>
                    <span className="text-white font-bold text-sm">{f.val}</span>
                  </div>
                  <input type="number" min={f.min} max={f.max} step={f.step}
                    value={f.v} onChange={e => f.set(Number(e.target.value))}
                    className="slider-upgrade" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Freelance Rate Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">
                  {[
                    { label: 'Minimum Hourly Rate', val: fmt(result.hourlyRate) },
                    { label: 'Daily Rate (8 hrs)', val: fmt(result.dailyRate) },
                    { label: 'Monthly Revenue Target', val: fmt(result.monthlyTarget) },
                    { label: 'Annual Gross Revenue Needed', val: fmt(result.grossNeeded) },
                    { label: 'Billable Utilization Rate', val: result.utilization },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between items-center p-3 rounded-xl"
                      style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                      <span className="text-slate-400 text-sm">{r.label}</span>
                      <span className="font-bold" style={{color:'#f0c842'}}>{r.val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { href: '/self-employment-tax-calculator', icon: '🧾', name: 'SE Tax' },
              { href: '/invoice-calculator', icon: '📄', name: 'Invoice' },
              { href: '/hourly-to-salary-calculator', icon: '💵', name: 'Hourly to Salary' },
              { href: '/contractor-pay-calculator', icon: '🔧', name: 'Contractor Pay' },
            ].map(r => (
              <a key={r.href} href={r.href} className="result-box group hover:-translate-y-1 transition-all duration-300 block">
                <div className="text-2xl mb-2">{r.icon}</div>
                <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">{r.name}</h3>
              </a>
            ))}
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I set my freelance hourly rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Start with your target income, add business expenses and taxes, then divide by realistic billable hours. Research market rates on Upwork, Glassdoor, and industry surveys to validate. New freelancers often underprice themselves — your rate should reflect skill level, not insecurity.</p>
            </div>
            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How many billable hours can I realistically work per year?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most experienced freelancers bill 1,000-1,500 hours annually. Of 2,080 available working hours, subtract vacation, sick days, holidays, and non-billable time (marketing, admin, networking). New freelancers may only bill 600-800 hours in year one while building a client base. Plan conservatively and adjust as your pipeline grows.</p>
            </div>
            <div className="pb-4">
              <h3 className="text-white font-semibold mb-2">Should I charge hourly or by project?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Project-based pricing is generally better for experienced freelancers. It rewards efficiency — if you work faster, you earn more per hour. Clients prefer knowing total cost upfront. Start with hourly until you can accurately estimate project time, then transition to fixed-price projects. Always include scope change clauses to protect against scope creep.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Freelance Rate Calculator","item":"https://freefincalc.net/freelance-rate-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Freelance Rate Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
