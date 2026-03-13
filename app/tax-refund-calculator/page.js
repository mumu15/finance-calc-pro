'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'
import AdUnit from '../../components/AdUnit'


export const metadata = {
  title: 'Tax Refund Calculator — Free Online Tax Refund Calculator | FreeFinCalc',
  description: 'Free Tax Refund Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
  alternates: { canonical: 'https://freefincalc.net/tax-refund-calculator' },
  openGraph: {
    title: 'Tax Refund Calculator — Free Online Tax Refund Calculator | FreeFinCalc',
    description: 'Free Tax Refund Calculator — estimate your tax liability, deductions, and take-home pay. Fast, accurate, no sign-up required.',
    url: 'https://freefincalc.net/tax-refund-calculator',
    siteName: 'FreeFinCalc',
    type: 'website',
  },
};

export default function Calculator() {
  const { fmt } = useCurrency()
  const [grossIncome, setGrossIncome] = useState(75000)
  const [withheld, setWithheld] = useState(9000)
  const [filingStatus, setFilingStatus] = useState('single')
  const [deductions, setDeductions] = useState(14600)
  const [taxCredits, setTaxCredits] = useState(0)
  const [otherIncome, setOtherIncome] = useState(0)

  const result = useMemo(() => {
    try {
      const totalIncome  = grossIncome + otherIncome
      const taxableIncome = Math.max(0, totalIncome - deductions)
      const brackets = filingStatus === 'married'
        ? [[0,0.10,23200],[23200,0.12,94300],[94300,0.22,201050],[201050,0.24,383900],[383900,0.32,487450],[487450,0.35,731200],[731200,0.37,Infinity]]
        : filingStatus === 'hoh'
        ? [[0,0.10,16550],[16550,0.12,63100],[63100,0.22,100500],[100500,0.24,191950],[191950,0.32,243700],[243700,0.35,609350],[609350,0.37,Infinity]]
        : [[0,0.10,11600],[11600,0.12,47150],[47150,0.22,100525],[100525,0.24,191950],[191950,0.32,243725],[243725,0.35,609350],[609350,0.37,Infinity]]
      let fedTax = 0
      for (const [lo, rate, hi] of brackets) {
        if (taxableIncome <= lo) break
        fedTax += (Math.min(taxableIncome, hi) - lo) * rate
      }
      fedTax = Math.max(0, fedTax - taxCredits)
      const refundOrOwed = withheld - fedTax
      const status       = refundOrOwed >= 0 ? 'Refund' : 'Amount Owed'
      const amount       = Math.abs(refundOrOwed)
      const effectiveRate = (fedTax / totalIncome * 100).toFixed(1) + '%'
      return { fedTax, refundOrOwed: amount, status, effectiveRate, taxableIncome }
    } catch(e) { return null }
  }, [grossIncome, withheld, filingStatus, deductions, taxCredits, otherIncome])

  const pdfRows = result ? [
    { label: "Estimated Federal Tax", value: result.fedTax !== undefined ? String(fmt(result.fedTax)) : "" },
    { label: "Taxable Income", value: result.taxableIncome !== undefined ? String(fmt(result.taxableIncome)) : "" },
    { label: "Effective Tax Rate", value: result.effectiveRate !== undefined ? String(result.effectiveRate) : "" },
    { label: "Refund or Amount Owed", value: result.refundOrOwed !== undefined ? String(fmt(result.refundOrOwed)) : "" },
    { label: "Result", value: result.status !== undefined ? String(result.status) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💸</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tax Refund Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate your federal tax refund or amount owed before you file your return.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Annual Gross Income</label>
                  <span className="text-white font-bold text-sm">{fmt(grossIncome)}</span>
                </div>
                <input type="range" min={5000} max={500000} step={1000}
                  value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Federal Tax Withheld</label>
                  <span className="text-white font-bold text-sm">{fmt(withheld)}</span>
                </div>
                <input type="range" min={0} max={100000} step={100}
                  value={withheld} onChange={e => setWithheld(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Filing Status</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"single","l":"Single"},{"v":"married","l":"Married Joint"},{"v":"hoh","l":"Head of Household"}]).map(o => (
                    <button key={o.v} onClick={() => setFilingStatus(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: filingStatus === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: filingStatus === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: filingStatus === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Deductions (standard or itemized)</label>
                  <span className="text-white font-bold text-sm">{fmt(deductions)}</span>
                </div>
                <input type="range" min={0} max={80000} step={500}
                  value={deductions} onChange={e => setDeductions(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Tax Credits (child, education etc)</label>
                  <span className="text-white font-bold text-sm">{fmt(taxCredits)}</span>
                </div>
                <input type="range" min={0} max={20000} step={100}
                  value={taxCredits} onChange={e => setTaxCredits(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Other Income (freelance, investments)</label>
                  <span className="text-white font-bold text-sm">{fmt(otherIncome)}</span>
                </div>
                <input type="range" min={0} max={200000} step={500}
                  value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Tax Refund Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Federal Tax</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.fedTax)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Taxable Income</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.taxableIncome)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.effectiveRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Refund or Amount Owed</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.refundOrOwed)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Result</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.status}
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

            <a href="/tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧮</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Tax Calculator</h3>
            </a>

            <a href="/paycheck-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Paycheck Calculator</h3>
            </a>

            <a href="/net-pay-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💵</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Net Pay</h3>
            </a>

            <a href="/self-employment-tax-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🧾</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">SE Tax</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When will I get my tax refund?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The IRS issues most refunds within 21 days of accepting an e-filed return. Paper returns take 4-8 weeks. Refunds claiming the Earned Income Tax Credit or Additional Child Tax Credit are held until mid-February by law. You can track your refund at IRS.gov using the Where is My Refund tool. Direct deposit is 2-3 days faster than a check.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is a large tax refund a good thing?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A large refund means you overpaid taxes throughout the year — essentially giving the government an interest-free loan. Ideally you aim to break even (small refund or small amount owed). Adjust your W-4 withholding to keep more money in each paycheck throughout the year, then invest the difference rather than waiting for an annual refund.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What tax credits give the biggest refunds?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">High-value refundable tax credits: Earned Income Tax Credit ($632-$7,830 for 2024 depending on income and children), Child Tax Credit ($2,000 per child, up to $1,700 refundable), Child and Dependent Care Credit (up to $1,050 for one child), American Opportunity Tax Credit ($2,500 for college, 40% refundable), and Premium Tax Credit for ACA marketplace insurance.</p>
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
