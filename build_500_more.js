/**
 * FreeFinCalc.net — 500 MORE pages
 *
 * Batch A: Mortgage by Home Price           — 50 pages
 * Batch B: Car Loan by Vehicle Price        — 50 pages
 * Batch C: 401k by Salary                  — 50 pages
 * Batch D: Credit Card Payoff by Balance    — 50 pages
 * Batch E: Student Loan by Amount           — 50 pages
 * Batch F: Rent vs Buy by City              — 50 pages
 * Batch G: Freelance Rate by Profession     — 50 pages
 * Batch H: Break-Even by Business Type      — 50 pages
 * Batch I: Inflation by Year                — 50 pages
 * Batch J: Salary Comparison by State       — 50 pages
 *
 * Total: 500 new pages → ~1435 total
 *
 * node build_500_more.js
 */

const fs   = require('fs')
const path = require('path')
fs.mkdirSync('data', { recursive: true })

function addToSitemap(items, urlFn, sm) {
  const entries = items.map(i =>
    `  <url>\n    <loc>${urlFn(i)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  ).join('\n')
  return sm.replace('</urlset>', entries + '\n</urlset>')
}

function buildBatch(label, dataFile, dataVar, data, appSegments, paramKey, layoutFn, clientFileName, clientCode) {
  const dataContent = `const ${dataVar} = ${JSON.stringify(data, null, 2)}\nmodule.exports = ${dataVar}\n`
  fs.writeFileSync(dataFile, dataContent, 'utf8')

  const dir = path.join('app', ...appSegments)
  fs.mkdirSync(dir, { recursive: true })
  const depth = appSegments.length
  const rel   = Array(depth).fill('..').join('/')

  fs.writeFileSync(path.join(dir, 'layout.js'),  layoutFn(rel), 'utf8')
  fs.writeFileSync(path.join(dir, 'page.js'),
`import ${dataVar} from '${rel}/${dataFile}'
import ${clientFileName.replace('.js','')} from './${clientFileName}'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return ${dataVar}.map(x => ({ ${paramKey}: x.slug })) }
export default function Page({ params }) {
  const item = ${dataVar}.find(x => x.slug === params.${paramKey})
  if (!item) return notFound()
  return <${clientFileName.replace('.js','')} item={item} all={${dataVar}} />
}
`, 'utf8')
  fs.writeFileSync(path.join(dir, clientFileName), clientCode(rel), 'utf8')
  console.log('✅ ' + label + ' — ' + data.length + ' pages')
}

// shared mini-styles string used by all clients
const S = `const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}`

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function pmtCalc(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}

// ═══════════════════════════════════════════════════════════════════════
// BATCH A — Mortgage by Home Price (50 pages)
// /mortgage-calculator/price/[price]
// ═══════════════════════════════════════════════════════════════════════
const homePrices = [
  100000,125000,150000,175000,200000,225000,250000,275000,300000,325000,
  350000,375000,400000,425000,450000,475000,500000,550000,600000,650000,
  700000,750000,800000,850000,900000,950000,1000000,1100000,1200000,1300000,
  1400000,1500000,1750000,2000000,2500000,
  180000,220000,260000,290000,320000,360000,410000,460000,520000,580000,
  630000,680000,730000,780000,840000,
].filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b).slice(0,50).map(price=>({
  slug: 'price-'+price,
  name: '$'+price.toLocaleString(),
  price,
  down20: Math.round(price*0.20),
  down10: Math.round(price*0.10),
  pmt20_30: Math.round(pmtCalc(price*0.80,7.0,360)),
  pmt10_30: Math.round(pmtCalc(price*0.90,7.0,360)),
  pmt20_15: Math.round(pmtCalc(price*0.80,6.5,180)),
  annualIncome: Math.round(price/4),
}))

buildBatch(
  'mortgage-calculator/price/[price]',
  'data/homePrices.js', 'homePrices', homePrices,
  ['mortgage-calculator','price','[price]'],
  'price',
  (rel) => `import items from '${rel}/data/homePrices'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.price)
  if (!it) return { title: 'Mortgage Calculator' }
  return {
    title: \`Mortgage Calculator for \$\${it.price.toLocaleString()} Home — Monthly Payment 2026\`,
    description: \`What is the monthly mortgage payment on a \$\${it.price.toLocaleString()} home? 20% down, 30-year at 7%: ~\$\${it.pmt20_30.toLocaleString()}/mo. 10% down: ~\$\${it.pmt10_30.toLocaleString()}/mo. Free calculator.\`,
    alternates: { canonical: \`https://freefincalc.net/mortgage-calculator/price/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'MortgagePriceClient.js',
  (rel) => `'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
${S}
export default function MortgagePriceClient({item:it,all}){
  const[price,setPrice]=useState(it.price)
  const[down,setDown]=useState(20)
  const[rate,setRate]=useState(7.0)
  const[term,setTerm]=useState(30)
  const loan=price*(1-down/100)
  const monthly=pmt(loan,rate,term*12)
  const total=monthly*term*12
  const interest=total-loan
  const income=Math.round(monthly/0.28*12)
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/mortgage-calculator" style={s.bcA}>Mortgage Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(price)} Home</span></nav>
    <h1 style={s.h1}>Mortgage Calculator: {fmt(price)} Home</h1>
    <p style={s.sub}>Calculate your exact monthly payment, total interest, and income needed for a {fmt(price)} home purchase.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Home Price</label><div style={s.val}>{fmt(price)}</div><input type="range" min={50000} max={Math.max(price*2,2000000)} step={5000} value={price} onChange={e=>setPrice(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Down Payment</label><div style={s.val}>{down}% — {fmt(price*down/100)}</div><input type="range" min={3} max={50} step={1} value={down} onChange={e=>setDown(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Interest Rate</label><div style={s.val}>{rate}%</div><input type="range" min={3} max={12} step={0.05} value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Loan Term</label><div style={s.val}>{term} years</div><input type="range" min={10} max={30} step={5} value={term} onChange={e=>setTerm(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Payment Summary — {fmt(price)} Home</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment (P+I)</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Loan Amount</span><span style={{fontWeight:700}}>{fmt(loan)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest Paid</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Cost of Home</span><span style={{fontWeight:700}}>{fmt(total+price*down/100)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Income Needed (28% rule)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(income)}/yr</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Quick Rate Comparison</h2>
      {[[6.0,30],[6.5,30],[7.0,30],[7.5,30],[6.5,15],[7.0,15]].map(([r,t])=>(<div key={r+'-'+t} style={s.row}><span style={{color:'#94a3b8'}}>{r}% / {t}-yr</span><span style={{fontWeight:700}}>{fmt(pmt(loan,r,t*12))}/mo</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/mortgage-calculator','Mortgage Calculator'],['/home-affordability-calculator','Home Affordability'],['/down-payment-calculator','Down Payment'],['/refinance-calculator','Refinance Calculator'],['/rent-vs-buy-calculator','Rent vs Buy']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Mortgage Calculator by Home Price</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/mortgage-calculator/price/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH B — Car Loan by Vehicle Price (50 pages)
// /car-loan-calculator/price/[price]
// ═══════════════════════════════════════════════════════════════════════
const carPrices = [
  10000,12000,14000,15000,16000,18000,20000,22000,24000,25000,
  26000,28000,30000,32000,34000,35000,36000,38000,40000,42000,
  44000,45000,48000,50000,52000,55000,58000,60000,65000,70000,
  75000,80000,85000,90000,100000,
  17000,21000,23000,27000,29000,31000,33000,37000,39000,43000,
  46000,53000,56000,63000,68000,
].filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b).slice(0,50).map(price=>({
  slug:'car-'+price,
  name:'$'+price.toLocaleString()+' Vehicle',
  price,
  down10:Math.round(price*0.10),
  pmt48:Math.round(pmtCalc(price*0.9,6.5,48)),
  pmt60:Math.round(pmtCalc(price*0.9,6.5,60)),
  pmt72:Math.round(pmtCalc(price*0.9,7.5,72)),
  type: price<20000?'used car':price<40000?'new midsize car':price<60000?'luxury or full-size vehicle':'premium luxury or truck',
}))

buildBatch(
  'car-loan-calculator/price/[price]',
  'data/carPrices.js','carPrices',carPrices,
  ['car-loan-calculator','price','[price]'],
  'price',
  (rel)=>`import items from '${rel}/data/carPrices'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.price)
  if (!it) return { title: 'Car Loan Calculator' }
  return {
    title: \`Car Loan Calculator for \$\${it.price.toLocaleString()} Vehicle — Monthly Payment 2026\`,
    description: \`Monthly car loan payment on a \$\${it.price.toLocaleString()} vehicle. 48-mo: ~\$\${it.pmt48}/mo. 60-mo: ~\$\${it.pmt60}/mo. 72-mo: ~\$\${it.pmt72}/mo. Compare rates free.\`,
    alternates: { canonical: \`https://freefincalc.net/car-loan-calculator/price/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'CarLoanPriceClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
${S}
export default function CarLoanPriceClient({item:it,all}){
  const[price,setPrice]=useState(it.price)
  const[down,setDown]=useState(10)
  const[rate,setRate]=useState(6.5)
  const[term,setTerm]=useState(60)
  const loan=price*(1-down/100)
  const monthly=pmt(loan,rate,term)
  const total=monthly*term
  const interest=total-loan
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/car-loan-calculator" style={s.bcA}>Car Loan Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(price)} Vehicle</span></nav>
    <h1 style={s.h1}>Car Loan Calculator: {fmt(price)} Vehicle</h1>
    <p style={s.sub}>A {fmt(price)} vehicle is a {it.type}. Calculate your exact monthly payment and total loan cost.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Vehicle Price</label><div style={s.val}>{fmt(price)}</div><input type="range" min={5000} max={200000} step={500} value={price} onChange={e=>setPrice(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Down Payment</label><div style={s.val}>{down}% — {fmt(price*down/100)}</div><input type="range" min={0} max={50} step={1} value={down} onChange={e=>setDown(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>APR Rate</label><div style={s.val}>{rate}%</div><input type="range" min={1} max={25} step={0.25} value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Loan Term (months)</label><div style={s.val}>{term} months</div><input type="range" min={24} max={84} step={12} value={term} onChange={e=>setTerm(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Loan Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Loan Amount</span><span style={{fontWeight:700}}>{fmt(loan)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Cost</span><span style={{fontWeight:700}}>{fmt(total+price*down/100)}</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Term Comparison</h2>
      {[[48,5.9],[60,6.5],[72,7.5],[84,8.5]].map(([t,r])=>(<div key={t} style={s.row}><span style={{color:'#94a3b8'}}>{t}-month at {r}%</span><span style={{fontWeight:700}}>{fmt(pmt(loan,r,t))}/mo — {fmt(pmt(loan,r,t)*t-loan)} interest</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/car-loan-calculator','Car Loan'],['/auto-lease-calculator','Auto Lease'],['/car-affordability-calculator','Car Affordability'],['/loan-payoff-calculator','Loan Payoff'],['/trade-in-calculator','Trade-In Value']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Car Loan by Vehicle Price</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/car-loan-calculator/price/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH C — 401k by Salary (50 pages)
// /401k-calculator/salary/[salary]
// ═══════════════════════════════════════════════════════════════════════
const salaries401k = [
  30000,35000,40000,45000,50000,55000,60000,65000,70000,75000,
  80000,85000,90000,95000,100000,105000,110000,115000,120000,130000,
  140000,150000,160000,175000,200000,225000,250000,275000,300000,
  42000,48000,52000,58000,62000,68000,72000,78000,82000,88000,
  92000,98000,108000,118000,125000,135000,145000,165000,185000,210000,
].filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b).slice(0,50).map(sal=>({
  slug:'salary-'+sal,
  name:'$'+sal.toLocaleString()+'/yr',
  salary:sal,
  contrib6:Math.round(sal*0.06),
  contrib10:Math.round(sal*0.10),
  match:Math.round(sal*0.03),
  maxContrib:23000,
  fv30:Math.round(sal*0.10*(Math.pow(1+8/100/12,360)-1)/(8/100/12)+sal*0.03*(Math.pow(1+8/100/12,360)-1)/(8/100/12)),
}))

buildBatch(
  '401k-calculator/salary/[salary]',
  'data/salaries401k.js','salaries401k',salaries401k,
  ['401k-calculator','salary','[salary]'],
  'salary',
  (rel)=>`import items from '${rel}/data/salaries401k'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.salary)
  if (!it) return { title: '401k Calculator' }
  return {
    title: \`401k Calculator for \$\${it.salary.toLocaleString()} Salary — 2026 Retirement Projections\`,
    description: \`How much will your 401k grow on a \$\${it.salary.toLocaleString()} salary? At 10% contribution + 3% match over 30 years: ~\$\${it.fv30.toLocaleString()}. Free 401k planner.\`,
    alternates: { canonical: \`https://freefincalc.net/401k-calculator/salary/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'FourOhOneKClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function fv(monthly,rate,years){const mo=rate/100/12,n=years*12;return mo>0?monthly*(Math.pow(1+mo,n)-1)/mo:monthly*n}
${S}
export default function FourOhOneKClient({item:it,all}){
  const[salary,setSalary]=useState(it.salary)
  const[contrib,setContrib]=useState(10)
  const[match,setMatch]=useState(3)
  const[rate,setRate]=useState(8)
  const[years,setYears]=useState(30)
  const yourMonthly=salary*contrib/100/12
  const matchMonthly=salary*Math.min(match,contrib)/100/12
  const total=fv(yourMonthly+matchMonthly,rate,years)
  const yourOnly=fv(yourMonthly,rate,years)
  const matchValue=total-yourOnly
  const income=total*0.04/12
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/401k-calculator" style={s.bcA}>401k Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(salary)}/yr</span></nav>
    <h1 style={s.h1}>401k Calculator: {fmt(salary)}/Year Salary</h1>
    <p style={s.sub}>See exactly how much your 401k will grow on a {fmt(salary)}/year salary, including employer match.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Annual Salary</label><div style={s.val}>{fmt(salary)}/yr</div><input type="range" min={20000} max={500000} step={5000} value={salary} onChange={e=>setSalary(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Your Contribution</label><div style={s.val}>{contrib}% — {fmt(salary*contrib/100/12)}/mo</div><input type="range" min={1} max={23} step={1} value={contrib} onChange={e=>setContrib(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Employer Match</label><div style={s.val}>{match}% — {fmt(salary*Math.min(match,contrib)/100/12)}/mo</div><input type="range" min={0} max={10} step={0.5} value={match} onChange={e=>setMatch(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Years to Retirement</label><div style={s.val}>{years} years</div><input type="range" min={5} max={45} step={1} value={years} onChange={e=>setYears(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>401k Projection — {fmt(salary)}/yr</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Your Contributions Grown</span><span style={{fontWeight:700}}>{fmt(yourOnly)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Employer Match Grown</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(matchValue)} free money</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total 401k Balance</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(total)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Monthly Retirement Income (4%)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(income)}/mo</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Maximizing Your 401k on {fmt(salary)}/yr</h2><p style={s.p}>On a {fmt(salary)}/year salary, contributing {contrib}% ({fmt(salary*contrib/100/12)}/month) plus {match}% employer match grows to <strong style={{color:'#f0c842'}}>{fmt(total)}</strong> over {years} years at {rate}% return. The employer match alone adds <strong style={{color:'#10b981'}}>{fmt(matchValue)}</strong> — always contribute at least enough to capture the full match. The 2026 401k contribution limit is $23,000 ($30,500 if 50+).</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/401k-calculator','401k Calculator'],['/retirement-calculator','Retirement Calculator'],['/roth-ira-calculator','Roth IRA'],['/traditional-ira-calculator','Traditional IRA'],['/social-security-calculator','Social Security']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>401k Calculator by Salary</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/401k-calculator/salary/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH D — Credit Card Payoff by Balance (50 pages)
// /credit-card-payoff-calculator/balance/[balance]
// ═══════════════════════════════════════════════════════════════════════
const ccBalances = [
  500,750,1000,1500,2000,2500,3000,3500,4000,4500,
  5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,
  10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,
  20000,22000,25000,28000,30000,32000,35000,38000,40000,45000,
  50000,55000,60000,65000,70000,75000,80000,90000,100000,
  2750,
].filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b).slice(0,50).map(bal=>({
  slug:'balance-'+bal,
  name:'$'+bal.toLocaleString()+' Balance',
  balance:bal,
  apr:20.99,
  minPmt:Math.max(25,Math.round(bal*0.02)),
  pmt24:Math.round(pmtCalc(bal,20.99,24)),
  pmt36:Math.round(pmtCalc(bal,20.99,36)),
  pmt60:Math.round(pmtCalc(bal,20.99,60)),
}))

buildBatch(
  'credit-card-payoff-calculator/balance/[balance]',
  'data/ccBalances.js','ccBalances',ccBalances,
  ['credit-card-payoff-calculator','balance','[balance]'],
  'balance',
  (rel)=>`import items from '${rel}/data/ccBalances'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.balance)
  if (!it) return { title: 'Credit Card Payoff Calculator' }
  return {
    title: \`Credit Card Payoff Calculator: \$\${it.balance.toLocaleString()} Balance at \${it.apr}% APR\`,
    description: \`How to pay off \$\${it.balance.toLocaleString()} in credit card debt. 24-month plan: \$\${it.pmt24}/mo. 36-month: \$\${it.pmt36}/mo. See total interest and fastest payoff strategy.\`,
    alternates: { canonical: \`https://freefincalc.net/credit-card-payoff-calculator/balance/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'CCPayoffClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
function minMonths(bal,apr,payment){let b=bal,mo=apr/100/12,m=0;while(b>0&&m<600){b=b*(1+mo)-payment;m++;}return m}
${S}
export default function CCPayoffClient({item:it,all}){
  const[balance,setBalance]=useState(it.balance)
  const[apr,setApr]=useState(it.apr)
  const[monthly,setMonthly]=useState(it.pmt36)
  const mo=apr/100/12
  const months=minMonths(balance,apr,monthly)
  const total=monthly*months
  const interest=total-balance
  const minP=Math.max(25,Math.round(balance*0.02))
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/credit-card-payoff-calculator" style={s.bcA}>Credit Card Payoff</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(balance)} Balance</span></nav>
    <h1 style={s.h1}>Credit Card Payoff: {fmt(balance)} Balance</h1>
    <p style={s.sub}>Find your fastest debt-free date and total interest cost for a {fmt(balance)} credit card balance.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Balance</label><div style={s.val}>{fmt(balance)}</div><input type="range" min={100} max={Math.max(balance*3,50000)} step={100} value={balance} onChange={e=>{setBalance(+e.target.value);setMonthly(Math.round(pmt(+e.target.value,apr,36)))}} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>APR</label><div style={s.val}>{apr}%</div><input type="range" min={1} max={36} step={0.5} value={apr} onChange={e=>setApr(+e.target.value)} style={s.sldr}/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Monthly Payment</label><div style={s.val}>{fmt(monthly)}/mo</div><input type="range" min={minP} max={Math.max(balance,monthly*3)} step={50} value={monthly} onChange={e=>setMonthly(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Payoff Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Debt-Free In</span><span style={{fontWeight:800,color:'#f0c842',fontSize:18}}>{months>599?'Never (increase payment)':months+' months ('+Math.round(months/12*10)/10+' yrs)'}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest Paid</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Paid</span><span style={{fontWeight:700}}>{fmt(total)}</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Payoff Plans Compared</h2>
      {[12,24,36,60].map(t=>(<div key={t} style={s.row}><span style={{color:'#94a3b8'}}>{t}-month plan</span><span style={{fontWeight:700}}>{fmt(pmt(balance,apr,t))}/mo — {fmt(pmt(balance,apr,t)*t-balance)} interest</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/credit-card-payoff-calculator','CC Payoff'],['/debt-payoff-calculator','Debt Payoff'],['/debt-avalanche-calculator','Debt Avalanche'],['/debt-consolidation-calculator','Debt Consolidation'],['/balance-transfer-calculator','Balance Transfer']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Credit Card Payoff by Balance</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/credit-card-payoff-calculator/balance/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH E — Student Loan by Amount (50 pages)
// /student-loan-calculator/amount/[amount]
// ═══════════════════════════════════════════════════════════════════════
const studentAmounts = [
  5000,8000,10000,12000,15000,18000,20000,22000,25000,28000,
  30000,32000,35000,38000,40000,42000,45000,48000,50000,55000,
  60000,65000,70000,75000,80000,85000,90000,95000,100000,110000,
  120000,130000,140000,150000,175000,200000,225000,250000,300000,350000,
  16000,24000,33000,43000,53000,63000,73000,83000,93000,115000,
].filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>a-b).slice(0,50).map(amt=>({
  slug:'loan-'+amt,
  name:'$'+amt.toLocaleString()+' Student Loan',
  amount:amt,
  fedRate:6.54,
  pmt10:Math.round(pmtCalc(amt,6.54,120)),
  pmt20:Math.round(pmtCalc(amt,6.54,240)),
  pmt25:Math.round(pmtCalc(amt,6.54,300)),
  type:amt<30000?'typical undergrad loan':amt<80000?'grad school or high-cost undergrad':amt<150000?'professional or medical school':' medical, law, or MBA program',
}))

buildBatch(
  'student-loan-calculator/amount/[amount]',
  'data/studentAmounts.js','studentAmounts',studentAmounts,
  ['student-loan-calculator','amount','[amount]'],
  'amount',
  (rel)=>`import items from '${rel}/data/studentAmounts'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.amount)
  if (!it) return { title: 'Student Loan Calculator' }
  return {
    title: \`Student Loan Calculator: \$\${it.amount.toLocaleString()} — Monthly Payment & Payoff 2026\`,
    description: \`Monthly payment on \$\${it.amount.toLocaleString()} in student loans. 10-year standard: \$\${it.pmt10}/mo. 20-year: \$\${it.pmt20}/mo. Compare repayment plans. Income-driven options.\`,
    alternates: { canonical: \`https://freefincalc.net/student-loan-calculator/amount/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'StudentLoanClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
${S}
export default function StudentLoanClient({item:it,all}){
  const[amount,setAmount]=useState(it.amount)
  const[rate,setRate]=useState(it.fedRate)
  const[term,setTerm]=useState(10)
  const monthly=pmt(amount,rate,term*12)
  const total=monthly*term*12
  const interest=total-amount
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/student-loan-calculator" style={s.bcA}>Student Loan Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(amount)}</span></nav>
    <h1 style={s.h1}>Student Loan Calculator: {fmt(amount)}</h1>
    <p style={s.sub}>{fmt(amount)} in student loans is a {it.type}. Compare repayment plans and find your best payoff strategy.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Loan Balance</label><div style={s.val}>{fmt(amount)}</div><input type="range" min={1000} max={400000} step={1000} value={amount} onChange={e=>setAmount(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Interest Rate</label><div style={s.val}>{rate}%</div><input type="range" min={2} max={12} step={0.05} value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Repayment Term</label><div style={s.val}>{term} years</div><input type="range" min={5} max={30} step={5} value={term} onChange={e=>setTerm(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Repayment Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Repaid</span><span style={{fontWeight:700}}>{fmt(total)}</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Federal Repayment Plans for {fmt(it.amount)}</h2>
      {[[10,'Standard'],[20,'Extended'],[25,'IBR / PAYE'],[30,'ICR']].map(([t,name])=>(<div key={t} style={s.row}><span style={{color:'#94a3b8'}}>{name} ({t}-yr)</span><span style={{fontWeight:700}}>{fmt(pmt(amount,rate,t*12))}/mo — {fmt(pmt(amount,rate,t*12)*t*12-amount)} interest</span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/student-loan-calculator','Student Loan'],['/student-loan-refinance-calculator','Refinance Student Loans'],['/income-based-repayment-calculator','IBR Calculator'],['/loan-forgiveness-calculator','Loan Forgiveness'],['/debt-payoff-calculator','Debt Payoff']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Student Loan by Amount</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/student-loan-calculator/amount/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH F — Rent vs Buy by City (50 pages)
// /rent-vs-buy-calculator/city/[city]
// ═══════════════════════════════════════════════════════════════════════
const rvbCities = [
  {slug:'new-york',       name:'New York, NY',        medianHome:750000, medianRent:3200, appreciation:3.5, rent_advantage:false},
  {slug:'san-francisco',  name:'San Francisco, CA',   medianHome:1100000,medianRent:3500, appreciation:3.0, rent_advantage:true},
  {slug:'los-angeles',    name:'Los Angeles, CA',     medianHome:800000, medianRent:2800, appreciation:3.5, rent_advantage:true},
  {slug:'chicago',        name:'Chicago, IL',         medianHome:330000, medianRent:2000, appreciation:2.5, rent_advantage:false},
  {slug:'houston',        name:'Houston, TX',         medianHome:310000, medianRent:1500, appreciation:3.0, rent_advantage:false},
  {slug:'phoenix',        name:'Phoenix, AZ',         medianHome:400000, medianRent:1700, appreciation:4.0, rent_advantage:false},
  {slug:'philadelphia',   name:'Philadelphia, PA',    medianHome:250000, medianRent:1800, appreciation:2.5, rent_advantage:false},
  {slug:'san-antonio',    name:'San Antonio, TX',     medianHome:280000, medianRent:1400, appreciation:3.0, rent_advantage:false},
  {slug:'san-diego',      name:'San Diego, CA',       medianHome:850000, medianRent:2900, appreciation:3.5, rent_advantage:true},
  {slug:'dallas',         name:'Dallas, TX',          medianHome:360000, medianRent:1700, appreciation:3.5, rent_advantage:false},
  {slug:'austin',         name:'Austin, TX',          medianHome:520000, medianRent:2000, appreciation:3.0, rent_advantage:true},
  {slug:'seattle',        name:'Seattle, WA',         medianHome:700000, medianRent:2600, appreciation:3.5, rent_advantage:true},
  {slug:'denver',         name:'Denver, CO',          medianHome:560000, medianRent:2200, appreciation:3.0, rent_advantage:true},
  {slug:'boston',         name:'Boston, MA',          medianHome:650000, medianRent:3000, appreciation:3.0, rent_advantage:true},
  {slug:'nashville',      name:'Nashville, TN',       medianHome:450000, medianRent:1900, appreciation:4.0, rent_advantage:false},
  {slug:'miami',          name:'Miami, FL',           medianHome:600000, medianRent:2600, appreciation:4.0, rent_advantage:false},
  {slug:'portland',       name:'Portland, OR',        medianHome:490000, medianRent:2000, appreciation:3.0, rent_advantage:false},
  {slug:'las-vegas',      name:'Las Vegas, NV',       medianHome:380000, medianRent:1700, appreciation:3.5, rent_advantage:false},
  {slug:'atlanta',        name:'Atlanta, GA',         medianHome:380000, medianRent:1900, appreciation:3.5, rent_advantage:false},
  {slug:'minneapolis',    name:'Minneapolis, MN',     medianHome:330000, medianRent:1800, appreciation:2.5, rent_advantage:false},
  {slug:'charlotte',      name:'Charlotte, NC',       medianHome:360000, medianRent:1700, appreciation:4.0, rent_advantage:false},
  {slug:'raleigh',        name:'Raleigh, NC',         medianHome:390000, medianRent:1700, appreciation:4.0, rent_advantage:false},
  {slug:'tampa',          name:'Tampa, FL',           medianHome:380000, medianRent:1900, appreciation:4.0, rent_advantage:false},
  {slug:'orlando',        name:'Orlando, FL',         medianHome:360000, medianRent:1800, appreciation:3.5, rent_advantage:false},
  {slug:'sacramento',     name:'Sacramento, CA',      medianHome:490000, medianRent:2000, appreciation:3.0, rent_advantage:false},
  {slug:'salt-lake-city', name:'Salt Lake City, UT',  medianHome:480000, medianRent:1900, appreciation:3.5, rent_advantage:false},
  {slug:'washington-dc',  name:'Washington, DC',      medianHome:620000, medianRent:2800, appreciation:3.0, rent_advantage:true},
  {slug:'pittsburgh',     name:'Pittsburgh, PA',      medianHome:200000, medianRent:1400, appreciation:2.0, rent_advantage:false},
  {slug:'detroit',        name:'Detroit, MI',         medianHome:160000, medianRent:1100, appreciation:2.0, rent_advantage:false},
  {slug:'st-louis',       name:'St. Louis, MO',       medianHome:220000, medianRent:1300, appreciation:2.5, rent_advantage:false},
  {slug:'kansas-city',    name:'Kansas City, MO',     medianHome:250000, medianRent:1300, appreciation:3.0, rent_advantage:false},
  {slug:'columbus',       name:'Columbus, OH',        medianHome:270000, medianRent:1300, appreciation:3.0, rent_advantage:false},
  {slug:'indianapolis',   name:'Indianapolis, IN',    medianHome:240000, medianRent:1200, appreciation:2.5, rent_advantage:false},
  {slug:'baltimore',      name:'Baltimore, MD',       medianHome:290000, medianRent:1700, appreciation:2.5, rent_advantage:false},
  {slug:'memphis',        name:'Memphis, TN',         medianHome:180000, medianRent:1200, appreciation:2.5, rent_advantage:false},
  {slug:'louisville',     name:'Louisville, KY',      medianHome:220000, medianRent:1200, appreciation:2.5, rent_advantage:false},
  {slug:'richmond',       name:'Richmond, VA',        medianHome:310000, medianRent:1500, appreciation:3.0, rent_advantage:false},
  {slug:'oklahoma-city',  name:'Oklahoma City, OK',   medianHome:210000, medianRent:1100, appreciation:2.5, rent_advantage:false},
  {slug:'omaha',          name:'Omaha, NE',           medianHome:240000, medianRent:1200, appreciation:2.5, rent_advantage:false},
  {slug:'milwaukee',      name:'Milwaukee, WI',       medianHome:210000, medianRent:1300, appreciation:2.0, rent_advantage:false},
  {slug:'cincinnati',     name:'Cincinnati, OH',      medianHome:220000, medianRent:1200, appreciation:2.5, rent_advantage:false},
  {slug:'jacksonville',   name:'Jacksonville, FL',    medianHome:310000, medianRent:1500, appreciation:3.5, rent_advantage:false},
  {slug:'colorado-springs',name:'Colorado Springs, CO',medianHome:420000,medianRent:1800, appreciation:3.0, rent_advantage:false},
  {slug:'tucson',         name:'Tucson, AZ',          medianHome:290000, medianRent:1300, appreciation:3.0, rent_advantage:false},
  {slug:'albuquerque',    name:'Albuquerque, NM',     medianHome:280000, medianRent:1300, appreciation:2.5, rent_advantage:false},
  {slug:'virginia-beach', name:'Virginia Beach, VA',  medianHome:310000, medianRent:1600, appreciation:3.0, rent_advantage:false},
  {slug:'fort-worth',     name:'Fort Worth, TX',      medianHome:320000, medianRent:1600, appreciation:3.5, rent_advantage:false},
  {slug:'el-paso',        name:'El Paso, TX',         medianHome:200000, medianRent:1100, appreciation:2.5, rent_advantage:false},
  {slug:'fresno',         name:'Fresno, CA',          medianHome:340000, medianRent:1500, appreciation:2.5, rent_advantage:false},
  {slug:'mesa',           name:'Mesa, AZ',            medianHome:380000, medianRent:1600, appreciation:4.0, rent_advantage:false},
]

buildBatch(
  'rent-vs-buy-calculator/city/[city]',
  'data/rvbCities.js','rvbCities',rvbCities,
  ['rent-vs-buy-calculator','city','[city]'],
  'city',
  (rel)=>`import items from '${rel}/data/rvbCities'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.city)
  if (!it) return { title: 'Rent vs Buy Calculator' }
  return {
    title: \`Rent vs Buy in \${it.name} 2026 — Is It Worth Buying?\`,
    description: \`Should you rent or buy in \${it.name}? Median home: \$\${it.medianHome.toLocaleString()}, median rent: \$\${it.medianRent.toLocaleString()}/mo. Personalized rent vs buy analysis for 2026.\`,
    alternates: { canonical: \`https://freefincalc.net/rent-vs-buy-calculator/city/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'RvBCityClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
${S}
export default function RvBCityClient({item:it,all}){
  const[home,setHome]=useState(it.medianHome)
  const[rent,setRent]=useState(it.medianRent)
  const[rate,setRate]=useState(7.0)
  const[years,setYears]=useState(7)
  const loan=home*0.80
  const monthly=pmt(loan,rate,360)
  const taxes=Math.round(home*0.012/12)
  const insurance=Math.round(home*0.005/12)
  const buyCost=monthly+taxes+insurance
  const rentTotal=rent*years*12*(1+0.03*years/2)
  const buyTotal=buyCost*years*12
  const equity=Math.round(home*Math.pow(1+it.appreciation/100,years)-loan*(Math.pow(1+(rate/100/12),years*12)-1)/(Math.pow(1+(rate/100/12),360)-1)*360/12*(years/30))
  const buyWins=buyTotal-equity<rentTotal
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/rent-vs-buy-calculator" style={s.bcA}>Rent vs Buy</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Rent vs Buy in {it.name} 2026</h1>
    <p style={s.sub}>Median home price: {fmt(it.medianHome)} | Median rent: {fmt(it.medianRent)}/mo | Appreciation: {it.appreciation}%/yr</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Home Price</label><div style={s.val}>{fmt(home)}</div><input type="range" min={50000} max={Math.max(home*2,2000000)} step={10000} value={home} onChange={e=>setHome(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Monthly Rent</label><div style={s.val}>{fmt(rent)}/mo</div><input type="range" min={500} max={8000} step={100} value={rent} onChange={e=>setRent(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Mortgage Rate</label><div style={s.val}>{rate}%</div><input type="range" min={4} max={12} step={0.05} value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>How Long You Stay</label><div style={s.val}>{years} years</div><input type="range" min={2} max={30} step={1} value={years} onChange={e=>setYears(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>{years}-Year Comparison in {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Buy Cost (P+I+Tax+Ins)</span><span style={{fontWeight:700,color:'#f0c842'}}>{fmt(buyCost)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Rent Cost</span><span style={{fontWeight:700}}>{fmt(rent)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Buy Cost over {years} yrs</span><span style={{fontWeight:700}}>{fmt(buyTotal)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Rent Cost over {years} yrs</span><span style={{fontWeight:700}}>{fmt(rentTotal)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Estimated Equity Built</span><span style={{fontWeight:700,color:'#10b981'}}>+{fmt(equity)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{fontWeight:700}}>Verdict for {years} years in {it.name}</span><span style={{fontWeight:800,color:buyWins?'#10b981':'#f0c842'}}>{buyWins?'Buying wins':'Renting wins'}</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/rent-vs-buy-calculator','Rent vs Buy'],['/mortgage-calculator','Mortgage Calculator'],['/home-affordability-calculator','Home Affordability'],['/down-payment-calculator','Down Payment'],['/moving-cost-calculator','Moving Cost']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Rent vs Buy by City</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/rent-vs-buy-calculator/city/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH G — Freelance Rate by Profession (50 pages)
// /freelance-rate-calculator/job/[job]
// ═══════════════════════════════════════════════════════════════════════
const freelanceJobs = [
  {slug:'software-developer',   name:'Software Developer',        avgRate:125, medRate:100, lowRate:60,  highRate:250, desc:'full-stack, backend, or frontend software engineering'},
  {slug:'web-designer',         name:'Web Designer',              avgRate:85,  medRate:75,  lowRate:40,  highRate:175, desc:'UI/UX design and website visual design'},
  {slug:'graphic-designer',     name:'Graphic Designer',          avgRate:65,  medRate:55,  lowRate:30,  highRate:150, desc:'brand identity, print, and digital graphic design'},
  {slug:'copywriter',           name:'Copywriter',                avgRate:75,  medRate:65,  lowRate:35,  highRate:175, desc:'marketing copy, ads, email, and sales writing'},
  {slug:'content-writer',       name:'Content Writer',            avgRate:55,  medRate:45,  lowRate:25,  highRate:120, desc:'blog posts, articles, and SEO content creation'},
  {slug:'seo-specialist',       name:'SEO Specialist',            avgRate:100, medRate:85,  lowRate:50,  highRate:200, desc:'search engine optimization and organic traffic growth'},
  {slug:'digital-marketer',     name:'Digital Marketer',          avgRate:90,  medRate:80,  lowRate:45,  highRate:180, desc:'paid ads, social media, and campaign management'},
  {slug:'video-editor',         name:'Video Editor',              avgRate:75,  medRate:65,  lowRate:35,  highRate:175, desc:'video editing, motion graphics, and post-production'},
  {slug:'photographer',         name:'Photographer',              avgRate:100, medRate:85,  lowRate:50,  highRate:250, desc:'commercial, portrait, event, or product photography'},
  {slug:'data-analyst',         name:'Data Analyst',              avgRate:110, medRate:95,  lowRate:60,  highRate:200, desc:'business intelligence, data visualization, and analytics'},
  {slug:'project-manager',      name:'Project Manager',           avgRate:100, medRate:90,  lowRate:55,  highRate:185, desc:'project coordination, agile, and delivery management'},
  {slug:'virtual-assistant',    name:'Virtual Assistant',         avgRate:35,  medRate:28,  lowRate:15,  highRate:75,  desc:'administrative support, scheduling, and remote assistance'},
  {slug:'accountant',           name:'Accountant / Bookkeeper',   avgRate:80,  medRate:70,  lowRate:40,  highRate:175, desc:'bookkeeping, tax prep, and financial reporting'},
  {slug:'lawyer',               name:'Freelance Lawyer',          avgRate:250, medRate:200, lowRate:100, highRate:500, desc:'contract review, legal consulting, and document drafting'},
  {slug:'consultant',           name:'Business Consultant',       avgRate:150, medRate:125, lowRate:75,  highRate:350, desc:'strategy, operations, and management consulting'},
  {slug:'translator',           name:'Translator / Interpreter',  avgRate:55,  medRate:45,  lowRate:25,  highRate:120, desc:'document translation and live interpretation services'},
  {slug:'voice-actor',          name:'Voice Actor',               avgRate:100, medRate:80,  lowRate:40,  highRate:300, desc:'commercial, audiobook, and character voice work'},
  {slug:'social-media-manager', name:'Social Media Manager',      avgRate:70,  medRate:60,  lowRate:30,  highRate:150, desc:'content creation and community management for brands'},
  {slug:'ux-researcher',        name:'UX Researcher',             avgRate:125, medRate:110, lowRate:70,  highRate:225, desc:'user research, usability testing, and insights reporting'},
  {slug:'ios-developer',        name:'iOS Developer',             avgRate:150, medRate:130, lowRate:80,  highRate:275, desc:'native iPhone and iPad app development'},
  {slug:'android-developer',    name:'Android Developer',         avgRate:140, medRate:120, lowRate:75,  highRate:250, desc:'native Android app development and Google Play publishing'},
  {slug:'devops-engineer',      name:'DevOps / Cloud Engineer',   avgRate:150, medRate:130, lowRate:85,  highRate:275, desc:'cloud infrastructure, CI/CD, and platform engineering'},
  {slug:'cybersecurity',        name:'Cybersecurity Consultant',  avgRate:175, medRate:150, lowRate:90,  highRate:350, desc:'security audits, penetration testing, and compliance'},
  {slug:'machine-learning',     name:'ML / AI Engineer',          avgRate:175, medRate:150, lowRate:100, highRate:350, desc:'machine learning models, AI integrations, and data science'},
  {slug:'technical-writer',     name:'Technical Writer',          avgRate:80,  medRate:70,  lowRate:45,  highRate:160, desc:'software docs, API guides, and user manuals'},
  {slug:'product-manager',      name:'Product Manager',           avgRate:130, medRate:115, lowRate:75,  highRate:250, desc:'product strategy, roadmaps, and stakeholder management'},
  {slug:'financial-advisor',    name:'Financial Advisor (Hourly)', avgRate:200, medRate:175, lowRate:100, highRate:400, desc:'independent hourly financial planning and advice'},
  {slug:'hr-consultant',        name:'HR Consultant',             avgRate:100, medRate:85,  lowRate:55,  highRate:200, desc:'recruiting, HR strategy, and talent management'},
  {slug:'real-estate-agent',    name:'Real Estate Agent',         avgRate:80,  medRate:70,  lowRate:40,  highRate:150, desc:'independent real estate transactions and consulting'},
  {slug:'fitness-trainer',      name:'Personal Fitness Trainer',  avgRate:60,  medRate:50,  lowRate:30,  highRate:150, desc:'one-on-one training and online coaching programs'},
  {slug:'life-coach',           name:'Life Coach',                avgRate:100, medRate:85,  lowRate:50,  highRate:250, desc:'personal development coaching and executive coaching'},
  {slug:'nutritionist',         name:'Nutritionist / Dietitian',  avgRate:80,  medRate:70,  lowRate:40,  highRate:175, desc:'nutrition planning and dietary consulting'},
  {slug:'therapist',            name:'Therapist (Private Practice)',avgRate:150,medRate:130, lowRate:75,  highRate:350, desc:'mental health therapy and counseling sessions'},
  {slug:'tutor',                name:'Academic Tutor',            avgRate:60,  medRate:50,  lowRate:25,  highRate:150, desc:'K-12 and college tutoring and test prep coaching'},
  {slug:'musician',             name:'Session Musician',          avgRate:75,  medRate:60,  lowRate:30,  highRate:200, desc:'studio sessions, live performance, and music production'},
  {slug:'illustrator',          name:'Illustrator',               avgRate:75,  medRate:65,  lowRate:35,  highRate:175, desc:'editorial, book, and commercial illustration'},
  {slug:'3d-artist',            name:'3D Artist / Animator',      avgRate:100, medRate:85,  lowRate:50,  highRate:225, desc:'3D modeling, animation, and visual effects'},
  {slug:'architect',            name:'Architect (Freelance)',     avgRate:150, medRate:125, lowRate:75,  highRate:300, desc:'residential design consulting and architectural drawings'},
  {slug:'interior-designer',    name:'Interior Designer',         avgRate:100, medRate:85,  lowRate:50,  highRate:225, desc:'space planning, material selection, and decor consulting'},
  {slug:'editor',               name:'Book / Manuscript Editor',  avgRate:65,  medRate:55,  lowRate:30,  highRate:150, desc:'developmental editing, copyediting, and proofreading'},
  {slug:'public-relations',     name:'PR Consultant',             avgRate:125, medRate:105, lowRate:65,  highRate:250, desc:'media relations, press releases, and brand communications'},
  {slug:'event-planner',        name:'Event Planner',             avgRate:70,  medRate:60,  lowRate:35,  highRate:175, desc:'corporate events, weddings, and conference planning'},
  {slug:'drone-operator',       name:'Drone Operator',            avgRate:100, medRate:85,  lowRate:50,  highRate:250, desc:'aerial photography, videography, and inspection services'},
  {slug:'resume-writer',        name:'Resume Writer',             avgRate:100, medRate:85,  lowRate:50,  highRate:250, desc:'professional resume writing, LinkedIn optimization, and cover letters'},
  {slug:'podcast-producer',     name:'Podcast Producer',          avgRate:75,  medRate:65,  lowRate:35,  highRate:175, desc:'audio editing, show notes, and podcast launch strategy'},
  {slug:'shopify-developer',    name:'Shopify Developer',         avgRate:110, medRate:95,  lowRate:55,  highRate:225, desc:'e-commerce store setup, themes, and Shopify apps'},
  {slug:'wordpress-developer',  name:'WordPress Developer',       avgRate:85,  medRate:75,  lowRate:40,  highRate:175, desc:'WordPress site building, plugins, and customization'},
  {slug:'email-marketer',       name:'Email Marketing Specialist', avgRate:85, medRate:75,  lowRate:45,  highRate:175, desc:'email campaigns, automation flows, and list management'},
  {slug:'chatgpt-consultant',   name:'AI / ChatGPT Consultant',   avgRate:125, medRate:100, lowRate:60,  highRate:300, desc:'AI tool integration, prompt engineering, and automation'},
  {slug:'grants-writer',        name:'Grant Writer',              avgRate:75,  medRate:65,  lowRate:40,  highRate:175, desc:'nonprofit grant applications and funding proposals'},
]

buildBatch(
  'freelance-rate-calculator/job/[job]',
  'data/freelanceJobs.js','freelanceJobs',freelanceJobs,
  ['freelance-rate-calculator','job','[job]'],
  'job',
  (rel)=>`import items from '${rel}/data/freelanceJobs'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.job)
  if (!it) return { title: 'Freelance Rate Calculator' }
  return {
    title: \`Freelance \${it.name} Rate Calculator 2026 — How Much to Charge?\`,
    description: \`What should a freelance \${it.name.toLowerCase()} charge? Avg rate \$\${it.avgRate}/hr, median \$\${it.medRate}/hr. Calculate your target rate based on income goal. Free 2026 guide.\`,
    alternates: { canonical: \`https://freefincalc.net/freelance-rate-calculator/job/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'FreelanceRateClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
${S}
export default function FreelanceRateClient({item:it,all}){
  const[income,setIncome]=useState(80000)
  const[hours,setHours]=useState(40)
  const[weeks,setWeeks]=useState(48)
  const[util,setUtil]=useState(70)
  const billableHours=hours*weeks*util/100
  const targetRate=Math.round(income*1.3/billableHours)
  const fullTimeEquiv=Math.round(income*1.3)
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/freelance-rate-calculator" style={s.bcA}>Freelance Rate Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Freelance {it.name} Rate Calculator 2026</h1>
    <p style={s.sub}>How much should a freelance {it.name.toLowerCase()} charge? Market data + your personal income goal.</p>
    <div style={s.box}>
      <h2 style={s.h2}>2026 Market Rates — Freelance {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Low (entry-level)</span><span style={{fontWeight:700}}>{fmt(it.lowRate)}/hr</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Median (mid-level)</span><span style={{fontWeight:700,color:'#f0c842'}}>{fmt(it.medRate)}/hr</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Average (market)</span><span style={{fontWeight:700}}>{fmt(it.avgRate)}/hr</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>High (senior/specialist)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(it.highRate)}/hr</span></div>
    </div>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Target Annual Income</label><div style={s.val}>{fmt(income)}/yr</div><input type="range" min={20000} max={500000} step={5000} value={income} onChange={e=>setIncome(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Billable Utilization</label><div style={s.val}>{util}% of hours</div><input type="range" min={30} max={90} step={5} value={util} onChange={e=>setUtil(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Hours per Week</label><div style={s.val}>{hours} hrs/wk</div><input type="range" min={10} max={60} step={5} value={hours} onChange={e=>setHours(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Weeks Working per Year</label><div style={s.val}>{weeks} weeks</div><input type="range" min={30} max={52} step={1} value={weeks} onChange={e=>setWeeks(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Your Target Rate</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Billable Hours per Year</span><span style={{fontWeight:700}}>{billableHours} hrs</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Break-Even Hourly Rate</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(targetRate)}/hr</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Full Cost to Client (1.3x overhead)</span><span style={{fontWeight:700}}>{fmt(fullTimeEquiv)}/yr equivalent</span></div>
      <div style={{marginTop:10,fontSize:13,color:'#64748b'}}>{targetRate < it.lowRate ? 'Your target is below market — you may be undervaluing your services.' : targetRate < it.medRate ? 'Your target is in the entry-level market range.' : targetRate <= it.avgRate ? 'Your target is right in the market sweet spot.' : targetRate <= it.highRate ? 'Your target is in the senior specialist range — achievable with strong portfolio.' : 'Your target exceeds typical market rates — ensure your value proposition matches.'}</div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/freelance-rate-calculator','Freelance Rate'],['/salary-after-tax-calculator','Salary After Tax'],['/self-employment-tax-calculator','Self-Employment Tax'],['/invoice-calculator','Invoice Calculator'],['/hourly-to-salary-calculator','Hourly to Salary']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Freelance Rate by Profession</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/freelance-rate-calculator/job/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH H — Break-Even by Business Type (50 pages)
// /break-even-calculator/business/[business]
// ═══════════════════════════════════════════════════════════════════════
const businesses = [
  {slug:'restaurant',           name:'Restaurant',                fixed:15000, varCost:0.35, price:22,   unit:'meal',     desc:'food service with high fixed costs and variable ingredient costs'},
  {slug:'coffee-shop',          name:'Coffee Shop',               fixed:8000,  varCost:0.30, price:5.5,  unit:'cup',      desc:'cafe business with equipment overhead and low per-unit costs'},
  {slug:'retail-store',         name:'Retail Store',              fixed:12000, varCost:0.50, price:45,   unit:'sale',     desc:'brick-and-mortar retail with inventory and lease costs'},
  {slug:'e-commerce',           name:'E-Commerce Store',          fixed:3000,  varCost:0.45, price:55,   unit:'order',    desc:'online store with platform fees and fulfillment costs'},
  {slug:'saas',                 name:'SaaS Business',             fixed:20000, varCost:0.05, price:99,   unit:'user/mo',  desc:'software as a service with low variable costs per user'},
  {slug:'gym-fitness-studio',   name:'Gym / Fitness Studio',      fixed:18000, varCost:0.10, price:60,   unit:'member/mo',desc:'membership-based fitness business with heavy equipment overhead'},
  {slug:'salon',                name:'Hair / Beauty Salon',       fixed:7000,  varCost:0.30, price:75,   unit:'client',   desc:'personal services business with chair rental and product costs'},
  {slug:'trucking',             name:'Trucking Company',          fixed:12000, varCost:0.55, price:3.50, unit:'mile',     desc:'freight and logistics with fuel, maintenance, and driver costs'},
  {slug:'cleaning-service',     name:'Cleaning Service',          fixed:3000,  varCost:0.40, price:150,  unit:'job',      desc:'residential and commercial cleaning with labor as primary cost'},
  {slug:'landscaping',          name:'Landscaping Business',      fixed:5000,  varCost:0.45, price:200,  unit:'job',      desc:'outdoor services business with equipment and seasonal revenue'},
  {slug:'photography-business', name:'Photography Business',      fixed:4000,  varCost:0.20, price:500,  unit:'session',  desc:'professional photography with gear depreciation as major cost'},
  {slug:'daycare',              name:'Daycare / Childcare',       fixed:15000, varCost:0.30, price:1200, unit:'child/mo', desc:'childcare facility with staffing as dominant cost driver'},
  {slug:'bakery',               name:'Bakery',                    fixed:8000,  varCost:0.40, price:4.50, unit:'item',     desc:'artisan food production with ingredient and equipment costs'},
  {slug:'dental-practice',      name:'Dental Practice',           fixed:35000, varCost:0.25, price:250,  unit:'patient',  desc:'healthcare services with equipment and malpractice overhead'},
  {slug:'law-firm',             name:'Law Firm (Solo)',           fixed:12000, varCost:0.20, price:350,  unit:'hour',     desc:'solo law practice with office and malpractice insurance costs'},
  {slug:'marketing-agency',     name:'Marketing Agency',          fixed:20000, varCost:0.30, price:5000, unit:'client/mo',desc:'full-service marketing agency with team and tool overhead'},
  {slug:'tutoring-center',      name:'Tutoring Center',           fixed:5000,  varCost:0.40, price:60,   unit:'session',  desc:'educational services business with instructor costs'},
  {slug:'yoga-studio',          name:'Yoga Studio',               fixed:8000,  varCost:0.15, price:20,   unit:'class',    desc:'wellness studio with lease and instructor compensation'},
  {slug:'brewery',              name:'Craft Brewery',             fixed:25000, varCost:0.30, price:5,    unit:'pint',     desc:'craft beer production with fermentation equipment overhead'},
  {slug:'food-truck',           name:'Food Truck',                fixed:5000,  varCost:0.35, price:12,   unit:'item',     desc:'mobile food business with lower overhead than brick-and-mortar'},
  {slug:'airbnb-rental',        name:'Airbnb / Short-Term Rental',fixed:3000,  varCost:0.25, price:150,  unit:'night',    desc:'short-term vacation rental with platform fees and cleaning costs'},
  {slug:'car-wash',             name:'Car Wash',                  fixed:15000, varCost:0.20, price:20,   unit:'wash',     desc:'auto services with water, chemicals, and equipment costs'},
  {slug:'accounting-firm',      name:'Accounting Firm',           fixed:10000, varCost:0.25, price:200,  unit:'hour',     desc:'professional services with software and malpractice insurance'},
  {slug:'web-design-agency',    name:'Web Design Agency',         fixed:12000, varCost:0.30, price:3000, unit:'project',  desc:'digital services agency with software and contractor costs'},
  {slug:'real-estate-brokerage',name:'Real Estate Brokerage',    fixed:8000,  varCost:0.20, price:8000, unit:'deal',     desc:'real estate transaction business with MLS and licensing costs'},
  {slug:'pest-control',         name:'Pest Control Service',      fixed:6000,  varCost:0.40, price:180,  unit:'job',      desc:'home services with vehicle, chemicals, and licensing costs'},
  {slug:'dog-grooming',         name:'Dog Grooming Salon',        fixed:4000,  varCost:0.30, price:80,   unit:'dog',      desc:'pet services with grooming equipment and product costs'},
  {slug:'printing-shop',        name:'Printing / Copy Shop',      fixed:10000, varCost:0.40, price:0.15, unit:'page',     desc:'print services with equipment depreciation and ink costs'},
  {slug:'IT-support',           name:'IT Support / MSP',          fixed:10000, varCost:0.30, price:150,  unit:'hour',     desc:'managed IT services with software licenses and van costs'},
  {slug:'moving-company',       name:'Moving Company',            fixed:8000,  varCost:0.45, price:1500, unit:'move',     desc:'residential moving with truck depreciation and crew costs'},
  {slug:'plumbing',             name:'Plumbing Business',         fixed:6000,  varCost:0.40, price:250,  unit:'job',      desc:'home services trade with van, tools, and licensing overhead'},
  {slug:'electrician',          name:'Electrician Business',      fixed:6000,  varCost:0.35, price:250,  unit:'job',      desc:'electrical contracting with licensing, insurance, and tools'},
  {slug:'HVAC',                 name:'HVAC Company',              fixed:8000,  varCost:0.40, price:350,  unit:'job',      desc:'heating and cooling services with parts inventory and van costs'},
  {slug:'car-dealership',       name:'Used Car Dealership',       fixed:25000, varCost:0.85, price:15000,unit:'car',      desc:'auto sales with inventory financing and lot lease overhead'},
  {slug:'franchise-unit',       name:'Franchise Unit (Avg)',      fixed:30000, varCost:0.45, price:50,   unit:'customer', desc:'a typical franchise unit with royalties and corporate fees'},
  {slug:'amazon-fba',           name:'Amazon FBA Seller',         fixed:2000,  varCost:0.60, price:35,   unit:'unit',     desc:'e-commerce fulfillment by Amazon with storage and referral fees'},
  {slug:'wedding-venue',        name:'Wedding Venue',             fixed:20000, varCost:0.25, price:8000, unit:'event',    desc:'event space with mortgage, maintenance, and staffing costs'},
  {slug:'dropshipping',         name:'Dropshipping Store',        fixed:1500,  varCost:0.65, price:45,   unit:'order',    desc:'no-inventory online retail with high supplier and ad costs'},
  {slug:'flower-shop',          name:'Flower Shop',               fixed:6000,  varCost:0.50, price:60,   unit:'arrangement',desc:'floral retail with perishable inventory and refrigeration costs'},
  {slug:'music-school',         name:'Music School',              fixed:5000,  varCost:0.40, price:70,   unit:'lesson',   desc:'private music instruction with space and instrument costs'},
  {slug:'bookkeeping-service',  name:'Bookkeeping Service',       fixed:2000,  varCost:0.20, price:500,  unit:'client/mo',desc:'virtual bookkeeping with software and liability insurance'},
  {slug:'online-course',        name:'Online Course Business',    fixed:5000,  varCost:0.05, price:297,  unit:'enrollment',desc:'digital education with platform fees and near-zero delivery costs'},
  {slug:'subscription-box',     name:'Subscription Box',          fixed:4000,  varCost:0.55, price:45,   unit:'box/mo',   desc:'curated subscription service with curation and fulfillment costs'},
  {slug:'therapy-private',      name:'Therapy Private Practice',  fixed:4000,  varCost:0.15, price:175,  unit:'session',  desc:'mental health private practice with office and licensing costs'},
  {slug:'pharmacy',             name:'Independent Pharmacy',      fixed:40000, varCost:0.70, price:120,  unit:'Rx',       desc:'retail pharmacy with dispensing and compliance overhead'},
  {slug:'childcare-app',        name:'Childcare / Tutoring App',  fixed:15000, varCost:0.10, price:29,   unit:'subscriber',desc:'two-sided marketplace app for education and childcare'},
  {slug:'clothing-brand',       name:'Clothing Brand (D2C)',      fixed:5000,  varCost:0.45, price:65,   unit:'item',     desc:'direct-to-consumer apparel with design and fulfillment costs'},
  {slug:'car-rental',           name:'Car Rental / Fleet',        fixed:20000, varCost:0.30, price:80,   unit:'day',      desc:'vehicle rental with depreciation, insurance, and maintenance'},
  {slug:'vending-machine',      name:'Vending Machine Business',  fixed:2000,  varCost:0.40, price:2.50, unit:'sale',     desc:'automated retail with machine depreciation and restocking costs'},
  {slug:'solar-installation',   name:'Solar Installation Company',fixed:15000, varCost:0.55, price:25000,unit:'install',  desc:'residential solar with panels, inverters, and crew costs'},
]

buildBatch(
  'break-even-calculator/business/[business]',
  'data/businesses.js','businesses',businesses,
  ['break-even-calculator','business','[business]'],
  'business',
  (rel)=>`import items from '${rel}/data/businesses'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.business)
  if (!it) return { title: 'Break-Even Calculator' }
  const be = Math.round(it.fixed / (it.price * (1 - it.varCost)))
  return {
    title: \`Break-Even Calculator: \${it.name} 2026 — Units & Revenue\`,
    description: \`Calculate the break-even point for a \${it.name.toLowerCase()}. With \$\${it.fixed.toLocaleString()} fixed costs and \${Math.round(it.varCost*100)}% variable costs, break-even is ~\${be} \${it.unit}s/month.\`,
    alternates: { canonical: \`https://freefincalc.net/break-even-calculator/business/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  'BreakEvenClient.js',
  (rel)=>`'use client'
import { useState } from 'react'
import Header from '${rel}/components/Header'
import Footer from '${rel}/components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function fmtN(n){return Math.round(n||0).toLocaleString('en-US')}
${S}
export default function BreakEvenClient({item:it,all}){
  const[fixed,setFixed]=useState(it.fixed)
  const[price,setPrice]=useState(it.price)
  const[varPct,setVarPct]=useState(Math.round(it.varCost*100))
  const margin=price*(1-varPct/100)
  const beUnits=margin>0?Math.ceil(fixed/margin):Infinity
  const beRevenue=beUnits*price
  const profit1x=beRevenue*2-fixed-beRevenue*varPct/100
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/break-even-calculator" style={s.bcA}>Break-Even Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Break-Even Calculator: {it.name}</h1>
    <p style={s.sub}>A {it.name.toLowerCase()} is {it.desc}. Find your break-even point in units and revenue.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Monthly Fixed Costs</label><div style={s.val}>{fmt(fixed)}/mo</div><input type="range" min={500} max={Math.max(fixed*3,100000)} step={500} value={fixed} onChange={e=>setFixed(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Price per {it.unit}</label><div style={s.val}>{fmt(price)}</div><input type="range" min={0.5} max={Math.max(price*5,10000)} step={price>100?50:price>10?1:0.5} value={price} onChange={e=>setPrice(+e.target.value)} style={s.sldr}/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Variable Cost %</label><div style={s.val}>{varPct}% per {it.unit}</div><input type="range" min={5} max={90} step={1} value={varPct} onChange={e=>setVarPct(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Break-Even Analysis</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Contribution Margin per {it.unit}</span><span style={{fontWeight:700}}>{fmt(margin)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Break-Even Units/Month</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{beUnits===Infinity?'N/A':fmtN(beUnits)+' '+it.unit+'s'}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Break-Even Revenue/Month</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(beRevenue)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Profit at 2x Break-Even</span><span style={{fontWeight:700}}>{fmt(profit1x)}/mo</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>About {it.name} Break-Even</h2><p style={s.p}>A typical {it.name.toLowerCase()} has ~{fmt(it.fixed)}/month in fixed costs (rent, insurance, salaries) and variable costs of ~{Math.round(it.varCost*100)}% of revenue. At {fmt(it.price)} per {it.unit}, the contribution margin is {fmt(it.price*(1-it.varCost))} — so you need to sell <strong style={{color:'#f0c842'}}>{fmtN(Math.ceil(it.fixed/(it.price*(1-it.varCost))))} {it.unit}s/month</strong> just to cover costs. Every unit beyond that is pure profit.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/break-even-calculator','Break-Even'],['/profit-margin-calculator','Profit Margin'],['/business-loan-calculator','Business Loan'],['/roi-calculator','ROI Calculator'],['/startup-cost-calculator','Startup Cost']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Break-Even by Business Type</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/break-even-calculator/business/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}`)

// ═══════════════════════════════════════════════════════════════════════
// BATCH I — Inflation Calculator by Year (50 pages)
// /inflation-calculator/year/[year]
// ═══════════════════════════════════════════════════════════════════════
const inflationYears = []
for (let y = 1970; y <= 2024; y += 1) {
  if (inflationYears.length >= 50) break
  // skip some to get interesting coverage
  if (y > 1985 && y < 2000 && y % 2 === 1) continue
  if (y > 2000 && y < 2010 && y % 2 === 1) continue
  inflationYears.push({
    slug: 'year-'+y,
    name: 'Year '+y,
    year: y,
    cpi: y === 1970 ? 38.8 : y === 1975 ? 53.8 : y === 1980 ? 82.4 : y === 1985 ? 107.6 : y === 1990 ? 130.7 : y === 1995 ? 152.4 : y === 1998 ? 163.0 : y === 2000 ? 172.2 : y === 2002 ? 179.9 : y === 2004 ? 188.9 : y === 2006 ? 201.6 : y === 2008 ? 215.3 : y === 2010 ? 218.1 : y === 2012 ? 229.6 : y === 2013 ? 233.0 : y === 2014 ? 236.7 : y === 2015 ? 237.0 : y === 2016 ? 240.0 : y === 2017 ? 245.1 : y === 2018 ? 251.1 : y === 2019 ? 255.7 : y === 2020 ? 258.8 : y === 2021 ? 271.0 : y === 2022 ? 296.8 : y === 2023 ? 304.7 : y === 2024 ? 314.2 : 200,
    cpi2024: 314.2,
  })
}
inflationYears.forEach(y => {
  y.multiplier = parseFloat((y.cpi2024 / y.cpi).toFixed(4))
  y.desc = `what $1 in ${y.year} is worth in 2026 dollars`
})

const inflDataContent = `const inflationYears = ${JSON.stringify(inflationYears, null, 2)}\nmodule.exports = inflationYears\n`
fs.writeFileSync('data/inflationYears.js', inflDataContent, 'utf8')

const inflDir = path.join('app', 'inflation-calculator', 'year', '[year]')
fs.mkdirSync(inflDir, { recursive: true })

fs.writeFileSync(path.join(inflDir, 'layout.js'),
`import items from '../../../../data/inflationYears'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.year)
  if (!it) return { title: 'Inflation Calculator' }
  return {
    title: \`Inflation Calculator: \${it.year} to 2026 — CPI & Purchasing Power\`,
    description: \`How much is \$1 from \${it.year} worth today? CPI multiplier: \${it.multiplier}x. \$100 in \${it.year} = ~\$\${Math.round(100*it.multiplier)} in 2026. Free historical inflation calculator.\`,
    alternates: { canonical: \`https://freefincalc.net/inflation-calculator/year/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(inflDir, 'page.js'),
`import items from '../../../../data/inflationYears'
import InflationYearClient from './InflationYearClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ year: x.slug })) }
export default function Page({ params }) {
  const item = items.find(x => x.slug === params.year)
  if (!item) return notFound()
  return <InflationYearClient item={item} all={items} />
}
`)

fs.writeFileSync(path.join(inflDir, 'InflationYearClient.js'),
`'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
${S}
export default function InflationYearClient({item:it,all}){
  const[amount,setAmount]=useState(100)
  const today=Math.round(amount*it.multiplier)
  const reverse=Math.round(amount/it.multiplier)
  const examples=[
    {item:'Gallon of milk',then:1.32,now:4.50},
    {item:'Dozen eggs',then:0.62,now:3.20},
    {item:'Gallon of gas',then:0.36,now:3.50},
    {item:'New car',then:3500,now:48000},
    {item:'Median house',then:23000,now:420000},
    {item:'Minimum wage',then:1.60,now:7.25},
  ].map(e=>({...e,inflated:Math.round(e.then*it.multiplier)}))
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/inflation-calculator" style={s.bcA}>Inflation Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.year}</span></nav>
    <h1 style={s.h1}>Inflation Calculator: {it.year} to 2026</h1>
    <p style={s.sub}>How far has the dollar fallen since {it.year}? The cumulative inflation rate is <strong style={{color:'#f0c842'}}>{Math.round((it.multiplier-1)*100)}%</strong>.</p>
    <div style={s.card}>
      <label style={s.lbl}>Amount in {it.year} Dollars</label>
      <div style={s.val}>{fmt(amount)} in {it.year}</div>
      <input type="range" min={1} max={100000} step={1} value={amount} onChange={e=>setAmount(+e.target.value)} style={s.sldr}/>
    </div>
    <div style={{...s.box,marginTop:20}}>
      <h2 style={s.h2}>Purchasing Power</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>{fmt(amount)} in {it.year} is worth today</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(today)} in 2026</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>{fmt(amount)} in 2026 was worth in {it.year}</span><span style={{fontWeight:700}}>{fmt(reverse)} in {it.year}</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Price Comparison: {it.year} vs 2026</h2>
      {examples.map(e=>(<div key={e.item} style={s.row}><span style={{color:'#94a3b8'}}>{e.item}</span><span style={{fontSize:13}}><span style={{color:'#64748b'}}>{fmt(e.then)} ({it.year})</span> → <strong style={{color:'#f0c842'}}>{fmt(e.now)} (2026)</strong></span></div>))}
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/inflation-calculator','Inflation Calculator'],['/purchasing-power-calculator','Purchasing Power'],['/cpi-calculator','CPI Calculator'],['/real-return-calculator','Real Return'],['/cost-of-living-calculator','Cost of Living']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Inflation by Year</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/inflation-calculator/year/'+x.slug} style={s.tagA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}
`)
console.log('✅ inflation-calculator/year/[year] — ' + inflationYears.length + ' pages')

// ═══════════════════════════════════════════════════════════════════════
// BATCH J — Salary After Tax by State (50 pages)
// /salary-after-tax/state/[state]
// ═══════════════════════════════════════════════════════════════════════
const satStates = [
  {slug:'california',name:'California',abbr:'CA',rate:9.3,noTax:false},{slug:'texas',name:'Texas',abbr:'TX',rate:0,noTax:true},
  {slug:'new-york',name:'New York',abbr:'NY',rate:10.9,noTax:false},{slug:'florida',name:'Florida',abbr:'FL',rate:0,noTax:true},
  {slug:'illinois',name:'Illinois',abbr:'IL',rate:4.95,noTax:false},{slug:'pennsylvania',name:'Pennsylvania',abbr:'PA',rate:3.07,noTax:false},
  {slug:'ohio',name:'Ohio',abbr:'OH',rate:3.99,noTax:false},{slug:'georgia',name:'Georgia',abbr:'GA',rate:5.49,noTax:false},
  {slug:'north-carolina',name:'North Carolina',abbr:'NC',rate:4.5,noTax:false},{slug:'michigan',name:'Michigan',abbr:'MI',rate:4.25,noTax:false},
  {slug:'new-jersey',name:'New Jersey',abbr:'NJ',rate:10.75,noTax:false},{slug:'virginia',name:'Virginia',abbr:'VA',rate:5.75,noTax:false},
  {slug:'washington',name:'Washington',abbr:'WA',rate:0,noTax:true},{slug:'arizona',name:'Arizona',abbr:'AZ',rate:2.5,noTax:false},
  {slug:'massachusetts',name:'Massachusetts',abbr:'MA',rate:5.0,noTax:false},{slug:'tennessee',name:'Tennessee',abbr:'TN',rate:0,noTax:true},
  {slug:'indiana',name:'Indiana',abbr:'IN',rate:3.15,noTax:false},{slug:'missouri',name:'Missouri',abbr:'MO',rate:4.95,noTax:false},
  {slug:'maryland',name:'Maryland',abbr:'MD',rate:5.75,noTax:false},{slug:'wisconsin',name:'Wisconsin',abbr:'WI',rate:7.65,noTax:false},
  {slug:'colorado',name:'Colorado',abbr:'CO',rate:4.4,noTax:false},{slug:'minnesota',name:'Minnesota',abbr:'MN',rate:9.85,noTax:false},
  {slug:'south-carolina',name:'South Carolina',abbr:'SC',rate:6.4,noTax:false},{slug:'alabama',name:'Alabama',abbr:'AL',rate:5.0,noTax:false},
  {slug:'louisiana',name:'Louisiana',abbr:'LA',rate:4.25,noTax:false},{slug:'kentucky',name:'Kentucky',abbr:'KY',rate:4.5,noTax:false},
  {slug:'oregon',name:'Oregon',abbr:'OR',rate:9.9,noTax:false},{slug:'oklahoma',name:'Oklahoma',abbr:'OK',rate:4.75,noTax:false},
  {slug:'connecticut',name:'Connecticut',abbr:'CT',rate:6.99,noTax:false},{slug:'utah',name:'Utah',abbr:'UT',rate:4.65,noTax:false},
  {slug:'iowa',name:'Iowa',abbr:'IA',rate:6.0,noTax:false},{slug:'nevada',name:'Nevada',abbr:'NV',rate:0,noTax:true},
  {slug:'arkansas',name:'Arkansas',abbr:'AR',rate:4.4,noTax:false},{slug:'mississippi',name:'Mississippi',abbr:'MS',rate:5.0,noTax:false},
  {slug:'kansas',name:'Kansas',abbr:'KS',rate:5.7,noTax:false},{slug:'new-mexico',name:'New Mexico',abbr:'NM',rate:5.9,noTax:false},
  {slug:'nebraska',name:'Nebraska',abbr:'NE',rate:5.84,noTax:false},{slug:'idaho',name:'Idaho',abbr:'ID',rate:5.8,noTax:false},
  {slug:'west-virginia',name:'West Virginia',abbr:'WV',rate:5.12,noTax:false},{slug:'hawaii',name:'Hawaii',abbr:'HI',rate:11.0,noTax:false},
  {slug:'new-hampshire',name:'New Hampshire',abbr:'NH',rate:0,noTax:true},{slug:'maine',name:'Maine',abbr:'ME',rate:7.15,noTax:false},
  {slug:'rhode-island',name:'Rhode Island',abbr:'RI',rate:5.99,noTax:false},{slug:'delaware',name:'Delaware',abbr:'DE',rate:6.6,noTax:false},
  {slug:'montana',name:'Montana',abbr:'MT',rate:5.9,noTax:false},{slug:'vermont',name:'Vermont',abbr:'VT',rate:8.75,noTax:false},
  {slug:'north-dakota',name:'North Dakota',abbr:'ND',rate:2.9,noTax:false},{slug:'south-dakota',name:'South Dakota',abbr:'SD',rate:0,noTax:true},
  {slug:'alaska',name:'Alaska',abbr:'AK',rate:0,noTax:true},{slug:'wyoming',name:'Wyoming',abbr:'WY',rate:0,noTax:true},
]

const satDataContent = `const satStates = ${JSON.stringify(satStates, null, 2)}\nmodule.exports = satStates\n`
fs.writeFileSync('data/satStates.js', satDataContent, 'utf8')

const satDir = path.join('app', 'salary-after-tax', 'state', '[state]')
fs.mkdirSync(satDir, { recursive: true })

fs.writeFileSync(path.join(satDir, 'layout.js'),
`import items from '../../../../data/satStates'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.state)
  if (!it) return { title: 'Salary After Tax' }
  return {
    title: \`\${it.name} Salary After Tax Calculator 2026 — Take-Home Pay\`,
    description: \`Calculate your exact take-home pay after federal, \${it.name} state (${it ? (it.noTax ? 'none' : it.rate + '%') : ''}), and FICA taxes. Free 2026 \${it.name} salary calculator.\`,
    alternates: { canonical: \`https://freefincalc.net/salary-after-tax/state/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(satDir, 'page.js'),
`import items from '../../../../data/satStates'
import SATStateClient from './SATStateClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ state: x.slug })) }
export default function Page({ params }) {
  const item = items.find(x => x.slug === params.state)
  if (!item) return notFound()
  return <SATStateClient item={item} all={items} />
}
`)

fs.writeFileSync(path.join(satDir, 'SATStateClient.js'),
`'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
const brackets=[{min:0,max:11600,rate:0.10},{min:11600,max:47150,rate:0.12},{min:47150,max:100525,rate:0.22},{min:100525,max:191950,rate:0.24},{min:191950,max:243725,rate:0.32},{min:243725,max:609350,rate:0.35},{min:609350,max:Infinity,rate:0.37}]
function fedTax(income){let t=0;for(const b of brackets){if(income<=b.min)break;t+=(Math.min(income,b.max)-b.min)*b.rate;}return t}
${S}
export default function SATStateClient({item:it,all}){
  const[salary,setSalary]=useState(75000)
  const fed=fedTax(salary)
  const state=it.noTax?0:salary*it.rate/100
  const fica=salary*0.0765
  const net=salary-fed-state-fica
  const eff=((fed+state+fica)/salary*100).toFixed(1)
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/salary-after-tax-calculator" style={s.bcA}>Salary After Tax</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>{it.name} Salary After Tax Calculator 2026</h1>
    <p style={s.sub}>{it.noTax?it.name+' has no state income tax — workers take home significantly more.':'State income tax rate: '+it.rate+'%.'}</p>
    <div style={s.card}>
      <label style={s.lbl}>Annual Salary</label>
      <div style={s.val}>{fmt(salary)}/yr</div>
      <input type="range" min={20000} max={500000} step={1000} value={salary} onChange={e=>setSalary(+e.target.value)} style={s.sldr}/>
    </div>
    <div style={{...s.box,marginTop:20}}>
      <h2 style={s.h2}>Take-Home Pay — {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Gross Salary</span><span style={{fontWeight:700}}>{fmt(salary)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Federal Income Tax</span><span style={{fontWeight:700,color:'#ef4444'}}>- {fmt(fed)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>{it.name} State Tax ({it.noTax?'None':it.rate+'%'})</span><span style={{fontWeight:700,color:it.noTax?'#10b981':'#ef4444'}}>{it.noTax?'$0 (no state tax)':'- '+fmt(state)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>FICA (7.65%)</span><span style={{fontWeight:700,color:'#ef4444'}}>- {fmt(fica)}</span></div>
      <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0 0'}}><span style={{fontWeight:700}}>Take-Home Pay</span><span style={{fontWeight:800,fontSize:22,color:'#f0c842'}}>{fmt(net)}/yr</span></div>
      <div style={{marginTop:8,fontSize:13,color:'#64748b',display:'flex',gap:20,flexWrap:'wrap'}}>
        <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmt(net/12)}</strong></span>
        <span>Biweekly: <strong style={{color:'#e2e8f0'}}>{fmt(net/26)}</strong></span>
        <span>Effective rate: <strong style={{color:'#e2e8f0'}}>{eff}%</strong></span>
      </div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/tax-calculator','Tax Calculator'],['/hourly-to-salary-calculator','Hourly to Salary'],['/overtime-calculator','Overtime Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Salary After Tax by State</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/salary-after-tax/state/'+x.slug} style={s.tagA}>{x.name} ({x.abbr})</a>))}</div>
  </div><Footer/></div>)
}
`)
console.log('✅ salary-after-tax/state/[state] — ' + satStates.length + ' pages')

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE SITEMAP
// ─────────────────────────────────────────────────────────────────────────────
let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) { console.log('⚠️  sitemap.xml not found — skipping') }

if (sitemap) {
  const toAdd = [
    [homePrices,    x=>`https://freefincalc.net/mortgage-calculator/price/${x.slug}`,                '/mortgage-calculator/price/'],
    [carPrices,     x=>`https://freefincalc.net/car-loan-calculator/price/${x.slug}`,                '/car-loan-calculator/price/'],
    [salaries401k,  x=>`https://freefincalc.net/401k-calculator/salary/${x.slug}`,                  '/401k-calculator/salary/'],
    [ccBalances,    x=>`https://freefincalc.net/credit-card-payoff-calculator/balance/${x.slug}`,    '/credit-card-payoff-calculator/balance/'],
    [studentAmounts,x=>`https://freefincalc.net/student-loan-calculator/amount/${x.slug}`,          '/student-loan-calculator/amount/'],
    [rvbCities,     x=>`https://freefincalc.net/rent-vs-buy-calculator/city/${x.slug}`,             '/rent-vs-buy-calculator/city/'],
    [freelanceJobs, x=>`https://freefincalc.net/freelance-rate-calculator/job/${x.slug}`,           '/freelance-rate-calculator/job/'],
    [businesses,    x=>`https://freefincalc.net/break-even-calculator/business/${x.slug}`,          '/break-even-calculator/business/'],
    [inflationYears,x=>`https://freefincalc.net/inflation-calculator/year/${x.slug}`,               '/inflation-calculator/year/'],
    [satStates,     x=>`https://freefincalc.net/salary-after-tax/state/${x.slug}`,                  '/salary-after-tax/state/'],
  ]
  for (const [items, urlFn, check] of toAdd) {
    if (!sitemap.includes(check)) {
      sitemap = addToSitemap(items, urlFn, sitemap)
      console.log('✅ sitemap: +' + items.length + ' ' + check)
    }
  }
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
  console.log('✅ sitemap.xml updated')
}

const batches = [homePrices,carPrices,salaries401k,ccBalances,studentAmounts,rvbCities,freelanceJobs,businesses,inflationYears,satStates]
const total = batches.reduce((a,b)=>a+b.length,0)

console.log(`
╔═══════════════════════════════════════════════════════╗
║  🚀  500 PAGES BUILT!  ~1435 TOTAL PAGES             ║
╠═══════════════════════════════════════════════════════╣
║  Mortgage by home price:      ${homePrices.length} pages             ║
║  Car loan by vehicle price:   ${carPrices.length} pages             ║
║  401k by salary:              ${salaries401k.length} pages             ║
║  Credit card payoff:          ${ccBalances.length} pages             ║
║  Student loan by amount:      ${studentAmounts.length} pages             ║
║  Rent vs buy by city:         ${rvbCities.length} pages             ║
║  Freelance rate by job:       ${freelanceJobs.length} pages             ║
║  Break-even by business:      ${businesses.length} pages             ║
║  Inflation by year:           ${inflationYears.length} pages             ║
║  Salary after tax by state:   ${satStates.length} pages             ║
║  ─────────────────────────────────────────────────── ║
║  Total new pages:             ${total}                   ║
║  TOTAL SITE PAGES:           ~1435                   ║
╚═══════════════════════════════════════════════════════╝

  git add -A
  git commit -m "feat: 500 more pages - mortgage/car/401k/cc/student/rvb/freelance/breakeven/inflation/sat"
  vercel --prod
`)
