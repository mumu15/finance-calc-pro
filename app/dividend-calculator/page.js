'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "What is a good dividend yield?",
    "a": "A good dividend yield is typically 2-5%. Yields above 6-7% can signal risk — the stock price may have fallen sharply or the dividend may be unsustainable. Blue-chip dividend stocks (Dividend Aristocrats with 25+ years of increases) typically yield 2-4% with reliable growth."
  },
  {
    "q": "What is dividend reinvestment (DRIP)?",
    "a": "DRIP (Dividend Reinvestment Plan) automatically reinvests your dividends to buy more shares instead of paying cash. Over time this creates compounding — more shares generate more dividends which buy even more shares. DRIP can dramatically increase total returns over 20-30 years."
  },
  {
    "q": "Are dividends taxed?",
    "a": "Qualified dividends (from US stocks held over 60 days) are taxed at 0%, 15% or 20% depending on your income — much lower than ordinary income tax rates. Ordinary dividends (REITs, some foreign stocks) are taxed as ordinary income. Dividends in Roth IRA or 401k accounts grow tax-free."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [shares, setShares] = useState(500)
  const [sharePrice, setSharePrice] = useState(80)
  const [annualDividend, setAnnualDividend] = useState(3.2)
  const [growthRate, setGrowthRate] = useState(5)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    try {
      const portfolioValue = shares * sharePrice
      const annualIncome = shares * annualDividend
      const dividendYield = (annualDividend / sharePrice * 100).toFixed(2) + '%'
      const monthlyIncome = annualIncome / 12
      const futureAnnualIncome = annualIncome * Math.pow(1 + growthRate/100, years)
      const totalDividends = annualIncome * (Math.pow(1 + growthRate/100, years) - 1) / (growthRate/100)
      return { annualIncome, monthlyIncome, dividendYield, futureAnnualIncome, totalDividends }
    } catch(e) { return null }
  }, [shares, sharePrice, annualDividend, growthRate, years])

  const pdfRows = result ? [
    { label: "Annual Dividend Income", value: result.annualIncome !== undefined ? (fmt(result.annualIncome)) : "" },
    { label: "Monthly Dividend Income", value: result.monthlyIncome !== undefined ? (fmt(result.monthlyIncome)) : "" },
    { label: "Dividend Yield", value: result.dividendYield !== undefined ? (String(result.dividendYield)) : "" },
    { label: "Future Annual Income ({years} yrs)", value: result.futureAnnualIncome !== undefined ? (fmt(result.futureAnnualIncome)) : "" },
    { label: "Total Dividends Over Period", value: result.totalDividends !== undefined ? (fmt(result.totalDividends)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💸</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dividend Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate dividend income, yield and the power of dividend reinvestment (DRIP) over time.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Shares</label>
                  <span className="text-white font-bold text-sm">{shares + " shares"}</span>
                </div>
                <input type="range" min={1} max={10000} step={10}
                  value={shares} onChange={e => setShares(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Share Price</label>
                  <span className="text-white font-bold text-sm">{fmt(sharePrice)}</span>
                </div>
                <input type="range" min={1} max={5000} step={1}
                  value={sharePrice} onChange={e => setSharePrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Dividend Per Share</label>
                  <span className="text-white font-bold text-sm">{fmt(annualDividend)}</span>
                </div>
                <input type="range" min={0.01} max={50} step={0.01}
                  value={annualDividend} onChange={e => setAnnualDividend(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Dividend Growth Rate (annual)</label>
                  <span className="text-white font-bold text-sm">{growthRate + "%"}</span>
                </div>
                <input type="range" min={0} max={20} step={0.5}
                  value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investment Horizon</label>
                  <span className="text-white font-bold text-sm">{years + " yrs"}</span>
                </div>
                <input type="range" min={1} max={40} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Dividend Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Dividend Income</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.annualIncome)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Dividend Income</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.monthlyIncome)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Dividend Yield</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.dividendYield}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Future Annual Income ({years} yrs)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.futureAnnualIncome)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Dividends Over Period</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalDividends)}</span>
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

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/stock-profit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Stock Profit</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a good dividend yield?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A good dividend yield is typically 2-5%. Yields above 6-7% can signal risk — the stock price may have fallen sharply or the dividend may be unsustainable. Blue-chip dividend stocks (Dividend Aristocrats with 25+ years of increases) typically yield 2-4% with reliable growth.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is dividend reinvestment (DRIP)?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">DRIP (Dividend Reinvestment Plan) automatically reinvests your dividends to buy more shares instead of paying cash. Over time this creates compounding — more shares generate more dividends which buy even more shares. DRIP can dramatically increase total returns over 20-30 years.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Are dividends taxed?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Qualified dividends (from US stocks held over 60 days) are taxed at 0%, 15% or 20% depending on your income — much lower than ordinary income tax rates. Ordinary dividends (REITs, some foreign stocks) are taxed as ordinary income. Dividends in Roth IRA or 401k accounts grow tax-free.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
