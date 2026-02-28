import os

base = r"."

# ─── BUDGET CALCULATOR ─────────────────────────────────────────────────────────
budget_dir = os.path.join(base, "app", "budget-calculator")
os.makedirs(budget_dir, exist_ok=True)

budget_page = r"""'use client'
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
          <p className="text-slate-400 text-lg">Plan your monthly budget using the 50/30/20 rule</p>
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
      </main>
      <Footer />
    </>
  )
}
"""
with open(os.path.join(budget_dir, "page.js"), "w", encoding="utf-8") as f:
    f.write(budget_page)
print("✅ Budget Calculator created")

# ─── NET WORTH CALCULATOR ──────────────────────────────────────────────────────
networth_dir = os.path.join(base, "app", "net-worth-calculator")
os.makedirs(networth_dir, exist_ok=True)

networth_page = r"""'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is net worth?', a: 'Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It is the most comprehensive measure of your overall financial health.' },
  { q: 'What is a good net worth by age?', a: 'A common guideline is to have a net worth equal to your annual salary by age 30, 3x your salary by 40, 6x by 50, and 8x by 60. However these are just benchmarks and vary significantly based on income and lifestyle.' },
  { q: 'How often should I calculate my net worth?', a: 'Calculate your net worth at least once a year, ideally every quarter. Tracking your net worth over time helps you see if you are making financial progress.' },
  { q: 'What counts as an asset?', a: 'Assets include cash, bank accounts, investments, retirement accounts, real estate, vehicles and valuable personal property. Include anything that has monetary value that you own.' },
  { q: 'Is this net worth calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState({ cash:5000,checking:3000,savings:10000,investments:25000,retirement:30000,home:0,car:15000,other:2000 })
  const [liabilities, setLiabilities] = useState({ mortgage:0,carLoan:8000,studentLoan:15000,creditCard:3000,personalLoan:0,otherDebt:0 })
  const [result, setResult] = useState(null)

  const updateA = (k,v) => setAssets(a => ({...a,[k]:parseFloat(v)||0}))
  const updateL = (k,v) => setLiabilities(l => ({...l,[k]:parseFloat(v)||0}))

  const calculate = () => {
    const totalAssets = Object.values(assets).reduce((s,v)=>s+v,0)
    const totalLiabilities = Object.values(liabilities).reduce((s,v)=>s+v,0)
    const netWorth = totalAssets - totalLiabilities
    setResult({ totalAssets, totalLiabilities, netWorth })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Net Worth Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate your total net worth by entering your assets and liabilities</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div style={{background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.1)',borderRadius:'16px',padding:'24px'}}>
              <h3 className="text-emerald-400 font-bold mb-4">Assets (What You Own)</h3>
              {[
                {key:'cash',label:'Cash'},
                {key:'checking',label:'Checking Account'},
                {key:'savings',label:'Savings Account'},
                {key:'investments',label:'Investments / Stocks'},
                {key:'retirement',label:'Retirement Accounts (401k/IRA)'},
                {key:'home',label:'Home Value'},
                {key:'car',label:'Vehicle Value'},
                {key:'other',label:'Other Assets'},
              ].map(f => (
                <div key={f.key} className="mb-3">
                  <label className="text-slate-400 text-sm block mb-1">{f.label} ($)</label>
                  <input type="number" value={assets[f.key]} onChange={e=>updateA(f.key,e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
                </div>
              ))}
            </div>
            <div style={{background:'rgba(239,68,68,0.03)',border:'1px solid rgba(239,68,68,0.1)',borderRadius:'16px',padding:'24px'}}>
              <h3 className="text-red-400 font-bold mb-4">Liabilities (What You Owe)</h3>
              {[
                {key:'mortgage',label:'Mortgage Balance'},
                {key:'carLoan',label:'Car Loan'},
                {key:'studentLoan',label:'Student Loans'},
                {key:'creditCard',label:'Credit Card Debt'},
                {key:'personalLoan',label:'Personal Loans'},
                {key:'otherDebt',label:'Other Debt'},
              ].map(f => (
                <div key={f.key} className="mb-3">
                  <label className="text-slate-400 text-sm block mb-1">{f.label} ($)</label>
                  <input type="number" value={liabilities[f.key]} onChange={e=>updateL(f.key,e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
                </div>
              ))}
            </div>
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg">Calculate Net Worth</button>
          </div>
          <div>
            {!result ? (
              <div className="result-box text-center py-16"><div className="text-5xl mb-4">💼</div><p className="text-slate-500">Fill in your details and click Calculate</p></div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Your Net Worth</p>
                  <div className={`text-5xl font-bold mb-2 ${result.netWorth>=0?'text-emerald-400':'text-red-400'}`} style={result.netWorth>=0?{color:'#f0c842'}:{}}>{fmt(result.netWorth)}</div>
                  <p className="text-slate-500 text-sm">{result.netWorth>=0?'positive net worth':'negative net worth'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box text-center" style={{borderColor:'rgba(16,185,129,0.2)'}}>
                    <div className="text-2xl font-bold text-emerald-400">{fmt(result.totalAssets)}</div>
                    <div className="text-slate-500 text-xs mt-1">Total Assets</div>
                  </div>
                  <div className="result-box text-center" style={{borderColor:'rgba(239,68,68,0.2)'}}>
                    <div className="text-2xl font-bold text-red-400">{fmt(result.totalLiabilities)}</div>
                    <div className="text-slate-500 text-xs mt-1">Total Liabilities</div>
                  </div>
                </div>
                <div className="result-box">
                  <h4 className="text-white font-medium text-sm mb-3">Asset to Debt Ratio</h4>
                  <div className="progress-bar">
                    <div style={{width:`${Math.min(100,(result.totalAssets/(result.totalAssets+result.totalLiabilities||1))*100)}%`,height:'100%',borderRadius:'9999px',background:'linear-gradient(90deg,#10b981,#34d399)'}} />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-500">
                    <span>Assets {Math.round((result.totalAssets/(result.totalAssets+result.totalLiabilities||1))*100)}%</span>
                    <span>Debts {Math.round((result.totalLiabilities/(result.totalAssets+result.totalLiabilities||1))*100)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6 mt-12">
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Free Net Worth Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free net worth calculator helps you calculate your total net worth by adding up all your assets and subtracting all your liabilities. Knowing your net worth gives you a clear picture of your financial health and helps you track your progress toward financial goals over time.</p>
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
      </main>
      <Footer />
    </>
  )
}
"""
with open(os.path.join(networth_dir, "page.js"), "w", encoding="utf-8") as f:
    f.write(networth_page)
