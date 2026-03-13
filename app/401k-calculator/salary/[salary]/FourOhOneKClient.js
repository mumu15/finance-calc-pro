'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../../components/AdUnit';
import SchemaMarkup from '../../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function fv(monthly,rate,years){const mo=rate/100/12,n=years*12;return mo>0?monthly*(Math.pow(1+mo,n)-1)/mo:monthly*n}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
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
  return(<div style={s.page}><Header/>
        <SchemaMarkup breadcrumbs={[
    { name: 'Home', url: 'https://freefincalc.net' },
    { name: '401(k) Calculator', url: 'https://freefincalc.net/401k-calculator' }
  ]} />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
    <nav style={s.bc}><a href="/" style={s.bcA}>Home</a><span>›</span><a href="/401k-calculator" style={s.bcA}>401k Calculator</a><span>›</span><span style={{color:'#94a3b8'}}>{fmt(salary)}/yr</span></nav>
    <h1 style={s.h1}>401k Calculator: {fmt(salary)}/Year Salary</h1>
    <p style={s.sub}>See exactly how much your 401k will grow on a {fmt(salary)}/year salary, including employer match.</p>
    <div style={s.grid}>
      <div style={s.card}><label style={s.lbl}>Annual Salary</label><div style={s.val}>{fmt(salary)}/yr</div><input type="number" value={salary} onChange={e=>setSalary(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Your Contribution</label><div style={s.val}>{contrib}% — {fmt(salary*contrib/100/12)}/mo</div><input type="number" value={contrib} onChange={e=>setContrib(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Employer Match</label><div style={s.val}>{match}% — {fmt(salary*Math.min(match,contrib)/100/12)}/mo</div><input type="number" value={match} onChange={e=>setMatch(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Years to Retirement</label><div style={s.val}>{years} years</div><input type="number" value={years} onChange={e=>setYears(+e.target.value)} style={s.sldr}/></div>
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
  </div><AdUnit slot="3248634657" />
      <Footer/></div>)
}