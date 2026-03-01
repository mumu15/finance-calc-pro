'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is the 50/30/20 budget rule?', a: 'The 50/30/20 rule suggests spending 50% of after-tax income on needs, 30% on wants and 20% on savings and debt repayment. It is a simple framework for managing your money.' },
  { q: 'What counts as a need vs a want?', a: 'Needs are essential expenses like rent, groceries, utilities, transportation and minimum debt payments. Wants are non-essential like dining out, entertainment, subscriptions and shopping.' },
  { q: 'How much should I save each month?', a: 'The 50/30/20 rule recommends saving 20% of your income. If you have high-interest debt focus on paying that off first as part of your 20% allocation.' },
  { q: 'What if I cannot afford to save 20%?', a: 'Start with whatever you can — even 5-10% is better than nothing. Automate your savings so the money moves before you can spend it. Gradually increase your savings rate over time.' },
  { q: 'How do I stick to a budget?', a: 'Track every expense, use the envelope system or budgeting apps, automate savings, review your budget monthly and give yourself a small discretionary allowance to avoid feeling deprived.' },
]

export default function BudgetCalculator() {
  const [income, setIncome] = useState(5000)
  const [incomeType, setIncomeType] = useState('monthly')
  const [needs, setNeeds] = useState(50)
  const [wants, setWants] = useState(30)
  const savings = 100 - needs - wants

  const calc = useMemo(() => {
    const monthly = incomeType === 'annual' ? income / 12 : income
    return {
      monthly,
      needsAmt: monthly * needs / 100,
      wantsAmt: monthly * wants / 100,
      savingsAmt: monthly * savings / 100,
    }
  }, [income, incomeType, needs, wants, savings])

  const fmt = (n) => '$' + Math.round(n).toLocaleString()

  const categories = [
    { label: 'Needs', pct: needs, amt: calc.needsAmt, color: '#60a5fa', desc: 'Rent, groceries, utilities, transport', examples: ['🏠 Rent/Mortgage', '🛒 Groceries', '💡 Utilities', '🚗 Transport', '💊 Healthcare'] },
    { label: 'Wants', pct: wants, amt: calc.wantsAmt, color: '#f0c842', desc: 'Dining out, entertainment, shopping', examples: ['🍕 Dining Out', '🎬 Entertainment', '👗 Shopping', '✈️ Travel', '📱 Subscriptions'] },
    { label: 'Savings', pct: savings, amt: calc.savingsAmt, color: '#34d399', desc: 'Emergency fund, investments, debt', examples: ['🏦 Emergency Fund', '📈 Investments', '💳 Debt Payoff', '🎓 Education', '🏡 House Fund'] },
  ]

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Monthly Budget Calculator</h1>
          <p className="text-slate-400 text-lg">Create your budget using the 50/30/20 rule — customize splits to match your lifestyle</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Your Income</h2>

            <div className="flex gap-2 mb-4">
              {['monthly','annual'].map(t => (
                <button key={t} onClick={() => setIncomeType(t)}
                  className="flex-1 py-2 rounded-xl text-sm font-medium transition-all capitalize"
                  style={{background: incomeType === t ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)', border: incomeType === t ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)', color: incomeType === t ? '#f0c842' : '#64748b'}}>
                  {t}
                </button>
              ))}
            </div>

            <div className="flex justify-between mb-1.5">
              <label className="text-slate-400 text-sm">{incomeType === 'annual' ? 'Annual' : 'Monthly'} Income</label>
              <span className="text-white font-bold text-sm">{fmt(income)}</span>
            </div>
            <input type="range" min={1000} max={incomeType === 'annual' ? 500000 : 50000} step={incomeType === 'annual' ? 1000 : 100} value={income}
              onChange={e => setIncome(Number(e.target.value))}
              className="w-full accent-yellow-400 mb-6" />

            <h3 className="text-white font-bold mb-4">Customize Splits</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-blue-400 text-sm font-medium">Needs</label>
                  <span className="text-white font-bold text-sm">{needs}%</span>
                </div>
                <input type="range" min={20} max={80} step={1} value={needs}
                  onChange={e => { const v = Number(e.target.value); if(v + wants <= 95) setNeeds(v) }}
                  className="w-full accent-blue-400" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-yellow-400 text-sm font-medium">Wants</label>
                  <span className="text-white font-bold text-sm">{wants}%</span>
                </div>
                <input type="range" min={5} max={60} step={1} value={wants}
                  onChange={e => { const v = Number(e.target.value); if(needs + v <= 95) setWants(v) }}
                  className="w-full accent-yellow-400" />
              </div>
              <div className="p-3 rounded-xl" style={{background:'rgba(52,211,153,0.05)',border:'1px solid rgba(52,211,153,0.15)'}}>
                <div className="flex justify-between">
                  <span className="text-emerald-400 text-sm font-medium">Savings (auto)</span>
                  <span className="text-white font-bold text-sm">{savings}%</span>
                </div>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="mt-4">
              <div className="w-full h-4 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-400 transition-all duration-300" style={{width:`${needs}%`}}/>
                <div className="h-full bg-yellow-400 transition-all duration-300" style={{width:`${wants}%`}}/>
                <div className="h-full bg-emerald-400 transition-all duration-300" style={{width:`${savings}%`}}/>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Needs {needs}%</span>
                <span>Wants {wants}%</span>
                <span>Savings {savings}%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box text-center py-4">
              <div className="text-slate-400 text-sm mb-1">Monthly Income</div>
              <div className="text-4xl font-bold" style={{color:'#f0c842'}}>{fmt(calc.monthly)}</div>
            </div>

            {categories.map((cat, i) => (
              <div key={i} className="result-box" style={{borderColor:`${cat.color}30`}}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-bold">{cat.label} ({cat.pct}%)</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{cat.desc}</p>
                  </div>
                  <div className="text-2xl font-bold" style={{color:cat.color}}>{fmt(cat.amt)}<span className="text-slate-500 text-sm font-normal">/mo</span></div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.examples.map((ex, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full text-slate-400" style={{background:'rgba(255,255,255,0.04)'}}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Summary */}
        <div className="mt-6 result-box">
          <h2 className="text-white font-bold text-lg mb-4">Annual Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Annual Income', value: fmt(calc.monthly * 12), color: 'text-white' },
              { label: 'Annual on Needs', value: fmt(calc.needsAmt * 12), color: 'text-blue-400' },
              { label: 'Annual on Wants', value: fmt(calc.wantsAmt * 12), color: 'text-yellow-400' },
              { label: 'Annual Savings', value: fmt(calc.savingsAmt * 12), color: 'text-emerald-400' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Guide */}
        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-to-create-monthly-budget" className="text-yellow-400 font-semibold hover:underline">How to Create a Monthly Budget: Complete Beginner Guide (2026)</a>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/emergency-fund-calculator',icon:'🛡️',name:'Emergency Fund',desc:'Calculate your emergency fund target'},
              {href:'/debt-payoff-calculator',icon:'💰',name:'Debt Payoff',desc:'Plan your debt payoff strategy'},
              {href:'/net-worth-calculator',icon:'💎',name:'Net Worth',desc:'Calculate your total net worth'},
              {href:'/savings-calculator',icon:'🏦',name:'Savings Calculator',desc:'See how your savings grow'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="result-box">
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
