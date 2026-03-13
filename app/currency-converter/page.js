'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'

const faqs = [
  {
    "q": "How are exchange rates determined?",
    "a": "Exchange rates are determined by supply and demand in the foreign exchange (forex) market — the largest financial market in the world with $7.5 trillion/day in volume. Rates are influenced by interest rate differentials, inflation, economic performance, trade balances and market sentiment."
  },
  {
    "q": "What is the difference between mid-market and retail exchange rates?",
    "a": "The mid-market rate (interbank rate) is the midpoint between buy and sell prices used for large bank-to-bank transactions. Retail rates (what you get at a bank, exchange bureau or PayPal) include a markup of 1-5%. For best rates use services like Wise, Revolut or your bank's international transfer service."
  },
  {
    "q": "When is the best time to exchange currency?",
    "a": "Exchange rates fluctuate constantly. Avoid airports and hotel exchange desks (worst rates). Use ATMs in the local currency for better rates. For large amounts, watch rates over 2-4 weeks and exchange when the rate is favorable. Forward contracts let businesses lock in rates for future transactions."
  }
]


export const metadata = {
  title: 'Currency Converter — Free Online Currency Converter | FreeFinCalc',
  description: 'Free Currency Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/currency-converter' },
  openGraph: {
    title: 'Currency Converter — Free Online Currency Converter | FreeFinCalc',
    description: 'Free Currency Converter — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/currency-converter',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [amount, setAmount] = useState(1000)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')

  const result = useMemo(() => {
    try {
      const RATES = {USD:1,EUR:0.92,GBP:0.79,CAD:1.36,AUD:1.53,INR:83.1,AED:3.67,SGD:1.34,JPY:149.5,CNY:7.24,CHF:0.89,MXN:17.1,BRL:4.97,ZAR:18.6}
      const rateFrom = RATES[fromCurrency] || 1
      const rateTo = RATES[toCurrency] || 1
      const converted = (amount / rateFrom) * rateTo
      const rate1 = rateTo / rateFrom
      const rateInverse = rateFrom / rateTo
      const SYMBOLS = {USD:'$',EUR:'€',GBP:'£',CAD:'CA$',AUD:'A$',INR:'₹',AED:'AED ',SGD:'S$',JPY:'¥',CNY:'¥',CHF:'CHF ',MXN:'MX$',BRL:'R$',ZAR:'R'}
      const sym = SYMBOLS[toCurrency] || ''
      return {
        converted: sym + converted.toFixed(2),
        rate1: '1 ' + fromCurrency + ' = ' + rate1.toFixed(4) + ' ' + toCurrency,
        rateInverse: '1 ' + toCurrency + ' = ' + rateInverse.toFixed(4) + ' ' + fromCurrency,
        amount100: sym + (100 / rateFrom * rateTo).toFixed(2)
      }
    } catch(e) { return null }
  }, [amount, fromCurrency, toCurrency])

  const pdfRows = result ? [
    { label: "Converted Amount", value: result.converted !== undefined ? (String(result.converted)) : "" },
    { label: "Exchange Rate", value: result.rate1 !== undefined ? (String(result.rate1)) : "" },
    { label: "Inverse Rate", value: result.rateInverse !== undefined ? (String(result.rateInverse)) : "" },
    { label: "100 unit equivalent", value: result.amount100 !== undefined ? (String(result.amount100)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💱</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Currency Converter</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Convert between 20+ major currencies with indicative exchange rates instantly.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Amount to Convert</label>
                  <span className="text-white font-bold text-sm">{amount}</span>
                </div>
                <input type="range" min={1} max={100000} step={10}
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">From Currency</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":"USD","l":"USD – US Dollar"},{"v":"EUR","l":"EUR – Euro"},{"v":"GBP","l":"GBP – British Pound"},{"v":"CAD","l":"CAD – Canadian Dollar"},{"v":"AUD","l":"AUD – Australian Dollar"},{"v":"INR","l":"INR – Indian Rupee"},{"v":"AED","l":"AED – UAE Dirham"},{"v":"SGD","l":"SGD – Singapore Dollar"},{"v":"JPY","l":"JPY – Japanese Yen"},{"v":"CNY","l":"CNY – Chinese Yuan"},{"v":"CHF","l":"CHF – Swiss Franc"},{"v":"MXN","l":"MXN – Mexican Peso"},{"v":"BRL","l":"BRL – Brazilian Real"},{"v":"ZAR","l":"ZAR – South African Rand"}].map(o => (
                    <button key={o.v} onClick={() => setFromCurrency(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:fromCurrency===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:fromCurrency===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:fromCurrency===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">To Currency</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":"USD","l":"USD – US Dollar"},{"v":"EUR","l":"EUR – Euro"},{"v":"GBP","l":"GBP – British Pound"},{"v":"CAD","l":"CAD – Canadian Dollar"},{"v":"AUD","l":"AUD – Australian Dollar"},{"v":"INR","l":"INR – Indian Rupee"},{"v":"AED","l":"AED – UAE Dirham"},{"v":"SGD","l":"SGD – Singapore Dollar"},{"v":"JPY","l":"JPY – Japanese Yen"},{"v":"CNY","l":"CNY – Chinese Yuan"},{"v":"CHF","l":"CHF – Swiss Franc"},{"v":"MXN","l":"MXN – Mexican Peso"},{"v":"BRL","l":"BRL – Brazilian Real"},{"v":"ZAR","l":"ZAR – South African Rand"}].map(o => (
                    <button key={o.v} onClick={() => setToCurrency(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:toCurrency===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:toCurrency===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:toCurrency===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
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
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Currency Converter" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Converted Amount</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.converted}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Exchange Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.rate1}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Inverse Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.rateInverse}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">100 unit equivalent</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.amount100}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              ⚠️ Results are estimates for educational purposes only. Not financial advice.
              Consult a qualified professional before making financial decisions.
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/sales-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Sales Tax Calculator</h3>
            </a>

            <a href="/vat-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">VAT Calculator</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/cost-of-living-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌆</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cost of Living</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How are exchange rates determined?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Exchange rates are determined by supply and demand in the foreign exchange (forex) market — the largest financial market in the world with $7.5 trillion/day in volume. Rates are influenced by interest rate differentials, inflation, economic performance, trade balances and market sentiment.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between mid-market and retail exchange rates?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The mid-market rate (interbank rate) is the midpoint between buy and sell prices used for large bank-to-bank transactions. Retail rates (what you get at a bank, exchange bureau or PayPal) include a markup of 1-5%. For best rates use services like Wise, Revolut or your bank's international transfer service.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">When is the best time to exchange currency?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Exchange rates fluctuate constantly. Avoid airports and hotel exchange desks (worst rates). Use ATMs in the local currency for better rates. For large amounts, watch rates over 2-4 weeks and exchange when the rate is favorable. Forward contracts let businesses lock in rates for future transactions.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <Footer />
    </>
  )
}
