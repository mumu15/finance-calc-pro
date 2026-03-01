'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'How much should I save each month?', a: 'Financial experts recommend saving at least 20% of your income. The 50/30/20 rule suggests 50% for needs, 30% for wants and 20% for savings and debt repayment.' },
  { q: 'What interest rate should I use?', a: 'Use the actual interest rate from your savings account. High yield savings accounts currently offer around 4-5% APY. Traditional savings accounts offer much lower rates around 0.01-0.5%.' },
  { q: 'What is a high yield savings account?', a: 'A high yield savings account is a savings account that offers a much higher interest rate than a traditional bank savings account. They are typically offered by online banks and currently offer 4-5% APY compared to 0.01% at traditional banks.' },
  { q: 'How can I reach my savings goal faster?', a: 'Increase your monthly contributions even by small amounts, use a high yield savings account for better interest rates, automate your savings on payday, reduce unnecessary expenses, and consider adding windfalls like tax refunds or bonuses directly to savings.' },
  { q: 'Is this savings calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function SavingsCalculator() {
  const [form, setForm] = useState({ goal: 50000, initial: 1000, monthly: 500, rate: 4.5 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = form.rate / 100 / 12
    const target = form.goal
    const p = form.initial
    const m = form.monthly
    let balance = p
    let months = 0
    let totalContributions = p
    while (balance < target && months < 1200) {
      balance = balance * (1 + r) + m
      totalContributions += m
      months++
    }
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    const interestEarned = balance - totalContributions
    setResult({ months, years, remainingMonths, finalBalance: balance.toFixed(2), totalContributions: totalContributions.toFixed(2), interestEarned: interestEarned.toFixed(2) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Savings Goal Calculator</h1>
          <p className="text-slate-400 text-lg">Find out how long it will take to reach your savings goal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            {[
              { label: 'Savings Goal ($)', key: 'goal' },
              { label: 'Initial Deposit ($)', key: 'initial' },
              { label: 'Monthly Contribution ($)', key: 'monthly' },
              { label: 'Annual Interest Rate (%)', key: 'rate' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white text-sm font-medium block mb-1">{field.label}</label>
                <input type="number" value={form[field.key]} onChange={e => update(field.key, parseFloat(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{background:'#0f172a', border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Time to Goal</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">🎯</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Time to Reach Goal</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>
                    {result.years > 0 ? `${result.years}y ` : ''}{result.remainingMonths}m
                  </div>
                  <p className="text-slate-500 text-sm">{result.months} total months</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Final Balance', value: fmt(result.finalBalance) },
                    { label: 'Total Saved', value: fmt(result.totalContributions) },
                    { label: 'Interest Earned', value: fmt(result.interestEarned) },
                    { label: 'Monthly Savings', value: fmt(form.monthly) },
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
            <h2 className="text-xl font-bold text-white mb-4">Free Savings Goal Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free savings calculator helps you figure out how long it will take to reach any financial goal. Whether you are saving for a house down payment, emergency fund, vacation, car or retirement, this tool shows you exactly how many months you need based on your starting balance, monthly contributions and interest rate.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              {faqs.map((faq, i) => (
                <div key={i} className={i < faqs.length - 1 ? "border-b pb-4" : "pb-4"} style={{borderColor:"rgba(240,200,66,0.1)"}}>
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/how-to-build-emergency-fund" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How to Build an Emergency Fund From Scratch (2026)</a>
          </div>
      <Footer />
    </>
  )
}