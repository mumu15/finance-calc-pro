'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'

const faqs = [
  {
    "q": "How much should I contribute to my 401k?",
    "a": "At minimum, contribute enough to get your full employer match — that is a 50-100% instant return. Beyond that, aim for 15% of income including employer contributions. The 2026 401k contribution limit is $23,500 ($31,000 if age 50+). Starting early has an enormous impact due to compound growth."
  },
  {
    "q": "What is the employer 401k match?",
    "a": "A common employer match is 50% of contributions up to 6% of salary — meaning if you contribute 6%, your employer adds 3%. Some employers match 100% up to 3-4%. Always contribute at least enough to capture the full employer match; not doing so is leaving free money on the table."
  },
  {
    "q": "What is the 4% rule for retirement?",
    "a": "The 4% rule states you can safely withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, with a high probability your money lasts 30+ years. A $1,000,000 portfolio supports $40,000/year or $3,333/month. It is a guideline, not a guarantee."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [currentBalance, setCurrentBalance] = useState(25000)
  const [annualSalary, setAnnualSalary] = useState(75000)
  const [contribution, setContribution] = useState(10)
  const [employerMatch, setEmployerMatch] = useState(4)
  const [growthRate, setGrowthRate] = useState(7)
  const [yearsToRetire, setYearsToRetire] = useState(30)

  const result = useMemo(() => {
    try {
      const annualContrib = annualSalary * (contribution / 100)
      const employerContrib = annualSalary * (Math.min(contribution, employerMatch) / 100)
      const totalAnnual = annualContrib + employerContrib
      const r = growthRate / 100
      const futureBalance = currentBalance * Math.pow(1+r, yearsToRetire) +
        totalAnnual * (Math.pow(1+r, yearsToRetire) - 1) / r
      const totalContributed = totalAnnual * yearsToRetire + currentBalance
      const growthEarned = futureBalance - totalContributed
      const monthlyRetirement = futureBalance * 0.04 / 12
      return { futureBalance, totalContributed, growthEarned, monthlyRetirement }
    } catch(e) { return null }
  }, [currentBalance, annualSalary, contribution, employerMatch, growthRate, yearsToRetire])

  const pdfRows = result ? [
    { label: "Projected Balance at Retirement", value: result.futureBalance !== undefined ? (fmt(result.futureBalance)) : "" },
    { label: "Total Amount Contributed", value: result.totalContributed !== undefined ? (fmt(result.totalContributed)) : "" },
    { label: "Investment Growth Earned", value: result.growthEarned !== undefined ? (fmt(result.growthEarned)) : "" },
    { label: "Est. Monthly Retirement Income (4%)", value: result.monthlyRetirement !== undefined ? (fmt(result.monthlyRetirement)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👴</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">401k Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Project your 401k balance at retirement based on contributions, employer match and growth.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current 401k Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(currentBalance)}</span>
                </div>
                <input type="range" min={0} max={500000} step={1000}
                  value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(annualSalary)}</span>
                </div>
                <input type="range" min={20000} max={500000} step={1000}
                  value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Your Contribution %</label>
                  <span className="text-white font-bold text-sm">{contribution + "%"}</span>
                </div>
                <input type="range" min={1} max={30} step={1}
                  value={contribution} onChange={e => setContribution(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Employer Match %</label>
                  <span className="text-white font-bold text-sm">{employerMatch + "%"}</span>
                </div>
                <input type="range" min={0} max={10} step={0.5}
                  value={employerMatch} onChange={e => setEmployerMatch(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{growthRate + "%"}</span>
                </div>
                <input type="range" min={1} max={15} step={0.5}
                  value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years Until Retirement</label>
                  <span className="text-white font-bold text-sm">{yearsToRetire + " yrs"}</span>
                </div>
                <input type="range" min={1} max={45} step={1}
                  value={yearsToRetire} onChange={e => setYearsToRetire(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="401k Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Balance at Retirement</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.futureBalance)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Contributed</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalContributed)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Investment Growth Earned</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.growthEarned)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Monthly Retirement Income (4%)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.monthlyRetirement)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              ⚠️ Results are estimates for educational purposes only. Not financial advice.
              Consult a qualified professional before making financial decisions.
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/roth-ira-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Roth IRA Calculator</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👴</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement Calculator</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How much should I contribute to my 401k?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">At minimum, contribute enough to get your full employer match — that is a 50-100% instant return. Beyond that, aim for 15% of income including employer contributions. The 2026 401k contribution limit is $23,500 ($31,000 if age 50+). Starting early has an enormous impact due to compound growth.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the employer 401k match?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A common employer match is 50% of contributions up to 6% of salary — meaning if you contribute 6%, your employer adds 3%. Some employers match 100% up to 3-4%. Always contribute at least enough to capture the full employer match; not doing so is leaving free money on the table.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the 4% rule for retirement?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 4% rule states you can safely withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, with a high probability your money lasts 30+ years. A $1,000,000 portfolio supports $40,000/year or $3,333/month. It is a guideline, not a guarantee.</p>
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
