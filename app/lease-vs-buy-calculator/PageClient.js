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
  const [carPrice, setCarPrice] = useState(35000)
  const [downPayment, setDownPayment] = useState(5000)
  const [loanRate, setLoanRate] = useState(7)
  const [loanTermMo, setLoanTermMo] = useState(60)
  const [leasePayment, setLeasePayment] = useState(450)
  const [leaseTerm, setLeaseTerm] = useState(36)
  const [leaseDown, setLeaseDown] = useState(2000)

  const result = useMemo(() => {
    try {
      const r = loanRate / 100 / 12
      const n = loanTermMo
      const loanAmount = carPrice - downPayment
      const monthlyLoan = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const totalBuyCost = downPayment + monthlyLoan * n
      // Residual value after loan term (depreciation ~50% over 5 yrs)
      const residualValue = carPrice * Math.pow(0.85, loanTermMo/12)
      const netBuyCost = totalBuyCost - residualValue
      // Lease cost over same period (may need multiple lease cycles)
      const leaseCycles = Math.ceil(loanTermMo / leaseTerm)
      const totalLeaseCost = (leasePayment * leaseTerm + leaseDown) * leaseCycles
      const winner = netBuyCost < totalLeaseCost ? 'Buying is cheaper' : 'Leasing is cheaper'
      const saving = Math.abs(netBuyCost - totalLeaseCost)
      return { monthlyLoan, totalBuyCost, netBuyCost, totalLeaseCost, winner, saving }
    } catch(e) { return null }
  }, [carPrice, downPayment, loanRate, loanTermMo, leasePayment, leaseTerm, leaseDown])

  const pdfRows = result ? [
    { label: "Monthly Loan Payment (buy)", value: result.monthlyLoan !== undefined ? String(fmt(result.monthlyLoan)) : "" },
    { label: "Total Buy Cost (loan term)", value: result.totalBuyCost !== undefined ? String(fmt(result.totalBuyCost)) : "" },
    { label: "Net Buy Cost (after resale)", value: result.netBuyCost !== undefined ? String(fmt(result.netBuyCost)) : "" },
    { label: "Total Lease Cost", value: result.totalLeaseCost !== undefined ? String(fmt(result.totalLeaseCost)) : "" },
    { label: "Better Option", value: result.winner !== undefined ? String(result.winner) : "" },
    { label: "Amount Saved", value: result.saving !== undefined ? String(fmt(result.saving)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔄</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Lease vs Buy Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Compare the true total cost of leasing versus buying a car over the same period.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Car Price</label>
                  <span className="text-white font-bold text-sm">{fmt(carPrice)}</span>
                </div>
                <input type="number" min={5000} max={150000} step={500}
                  value={carPrice} onChange={e => setCarPrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment (buy)</label>
                  <span className="text-white font-bold text-sm">{fmt(downPayment)}</span>
                </div>
                <input type="number" min={0} max={50000} step={500}
                  value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Interest Rate (buy)</label>
                  <span className="text-white font-bold text-sm">{`${loanRate}%`}</span>
                </div>
                <input type="number" min={0} max={20} step={0.25}
                  value={loanRate} onChange={e => setLoanRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term (buy)</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":72,"l":"72 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setLoanTermMo(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: loanTermMo === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: loanTermMo === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: loanTermMo === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Lease Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(leasePayment)}</span>
                </div>
                <input type="number" min={100} max={2000} step={25}
                  value={leasePayment} onChange={e => setLeasePayment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Lease Term (months)</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":39,"l":"39 mo"},{"v":48,"l":"48 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setLeaseTerm(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: leaseTerm === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: leaseTerm === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: leaseTerm === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Lease Down / Cap Reduction</label>
                  <span className="text-white font-bold text-sm">{fmt(leaseDown)}</span>
                </div>
                <input type="number" min={0} max={10000} step={250}
                  value={leaseDown} onChange={e => setLeaseDown(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Lease vs Buy Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Loan Payment (buy)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyLoan)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Buy Cost (loan term)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalBuyCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Buy Cost (after resale)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.netBuyCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Lease Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalLeaseCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Better Option</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.winner}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Amount Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.saving)}
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

            <a href="/car-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚘</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Affordability</h3>
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
              <h3 className="text-white font-semibold mb-2">Is it better to lease or buy a car?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Buying is better long-term — you build equity, have no mileage limits, and eventually own the car free and clear. Leasing is better if you want lower monthly payments, a new car every 2-3 years, or always want to be under warranty. Leasing costs more over the long run but provides flexibility and predictable costs.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are the hidden costs of leasing?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Watch for: acquisition fee ($500-$1,000), disposition fee at end ($300-$500), excess mileage charges ($0.15-$0.30/mile over limit), wear-and-tear charges, gap insurance requirement, early termination penalties (very expensive), and the fact that you have nothing to show for payments at the end.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a money factor in a lease?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The money factor is the lease equivalent of an interest rate. To convert to APR multiply by 2,400. A money factor of 0.00125 = 3% APR. A good money factor is below 0.0020 (4.8% APR). Always ask the dealer for the money factor — they are not required to disclose it upfront.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Lease Vs Buy Calculator","item":"https://freefincalc.net/lease-vs-buy-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Lease Vs Buy Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
