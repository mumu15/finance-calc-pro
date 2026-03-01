'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is the 50/30/20 budgeting rule?', a: 'The 50/30/20 rule suggests spending 50% of take-home pay on needs, 30% on wants, and 20% on savings and debt repayment. It is a simple framework for managing your money.' },
  { q: 'How do I start a monthly budget?', a: 'Start by tracking all your income and expenses for one month. Then categorize your spending into needs, wants and savings. Set limits for each category and review your budget at the end of each month.' },
  { q: 'What should I cut first when budgeting?', a: 'Start with discretionary spending like dining out, subscriptions you rarely use, and impulse purchases. These are the easiest to cut without affecting your quality of life.' },
  { q: 'How much should I spend on housing?', a: 'Financial experts recommend spending no more than 30% of your gross income on housing including rent or mortgage, utilities and insurance. Spending more than 30% is considered housing cost burdened.' },
  { q: 'Is this budget calculator free?', a: 'Yes, completely free with no sign up required.' },
]

const CATEGORIES = [
  { key: 'housing', label: 'Housing (Rent/Mortgage)', type: 'need', color: '#f0c842' },
  { key: 'utilities', label: 'Utilities', type: 'need', color: '#f0c842' },
  { key: 'groceries', label: 'Groceries', type: 'need', color: '#f0c842' },
  { key: 'transport', label: 'Transportation', type: 'need', color: '#f0c842' },
  { key: 'insurance', label: 'Insurance', type: 'need', color: '#f0c842' },
  { key: 'dining', label: 'Dining Out', type: 'want', color: '#a78bfa' },
  { key: 'entertainment', label: 'Entertainment', type: 'want', color: '#a78bfa' },
  { key: 'shopping', label: 'Shopping', type: 'want', color: '#a78bfa' },
  { key: 'subscriptions', label: 'Subscriptions', type: 'want', color: '#a78bfa' },
  { key: 'savings', label: 'Savings', type: 'saving', color: '#10b981' },
  { key: 'investments', label: 'Investments', type: 'saving', color: '#10b981' },
  { key: 'debt', label: 'Debt Payments', type: 'saving', color: '#10b981' },
]


function BreadcrumbSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Budget Calculator","item":"https://www.freefincalc.net/budget-calculator"}]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function WebAppSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Budget Calculator",
    "description": "Create a monthly budget using the 50/30/20 rule. Free budget calculator.",
    "url": "https://www.freefincalc.net/budget-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1180", "bestRating": "5", "worstRating": "1" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function BudgetCalculator() {
  const [income, setIncome] = useState(5000)
  const [expenses, setExpenses] = useState({ housing:1500,utilities:150,groceries:400,transport:300,insurance:200,dining:200,entertainment:100,shopping:150,subscriptions:50,savings:500,investments:200,debt:300 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setExpenses(e => ({ ...e, [k]: parseFloat(v) || 0 }))

  const calculate = () => {
    const needs = CATEGORIES.filter(c => c.type === 'need').reduce((s, c) => s + (expenses[c.key] || 0), 0)
    const wants = CATEGORIES.filter(c => c.type === 'want').reduce((s, c) => s + (expenses[c.key] || 0), 0)
    const savingsTotal = CATEGORIES.filter(c => c.type === 'saving').reduce((s, c) => s + (expenses[c.key] || 0), 0)
    const total = needs + wants + savingsTotal
    const remaining = income - total
    setResult({ needs, wants, savingsTotal, total, remaining,
      needsPct: Math.round((needs/income)*100),
      wantsPct: Math.round((wants/income)*100),
      savingsPct: Math.round((savingsTotal/income)*100),
    })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      
      
      
      
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Monthly Budget Calculator</h1>
          <p className="text-slate-400 text-lg">Create your monthly budget using the 50/30/20 rule — free budget calculator for any income</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.1)',borderRadius:'16px',padding:'24px'}}>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Monthly Take-Home Income ($)</label>
              <input type="number" value={income} onChange={e => setIncome(parseFloat(e.target.value)||0)}
                className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
            </div>
            <p className="text-yellow-400 text-xs font-medium uppercase tracking-wider pt-2">Needs</p>
            {CATEGORIES.filter(c=>c.type==='need').map(c => (
              <div key={c.key}>
                <label className="text-slate-400 text-sm block mb-1">{c.label} ($)</label>
                <input type="number" value={expenses[c.key]} onChange={e => update(c.key, e.target.value)}
                  className="w-full px-4 py-2 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <p className="text-purple-400 text-xs font-medium uppercase tracking-wider pt-2">Wants</p>
            {CATEGORIES.filter(c=>c.type==='want').map(c => (
              <div key={c.key}>
                <label className="text-slate-400 text-sm block mb-1">{c.label} ($)</label>
                <input type="number" value={expenses[c.key]} onChange={e => update(c.key, e.target.value)}
                  className="w-full px-4 py-2 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <p className="text-emerald-400 text-xs font-medium uppercase tracking-wider pt-2">Savings & Debt</p>
            {CATEGORIES.filter(c=>c.type==='saving').map(c => (
              <div key={c.key}>
                <label className="text-slate-400 text-sm block mb-1">{c.label} ($)</label>
                <input type="number" value={expenses[c.key]} onChange={e => update(c.key, e.target.value)}
                  className="w-full px-4 py-2 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Budget</button>
          </div>
          <div>
            {!result ? (
              <div className="result-box text-center py-16"><div className="text-5xl mb-4">💸</div><p className="text-slate-500">Fill in your details and click Calculate</p></div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">{result.remaining >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}</p>
                  <div className={`text-5xl font-bold mb-2 ${result.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{fmt(Math.abs(result.remaining))}</div>
                  <p className="text-slate-500 text-sm">{result.remaining >= 0 ? 'left over each month' : 'over budget each month'}</p>
                </div>
                {[
                  {label:'Needs', value:fmt(result.needs), pct:result.needsPct, target:50, color:'#f0c842'},
                  {label:'Wants', value:fmt(result.wants), pct:result.wantsPct, target:30, color:'#a78bfa'},
                  {label:'Savings', value:fmt(result.savingsTotal), pct:result.savingsPct, target:20, color:'#10b981'},
                ].map((s,i) => (
                  <div key={i} className="result-box">
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{s.label}</span>
                      <div className="text-right">
                        <span style={{color:s.color}} className="font-bold">{s.value}</span>
                        <span className="text-slate-500 text-xs ml-2">{s.pct}% (target: {s.target}%)</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div style={{width:`${Math.min(100,s.pct)}%`,height:'100%',borderRadius:'9999px',background:`linear-gradient(90deg,${s.color},${s.color}88)`}} />
                    </div>
                  </div>
                ))}
                <div className="stat-card">
                  <div className="text-xl font-bold text-white">{fmt(result.total)}</div>
                  <div className="text-slate-500 text-xs mt-1">Total Monthly Expenses</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6 mt-12">
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Free Monthly Budget Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free budget calculator helps you plan your monthly budget using the popular 50/30/20 rule. Enter your monthly income and expenses to instantly see how your spending compares to the recommended budget breakdown. Identify areas where you are overspending and find opportunities to save more money each month.</p>
          </div>
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              {faqs.map((faq,i) => (
                <div key={i} className={i<faqs.length-1?"border-b pb-4":"pb-4"} style={{borderColor:"rgba(240,200,66,0.1)"}}>
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
              <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate your emergency fund target</p>
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
            <a href="/blog/how-to-create-monthly-budget" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How to Create a Monthly Budget That Actually Works</a>
          </div>
      <Footer />
    </>
  )
}
