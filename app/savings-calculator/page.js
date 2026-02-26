'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AdLeaderboard, AdRectangle } from '../../components/AdUnit'

export default function SavingsCalculator() {
  const [goalAmount, setGoalAmount] = useState(50000)
  const [currentSavings, setCurrentSavings] = useState(5000)
  const [monthlyDeposit, setMonthlyDeposit] = useState(500)
  const [interestRate, setInterestRate] = useState(4.5)
  const [years, setYears] = useState(10)

  const results = useMemo(() => {
    const r = interestRate / 100 / 12
    const n = years * 12

    // Future value of existing savings
    const fvCurrent = currentSavings * Math.pow(1 + r, n)
    // Future value of monthly contributions
    const fvDeposits = r > 0
      ? monthlyDeposit * ((Math.pow(1 + r, n) - 1) / r)
      : monthlyDeposit * n
    const futureValue = fvCurrent + fvDeposits
    const totalDeposited = currentSavings + monthlyDeposit * n
    const interestEarned = futureValue - totalDeposited

    // How much monthly deposit needed to reach goal
    const remainingGoal = Math.max(0, goalAmount - fvCurrent)
    const monthlyNeeded = r > 0
      ? remainingGoal * r / (Math.pow(1 + r, n) - 1)
      : remainingGoal / n

    const goalReached = futureValue >= goalAmount
    const surplusDeficit = futureValue - goalAmount

    return { futureValue, totalDeposited, interestEarned, monthlyNeeded, goalReached, surplusDeficit }
  }, [goalAmount, currentSavings, monthlyDeposit, interestRate, years])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const fmtDec = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <a href="/" className="hover:text-gold-400">Home</a><span>/</span>
            <span className="text-slate-300">Savings Calculator</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2 gold-accent">Savings Calculator</h1>
          <p className="text-slate-400 max-w-2xl">Plan your savings goals and find out exactly how much you need to save each month.</p>
        </div>

        <AdLeaderboard />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Savings Plan</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Savings Goal</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(goalAmount)}</span>
                  </div>
                  <input type="range" min="1000" max="1000000" step="1000" value={goalAmount}
                    onChange={e => setGoalAmount(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={goalAmount} onChange={e => setGoalAmount(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Current Savings</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(currentSavings)}</span>
                  </div>
                  <input type="number" value={currentSavings} onChange={e => setCurrentSavings(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Monthly Deposit</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(monthlyDeposit)}</span>
                  </div>
                  <input type="range" min="0" max="10000" step="50" value={monthlyDeposit}
                    onChange={e => setMonthlyDeposit(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={monthlyDeposit} onChange={e => setMonthlyDeposit(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Annual Interest Rate</label>
                    <span className="text-gold-400 font-mono font-bold">{interestRate}%</span>
                  </div>
                  <input type="range" min="0" max="20" step="0.1" value={interestRate}
                    onChange={e => setInterestRate(+e.target.value)} className="w-full mb-2" />
                  <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Time Period</label>
                    <span className="text-gold-400 font-mono font-bold">{years} years</span>
                  </div>
                  <input type="range" min="1" max="40" step="1" value={years}
                    onChange={e => setYears(+e.target.value)} className="w-full mb-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {/* Goal status */}
            <div className={`result-card border ${results.goalReached ? 'border-emerald-500/40' : 'border-red-500/40'}`}>
              <div className="text-center py-2 mb-3">
                <div className={`text-3xl mb-1`}>{results.goalReached ? '🎯' : '📊'}</div>
                <div className={`font-bold text-lg ${results.goalReached ? 'text-emerald-400' : 'text-red-400'}`}>
                  {results.goalReached ? 'Goal Reached!' : 'Adjust Your Plan'}
                </div>
                <div className="text-slate-400 text-xs mt-1">
                  {results.goalReached
                    ? `Surplus: ${fmt(results.surplusDeficit)}`
                    : `Shortfall: ${fmt(Math.abs(results.surplusDeficit))}`}
                </div>
              </div>
            </div>

            <div className="result-card" style={{ borderColor: 'rgba(212,160,23,0.3)', borderWidth: 1 }}>
              <div className="text-center py-3">
                <div className="text-slate-400 text-sm mb-1">Projected Savings</div>
                <div className="font-mono text-5xl font-bold text-gold-400">{fmt(results.futureValue)}</div>
              </div>
            </div>

            <div className="result-card">
              <div className="space-y-3">
                {[
                  { label: 'Total Deposited', value: fmt(results.totalDeposited) },
                  { label: 'Interest Earned', value: fmt(results.interestEarned), color: 'text-emerald-400' },
                  { label: 'Monthly Needed for Goal', value: fmtDec(results.monthlyNeeded), color: 'text-gold-400' },
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
