'use client'
import { useState } from 'react'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
function fmt(n){return '$'+Math.round(n||0).toLocaleString('en-US')}
function pmt(p,r,n){const mo=r/100/12;return mo>0?p*mo/(1-Math.pow(1+mo,-n)):p/n}
function minMonths(bal,apr,payment){let b=bal,mo=apr/100/12,m=0;while(b>0&&m<600){b=b*(1+mo)-payment;m++;}return m}
const s={page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},wrap:{maxWidth:860,margin:'0 auto',padding:'32px 16px 64px'},bc:{fontSize:13,color:'#64748b',marginBottom:12,display:'flex',gap:6,flexWrap:'wrap'},bcA:{color:'#64748b',textDecoration:'none'},h1:{fontSize:'clamp(22px,4vw,32px)',fontWeight:800,color:'#f1f5f9',margin:'0 0 8px'},sub:{fontSize:15,color:'#94a3b8',margin:'0 0 28px'},grid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20},card:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20},lbl:{fontSize:12,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:6,display:'block'},val:{fontSize:24,fontWeight:800,color:'#f0c842',margin:'0 0 10px'},sldr:{width:'100%',accentColor:'#f0c842'},box:{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:20,marginBottom:20},h2:{fontSize:18,fontWeight:700,color:'#f1f5f9',margin:'0 0 14px'},p:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 10px'},row:{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'},tagA:{display:'inline-block',padding:'5px 12px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:8,color:'#94a3b8',textDecoration:'none',fontSize:12,margin:'0 6px 6px 0'},calcA:{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600,margin:'0 8px 8px 0'}}
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
}