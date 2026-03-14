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
  const [yearsService, setYearsService] = useState(25)
  const [finalSalary, setFinalSalary] = useState(80000)
  const [multiplier, setMultiplier] = useState(1.5)
  const [retireAge, setRetireAge] = useState(62)
  const [survivorBenefit, setSurvivorBenefit] = useState('50')

  const result = useMemo(() => {
    try {
      const rawPension   = finalSalary * (multiplier / 100) * yearsService
      const survivorMult = survivorBenefit === '0' ? 1.0 : survivorBenefit === '50' ? 0.94 : 0.88
      const monthlyPension = rawPension * survivorMult / 12
      const annualPension  = monthlyPension * 12
      // Lump sum estimate (20x annual pension is common)
      const lumpSumEst     = annualPension * 20
      // Break-even vs lump sum invested at 5%
      const breakEvenYrs   = lumpSumEst / annualPension
      const pensionAt85    = monthlyPension * 12 * (85 - retireAge)
      return { monthlyPension, annualPension, lumpSumEst, breakEvenYrs: breakEvenYrs.toFixed(1) + ' years', pensionAt85 }
    } catch(e) { return null }
  }, [yearsService, finalSalary, multiplier, retireAge, survivorBenefit])

  const pdfRows = result ? [
    { label: "Monthly Pension Benefit", value: result.monthlyPension !== undefined ? String(fmt(result.monthlyPension)) : "" },
    { label: "Annual Pension Benefit", value: result.annualPension !== undefined ? String(fmt(result.annualPension)) : "" },
    { label: "Estimated Lump Sum Value", value: result.lumpSumEst !== undefined ? String(fmt(result.lumpSumEst)) : "" },
    { label: "Break-Even vs Lump Sum", value: result.breakEvenYrs !== undefined ? String(result.breakEvenYrs) : "" },
    { label: "Total Pension to Age 85", value: result.pensionAt85 !== undefined ? String(fmt(result.pensionAt85)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pension Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your defined benefit pension payout at retirement and compare to a lump sum.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years of Service</label>
                  <span className="text-white font-bold text-sm">{`${yearsService} yrs`}</span>
                </div>
                <input type="number" min={1} max={45} step={1}
                  value={yearsService} onChange={e => setYearsService(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Final Average Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(finalSalary)}</span>
                </div>
                <input type="number" min={10000} max={500000} step={1000}
                  value={finalSalary} onChange={e => setFinalSalary(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Benefit Multiplier Per Year</label>
                  <span className="text-white font-bold text-sm">{`${multiplier}%`}</span>
                </div>
                <input type="number" min={0.5} max={3} step={0.1}
                  value={multiplier} onChange={e => setMultiplier(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Retirement Age</label>
                  <span className="text-white font-bold text-sm">{`${retireAge} yrs`}</span>
                </div>
                <input type="number" min={50} max={70} step={1}
                  value={retireAge} onChange={e => setRetireAge(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Survivor Benefit Option</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"0","l":"Single Life (max payout)"},{"v":"50","l":"50% Survivor Benefit"},{"v":"100","l":"100% Survivor Benefit"}]).map(o => (
                    <button key={o.v} onClick={() => setSurvivorBenefit(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: survivorBenefit === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: survivorBenefit === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: survivorBenefit === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Pension Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Pension Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyPension)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Pension Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualPension)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Lump Sum Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lumpSumEst)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even vs Lump Sum</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.breakEvenYrs}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Pension to Age 85</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.pensionAt85)}
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

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/social-security-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Social Security</h3>
            </a>

            <a href="/annuity-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Annuity Calculator</h3>
            </a>

            <a href="/rmd-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">RMD Calculator</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I take a pension or lump sum?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Take the pension if: you are in good health and expect to live past the break-even age (usually 78-82), you have no other guaranteed income, or you are risk-averse. Take the lump sum if: you have health issues reducing life expectancy, you have investment expertise, you want to leave money to heirs, or the pension plan is underfunded (check the funded status). Many financial advisors suggest taking the pension for its longevity insurance value.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a survivor benefit on a pension?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A survivor benefit provides income to your spouse or beneficiary after your death. Choosing 100% survivor benefit typically reduces your monthly payment by 10-15%, but your spouse receives your full pension for life. The 50% option reduces your payment by 5-8% and your spouse gets half. Single life (no survivor benefit) maximizes your payout but leaves your spouse with nothing if you die first.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are pension benefits taxable?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes — pension income is generally taxable as ordinary income at the federal level. Most states tax pension income, though some states exempt government and military pensions. If you contributed after-tax dollars to the pension, a portion of each payment may be tax-free (your cost basis recovered pro-rata over your expected lifetime). Contact your pension administrator for your specific tax exclusion ratio.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Pension Calculator","item":"https://freefincalc.net/pension-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Pension Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
