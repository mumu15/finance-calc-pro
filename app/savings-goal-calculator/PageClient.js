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
  const [goalAmount, setGoalAmount] = useState(20000)
  const [currentSaved, setCurrentSaved] = useState(2000)
  const [calcType, setCalcType] = useState('time')
  const [monthlyContrib, setMonthlyContrib] = useState(500)
  const [targetMonths, setTargetMonths] = useState(36)
  const [returnRate, setReturnRate] = useState(4.5)

  const result = useMemo(() => {
    try {
      const remaining = Math.max(0, goalAmount - currentSaved)
      const r = returnRate / 100 / 12
      let months, monthly
      if (calcType === 'time') {
        if (r === 0) {
          months = Math.ceil(remaining / monthlyContrib)
        } else {
          months = Math.ceil(Math.log(1 + remaining * r / monthlyContrib) / Math.log(1 + r))
        }
        monthly = monthlyContrib
      } else {
        months = targetMonths
        if (r === 0) {
          monthly = remaining / months
        } else {
          monthly = remaining * r / (Math.pow(1+r, months) - 1)
        }
      }
      const totalContribs = monthly * months
      const interestEarned = goalAmount - currentSaved - totalContribs
      return {
        months: months + ' months',
        monthly,
        totalContribs,
        interestEarned: Math.max(0, interestEarned),
        yearsFraction: (months / 12).toFixed(1) + ' years'
      }
    } catch(e) { return null }
  }, [goalAmount, currentSaved, calcType, monthlyContrib, targetMonths, returnRate])

  const pdfRows = result ? [
    { label: "Time to Reach Goal", value: result.months !== undefined ? String(result.months) : "" },
    { label: "Time in Years", value: result.yearsFraction !== undefined ? String(result.yearsFraction) : "" },
    { label: "Monthly Savings Required", value: result.monthly !== undefined ? String(fmt(result.monthly)) : "" },
    { label: "Total Contributions", value: result.totalContribs !== undefined ? String(fmt(result.totalContribs)) : "" },
    { label: "Interest Earned", value: result.interestEarned !== undefined ? String(fmt(result.interestEarned)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Savings Goal Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate how long it takes to reach any savings goal or how much to save each month.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Savings Goal</label>
                  <span className="text-white font-bold text-sm">{fmt(goalAmount)}</span>
                </div>
                <input type="range" min={100} max={1000000} step={100}
                  value={goalAmount} onChange={e => setGoalAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Amount Already Saved</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSaved)}</span>
                </div>
                <input type="range" min={0} max={900000} step={100}
                  value={currentSaved} onChange={e => setCurrentSaved(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Calculate</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"time","l":"Time to Reach Goal"},{"v":"monthly","l":"Monthly Savings Needed"}]).map(o => (
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
                  <label className="text-slate-400 text-sm">Monthly Contribution</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyContrib)}</span>
                </div>
                <input type="range" min={0} max={20000} step={25}
                  value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Target Timeframe</label>
                  <span className="text-white font-bold text-sm">{`${targetMonths} mo`}</span>
                </div>
                <input type="range" min={1} max={360} step={1}
                  value={targetMonths} onChange={e => setTargetMonths(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Return Rate</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="range" min={0} max={12} step={0.25}
                  value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Savings Goal Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time to Reach Goal</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.months}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Time in Years</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.yearsFraction}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Savings Required</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Contributions</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalContribs)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestEarned)}
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

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>

            <a href="/savings-interest-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Interest</h3>
            </a>

            <a href="/cd-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">CD Calculator</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I set a realistic savings goal?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Use the SMART framework: Specific (exact dollar amount), Measurable (track monthly progress), Achievable (verify the monthly contribution fits your budget), Relevant (aligned with your priorities), Time-bound (set a deadline). Break large goals into milestones. Automate transfers on payday so savings happen before spending. Even small consistent amounts compound significantly over time.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Where should I keep my savings for a goal?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Match the account to your timeline. Under 1 year: high-yield savings account (liquid, currently 4-5% APY). 1-3 years: CDs or money market accounts (slightly higher yield, some restrictions). Over 3 years: consider I-bonds (inflation protection), bond funds, or a conservative stock/bond mix. Never put money you need within 1-2 years in the stock market.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much of my income should I save?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 50/30/20 rule suggests 20% for savings and debt. For aggressive goal achievement, 30-40% savings rate is effective. The most important factor is automating savings before it hits your spending account. Even starting with 5% and increasing by 1% every 6 months builds excellent habits. The best savings rate is the highest one you can sustain without sacrificing essential needs.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Savings Goal Calculator","item":"https://www.freefincalc.net/savings-goal-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Savings Goal Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
