'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is APR vs interest rate?', a: 'The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus any fees charged by the lender. Always compare APR when shopping for loans as it gives you the true cost of borrowing.' },
  { q: 'Should I choose a shorter or longer loan term?', a: 'A shorter loan term means higher monthly payments but less total interest paid. A longer term means lower monthly payments but more total interest. Choose the shortest term you can comfortably afford to minimize total interest costs.' },
  { q: 'How can I get a lower interest rate on a loan?', a: 'Improve your credit score before applying, shop around and compare offers from multiple lenders, consider a secured loan, add a co-signer with good credit, or offer a larger down payment. Even a 1% lower rate can save thousands over the life of the loan.' },
  { q: 'What credit score do I need for a personal loan?', a: 'Most lenders require a minimum credit score of 580-600 for personal loans. For the best rates you typically need a score of 700 or above. Scores above 750 qualify for the lowest available interest rates.' },
  { q: 'Is this loan calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function LoanCalculator() {
  const [form, setForm] = useState({ loanAmount: 10000, interestRate: 8.5, loanTerm: 3 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const monthlyRate = form.interestRate / 100 / 12
    const numPayments = form.loanTerm * 12
    const payment = form.loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    const totalPayment = payment * numPayments
    const totalInterest = totalPayment - form.loanAmount
    setResult({ monthly: payment.toFixed(2), totalPayment: totalPayment.toFixed(2), totalInterest: totalInterest.toFixed(2) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Loan Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate your monthly loan payment and total interest</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            {[
              { label: 'Loan Amount', key: 'loanAmount' },
              { label: 'Annual Interest Rate (%)', key: 'interestRate' },
              { label: 'Loan Term (years)', key: 'loanTerm' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white text-sm font-medium block mb-1">{field.label}</label>
                <input type="number" value={form[field.key]} onChange={e => update(field.key, parseFloat(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{background:'#0f172a', border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Payment</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">💰</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Monthly Payment</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.monthly)}</div>
                  <p className="text-slate-500 text-sm">per month for {form.loanTerm} years</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Loan Amount', value: fmt(form.loanAmount) },
                    { label: 'Total Payment', value: fmt(result.totalPayment) },
                    { label: 'Total Interest', value: fmt(result.totalInterest) },
                    { label: 'Total Payments', value: form.loanTerm * 12 },
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
            <h2 className="text-xl font-bold text-white mb-4">Free Personal Loan Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free loan calculator helps you estimate your monthly payment for any type of personal loan, car loan, student loan or business loan. Simply enter the loan amount, interest rate and loan term to instantly see your monthly payment and total interest costs. Use this tool to compare different loan offers and find the most affordable option.</p>
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
      <Footer />
    </>
  )
}