'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AdLeaderboard, AdRectangle, AdInArticle } from '../../components/AdUnit'

const LOAN_TYPES = ['Personal Loan', 'Auto Loan', 'Student Loan', 'Business Loan']

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(25000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTerm, setLoanTerm] = useState(5)
  const [loanType, setLoanType] = useState('Personal Loan')

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12
    const numPayments = loanTerm * 12
    if (monthlyRate === 0) {
      return { monthlyPayment: loanAmount / numPayments, totalPayment: loanAmount, totalInterest: 0 }
    }
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    const totalPayment = monthlyPayment * numPayments
    const totalInterest = totalPayment - loanAmount

    // Monthly breakdown for first 12 months
    const schedule = []
    let balance = loanAmount
    for (let m = 1; m <= Math.min(numPayments, 24); m++) {
      const interestPmt = balance * monthlyRate
      const principalPmt = monthlyPayment - interestPmt
      balance -= principalPmt
      schedule.push({ month: m, interest: interestPmt, principal: principalPmt, balance: Math.max(0, balance) })
    }

    return { monthlyPayment, totalPayment, totalInterest, schedule }
  }, [loanAmount, interestRate, loanTerm])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const fmtDec = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <a href="/" className="hover:text-gold-400">Home</a><span>/</span>
            <span className="text-slate-300">Loan Calculator</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2 gold-accent">Loan Calculator</h1>
          <p className="text-slate-400 max-w-2xl">Calculate monthly payments and total cost for any type of loan.</p>
        </div>

        <AdLeaderboard />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-6">
            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Loan Details</h2>

              {/* Loan type */}
              <div className="mb-5">
                <label className="text-slate-300 text-sm block mb-2">Loan Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {LOAN_TYPES.map(t => (
                    <button key={t} onClick={() => setLoanType(t)}
                      className={`py-2 px-3 rounded-lg text-sm transition-all ${
                        loanType === t ? 'bg-gold-400 text-navy-950 font-bold' : 'bg-navy-700 text-slate-300 hover:bg-navy-600'
                      }`}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Loan Amount</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(loanAmount)}</span>
                  </div>
                  <input type="range" min="1000" max="500000" step="500" value={loanAmount}
                    onChange={e => setLoanAmount(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={loanAmount} onChange={e => setLoanAmount(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Annual Interest Rate (APR)</label>
                    <span className="text-gold-400 font-mono font-bold">{interestRate}%</span>
                  </div>
                  <input type="range" min="1" max="36" step="0.1" value={interestRate}
                    onChange={e => setInterestRate(+e.target.value)} className="w-full mb-2" />
                  <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <label className="text-slate-300 text-sm block mb-2">Loan Term</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 5, 7, 10, 15, 20].map(t => (
                      <button key={t} onClick={() => setLoanTerm(t)}
                        className={`py-2.5 rounded-lg text-sm font-mono font-bold transition-all ${
                          loanTerm === t ? 'bg-gold-400 text-navy-950' : 'bg-navy-700 text-slate-300 hover:bg-navy-600'
                        }`}>{t}yr</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <AdInArticle />
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            <div className="result-card" style={{ borderColor: 'rgba(212,160,23,0.3)', borderWidth: 1 }}>
              <div className="text-center py-4">
                <div className="text-slate-400 text-sm mb-1">Monthly Payment</div>
                <div className="font-mono text-5xl font-bold text-gold-400">{fmtDec(results.monthlyPayment)}</div>
                <div className="text-slate-500 text-xs mt-1">for {loanTerm * 12} months</div>
              </div>
            </div>

            <div className="result-card">
              <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4">Loan Summary</h3>
              <div className="space-y-3">
                {[
                  { label: 'Principal Amount', value: fmt(loanAmount) },
                  { label: 'Total Interest', value: fmt(results.totalInterest), red: true },
                  { label: 'Total Repayment', value: fmt(results.totalPayment) },
                  { label: 'Interest Rate', value: `${interestRate}% APR` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className={`font-mono font-bold text-sm ${item.red ? 'text-red-400' : 'text-white'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="result-card">
              <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">Cost Breakdown</h3>
              <div className="progress-bar mb-2">
                <div className="progress-fill" style={{ width: `${(loanAmount / results.totalPayment * 100).toFixed(0)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Principal {(loanAmount / results.totalPayment * 100).toFixed(0)}%</span>
                <span>Interest {(results.totalInterest / results.totalPayment * 100).toFixed(0)}%</span>
              </div>
            </div>

            <AdRectangle />
          </div>
        </div>

        {/* SEO Content */}
        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white mb-4 gold-accent">Understanding Your Loan</h2>
          <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
            <p>A lower interest rate dramatically reduces total cost over the life of a loan. Even 1% can save thousands of dollars. Always compare APR (Annual Percentage Rate) rather than monthly rate when comparing loan offers.</p>
            <p>Shorter loan terms mean higher monthly payments but significantly less total interest paid. A 3-year loan will cost considerably less than a 5-year loan for the same amount.</p>
          </div>
        </section>

        <AdLeaderboard />
      </main>
      <Footer />
    </>
  )
}
