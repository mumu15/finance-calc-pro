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
                    className="slider-upgrade" />
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
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Hourly To Salary Calculator","item":"https://www.freefincalc.net/hourly-to-salary-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Hourly To Salary Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
