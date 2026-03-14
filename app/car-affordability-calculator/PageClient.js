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
  const [monthlyIncome, setMonthlyIncome] = useState(6000)
  const [downPayment, setDownPayment] = useState(5000)
  const [tradeIn, setTradeIn] = useState(0)
  const [loanRate, setLoanRate] = useState(7)
  const [termMonths, setTermMonths] = useState(60)

  const result = useMemo(() => {
    try {
      // 20/4/10 rule: 20% down, max 4 yr loan, max 10% gross income on transport
      const maxMonthlyPmt  = monthlyIncome * 0.10
      const r              = loanRate / 100 / 12
      const n              = termMonths
      const maxLoan        = r > 0 ? maxMonthlyPmt * (1 - Math.pow(1+r,-n)) / r : maxMonthlyPmt * n
      const downPayAvail   = downPayment + tradeIn
      const maxCar         = maxLoan + downPayAvail
      // Conservative 15% rule
      const maxPmt15       = monthlyIncome * 0.15
      const maxLoan15      = r > 0 ? maxPmt15 * (1 - Math.pow(1+r,-n)) / r : maxPmt15 * n
      const maxCar15       = maxLoan15 + downPayAvail
      const recDownPct     = (downPayAvail / maxCar * 100).toFixed(1) + '%'
      return { maxCar, maxLoan, maxMonthlyPmt, maxCar15, recDownPct }
    } catch(e) { return null }
  }, [monthlyIncome, downPayment, tradeIn, loanRate, termMonths])

  const pdfRows = result ? [
    { label: "Max Affordable Car (10% rule)", value: result.maxCar !== undefined ? String(fmt(result.maxCar)) : "" },
    { label: "Max Loan Amount", value: result.maxLoan !== undefined ? String(fmt(result.maxLoan)) : "" },
    { label: "Max Monthly Payment (10%)", value: result.maxMonthlyPmt !== undefined ? String(fmt(result.maxMonthlyPmt)) : "" },
    { label: "Max Car (15% relaxed rule)", value: result.maxCar15 !== undefined ? String(fmt(result.maxCar15)) : "" },
    { label: "Down Payment as % of Max Car", value: result.recDownPct !== undefined ? String(result.recDownPct) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚘</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Car Affordability Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Find out the maximum car price you can afford based on income and the 20/4/10 rule.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Gross Income</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyIncome)}</span>
                </div>
                <input type="number" min={1000} max={50000} step={100}
                  value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Available Down Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(downPayment)}</span>
                </div>
                <input type="number" min={0} max={100000} step={500}
                  value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Trade-In Value</label>
                  <span className="text-white font-bold text-sm">{fmt(tradeIn)}</span>
                </div>
                <input type="number" min={0} max={50000} step={250}
                  value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Loan Rate</label>
                  <span className="text-white font-bold text-sm">{`${loanRate}%`}</span>
                </div>
                <input type="number" min={0} max={25} step={0.25}
                  value={loanRate} onChange={e => setLoanRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":72,"l":"72 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setTermMonths(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: termMonths === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: termMonths === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: termMonths === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Car Affordability Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Affordable Car (10% rule)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxCar)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Loan Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxLoan)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Monthly Payment (10%)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxMonthlyPmt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Max Car (15% relaxed rule)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.maxCar15)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Down Payment as % of Max Car</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.recDownPct}
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

            <a href="/car-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Loan</h3>
            </a>

            <a href="/lease-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Lease vs Buy</h3>
            </a>

            <a href="/car-depreciation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Depreciation</h3>
            </a>

            <a href="/fuel-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⛽</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Fuel Cost</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the 20/4/10 rule for buying a car?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 20/4/10 rule: put at least 20% down, finance for no more than 4 years, and keep total vehicle expenses (payment + insurance + gas) under 10% of gross monthly income. On a $6,000/month income that is $600 max. With insurance and gas taking $250-$350, your loan payment should stay under $250-$350/month, pointing to a car in the $15,000-$20,000 range with 20% down.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much car can I afford on my salary?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">General guidance: spend no more than 20-35% of your annual take-home pay on a car. On a $60,000 take-home ($5,000/month) that is $12,000-$21,000. The lower end is financially safer. Remember the purchase price is only part of the cost — insurance, fuel, maintenance and registration add $200-$800/month on top of the loan payment.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I buy new or used?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Used cars typically offer 30-50% lower purchase price, lower insurance premiums, slower depreciation (new cars lose 20% in year one), and similar reliability for models 2-4 years old (still under warranty). Buy new when: 0% financing promotions make it cost-competitive, you plan to keep the car 10+ years, or the specific model has poor used car reliability history.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Car Affordability Calculator","item":"https://www.freefincalc.net/car-affordability-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Car Affordability Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
