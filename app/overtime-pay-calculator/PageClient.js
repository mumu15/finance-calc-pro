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
  const [hourlyRate, setHourlyRate] = useState(22)
  const [regularHours, setRegularHours] = useState(40)
  const [otHours, setOtHours] = useState(5)
  const [otMultiplier, setOtMultiplier] = useState(1.5)
  const [weeksPerYear, setWeeksPerYear] = useState(20)

  const result = useMemo(() => {
    try {
      const regularPay   = hourlyRate * regularHours
      const otRate       = hourlyRate * otMultiplier
      const weeklyOT     = otRate * otHours
      const totalWeekly  = regularPay + weeklyOT
      const regularAnnual = hourlyRate * regularHours * 52
      const otAnnual     = weeklyOT * weeksPerYear
      const totalAnnual  = regularAnnual + otAnnual
      const effectiveRate = (totalAnnual / (regularHours * 52 + otHours * weeksPerYear)).toFixed(2)
      return { regularPay, otRate, weeklyOT, totalWeekly, regularAnnual, otAnnual, totalAnnual, effectiveRate }
    } catch(e) { return null }
  }, [hourlyRate, regularHours, otHours, otMultiplier, weeksPerYear])

  const pdfRows = result ? [
    { label: "Regular Weekly Pay", value: result.regularPay !== undefined ? String(fmt(result.regularPay)) : "" },
    { label: "Overtime Hourly Rate", value: result.otRate !== undefined ? String(fmt(result.otRate)) : "" },
    { label: "Weekly Overtime Pay", value: result.weeklyOT !== undefined ? String(fmt(result.weeklyOT)) : "" },
    { label: "Total Weekly Pay", value: result.totalWeekly !== undefined ? String(fmt(result.totalWeekly)) : "" },
    { label: "Regular Annual Pay", value: result.regularAnnual !== undefined ? String(fmt(result.regularAnnual)) : "" },
    { label: "Annual Overtime Earnings", value: result.otAnnual !== undefined ? String(fmt(result.otAnnual)) : "" },
    { label: "Total Annual Earnings", value: result.totalAnnual !== undefined ? String(fmt(result.totalAnnual)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⏰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Overtime Pay Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate overtime pay, total weekly earnings and annual income including overtime hours.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Regular Hourly Rate</label>
                  <span className="text-white font-bold text-sm">{fmt(hourlyRate)}</span>
                </div>
                <input type="range" min={7.25} max={500} step={0.25}
                  value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Regular Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${regularHours} hrs`}</span>
                </div>
                <input type="range" min={1} max={40} step={1}
                  value={regularHours} onChange={e => setRegularHours(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Overtime Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${otHours} hrs`}</span>
                </div>
                <input type="range" min={0} max={40} step={0.5}
                  value={otHours} onChange={e => setOtHours(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Overtime Rate</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":1.5,"l":"1.5x (time and a half)"},{"v":2,"l":"2.0x (double time)"},{"v":2.5,"l":"2.5x (triple time)"}]).map(o => (
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
                  <label className="text-slate-400 text-sm">Weeks With Overtime Per Year</label>
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
                {result && <PdfDownload title="Overtime Pay Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Regular Weekly Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.regularPay)}
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
                    <span className="text-slate-400 text-sm">Weekly Overtime Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.weeklyOT)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Weekly Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalWeekly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Regular Annual Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.regularAnnual)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Overtime Earnings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.otAnnual)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Annual Earnings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalAnnual)}
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

            <a href="/overtime-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏱️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Overtime Calculator</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck</h3>
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
              <h3 className="text-white font-semibold mb-2">Who qualifies for overtime pay?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Under the federal FLSA, non-exempt employees earn 1.5x their regular rate for hours over 40 per week. Employees earning under $684/week ($35,568/year) are automatically non-exempt. Many states have stricter rules: California requires daily overtime (over 8 hours/day), double time over 12 hours/day, and overtime on the 7th consecutive day. Salaried workers may still qualify depending on their actual duties.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is overtime calculated for hourly workers?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Federal overtime = regular hourly rate x 1.5 x hours over 40 in a workweek. A workweek is a fixed 168-hour period (7 consecutive 24-hour days). Employers cannot average hours across multiple weeks to avoid overtime. Bonuses and certain other compensation may need to be included in the regular rate for overtime calculation purposes.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Can employers force you to work overtime?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">In most US states (at-will employment), employers can require overtime as a condition of employment and can terminate employees who refuse, unless there is a union contract, employment contract, or state law that limits mandatory overtime. Healthcare workers have additional protections in many states. Employers cannot punish employees for overtime work that was authorized or required.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <Footer />
    </>
  )
}
