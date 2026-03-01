'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is net worth?', a: 'Net worth is the total value of everything you own minus everything you owe. Assets minus liabilities equals net worth. A positive net worth means you own more than you owe.' },
  { q: 'What is a good net worth by age?', a: 'A common benchmark is to have a net worth of 1x your salary by 30, 3x by 40, 6x by 50 and 10x by 60. But these are guidelines — focus on consistent improvement over time.' },
  { q: 'How do I increase my net worth?', a: 'Increase income, reduce expenses, pay off high-interest debt, invest consistently and avoid lifestyle inflation. Small consistent improvements compound significantly over time.' },
  { q: 'Should I include my home in net worth?', a: 'Yes include your home as an asset at its current market value. But remember it is an illiquid asset and housing costs money to maintain. Your home equity (value minus mortgage) is what counts.' },
  { q: 'What counts as an asset?', a: 'Assets include cash, savings, investments, retirement accounts, home equity, vehicles, valuable personal property and any money owed to you. Include everything you could convert to cash.' },
]

const DEFAULT_ASSETS = [
  { id: 1, name: 'Checking Account', value: 5000 },
  { id: 2, name: 'Savings Account', value: 15000 },
  { id: 3, name: 'Investment Account', value: 25000 },
  { id: 4, name: 'Retirement (401k/IRA)', value: 45000 },
  { id: 5, name: 'Home Value', value: 300000 },
]

const DEFAULT_LIABILITIES = [
  { id: 1, name: 'Mortgage', value: 220000 },
  { id: 2, name: 'Car Loan', value: 12000 },
  { id: 3, name: 'Credit Cards', value: 3000 },
  { id: 4, name: 'Student Loans', value: 20000 },
]

export default function NetWorth() {
  const [assets, setAssets] = useState(DEFAULT_ASSETS)
  const [liabilities, setLiabilities] = useState(DEFAULT_LIABILITIES)

  const totalAssets = assets.reduce((s, a) => s + a.value, 0)
  const totalLiabilities = liabilities.reduce((s, l) => s + l.value, 0)
  const netWorth = totalAssets - totalLiabilities
  const assetPct = totalAssets > 0 ? Math.round((totalAssets / (totalAssets + totalLiabilities)) * 100) : 0

  const fmt = (n) => '$' + Math.abs(Math.round(n)).toLocaleString()

  const updateValue = (list, setList, id, value) => {
    setList(list.map(item => item.id === id ? { ...item, value: Number(value) || 0 } : item))
  }

  const addItem = (list, setList, name) => {
    setList([...list, { id: Date.now(), name, value: 0 }])
  }

  const removeItem = (list, setList, id) => {
    setList(list.filter(item => item.id !== id))
  }

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Net Worth Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate your total net worth — add your assets and liabilities to see where you stand</p>
        </div>

        {/* Net Worth Display */}
        <div className="result-box text-center py-8 mb-6">
          <div className="text-slate-400 text-sm mb-2">Your Net Worth</div>
          <div className="text-5xl font-bold mb-2" style={{color: netWorth >= 0 ? '#34d399' : '#ef4444'}}>
            {netWorth < 0 ? '-' : ''}{fmt(netWorth)}
          </div>
          <div className="text-slate-500 text-sm mb-4">{netWorth >= 0 ? '✅ Positive net worth' : '⚠️ Negative net worth — focus on paying down debt'}</div>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Assets {assetPct}%</span>
              <span>Liabilities {100-assetPct}%</span>
            </div>
            <div className="w-full h-4 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-400 transition-all duration-500" style={{width:`${assetPct}%`}}/>
              <div className="h-full bg-red-400 transition-all duration-500" style={{width:`${100-assetPct}%`}}/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assets */}
          <div className="result-box">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-emerald-400 font-bold text-lg">Assets</h2>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">{fmt(totalAssets)}</span>
                <button onClick={() => addItem(assets, setAssets, 'New Asset')}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{background:'rgba(52,211,153,0.1)',color:'#34d399',border:'1px solid rgba(52,211,153,0.3)'}}>
                  + Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {assets.map(a => (
                <div key={a.id} className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm flex-1">{a.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-xs">$</span>
                    <input type="number" value={a.value} onChange={e => updateValue(assets, setAssets, a.id, e.target.value)}
                      className="w-28 px-2 py-1 rounded-lg text-white text-sm text-right outline-none"
                      style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(52,211,153,0.2)'}}/>
                  </div>
                  <button onClick={() => removeItem(assets, setAssets, a.id)} className="text-slate-600 hover:text-red-400 text-xs">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities */}
          <div className="result-box">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-red-400 font-bold text-lg">Liabilities</h2>
              <div className="flex items-center gap-3">
                <span className="text-red-400 font-bold">{fmt(totalLiabilities)}</span>
                <button onClick={() => addItem(liabilities, setLiabilities, 'New Debt')}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{background:'rgba(239,68,68,0.1)',color:'#ef4444',border:'1px solid rgba(239,68,68,0.3)'}}>
                  + Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {liabilities.map(l => (
                <div key={l.id} className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm flex-1">{l.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-xs">$</span>
                    <input type="number" value={l.value} onChange={e => updateValue(liabilities, setLiabilities, l.id, e.target.value)}
                      className="w-28 px-2 py-1 rounded-lg text-white text-sm text-right outline-none"
                      style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(239,68,68,0.2)'}}/>
                  </div>
                  <button onClick={() => removeItem(liabilities, setLiabilities, l.id)} className="text-slate-600 hover:text-red-400 text-xs">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl border" style={{background:'rgba(240,200,66,0.03)',borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-to-calculate-net-worth" className="text-yellow-400 font-semibold hover:underline">How to Calculate Your Net Worth: Complete Guide (2026)</a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/budget-calculator',icon:'📋',name:'Budget Calculator',desc:'Create a monthly budget plan'},
              {href:'/debt-payoff-calculator',icon:'💰',name:'Debt Payoff',desc:'Plan your debt payoff strategy'},
              {href:'/retirement-calculator',icon:'👴',name:'Retirement Calculator',desc:'Plan your retirement savings'},
              {href:'/savings-calculator',icon:'🏦',name:'Savings Calculator',desc:'Calculate how your savings grow'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

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
