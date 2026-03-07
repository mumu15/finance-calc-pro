/**
 * FreeFinCalc.net — Final push to 1000 pages
 *
 * Batch A: Retirement Calculator by Age        — 50 pages
 * Batch B: Investment Return by Type           — 50 pages
 * Batch C: Debt Payoff by Amount               — 50 pages
 * Batch D: Budget Calculator by City           — 50 pages
 * Batch E: Home Equity by Scenario             — 50 pages
 * Batch F: Loan Payment by Amount & Term       — 50 pages
 * Batch G: Net Worth by Age Group              — 30 pages
 * Batch H: ROI Calculator by Business Type     — 40 pages
 *
 * Total: 370 new pages → ~955 total
 *
 * node build_final_pages.js
 */

const fs = require('fs')
const path = require('path')
fs.mkdirSync('data', { recursive: true })

function writeBatch(dataFile, dataContent, appDir, layoutCode, pageCode, clientCode, clientFileName) {
  fs.writeFileSync(dataFile, dataContent, 'utf8')
  fs.mkdirSync(appDir, { recursive: true })
  fs.writeFileSync(path.join(appDir, 'layout.js'), layoutCode, 'utf8')
  fs.writeFileSync(path.join(appDir, 'page.js'), pageCode, 'utf8')
  fs.writeFileSync(path.join(appDir, clientFileName), clientCode, 'utf8')
  console.log('✅ ' + appDir + ' — done')
}

