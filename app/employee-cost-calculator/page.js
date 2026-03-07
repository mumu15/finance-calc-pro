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
  const [baseSalary, setBaseSalary] = useState(65000)
  const [healthBenefit, setHealthBenefit] = useState(7000)
  const [retirement401k, setRetirement401k] = useState(4)
  const [otherBenefits, setOtherBenefits] = useState(3000)
  const [overheadPct, setOverheadPct] = useState(20)

  const result = useMemo(() => {
    try {
      const employerFICA   = Math.min(baseSalary, 168600) * 0.062 + baseSalary * 0.0145
      const futa           = Math.min(baseSalary, 7000) * 0.006
      const suta           = Math.min(baseSalary, 7000) * 0.027
      const match401k      = baseSalary * (retirement401k / 100)
      const overhead       = baseSalary * (overheadPct / 100)
      const totalCost      = baseSalary + employerFICA + futa + suta + healthBenefit + match401k + otherBenefits + overhead
      const costMultiplier = (totalCost / baseSalary).toFixed(2) + 'x'
      const hourlyTrueCost = (totalCost / 2080).toFixed(2)
      return { totalCost, employerFICA, futa, suta, match401k, overhead, costMultiplier, hourlyTrueCost }
    } catch(e) { return null }
  }, [baseSalary, healthBenefit, retirement401k, otherBenefits, overheadPct])

  const pdfRows = result ? [
    { label: "Total Annual Employee Cost", value: result.totalCost !== undefined ? String(fmt(result.totalCost)) : "" },
    { label: "Employer FICA Taxes", value: result.employerFICA !== undefined ? String(fmt(result.employerFICA)) : "" },
    { label: "Federal Unemployment (FUTA)", value: result.futa !== undefined ? String(fmt(result.futa)) : "" },
    { label: "State Unemployment (SUTA)", value: result.suta !== undefined ? String(fmt(result.suta)) : "" },
    { label: "401k Match Cost", value: result.match401k !== undefined ? String(fmt(result.match401k)) : "" },
    { label: "Overhead Allocation", value: result.overhead !== undefined ? String(fmt(result.overhead)) : "" },
    { label: "Cost Multiplier", value: result.costMultiplier !== undefined ? String(result.costMultiplier) : "" },
    { label: "True Hourly Cost", value: result.hourlyTrueCost !== undefined ? String(result.hourlyTrueCost) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👔</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Employee Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate the true total cost of an employee including taxes, benefits and overhead.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Base Annual Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(baseSalary)}</span>
                </div>
                <input type="range" min={20000} max={500000} step={1000}
                  value={baseSalary} onChange={e => setBaseSalary(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Health Insurance Cost</label>
                  <span className="text-white font-bold text-sm">{fmt(healthBenefit)}</span>
                </div>
                <input type="range" min={0} max={30000} step={250}
                  value={healthBenefit} onChange={e => setHealthBenefit(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">401k Employer Match %</label>
                  <span className="text-white font-bold text-sm">{`${retirement401k}%`}</span>
                </div>
                <input type="range" min={0} max={10} step={0.5}
                  value={retirement401k} onChange={e => setRetirement401k(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other Benefits (PTO cash value, etc)</label>
                  <span className="text-white font-bold text-sm">{fmt(otherBenefits)}</span>
                </div>
                <input type="range" min={0} max={20000} step={250}
                  value={otherBenefits} onChange={e => setOtherBenefits(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Overhead Allocation %</label>
                  <span className="text-white font-bold text-sm">{`${overheadPct}%`}</span>
                </div>
                <input type="range" min={0} max={50} step={5}
                  value={overheadPct} onChange={e => setOverheadPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Employee Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Annual Employee Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Employer FICA Taxes</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.employerFICA)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Unemployment (FUTA)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.futa)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">State Unemployment (SUTA)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.suta)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">401k Match Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.match401k)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Overhead Allocation</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.overhead)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cost Multiplier</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.costMultiplier}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">True Hourly Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.hourlyTrueCost}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or business advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/payroll-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Payroll Tax</h3>
            </a>

            <a href="/freelance-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Freelance Rate</h3>
            </a>

            <a href="/startup-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Startup Cost</h3>
            </a>

            <a href="/break-even-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚖️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Break-Even</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much does an employee really cost beyond salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Total employee cost is typically 1.25-1.40x base salary for hourly workers and 1.30-1.50x for salaried employees with full benefits. On a $65,000 salary: employer FICA $4,972, FUTA/SUTA ~$500, health insurance $7,000+, 401k match $2,600, overhead $13,000. Total can easily reach $90,000-$100,000 per year.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is included in employer payroll taxes?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Employer payroll taxes include: Social Security employer share (6.2% on wages up to $168,600), Medicare employer share (1.45% on all wages), FUTA (0.6% on first $7,000 after state credit), and SUTA (varies by state, typically 1-5% on first $7,000-$50,000). These add approximately 7.5-10% to base wages.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does hiring a contractor compare to an employee?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Contractors cost no employer taxes, no benefits, no unemployment insurance, and no overhead. However contractors typically charge 20-40% more per hour than an equivalent employee to cover their own taxes and benefits. For short-term or specialized work contractors are cheaper. For ongoing full-time roles, employees are usually more cost-effective after factoring productivity and loyalty.</p>
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
