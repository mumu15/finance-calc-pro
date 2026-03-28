'use client'
import { useState, useMemo } from 'react'

export default function EmbedWidget() {
  const [age, setAge] = useState(30)
  const [retireAge, setRetireAge] = useState(65)
  const [saved, setSaved] = useState(50000)
  const [monthly, setMonthly] = useState(1000)
  const [rate, setRate] = useState(8)

  const r = useMemo(() => {
    try {
      const years = retireAge - age;
            if (years <= 0) return { total: saved, contributed: saved, interest: 0, monthlyIncome: Math.round(saved / 300) };
            const r = rate / 100 / 12;
            const n = years * 12;
            const futureS = saved * Math.pow(1 + r, n);
            const futureM = monthly * ((Math.pow(1 + r, n) - 1) / r);
            const total = Math.round(futureS + futureM);
            const contributed = Math.round(saved + monthly * n);
            const interest = total - contributed;
            const monthlyIncome = Math.round(total * 0.04 / 12);
            return { total, contributed, interest, monthlyIncome };
    } catch(e) { return null }
  }, [age, retireAge, saved, monthly, rate])

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
      <div style={st.title}>Retirement Calculator</div>
      <div>
          <div>
            <label style={st.label}>Current Age</label>
            <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Retire At</label>
            <input type="number" value={retireAge} onChange={e => setRetireAge(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Current Savings</label>
            <input type="number" value={saved} onChange={e => setSaved(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Monthly Savings</label>
            <input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Annual Return (%)</label>
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} style={st.input} />
          </div>
      </div>
      {r && (
        <div style={{marginTop:8}}>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>At Retirement</span>
            <span style={st.resultVal}>{'$' + r.total.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Your Contributions</span>
            <span style={st.resultVal}>{'$' + r.contributed.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Investment Growth</span>
            <span style={st.resultVal}>{'$' + r.interest.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Monthly Income (4% rule)</span>
            <span style={st.resultVal}>{'$' + r.monthlyIncome.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div style={st.powered}>
        Powered by <a href="https://www.freefincalc.net/retirement-calculator" target="_blank" rel="noopener" style={st.link}>FreeFinCalc.net</a>
      </div>
    </div>
  )
}