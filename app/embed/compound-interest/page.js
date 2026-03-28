'use client'
import { useState, useMemo } from 'react'

export default function EmbedWidget() {
  const [principal, setPrincipal] = useState(10000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(20)

  const r = useMemo(() => {
    try {
      const r = rate / 100 / 12;
            const n = years * 12;
            const futureP = principal * Math.pow(1 + r, n);
            const futureM = monthly * ((Math.pow(1 + r, n) - 1) / r);
            const total = Math.round(futureP + futureM);
            const contributed = Math.round(principal + monthly * n);
            const interest = total - contributed;
            return { total, contributed, interest, monthly: Math.round((futureP + futureM) / n) };
    } catch(e) { return null }
  }, [principal, monthly, rate, years])

  const st = {
    box: { fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', background: '#0f1117', borderRadius: 16, padding: 20, maxWidth: 400, color: '#e2e8f0' },
    title: { fontSize: 16, fontWeight: 800, color: '#f1f5f9', marginBottom: 16 },
    label: { display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 4, fontWeight: 600 },
    input: { width: '100%', padding: '8px 12px', borderRadius: 8, background: '#1a1d28', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: 'inherit' },
    resultRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    resultLabel: { fontSize: 13, color: '#94a3b8' },
    resultVal: { fontSize: 14, fontWeight: 700, color: '#f0c842' },
    powered: { marginTop: 12, textAlign: 'center', fontSize: 11, color: '#475569' },
    link: { color: '#f0c842', textDecoration: 'none', fontWeight: 700 },
  }

  return (
    <div style={st.box}>
      <div style={st.title}>Compound Interest Calculator</div>
      <div>
          <div>
            <label style={st.label}>Initial Investment</label>
            <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Monthly Contribution</label>
            <input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Annual Return (%)</label>
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Years</label>
            <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} style={st.input} />
          </div>
      </div>
      {r && (
        <div style={{marginTop:8}}>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Future Value</span>
            <span style={st.resultVal}>{'$' + r.total.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Total Contributed</span>
            <span style={st.resultVal}>{'$' + r.contributed.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Interest Earned</span>
            <span style={st.resultVal}>{'$' + r.interest.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div style={st.powered}>
        Powered by <a href="https://www.freefincalc.net/compound-interest-calculator" target="_blank" rel="noopener" style={st.link}>FreeFinCalc.net</a>
      </div>
    </div>
  )
}