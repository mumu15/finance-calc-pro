'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [netProfit, setNetProfit] = useState(75000)
  const [otherIncome, setOtherIncome] = useState(0)
  const [filingStatus, setFilingStatus] = useState('single')
  const [retirement, setRetirement] = useState(5000)

  const result = useMemo(() => {
    try {
      // Self-employment tax calculation
      const seIncome      = netProfit * 0.9235
      const ssTax         = Math.min(seIncome, 168600) * 0.124
      const medicareTax   = seIncome * 0.029
      const addlMedicare  = (netProfit + otherIncome) > (filingStatus === 'married' ? 250000 : 200000) ? seIncome * 0.009 : 0
      const seTax         = ssTax + medicareTax + addlMedicare
      // Deductions
      const seDeduction   = seTax / 2
      const sepContrib    = Math.min(retirement, netProfit * 0.25)
      const totalDeduct   = seDeduction + sepContrib
      const taxableIncome = Math.max(0, netProfit + otherIncome - totalDeduct)
      // Federal income tax estimate
      const stdDeduct     = filingStatus === 'married' ? 29200 : 14600
      const taxable2      = Math.max(0, taxableIncome - stdDeduct)
      const brackets      = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let incomeTax = 0
      for (const [lo, r, hi] of brackets) { if (taxable2 <= lo) break; incomeTax += (Math.min(taxable2, hi) - lo) * r }
      const totalTax      = seTax + incomeTax
      const quarterlyEst  = totalTax / 4
      return { seTax, seDeduction, incomeTax, totalTax, quarterlyEst, totalDeduct }
    } catch(e) { return null }
  }, [netProfit, otherIncome, filingStatus, retirement])

  const pdfRows = result ? [
    { label: "Self-Employment Tax", value: result.seTax !== undefined ? String(fmt(result.seTax)) : "" },
    { label: "SE Tax Deduction (half)", value: result.seDeduction !== undefined ? String(fmt(result.seDeduction)) : "" },
    { label: "Federal Income Tax Est.", value: result.incomeTax !== undefined ? String(fmt(result.incomeTax)) : "" },
    { label: "Total Tax Owed", value: result.totalTax !== undefined ? String(fmt(result.totalTax)) : "" },
    { label: "Quarterly Estimated Pmt", value: result.quarterlyEst !== undefined ? String(fmt(result.quarterlyEst)) : "" },
    { label: "Total Deductions", value: result.totalDeduct !== undefined ? String(fmt(result.totalDeduct)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧾</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Self-Employment Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate self-employment tax, quarterly estimated payments and deductions for freelancers.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Net Self-Employment Profit</label>
                  <span className="text-white font-bold text-sm">{fmt(netProfit)}</span>
                </div>
                <input type="range" min={400} max={500000} step={500}
                  value={netProfit} onChange={e => setNetProfit(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other W-2 or Taxable Income</label>
                  <span className="text-white font-bold text-sm">{fmt(otherIncome)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"single","l":"Single"},{"v":"married","l":"Married Joint"}]).map(o => (
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
                  <label className="text-slate-400 text-sm">Self-Employed Retirement Contrib</label>
                  <span className="text-white font-bold text-sm">{fmt(retirement)}</span>
                </div>
                <input type="range" min={0} max={69000} step={500}
                  value={retirement} onChange={e => setRetirement(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Self-Employment Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Self-Employment Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.seTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">SE Tax Deduction (half)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.seDeduction)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Income Tax Est.</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.incomeTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Tax Owed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Quarterly Estimated Pmt</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.quarterlyEst)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Deductions</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDeduct)}
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

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Income Tax</h3>
            </a>

            <a href="/freelance-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Freelance Rate</h3>
            </a>

            <a href="/invoice-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Invoice</h3>
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
              <h3 className="text-white font-semibold mb-2">What is self-employment tax?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Self-employment tax (SE tax) covers Social Security (12.4%) and Medicare (2.9%) on 92.35% of your net self-employment income — a total of 15.3%. Employees split this 50/50 with employers, but self-employed individuals pay both halves. You can deduct half of SE tax from your gross income, and your net SE income qualifies for retirement contribution deductions.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When must I pay quarterly estimated taxes?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">You must pay quarterly estimated taxes if you expect to owe $1,000+ in federal tax for the year. Due dates: April 15 (Q1), June 15 (Q2), September 15 (Q3), January 15 of next year (Q4). Missing or underpaying triggers an underpayment penalty. Safe harbor: pay 100% of prior year tax (110% if prior year AGI exceeded $150,000) to avoid penalties.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What retirement accounts are available to self-employed people?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Best options: SEP-IRA (contribute up to 25% of net SE income, max $69,000 in 2024 — easiest to set up). Solo 401k (up to $23,000 employee + 25% employer contribution, max $69,000 — best for higher earners, allows Roth contributions). SIMPLE IRA (up to $16,000 employee contributions). A SEP-IRA or Solo 401k dramatically reduces SE tax burden.</p>
            </div>
          </div>
        </div>
      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
