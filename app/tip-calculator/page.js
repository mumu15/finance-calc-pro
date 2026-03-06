'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

const faqs = [
  {
    "q": "How much should I tip at a restaurant?",
    "a": "Standard US tipping etiquette: restaurant server 15-20%, bar 15-20%, food delivery 15-20%, coffee barista 10-15%, rideshare 10-15%, hotel housekeeping $2-5/night. Fine dining typically warrants 20%+. Tip is always based on the pre-tax amount technically, though most people tip on the total."
  },
  {
    "q": "How do I split a bill with different items?",
    "a": "For exact splitting: each person pays for their items plus their share of tax and tip. For equal splitting: divide the total bill (including tax and tip) by number of diners. Apps like Splitwise, Venmo and Tab make exact splitting easy. For simplicity many groups just split equally."
  },
  {
    "q": "Is it rude not to tip?",
    "a": "In the US, tipping is culturally expected and servers often earn below minimum wage relying on tips to reach a living wage. In many other countries (Japan, Australia, much of Europe) tipping is not expected or even considered rude. When travelling, research local customs."
  }
]

export default function Calculator() {
  const { fmt } = useCurrency()
  const [billAmount, setBillAmount] = useState(85)
  const [tipPct, setTipPct] = useState(18)
  const [people, setPeople] = useState(2)

  const result = useMemo(() => {
    try {
      const tipAmount = billAmount * (tipPct / 100)
      const totalBill = billAmount + tipAmount
      const perPerson = totalBill / people
      const tipPerPerson = tipAmount / people
      return { tipAmount, totalBill, perPerson, tipPerPerson }
    } catch(e) { return null }
  }, [billAmount, tipPct, people])

  const pdfRows = result ? [
    { label: 'Tip Amount', value: result.tipAmount !== undefined ? (fmt(result.tipAmount)) : '' },
    { label: 'Total Bill', value: result.totalBill !== undefined ? (fmt(result.totalBill)) : '' },
    { label: 'Per Person Total', value: result.perPerson !== undefined ? (fmt(result.perPerson)) : '' },
    { label: 'Tip Per Person', value: result.tipPerPerson !== undefined ? (fmt(result.tipPerPerson)) : '' },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🍽️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tip Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate tip amount, total bill and split evenly between any number of people.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Bill Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(billAmount)}</span>
                </div>
                <input type="range" min={1} max={2000} step={1}
                  value={billAmount} onChange={e => setBillAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Tip Percentage</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":10,"l":"10%"},{"v":15,"l":"15%"},{"v":18,"l":"18%"},{"v":20,"l":"20%"},{"v":22,"l":"22%"},{"v":25,"l":"25%"}].map(o => (
                    <button key={o.v} onClick={() => setTipPct(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:tipPct===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:tipPct===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:tipPct===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Split Between</label>
                  <span className="text-white font-bold text-sm">{people + ' people'}</span>
                </div>
                <input type="range" min={1} max={20} step={1}
                  value={people} onChange={e => setPeople(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Tip Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tip Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.tipAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Bill</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.totalBill)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Per Person Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.perPerson)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tip Per Person</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>{fmt(result.tipPerPerson)}</span>
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

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/sales-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Sales Tax Calculator</h3>
            </a>

            <a href="/cost-of-living-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌆</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cost of Living</h3>
            </a>

            <a href="/currency-converter" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💱</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Currency Converter</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much should I tip at a restaurant?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Standard US tipping etiquette: restaurant server 15-20%, bar 15-20%, food delivery 15-20%, coffee barista 10-15%, rideshare 10-15%, hotel housekeeping $2-5/night. Fine dining typically warrants 20%+. Tip is always based on the pre-tax amount technically, though most people tip on the total.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I split a bill with different items?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">For exact splitting: each person pays for their items plus their share of tax and tip. For equal splitting: divide the total bill (including tax and tip) by number of diners. Apps like Splitwise, Venmo and Tab make exact splitting easy. For simplicity many groups just split equally.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is it rude not to tip?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">In the US, tipping is culturally expected and servers often earn below minimum wage relying on tips to reach a living wage. In many other countries (Japan, Australia, much of Europe) tipping is not expected or even considered rude. When travelling, research local customs.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
