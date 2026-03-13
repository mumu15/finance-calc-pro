'use client'
import { useState, useMemo, useEffect } from 'react'
import AdUnit from '../components/AdUnit'
import PdfDownload from '../../components/PdfDownload'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  { q: 'How is a mortgage payment calculated?', a: 'A monthly mortgage payment is calculated using the loan amount, interest rate and loan term. The formula is M = P[r(1+r)^n]/[(1+r)^n-1] where P is principal, r is monthly rate and n is number of payments.' },
  { q: 'What is PMI and when do I need it?', a: 'Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. PMI typically costs 0.5-1% of the loan amount per year and is added to your monthly payment.' },
  { q: 'What is the difference between a 15 and 30 year mortgage?', a: 'A 15-year mortgage has higher monthly payments but you pay far less total interest. A 30-year mortgage has lower monthly payments but costs significantly more in total interest over the life of the loan.' },
  { q: 'What costs are included in a mortgage payment?', a: 'A full mortgage payment includes principal, interest, property taxes, homeowners insurance and PMI if applicable. These are often referred to as PITI — Principal, Interest, Taxes and Insurance.' },
  { q: 'How much house can I afford?', a: 'A common rule is to spend no more than 28% of your gross monthly income on housing costs. Use our mortgage calculator with your local currency to find the right amount for your market.' },
]


