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
  const [balance, setBalance] = useState(8000)
  const [currentAPR, setCurrentAPR] = useState(24)
  const [transferFee, setTransferFee] = useState(3)
  const [promoMonths, setPromoMonths] = useState(15)
  const [monthlyPmt, setMonthlyPmt] = useState(400)
  const [postPromoAPR, setPostPromoAPR] = useState(20)

  const result = useMemo(() => {
    try {
      const fee = balance * (transferFee / 100)
      const newBalance = balance + fee
      // Months to pay off with current card
      const rCurrent = currentAPR / 100 / 12
      const mosCurrent = Math.ceil(-Math.log(1 - balance * rCurrent / monthlyPmt) / Math.log(1 + rCurrent))
      const totalCurrent = monthlyPmt * mosCurrent
      const interestCurrent = totalCurrent - balance
      // Balance transfer scenario
      const balAfterPromo = Math.max(0, newBalance - monthlyPmt * promoMonths)
      const rPost = postPromoAPR / 100 / 12
      const mosPost = balAfterPromo > 0 ? Math.ceil(-Math.log(1 - balAfterPromo * rPost / monthlyPmt) / Math.log(1 + rPost)) : 0
      const totalTransfer = fee + monthlyPmt * promoMonths + monthlyPmt * mosPost - Math.max(0, monthlyPmt * promoMonths - newBalance)
      const interestTransfer = balAfterPromo > 0 ? monthlyPmt * mosPost - balAfterPromo : 0
      const totalSaved = totalCurrent - totalTransfer - fee
      const worthIt = totalSaved > 0 ? 'Yes - saves money' : 'No - not worth it'
      return { fee, interestCurrent, interestTransfer: Math.max(0,interestTransfer), totalSaved: Math.abs(totalSaved), worthIt }
    } catch(e) { return null }
  }, [balance, currentAPR, transferFee, promoMonths, monthlyPmt, postPromoAPR])

  const pdfRows = result ? [
    { label: "Transfer Fee", value: result.fee !== undefined ? String(fmt(result.fee)) : "" },
    { label: "Interest Without Transfer", value: result.interestCurrent !== undefined ? String(fmt(result.interestCurrent)) : "" },
    { label: "Interest After Transfer", value: result.interestTransfer !== undefined ? String(fmt(result.interestTransfer)) : "" },
    { label: "Net Savings", value: result.totalSaved !== undefined ? String(fmt(result.totalSaved)) : "" },
    { label: "Is Transfer Worth It?", value: result.worthIt !== undefined ? String(result.worthIt) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔄</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Balance Transfer Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Calculate if a 0% balance transfer saves money versus keeping your current card.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Balance to Transfer</label>
                  <span className="text-white font-bold text-sm">{fmt(balance)}</span>
                </div>
                <input type="range" min={100} max={100000} step={100}
                  value={balance} onChange={e => setBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Card APR</label>
                  <span className="text-white font-bold text-sm">{`${currentAPR}%`}</span>
                </div>
                <input type="range" min={1} max={36} step={0.25}
                  value={currentAPR} onChange={e => setCurrentAPR(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Balance Transfer Fee</label>
                  <span className="text-white font-bold text-sm">{`${transferFee}%`}</span>
                </div>
                <input type="range" min={0} max={5} step={0.25}
                  value={transferFee} onChange={e => setTransferFee(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">0% Promo Period</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"12 months"},{"v":15,"l":"15 months"},{"v":18,"l":"18 months"},{"v":21,"l":"21 months"}]).map(o => (
                    <button key={o.v} onClick={() => setPromoMonths(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: promoMonths === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: promoMonths === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: promoMonths === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Monthly Payment</label>
                  <span className="text-white font-bold text-sm">{fmt(monthlyPmt)}</span>
                </div>
                <input type="range" min={50} max={10000} step={25}
                  value={monthlyPmt} onChange={e => setMonthlyPmt(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">APR After Promo Expires</label>
                  <span className="text-white font-bold text-sm">{`${postPromoAPR}%`}</span>
                </div>
                <input type="range" min={1} max={30} step={0.25}
                  value={postPromoAPR} onChange={e => setPostPromoAPR(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Balance Transfer Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Transfer Fee</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest Without Transfer</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestCurrent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Interest After Transfer</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interestTransfer)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Savings</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalSaved)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Is Transfer Worth It?</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.worthIt}
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

            <a href="/credit-card-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Credit Card Payoff</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Consolidation</h3>
            </a>

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How does a 0% balance transfer work?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A balance transfer moves debt from one or more high-interest cards to a new card with a 0% introductory APR for 12-21 months. You typically pay a transfer fee of 3-5% upfront. During the promo period, all payments reduce principal (no interest). At the end of the promo, any remaining balance accrues interest at the card normal APR (usually 19-29%). The strategy only works if you pay off the balance before the promo expires.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What credit score do I need for a balance transfer card?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Most balance transfer cards with 0% promo periods require good to excellent credit: 670+ for approval, 720+ for the best offers (longest promo periods, lowest fees). Check for pre-qualification with soft pulls before applying to avoid hard inquiry score impacts. Cards like Chase Slate Edge, Citi Simplicity, and Wells Fargo Reflect consistently offer competitive balance transfer terms.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What mistakes should I avoid with balance transfers?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Key mistakes: continuing to use the old card and accumulating new debt, missing a payment (often voids the 0% promo immediately), not paying off the full balance before promo ends (remaining balance suddenly accrues high APR), not accounting for the transfer fee in your savings calculation, and applying for multiple cards simultaneously (hurts credit score). Create a payoff plan before transferring.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Balance Transfer Calculator","item":"https://www.freefincalc.net/balance-transfer-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Balance Transfer Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/how-to-get-out-of-debt" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How to Get Out of Debt: Complete Guide</a>
          <a href="/blog/how-to-pay-off-debt-fast" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How to Pay Off Debt Fast</a>
        </div>
      <Footer />
    </>
  )
}
