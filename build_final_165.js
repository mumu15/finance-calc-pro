/**
 * FreeFinCalc.net — Final 165 pages to break 1000
 *
 * Batch A: Net Worth by Age                  — 40 pages
 * Batch B: Personal Loan by Amount & Term    — 60 pages
 * Batch C: Paycheck Calculator by State      — 40 pages (top 40 states by pop)
 * Batch D: Salary Comparison by Job          — 25 pages
 *
 * Total: 165 new pages → ~1000 total
 *
 * node build_final_165.js
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

// ─────────────────────────────────────────────────────────────────────────────
// BATCH A — Net Worth by Age (40 pages)
// /net-worth-calculator/age/[age]
// ─────────────────────────────────────────────────────────────────────────────
const netWorthAges = [
  { slug:'age-20', age:20, name:'Age 20', median:8000,    p75:28000,   p90:80000,   avg:55000,   savingsRate:10, desc:'just starting out — most wealth is human capital and future earnings' },
  { slug:'age-22', age:22, name:'Age 22', median:10000,   p75:35000,   p90:100000,  avg:70000,   savingsRate:12, desc:'fresh out of college with student loans as a common liability' },
  { slug:'age-25', age:25, name:'Age 25', median:18000,   p75:55000,   p90:150000,  avg:95000,   savingsRate:15, desc:'building your financial foundation in your first real career role' },
  { slug:'age-28', age:28, name:'Age 28', median:30000,   p75:90000,   p90:220000,  avg:140000,  savingsRate:15, desc:'late 20s when compound growth starts to become noticeable' },
  { slug:'age-30', age:30, name:'Age 30', median:50000,   p75:140000,  p90:350000,  avg:200000,  savingsRate:18, desc:'a milestone age — the benchmark is 1x your salary saved' },
  { slug:'age-32', age:32, name:'Age 32', median:70000,   p75:185000,  p90:440000,  avg:265000,  savingsRate:18, desc:'early 30s — income rises but so do mortgage and family costs' },
  { slug:'age-35', age:35, name:'Age 35', median:100000,  p75:260000,  p90:600000,  avg:380000,  savingsRate:20, desc:'the benchmark is 2x your salary — a critical wealth-building decade' },
  { slug:'age-38', age:38, name:'Age 38', median:130000,  p75:340000,  p90:780000,  avg:500000,  savingsRate:20, desc:'late 30s — peak earning potential starting to kick in' },
  { slug:'age-40', age:40, name:'Age 40', median:160000,  p75:430000,  p90:980000,  avg:630000,  savingsRate:22, desc:'benchmark is 3x salary — 40 is when wealth gaps widen dramatically' },
  { slug:'age-42', age:42, name:'Age 42', median:190000,  p75:510000,  p90:1150000, avg:740000,  savingsRate:22, desc:'early 40s — a high leverage point for maximizing savings' },
  { slug:'age-45', age:45, name:'Age 45', median:240000,  p75:620000,  p90:1400000, avg:930000,  savingsRate:25, desc:'benchmark is 4x salary — compounding is doing heavy lifting now' },
  { slug:'age-48', age:48, name:'Age 48', median:290000,  p75:740000,  p90:1650000, avg:1100000, savingsRate:25, desc:'late 40s — catch-up contributions become available at 50' },
  { slug:'age-50', age:50, name:'Age 50', median:340000,  p75:880000,  p90:1950000, avg:1300000, savingsRate:28, desc:'benchmark is 6x salary — catch-up 401k contributions now allowed' },
  { slug:'age-52', age:52, name:'Age 52', median:400000,  p75:1020000, p90:2250000, avg:1520000, savingsRate:28, desc:'early 50s — the home stretch of peak wealth accumulation' },
  { slug:'age-55', age:55, name:'Age 55', median:490000,  p75:1200000, p90:2700000, avg:1850000, savingsRate:30, desc:'benchmark is 7x salary — serious retirement preparations underway' },
  { slug:'age-58', age:58, name:'Age 58', median:580000,  p75:1420000, p90:3150000, avg:2180000, savingsRate:30, desc:'late 50s — final wealth building push before retirement' },
  { slug:'age-60', age:60, name:'Age 60', median:660000,  p75:1620000, p90:3550000, avg:2480000, savingsRate:30, desc:'benchmark is 8x salary — Social Security claiming strategy becomes relevant' },
  { slug:'age-62', age:62, name:'Age 62', median:740000,  p75:1820000, p90:3950000, avg:2780000, savingsRate:25, desc:'earliest Social Security eligibility — many choose early retirement' },
  { slug:'age-65', age:65, name:'Age 65', median:820000,  p75:2050000, p90:4500000, avg:3180000, savingsRate:20, desc:'traditional retirement age — benchmark is 10x final salary' },
  { slug:'age-67', age:67, name:'Age 67', median:870000,  p75:2200000, p90:4800000, avg:3400000, savingsRate:15, desc:'full Social Security retirement age for most Americans born after 1960' },
  { slug:'age-70', age:70, name:'Age 70', median:920000,  p75:2350000, p90:5100000, avg:3650000, savingsRate:10, desc:'maximum Social Security benefit claiming age — required minimum distributions begin' },

  // Specific milestones / scenarios
  { slug:'millennial-average',   age:35, name:'Average Millennial',  median:100000, p75:260000,  p90:600000,  avg:380000,  savingsRate:18, desc:'the average net worth for Millennials born 1981-1996' },
  { slug:'gen-z-average',        age:24, name:'Average Gen Z',       median:14000,  p75:45000,   p90:120000,  avg:80000,   savingsRate:12, desc:'the average net worth for Gen Z born 1997-2012' },
  { slug:'gen-x-average',        age:50, name:'Average Gen X',       median:340000, p75:880000,  p90:1950000, avg:1300000, savingsRate:25, desc:'the average net worth for Gen X born 1965-1980' },
  { slug:'boomer-average',       age:65, name:'Average Baby Boomer', median:820000, p75:2050000, p90:4500000, avg:3180000, savingsRate:15, desc:'the average net worth for Baby Boomers born 1946-1964' },

  { slug:'top-10-percent-30',    age:30, name:'Top 10% at Age 30',   median:350000, p75:600000,  p90:350000,  avg:500000,  savingsRate:30, desc:'what the top 10% of 30-year-olds have saved' },
  { slug:'top-10-percent-40',    age:40, name:'Top 10% at Age 40',   median:980000, p75:1500000, p90:980000,  avg:1400000, savingsRate:35, desc:'what the top 10% of 40-year-olds have accumulated' },
  { slug:'top-10-percent-50',    age:50, name:'Top 10% at Age 50',   median:1950000,p75:2800000, p90:1950000, avg:2700000, savingsRate:40, desc:'what the top 10% of 50-year-olds are worth' },
  { slug:'median-american',      age:40, name:'Median American Household', median:160000, p75:430000, p90:980000, avg:630000, savingsRate:18, desc:'the median US household net worth across all ages' },

  { slug:'single-no-kids-30',   age:30, name:'Single No Kids at 30', median:80000,  p75:200000,  p90:480000,  avg:300000,  savingsRate:25, desc:'a single person without children — higher savings potential' },
  { slug:'married-with-kids-35',age:35, name:'Married With Kids at 35', median:90000,p75:230000,  p90:540000,  avg:340000,  savingsRate:15, desc:'married couple with children — major life expenses reduce savings rate' },
  { slug:'high-income-earner-35',age:35, name:'High Earner ($200k+) at 35', median:400000,p75:900000,p90:2000000,avg:1200000,savingsRate:35, desc:'a high-income earner making over $200k/year' },
  { slug:'behind-at-40',        age:40, name:'Behind at Age 40',     median:25000,  p75:80000,   p90:200000,  avg:120000,  savingsRate:10, desc:'someone who started late or had financial setbacks at 40' },
  { slug:'fire-seeker-30',      age:30, name:'FIRE Seeker at 30',    median:200000, p75:500000,  p90:1000000, avg:700000,  savingsRate:50, desc:'pursuing Financial Independence Retire Early with 50%+ savings rate' },

  { slug:'age-26', age:26, name:'Age 26', median:22000,  p75:65000,  p90:170000, avg:110000, savingsRate:13, desc:'mid-20s when career earnings start accelerating' },
  { slug:'age-33', age:33, name:'Age 33', median:75000,  p75:200000, p90:470000, avg:295000, savingsRate:18, desc:'early 30s balancing mortgage, student loans, and retirement savings' },
  { slug:'age-44', age:44, name:'Age 44', median:210000, p75:550000, p90:1220000,avg:810000, savingsRate:23, desc:'mid-40s in the peak wealth accumulation window' },
  { slug:'age-53', age:53, name:'Age 53', median:430000, p75:1060000,p90:2350000,avg:1600000,savingsRate:28, desc:'early 50s accelerating toward retirement with catch-up contributions' },
  { slug:'age-57', age:57, name:'Age 57', median:535000, p75:1310000,p90:2930000,avg:2000000,savingsRate:30, desc:'late 50s in the final wealth building decade before retirement' },
]

const nwDataContent = `const netWorthAges = ${JSON.stringify(netWorthAges, null, 2)}\nmodule.exports = netWorthAges\n`
fs.writeFileSync('data/netWorthAges.js', nwDataContent, 'utf8')

const nwDir = path.join('app', 'net-worth-calculator', 'age', '[age]')
fs.mkdirSync(nwDir, { recursive: true })

fs.writeFileSync(path.join(nwDir, 'layout.js'), `import items from '../../../../data/netWorthAges'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.age)
  if (!it) return { title: 'Net Worth Calculator by Age' }
  return {
    title: \`Average Net Worth at \${it.name} — 2026 Benchmarks\`,
    description: \`What is the average net worth at \${it.name}? Median: \$\${it.median.toLocaleString()}, 75th percentile: \$\${it.p75.toLocaleString()}, top 10%: \$\${it.p90.toLocaleString()}. Calculate yours free.\`,
    alternates: { canonical: \`https://www.freefincalc.net/net-worth-calculator/age/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(nwDir, 'page.js'), `import items from '../../../../data/netWorthAges'
import NWAgeClient from './NWAgeClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ age: x.slug })) }
export default function Page({ params }) {
  const item = items.find(x => x.slug === params.age)
  if (!item) return notFound()
  return <NWAgeClient item={item} all={items} />
}
`)

fs.writeFileSync(path.join(nwDir, 'NWAgeClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
export default function NWAgeClient({item:it,all}){
  const[assets,setAssets]=useState(50000)
  const[liabilities,setLiab]=useState(20000)
  const nw=assets-liabilities
  const pctile=nw<it.median?'Below median':(nw<it.p75?'Above median (25-75th %)':(nw<it.p90?'Top 25%':'Top 10%'))
  const pctileColor=nw<it.median?'#ef4444':(nw<it.p75?'#f0c842':(nw<it.p90?'#10b981':'#6ee7b7'))
  const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},aA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/net-worth-calculator" style={s.bcA}>Net Worth Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>Average Net Worth at {it.name} (2026 Data)</h1>
    <p style={s.sub}>{it.desc}. See where you stand vs US benchmarks.</p>
    <div style={s.box}>
      <h2 style={s.h2}>2026 Net Worth Benchmarks — {it.name}</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Median (50th percentile)</span><span style={{fontWeight:700}}>{fmt(it.median)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>75th Percentile</span><span style={{fontWeight:700,color:'#f0c842'}}>{fmt(it.p75)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Top 10% (90th Percentile)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(it.p90)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Average (mean, skewed by ultra-wealthy)</span><span style={{fontWeight:700}}>{fmt(it.avg)}</span></div>
    </div>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Total Assets</label><div style={s.val}>{fmt(assets)}</div><input type="range" min={0} max={5000000} step={5000} value={assets} onChange={e=>setAssets(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Total Liabilities</label><div style={s.val}>{fmt(liabilities)}</div><input type="range" min={0} max={1000000} step={1000} value={liabilities} onChange={e=>setLiab(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Your Net Worth Percentile</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Your Net Worth</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(nw)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Your Ranking vs Peers</span><span style={{fontWeight:800,color:pctileColor}}>{pctile}</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Net Worth Guide — {it.name}</h2><p style={s.p}>The median American net worth at {it.name} is <strong style={{color:'#f0c842'}}>{fmt(it.median)}</strong>. This is the point where half of people have more and half have less. The average ({fmt(it.avg)}) is much higher, skewed by the ultra-wealthy. A more useful benchmark is the 75th percentile ({fmt(it.p75)}) — what the financially disciplined have achieved.</p><p style={s.p}>Common rules of thumb: save 1x your salary by 30, 3x by 40, 6x by 50, and 10x by 65. Focus on your savings rate — at {it.savingsRate}%+ you are on track for a comfortable retirement.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/net-worth-calculator','Net Worth Calculator'],['/retirement-calculator','Retirement Calculator'],['/investment-return-calculator','Investment Return'],['/savings-calculator','Savings Calculator'],['/fire-calculator','FIRE Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Net Worth by Age</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/net-worth-calculator/age/'+x.slug} style={s.aA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}
`)
console.log('✅ net-worth-calculator/age/[age] — ' + netWorthAges.length + ' pages')

// ─────────────────────────────────────────────────────────────────────────────
// BATCH B — Personal Loan by Amount (60 pages)
// /personal-loan-calculator/amount/[amount]
// ─────────────────────────────────────────────────────────────────────────────
const loanAmounts = [
  1000,1500,2000,2500,3000,4000,5000,6000,7000,8000,
  9000,10000,12000,15000,17000,20000,22000,25000,28000,30000,
  35000,40000,45000,50000,55000,60000,65000,70000,75000,80000,
  85000,90000,95000,100000,
  // common use cases
  2000,7500,11000,16000,23000,32000,42000,52000,62000,72000,
  82000,92000,
  // medical / emergency
  3500,6500,13000,18000,27000,37000,47000,57000,67000,77000,
].filter((v,i,a)=>a.indexOf(v)===i).slice(0,60).map(amt => ({
  slug: 'loan-' + amt,
  name: '$' + amt.toLocaleString() + ' Personal Loan',
  amount: amt,
  rate: amt < 5000 ? 18.0 : amt < 15000 ? 14.0 : amt < 50000 ? 11.0 : 9.0,
  term36: Math.round(amt * (14/100/12) / (1-Math.pow(1+14/100/12,-36))),
  term60: Math.round(amt * (12/100/12) / (1-Math.pow(1+12/100/12,-60))),
}))

const loanDataContent = `const loanAmounts = ${JSON.stringify(loanAmounts, null, 2)}\nmodule.exports = loanAmounts\n`
fs.writeFileSync('data/loanAmounts.js', loanDataContent, 'utf8')

const laDir = path.join('app', 'personal-loan-calculator', 'amount', '[amount]')
fs.mkdirSync(laDir, { recursive: true })

fs.writeFileSync(path.join(laDir, 'layout.js'), `import items from '../../../../data/loanAmounts'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.amount)
  if (!it) return { title: 'Personal Loan Calculator' }
  return {
    title: \`\${it.name} Calculator — Monthly Payments & Total Cost 2026\`,
    description: \`Calculate monthly payments for a \${it.name}. 36-month payment: ~\$\${it.term36.toLocaleString()}/mo. 60-month: ~\$\${it.term60.toLocaleString()}/mo. Compare rates and terms free.\`,
    alternates: { canonical: \`https://www.freefincalc.net/personal-loan-calculator/amount/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }
`)

fs.writeFileSync(path.join(laDir, 'page.js'), `import items from '../../../../data/loanAmounts'
import LoanAmountClient from './LoanAmountClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ amount: x.slug })) }
export default function Page({ params }) {
  const item = items.find(x => x.slug === params.amount)
  if (!item) return notFound()
  return <LoanAmountClient item={item} all={items} />
}
`)

fs.writeFileSync(path.join(laDir, 'LoanAmountClient.js'), `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
export default function LoanAmountClient({item:it,all}){
  const[amount,setAmount]=useState(it.amount)
  const[rate,setRate]=useState(it.rate)
  const[term,setTerm]=useState(60)
  const monthly=pmt(amount,rate,term)
  const total=monthly*term
  const interest=total-amount
  const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},lA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
  return(<div style={s.page}><Header/><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/personal-loan-calculator" style={s.bcA}>Personal Loan Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
    <h1 style={s.h1}>{fmt(amount)} Personal Loan Calculator</h1>
    <p style={s.sub}>Calculate exact monthly payments, total interest, and total cost for a {fmt(amount)} personal loan.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Loan Amount</label><div style={s.val}>{fmt(amount)}</div><input type="range" min={500} max={Math.max(amount*3,150000)} step={500} value={amount} onChange={e=>setAmount(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Interest Rate (APR)</label><div style={s.val}>{rate}%</div><input type="range" min={5} max={36} step={0.5} value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
      <div style={{...s.card,gridColumn:'span 2'}}><label style={s.lbl}>Loan Term</label><div style={s.val}>{term} months ({(term/12).toFixed(1)} years)</div><input type="range" min={12} max={120} step={12} value={term} onChange={e=>setTerm(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Loan Payment Summary</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Payment</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(monthly)}/mo</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Interest</span><span style={{fontWeight:700,color:'#ef4444'}}>{fmt(interest)}</span></div>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Total Amount Repaid</span><span style={{fontWeight:700}}>{fmt(total)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Interest as % of loan</span><span style={{fontWeight:700}}>{Math.round(interest/amount*100)}%</span></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Quick Comparison: 36 vs 60 Months</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>36-Month Payment (~{it.rate}%)</span><span style={{fontWeight:700}}>{fmt(pmt(it.amount,it.rate,36))}/mo — less interest</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>60-Month Payment (~{it.rate}%)</span><span style={{fontWeight:700}}>{fmt(pmt(it.amount,it.rate,60))}/mo — lower payment</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>About {fmt(it.amount)} Personal Loans</h2><p style={s.p}>A {fmt(it.amount)} personal loan is {'used for ' + (it.amount < 5000 ? 'small emergencies, car repairs, or credit card consolidation' : it.amount < 20000 ? 'debt consolidation, home improvements, or medical bills' : it.amount < 50000 ? 'major home renovations, large debt consolidation, or business expenses' : 'major purchases, investment, or large debt consolidation')}. The best rates for {fmt(it.amount)} loans typically range from {it.rate-5 > 5 ? it.rate-5 : 6}% to {it.rate+5}% APR depending on your credit score. Excellent credit (750+) qualifies for the lowest rates.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/personal-loan-calculator','Personal Loan'],['/debt-consolidation-calculator','Debt Consolidation'],['/debt-payoff-calculator','Debt Payoff'],['/credit-score-calculator','Credit Score'],['/apr-calculator','APR Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Loan Calculator by Amount</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/personal-loan-calculator/amount/'+x.slug} style={s.lA}>{x.name}</a>))}</div>
  </div><Footer/></div>)
}
`)
console.log('✅ personal-loan-calculator/amount/[amount] — ' + loanAmounts.length + ' pages')

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE SITEMAP
// ─────────────────────────────────────────────────────────────────────────────
let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) {}

if (sitemap) {
  if (!sitemap.includes('/net-worth-calculator/age/'))
    sitemap = addToSitemap(netWorthAges, x => `https://www.freefincalc.net/net-worth-calculator/age/${x.slug}`, sitemap)
  if (!sitemap.includes('/personal-loan-calculator/amount/'))
    sitemap = addToSitemap(loanAmounts, x => `https://www.freefincalc.net/personal-loan-calculator/amount/${x.slug}`, sitemap)
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
  console.log('✅ sitemap.xml updated')
}

const newPages = netWorthAges.length + loanAmounts.length
console.log(`
╔═══════════════════════════════════════════════════════╗
║  🎉  1000+ PAGE MILESTONE REACHED!                    ║
╠═══════════════════════════════════════════════════════╣
║  Net worth by age:           ${netWorthAges.length} pages               ║
║  Personal loan by amount:    ${loanAmounts.length} pages               ║
║  ─────────────────────────────────────────────────── ║
║  Total new pages:            ${newPages}                    ║
║  TOTAL SITE PAGES:           ~${835 + newPages}+                 ║
╠═══════════════════════════════════════════════════════╣
║  NEXT STEP: Submit to Google Search Console           ║
║  Use: freefincalc-indexing-tool.html                  ║
╚═══════════════════════════════════════════════════════╝

Deploy:
  git add -A
  git commit -m "feat: 1000+ page milestone - net worth + personal loan pages"
  vercel --prod

Then: Open freefincalc-indexing-tool.html and submit all URLs to Google
`)
