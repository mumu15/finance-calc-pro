'use client'
import { useState, useMemo } from 'react'

export default function EmbedWidget() {
  const [weight, setWeight] = useState(170)
  const [feet, setFeet] = useState(5)
  const [inches, setInches] = useState(10)

  const r = useMemo(() => {
    try {
      const totalInches = feet * 12 + inches;
            const bmi = Math.round((weight / (totalInches * totalInches)) * 703 * 10) / 10;
            const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
            const idealMin = Math.round(18.5 * totalInches * totalInches / 703);
            const idealMax = Math.round(24.9 * totalInches * totalInches / 703);
            return { bmi, category, idealRange: idealMin + ' - ' + idealMax + ' lbs' };
    } catch(e) { return null }
  }, [weight, feet, inches])

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
      <div style={st.title}>BMI Calculator</div>
      <div>
          <div>
            <label style={st.label}>Weight (lbs)</label>
            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Height (feet)</label>
            <input type="number" value={feet} onChange={e => setFeet(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Height (inches)</label>
            <input type="number" value={inches} onChange={e => setInches(Number(e.target.value))} style={st.input} />
          </div>
      </div>
      {r && (
        <div style={{marginTop:8}}>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Your BMI</span>
            <span style={st.resultVal}>{r.bmi.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Category</span>
            <span style={st.resultVal}>{r.category}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Healthy Range</span>
            <span style={st.resultVal}>{r.idealRange}</span>
          </div>
        </div>
      )}
      <div style={st.powered}>
        Powered by <a href="https://www.freefincalc.net/budget-planner-calculator" target="_blank" rel="noopener" style={st.link}>FreeFinCalc.net</a>
      </div>
    </div>
  )
}