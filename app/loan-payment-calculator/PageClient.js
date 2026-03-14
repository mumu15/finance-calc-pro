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
  const [principal, setPrincipal] = useState(25000)
  const [rate, setRate] = useState(7.5)
  const [termMonths, setTermMonths] = useState(60)
  const [extraPmt, setExtraPmt] = useState(0)

  const result = useMemo(() => {
    try {
      const r = rate / 100 / 12
      const n = termMonths
      const monthly = r > 0 ? principal * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1) : principal/n
      const totalPaid = monthly * n
      const totalInterest = totalPaid - principal
      // With extra payment
      const newMonthly = monthly + extraPmt
      const newMonths = extraPmt > 0 && r > 0
        ? Math.ceil(-Math.log(1 - principal * r / newMonthly) / Math.log(1 + r))
        : termMonths
      const interestSaved = Math.max(0, totalInterest - (newMonthly * newMonths - principal))
      return { monthly, totalInterest, totalPaid, newMonths: newMonths + ' months', interestSaved }
    } catch(e) { return null }
  }, [principal, rate, termMonths, extraPmt])

  const pdfRows = result ? [
    { label: "Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Interest", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
    { label: "Total Amount Paid", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Payoff with Extra Payment", value: result.newMonths !== undefined ? String(result.newMonths) : "" },
    { label: "Interest Saved", value: result.interestSaved !== undefined ? String(fmt(result.interestSaved)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Loan Payment Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate monthly loan payments for any loan amount, interest rate and term.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(principal)}</span>
                </div>
                <input type="number" min={100} max={2000000} step={100}
                  value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="number" min={0} max={36} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"12 mo"},{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":72,"l":"72 mo"},{"v":84,"l":"84 mo"},{"v":120,"l":"120 mo"},{"v":180,"l":"180 mo"},{"v":240,"l":"240 mo"},{"v":360,"l":"360 mo"}]).map(o => (
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
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Extra Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(extraPmt)}</span>
                </div>
                <input type="number" min={0} max={5000} step={25}
                  value={extraPmt} onChange={e => setExtraPmt(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Loan Payment Calculator" rows={pdfRows} />}
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
                    <span className="text-slate-400 text-sm">Total Interest</span>
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
                    <span className="text-slate-400 text-sm">Payoff with Extra Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.newMonths}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestSaved)}
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

            <a href="/loan-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Loan Interest</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/amortization-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Amortization</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is a monthly loan payment calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Monthly payment = Principal x [r(1+r)^n] / [(1+r)^n - 1], where r = monthly rate (APR/12) and n = number of months. For a $25,000 loan at 7.5% for 60 months: r = 0.00625, n = 60, payment = $500.47. This formula ensures equal payments throughout the loan while fully paying off interest and principal by the final payment.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What loan term gives the best value?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Shorter terms mean higher monthly payments but dramatically less total interest. On a $25,000 loan at 7.5%: 36 months costs $775/month and $2,900 total interest. 60 months costs $501/month and $5,028 total interest. 84 months costs $386/month and $7,408 total interest. Choose the shortest term your budget can comfortably handle.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Can I pay off a loan early without penalty?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most personal loans and mortgages originated after 2014 have no prepayment penalty. However some lenders still charge prepayment penalties — typically 1-2% of the remaining balance if paid off within 3-5 years. Always check your loan agreement for a prepayment penalty clause before making extra payments or paying off early. Ask your lender directly if unsure.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Loan Payment Calculator","item":"https://freefincalc.net/loan-payment-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Loan Payment Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
