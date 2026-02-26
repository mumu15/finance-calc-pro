'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { AdLeaderboard, AdRectangle } from '../../components/AdUnit'

const TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 10 },
    { min: 11600, max: 47150, rate: 12 },
    { min: 47150, max: 100525, rate: 22 },
    { min: 100525, max: 191950, rate: 24 },
    { min: 191950, max: 243725, rate: 32 },
    { min: 243725, max: 609350, rate: 35 },
    { min: 609350, max: Infinity, rate: 37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 10 },
    { min: 23200, max: 94300, rate: 12 },
    { min: 94300, max: 201050, rate: 22 },
    { min: 201050, max: 383900, rate: 24 },
    { min: 383900, max: 487450, rate: 32 },
    { min: 487450, max: 731200, rate: 35 },
    { min: 731200, max: Infinity, rate: 37 },
  ],
}

const STANDARD_DEDUCTION = { single: 14600, married: 29200 }

export default function TaxCalculator() {
  const [income, setIncome] = useState(75000)
  const [filingStatus, setFilingStatus] = useState('single')
  const [deductions, setDeductions] = useState(0)
  const [stateTaxRate, setStateTaxRate] = useState(5)

  const results = useMemo(() => {
    const stdDed = STANDARD_DEDUCTION[filingStatus]
    const totalDeductions = stdDed + deductions
    const taxableIncome = Math.max(0, income - totalDeductions)
    const brackets = TAX_BRACKETS_2024[filingStatus]

    let totalFedTax = 0
    const bracketBreakdown = []

    for (const bracket of brackets) {
      if (taxableIncome <= bracket.min) break
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min
      const taxInBracket = taxableInBracket * bracket.rate / 100
      totalFedTax += taxInBracket
      if (taxableInBracket > 0) {
        bracketBreakdown.push({ rate: bracket.rate, amount: taxInBracket, income: taxableInBracket })
      }
    }

    const stateTax = income * stateTaxRate / 100
    const ficaTax = Math.min(income, 168600) * 0.062 + income * 0.0145 // SS + Medicare
    const totalTax = totalFedTax + stateTax + ficaTax
    const effectiveRate = (totalFedTax / Math.max(income, 1) * 100)
    const marginalRate = brackets.find(b => taxableIncome >= b.min && taxableIncome < b.max)?.rate || 37
    const takeHome = income - totalTax

    return { totalFedTax, stateTax, ficaTax, totalTax, effectiveRate, marginalRate, takeHome, taxableIncome, bracketBreakdown, stdDed }
  }, [income, filingStatus, deductions, stateTaxRate])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  const fmtDec = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <a href="/" className="hover:text-gold-400">Home</a><span>/</span>
            <span className="text-slate-300">Tax Calculator</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-2 gold-accent">Income Tax Calculator 2024</h1>
          <p className="text-slate-400 max-w-2xl">Estimate your federal income tax, effective rate, and take-home pay using 2024 tax brackets.</p>
        </div>

        <AdLeaderboard />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="result-card">
              <h2 className="font-display text-lg font-semibold text-white mb-5">Tax Information</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">Annual Gross Income</label>
                    <span className="text-gold-400 font-mono font-bold">{fmt(income)}</span>
                  </div>
                  <input type="range" min="10000" max="1000000" step="1000" value={income}
                    onChange={e => setIncome(+e.target.value)} className="w-full mb-2" />
                  <input type="number" value={income} onChange={e => setIncome(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <label className="text-slate-300 text-sm block mb-2">Filing Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[['single', 'Single / HOH'], ['married', 'Married Filing Jointly']].map(([val, label]) => (
                      <button key={val} onClick={() => setFilingStatus(val)}
                        className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                          filingStatus === val ? 'bg-gold-400 text-navy-950' : 'bg-navy-700 text-slate-300 hover:bg-navy-600'
                        }`}>{label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm block mb-1">Additional Deductions (itemized above standard)</label>
                  <div className="text-slate-500 text-xs mb-2">Standard deduction: {fmt(results.stdDed)} already included</div>
                  <input type="number" value={deductions} onChange={e => setDeductions(+e.target.value)} className="calc-input" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-300 text-sm">State Income Tax Rate</label>
                    <span className="text-gold-400 font-mono font-bold">{stateTaxRate}%</span>
                  </div>
                  <input type="range" min="0" max="15" step="0.1" value={stateTaxRate}
                    onChange={e => setStateTaxRate(+e.target.value)} className="w-full mb-2" />
                  <div className="text-slate-500 text-xs">No state tax: set to 0% (e.g. FL, TX, WA, NV)</div>
                </div>
              </div>
            </div>

            {/* Bracket breakdown */}
            <div className="result-card">
              <h3 className="font-display text-base font-semibold text-white mb-4">Tax Bracket Breakdown</h3>
              <div className="space-y-2">
                {results.bracketBreakdown.map(b => (
                  <div key={b.rate} className="flex items-center gap-3">
                    <div className="text-slate-400 text-xs w-12 font-mono">{b.rate}%</div>
                    <div className="flex-1 progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.min(100, b.income / income * 100 * 2).toFixed(0)}%` }} />
                    </div>
                    <div className="text-red-400 font-mono text-xs w-20 text-right">{fmt(b.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="result-card" style={{ borderColor: 'rgba(212,160,23,0.3)', borderWidth: 1 }}>
              <div className="text-center py-3">
                <div className="text-slate-400 text-sm mb-1">Take-Home Pay</div>
                <div className="font-mono text-5xl font-bold text-gold-400">{fmt(results.takeHome)}</div>
                <div className="text-slate-500 text-xs mt-1">{fmt(Math.round(results.takeHome / 12))}/month</div>
              </div>
            </div>

            <div className="result-card">
              <div className="space-y-3">
                {[
                  { label: 'Taxable Income', value: fmt(results.taxableIncome) },
                  { label: 'Federal Income Tax', value: fmt(results.totalFedTax), red: true },
                  { label: 'State Tax', value: fmt(results.stateTax), red: true },
                  { label: 'FICA (SS + Medicare)', value: fmt(results.ficaTax), red: true },
                  { label: 'Total Tax', value: fmt(results.totalTax), red: true },
                  { label: 'Effective Federal Rate', value: `${results.effectiveRate.toFixed(1)}%` },
                  { label: 'Marginal Rate', value: `${results.marginalRate}%`, color: 'text-gold-400' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between border-b border-navy-800/50 pb-2">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className={`font-mono font-bold text-sm ${item.red ? 'text-red-400' : item.color || 'text-white'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdRectangle />
          </div>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-white mb-4 gold-accent">2024 Federal Tax Brackets</h2>
          <div className="text-slate-400 text-sm leading-relaxed space-y-3">
            <p>The US uses a progressive tax system — you only pay higher rates on income above each threshold, not on your entire income. Your effective rate is always lower than your marginal (bracket) rate.</p>
            <p>The standard deduction for 2024 is $14,600 for single filers and $29,200 for married filing jointly. Most taxpayers take the standard deduction rather than itemizing.</p>
          </div>
        </section>

        <AdLeaderboard />
      </main>
      <Footer />
    </>
  )
}
