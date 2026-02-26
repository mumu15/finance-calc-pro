'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AdLeaderboard, AdRectangle } from '../../components/AdUnit'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlyContrib, setMonthlyContrib] = useState(1000)
  const [preReturnRate, setPreReturnRate] = useState(7)
  const [postReturnRate, setPostReturnRate] = useState(4)
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000)
  const [inflationRate, setInflationRate] = useState(2.5)

  const results = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge)
    const monthsToRetirement = yearsToRetirement * 12
    const r = preReturnRate / 100 / 12

    // Accumulation phase
    const fvCurrent = currentSavings * Math.pow(1 + r, monthsToRetirement)
    const fvContribs = r > 0
      ? monthlyContrib * ((Math.pow(1 + r, monthsToRetirement) - 1) / r)
      : monthlyContrib * monthsToRetirement
    const nestEgg = fvCurrent + fvContribs

    // How long will money last (distribution phase)
    // Adjust expenses for inflation
    const inflationFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement)
    const retirementMonthlyNeeds = monthlyExpenses * inflationFactor
    const postR = postReturnRate / 100 / 12

    // Years of retirement money lasts (assume 30 year horizon to 95)
    let yearsLast = 0
    let balance = nestEgg
    while (balance > 0 && yearsLast < 50) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + postR) - retirementMonthlyNeeds
        if (balance <= 0) break
      }
      yearsLast++
    }

    // 4% rule: safe withdrawal
    const safeWithdrawal = nestEgg * 0.04 / 12

    const onTrack = safeWithdrawal >= retirementMonthlyNeeds

    return {
      nestEgg,
      yearsToRetirement,
      retirementMonthlyNeeds: Math.round(retirementMonthlyNeeds),
      safeWithdrawal,
      yearsLast,
      onTrack,
      totalContributed: currentSavings + monthlyContrib * monthsToRetirement,
    }
  }, [currentAge, retirementAge, currentSavings, monthlyContrib, preReturnRate, postReturnRate, monthlyExpenses, inflationRate])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <a href="/" className="hover:text-gold-400">Home</a><span>/</span>
            <span className="text-slate-300">Retirement Calculator</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2 gold-accent">Retirement Calculator</h1>
          <p className="text-slate-400 max-w-2xl">Find out if you're on track for retirement and how much you need to save.</p>
        </div>

        <AdLeaderboard />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Your Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Current Age</label>
                    <span className="text-gold-400 font-mono font-bold">{currentAge}</span>
                  </div>
                  <input type="range" min="18" max="70" step="1" value={currentAge}
                    onChange={e => setCurrentAge(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={currentAge} onChange={e => setCurrentAge(+e.target.value)} className="calc-input" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Retirement Age</label>
                    <span className="text-gold-400 font-mono font-bold">{retirementAge}</span>
                  </div>
                  <input type="range" min={currentAge + 1} max="80" step="1" value={retirementAge}
                    onChange={e => setRetirementAge(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={retirementAge} onChange={e => setRetirementAge(+e.target.value)} className="calc-input" />
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Current Retirement Savings</label>
                  <input type="number" value={currentSavings} onChange={e => setCurrentSavings(+e.target.value)} className="calc-input" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Monthly Contribution</label>
                    <span className="text-gold-400 font-mono">{fmt(monthlyContrib)}</span>
                  </div>
                  <input type="range" min="0" max="10000" step="50" value={monthlyContrib}
                    onChange={e => setMonthlyContrib(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(+e.target.value)} className="calc-input" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Monthly Retirement Expenses (today's dollars)</label>
                    <span className="text-gold-400 font-mono">{fmt(monthlyExpenses)}</span>
                  </div>
                  <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(+e.target.value)} className="calc-input" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-300 text-xs block mb-2">Pre-retire Return</label>
                    <input type="number" step="0.5" value={preReturnRate} onChange={e => setPreReturnRate(+e.target.value)} className="calc-input text-sm" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs block mb-2">Post-retire Return</label>
                    <input type="number" step="0.5" value={postReturnRate} onChange={e => setPostReturnRate(+e.target.value)} className="calc-input text-sm" />
                  </div>
                  <div>
                    <label className="text-slate-300 text-xs block mb-2">Inflation %</label>
                    <input type="number" step="0.1" value={inflationRate} onChange={e => setInflationRate(+e.target.value)} className="calc-input text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className={`result-card border ${results.onTrack ? 'border-emerald-500/40' : 'border-amber-500/40'}`}>
              <div className="text-center py-3">
                <div className="text-3xl mb-2">{results.onTrack ? '✅' : '⚠️'}</div>
                <div className={`font-bold text-lg ${results.onTrack ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {results.onTrack ? 'On Track!' : 'Needs Adjustment'}
                </div>
              </div>
            </div>

            <div className="result-card" style={{ borderColor: 'rgba(212,160,23,0.3)', borderWidth: 1 }}>
              <div className="text-center py-3">
                <div className="text-slate-400 text-sm mb-1">Projected Nest Egg at {retirementAge}</div>
                <div className="font-mono text-4xl font-bold text-gold-400">{fmt(results.nestEgg)}</div>
                <div className="text-slate-500 text-xs mt-1">{results.yearsToRetirement} years from now</div>
              </div>
            </div>

            <div className="result-card">
              <div className="space-y-3">
                {[
                  { label: 'Monthly Need at Retirement', value: fmt(results.retirementMonthlyNeeds) },
                  { label: 'Safe Monthly Withdrawal (4%)', value: fmt(results.safeWithdrawal), color: results.onTrack ? 'text-emerald-400' : 'text-amber-400' },
                  { label: 'Savings Will Last', value: results.yearsLast >= 50 ? '50+ years' : `~${results.yearsLast} years`, color: results.yearsLast >= 30 ? 'text-emerald-400' : 'text-red-400' },
                  { label: 'Total Contributed', value: fmt(results.totalContributed) },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className={`font-mono font-bold text-sm ${item.color || 'text-white'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdRectangle />
          </div>
        </div>

        <AdLeaderboard />
      </main>
      <Footer />
    </>
  )
}
