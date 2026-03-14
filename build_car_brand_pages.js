/**
 * Batch 1: Car Loan Calculator by Brand — 50 pages
 * Route: /car-loan-calculator/brand/[brand]
 * node build_car_brand_pages.js
 */
const fs = require('fs')
const path = require('path')

fs.mkdirSync('data', { recursive: true })

const data = `const carBrands = [
  { slug:'toyota',      name:'Toyota',      avg:32000, rate:6.5, term:60, down:10, desc:'the best-selling car brand in America known for reliability' },
  { slug:'honda',       name:'Honda',       avg:30000, rate:6.6, term:60, down:10, desc:'a top-rated Japanese automaker known for fuel efficiency' },
  { slug:'ford',        name:'Ford',        avg:38000, rate:7.2, term:60, down:10, desc:"America's best-selling truck and car brand" },
  { slug:'chevrolet',   name:'Chevrolet',   avg:36000, rate:7.1, term:60, down:10, desc:'a classic American brand with a wide range of vehicles' },
  { slug:'bmw',         name:'BMW',         avg:62000, rate:5.9, term:60, down:15, desc:'a German luxury automaker known for performance and engineering' },
  { slug:'mercedes',    name:'Mercedes-Benz',avg:65000,rate:5.8, term:60, down:15, desc:'one of the most prestigious luxury car brands in the world' },
  { slug:'audi',        name:'Audi',        avg:58000, rate:5.9, term:60, down:15, desc:'a German luxury brand known for its quattro all-wheel drive' },
  { slug:'tesla',       name:'Tesla',       avg:52000, rate:5.5, term:60, down:10, desc:'the world leader in electric vehicles and autonomous driving' },
  { slug:'nissan',      name:'Nissan',      avg:28000, rate:6.8, term:60, down:10, desc:'a Japanese automaker offering reliable and affordable vehicles' },
  { slug:'hyundai',     name:'Hyundai',     avg:27000, rate:6.9, term:60, down:10, desc:'a South Korean brand offering outstanding value and warranty' },
  { slug:'kia',         name:'Kia',         avg:26000, rate:7.0, term:60, down:10, desc:'a South Korean brand famous for its 10-year powertrain warranty' },
  { slug:'volkswagen',  name:'Volkswagen',  avg:32000, rate:6.4, term:60, down:10, desc:'a German automaker known for engineering quality and value' },
  { slug:'subaru',      name:'Subaru',      avg:33000, rate:6.5, term:60, down:10, desc:'a Japanese brand famous for all-wheel drive and safety ratings' },
  { slug:'mazda',       name:'Mazda',       avg:29000, rate:6.6, term:60, down:10, desc:'a Japanese automaker known for driving dynamics and reliability' },
  { slug:'lexus',       name:'Lexus',       avg:55000, rate:5.8, term:60, down:15, desc:"Toyota's luxury division known for unmatched reliability" },
  { slug:'acura',       name:'Acura',       avg:48000, rate:5.9, term:60, down:15, desc:"Honda's luxury division offering sport-tuned performance" },
  { slug:'infiniti',    name:'Infiniti',    avg:46000, rate:6.0, term:60, down:15, desc:"Nissan's luxury brand offering powerful and refined vehicles" },
  { slug:'cadillac',    name:'Cadillac',    avg:58000, rate:6.2, term:60, down:15, desc:'the flagship American luxury brand with a storied history' },
  { slug:'lincoln',     name:'Lincoln',     avg:56000, rate:6.3, term:60, down:15, desc:"Ford's luxury division offering quiet and comfortable vehicles" },
  { slug:'jeep',        name:'Jeep',        avg:42000, rate:7.3, term:60, down:10, desc:'the iconic American off-road brand owned by Stellantis' },
  { slug:'ram',         name:'Ram',         avg:48000, rate:7.2, term:60, down:10, desc:'the top-ranked full-size pickup truck for interior quality' },
  { slug:'dodge',       name:'Dodge',       avg:38000, rate:7.4, term:60, down:10, desc:'an American muscle car and performance vehicle brand' },
  { slug:'chrysler',    name:'Chrysler',    avg:35000, rate:7.3, term:60, down:10, desc:'an American brand known for minivans and family vehicles' },
  { slug:'buick',       name:'Buick',       avg:40000, rate:6.5, term:60, down:12, desc:'a refined American brand known for quiet and comfortable rides' },
  { slug:'gmc',         name:'GMC',         avg:50000, rate:7.0, term:60, down:10, desc:'a professional-grade truck and SUV brand from General Motors' },
  { slug:'volvo',       name:'Volvo',       avg:52000, rate:5.9, term:60, down:15, desc:'a Swedish luxury brand synonymous with safety innovation' },
  { slug:'porsche',     name:'Porsche',     avg:95000, rate:5.5, term:60, down:20, desc:'a German luxury sports car brand with iconic performance' },
  { slug:'land-rover',  name:'Land Rover',  avg:72000, rate:6.0, term:60, down:15, desc:'a British luxury off-road vehicle brand' },
  { slug:'jaguar',      name:'Jaguar',      avg:68000, rate:6.1, term:60, down:15, desc:'a British luxury sports car brand known for elegance' },
  { slug:'genesis',     name:'Genesis',     avg:50000, rate:5.8, term:60, down:15, desc:"Hyundai's luxury division offering premium vehicles at lower prices" },
  { slug:'rivian',      name:'Rivian',      avg:70000, rate:6.0, term:60, down:15, desc:'an American electric adventure vehicle startup' },
  { slug:'lucid',       name:'Lucid',       avg:85000, rate:5.9, term:60, down:15, desc:'an American luxury electric vehicle brand with record range' },
  { slug:'alfa-romeo',  name:'Alfa Romeo',  avg:48000, rate:6.5, term:60, down:15, desc:'an Italian luxury brand known for passionate driving dynamics' },
  { slug:'maserati',    name:'Maserati',    avg:90000, rate:6.0, term:60, down:20, desc:'an Italian luxury brand combining performance with elegance' },
  { slug:'mini',        name:'MINI',        avg:32000, rate:6.4, term:60, down:10, desc:'a British brand known for iconic styling and go-kart handling' },
  { slug:'mitsubishi',  name:'Mitsubishi',  avg:24000, rate:7.2, term:60, down:10, desc:'a Japanese brand offering affordable and practical vehicles' },
  { slug:'polestar',    name:'Polestar',    avg:58000, rate:5.9, term:60, down:15, desc:'a Swedish electric performance car brand from Volvo' },
  { slug:'lincoln-navigator', name:'Lincoln Navigator', avg:80000, rate:6.1, term:60, down:15, desc:'a full-size luxury SUV with first-class cabin appointments' },
  { slug:'ford-f150',   name:'Ford F-150',  avg:52000, rate:7.0, term:60, down:10, desc:"America's best-selling vehicle for over 40 consecutive years" },
  { slug:'chevy-silverado', name:'Chevy Silverado', avg:50000, rate:7.0, term:60, down:10, desc:'the second best-selling vehicle in America' },
  { slug:'toyota-camry',name:'Toyota Camry',avg:28000, rate:6.4, term:60, down:10, desc:"America's best-selling sedan for over two decades" },
  { slug:'honda-crv',   name:'Honda CR-V',  avg:33000, rate:6.5, term:60, down:10, desc:"America's best-selling compact SUV" },
  { slug:'toyota-rav4', name:'Toyota RAV4', avg:34000, rate:6.4, term:60, down:10, desc:'the best-selling SUV in the United States' },
  { slug:'tesla-model3',name:'Tesla Model 3',avg:42000,rate:5.4, term:60, down:10, desc:"the world's best-selling electric car" },
  { slug:'honda-accord',name:'Honda Accord',avg:30000, rate:6.5, term:60, down:10, desc:'a perennially top-rated midsize sedan' },
  { slug:'bmw-3series', name:'BMW 3 Series',avg:48000, rate:5.8, term:60, down:15, desc:'the benchmark sports sedan that defines the compact luxury segment' },
  { slug:'mercedes-c-class', name:'Mercedes C-Class', avg:50000, rate:5.7, term:60, down:15, desc:'Mercedes entry-level luxury sedan with full-size presence' },
  { slug:'audi-a4',     name:'Audi A4',     avg:46000, rate:5.8, term:60, down:15, desc:'a refined German luxury sports sedan with quattro AWD' },
  { slug:'ford-mustang',name:'Ford Mustang',avg:35000, rate:7.1, term:60, down:10, desc:"America's iconic pony car with over 55 years of heritage" },
  { slug:'chevrolet-corvette', name:'Chevrolet Corvette', avg:72000, rate:6.5, term:60, down:15, desc:"America's only true production sports car" },
]
module.exports = carBrands
`
fs.writeFileSync('data/carBrands.js', data, 'utf8')
console.log('✅ data/carBrands.js — 50 brands')

