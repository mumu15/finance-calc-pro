/**
 * FreeFinCalc.net — 300 more programmatic SEO pages
 * 
 * Batch A: Tax Calculator by State          — 50 pages
 * Batch B: Savings Goal by Goal Type        — 50 pages
 * Batch C: Compound Interest by Scenario    — 50 pages
 * Batch D: Budget Calculator by Lifestyle   — 50 pages
 * Batch E: Home Affordability by Income     — 50 pages
 * Batch F: Business Loan by Industry        — 50 pages
 * 
 * node build_300_pages.js
 */

const fs = require('fs')
const path = require('path')

fs.mkdirSync('data', { recursive: true })

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: write server page.js + client component
// ─────────────────────────────────────────────────────────────────────────────
function buildBatch({ dataFile, dataVar, dataContent, routeSegments, paramName, layoutFn, clientCode }) {
  fs.writeFileSync(dataFile, dataContent, 'utf8')
  console.log('✅ ' + dataFile)

  const dir = path.join('app', ...routeSegments)
  fs.mkdirSync(dir, { recursive: true })

  const depth = routeSegments.length
  const rel   = Array(depth).fill('..').join('/')

  fs.writeFileSync(path.join(dir, 'layout.js'), layoutFn(rel), 'utf8')

  fs.writeFileSync(path.join(dir, 'page.js'),
`import ${dataVar} from '${rel}/data/${dataFile.replace('data/','')}'
import Client from './Client'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return ${dataVar}.map(x => ({ ${paramName}: x.slug }))
}
export default function Page({ params }) {
  const item = ${dataVar}.find(x => x.slug === params.${paramName})
  if (!item) return notFound()
  return <Client item={item} all={${dataVar}} />
}
`)

  fs.writeFileSync(path.join(dir, 'Client.js'), clientCode, 'utf8')
  console.log('✅ ' + dir + ' — pages created')
}

