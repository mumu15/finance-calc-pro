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
  const [totalBudget, setTotalBudget] = useState(30000)
  const [guestCount, setGuestCount] = useState(100)
  const [venuePct, setVenuePct] = useState(30)
  const [cateringPct, setCateringPct] = useState(32)
  const [photoPct, setPhotoPct] = useState(12)
  const [flowersPct, setFlowersPct] = useState(8)

  const result = useMemo(() => {
    try {
      const venue       = totalBudget * (venuePct / 100)
      const catering    = totalBudget * (cateringPct / 100)
      const photo       = totalBudget * (photoPct / 100)
      const flowers     = totalBudget * (flowersPct / 100)
      const allocated   = venue + catering + photo + flowers
      const remaining   = totalBudget - allocated
      const perGuest    = totalBudget / guestCount
      const cateringPerGuest = catering / guestCount
      const overBudget  = allocated > totalBudget ? 'Over budget - reduce percentages' : 'On track'
      return { venue, catering, photo, flowers, remaining, perGuest, cateringPerGuest, overBudget }
    } catch(e) { return null }
  }, [totalBudget, guestCount, venuePct, cateringPct, photoPct, flowersPct])

  const pdfRows = result ? [
    { label: "Venue Budget", value: result.venue !== undefined ? String(fmt(result.venue)) : "" },
    { label: "Catering Budget", value: result.catering !== undefined ? String(fmt(result.catering)) : "" },
    { label: "Photography and Video", value: result.photo !== undefined ? String(fmt(result.photo)) : "" },
    { label: "Flowers and Decor", value: result.flowers !== undefined ? String(fmt(result.flowers)) : "" },
    { label: "Remaining for Other Items", value: result.remaining !== undefined ? String(fmt(result.remaining)) : "" },
    { label: "Cost Per Guest", value: result.perGuest !== undefined ? String(fmt(result.perGuest)) : "" },
    { label: "Catering Cost Per Guest", value: result.cateringPerGuest !== undefined ? String(fmt(result.cateringPerGuest)) : "" },
    { label: "Budget Status", value: result.overBudget !== undefined ? String(result.overBudget) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💍</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Wedding Budget Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Plan your wedding budget with cost estimates for every category and stay on track.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Total Wedding Budget</label>
                  <span className="text-white font-bold text-sm">{fmt(totalBudget)}</span>
                </div>
                <input type="range" min={1000} max={200000} step={500}
                  value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Guests</label>
                  <span className="text-white font-bold text-sm">{`${guestCount} guests`}</span>
                </div>
                <input type="range" min={10} max={500} step={5}
                  value={guestCount} onChange={e => setGuestCount(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Venue Budget %</label>
                  <span className="text-white font-bold text-sm">{`${venuePct}%`}</span>
                </div>
                <input type="range" min={10} max={50} step={1}
                  value={venuePct} onChange={e => setVenuePct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Catering Budget %</label>
                  <span className="text-white font-bold text-sm">{`${cateringPct}%`}</span>
                </div>
                <input type="range" min={10} max={45} step={1}
                  value={cateringPct} onChange={e => setCateringPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Photography and Video %</label>
                  <span className="text-white font-bold text-sm">{`${photoPct}%`}</span>
                </div>
                <input type="range" min={5} max={20} step={1}
                  value={photoPct} onChange={e => setPhotoPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Flowers and Decor %</label>
                  <span className="text-white font-bold text-sm">{`${flowersPct}%`}</span>
                </div>
                <input type="range" min={2} max={20} step={1}
                  value={flowersPct} onChange={e => setFlowersPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Wedding Budget Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Venue Budget</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.venue)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Catering Budget</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.catering)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Photography and Video</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.photo)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Flowers and Decor</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.flowers)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Remaining for Other Items</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.remaining)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cost Per Guest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.perGuest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Catering Cost Per Guest</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.cateringPerGuest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Budget Status</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.overBudget}
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

            <a href="/personal-loan-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Personal Loan</h3>
            </a>

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/vacation-budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">✈️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Vacation Budget</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What is the average cost of a wedding in the US in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">The average US wedding in 2026 costs $30,000-$35,000 according to industry surveys, up from $28,000 in 2023. Costs vary enormously by location: weddings in NYC, San Francisco and Hawaii average $50,000-$80,000+, while Midwest and rural weddings average $15,000-$25,000. Guest count is the single biggest driver of total cost.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I stick to a wedding budget?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Set your budget before any planning decisions. Prioritize the 2-3 elements most important to you and cut everything else. Get 3 quotes for every vendor. Consider: Friday or Sunday weddings (20-30% cheaper), off-peak months (Jan-March, Nov), buffet vs plated service, limiting the bar to beer and wine, using seasonal flowers, and having a smaller wedding party.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What wedding costs are most often underestimated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Commonly underestimated costs: gratuities for vendors (typically 15-20% on top of contracted price), alterations and accessories ($500-$2,000), rehearsal dinner, day-of coordinator ($1,500-$3,500), marriage license and officiant fees, favors and welcome bags, hair and makeup for wedding party, and unexpected overtime fees if the event runs long.</p>
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
