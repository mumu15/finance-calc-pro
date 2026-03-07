/**
 * Fix: salary-after-tax/state/[state] — 50 pages
 * node build_sat_fix.js
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

fs.writeFileSync('data/satStates.js', `const satStates = ${JSON.stringify(satStates, null, 2)}\nmodule.exports = satStates\n`, 'utf8')

const satDir = path.join('app', 'salary-after-tax', 'state', '[state]')
fs.mkdirSync(satDir, { recursive: true })

// FIX: layout uses runtime params — NO reference to `it` at script time
fs.writeFileSync(path.join(satDir, 'layout.js'),
`import items from '../../../../data/satStates'
export async function generateMetadata({ params }) {
  const it = items.find(x => x.slug === params.state)
  if (!it) return { title: 'Salary After Tax by State' }
  const stateRate = it.noTax ? 'no state income tax' : it.rate + '% state rate'
  return {
    title: \`\${it.name} Salary After Tax Calculator 2026 — Take-Home Pay\`,
    description: \`Calculate your exact take-home pay in \${it.name} (\${stateRate}). See federal, state, and FICA deductions. Free 2026 \${it.name} salary calculator.\`,
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

const S = `const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}`

fs.writeFileSync(path.join(satDir, 'SATStateClient.js'),
`'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
const brackets=[
  {min:0,     max:11600,  rate:0.10},
  {min:11600, max:47150,  rate:0.12},
  {min:47150, max:100525, rate:0.22},
  {min:100525,max:191950, rate:0.24},
  {min:191950,max:243725, rate:0.32},
  {min:243725,max:609350, rate:0.35},
  {min:609350,max:Infinity,rate:0.37},
]
function fedTax(income){
  let t=0
  for(const b of brackets){
    if(income<=b.min) break
    t+=(Math.min(income,b.max)-b.min)*b.rate
  }
  return t
}
${S}
export default function SATStateClient({item:it,all}){
  const[salary,setSalary]=useState(75000)
  const fed=fedTax(salary)
  const state=it.noTax?0:salary*it.rate/100
  const fica=salary*0.0765
  const net=salary-fed-state-fica
  const eff=((fed+state+fica)/salary*100).toFixed(1)
  return(
    <div style={s.page}><Header/><div style={s.wrap}>
      <nav style={s.bc}>
        <a href="/" style={s.bcA}>Home</a><span>›</span>
        <a href="/salary-after-tax-calculator" style={s.bcA}>Salary After Tax</a><span>›</span>
        <span style={{color:'#94a3b8'}}>{it.name}</span>
      </nav>
      <h1 style={s.h1}>{it.name} Salary After Tax Calculator 2026</h1>
      <p style={s.sub}>{it.noTax ? it.name+' has no state income tax — workers keep more of every paycheck.' : 'State income tax rate: '+it.rate+'%. See your full breakdown below.'}</p>

      <div style={s.card}>
        <label style={s.lbl}>Annual Salary</label>
        <div style={s.val}>{fmt(salary)}/yr</div>
        <input type="range" min={20000} max={500000} step={1000} value={salary} onChange={e=>setSalary(+e.target.value)} style={s.sldr}/>
      </div>

      <div style={s.box}>
        <h2 style={s.h2}>Take-Home Pay — {it.name}</h2>
        <div style={s.row}><span style={{color:'#94a3b8'}}>Gross Salary</span><span style={{fontWeight:700}}>{fmt(salary)}</span></div>
        <div style={s.row}><span style={{color:'#94a3b8'}}>Federal Income Tax</span><span style={{fontWeight:700,color:'#ef4444'}}>- {fmt(fed)}</span></div>
        <div style={s.row}>
          <span style={{color:'#94a3b8'}}>{it.name} State Tax ({it.noTax?'None':it.rate+'%'})</span>
          <span style={{fontWeight:700,color:it.noTax?'#10b981':'#ef4444'}}>{it.noTax?'$0':'- '+fmt(state)}</span>
        </div>
        <div style={s.row}><span style={{color:'#94a3b8'}}>FICA / Social Security (7.65%)</span><span style={{fontWeight:700,color:'#ef4444'}}>- {fmt(fica)}</span></div>
        <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0 0'}}>
          <span style={{fontWeight:700,fontSize:15}}>Take-Home Pay</span>
          <span style={{fontWeight:800,fontSize:22,color:'#f0c842'}}>{fmt(net)}/yr</span>
        </div>
        <div style={{marginTop:10,fontSize:13,color:'#64748b',display:'flex',gap:20,flexWrap:'wrap'}}>
          <span>Monthly: <strong style={{color:'#e2e8f0'}}>{fmt(net/12)}</strong></span>
          <span>Biweekly: <strong style={{color:'#e2e8f0'}}>{fmt(net/26)}</strong></span>
          <span>Hourly: <strong style={{color:'#e2e8f0'}}>{fmt(net/2080)}/hr</strong></span>
          <span>Effective rate: <strong style={{color:'#e2e8f0'}}>{eff}%</strong></span>
        </div>
      </div>

      <div style={s.box}>
        <h2 style={s.h2}>{it.name} Tax Guide 2026</h2>
        <p style={s.p}>{it.noTax
          ? it.name+' is one of '+['Texas','Florida','Washington','Nevada','Tennessee','New Hampshire','South Dakota','Alaska','Wyoming'].length+' states with no income tax. On a $75,000 salary, residents save over $4,000/year compared to a state like California.'
          : 'In '+it.name+', the state income tax rate is '+it.rate+'%. Combined with federal taxes and FICA, the total effective rate on a $75,000 salary is approximately '+((fedTax(75000)+75000*it.rate/100+75000*0.0765)/75000*100).toFixed(1)+'%.'
        }</p>
      </div>

      <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>
        {[['/salary-after-tax-calculator','Salary After Tax'],['/paycheck-calculator','Paycheck Calculator'],['/tax-calculator','Tax Calculator'],['/hourly-to-salary-calculator','Hourly to Salary'],['/overtime-calculator','Overtime Calculator']].map(([href,lbl])=>(
          <a key={href} href={href} style={s.calcA}>{lbl}</a>
        ))}
      </div>
      <div style={s.box}><h2 style={s.h2}>Salary After Tax by State</h2>
        {all.filter(x=>x.slug!==it.slug).map(x=>(
          <a key={x.slug} href={'/salary-after-tax/state/'+x.slug} style={s.tagA}>{x.name} ({x.abbr})</a>
        ))}
      </div>
    </div><Footer/></div>
  )
}
`)

console.log('✅ salary-after-tax/state/[state] — ' + satStates.length + ' pages')

// update sitemap
let sitemap = ''
try { sitemap = fs.readFileSync('public/sitemap.xml', 'utf8') } catch(e) {}
if (sitemap && !sitemap.includes('/salary-after-tax/state/')) {
  sitemap = addToSitemap(satStates, x => `https://freefincalc.net/salary-after-tax/state/${x.slug}`, sitemap)
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8')
  console.log('✅ sitemap.xml updated (+50 salary-after-tax/state)')
}

console.log(`
Done! Now run:
  git add -A
  git commit -m "feat: salary-after-tax by state + 500 page batch"
  vercel --prod
`)
