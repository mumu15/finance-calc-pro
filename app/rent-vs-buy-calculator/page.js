'use client'
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