print("✅ Net Worth Calculator created")

# ─── INFLATION CALCULATOR ──────────────────────────────────────────────────────
inflation_dir = os.path.join(base, "app", "inflation-calculator")
os.makedirs(inflation_dir, exist_ok=True)

inflation_page = r"""'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is inflation?', a: 'Inflation is the rate at which the general level of prices for goods and services rises over time, reducing the purchasing power of money. When inflation is 3%, something that cost $100 last year costs $103 this year.' },
  { q: 'What is the average inflation rate?', a: 'The US Federal Reserve targets an average inflation rate of 2% per year. Historical average US inflation has been around 3% per year. In 2022 inflation peaked at over 9% before declining.' },
  { q: 'How does inflation affect savings?', a: 'Inflation erodes the purchasing power of savings. If your savings account earns 1% interest but inflation is 3%, you are effectively losing 2% of purchasing power per year. This is why investing is important for long term wealth.' },
  { q: 'What causes inflation?', a: 'Inflation is caused by increased demand for goods and services, rising production costs, expansion of the money supply, and supply chain disruptions. Central banks use interest rates to control inflation.' },
  { q: 'Is this inflation calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function InflationCalculator() {
  const [form, setForm] = useState({ amount: 1000, startYear: 2010, endYear: 2024, rate: 3 })
  const [result, setResult] = useState(null)

  const update = (k,v) => setForm(f=>({...f,[k]:parseFloat(v)||0}))

  const calculate = () => {
    const years = form.endYear - form.startYear
    if (years <= 0) return
    const futureValue = form.amount * Math.pow(1 + form.rate/100, years)
    const purchasingPowerLoss = futureValue - form.amount
    const purchasingPowerPct = ((purchasingPowerLoss/futureValue)*100).toFixed(1)
    setResult({ futureValue: futureValue.toFixed(2), purchasingPowerLoss: purchasingPowerLoss.toFixed(2), purchasingPowerPct, years })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Inflation Calculator</h1>
          <p className="text-slate-400 text-lg">See how inflation affects the value of money over time</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.1)',borderRadius:'16px',padding:'24px'}}>
            {[
              {label:'Amount ($)',key:'amount'},
              {label:'Start Year',key:'startYear'},
              {label:'End Year',key:'endYear'},
              {label:'Annual Inflation Rate (%)',key:'rate'},
            ].map(f => (
              <div key={f.key}>
                <label className="text-white text-sm font-medium block mb-1">{f.label}</label>
                <input type="number" value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Inflation</button>
          </div>
          <div>
            {!result ? (
              <div className="result-box text-center py-16"><div className="text-5xl mb-4">📉</div><p className="text-slate-500">Fill in your details and click Calculate</p></div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Value Needed in {form.endYear}</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.futureValue)}</div>
                  <p className="text-slate-500 text-sm">to match {fmt(form.amount)} from {form.startYear}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {label:'Original Amount',value:fmt(form.amount)},
                    {label:'Adjusted Amount',value:fmt(result.futureValue)},
                    {label:'Purchasing Power Loss',value:fmt(result.purchasingPowerLoss)},
                    {label:'Years',value:result.years},
                  ].map((s,i) => (
                    <div key={i} className="stat-card">
                      <div className="text-xl font-bold text-white">{s.value}</div>
                      <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="result-box">
                  <p className="text-slate-400 text-sm">Money loses <span className="text-red-400 font-bold">{result.purchasingPowerPct}%</span> of its purchasing power over {result.years} years at {form.rate}% inflation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6 mt-12">
          <div className="result-box">
            <h2 className="text-xl font-bold text-white mb-4">Free Inflation Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free inflation calculator shows you how inflation affects the value of money over time. Enter an amount, a start year, an end year and an inflation rate to see how much that amount would be worth in today's dollars. Understanding inflation is essential for financial planning, salary negotiations and investment decisions.</p>
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
      </main>
      <Footer />
    </>
  )
}
"""
with open(os.path.join(inflation_dir, "page.js"), "w", encoding="utf-8") as f:
    f.write(inflation_page)
