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
  const [boatPrice, setBoatPrice] = useState(50000)
  const [downPayment, setDownPayment] = useState(10000)
  const [rate, setRate] = useState(7.5)
  const [termYears, setTermYears] = useState(15)

  const result = useMemo(() => {
    try {
      const loan    = boatPrice - downPayment
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n
      const interest= total - loan
      const annualCost = monthly * 12 + boatPrice * 0.015
      return { loan, monthly, interest, total, annualCost }
    } catch(e) { return null }
  }, [boatPrice, downPayment, rate, termYears])

  const pdfRows = result ? [
    { label: "Loan Amount", value: result.loan !== undefined ? String(fmt(result.loan)) : "" },
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "Total Loan Cost", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Est. Annual Ownership Cost", value: result.annualCost !== undefined ? String(fmt(result.annualCost)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⛵</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Boat Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly payments, total interest and true cost of financing a boat purchase.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Boat Price</label>
                  <span className="text-white font-bold text-sm">{fmt(boatPrice)}</span>
                </div>
                <input type="range" min={1000} max={2000000} step={500}
                  value={boatPrice} onChange={e => setBoatPrice(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(downPayment)}</span>
                </div>
                <input type="range" min={0} max={500000} step={500}
                  value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="range" min={1} max={20} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":5,"l":"5 yrs"},{"v":10,"l":"10 yrs"},{"v":15,"l":"15 yrs"},{"v":20,"l":"20 yrs"}]).map(o => (
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
                {result && <PdfDownload title="Boat Loan Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.loan)}
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
                    <span className="text-slate-400 text-sm">Total Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Loan Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Annual Ownership Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualCost)}
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

            <a href="/rv-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚐</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">RV Loan</h3>
            </a>

            <a href="/car-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🚗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Car Loan</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/loan-comparison-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Comparison</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What credit score do I need for a boat loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most lenders require 680+ for competitive boat loan rates. Below 680 you may still qualify but at higher rates (10-15%+). Marine lenders like Essex Credit, Southeast Financial, and credit unions often have more flexible requirements than banks. A larger down payment (20-30%) can compensate for a lower credit score.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much should I put down on a boat?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most lenders require 10-20% down on boat loans. Putting down 20%+ gets you the best rates, avoids being underwater on a depreciating asset, and lowers monthly payments significantly. Boats depreciate 10-20% in year one and 5-10% annually after that — similar to cars. Never finance 100% of a boat purchase.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are hidden costs of boat ownership?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Annual ownership costs beyond the loan: marina slip or storage ($1,500-$10,000/year), insurance ($500-$2,000/year), fuel ($500-$5,000/year depending on use), maintenance ($500-$3,000/year), winterization, registration fees, and repairs. Budget 1.5-2% of boat value annually for maintenance and operating costs on top of loan payments.</p>
            </div>
          </div>
        </div>
      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