export const metadata = {
  title: 'Mortgage Calculator — Free Online Mortgage Calculator | FreeFinCalc',
  description: 'Free Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
  alternates: { canonical: 'https://freefincalc.net/mortgage-calculator' },
  openGraph: {
    title: 'Mortgage Calculator — Free Online Mortgage Calculator | FreeFinCalc',
    description: 'Free Mortgage Calculator — estimate monthly payments, amortization, and total cost. Compare rates and scenarios instantly.',
    url: 'https://freefincalc.net/mortgage-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function MortgageCalculator() {
  const { fmt, currency } = useCurrency()

  const [homePrice, setHomePrice]     = useState(350000)
  const [downPayment, setDownPayment] = useState(70000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm]       = useState(30)
  const [propertyTax, setPropertyTax] = useState(3600)
  const [insurance, setInsurance]     = useState(1200)
  const [hoa, setHoa]                 = useState(0)
  const [showAmort, setShowAmort]     = useState(false)
  const [showFull, setShowFull]       = useState(false)

  // Reset to regional defaults when currency changes
  useEffect(() => {
    const d = currency.defaults
    setHomePrice(d.home)
    setDownPayment(Math.round(d.home * 0.2))
    setPropertyTax(Math.round(d.home * 0.01))
    setInsurance(Math.round(d.home * 0.004))
    setHoa(0)
  }, [currency.code])

  const maxHome = Math.round(currency.defaults.home * 6)
  const maxLoan = Math.round(currency.defaults.loan * 20)

  const calc = useMemo(() => {
    const loanAmount = homePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const n = loanTerm * 12
    const pi = monthlyRate === 0 ? loanAmount / n :
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    const pmi = downPayment / homePrice < 0.2 ? (loanAmount * 0.008) / 12 : 0
    const monthlyTax = propertyTax / 12
    const monthlyIns = insurance / 12
    const monthlyHoa = hoa
    const total = pi + pmi + monthlyTax + monthlyIns + monthlyHoa
    const totalInterest = (pi * n) - loanAmount
    const totalCost = loanAmount + totalInterest
    let balance = loanAmount
    const schedule = []
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = pi - interestPayment
      balance -= principalPayment
      schedule.push({ month: i, payment: pi, principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) })
    }
    return { loanAmount, pi, pmi, monthlyTax, monthlyIns, monthlyHoa, total, totalInterest, totalCost, schedule }
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa])

  const downPct = Math.round((downPayment / homePrice) * 100)
  const displayedSchedule = showFull ? calc.schedule : calc.schedule.slice(0, 24)

  const _downPct = Math.round((downPayment / homePrice) * 100)
  const pdfRows = [
    { label: "Home Price",           value: String(fmt(homePrice))                          },
    { label: "Down Payment",         value: String(fmt(downPayment)) + " (" + _downPct + "%)" },
    { label: "Loan Amount",          value: String(fmt(calc.loanAmount))                    },
    { label: "Interest Rate",        value: String(interestRate) + "%"                      },
    { label: "Loan Term",            value: String(loanTerm) + " years"                     },
    { label: "Monthly Payment",      value: String(fmt(calc.total))                         },
    { label: "Principal & Interest", value: String(fmt(calc.pi)) + "/mo"                   },
    { label: "Property Tax",         value: String(fmt(calc.monthlyTax)) + "/mo"            },
    { label: "Home Insurance",       value: String(fmt(calc.monthlyIns)) + "/mo"            },
    { label: "Total Interest",       value: String(fmt(calc.totalInterest))                 },
    { label: "Total Cost",           value: String(fmt(calc.totalCost))                     },
  ]

  return (
    <>
      <FaqSchema faqs={faqs} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Free Mortgage Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate your monthly mortgage payment in <span style={{color:"#f0c842"}}>{currency.flag} {currency.name}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Loan Details</h2>
            <div className="space-y-4">
              {[
                { label: "Home Price", value: homePrice, set: setHomePrice, min: Math.round(maxHome*0.02), max: maxHome, step: Math.round(maxHome*0.005) },
                { label: "Down Payment", value: downPayment, set: setDownPayment, min: 0, max: homePrice, step: Math.round(maxHome*0.002), note: downPct + "%" },
                { label: "Interest Rate", value: interestRate, set: setInterestRate, min: 1, max: 20, step: 0.1, isRate: true },
                { label: "Property Tax (annual)", value: propertyTax, set: setPropertyTax, min: 0, max: Math.round(maxHome*0.03), step: Math.round(maxHome*0.001) },
                { label: "Home Insurance (annual)", value: insurance, set: setInsurance, min: 0, max: Math.round(maxHome*0.01), step: Math.round(maxHome*0.0005) },
                { label: "HOA Fees (monthly)", value: hoa, set: setHoa, min: 0, max: Math.round(currency.defaults.income * 0.05), step: Math.round(currency.defaults.income * 0.002) },
              ].map((field, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-slate-400 text-sm">{field.label}</label>
                    <span className="text-white font-bold text-sm">
                      {field.isRate ? field.value + '%' : fmt(field.value)}
                      {field.note && <span className="text-emerald-400 ml-2 text-xs">({field.note})</span>}
                    </span>
                  </div>
                  <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                    onChange={e => field.set(Number(e.target.value))}
                    className="w-full accent-yellow-400" />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex gap-2">
                  {[10, 15, 20, 30].map(y => (
                    <button key={y} onClick={() => setLoanTerm(y)}
                      className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: loanTerm === y ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: loanTerm === y ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: loanTerm === y ? '#f0c842' : '#64748b'
                      }}>
                      {y}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Monthly Payment</h2>
                <PdfDownload title="Mortgage Calculator" rows={pdfRows} />
              </div>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold" style={{color:"#f0c842"}}>{fmt(calc.total)}</div>
                <div className="text-slate-400 text-sm mt-1">per month · {currency.flag} {currency.code}</div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Principal & Interest", value: calc.pi, color: "#f0c842" },
                  { label: "Property Tax", value: calc.monthlyTax, color: "#60a5fa" },
                  { label: "Home Insurance", value: calc.monthlyIns, color: "#34d399" },
                  ...(calc.pmi > 0 ? [{ label: "PMI", value: calc.pmi, color: "#f97316" }] : []),
                  ...(calc.monthlyHoa > 0 ? [{ label: "HOA Fees", value: calc.monthlyHoa, color: "#a78bfa" }] : []),
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:item.color}}/>
                    <span className="text-slate-400 text-sm flex-1">{item.label}</span>
                    <span className="text-white font-bold text-sm">{fmt(item.value)}/mo</span>
                  </div>
                ))}
              </div>
              {calc.pmi > 0 && <p className="text-orange-400 text-xs mt-3">⚠️ PMI required — down payment is less than 20%</p>}
            </div>

            <div className="result-box">
              <h2 className="text-white font-bold text-lg mb-4">Loan Summary</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Loan Amount", value: fmt(calc.loanAmount), color: "text-white" },
                  { label: "Total Interest", value: fmt(calc.totalInterest), color: "text-red-400" },
                  { label: "Total Cost", value: fmt(calc.totalCost), color: "text-yellow-400" },
                  { label: "Payoff Date", value: new Date(Date.now() + loanTerm * 365.25 * 24 * 3600 * 1000).getFullYear(), color: "text-emerald-400" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)",border:'1px solid rgba(255,255,255,0.06)'}}>
                    <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Amortization */}
        <div className="mt-6 result-box">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold text-lg">Amortization Schedule</h2>
            <button onClick={() => setShowAmort(!showAmort)}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.3)',color:'#f0c842'}}>
              {showAmort ? 'Hide ↑' : 'Show Schedule ↓'}
            </button>
          </div>
          {showAmort && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{borderColor:"rgba(240,200,66,0.1)"}}>
                    {['Month','Payment','Principal','Interest','Balance'].map(h => (
                      <th key={h} className="text-left text-slate-400 py-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedSchedule.map((row, i) => (
                    <tr key={i} className="border-b" style={{borderColor:"rgba(255,255,255,0.03)"}}>
                      <td className="text-slate-400 py-1.5 pr-4">{row.month}</td>
                      <td className="text-white py-1.5 pr-4">{fmt(row.payment)}</td>
                      <td className="text-emerald-400 py-1.5 pr-4">{fmt(row.principal)}</td>
                      <td className="text-red-400 py-1.5 pr-4">{fmt(row.interest)}</td>
                      <td className="text-slate-300 py-1.5">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {calc.schedule.length > 24 && (
                <button onClick={() => setShowFull(!showFull)} className="mt-4 text-yellow-400 text-sm hover:underline">
                  {showFull ? 'Show Less ↑' : `Show All ${calc.schedule.length} Months ↓`}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 rounded-xl border" style={{background:"rgba(240,200,66,0.03)",borderColor:'rgba(240,200,66,0.15)'}}>
          <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
          <a href="/blog/how-to-calculate-mortgage-payment" className="text-yellow-400 font-semibold hover:underline">How to Calculate Your Mortgage Payment: Complete Guide (2026)</a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {href:'/loan-calculator',icon:'💳',name:'Loan Calculator',desc:'Calculate monthly payments for any loan'},
              {href:'/rent-vs-buy-calculator',icon:'🏡',name:'Rent vs Buy',desc:'Compare renting vs buying a home'},
              {href:'/net-worth-calculator',icon:'💎',name:'Net Worth Calculator',desc:'Calculate your total net worth'},
              {href:'/budget-calculator',icon:'📊',name:'Budget Calculator',desc:'Create a monthly budget plan'},
            ].map((tool,i) => (
              <a key={i} href={tool.href} className="result-box group hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <AdUnit slot="7405024590" />

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
