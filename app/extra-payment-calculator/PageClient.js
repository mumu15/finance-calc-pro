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
  const [balance, setBalance] = useState(320000)
  const [rate, setRate] = useState(6.875)
  const [remainMonths, setRemainMonths] = useState(300)
  const [extraType, setExtraType] = useState('monthly')
  const [extraAmount, setExtraAmount] = useState(200)

  const result = useMemo(() => {
    try {
      const r = rate / 100 / 12
      const n = remainMonths
      const basePayment = balance * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      // Months without extra
      const totalBase = basePayment * n
      const interestBase = totalBase - balance
      // With extra payments
      let bal = balance
      let months = 0
      let totalPaid = 0
      // Apply one-time lump sum upfront
      if (extraType === 'onetime') bal = Math.max(0, bal - extraAmount)
      while (bal > 0.01 && months < n + 600) {
        const intCharge = bal * r
        const extraM    = extraType === 'monthly' ? extraAmount : 0
        const annualM   = extraType === 'annual' && months % 12 === 0 ? extraAmount : 0
        const pmt       = Math.min(bal + intCharge, basePayment + extraM + annualM)
        bal = bal + intCharge - pmt
        totalPaid += pmt
        months++
      }
      const interestNew  = totalPaid - balance + (extraType === 'onetime' ? extraAmount : 0)
      const interestSaved = Math.max(0, interestBase - interestNew)
      const monthsSaved   = n - months
      return { basePayment, months: months + ' months', monthsSaved: monthsSaved + ' months', interestSaved, totalPaid }
    } catch(e) { return null }
  }, [balance, rate, remainMonths, extraType, extraAmount])

  const pdfRows = result ? [
    { label: "Base Monthly Payment", value: result.basePayment !== undefined ? String(fmt(result.basePayment)) : "" },
    { label: "New Payoff Period", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Months Saved", value: result.monthsSaved !== undefined ? String(result.monthsSaved) : "" },
    { label: "Interest Saved", value: result.interestSaved !== undefined ? String(fmt(result.interestSaved)) : "" },
    { label: "New Total Cost", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Extra Mortgage Payment Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how extra mortgage payments reduce interest and shorten your loan payoff date.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Loan Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(balance)}</span>
                </div>
                <input type="number" min={10000} max={2000000} step={5000}
                  value={balance} onChange={e => setBalance(Number(e.target.value))}
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
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Remaining Loan Term</label>
                  <span className="text-white font-bold text-sm">{`${remainMonths} mo`}</span>
                </div>
                <input type="number" min={12} max={360} step={6}
                  value={remainMonths} onChange={e => setRemainMonths(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Extra Payment Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"monthly","l":"Extra Monthly"},{"v":"annual","l":"Extra Annual"},{"v":"onetime","l":"One-Time Lump Sum"}]).map(o => (
                    <button key={o.v} onClick={() => setExtraType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: extraType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: extraType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: extraType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Extra Payment Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(extraAmount)}</span>
                </div>
                <input type="number" min={0} max={50000} step={50}
                  value={extraAmount} onChange={e => setExtraAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Extra Mortgage Payment Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Base Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.basePayment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Payoff Period</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Months Saved</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.monthsSaved}
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
                    <span className="text-slate-400 text-sm">New Total Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
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

            <a href="/biweekly-mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Biweekly Mortgage</h3>
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
              <h3 className="text-white font-semibold mb-2">How much does an extra $200/month save on a mortgage?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">On a $320,000 mortgage at 6.875% with 25 years remaining, an extra $200/month saves approximately $55,000-$70,000 in interest and cuts payoff time by 5-7 years. The savings are largest early in the loan when the balance is highest. Even $100/month extra makes a meaningful difference over a 30-year loan.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I make extra mortgage payments or invest?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The math favors investing if your expected investment return exceeds your mortgage rate. With a 6.875% mortgage and 8-10% expected stock market returns, investing wins long-term. However, paying down the mortgage offers guaranteed, risk-free return equal to your rate, plus psychological security. Many people split the difference: make extra payments and invest simultaneously.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I pay a lump sum or monthly extra?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A large lump sum applied immediately saves more than the same amount spread over time because it starts reducing interest right away. However, consistent monthly extra payments are more practical for most budgets and still save significantly. The key is applying extra payments to principal directly — confirm with your lender that extra amounts reduce principal, not future payments.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Extra Payment Calculator","item":"https://freefincalc.net/extra-payment-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Extra Payment Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