print("✅ Inflation Calculator created")

# ─── RENT VS BUY CALCULATOR ────────────────────────────────────────────────────
rentvbuy_dir = os.path.join(base, "app", "rent-vs-buy-calculator")
os.makedirs(rentvbuy_dir, exist_ok=True)

rentvbuy_page = r"""'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'Is it better to rent or buy a home?', a: 'It depends on your financial situation, how long you plan to stay, and the local housing market. Buying generally makes more sense if you plan to stay for 5+ years. Renting offers more flexibility and lower upfront costs.' },
  { q: 'What is the 5% rule for renting vs buying?', a: 'The 5% rule says multiply the home price by 5% and divide by 12. If your monthly rent is less than this number, renting is financially better. If rent is higher, buying may make more sense.' },
  { q: 'What costs do homeowners have that renters do not?', a: 'Homeowners pay property taxes, homeowners insurance, maintenance and repairs (typically 1% of home value per year), HOA fees, and mortgage interest. These costs can add significantly to the true cost of owning.' },
  { q: 'How long should you stay in a home before buying makes sense?', a: 'Most financial experts suggest you should plan to stay at least 5 years before buying a home. This gives you enough time for appreciation and equity building to offset the high upfront transaction costs.' },
  { q: 'Is this rent vs buy calculator free?', a: 'Yes, completely free with no sign up required.' },
]

export default function RentVsBuyCalculator() {
  const [form, setForm] = useState({ homePrice:350000,downPayment:70000,mortgageRate:6.5,propertyTax:1.2,maintenance:1,monthlyRent:1800,rentIncrease:3,homeAppreciation:4,years:7 })
  const [result, setResult] = useState(null)

  const update = (k,v) => setForm(f=>({...f,[k]:parseFloat(v)||0}))

  const calculate = () => {
    const loanAmount = form.homePrice - form.downPayment
    const monthlyRate = form.mortgageRate/100/12
    const n = 30*12
    const monthlyMortgage = loanAmount*(monthlyRate*Math.pow(1+monthlyRate,n))/(Math.pow(1+monthlyRate,n)-1)
    const monthlyTax = (form.homePrice*form.propertyTax/100)/12
    const monthlyMaintenance = (form.homePrice*form.maintenance/100)/12
    const totalMonthlyBuying = monthlyMortgage + monthlyTax + monthlyMaintenance
    const totalBuyingCost = (totalMonthlyBuying*form.years*12) + form.downPayment
    const futureHomeValue = form.homePrice*Math.pow(1+form.homeAppreciation/100,form.years)
    const buyingNetCost = totalBuyingCost - (futureHomeValue - form.homePrice)

    let totalRentCost = 0
    let currentRent = form.monthlyRent
    for(let y=0;y<form.years;y++){
      totalRentCost += currentRent*12
      currentRent *= (1+form.rentIncrease/100)
    }

    const difference = totalRentCost - buyingNetCost
    const betterOption = difference > 0 ? 'buying' : 'renting'

    setResult({ totalMonthlyBuying:totalMonthlyBuying.toFixed(0), buyingNetCost:buyingNetCost.toFixed(0), totalRentCost:totalRentCost.toFixed(0), difference:Math.abs(difference).toFixed(0), betterOption, futureHomeValue:futureHomeValue.toFixed(0) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rent vs Buy Calculator</h1>
          <p className="text-slate-400 text-lg">Find out whether renting or buying a home makes more financial sense</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.1)',borderRadius:'16px',padding:'24px'}}>
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Buying Costs</p>
            {[
              {label:'Home Price ($)',key:'homePrice'},
              {label:'Down Payment ($)',key:'downPayment'},
              {label:'Mortgage Rate (%)',key:'mortgageRate'},
              {label:'Property Tax Rate (%/year)',key:'propertyTax'},
              {label:'Maintenance Cost (%/year)',key:'maintenance'},
            ].map(f => (
              <div key={f.key}>
                <label className="text-white text-sm font-medium block mb-1">{f.label}</label>
                <input type="number" value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <p className="text-purple-400 text-xs font-bold uppercase tracking-wider pt-2">Renting Costs</p>
            {[
              {label:'Monthly Rent ($)',key:'monthlyRent'},
              {label:'Annual Rent Increase (%)',key:'rentIncrease'},
            ].map(f => (
              <div key={f.key}>
                <label className="text-white text-sm font-medium block mb-1">{f.label}</label>
                <input type="number" value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider pt-2">Assumptions</p>
            {[
              {label:'Home Appreciation Rate (%/year)',key:'homeAppreciation'},
              {label:'Time Horizon (years)',key:'years'},
            ].map(f => (
              <div key={f.key}>
                <label className="text-white text-sm font-medium block mb-1">{f.label}</label>
                <input type="number" value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none" style={{background:'#0f172a',border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate</button>
          </div>
          <div>
            {!result ? (
              <div className="result-box text-center py-16"><div className="text-5xl mb-4">🏠</div><p className="text-slate-500">Fill in your details and click Calculate</p></div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center" style={{borderColor:result.betterOption==='buying'?'rgba(16,185,129,0.3)':'rgba(167,139,250,0.3)'}}>
                  <p className="text-slate-400 text-sm mb-2">Better Option Over {form.years} Years</p>
                  <div className="text-4xl font-bold mb-2" style={{color:result.betterOption==='buying'?'#f0c842':'#a78bfa'}}>
                    {result.betterOption === 'buying' ? '🏠 Buying' : '🔑 Renting'}
                  </div>
                  <p className="text-slate-500 text-sm">saves approximately {fmt(result.difference)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {label:'Monthly Cost (Buying)',value:fmt(result.totalMonthlyBuying)},
                    {label:'Monthly Cost (Renting)',value:fmt(form.monthlyRent)},
                    {label:'Total Cost of Buying',value:fmt(result.buyingNetCost)},
                    {label:'Total Cost of Renting',value:fmt(result.totalRentCost)},
                    {label:'Future Home Value',value:fmt(result.futureHomeValue)},
                    {label:'Down Payment',value:fmt(form.downPayment)},
                  ].map((s,i) => (
                    <div key={i} className="stat-card">
                      <div className="text-lg font-bold text-white">{s.value}</div>
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
            <h2 className="text-xl font-bold text-white mb-4">Free Rent vs Buy Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free rent vs buy calculator helps you compare the total financial cost of renting versus buying a home over any time period. It factors in mortgage payments, property taxes, maintenance, home appreciation and rent increases to give you a true comparison. Use this tool to make a more informed decision about one of the most important financial choices you will ever make.</p>
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
      </main>
      <Footer />
    </>
  )
}
"""
with open(os.path.join(rentvbuy_dir, "page.js"), "w", encoding="utf-8") as f:
    f.write(rentvbuy_page)
