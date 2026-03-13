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
  const [annualIncome, setAnnualIncome] = useState(80000)
  const [yearsToReplace, setYearsToReplace] = useState(20)
  const [existingDebt, setExistingDebt] = useState(250000)
  const [childrenCosts, setChildrenCosts] = useState(80000)
  const [existingAssets, setExistingAssets] = useState(100000)
  const [existingCoverage, setExistingCoverage] = useState(0)

  const result = useMemo(() => {
    try {
      const incomeNeed    = annualIncome * yearsToReplace
      const totalNeed     = incomeNeed + existingDebt + childrenCosts
      const netNeed       = Math.max(0, totalNeed - existingAssets - existingCoverage)
      const dimeMethod    = annualIncome * 10 + existingDebt + childrenCosts + (annualIncome * 4)
      const humanLifeVal  = annualIncome * yearsToReplace
      return { incomeNeed, totalNeed, netNeed, dimeMethod, humanLifeVal }
    } catch(e) { return null }
  }, [annualIncome, yearsToReplace, existingDebt, childrenCosts, existingAssets, existingCoverage])

  const pdfRows = result ? [
    { label: "Income Replacement Need", value: result.incomeNeed !== undefined ? String(fmt(result.incomeNeed)) : "" },
    { label: "Total Coverage Needed", value: result.totalNeed !== undefined ? String(fmt(result.totalNeed)) : "" },
    { label: "Net Additional Coverage", value: result.netNeed !== undefined ? String(fmt(result.netNeed)) : "" },
    { label: "DIME Method Estimate", value: result.dimeMethod !== undefined ? String(fmt(result.dimeMethod)) : "" },
    { label: "Human Life Value Estimate", value: result.humanLifeVal !== undefined ? String(fmt(result.humanLifeVal)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Life Insurance Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much life insurance coverage you need to protect your family.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Income to Replace</label>
                  <span className="text-white font-bold text-sm">{fmt(annualIncome)}</span>
                </div>
                <input type="range" min={10000} max={500000} step={1000}
                  value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years of Income to Replace</label>
                  <span className="text-white font-bold text-sm">{`${yearsToReplace} yrs`}</span>
                </div>
                <input type="range" min={1} max={30} step={1}
                  value={yearsToReplace} onChange={e => setYearsToReplace(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Debts to Pay Off</label>
                  <span className="text-white font-bold text-sm">{fmt(existingDebt)}</span>
                </div>
                <input type="range" min={0} max={2000000} step={5000}
                  value={existingDebt} onChange={e => setExistingDebt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Future Education Costs</label>
                  <span className="text-white font-bold text-sm">{fmt(childrenCosts)}</span>
                </div>
                <input type="range" min={0} max={500000} step={5000}
                  value={childrenCosts} onChange={e => setChildrenCosts(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Existing Assets and Savings</label>
                  <span className="text-white font-bold text-sm">{fmt(existingAssets)}</span>
                </div>
                <input type="range" min={0} max={2000000} step={5000}
                  value={existingAssets} onChange={e => setExistingAssets(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Existing Life Insurance</label>
                  <span className="text-white font-bold text-sm">{fmt(existingCoverage)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={5000}
                  value={existingCoverage} onChange={e => setExistingCoverage(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Life Insurance Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Income Replacement Need</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.incomeNeed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Coverage Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalNeed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Additional Coverage</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netNeed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">DIME Method Estimate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.dimeMethod)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Human Life Value Estimate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.humanLifeVal)}
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

            <a href="/estate-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Estate Tax</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/pension-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Pension</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much life insurance do I need?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A common rule of thumb is 10-12x your annual income. For more precision use the DIME method: Debt + Income (years needed x annual income) + Mortgage + Education. A $80,000 earner with $300,000 mortgage, $80,000 education costs and 20-year need = approximately $1,980,000 in coverage. Subtract existing savings and any current coverage to find the gap.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Term vs whole life insurance: which is better?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Term life insurance is almost always the better financial choice for most people. A 20-year $1M term policy for a healthy 35-year-old costs $40-$60/month. The same coverage in whole life costs $600-$900/month. The standard advice: buy term and invest the difference. Whole life can make sense in very specific estate planning scenarios for high-net-worth individuals.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When should I buy life insurance?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Buy as early as possible — premiums are lowest when you are young and healthy. Key life triggers: marriage, having children, buying a home, starting a business, or becoming someone primary breadwinner. Do not wait for health issues to develop. A 30-year-old in good health pays 50-70% less than a 45-year-old for the same coverage. Lock in low rates while you can.</p>
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
