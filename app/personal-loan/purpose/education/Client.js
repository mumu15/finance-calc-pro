'use client';
import { useState } from 'react';
import AdUnit from '../../../../components/AdUnit';

export default function Client() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(11.5);
  const [term, setTerm] = useState(36);
  const [result, setResult] = useState(null);

  function calculate() {
    const pri = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(term);
    if (!pri || !r || !n) return;
    const monthly = (pri * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    setResult({ monthly: monthly.toFixed(2), total: total.toFixed(2), interest: (total - pri).toFixed(2) });
  }

  const fmt = v => parseFloat(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="bg-slate-800/50 border border-amber-500/20 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Loan Amount ($)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-amber-400 transition-colors" min="500" max="100000" step="500" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-amber-400 transition-colors" min="1" max="36" step="0.1" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Loan Term (months)</label>
            <input type="number" value={term} onChange={e => setTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-amber-400 transition-colors" min="12" max="84" step="12" />
          </div>
        </div>
        <button onClick={calculate} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-xl text-lg transition-colors">Calculate Monthly Payment</button>
      </div>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-amber-500/30 rounded-2xl p-6 text-center">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">Monthly Payment</p>
            <p className="text-white text-3xl font-bold">{fmt(result.monthly)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Repaid</p>
            <p className="text-white text-3xl font-bold">{fmt(result.total)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Interest</p>
            <p className="text-white text-3xl font-bold">{fmt(result.interest)}</p>
          </div>
        </div>
      )}
      <AdUnit slot="7405024590" />
    
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://freefincalc.net"},{"@type":"ListItem","position":2,"name":"Personal Loan Calculator","item":"https://freefincalc.net/personal-loan"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Personal Loan Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
    </div>
  );
}
