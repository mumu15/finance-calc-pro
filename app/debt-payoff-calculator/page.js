'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is the debt snowball method?', a: 'The debt snowball method involves paying off your smallest debt first while making minimum payments on all others. Once the smallest is paid off, you roll that payment into the next smallest debt. This builds momentum and motivation.' },
  { q: 'What is the debt avalanche method?', a: 'The debt avalanche method involves paying off your highest interest rate debt first while making minimum payments on all others. This saves the most money in interest over time.' },
  { q: 'Which debt payoff method is better?', a: 'The avalanche method saves more money mathematically. The snowball method provides faster psychological wins which helps people stay motivated. Choose the one you are more likely to stick with.' },
  { q: 'How can I pay off debt faster?', a: 'Pay more than the minimum payment each month, use the debt snowball or avalanche method, reduce expenses to free up more money for debt payments, consider balance transfer cards with 0% APR, and avoid taking on new debt.' },
  { q: 'Is this debt payoff calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState(10000)
  const [rate, setRate] = useState(18.9)
  const [payment, setPayment] = useState(300)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const monthlyRate = rate / 100 / 12
    let remaining = balance
    let months = 0
    let totalPaid = 0
    const minPayment = Math.max(payment, remaining * monthlyRate + 1)

    if (payment <= remaining * monthlyRate) {
      setResult({ error: true })
      return
    }

    while (remaining > 0 && months < 600) {
      const interest = remaining * monthlyRate
      const principal = Math.min(payment - interest, remaining)
      remaining -= principal
      totalPaid += payment
      months++
      if (remaining < 0.01) remaining = 0
    }

    const totalInterest = totalPaid - balance
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    setResult({ months, years, remainingMonths, totalPaid: totalPaid.toFixed(2), totalInterest: totalInterest.toFixed(2), error: false })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Payoff Calculator</h1>
          <p className="text-slate-400 text-lg">Find out how long it will take to pay off your debt</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Current Balance ($)</label>
              <input type="number" value={balance} onChange={e => setBalance(parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Annual Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Monthly Payment ($)</label>
              <input type="number" value={payment} onChange={e => setPayment(parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Payoff</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">💳</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : result.error ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">⚠️</div>
                <p className="text-red-400">Your monthly payment is too low to cover the interest. Please increase your payment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Time to Pay Off Debt</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>
                    {result.years > 0 ? `${result.years}y ` : ''}{result.remainingMonths}m
                  </div>
                  <p className="text-slate-500 text-sm">{result.months} total months</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Original Balance', value: fmt(balance) },
                    { label: 'Monthly Payment', value: fmt(payment) },
                    { label: 'Total Paid', value: fmt(result.totalPaid) },
                    { label: 'Total Interest', value: fmt(result.totalInterest) },
                  ].map((s, i) => (
                    <div key={i} className="stat-card">
                      <div className="text-xl font-bold text-white">{s.value}</div>
                      <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="result-box">
                  <h4 className="text-white font-medium text-sm mb-2">💡 Tips to Pay Off Faster</h4>
                  <ul className="space-y-1 text-slate-400 text-xs">
                    <li>• Increasing your payment by $50/month could save months of payments</li>
                    <li>• Consider a balance transfer to a 0% APR card</li>
                    <li>• Use the debt avalanche method to minimize total interest</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 mt-12">
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Free Debt Payoff Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free debt payoff calculator helps you figure out exactly how long it will take to pay off any debt including credit cards, personal loans, student loans and medical bills. Simply enter your current balance, interest rate and monthly payment to see your payoff timeline and total interest costs. Use this tool to see how increasing your monthly payment can dramatically reduce the time and money it takes to become debt free.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Debt Payoff Strategies</h2>
            <div className="text-slate-400 text-sm leading-relaxed space-y-3">
              <p><strong className="text-white">Debt Snowball:</strong> Pay off your smallest balance first for quick wins and motivation. Roll each paid off payment into the next debt.</p>
              <p><strong className="text-white">Debt Avalanche:</strong> Pay off your highest interest rate debt first to minimize total interest paid. This is mathematically the best strategy.</p>
              <p><strong className="text-white">Balance Transfer:</strong> Move high interest credit card debt to a 0% APR card to stop interest accumulating while you pay down the balance.</p>
            </div>
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

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💳</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate monthly payments for any loan</p>
              </a>
              <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Create a monthly budget plan</p>
              </a>
              <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate your emergency fund target</p>
              </a>
              <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Net Worth Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate your total net worth</p>
              </a>
            </div>
          </div>
      </main>

          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/debt-snowball-vs-avalanche" className="font-semibold hover:underline" style={{color:'#f0c842'}}>Debt Snowball vs Debt Avalanche: Which is Better?</a>
          </div>
      <Footer />
    </>
  )
}