// ═════════════════════════════════════════════════════════════════════════════
// BATCH A — Tax Calculator by State (50 pages)
// /tax-calculator/state/[state]
// ═════════════════════════════════════════════════════════════════════════════
const taxStates = [
  { slug:'alabama',       name:'Alabama',       abbr:'AL', rate:5.0,  fedRate:22, noTax:false, desc:'a low-tax Southern state with a flat income tax rate' },
  { slug:'alaska',        name:'Alaska',         abbr:'AK', rate:0,    fedRate:22, noTax:true,  desc:'the only state with no income tax AND no sales tax' },
  { slug:'arizona',       name:'Arizona',        abbr:'AZ', rate:2.5,  fedRate:22, noTax:false, desc:'a Sun Belt state with one of the lowest flat tax rates' },
  { slug:'arkansas',      name:'Arkansas',       abbr:'AR', rate:4.4,  fedRate:22, noTax:false, desc:'a low-cost Southern state with a moderate income tax' },
  { slug:'california',    name:'California',     abbr:'CA', rate:9.3,  fedRate:22, noTax:false, desc:'the highest-taxed large state in the US' },
  { slug:'colorado',      name:'Colorado',       abbr:'CO', rate:4.4,  fedRate:22, noTax:false, desc:'a flat-tax Western state with a moderate income tax rate' },
  { slug:'connecticut',   name:'Connecticut',    abbr:'CT', rate:6.99, fedRate:22, noTax:false, desc:'a high-income New England state with progressive taxes' },
  { slug:'delaware',      name:'Delaware',       abbr:'DE', rate:6.6,  fedRate:22, noTax:false, desc:'a tax-friendly state with no sales tax' },
  { slug:'florida',       name:'Florida',        abbr:'FL', rate:0,    fedRate:22, noTax:true,  desc:'one of the most popular no-income-tax states in the US' },
  { slug:'georgia',       name:'Georgia',        abbr:'GA', rate:5.49, fedRate:22, noTax:false, desc:'a growing Southeast state with a flat income tax' },
  { slug:'hawaii',        name:'Hawaii',         abbr:'HI', rate:11.0, fedRate:22, noTax:false, desc:'the highest marginal state income tax in the US' },
  { slug:'idaho',         name:'Idaho',          abbr:'ID', rate:5.8,  fedRate:22, noTax:false, desc:'a fast-growing Mountain West state with moderate taxes' },
  { slug:'illinois',      name:'Illinois',       abbr:'IL', rate:4.95, fedRate:22, noTax:false, desc:'a flat-tax Midwest state with a significant total tax burden' },
  { slug:'indiana',       name:'Indiana',        abbr:'IN', rate:3.15, fedRate:22, noTax:false, desc:'one of the lowest flat income tax rates in the Midwest' },
  { slug:'iowa',          name:'Iowa',           abbr:'IA', rate:6.0,  fedRate:22, noTax:false, desc:'a Midwest state with a moderate progressive tax system' },
  { slug:'kansas',        name:'Kansas',         abbr:'KS', rate:5.7,  fedRate:22, noTax:false, desc:'a Plains state with a two-bracket income tax system' },
  { slug:'kentucky',      name:'Kentucky',       abbr:'KY', rate:4.5,  fedRate:22, noTax:false, desc:'a Southern state with a flat income tax rate' },
  { slug:'louisiana',     name:'Louisiana',      abbr:'LA', rate:4.25, fedRate:22, noTax:false, desc:'a Gulf Coast state with low income taxes but high sales tax' },
  { slug:'maine',         name:'Maine',          abbr:'ME', rate:7.15, fedRate:22, noTax:false, desc:'a New England state with a high top income tax rate' },
  { slug:'maryland',      name:'Maryland',       abbr:'MD', rate:5.75, fedRate:22, noTax:false, desc:'a high-income Mid-Atlantic state with additional county taxes' },
  { slug:'massachusetts', name:'Massachusetts',  abbr:'MA', rate:5.0,  fedRate:22, noTax:false, desc:'a New England state with a flat income tax rate' },
  { slug:'michigan',      name:'Michigan',       abbr:'MI', rate:4.25, fedRate:22, noTax:false, desc:'a Great Lakes state with a low flat income tax' },
  { slug:'minnesota',     name:'Minnesota',      abbr:'MN', rate:9.85, fedRate:22, noTax:false, desc:'a Midwest state with one of the highest top marginal tax rates' },
  { slug:'mississippi',   name:'Mississippi',    abbr:'MS', rate:5.0,  fedRate:22, noTax:false, desc:'a low-cost Southern state with a flat income tax' },
  { slug:'missouri',      name:'Missouri',       abbr:'MO', rate:4.95, fedRate:22, noTax:false, desc:'a centrally located state with a moderate tax burden' },
  { slug:'montana',       name:'Montana',        abbr:'MT', rate:5.9,  fedRate:22, noTax:false, desc:'a Big Sky state with a moderate progressive income tax' },
  { slug:'nebraska',      name:'Nebraska',       abbr:'NE', rate:5.84, fedRate:22, noTax:false, desc:'a Plains state with a moderate income tax system' },
  { slug:'nevada',        name:'Nevada',         abbr:'NV', rate:0,    fedRate:22, noTax:true,  desc:'a Western no-income-tax state popular for business relocation' },
  { slug:'new-hampshire', name:'New Hampshire',  abbr:'NH', rate:0,    fedRate:22, noTax:true,  desc:'a Live Free or Die state with no income tax on wages' },
  { slug:'new-jersey',    name:'New Jersey',     abbr:'NJ', rate:10.75,fedRate:22, noTax:false, desc:'one of the highest total tax burden states in the US' },
  { slug:'new-mexico',    name:'New Mexico',     abbr:'NM', rate:5.9,  fedRate:22, noTax:false, desc:'a Southwest state with a moderate progressive tax system' },
  { slug:'new-york',      name:'New York',       abbr:'NY', rate:10.9, fedRate:22, noTax:false, desc:'one of the highest-taxed states in America' },
  { slug:'north-carolina',name:'North Carolina', abbr:'NC', rate:4.5,  fedRate:22, noTax:false, desc:'a Southeast state transitioning to a low flat income tax' },
  { slug:'north-dakota',  name:'North Dakota',   abbr:'ND', rate:2.9,  fedRate:22, noTax:false, desc:'one of the lowest income tax states in the Midwest' },
  { slug:'ohio',          name:'Ohio',           abbr:'OH', rate:3.99, fedRate:22, noTax:false, desc:'a Midwest state with a low top marginal tax rate' },
  { slug:'oklahoma',      name:'Oklahoma',       abbr:'OK', rate:4.75, fedRate:22, noTax:false, desc:'a Plains state with a moderate income tax burden' },
  { slug:'oregon',        name:'Oregon',         abbr:'OR', rate:9.9,  fedRate:22, noTax:false, desc:'a Pacific Northwest state with a high income tax but no sales tax' },
  { slug:'pennsylvania',  name:'Pennsylvania',   abbr:'PA', rate:3.07, fedRate:22, noTax:false, desc:'a Mid-Atlantic state with the lowest flat income tax rate' },
  { slug:'rhode-island',  name:'Rhode Island',   abbr:'RI', rate:5.99, fedRate:22, noTax:false, desc:'the smallest state with a moderate progressive tax system' },
  { slug:'south-carolina',name:'South Carolina', abbr:'SC', rate:6.4,  fedRate:22, noTax:false, desc:'a Southeast state with a moderate progressive tax' },
  { slug:'south-dakota',  name:'South Dakota',   abbr:'SD', rate:0,    fedRate:22, noTax:true,  desc:'a Plains state with no income tax and low overall tax burden' },
  { slug:'tennessee',     name:'Tennessee',      abbr:'TN', rate:0,    fedRate:22, noTax:true,  desc:'a fast-growing no-income-tax Southeast state' },
  { slug:'texas',         name:'Texas',          abbr:'TX', rate:0,    fedRate:22, noTax:true,  desc:'the largest no-income-tax state with booming job growth' },
  { slug:'utah',          name:'Utah',           abbr:'UT', rate:4.65, fedRate:22, noTax:false, desc:'a fast-growing Western state with a low flat income tax' },
  { slug:'vermont',       name:'Vermont',        abbr:'VT', rate:8.75, fedRate:22, noTax:false, desc:'a New England state with a high progressive tax system' },
  { slug:'virginia',      name:'Virginia',       abbr:'VA', rate:5.75, fedRate:22, noTax:false, desc:'a prosperous Mid-Atlantic state with a moderate income tax' },
  { slug:'washington',    name:'Washington',     abbr:'WA', rate:0,    fedRate:22, noTax:true,  desc:'a major Pacific Northwest no-income-tax state' },
  { slug:'west-virginia', name:'West Virginia',  abbr:'WV', rate:5.12, fedRate:22, noTax:false, desc:'an Appalachian state with a moderate income tax' },
  { slug:'wisconsin',     name:'Wisconsin',      abbr:'WI', rate:7.65, fedRate:22, noTax:false, desc:'a Great Lakes state with a progressive income tax system' },
  { slug:'wyoming',       name:'Wyoming',        abbr:'WY', rate:0,    fedRate:22, noTax:true,  desc:'a Western state with no income tax and minimal tax burden' },
]

const taxStateDataContent = `const taxStates = ${JSON.stringify(taxStates, null, 2)}
module.exports = taxStates
`
fs.writeFileSync('data/taxStates.js', taxStateDataContent, 'utf8')
console.log('✅ data/taxStates.js')

const tsDir = path.join('app', 'tax-calculator', 'state', '[state]')
fs.mkdirSync(tsDir, { recursive: true })

