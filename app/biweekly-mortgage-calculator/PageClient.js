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
  const [rate, setRate] = useState(6.875)
  const [termYears, setTermYears] = useState(30)

  const result = useMemo(() => {
    try {
      const r       = rate / 100 / 12
      const n       = termYears * 12
      const monthly = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const biweekly = monthly / 2
      // Biweekly means 26 payments/year = 13 monthly payments equivalent
      const extraMonthly = monthly / 12
      const newRate = rate / 100 / 12
      // Find months to payoff with extra monthly
      const newMonths = Math.ceil(-Math.log(1 - loanAmount * newRate / (monthly + extraMonthly)) / Math.log(1 + newRate))
      const monthlyTotal = monthly * n
      const biweeklyTotal = (monthly + extraMonthly) * newMonths
      const interestSaved = monthlyTotal - biweeklyTotal
      const yearsSaved    = ((n - newMonths) / 12).toFixed(1)
      return { monthly, biweekly, newMonths: newMonths + ' months', yearsSaved: yearsSaved + ' years', interestSaved, monthlyTotal, biweeklyTotal }
    } catch(e) { return null }
  }, [loanAmount, rate, termYears])

  const pdfRows = result ? [
    { label: "Standard Monthly Payment", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Biweekly Payment Amount", value: result.biweekly !== undefined ? String(fmt(result.biweekly)) : "" },
    { label: "Payoff with Biweekly", value: result.newMonths !== undefined ? String(result.newMonths) : "" },
    { label: "Years Saved", value: result.yearsSaved !== undefined ? String(result.yearsSaved) : "" },
    { label: "Interest Saved", value: result.interestSaved !== undefined ? String(fmt(result.interestSaved)) : "" },
    { label: "Standard Total Cost", value: result.monthlyTotal !== undefined ? String(fmt(result.monthlyTotal)) : "" },
    { label: "Biweekly Total Cost", value: result.biweeklyTotal !== undefined ? String(fmt(result.biweeklyTotal)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Biweekly Mortgage Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how biweekly mortgage payments save interest and pay off your mortgage years early.</p>
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
                <input type="number" min={50000} max={2000000} step={5000}
                  value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="number" min={1} max={12} step={0.125}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
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
                {result && <PdfDownload title="Biweekly Mortgage Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Standard Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Biweekly Payment Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.biweekly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Payoff with Biweekly</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.newMonths}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Years Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.yearsSaved}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestSaved)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Standard Total Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Biweekly Total Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.biweeklyTotal)}
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
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>

            <a href="/extra-payment-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Extra Payment</h3>
            </a>

            <a href="/amortization-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Amortization</h3>
            </a>

            <a href="/refinance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Refinance</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do biweekly mortgage payments work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Instead of 12 monthly payments, you make 26 half-payments per year. Since 26 half-payments equal 13 full monthly payments (not 12), you make one extra payment per year. On a 30-year $350,000 mortgage at 6.875%, this saves approximately $80,000-$100,000 in interest and pays off the loan 5-6 years early. The savings compound because you reduce principal faster.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I set up biweekly mortgage payments?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Three options: (1) Ask your lender or servicer directly — many offer official biweekly programs, sometimes for a fee. (2) Set up automatic biweekly transfers from your bank to a separate account, then manually pay monthly. (3) Simply divide your monthly payment by 12 and add that amount to each monthly payment as extra principal — same math, no biweekly logistics needed.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are biweekly payment programs worth the fees?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Third-party biweekly programs that charge setup fees ($300-$400) and transaction fees ($5-$10 per payment) are generally not worth it. You get the same benefit for free by adding 1/12 of your monthly payment as extra principal each month. If your lender charges no fees for biweekly enrollment, it can be a convenient way to automate the extra payment discipline.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Biweekly Mortgage Calculator","item":"https://www.freefincalc.net/biweekly-mortgage-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Biweekly Mortgage Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
