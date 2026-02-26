'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AdLeaderboard, AdRectangle, AdInArticle } from '../../components/AdUnit'

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000)
  const [downPayment, setDownPayment] = useState(80000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [propertyTax, setPropertyTax] = useState(300)
  const [insurance, setInsurance] = useState(150)
  const [showAmortization, setShowAmortization] = useState(false)

  const results = useMemo(() => {
    const principal = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12

    if (monthlyRate === 0) {
      const monthly = principal / numPayments
      return {
        principal,
        monthlyPI: monthly,
        totalPayment: monthly + propertyTax + insurance,
        totalPaid: monthly * numPayments,
        totalInterest: 0,
        downPercent: ((downPayment / homePrice) * 100).toFixed(1),
        schedule: [],
      }
    }

    const monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    // Build amortization schedule (yearly summary)
    const schedule = []
    let balance = principal
    for (let year = 1; year <= loanTerm; year++) {
      let yearInterest = 0
      let yearPrincipal = 0
      for (let m = 0; m < 12; m++) {
        const interestPmt = balance * monthlyRate
        const principalPmt = monthlyPI - interestPmt
        yearInterest += interestPmt
        yearPrincipal += principalPmt
        balance -= principalPmt
        if (balance < 0) balance = 0
      }
      schedule.push({ year, interest: yearInterest, principal: yearPrincipal, balance: Math.max(0, balance) })
    }

    return {
      principal,
      monthlyPI,
      totalPayment: monthlyPI + propertyTax + insurance,
      totalPaid: monthlyPI * numPayments,
      totalInterest: monthlyPI * numPayments - principal,
      downPercent: ((downPayment / homePrice) * 100).toFixed(1),
      schedule,
    }
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const fmtDec = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

  const piPct = (results.monthlyPI / results.totalPayment * 100).toFixed(0)
  const taxPct = (propertyTax / results.totalPayment * 100).toFixed(0)
  const insPct = (insurance / results.totalPayment * 100).toFixed(0)

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <a href="/" className="hover:text-gold-400 transition-colors">Home</a>
            <span>/</span>
            <span className="text-slate-300">Mortgage Calculator</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2 gold-accent">
            Mortgage Calculator
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Calculate your monthly mortgage payment, total interest paid, and view a full year-by-year amortization schedule.
          </p>
        </div>

        <AdLeaderboard />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-6">
            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Loan Details</h2>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Home Price</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(homePrice)}</span>
                  </div>
                  <input type="range" min="50000" max="2000000" step="5000" value={homePrice}
                    onChange={e => setHomePrice(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={homePrice} onChange={e => setHomePrice(+e.target.value)}
                    className="calc-input text-base" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Down Payment ({results.downPercent}%)</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(downPayment)}</span>
                  </div>
                  <input type="range" min="0" max={homePrice} step="1000" value={downPayment}
                    onChange={e => setDownPayment(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={downPayment} onChange={e => setDownPayment(+e.target.value)}
                    className="calc-input text-base" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Annual Interest Rate</label>
                    <span className="text-gold-400 font-mono font-bold">{interestRate}%</span>
                  </div>
                  <input type="range" min="1" max="20" step="0.1" value={interestRate}
                    onChange={e => setInterestRate(+e.target.value)} className="w-full mb-2" />
                  <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(+e.target.value)}
                    className="calc-input text-base" />
                </div>

                <div>
                  <label className="text-slate-300 text-sm block mb-2">Loan Term</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 15, 20, 25, 30].map(t => (
                      <button key={t} onClick={() => setLoanTerm(t)}
                        className={`py-2.5 rounded-lg text-sm font-mono font-bold transition-all ${
                          loanTerm === t ? 'bg-gold-400 text-navy-950' : 'bg-navy-700 text-slate-300 hover:bg-navy-600'
                        }`}>
                        {t} yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Monthly Extras</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Property Tax / mo.</label>
                  <input type="number" value={propertyTax} onChange={e => setPropertyTax(+e.target.value)}
                    className="calc-input" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Home Insurance / mo.</label>
                  <input type="number" value={insurance} onChange={e => setInsurance(+e.target.value)}
                    className="calc-input" />
                </div>
              </div>
            </div>

            <AdInArticle />
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main payment */}
            <div className="result-card border-gold-500/30" style={{ borderColor: 'rgba(212,160,23,0.3)' }}>
              <div className="text-center py-4">
                <div className="text-slate-400 text-sm mb-1">Monthly Payment</div>
                <div className="font-mono text-5xl font-bold text-gold-400 animate-slide-up">
                  {fmtDec(results.totalPayment)}
                </div>
                <div className="text-slate-500 text-xs mt-1">per month</div>
              </div>

              {/* Donut breakdown */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-navy-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold-400" />
                    <span className="text-slate-300 text-sm">Principal & Interest</span>
                  </div>
                  <span className="font-mono text-sm text-white">{fmtDec(results.monthlyPI)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-navy-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-slate-300 text-sm">Property Tax</span>
                  </div>
                  <span className="font-mono text-sm text-white">{fmt(propertyTax)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-slate-300 text-sm">Insurance</span>
                  </div>
                  <span className="font-mono text-sm text-white">{fmt(insurance)}</span>
                </div>
              </div>
            </div>

            {/* Summary stats */}
            <div className="result-card">
              <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4">Loan Summary</h3>
              <div className="space-y-3">
                {[
                  { label: 'Loan Amount', value: fmt(results.principal) },
                  { label: 'Total Interest', value: fmt(results.totalInterest), highlight: true },
                  { label: 'Total Cost', value: fmt(results.totalPaid + downPayment) },
                  { label: 'Payoff Date', value: `${new Date().getFullYear() + loanTerm}` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className={`font-mono font-bold text-sm ${item.highlight ? 'text-red-400' : 'text-white'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interest vs Principal bar */}
            <div className="result-card">
              <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">Principal vs Interest</h3>
              <div className="mb-2">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Principal {((results.principal / (results.totalPaid)) * 100).toFixed(0)}%</span>
                  <span>Interest {((results.totalInterest / results.totalPaid) * 100).toFixed(0)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(results.principal / results.totalPaid * 100).toFixed(0)}%` }} />
                </div>
              </div>
            </div>

            <AdRectangle />
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="mt-10">
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="flex items-center gap-3 text-gold-400 border border-gold-500/30 px-6 py-3 rounded-xl hover:bg-gold-400/10 transition-all font-semibold"
          >
            <span>{showAmortization ? '▲' : '▼'}</span>
            {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
          </button>

          {showAmortization && (
            <div className="mt-6 result-card overflow-x-auto">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Year-by-Year Amortization</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-700">
                    {['Year', 'Principal Paid', 'Interest Paid', 'Remaining Balance'].map(h => (
                      <th key={h} className="text-left text-slate-400 text-xs uppercase tracking-wide pb-3 pr-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map(row => (
                    <tr key={row.year} className="border-b border-navy-800/50 hover:bg-navy-800/30 transition-colors">
                      <td className="py-2.5 pr-6 font-mono text-slate-300">{row.year}</td>
                      <td className="py-2.5 pr-6 font-mono text-emerald-400">{fmt(row.principal)}</td>
                      <td className="py-2.5 pr-6 font-mono text-red-400">{fmt(row.interest)}</td>
                      <td className="py-2.5 font-mono text-white">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white mb-4 gold-accent">How to Use the Mortgage Calculator</h2>
          <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
            <p>Enter the home price, your planned down payment, the annual interest rate, and loan term. The calculator instantly shows your monthly principal and interest payment, plus optional property tax and insurance for a complete PITI payment estimate.</p>
            <p>The <strong className="text-slate-200">amortization schedule</strong> shows exactly how much of each year's payments go toward principal vs interest — early years are heavily interest-weighted, which is why paying extra principal early saves significant money.</p>
            <p>A <strong className="text-slate-200">20% down payment</strong> eliminates Private Mortgage Insurance (PMI), typically saving $50–$200/month. Our calculator shows your down payment percentage to help you plan accordingly.</p>
          </div>
        </section>

        <AdLeaderboard />
      </main>
      <Footer />
    </>
  )
}
