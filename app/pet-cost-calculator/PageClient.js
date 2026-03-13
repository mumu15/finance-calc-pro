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
  const [petType, setPetType] = useState('dog_medium')
  const [vetPlan, setVetPlan] = useState('standard')
  const [insurance, setInsurance] = useState('yes')
  const [petAge, setPetAge] = useState(1)

  const result = useMemo(() => {
    try {
      const baseCosts = {
        dog_small:  { food: 600,  vet: 700,  groom: 500,  supplies: 200, license: 20, lifespan: 14 },
        dog_medium: { food: 900,  vet: 800,  groom: 700,  supplies: 250, license: 20, lifespan: 12 },
        dog_large:  { food: 1300, vet: 1000, groom: 900,  supplies: 300, license: 20, lifespan: 10 },
        cat:        { food: 400,  vet: 500,  groom: 100,  supplies: 150, license: 0,  lifespan: 15 },
        cat_outdoor:{ food: 350,  vet: 600,  groom: 50,   supplies: 100, license: 0,  lifespan: 12 },
      }
      const vetMultiplier = { basic: 0.6, standard: 1.0, premium: 1.6 }[vetPlan]
      const base = baseCosts[petType]
      const annualVet   = base.vet * vetMultiplier
      const insuranceCost = insurance === 'yes' ? (petType.startsWith('dog') ? 600 : 350) : 0
      const annualTotal = base.food + annualVet + base.groom + base.supplies + base.license + insuranceCost
      const yearsLeft   = Math.max(1, base.lifespan - petAge)
      const lifetimeCost = annualTotal * yearsLeft
      const monthlyAvg  = annualTotal / 12
      return { annualTotal, monthlyAvg, lifetimeCost, food: base.food, annualVet, groom: base.groom, insuranceCost }
    } catch(e) { return null }
  }, [petType, vetPlan, insurance, petAge])

  const pdfRows = result ? [
    { label: "Annual Food Cost", value: result.food !== undefined ? String(fmt(result.food)) : "" },
    { label: "Annual Veterinary Cost", value: result.annualVet !== undefined ? String(fmt(result.annualVet)) : "" },
    { label: "Annual Grooming", value: result.groom !== undefined ? String(fmt(result.groom)) : "" },
    { label: "Pet Insurance Annual Cost", value: result.insuranceCost !== undefined ? String(fmt(result.insuranceCost)) : "" },
    { label: "Total Annual Cost", value: result.annualTotal !== undefined ? String(fmt(result.annualTotal)) : "" },
    { label: "Monthly Average Cost", value: result.monthlyAvg !== undefined ? String(fmt(result.monthlyAvg)) : "" },
    { label: "Estimated Remaining Lifetime Cost", value: result.lifetimeCost !== undefined ? String(fmt(result.lifetimeCost)) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Pet Cost Calculator", "item": "https://freefincalc.net/pet-cost-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Pet Cost Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🐾</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pet Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate annual and lifetime costs of owning a dog or cat including vet, food and care.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <label className="text-slate-400 text-sm block mb-2">Type of Pet</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"dog_small","l":"Small Dog (under 25 lbs)"},{"v":"dog_medium","l":"Medium Dog (25-60 lbs)"},{"v":"dog_large","l":"Large Dog (60+ lbs)"},{"v":"cat","l":"Indoor Cat"},{"v":"cat_outdoor","l":"Outdoor Cat"}]).map(o => (
                    <button key={o.v} onClick={() => setPetType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: petType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: petType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: petType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Veterinary Care Level</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"basic","l":"Basic (reactive only)"},{"v":"standard","l":"Standard (annual checkups)"},{"v":"premium","l":"Premium (preventive + dental)"}]).map(o => (
                    <button key={o.v} onClick={() => setVetPlan(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: vetPlan === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: vetPlan === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: vetPlan === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Pet Insurance</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"no","l":"No Insurance"},{"v":"yes","l":"With Pet Insurance"}]).map(o => (
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
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Pet Age (years)</label>
                  <span className="text-white font-bold text-sm">{`${petAge} yrs`}</span>
                </div>
                <input type="range" min={0} max={18} step={1}
                  value={petAge} onChange={e => setPetAge(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Pet Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Food Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.food)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Veterinary Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualVet)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Annual Grooming</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.groom)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Pet Insurance Annual Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.insuranceCost)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Annual Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Monthly Average Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyAvg)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Remaining Lifetime Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lifetimeCost)}
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

            <a href="/emergency-fund-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Emergency Fund</h3>
            </a>

            <a href="/baby-cost-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👶</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Baby Cost</h3>
            </a>

            <a href="/insurance-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Insurance</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much does a dog cost per year?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Annual dog ownership costs in 2026: food $600-$1,500, veterinary care $700-$2,000, grooming $0-$900, supplies $200-$400, pet insurance $400-$1,000, boarding or dog walking $500-$3,000. Total annual cost ranges from $1,500 for a basic small dog to $5,000+ for a large dog with premium care. Lifetime cost over 10-14 years: $15,000-$50,000+.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Is pet insurance worth it?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Pet insurance is worth it if: you want peace of mind for unexpected emergencies ($3,000-$10,000 surgeries), you have a breed prone to health issues (French Bulldogs, German Shepherds, Cavalier King Charles Spaniels), or you cannot afford a large unexpected vet bill. Alternative: self-insure by keeping $3,000-$5,000 in a dedicated pet emergency fund.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What are hidden costs of pet ownership?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Commonly overlooked costs: boarding or pet sitters when you travel ($30-$85/day), damage to furniture or belongings, pet deposits on rental apartments ($200-$500), flea, tick and heartworm prevention ($150-$300/year), dental cleanings under anesthesia ($500-$1,000 every 1-3 years), and end-of-life care including euthanasia and cremation ($200-$600).</p>
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