print("✅ Rent vs Buy Calculator created")

# ─── UPDATE HEADER ─────────────────────────────────────────────────────────────
header = r"""'use client'
import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { name: 'Mortgage', href: '/mortgage-calculator' },
  { name: 'Loan', href: '/loan-calculator' },
  { name: 'Compound Interest', href: '/compound-interest' },
  { name: 'Savings', href: '/savings-calculator' },
  { name: 'Retirement', href: '/retirement-calculator' },
  { name: 'Tax', href: '/tax-calculator' },
  { name: 'Debt Payoff', href: '/debt-payoff-calculator' },
  { name: 'Emergency Fund', href: '/emergency-fund-calculator' },
  { name: 'Budget', href: '/budget-calculator' },
  { name: 'Net Worth', href: '/net-worth-calculator' },
  { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator' },
  { name: 'Inflation', href: '/inflation-calculator' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 z-50" style={{ borderColor: 'rgba(240,200,66,0.1)', background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #f0c842, #e6a817)', color: '#0a0f1e' }}>F</div>
            <span className="font-bold text-white text-lg">FinCalc<span style={{ color: '#f0c842' }}>Pro</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto max-w-3xl">
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href}
                className="text-slate-400 hover:text-white text-xs px-2 py-2 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
                {tool.name}
              </Link>
            ))}
          </nav>
          <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: 'rgba(240,200,66,0.1)' }}>
            {tools.map(tool => (
              <Link key={tool.href} href={tool.href} onClick={() => setOpen(false)}
                className="block text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                {tool.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
"""
with open(os.path.join(base, "components", "Header.js"), "w", encoding="utf-8") as f:
    f.write(header)
