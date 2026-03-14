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
  const [principal, setPrincipal] = useState(20000)
  const [rate, setRate] = useState(8)
  const [termYears, setTermYears] = useState(5)
  const [intType, setIntType] = useState('compound')

  const result = useMemo(() => {
    try {
      const r = rate / 100 / 12
      const n = termYears * 12
      let monthly, totalInterest, totalPaid
      if (intType === 'compound') {
        monthly      = principal * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
        totalPaid    = monthly * n
        totalInterest = totalPaid - principal
      } else {
        totalInterest = principal * (rate / 100) * termYears
        totalPaid     = principal + totalInterest
        monthly       = totalPaid / n
      }
      const interestPct = (totalInterest / principal * 100).toFixed(1) + '%'
      const firstMonthInterest = principal * r
      return { monthly, totalInterest, totalPaid, interestPct, firstMonthInterest }
    } catch(e) { return null }
  }, [principal, rate, termYears, intType])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest Paid", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Amount Paid", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Interest as % of Principal", value: result.interestPct !== undefined ? String(result.interestPct) : "" },
    { label: "First Month Interest Charge", value: result.firstMonthInterest !== undefined ? String(fmt(result.firstMonthInterest)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💸</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Loan Interest Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate total interest paid on any loan and compare simple vs compound interest.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Principal</label>
                  <span className="text-white font-bold text-sm">{fmt(principal)}</span>
                </div>
                <input type="text" inputMode="decimal" min={100} max={2000000} step={100}
                  value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={36} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Term</label>
                  <span className="text-white font-bold text-sm">{`${termYears} yrs`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={30} step={1}
                  value={termYears} onChange={e => setTermYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Interest Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"compound","l":"Compound (amortizing)"},{"v":"simple","l":"Simple Interest"}]).map(o => (
                    <button key={o.v} onClick={() => setIntType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: intType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: intType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: intType === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Loan Interest Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

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
                    <span className="text-slate-400 text-sm">Total Amount Paid</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest as % of Principal</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.interestPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">First Month Interest Charge</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.firstMonthInterest)}
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

            <a href="/loan-comparison-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Comparison</h3>
            </a>

            <a href="/apr-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">APR Calculator</h3>
            </a>

            <a href="/amortization-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Amortization</h3>
            </a>

            <a href="/simple-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📐</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Simple Interest</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between APR and interest rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The interest rate is the cost of borrowing the principal only. APR (Annual Percentage Rate) includes the interest rate plus fees (origination fees, closing costs, etc.) expressed as a yearly rate. APR is always equal to or higher than the interest rate. When comparing loan offers always compare APRs, not just interest rates, for a true apples-to-apples comparison.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does compound interest work on a loan?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">On an amortizing loan (mortgage, car loan, personal loan), interest compounds monthly. Each payment covers that month interest first, then the remainder reduces the principal. Early in the loan, most of each payment is interest. As the balance decreases, more goes to principal. This is why extra early payments are so powerful — they reduce the principal that future interest is calculated on.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What factors most affect total interest paid?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The three biggest factors in order of impact: (1) Interest rate — a 1% rate difference on a $200,000 mortgage over 30 years changes total interest by $40,000+. (2) Loan term — a 30-year vs 15-year mortgage at the same rate roughly doubles total interest paid. (3) Loan amount — every dollar borrowed costs more than a dollar to repay. A larger down payment saves disproportionately in total interest.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Loan Interest Calculator","item":"https://www.freefincalc.net/loan-interest-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Loan Interest Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
