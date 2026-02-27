'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function TaxCalculator() {
  const [form, setForm] = useState({ income: 75000, filingStatus: 'single', state: 0 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const income = form.income
    const brackets = form.filingStatus === 'single'
      ? [[11600, 0.10], [47150, 0.12], [100525, 0.22], [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37]]
      : [[23200, 0.10], [94300, 0.12], [201050, 0.22], [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37]]

    const standardDeduction = form.filingStatus === 'single' ? 13850 : 27700
    const taxableIncome = Math.max(0, income - standardDeduction)

    let federalTax = 0
    let prev = 0
    for (const [limit, rate] of brackets) {
      if (taxableIncome <= prev) break
      federalTax += (Math.min(taxableIncome, limit) - prev) * rate
      prev = limit
    }

    const stateTax = income * (form.state / 100)
    const ficaTax = Math.min(income, 160200) * 0.062 + income * 0.0145
    const totalTax = federalTax + stateTax + ficaTax
    const effectiveRate = (totalTax / income * 100).toFixed(1)
    const takeHome = income - totalTax
    const monthlyTakeHome = takeHome / 12

    setResult({
      federalTax: federalTax.toFixed(2),
      stateTax: stateTax.toFixed(2),
      ficaTax: ficaTax.toFixed(2),
      totalTax: totalTax.toFixed(2),
      effectiveRate,
      takeHome: takeHome.toFixed(2),
      monthlyTakeHome: monthlyTakeHome.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2)
    })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Income Tax Calculator</h1>
          <p className="text-slate-400 text-lg">Estimate your federal income tax and take-home pay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Annual Income ($)</label>
              <input type="number" value={form.income} onChange={e => update('income', parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Filing Status</label>
              <select value={form.filingStatus} onChange={e => update('filingStatus', e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}}>
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">State Income Tax Rate (%)</label>
              <input type="number" value={form.state} onChange={e => update('state', parseFloat(e.target.value))}
                placeholder="0 for no state tax"
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Tax</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">🧾</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Annual Take-Home Pay</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.takeHome)}</div>
                  <p className="text-slate-500 text-sm">{fmt(result.monthlyTakeHome)} per month</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Federal Tax', value: fmt(result.federalTax) },
                    { label: 'State Tax', value: fmt(result.stateTax) },
                    { label: 'FICA Tax', value: fmt(result.ficaTax) },
                    { label: 'Effective Rate', value: `${result.effectiveRate}%` },
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
            <h2 className="text-xl font-bold text-white mb-4">Free Income Tax Calculator 2024</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free income tax calculator estimates your federal income tax based on the 2024 US tax brackets, your filing status and the standard deduction. It also includes FICA taxes (Social Security and Medicare) and optional state income tax. Use this tool to estimate your take-home pay and plan your finances. Note that this is an estimate only — for official tax advice consult a qualified tax professional.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">How US Federal Income Tax Works</h2>
            <p className="text-slate-400 text-sm leading-relaxed">The US uses a progressive tax system meaning different portions of your income are taxed at different rates. For 2024 the federal tax brackets for single filers start at 10% for income up to $11,600, then 12% up to $47,150, then 22% up to $100,525 and so on up to 37% for income over $609,350. Most people also qualify for the standard deduction which reduces their taxable income — $13,850 for single filers and $27,700 for married filing jointly in 2024.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">What is the difference between effective and marginal tax rate?</h3>
                <p className="text-slate-400">Your marginal tax rate is the rate on your last dollar of income. Your effective tax rate is your total tax divided by your total income. The effective rate is always lower than the marginal rate because lower portions of income are taxed at lower rates.</p>
              </div>
              <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                <h3 className="text-white font-semibold mb-2">What is FICA tax?</h3>
                <p className="text-slate-400">FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $160,200) and Medicare tax (1.45% on all income). Your employer pays a matching amount.</p>
              </div>
              <div className="pb-4">
                <h3 className="text-white font-semibold mb-2">Is this tax calculator free?</h3>
                <p className="text-slate-400">Yes, completely free with no sign up required. Results are estimates only and not official tax advice.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}