'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is the debt snowball method?', a: 'The debt snowball method involves paying off debts from smallest to largest balance regardless of interest rate. Each payoff gives you a motivational win and frees up money for the next debt.' },
  { q: 'What is the debt avalanche method?', a: 'The debt avalanche method involves paying off debts from highest to lowest interest rate. This saves the most money in interest over time but may take longer to get your first win.' },
  { q: 'Which is better: snowball or avalanche?', a: 'Mathematically the avalanche saves more money. But the snowball works better for people who need motivation. Research shows the snowball method leads to more people successfully getting out of debt.' },
  { q: 'How much extra should I pay toward debt?', a: 'Even an extra $50-100 per month can dramatically reduce your payoff time. The key is consistency. Any extra money you can throw at debt accelerates payoff significantly.' },
  { q: 'Should I invest or pay off debt first?', a: 'If your debt interest rate is higher than 7% (average stock market return) focus on paying it off first. If lower than 7% consider investing while making minimum payments on debt.' },
]

function calcPayoff(debts, extraPayment, method) {
  if (debts.length === 0) return { months: 0, totalInterest: 0, order: [] }
  
  let remaining = debts.map(d => ({ ...d, balance: d.balance }))
  const sorted = method === 'snowball'
    ? [...remaining].sort((a, b) => a.balance - b.balance)
    : [...remaining].sort((a, b) => b.rate - a.rate)
  
  let months = 0
  let totalInterest = 0
  let extra = extraPayment
  const order = []

  while (sorted.some(d => d.balance > 0) && months < 600) {
    months++
    let available = extra

    sorted.forEach(d => {
      if (d.balance <= 0) return
      const interest = d.balance * (d.rate / 100 / 12)
      totalInterest += interest
      d.balance = d.balance + interest - d.minPayment
      if (d.balance <= 0) {
        available += d.minPayment
        if (!order.includes(d.name)) order.push(d.name)
        d.balance = 0
      }
    })

    // Apply extra to first non-zero debt
    const target = sorted.find(d => d.balance > 0)
    if (target) target.balance = Math.max(0, target.balance - available)
  }

  return { months, totalInterest, order }
}

const DEFAULT_DEBTS = [
  { id: 1, name: 'Credit Card', balance: 5000, rate: 22, minPayment: 100 },
  { id: 2, name: 'Car Loan', balance: 12000, rate: 6, minPayment: 250 },
  { id: 3, name: 'Student Loan', balance: 8000, rate: 5, minPayment: 150 },
]

