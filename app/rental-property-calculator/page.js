'use client'
export { metadata } from './metadata'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [purchasePrice, setPurchasePrice] = useState(350000)
  const [downPct, setDownPct] = useState(25)
  const [mortgageRate, setMortgageRate] = useState(7)
  const [monthlyRent, setMonthlyRent] = useState(2200)
  const [vacancyRate, setVacancyRate] = useState(5)
  const [expenses, setExpenses] = useState(600)

  const result = useMemo(() => {
    try {
      const downPayment   = purchasePrice * (downPct / 100)
      const loanAmount    = purchasePrice - downPayment
      const r             = mortgageRate / 100 / 12
      const n             = 30 * 12
      const mortgage      = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const effectiveRent = monthlyRent * (1 - vacancyRate/100)
      const noi           = effectiveRent - expenses
      const cashFlow      = noi - mortgage
      const annualCashFlow = cashFlow * 12
      const capRate       = (noi * 12 / purchasePrice * 100).toFixed(2) + '%'
      const cashOnCash    = (annualCashFlow / downPayment * 100).toFixed(2) + '%'
      const grossYield    = (monthlyRent * 12 / purchasePrice * 100).toFixed(2) + '%'
      return { mortgage, effectiveRent, noi, cashFlow, annualCashFlow, capRate, cashOnCash, grossYield }
    } catch(e) { return null }
  }, [purchasePrice, downPct, mortgageRate, monthlyRent, vacancyRate, expenses])

  const pdfRows = result ? [
    { label: "Monthly Mortgage Payment", value: result.mortgage !== undefined ? String(fmt(result.mortgage)) : "" },
    { label: "Effective Monthly Rent", value: result.effectiveRent !== undefined ? String(fmt(result.effectiveRent)) : "" },
    { label: "Net Operating Income (NOI)", value: result.noi !== undefined ? String(fmt(result.noi)) : "" },
    { label: "Monthly Cash Flow", value: result.cashFlow !== undefined ? String(fmt(result.cashFlow)) : "" },
    { label: "Annual Cash Flow", value: result.annualCashFlow !== undefined ? String(fmt(result.annualCashFlow)) : "" },
    { label: "Cap Rate", value: result.capRate !== undefined ? String(result.capRate) : "" },
    { label: "Cash-on-Cash Return", value: result.cashOnCash !== undefined ? String(result.cashOnCash) : "" },
    { label: "Gross Rental Yield", value: result.grossYield !== undefined ? String(result.grossYield) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rental Property Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Analyze rental property cash flow, ROI, cap rate and return on investment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Purchase Price</label>
                  <span className="text-white font-bold text-sm">{fmt(purchasePrice)}</span>
                </div>
                <input type="range" min={50000} max={5000000} step={5000}
                  value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment</label>
                  <span className="text-white font-bold text-sm">{`${downPct}%`}</span>
                </div>
                <input type="range" min={5} max={50} step={5}
                  value={downPct} onChange={e => setDownPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage Rate</label>
                  <span className="text-white font-bold text-sm">{`${mortgageRate}%`}</span>
                </div>
                <input type="range" min={1} max={15} step={0.25}
                  value={mortgageRate} onChange={e => setMortgageRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Gross Rent</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyRent)}</span>
                </div>
                <input type="range" min={200} max={20000} step={50}
                  value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Vacancy Rate</label>
                  <span className="text-white font-bold text-sm">{`${vacancyRate}%`}</span>
                </div>
                <input type="range" min={0} max={20} step={1}
                  value={vacancyRate} onChange={e => setVacancyRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Operating Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(expenses)}</span>
                </div>
                <input type="range" min={0} max={5000} step={50}
                  value={expenses} onChange={e => setExpenses(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Rental Property Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Mortgage Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.mortgage)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Monthly Rent</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.effectiveRent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Operating Income (NOI)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.noi)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Cash Flow</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.cashFlow)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Cash Flow</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualCashFlow)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cap Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.capRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cash-on-Cash Return</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.cashOnCash}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Rental Yield</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.grossYield}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or tax advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/cap-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cap Rate</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>

            <a href="/roi-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">ROI Calculator</h3>
            </a>

            <a href="/house-flipping-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔨</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">House Flipping</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good cap rate for rental property?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A cap rate of 5-10% is generally considered good for residential rental property. Urban/coastal markets (NYC, SF, LA) often have cap rates of 3-5% due to appreciation potential. Midwest and Sun Belt markets may offer 7-10%+ cap rates. Cap rate = NOI / Purchase Price. Higher cap rates mean more income relative to price but may reflect higher risk.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is cash-on-cash return?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Cash-on-cash return measures annual cash flow as a percentage of your actual cash invested (down payment plus closing costs). It is the most practical measure of rental property performance for leveraged investors. A cash-on-cash return of 6-12% is considered solid. Unlike cap rate, it accounts for your financing structure.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What expenses should I budget for a rental property?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Budget for: property taxes (1-2% of value/year), insurance ($100-200/month), maintenance (1% of value/year), property management (8-12% of rent if using a manager), vacancy (5-10%), CapEx reserves for big repairs like roof, HVAC, appliances (5-10% of rent). New landlords frequently underestimate expenses by 30-50%.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
