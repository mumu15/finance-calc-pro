'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [grossPay, setGrossPay] = useState(3000)
  const [payFreq, setPayFreq] = useState('biweekly')
  const [fedAllowances, setFedAllowances] = useState(0)
  const [stateRate, setStateRate] = useState(5)
  const [retirement401k, setRetirement401k] = useState(6)
  const [healthInsur, setHealthInsur] = useState(150)

  const result = useMemo(() => {
    try {
      const freqMap   = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 }
      const perYear   = freqMap[payFreq] || 26
      const annualGross = grossPay * perYear
      const k401       = grossPay * (retirement401k / 100)
      const preTax     = k401 + healthInsur
      const taxableGross = grossPay - preTax
      // Federal withholding estimate
      const annualTaxable = taxableGross * perYear
      const brackets = [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let annualFed = 0
      for (const [lo, rate, hi] of brackets) {
        if (annualTaxable <= lo) break
        annualFed += (Math.min(annualTaxable, hi) - lo) * rate
      }
      const fedWithholding  = annualFed / perYear + fedAllowances / perYear
      const ficaWithholding = taxableGross * 0.0765
      const stateWithholding = taxableGross * (stateRate / 100)
      const totalDeductions  = preTax + fedWithholding + ficaWithholding + stateWithholding
      const netPay           = grossPay - totalDeductions
      return { netPay, k401, fedWithholding, ficaWithholding, stateWithholding, totalDeductions }
    } catch(e) { return null }
  }, [grossPay, payFreq, fedAllowances, stateRate, retirement401k, healthInsur])

  const pdfRows = result ? [
    { label: "Net Pay Per Paycheck", value: result.netPay !== undefined ? String(fmt(result.netPay)) : "" },
    { label: "401k Contribution", value: result.k401 !== undefined ? String(fmt(result.k401)) : "" },
    { label: "Federal Tax Withheld", value: result.fedWithholding !== undefined ? String(fmt(result.fedWithholding)) : "" },
    { label: "FICA Withheld", value: result.ficaWithholding !== undefined ? String(fmt(result.ficaWithholding)) : "" },
    { label: "State Tax Withheld", value: result.stateWithholding !== undefined ? String(fmt(result.stateWithholding)) : "" },
    { label: "Total Deductions", value: result.totalDeductions !== undefined ? String(fmt(result.totalDeductions)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💵</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Net Pay Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your exact net pay per paycheck after all federal, state and local deductions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Gross Pay Per Period</label>
                  <span className="text-white font-bold text-sm">{fmt(grossPay)}</span>
                </div>
                <input type="range" min={100} max={50000} step={50}
                  value={grossPay} onChange={e => setGrossPay(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Pay Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"weekly","l":"Weekly"},{"v":"biweekly","l":"Bi-Weekly"},{"v":"semimonthly","l":"Semi-Monthly"},{"v":"monthly","l":"Monthly"}]).map(o => (
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
                  <label className="text-slate-400 text-sm">Federal Withholding (W-4 extra)</label>
                  <span className="text-white font-bold text-sm">{fmt(fedAllowances)}</span>
                </div>
                <input type="range" min={0} max={2000} step={50}
                  value={fedAllowances} onChange={e => setFedAllowances(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
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
                  <label className="text-slate-400 text-sm">401k Contribution %</label>
                  <span className="text-white font-bold text-sm">{`${retirement401k}%`}</span>
                </div>
                <input type="range" min={0} max={30} step={0.5}
                  value={retirement401k} onChange={e => setRetirement401k(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Health Insurance Premium</label>
                  <span className="text-white font-bold text-sm">{fmt(healthInsur)}</span>
                </div>
                <input type="range" min={0} max={1000} step={10}
                  value={healthInsur} onChange={e => setHealthInsur(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Net Pay Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Pay Per Paycheck</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netPay)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">401k Contribution</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.k401)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Tax Withheld</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fedWithholding)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">FICA Withheld</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.ficaWithholding)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">State Tax Withheld</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.stateWithholding)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Deductions</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDeductions)}
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

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>

            <a href="/budget-planner-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Planner</h3>
            </a>

            <a href="/tax-refund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Refund</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I increase my net pay?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Increase net pay by: increasing pre-tax deductions (401k, HSA, FSA) which lower taxable income, adjusting W-4 withholding if you consistently get large refunds, checking that your filing status is correct, and ensuring all eligible deductions are claimed. Paradoxically, contributing more to a 401k often has a smaller net pay impact than expected due to tax savings.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between gross and net pay?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Gross pay is your salary or hourly rate before any deductions. Net pay is what you actually receive after federal income tax withholding, FICA (Social Security and Medicare), state and local taxes, and voluntary pre-tax deductions like 401k and health insurance. Net pay is typically 65-80% of gross depending on your tax situation.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Why does my paycheck vary each period?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Paychecks vary due to: overtime worked, bonuses paid, changes in health insurance premiums, 401k contribution adjustments, commissions, reaching Social Security wage base ($168,600 in 2024 — FICA stops after this), or state/local tax changes. Year-end paychecks may also differ due to annual benefit adjustments.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
