'use client'
export { metadata } from './metadata'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [regularRate, setRegularRate] = useState(20)
  const [regularHours, setRegularHours] = useState(40)
  const [overtimeHours, setOvertimeHours] = useState(10)
  const [otMultiplier, setOtMultiplier] = useState('1.5')
  const [weeksPerYear, setWeeksPerYear] = useState(52)

  const result = useMemo(() => {
    try {
      const otRate         = regularRate * parseFloat(otMultiplier)
      const weeklyRegular  = regularRate * regularHours
      const weeklyOvertime = otRate * overtimeHours
      const weeklyTotal    = weeklyRegular + weeklyOvertime
      const annualTotal    = weeklyTotal * weeksPerYear
      const annualOvertime = weeklyOvertime * weeksPerYear
      const totalHours     = regularHours + overtimeHours
      const effectiveRate  = (weeklyTotal / totalHours).toFixed(2)
      return { weeklyTotal, weeklyOvertime, annualTotal, annualOvertime, otRate, effectiveRate }
    } catch(e) { return null }
  }, [regularRate, regularHours, overtimeHours, otMultiplier, weeksPerYear])

  const pdfRows = result ? [
    { label: "Weekly Total Pay", value: result.weeklyTotal !== undefined ? String(fmt(result.weeklyTotal)) : "" },
    { label: "Weekly Overtime Pay", value: result.weeklyOvertime !== undefined ? String(fmt(result.weeklyOvertime)) : "" },
    { label: "Overtime Hourly Rate", value: result.otRate !== undefined ? String(fmt(result.otRate)) : "" },
    { label: "Annual Total Pay", value: result.annualTotal !== undefined ? String(fmt(result.annualTotal)) : "" },
    { label: "Annual Overtime Earnings", value: result.annualOvertime !== undefined ? String(fmt(result.annualOvertime)) : "" },
    { label: "Effective Hourly Rate", value: result.effectiveRate !== undefined ? String(result.effectiveRate) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⏱️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Overtime Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate overtime pay, total earnings and effective hourly rate for any pay period.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Regular Hourly Rate</label>
                  <span className="text-white font-bold text-sm">{fmt(regularRate)}</span>
                </div>
                <input type="range" min={7.25} max={500} step={0.25}
                  value={regularRate} onChange={e => setRegularRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Regular Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${regularHours} hrs`}</span>
                </div>
                <input type="range" min={1} max={40} step={0.5}
                  value={regularHours} onChange={e => setRegularHours(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Overtime Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${overtimeHours} hrs`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.5}
                  value={overtimeHours} onChange={e => setOvertimeHours(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Overtime Multiplier</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"1.5","l":"1.5x (standard)"},{"v":"2","l":"2x (double time)"},{"v":"2.5","l":"2.5x (holiday)"}]).map(o => (
                    <button key={o.v} onClick={() => setOtMultiplier(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: otMultiplier === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: otMultiplier === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: otMultiplier === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Weeks Per Year</label>
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
                {result && <PdfDownload title="Overtime Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Weekly Total Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.weeklyTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Weekly Overtime Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.weeklyOvertime)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Overtime Hourly Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.otRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Total Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Overtime Earnings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualOvertime)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Hourly Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveRate}
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

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>

            <a href="/raise-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Raise Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is overtime calculated in the US?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive 1.5x their regular rate for all hours over 40 in a workweek. There is no federal requirement for daily overtime, but some states (California) require 1.5x after 8 hours/day and 2x after 12 hours/day or on the 7th consecutive day.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Who is exempt from overtime pay?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Exempt employees (not entitled to overtime) typically include: executive, administrative and professional employees earning at least $684/week ($35,568/year in 2024), outside salespeople, and certain computer employees. Misclassification of employees as exempt is a common wage violation — if in doubt, check with the Department of Labor.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is overtime taxed at a higher rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">No — overtime is taxed at the same marginal rates as regular income. However because overtime increases your total income for the pay period, withholding may be higher that period (pushing you into a higher bracket temporarily). Your actual tax rate depends on your total annual income, not the individual paycheck amount.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
