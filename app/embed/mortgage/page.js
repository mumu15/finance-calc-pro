'use client'
import { useState, useMemo } from 'react'

export default function EmbedWidget() {
  const [price, setPrice] = useState(350000)
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [term, setTerm] = useState(30)

  const r = useMemo(() => {
    try {
      const loan = price * (1 - down / 100);
            const r = rate / 100 / 12;
            const n = term * 12;
            const payment = r > 0 ? loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan / n;
            const totalPaid = payment * n;
            const totalInterest = totalPaid - loan;
            return { payment: Math.round(payment), totalPaid: Math.round(totalPaid), totalInterest: Math.round(totalInterest), loan: Math.round(loan) };
    } catch(e) { return null }
  }, [price, down, rate, term])

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
      <div style={st.title}>Mortgage Calculator</div>
      <div>
          <div>
            <label style={st.label}>Home Price</label>
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Down Payment (%)</label>
            <input type="number" value={down} onChange={e => setDown(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Loan Term (years)</label>
            <input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} style={st.input} />
          </div>
      </div>
      {r && (
        <div style={{marginTop:8}}>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Monthly Payment</span>
            <span style={st.resultVal}>{'$' + r.payment.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Loan Amount</span>
            <span style={st.resultVal}>{'$' + r.loan.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Total Interest</span>
            <span style={st.resultVal}>{'$' + r.totalInterest.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Total Cost</span>
            <span style={st.resultVal}>{'$' + r.totalPaid.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div style={st.powered}>
        Powered by <a href="https://www.freefincalc.net/mortgage-calculator" target="_blank" rel="noopener" style={st.link}>FreeFinCalc.net</a>
      </div>
    </div>
  )
}