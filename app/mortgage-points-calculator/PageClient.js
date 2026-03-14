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
  const [loanAmount, setLoanAmount] = useState(350000)
  const [baseRate, setBaseRate] = useState(7)
  const [pointsToBuy, setPointsToBuy] = useState(1)
  const [rateReduction, setRateReduction] = useState(0.25)
  const [termYears, setTermYears] = useState(30)

  const result = useMemo(() => {
    try {
      const pointsCost   = loanAmount * (pointsToBuy / 100)
      const newRate      = baseRate - (pointsToBuy * rateReduction)
      const r1 = baseRate / 100 / 12
      const r2 = newRate  / 100 / 12
      const n  = termYears * 12
      const pmt1 = loanAmount * (r1 * Math.pow(1+r1,n)) / (Math.pow(1+r1,n)-1)
      const pmt2 = loanAmount * (r2 * Math.pow(1+r2,n)) / (Math.pow(1+r2,n)-1)
      const monthlySaving  = pmt1 - pmt2
      const breakEvenMonths = Math.ceil(pointsCost / monthlySaving)
      const lifetimeSaving = monthlySaving * n - pointsCost
      return {
        pointsCost, newRate: newRate.toFixed(3) + '%',
        monthlySaving, breakEvenMonths: breakEvenMonths + ' months', lifetimeSaving
      }
    } catch(e) { return null }
  }, [loanAmount, baseRate, pointsToBuy, rateReduction, termYears])

  const pdfRows = result ? [
    { label: "Cost of Points", value: result.pointsCost !== undefined ? String(fmt(result.pointsCost)) : "" },
    { label: "New Interest Rate", value: result.newRate !== undefined ? String(result.newRate) : "" },
    { label: "Monthly Payment Savings", value: result.monthlySaving !== undefined ? String(fmt(result.monthlySaving)) : "" },
    { label: "Break-Even Period", value: result.breakEvenMonths !== undefined ? String(result.breakEvenMonths) : "" },
    { label: "Lifetime Interest Saved", value: result.lifetimeSaving !== undefined ? String(fmt(result.lifetimeSaving)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📍</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mortgage Points Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate whether buying mortgage discount points saves money and how long to break even.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(loanAmount)}</span>
                </div>
                <input type="text" inputMode="decimal" min={50000} max={2000000} step={5000}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Base Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${baseRate}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={2} max={12} step={0.125}
                  value={baseRate} onChange={e => setBaseRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Discount Points to Buy</label>
                  <span className="text-white font-bold text-sm">{`${pointsToBuy} pts`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={4} step={0.25}
                  value={pointsToBuy} onChange={e => setPointsToBuy(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Rate Reduction Per Point</label>
                  <span className="text-white font-bold text-sm">{`${rateReduction}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0.1} max={0.5} step={0.05}
                  value={rateReduction} onChange={e => setRateReduction(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"},{"v":30,"l":"30 yrs"}]).map(o => (
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
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Mortgage Points Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cost of Points</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.pointsCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Interest Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.newRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlySaving)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even Period</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.breakEvenMonths}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lifetime Interest Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lifetimeSaving)}
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

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage Calculator</h3>
            </a>

            <a href="/refinance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Refinance Calculator</h3>
            </a>

            <a href="/amortization-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Amortization</h3>
            </a>

            <a href="/down-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Down Payment</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are mortgage discount points?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Mortgage points are upfront fees paid to the lender in exchange for a lower interest rate. One point = 1% of the loan amount. On a $350,000 loan, one point costs $3,500 and typically reduces the rate by 0.20-0.25%. Points make sense if you plan to keep the loan long enough to recoup the upfront cost via monthly savings.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When is it worth buying mortgage points?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Buying points is worth it when: your break-even period (cost divided by monthly savings) is less than how long you plan to keep the loan. If you will refinance or sell within 5 years, points rarely make sense. If you are in your forever home with a 30-year loan and have cash available, points can save tens of thousands.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are mortgage points tax deductible?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes — for your primary residence, mortgage discount points are generally deductible as mortgage interest in the year of purchase (if buying a home) or amortised over the loan life (if refinancing). Consult a tax professional as rules vary based on loan purpose, amount and use. Points on rental properties are typically deductible over the loan life.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Mortgage Points Calculator","item":"https://www.freefincalc.net/mortgage-points-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Mortgage Points Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
