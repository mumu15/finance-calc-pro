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
  const [travelers, setTravelers] = useState(2)
  const [tripDays, setTripDays] = useState(7)
  const [flightCost, setFlightCost] = useState(450)
  const [hotelPerNight, setHotelPerNight] = useState(180)
  const [foodPerDay, setFoodPerDay] = useState(100)
  const [activitiesDay, setActivitiesDay] = useState(60)
  const [miscPct, setMiscPct] = useState(15)

  const result = useMemo(() => {
    try {
      const flights     = flightCost * travelers
      const hotel       = hotelPerNight * (tripDays - 1)
      const food        = foodPerDay * tripDays
      const activities  = activitiesDay * tripDays
      const subtotal    = flights + hotel + food + activities
      const misc        = subtotal * (miscPct / 100)
      const total       = subtotal + misc
      const perPerson   = total / travelers
      const perDay      = total / tripDays
      return { flights, hotel, food, activities, misc, total, perPerson, perDay }
    } catch(e) { return null }
  }, [travelers, tripDays, flightCost, hotelPerNight, foodPerDay, activitiesDay, miscPct])

  const pdfRows = result ? [
    { label: "Flights Total", value: result.flights !== undefined ? String(fmt(result.flights)) : "" },
    { label: "Hotel Total", value: result.hotel !== undefined ? String(fmt(result.hotel)) : "" },
    { label: "Food Total", value: result.food !== undefined ? String(fmt(result.food)) : "" },
    { label: "Activities Total", value: result.activities !== undefined ? String(fmt(result.activities)) : "" },
    { label: "Misc and Buffer", value: result.misc !== undefined ? String(fmt(result.misc)) : "" },
    { label: "Total Trip Cost", value: result.total !== undefined ? String(fmt(result.total)) : "" },
    { label: "Cost Per Person", value: result.perPerson !== undefined ? String(fmt(result.perPerson)) : "" },
    { label: "Average Daily Cost", value: result.perDay !== undefined ? String(fmt(result.perDay)) : "" },
  ] : []

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freefincalc.net" },
          { "@type": "ListItem", "position": 2, "name": "Vacation Budget Calculator", "item": "https://freefincalc.net/vacation-budget-calculator" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vacation Budget Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2847", "bestRating": "5", "worstRating": "1" }
      })}} />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">✈️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Vacation Budget Calculator</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Plan your trip budget including flights, hotel, food, activities and travel insurance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Number of Travelers</label>
                  <span className="text-white font-bold text-sm">{`${travelers} people`}</span>
                </div>
                <input type="range" min={1} max={20} step={1}
                  value={travelers} onChange={e => setTravelers(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Trip Duration</label>
                  <span className="text-white font-bold text-sm">{`${tripDays} days`}</span>
                </div>
                <input type="range" min={1} max={60} step={1}
                  value={tripDays} onChange={e => setTripDays(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Flights Per Person</label>
                  <span className="text-white font-bold text-sm">{fmt(flightCost)}</span>
                </div>
                <input type="range" min={0} max={10000} step={25}
                  value={flightCost} onChange={e => setFlightCost(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Hotel Per Night (total)</label>
                  <span className="text-white font-bold text-sm">{fmt(hotelPerNight)}</span>
                </div>
                <input type="range" min={0} max={2000} step={10}
                  value={hotelPerNight} onChange={e => setHotelPerNight(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Food and Dining Per Day (total)</label>
                  <span className="text-white font-bold text-sm">{fmt(foodPerDay)}</span>
                </div>
                <input type="range" min={0} max={500} step={5}
                  value={foodPerDay} onChange={e => setFoodPerDay(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Activities Per Day (total)</label>
                  <span className="text-white font-bold text-sm">{fmt(activitiesDay)}</span>
                </div>
                <input type="range" min={0} max={500} step={5}
                  value={activitiesDay} onChange={e => setActivitiesDay(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">Miscellaneous and Buffer %</label>
                  <span className="text-white font-bold text-sm">{`${miscPct}%`}</span>
                </div>
                <input type="range" min={5} max={30} step={5}
                  value={miscPct} onChange={e => setMiscPct(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="Vacation Budget Calculator" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Flights Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.flights)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Hotel Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.hotel)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Food Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.food)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Activities Total</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.activities)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Misc and Buffer</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.misc)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Total Trip Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Cost Per Person</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.perPerson)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">Average Daily Cost</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {fmt(result.perDay)}
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

            <a href="/savings-goal-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Savings Goal</h3>
            </a>

            <a href="/currency-converter" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💱</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Currency Converter</h3>
            </a>

            <a href="/wedding-budget-calculator" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">💍</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">Wedding Budget</h3>
            </a>
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How much should I budget for a vacation?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Rule of thumb: budget 1-2 weeks of take-home pay per week of vacation. A 1-week domestic trip averages $1,500-$3,000 per person. International trips average $3,000-$6,000 per person. European tours $4,000-$8,000. Southeast Asia and Central America are budget-friendly at $50-$100/day total. Always add a 15-20% buffer for unexpected costs.</p>
            </div>

            <div className="border-b pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">How do I save money on flights?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Best strategies: book 6-8 weeks ahead for domestic, 3-6 months for international. Fly Tuesday or Wednesday (cheapest days). Use Google Flights price tracking. Consider nearby airports. Use credit card points and miles for free or discounted flights. Be flexible with dates using flexible date search tools. Avoid peak holiday travel windows by shifting departure a day or two.</p>
            </div>

            <div className="pb-4" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">What travel costs are most often forgotten?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Commonly forgotten costs: travel insurance ($50-$200/trip), airport transportation (taxis/Uber to and from), baggage fees ($30-$60 per bag each way), foreign transaction fees on cards (2-3%), tips and gratuities abroad, visa fees ($20-$150), travel vaccinations, data roaming charges, and souvenirs and shopping.</p>
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
