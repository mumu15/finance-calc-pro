'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'


export const metadata = {
  title: 'Contractor Pay Calculator — Free Online Contractor Pay Calculator | FreeFinCalc',
  description: 'Free Contractor Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/contractor-pay-calculator' },
  openGraph: {
    title: 'Contractor Pay Calculator — Free Online Contractor Pay Calculator | FreeFinCalc',
    description: 'Free Contractor Pay Calculator — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.',
    url: 'https://freefincalc.net/contractor-pay-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [hourlyRate, setHourlyRate] = useState(75)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(48)
  const [expenses, setExpenses] = useState(5000)
  const [taxRate, setTaxRate] = useState(22)

  const result = useMemo(() => {
    try {
      const grossAnnual    = hourlyRate * hoursPerWeek * weeksPerYear
      const netProfit      = grossAnnual - expenses
      const seTax          = netProfit * 0.9235 * 0.153
      const seDeduction    = seTax / 2
      const taxableIncome  = netProfit - seDeduction
      const incomeTax      = taxableIncome * (taxRate / 100)
      const totalTax       = seTax + incomeTax
      const takeHome       = grossAnnual - expenses - totalTax
      const effectiveRate  = (totalTax / grossAnnual * 100).toFixed(1) + '%'
      const monthlyTakeHome = takeHome / 12
      const equivSalary    = takeHome / 0.72
      return { grossAnnual, netProfit, seTax, incomeTax, takeHome, monthlyTakeHome, effectiveRate, equivSalary }
    } catch(e) { return null }
  }, [hourlyRate, hoursPerWeek, weeksPerYear, expenses, taxRate])

  const pdfRows = result ? [
    { label: "Annual Gross Revenue", value: result.grossAnnual !== undefined ? String(fmt(result.grossAnnual)) : "" },
    { label: "Net Profit After Expenses", value: result.netProfit !== undefined ? String(fmt(result.netProfit)) : "" },
    { label: "Self-Employment Tax", value: result.seTax !== undefined ? String(fmt(result.seTax)) : "" },
    { label: "Income Tax", value: result.incomeTax !== undefined ? String(fmt(result.incomeTax)) : "" },
    { label: "Annual Take-Home Pay", value: result.takeHome !== undefined ? String(fmt(result.takeHome)) : "" },
    { label: "Monthly Take-Home", value: result.monthlyTakeHome !== undefined ? String(fmt(result.monthlyTakeHome)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? String(result.effectiveRate) : "" },
    { label: "Equivalent Employee Salary", value: result.equivSalary !== undefined ? String(fmt(result.equivSalary)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔧</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contractor Pay Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate contractor hourly rate, take-home pay and equivalent salary after self-employment tax.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Contractor Hourly Rate</label>
                  <span className="text-white font-bold text-sm">{fmt(hourlyRate)}</span>
                </div>
                <input type="range" min={10} max={500} step={5}
                  value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Hours Per Week</label>
                  <span className="text-white font-bold text-sm">{`${hoursPerWeek} hrs`}</span>
                </div>
                <input type="range" min={1} max={60} step={1}
                  value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Billable Weeks Per Year</label>
                  <span className="text-white font-bold text-sm">{`${weeksPerYear} wks`}</span>
                </div>
                <input type="range" min={20} max={52} step={1}
                  value={weeksPerYear} onChange={e => setWeeksPerYear(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Business Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(expenses)}</span>
                </div>
                <input type="range" min={0} max={50000} step={250}
                  value={expenses} onChange={e => setExpenses(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Income Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="range" min={0} max={45} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Contractor Pay Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Gross Revenue</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.grossAnnual)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Profit After Expenses</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Self-Employment Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.seTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Income Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.incomeTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Take-Home Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.takeHome)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Take-Home</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyTakeHome)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Equivalent Employee Salary</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.equivSalary)}
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

            <a href="/self-employment-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SE Tax</h3>
            </a>

            <a href="/freelance-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Freelance Rate</h3>
            </a>

            <a href="/invoice-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Invoice</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much more should a contractor charge vs an employee salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Contractors should charge 1.4-1.6x the equivalent employee hourly rate to break even. As a contractor you pay both halves of FICA (15.3%), receive no benefits (health insurance $500-$700/month), no paid time off, no 401k match, and must cover your own equipment and software. Divide your target take-home by 0.65 to account for taxes, then add benefit costs.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I set my contractor hourly rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Formula: (Target annual salary + benefits value + business expenses + taxes) / billable hours. On a $100,000 target salary: add $15,000 benefits, $5,000 expenses, $30,000 taxes = $150,000 needed. Divide by 1,920 billable hours = $78/hour minimum. Research market rates on Glassdoor, LinkedIn Salary, and industry surveys to validate competitiveness.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I form an LLC as a contractor?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">An LLC provides personal liability protection and potential tax benefits. With a single-member LLC taxed as sole proprietor, tax treatment is identical to freelancing. An S-Corp election (typically worth it above $60,000-$80,000 net profit) lets you split income between salary and distributions, potentially saving $5,000-$15,000 in SE tax annually. Consult a CPA before electing S-Corp status.</p>
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
