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
  const [calcType, setCalcType] = useState('payment')
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(20)
  const [payFreq, setPayFreq] = useState('monthly')

  const result = useMemo(() => {
    try {
      const n = payFreq === 'monthly' ? years * 12 : years
      const r = payFreq === 'monthly' ? rate / 100 / 12 : rate / 100
      let payment, fv, pv
      if (calcType === 'payment') {
        payment = amount * r / (1 - Math.pow(1+r, -n))
        pv = amount
        fv = payment * (Math.pow(1+r, n) - 1) / r
      } else if (calcType === 'fv') {
        payment = amount
        fv = amount * (Math.pow(1+r, n) - 1) / r
        pv = amount * (1 - Math.pow(1+r, -n)) / r
      } else {
        payment = amount
        pv = amount * (1 - Math.pow(1+r, -n)) / r
        fv = amount * (Math.pow(1+r, n) - 1) / r
      }
      const totalPaid = payment * n
      const totalInterest = calcType === 'payment' ? totalPaid - amount : fv - payment * n
      return { payment, pv, fv, totalPaid, totalInterest }
    } catch(e) { return null }
  }, [calcType, amount, rate, years, payFreq])

  const pdfRows = result ? [
    { label: "Payment Amount", value: result.payment !== undefined ? String(fmt(result.payment)) : "" },
    { label: "Present Value (lump sum)", value: result.pv !== undefined ? String(fmt(result.pv)) : "" },
    { label: "Future Value", value: result.fv !== undefined ? String(fmt(result.fv)) : "" },
    { label: "Total Payments Made", value: result.totalPaid !== undefined ? String(fmt(result.totalPaid)) : "" },
    { label: "Total Interest Earned", value: result.totalInterest !== undefined ? String(fmt(result.totalInterest)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📅</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Annuity Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate annuity payments, future value and present value for fixed annuities.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <label className="text-slate-400 text-sm block mb-2">Calculate</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"payment","l":"Payment from Lump Sum"},{"v":"fv","l":"Future Value of Payments"},{"v":"pv","l":"Lump Sum Needed for Income"}]).map(o => (
                    <button key={o.v} onClick={() => setCalcType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: calcType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: calcType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: calcType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Amount (lump sum or payment)</label>
                  <span className="text-white font-bold text-sm">{fmt(amount)}</span>
                </div>
                <input type="range" min={100} max={5000000} step={100}
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate}%`}</span>
                </div>
                <input type="range" min={0.5} max={12} step={0.25}
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annuity Period</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="range" min={1} max={40} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Payment Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"monthly","l":"Monthly"},{"v":"annual","l":"Annually"}]).map(o => (
                    <button key={o.v} onClick={() => setPayFreq(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: payFreq === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: payFreq === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: payFreq === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Annuity Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Payment Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.payment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Present Value (lump sum)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.pv)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Future Value</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fv)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Payments Made</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalInterest)}
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

            <a href="/pension-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Pension</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/savings-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Interest</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is an annuity?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">An annuity is a financial product where you make a lump-sum payment (or series of payments) in exchange for regular disbursements beginning immediately or at some future date. They are commonly used for retirement income. Types: immediate annuity (payments start now), deferred annuity (grows first, pays later), fixed (guaranteed rate), variable (market-linked), and indexed (tied to a market index with downside protection).</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Are annuities a good investment?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Annuities provide guaranteed income and longevity protection, but often come with high fees (1-3% annually), surrender charges (5-10 years), low returns vs market investments, and complexity. They make sense for retirees who: have maxed all tax-advantaged accounts, want guaranteed lifetime income beyond Social Security, or are extremely risk-averse. For most investors under 60, low-cost index funds outperform annuities.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How are annuity payments taxed?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">For non-qualified annuities (funded with after-tax money), each payment is split between a taxable earnings portion and a tax-free return of principal using the exclusion ratio. For qualified annuities (funded with pre-tax money like in an IRA), the entire payment is taxable as ordinary income. Withdrawals before age 59.5 trigger a 10% early withdrawal penalty on the earnings portion.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Annuity Calculator","item":"https://www.freefincalc.net/annuity-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Annuity Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/types-of-retirement-accounts" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>Types of Retirement Accounts</a>
        </div>
      <Footer />
    </>
  )
}
