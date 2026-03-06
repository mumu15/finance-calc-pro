'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [moveType, setMoveType] = useState('local')
  const [homeSize, setHomeSize] = useState('2br')
  const [movingHelp, setMovingHelp] = useState('fullservice')
  const [extraServices, setExtraServices] = useState(500)

  const result = useMemo(() => {
    try {
      const baseCosts = {
        local:    { studio: 400,  br2: 900,   br4: 1500  },
        instate:  { studio: 900,  br2: 2000,  br4: 3500  },
        longdist: { studio: 1500, br2: 4000,  br4: 8000  },
      }
      const helpMultiplier = { diy: 0.4, hybrid: 0.7, fullservice: 1.0 }
      const sizeKey = homeSize === 'studio' ? 'studio' : homeSize === '2br' ? 'br2' : 'br4'
      const base = baseCosts[moveType][sizeKey] * helpMultiplier[movingHelp]
      const packing    = homeSize === 'studio' ? 150 : homeSize === '2br' ? 300 : 600
      const insurance  = base * 0.05
      const tips       = movingHelp !== 'diy' ? (homeSize === 'studio' ? 50 : homeSize === '2br' ? 100 : 200) : 0
      const total      = base + packing + insurance + tips + extraServices
      const lowEstimate  = total * 0.8
      const highEstimate = total * 1.3
      return { base, packing, total, lowEstimate, highEstimate, insurance }
    } catch(e) { return null }
  }, [moveType, homeSize, movingHelp, extraServices])

  const pdfRows = result ? [
    { label: "Base Moving Cost", value: result.base !== undefined ? String(fmt(result.base)) : "" },
    { label: "Packing Materials", value: result.packing !== undefined ? String(fmt(result.packing)) : "" },
    { label: "Moving Insurance", value: result.insurance !== undefined ? String(fmt(result.insurance)) : "" },
    { label: "Total Estimated Cost", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Low Estimate", value: result.lowEstimate !== undefined ? String(fmt(result.lowEstimate)) : "" },
    { label: "High Estimate", value: result.highEstimate !== undefined ? String(fmt(result.highEstimate)) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📦</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Moving Cost Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate the total cost of moving including movers, truck rental, packing and travel.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <label className="text-slate-400 text-sm block mb-2">Move Type</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"local","l":"Local (under 50 mi)"},{"v":"instate","l":"In-State (50-500 mi)"},{"v":"longdist","l":"Long Distance (500+ mi)"}]).map(o => (
                    <button key={o.v} onClick={() => setMoveType(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: moveType === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: moveType === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: moveType === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Home Size</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"studio","l":"Studio/1BR"},{"v":"2br","l":"2-3 Bedroom"},{"v":"4br","l":"4+ Bedroom / House"}]).map(o => (
                    <button key={o.v} onClick={() => setHomeSize(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: homeSize === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: homeSize === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: homeSize === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Moving Help</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":"diy","l":"DIY (truck rental)"},{"v":"hybrid","l":"Hybrid (labor only)"},{"v":"fullservice","l":"Full Service Movers"}]).map(o => (
                    <button key={o.v} onClick={() => setMovingHelp(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: movingHelp === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: movingHelp === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: movingHelp === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Extra Services Budget</label>
                  <span className="text-white font-bold text-sm">{fmt(extraServices)}</span>
                </div>
                <input type="range" min={0} max={5000} step={100}
                  value={extraServices} onChange={e => setExtraServices(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Moving Cost Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Base Moving Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.base)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Packing Materials</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.packing)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Moving Insurance</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.insurance)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Estimated Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Low Estimate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.lowEstimate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">High Estimate</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.highEstimate)}
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

            <a href="/cost-of-living-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌆</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Cost of Living</h3>
            </a>

            <a href="/budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Budget Calculator</h3>
            </a>

            <a href="/rent-vs-buy-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏘️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Rent vs Buy</h3>
            </a>

            <a href="/home-affordability-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏡</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Home Affordability</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much does it cost to move in 2026?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Average moving costs: local move $800-$2,500, in-state $1,500-$5,000, long-distance $3,000-$10,000+. Full-service movers cost 2-3x more than DIY truck rental. A 2-bedroom local move with movers averages $1,200-$1,800. Long-distance full-service for a 3-bedroom house averages $5,000-$10,000.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Should I hire movers or do it myself?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">DIY with a rented truck saves 50-60% but requires significant physical effort and time. Consider hiring movers if you have: many heavy items (furniture, appliances), a third floor or no elevator, a long distance move, limited time or help, or items of high value. The time and physical cost of DIY often outweighs the savings.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What moving costs are tax deductible?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Moving expenses are no longer deductible for most Americans after the 2017 Tax Cuts and Jobs Act. The exception is active-duty military members who move due to orders. Some states still allow moving expense deductions. Employer moving reimbursements are generally taxable income to the employee.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
