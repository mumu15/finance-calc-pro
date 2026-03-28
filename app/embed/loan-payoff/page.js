'use client'
import { useState, useMemo } from 'react'

export default function EmbedWidget() {
  const [balance, setBalance] = useState(25000)
  const [rate, setRate] = useState(6.5)
  const [payment, setPayment] = useState(500)

  const r = useMemo(() => {
    try {
      const r = rate / 100 / 12;
            if (payment <= balance * r) return { months: 0, totalPaid: 0, totalInterest: 0, payoffDate: 'Payment too low' };
            const months = Math.ceil(Math.log(payment / (payment - balance * r)) / Math.log(1 + r));
            const totalPaid = Math.round(payment * months);
            const totalInterest = totalPaid - balance;
            const d = new Date(); d.setMonth(d.getMonth() + months);
            const payoffDate = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            return { months, totalPaid, totalInterest: Math.round(totalInterest), payoffDate };
    } catch(e) { return null }
  }, [balance, rate, payment])

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
      <div style={st.title}>Loan Payoff Calculator</div>
      <div>
          <div>
            <label style={st.label}>Loan Balance</label>
            <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} style={st.input} />
          </div>
          <div>
            <label style={st.label}>Monthly Payment</label>
            <input type="number" value={payment} onChange={e => setPayment(Number(e.target.value))} style={st.input} />
          </div>
      </div>
      {r && (
        <div style={{marginTop:8}}>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Months to Pay Off</span>
            <span style={st.resultVal}>{r.months.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Payoff Date</span>
            <span style={st.resultVal}>{r.payoffDate}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Total Interest</span>
            <span style={st.resultVal}>{'$' + r.totalInterest.toLocaleString()}</span>
          </div>
          <div style={st.resultRow}>
            <span style={st.resultLabel}>Total Paid</span>
            <span style={st.resultVal}>{'$' + r.totalPaid.toLocaleString()}</span>
          </div>
        </div>
      )}
      <div style={st.powered}>
        Powered by <a href="https://www.freefincalc.net/loan-payment-calculator" target="_blank" rel="noopener" style={st.link}>FreeFinCalc.net</a>
      </div>
    </div>
  )
}