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
  const [deliveryType, setDeliveryType] = useState('vaginal')
  const [insurance, setInsurance] = useState('good')
  const [childcareType, setChildcareType] = useState('daycare')
  const [formula, setFormula] = useState('combo')

  const result = useMemo(() => {
    try {
      const deliveryCost = { vaginal: 15000, csection: 25000, midwife: 5000 }[deliveryType]
      const insuranceMult = { none: 1.0, basic: 0.4, good: 0.15, great: 0.05 }[insurance]
      const outOfPocket   = deliveryCost * insuranceMult
      const childcareCost = { home: 0, family: 0, daycare: 18000, nanny: 36000 }[childcareType]
      const formulaCost   = { breast: 0, formula: 2400, combo: 1200 }[formula]
      const gear          = 3500
      const clothing      = 800
      const medical       = 1500
      const misc          = 1200
      const firstYearTotal = outOfPocket + childcareCost + formulaCost + gear + clothing + medical + misc
      const monthlyAvg     = firstYearTotal / 12
      return { outOfPocket, childcareCost, formulaCost, gear, clothing, medical, firstYearTotal, monthlyAvg }
    } catch(e) { return null }
  }, [deliveryType, insurance, childcareType, formula])

  const pdfRows = result ? [
    { label: "Birth and Delivery Cost", value: result.outOfPocket !== undefined ? String(fmt(result.outOfPocket)) : "" },
    { label: "Annual Childcare Cost", value: result.childcareCost !== undefined ? String(fmt(result.childcareCost)) : "" },
    { label: "Formula and Feeding Cost", value: result.formulaCost !== undefined ? String(fmt(result.formulaCost)) : "" },
    { label: "Gear and Equipment", value: result.gear !== undefined ? String(fmt(result.gear)) : "" },
    { label: "Clothing (first year)", value: result.clothing !== undefined ? String(fmt(result.clothing)) : "" },
    { label: "Medical and Pediatric", value: result.medical !== undefined ? String(fmt(result.medical)) : "" },
    { label: "Total First-Year Cost", value: result.firstYearTotal !== undefined ? String(fmt(result.firstYearTotal)) : "" },
    { label: "Average Monthly Cost", value: result.monthlyAvg !== undefined ? String(fmt(result.monthlyAvg)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">👶</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Baby Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate the first-year cost of having a baby including delivery, childcare and essentials.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <label className="text-slate-400 text-sm block mb-2">Delivery Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"vaginal","l":"Vaginal Birth"},{"v":"csection","l":"C-Section"},{"v":"midwife","l":"Birth Center / Midwife"}]).map(o => (
                    <button key={o.v} onClick={() => setDeliveryType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: deliveryType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: deliveryType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: deliveryType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Insurance Coverage</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"none","l":"No Insurance"},{"v":"basic","l":"Basic Insurance"},{"v":"good","l":"Good Insurance"},{"v":"great","l":"Excellent Coverage"}]).map(o => (
                    <button key={o.v} onClick={() => setInsurance(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: insurance === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: insurance === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: insurance === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Childcare Plan</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"home","l":"Stay-at-Home Parent"},{"v":"family","l":"Family Help (free)"},{"v":"daycare","l":"Daycare Center"},{"v":"nanny","l":"Full-Time Nanny"}]).map(o => (
                    <button key={o.v} onClick={() => setChildcareType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: childcareType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: childcareType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: childcareType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Feeding Method</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"breast","l":"Breastfeeding Only"},{"v":"formula","l":"Formula Only"},{"v":"combo","l":"Combination"}]).map(o => (
                    <button key={o.v} onClick={() => setFormula(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: formula === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: formula === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: formula === o.v ? '#f0c842' : '#64748b'
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
                {result && <PdfDownload title="Baby Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Birth and Delivery Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.outOfPocket)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Childcare Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.childcareCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Formula and Feeding Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.formulaCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Gear and Equipment</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.gear)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Clothing (first year)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.clothing)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Medical and Pediatric</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.medical)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total First-Year Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.firstYearTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Average Monthly Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyAvg)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">Enter values above to see results</div>
              )}
            </div>
            <div className="p-3 rounded-xl text-xs text-slate-500 leading-relaxed"
              style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
              Results are estimates for planning purposes only. Actual costs vary by location and choices.
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Related Calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            <a href="/budget-planner-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Planner</h3>
            </a>

            <a href="/child-tax-credit-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👶</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Child Tax Credit</h3>
            </a>

            <a href="/college-savings-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">College Savings</h3>
            </a>

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much does it cost to have a baby in the US?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Average first-year costs for a baby in the US range from $15,000 to $50,000+ depending on insurance, childcare, and location. Hospital delivery alone averages $10,000-$30,000 before insurance. Childcare is the largest ongoing expense: daycare averages $10,000-$25,000 per year, a full-time nanny $35,000-$50,000+. Most families underestimate costs by 30-50%.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How should I prepare financially before having a baby?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Key financial steps: review your health insurance and understand your deductible and out-of-pocket maximum, build 3-6 months emergency fund, enroll in a Dependent Care FSA (saves $500-$1,000+ in taxes on up to $5,000 of childcare), research parental leave policies and whether you need short-term disability insurance, and create a revised post-baby budget at least 6 months ahead.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is a Dependent Care FSA and how much can it save?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">A Dependent Care FSA lets you pay for childcare with pre-tax dollars, up to $5,000 per year ($2,500 if married filing separately). At a 25% tax rate, that saves $1,250 in federal income tax plus FICA savings. The Child and Dependent Care Credit provides additional tax relief of 20-35% on up to $3,000 of childcare expenses for one child.</p>
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
