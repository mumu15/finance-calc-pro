/**
 * FreeFinCalc.net — STAGE 8 FINAL: 5 Life Event Calculators + SEO Files
 * Run from project root: node stage8_final.js
 *
 *  1. wedding-budget-calculator
 *  2. vacation-budget-calculator
 *  3. baby-cost-calculator
 *  4. pet-cost-calculator
 *  5. home-buying-cost-calculator
 *  6. sitemap.xml  (app/sitemap.js)
 *  7. robots.txt   (app/robots.js)
 *  8. JSON-LD structured data upgrade (app/layout.js patch)
 *
 * CLEAN CODE RULES:
 * - Zero apostrophes in any string or JSX text
 * - All pdfRows labels in double quotes only
 * - String useState defaults: useState('value')
 * - No font family strings with embedded quotes
 * - No export const metadata in client components
 */

const fs = require('fs')

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1) }

function write(dir, content) {
  fs.mkdirSync('app/' + dir, { recursive: true })
  fs.writeFileSync('app/' + dir + '/page.js', content, 'utf8')
  console.log('✅ app/' + dir)
}

function page(title, desc, icon, inputs, formula, results, faqs, related) {
  const states = inputs.map(f => {
    const def = typeof f.def === 'string' ? `'${f.def}'` : f.def
    return `  const [${f.s}, set${cap(f.s)}] = useState(${def})`
  }).join('\n')

  const deps = inputs.map(f => f.s).join(', ')

  const inputsJSX = inputs.map(f => {
    if (f.type === 'range') {
      let disp
      if (f.cur)      disp = `fmt(${f.s})`
      else if (f.pct) disp = `\`\${${f.s}}%\``
      else if (f.sfx) disp = `\`\${${f.s}}${f.sfx}\``
      else            disp = f.s
      return `
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-sm">${f.label}</label>
                  <span className="text-white font-bold text-sm">{${disp}}</span>
                </div>
                <input type="range" min={${f.min}} max={${f.max}} step={${f.step}}
                  value={${f.s}} onChange={e => set${cap(f.s)}(Number(e.target.value))}
                  className="w-full accent-yellow-400" />
              </div>`
    }
    if (f.type === 'select') {
      return `
              <div>
                <label className="text-slate-400 text-sm block mb-2">${f.label}</label>
                <div className="flex flex-wrap gap-2">
                  {(${JSON.stringify(f.opts)}).map(o => (
                    <button key={o.v} onClick={() => set${cap(f.s)}(o.v)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: ${f.s} === o.v ? 'rgba(240,200,66,0.2)' : 'rgba(255,255,255,0.05)',
                        border: ${f.s} === o.v ? '1px solid rgba(240,200,66,0.5)' : '1px solid rgba(255,255,255,0.08)',
                        color: ${f.s} === o.v ? '#f0c842' : '#64748b'
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>`
    }
    return ''
  }).join('\n')

  const resultsJSX = results.map(r => `
                  <div className="flex justify-between items-center p-3 rounded-xl"
                    style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span className="text-slate-400 text-sm">${r.label}</span>
                    <span className="font-bold" style={{color:'#f0c842'}}>
                      {${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}}
                    </span>
                  </div>`).join('\n')

  const pdfRows = results.map(r =>
    `    { label: "${r.label}", value: result.${r.k} !== undefined ? String(${r.cur ? `fmt(result.${r.k})` : `result.${r.k}`}) : "" },`
  ).join('\n')

  const relatedJSX = related.map(r => `
            <a href="${r.href}" className="result-box group hover:-translate-y-1 transition-all duration-300 block">
              <div className="text-2xl mb-2">${r.icon}</div>
              <h3 className="text-white font-bold text-xs group-hover:text-yellow-400 transition-colors">${r.name}</h3>
            </a>`).join('\n')

  const faqsJSX = faqs.map((f, i) => `
            <div className="${i < faqs.length - 1 ? 'border-b pb-4' : 'pb-4'}" style={{borderColor:'rgba(240,200,66,0.1)'}}>
              <h3 className="text-white font-semibold mb-2">${f.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">${f.a}</p>
            </div>`).join('\n')

  return `'use client'
import { useState, useMemo } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TrustSection from '../../components/TrustSection'
import PdfDownload from '../../components/PdfDownload'
import { useCurrency } from '../../components/CurrencyContext'

export default function Calculator() {
  const { fmt } = useCurrency()
${states}

  const result = useMemo(() => {
    try {
${formula}
    } catch(e) { return null }
  }, [${deps}])

  const pdfRows = result ? [
${pdfRows}
  ] : []

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div className="text-5xl mb-4">${icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">${title}</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">${desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="result-box">
            <h2 className="text-white font-bold text-lg mb-5">Enter Details</h2>
            <div className="space-y-5">
${inputsJSX}
            </div>
          </div>

          <div className="space-y-4">
            <div className="result-box">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold text-lg">Results</h2>
                {result && <PdfDownload title="${title}" rows={pdfRows} />}
              </div>
              {result ? (
                <div className="space-y-3">
${resultsJSX}
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
${relatedJSX}
          </div>
        </div>

        <div className="result-box mb-12">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
${faqsJSX}
          </div>
        </div>

      </main>
      <TrustSection />
      <Footer />
    </>
  )
}
`
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Wedding Budget Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('wedding-budget-calculator', page(
  'Wedding Budget Calculator',
  'Plan your wedding budget with cost estimates for every category and stay on track.',
  '💍',
  [
    { s:'totalBudget',   label:'Total Wedding Budget',        type:'range', min:1000,  max:200000, step:500,  cur:true, def:30000 },
    { s:'guestCount',    label:'Number of Guests',            type:'range', min:10,    max:500,    step:5,    sfx:' guests', def:100 },
    { s:'venuePct',      label:'Venue Budget %',              type:'range', min:10,    max:50,     step:1,    pct:true, def:30    },
    { s:'cateringPct',   label:'Catering Budget %',           type:'range', min:10,    max:45,     step:1,    pct:true, def:32    },
    { s:'photoPct',      label:'Photography and Video %',     type:'range', min:5,     max:20,     step:1,    pct:true, def:12    },
    { s:'flowersPct',    label:'Flowers and Decor %',         type:'range', min:2,     max:20,     step:1,    pct:true, def:8     },
  ],
  `      const venue       = totalBudget * (venuePct / 100)
      const catering    = totalBudget * (cateringPct / 100)
      const photo       = totalBudget * (photoPct / 100)
      const flowers     = totalBudget * (flowersPct / 100)
      const allocated   = venue + catering + photo + flowers
      const remaining   = totalBudget - allocated
      const perGuest    = totalBudget / guestCount
      const cateringPerGuest = catering / guestCount
      const overBudget  = allocated > totalBudget ? 'Over budget - reduce percentages' : 'On track'
      return { venue, catering, photo, flowers, remaining, perGuest, cateringPerGuest, overBudget }`,
  [
    { label:'Venue Budget',              k:'venue',           cur:true  },
    { label:'Catering Budget',           k:'catering',        cur:true  },
    { label:'Photography and Video',     k:'photo',           cur:true  },
    { label:'Flowers and Decor',         k:'flowers',         cur:true  },
    { label:'Remaining for Other Items', k:'remaining',       cur:true  },
    { label:'Cost Per Guest',            k:'perGuest',        cur:true  },
    { label:'Catering Cost Per Guest',   k:'cateringPerGuest',cur:true  },
    { label:'Budget Status',             k:'overBudget',      cur:false },
  ],
  [
    { q:'What is the average cost of a wedding in the US in 2026?', a:'The average US wedding in 2026 costs $30,000-$35,000 according to industry surveys, up from $28,000 in 2023. Costs vary enormously by location: weddings in NYC, San Francisco and Hawaii average $50,000-$80,000+, while Midwest and rural weddings average $15,000-$25,000. Guest count is the single biggest driver of total cost.' },
    { q:'How do I stick to a wedding budget?', a:'Set your budget before any planning decisions. Prioritize the 2-3 elements most important to you and cut everything else. Get 3 quotes for every vendor. Consider: Friday or Sunday weddings (20-30% cheaper), off-peak months (Jan-March, Nov), buffet vs plated service, limiting the bar to beer and wine, using seasonal flowers, and having a smaller wedding party.' },
    { q:'What wedding costs are most often underestimated?', a:'Commonly underestimated costs: gratuities for vendors (typically 15-20% on top of contracted price), alterations and accessories ($500-$2,000), rehearsal dinner, day-of coordinator ($1,500-$3,500), marriage license and officiant fees, favors and welcome bags, hair and makeup for wedding party, and unexpected overtime fees if the event runs long.' },
  ],
  [
    { href:'/budget-planner-calculator',  icon:'📋', name:'Budget Planner'    },
    { href:'/personal-loan-calculator',   icon:'👤', name:'Personal Loan'     },
    { href:'/savings-goal-calculator',    icon:'🎯', name:'Savings Goal'      },
    { href:'/vacation-budget-calculator', icon:'✈️', name:'Vacation Budget'   },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 2. Vacation Budget Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('vacation-budget-calculator', page(
  'Vacation Budget Calculator',
  'Plan your trip budget including flights, hotel, food, activities and travel insurance.',
  '✈️',
  [
    { s:'travelers',     label:'Number of Travelers',         type:'range', min:1,    max:20,     step:1,    sfx:' people', def:2  },
    { s:'tripDays',      label:'Trip Duration',               type:'range', min:1,    max:60,     step:1,    sfx:' days', def:7    },
    { s:'flightCost',    label:'Flights Per Person',          type:'range', min:0,    max:10000,  step:25,   cur:true, def:450    },
    { s:'hotelPerNight', label:'Hotel Per Night (total)',     type:'range', min:0,    max:2000,   step:10,   cur:true, def:180    },
    { s:'foodPerDay',    label:'Food and Dining Per Day (total)', type:'range', min:0, max:500,   step:5,    cur:true, def:100    },
    { s:'activitiesDay', label:'Activities Per Day (total)',  type:'range', min:0,    max:500,    step:5,    cur:true, def:60     },
    { s:'miscPct',       label:'Miscellaneous and Buffer %',  type:'range', min:5,    max:30,     step:5,    pct:true, def:15     },
  ],
  `      const flights     = flightCost * travelers
      const hotel       = hotelPerNight * (tripDays - 1)
      const food        = foodPerDay * tripDays
      const activities  = activitiesDay * tripDays
      const subtotal    = flights + hotel + food + activities
      const misc        = subtotal * (miscPct / 100)
      const total       = subtotal + misc
      const perPerson   = total / travelers
      const perDay      = total / tripDays
      return { flights, hotel, food, activities, misc, total, perPerson, perDay }`,
  [
    { label:'Flights Total',             k:'flights',    cur:true },
    { label:'Hotel Total',               k:'hotel',      cur:true },
    { label:'Food Total',                k:'food',       cur:true },
    { label:'Activities Total',          k:'activities', cur:true },
    { label:'Misc and Buffer',           k:'misc',       cur:true },
    { label:'Total Trip Cost',           k:'total',      cur:true },
    { label:'Cost Per Person',           k:'perPerson',  cur:true },
    { label:'Average Daily Cost',        k:'perDay',     cur:true },
  ],
  [
    { q:'How much should I budget for a vacation?', a:'Rule of thumb: budget 1-2 weeks of take-home pay per week of vacation. A 1-week domestic trip averages $1,500-$3,000 per person. International trips average $3,000-$6,000 per person. European tours $4,000-$8,000. Southeast Asia and Central America are budget-friendly at $50-$100/day total. Always add a 15-20% buffer for unexpected costs.' },
    { q:'How do I save money on flights?', a:'Best strategies: book 6-8 weeks ahead for domestic, 3-6 months for international. Fly Tuesday or Wednesday (cheapest days). Use Google Flights price tracking. Consider nearby airports. Use credit card points and miles for free or discounted flights. Be flexible with dates using flexible date search tools. Avoid peak holiday travel windows by shifting departure a day or two.' },
    { q:'What travel costs are most often forgotten?', a:'Commonly forgotten costs: travel insurance ($50-$200/trip), airport transportation (taxis/Uber to and from), baggage fees ($30-$60 per bag each way), foreign transaction fees on cards (2-3%), tips and gratuities abroad, visa fees ($20-$150), travel vaccinations, data roaming charges, and souvenirs and shopping.' },
  ],
  [
    { href:'/budget-planner-calculator',  icon:'📋', name:'Budget Planner'   },
    { href:'/savings-goal-calculator',    icon:'🎯', name:'Savings Goal'     },
    { href:'/currency-converter',         icon:'💱', name:'Currency Converter'},
    { href:'/wedding-budget-calculator',  icon:'💍', name:'Wedding Budget'   },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 3. Baby Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('baby-cost-calculator', page(
  'Baby Cost Calculator',
  'Estimate the first-year cost of having a baby including delivery, childcare and essentials.',
  '👶',
  [
    { s:'deliveryType',  label:'Delivery Type',               type:'select', def:'vaginal', opts:[{v:'vaginal',l:'Vaginal Birth'},{v:'csection',l:'C-Section'},{v:'midwife',l:'Birth Center / Midwife'}] },
    { s:'insurance',     label:'Insurance Coverage',          type:'select', def:'good', opts:[{v:'none',l:'No Insurance'},{v:'basic',l:'Basic Insurance'},{v:'good',l:'Good Insurance'},{v:'great',l:'Excellent Coverage'}] },
    { s:'childcareType', label:'Childcare Plan',              type:'select', def:'daycare', opts:[{v:'home',l:'Stay-at-Home Parent'},{v:'family',l:'Family Help (free)'},{v:'daycare',l:'Daycare Center'},{v:'nanny',l:'Full-Time Nanny'}] },
    { s:'formula',       label:'Feeding Method',              type:'select', def:'combo', opts:[{v:'breast',l:'Breastfeeding Only'},{v:'formula',l:'Formula Only'},{v:'combo',l:'Combination'}] },
  ],
  `      const deliveryCost = { vaginal: 15000, csection: 25000, midwife: 5000 }[deliveryType]
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
      return { outOfPocket, childcareCost, formulaCost, gear, clothing, medical, firstYearTotal, monthlyAvg }`,
  [
    { label:'Birth and Delivery Cost',   k:'outOfPocket',   cur:true },
    { label:'Annual Childcare Cost',     k:'childcareCost', cur:true },
    { label:'Formula and Feeding Cost',  k:'formulaCost',   cur:true },
    { label:'Gear and Equipment',        k:'gear',          cur:true },
    { label:'Clothing (first year)',     k:'clothing',      cur:true },
    { label:'Medical and Pediatric',     k:'medical',       cur:true },
    { label:'Total First-Year Cost',     k:'firstYearTotal',cur:true },
    { label:'Average Monthly Cost',      k:'monthlyAvg',    cur:true },
  ],
  [
    { q:'How much does it cost to have a baby in the US?', a:'Average first-year costs for a baby in the US range from $15,000 to $50,000+ depending on insurance, childcare, and location. Hospital delivery alone averages $10,000-$30,000 before insurance. Childcare is the largest ongoing expense: daycare averages $10,000-$25,000 per year, a full-time nanny $35,000-$50,000+. Most families underestimate costs by 30-50%.' },
    { q:'How should I prepare financially before having a baby?', a:'Key financial steps: review your health insurance and understand your deductible and out-of-pocket maximum, build 3-6 months emergency fund, enroll in a Dependent Care FSA (saves $500-$1,000+ in taxes on up to $5,000 of childcare), research parental leave policies and whether you need short-term disability insurance, and create a revised post-baby budget at least 6 months ahead.' },
    { q:'What is a Dependent Care FSA and how much can it save?', a:'A Dependent Care FSA lets you pay for childcare with pre-tax dollars, up to $5,000 per year ($2,500 if married filing separately). At a 25% tax rate, that saves $1,250 in federal income tax plus FICA savings. The Child and Dependent Care Credit provides additional tax relief of 20-35% on up to $3,000 of childcare expenses for one child.' },
  ],
  [
    { href:'/budget-planner-calculator',    icon:'📋', name:'Budget Planner'    },
    { href:'/child-tax-credit-calculator',  icon:'👶', name:'Child Tax Credit'  },
    { href:'/college-savings-calculator',   icon:'🎓', name:'College Savings'   },
    { href:'/emergency-fund-calculator',    icon:'🛡️', name:'Emergency Fund'    },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 4. Pet Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('pet-cost-calculator', page(
  'Pet Cost Calculator',
  'Estimate annual and lifetime costs of owning a dog or cat including vet, food and care.',
  '🐾',
  [
    { s:'petType',       label:'Type of Pet',                 type:'select', def:'dog_medium', opts:[{v:'dog_small',l:'Small Dog (under 25 lbs)'},{v:'dog_medium',l:'Medium Dog (25-60 lbs)'},{v:'dog_large',l:'Large Dog (60+ lbs)'},{v:'cat',l:'Indoor Cat'},{v:'cat_outdoor',l:'Outdoor Cat'}] },
    { s:'vetPlan',       label:'Veterinary Care Level',       type:'select', def:'standard', opts:[{v:'basic',l:'Basic (reactive only)'},{v:'standard',l:'Standard (annual checkups)'},{v:'premium',l:'Premium (preventive + dental)'}] },
    { s:'insurance',     label:'Pet Insurance',               type:'select', def:'yes', opts:[{v:'no',l:'No Insurance'},{v:'yes',l:'With Pet Insurance'}] },
    { s:'petAge',        label:'Pet Age (years)',             type:'range', min:0, max:18, step:1, sfx:' yrs', def:1 },
  ],
  `      const baseCosts = {
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
      return { annualTotal, monthlyAvg, lifetimeCost, food: base.food, annualVet, groom: base.groom, insuranceCost }`,
  [
    { label:'Annual Food Cost',           k:'food',         cur:true },
    { label:'Annual Veterinary Cost',     k:'annualVet',    cur:true },
    { label:'Annual Grooming',            k:'groom',        cur:true },
    { label:'Pet Insurance Annual Cost',  k:'insuranceCost',cur:true },
    { label:'Total Annual Cost',          k:'annualTotal',  cur:true },
    { label:'Monthly Average Cost',       k:'monthlyAvg',   cur:true },
    { label:'Estimated Remaining Lifetime Cost', k:'lifetimeCost', cur:true },
  ],
  [
    { q:'How much does a dog cost per year?', a:'Annual dog ownership costs in 2026: food $600-$1,500, veterinary care $700-$2,000, grooming $0-$900, supplies $200-$400, pet insurance $400-$1,000, boarding or dog walking $500-$3,000. Total annual cost ranges from $1,500 for a basic small dog to $5,000+ for a large dog with premium care. Lifetime cost over 10-14 years: $15,000-$50,000+.' },
    { q:'Is pet insurance worth it?', a:'Pet insurance is worth it if: you want peace of mind for unexpected emergencies ($3,000-$10,000 surgeries), you have a breed prone to health issues (French Bulldogs, German Shepherds, Cavalier King Charles Spaniels), or you cannot afford a large unexpected vet bill. Alternative: self-insure by keeping $3,000-$5,000 in a dedicated pet emergency fund.' },
    { q:'What are hidden costs of pet ownership?', a:'Commonly overlooked costs: boarding or pet sitters when you travel ($30-$85/day), damage to furniture or belongings, pet deposits on rental apartments ($200-$500), flea, tick and heartworm prevention ($150-$300/year), dental cleanings under anesthesia ($500-$1,000 every 1-3 years), and end-of-life care including euthanasia and cremation ($200-$600).' },
  ],
  [
    { href:'/budget-planner-calculator',  icon:'📋', name:'Budget Planner'  },
    { href:'/emergency-fund-calculator',  icon:'🛡️', name:'Emergency Fund'  },
    { href:'/baby-cost-calculator',       icon:'👶', name:'Baby Cost'       },
    { href:'/insurance-calculator',       icon:'🛡️', name:'Insurance'       },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 5. Home Buying Cost Calculator
// ─────────────────────────────────────────────────────────────────────────────
write('home-buying-cost-calculator', page(
  'Home Buying Cost Calculator',
  'Calculate all upfront and ongoing costs of buying a home — beyond the down payment.',
  '🏡',
  [
    { s:'homePrice',      label:'Home Purchase Price',          type:'range', min:50000,  max:3000000, step:5000, cur:true, def:400000 },
    { s:'downPct',        label:'Down Payment Percentage',      type:'select', def:20, opts:[{v:3,l:'3%'},{v:5,l:'5%'},{v:10,l:'10%'},{v:20,l:'20%'},{v:25,l:'25%'}] },
    { s:'mortgageRate',   label:'Mortgage Interest Rate',       type:'range', min:3,      max:12,      step:0.125,pct:true, def:6.875  },
    { s:'propertyTaxRate',label:'Annual Property Tax Rate',     type:'range', min:0.3,    max:3.5,     step:0.1,  pct:true, def:1.2    },
    { s:'closingCostPct', label:'Closing Costs %',              type:'range', min:1,      max:6,       step:0.25, pct:true, def:3      },
    { s:'location',       label:'Location Type',                type:'select', def:'suburban', opts:[{v:'rural',l:'Rural'},{v:'suburban',l:'Suburban'},{v:'urban',l:'Urban'}] },
  ],
  `      const downPayment    = homePrice * (downPct / 100)
      const loanAmount    = homePrice - downPayment
      const r             = mortgageRate / 100 / 12
      const n             = 360
      const monthlyMort   = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
      const closingCosts  = homePrice * (closingCostPct / 100)
      const propTaxMonthly = homePrice * (propertyTaxRate / 100) / 12
      const hoiMonthly    = homePrice * 0.0050 / 12
      const pmiMonthly    = downPct < 20 ? loanAmount * 0.008 / 12 : 0
      const maintMonthly  = homePrice * 0.010 / 12
      const utilityExtra  = { rural: 150, suburban: 200, urban: 250 }[location]
      const totalMonthly  = monthlyMort + propTaxMonthly + hoiMonthly + pmiMonthly + maintMonthly + utilityExtra
      const totalUpfront  = downPayment + closingCosts + 2000
      const trueMonthlyVsRent = totalMonthly
      return { downPayment, closingCosts, totalUpfront, monthlyMort, propTaxMonthly, hoiMonthly, pmiMonthly, totalMonthly }`,
  [
    { label:'Down Payment',               k:'downPayment',     cur:true },
    { label:'Closing Costs',              k:'closingCosts',    cur:true },
    { label:'Total Cash Needed at Closing',k:'totalUpfront',  cur:true },
    { label:'Monthly Mortgage (P+I)',     k:'monthlyMort',     cur:true },
    { label:'Monthly Property Tax',       k:'propTaxMonthly',  cur:true },
    { label:'Monthly Homeowners Insurance',k:'hoiMonthly',    cur:true },
    { label:'Monthly PMI (if applicable)',k:'pmiMonthly',      cur:true },
    { label:'True Monthly All-In Cost',   k:'totalMonthly',   cur:true },
  ],
  [
    { q:'What closing costs should I expect when buying a home?', a:'Closing costs typically run 2-5% of the purchase price. On a $400,000 home that is $8,000-$20,000. Main components: loan origination fee (0.5-1%), appraisal ($500-$800), title insurance ($1,000-$2,000), attorney fees ($500-$1,500), prepaid property taxes and insurance (2-3 months), and recording fees. Buyers can negotiate for sellers to pay closing costs, especially in slower markets.' },
    { q:'What is the true monthly cost of homeownership?', a:'Beyond the mortgage P+I payment, add: property taxes (0.5-2.5% of value annually), homeowners insurance ($100-$200/month), PMI if down payment below 20% ($100-$300/month), HOA fees if applicable ($100-$800/month), maintenance (budget 1% of home value annually = $333/month on a $400,000 home), and utilities which are typically higher than renting.' },
    { q:'How much cash do I need beyond the down payment?', a:'Total cash needed at closing: down payment + closing costs (2-5%) + moving costs ($1,000-$5,000) + immediate repairs and improvements + 3-6 month emergency fund (do not deplete savings on the down payment). Many first-time buyers deplete their savings on the down payment and then struggle with unexpected home expenses. Maintain liquid reserves after closing.' },
  ],
  [
    { href:'/mortgage-calculator',          icon:'🏠', name:'Mortgage Calculator'  },
    { href:'/down-payment-calculator',      icon:'🏙️', name:'Down Payment'         },
    { href:'/rent-vs-buy-calculator',       icon:'🏘️', name:'Rent vs Buy'          },
    { href:'/home-affordability-calculator',icon:'🏡', name:'Affordability'        },
  ]
))

// ─────────────────────────────────────────────────────────────────────────────
// 6. Sitemap (app/sitemap.js)
// ─────────────────────────────────────────────────────────────────────────────
const allRoutes = [
  '', 'blog',
  'mortgage-calculator','amortization-calculator','student-loan-calculator',
  'refinance-calculator','debt-to-income-calculator','home-affordability-calculator',
  'heloc-calculator','property-tax-calculator','rent-vs-buy-calculator',
  'emergency-fund-calculator','401k-calculator','roth-ira-calculator',
  'dividend-calculator','stock-profit-calculator','simple-interest-calculator',
  'apr-calculator','interest-rate-calculator','paycheck-calculator',
  'raise-calculator','tip-calculator','sales-tax-calculator','vat-calculator',
  'currency-converter','payoff-vs-invest-calculator','net-worth-calculator',
  'debt-payoff-calculator','tax-calculator','capital-gains-tax-calculator',
  'self-employment-tax-calculator','pension-calculator','annuity-calculator',
  'life-insurance-calculator','college-savings-calculator','car-affordability-calculator',
  'home-improvement-loan-calculator','solar-payback-calculator','invoice-calculator',
  'markup-calculator','discount-calculator','loan-comparison-calculator',
  'biweekly-mortgage-calculator','extra-payment-calculator','cd-calculator',
  'savings-goal-calculator','fire-calculator','debt-consolidation-calculator',
  'payroll-tax-calculator','bond-yield-calculator','car-depreciation-calculator',
  'home-equity-calculator','inflation-impact-calculator','profit-margin-calculator',
  'break-even-calculator','roi-calculator','freelance-rate-calculator',
  'business-valuation-calculator','hourly-to-salary-calculator','salary-after-tax-calculator',
  'overtime-calculator','cost-of-living-calculator','moving-cost-calculator',
  'lease-vs-buy-calculator','car-loan-calculator','fuel-cost-calculator',
  'down-payment-calculator','mortgage-points-calculator','retirement-calculator',
  'social-security-calculator','rmd-calculator','investment-return-calculator',
  'portfolio-rebalancing-calculator','dollar-cost-averaging-calculator',
  'personal-loan-calculator','credit-card-payoff-calculator','savings-interest-calculator',
  'net-investment-fee-calculator','budget-planner-calculator','rent-affordability-calculator',
  'net-pay-calculator','tax-refund-calculator','child-tax-credit-calculator',
  'estate-tax-calculator','gift-tax-calculator','rental-property-calculator',
  'cap-rate-calculator','house-flipping-calculator','business-loan-calculator',
  'sba-loan-calculator','accounts-receivable-calculator','cash-flow-calculator',
  'working-capital-calculator','debt-service-coverage-calculator','employee-cost-calculator',
  'startup-cost-calculator','ecommerce-profit-calculator','saas-metrics-calculator',
  'wedding-budget-calculator','vacation-budget-calculator','baby-cost-calculator',
  'pet-cost-calculator','home-buying-cost-calculator',
]

const sitemapContent = `export default function sitemap() {
  const base = 'https://freefincalc.net'
  const routes = ${JSON.stringify(allRoutes, null, 4)}

  return routes.map(route => ({
    url: route ? base + '/' + route : base,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('calculator') ? 0.8 : 0.6,
  }))
}
`
fs.writeFileSync('app/sitemap.js', sitemapContent, 'utf8')
console.log('✅ app/sitemap.js — ' + allRoutes.length + ' URLs')

// ─────────────────────────────────────────────────────────────────────────────
// 7. Robots.txt (app/robots.js)
// ─────────────────────────────────────────────────────────────────────────────
const robotsContent = `export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://freefincalc.net/sitemap.xml',
    host: 'https://freefincalc.net',
  }
}
`
fs.writeFileSync('app/robots.js', robotsContent, 'utf8')
console.log('✅ app/robots.js')

// ─────────────────────────────────────────────────────────────────────────────
// 8. Structured Data Component (components/StructuredData.js)
// ─────────────────────────────────────────────────────────────────────────────
const structuredDataContent = `// Global structured data for FreeFinCalc.net
// Included in app/layout.js <head>

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeFinCalc",
    "url": "https://freefincalc.net",
    "logo": "https://freefincalc.net/icon.png",
    "description": "Free financial calculators for mortgage, tax, retirement, investing and more. 100+ calculators, 40+ currencies.",
    "sameAs": []
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FreeFinCalc",
    "url": "https://freefincalc.net",
    "description": "100+ free financial calculators. No sign-up required.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://freefincalc.net/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
`
fs.mkdirSync('components', { recursive: true })
fs.writeFileSync('components/StructuredData.js', structuredDataContent, 'utf8')
console.log('✅ components/StructuredData.js')

// ─────────────────────────────────────────────────────────────────────────────
// 9. Update layout.js metadata to include all SEO fields
// ─────────────────────────────────────────────────────────────────────────────
const layoutSEO = `// ── PASTE THIS metadata export into app/layout.js (replace existing metadata) ──

export const metadata = {
  metadataBase: new URL('https://freefincalc.net'),
  title: {
    default: 'FreeFinCalc — 100+ Free Financial Calculators',
    template: '%s | FreeFinCalc',
  },
  description: 'Free financial calculators for mortgage, tax, retirement, investing, budgeting and more. 100+ calculators, 40+ currencies, no sign-up required.',
  keywords: ['financial calculator', 'mortgage calculator', 'tax calculator', 'retirement calculator', 'investment calculator', 'free finance tools'],
  authors: [{ name: 'FreeFinCalc' }],
  creator: 'FreeFinCalc',
  publisher: 'FreeFinCalc',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freefincalc.net',
    siteName: 'FreeFinCalc',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators for mortgage, tax, retirement, investing and budgeting. No sign-up required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeFinCalc — 100+ Free Financial Calculators',
    description: 'Free financial calculators. 40+ currencies. No sign-up.',
  },
  alternates: {
    canonical: 'https://freefincalc.net',
  },
}
`
fs.writeFileSync('layout_metadata_patch.js', layoutSEO, 'utf8')
console.log('✅ layout_metadata_patch.js — copy metadata into app/layout.js')

console.log(`
════════════════════════════════════════════════════
  STAGE 8 FINAL COMPLETE
════════════════════════════════════════════════════
  Calculators (5):
   1.  /wedding-budget-calculator
   2.  /vacation-budget-calculator
   3.  /baby-cost-calculator
   4.  /pet-cost-calculator
   5.  /home-buying-cost-calculator

  SEO Files:
   6.  app/sitemap.js       — ${allRoutes.length} URLs auto-generated
   7.  app/robots.js        — crawl rules + sitemap reference
   8.  components/StructuredData.js — Organization + WebSite JSON-LD
   9.  layout_metadata_patch.js     — Enhanced metadata (copy into layout.js)

  FINAL DEPLOY:
  git add .
  git commit -m "Stage 8 final: life event calculators + SEO sitemap"
  git push origin master:main

  THEN submit sitemap to Google Search Console:
  https://freefincalc.net/sitemap.xml
════════════════════════════════════════════════════
  TOTAL CALCULATORS ACROSS ALL STAGES:
  Stage 1 (foundation)  :  0 calculators
  Stage 2               : 25 calculators
  Stage 3               : 10 calculators
  Stage 4               : 10 calculators
  Stage 5               : 10 calculators
  Stage 6               : 10 calculators
  Stage 7               : 10 calculators
  Stage 8               :  5 calculators
  ─────────────────────────────────────
  TOTAL                 : 80 calculators
════════════════════════════════════════════════════
`)