fs.writeFileSync(path.join(tsDir, 'layout.js'), `import taxStates from '../../../../data/taxStates'
export async function generateMetadata({ params }) {
  const s = taxStates.find(x => x.slug === params.state)
  if (!s) return { title: 'Tax Calculator by State' }
  return {
    title: \`\${s.name} Income Tax Calculator 2026 — State Tax Rates\`,
    description: \`Calculate your \${s.name} income tax. State rate: \${s.noTax ? 'No state income tax' : s.rate + '%'}. \${s.desc}. Free 2026 take-home pay estimate.\`,
    alternates: { canonical: \`https://freefincalc.net/tax-calculator/state/\${s.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(tsDir, 'page.js'), `import taxStates from '../../../../data/taxStates'
import TaxStateClient from './TaxStateClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return taxStates.map(s => ({ state: s.slug })) }
export default function Page({ params }) {
  const item = taxStates.find(s => s.slug === params.state)
  if (!item) return notFound()
  return <TaxStateClient item={item} all={taxStates} />
}
`)

fs.writeFileSync(path.join(tsDir, 'TaxStateClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function TaxStateClient({ item: s, all }) {
  const [income, setIncome] = useState(75000)
  const fed   = income * s.fedRate / 100
  const state = income * s.rate / 100
  const fica  = income * 7.65 / 100
  const net   = income - fed - state - fica
  const eff   = ((fed + state + fica) / income * 100).toFixed(1)

  const st = {
    page: { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap: { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:   { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:  { color:'#64748b', textDecoration:'none' },
    h1:   { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:  { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    lbl:  { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:  { fontSize:28, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr: { width:'100%', accentColor:'#f0c842' },
    h2:   { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:    { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:  { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    stA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA:{ display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={st.page}>
      <Header />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span>›</span>
          <a href="/tax-calculator" style={st.bcA}>Tax Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{s.name}</span>
        </nav>
        <h1 style={st.h1}>{s.name} Income Tax Calculator 2026</h1>
        <p style={st.sub}>{s.noTax ? s.name + ' has no state income tax.' : 'State rate: ' + s.rate + '%. ' + s.desc + '.'}</p>

        <div style={st.card}>
          <label style={st.lbl}>Annual Income</label>
          <div style={st.val}>{fmt(income)}/year</div>
          <input type="range" min={20000} max={500000} step={1000} value={income} onChange={e => setIncome(+e.target.value)} style={st.sldr} />
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>Tax Breakdown — {s.name}</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Gross Income</span><span style={{fontWeight:700}}>{fmt(income)}/yr</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Federal Tax ({s.fedRate}% est.)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmt(fed)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>{s.name} State Tax ({s.noTax ? 'None' : s.rate + '%'})</span><span style={{fontWeight:700, color: s.noTax ? '#10b981' : '#ef4444'}}>- {fmt(state)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>FICA (7.65%)</span><span style={{fontWeight:700, color:'#ef4444'}}>- {fmt(fica)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0 0'}}>
            <span style={{fontWeight:700, fontSize:15}}>Take-Home Pay</span>
            <span style={{fontWeight:800, fontSize:22, color:'#f0c842'}}>{fmt(net)}/yr</span>
          </div>
          <div style={{marginTop:10, display:'flex', gap:20, flexWrap:'wrap', fontSize:13, color:'#64748b'}}>
            <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmt(net/12)}</strong></span>
            <span>Effective rate: <strong style={{color:'#e2e8f0'}}>{eff}%</strong></span>
          </div>
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>{s.name} Tax Guide 2026</h2>
          <p style={st.p}>{s.name} is {s.desc}. {s.noTax ? 'With no state income tax, ' + s.name + ' workers keep significantly more of their paycheck than residents of high-tax states like California or New York. On a $75,000 salary, that is over ' + fmt(75000 * 0.06) + ' more per year.' : 'The ' + s.name + ' state income tax rate of ' + s.rate + '% applies to earned income. Combined with federal taxes and FICA, the effective total tax burden on a $75,000 income is approximately ' + ((75000 * (s.fedRate + s.rate) / 100 + 75000 * 0.0765) / 75000 * 100).toFixed(1) + '%.'}</p>
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>Related Calculators</h2>
          {[['/tax-calculator','Tax Calculator'],['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/self-employment-tax-calculator','Self-Employment Tax'],['/capital-gains-tax-calculator','Capital Gains Tax']].map(([href,lbl]) => (
            <a key={href} href={href} style={st.calcA}>{lbl}</a>
          ))}
        </div>

        <div style={st.card}>
          <h2 style={st.h2}>Tax Calculator by State</h2>
          {all.filter(x => x.slug !== s.slug).map(x => (
            <a key={x.slug} href={'/tax-calculator/state/' + x.slug} style={st.stA}>{x.name} ({x.abbr})</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`)
console.log('✅ tax-calculator/state/[state] — 50 pages')

