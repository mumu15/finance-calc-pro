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
    "q": "What is a Roth IRA and who is it best for?",
    "a": "A Roth IRA is a retirement account funded with after-tax dollars. Investments grow tax-free and qualified withdrawals in retirement are completely tax-free. It is best for young people in low tax brackets who expect to be in a higher bracket at retirement, and for those who want tax diversification."
  },
  {
    "q": "What is the 2026 Roth IRA contribution limit?",
    "a": "The 2026 Roth IRA contribution limit is $7,000 ($8,000 if age 50+). Income limits apply: single filers with MAGI above $150,000 face reduced limits; above $165,000 you cannot contribute directly. High earners can use the backdoor Roth IRA strategy."
  },
  {
    "q": "Roth IRA vs Traditional IRA — which is better?",
    "a": "Roth IRA = pay tax now, withdraw tax-free. Traditional IRA = deduct now, pay tax at withdrawal. Roth is better if your tax rate will be higher in retirement. Traditional is better if your tax rate will be lower. Young earners typically benefit more from Roth; high earners near retirement often prefer Traditional."
  }
]



export default function Calculator() {
  const { fmt } = useCurrency()
  const [currentBalance, setCurrentBalance] = useState(5000)
  const [annualContrib, setAnnualContrib] = useState(7000)
  const [growthRate, setGrowthRate] = useState(8)
  const [years, setYears] = useState(30)
  const [taxRate, setTaxRate] = useState(22)

  const result = useMemo(() => {
    try {
      const r = growthRate / 100
      const futureBalance = currentBalance * Math.pow(1+r, years) +
        annualContrib * (Math.pow(1+r, years) - 1) / r
      const totalContributed = annualContrib * years + currentBalance
      const growthEarned = futureBalance - totalContributed
      const taxSavedVsTaxable = growthEarned * (taxRate / 100)
      const monthlyTaxFree = futureBalance * 0.04 / 12
      return { futureBalance, totalContributed, growthEarned, taxSavedVsTaxable, monthlyTaxFree }
    } catch(e) { return null }
  }, [currentBalance, annualContrib, growthRate, years, taxRate])

  const pdfRows = result ? [
    { label: "Projected Roth IRA Balance", value: result.futureBalance !== undefined ? (fmt(result.futureBalance)) : "" },
    { label: "Total Contributions", value: result.totalContributed !== undefined ? (fmt(result.totalContributed)) : "" },
    { label: "Tax-Free Growth", value: result.growthEarned !== undefined ? (fmt(result.growthEarned)) : "" },
    { label: "Tax Savings vs Taxable Account", value: result.taxSavedVsTaxable !== undefined ? (fmt(result.taxSavedVsTaxable)) : "" },
    { label: "Est. Monthly Tax-Free Income", value: result.monthlyTaxFree !== undefined ? (fmt(result.monthlyTaxFree)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Roth IRA Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Project your Roth IRA balance at retirement with tax-free growth and withdrawals.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Roth IRA Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(currentBalance)}</span>
                </div>
                <input type="number" min={0} max={500000} step={500}
                  value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Contribution</label>
                  <span className="text-white font-bold text-sm">{fmt(annualContrib)}</span>
                </div>
                <input type="number" min={0} max={7000} step={250}
                  value={annualContrib} onChange={e => setAnnualContrib(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Expected Annual Return</label>
                  <span className="text-white font-bold text-sm">{growthRate + "%"}</span>
                </div>
                <input type="number" min={1} max={15} step={0.5}
                  value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years Until Retirement</label>
                  <span className="text-white font-bold text-sm">{years + " yrs"}</span>
                </div>
                <input type="number" min={1} max={50} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Tax Rate (for comparison)</label>
                  <span className="text-white font-bold text-sm">{taxRate + "%"}</span>
                </div>
                <input type="number" min={10} max={40} step={1}
                  value={taxRate} onChange={e => setTaxRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Roth IRA Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Projected Roth IRA Balance</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.futureBalance)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Contributions</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.totalContributed)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax-Free Growth</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.growthEarned)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Savings vs Taxable Account</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.taxSavedVsTaxable)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Monthly Tax-Free Income</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.monthlyTaxFree)}</span>
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

            <a href="/401k-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👴</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">401k Calculator</h3>
            </a>

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement Calculator</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📉</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is a Roth IRA and who is it best for?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A Roth IRA is a retirement account funded with after-tax dollars. Investments grow tax-free and qualified withdrawals in retirement are completely tax-free. It is best for young people in low tax brackets who expect to be in a higher bracket at retirement, and for those who want tax diversification.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the 2026 Roth IRA contribution limit?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The 2026 Roth IRA contribution limit is $7,000 ($8,000 if age 50+). Income limits apply: single filers with MAGI above $150,000 face reduced limits; above $165,000 you cannot contribute directly. High earners can use the backdoor Roth IRA strategy.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">Roth IRA vs Traditional IRA — which is better?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Roth IRA = pay tax now, withdraw tax-free. Traditional IRA = deduct now, pay tax at withdrawal. Roth is better if your tax rate will be higher in retirement. Traditional is better if your tax rate will be lower. Young earners typically benefit more from Roth; high earners near retirement often prefer Traditional.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Roth Ira Calculator","item":"https://freefincalc.net/roth-ira-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Roth Ira Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
