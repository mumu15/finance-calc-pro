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
    "q": "How large should my emergency fund be?",
    "a": "Financial experts recommend 3-6 months of essential living expenses. Use 3 months if you have a stable job, low debt, dual income and low fixed expenses. Use 6-12 months if you are self-employed, have variable income, are a single-income household, or work in a volatile industry."
  },
  {
    "q": "Where should I keep my emergency fund?",
    "a": "Keep your emergency fund in a high-yield savings account (HYSA) or money market account. These are FDIC insured, earn 4-5% interest (as of 2026) and are accessible within 1-3 days. Do not invest emergency funds in stocks — they can lose value exactly when you need them."
  },
  {
    "q": "Should I build an emergency fund or pay off debt first?",
    "a": "Build a small starter emergency fund ($1,000-$2,000) first to avoid using credit cards for unexpected expenses, then focus aggressively on high-interest debt. Once high-interest debt is paid off, build your full emergency fund. Low-interest debt (under 5%) can be repaid more slowly while building your fund."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500)
  const [monthsCoverage, setMonthsCoverage] = useState(6)
  const [currentSavings, setCurrentSavings] = useState(2000)
  const [monthlySave, setMonthlySave] = useState(500)

  const result = useMemo(() => {
    try {
      const target = monthlyExpenses * monthsCoverage
      const stillNeeded = Math.max(0, target - currentSavings)
      const monthsToGoal = stillNeeded > 0 ? Math.ceil(stillNeeded / monthlySave) : 0
      const pctComplete = Math.min(100, (currentSavings / target * 100)).toFixed(1) + '%'
      return { target, stillNeeded, monthsToGoal: monthsToGoal > 0 ? monthsToGoal + ' months' : 'Goal reached! 🎉', pctComplete }
    } catch(e) { return null }
  }, [monthlyExpenses, monthsCoverage, currentSavings, monthlySave])

  const pdfRows = result ? [
    { label: "Emergency Fund Target", value: result.target !== undefined ? (fmt(result.target)) : "" },
    { label: "Still Need to Save", value: result.stillNeeded !== undefined ? (fmt(result.stillNeeded)) : "" },
    { label: "Time to Reach Goal", value: result.monthsToGoal !== undefined ? (String(result.monthsToGoal)) : "" },
    { label: "% of Goal Reached", value: result.pctComplete !== undefined ? (String(result.pctComplete)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Emergency Fund Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate exactly how large your emergency fund should be and how long to build it.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Essential Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyExpenses)}</span>
                </div>
                <input type="range" min={500} max={20000} step={100}
                  value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Months of Coverage</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":3,"l":"3 months"},{"v":6,"l":"6 months"},{"v":9,"l":"9 months"},{"v":12,"l":"12 months"}].map(o => (
                    <button key={o.v} onClick={() => setMonthsCoverage(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:monthsCoverage===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:monthsCoverage===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:monthsCoverage===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Emergency Savings</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSavings)}</span>
                </div>
                <input type="range" min={0} max={100000} step={500}
                  value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Savings Contribution</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlySave)}</span>
                </div>
                <input type="range" min={50} max={5000} step={50}
                  value={monthlySave} onChange={e => setMonthlySave(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Emergency Fund Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Emergency Fund Target</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.target)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Still Need to Save</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.stillNeeded)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Reach Goal</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.monthsToGoal}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">% of Goal Reached</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.pctComplete}</span>
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

            <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How large should my emergency fund be?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Financial experts recommend 3-6 months of essential living expenses. Use 3 months if you have a stable job, low debt, dual income and low fixed expenses. Use 6-12 months if you are self-employed, have variable income, are a single-income household, or work in a volatile industry.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Where should I keep my emergency fund?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Keep your emergency fund in a high-yield savings account (HYSA) or money market account. These are FDIC insured, earn 4-5% interest (as of 2026) and are accessible within 1-3 days. Do not invest emergency funds in stocks — they can lose value exactly when you need them.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Should I build an emergency fund or pay off debt first?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Build a small starter emergency fund ($1,000-$2,000) first to avoid using credit cards for unexpected expenses, then focus aggressively on high-interest debt. Once high-interest debt is paid off, build your full emergency fund. Low-interest debt (under 5%) can be repaid more slowly while building your fund.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Emergency Fund Calculator","item":"https://freefincalc.net/emergency-fund-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Emergency Fund Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
