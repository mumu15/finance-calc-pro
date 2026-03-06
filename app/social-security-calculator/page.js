'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
  const [currentAge, setCurrentAge] = useState(55)
  const [birthYear, setBirthYear] = useState(1970)
  const [avgEarnings, setAvgEarnings] = useState(70000)
  const [claimAge, setClaimAge] = useState(67)
  const [yearsWorked, setYearsWorked] = useState(30)

  const result = useMemo(() => {
    try {
      // Simplified PIA estimate based on AIME
      const aime = Math.min(avgEarnings, 160200) / 12
      // 2026 bend points approximation
      const pia = aime <= 1115 ? aime * 0.90
                : aime <= 6721 ? 1115 * 0.90 + (aime - 1115) * 0.32
                : 1115 * 0.90 + (6721 - 1115) * 0.32 + (aime - 6721) * 0.15
      const fra = birthYear >= 1960 ? 67 : birthYear >= 1955 ? 66.5 : 66
      let monthlyBenefit = pia
      const diff = claimAge - fra
      if (diff < 0) {
        const reductionPct = Math.abs(diff) <= 3 ? Math.abs(diff) * 12 * (5/9/100) : (3 * 12 * (5/9/100)) + ((Math.abs(diff)-3) * 12 * (5/12/100))
        monthlyBenefit = pia * (1 - reductionPct)
      } else if (diff > 0) {
        monthlyBenefit = pia * (1 + diff * 0.08)
      }
      const workAdj     = Math.min(1, yearsWorked / 35)
      monthlyBenefit    = monthlyBenefit * workAdj
      const annualBenefit = monthlyBenefit * 12
      const lifetimeAt62 = monthlyBenefit * (claimAge === 62 ? 1 : 1) * 12 * (85 - Number(claimAge))
      const breakEvenVs62 = claimAge > 62 ?
        Math.round((monthlyBenefit - pia * workAdj * 0.7) > 0
          ? (pia * workAdj * 0.7 * 12 * (claimAge - 62)) / ((monthlyBenefit - pia * workAdj * 0.7) * 12) + claimAge
          : 999) : 62
      return {
        monthlyBenefit: Math.round(monthlyBenefit),
        annualBenefit:  Math.round(annualBenefit),
        fra:            fra + ' years old',
        breakEven:      breakEvenVs62 < 99 ? 'Age ' + breakEvenVs62 : 'N/A'
      }
    } catch(e) { return null }
  }, [currentAge, birthYear, avgEarnings, claimAge, yearsWorked])

  const pdfRows = result ? [
    { label: "Estimated Monthly Benefit", value: result.monthlyBenefit !== undefined ? String(fmt(result.monthlyBenefit)) : "" },
    { label: "Estimated Annual Benefit", value: result.annualBenefit !== undefined ? String(fmt(result.annualBenefit)) : "" },
    { label: "Your Full Retirement Age (FRA)", value: result.fra !== undefined ? String(result.fra) : "" },
    { label: "Break-Even vs Claiming at 62", value: result.breakEven !== undefined ? String(result.breakEven) : "" },
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Social Security Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Estimate your monthly Social Security benefit at different claiming ages.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Current Age</label>
                  <span className="text-white font-bold text-sm">{`${currentAge} yrs`}</span>
                </div>
                <input type="range" min={30} max={61} step={1}
                  value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Birth Year</label>
                  <span className="text-white font-bold text-sm">{birthYear}</span>
                </div>
                <input type="range" min={1950} max={1994} step={1}
                  value={birthYear} onChange={e => setBirthYear(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Average Annual Earnings</label>
                  <span className="text-white font-bold text-sm">{fmt(avgEarnings)}</span>
                </div>
                <input type="range" min={10000} max={300000} step={1000}
                  value={avgEarnings} onChange={e => setAvgEarnings(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Planned Claiming Age</label>
                <div className="flex flex-wrap gap-2">
                  {([{"v":62,"l":"62 (early)"},{"v":65,"l":"65"},{"v":67,"l":"67 (full)"},{"v":70,"l":"70 (max)"}]).map(o => (
                    <button key={o.v} onClick={() => setClaimAge(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: claimAge === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: claimAge === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: claimAge === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Years of Work History</label>
                  <span className="text-white font-bold text-sm">{`${yearsWorked} yrs`}</span>
                </div>
                <input type="range" min={10} max={40} step={1}
                  value={yearsWorked} onChange={e => setYearsWorked(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Social Security Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Monthly Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.monthlyBenefit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Estimated Annual Benefit</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.annualBenefit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Your Full Retirement Age (FRA)</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.fra}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Break-Even vs Claiming at 62</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {result.breakEven}
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

            <a href="/retirement-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🌅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Retirement</h3>
            </a>

            <a href="/pension-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Pension</h3>
            </a>

            <a href="/rmd-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">RMD Calculator</h3>
            </a>

            <a href="/annuity-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Annuity</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">When should I claim Social Security?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Claiming at 62 gives you more total years of payments but a permanently reduced benefit (up to 30% less than FRA). Waiting until 70 gives the maximum monthly benefit (32% more than FRA for those born after 1943). The break-even age is typically 78-82. If you are healthy and have other income sources, delaying usually pays off significantly.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How is Social Security calculated?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Social Security benefits are based on your highest 35 years of earnings, indexed for inflation, then converted to your Average Indexed Monthly Earnings (AIME). The Primary Insurance Amount (PIA) is calculated using a progressive bend-point formula that replaces a higher percentage of lower earners. Working more than 35 years replaces lower-earning years, boosting your benefit.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">Can I work while receiving Social Security?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Before FRA: if under FRA for the full year, benefits are reduced $1 for every $2 earned above $22,320 (2024). In the year you reach FRA: reduced $1 for every $3 above $59,520. After FRA: no earnings limit — you can earn any amount with no benefit reduction. Withheld benefits are added back to your payment after you reach FRA.</p>
            </div>
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
