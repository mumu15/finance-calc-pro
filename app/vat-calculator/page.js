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
    "q": "What is VAT and who pays it?",
    "a": "VAT (Value Added Tax) is a consumption tax applied at each stage of production. Businesses collect VAT on sales and reclaim VAT on purchases. Consumers ultimately pay VAT as it is included in the final price. Most countries use VAT or a similar goods and services tax (GST)."
  },
  {
    "q": "What are common VAT rates in Europe?",
    "a": "Standard EU VAT rates: UK 20%, Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%, Ireland 23%, Sweden 25%. Reduced rates apply to food, books and children's items. Zero rates apply to exports. The EU requires a minimum standard VAT rate of 15%."
  },
  {
    "q": "Can I reclaim VAT as a business?",
    "a": "VAT-registered businesses can reclaim VAT paid on business purchases (input tax) against VAT collected on sales (output tax). If input tax exceeds output tax, HMRC/tax authority refunds the difference. Small businesses below the registration threshold (£90,000 in UK) may not need to register."
  }
]


export const metadata = {
  title: 'VAT Calculator — Free Online VAT Calculator | FreeFinCalc',
  description: 'Free VAT Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
  alternates: { canonical: 'https://freefincalc.net/vat-calculator' },
  openGraph: {
    title: 'VAT Calculator — Free Online VAT Calculator | FreeFinCalc',
    description: 'Free VAT Calculator — get instant results with our easy-to-use calculator. 100% free, no sign-up required. Trusted by thousands.',
    url: 'https://freefincalc.net/vat-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [amount, setAmount] = useState(100)
  const [vatRate, setVatRate] = useState(20)
  const [calcType, setCalcType] = useState('add')

  const result = useMemo(() => {
    try {
      let exVat, vatAmount, incVat
      if (calcType === 'add') {
        exVat = amount
        vatAmount = amount * (vatRate / 100)
        incVat = amount + vatAmount
      } else {
        incVat = amount
        exVat = amount / (1 + vatRate / 100)
        vatAmount = incVat - exVat
      }
      return { exVat, vatAmount, incVat }
    } catch(e) { return null }
  }, [amount, vatRate, calcType])

  const pdfRows = result ? [
    { label: "Price Excluding VAT", value: result.exVat !== undefined ? (fmt(result.exVat)) : "" },
    { label: "VAT Amount", value: result.vatAmount !== undefined ? (fmt(result.vatAmount)) : "" },
    { label: "Price Including VAT", value: result.incVat !== undefined ? (fmt(result.incVat)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🌍</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">VAT Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Add or remove VAT from any price. Works for UK, EU, UAE, India (GST) and all VAT rates.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(amount)}</span>
                </div>
                <input type="range" min={0.01} max={100000} step={1}
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">VAT / GST Rate</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":5,"l":"5%"},{"v":7.5,"l":"7.5%"},{"v":10,"l":"10%"},{"v":12,"l":"12%"},{"v":15,"l":"15%"},{"v":18,"l":"18% (India GST)"},{"v":20,"l":"20% (UK)"},{"v":21,"l":"21%"},{"v":23,"l":"23%"},{"v":25,"l":"25%"}].map(o => (
                    <button key={o.v} onClick={() => setVatRate(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:vatRate===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:vatRate===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:vatRate===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Calculate</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":"add","l":"Add VAT to price"},{"v":"remove","l":"Remove VAT from total"}].map(o => (
                    <button key={o.v} onClick={() => setCalcType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:calcType===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:calcType===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:calcType===o.v?'#f0c842':'#64748b'}}>
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
                {result && <PdfDownload title="VAT Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Price Excluding VAT</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.exVat)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">VAT Amount</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.vatAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Price Including VAT</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.incVat)}</span>
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

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>

            <a href="/currency-converter" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💱</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Currency Converter</h3>
            </a>

            <a href="/invoice-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Invoice Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is VAT and who pays it?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">VAT (Value Added Tax) is a consumption tax applied at each stage of production. Businesses collect VAT on sales and reclaim VAT on purchases. Consumers ultimately pay VAT as it is included in the final price. Most countries use VAT or a similar goods and services tax (GST).</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What are common VAT rates in Europe?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Standard EU VAT rates: UK 20%, Germany 19%, France 20%, Italy 22%, Spain 21%, Netherlands 21%, Ireland 23%, Sweden 25%. Reduced rates apply to food, books and children's items. Zero rates apply to exports. The EU requires a minimum standard VAT rate of 15%.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Can I reclaim VAT as a business?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">VAT-registered businesses can reclaim VAT paid on business purchases (input tax) against VAT collected on sales (output tax). If input tax exceeds output tax, HMRC/tax authority refunds the difference. Small businesses below the registration threshold (£90,000 in UK) may not need to register.</p>
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