export default function DebtPayoff() {
  const [debts, setDebts] = useState(DEFAULT_DEBTS)
  const [extraPayment, setExtraPayment] = useState(200)
  const [newDebt, setNewDebt] = useState({ name: '', balance: '', rate: '', minPayment: '' })
  const [showAdd, setShowAdd] = useState(false)

  const snowball = useMemo(() => calcPayoff(debts, extraPayment, 'snowball'), [debts, extraPayment])
  const avalanche = useMemo(() => calcPayoff(debts, extraPayment, 'avalanche'), [debts, extraPayment])

  const totalDebt = debts.reduce((s, d) => s + d.balance, 0)
  const minPayments = debts.reduce((s, d) => s + d.minPayment, 0)

  const addDebt = () => {
    if (!newDebt.name || !newDebt.balance) return
    setDebts([...debts, { id: Date.now(), ...newDebt, balance: Number(newDebt.balance), rate: Number(newDebt.rate), minPayment: Number(newDebt.minPayment) }])
    setNewDebt({ name: '', balance: '', rate: '', minPayment: '' })
    setShowAdd(false)
  }

  const removeDebt = (id) => setDebts(debts.filter(d => d.id !== id))

  const fmt = (n) => '$' + Math.round(n).toLocaleString()
  const fmtMonths = (m) => {
    const y = Math.floor(m / 12)
    const mo = m % 12
    return y > 0 ? `${y}y ${mo}m` : `${mo}m`
  }

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Payoff Calculator</h1>
          <p className="text-slate-400 text-lg">Compare snowball vs avalanche — find the fastest way to become debt free</p>
        </div>

        {/* Debt List */}
        <div className="result-box mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">Your Debts</h2>
            <button onClick={() => setShowAdd(!showAdd)}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.3)',color:'#f0c842'}}>
              + Add Debt
            </button>
          </div>

          {showAdd && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-4 rounded-xl" style={{background:'rgba(255,255,255,0.03)'}}>
              {[
                { placeholder: 'Name (e.g. Visa)', key: 'name' },
                { placeholder: 'Balance ($)', key: 'balance' },
                { placeholder: 'Interest Rate (%)', key: 'rate' },
                { placeholder: 'Min Payment ($)', key: 'minPayment' },
              ].map(f => (
                <input key={f.key} value={newDebt[f.key]} onChange={e => setNewDebt({...newDebt, [f.key]: e.target.value})}
                  placeholder={f.placeholder}
                  className="px-3 py-2 rounded-lg text-white text-sm outline-none"
                  style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(240,200,66,0.2)'}} />
              ))}
              <button onClick={addDebt} className="md:col-span-4 py-2 rounded-xl text-sm font-bold"
                style={{background:'rgba(240,200,66,0.2)',color:'#f0c842',border:'1px solid rgba(240,200,66,0.4)'}}>
                Add Debt
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{borderColor:'rgba(240,200,66,0.1)'}}>
                  {['Debt','Balance','Rate','Min Payment',''].map(h => (
                    <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {debts.map(d => (
                  <tr key={d.id} className="border-b" style={{borderColor:'rgba(255,255,255,0.03)'}}>
                    <td className="text-white py-2 pr-4 font-medium">{d.name}</td>
                    <td className="text-yellow-400 py-2 pr-4">{fmt(d.balance)}</td>
                    <td className="text-red-400 py-2 pr-4">{d.rate}%</td>
                    <td className="text-slate-400 py-2 pr-4">{fmt(d.minPayment)}/mo</td>
                    <td><button onClick={() => removeDebt(d.id)} className="text-slate-600 hover:text-red-400 text-xs">✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <label className="text-slate-400 text-sm">Extra Monthly Payment</label>
              <span className="text-white font-bold text-sm">{fmt(extraPayment)}/mo</span>
            </div>
            <input type="range" min={0} max={2000} step={25} value={extraPayment}
              onChange={e => setExtraPayment(Number(e.target.value))}
              className="w-full accent-yellow-400" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Total debt: {fmt(totalDebt)}</span>
              <span>Min payments: {fmt(minPayments)}/mo</span>
            </div>
          </div>
        </div>

        {/* Snowball vs Avalanche Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { method: 'Snowball ⛄', result: snowball, color: '#60a5fa', desc: 'Smallest balance first — motivational wins' },
            { method: 'Avalanche 🏔️', result: avalanche, color: '#f0c842', desc: 'Highest rate first — saves most interest' },
          ].map((m, i) => (
            <div key={i} className="result-box">
              <h3 className="text-white font-bold text-lg mb-1">{m.method}</h3>
              <p className="text-slate-500 text-xs mb-4">{m.desc}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Payoff Time', value: fmtMonths(m.result.months), color: 'text-white' },
                  { label: 'Total Interest', value: fmt(m.result.totalInterest), color: 'text-red-400' },
                ].map((stat, j) => (
                  <div key={j} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:`1px solid rgba(255,255,255,0.06)`}}>
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-slate-500 text-xs mb-1">Payoff order:</p>
                <div className="flex flex-wrap gap-1">
                  {m.result.order.map((name, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full" style={{background:'rgba(255,255,255,0.05)',color:'#94a3b8'}}>
                      {j+1}. {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Savings Comparison */}
        {Math.abs(snowball.totalInterest - avalanche.totalInterest) > 10 && (
          <div className="result-box mb-6 text-center py-4" style={{borderColor:'rgba(240,200,66,0.2)'}}>
            <p className="text-slate-400 text-sm">
              💡 The <span className="text-yellow-400 font-bold">Avalanche method</span> saves you{' '}
              <span className="text-emerald-400 font-bold">{fmt(Math.abs(snowball.totalInterest - avalanche.totalInterest))}</span> in interest
              {snowball.months !== avalanche.months && ` and ${Math.abs(snowball.months - avalanche.months)} months`} compared to the Snowball method.
            </p>
          </div>
        )}

        {/* Related Guide */}
        <div className="mt-4 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/debt-snowball-vs-avalanche" className="text-yellow-400 font-semibold hover:underline">Debt Snowball vs Avalanche: Which Method Wins in 2026?</a>
        </div>

        {/* Related */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/loan-calculator',icon:'💳',name:'Loan Calculator',desc:'Calculate monthly loan payments'},
              {href:'/budget-calculator',icon:'📋',name:'Budget Calculator',desc:'Create a monthly budget plan'},
              {href:'/emergency-fund-calculator',icon:'🛡️',name:'Emergency Fund',desc:'Calculate your emergency fund'},
              {href:'/net-worth-calculator',icon:'💎',name:'Net Worth',desc:'Calculate your total net worth'},
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