// ═════════════════════════════════════════════════════════════════════════════
// BATCH B — Savings Goal Calculator by Goal Type (50 pages)
// /savings-goal-calculator/goal/[goal]
// ═════════════════════════════════════════════════════════════════════════════
const savingsGoals = [
  { slug:'emergency-fund',       name:'Emergency Fund',          target:15000, months:24, rate:4.5, desc:'3-6 months of living expenses for financial security' },
  { slug:'house-down-payment',   name:'House Down Payment',      target:60000, months:36, rate:4.5, desc:'saving for a 20% down payment on a median US home' },
  { slug:'car-purchase',         name:'Car Purchase',            target:20000, months:24, rate:4.5, desc:'saving to buy a car without taking on debt' },
  { slug:'vacation',             name:'Dream Vacation',          target:8000,  months:18, rate:4.5, desc:'saving for an international vacation or bucket-list trip' },
  { slug:'wedding',              name:'Wedding Fund',            target:30000, months:30, rate:4.5, desc:'saving for your wedding without starting married life in debt' },
  { slug:'college',              name:'College Fund',            target:80000, months:120,rate:5.0, desc:'saving for a child\'s college education' },
  { slug:'retirement-supplement',name:'Retirement Supplement',   target:500000,months:300,rate:7.0, desc:'building supplemental retirement savings beyond your 401k' },
  { slug:'business-startup',     name:'Business Startup',        target:25000, months:36, rate:4.5, desc:'saving capital to launch your own business' },
  { slug:'home-renovation',      name:'Home Renovation',         target:30000, months:30, rate:4.5, desc:'saving for a major home improvement project' },
  { slug:'travel-fund',          name:'Annual Travel Fund',      target:5000,  months:12, rate:4.5, desc:'saving for regular travel and adventure experiences' },
  { slug:'new-baby',             name:'New Baby Fund',           target:20000, months:18, rate:4.5, desc:'saving for the costs of having and raising a new child' },
  { slug:'boat',                 name:'Boat Purchase',           target:30000, months:48, rate:4.5, desc:'saving to buy a boat or watercraft outright' },
  { slug:'motorcycle',           name:'Motorcycle Fund',         target:12000, months:18, rate:4.5, desc:'saving for a motorcycle purchase without financing' },
  { slug:'holiday-gifts',        name:'Holiday Gift Fund',       target:2000,  months:12, rate:4.5, desc:'saving throughout the year for holiday shopping' },
  { slug:'solar-panels',         name:'Solar Panel Fund',        target:25000, months:36, rate:4.5, desc:'saving to install solar panels and cut energy bills' },
  { slug:'investment-seed',      name:'Investment Starter Fund', target:10000, months:18, rate:4.5, desc:'saving your first investment portfolio seed capital' },
  { slug:'kids-sports',          name:'Kids Sports & Activities',target:5000,  months:12, rate:4.5, desc:'saving for children\'s extracurricular activities and sports' },
  { slug:'pet',                  name:'Pet Fund',                target:5000,  months:12, rate:4.5, desc:'saving for a pet purchase and first-year expenses' },
  { slug:'relocation',           name:'Relocation Fund',         target:10000, months:18, rate:4.5, desc:'saving to cover moving costs to a new city' },
  { slug:'laptop-tech',          name:'Tech & Laptop Fund',      target:3000,  months:12, rate:4.5, desc:'saving for a new computer or tech equipment upgrade' },
  { slug:'charity',              name:'Charitable Giving Fund',  target:10000, months:24, rate:4.5, desc:'saving to make meaningful charitable donations' },
  { slug:'sabbatical',           name:'Career Sabbatical Fund',  target:40000, months:48, rate:4.5, desc:'saving to take time off work for travel or study' },
  { slug:'art-collection',       name:'Art Collection',          target:20000, months:36, rate:4.5, desc:'saving to invest in art as both passion and investment' },
  { slug:'musical-instrument',   name:'Musical Instrument',      target:5000,  months:18, rate:4.5, desc:'saving for a quality musical instrument purchase' },
  { slug:'gym-fitness',          name:'Home Gym Setup',          target:6000,  months:12, rate:4.5, desc:'saving to build a dedicated home gym space' },
  { slug:'land-purchase',        name:'Land Purchase',           target:50000, months:60, rate:4.5, desc:'saving for a land purchase for building or investment' },
  { slug:'rental-property',      name:'Rental Property Down Payment',target:50000,months:60,rate:5.0,desc:'saving for a down payment on an investment property' },
  { slug:'early-retirement',     name:'Early Retirement (FIRE)', target:1000000,months:240,rate:8.0,desc:'achieving financial independence and early retirement' },
  { slug:'new-roof',             name:'Roof Replacement',        target:15000, months:24, rate:4.5, desc:'saving for a new roof without taking on debt' },
  { slug:'kitchen-renovation',   name:'Kitchen Renovation',      target:35000, months:36, rate:4.5, desc:'saving for a full kitchen remodel and upgrade' },
  { slug:'bathroom-renovation',  name:'Bathroom Renovation',     target:15000, months:24, rate:4.5, desc:'saving for a bathroom remodel and upgrade' },
  { slug:'pool-installation',    name:'Pool Installation',       target:45000, months:48, rate:4.5, desc:'saving to install an in-ground swimming pool' },
  { slug:'adoption',             name:'Adoption Fund',           target:40000, months:48, rate:4.5, desc:'saving for adoption agency fees and legal costs' },
  { slug:'anniversary-trip',     name:'Anniversary Trip',        target:10000, months:24, rate:4.5, desc:'saving for a milestone anniversary celebration trip' },
  { slug:'study-abroad',         name:'Study Abroad Fund',       target:15000, months:18, rate:4.5, desc:'saving for a study abroad program or international course' },
  { slug:'home-security',        name:'Home Security System',    target:5000,  months:12, rate:4.5, desc:'saving for a comprehensive home security installation' },
  { slug:'electric-vehicle',     name:'Electric Vehicle (EV)',   target:45000, months:48, rate:4.5, desc:'saving to buy an electric vehicle without financing' },
  { slug:'college-textbooks',    name:'College Textbooks & Fees',target:6000,  months:12, rate:4.5, desc:'saving for college textbooks and miscellaneous fees' },
  { slug:'franchise',            name:'Franchise Investment',    target:100000,months:84, rate:5.0, desc:'saving to buy into a franchise business opportunity' },
  { slug:'legal-defense',        name:'Legal Defense Fund',      target:15000, months:24, rate:4.5, desc:'saving for potential legal fees and representation' },
  { slug:'hurricane-prep',       name:'Hurricane / Disaster Prep',target:5000, months:12, rate:4.5, desc:'saving for home disaster preparedness and resilience' },
  { slug:'parents-care',         name:'Parents\' Care Fund',     target:30000, months:48, rate:4.5, desc:'saving to help support aging parents\' care needs' },
  { slug:'health-savings',       name:'Health Savings (HSA Top-Up)',target:8000,months:12,rate:4.5, desc:'maximizing health savings account contributions' },
  { slug:'dividend-portfolio',   name:'Dividend Portfolio Starter',target:25000,months:36,rate:5.0,desc:'building an initial dividend-paying investment portfolio' },
  { slug:'gap-year',             name:'Gap Year Fund',           target:20000, months:24, rate:4.5, desc:'saving for a gap year of travel and exploration' },
  { slug:'private-school',       name:'Private School Tuition',  target:60000, months:60, rate:4.5, desc:'saving to cover private school tuition costs' },
  { slug:'tiny-home',            name:'Tiny Home Purchase',      target:80000, months:60, rate:4.5, desc:'saving to buy or build a tiny home debt-free' },
  { slug:'wine-collection',      name:'Wine Collection',         target:10000, months:24, rate:4.5, desc:'investing in a curated wine collection over time' },
  { slug:'side-hustle-capital',  name:'Side Hustle Startup Capital',target:8000,months:12,rate:4.5, desc:'saving to launch a part-time side business' },
  { slug:'sports-season-tickets',name:'Sports Season Tickets',   target:5000,  months:12, rate:4.5, desc:'saving for season tickets to your favorite team' },
]

