'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'
import WebAppSchema from '../../components/WebAppSchema'
import BreadcrumbSchema from '../../components/BreadcrumbSchema'

const faqs = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest which is calculated only on the principal, compound interest grows exponentially over time.' },
  { q: 'How often should interest compound?', a: 'The more frequently interest compounds, the more you earn. Daily compounding earns slightly more than monthly, which earns more than annual. Most savings accounts and investments compound monthly or daily.' },
  { q: 'What is a realistic interest rate to use?', a: 'The US stock market has historically returned an average of 7-10% per year. High yield savings accounts currently offer 4-5%. For conservative estimates use 5-6%, for stock market investments use 7-8%.' },
  { q: 'How does compound interest differ from simple interest?', a: 'Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus all previously earned interest. Over long periods compound interest grows dramatically faster than simple interest.' },
  { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual interest rate. At 6% your money doubles in about 12 years. At 10% it doubles in about 7.2 years.' },
  { q: 'How much will $100 per month grow with compound interest?', a: 'At a 7% average annual return, $100/month invested for 30 years would grow to approximately $113,353. Your total contributions would be $36,000, meaning $77,353 or 68% came purely from compound interest.' },
  { q: 'Is this compound interest calculator free?', a: 'Yes, completely free with no sign up required. Your financial data stays in your browser and is never sent to our servers.' },
]

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
    if (m > 0) amount += m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
    const totalContributions = p + (m * 12 * t)
    const totalInterest = amount - totalContributions
    setResult({ amount: amount.toFixed(2), totalContributions: totalContributions.toFixed(2), totalInterest: totalInterest.toFixed(2) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <WebAppSchema
        name="Compound Interest Calculator"
        description="Free compound interest calculator with monthly contributions. See how your investments grow over time with the power of compounding returns."
        url="/compound-interest"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Compound Interest Calculator' },
      ]} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-6">
          <a href="/" className="hover:text-yellow-400 transition-colors">Home</a>
          <span className="mx-2">›</span>
          <span className="text-slate-300">Compound Interest Calculator</span>
        </nav>
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
            <p className="text-slate-400 text-sm leading-relaxed mb-4">Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns on your original deposit, compound interest lets your earnings generate their own earnings — creating exponential growth over time.</p>
            <p className="text-slate-400 text-sm leading-relaxed">For example, if you invest $10,000 at 7% annual return, after year one you have $10,700. In year two, you earn 7% on $10,700 (not just the original $10,000), giving you $11,449. This compounding effect accelerates dramatically over decades — the same $10,000 grows to $76,123 after 30 years without adding a single extra dollar.</p>
          </div>

          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">The Compound Interest Formula</h2>
            <div className="text-center py-4 mb-4" style={{background:'rgba(240,200,66,0.05)', borderRadius:'12px'}}>
              <p className="text-2xl font-bold" style={{color:'#f0c842'}}>A = P(1 + r/n)<sup>nt</sup></p>
            </div>
            <div className="text-slate-400 text-sm leading-relaxed space-y-2">
              <p><span className="text-white font-semibold">A</span> = the future value (what you end up with)</p>
              <p><span className="text-white font-semibold">P</span> = principal (your starting amount)</p>
              <p><span className="text-white font-semibold">r</span> = annual interest rate (as a decimal, so 7% = 0.07)</p>
              <p><span className="text-white font-semibold">n</span> = compounding frequency per year (12 for monthly, 365 for daily)</p>
              <p><span className="text-white font-semibold">t</span> = number of years</p>
            </div>
          </div>

          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">The Rule of 72</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">The Rule of 72 is a quick mental shortcut to estimate how long it takes to double your money. Divide 72 by your annual interest rate. At 6%, your money doubles in approximately 12 years. At 10%, it doubles in about 7.2 years. At the stock market's historical average of roughly 10%, $10,000 could grow to $320,000 over a 35-year career without adding another cent.</p>
          </div>

          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Compound Interest Examples</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">Here is how $100/month grows at a 7% annual return over different time periods:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{borderBottom:'1px solid rgba(240,200,66,0.15)'}}>
                    <th className="text-left py-2 text-slate-300">Time Period</th>
                    <th className="text-right py-2 text-slate-300">You Invest</th>
                    <th className="text-right py-2 text-slate-300">Final Value</th>
                    <th className="text-right py-2 text-slate-300">Interest Earned</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr style={{borderBottom:'1px solid rgba(240,200,66,0.08)'}}>
                    <td className="py-2">10 years</td><td className="text-right">$12,000</td><td className="text-right font-semibold text-white">$17,308</td><td className="text-right" style={{color:'#f0c842'}}>$5,308</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid rgba(240,200,66,0.08)'}}>
                    <td className="py-2">20 years</td><td className="text-right">$24,000</td><td className="text-right font-semibold text-white">$52,093</td><td className="text-right" style={{color:'#f0c842'}}>$28,093</td>
                  </tr>
                  <tr style={{borderBottom:'1px solid rgba(240,200,66,0.08)'}}>
                    <td className="py-2">30 years</td><td className="text-right">$36,000</td><td className="text-right font-semibold text-white">$113,353</td><td className="text-right" style={{color:'#f0c842'}}>$77,353</td>
                  </tr>
                  <tr>
                    <td className="py-2">40 years</td><td className="text-right">$48,000</td><td className="text-right font-semibold text-white">$262,481</td><td className="text-right" style={{color:'#f0c842'}}>$214,481</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-xs mt-3">After 30 years, 68% of your total comes from compound interest — not from the money you put in.</p>
          </div>

          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">How to Maximize Compound Interest</h2>
            <div className="text-slate-400 text-sm leading-relaxed space-y-3">
              <p><span className="text-white font-semibold">Start as early as possible.</span> Time is the most powerful variable. Even small amounts invested early outperform larger amounts invested later.</p>
              <p><span className="text-white font-semibold">Be consistent with contributions.</span> Set up automatic monthly transfers. Regular investing smooths out market volatility and keeps the compounding engine running.</p>
              <p><span className="text-white font-semibold">Reinvest your returns.</span> Dividends, interest payments, and capital gains should be reinvested, not withdrawn. Every dollar pulled out stops compounding.</p>
              <p><span className="text-white font-semibold">Minimize fees.</span> A 1% annual fee on $100,000 over 30 years at 7% costs you over $100,000 in lost growth. Choose low-cost index funds.</p>
              <p><span className="text-white font-semibold">Pay off high-interest debt first.</span> Credit card interest compounds against you. Eliminate 20%+ APR debt before investing at 7% returns.</p>
            </div>
          </div>

          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="/savings-calculator" className="block p-3 rounded-xl hover:bg-white/5 transition-colors" style={{border:'1px solid rgba(240,200,66,0.1)'}}>
                <span className="text-white font-semibold text-sm">Savings Calculator</span>
                <p className="text-slate-500 text-xs mt-1">Plan your savings goals and monthly targets</p>
              </a>
              <a href="/retirement-calculator" className="block p-3 rounded-xl hover:bg-white/5 transition-colors" style={{border:'1px solid rgba(240,200,66,0.1)'}}>
                <span className="text-white font-semibold text-sm">Retirement Calculator</span>
                <p className="text-slate-500 text-xs mt-1">Find out if you are saving enough to retire</p>
              </a>
              <a href="/mortgage-calculator" className="block p-3 rounded-xl hover:bg-white/5 transition-colors" style={{border:'1px solid rgba(240,200,66,0.1)'}}>
                <span className="text-white font-semibold text-sm">Mortgage Calculator</span>
                <p className="text-slate-500 text-xs mt-1">Calculate monthly payments and total interest</p>
              </a>
              <a href="/loan-calculator" className="block p-3 rounded-xl hover:bg-white/5 transition-colors" style={{border:'1px solid rgba(240,200,66,0.1)'}}>
                <span className="text-white font-semibold text-sm">Loan Calculator</span>
                <p className="text-slate-500 text-xs mt-1">Find your monthly payment for any loan type</p>
              </a>
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
      </main>
      <Footer />
    </>
  )
}