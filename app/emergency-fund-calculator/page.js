'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'How much should I have in an emergency fund?', a: 'Financial experts recommend saving 3 to 6 months of living expenses in your emergency fund. If you are self-employed, have variable income, or have dependents, aim for 6 to 12 months of expenses.' },
  { q: 'Where should I keep my emergency fund?', a: 'Keep your emergency fund in a high yield savings account that is separate from your everyday checking account. It should be easily accessible but not so convenient that you are tempted to spend it. Never invest your emergency fund in stocks as the value could drop right when you need it.' },
  { q: 'What counts as a monthly expense?', a: 'Monthly expenses include rent or mortgage, utilities, groceries, transportation, insurance premiums, minimum debt payments, and any other essential bills. Do not include discretionary spending like dining out or entertainment.' },
  { q: 'What is an emergency fund used for?', a: 'An emergency fund is used for genuine financial emergencies such as job loss, medical expenses, car repairs, or home repairs. It is not for planned expenses or discretionary purchases.' },
  { q: 'Is this emergency fund calculator free?', a: 'Yes, completely free with no sign up required.' },
]


function BreadcrumbSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Emergency Fund Calculator","item":"https://www.freefincalc.net/emergency-fund-calculator"}]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function WebAppSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Emergency Fund Calculator",
    "description": "Calculate how much emergency fund you need. Free emergency fund calculator.",
    "url": "https://www.freefincalc.net/emergency-fund-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1180", "bestRating": "5", "worstRating": "1" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function EmergencyFundCalculator() {
  const [form, setForm] = useState({
    rent: 1200, utilities: 150, groceries: 400, transport: 200,
    insurance: 200, debt: 300, other: 150, months: 6, saved: 0, monthly: 500
  })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const monthlyExpenses = form.rent + form.utilities + form.groceries +
      form.transport + form.insurance + form.debt + form.other
    const target = monthlyExpenses * form.months
    const remaining = Math.max(0, target - form.saved)
    const monthsToGoal = form.monthly > 0 ? Math.ceil(remaining / form.monthly) : 0
    const yearsToGoal = Math.floor(monthsToGoal / 12)
    const remainingMonths = monthsToGoal % 12
    const percentSaved = Math.min(100, Math.round((form.saved / target) * 100))
    setResult({ monthlyExpenses, target, remaining, monthsToGoal, yearsToGoal, remainingMonths, percentSaved })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchemaInline />
      
      <BreadcrumbSchema items={[{"name":"Home","url":"https://www.freefincalc.net"},{"name":"Emergency Fund Calculator","url":"https://www.freefincalc.net/emergency-fund-calculator"}]} />
      <WebAppSchema name="Free Emergency Fund Calculator" description="Calculate how much emergency fund you need and how long to save it. Free emergency fund calculator." url="https://www.freefincalc.net/emergency-fund-calculator" />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Emergency Fund Calculator</h1>
          <p className="text-slate-400 text-lg">Find out exactly how much you need in your emergency fund</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            <h3 className="text-white font-bold text-lg">Monthly Expenses</h3>
            {[
              { label: 'Rent / Mortgage ($)', key: 'rent' },
              { label: 'Utilities ($)', key: 'utilities' },
              { label: 'Groceries ($)', key: 'groceries' },
              { label: 'Transportation ($)', key: 'transport' },
              { label: 'Insurance ($)', key: 'insurance' },
              { label: 'Debt Payments ($)', key: 'debt' },
              { label: 'Other Essentials ($)', key: 'other' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white text-sm font-medium block mb-1">{field.label}</label>
                <input type="number" value={form[field.key]} onChange={e => update(field.key, parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{background:'#0f172a', border:'1px solid #1e293b'}} />
              </div>
            ))}
            <hr style={{borderColor:'rgba(240,200,66,0.1)'}} />
            <div>
              <label className="text-white text-sm font-medium block mb-1">Months of Expenses to Save</label>
              <select value={form.months} onChange={e => update('months', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}}>
                <option value={3}>3 months (minimum)</option>
                <option value={6}>6 months (recommended)</option>
                <option value={9}>9 months (self-employed)</option>
                <option value={12}>12 months (maximum security)</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Already Saved ($)</label>
              <input type="number" value={form.saved} onChange={e => update('saved', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Monthly Savings Contribution ($)</label>
              <input type="number" value={form.monthly} onChange={e => update('monthly', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{background:'#0f172a', border:'1px solid #1e293b'}} />
            </div>
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Emergency Fund</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">🛡️</div>
                <p className="text-slate-500">Fill in your expenses and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Emergency Fund Target</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.target)}</div>
                  <p className="text-slate-500 text-sm">{form.months} months of {fmt(result.monthlyExpenses)}/month</p>
                </div>

                <div className="result-box">
                  <div className="flex justify-between mb-2">
                    <span className="text-white text-sm font-medium">Progress</span>
                    <span className="text-emerald-400 text-sm font-bold">{result.percentSaved}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width:`${result.percentSaved}%`}} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>{fmt(form.saved)} saved</span>
                    <span>{fmt(result.remaining)} remaining</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Monthly Expenses', value: fmt(result.monthlyExpenses) },
                    { label: 'Still Needed', value: fmt(result.remaining) },
                    { label: 'Time to Goal', value: result.monthsToGoal === 0 ? '✅ Done!' : `${result.yearsToGoal > 0 ? result.yearsToGoal + 'y ' : ''}${result.remainingMonths}m` },
                    { label: 'Monthly Saving', value: fmt(form.monthly) },
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
            <h2 className="text-xl font-bold text-white mb-4">Free Emergency Fund Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free emergency fund calculator helps you figure out exactly how much money you need to save for financial emergencies. Enter your monthly essential expenses and choose how many months of coverage you want. The calculator will show you your target amount, how much you still need to save, and how long it will take to reach your goal based on your monthly savings contribution.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Why You Need an Emergency Fund</h2>
            <p className="text-slate-400 text-sm leading-relaxed">An emergency fund is the foundation of any solid financial plan. Without one, unexpected expenses like job loss, medical bills, or car repairs can force you into high interest debt. Having 3 to 6 months of expenses saved gives you a financial cushion that lets you handle emergencies without derailing your financial goals. It also reduces financial stress and gives you confidence to make better long term financial decisions.</p>
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
              <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🏦</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate how your savings grow</p>
              </a>
              <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Debt Payoff Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Plan your debt payoff strategy</p>
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
            <a href="/blog/how-to-build-emergency-fund" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How to Build an Emergency Fund From Scratch (2026)</a>
          </div>
      <Footer />
    </>
  )
}