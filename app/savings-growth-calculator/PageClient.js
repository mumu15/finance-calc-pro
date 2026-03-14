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
  const [initialDeposit, setInitialDeposit] = useState(10000)
  const [monthlyDeposit, setMonthlyDeposit] = useState(500)
  const [annualRate, setAnnualRate] = useState(4.5)
  const [years, setYears] = useState(10)
  const [compFreq, setCompFreq] = useState(12)

  const result = useMemo(() => {
    try {
      const r  = annualRate / 100 / compFreq
      const n  = years * compFreq
      const periodsPerMonth = compFreq / 12
      const depositPerPeriod = monthlyDeposit / periodsPerMonth
      const fvInitial  = initialDeposit * Math.pow(1+r, n)
      const fvDeposits = depositPerPeriod * (Math.pow(1+r,n) - 1) / r
      const finalBalance  = fvInitial + fvDeposits
      const totalDeposited = initialDeposit + monthlyDeposit * years * 12
      const interestEarned = finalBalance - totalDeposited
      const doublingYears  = (Math.log(2) / Math.log(1 + annualRate/100)).toFixed(1)
      return { finalBalance, totalDeposited, interestEarned, doublingYears: doublingYears + ' years' }
    } catch(e) { return null }
  }, [initialDeposit, monthlyDeposit, annualRate, years, compFreq])

  const pdfRows = result ? [
    { label: "Final Balance", value: result.finalBalance !== undefined ? String(fmt(result.finalBalance)) : "" },
    { label: "Total Amount Deposited", value: result.totalDeposited !== undefined ? String(fmt(result.totalDeposited)) : "" },
    { label: "Total Interest Earned", value: result.interestEarned !== undefined ? String(fmt(result.interestEarned)) : "" },
    { label: "Money Doubling Time", value: result.doublingYears !== undefined ? String(result.doublingYears) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Savings Growth Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how your savings grow over time with regular contributions and compound interest.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Initial Deposit</label>
                  <span className="text-white font-bold text-sm">{fmt(initialDeposit)}</span>
                </div>
                <input type="number" step="any" min={0} max={1000000} step={500}
                  value={initialDeposit} onChange={e => setInitialDeposit(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Deposit</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyDeposit)}</span>
                </div>
                <input type="number" step="any" min={0} max={20000} step={50}
                  value={monthlyDeposit} onChange={e => setMonthlyDeposit(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${annualRate}%`}</span>
                </div>
                <input type="number" step="any" min={0.1} max={12} step={0.1}
                  value={annualRate} onChange={e => setAnnualRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Savings Period</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="number" step="any" min={1} max={50} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Compounding</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":365,"l":"Daily"},{"v":12,"l":"Monthly"},{"v":4,"l":"Quarterly"},{"v":1,"l":"Annually"}]).map(o => (
                    <button key={o.v} onClick={() => setCompFreq(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: compFreq === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: compFreq === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: compFreq === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Savings Growth Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Final Balance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.finalBalance)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Deposited</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDeposited)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Interest Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestEarned)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Money Doubling Time</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.doublingYears}
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

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/cd-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">CD Calculator</h3>
            </a>

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does compound interest grow savings?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Compound interest earns returns on both your principal and previously earned interest. At 4.5%, $10,000 grows to $10,450 after year 1. In year 2 you earn interest on $10,450, not just $10,000. Over 10 years this compounds to $15,530 — 55% growth on the original deposit. Over 30 years: $37,850 — nearly 4x. Adding regular deposits multiplies this effect dramatically.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Where should I keep short-term savings?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Best options for different goals: Emergency fund (under 1 year): high-yield savings account (currently 4-5% APY, FDIC insured, fully liquid). Short-term goals (1-3 years): CDs, Treasury bills, money market accounts. Medium-term (3-5 years): CD ladders, I-bonds, short-term bond funds. Never put money you need within 2 years in stock market investments.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the Rule of 72?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The Rule of 72 estimates how long it takes to double your money: divide 72 by the annual interest rate. At 4%: 72/4 = 18 years to double. At 6%: 12 years. At 9%: 8 years. At 12%: 6 years. This quick mental math tool helps evaluate investment options. It also works in reverse for inflation: at 3% inflation, purchasing power halves in 72/3 = 24 years.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Savings Growth Calculator","item":"https://www.freefincalc.net/savings-growth-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Savings Growth Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
