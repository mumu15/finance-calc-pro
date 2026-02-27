'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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
            <h2 className="text-xl font-bold text-white mb-4">How to Get the Best Loan Rate</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Your interest rate depends on your credit score, income, debt-to-income ratio and the lender you choose. A higher credit score typically means a lower interest rate. Shopping around and comparing offers from multiple lenders can save you thousands of dollars in interest over the life of your loan. Even a 1% difference in interest rate can significantly affect your total repayment amount.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">What is APR vs interest rate?</h3>
                <p className="text-slate-400">The interest rate is the cost of borrowing the principal. APR (Annual Percentage Rate) includes the interest rate plus any fees charged by the lender. Always compare APR when shopping for loans as it gives you the true cost of borrowing.</p>
              </div>
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">Should I choose a shorter or longer loan term?</h3>
                <p className="text-slate-400">A shorter loan term means higher monthly payments but less total interest paid. A longer term means lower monthly payments but more total interest. Choose the shortest term you can comfortably afford to minimize total interest costs.</p>
              </div>
              <div className="pb-4">
                <h3 className="text-white font-semibold mb-2">Is this loan calculator free?</h3>
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