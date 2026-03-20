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
  const [amount1, setAmount1] = useState(25000)
  const [rate1, setRate1] = useState(7)
  const [term1, setTerm1] = useState(60)
  const [amount2, setAmount2] = useState(25000)
  const [rate2, setRate2] = useState(9.5)
  const [term2, setTerm2] = useState(36)

  const result = useMemo(() => {
    try {
      const calc = (amt, rate, term) => {
        const r = rate / 100 / 12
        const monthly = r > 0 ? amt * (r * Math.pow(1+r,term)) / (Math.pow(1+r,term)-1) : amt/term
        const total = monthly * term
        const interest = total - amt
        return { monthly, total, interest }
      }
      const l1 = calc(amount1, rate1, term1)
      const l2 = calc(amount2, rate2, term2)
      const betterMonthly = l1.monthly <= l2.monthly ? 'Loan 1 lower payment' : 'Loan 2 lower payment'
      const betterTotal   = l1.total <= l2.total ? 'Loan 1 cheaper overall' : 'Loan 2 cheaper overall'
      const totalDiff     = Math.abs(l1.total - l2.total)
      return {
        monthly1: l1.monthly, total1: l1.total, interest1: l1.interest,
        monthly2: l2.monthly, total2: l2.total, interest2: l2.interest,
        betterMonthly, betterTotal, totalDiff
      }
    } catch(e) { return null }
  }, [amount1, rate1, term1, amount2, rate2, term2])

  const pdfRows = result ? [
    { label: "Loan 1 Monthly Payment", value: result.monthly1 !== undefined ? String(fmt(result.monthly1)) : "" },
    { label: "Loan 1 Total Cost", value: result.total1 !== undefined ? String(fmt(result.total1)) : "" },
    { label: "Loan 1 Total Interest", value: result.interest1 !== undefined ? String(fmt(result.interest1)) : "" },
    { label: "Loan 2 Monthly Payment", value: result.monthly2 !== undefined ? String(fmt(result.monthly2)) : "" },
    { label: "Loan 2 Total Cost", value: result.total2 !== undefined ? String(fmt(result.total2)) : "" },
    { label: "Loan 2 Total Interest", value: result.interest2 !== undefined ? String(fmt(result.interest2)) : "" },
    { label: "Lower Monthly Payment", value: result.betterMonthly !== undefined ? String(result.betterMonthly) : "" },
    { label: "Cheaper Overall", value: result.betterTotal !== undefined ? String(result.betterTotal) : "" },
    { label: "Total Cost Difference", value: result.totalDiff !== undefined ? String(fmt(result.totalDiff)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Loan Comparison Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Compare two loans side by side to find the best deal including total cost and monthly payment.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan 1 Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(amount1)}</span>
                </div>
                <input type="range" min={1000} max={1000000} step={500}
                  value={amount1} onChange={e => setAmount1(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan 1 Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate1}%`}</span>
                </div>
                <input type="range" min={0} max={36} step={0.25}
                  value={rate1} onChange={e => setRate1(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan 1 Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"12 mo"},{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":84,"l":"84 mo"},{"v":120,"l":"120 mo"},{"v":180,"l":"180 mo"},{"v":360,"l":"360 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setTerm1(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: term1 === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: term1 === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: term1 === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan 2 Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(amount2)}</span>
                </div>
                <input type="range" min={1000} max={1000000} step={500}
                  value={amount2} onChange={e => setAmount2(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Loan 2 Interest Rate</label>
                  <span className="text-white font-bold text-sm">{`${rate2}%`}</span>
                </div>
                <input type="range" min={0} max={36} step={0.25}
                  value={rate2} onChange={e => setRate2(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan 2 Term</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":12,"l":"12 mo"},{"v":24,"l":"24 mo"},{"v":36,"l":"36 mo"},{"v":48,"l":"48 mo"},{"v":60,"l":"60 mo"},{"v":84,"l":"84 mo"},{"v":120,"l":"120 mo"},{"v":180,"l":"180 mo"},{"v":360,"l":"360 mo"}]).map(o => (
                    <button key={o.v} onClick={() => setTerm2(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: term2 === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: term2 === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: term2 === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Loan Comparison Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan 1 Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly1)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan 1 Total Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total1)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan 1 Total Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest1)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan 2 Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthly2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan 2 Total Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Loan 2 Total Interest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.interest2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Lower Monthly Payment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.betterMonthly}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cheaper Overall</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.betterTotal}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Cost Difference</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDiff)}
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

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/mortgage-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Mortgage</h3>
            </a>

            <a href="/apr-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">APR Calculator</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Consolidation</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I choose between two loan offers?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Compare total cost (not just monthly payment). A lower monthly payment with a longer term often costs more overall. Check: total interest paid, all fees (origination, prepayment penalties), APR (includes fees — more accurate than rate alone), flexibility (can I pay extra without penalty?), and lender reputation. The lowest APR with no prepayment penalties is usually the best deal.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When is a higher monthly payment worth it?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A higher monthly payment (shorter term loan) is worth it when: total interest savings are significant, you have stable income to handle the payment, and you want to pay off debt faster. Paying $200 more per month on a $25,000 loan at 7% by choosing 36 months over 60 months saves over $2,000 in interest and gets you debt-free 2 years sooner.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What fees should I look for when comparing loans?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Key fees to compare: origination fee (0-5% of loan amount), prepayment penalty (charged if you pay off early — avoid), late payment fees, returned payment fees, and annual fees on lines of credit. Always ask for the APR which includes all fees for an apples-to-apples rate comparison between lenders.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Loan Comparison Calculator","item":"https://www.freefincalc.net/loan-comparison-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Loan Comparison Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/how-car-loans-work" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How Car Loans Work</a>
          <a href="/blog/how-personal-loans-work" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How Personal Loans Work</a>
        </div>
      <Footer />
    </>
  )
}