const dir = path.join('app', 'car-loan-calculator', 'brand', '[brand]')
fs.mkdirSync(dir, { recursive: true })

const layout = `import brands from '../../../../data/carBrands'
export async function generateMetadata({ params }) {
  const b = brands.find(x => x.slug === params.brand)
  if (!b) return { title: 'Car Loan Calculator' }
  const loan = b.avg * (1 - b.down / 100)
  const mo = b.rate / 100 / 12
  const pmt = Math.round(loan * mo / (1 - Math.pow(1 + mo, -b.term)))
  return {
    title: \`\${b.name} Car Loan Calculator 2026 — Monthly Payment & Financing\`,
    description: \`Calculate your \${b.name} car loan payment. Avg price \$\${b.avg.toLocaleString()}, rate \${b.rate}%, est. \$\${pmt}/month. Compare \${b.term}-month financing options.\`,
    alternates: { canonical: \`https://www.freefincalc.net/car-loan-calculator/brand/\${b.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`
fs.writeFileSync(path.join(dir, 'layout.js'), layout, 'utf8')

const page = `import brands from '../../../../data/carBrands'
import CarBrandClient from './CarBrandClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return brands.map(b => ({ brand: b.slug }))
}
export default function Page({ params }) {
  const brand = brands.find(b => b.slug === params.brand)
  if (!brand) return notFound()
  return <CarBrandClient brand={brand} allBrands={brands} />
}
`
fs.writeFileSync(path.join(dir, 'page.js'), page, 'utf8')