const sgDataContent = `const savingsGoals = ${JSON.stringify(savingsGoals, null, 2)}
module.exports = savingsGoals
`
fs.writeFileSync('data/savingsGoals.js', sgDataContent, 'utf8')
console.log('✅ data/savingsGoals.js')

const sgDir = path.join('app', 'savings-goal-calculator', 'goal', '[goal]')
fs.mkdirSync(sgDir, { recursive: true })

fs.writeFileSync(path.join(sgDir, 'layout.js'), `import goals from '../../../../data/savingsGoals'
export async function generateMetadata({ params }) {
  const g = goals.find(x => x.slug === params.goal)
  if (!g) return { title: 'Savings Goal Calculator' }
  const mo = g.rate / 100 / 12
  const pmt = Math.round(g.target * mo / (Math.pow(1 + mo, g.months) - 1))
  return {
    title: \`Savings Goal Calculator: \${g.name} 2026\`,
    description: \`How much do you need to save for \${g.name.toLowerCase()}? Target \$\${g.target.toLocaleString()} in \${g.months} months. Save \$\${pmt}/month. Free savings planner.\`,
    alternates: { canonical: \`https://freefincalc.net/savings-goal-calculator/goal/\${g.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(sgDir, 'page.js'), `import goals from '../../../../data/savingsGoals'
import SavingsGoalClient from './SavingsGoalClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return goals.map(g => ({ goal: g.slug })) }
export default function Page({ params }) {
  const item = goals.find(g => g.slug === params.goal)
  if (!item) return notFound()
  return <SavingsGoalClient item={item} all={goals} />
}
`)

fs.writeFileSync(path.join(sgDir, 'SavingsGoalClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function SavingsGoalClient({ item: g, all }) {
  const [target,  setTarget]  = useState(g.target)
  const [months,  setMonths]  = useState(g.months)
  const [rate,    setRate]    = useState(g.rate)

  const mo  = rate / 100 / 12
  const pmt = mo > 0 ? target * mo / (Math.pow(1 + mo, months) - 1) : target / months
  const interest = target - pmt * months

  const st = {
    page: { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap: { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:   { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:  { color:'#64748b', textDecoration:'none' },
    h1:   { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:  { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:  { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:  { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr: { width:'100%', accentColor:'#f0c842' },
    box:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:   { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:    { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:  { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    gA:   { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA:{ display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={st.page}>
      <Header />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span>›</span>
          <a href="/savings-goal-calculator" style={st.bcA}>Savings Goal Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{g.name}</span>
        </nav>
        <h1 style={st.h1}>Savings Goal: {g.name}</h1>
        <p style={st.sub}>How much do you need to save each month for {g.desc}?</p>

        <div style={st.grid}>
          <div style={st.card}>
            <label style={st.lbl}>Savings Target</label>
            <div style={st.val}>{fmt(target)}</div>
            <input type="range" min={500} max={g.target * 5} step={500} value={target} onChange={e => setTarget(+e.target.value)} style={st.sldr} />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Timeframe (months)</label>
            <div style={st.val}>{months} mo ({(months/12).toFixed(1)} yrs)</div>
            <input type="range" min={3} max={360} step={3} value={months} onChange={e => setMonths(+e.target.value)} style={st.sldr} />
          </div>
          <div style={{...st.card, gridColumn:'span 2'}}>
            <label style={st.lbl}>Annual Interest Rate (savings account / investment)</label>
            <div style={st.val}>{rate}%</div>
            <input type="range" min={0} max={12} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={st.sldr} />
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Savings Plan Summary</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Monthly Deposit Needed</span><span style={{fontWeight:800, color:'#f0c842', fontSize:20}}>{fmt(pmt)}/mo</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total Deposits</span><span style={{fontWeight:700}}>{fmt(pmt * months)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Interest Earned</span><span style={{fontWeight:700, color:'#10b981'}}>{fmt(interest > 0 ? interest : 0)}</span></div>
          <div style={{...st.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Goal Amount</span><span style={{fontWeight:800, fontSize:18, color:'#f0c842'}}>{fmt(target)}</span></div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>{g.name} Savings Guide</h2>
          <p style={st.p}>Saving for {g.desc} is one of the most impactful financial decisions you can make. With a target of {fmt(g.target)} and {g.months} months to reach it, you need to save <strong style={{color:'#f0c842'}}>{fmt(pmt)}/month</strong> — less than a daily coffee habit for most goals.</p>
          <p style={st.p}>A High-Yield Savings Account (HYSA) currently offers 4-5% APY — far better than a regular savings account. For longer goals over 5 years, index funds historically average 7-10% annually, significantly reducing the monthly amount needed.</p>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          {[['/savings-goal-calculator','Savings Goal'],['/savings-calculator','Savings Calculator'],['/compound-interest','Compound Interest'],['/emergency-fund-calculator','Emergency Fund'],['/investment-return-calculator','Investment Return']].map(([href,lbl]) => (
            <a key={href} href={href} style={st.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>Other Savings Goals</h2>
          {all.filter(x => x.slug !== g.slug).map(x => (
            <a key={x.slug} href={'/savings-goal-calculator/goal/' + x.slug} style={st.gA}>{x.name}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`)
console.log('✅ savings-goal-calculator/goal/[goal] — 50 pages')

