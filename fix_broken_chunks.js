/**
 * FreeFinCalc.net — Fix 3 Broken Calculator Pages
 * node fix_broken_chunks.js
 *
 * Rewrites these 3 pages from scratch cleanly:
 *  - app/freelance-rate-calculator/page.js
 *  - app/hourly-to-salary-calculator/page.js
 *  - app/salary-after-tax-calculator/page.js
 */

const fs = require('fs')

function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅ app/' + dir + '/page.js rewritten')
}

// ── 1. Freelance Rate Calculator ─────────────────────────────────────────────
write('freelance-rate-calculator', `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

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
                  <input type="range" min={f.min} max={f.max} step={f.step}
                    value={f.v} onChange={e => f.set(Number(e.target.value))}
                    className="w-full accent-yellow-400" />
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
      <TrustSection />
      <Footer />
    </>
  )
}
`)

// ── 2. Hourly to Salary Calculator ───────────────────────────────────────────
write('hourly-to-salary-calculator', `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [hourlyRate, setHourlyRate] = useState(25)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(52)
  const [unpaidLeave, setUnpaidLeave] = useState(0)

  const result = useMemo(() => {
    try {
      const paidWeeks    = weeksPerYear - unpaidLeave
      const annualSalary = hourlyRate * hoursPerWeek * paidWeeks
      const monthly      = annualSalary / 12
      const biweekly     = annualSalary / 26
      const weekly       = annualSalary / 52
      const daily        = hourlyRate * hoursPerWeek / 5
      const totalHours   = hoursPerWeek * paidWeeks
      return { annualSalary, monthly, biweekly, weekly, daily, totalHours }
    } catch(e) { return null }
  }, [hourlyRate, hoursPerWeek, weeksPerYear, unpaidLeave])

  const pdfRows = result ? [
    { label: "Annual Salary", value: result.annualSalary !== undefined ? String(fmt(result.annualSalary)) : "" },
    { label: "Monthly Pay", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Biweekly Pay", value: result.biweekly !== undefined ? String(fmt(result.biweekly)) : "" },
    { label: "Weekly Pay", value: result.weekly !== undefined ? String(fmt(result.weekly)) : "" },
    { label: "Daily Pay", value: result.daily !== undefined ? String(fmt(result.daily)) : "" },
  ] : []

  const fields = [
    { label: 'Hourly Rate', val: fmt(hourlyRate), min: 1, max: 500, step: 0.25, set: setHourlyRate, v: hourlyRate },
    { label: 'Hours Per Week', val: hoursPerWeek + ' hrs', min: 1, max: 80, step: 1, set: setHoursPerWeek, v: hoursPerWeek },
    { label: 'Weeks Worked Per Year', val: weeksPerYear + ' wks', min: 1, max: 52, step: 1, set: setWeeksPerYear, v: weeksPerYear },
    { label: 'Unpaid Leave Weeks', val: unpaidLeave + ' wks', min: 0, max: 12, step: 1, set: setUnpaidLeave, v: unpaidLeave },
  ]

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💵</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hourly to Salary Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Convert your hourly wage to annual salary, monthly, biweekly and weekly pay.</p>
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
                  <input type="range" min={f.min} max={f.max} step={f.step}
                    value={f.v} onChange={e => f.set(Number(e.target.value))}
                    className="w-full accent-yellow-400" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Hourly to Salary Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">
                  {[
                    { label: 'Annual Salary', val: fmt(result.annualSalary) },
                    { label: 'Monthly Pay', val: fmt(result.monthly) },
                    { label: 'Biweekly Pay', val: fmt(result.biweekly) },
                    { label: 'Weekly Pay', val: fmt(result.weekly) },
                    { label: 'Daily Pay', val: fmt(result.daily) },
                    { label: 'Total Hours Per Year', val: result.totalHours + ' hrs' },
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
              { href: '/salary-to-hourly-calculator', icon: '🔄', name: 'Salary to Hourly' },
              { href: '/salary-after-tax-calculator', icon: '💰', name: 'Salary After Tax' },
              { href: '/overtime-pay-calculator', icon: '⏰', name: 'Overtime Pay' },
              { href: '/paycheck-calculator', icon: '💵', name: 'Paycheck' },
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
              <h3 className="text-white font-semibold mb-2">How do you convert hourly to annual salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Multiply hourly rate by hours per week by weeks per year. The standard formula uses 2,080 hours (40 hrs x 52 weeks). A $25/hour rate equals $52,000 annually. For part-time or variable hours, use your actual expected hours for an accurate estimate.</p>
            </div>
            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is $20 an hour annually?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">$20/hour x 40 hours x 52 weeks = $41,600 per year gross. After federal and state taxes (roughly 20-25% effective rate), take-home pay is approximately $31,000-$33,000 annually or $2,580-$2,750/month. Use our salary after tax calculator for a precise after-tax estimate.</p>
            </div>
            <div className="pb-4">
              <h3 className="text-white font-semibold mb-2">How does hourly pay compare to salaried positions?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Hourly workers get paid for actual hours worked including overtime at 1.5x. Salaried workers often receive benefits packages worth 20-30% of base salary but may be expected to work unpaid overtime. When comparing offers, calculate the effective hourly rate of the salaried role including all hours worked, and add the value of benefits to the hourly role.</p>
            </div>
          </div>
        </div>
      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
`)

