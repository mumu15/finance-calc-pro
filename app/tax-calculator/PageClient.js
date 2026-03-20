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
  const [income, setIncome] = useState(85000)
  const [filingStatus, setFilingStatus] = useState('single')
  const [deductType, setDeductType] = useState('standard')
  const [itemized, setItemized] = useState(0)
  const [credits, setCredits] = useState(0)

  const result = useMemo(() => {
    try {
      const stdDeduct = filingStatus === 'married' ? 29200 : filingStatus === 'hoh' ? 21900 : 14600
      const deduction = deductType === 'standard' ? stdDeduct : Math.max(stdDeduct, itemized)
      const taxable   = Math.max(0, income - deduction)
      const brackets  = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : filingStatus === 'hoh'
        ? [[0,0.10,16550],[16550,0.12,63100],[63100,0.22,100500],[100500,0.24,191950],[191950,0.32,243700],[243700,0.35,609350],[609350,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let tax = 0
      for (const [lo, rate, hi] of brackets) {
        if (taxable <= lo) break
        tax += (Math.min(taxable, hi) - lo) * rate
      }
      tax = Math.max(0, tax - credits)
      const fica = Math.min(income, 168600) * 0.062 + income * 0.0145
      const totalTax = tax + fica
      const effectiveRate = income > 0 ? (tax / income * 100).toFixed(2) + '%' : '0%'
      const marginalRate  = taxable > 609350 ? '37%' : taxable > 243725 ? '35%' : taxable > 191950 ? '32%' : taxable > 100525 ? '24%' : taxable > 47150 ? '22%' : taxable > 11600 ? '12%' : '10%'
      return { taxable, deduction, tax, fica, totalTax, effectiveRate, marginalRate }
    } catch(e) { return null }
  }, [income, filingStatus, deductType, itemized, credits])

  const pdfRows = result ? [
    { label: "Standard / Itemized Deduction", value: result.deduction !== undefined ? String(fmt(result.deduction)) : "" },
    { label: "Taxable Income", value: result.taxable !== undefined ? String(fmt(result.taxable)) : "" },
    { label: "Federal Income Tax", value: result.tax !== undefined ? String(fmt(result.tax)) : "" },
    { label: "FICA Tax (SS + Medicare)", value: result.fica !== undefined ? String(fmt(result.fica)) : "" },
    { label: "Total Federal Tax", value: result.totalTax !== undefined ? String(fmt(result.totalTax)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? String(result.effectiveRate) : "" },
    { label: "Marginal Tax Rate", value: result.marginalRate !== undefined ? String(result.marginalRate) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧮</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Income Tax Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your federal income tax for 2026 based on filing status and deductions.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Income</label>
                  <span className="text-white font-bold text-sm">{fmt(income)}</span>
                </div>
                <input type="range" min={0} max={1000000} step={1000}
                  value={income} onChange={e => setIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"single","l":"Single"},{"v":"married","l":"Married Joint"},{"v":"hoh","l":"Head of Household"}]).map(o => (
                    <button key={o.v} onClick={() => setFilingStatus(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: filingStatus === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: filingStatus === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: filingStatus === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Deduction Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"standard","l":"Standard Deduction"},{"v":"itemized","l":"Itemized Deductions"}]).map(o => (
                    <button key={o.v} onClick={() => setDeductType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: deductType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: deductType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: deductType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Itemized Deductions Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(itemized)}</span>
                </div>
                <input type="range" min={0} max={200000} step={500}
                  value={itemized} onChange={e => setItemized(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Tax Credits</label>
                  <span className="text-white font-bold text-sm">{fmt(credits)}</span>
                </div>
                <input type="range" min={0} max={20000} step={100}
                  value={credits} onChange={e => setCredits(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Income Tax Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Standard / Itemized Deduction</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.deduction)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Taxable Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxable)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Federal Income Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.tax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">FICA Tax (SS + Medicare)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fica)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Federal Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Marginal Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.marginalRate}
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

            <a href="/tax-refund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💸</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Refund</h3>
            </a>

            <a href="/capital-gains-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Capital Gains Tax</h3>
            </a>

            <a href="/self-employment-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SE Tax</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the standard deduction for 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 2026 standard deduction is $14,600 for single filers, $29,200 for married filing jointly, and $21,900 for head of household. These amounts are indexed for inflation annually. You should itemize only if your itemized deductions (mortgage interest, state taxes up to $10,000, charitable gifts, medical expenses) exceed the standard deduction.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the difference between effective and marginal tax rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The marginal tax rate is the rate on your last dollar of income. The effective rate is your total tax divided by total income. Someone earning $85,000 single has a 22% marginal rate but roughly 15% effective rate because lower income portions are taxed at 10% and 12%. The marginal rate matters most for decisions about earning additional income.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How can I reduce my federal income tax?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Key strategies: maximize pre-tax retirement contributions (401k up to $23,000, IRA up to $7,000 in 2024), contribute to an HSA ($4,150 single, $8,300 family), harvest tax losses in investment accounts, defer income to lower-earning years, bunch charitable donations to exceed standard deduction in alternating years, and use qualified opportunity zone investments.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Tax Calculator","item":"https://www.freefincalc.net/tax-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/how-to-lower-tax-bill" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How to Lower Your Tax Bill</a>
          <a href="/blog/how-to-read-pay-stub" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How to Read Your Pay Stub</a>
        </div>
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Explore More Tools</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            <a href="/salary-after-tax-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Salary After Tax</a>
            <a href="/paycheck-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Paycheck Calculator</a>
            <a href="/capital-gains-tax-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Capital Gains Tax</a>
            <a href="/retirement-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Retirement</a>
            <a href="/budget-planner-calculator" style={{display:'inline-block',padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:13,fontWeight:600}}>Budget Planner</a>
          </div>
        </div>
      <Footer />
    </>
  )
}
