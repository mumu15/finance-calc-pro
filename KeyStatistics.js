export default function KeyStatistics({ stats, title, source, sourceYear }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(13,33,64,0.9), rgba(7,20,38,0.95))',
      border: '1px solid rgba(240,200,66,0.15)',
      borderRadius: 16, padding: '28px 24px', marginBottom: 24
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <div style={{ width:4, height:24, background:'#f0c842', borderRadius:2 }} />
        <h2 style={{ color:'#fff', fontSize:18, fontWeight:700, margin:0 }}>
          {title || 'Key Statistics'}
        </h2>
      </div>
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))',
        gap:12
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.06)',
            borderRadius:12, padding:'16px 14px', textAlign:'center'
          }}>
            <div style={{ color:'#f0c842', fontSize:22, fontWeight:700, marginBottom:4 }}>
              {s.value}
            </div>
            <div style={{ color:'#94a3b8', fontSize:12, lineHeight:1.4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      {source && (
        <p style={{ color:'#64748b', fontSize:11, marginTop:14, marginBottom:0 }}>
          Source: {source}{sourceYear ? ' (' + sourceYear + ')' : ''}
        </p>
      )}
    </div>
  )
}
