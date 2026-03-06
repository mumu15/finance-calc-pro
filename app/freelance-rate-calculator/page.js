'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [desiredIncome, setDesiredIncome] = useState(80000)
  const [hoursPerWeek, setHoursPerWeek] = useState(30)
  const [weeksPerYear, setWeeksPerYear] = useState(48)
  const [businessExpenses, setBusinessExpenses] = useState(5000)
  const [taxRate, setTaxRate] = useState(30)
  const [nonBillablePct, setNonBillablePct] = useState(25)

  const result = useMemo(() => {
    try {
      const totalBillableHours = hoursPerWeek * weeksPerYear * (1 - nonBillablePct/100)
      const grossNeeded        = (desiredIncome + businessExpenses) / (1 - taxRate/100)
      const minHourlyRate      = grossNeeded / totalBillableHours
      const dayRate            = minHourlyRate * 8
      const weekRate           = minHourlyRate * hoursPerWeek
      const projectRate40h     = minHourlyRate * 40
      const annualRevNeeded    = grossNeeded
      return { minHourlyRate, dayRate, weekRate, projectRate40h, annualRevNeeded, totalBillableHours: Math.round(totalBillableHours) }
    } catch(e) { return null }
  }, [desiredIncome, hoursPerWeek, weeksPerYear, businessExpenses, taxRate, nonBillablePct])

  const pdfRows = result ? [
    { label: 'Minimum Hourly Rate', value: result.minHourlyRate !== undefined ? String(fmt(result.minHourlyRate)) : '' },
    { label: 'Day Rate (8 hrs)', value: result.dayRate !== undefined ? String(fmt(result.dayRate)) : '' },
    { label: 'Weekly Rate', value: result.weekRate !== undefined ? String(fmt(result.weekRate)) : '' },
    { label: 'Project Rate (40 hrs)', value: result.projectRate40h !== undefined ? String(fmt(result.projectRate40h)) : '' },
    { label: 'Annual Revenue Needed', value: result.annualRevNeeded !== undefined ? String(fmt(result.annualRevNeeded)) : '' },
    { label: 'Total Billable Hours / Year', value: result.totalBillableHours !== undefined ? String(result.totalBillableHours) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Freelance Rate Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate the minimum hourly or project rate you need to charge to meet your income goals.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Desired Annual Income</label>
                  <span className="text-white font-bold text-sm">{fmt(desiredIncome)}</span>
                </div>
                <input type="range" min={10000} max={500000} step={1000}
                  value={desiredIncome} onChange={e => setDesiredIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Billable Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${hoursPerWeek} hrs`}</span>
                </div>
                <input type="range" min={5} max={60} step={1}
                  value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Weeks Worked Per Year</label>
                  <span className="text-white font-bold text-sm">{`${weeksPerYear} wks`}</span>
                </div>
                <input type="range" min={20} max={52} step={1}
                  value={weeksPerYear} onChange={e => setWeeksPerYear(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Business Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(businessExpenses)}</span>
                </div>
                <input type="range" min={0} max={100000} step={500}
                  value={businessExpenses} onChange={e => setBusinessExpenses(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Effective Tax Rate (SE + income)</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="range" min={15} max={50} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Non-Billable Time %</label>
                  <span className="text-white font-bold text-sm">{`${nonBillablePct}%`}</span>
                </div>
                <input type="range" min={0} max={60} step={5}
                  value={nonBillablePct} onChange={e => setNonBillablePct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
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

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Minimum Hourly Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.minHourlyRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Day Rate (8 hrs)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.dayRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Weekly Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.weekRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Project Rate (40 hrs)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.projectRate40h)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Revenue Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualRevNeeded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Billable Hours / Year</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.totalBillableHours}
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

            <a href="/self-employment-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SE Tax</h3>
            </a>

            <a href="/invoice-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Invoice</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I set my freelance rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Start with your minimum viable rate (this calculator). Then research what the market pays for your skill level on Upwork, LinkedIn, and industry salary surveys. Differentiate by specialisation, results and reputation. Most freelancers undercharge initially — market rates for senior-level work are often 2-4x what beginners charge.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Why do freelancers need to charge more than employees?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Freelancers bear costs employees do not: self-employment tax (15.3%), health insurance, retirement contributions, unpaid vacation, business expenses, and non-billable time (marketing, admin, chasing payments). A full-time employee earning $60,000 costs their employer ~$80,000. A freelancer charging the equivalent needs to earn even more due to uncertainty and gaps.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I charge hourly or project rates?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Project rates are generally better for experienced freelancers — you are paid for the value delivered, not hours spent. As you get faster and better, project rates increase your effective hourly rate. Hourly is better for ongoing or open-ended work where scope is unclear. Never use hourly rates that expose you to scope creep without change-order agreements.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