// ── 3. Salary After Tax Calculator ───────────────────────────────────────────
write('salary-after-tax-calculator', `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [grossSalary, setGrossSalary] = useState(75000)
  const [filingStatus, setFilingStatus] = useState('single')
  const [stateTaxRate, setStateTaxRate] = useState(5)
  const [retirement401k, setRetirement401k] = useState(6)
  const [healthInsurance, setHealthInsurance] = useState(200)

  const result = useMemo(() => {
    try {
      const stdDeduct   = filingStatus === 'married' ? 29200 : 14600
      const retirePretax = grossSalary * (retirement401k / 100)
      const federalTaxable = Math.max(0, grossSalary - stdDeduct - retirePretax)
      const brackets = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let federalTax = 0
      for (const [lo, rate, hi] of brackets) {
        if (federalTaxable <= lo) break
        federalTax += (Math.min(federalTaxable, hi) - lo) * rate
      }
      const socialSecurity = Math.min(grossSalary, 168600) * 0.062
      const medicare       = grossSalary * 0.0145
      const stateTax       = grossSalary * (stateTaxRate / 100)
      const totalTax       = federalTax + socialSecurity + medicare + stateTax
      const annualDeductions = retirePretax + healthInsurance * 12
      const takeHome       = grossSalary - totalTax - annualDeductions
      const monthlyTakeHome = takeHome / 12
      const effectiveRate  = (totalTax / grossSalary * 100).toFixed(2) + '%'
      return { takeHome, monthlyTakeHome, federalTax, socialSecurity, medicare, stateTax, totalTax, effectiveRate }
    } catch(e) { return null }
  }, [grossSalary, filingStatus, stateTaxRate, retirement401k, healthInsurance])

  const pdfRows = result ? [
    { label: "Annual Take-Home Pay", value: result.takeHome !== undefined ? String(fmt(result.takeHome)) : "" },
    { label: "Monthly Take-Home", value: result.monthlyTakeHome !== undefined ? String(fmt(result.monthlyTakeHome)) : "" },
    { label: "Federal Income Tax", value: result.federalTax !== undefined ? String(fmt(result.federalTax)) : "" },
    { label: "Social Security Tax", value: result.socialSecurity !== undefined ? String(fmt(result.socialSecurity)) : "" },
    { label: "Medicare Tax", value: result.medicare !== undefined ? String(fmt(result.medicare)) : "" },
    { label: "State Income Tax", value: result.stateTax !== undefined ? String(fmt(result.stateTax)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? String(result.effectiveRate) : "" },
  ] : []

  const statusOpts = [
    { v: 'single', l: 'Single' },
    { v: 'married', l: 'Married Joint' },
  ]

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Salary After Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your exact take-home pay after federal tax, state tax, Social Security and Medicare.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(grossSalary)}</span>
                </div>
                <input type="range" min={10000} max={1000000} step={1000}
                  value={grossSalary} onChange={e => setGrossSalary(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOpts.map(o => (
                    <button key={o.v} onClick={() => setFilingStatus(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: filingStatus === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: filingStatus === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: filingStatus === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">State Income Tax Rate</label>
                  <span className="text-white font-bold text-sm">{stateTaxRate}%</span>
                </div>
                <input type="range" min={0} max={15} step={0.25}
                  value={stateTaxRate} onChange={e => setStateTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">401k Contribution</label>
                  <span className="text-white font-bold text-sm">{retirement401k}%</span>
                </div>
                <input type="range" min={0} max={23} step={1}
                  value={retirement401k} onChange={e => setRetirement401k(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Health Insurance Premium (monthly)</label>
                  <span className="text-white font-bold text-sm">{fmt(healthInsurance)}</span>
                </div>
                <input type="range" min={0} max={1000} step={10}
                  value={healthInsurance} onChange={e => setHealthInsurance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Salary After Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">
                  {[
                    { label: 'Annual Take-Home Pay', val: fmt(result.takeHome) },
                    { label: 'Monthly Take-Home', val: fmt(result.monthlyTakeHome) },
                    { label: 'Federal Income Tax', val: fmt(result.federalTax) },
                    { label: 'Social Security Tax', val: fmt(result.socialSecurity) },
                    { label: 'Medicare Tax', val: fmt(result.medicare) },
                    { label: 'State Income Tax', val: fmt(result.stateTax) },
                    { label: 'Effective Tax Rate', val: result.effectiveRate },
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
              { href: '/tax-calculator', icon: '🧮', name: 'Income Tax' },
              { href: '/paycheck-calculator', icon: '💵', name: 'Paycheck' },
              { href: '/hourly-to-salary-calculator', icon: '⏰', name: 'Hourly to Salary' },
              { href: '/raise-calculator', icon: '📈', name: 'Raise Calculator' },
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
              <h3 className="text-white font-semibold mb-2">How much of my salary do I actually take home?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most Americans take home 65-78% of gross salary after all taxes. On $75,000 gross: federal tax roughly $8,500, Social Security $4,650, Medicare $1,088, state tax $3,750 (at 5%) = $17,988 in taxes. Take-home before retirement and health deductions is approximately $57,000 or $4,750/month.</p>
            </div>
            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does a 401k contribution reduce my taxes?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes — traditional 401k contributions are pre-tax, reducing your federal and state taxable income. A $4,500 contribution (6% of $75,000) at a 22% marginal rate saves $990 in federal taxes. Your take-home pay decreases by only $3,510, not the full $4,500. This is why capturing the full employer match is essentially free money.</p>
            </div>
            <div className="pb-4">
              <h3 className="text-white font-semibold mb-2">What is the difference between gross and net salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gross salary is your total compensation before any deductions. Net salary (take-home pay) is what lands in your bank account after federal taxes, state taxes, Social Security, Medicare, health insurance premiums, retirement contributions, and any other pre-tax deductions. Always negotiate salary on gross figures and budget based on net figures.</p>
            </div>
          </div>
        </div>
      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
`)

console.log(`
════════════════════════════════════════════════════
  3 BROKEN PAGES FIXED
════════════════════════════════════════════════════
  ✅ app/freelance-rate-calculator/page.js
  ✅ app/hourly-to-salary-calculator/page.js
  ✅ app/salary-after-tax-calculator/page.js
════════════════════════════════════════════════════
`)
