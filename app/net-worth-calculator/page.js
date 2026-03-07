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
    "q": "What is the average net worth by age?",
    "a": "Median US net worth by age (2024 Fed data): Under 35: $39,000. 35-44: $135,000. 45-54: $247,000. 55-64: $365,000. 65-74: $410,000. 75+: $335,000. The mean (average) is much higher due to wealthy outliers. Focus on improving your own trajectory rather than comparing to averages."
  },
  {
    "q": "How do I build net worth quickly?",
    "a": "The fastest net worth builders: (1) increase income aggressively — raises, promotion, side income, (2) keep fixed expenses low — housing and car are the biggest levers, (3) invest early and consistently — compound growth takes time, (4) eliminate high-interest debt — it is anti-wealth, (5) avoid lifestyle inflation as income rises."
  },
  {
    "q": "Should I include home equity in net worth?",
    "a": "Yes, home equity (home value minus mortgage) is a legitimate asset that counts toward net worth. However, since you cannot easily spend home equity without selling or borrowing against it, many financial planners track both total net worth and \"liquid net worth\" (excluding home equity and retirement accounts with penalties)."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [cash, setCash] = useState(15000)
  const [investments, setInvestments] = useState(45000)
  const [retirement, setRetirement] = useState(80000)
  const [homeValue, setHomeValue] = useState(350000)
  const [otherAssets, setOtherAssets] = useState(20000)
  const [mortgageDebt, setMortgageDebt] = useState(280000)
  const [carDebt, setCarDebt] = useState(12000)
  const [creditCardDebt, setCreditCardDebt] = useState(3000)
  const [otherDebt, setOtherDebt] = useState(25000)

  const result = useMemo(() => {
    try {
      const totalAssets = cash + investments + retirement + homeValue + otherAssets
      const totalLiabilities = mortgageDebt + carDebt + creditCardDebt + otherDebt
      const netWorth = totalAssets - totalLiabilities
      const debtToAsset = ((totalLiabilities / totalAssets) * 100).toFixed(1) + '%'
      return { netWorth, totalAssets, totalLiabilities, debtToAsset }
    } catch(e) { return null }
  }, [cash, investments, retirement, homeValue, otherAssets, mortgageDebt, carDebt, creditCardDebt, otherDebt])

  const pdfRows = result ? [
    { label: "Net Worth", value: result.netWorth !== undefined ? (fmt(result.netWorth)) : "" },
    { label: "Total Assets", value: result.totalAssets !== undefined ? (fmt(result.totalAssets)) : "" },
    { label: "Total Liabilities", value: result.totalLiabilities !== undefined ? (fmt(result.totalLiabilities)) : "" },
    { label: "Debt-to-Asset Ratio", value: result.debtToAsset !== undefined ? (String(result.debtToAsset)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Net Worth Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your total net worth by adding assets and subtracting all liabilities.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cash & Savings</label>
                  <span className="text-white font-bold text-sm">{fmt(cash)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={cash} onChange={e => setCash(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investments (stocks, ETFs, crypto)</label>
                  <span className="text-white font-bold text-sm">{fmt(investments)}</span>
                </div>
                <input type="range" min={0} max={1000000} step={1000}
                  value={investments} onChange={e => setInvestments(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Retirement Accounts (401k, IRA)</label>
                  <span className="text-white font-bold text-sm">{fmt(retirement)}</span>
                </div>
                <input type="range" min={0} max={2000000} step={1000}
                  value={retirement} onChange={e => setRetirement(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Home / Real Estate Value</label>
                  <span className="text-white font-bold text-sm">{fmt(homeValue)}</span>
                </div>
                <input type="range" min={0} max={2000000} step={5000}
                  value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other Assets (car, business, etc.)</label>
                  <span className="text-white font-bold text-sm">{fmt(otherAssets)}</span>
                </div>
                <input type="range" min={0} max={500000} step={1000}
                  value={otherAssets} onChange={e => setOtherAssets(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(mortgageDebt)}</span>
                </div>
                <input type="range" min={0} max={1500000} step={5000}
                  value={mortgageDebt} onChange={e => setMortgageDebt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Car Loans</label>
                  <span className="text-white font-bold text-sm">{fmt(carDebt)}</span>
                </div>
                <input type="range" min={0} max={100000} step={500}
                  value={carDebt} onChange={e => setCarDebt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Credit Card Debt</label>
                  <span className="text-white font-bold text-sm">{fmt(creditCardDebt)}</span>
                </div>
                <input type="range" min={0} max={100000} step={250}
                  value={creditCardDebt} onChange={e => setCreditCardDebt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Student Loans & Other Debt</label>
                  <span className="text-white font-bold text-sm">{fmt(otherDebt)}</span>
                </div>
                <input type="range" min={0} max={300000} step={1000}
                  value={otherDebt} onChange={e => setOtherDebt(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Net Worth Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Worth</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.netWorth)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Assets</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalAssets)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Liabilities</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalLiabilities)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Debt-to-Asset Ratio</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.debtToAsset}</span>
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

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement Calculator</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the average net worth by age?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Median US net worth by age (2024 Fed data): Under 35: $39,000. 35-44: $135,000. 45-54: $247,000. 55-64: $365,000. 65-74: $410,000. 75+: $335,000. The mean (average) is much higher due to wealthy outliers. Focus on improving your own trajectory rather than comparing to averages.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I build net worth quickly?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The fastest net worth builders: (1) increase income aggressively — raises, promotion, side income, (2) keep fixed expenses low — housing and car are the biggest levers, (3) invest early and consistently — compound growth takes time, (4) eliminate high-interest debt — it is anti-wealth, (5) avoid lifestyle inflation as income rises.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Should I include home equity in net worth?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes, home equity (home value minus mortgage) is a legitimate asset that counts toward net worth. However, since you cannot easily spend home equity without selling or borrowing against it, many financial planners track both total net worth and "liquid net worth" (excluding home equity and retirement accounts with penalties).</p>
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
