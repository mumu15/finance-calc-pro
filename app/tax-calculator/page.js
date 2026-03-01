'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is the difference between effective and marginal tax rate?', a: 'Your marginal tax rate is the rate on your last dollar of income. Your effective tax rate is your total tax divided by your total income. The effective rate is always lower than the marginal rate because lower portions of income are taxed at lower rates.' },
  { q: 'What is FICA tax?', a: 'FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% on income up to $160,200) and Medicare tax (1.45% on all income). Your employer pays a matching amount.' },
  { q: 'What is the standard deduction for 2024?', a: 'The standard deduction for 2024 is $13,850 for single filers and $27,700 for married filing jointly. This amount is subtracted from your gross income before calculating your federal income tax.' },
  { q: 'How can I reduce my tax bill?', a: 'Contribute to tax-advantaged accounts like 401k and IRA, take all eligible deductions, consider itemizing if your deductions exceed the standard deduction, use a Health Savings Account (HSA), and consult a tax professional for personalized advice.' },
  { q: 'Is this tax calculator free?', a: 'Yes, completely free with no sign up required. Results are estimates only and not official tax advice.' },
]


function BreadcrumbSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Tax Calculator","item":"https://www.freefincalc.net/tax-calculator"}]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function WebAppSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Tax Calculator",
    "description": "Estimate your federal income tax bill. Free US income tax calculator.",
    "url": "https://www.freefincalc.net/tax-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1180", "bestRating": "5", "worstRating": "1" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

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
    setResult({ federalTax: federalTax.toFixed(2), stateTax: stateTax.toFixed(2), ficaTax: ficaTax.toFixed(2), totalTax: totalTax.toFixed(2), effectiveRate, takeHome: takeHome.toFixed(2), monthlyTakeHome: monthlyTakeHome.toFixed(2) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      
      
      
      
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Income Tax Calculator</h1>
          <p className="text-slate-400 text-lg">Estimate your 2026 federal income tax bill instantly — free tax calculator with current tax brackets</p>
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
            <p className="text-slate-400 text-sm leading-relaxed">Our free income tax calculator estimates your federal income tax based on the 2024 US tax brackets, your filing status and the standard deduction. It also includes FICA taxes and optional state income tax. Use this tool to estimate your take-home pay and plan your finances. Results are estimates only — consult a qualified tax professional for official advice.</p>
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
              <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Create a monthly budget plan</p>
              </a>
              <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Net Worth Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate your total net worth</p>
              </a>
              <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">👴</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Retirement Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Plan your retirement savings</p>
              </a>
              <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🏦</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate how your savings grow</p>
              </a>
            </div>
          </div>
      </main>

          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/how-to-lower-tax-bill" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How to Lower Your Tax Bill Legally in 2026</a>
          </div>
      <Footer />
    </>
  )
}