function addToSitemap(items, urlFn, sm) {
  const entries = items.map(i => `  <url>\n    <loc>${urlFn(i)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n')
  return sm.replace('</urlset>', entries + '\n</urlset>')
}

// ─────────────────────────────────────────────────────────────────────────────
// BATCH A — Retirement by Current Age (50 pages)
// /retirement-calculator/age/[age]
// ─────────────────────────────────────────────────────────────────────────────
const retirementAges = [
  { slug:'age-22', name:'Age 22', age:22, retireAt:65, saved:0,     monthly:300,  rate:8, desc:'just starting your career with decades of compounding ahead' },
  { slug:'age-25', name:'Age 25', age:25, retireAt:65, saved:5000,  monthly:400,  rate:8, desc:'in your mid-20s with your best saving years ahead' },
  { slug:'age-28', name:'Age 28', age:28, retireAt:65, saved:15000, monthly:500,  rate:8, desc:'in your late 20s building your financial foundation' },
  { slug:'age-30', name:'Age 30', age:30, retireAt:65, saved:25000, monthly:600,  rate:8, desc:'at 30 with strong earning potential and time to grow wealth' },
  { slug:'age-32', name:'Age 32', age:32, retireAt:65, saved:40000, monthly:700,  rate:8, desc:'in your early 30s with growing income and responsibilities' },
  { slug:'age-35', name:'Age 35', age:35, retireAt:65, saved:60000, monthly:800,  rate:7.5, desc:'at 35, a critical milestone for retirement readiness' },
  { slug:'age-38', name:'Age 38', age:38, retireAt:65, saved:85000, monthly:900,  rate:7.5, desc:'in your late 30s approaching peak earning years' },
  { slug:'age-40', name:'Age 40', age:40, retireAt:65, saved:100000,monthly:1000, rate:7,   desc:'at 40, the ideal time to get serious about retirement' },
  { slug:'age-42', name:'Age 42', age:42, retireAt:65, saved:120000,monthly:1100, rate:7,   desc:'in your early 40s with 23 years still to compound' },
  { slug:'age-45', name:'Age 45', age:45, retireAt:65, saved:150000,monthly:1200, rate:7,   desc:'at 45, a midpoint check on your retirement readiness' },
  { slug:'age-48', name:'Age 48', age:48, retireAt:65, saved:180000,monthly:1400, rate:6.5, desc:'in your late 40s entering peak earning years' },
  { slug:'age-50', name:'Age 50', age:50, retireAt:65, saved:200000,monthly:1500, rate:6.5, desc:'at 50, eligible for catch-up 401k contributions' },
  { slug:'age-52', name:'Age 52', age:52, retireAt:65, saved:220000,monthly:1700, rate:6,   desc:'in your early 50s with 13 years to maximize savings' },
  { slug:'age-55', name:'Age 55', age:55, retireAt:65, saved:280000,monthly:2000, rate:6,   desc:'at 55, a critical decade to accelerate retirement savings' },
  { slug:'age-58', name:'Age 58', age:58, retireAt:65, saved:350000,monthly:2200, rate:5.5, desc:'in your late 50s with retirement in sight' },
  { slug:'age-60', name:'Age 60', age:60, retireAt:65, saved:400000,monthly:2500, rate:5,   desc:'at 60, just 5 years from traditional retirement age' },
  { slug:'age-62', name:'Age 62', age:62, retireAt:65, saved:500000,monthly:3000, rate:4.5, desc:'at 62, eligible for early Social Security benefits' },
  { slug:'age-retire-at-50', name:'Retire at 50', age:30, retireAt:50, saved:50000, monthly:3000, rate:8, desc:'the FIRE movement goal of extreme early retirement at 50' },
  { slug:'age-retire-at-55', name:'Retire at 55', age:30, retireAt:55, saved:30000, monthly:2000, rate:8, desc:'retiring at 55 with a 25-year savings runway' },
  { slug:'age-retire-at-60', name:'Retire at 60', age:35, retireAt:60, saved:75000, monthly:1500, rate:7, desc:'retiring at 60, five years before traditional retirement age' },
  { slug:'behind-at-40',    name:'Behind on Savings at 40', age:40, retireAt:67, saved:20000, monthly:1500, rate:7, desc:'catching up on retirement savings after starting late' },
  { slug:'behind-at-50',    name:'Behind on Savings at 50', age:50, retireAt:67, saved:50000, monthly:2500, rate:6, desc:'an aggressive catch-up plan for late retirement savers' },
  { slug:'maxing-401k-30',  name:'Maxing 401k from Age 30', age:30, retireAt:65, saved:10000, monthly:1916, rate:8, desc:'maxing out your 401k every year starting at age 30' },
  { slug:'maxing-401k-40',  name:'Maxing 401k from Age 40', age:40, retireAt:65, saved:50000, monthly:1916, rate:7, desc:'maxing out your 401k every year starting at age 40' },
  { slug:'dual-income-35',  name:'Dual Income Couple at 35', age:35, retireAt:65, saved:80000, monthly:3000, rate:7.5, desc:'a dual-income household building retirement wealth together' },
  { slug:'self-employed-35',name:'Self-Employed at 35',     age:35, retireAt:65, saved:40000, monthly:2000, rate:7.5, desc:'a freelancer or business owner building a solo 401k' },
  { slug:'teacher-pension', name:'Teacher with Pension at 35', age:35, retireAt:62, saved:30000, monthly:800, rate:6, desc:'a teacher supplementing a defined benefit pension' },
  { slug:'military-veteran',name:'Military Veteran at 40',  age:40, retireAt:60, saved:100000, monthly:1000, rate:6.5, desc:'a military veteran with pension supplementing TSP savings' },
  { slug:'doctor-late-start',name:'Doctor Starting Late at 35',age:35,retireAt:65, saved:10000, monthly:3000, rate:8, desc:'a physician who started saving late after long training' },
  { slug:'nurse-age-40',    name:'Nurse at Age 40',         age:40, retireAt:62, saved:60000, monthly:1200, rate:7, desc:'a registered nurse planning early retirement at 62' },
  { slug:'tech-worker-28',  name:'Tech Worker at 28',       age:28, retireAt:50, saved:80000, monthly:3000, rate:9, desc:'a high-earning tech worker targeting FIRE at 50' },
  { slug:'single-mom-35',   name:'Single Parent at 35',     age:35, retireAt:67, saved:15000, monthly:500,  rate:7, desc:'a single parent building retirement savings on one income' },
  { slug:'entrepreneur-40', name:'Entrepreneur at 40',      age:40, retireAt:60, saved:200000, monthly:2500, rate:8, desc:'a business owner with variable income planning for retirement' },
  { slug:'age-65-still-working', name:'Working Past 65',   age:65, retireAt:70, saved:600000, monthly:1500, rate:4, desc:'delaying retirement to maximize Social Security and savings' },
  { slug:'minimize-1m-target',name:'Path to $1M Retirement',age:30, retireAt:65, saved:10000, monthly:800,  rate:8, desc:'the roadmap to a $1 million retirement portfolio' },
  { slug:'minimize-2m-target',name:'Path to $2M Retirement',age:30, retireAt:65, saved:50000, monthly:1500, rate:8, desc:'building a $2 million retirement nest egg' },
  { slug:'3m-target',        name:'Path to $3M Retirement', age:30, retireAt:65, saved:100000,monthly:2500, rate:8, desc:'an ambitious $3 million retirement goal' },
  { slug:'roth-vs-traditional',name:'Roth vs Traditional IRA Age 30',age:30,retireAt:65,saved:20000,monthly:583,rate:8, desc:'comparing Roth and Traditional IRA strategies' },
  { slug:'age-33', name:'Age 33', age:33, retireAt:65, saved:30000, monthly:650, rate:8, desc:'in your early 30s building momentum toward retirement' },
  { slug:'age-36', name:'Age 36', age:36, retireAt:65, saved:55000, monthly:750, rate:7.5, desc:'in your mid-30s with compounding doing heavy lifting' },
  { slug:'age-43', name:'Age 43', age:43, retireAt:65, saved:110000,monthly:1050,rate:7,   desc:'in your early 40s intensifying your retirement contributions' },
  { slug:'age-47', name:'Age 47', age:47, retireAt:65, saved:160000,monthly:1300,rate:6.5, desc:'in your late 40s with 18 years to retirement' },
  { slug:'age-53', name:'Age 53', age:53, retireAt:65, saved:240000,monthly:1800,rate:6,   desc:'in your early 50s with catch-up contributions available' },
  { slug:'age-57', name:'Age 57', age:57, retireAt:65, saved:320000,monthly:2100,rate:5.5, desc:'in your late 50s with 8 years to final push' },
  { slug:'age-27', name:'Age 27', age:27, retireAt:65, saved:8000,  monthly:450, rate:8,   desc:'in your late 20s with the greatest asset — time' },
  { slug:'age-29', name:'Age 29', age:29, retireAt:65, saved:18000, monthly:550, rate:8,   desc:'approaching 30 with strong financial habits forming' },
  { slug:'age-31', name:'Age 31', age:31, retireAt:65, saved:32000, monthly:620, rate:8,   desc:'in your early 30s balancing family costs and retirement' },
  { slug:'age-37', name:'Age 37', age:37, retireAt:65, saved:70000, monthly:850, rate:7.5, desc:'in your late 30s with retirement gaining urgency' },
  { slug:'age-44', name:'Age 44', age:44, retireAt:65, saved:130000,monthly:1100,rate:7,   desc:'in your mid-40s with 21 years of compounding remaining' },
  { slug:'age-49', name:'Age 49', age:49, retireAt:65, saved:190000,monthly:1400,rate:6.5, desc:'approaching 50 with retirement savings in full swing' },
]

const retDataContent = `const retirementAges = ${JSON.stringify(retirementAges, null, 2)}\nmodule.exports = retirementAges\n`
writeBatch(
  'data/retirementAges.js',
  retDataContent,
  path.join('app', 'retirement-calculator', 'age', '[age]'),
  `import items from '../../../../data/retirementAges'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.age)
  if (!it) return { title: 'Retirement Calculator' }
  const mo = it.rate / 100 / 12
  const n  = (it.retireAt - it.age) * 12
  const fv = it.saved * Math.pow(1 + mo, n) + it.monthly * (Math.pow(1 + mo, n) - 1) / mo
  return {
    title: \`Retirement Calculator — \${it.name} (Retire at \${it.retireAt}) 2026\`,
    description: \`Retirement plan for \${it.desc}. Starting \$\${it.saved.toLocaleString()}, saving \$\${it.monthly}/month at \${it.rate}%, retire at \${it.retireAt} with ~\$\${Math.round(fv).toLocaleString()}.\`,
    alternates: { canonical: \`https://freefincalc.net/retirement-calculator/age/\${it.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  `import items from '../../../../data/retirementAges'
import RetirementAgeClient from './RetirementAgeClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return items.map(x => ({ age: x.slug })) }
export default function Page({ params }) {
  const item = items.find(x => x.slug === params.age)
  if (!item) return notFound()
  return <RetirementAgeClient item={item} all={items} />
}`,
  `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }
function calcFV(saved, monthly, rate, years) {
  const mo = rate / 100 / 12
  const n  = years * 12
  return saved * Math.pow(1 + mo, n) + (mo > 0 ? monthly * (Math.pow(1 + mo, n) - 1) / mo : monthly * n)
}

export default function RetirementAgeClient({ item: it, all }) {
  const [saved,   setSaved]   = useState(it.saved)
  const [monthly, setMonthly] = useState(it.monthly)
  const [rate,    setRate]    = useState(it.rate)
  const [retireAt,setRetireAt]= useState(it.retireAt)
  const years = retireAt - it.age
  const fv    = years > 0 ? calcFV(saved, monthly, rate, years) : saved
  const income = fv * 0.04 / 12

  const s = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},
    bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},
    bcA:{color:'#64748b',textDecoration:'none'},
    h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},
    sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},
    grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},
    card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},
    lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},
    val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},
    sldr:{width:'100%',accentColor:'#f0c842'},
    box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},
    h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},
    p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},
    row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},
    aA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},
    calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'},
  }

  return (
    <div style={s.page}>
      <Header />
      <div style={s.wrap}>
        <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/retirement-calculator" style={s.bcA}>Retirement Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{it.name}</span></nav>
        <h1 style={s.h1}>Retirement Calculator — {it.name}</h1>
        <p style={s.sub}>Retirement plan for someone {it.desc}.</p>
        <div style={s.grid}>
          <div style={s.card}><label style={s.lbl}>Current Savings</label><div style={s.val}>{fmt(saved)}</div><input type="range" min={0} max={Math.max(saved*5,500000)} step={1000} value={saved} onChange={e=>setSaved(+e.target.value)} style={s.sldr}/></div>
          <div style={s.card}><label style={s.lbl}>Monthly Contribution</label><div style={s.val}>{fmt(monthly)}/mo</div><input type="range" min={100} max={5000} step={50} value={monthly} onChange={e=>setMonthly(+e.target.value)} style={s.sldr}/></div>
          <div style={s.card}><label style={s.lbl}>Annual Return Rate</label><div style={s.val}>{rate}%</div><input type="range" min={2} max={12} step={0.1} value={rate} onChange={e=>setRate(+e.target.value)} style={s.sldr}/></div>
          <div style={s.card}><label style={s.lbl}>Retire at Age</label><div style={s.val}>{retireAt}</div><input type="range" min={it.age+1} max={80} step={1} value={retireAt} onChange={e=>setRetireAt(+e.target.value)} style={s.sldr}/></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>Retirement Projection</h2>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Years to Retirement</span><span style={{fontWeight:700}}>{years} years</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Projected Nest Egg</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(fv)}</span></div>
          <div style={s.row}><span style={{color:'#94a3b8'}}>Monthly Income (4% rule)</span><span style={{fontWeight:700,color:'#10b981'}}>{fmt(income)}/mo</span></div>
          <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Total Contributions</span><span style={{fontWeight:700}}>{fmt(saved + monthly * years * 12)}</span></div>
        </div>
        <div style={s.box}>
          <h2 style={s.h2}>{it.name} Retirement Guide</h2>
          <p style={s.p}>At {it.age}, you have {years} years until retirement at {retireAt}. Starting with {fmt(saved)} and contributing {fmt(monthly)}/month at {rate}% return, you are projected to accumulate <strong style={{color:'#f0c842'}}>{fmt(fv)}</strong> — enough to generate <strong style={{color:'#10b981'}}>{fmt(income)}/month</strong> using the 4% withdrawal rule.</p>
          <p style={s.p}>{years >= 25 ? 'You have the most powerful retirement weapon — time. Even modest contributions now grow dramatically over ' + years + ' years.' : years >= 15 ? 'You still have ' + years + ' years to make a real difference. Maximizing contributions in this window is critical.' : 'With ' + years + ' years left, every dollar saved now counts more than ever. Consider catch-up contributions and delaying Social Security.'}</p>
        </div>
        <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/retirement-calculator','Retirement Calculator'],['/401k-calculator','401k Calculator'],['/roth-ira-calculator','Roth IRA'],['/social-security-calculator','Social Security'],['/fire-calculator','FIRE Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
        <div style={s.box}><h2 style={s.h2}>Retirement Calculator by Age</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/retirement-calculator/age/'+x.slug} style={s.aA}>{x.name}</a>))}</div>
      </div>
      <Footer />
    </div>
  )
}`,
  'RetirementAgeClient.js'
)

// ─────────────────────────────────────────────────────────────────────────────
// BATCH B — Budget Calculator by City (50 pages)
// /budget-calculator/city/[city]
// ─────────────────────────────────────────────────────────────────────────────
const budgetCities = [
  { slug:'new-york',      name:'New York, NY',       rent:3200, food:800,  transport:150, utilities:200, entertainment:400, misc:300 },
  { slug:'san-francisco', name:'San Francisco, CA',   rent:3500, food:850,  transport:120, utilities:180, entertainment:450, misc:350 },
  { slug:'los-angeles',   name:'Los Angeles, CA',     rent:2800, food:750,  transport:200, utilities:160, entertainment:380, misc:280 },
  { slug:'chicago',       name:'Chicago, IL',         rent:2000, food:650,  transport:120, utilities:160, entertainment:300, misc:250 },
  { slug:'houston',       name:'Houston, TX',         rent:1500, food:600,  transport:250, utilities:180, entertainment:250, misc:200 },
  { slug:'phoenix',       name:'Phoenix, AZ',         rent:1700, food:600,  transport:220, utilities:220, entertainment:250, misc:200 },
  { slug:'philadelphia',  name:'Philadelphia, PA',    rent:1800, food:650,  transport:110, utilities:150, entertainment:280, misc:220 },
  { slug:'san-antonio',   name:'San Antonio, TX',     rent:1400, food:580,  transport:240, utilities:170, entertainment:230, misc:190 },
  { slug:'san-diego',     name:'San Diego, CA',       rent:2900, food:750,  transport:180, utilities:170, entertainment:380, misc:280 },
  { slug:'dallas',        name:'Dallas, TX',          rent:1700, food:620,  transport:240, utilities:180, entertainment:270, misc:210 },
  { slug:'austin',        name:'Austin, TX',          rent:2000, food:680,  transport:220, utilities:170, entertainment:320, misc:250 },
  { slug:'seattle',       name:'Seattle, WA',         rent:2600, food:780,  transport:130, utilities:140, entertainment:380, misc:300 },
  { slug:'denver',        name:'Denver, CO',          rent:2200, food:680,  transport:180, utilities:150, entertainment:330, misc:260 },
  { slug:'boston',        name:'Boston, MA',          rent:3000, food:800,  transport:110, utilities:160, entertainment:400, misc:300 },
  { slug:'nashville',     name:'Nashville, TN',       rent:1900, food:650,  transport:210, utilities:160, entertainment:300, misc:240 },
  { slug:'miami',         name:'Miami, FL',           rent:2600, food:720,  transport:200, utilities:180, entertainment:380, misc:290 },
  { slug:'portland',      name:'Portland, OR',        rent:2000, food:700,  transport:120, utilities:140, entertainment:330, misc:260 },
  { slug:'las-vegas',     name:'Las Vegas, NV',       rent:1700, food:620,  transport:220, utilities:200, entertainment:300, misc:230 },
  { slug:'atlanta',       name:'Atlanta, GA',         rent:1900, food:650,  transport:220, utilities:160, entertainment:300, misc:240 },
  { slug:'minneapolis',   name:'Minneapolis, MN',     rent:1800, food:660,  transport:120, utilities:180, entertainment:290, misc:230 },
  { slug:'charlotte',     name:'Charlotte, NC',       rent:1700, food:630,  transport:210, utilities:150, entertainment:270, misc:220 },
  { slug:'raleigh',       name:'Raleigh, NC',         rent:1700, food:620,  transport:200, utilities:145, entertainment:260, misc:210 },
  { slug:'tampa',         name:'Tampa, FL',           rent:1900, food:640,  transport:210, utilities:170, entertainment:280, misc:230 },
  { slug:'orlando',       name:'Orlando, FL',         rent:1800, food:620,  transport:210, utilities:170, entertainment:300, misc:230 },
  { slug:'sacramento',    name:'Sacramento, CA',      rent:2000, food:680,  transport:180, utilities:160, entertainment:300, misc:240 },
  { slug:'pittsburgh',    name:'Pittsburgh, PA',      rent:1400, food:580,  transport:100, utilities:150, entertainment:240, misc:190 },
  { slug:'st-louis',      name:'St. Louis, MO',       rent:1300, food:570,  transport:180, utilities:150, entertainment:230, misc:180 },
  { slug:'salt-lake-city',name:'Salt Lake City, UT',  rent:1900, food:640,  transport:190, utilities:140, entertainment:280, misc:220 },
  { slug:'kansas-city',   name:'Kansas City, MO',     rent:1300, food:570,  transport:190, utilities:150, entertainment:230, misc:180 },
  { slug:'columbus',      name:'Columbus, OH',        rent:1300, food:570,  transport:170, utilities:150, entertainment:230, misc:180 },
  { slug:'indianapolis',  name:'Indianapolis, IN',    rent:1200, food:560,  transport:190, utilities:150, entertainment:220, misc:175 },
  { slug:'richmond',      name:'Richmond, VA',        rent:1500, food:600,  transport:180, utilities:145, entertainment:250, misc:200 },
  { slug:'baltimore',     name:'Baltimore, MD',       rent:1700, food:640,  transport:110, utilities:155, entertainment:270, misc:220 },
  { slug:'memphis',       name:'Memphis, TN',         rent:1200, food:560,  transport:200, utilities:160, entertainment:220, misc:170 },
  { slug:'louisville',    name:'Louisville, KY',      rent:1200, food:560,  transport:180, utilities:150, entertainment:220, misc:175 },
  { slug:'oklahoma-city', name:'Oklahoma City, OK',   rent:1100, food:550,  transport:220, utilities:160, entertainment:210, misc:165 },
  { slug:'omaha',         name:'Omaha, NE',           rent:1200, food:560,  transport:190, utilities:150, entertainment:215, misc:170 },
  { slug:'albuquerque',   name:'Albuquerque, NM',     rent:1300, food:570,  transport:200, utilities:155, entertainment:220, misc:175 },
  { slug:'tucson',        name:'Tucson, AZ',          rent:1300, food:570,  transport:200, utilities:190, entertainment:220, misc:175 },
  { slug:'fresno',        name:'Fresno, CA',          rent:1500, food:600,  transport:200, utilities:160, entertainment:250, misc:200 },
  { slug:'mesa',          name:'Mesa, AZ',            rent:1600, food:590,  transport:210, utilities:210, entertainment:250, misc:200 },
  { slug:'virginia-beach',name:'Virginia Beach, VA',  rent:1600, food:610,  transport:190, utilities:145, entertainment:260, misc:205 },
  { slug:'colorado-springs',name:'Colorado Springs, CO',rent:1800,food:640, transport:200, utilities:145, entertainment:270, misc:210 },
  { slug:'milwaukee',     name:'Milwaukee, WI',       rent:1300, food:570,  transport:110, utilities:170, entertainment:230, misc:180 },
  { slug:'detroit',       name:'Detroit, MI',         rent:1100, food:550,  transport:180, utilities:160, entertainment:210, misc:165 },
  { slug:'jacksonville',  name:'Jacksonville, FL',    rent:1500, food:590,  transport:210, utilities:165, entertainment:250, misc:195 },
  { slug:'cincinnati',    name:'Cincinnati, OH',      rent:1200, food:560,  transport:170, utilities:150, entertainment:220, misc:175 },
  { slug:'fort-worth',    name:'Fort Worth, TX',      rent:1600, food:600,  transport:230, utilities:175, entertainment:260, misc:200 },
  { slug:'el-paso',       name:'El Paso, TX',         rent:1100, food:540,  transport:210, utilities:155, entertainment:200, misc:160 },
  { slug:'washington-dc', name:'Washington, DC',      rent:2800, food:780,  transport:130, utilities:170, entertainment:380, misc:290 },
]

const budgetDataContent = `const budgetCities = ${JSON.stringify(budgetCities, null, 2)}\nmodule.exports = budgetCities\n`
writeBatch(
  'data/budgetCities.js',
  budgetDataContent,
  path.join('app', 'budget-calculator', 'city', '[city]'),
  `import cities from '../../../../data/budgetCities'
