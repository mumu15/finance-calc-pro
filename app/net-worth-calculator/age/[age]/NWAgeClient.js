'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import AdUnit from '../../../components/AdUnit';
import SchemaMarkup from '../../../components/SchemaMarkup';
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
export default function NWAgeClient({item:it,all}){
  const[assets,setAssets]=useState(50000)
  const[liabilities,setLiab]=useState(20000)
  const nw=assets-liabilities
  const pctile=nw<it.median?'Below median':(nw<it.p75?'Above median (25-75th %)':(nw<it.p90?'Top 25%':'Top 10%'))
  const pctileColor=nw<it.median?'#ef4444':(nw<it.p75?'#f0c842':(nw<it.p90?'#10b981':'#6ee7b7'))
  const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},aA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
  return(<div style={s.page}><Header/>
        <SchemaMarkup />
        <AdUnit slot="7405024590" /><div style={s.wrap}>
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
      <div style={s.card}><label style={s.lbl}>Total Assets</label><div style={s.val}>{fmt(assets)}</div><input type="number" value={assets} onChange={e=>setAssets(+e.target.value)} style={s.sldr}/></div>
      <div style={s.card}><label style={s.lbl}>Total Liabilities</label><div style={s.val}>{fmt(liabilities)}</div><input type="number" value={liabilities} onChange={e=>setLiab(+e.target.value)} style={s.sldr}/></div>
    </div>
    <div style={s.box}>
      <h2 style={s.h2}>Your Net Worth Percentile</h2>
      <div style={s.row}><span style={{color:'#94a3b8'}}>Your Net Worth</span><span style={{fontWeight:800,color:'#f0c842',fontSize:20}}>{fmt(nw)}</span></div>
      <div style={{...s.row,borderBottom:'none'}}><span style={{color:'#94a3b8'}}>Your Ranking vs Peers</span><span style={{fontWeight:800,color:pctileColor}}>{pctile}</span></div>
    </div>
    <div style={s.box}><h2 style={s.h2}>Net Worth Guide — {it.name}</h2><p style={s.p}>The median American net worth at {it.name} is <strong style={{color:'#f0c842'}}>{fmt(it.median)}</strong>. This is the point where half of people have more and half have less. The average ({fmt(it.avg)}) is much higher, skewed by the ultra-wealthy. A more useful benchmark is the 75th percentile ({fmt(it.p75)}) — what the financially disciplined have achieved.</p><p style={s.p}>Common rules of thumb: save 1x your salary by 30, 3x by 40, 6x by 50, and 10x by 65. Focus on your savings rate — at {it.savingsRate}%+ you are on track for a comfortable retirement.</p></div>
    <div style={s.box}><h2 style={s.h2}>Related Calculators</h2>{[['/net-worth-calculator','Net Worth Calculator'],['/retirement-calculator','Retirement Calculator'],['/investment-return-calculator','Investment Return'],['/savings-calculator','Savings Calculator'],['/fire-calculator','FIRE Calculator']].map(([href,lbl])=>(<a key={href} href={href} style={s.calcA}>{lbl}</a>))}</div>
    <div style={s.box}><h2 style={s.h2}>Net Worth by Age</h2>{all.filter(x=>x.slug!==it.slug).map(x=>(<a key={x.slug} href={'/net-worth-calculator/age/'+x.slug} style={s.aA}>{x.name}</a>))}</div>
  </div><AdUnit slot="3248634657" />
      <Footer/></div>)
}
