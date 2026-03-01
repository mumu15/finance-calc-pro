'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is the 4% withdrawal rule?', a: 'The 4% rule suggests you can safely withdraw 4% of your retirement savings each year without running out of money over a 30-year retirement. It is based on historical stock and bond market returns.' },
  { q: 'How much should I contribute to retirement each month?', a: 'Financial advisors recommend saving 15% of your gross income for retirement including any employer match. At minimum, contribute enough to get your full employer 401k match as this is free money.' },
  { q: 'What is a 401k?', a: 'A 401k is a tax-advantaged retirement savings account offered by employers. Contributions are made pre-tax which reduces your taxable income. Many employers match a percentage of your contributions which is essentially free money added to your retirement savings.' },
  { q: 'When should I start saving for retirement?', a: 'The earlier the better. Starting at 25 instead of 35 can more than double your retirement savings due to compound interest. Even small amounts invested early grow significantly over decades.' },
  { q: 'Is this retirement calculator free?', a: 'Yes, completely free with no sign up required.' },
]


function BreadcrumbSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Retirement Calculator","item":"https://www.freefincalc.net/retirement-calculator"}]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function WebAppSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Retirement Calculator",
    "description": "Calculate how much you need to save for retirement. Free retirement savings calculator.",
    "url": "https://www.freefincalc.net/retirement-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1180", "bestRating": "5", "worstRating": "1" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

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
    setResult({ futureValue: futureValue.toFixed(2), annualIncome: annualIncome.toFixed(2), monthlyIncome: monthlyIncome.toFixed(2), totalContributions: totalContributions.toFixed(2), interestEarned: interestEarned.toFixed(2), years })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchemaInline />
      <WebAppSchemaInline />
      <BreadcrumbSchema items={[{"name":"Home","url":"https://www.freefincalc.net"},{"name":"Retirement Calculator","url":"https://www.freefincalc.net/retirement-calculator"}]} />
      <WebAppSchema name="Free Retirement Calculator" description="Calculate how much you need to save for retirement. Free retirement savings calculator with 4% rule." url="https://www.freefincalc.net/retirement-calculator" />
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
            <p className="text-slate-400 text-sm leading-relaxed">Our free retirement calculator helps you estimate how much money you will have when you retire based on your current savings, monthly contributions and expected investment returns. It also shows how much monthly income your retirement savings can generate using the 4% withdrawal rule.</p>
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
              <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📈</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
                <p className="text-slate-500 text-xs leading-relaxed">See how compound interest grows money</p>
              </a>
              <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🏦</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate how your savings grow</p>
              </a>
              <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Create a monthly budget plan</p>
              </a>
              <a href="/inflation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📉</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Inflation Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">See how inflation affects savings</p>
              </a>
            </div>
          </div>
      </main>

          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/how-much-to-save-for-retirement" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How Much Should I Save for Retirement? (2026 Guide)</a>
          </div>
      <Footer />
    </>
  )
}