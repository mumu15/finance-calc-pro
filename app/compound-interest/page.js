'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CompoundInterest() {
  const [form, setForm] = useState({ principal: 10000, rate: 7, years: 10, compound: 12, monthly: 0 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const n = form.compound
    const r = form.rate / 100
    const t = form.years
    const p = form.principal
    const m = form.monthly

    let amount = p * Math.pow(1 + r / n, n * t)
    if (m > 0) {
      amount += m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
    }
    const totalContributions = p + (m * 12 * t)
    const totalInterest = amount - totalContributions
    setResult({ amount: amount.toFixed(2), totalContributions: totalContributions.toFixed(2), totalInterest: totalInterest.toFixed(2) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Compound Interest Calculator</h1>
          <p className="text-slate-400 text-lg">See how your money grows over time with compound interest</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            {[
              { label: 'Initial Investment ($)', key: 'principal' },
              { label: 'Annual Interest Rate (%)', key: 'rate' },
              { label: 'Time Period (years)', key: 'years' },
              { label: 'Monthly Contribution ($)', key: 'monthly' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white text-sm font-medium block mb-1">{field.label}</label>
                <input type="number" value={form[field.key]} onChange={e => update(field.key, parseFloat(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{background:'#0f172a', border:'1px solid #1e293b'}} />
              </div>
            ))}
            <div>
              <label className="text-white text-sm font-medium block mb-1">Compound Frequency</label>
              <select value={form.compound} onChange={e => update('compound', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}}>
                <option value={1}>Annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Growth</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">📈</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Final Amount</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.amount)}</div>
                  <p className="text-slate-500 text-sm">after {form.years} years</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total Invested', value: fmt(result.totalContributions) },
                    { label: 'Interest Earned', value: fmt(result.totalInterest) },
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
            <h2 className="text-xl font-bold text-white mb-4">What is Compound Interest?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest which is calculated only on the principal, compound interest grows exponentially over time. This is why Albert Einstein reportedly called compound interest the eighth wonder of the world. The longer your money compounds, the more dramatic the growth becomes.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">The Power of Starting Early</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Time is the most important factor in compound interest. Investing $10,000 at 7% annual return for 30 years grows to over $76,000. The same investment for 40 years grows to over $150,000. Starting just 10 years earlier nearly doubles your final amount. This is why financial advisors always recommend starting to invest as early as possible, even with small amounts.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">How often should interest compound?</h3>
                <p className="text-slate-400">The more frequently interest compounds, the more you earn. Daily compounding earns slightly more than monthly, which earns more than annual. Most savings accounts and investments compound monthly or daily.</p>
              </div>
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">What is a realistic interest rate to use?</h3>
                <p className="text-slate-400">The US stock market has historically returned an average of 7-10% per year. High yield savings accounts currently offer 4-5%. For conservative estimates use 5-6%, for stock market investments use 7-8%.</p>
              </div>
              <div className="pb-4">
                <h3 className="text-white font-semibold mb-2">Is this calculator free?</h3>
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