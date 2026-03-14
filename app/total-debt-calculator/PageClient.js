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
  const [mortgageBalance, setMortgageBalance] = useState(280000)
  const [carBalance, setCarBalance] = useState(18000)
  const [studentBalance, setStudentBalance] = useState(25000)
  const [creditCards, setCreditCards] = useState(6000)
  const [otherDebt, setOtherDebt] = useState(0)
  const [annualIncome, setAnnualIncome] = useState(75000)

  const result = useMemo(() => {
    try {
      const totalDebt = mortgageBalance + carBalance + studentBalance + creditCards + otherDebt
      const nonMortgage = carBalance + studentBalance + creditCards + otherDebt
      const dtiRatio   = (totalDebt / annualIncome * 100).toFixed(1) + '%'
      const nonMortDTI = (nonMortgage / annualIncome * 100).toFixed(1) + '%'
      const monthlyMinEst = totalDebt * 0.02
      const debtFreeYears = (totalDebt / (annualIncome * 0.20)).toFixed(1)
      const healthStatus  = nonMortgage / annualIncome < 0.5 ? 'Manageable' : nonMortgage / annualIncome < 1.0 ? 'High' : 'Critical'
      return { totalDebt, nonMortgage, dtiRatio, nonMortDTI, monthlyMinEst, debtFreeYears, healthStatus }
    } catch(e) { return null }
  }, [mortgageBalance, carBalance, studentBalance, creditCards, otherDebt, annualIncome])

  const pdfRows = result ? [
    { label: "Total Debt", value: result.totalDebt !== undefined ? String(fmt(result.totalDebt)) : "" },
    { label: "Non-Mortgage Debt", value: result.nonMortgage !== undefined ? String(fmt(result.nonMortgage)) : "" },
    { label: "Total Debt to Income Ratio", value: result.dtiRatio !== undefined ? String(result.dtiRatio) : "" },
    { label: "Non-Mortgage DTI", value: result.nonMortDTI !== undefined ? String(result.nonMortDTI) : "" },
    { label: "Est. Monthly Minimum Payments", value: result.monthlyMinEst !== undefined ? String(fmt(result.monthlyMinEst)) : "" },
    { label: "Years to Debt-Free (20% income)", value: result.debtFreeYears !== undefined ? String(result.debtFreeYears) : "" },
    { label: "Debt Health Status", value: result.healthStatus !== undefined ? String(result.healthStatus) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Total Debt Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Add up all your debts, calculate total interest burden and create a payoff plan.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Mortgage Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(mortgageBalance)}</span>
                </div>
                <input type="number" min={0} max={2000000} step={1000}
                  value={mortgageBalance} onChange={e => setMortgageBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Car Loan Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(carBalance)}</span>
                </div>
                <input type="number" min={0} max={200000} step={500}
                  value={carBalance} onChange={e => setCarBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Student Loan Balance</label>
                  <span className="text-white font-bold text-sm">{fmt(studentBalance)}</span>
                </div>
                <input type="number" min={0} max={300000} step={500}
                  value={studentBalance} onChange={e => setStudentBalance(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Credit Card Balances</label>
                  <span className="text-white font-bold text-sm">{fmt(creditCards)}</span>
                </div>
                <input type="number" min={0} max={100000} step={100}
                  value={creditCards} onChange={e => setCreditCards(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other Debt (personal, etc)</label>
                  <span className="text-white font-bold text-sm">{fmt(otherDebt)}</span>
                </div>
                <input type="number" min={0} max={200000} step={500}
                  value={otherDebt} onChange={e => setOtherDebt(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Income</label>
                  <span className="text-white font-bold text-sm">{fmt(annualIncome)}</span>
                </div>
                <input type="number" min={10000} max={1000000} step={1000}
                  value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))}
                  className="slider-upgrade" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Total Debt Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Debt</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.totalDebt)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Non-Mortgage Debt</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.nonMortgage)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Debt to Income Ratio</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.dtiRatio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Non-Mortgage DTI</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.nonMortDTI}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Est. Monthly Minimum Payments</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyMinEst)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Years to Debt-Free (20% income)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.debtFreeYears}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Debt Health Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.healthStatus}
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

            <a href="/debt-payoff-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Payoff</h3>
            </a>

            <a href="/debt-to-income-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt to Income</h3>
            </a>

            <a href="/debt-consolidation-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Debt Consolidation</h3>
            </a>

            <a href="/net-worth-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Worth</h3>
            </a>
          </div>
        </div>
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a healthy debt-to-income ratio?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Total DTI under 36% is considered healthy by most lenders. Non-housing DTI under 20% is ideal. Mortgage lenders prefer total DTI under 43% for approval (some allow up to 50% with strong credit). Consumer financial health benchmarks: under 15% non-mortgage DTI is excellent, 15-35% is manageable, 35-50% is high, above 50% is concerning and needs immediate attention.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What debts should I pay off first?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Priority order: (1) Any debt in collections or severely past due (stop credit damage). (2) High-interest credit cards and payday loans (highest cost debt). (3) Other unsecured debt over 10% interest. (4) Student loans over 7% interest. (5) Car loans. (6) Student loans under 7%. (7) Mortgage (lowest rate, tax deductible interest, builds equity). Never neglect minimum payments on any debt.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How long does it take to become debt-free?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">With focused effort: credit cards (using avalanche or snowball) 2-5 years, car loans 3-5 years, student loans 5-10 years, mortgages 15-30 years (or earlier with extra payments). The most powerful accelerator is increasing income and directing 100% of new income to debt. Side income of $500-$1,000/month applied to debt can cut payoff time in half.</p>
            </div>
          </div>
        </div>
      </main>
              <AdUnit slot="7405024590" />
      <TrustSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Total Debt Calculator","item":"https://www.freefincalc.net/total-debt-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Total Debt Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      <Footer />
    </>
  )
}