print("✅ Header updated")

# ─── UPDATE SITEMAP ────────────────────────────────────────────────────────────
sitemap = r"""export default function sitemap() {
  const baseUrl = 'https://www.freefincalc.net'
  const pages = [
    '',
    '/mortgage-calculator',
    '/loan-calculator',
    '/compound-interest',
    '/savings-calculator',
    '/retirement-calculator',
    '/tax-calculator',
    '/debt-payoff-calculator',
    '/emergency-fund-calculator',
    '/budget-calculator',
    '/net-worth-calculator',
    '/rent-vs-buy-calculator',
    '/inflation-calculator',
    '/about',
    '/contact',
    '/privacy-policy',
  ]
  return pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '' ? 1 : 0.8,
  }))
}
"""
with open(os.path.join(base, "app", "sitemap.js"), "w", encoding="utf-8") as f:
    f.write(sitemap)
print("✅ Sitemap updated")

# ─── UPDATE HOMEPAGE ───────────────────────────────────────────────────────────
homepage = r"""import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const calculators = [
  { title: 'Mortgage Calculator', description: 'Calculate your monthly mortgage payment, total interest and loan breakdown.', href: '/mortgage-calculator', icon: '🏠', color: 'from-yellow-500 to-amber-500' },
  { title: 'Loan Calculator', description: 'Calculate monthly payments and total interest for any personal or auto loan.', href: '/loan-calculator', icon: '💰', color: 'from-orange-500 to-yellow-500' },
  { title: 'Compound Interest Calculator', description: 'See how your investments grow over time with the power of compound interest.', href: '/compound-interest', icon: '📈', color: 'from-green-500 to-emerald-500' },
  { title: 'Savings Goal Calculator', description: 'Find out how long it will take to reach any savings goal.', href: '/savings-calculator', icon: '🎯', color: 'from-blue-500 to-cyan-500' },
  { title: 'Retirement Calculator', description: 'Plan your retirement and estimate how much you will have saved.', href: '/retirement-calculator', icon: '🏖️', color: 'from-purple-500 to-pink-500' },
  { title: 'Tax Calculator', description: 'Estimate your federal income tax and take-home pay for 2024.', href: '/tax-calculator', icon: '🧾', color: 'from-red-500 to-rose-500' },
  { title: 'Debt Payoff Calculator', description: 'Find out how long it will take to pay off your debt.', href: '/debt-payoff-calculator', icon: '💳', color: 'from-indigo-500 to-violet-500' },
  { title: 'Emergency Fund Calculator', description: 'Calculate exactly how much you need in your emergency fund.', href: '/emergency-fund-calculator', icon: '🛡️', color: 'from-teal-500 to-green-500' },
  { title: 'Monthly Budget Calculator', description: 'Plan your monthly budget using the 50/30/20 rule.', href: '/budget-calculator', icon: '💸', color: 'from-yellow-400 to-orange-400' },
  { title: 'Net Worth Calculator', description: 'Calculate your total net worth by entering your assets and liabilities.', href: '/net-worth-calculator', icon: '💼', color: 'from-emerald-500 to-teal-500' },
  { title: 'Rent vs Buy Calculator', description: 'Find out whether renting or buying a home makes more financial sense.', href: '/rent-vs-buy-calculator', icon: '🏡', color: 'from-blue-400 to-indigo-400' },
  { title: 'Inflation Calculator', description: 'See how inflation affects the purchasing power of money over time.', href: '/inflation-calculator', icon: '📉', color: 'from-red-400 to-rose-400' },
]

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(240,200,66,0.1)', color: '#f0c842', border: '1px solid rgba(240,200,66,0.2)' }}>
            ✨ Free Financial Calculators — No Sign Up Required
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Free Online<br />
            <span style={{color:'#f0c842'}}>Financial Calculators</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Professional financial calculators for mortgages, loans, savings, retirement, debt payoff and more — completely free, instant results, no sign up required.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}
              className="group result-box transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {calc.icon}
              </div>
              <h2 className="text-white font-bold text-lg mb-2">{calc.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{calc.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-20 result-box text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Free Financial Calculators</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            FreeFinCalc.net provides free professional financial calculators for everyday money decisions. Whether you are buying a home, paying off debt, planning for retirement or building an emergency fund, our calculators give you instant accurate results with no sign up required.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
"""
with open(os.path.join(base, "app", "page.js"), "w", encoding="utf-8") as f:
    f.write(homepage)
print("✅ Homepage updated")

print("\n🎉 All done! Now run: git add . && git commit -m 'Add budget, net worth, rent vs buy, inflation calculators' && git push origin master:main --force")
