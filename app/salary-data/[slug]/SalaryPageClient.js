'use client'
import { useState, useMemo } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'
import FaqSchema from '../../../components/FaqSchema'

function fmt(n) { return '$' + Math.round(n).toLocaleString('en-US') }

export default function SalaryPageClient({ prof, states, allProfs }) {
  const [sortAsc, setSortAsc] = useState(false)
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    return states.map(s => ({
      ...s,
      salary: Math.round(prof.baseSalary * (prof.multipliers[s.slug] || 0.95)),
      adjusted: Math.round(prof.baseSalary * (prof.multipliers[s.slug] || 0.95) * 100 / s.colIndex),
    }))
  }, [states, prof])

  const sorted = useMemo(() => {
    let arr = [...rows]
    if (search) arr = arr.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    arr.sort((a, b) => sortAsc ? a.salary - b.salary : b.salary - a.salary)
    return arr
  }, [rows, sortAsc, search])

  const best = [...rows].sort((a, b) => b.salary - a.salary)[0]
  const worst = [...rows].sort((a, b) => a.salary - b.salary)[0]
  const bestAdj = [...rows].sort((a, b) => b.adjusted - a.adjusted)[0]
  const avg = Math.round(rows.reduce((s, r) => s + r.salary, 0) / rows.length)
  const top5 = [...rows].sort((a, b) => b.salary - a.salary).slice(0, 5)
  const bottom5 = [...rows].sort((a, b) => a.salary - b.salary).slice(0, 5)
  const top5adj = [...rows].sort((a, b) => b.adjusted - a.adjusted).slice(0, 5)

  const faqs = [
    { q: 'What state pays ' + prof.job + 's the most?', a: best.name + ' pays the highest ' + prof.job + ' salary at ' + fmt(best.salary) + '/year. However, after adjusting for cost of living, ' + bestAdj.name + ' offers the best real value at ' + fmt(bestAdj.adjusted) + ' adjusted.' },
    { q: 'What is the average ' + prof.job + ' salary in 2026?', a: 'The national average ' + prof.job + ' salary is ' + fmt(avg) + '/year. This varies from ' + fmt(worst.salary) + ' in ' + worst.name + ' to ' + fmt(best.salary) + ' in ' + best.name + '.' },
    { q: 'Which state is best for ' + prof.job + 's after cost of living?', a: bestAdj.name + ' offers the best cost-of-living adjusted ' + prof.job + ' salary at ' + fmt(bestAdj.adjusted) + '. This accounts for housing, taxes, groceries, and other expenses.' },
    { q: 'How much do ' + prof.job + 's make per month?', a: 'The average ' + prof.job + ' makes ' + fmt(Math.round(avg / 12)) + '/month before taxes. After federal and state taxes, take-home pay ranges from ' + fmt(Math.round(worst.salary * 0.72 / 12)) + ' to ' + fmt(Math.round(best.salary * 0.78 / 12)) + '/month.' },
  ]

  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 28px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 },
    statCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, textAlign: 'center' },
    statNum: { fontSize: 20, fontWeight: 800 },
    statLbl: { fontSize: 10, color: '#64748b', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' },
    td: { padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    searchInput: { width: '100%', padding: '10px 16px', borderRadius: 10, background: '#1a1d28', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 16, fontFamily: 'inherit' },
    tagLink: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', margin: '0 6px 8px 0', background: 'rgba(240,200,66,0.06)', border: '1px solid rgba(240,200,66,0.15)', color: '#f0c842' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <a href="/salary-data" style={{color:'#64748b',textDecoration:'none'}}>Salary Data</a>
          <span style={{color:'#475569'}}>{'\u203a'}</span>
          <span style={{color:'#94a3b8'}}>{prof.job}</span>
        </nav>
        <h1 style={st.h1}>{prof.title}</h1>
        <p style={st.desc}>{prof.desc}</p>
        <div style={st.statsGrid}>
          <div style={st.statCard}><div style={{...st.statNum,color:'#10b981'}}>{fmt(best.salary)}</div><div style={st.statLbl}>Highest ({best.name})</div></div>
          <div style={st.statCard}><div style={{...st.statNum,color:'#ef4444'}}>{fmt(worst.salary)}</div><div style={st.statLbl}>Lowest ({worst.name})</div></div>
          <div style={st.statCard}><div style={{...st.statNum,color:'#f0c842'}}>{fmt(avg)}</div><div style={st.statLbl}>National Average</div></div>
          <div style={st.statCard}><div style={{...st.statNum,color:'#60a5fa'}}>{fmt(bestAdj.adjusted)}</div><div style={st.statLbl}>Best Adjusted ({bestAdj.name})</div></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:28}}>
          <div style={st.box}><h2 style={{...st.h2,color:'#10b981',fontSize:16}}>Top 5 Highest Pay</h2>{top5.map((s,i) => <div key={s.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}><span style={{color:'#e2e8f0',fontSize:13}}>{'#'+(i+1)+' '}<a href={'/cost-of-living-calculator/state/'+s.slug} style={{color:'#e2e8f0',textDecoration:'none'}}>{s.name}</a></span><span style={{fontWeight:700,color:'#10b981',fontSize:13}}>{fmt(s.salary)}</span></div>)}</div>
          <div style={st.box}><h2 style={{...st.h2,color:'#60a5fa',fontSize:16}}>Top 5 Best Value (COL Adj.)</h2>{top5adj.map((s,i) => <div key={s.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}><span style={{color:'#e2e8f0',fontSize:13}}>{'#'+(i+1)+' '}{s.name}</span><span style={{fontWeight:700,color:'#60a5fa',fontSize:13}}>{fmt(s.adjusted)}</span></div>)}</div>
          <div style={st.box}><h2 style={{...st.h2,color:'#ef4444',fontSize:16}}>Bottom 5 Lowest Pay</h2>{bottom5.map((s,i) => <div key={s.slug} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}><span style={{color:'#e2e8f0',fontSize:13}}>{'#'+(50-i)+' '}{s.name}</span><span style={{fontWeight:700,color:'#ef4444',fontSize:13}}>{fmt(s.salary)}</span></div>)}</div>
        </div>
        <AdUnit slot="3248634657" />
        <div style={st.box}>
          <h2 style={st.h2}>{'All 50 States \u2014 ' + prof.job + ' Salary'}</h2>
          <input type="text" placeholder="Search states..." value={search} onChange={e => setSearch(e.target.value)} style={st.searchInput} />
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            <th style={st.th}>#</th>
            <th style={st.th}>State</th>
            <th style={st.th} onClick={() => setSortAsc(!sortAsc)}>Salary {sortAsc ? '\u25B2' : '\u25BC'}</th>
            <th style={st.th}>Monthly</th>
            <th style={st.th}>COL Adjusted</th>
            <th style={st.th}>COL Index</th>
            <th style={st.th}>Tax Rate</th>
          </tr></thead><tbody>
            {sorted.map((s, i) => {
              const allSorted = [...rows].sort((a,b) => b.salary - a.salary)
              const rank = allSorted.findIndex(d => d.slug === s.slug) + 1
              return (
                <tr key={s.slug} style={{background: i%2===0?'transparent':'rgba(255,255,255,0.015)'}}>
                  <td style={{...st.td,color:'#64748b',fontSize:12}}>{'#'+rank}</td>
                  <td style={st.td}><a href={'/cost-of-living-calculator/state/'+s.slug} style={{color:'#e2e8f0',textDecoration:'none',fontWeight:600}}>{s.name}</a></td>
                  <td style={{...st.td,fontWeight:700,color:'#f0c842'}}>{fmt(s.salary)}</td>
                  <td style={{...st.td,color:'#94a3b8'}}>{fmt(Math.round(s.salary/12))}</td>
                  <td style={{...st.td,color: s.adjusted > avg ? '#10b981' : '#ef4444',fontWeight:600}}>{fmt(s.adjusted)}</td>
                  <td style={{...st.td,color:'#94a3b8'}}>{s.colIndex}</td>
                  <td style={{...st.td,color: s.noTax ? '#10b981' : '#94a3b8'}}>{s.noTax ? 'None' : s.taxRate + '%'}</td>
                </tr>)
            })}
          </tbody></table></div>
        </div>
        <div style={st.box}><h2 style={st.h2}>Other Salary Data</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{allProfs.filter(p => p.slug !== prof.slug).map(p => <a key={p.slug} href={'/salary-data/'+p.slug} style={st.tagLink}>{p.job}</a>)}</div></div>
        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i) => <div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>)}</div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":prof.title,"description":prof.desc,"author":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-22"})}} />
      <Footer />
    </div>
  )
}