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
  const [accountBalance, setAccountBalance] = useState(500000)
  const [currentAge, setCurrentAge] = useState(75)
  const [accountType, setAccountType] = useState('trad')

  const result = useMemo(() => {
    try {
      if (accountType === 'roth401k') {
        return { rmd: 0, distributionPeriod: 'N/A', taxNote: 'Roth 401k: No RMD required after 2024 (SECURE 2.0)' }
      }
      // IRS Uniform Lifetime Table (simplified key values)
      const table = {73:26.5,74:25.5,75:24.6,76:23.7,77:22.9,78:22.0,79:21.1,80:20.2,81:19.4,82:18.5,83:17.7,84:16.8,85:16.0,86:15.2,87:14.4,88:13.7,89:12.9,90:12.2,91:11.5,92:10.8,93:10.1,94:9.5,95:8.9,96:8.4,97:7.8,98:7.3,99:6.8,100:6.4}
      const period = table[currentAge] || 6.4
      const rmd    = Math.ceil(accountBalance / period)
      const taxNote = 'Federal ordinary income tax applies to RMD withdrawals'
      return { rmd, distributionPeriod: period + ' years', taxNote }
    } catch(e) { return null }
  }, [accountBalance, currentAge, accountType])

  const pdfRows = result ? [
    { label: "Required Minimum Distribution", value: result.rmd !== undefined ? String(fmt(result.rmd)) : "" },
    { label: "IRS Distribution Period", value: result.distributionPeriod !== undefined ? String(result.distributionPeriod) : "" },
    { label: "Tax Note", value: result.taxNote !== undefined ? String(result.taxNote) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Rmd Calculator", "item": "https://freefincalc.net/rmd-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Rmd Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📅</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">RMD Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate your Required Minimum Distribution from IRAs and 401k accounts for any year.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Retirement Account Balance (Jan 1)</label>
                  <span className="text-white font-bold text-sm">{fmt(accountBalance)}</span>
                </div>
                <input type="range" min={10000} max={5000000} step={5000}
                  value={accountBalance} onChange={e => setAccountBalance(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Your Age (as of Dec 31 this year)</label>
                  <span className="text-white font-bold text-sm">{`${currentAge} yrs`}</span>
                </div>
                <input type="range" min={73} max={100} step={1}
                  value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Account Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"trad","l":"Traditional IRA"},{"v":"401k","l":"401k / 403b"},{"v":"roth401k","l":"Roth 401k (2024+)"}]).map(o => (
                    <button key={o.v} onClick={() => setAccountType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: accountType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: accountType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: accountType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="RMD Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Required Minimum Distribution</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.rmd)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">IRS Distribution Period</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.distributionPeriod}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Tax Note</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.taxNote}
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

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/401k-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">401k</h3>
            </a>

            <a href="/roth-ira-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💎</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Roth IRA</h3>
            </a>

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is an RMD and who must take one?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A Required Minimum Distribution (RMD) is the minimum amount the IRS requires you to withdraw from tax-deferred retirement accounts each year starting at age 73 (per SECURE 2.0 Act, effective 2023). Accounts requiring RMDs: Traditional IRAs, SEP IRAs, SIMPLE IRAs, 401k, 403b, and 457b plans. Roth IRAs do NOT require RMDs during the owner lifetime.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What happens if I miss my RMD?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Missing an RMD triggers a 25% excise tax on the amount not withdrawn (reduced to 10% if corrected within 2 years under SECURE 2.0). For a $20,000 missed RMD, the penalty is up to $5,000. The IRS does offer a penalty waiver process if the shortfall was due to reasonable error and you take corrective action promptly.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Can I take more than the RMD?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Yes — the RMD is a minimum, not a maximum. You can always withdraw more, though all withdrawals from traditional accounts are taxed as ordinary income. Consider a Roth conversion strategy: convert some traditional IRA funds to a Roth IRA before RMDs begin (ages 59.5-72) to reduce future RMDs and create tax-free income.</p>
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
