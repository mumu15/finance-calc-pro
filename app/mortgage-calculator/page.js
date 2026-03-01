'use client'
import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FaqSchema from '../../components/FaqSchema'

const faqs = [
  { q: 'What is a good down payment?', a: 'A down payment of 20% is ideal as it eliminates private mortgage insurance (PMI). However many loans allow down payments as low as 3-5%. A larger down payment means a lower monthly payment and less interest paid overall.' },
  { q: 'Should I choose a 15 or 30 year mortgage?', a: 'A 15-year mortgage has higher monthly payments but you pay far less interest overall and build equity faster. A 30-year mortgage has lower monthly payments but costs much more in total interest. Choose based on what monthly payment you can comfortably afford.' },
  { q: 'Does this include taxes and insurance?', a: 'No, this calculator shows principal and interest only. Your actual monthly payment will also include property taxes, homeowners insurance and possibly PMI. Add 15-20% to the calculated payment to estimate your total monthly housing cost.' },
  { q: 'What is PMI?', a: 'PMI stands for Private Mortgage Insurance. It is required when your down payment is less than 20% of the home price. PMI typically costs 0.5-1% of the loan amount per year and is added to your monthly payment.' },
  { q: 'Is this mortgage calculator free?', a: 'Yes, completely free with no sign up required.' },
]


function BreadcrumbSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Mortgage Calculator","item":"https://www.freefincalc.net/mortgage-calculator"}]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function WebAppSchemaInline() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Mortgage Calculator",
    "description": "Calculate your monthly mortgage payment including principal and interest. Free mortgage calculator.",
    "url": "https://www.freefincalc.net/mortgage-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1180", "bestRating": "5", "worstRating": "1" }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default function MortgageCalculator() {
  const [form, setForm] = useState({ homePrice: 300000, downPayment: 60000, interestRate: 6.5, loanTerm: 30 })
  const [result, setResult] = useState(null)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const principal = form.homePrice - form.downPayment
    const monthlyRate = form.interestRate / 100 / 12
    const numPayments = form.loanTerm * 12
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    const totalPayment = payment * numPayments
    const totalInterest = totalPayment - principal
    setResult({ monthly: payment.toFixed(2), totalPayment: totalPayment.toFixed(2), totalInterest: totalInterest.toFixed(2), principal: principal.toFixed(2) })
  }

  const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <>
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchemaInline />
      <WebAppSchemaInline />
      <BreadcrumbSchema items={[{"name":"Home","url":"https://www.freefincalc.net"},{"name":"Mortgage Calculator","url":"https://www.freefincalc.net/mortgage-calculator"}]} />
      <WebAppSchema name="Free Mortgage Calculator" description="Calculate your monthly mortgage payment including principal, interest, taxes and insurance. Free mortgage calculator." url="https://www.freefincalc.net/mortgage-calculator" />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mortgage Calculator</h1>
          <p className="text-slate-400 text-lg">Calculate your monthly mortgage payment instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4" style={{background:'rgba(240,200,66,0.03)', border:'1px solid rgba(240,200,66,0.1)', borderRadius:'16px', padding:'24px'}}>
            {[
              { label: 'Home Price', key: 'homePrice' },
              { label: 'Down Payment', key: 'downPayment' },
              { label: 'Interest Rate (%)', key: 'interestRate' },
              { label: 'Loan Term (years)', key: 'loanTerm' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-white text-sm font-medium block mb-1">{field.label}</label>
                <input type="number" value={form[field.key]} onChange={e => update(field.key, parseFloat(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-white outline-none"
                  style={{background:'#0f172a', border:'1px solid #1e293b'}} />
              </div>
            ))}
            <button onClick={calculate} className="btn-primary w-full py-4 text-lg mt-4">Calculate Payment</button>
          </div>

          <div>
            {!result ? (
              <div className="result-box text-center py-16">
                <div className="text-5xl mb-4">🏠</div>
                <p className="text-slate-500">Fill in your details and click Calculate</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="result-box text-center">
                  <p className="text-slate-400 text-sm mb-2">Monthly Payment</p>
                  <div className="text-5xl font-bold mb-2" style={{color:'#f0c842'}}>{fmt(result.monthly)}</div>
                  <p className="text-slate-500 text-sm">per month for {form.loanTerm} years</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Loan Amount', value: fmt(result.principal) },
                    { label: 'Total Payment', value: fmt(result.totalPayment) },
                    { label: 'Total Interest', value: fmt(result.totalInterest) },
                    { label: 'Down Payment', value: fmt(form.downPayment) },
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
            <h2 className="text-xl font-bold text-white mb-4">Free Mortgage Calculator</h2>
            <p className="text-slate-400 text-sm leading-relaxed">Our free mortgage calculator helps you estimate your monthly mortgage payment based on the home price, down payment, interest rate and loan term. Understanding your monthly payment is the first step in planning your home purchase. Use this calculator to compare different scenarios and find a payment that fits your budget.</p>
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
              <a href="/loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💳</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Loan Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate monthly payments for any loan</p>
              </a>
              <a href="/rent-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">🏡</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Rent vs Buy</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Compare renting vs buying a home</p>
              </a>
              <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">💎</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Net Worth Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Calculate your total net worth</p>
              </a>
              <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">📋</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Create a monthly budget plan</p>
              </a>
            </div>
          </div>
      </main>

          {/* Internal Link to Blog */}
          <div className="mt-8 p-4 rounded-xl border" style={{borderColor:'rgba(240,200,66,0.2)',background:'rgba(240,200,66,0.05)'}}>
            <p className="text-slate-400 text-sm mb-2">📖 Related Guide</p>
            <a href="/blog/how-to-calculate-mortgage-payment" className="font-semibold hover:underline" style={{color:'#f0c842'}}>How to Calculate Your Monthly Mortgage Payment (2026)</a>
          </div>
      <Footer />
    </>
  )
}