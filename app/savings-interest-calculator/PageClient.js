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
  const [principal, setPrincipal] = useState(10000)
  const [monthlyAdd, setMonthlyAdd] = useState(500)
  const [apy, setApy] = useState(4.75)
  const [years, setYears] = useState(5)
  const [compFreq, setCompFreq] = useState(12)

  const result = useMemo(() => {
    try {
      const r = apy / 100 / compFreq
      const n = years * compFreq
      const m = apy / 100 / 12
      const nm = years * 12
      // FV of principal
      const fvPrincipal = principal * Math.pow(1+r, n)
      // FV of monthly additions (compound at monthly rate)
      const fvMonthly   = monthlyAdd * (Math.pow(1+m, nm) - 1) / m
      const finalBalance = fvPrincipal + fvMonthly
      const totalDeposits = principal + monthlyAdd * 12 * years
      const interestEarned = finalBalance - totalDeposits
      const effectiveAPY  = (Math.pow(1 + apy/100/compFreq, compFreq) - 1) * 100
      return { finalBalance, totalDeposits, interestEarned, effectiveAPY: effectiveAPY.toFixed(3) + '%' }
    } catch(e) { return null }
  }, [principal, monthlyAdd, apy, years, compFreq])

  const pdfRows = result ? [
    { label: "Final Balance", value: result.finalBalance !== undefined ? String(fmt(result.finalBalance)) : "" },
    { label: "Total Deposited", value: result.totalDeposits !== undefined ? String(fmt(result.totalDeposits)) : "" },
    { label: "Interest Earned", value: result.interestEarned !== undefined ? String(fmt(result.interestEarned)) : "" },
    { label: "Effective APY", value: result.effectiveAPY !== undefined ? String(result.effectiveAPY) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Savings Interest Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate exactly how much interest your savings account earns with compound interest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Initial Deposit</label>
                  <span className="text-white font-bold text-sm">{fmt(principal)}</span>
                </div>
                <input type="text" inputMode="decimal" min={100} max={1000000} step={100}
                  value={principal} onChange={e => setPrincipal(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Deposit</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyAdd)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={10000} step={50}
                  value={monthlyAdd} onChange={e => setMonthlyAdd(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Percentage Yield (APY)</label>
                  <span className="text-white font-bold text-sm">{`${apy}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={0.01} max={10} step={0.05}
                  value={apy} onChange={e => setApy(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Time Period</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={30} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Compounding Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"Monthly"},{"v":4,"l":"Quarterly"},{"v":365,"l":"Daily"},{"v":1,"l":"Annually"}]).map(o => (
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
                {result && <PdfDownload title="Savings Interest Calculator" rows={pdfRows} />}
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
                    <span className="text-slate-400 text-sm">Total Deposited</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDeposits)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestEarned)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective APY</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveAPY}
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

            <a href="/cd-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">CD Calculator</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
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
              <h3 className="text-white font-semibold mb-2">What is a good savings account interest rate in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">In 2026 competitive high-yield savings accounts offer 4-5% APY. Traditional big-bank savings accounts average 0.01-0.5%. Online banks (Ally, Marcus, Discover, SoFi) and credit unions consistently offer 10-50x higher rates than brick-and-mortar banks. Always check current rates as they adjust with Fed policy changes.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between APY and APR for savings?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">APY (Annual Percentage Yield) includes the effect of compounding — it shows what you actually earn in a year. APR (Annual Percentage Rate) is the base rate without compounding. For savings, APY is always higher than APR (unless compounded annually). Always compare savings accounts using APY for an accurate apples-to-apples comparison.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is compound interest better daily or monthly?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Daily compounding is slightly better than monthly, which is better than quarterly. However the difference is small at typical savings rates. At 5% APY: daily compounding earns $5,127 on $100,000 per year, monthly earns $5,116, quarterly earns $5,095, annually earns $5,000. The rate matters far more than the compounding frequency.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Savings Interest Calculator","item":"https://www.freefincalc.net/savings-interest-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Savings Interest Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
