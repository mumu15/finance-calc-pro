'use client';
import { useState } from 'react';
import AdUnit from '../../../../components/AdUnit';

export default function Client() {
  const [balance, setBalance] = useState(90000);
  const [rate, setRate] = useState(18.9);
  const [payment, setPayment] = useState(1800);
  const [result, setResult] = useState(null);

  function calculate() {
    const b = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const p = parseFloat(payment);
    if (!b || !r || !p || p <= b * r) {
      setResult({ error: 'Monthly payment must be higher than the monthly interest charge.' });
      return;
    }
    const months = Math.ceil(-Math.log(1 - (b * r) / p) / Math.log(1 + r));
    const total = p * months;
    const interest = total - b;
    setResult({ months, years: Math.floor(months / 12), remMonths: months % 12, total: total.toFixed(2), interest: interest.toFixed(2) });
  }

  const fmt = v => parseFloat(v).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div>
      <div className="bg-slate-800/50 border border-red-500/20 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Debt Balance ($)</label>
            <input type="number" value={balance} onChange={e => setBalance(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-red-400 transition-colors" min="100" step="100" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Annual Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-red-400 transition-colors" min="0.1" max="40" step="0.1" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Monthly Payment ($)</label>
            <input type="number" value={payment} onChange={e => setPayment(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-red-400 transition-colors" min="1" step="50" />
          </div>
        </div>
        <button onClick={calculate} className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-4 rounded-xl text-lg transition-colors">Calculate Payoff Time</button>
      </div>
      {result && !result.error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Payoff Time</p>
            <p className="text-white text-3xl font-bold">{result.years}y {result.remMonths}m</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Paid</p>
            <p className="text-white text-3xl font-bold">{fmt(result.total)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Interest</p>
            <p className="text-white text-3xl font-bold">{fmt(result.interest)}</p>
          </div>
        </div>
      )}
      {result && result.error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-8 text-red-400">{result.error}</div>
      )}
      <AdUnit slot="7405024590" />
    </div>
  );
}