// ═════════════════════════════════════════════════════════════════════════════
// BATCH C — Compound Interest by Scenario (50 pages)
// /compound-interest/scenario/[scenario]
// ═════════════════════════════════════════════════════════════════════════════
const ciScenarios = [
  { slug:'10000-invested-10-years', name:'$10,000 Invested for 10 Years',    principal:10000, rate:8,  years:10, monthly:0,   desc:'a lump sum investment held for a decade' },
  { slug:'100-month-30-years',      name:'$100/Month for 30 Years',          principal:0,     rate:8,  years:30, monthly:100, desc:'consistent small monthly investing over a career' },
  { slug:'500-month-20-years',      name:'$500/Month for 20 Years',          principal:0,     rate:8,  years:20, monthly:500, desc:'building serious wealth with monthly contributions' },
  { slug:'1000-month-25-years',     name:'$1,000/Month for 25 Years',        principal:0,     rate:8,  years:25, monthly:1000,desc:'an aggressive savings strategy for early retirement' },
  { slug:'50000-retirement',        name:'$50,000 Retirement Investment',     principal:50000, rate:7,  years:25, monthly:500, desc:'growing retirement savings over 25 years' },
  { slug:'college-fund-18-years',   name:'College Fund — 18 Years',          principal:5000,  rate:6,  years:18, monthly:200, desc:'growing a college fund from birth to enrollment' },
  { slug:'sp500-average-return',    name:'S&P 500 Average Return Simulation', principal:25000, rate:10, years:30, monthly:500, desc:'simulating the historical S&P 500 average return' },
  { slug:'401k-growth',             name:'401k Growth Simulation',           principal:10000, rate:7,  years:30, monthly:800, desc:'modeling long-term 401k account growth' },
  { slug:'roth-ira-maxed',          name:'Maxed Roth IRA Over 30 Years',     principal:0,     rate:8,  years:30, monthly:583, desc:'maxing out your Roth IRA contribution annually' },
  { slug:'hysa-1-year',             name:'High-Yield Savings Account',       principal:10000, rate:4.5,years:1,  monthly:500, desc:'growing emergency fund in a HYSA' },
  { slug:'millionaire-by-65',       name:'Millionaire by Age 65',            principal:5000,  rate:8,  years:35, monthly:600, desc:'the classic path to becoming a millionaire' },
  { slug:'double-money',            name:'How Long to Double Your Money',    principal:20000, rate:7,  years:10, monthly:0,   desc:'visualizing the Rule of 72 in action' },
  { slug:'inflation-impact',        name:'Inflation Impact on Savings',      principal:50000, rate:2,  years:20, monthly:0,   desc:'how inflation erodes purchasing power of cash savings' },
  { slug:'cd-3-year',               name:'Certificate of Deposit — 3 Years', principal:25000, rate:5,  years:3,  monthly:0,   desc:'a 3-year CD at current rates' },
  { slug:'bonds-10-year',           name:'Bond Portfolio — 10 Years',        principal:50000, rate:4.5,years:10, monthly:200, desc:'a conservative bond investment strategy' },
  { slug:'real-estate-equity',      name:'Real Estate Equity Growth',        principal:80000, rate:5,  years:20, monthly:0,   desc:'equity appreciation in a real estate investment' },
  { slug:'1000-invested-20',        name:'$1,000 Invested for 20 Years',     principal:1000,  rate:8,  years:20, monthly:0,   desc:'the power of starting with just $1,000' },
  { slug:'weekly-coffee-savings',   name:'Skip Coffee — Invest Instead',     principal:0,     rate:8,  years:30, monthly:150, desc:'investing your daily coffee budget instead' },
  { slug:'crypto-high-risk',        name:'High-Risk Investment Scenario',    principal:10000, rate:15, years:10, monthly:0,   desc:'a high-risk, high-return investment scenario' },
  { slug:'low-risk-conservative',   name:'Conservative Investment (4%)',     principal:100000,rate:4,  years:20, monthly:500, desc:'a low-risk conservative portfolio strategy' },
  { slug:'tech-stock-simulation',   name:'Tech Stock Growth Simulation',     principal:10000, rate:15, years:10, monthly:200, desc:'simulating tech stock sector performance' },
  { slug:'5000-gift-invested',      name:'$5,000 Gift Invested for Child',   principal:5000,  rate:8,  years:18, monthly:50,  desc:'investing a gift for a newborn until age 18' },
  { slug:'100k-milestone',          name:'Reaching $100,000 Milestone',      principal:10000, rate:8,  years:10, monthly:400, desc:'the timeline to your first $100,000' },
  { slug:'monthly-50-30-years',     name:'$50/Month for 30 Years',           principal:0,     rate:8,  years:30, monthly:50,  desc:'the power of starting small and staying consistent' },
  { slug:'emergency-fund-growth',   name:'Emergency Fund Growth in HYSA',    principal:5000,  rate:4.5,years:3,  monthly:200, desc:'growing an emergency fund in high-yield savings' },
  { slug:'inheritance-invested',    name:'$25,000 Inheritance Invested',     principal:25000, rate:8,  years:20, monthly:0,   desc:'investing an inheritance windfall for the long term' },
  { slug:'401k-employer-match',     name:'401k With Employer Match',         principal:0,     rate:7,  years:30, monthly:1200,desc:'modeling 401k growth with full employer match' },
  { slug:'529-college-plan',        name:'529 College Savings Plan',         principal:1000,  rate:6,  years:18, monthly:250, desc:'a 529 plan growing for 18 years to fund college' },
  { slug:'quarterly-compound',      name:'Quarterly Compounding vs Monthly', principal:20000, rate:6,  years:15, monthly:200, desc:'comparing quarterly vs monthly compounding frequency' },
  { slug:'dividend-reinvestment',   name:'Dividend Reinvestment (DRIP)',     principal:20000, rate:9,  years:20, monthly:200, desc:'reinvesting dividends for accelerated compounding' },
  { slug:'10-year-to-retire',       name:'10 Years to Retirement Sprint',    principal:100000,rate:8,  years:10, monthly:2000,desc:'aggressive saving with 10 years until retirement' },
  { slug:'side-hustle-investing',   name:'Side Hustle Investment Plan',      principal:0,     rate:8,  years:10, monthly:500, desc:'investing side income for wealth building' },
  { slug:'house-fund-5-years',      name:'House Down Payment in 5 Years',    principal:10000, rate:4.5,years:5,  monthly:800, desc:'aggressively saving for a house down payment' },
  { slug:'1000-per-week-invested',  name:'$250/Week Invested for 20 Years',  principal:0,     rate:8,  years:20, monthly:1083,desc:'systematic weekly investing over a long horizon' },
  { slug:'target-500k',             name:'Building to $500,000',             principal:50000, rate:8,  years:20, monthly:1000,desc:'the roadmap to a half-million dollar portfolio' },
  { slug:'lump-sum-vs-monthly',     name:'Lump Sum vs Monthly DCA',          principal:50000, rate:8,  years:20, monthly:0,   desc:'comparing lump sum investing vs dollar cost averaging' },
  { slug:'teen-investor',           name:'Teen Investor Starting at 15',     principal:500,   rate:8,  years:50, monthly:100, desc:'the extraordinary impact of starting early at 15' },
  { slug:'late-starter-50',         name:'Late Starter — Beginning at 50',   principal:20000, rate:6,  years:15, monthly:1500,desc:'building wealth starting from age 50' },
  { slug:'million-in-20-years',     name:'Million Dollars in 20 Years',      principal:50000, rate:8,  years:20, monthly:1500,desc:'the aggressive plan to hit $1M in 20 years' },
  { slug:'index-fund-etf',          name:'Index Fund / ETF Strategy',        principal:10000, rate:9,  years:25, monthly:500, desc:'a total market index fund investment strategy' },
  { slug:'biweekly-investing',      name:'Biweekly Paycheck Investing',      principal:0,     rate:8,  years:30, monthly:500, desc:'investing from every biweekly paycheck' },
  { slug:'real-estate-vs-sp500',    name:'Real Estate vs S&P 500',           principal:80000, rate:8,  years:20, monthly:0,   desc:'comparing real estate equity vs stock market returns' },
  { slug:'emergency-to-investing',  name:'Emergency Fund Overflow Strategy', principal:20000, rate:8,  years:15, monthly:300, desc:'investing excess cash once emergency fund is full' },
  { slug:'savings-bond-ibond',      name:'I-Bond / Inflation-Linked Savings',principal:10000, rate:5,  years:5,  monthly:0,   desc:'I-Bond inflation-protected savings over 5 years' },
  { slug:'kids-custodial-account',  name:'Custodial Investment Account',     principal:5000,  rate:8,  years:18, monthly:100, desc:'investing for a child in a UGMA/UTMA custodial account' },
  { slug:'windfall-invested',       name:'$50,000 Windfall Investment',      principal:50000, rate:8,  years:20, monthly:0,   desc:'investing a sudden windfall like a bonus or inheritance' },
  { slug:'pay-off-vs-invest',       name:'Pay Off Debt vs Invest Comparison',principal:0,     rate:7,  years:10, monthly:500, desc:'the opportunity cost of debt payoff vs investing' },
  { slug:'first-job-saving',        name:'First Job Savings Plan',           principal:1000,  rate:8,  years:40, monthly:300, desc:'starting to save and invest from your very first job' },
  { slug:'5-year-sprint',           name:'5-Year Intensive Savings Sprint',  principal:10000, rate:6,  years:5,  monthly:2000,desc:'a focused 5-year push to reach a major financial goal' },
  { slug:'fire-coastfire',          name:'Coast FIRE Strategy',              principal:100000,rate:8,  years:25, monthly:0,   desc:'letting compound growth do the work toward FIRE' },
]

