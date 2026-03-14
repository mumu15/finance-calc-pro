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
  const [salesAmount, setSalesAmount] = useState(100000)
  const [commRate, setCommRate] = useState(5)
  const [baseSalary, setBaseSalary] = useState(3000)
  const [commType, setCommType] = useState('flat')
  const [quota, setQuota] = useState(80000)
  const [taxRate, setTaxRate] = useState(28)

  const result = useMemo(() => {
    try {
      let commission
      if (commType === 'flat') {
        commission = salesAmount * (commRate / 100)
      } else if (commType === 'tiered') {
        const base = Math.min(salesAmount, quota) * (commRate / 100)
        const bonus = Math.max(0, salesAmount - quota) * (commRate / 100) * 1.5
        commission = base + bonus
      } else {
        commission = salesAmount * 0.35 * (commRate / 100)
      }
      const grossMonthly = baseSalary + commission
      const annualGross  = grossMonthly * 12
      const afterTax     = grossMonthly * (1 - taxRate / 100)
      const annualNet    = afterTax * 12
      const commPct      = grossMonthly > 0 ? (commission / grossMonthly * 100).toFixed(1) + '%' : '0%'
      return { commission, grossMonthly, annualGross, afterTax, annualNet, commPct }
    } catch(e) { return null }
  }, [salesAmount, commRate, baseSalary, commType, quota, taxRate])

  const pdfRows = result ? [
    { label: "Commission Earned", value: result.commission !== undefined ? String(fmt(result.commission)) : "" },
    { label: "Gross Monthly Income", value: result.grossMonthly !== undefined ? String(fmt(result.grossMonthly)) : "" },
    { label: "Annual Gross Income", value: result.annualGross !== undefined ? String(fmt(result.annualGross)) : "" },
    { label: "Monthly Take-Home", value: result.afterTax !== undefined ? String(fmt(result.afterTax)) : "" },
    { label: "Annual Net Income", value: result.annualNet !== undefined ? String(fmt(result.annualNet)) : "" },
    { label: "Commission as % of Pay", value: result.commPct !== undefined ? String(result.commPct) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💼</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Commission Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate commission earnings, take-home pay and annual income for any commission structure.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Sales Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(salesAmount)}</span>
                </div>
                <input type="range" min={0} max={10000000} step={1000}
                  value={salesAmount} onChange={e => setSalesAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Commission Rate</label>
                  <span className="text-white font-bold text-sm">{`${commRate}%`}</span>
                </div>
                <input type="range" min={0} max={50} step={0.25}
                  value={commRate} onChange={e => setCommRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Base Salary (monthly)</label>
                  <span className="text-white font-bold text-sm">{fmt(baseSalary)}</span>
                </div>
                <input type="range" min={0} max={20000} step={100}
                  value={baseSalary} onChange={e => setBaseSalary(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Commission Structure</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"flat","l":"Flat Rate"},{"v":"tiered","l":"Tiered (1.5x above quota)"},{"v":"gross","l":"Gross Profit Only"}]).map(o => (
                    <button key={o.v} onClick={() => setCommType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: commType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: commType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: commType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Sales Quota</label>
                  <span className="text-white font-bold text-sm">{fmt(quota)}</span>
                </div>
                <input type="range" min={0} max={1000000} step={1000}
                  value={quota} onChange={e => setQuota(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Tax Rate Estimate</label>
                  <span className="text-white font-bold text-sm">{`${taxRate}%`}</span>
                </div>
                <input type="range" min={0} max={45} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Commission Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Commission Earned</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.commission)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Monthly Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.grossMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Gross Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualGross)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Take-Home</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.afterTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Net Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualNet)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Commission as % of Pay</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.commPct}
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

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Salary After Tax</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/freelance-rate-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Freelance Rate</h3>
            </a>

            <a href="/raise-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Raise Calculator</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do tiered commission structures work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Tiered commissions pay higher rates as you hit higher sales levels. Example: 3% on first $50,000 in sales, 5% on $50,000-$100,000, and 8% above $100,000. This incentivizes exceeding quotas. Accelerator structures pay a multiplier (1.5x or 2x the base rate) on sales above quota — common in SaaS and enterprise sales roles.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good commission rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Commission rates vary widely by industry: real estate 2.5-3% (of sale price), SaaS software 8-12% (of annual contract value), insurance 5-20% (first year premium), retail 1-5%, car sales $200-$500 flat per car, financial services 0.5-1% AUM, B2B sales 5-10%. The right rate depends on average deal size, sales cycle length, and how much base salary is included.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is it better to have high base or high commission?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">High base with low commission is better for: long sales cycles, complex enterprise deals, or if you value stability. High commission with low base is better for: transactional sales with short cycles, high-volume roles, or experienced sellers confident in their ability. Most top performers prefer uncapped commission plans where exceptional performance is directly rewarded.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Commission Calculator","item":"https://www.freefincalc.net/commission-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Commission Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
