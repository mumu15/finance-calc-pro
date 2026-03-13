'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'


export const metadata = {
  title: 'FIRE Calculator — Free Online FIRE Calculator | FreeFinCalc',
  description: 'Free FIRE Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/fire-calculator' },
  openGraph: {
    title: 'FIRE Calculator — Free Online FIRE Calculator | FreeFinCalc',
    description: 'Free FIRE Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/fire-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [annualExpenses, setAnnualExpenses] = useState(50000)
  const [currentSavings, setCurrentSavings] = useState(150000)
  const [annualSavings, setAnnualSavings] = useState(30000)
  const [fireType, setFireType] = useState('lean')
  const [returnRate, setReturnRate] = useState(7)
  const [inflationRate, setInflationRate] = useState(3)

  const result = useMemo(() => {
    try {
      const withdrawalRate = fireType === 'lean' ? 0.035 : fireType === 'standard' ? 0.04 : 0.03
      const fireNumber     = annualExpenses / withdrawalRate
      const remaining      = Math.max(0, fireNumber - currentSavings)
      const realReturn     = (1 + returnRate/100) / (1 + inflationRate/100) - 1
      const r              = realReturn / 1
      const rMonthly       = Math.pow(1 + r, 1/12) - 1
      const monthlyContrib = annualSavings / 12
      // Years to FIRE
      const yearsToFire    = rMonthly > 0 && remaining > 0
        ? Math.log(1 + remaining * rMonthly / monthlyContrib) / Math.log(1 + rMonthly) / 12
        : remaining / annualSavings
      const savingsRate    = annualSavings > 0 ? (annualSavings / (annualExpenses + annualSavings) * 100).toFixed(1) + '%' : '0%'
      const monthlyIncome  = fireNumber * withdrawalRate / 12
      return {
        fireNumber,
        remaining,
        yearsToFire: yearsToFire.toFixed(1) + ' years',
        savingsRate,
        monthlyIncome,
        withdrawalRate: (withdrawalRate * 100) + '%'
      }
    } catch(e) { return null }
  }, [annualExpenses, currentSavings, annualSavings, fireType, returnRate, inflationRate])

  const pdfRows = result ? [
    { label: "Your FIRE Number", value: result.fireNumber !== undefined ? String(fmt(result.fireNumber)) : "" },
    { label: "Amount Still to Save", value: result.remaining !== undefined ? String(fmt(result.remaining)) : "" },
    { label: "Years to FIRE", value: result.yearsToFire !== undefined ? String(result.yearsToFire) : "" },
    { label: "Current Savings Rate", value: result.savingsRate !== undefined ? String(result.savingsRate) : "" },
    { label: "Monthly Retirement Income", value: result.monthlyIncome !== undefined ? String(fmt(result.monthlyIncome)) : "" },
    { label: "Safe Withdrawal Rate", value: result.withdrawalRate !== undefined ? String(result.withdrawalRate) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔥</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">FIRE Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your Financial Independence Retire Early number and timeline to freedom.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Annual Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(annualExpenses)}</span>
                </div>
                <input type="range" min={10000} max={300000} step={1000}
                  value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Investment Portfolio</label>
                  <span className="text-white font-bold text-sm">{fmt(currentSavings)}</span>
                </div>
                <input type="range" min={0} max={5000000} step={5000}
                  value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Savings (investing)</label>
                  <span className="text-white font-bold text-sm">{fmt(annualSavings)}</span>
                </div>
                <input type="range" min={0} max={300000} step={1000}
                  value={annualSavings} onChange={e => setAnnualSavings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">FIRE Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"lean","l":"Lean FIRE (3.5% rule)"},{"v":"standard","l":"FIRE (4% rule)"},{"v":"fat","l":"Fat FIRE (3% rule)"}]).map(o => (
                    <button key={o.v} onClick={() => setFireType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: fireType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: fireType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: fireType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{`${returnRate}%`}</span>
                </div>
                <input type="range" min={1} max={15} step={0.25}
                  value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Inflation Rate</label>
                  <span className="text-white font-bold text-sm">{`${inflationRate}%`}</span>
                </div>
                <input type="range" min={1} max={8} step={0.25}
                  value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="FIRE Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Your FIRE Number</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fireNumber)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Amount Still to Save</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.remaining)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Years to FIRE</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.yearsToFire}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Savings Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.savingsRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Retirement Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyIncome)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Safe Withdrawal Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.withdrawalRate}
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

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
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
              <h3 className="text-white font-semibold mb-2">What is the FIRE number?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your FIRE number is the amount you need invested to retire permanently: Annual Expenses / Withdrawal Rate. At the 4% rule it is 25x annual expenses. To spend $50,000/year in retirement you need $1,250,000 invested. This is based on the Trinity Study showing a 4% withdrawal rate historically sustained a 30-year retirement in 95%+ of scenarios with a diversified stock/bond portfolio.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are the different types of FIRE?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Lean FIRE: live on $25,000-$40,000/year in retirement, very frugal lifestyle, FIRE number $625,000-$1M. Standard FIRE: $40,000-$80,000/year, FIRE number $1M-$2M. Fat FIRE: $80,000-$200,000+/year in retirement, FIRE number $2M-$5M+. Barista FIRE: partially retire, work part-time to cover expenses and let investments grow. Coast FIRE: save enough early that investments will reach FIRE number by traditional retirement age.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What savings rate do I need to retire early?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The higher your savings rate, the faster you reach FIRE. Saving 10% takes about 43 years. Saving 25% takes about 32 years. Saving 50% takes about 17 years. Saving 70% takes about 8.5 years. The math works because a high savings rate both accelerates portfolio growth and signals lower lifestyle expenses — reducing your FIRE number at the same time as increasing your contributions.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <Footer />
    </>
  )
}
