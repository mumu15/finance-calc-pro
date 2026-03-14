const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join('app', 'home-affordability-calculator', 'income');
const BASE_URL = 'https://www.freefincalc.net';

const incomes = [
  '30000','35000','40000','45000','50000','55000','60000','65000','70000','75000',
  '80000','85000','90000','95000','100000','110000','120000','130000','140000','150000',
  '160000','170000','180000','190000','200000','225000','250000','275000','300000','350000',
  '400000','450000','500000','600000','700000','800000','900000','1000000','1200000','1500000',
  '2000000','2500000','3000000','4000000','5000000','6000000','7000000','8000000','9000000','10000000'
];

function formatIncome(val) {
  const n = parseInt(val);
  if (n >= 1000000) return '$' + (n/1000000).toFixed(n%1000000===0?0:1) + 'M';
  if (n >= 1000) return '$' + (n/1000).toFixed(0) + 'K';
  return '$' + n;
}

function calcAffordability(income) {
  const annual = parseInt(income);
  const maxHome = Math.round(annual * 4.5);
  const monthly = Math.round((maxHome * 0.065 / 12 * Math.pow(1.065/12+1, 360)) / (Math.pow(1.065/12+1,360)-1));
  const downPayment = Math.round(maxHome * 0.2);
  const loanAmount = maxHome - downPayment;
  return { maxHome, monthly, downPayment, loanAmount };
}

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

fs.mkdirSync(BASE_DIR, { recursive: true });

let created = 0;

incomes.forEach(income => {
  const dir = path.join(BASE_DIR, income);
  fs.mkdirSync(dir, { recursive: true });

  const label = formatIncome(income);
  const { maxHome, monthly, downPayment, loanAmount } = calcAffordability(income);
  const canonicalUrl = BASE_URL + '/home-affordability-calculator/income/' + income;

  // page.js — server component with metadata
  const pageContent =
`import HomeAffordabilityIncomeClient from './Client';

export const metadata = {
  title: 'Home Affordability Calculator for ${label} Income | FreeFinCalc',
  description: 'How much house can you afford on a ${label} salary? Calculate your maximum home price, required down payment, and estimated monthly mortgage payment.',
  alternates: { canonical: '${canonicalUrl}' },
};

export default function Page({ params }) {
  return <HomeAffordabilityIncomeClient params={params} />;
}
`;

  // Client.js — interactive component
  const clientContent =
`'use client'
import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AdUnit from '../../components/AdUnit';

const BASE_INCOME = ${income};

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function HomeAffordabilityIncomeClient({ params }) {
  const [income, setIncome] = useState(BASE_INCOME);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [downPct, setDownPct] = useState(20);
  const [dti, setDti] = useState(36);

  const maxMonthlyDebt = (income / 12) * (dti / 100);
  const r = rate / 100 / 12;
  const n = term * 12;
  const maxPayment = maxMonthlyDebt;
  const maxLoan = r > 0 ? maxPayment * (1 - Math.pow(1 + r, -n)) / r : maxPayment * n;
  const maxHome = Math.round(maxLoan / (1 - downPct / 100));
  const downPayment = Math.round(maxHome * downPct / 100);
  const monthly = Math.round(maxPayment);
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - (maxHome - downPayment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Home Affordability on <span className="text-emerald-400">${label} Income</span>
          </h1>
          <p className="text-slate-400 text-lg">See how much house you can afford based on your salary and loan terms.</p>
        </div>

        <AdUnit slot="7405024590" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Max Home Price</p>
            <p className="text-white text-3xl font-bold">{fmt(maxHome)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Monthly Payment</p>
            <p className="text-white text-3xl font-bold">{fmt(monthly)}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Down Payment</p>
            <p className="text-white text-3xl font-bold">{fmt(downPayment)}</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-6">Adjust Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Annual Income ($)</label>
              <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Interest Rate (%)</label>
              <input type="number" value={rate} step="0.1" onChange={e => setRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Loan Term (years)</label>
              <input type="number" value={term} onChange={e => setTerm(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Down Payment (%)</label>
              <input type="number" value={downPct} onChange={e => setDownPct(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-4">Affordability Summary</h2>
          <div className="space-y-3">
            {[
              ['Annual Income', fmt(income)],
              ['Maximum Home Price', fmt(maxHome)],
              ['Down Payment (' + downPct + '%)', fmt(downPayment)],
              ['Loan Amount', fmt(maxHome - downPayment)],
              ['Monthly Payment', fmt(monthly)],
              ['Total Interest Paid', fmt(totalInterest > 0 ? totalInterest : 0)],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between py-2 border-b border-slate-700/50">
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <AdUnit slot="3248634657" />

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Home Buying on ${label}/Year</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            With an annual income of ${label}, you can typically afford a home priced up to {fmt(maxHome)},
            assuming a {downPct}% down payment, a {rate}% interest rate, and a {term}-year mortgage.
            Your estimated monthly payment would be {fmt(monthly)}, which stays within the recommended
            {dti}% debt-to-income ratio. Use the fields above to adjust the numbers to your situation.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dir, 'page.js'), pageContent, 'utf8');
  fs.writeFileSync(path.join(dir, 'Client.js'), clientContent, 'utf8');
  created++;
});

console.log('✅ Created ' + created + ' home-affordability income pages');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Build home-affordability income pages with correct canonicals"');
console.log('  git push origin master');
