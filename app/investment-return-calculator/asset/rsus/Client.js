'use client';
import { useState } from 'react';
import AdUnit from '../../../../../components/AdUnit';

export default function Client() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState(null);

  function calculate() {
    const p = parseFloat(principal) || 0;
    const m = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(years) * 12;
    if (!r || !n) return;
    const lumpSum = p * Math.pow(1 + r, n);
    const monthlyGrowth = m * ((Math.pow(1 + r, n) - 1) / r);
    const total = lumpSum + monthlyGrowth;
    const contributed = p + m * n;
    setResult({ total: total.toFixed(2), contributed: contributed.toFixed(2), gains: (total - contributed).toFixed(2) });
  }

  const fmt = v => parseFloat(v).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div>
      <div className="bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Initial Investment ($)</label>
            <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-emerald-400 transition-colors" min="0" step="1000" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Monthly Contribution ($)</label>
            <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-emerald-400 transition-colors" min="0" step="100" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Annual Return (%)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-emerald-400 transition-colors" min="0.1" max="50" step="0.5" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Time Period (years)</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-emerald-400 transition-colors" min="1" max="50" step="1" />
          </div>
        </div>
        <button onClick={calculate} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl text-lg transition-colors">Calculate Investment Return</button>
      </div>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Future Value</p>
            <p className="text-white text-3xl font-bold">{fmt(result.total)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Contributed</p>
            <p className="text-white text-3xl font-bold">{fmt(result.contributed)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Investment Gains</p>
            <p className="text-white text-3xl font-bold">{fmt(result.gains)}</p>
          </div>
        </div>
      )}
      <AdUnit slot="7405024590" />
    </div>
  );
}