const ciDataContent = `const ciScenarios = ${JSON.stringify(ciScenarios, null, 2)}
module.exports = ciScenarios
`
fs.writeFileSync('data/ciScenarios.js', ciDataContent, 'utf8')
console.log('✅ data/ciScenarios.js')

const ciDir = path.join('app', 'compound-interest', 'scenario', '[scenario]')
fs.mkdirSync(ciDir, { recursive: true })

fs.writeFileSync(path.join(ciDir, 'layout.js'), `import scenarios from '../../../../data/ciScenarios'
export async function generateMetadata({ params }) {
  const sc = scenarios.find(x => x.slug === params.scenario)
  if (!sc) return { title: 'Compound Interest Calculator' }
  const mo = sc.rate / 100 / 12
  const n  = sc.years * 12
  const fv = sc.principal * Math.pow(1 + mo, n) + (sc.monthly > 0 ? sc.monthly * (Math.pow(1 + mo, n) - 1) / mo : 0)
  return {
    title: \`Compound Interest: \${sc.name} — Calculator & Results\`,
    description: \`See how compound interest grows \${sc.name.toLowerCase()}. Starting \$\${sc.principal.toLocaleString()}, \${sc.monthly > 0 ? '$' + sc.monthly + '/mo contributions, ' : ''}\${sc.rate}% return — final value ~\$\${Math.round(fv).toLocaleString()} after \${sc.years} years.\`,
    alternates: { canonical: \`https://freefincalc.net/compound-interest/scenario/\${sc.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(ciDir, 'page.js'), `import scenarios from '../../../../data/ciScenarios'
import CIScenarioClient from './CIScenarioClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return scenarios.map(s => ({ scenario: s.slug })) }
export default function Page({ params }) {
  const item = scenarios.find(s => s.slug === params.scenario)
  if (!item) return notFound()
  return <CIScenarioClient item={item} all={scenarios} />
}
`)

fs.writeFileSync(path.join(ciDir, 'CIScenarioClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calcFV(principal, rate, years, monthly) {
  const mo = rate / 100 / 12
  const n  = years * 12
  const fv = principal * Math.pow(1 + mo, n) + (monthly > 0 && mo > 0 ? monthly * (Math.pow(1 + mo, n) - 1) / mo : monthly * n)
  return { fv, gains: fv - principal - monthly * n, deposits: monthly * n }
}

export default function CIScenarioClient({ item: sc, all }) {
  const [principal, setPrincipal] = useState(sc.principal)
  const [rate,      setRate]      = useState(sc.rate)
  const [years,     setYears]     = useState(sc.years)
  const [monthly,   setMonthly]   = useState(sc.monthly)
  const { fv, gains, deposits } = calcFV(principal, rate, years, monthly)
  const totalIn = principal + deposits

  const st = {
    page: { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap: { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:   { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:  { color:'#64748b', textDecoration:'none' },
    h1:   { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:  { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
    card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:  { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:  { fontSize:24, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr: { width:'100%', accentColor:'#f0c842' },
    box:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:   { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:    { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:  { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    scA:  { display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA:{ display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={st.page}>
      <Header />
      <div style={st.wrap}>
        <nav style={st.bc}>
          <a href="/" style={st.bcA}>Home</a><span>›</span>
          <a href="/compound-interest" style={st.bcA}>Compound Interest</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{sc.name}</span>
        </nav>
        <h1 style={st.h1}>Compound Interest: {sc.name}</h1>
        <p style={st.sub}>See exactly how compound interest grows {sc.desc}.</p>

        <div style={st.grid}>
          <div style={st.card}>
            <label style={st.lbl}>Starting Amount</label>
            <div style={st.val}>{fmt(principal)}</div>
            <input type="range" min={0} max={Math.max(principal * 5, 200000)} step={500} value={principal} onChange={e => setPrincipal(+e.target.value)} style={st.sldr} />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Monthly Contribution</label>
            <div style={st.val}>{fmt(monthly)}/mo</div>
            <input type="range" min={0} max={Math.max(monthly * 5, 5000)} step={50} value={monthly} onChange={e => setMonthly(+e.target.value)} style={st.sldr} />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Annual Return Rate</label>
            <div style={st.val}>{rate}%</div>
            <input type="range" min={0.5} max={20} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={st.sldr} />
          </div>
          <div style={st.card}>
            <label style={st.lbl}>Time Period</label>
            <div style={st.val}>{years} years</div>
            <input type="range" min={1} max={50} step={1} value={years} onChange={e => setYears(+e.target.value)} style={st.sldr} />
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Growth Summary</h2>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Total Deposited</span><span style={{fontWeight:700}}>{fmt(totalIn)}</span></div>
          <div style={st.row}><span style={{color:'#94a3b8'}}>Interest / Growth Earned</span><span style={{fontWeight:700, color:'#10b981'}}>{fmt(gains)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0 0'}}>
            <span style={{fontWeight:700, fontSize:15}}>Final Value</span>
            <span style={{fontWeight:800, fontSize:22, color:'#f0c842'}}>{fmt(fv)}</span>
          </div>
          {gains > 0 && <div style={{marginTop:10, fontSize:13, color:'#64748b'}}>
            Compound interest contributed <strong style={{color:'#10b981'}}>{Math.round(gains/fv*100)}%</strong> of the final balance — your money did {Math.round(gains/totalIn*100)}% of the work.
          </div>}
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>The Power of Compound Interest</h2>
          <p style={st.p}>This scenario — {sc.desc} — demonstrates one of the most powerful forces in personal finance. Albert Einstein reportedly called compound interest the eighth wonder of the world. Starting with {fmt(principal)} and adding {fmt(monthly)}/month at {rate}% for {years} years results in <strong style={{color:'#f0c842'}}>{fmt(fv)}</strong> — where compound growth accounts for {fmt(gains)} of that total.</p>
          <p style={st.p}>The most important variable is time. Starting just 5 years earlier can double your final balance. The second most important variable is consistency — missing contributions is far more damaging than you might expect.</p>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          {[['/compound-interest','Compound Interest'],['/investment-return-calculator','Investment Return'],['/savings-goal-calculator','Savings Goal'],['/retirement-calculator','Retirement Calculator'],['/roth-ira-calculator','Roth IRA Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={st.calcA}>{lbl}</a>
          ))}
        </div>
        <div style={st.box}>
          <h2 style={st.h2}>More Compound Interest Scenarios</h2>
          {all.filter(x => x.slug !== sc.slug).slice(0, 30).map(x => (
            <a key={x.slug} href={'/compound-interest/scenario/' + x.slug} style={st.scA}>{x.name}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`)