const client = `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calc(price, down, rate, term) {
  const loan = price * (1 - down / 100)
  const mo = rate / 100 / 12
  const n = term
  const pmt = mo > 0 ? loan * mo / (1 - Math.pow(1 + mo, -n)) : loan / n
  return { pmt, loan, totalInterest: pmt * n - loan, total: pmt * n }
}

export default function CarBrandClient({ brand, allBrands }) {
  const [price,  setPrice]  = useState(brand.avg)
  const [down,   setDown]   = useState(brand.down)
  const [rate,   setRate]   = useState(brand.rate)
  const [term,   setTerm]   = useState(brand.term)
  const r = calc(price, down, rate, term)

  const s = {
    page:  { minHeight:'100vh', background:'#0f1117', color:'#e2e8f0' },
    wrap:  { maxWidth:860, margin:'0 auto', padding:'32px 16px 64px' },
    bc:    { fontSize:13, color:'#64748b', marginBottom:12, display:'flex', gap:6, flexWrap:'wrap' },
    bcA:   { color:'#64748b', textDecoration:'none' },
    h1:    { fontSize:'clamp(22px,4vw,32px)', fontWeight:800, color:'#f1f5f9', margin:'0 0 8px' },
    sub:   { fontSize:15, color:'#94a3b8', margin:'0 0 28px' },
    grid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 },
    card:  { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 },
    lbl:   { fontSize:12, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6, display:'block' },
    val:   { fontSize:26, fontWeight:800, color:'#f0c842', margin:'0 0 10px' },
    sldr:  { width:'100%', accentColor:'#f0c842' },
    box:   { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20, marginBottom:20 },
    h2:    { fontSize:18, fontWeight:700, color:'#f1f5f9', margin:'0 0 14px' },
    p:     { fontSize:15, color:'#94a3b8', lineHeight:1.7, margin:'0 0 10px' },
    row:   { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    brandA:{ display:'inline-block', padding:'5px 12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'#94a3b8', textDecoration:'none', fontSize:12, margin:'0 6px 6px 0' },
    calcA: { display:'inline-block', padding:'8px 14px', background:'rgba(240,200,66,0.08)', border:'1px solid rgba(240,200,66,0.2)', borderRadius:8, color:'#f0c842', textDecoration:'none', fontSize:13, fontWeight:600, margin:'0 8px 8px 0' },
  }

  return (
    <div style={s.page}>
      <Header />
      <div style={s.wrap}>
        <nav style={s.bc}>
          <a href="/" style={s.bcA}>Home</a><span>›</span>
          <a href="/car-loan-calculator" style={s.bcA}>Car Loan Calculator</a><span>›</span>
          <span style={{color:'#94a3b8'}}>{brand.name}</span>
        </nav>
        <h1 style={s.h1}>{brand.name} Car Loan Calculator 2026</h1>
        <p style={s.sub}>Estimate your monthly {brand.name} payment with real 2026 financing rates.</p>

        <div style={s.grid}>
          <div style={s.card}>
            <label style={s.lbl}>Vehicle Price</label>
            <div style={s.val}>{fmt(price)}</div>
            <input type="range" min={5000} max={brand.avg * 3} step={500} value={price} onChange={e => setPrice(+e.target.value)} style={s.sldr} />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Down Payment ({down}%)</label>
            <div style={s.val}>{fmt(price * down / 100)}</div>
            <input type="range" min={0} max={50} step={1} value={down} onChange={e => setDown(+e.target.value)} style={s.sldr} />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Interest Rate</label>
            <div style={s.val}>{rate}%</div>
            <input type="range" min={1} max={20} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={s.sldr} />
          </div>
          <div style={s.card}>
            <label style={s.lbl}>Loan Term (months)</label>
            <div style={s.val}>{term} mo</div>
            <input type="range" min={24} max={84} step={12} value={term} onChange={e => setTerm(+e.target.value)} style={s.sldr} />
          </div>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>{brand.name} Monthly Payment</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Loan Amount</span><span style={{fontWeight:700}}>{fmt(r.loan)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:700, color:'#f0c842', fontSize:20}}>{fmt(r.pmt)}/mo</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700}}>{fmt(r.totalInterest)}</span></div>
          <div style={{...s.row, borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(r.total)}</span></div>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>{brand.name} Financing Guide 2026</h2>
          <p style={s.p}>{brand.name} is {brand.desc}. The average {brand.name} price in 2026 is <strong style={{color:'#e2e8f0'}}>{fmt(brand.avg)}</strong>, and with a typical {brand.down}% down payment and {brand.rate}% APR on a {brand.term}-month loan, your monthly payment would be approximately <strong style={{color:'#f0c842'}}>{fmt(calc(brand.avg, brand.down, brand.rate, brand.term).pmt)}/month</strong>.</p>
          <p style={s.p}>{brand.name} dealers often advertise special APR promotions — sometimes as low as 0% for qualified buyers. Always compare dealer financing against your bank or credit union before signing. Even a 1% difference in rate on a {fmt(brand.avg)} vehicle saves over {fmt((brand.avg * 0.9) * 0.01 * brand.term / 12 * 0.5)} over the life of the loan.</p>
          <p style={s.p}>Longer loan terms (72 or 84 months) lower your monthly payment but significantly increase total interest paid. Use the sliders above to see how term length affects your total cost.</p>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>Related Calculators</h2>
          {[['/car-loan-calculator','Car Loan Calculator'],['/car-affordability-calculator','Car Affordability'],['/car-depreciation-calculator','Car Depreciation'],['/lease-vs-buy-calculator','Lease vs Buy'],['/fuel-cost-calculator','Fuel Cost Calculator']].map(([href,lbl]) => (
            <a key={href} href={href} style={s.calcA}>{lbl}</a>
          ))}
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>Car Loan Calculator by Brand</h2>
          {allBrands.filter(b => b.slug !== brand.slug).map(b => (
            <a key={b.slug} href={'/car-loan-calculator/brand/' + b.slug} style={s.brandA}>{b.name}</a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
`
fs.writeFileSync(path.join(dir, 'CarBrandClient.js'), client, 'utf8')
console.log('✅ car-loan-calculator/brand/[brand] — 50 pages created')