export async function generateMetadata({ params }) {
  const c = cities.find(x => x.slug === params.city)
  if (!c) return { title: 'Budget Calculator by City' }
  const total = c.rent + c.food + c.transport + c.utilities + c.entertainment + c.misc
  return {
    title: \`\${c.name} Cost of Living Budget Calculator 2026\`,
    description: \`Monthly budget breakdown for living in \${c.name}. Rent: \$\${c.rent}, Food: \$\${c.food}, Transport: \$\${c.transport}. Total est. \$\${total.toLocaleString()}/month.\`,
    alternates: { canonical: \`https://freefincalc.net/budget-calculator/city/\${c.slug}\` },
  }
}
export default function Layout({ children }) { return children }`,
  `import cities from '../../../../data/budgetCities'
import BudgetCityClient from './BudgetCityClient'
import { notFound } from 'next/navigation'
export async function generateStaticParams() { return cities.map(c => ({ city: c.slug })) }
export default function Page({ params }) {
  const item = cities.find(c => c.slug === params.city)
  if (!item) return notFound()
  return <BudgetCityClient item={item} all={cities} />
}`,
  `'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

function fmt(n) { return '$' + Math.round(n || 0).toLocaleString('en-US') }

export default function BudgetCityClient({ item: c, all }) {
  const [rent,   setRent]   = useState(c.rent)
  const [food,   setFood]   = useState(c.food)
  const [trans,  setTrans]  = useState(c.transport)
  const [utils,  setUtils]  = useState(c.utilities)
  const [ent,    setEnt]    = useState(c.entertainment)
  const [misc,   setMisc]   = useState(c.misc)
  const total = rent + food + trans + utils + ent + misc

  const s = {
    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},
    wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},
    bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},
    bcA:{color:'#64748b',textDecoration:'none'},
    h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},
    sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},
    box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},
    h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},
    p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},
    row:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},
    lbl:{fontSize:13,color:'#94a3b8'},
    val:{fontSize:14,fontWeight:700,color:'#e2e8f0',minWidth:70,textAlign:'right'},
    sldr:{width:'100%',accentColor:'#f0c842',marginTop:4},
    cA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},
    calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'},
  }

  const cats = [
    {lbl:'Rent / Housing',    v:rent,  set:setRent,  max:6000},
    {lbl:'Food & Groceries',  v:food,  set:setFood,  max:2000},
    {lbl:'Transportation',    v:trans, set:setTrans, max:1000},
    {lbl:'Utilities',         v:utils, set:setUtils, max:600},
    {lbl:'Entertainment',     v:ent,   set:setEnt,   max:1000},
    {lbl:'Miscellaneous',     v:misc,  set:setMisc,  max:800},
  ]

  return (
    <div style={s.page}>
      <Header />
      <div style={s.wrap}>
        <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/budget-planner-calculator" style={s.bcA}>Budget Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{c.name}</span></nav>
        <h1 style={s.h1}>Cost of Living & Budget Calculator: {c.name} 2026</h1>
        <p style={s.sub}>Adjust the sliders to build your personal monthly budget for living in {c.name}.</p>

        <div style={s.box}>
          {cats.map(({lbl,v,set,max}) => (
            <div key={lbl} style={s.row}>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span style={s.lbl}>{lbl}</span><span style={s.val}>{fmt(v)}/mo</span></div>
                <input type="range" min={0} max={max} step={50} value={v} onChange={e=>set(+e.target.value)} style={s.sldr}/>
              </div>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0 0'}}>
            <span style={{fontWeight:700,fontSize:15}}>Total Monthly Budget</span>
            <span style={{fontWeight:800,fontSize:22,color:'#f0c842'}}>{fmt(total)}/mo</span>
          </div>
          <div style={{marginTop:8,fontSize:13,color:'#64748b',display:'flex',gap:20,flexWrap:'wrap'}}>
            <span>Annual: <strong style={{color:'#e2e8f0'}}>{fmt(total*12)}</strong></span>
            <span>Income needed (50/30/20): <strong style={{color:'#e2e8f0'}}>{fmt(total/0.5)}/mo</strong></span>
          </div>
        </div>

        <div style={s.box}>
          <h2 style={s.h2}>Cost of Living in {c.name}</h2>
          <p style={s.p}>The average monthly cost of living in {c.name} is approximately <strong style={{color:'#f0c842'}}>{fmt(c.rent+c.food+c.transport+c.utilities+c.entertainment+c.misc)}/month</strong> before personal savings and debt payments. Rent is the dominant expense at {fmt(c.rent)}/month for a typical apartment. To live comfortably using the 50/30/20 rule (50% needs, 30% wants, 20% savings), you need a take-home income of at least <strong style={{color:'#e2e8f0'}}>{fmt((c.rent+c.food+c.transport+c.utilities)*2)}/month</strong>.</p>
        </div>

        <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/budget-planner-calculator','Budget Planner'],['/cost-of-living-calculator','Cost of Living'],['/salary-after-tax-calculator','Salary After Tax'],['/savings-calculator','Savings Calculator'],['/net-worth-calculator','Net Worth']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
        <div style={s.box}><h2 style={s.h2}>Budget Calculator by City</h2>{all.filter(x=>x.slug!==c.slug).map(x=>(<a key={x.slug} href={'/budget-calculator/city/'+x.slug} style={s.cA}>{x.name}</a>))}</div>
      </div>
      <Footer />
    </div>
  )
}`,
  'BudgetCityClient.js'
)

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE SITEMAP
// ─────────────────────────────────────────────────────────────────────────────
let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) {}

if (sitemap) {
  if (!sitemap.includes('/retirement-calculator/age/'))
    sitemap = addToSitemap(retirementAges, x => `https://freefincalc.net/retirement-calculator/age/${x.slug}`, sitemap)
  if (!sitemap.includes('/budget-calculator/city/'))
    sitemap = addToSitemap(budgetCities, x => `https://freefincalc.net/budget-calculator/city/${x.slug}`, sitemap)
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
  console.log('✅ sitemap.xml updated')
}

const newPages = retirementAges.length + budgetCities.length
console.log(`
╔══════════════════════════════════════════════╗
║  BUILD COMPLETE                              ║
╠══════════════════════════════════════════════╣
║  Retirement by age:       ${retirementAges.length} pages          ║
║  Budget by city:          ${budgetCities.length} pages          ║
║  ─────────────────────────────────────────── ║
║  Total new pages:         ${newPages}                ║
║  Running total:          ~${585 + newPages} pages          ║
║  Remaining to 1000:      ~${1000 - 585 - newPages} pages           ║
╚══════════════════════════════════════════════╝

Deploy:
  git add -A
  git commit -m "feat: ${newPages} more SEO pages - retirement by age + budget by city"
  vercel --prod
`)