console.log('✅ compound-interest/scenario/[scenario] — 50 pages')

// ═════════════════════════════════════════════════════════════════════════════
// UPDATE SITEMAP
// ═════════════════════════════════════════════════════════════════════════════
let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) {}

function addToSitemap(items, urlFn, sm) {
  const entries = items.map(item => `  <url>
    <loc>${urlFn(item)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')
  return sm.replace('</urlset>', entries + '\n</urlset>')
}

if (sitemap) {
  if (!sitemap.includes('/tax-calculator/state/')) {
    sitemap = addToSitemap(taxStates, s => `https://freefincalc.net/tax-calculator/state/${s.slug}`, sitemap)
    console.log('✅ sitemap: +50 tax by state')
  }
  if (!sitemap.includes('/savings-goal-calculator/goal/')) {
    sitemap = addToSitemap(savingsGoals, g => `https://freefincalc.net/savings-goal-calculator/goal/${g.slug}`, sitemap)
    console.log('✅ sitemap: +50 savings goals')
  }
  if (!sitemap.includes('/compound-interest/scenario/')) {
    sitemap = addToSitemap(ciScenarios, s => `https://freefincalc.net/compound-interest/scenario/${s.slug}`, sitemap)
    console.log('✅ sitemap: +50 compound interest scenarios')
  }
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
  console.log('✅ public/sitemap.xml updated')
}

console.log(`
╔══════════════════════════════════════════════╗
║  BUILD COMPLETE                              ║
╠══════════════════════════════════════════════╣
║  Tax by state:             50 pages          ║
║  Savings goals:            50 pages          ║
║  Compound interest:        50 pages          ║
║  ─────────────────────────────────────────── ║
║  Total new pages:         150                ║
║  Running total:          ~585 pages          ║
║  Remaining to 1000:      ~415 pages          ║
╚══════════════════════════════════════════════╝

Deploy:
  git add -A
  git commit -m "feat: 150 more SEO pages - tax/savings/compound"
  vercel --prod
`)
