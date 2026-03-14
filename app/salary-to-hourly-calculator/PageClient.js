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
  const [annualSalary, setAnnualSalary] = useState(65000)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(50)
  const [unpaidBreaks, setUnpaidBreaks] = useState(30)

  const result = useMemo(() => {
    try {
      const totalHours    = hoursPerWeek * weeksPerYear
      const breakHoursDay = unpaidBreaks / 60
      const paidHoursDay  = (hoursPerWeek / 5) - breakHoursDay
      const paidHoursYear = paidHoursDay * 5 * weeksPerYear
      const hourlyRate    = annualSalary / totalHours
      const paidHourlyRate= annualSalary / paidHoursYear
      const dailyRate     = annualSalary / (weeksPerYear * 5)
      const weeklyRate    = annualSalary / weeksPerYear
      const monthlyRate   = annualSalary / 12
      return { hourlyRate, paidHourlyRate, dailyRate, weeklyRate, monthlyRate, totalHours }
    } catch(e) { return null }
  }, [annualSalary, hoursPerWeek, weeksPerYear, unpaidBreaks])

  const pdfRows = result ? [
    { label: "Hourly Rate (scheduled)", value: result.hourlyRate !== undefined ? String(fmt(result.hourlyRate)) : "" },
    { label: "Hourly Rate (paid hours)", value: result.paidHourlyRate !== undefined ? String(fmt(result.paidHourlyRate)) : "" },
    { label: "Daily Rate", value: result.dailyRate !== undefined ? String(fmt(result.dailyRate)) : "" },
    { label: "Weekly Rate", value: result.weeklyRate !== undefined ? String(fmt(result.weeklyRate)) : "" },
    { label: "Monthly Rate", value: result.monthlyRate !== undefined ? String(fmt(result.monthlyRate)) : "" },
    { label: "Total Hours Worked Per Year", value: result.totalHours !== undefined ? String(result.totalHours) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔄</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Salary to Hourly Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Convert annual salary to hourly rate based on hours worked per week.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(annualSalary)}</span>
                </div>
                <input type="range" min={10000} max={1000000} step={1000}
                  value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Hours Worked Per Week</label>
                  <span className="text-white font-bold text-sm">{`${hoursPerWeek} hrs`}</span>
                </div>
                <input type="range" min={1} max={80} step={1}
                  value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Weeks Worked Per Year</label>
                  <span className="text-white font-bold text-sm">{`${weeksPerYear} wks`}</span>
                </div>
                <input type="range" min={40} max={52} step={1}
                  value={weeksPerYear} onChange={e => setWeeksPerYear(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Unpaid Break Minutes Per Day</label>
                  <span className="text-white font-bold text-sm">{`${unpaidBreaks} min`}</span>
                </div>
                <input type="range" min={0} max={60} step={5}
                  value={unpaidBreaks} onChange={e => setUnpaidBreaks(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Salary to Hourly Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Hourly Rate (scheduled)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.hourlyRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Hourly Rate (paid hours)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.paidHourlyRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Daily Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.dailyRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Weekly Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.weeklyRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Hours Worked Per Year</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.totalHours}
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
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/overtime-pay-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Overtime Pay</h3>
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
              <h3 className="text-white font-semibold mb-2">How do you convert salary to hourly rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Hourly rate = Annual salary / (Hours per week x Weeks per year). For a $65,000 salary at 40 hours/week for 50 weeks: $65,000 / 2,000 = $32.50/hour. The standard formula uses 2,080 hours (40 hours x 52 weeks) for a full-year comparison. Actual effective hourly rate is higher if you get paid time off included in your salary.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good hourly rate equivalent for a salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">By income level: $50,000 salary = $24/hr, $75,000 = $36/hr, $100,000 = $48/hr, $150,000 = $72/hr, $200,000 = $96/hr. For comparison, US federal minimum wage is $7.25/hr. The median US hourly wage is approximately $22/hr. When comparing a salary job to hourly contract work, add 20-30% to the salary equivalent rate for the contractor to break even after self-employment taxes and no benefits.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Does salary always equal more money than hourly?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Not necessarily. Hourly workers may earn more if they get paid for actual overtime worked. A salaried worker required to work 50 hours/week effectively earns less per hour than their nominal rate. Some salaried roles are exempt from overtime and regularly work 50-60 hours, dramatically reducing their effective hourly rate. Always calculate effective hourly rate before accepting a salaried offer.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Salary To Hourly Calculator","item":"https://www.freefincalc.net/salary-to-hourly-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Salary To Hourly Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
