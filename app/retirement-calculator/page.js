'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function RetirementCalculator() {
  const [form, setForm] = useState({ currentAge: 30, retirementAge: 65, currentSavings: 25000, monthly: 500, rate: 7, withdrawalRate: 4 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const years = form.retirementAge - form.currentAge
    const r = form.rate / 100 / 12
    const n = years * 12
    const p = form.currentSavings
    const m = form.monthly

    const futureValue = p * Math.pow(1 + r, n) + m * ((Math.pow(1 + r, n) - 1) / r)
    const annualIncome = futureValue * (form.withdrawalRate / 100)
    const monthlyIncome = annualIncome / 12
    const totalContributions = p + (m * n)
    const interestEarned = futureValue - totalContributions

    setResult({
      futureValue: futureValue.toFixed(2),
      annualIncome: annualIncome.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      years
    })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Retirement Calculator</h1>
          <p className="text-slate-400 text-lg">Plan your retirement and see how much you will have saved</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            {[
              { label: 'Current Age', key: 'currentAge' },
              { label: 'Retirement Age', key: 'retirementAge' },
              { label: 'Current Savings ($)', key: 'currentSavings' },
              { label: 'Monthly Contribution ($)', key: 'monthly' },
              { label: 'Expected Annual Return (%)', key: 'rate' },
              { label: 'Withdrawal Rate (%)', key: 'withdrawalRate' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white text-sm font-medium block mb-1">{field.label}</label>
                <input type="number" value={form[field.key]} onChange={e => update(field.key, parseFloat(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{background:'#0f172a', border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Retirement</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">🏖️</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Retirement Savings at {form.retirementAge}</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.futureValue)}</div>
                  <p className="text-slate-500 text-sm">after {result.years} years of saving</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Monthly Income', value: fmt(result.monthlyIncome) },
                    { label: 'Annual Income', value: fmt(result.annualIncome) },
                    { label: 'Total Contributed', value: fmt(result.totalContributions) },
                    { label: 'Interest Earned', value: fmt(result.interestEarned) },
                  ].map((s, i) => (
                    <div key={i} className="stat-card">
                      <div className="text-xl font-bold text-white">{s.value}</div>
                      <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Free Retirement Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free retirement calculator helps you estimate how much money you will have when you retire based on your current savings, monthly contributions and expected investment returns. It also shows how much monthly income your retirement savings can generate using the 4% withdrawal rule. Use this tool to see if you are on track for retirement and how changes to your savings rate affect your outcome.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">How Much Do You Need to Retire?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">A common rule of thumb is to save 25 times your annual expenses. This is based on the 4% withdrawal rule which states you can withdraw 4% of your portfolio each year without running out of money over a 30-year retirement. For example, if you need $60,000 per year in retirement, you need $1.5 million saved. The earlier you start saving and the more you contribute each month, the easier it is to reach this goal.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">What is the 4% withdrawal rule?</h3>
                <p className="text-slate-400">The 4% rule suggests you can safely withdraw 4% of your retirement savings each year without running out of money over a 30-year retirement. It is based on historical stock and bond market returns.</p>
              </div>
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">How much should I contribute to retirement each month?</h3>
                <p className="text-slate-400">Financial advisors recommend saving 15% of your gross income for retirement including any employer match. At minimum, contribute enough to get your full employer 401k match as this is free money.</p>
              </div>
              <div className="pb-4">
                <h3 className="text-white font-semibold mb-2">Is this retirement calculator free?</h3>
                <p className="text-slate-400">Yes, completely free with no sign up required.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}