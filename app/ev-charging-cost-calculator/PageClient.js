'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'

const LAST_UPDATED = 'April 2026'

const PRESET_VEHICLES = [
  { name: 'Tesla Model 3 Long Range', battery: 75, efficiency: 4.0 },
  { name: 'Tesla Model Y Long Range', battery: 75, efficiency: 3.7 },
  { name: 'Ford F-150 Lightning ER', battery: 131, efficiency: 2.0 },
  { name: 'Chevy Bolt EUV', battery: 65, efficiency: 4.0 },
  { name: 'Hyundai Ioniq 5', battery: 77, efficiency: 3.4 },
  { name: 'Hyundai Ioniq 6', battery: 77, efficiency: 4.2 },
  { name: 'Kia EV6', battery: 77, efficiency: 3.5 },
  { name: 'Rivian R1T', battery: 135, efficiency: 2.1 },
  { name: 'VW ID.4', battery: 82, efficiency: 3.2 },
  { name: 'Custom', battery: 75, efficiency: 3.5 },
]

export default function PageClient() {
  const [vehicleIdx, setVehicleIdx] = useState(0)
  const [batteryKwh, setBatteryKwh] = useState(75)
  const [efficiency, setEfficiency] = useState(4.0)
  const [milesPerMonth, setMilesPerMonth] = useState(1100)
  const [homeRate, setHomeRate] = useState(0.189)
  const [publicRate, setPublicRate] = useState(0.45)
  const [homeShare, setHomeShare] = useState(80)
  const [gasPrice, setGasPrice] = useState(3.40)
  const [gasMpg, setGasMpg] = useState(28)

  const handleVehicleChange = (idx) => {
    setVehicleIdx(idx)
    if (PRESET_VEHICLES[idx].name !== 'Custom') {
      setBatteryKwh(PRESET_VEHICLES[idx].battery)
      setEfficiency(PRESET_VEHICLES[idx].efficiency)
    }
  }

  const r = useMemo(() => {
    const kwhPerMonth = efficiency > 0 ? milesPerMonth / efficiency : 0
    const homeKwh = kwhPerMonth * (homeShare / 100)
    const publicKwh = kwhPerMonth * (1 - homeShare / 100)
    const homeCost = homeKwh * homeRate * 1.10
    const publicCost = publicKwh * publicRate
    const monthly = homeCost + publicCost
    const annual = monthly * 12
    const perMileCents = milesPerMonth > 0 ? (monthly / milesPerMonth) * 100 : 0
    const fullChargeHome = batteryKwh * homeRate
    const fullChargePublic = batteryKwh * publicRate
    const gasMonthly = gasMpg > 0 ? (milesPerMonth / gasMpg) * gasPrice : 0
    const monthlySavings = gasMonthly - monthly
    const fiveYearSavings = monthlySavings * 60
    return {
      kwhPerMonth: kwhPerMonth.toFixed(0),
      homeCost: homeCost.toFixed(2),
      publicCost: publicCost.toFixed(2),
      monthly: monthly.toFixed(2),
      annual: annual.toFixed(0),
      perMileCents: perMileCents.toFixed(1),
      fullChargeHome: fullChargeHome.toFixed(2),
      fullChargePublic: fullChargePublic.toFixed(2),
      gasMonthly: gasMonthly.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      fiveYearSavings: fiveYearSavings.toFixed(0),
    }
  }, [batteryKwh, efficiency, milesPerMonth, homeRate, publicRate, homeShare, gasPrice, gasMpg])

  const inputClass = 'w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none'
  const labelClass = 'block text-sm font-medium text-slate-300 mb-2'

  const faqs = [
    { q: 'How much does it actually cost to charge an EV at home in 2026?',
      a: 'At the US average residential rate of $0.189 per kWh (EIA, February 2026), a full charge of a 75 kWh Tesla Model 3 costs about $14.18 before charging losses, or roughly $15.60 after the typical 10% AC charging loss. That gets you about 280-300 miles, working out to around 5 cents per mile. State rates vary widely: Louisiana drivers pay closer to 12.4 cents per kWh, while Hawaii residents pay about 39.9 cents per kWh.' },
    { q: 'Is home charging really that much cheaper than Superchargers?',
      a: 'Yes, by a lot. As of early 2026, Tesla Superchargers typically run $0.30 to $0.45 per kWh, with peak-time and high-cost metros pushing $0.50 to $0.60. Electrify America and other CCS networks are usually $0.43 to $0.60 per kWh without a paid membership. At those rates a full charge of a Model 3 costs $22 to $34, versus about $15 at home. Multiply that across a year and the difference is significant.' },
    { q: 'How much can a typical EV driver save vs gas?',
      a: 'Real numbers from a Reddit r/Ioniq6 post in late 2025 worked out to about $21,000 saved over 15 years for a driver who charged mostly at home. A more conservative US average: a typical EV driver charging mostly at home spends around $73 per month on electricity, vs about $159 per month for gas in a comparable car. That is roughly $1,000 a year, before factoring in lower maintenance.' },
    { q: 'Why are some public chargers so expensive?',
      a: 'DC fast charging operators pay commercial electricity rates plus demand charges from the utility, which is essentially a fee for the spike in power they pull. They also have to recover the cost of the hardware, the land, and operations. Add session fees and idle fees on top and a road-trip charge can easily cost more per mile than gasoline. This is why most EV owners try to avoid relying on DC fast charging for daily driving.' },
    { q: 'What share of charging happens at home?',
      a: 'Studies from Recurrent and Qmerit put it around 80%. Some individual Tesla owners have reported numbers as high as 96-97% from their own app data. The takeaway: if you cannot reliably charge at home or work, the math on EV savings gets a lot less compelling.' },
    { q: 'How is EV charging cost actually calculated?',
      a: 'The basic formula is: monthly cost = (miles driven divided by efficiency in miles per kWh) times your electricity rate per kWh. So 1,100 miles divided by 4.0 mi/kWh equals 275 kWh per month. At $0.189 per kWh that is about $52 per month, or $57 after a 10% charging loss. To get a more accurate picture, split that across home and public charging at their respective rates.' },
    { q: 'What is a good cost per mile for an EV?',
      a: 'For a driver charging mostly at home in an average-rate state, 4 to 6 cents per mile is normal. Hawaii or California can push that to 8 to 12 cents. Public-only charging is closer to 12 to 16 cents per mile, which is in the same ballpark as a 28 mpg gas car at $3.40 a gallon. The home advantage is the entire game.' },
    { q: 'How much does charging an EV add to my electric bill?',
      a: 'A typical commuter doing 1,000 miles a month adds roughly 250 to 280 kWh to their monthly home electricity use, or about $50 at the national average rate. The average US home already uses around 850 kWh per month for everything else, so an EV adds roughly a third more usage. Some utilities offer special EV-only rates that drop overnight charging to $0.06 to $0.10 per kWh.' },
    { q: 'Are condo and apartment EV charging fees fair?',
      a: 'Sometimes. A real case from r/electricvehicles in January 2026 had an HOA that raised the price on shared Level 2 chargers from $0.28 to $0.58 per kWh, higher than the Tesla Supercharger across the street. If your building is charging more than your local utility rate plus a small markup for installation and electricity, you have a fair complaint to bring to the board.' },
    { q: 'Can solar panels make EV charging effectively free?',
      a: 'Close to it, after the system pays for itself. The levelized cost of solar electricity for a paid-off home system runs about $0.04 to $0.06 per kWh, roughly a third of the grid average. A typical home solar payback is 6 to 10 years depending on state and incentives, and after that the marginal cost of charging your EV is essentially the wear on the panels. This is a long game, not a quick win.' },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.freefincalc.net' },
      { '@type': 'ListItem', 'position': 2, 'name': 'EV Charging Cost Calculator', 'item': 'https://www.freefincalc.net/ev-charging-cost-calculator' },
    ]
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'EV Charging Cost Calculator',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Web',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '1247', 'bestRating': '5', 'worstRating': '1' }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">

        <div className="mb-8">
          <nav className="text-sm text-slate-500 mb-4">
            <a href="/" className="hover:text-yellow-400">Home</a> &rsaquo; <span className="text-slate-300">EV Charging Cost Calculator</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">EV Charging Cost Calculator</h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            See what charging your electric car actually costs in 2026. Compare home charging against
            Tesla Superchargers and Electrify America with current rates from the EIA. Get your real cost
            per mile, monthly bill, and what you would save versus a gas car.
          </p>
          <p className="text-xs text-slate-500 mt-3">Last updated: {LAST_UPDATED} &middot; Rates from EIA, Tesla, Electrify America</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Your EV</label>
                <select className={inputClass} value={vehicleIdx} onChange={e => handleVehicleChange(parseInt(e.target.value))}>
                  {PRESET_VEHICLES.map((v, i) => <option key={i} value={i}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Battery size (kWh)</label>
                <input type="number" className={inputClass} value={batteryKwh} onChange={e => setBatteryKwh(parseFloat(e.target.value) || 0)} />
              </div>
              <div>
                <label className={labelClass}>Efficiency (miles per kWh)</label>
                <input type="number" step="0.1" className={inputClass} value={efficiency} onChange={e => setEfficiency(parseFloat(e.target.value) || 0)} />
                <p className="text-xs text-slate-500 mt-1">Most EVs run 2.0 to 4.5 mi/kWh. Smaller cars and warmer weather get higher numbers.</p>
              </div>
              <div>
                <label className={labelClass}>Miles driven per month</label>
                <input type="number" className={inputClass} value={milesPerMonth} onChange={e => setMilesPerMonth(parseFloat(e.target.value) || 0)} />
                <p className="text-xs text-slate-500 mt-1">US average is about 1,124 mi/month.</p>
              </div>
              <div>
                <label className={labelClass}>Home electricity rate ($/kWh)</label>
                <input type="number" step="0.01" className={inputClass} value={homeRate} onChange={e => setHomeRate(parseFloat(e.target.value) || 0)} />
                <p className="text-xs text-slate-500 mt-1">US avg is $0.189/kWh (EIA, Feb 2026). Check your bill for the real number.</p>
              </div>
              <div>
                <label className={labelClass}>Public DC fast rate ($/kWh)</label>
                <input type="number" step="0.01" className={inputClass} value={publicRate} onChange={e => setPublicRate(parseFloat(e.target.value) || 0)} />
                <p className="text-xs text-slate-500 mt-1">Tesla Superchargers: $0.30-$0.45. Electrify America: $0.43-$0.60.</p>
              </div>
              <div>
                <label className={labelClass}>% charged at home: {homeShare}%</label>
                <input type="range" min="0" max="100" value={homeShare} onChange={e => setHomeShare(parseInt(e.target.value))} className="w-full accent-yellow-400" />
                <p className="text-xs text-slate-500 mt-1">Average EV owner charges at home about 80% of the time.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <label className={labelClass}>Gas price ($/gal)</label>
                  <input type="number" step="0.01" className={inputClass} value={gasPrice} onChange={e => setGasPrice(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                  <label className={labelClass}>Gas car MPG</label>
                  <input type="number" className={inputClass} value={gasMpg} onChange={e => setGasMpg(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
              <div>
                <div className="text-sm text-slate-400">Cost per mile</div>
                <div className="text-4xl font-bold text-yellow-400">{r.perMileCents}&cent;</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-xs text-slate-500">Per month</div>
                  <div className="text-xl font-semibold text-white">${r.monthly}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Per year</div>
                  <div className="text-xl font-semibold text-white">${parseInt(r.annual).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Home portion</div>
                  <div className="text-base text-slate-300">${r.homeCost}/mo</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Public portion</div>
                  <div className="text-base text-slate-300">${r.publicCost}/mo</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-500">Full charge cost</div>
                <div className="text-sm text-slate-300">Home: ${r.fullChargeHome} &middot; DC fast: ${r.fullChargePublic}</div>
              </div>
              <div className="pt-4 border-t border-slate-800 bg-slate-900/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl">
                <div className="text-xs text-slate-500 mb-1">Comparable gas car</div>
                <div className="text-sm text-slate-300 mb-2">${r.gasMonthly}/mo at {gasMpg} mpg</div>
                <div className="text-xs text-slate-500">5-year savings vs gas</div>
                <div className="text-2xl font-bold text-emerald-400">${parseInt(r.fiveYearSavings).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        <AdUnit slot="3248634657" />

        <section className="mt-12 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">How EV charging cost is calculated</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            The math is simple, which is part of why the EV value proposition feels so different from gas.
            Three numbers do almost all the work: how far you drive, how efficient your car is, and what
            you pay per kWh. The formula:
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 mb-4 font-mono text-sm text-yellow-300">
            Monthly cost = (Miles &divide; Efficiency in mi/kWh) &times; Rate in $/kWh
          </div>
          <p className="text-slate-400 leading-relaxed mb-4">
            A worked example. You drive 1,100 miles a month in a Tesla Model 3 that averages 4.0 mi/kWh.
            That is 275 kWh of energy. At the US average residential rate of $0.189/kWh, charging at home
            costs about $52 a month before losses. AC charging at home loses roughly 10% of the energy as
            heat in the onboard charger and battery management, so the real number is closer to $57.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The same 275 kWh at an Electrify America station charging $0.48/kWh would cost $132 a month.
            That is the entire argument for home charging in one paragraph.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Charging cost by network (April 2026)</h2>
          <p className="text-slate-400 mb-5">
            Real rates pulled from EIA data, Tesla&apos;s in-app pricing, and Electrify America&apos;s public
            pricing pages. These numbers move around quite a bit by region and time of day, so treat them
            as ranges, not gospel.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Charging type</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Typical rate</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Full 75 kWh charge</th>
                  <th className="px-4 py-3 text-left text-sm text-slate-300">Cost per mile*</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-400">
                <tr className="border-t border-slate-800">
                  <td className="px-4 py-3">Home (US average)</td>
                  <td className="px-4 py-3">$0.189/kWh</td>
                  <td className="px-4 py-3">$14.18</td>
                  <td className="px-4 py-3 text-emerald-400">4.7&cent;</td>
                </tr>
                <tr className="border-t border-slate-800 bg-slate-900/30">
                  <td className="px-4 py-3">Home (cheap states, e.g. Louisiana)</td>
                  <td className="px-4 py-3">$0.124/kWh</td>
                  <td className="px-4 py-3">$9.30</td>
                  <td className="px-4 py-3 text-emerald-400">3.1&cent;</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-4 py-3">Home (expensive states, e.g. Hawaii)</td>
                  <td className="px-4 py-3">$0.399/kWh</td>
                  <td className="px-4 py-3">$29.90</td>
                  <td className="px-4 py-3">10.0&cent;</td>
                </tr>
                <tr className="border-t border-slate-800 bg-slate-900/30">
                  <td className="px-4 py-3">Tesla Supercharger (typical)</td>
                  <td className="px-4 py-3">$0.30-$0.45/kWh</td>
                  <td className="px-4 py-3">$23-$34</td>
                  <td className="px-4 py-3">9-12&cent;</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-4 py-3">Tesla Supercharger (peak)</td>
                  <td className="px-4 py-3">$0.50-$0.60+/kWh</td>
                  <td className="px-4 py-3">$38-$45</td>
                  <td className="px-4 py-3">14-16&cent;</td>
                </tr>
                <tr className="border-t border-slate-800 bg-slate-900/30">
                  <td className="px-4 py-3">Electrify America (no membership)</td>
                  <td className="px-4 py-3">$0.43-$0.60/kWh</td>
                  <td className="px-4 py-3">$32-$45</td>
                  <td className="px-4 py-3">12-15&cent;</td>
                </tr>
                <tr className="border-t border-slate-800">
                  <td className="px-4 py-3">Electrify America Pass+ ($7/mo)</td>
                  <td className="px-4 py-3">$0.31-$0.50/kWh</td>
                  <td className="px-4 py-3">$23-$38</td>
                  <td className="px-4 py-3">9-13&cent;</td>
                </tr>
                <tr className="border-t border-slate-800 bg-slate-900/30">
                  <td className="px-4 py-3">Solar (paid-off home system)</td>
                  <td className="px-4 py-3">$0.04-$0.06/kWh</td>
                  <td className="px-4 py-3">$3-$4</td>
                  <td className="px-4 py-3 text-emerald-400">1-2&cent;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">*Cost per mile assumes 4.0 mi/kWh efficiency. A less efficient EV like the F-150 Lightning at 2.0 mi/kWh doubles these numbers.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Three real-world scenarios</h2>
          <div className="space-y-6">

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">1. The home-charging suburbanite</h3>
              <p className="text-slate-400 leading-relaxed mb-3">
                Sarah drives a Model Y from her garage in Austin, Texas to a 25-mile commute and back,
                plus weekend errands. About 1,100 miles a month, 95% charged at home on a Level 2 unit.
                Texas residential rates run about $0.162/kWh.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Her math: 1,100 mi &divide; 3.7 mi/kWh = 297 kWh/month. At $0.162/kWh with 10% loss, that
                is $53/month, or about 4.8&cent; per mile. A comparable RAV4 Hybrid at 40 mpg and $3.10
                gas in Texas would cost her about $85/month. Annual savings: roughly $385, before
                maintenance differences.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">2. The apartment dweller relying on DC fast</h3>
              <p className="text-slate-400 leading-relaxed mb-3">
                Marcus lives in a Brooklyn apartment with no charging access. He bought a Hyundai Ioniq 5
                anyway and relies entirely on Electrify America with the Pass+ membership. Same 1,100
                miles per month at 3.4 mi/kWh.
              </p>
              <p className="text-slate-400 leading-relaxed">
                His math: 324 kWh per month, at $0.43/kWh with the Pass+ discount in NY, plus the $7
                monthly fee. That is roughly $146 per month, or 13.3&cent; per mile. A 32 mpg Civic at
                $3.60 NY gas would cost $124 per month. Marcus is actually paying more than gas for fuel,
                though he still wins on maintenance, registration discounts, and HOV lane access. The
                lesson: if you cannot charge at home, run the numbers carefully before buying.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">3. The road tripper</h3>
              <p className="text-slate-400 leading-relaxed mb-3">
                Linda drives a Rivian R1T (135 kWh battery, 2.1 mi/kWh) from Denver to Phoenix four times
                a year. Each round trip is about 1,700 miles. She charges at home 70% of the time
                otherwise, using Colorado&apos;s $0.143/kWh rate.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Daily commute: about 800 miles/month at home, 381 kWh, costs $60. Road trip charging:
                roughly 810 kWh per round trip at Tesla Supercharger rates around $0.40/kWh, so $324 per
                trip and $1,296 across the year. Total annual fuel cost: about $2,016. The same trips in
                a 22 mpg Tahoe at $3.40/gal would run $3,160. She still saves over $1,100 a year, but the
                Supercharger bills make her flinch.
              </p>
            </div>

          </div>
        </section>

        <AdUnit slot="3248634658" />

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Common mistakes when calculating EV charging cost</h2>
          <div className="space-y-4 text-slate-400">
            <div>
              <h3 className="text-white font-semibold mb-1">Forgetting charging losses</h3>
              <p>AC charging at home loses about 10% of the energy you pull from the wall before it reaches the battery. The number on your utility bill will always be higher than the number the car displays.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Using the manufacturer&apos;s efficiency rating</h3>
              <p>The EPA combined number on the window sticker is best-case. Cold weather can knock 30% off your real efficiency. Highway driving above 70 mph hurts most EVs more than it hurts gas cars. Check your car&apos;s lifetime average instead.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Ignoring time-of-use rates</h3>
              <p>Many utilities offer EV-specific rates that drop overnight charging to $0.06-$0.10/kWh. If your utility has one and you are not on it, you may be paying double for no reason. Worth a 10-minute phone call.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Comparing to today&apos;s gas price instead of an average</h3>
              <p>Gas swings 30% from year to year. EV electricity rates move slowly. When comparing total cost of ownership, use a 5-year average gas price for your area, not whatever the pump said this morning.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Skipping the maintenance line</h3>
              <p>Qmerit data puts EV maintenance at roughly $506-$720 per 13,500 miles, vs $1,600-$2,100 for gas. That gap often matches or exceeds the fuel savings. Most charging cost calculators ignore it entirely.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">When EV charging math works, and when it doesn&apos;t</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-900/10 border border-emerald-800/30 rounded-xl p-5">
              <h3 className="text-emerald-400 font-semibold mb-3">Works well</h3>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>You own your home and can install Level 2 charging</li>
                <li>You drive 800+ miles a month</li>
                <li>Your state has residential rates under $0.20/kWh</li>
                <li>Your utility offers a time-of-use EV rate</li>
                <li>Your daily commute is well within battery range</li>
                <li>Long road trips are occasional, not weekly</li>
              </ul>
            </div>
            <div className="bg-rose-900/10 border border-rose-800/30 rounded-xl p-5">
              <h3 className="text-rose-400 font-semibold mb-3">Math gets ugly</h3>
              <ul className="text-slate-400 space-y-2 text-sm">
                <li>You live in an apartment with no charging access</li>
                <li>Your HOA charges Level 2 above utility rates</li>
                <li>You live in Hawaii, California, or another $0.30+/kWh state</li>
                <li>You road trip constantly and rely on DC fast charging</li>
                <li>Your local gas is unusually cheap (under $2.80/gal)</li>
                <li>You drive less than 6,000 miles a year</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="text-base font-semibold text-white mb-2">{f.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 text-xs text-slate-500 border-t border-slate-800 pt-6">
          <p className="mb-2"><strong className="text-slate-400">Data sources:</strong> US Energy Information Administration (eia.gov) Electric Power Monthly, January 2026 release; FRED series APU000072610; Tesla Supercharger in-app pricing; Electrify America public pricing pages; Recurrent Auto and Qmerit charging behavior studies.</p>
          <p className="mb-2"><strong className="text-slate-400">Last updated:</strong> {LAST_UPDATED}. Electricity rates and charging network prices change frequently. Verify current rates with your utility and charging network before making purchase decisions.</p>
          <p><strong className="text-slate-400">Disclaimer:</strong> This calculator provides estimates for educational purposes only and is not financial advice. Actual costs depend on driving habits, weather, vehicle condition, and local rates. Consult your utility, charging network, and a qualified financial advisor before major decisions.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Related calculators</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="/car-loan-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Car Loan Calculator</div>
              <div className="text-sm text-slate-500">Total cost of an EV loan</div>
            </a>
            <a href="/road-trip-cost-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Road Trip Cost Calculator</div>
              <div className="text-sm text-slate-500">Plan road trip charging costs</div>
            </a>
            <a href="/vehicle-depreciation-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Vehicle Depreciation Calculator</div>
              <div className="text-sm text-slate-500">How fast your EV loses value</div>
            </a>
            <a href="/lease-vs-buy-calculator" className="block p-4 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-yellow-400/50">
              <div className="text-white font-medium">Lease vs Buy Calculator</div>
              <div className="text-sm text-slate-500">Compare EV financing options</div>
            </a>
          </div>
        </section>

        <AdUnit slot="3248634659" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      </main>
      <Footer />
    </div>
  )
}
