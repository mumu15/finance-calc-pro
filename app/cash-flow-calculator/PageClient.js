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
  const [revenue, setRevenue] = useState(80000)
  const [cogs, setCogs] = useState(30000)
  const [opExpenses, setOpExpenses] = useState(25000)
  const [debtPayments, setDebtPayments] = useState(5000)
  const [capex, setCapex] = useState(2000)
  const [cashReserves, setCashReserves] = useState(150000)

  const result = useMemo(() => {
    try {
      const grossProfit  = revenue - cogs
      const ebitda        = grossProfit - opExpenses
      const operatingCF   = ebitda - debtPayments
      const freeCF        = operatingCF - capex
      const burnRate      = freeCF < 0 ? Math.abs(freeCF) : 0
      const runway        = burnRate > 0 ? (cashReserves / burnRate).toFixed(1) + ' months' : 'Positive cash flow'
      const grossMargin   = revenue > 0 ? (grossProfit / revenue * 100).toFixed(1) + '%' : '0%'
      const opMargin      = revenue > 0 ? (operatingCF / revenue * 100).toFixed(1) + '%' : '0%'
      return { grossProfit, ebitda, operatingCF, freeCF, burnRate, runway, grossMargin, opMargin }
    } catch(e) { return null }
  }, [revenue, cogs, opExpenses, debtPayments, capex, cashReserves])

  const pdfRows = result ? [
    { label: "Gross Profit", value: result.grossProfit !== undefined ? String(fmt(result.grossProfit)) : "" },
    { label: "EBITDA", value: result.ebitda !== undefined ? String(fmt(result.ebitda)) : "" },
    { label: "Operating Cash Flow", value: result.operatingCF !== undefined ? String(fmt(result.operatingCF)) : "" },
    { label: "Free Cash Flow", value: result.freeCF !== undefined ? String(fmt(result.freeCF)) : "" },
    { label: "Monthly Burn Rate", value: result.burnRate !== undefined ? String(fmt(result.burnRate)) : "" },
    { label: "Cash Runway", value: result.runway !== undefined ? String(result.runway) : "" },
    { label: "Gross Margin", value: result.grossMargin !== undefined ? String(result.grossMargin) : "" },
    { label: "Operating Margin", value: result.opMargin !== undefined ? String(result.opMargin) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cash Flow Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate operating cash flow, free cash flow and cash runway for your business.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Revenue</label>
                  <span className="text-white font-bold text-sm">{fmt(revenue)}</span>
                </div>
                <input type="number" min={0} max={10000000} step={1000}
                  value={revenue} onChange={e => setRevenue(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Cost of Goods Sold (COGS)</label>
                  <span className="text-white font-bold text-sm">{fmt(cogs)}</span>
                </div>
                <input type="number" min={0} max={5000000} step={500}
                  value={cogs} onChange={e => setCogs(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Operating Expenses</label>
                  <span className="text-white font-bold text-sm">{fmt(opExpenses)}</span>
                </div>
                <input type="number" min={0} max={2000000} step={500}
                  value={opExpenses} onChange={e => setOpExpenses(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Debt Payments</label>
                  <span className="text-white font-bold text-sm">{fmt(debtPayments)}</span>
                </div>
                <input type="number" min={0} max={500000} step={250}
                  value={debtPayments} onChange={e => setDebtPayments(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Capital Expenditures</label>
                  <span className="text-white font-bold text-sm">{fmt(capex)}</span>
                </div>
                <input type="number" min={0} max={500000} step={250}
                  value={capex} onChange={e => setCapex(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Cash Reserves</label>
                  <span className="text-white font-bold text-sm">{fmt(cashReserves)}</span>
                </div>
                <input type="number" min={0} max={10000000} step={1000}
                  value={cashReserves} onChange={e => setCashReserves(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Cash Flow Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Profit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.grossProfit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">EBITDA</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.ebitda)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Operating Cash Flow</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.operatingCF)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Free Cash Flow</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.freeCF)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Burn Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.burnRate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cash Runway</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.runway}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Margin</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.grossMargin}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Operating Margin</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.opMargin}
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

            <a href="/working-capital-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Working Capital</h3>
            </a>

            <a href="/accounts-receivable-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📬</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Accounts Receivable</h3>
            </a>

            <a href="/profit-margin-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Profit Margin</h3>
            </a>

            <a href="/business-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Business Loan</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is free cash flow and why does it matter?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Free cash flow (FCF) = Operating cash flow minus capital expenditures. It represents cash the business generates after maintaining and growing its asset base. FCF is what can be used to pay investors, reduce debt, or fund growth. Profitable companies can still fail with negative FCF if profits are tied up in inventory or receivables.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a good cash runway for a startup?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most financial advisors recommend at least 12-18 months of cash runway at all times. Startups raising funding should begin the process with 9-12 months of runway — fundraising takes 3-6 months. A runway below 6 months is a critical situation requiring immediate action: expense cuts, revenue acceleration, or emergency bridge funding.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is cash flow different from profit?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Profit is an accounting concept (revenue minus expenses on an accrual basis). Cash flow is actual money moving in and out of the bank. They differ due to: timing of payments (invoiced but not yet paid), depreciation (expense with no cash outflow), capital expenditures (cash out with no immediate expense), and inventory changes. A business can be profitable but cash flow negative.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Cash Flow Calculator","item":"https://www.freefincalc.net/cash-flow-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Cash Flow Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
