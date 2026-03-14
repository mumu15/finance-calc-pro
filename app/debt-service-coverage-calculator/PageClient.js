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
  const [annualNOI, setAnnualNOI] = useState(180000)
  const [annualDebtSvc, setAnnualDebtSvc] = useState(120000)
  const [newLoanAmount, setNewLoanAmount] = useState(200000)
  const [newLoanRate, setNewLoanRate] = useState(8)
  const [newLoanYears, setNewLoanYears] = useState(10)

  const result = useMemo(() => {
    try {
      const dscr           = (annualNOI / annualDebtSvc).toFixed(2)
      const dscrStatus     = parseFloat(dscr) >= 1.25 ? 'Bankable (1.25+)' : parseFloat(dscr) >= 1.0 ? 'Borderline (1.0-1.25)' : 'Below Minimum (<1.0)'
      // New loan debt service
      const r              = newLoanRate / 100 / 12
      const n              = newLoanYears * 12
      const newMonthly     = newLoanAmount > 0 ? newLoanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1) : 0
      const newAnnualDS    = newMonthly * 12
      const combinedDS     = annualDebtSvc + newAnnualDS
      const combinedDSCR   = (annualNOI / combinedDS).toFixed(2)
      const combinedStatus = parseFloat(combinedDSCR) >= 1.25 ? 'Bankable' : parseFloat(combinedDSCR) >= 1.0 ? 'Borderline' : 'Below Minimum'
      return { dscr, dscrStatus, newMonthly, newAnnualDS, combinedDSCR, combinedStatus }
    } catch(e) { return null }
  }, [annualNOI, annualDebtSvc, newLoanAmount, newLoanRate, newLoanYears])

  const pdfRows = result ? [
    { label: "Current DSCR", value: result.dscr !== undefined ? String(result.dscr) : "" },
    { label: "Current Loan Status", value: result.dscrStatus !== undefined ? String(result.dscrStatus) : "" },
    { label: "New Loan Monthly Payment", value: result.newMonthly !== undefined ? String(fmt(result.newMonthly)) : "" },
    { label: "New Annual Debt Service", value: result.newAnnualDS !== undefined ? String(fmt(result.newAnnualDS)) : "" },
    { label: "Combined DSCR", value: result.combinedDSCR !== undefined ? String(result.combinedDSCR) : "" },
    { label: "Combined Loan Status", value: result.combinedStatus !== undefined ? String(result.combinedStatus) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Debt Service Coverage Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate DSCR to determine if your business income can cover loan payments.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Net Operating Income</label>
                  <span className="text-white font-bold text-sm">{fmt(annualNOI)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={10000000} step={5000}
                  value={annualNOI} onChange={e => setAnnualNOI(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Debt Service (P+I)</label>
                  <span className="text-white font-bold text-sm">{fmt(annualDebtSvc)}</span>
                </div>
                <input type="text" inputMode="decimal" min={1000} max={5000000} step={1000}
                  value={annualDebtSvc} onChange={e => setAnnualDebtSvc(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">New Loan Being Evaluated</label>
                  <span className="text-white font-bold text-sm">{fmt(newLoanAmount)}</span>
                </div>
                <input type="text" inputMode="decimal" min={0} max={5000000} step={5000}
                  value={newLoanAmount} onChange={e => setNewLoanAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">New Loan Rate</label>
                  <span className="text-white font-bold text-sm">{`${newLoanRate}%`}</span>
                </div>
                <input type="text" inputMode="decimal" min={1} max={20} step={0.25}
                  value={newLoanRate} onChange={e => setNewLoanRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">New Loan Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":5,"l":"5 yrs"},{"v":7,"l":"7 yrs"},{"v":10,"l":"10 yrs"},{"v":15,"l":"15 yrs"},{"v":25,"l":"25 yrs"}]).map(o => (
                    <button key={o.v} onClick={() => setNewLoanYears(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: newLoanYears === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: newLoanYears === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: newLoanYears === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Debt Service Coverage Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current DSCR</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.dscr}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Current Loan Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.dscrStatus}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Loan Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.newMonthly)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">New Annual Debt Service</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.newAnnualDS)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Combined DSCR</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.combinedDSCR}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Combined Loan Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.combinedStatus}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or business advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/business-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Loan</h3>
            </a>

            <a href="/sba-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SBA Loan</h3>
            </a>

            <a href="/cash-flow-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cash Flow</h3>
            </a>

            <a href="/working-capital-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Working Capital</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is Debt Service Coverage Ratio (DSCR)?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">DSCR = Net Operating Income / Total Debt Service. It measures how many times your income can cover your debt payments. A DSCR of 1.25 means income is 25% higher than debt payments. Most lenders require a minimum DSCR of 1.20-1.25 for business loans and 1.15-1.25 for commercial real estate. SBA loans typically require 1.15+.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What DSCR do lenders require?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Minimum requirements by loan type: SBA 7(a) 1.15x, conventional business loans 1.25x, commercial real estate 1.20-1.30x, construction loans 1.25-1.40x. The higher the DSCR, the better your loan terms. A DSCR of 1.5x or above gives you negotiating power for lower rates and better terms.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I improve my DSCR?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Increase the numerator (NOI): grow revenue, cut operating expenses, improve margins. Decrease the denominator (debt service): refinance at lower rates, extend loan terms, pay down principal, or consolidate higher-rate debt. Some lenders also allow adding back depreciation and amortization to NOI. Timing a loan application after a strong revenue quarter also helps.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Debt Service Coverage Calculator","item":"https://www.freefincalc.net/debt-service-coverage-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Debt Service Coverage Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
