'use client'
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

  const result = useMemo(() => {
    try {
      const annualSalary  = hourlyRate * hoursPerWeek * weeksPerYear
      const monthlySalary = annualSalary / 12
      const weeklySalary  = hourlyRate * hoursPerWeek
      const dailySalary   = hourlyRate * (hoursPerWeek / 5)
      const annualHours   = hoursPerWeek * weeksPerYear
      return { annualSalary, monthlySalary, weeklySalary, dailySalary, annualHours: annualHours + ' hrs' }
    } catch(e) { return null }
  }, [hourlyRate, hoursPerWeek, weeksPerYear])

  const pdfRows = result ? [
    { label: "Annual Salary", value: result.annualSalary !== undefined ? String(fmt(result.annualSalary)) : "" },
    { label: "Monthly Salary", value: result.monthlySalary !== undefined ? String(fmt(result.monthlySalary)) : "" },
    { label: "Weekly Pay", value: result.weeklySalary !== undefined ? String(fmt(result.weeklySalary)) : "" },
    { label: "Daily Pay", value: result.dailySalary !== undefined ? String(fmt(result.dailySalary)) : "" },
    { label: "Annual Hours", value: result.annualHours !== undefined ? String(result.annualHours) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⏰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hourly to Salary Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Convert any hourly wage to annual, monthly, weekly and daily salary — and back again.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Hourly Rate</label>
                  <span className="text-white font-bold text-sm">{fmt(hourlyRate)}</span>
                </div>
                <input type="range" min={7.25} max={500} step={0.25}
                  value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${hoursPerWeek} hrs`}</span>
                </div>
                <input type="range" min={1} max={80} step={0.5}
                  value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Weeks Worked Per Year</label>
                  <span className="text-white font-bold text-sm">{`${weeksPerYear} wks`}</span>
                </div>
                <input type="range" min={1} max={52} step={1}
                  value={weeksPerYear} onChange={e => setWeeksPerYear(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
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

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Salary</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualSalary)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Salary</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlySalary)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Weekly Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.weeklySalary)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Daily Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.dailySalary)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Hours</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.annualHours}
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

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>

            <a href="/raise-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Raise Calculator</h3>
            </a>

            <a href="/overtime-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏱️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Overtime Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I convert hourly wage to annual salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Multiply your hourly rate by hours per week, then by weeks worked per year. At 40 hrs/week for 52 weeks: Annual = Hourly x 2,080. A $25/hr wage equals $52,000/year. For part-time at 20 hrs/week: $25 x 1,040 = $26,000/year.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the US federal minimum wage in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The federal minimum wage remains $7.25/hour as of 2026. However many states and cities have higher minimums. California, New York, Washington and others are at $15-$17+/hour. Some cities like Seattle and San Francisco exceed $17/hour. Tipped workers have a separate federal minimum of $2.13/hour.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I compare job offers using hourly or salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Always convert to the same unit for fair comparison. Calculate total compensation: base pay plus benefits value (health insurance worth $5,000-$15,000/year), retirement match, paid time off (PTO days x daily rate), bonuses, and remote work savings on commuting. Total comp can differ hugely from the headline number.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
