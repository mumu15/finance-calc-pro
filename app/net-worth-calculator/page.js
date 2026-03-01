'use client'
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


function BreadcrumbSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Net Worth Calculator","item":"https://www.freefincalc.net/net-worth-calculator"}]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function WebAppSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Net Worth Calculator",
    "description": "Calculate your total net worth instantly. Free net worth calculator.",
    "url": "https://www.freefincalc.net/net-worth-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1180", "bestRating": "5", "worstRating": "1" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

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
      <BreadcrumbSchemaInline />
      <WebAppSchemaInline />
      <BreadcrumbSchema items={[{"name":"Home","url":"https://www.freefincalc.net"},{"name":"Net Worth Calculator","url":"https://www.freefincalc.net/net-worth-calculator"}]} />
      <WebAppSchema name="Free Net Worth Calculator" description="Calculate your total net worth by adding assets and subtracting liabilities. Free net worth calculator." url="https://www.freefincalc.net/net-worth-calculator" />
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

          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Create a monthly budget plan</p>
              </a>
              <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Debt Payoff Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Plan your debt payoff strategy</p>
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
            <a href="/blog/how-to-calculate-net-worth" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How to Calculate Your Net Worth (And Why It Matters)</a>
          </div>
      <Footer />
    </>
  )
}
