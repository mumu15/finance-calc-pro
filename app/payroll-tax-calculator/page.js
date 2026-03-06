'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [grossWages, setGrossWages] = useState(65000)
  const [payFreq, setPayFreq] = useState(26)
  const [sutaRate, setSutaRate] = useState(2.7)
  const [sutaWageBase, setSutaWageBase] = useState(7000)

  const result = useMemo(() => {
    try {
      const perPaycheck = grossWages / payFreq
      const employeeSS   = Math.min(grossWages, 168600) * 0.062
      const employeeMed  = grossWages * 0.0145
      const addlMed      = grossWages > 200000 ? (grossWages - 200000) * 0.009 : 0
      const employeeFICA = employeeSS + employeeMed + addlMed
      const employerSS   = Math.min(grossWages, 168600) * 0.062
      const employerMed  = grossWages * 0.0145
      const futa         = Math.min(grossWages, 7000) * 0.006
      const suta         = Math.min(grossWages, sutaWageBase) * (sutaRate / 100)
      const employerTotal = employerSS + employerMed + futa + suta
      const totalCost    = grossWages + employerTotal
      return { perPaycheck, employeeFICA, employerTotal, futa, suta, totalCost }
    } catch(e) { return null }
  }, [grossWages, payFreq, sutaRate, sutaWageBase])

  const pdfRows = result ? [
    { label: "Gross Pay Per Paycheck", value: result.perPaycheck !== undefined ? String(fmt(result.perPaycheck)) : "" },
    { label: "Employee FICA (annual)", value: result.employeeFICA !== undefined ? String(fmt(result.employeeFICA)) : "" },
    { label: "Employer Payroll Tax (annual)", value: result.employerTotal !== undefined ? String(fmt(result.employerTotal)) : "" },
    { label: "FUTA — Federal Unemployment", value: result.futa !== undefined ? String(fmt(result.futa)) : "" },
    { label: "SUTA — State Unemployment", value: result.suta !== undefined ? String(fmt(result.suta)) : "" },
    { label: "Total Employer Cost of Employee", value: result.totalCost !== undefined ? String(fmt(result.totalCost)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👥</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Payroll Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate employer and employee payroll taxes — FICA, FUTA and state unemployment — per paycheck.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Wages</label>
                  <span className="text-white font-bold text-sm">{fmt(grossWages)}</span>
                </div>
                <input type="range" min={10000} max={300000} step={1000}
                  value={grossWages} onChange={e => setGrossWages(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Pay Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":52,"l":"Weekly"},{"v":26,"l":"Bi-Weekly"},{"v":24,"l":"Semi-Monthly"},{"v":12,"l":"Monthly"}]).map(o => (
                    <button key={o.v} onClick={() => setPayFreq(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: payFreq === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: payFreq === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: payFreq === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">State Unemployment Rate (SUTA)</label>
                  <span className="text-white font-bold text-sm">{`${sutaRate}%`}</span>
                </div>
                <input type="range" min={0} max={10} step={0.1}
                  value={sutaRate} onChange={e => setSutaRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">State Unemployment Wage Base</label>
                  <span className="text-white font-bold text-sm">{fmt(sutaWageBase)}</span>
                </div>
                <input type="range" min={7000} max={60000} step={1000}
                  value={sutaWageBase} onChange={e => setSutaWageBase(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Payroll Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Pay Per Paycheck</span>
                    <span className="font-bold" style={{color:"#f0c842'}}>
                      {fmt(result.perPaycheck)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Employee FICA (annual)</span>
                    <span className="font-bold" style={{color:"#f0c842'}}>
                      {fmt(result.employeeFICA)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Employer Payroll Tax (annual)</span>
                    <span className="font-bold" style={{color:"#f0c842'}}>
                      {fmt(result.employerTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">FUTA — Federal Unemployment</span>
                    <span className="font-bold" style={{color:"#f0c842'}}>
                      {fmt(result.futa)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">SUTA — State Unemployment</span>
                    <span className="font-bold" style={{color:"#f0c842'}}>
                      {fmt(result.suta)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Employer Cost of Employee</span>
                    <span className="font-bold" style={{color:"#f0c842'}}>
                      {fmt(result.totalCost)}
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

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Calculator</h3>
            </a>

            <a href="/self-employment-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Self-Employment Tax</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>

            <a href="/employee-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👔</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Employee Cost</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What payroll taxes does an employer pay?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Employers pay the employer share of FICA (6.2% Social Security + 1.45% Medicare = 7.65%), FUTA (0.6% on first $7,000 after state credit), and SUTA (varies by state, typically 1-5% on the first $7,000-$50,000 of wages). The true cost of an employee is about 7-10% above their gross wages.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between FICA and income tax withholding?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">FICA (Social Security + Medicare) is split equally between employer and employee — each pays 7.65%. Income tax withholding is the employee's estimated federal and state income tax held by the employer and remitted to the IRS. Employers do not pay income tax on behalf of employees — they only withhold and forward it.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When must payroll taxes be deposited?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Deposit schedule depends on your lookback period tax liability. Monthly depositors must deposit by the 15th of the following month. Semi-weekly depositors deposit within 2-3 business days after payday. Very small employers (under $2,500/quarter) can pay with their quarterly Form 941. Penalties for late deposits are 2-15%.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
