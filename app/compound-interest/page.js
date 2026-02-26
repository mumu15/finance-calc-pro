'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AdLeaderboard, AdRectangle, AdInArticle } from '../../components/AdUnit'

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000)
  const [monthlyContrib, setMonthlyContrib] = useState(500)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)
  const [compFreq, setCompFreq] = useState(12)

  const results = useMemo(() => {
    const n = compFreq
    const r = rate / 100
    const t = years

    // Future value with regular contributions (compounding)
    const fvPrincipal = principal * Math.pow(1 + r / n, n * t)
    const fvContribs = monthlyContrib > 0
      ? monthlyContrib * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
      : 0
    const totalValue = fvPrincipal + fvContribs
    const totalContributed = principal + monthlyContrib * 12 * t
    const totalInterest = totalValue - totalContributed

    // Year by year
    const yearData = []
    let balance = principal
    for (let y = 1; y <= t; y++) {
      const prevBalance = balance
      balance = balance * Math.pow(1 + r / n, n)
      const yearContrib = monthlyContrib * 12
      balance += yearContrib * ((Math.pow(1 + r / n, n) - 1) / (r / n))
      yearData.push({ year: y, balance, contributed: principal + monthlyContrib * 12 * y, interest: balance - (principal + monthlyContrib * 12 * y) })
    }

    return { totalValue, totalContributed, totalInterest, yearData }
  }, [principal, monthlyContrib, rate, years, compFreq])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const fmtDec = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

  const freqOptions = [
    { value: 1, label: 'Annually' },
    { value: 4, label: 'Quarterly' },
    { value: 12, label: 'Monthly' },
    { value: 365, label: 'Daily' },
  ]

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <a href="/" className="hover:text-gold-400">Home</a><span>/</span>
            <span className="text-slate-300">Compound Interest Calculator</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2 gold-accent">Compound Interest Calculator</h1>
          <p className="text-slate-400 max-w-2xl">See the power of compound interest and watch your investment grow over time.</p>
        </div>

        <AdLeaderboard />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Investment Details</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Initial Investment</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(principal)}</span>
                  </div>
                  <input type="range" min="0" max="500000" step="500" value={principal}
                    onChange={e => setPrincipal(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={principal} onChange={e => setPrincipal(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Monthly Contribution</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(monthlyContrib)}</span>
                  </div>
                  <input type="range" min="0" max="10000" step="50" value={monthlyContrib}
                    onChange={e => setMonthlyContrib(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Annual Return Rate</label>
                    <span className="text-gold-400 font-mono font-bold">{rate}%</span>
                  </div>
                  <input type="range" min="1" max="30" step="0.5" value={rate}
                    onChange={e => setRate(+e.target.value)} className="w-full mb-2" />
                  <input type="number" step="0.5" value={rate} onChange={e => setRate(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Investment Period</label>
                    <span className="text-gold-400 font-mono font-bold">{years} years</span>
                  </div>
                  <input type="range" min="1" max="50" step="1" value={years}
                    onChange={e => setYears(+e.target.value)} className="w-full mb-2" />
                </div>

                <div>
                  <label className="text-slate-300 text-sm block mb-2">Compounding Frequency</label>
                  <div className="grid grid-cols-4 gap-2">
                    {freqOptions.map(f => (
                      <button key={f.value} onClick={() => setCompFreq(f.value)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${
                          compFreq === f.value ? 'bg-gold-400 text-navy-950' : 'bg-navy-700 text-slate-300 hover:bg-navy-600'
                        }`}>{f.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <AdInArticle />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="result-card" style={{ borderColor: 'rgba(212,160,23,0.3)', borderWidth: 1 }}>
              <div className="text-center py-4">
                <div className="text-slate-400 text-sm mb-1">Future Value</div>
                <div className="font-mono text-5xl font-bold text-gold-400">{fmt(results.totalValue)}</div>
                <div className="text-slate-500 text-xs mt-1">after {years} years</div>
              </div>
            </div>

            <div className="result-card">
              <div className="space-y-3">
                {[
                  { label: 'Total Contributed', value: fmt(results.totalContributed), color: 'text-blue-400' },
                  { label: 'Total Interest Earned', value: fmt(results.totalInterest), color: 'text-emerald-400' },
                  { label: 'Growth Multiple', value: `${(results.totalValue / Math.max(results.totalContributed, 1)).toFixed(1)}x`, color: 'text-gold-400' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className={`font-mono font-bold text-sm ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="result-card">
              <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">Interest vs Contributions</h3>
              <div className="progress-bar mb-2">
                <div className="progress-fill" style={{ width: `${Math.min(100, (results.totalInterest / results.totalValue * 100)).toFixed(0)}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Contributed {(results.totalContributed / results.totalValue * 100).toFixed(0)}%</span>
                <span>Interest {(results.totalInterest / results.totalValue * 100).toFixed(0)}%</span>
              </div>
            </div>

            <AdRectangle />
          </div>
        </div>

        {/* Year by Year Table */}
        <div className="mt-10">
          <div className="result-card overflow-x-auto">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Year-by-Year Growth</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-700">
                  {['Year', 'Total Contributed', 'Interest Earned', 'Balance'].map(h => (
                    <th key={h} className="text-left text-slate-400 text-xs uppercase tracking-wide pb-3 pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.yearData.filter((_, i) => i % (years > 20 ? 5 : 1) === 4 || i === 0 || i === results.yearData.length - 1).map(row => (
                  <tr key={row.year} className="border-b border-navy-800/50 hover:bg-navy-800/30">
                    <td className="py-2.5 pr-6 font-mono text-slate-300">{row.year}</td>
                    <td className="py-2.5 pr-6 font-mono text-blue-400">{fmt(row.contributed)}</td>
                    <td className="py-2.5 pr-6 font-mono text-emerald-400">{fmt(row.interest)}</td>
                    <td className="py-2.5 font-mono text-gold-400 font-bold">{fmt(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white mb-4 gold-accent">The Power of Compound Interest</h2>
          <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
            <p>Albert Einstein reportedly called compound interest "the eighth wonder of the world." When your returns earn their own returns, growth accelerates dramatically over time — especially in the final years.</p>
            <p>Starting early is the most powerful factor. Investing $500/month from age 25 vs 35 at 8% return results in nearly double the retirement balance at 65 — just 10 extra years of compounding makes an enormous difference.</p>
          </div>
        </section>

        <AdLeaderboard />
      </main>
      <Footer />
    </>
  )
}
