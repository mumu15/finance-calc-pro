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
  const [amount, setAmount] = useState(10000)
  const [inflRate, setInflRate] = useState(3)
  const [years, setYears] = useState(20)
  const [investReturn, setInvestReturn] = useState(7)

  const result = useMemo(() => {
    try {
      const futureEquivalent = amount / Math.pow(1 + inflRate/100, years)
      const neededToMaintain = amount * Math.pow(1 + inflRate/100, years)
      const purchasingLost   = amount - futureEquivalent
      const investedValue    = amount * Math.pow(1 + investReturn/100, years)
      const realReturn       = ((investReturn - inflRate)).toFixed(2) + '%'
      const lostPct          = (purchasingLost / amount * 100).toFixed(1) + '%'
      return { futureEquivalent, neededToMaintain, purchasingLost, lostPct, investedValue, realReturn }
    } catch(e) { return null }
  }, [amount, inflRate, years, investReturn])

  const pdfRows = result ? [
    { label: "Today's Money Worth in Future", value: result.futureEquivalent !== undefined ? String(fmt(result.futureEquivalent)) : "" },
    { label: "Purchasing Power Lost", value: result.purchasingLost !== undefined ? String(fmt(result.purchasingLost)) : "" },
    { label: "% of Value Eroded", value: result.lostPct !== undefined ? String(result.lostPct) : "" },
    { label: "Needed to Maintain Buying Power", value: result.neededToMaintain !== undefined ? String(fmt(result.neededToMaintain)) : "" },
    { label: "Invested Value (vs inflation)", value: result.investedValue !== undefined ? String(fmt(result.investedValue)) : "" },
    { label: "Real Rate of Return", value: result.realReturn !== undefined ? String(result.realReturn) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Inflation Impact Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how inflation erodes purchasing power and what your money will be worth in the future.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Amount</label>
                  <span className="text-white font-bold text-sm">{fmt(amount)}</span>
                </div>
                <input type="range" min={100} max={1000000} step={100}
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Inflation Rate</label>
                  <span className="text-white font-bold text-sm">{`${inflRate}%`}</span>
                </div>
                <input type="range" min={0.5} max={15} step={0.25}
                  value={inflRate} onChange={e => setInflRate(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years Into The Future</label>
                  <span className="text-white font-bold text-sm">{`${years} yrs`}</span>
                </div>
                <input type="range" min={1} max={50} step={1}
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Investment Return (to beat inflation)</label>
                  <span className="text-white font-bold text-sm">{`${investReturn}%`}</span>
                </div>
                <input type="range" min={0} max={15} step={0.25}
                  value={investReturn} onChange={e => setInvestReturn(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Inflation Impact Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Today's Money Worth in Future</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.futureEquivalent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Purchasing Power Lost</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.purchasingLost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">% of Value Eroded</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.lostPct}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Needed to Maintain Buying Power</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.neededToMaintain)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Invested Value (vs inflation)</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {fmt(result.investedValue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Real Rate of Return</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>
                      {result.realReturn}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for educational purposes only. Not financial or tax advice.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/investment-return-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Investment Return</h3>
            </a>

            <a href="/savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Calculator</h3>
            </a>

            <a href="/compound-interest" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💹</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Compound Interest</h3>
            </a>

            <a href="/fire-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔥</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">FIRE Calculator</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is inflation and how does it affect savings?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Inflation is the general rise in prices over time, reducing what each dollar can buy. At 3% inflation, $10,000 today has the purchasing power of only $5,537 in 20 years. Cash savings in a low-interest account lose real value every year. This is why investing — earning returns above inflation — is essential for long-term wealth.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is the historical average inflation rate?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">US inflation has averaged about 3.3% annually since 1913. The 2021-2023 inflation surge peaked at 9.1% (June 2022) before cooling. The Fed targets 2% annual inflation. High inflation periods (1970s, 2021-23) dramatically erode fixed incomes and bond returns but can benefit owners of hard assets like real estate.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I protect my money from inflation?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Best inflation hedges: equities (stocks historically return 7% real), real estate (rents and values rise with inflation), TIPS (Treasury Inflation-Protected Securities), I-bonds (rate adjusts with CPI), commodities, and REITs. The worst places to hold money during high inflation: cash, fixed-rate bonds, and traditional savings accounts.</p>
            </div>
          </div>
        </div>

      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Inflation Impact Calculator","item":"https://www.freefincalc.net/inflation-impact-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Inflation Impact Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        <div style={{marginTop:24,marginBottom:24,padding:20,borderRadius:16,background:'rgba(240,200,66,0.03)',border:'1px solid rgba(240,200,66,0.12)'}}>
          <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Recommended Reading</h2>
          <a href="/blog/how-does-inflation-affect-savings" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How Inflation Affects Your Savings</a>
          <a href="/blog/how-inflation-works" style={{display:'block',color:'#f0c842',fontSize:14,fontWeight:600,textDecoration:'none',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>How Inflation Works</a>
        </div>
      <Footer />
    </>
  )
}
