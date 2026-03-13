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
    "q": "How is my paycheck calculated?",
    "a": "Your gross paycheck = Annual Salary ÷ Pay Periods. From that, subtract: federal income tax (based on your W-4 and bracket), state income tax, FICA (Social Security 6.2% + Medicare 1.45%), and any pre-tax deductions (401k, health insurance, FSA). What remains is your net take-home pay."
  },
  {
    "q": "What is FICA tax on my paycheck?",
    "a": "FICA (Federal Insurance Contributions Act) consists of Social Security tax (6.2% on income up to $168,600 in 2026) and Medicare tax (1.45% on all income, plus 0.9% on income over $200,000). Your employer matches these contributions. Total FICA is 7.65% of your paycheck."
  },
  {
    "q": "How do I reduce taxes on my paycheck?",
    "a": "Maximize pre-tax deductions: 401k contributions, HSA contributions ($4,150 single, $8,300 family in 2026), FSA contributions, and health insurance premiums. These reduce your taxable income dollar-for-dollar. Claiming the right allowances on your W-4 also adjusts withholding to avoid over-paying."
  }
]


export const metadata = {
  title: 'Paycheck Calculator — Free Online Paycheck Calculator | FreeFinCalc',
  description: 'Free Paycheck Calculator — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.',
  alternates: { canonical: 'https://freefincalc.net/paycheck-calculator' },
  openGraph: {
    title: 'Paycheck Calculator — Free Online Paycheck Calculator | FreeFinCalc',
    description: 'Free Paycheck Calculator — calculate your take-home pay, hourly rate, and tax withholdings. Instant results, no sign-up.',
    url: 'https://freefincalc.net/paycheck-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [grossSalary, setGrossSalary] = useState(65000)
  const [payFrequency, setPayFrequency] = useState(26)
  const [federalRate, setFederalRate] = useState(22)
  const [stateRate, setStateRate] = useState(5)
  const [preTaxDeductions, setPreTaxDeductions] = useState(3000)

  const result = useMemo(() => {
    try {
      const perPaycheck = grossSalary / payFrequency
      const annualTaxable = grossSalary - preTaxDeductions
      const fica = annualTaxable * 0.0765
      const federal = annualTaxable * (federalRate / 100)
      const state = annualTaxable * (stateRate / 100)
      const totalAnnualTax = fica + federal + state + preTaxDeductions
      const netAnnual = grossSalary - totalAnnualTax
      const netPaycheck = netAnnual / payFrequency
      const effectiveRate = ((totalAnnualTax - preTaxDeductions) / grossSalary * 100).toFixed(1) + '%'
      return { perPaycheck, netPaycheck, netAnnual, effectiveRate }
    } catch(e) { return null }
  }, [grossSalary, payFrequency, federalRate, stateRate, preTaxDeductions])

  const pdfRows = result ? [
    { label: "Gross Pay Per Paycheck", value: result.perPaycheck !== undefined ? (fmt(result.perPaycheck)) : "" },
    { label: "Net Take-Home Per Paycheck", value: result.netPaycheck !== undefined ? (fmt(result.netPaycheck)) : "" },
    { label: "Annual Net Take-Home", value: result.netAnnual !== undefined ? (fmt(result.netAnnual)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? (String(result.effectiveRate)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💵</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Paycheck Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate your net take-home pay per paycheck after taxes and deductions.</p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Inputs */}
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Annual Gross Salary</label>
                  <span className="text-white font-bold text-sm">{fmt(grossSalary)}</span>
                </div>
                <input type="range" min={10000} max={500000} step={1000}
                  value={grossSalary} onChange={e => setGrossSalary(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Pay Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {[{"v":52,"l":"Weekly"},{"v":26,"l":"Bi-Weekly"},{"v":24,"l":"Semi-Monthly"},{"v":12,"l":"Monthly"}].map(o => (
                    <button key={o.v} onClick={() => setPayFrequency(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{background:payFrequency===o.v?'rgba(240,200,66,0.2)':'rgba(255,255,255,0.05)',border:payFrequency===o.v?'1px solid rgba(240,200,66,0.5)':'1px solid rgba(255,255,255,0.08)',color:payFrequency===o.v?'#f0c842':'#64748b'}}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Federal Tax Rate</label>
                  <span className="text-white font-bold text-sm">{federalRate + "%"}</span>
                </div>
                <input type="range" min={0} max={37} step={1}
                  value={federalRate} onChange={e => setFederalRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">State Tax Rate</label>
                  <span className="text-white font-bold text-sm">{stateRate + "%"}</span>
                </div>
                <input type="range" min={0} max={15} step={0.25}
                  value={stateRate} onChange={e => setStateRate(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Pre-Tax Deductions (401k, HSA etc.)</label>
                  <span className="text-white font-bold text-sm">{fmt(preTaxDeductions)}</span>
                </div>
                <input type="range" min={0} max={30000} step={250}
                  value={preTaxDeductions} onChange={e => setPreTaxDeductions(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Paycheck Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gross Pay Per Paycheck</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.perPaycheck)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Net Take-Home Per Paycheck</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.netPaycheck)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Net Take-Home</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{fmt(result.netAnnual)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:"#f0c842"}}>{result.effectiveRate}</span>
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

            <a href="/salary-after-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">After-Tax Salary</h3>
            </a>

            <a href="/hourly-to-salary-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Hourly to Salary</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/401k-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👴</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">401k Calculator</h3>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How is my paycheck calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your gross paycheck = Annual Salary ÷ Pay Periods. From that, subtract: federal income tax (based on your W-4 and bracket), state income tax, FICA (Social Security 6.2% + Medicare 1.45%), and any pre-tax deductions (401k, health insurance, FSA). What remains is your net take-home pay.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">What is FICA tax on my paycheck?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">FICA (Federal Insurance Contributions Act) consists of Social Security tax (6.2% on income up to $168,600 in 2026) and Medicare tax (1.45% on all income, plus 0.9% on income over $200,000). Your employer matches these contributions. Total FICA is 7.65% of your paycheck.</p>
            </div>

            <div className="pb-4" style={{borderColor:"rgba(240,200,66,0.1)"}}>
              <h3 className="text-white font-semibold mb-2">How do I reduce taxes on my paycheck?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Maximize pre-tax deductions: 401k contributions, HSA contributions ($4,150 single, $8,300 family in 2026), FSA contributions, and health insurance premiums. These reduce your taxable income dollar-for-dollar. Claiming the right allowances on your W-4 also adjusts withholding to avoid over-paying.</p>
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
