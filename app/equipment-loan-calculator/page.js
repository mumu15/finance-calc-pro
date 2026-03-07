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
  const [equipCost, setEquipCost] = useState(50000)
  const [downPmt, setDownPmt] = useState(10000)
  const [rate, setRate] = useState(7)
  const [termYears, setTermYears] = useState(5)
  const [taxBenefit, setTaxBenefit] = useState(25)

  const result = useMemo(() => {
    try {
      const loan    = equipCost - downPmt
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n + downPmt
      const interest= monthly * n - loan
      // Section 179 deduction benefit (full cost deductible in year 1)
      const taxSaving = equipCost * (taxBenefit / 100)
      const netCost  = total - taxSaving
      return { loan, monthly, interest, total, taxSaving, netCost }
    } catch(e) { return null }
  }, [equipCost, downPmt, rate, termYears, taxBenefit])

  const pdfRows = result ? [
    { label: "Loan Amount", value: result.loan !== undefined ? String(fmt(result.loan)) : "" },
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "Total Cost", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Sec 179 Tax Saving (est.)", value: result.taxSaving !== undefined ? String(fmt(result.taxSaving)) : "" },
    { label: "Net Cost After Tax Benefit", value: result.netCost !== undefined ? String(fmt(result.netCost)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚙️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Equipment Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly payments and total cost for financing business or personal equipment.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Equipment Cost</label>
                  <span className="text-white font-bold text-sm">{fmt(equipCost)}</span>
                </div>
                <input type="range" min={1000} max={2000000} step={500}
                  value={equipCost} onChange={e => setEquipCost(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(downPmt)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={downPmt} onChange={e => setDownPmt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="range" min={1} max={20} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":2,"l":"2 yrs"},{"v":3,"l":"3 yrs"},{"v":5,"l":"5 yrs"},{"v":7,"l":"7 yrs"},{"v":10,"l":"10 yrs"}]).map(o => (
                    <button key={o.v} onClick={() => setTermYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: termYears === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: termYears === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: termYears === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Tax Bracket (for deduction)</label>
                  <span className="text-white font-bold text-sm">{`${taxBenefit}%`}</span>
                </div>
                <input type="range" min={0} max={40} step={1}
                  value={taxBenefit} onChange={e => setTaxBenefit(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Equipment Loan Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.loan)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Sec 179 Tax Saving (est.)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxSaving)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Cost After Tax Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netCost)}
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

            <a href="/business-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Loan</h3>
            </a>

            <a href="/sba-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SBA Loan</h3>
            </a>

            <a href="/startup-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Startup Cost</h3>
            </a>

            <a href="/loan-comparison-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Comparison</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is Section 179 equipment deduction?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Section 179 allows businesses to deduct the full purchase price of qualifying equipment in the year of purchase rather than depreciating it over years. In 2024 the limit is $1,160,000 of equipment with a phase-out starting at $2,890,000. This can create significant first-year tax savings — a $50,000 equipment purchase at 25% tax rate saves $12,500 in taxes in year one.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Equipment loan vs equipment lease: which is better?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Buy (loan) when: you will use the equipment for its full useful life, it holds value, and you want the Section 179 deduction upfront. Lease when: you need to upgrade frequently (technology equipment), you want lower monthly payments, or you want off-balance-sheet financing. Operating leases also allow full deduction of lease payments as business expenses.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What types of equipment qualify for financing?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Virtually any business equipment qualifies: heavy machinery, construction equipment, medical equipment, restaurant equipment, IT and technology, vehicles, manufacturing equipment, agricultural equipment, and office furniture. Most lenders require the equipment to have a useful life matching or exceeding the loan term. Used equipment typically qualifies for shorter terms.</p>
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
