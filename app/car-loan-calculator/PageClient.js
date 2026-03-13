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
  const [vehiclePrice, setVehiclePrice] = useState(35000)
  const [downPayment, setDownPayment] = useState(5000)
  const [tradeIn, setTradeIn] = useState(0)
  const [loanRate, setLoanRate] = useState(7)
  const [termMonths, setTermMonths] = useState(60)

  const result = useMemo(() => {
    try {
      const loanAmount   = vehiclePrice - downPayment - tradeIn
      if (loanAmount <= 0) return null
      const r            = loanRate / 100 / 12
      const n            = termMonths
      const monthly      = r === 0 ? loanAmount/n : loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalPaid    = monthly * n + downPayment + tradeIn
      const totalInterest= monthly * n - loanAmount
      const costPerMonth = totalPaid / n
      return { loanAmount, monthly, totalInterest, totalPaid, costPerMonth }
    } catch(e) { return null }
  }, [vehiclePrice, downPayment, tradeIn, loanRate, termMonths])

  const pdfRows = result ? [
    { label: "Loan Amount", value: result.loanAmount !== undefined ? String(fmt(result.loanAmount)) : "" },
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Vehicle Cost", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "True Monthly Cost", value: result.costPerMonth !== undefined ? String(fmt(result.costPerMonth)) : "" },
  ] : []

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Car Loan Calculator", "item": "https://freefincalc.net/car-loan-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Car Loan Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚗</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Car Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly car loan payments, total interest and true cost of financing a vehicle.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Vehicle Price</label>
                  <span className="text-white font-bold text-sm">{fmt(vehiclePrice)}</span>
                </div>
                <input type="range" min={1000} max={200000} step={500}
                  value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(downPayment)}</span>
                </div>
                <input type="range" min={0} max={100000} step={500}
                  value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Trade-In Value</label>
                  <span className="text-white font-bold text-sm">{fmt(tradeIn)}</span>
                </div>
                <input type="range" min={0} max={50000} step={250}
                  value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${loanRate}%`}</span>
                </div>
                <input type="range" min={0} max={25} step={0.25}
                  value={loanRate} onChange={e => setLoanRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":72,"l":"72 mo"},{"v":84,"l":"84 mo"}]).map(o => (
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
                {result && <PdfDownload title="Car Loan Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.loanAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Vehicle Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">True Monthly Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.costPerMonth)}
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

            <a href="/lease-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Lease vs Buy</h3>
            </a>

            <a href="/car-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚘</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Affordability</h3>
            </a>

            <a href="/car-depreciation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Depreciation</h3>
            </a>

            <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good interest rate for a car loan in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Average car loan rates in 2026: new car excellent credit 5-6%, good credit 7-9%, fair credit 10-15%, poor credit 15-20%+. Used car rates run 1-3% higher. Credit unions typically offer rates 1-2% lower than banks. Always get pre-approved before visiting a dealer to negotiate from a position of strength.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I put more money down on a car loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A larger down payment reduces your loan amount, monthly payment and total interest. Aim for at least 20% down on a new car to avoid being underwater (owing more than the car is worth). With 0% or low promotional rates, a smaller down payment can make sense — invest the difference instead.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the best car loan term length?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Shorter terms (36-48 months) cost less in total interest but have higher monthly payments. Longer terms (72-84 months) have lower payments but much higher total cost and risk being underwater on the loan. Most financial advisors recommend no more than 60 months for new cars and 48 months for used.</p>
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
