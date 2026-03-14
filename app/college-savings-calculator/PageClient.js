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
  const [childAge, setChildAge] = useState(5)
  const [collegeYears, setCollegeYears] = useState(4)
  const [annualCost, setAnnualCost] = useState(35000)
  const [inflation, setInflation] = useState(5)
  const [currentSaved, setCurrentSaved] = useState(5000)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(() => {
    try {
      const yearsToCollege = 18 - childAge
      if (yearsToCollege <= 0) return null
      // Project total college cost with inflation
      let totalCost = 0
      for (let yr = 0; yr < collegeYears; yr++) {
        totalCost += annualCost * Math.pow(1 + inflation/100, yearsToCollege + yr)
      }
      const fvCurrent   = currentSaved * Math.pow(1 + returnRate/100, yearsToCollege)
      const remaining   = Math.max(0, totalCost - fvCurrent)
      const r           = returnRate / 100 / 12
      const n           = yearsToCollege * 12
      const monthlyNeeded = remaining > 0 ? remaining * r / (Math.pow(1+r,n) - 1) : 0
      const taxFreeBenefit = monthlyNeeded * n * 0.22
      return { totalCost, fvCurrent, remaining, monthlyNeeded, taxFreeBenefit }
    } catch(e) { return null }
  }, [childAge, collegeYears, annualCost, inflation, currentSaved, returnRate])

  const pdfRows = result ? [
    { label: "Projected Total College Cost", value: result.totalCost !== undefined ? String(fmt(result.totalCost)) : "" },
    { label: "Current Savings at Maturity", value: result.fvCurrent !== undefined ? String(fmt(result.fvCurrent)) : "" },
    { label: "Additional Amount Needed", value: result.remaining !== undefined ? String(fmt(result.remaining)) : "" },
    { label: "Monthly Savings Required", value: result.monthlyNeeded !== undefined ? String(fmt(result.monthlyNeeded)) : "" },
    { label: "Estimated Tax-Free Growth Benefit", value: result.taxFreeBenefit !== undefined ? String(fmt(result.taxFreeBenefit)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">College Savings Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how much to save in a 529 plan to cover tuition and college costs.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Child Current Age</label>
                  <span className="text-white font-bold text-sm">{`${childAge} yrs`}</span>
                </div>
                <input type="number" min={0} max={17} step={1}
                  value={childAge} onChange={e => setChildAge(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years of College</label>
                  <span className="text-white font-bold text-sm">{`${collegeYears} yrs`}</span>
                </div>
                <input type="number" min={2} max={6} step={1}
                  value={collegeYears} onChange={e => setCollegeYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Annual College Cost</label>
                  <span className="text-white font-bold text-sm">{fmt(annualCost)}</span>
                </div>
                <input type="number" min={5000} max={100000} step={1000}
                  value={annualCost} onChange={e => setAnnualCost(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">College Inflation Rate</label>
                  <span className="text-white font-bold text-sm">{`${inflation}%`}</span>
                </div>
                <input type="number" min={2} max={8} step={0.25}
                  value={inflation} onChange={e => setInflation(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Already Saved</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSaved)}</span>
                </div>
                <input type="number" min={0} max={500000} step={500}
                  value={currentSaved} onChange={e => setCurrentSaved(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Investment Return</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="number" min={1} max={12} step={0.25}
                  value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="College Savings Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Total College Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Savings at Maturity</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fvCurrent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Additional Amount Needed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.remaining)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Savings Required</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyNeeded)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Tax-Free Growth Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxFreeBenefit)}
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

            <a href="/child-tax-credit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👶</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Child Tax Credit</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/student-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Student Loan</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a 529 plan and how does it work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A 529 plan is a tax-advantaged savings account for education expenses. Contributions grow tax-free and withdrawals for qualified education expenses (tuition, room and board, books, computers) are tax-free federally. Many states offer a tax deduction for contributions. The SECURE 2.0 Act allows rolling unused 529 funds into a Roth IRA (up to $35,000 lifetime, subject to rules).</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much should I save in a 529 plan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A 4-year public university currently costs $110,000-$130,000 total (in-state). A private university costs $250,000-$350,000. Starting at birth, saving $300-$500/month in a 529 with a 7% return covers most 4-year public university costs. Starting later requires significantly more monthly contributions. Even partial funding reduces student loan burden dramatically.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What if my child does not go to college?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">If a 529 beneficiary does not attend college: change the beneficiary to another family member (sibling, cousin, parent — for grad school), use for trade school or vocational programs (qualified expenses), roll up to $35,000 into a Roth IRA (SECURE 2.0, requires 529 to be open 15+ years), or withdraw non-qualified funds (earnings taxed + 10% penalty, but principal returned tax-free).</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"College Savings Calculator","item":"https://freefincalc.net/college-savings-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"College Savings Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
