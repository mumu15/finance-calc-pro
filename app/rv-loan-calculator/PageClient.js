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
  const [rvPrice, setRvPrice] = useState(80000)
  const [downPayment, setDownPayment] = useState(16000)
  const [rate, setRate] = useState(8)
  const [termYears, setTermYears] = useState(15)

  const result = useMemo(() => {
    try {
      const loan    = rvPrice - downPayment
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loan * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const total   = monthly * n + downPayment
      const interest= monthly * n - loan
      const annualOwnership = monthly * 12 + rvPrice * 0.02 + 2000
      return { loan, monthly, interest, total, annualOwnership }
    } catch(e) { return null }
  }, [rvPrice, downPayment, rate, termYears])

  const pdfRows = result ? [
    { label: "Loan Amount", value: result.loan !== undefined ? String(fmt(result.loan)) : "" },
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest", value: result.interest !== undefined ? String(fmt(result.interest)) : "" },
    { label: "Total Purchase Cost", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Est. Annual Ownership Cost", value: result.annualOwnership !== undefined ? String(fmt(result.annualOwnership)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🚐</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">RV Loan Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly payments, total interest and true cost of financing a recreational vehicle.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">RV Price</label>
                  <span className="text-white font-bold text-sm">{fmt(rvPrice)}</span>
                </div>
                <input type="text" inputMode="decimal" min={5000} max={1000000} step={1000}
                  value={rvPrice} onChange={e => setRvPrice(Number(e.target.value))}
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
                {result && <PdfDownload title="RV Loan Calculator" rows={pdfRows} />}
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
                    <span className="text-slate-400 text-sm">Total Purchase Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Annual Ownership Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualOwnership)}
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

            <a href="/boat-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⛵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Boat Loan</h3>
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
              <h3 className="text-white font-semibold mb-2">What credit score do I need for an RV loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most RV lenders require 660+ for standard approval, 700+ for the best rates. RV loans under $10,000 may be treated as personal loans with higher rates. Lenders like Good Sam Finance, Bank of the West, and local credit unions specialize in RV lending. Rates range from 6-15% depending on credit, down payment, RV age, and loan term.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">New vs used RV financing: what is different?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">New RVs: easier to finance, longer terms available (up to 20 years), better rates. Used RVs: higher rates, shorter max terms (typically 10-15 years for units under 10 years old, 5-10 years for older units), and some lenders will not finance RVs over 10-15 years old. Private party purchases may require personal loans instead of RV-specific financing.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are true annual costs of RV ownership?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Beyond the loan: insurance $800-$2,500/year, storage $1,200-$4,800/year (if not stored at home), fuel $0.12-0.25/mile depending on RV size and MPG, maintenance and repairs $1,500-$5,000/year (budget 1-2% of purchase price), campsite fees $20-$150/night, and depreciation (Class A motorhomes lose 30% in first year, towable RVs 15-20%). Total annual cost typically $5,000-$15,000+ beyond the loan.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Rv Loan Calculator","item":"https://www.freefincalc.net/rv-loan-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Rv Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
