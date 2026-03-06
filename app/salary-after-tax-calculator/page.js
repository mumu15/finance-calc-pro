'use client'
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
  const [stateRate, setStateRate] = useState(5)
  const [preTaxDeduct, setPreTaxDeduct] = useState(5000)

  const result = useMemo(() => {
    try {
      const taxable = Math.max(0, grossSalary - preTaxDeduct)
      // 2026 federal brackets single/married/hoh
      const brackets = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : filingStatus === 'hoh'
        ? [[0,0.10,16550],[16550,0.12,63100],[63100,0.22,100500],[100500,0.24,191950],[191950,0.32,243700],[243700,0.35,609350],[609350,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let fedTax = 0
      for (const [lo, rate, hi] of brackets) {
        if (taxable <= lo) break
        fedTax += (Math.min(taxable, hi) - lo) * rate
      }
      const fica       = Math.min(grossSalary, 168600) * 0.0765
      const stateTax   = grossSalary * (stateRate / 100)
      const totalTax   = fedTax + fica + stateTax
      const takeHome   = grossSalary - totalTax - preTaxDeduct
      const monthly    = takeHome / 12
      const effectiveR = (totalTax / grossSalary * 100).toFixed(1) + '%'
      return { takeHome, monthly, fedTax, fica, stateTax, effectiveR }
    } catch(e) { return null }
  }, [grossSalary, filingStatus, stateRate, preTaxDeduct])

  const pdfRows = result ? [
    { label: "Annual Take-Home Pay", value: result.takeHome !== undefined ? String(fmt(result.takeHome)) : "" },
    { label: "Monthly Take-Home", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Federal Income Tax", value: result.fedTax !== undefined ? String(fmt(result.fedTax)) : "" },
    { label: "FICA Tax", value: result.fica !== undefined ? String(fmt(result.fica)) : "" },
    { label: "State Tax", value: result.stateTax !== undefined ? String(fmt(result.stateTax)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveR !== undefined ? String(result.effectiveR) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Salary After Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your exact take-home pay after federal tax, state tax and FICA deductions.</p>
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
                <input type="range" min={10000} max={500000} step={1000}
                  value={grossSalary} onChange={e => setGrossSalary(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"single","l":"Single"},{"v":"married","l":"Married Joint"},{"v":"hoh","l":"Head of Household"}]).map(o => (
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
                  <span className="text-white font-bold text-sm">{`${stateRate}%`}</span>
                </div>
                <input type="range" min={0} max={13} step={0.25}
                  value={stateRate} onChange={e => setStateRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Pre-Tax Deductions (401k etc)</label>
                  <span className="text-white font-bold text-sm">{fmt(preTaxDeduct)}</span>
                </div>
                <input type="range" min={0} max={30000} step={250}
                  value={preTaxDeduct} onChange={e => setPreTaxDeduct(Number(e.target.value))}
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
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Income Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fedTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">FICA Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fica)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">State Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.stateTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveR}
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

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Calculator</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
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
              <h3 className="text-white font-semibold mb-2">How much tax do I pay on a $75,000 salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A single filer earning $75,000 in 2026 pays approximately: federal income tax $10,300, FICA $5,738, and state tax varies (at 5% = $3,750). Total tax around $19,800, leaving about $55,200 take-home or $4,600/month. A $5,000 401k contribution reduces taxable income and lowers federal tax further.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are pre-tax deductions and why do they matter?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Pre-tax deductions (401k, HSA, health insurance premiums, FSA) reduce your taxable income before federal and state taxes are calculated. A $5,000 401k contribution at a 22% federal rate saves $1,100 in federal tax alone. This is why maxing pre-tax benefits is one of the highest-return financial moves available.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between gross and net salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gross salary is your pay before any deductions. Net salary (take-home pay) is what hits your bank account after all taxes and deductions. The gap between gross and net depends on your tax bracket, state, filing status and pre-tax elections. Understanding this gap is essential for accurate budgeting.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
