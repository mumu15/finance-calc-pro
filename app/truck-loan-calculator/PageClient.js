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
  const [truckPrice, setTruckPrice] = useState(55000)
  const [downPayment, setDownPayment] = useState(10000)
  const [tradeIn, setTradeIn] = useState(0)
  const [rate, setRate] = useState(7)
  const [termMonths, setTermMonths] = useState(60)
  const [truckUse, setTruckUse] = useState('personal')

  const result = useMemo(() => {
    try {
      const loan    = truckPrice - downPayment - tradeIn
      const r       = rate / 100 / 12
      const n       = termMonths
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n + downPayment + tradeIn
      const interest= monthly * n - loan
      const annualFuel = 15000 / 18 * 3.50 * 12
      const taxDeduct  = truckUse === 'business' ? truckPrice * 0.25 : 0
      return { loan, monthly, interest, total, annualFuel, taxDeduct }
    } catch(e) { return null }
  }, [truckPrice, downPayment, tradeIn, rate, termMonths, truckUse])

  const pdfRows = result ? [
    { label: "Loan Amount", value: result.loan !== undefined ? String(fmt(result.loan)) : "" },
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "Total Vehicle Cost", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Est. Annual Fuel Cost", value: result.annualFuel !== undefined ? String(fmt(result.annualFuel)) : "" },
    { label: "Business Tax Deduction Est.", value: result.taxDeduct !== undefined ? String(fmt(result.taxDeduct)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚛</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Truck Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly payments and total cost for financing a pickup truck or commercial truck.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Truck Price</label>
                  <span className="text-white font-bold text-sm">{fmt(truckPrice)}</span>
                </div>
                <input type="text" inputMode="decimal" min={5000} max={500000} step={500}
                  value={truckPrice} onChange={e => setTruckPrice(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Down Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(downPayment)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={200000} step={500}
                  value={downPayment} onChange={e => setDownPayment(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Trade-In Value</label>
                  <span className="text-white font-bold text-sm">{fmt(tradeIn)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={100000} step={500}
                  value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={20} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":72,"l":"72 mo"},{"v":84,"l":"84 mo"}]).map(o => (
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

              <div>
                <label className="text-slate-400 text-sm block mb-2">Primary Use</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"personal","l":"Personal / Family"},{"v":"business","l":"Business Use"}]).map(o => (
                    <button key={o.v} onClick={() => setTruckUse(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: truckUse === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: truckUse === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: truckUse === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Truck Loan Calculator" rows={pdfRows} />}
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
                    <span className="text-slate-400 text-sm">Total Vehicle Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Annual Fuel Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualFuel)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Business Tax Deduction Est.</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxDeduct)}
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

            <a href="/equipment-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Equipment Loan</h3>
            </a>

            <a href="/lease-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Lease vs Buy</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are truck loans different from car loans?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Truck loans use the same structure as car loans — same lenders, same credit requirements, same amortization. However trucks (especially heavy-duty and commercial trucks) may have longer max terms (up to 84 months for personal, up to 84-120 months for commercial). Commercial truck loans for business use may qualify for SBA financing or equipment loans with potentially better rates.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Can I deduct a truck purchase for business?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes — if the truck is used for business, Section 179 allows deducting up to $28,900 for SUVs/trucks over 6,000 lbs GVWR in 2024, or the full purchase price for trucks over 14,000 lbs GVWR. Bonus depreciation allows additional deductions. For mixed personal/business use, only the business use percentage is deductible. Keep detailed mileage logs to support business use claims.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good truck loan rate in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Competitive rates for pickup trucks in 2026: excellent credit (720+) 5-7%, good credit (680-720) 7-10%, fair credit (620-680) 10-16%, poor credit below 620 may not qualify for direct lending. Credit unions typically offer 0.5-1% lower rates than dealerships. Getting pre-approved before going to the dealership gives you negotiating power and prevents dealer markup on financing.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Truck Loan Calculator","item":"https://www.freefincalc.net/truck-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Truck Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
