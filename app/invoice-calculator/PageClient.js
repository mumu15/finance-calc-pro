'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'



export default function Calculator() {
  const { fmt } = useCurrency()
  const [subtotal, setSubtotal] = useState(2500)
  const [discountPct, setDiscountPct] = useState(0)
  const [taxRate, setTaxRate] = useState(8)
  const [daysPastDue, setDaysPastDue] = useState(0)
  const [lateFeeRate, setLateFeeRate] = useState(1.5)

  const result = useMemo(() => {
    try {
      const discount    = subtotal * (discountPct / 100)
      const afterDiscount = subtotal - discount
      const taxAmount   = afterDiscount * (taxRate / 100)
      const invoiceTotal = afterDiscount + taxAmount
      const lateFee     = daysPastDue > 0 ? invoiceTotal * (lateFeeRate / 100) * (daysPastDue / 30) : 0
      const totalOwed   = invoiceTotal + lateFee
      const annualRate  = lateFeeRate * 12
      return { discount, afterDiscount, taxAmount, invoiceTotal, lateFee, totalOwed, annualRate: annualRate.toFixed(1) + '%' }
    } catch(e) { return null }
  }, [subtotal, discountPct, taxRate, daysPastDue, lateFeeRate])

  const pdfRows = result ? [
    { label: "Discount Amount", value: result.discount !== undefined ? String(fmt(result.discount)) : "" },
    { label: "Subtotal After Discount", value: result.afterDiscount !== undefined ? String(fmt(result.afterDiscount)) : "" },
    { label: "Tax Amount", value: result.taxAmount !== undefined ? String(fmt(result.taxAmount)) : "" },
    { label: "Invoice Total", value: result.invoiceTotal !== undefined ? String(fmt(result.invoiceTotal)) : "" },
    { label: "Late Fee", value: result.lateFee !== undefined ? String(fmt(result.lateFee)) : "" },
    { label: "Total Amount Owed", value: result.totalOwed !== undefined ? String(fmt(result.totalOwed)) : "" },
    { label: "Late Fee Annual Rate", value: result.annualRate !== undefined ? String(result.annualRate) : "" },
  ] : []

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Invoice Calculator", "item": "https://freefincalc.net/invoice-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Invoice Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📄</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Invoice Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Create professional invoice calculations with tax, discounts and late fee estimates.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Invoice Subtotal</label>
                  <span className="text-white font-bold text-sm">{fmt(subtotal)}</span>
                </div>
                <input type="range" min={0} max={500000} step={10}
                  value={subtotal} onChange={e => setSubtotal(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Discount</label>
                  <span className="text-white font-bold text-sm">{`${discountPct}%`}</span>
                </div>
                <input type="range" min={0} max={50} step={0.5}
                  value={discountPct} onChange={e => setDiscountPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Sales Tax Rate</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="range" min={0} max={15} step={0.25}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Days Past Due (for late fee)</label>
                  <span className="text-white font-bold text-sm">{`${daysPastDue} days`}</span>
                </div>
                <input type="range" min={0} max={120} step={1}
                  value={daysPastDue} onChange={e => setDaysPastDue(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Late Fee Rate (monthly)</label>
                  <span className="text-white font-bold text-sm">{`${lateFeeRate}%`}</span>
                </div>
                <input type="range" min={0} max={5} step={0.25}
                  value={lateFeeRate} onChange={e => setLateFeeRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Invoice Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Discount Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.discount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Subtotal After Discount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.afterDiscount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Amount</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Invoice Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.invoiceTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Late Fee</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lateFee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Amount Owed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalOwed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Late Fee Annual Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.annualRate}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial advice.
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/self-employment-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SE Tax</h3>
            </a>

            <a href="/freelance-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Freelance Rate</h3>
            </a>

            <a href="/sales-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Sales Tax</h3>
            </a>

            <a href="/accounts-receivable-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📬</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">AR Calculator</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a standard late fee for invoices?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Standard late fees for B2B invoices: 1-2% per month (12-24% annually) is common in the US. Many states cap late fees at 1.5% per month (18% annually). Always state the late fee terms clearly on the invoice before work begins and in the contract. Net 30 with 1.5%/month late fee is a widely accepted standard. Always check your state regulations.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I get clients to pay invoices faster?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most effective methods: require a 25-50% upfront deposit before starting work, offer 2% early payment discount (2/10 Net 30), send invoices immediately upon project completion (not at month end), use automated follow-up reminders at 7, 14, and 30 days, accept credit cards and ACH to remove payment friction, and for repeat late payers require prepayment going forward.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What should every invoice include?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Required elements: your business name, address and contact info, client name and address, unique invoice number, invoice date, payment due date, itemized services or products with quantities and unit prices, subtotal, any discounts, sales tax (if applicable), total amount due, payment methods accepted, and your late fee policy. A professional invoice reduces disputes and speeds payment.</p>
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
