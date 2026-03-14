const fs = require('fs');
const path = require('path');

const AD_SLOT = '7405024590';

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ ' + filePath);
}

// ═══════════════════════════════════════════════════════════════════════════════
// BATCH 1: PERSONAL LOAN BY PURPOSE
// app/personal-loan/purpose/[purpose]/page.js
// 4 levels deep → ../../../../components/
// ═══════════════════════════════════════════════════════════════════════════════

const loanPurposes = [
  { slug: 'debt-consolidation', label: 'Debt Consolidation', avg: 15000, desc: 'Combine multiple high-interest debts into one lower monthly payment and save on interest.' },
  { slug: 'home-improvement', label: 'Home Improvement', avg: 12000, desc: 'Fund renovations, repairs or upgrades to increase your home value.' },
  { slug: 'medical-expenses', label: 'Medical Expenses', avg: 8000, desc: 'Cover unexpected medical bills or planned procedures without draining savings.' },
  { slug: 'car-repair', label: 'Car Repair', avg: 3000, desc: 'Pay for vehicle repairs and get back on the road without financial stress.' },
  { slug: 'wedding', label: 'Wedding', avg: 18000, desc: 'Finance your dream wedding with manageable monthly payments.' },
  { slug: 'vacation', label: 'Vacation', avg: 5000, desc: 'Fund travel and experiences and pay it off over time.' },
  { slug: 'moving-expenses', label: 'Moving Expenses', avg: 4000, desc: 'Cover relocation costs when moving to a new home or city.' },
  { slug: 'business-startup', label: 'Business Startup', avg: 20000, desc: 'Get seed funding to launch your small business idea.' },
  { slug: 'education', label: 'Education', avg: 10000, desc: 'Pay for courses, certifications or continuing education programs.' },
  { slug: 'emergency-fund', label: 'Emergency Fund', avg: 5000, desc: 'Bridge unexpected financial gaps quickly when savings fall short.' },
  { slug: 'furniture', label: 'Furniture', avg: 4000, desc: 'Furnish your home with quality pieces without paying everything upfront.' },
  { slug: 'appliances', label: 'Appliances', avg: 3000, desc: 'Replace or upgrade essential home appliances.' },
  { slug: 'electronics', label: 'Electronics', avg: 2000, desc: 'Purchase computers, phones or other tech with easy payments.' },
  { slug: 'dental', label: 'Dental Work', avg: 5000, desc: 'Pay for dental procedures not fully covered by insurance.' },
  { slug: 'vet-bills', label: 'Vet Bills', avg: 3000, desc: 'Cover emergency or ongoing veterinary costs for your pet.' },
  { slug: 'taxes', label: 'Tax Bill', avg: 6000, desc: 'Pay an unexpected tax bill and avoid IRS penalties.' },
  { slug: 'rent-deposit', label: 'Rent Deposit', avg: 4000, desc: 'Cover first month, last month and security deposit on a new rental.' },
  { slug: 'baby-expenses', label: 'Baby Expenses', avg: 5000, desc: 'Prepare financially for a new baby with essential purchases.' },
  { slug: 'adoption', label: 'Adoption', avg: 25000, desc: 'Finance adoption fees and related legal and agency costs.' },
  { slug: 'fertility-treatment', label: 'Fertility Treatment', avg: 20000, desc: 'Fund IVF or other fertility treatments not covered by insurance.' },
  { slug: 'solar-panels', label: 'Solar Panels', avg: 15000, desc: 'Finance a solar installation and reduce your monthly energy bills.' },
  { slug: 'roof-repair', label: 'Roof Repair', avg: 10000, desc: 'Replace or repair your roof before minor issues become major problems.' },
  { slug: 'hvac', label: 'HVAC System', avg: 8000, desc: 'Replace or upgrade your heating and cooling system.' },
  { slug: 'plumbing', label: 'Plumbing', avg: 4000, desc: 'Fix pipes, water heaters or major plumbing issues quickly.' },
  { slug: 'kitchen-remodel', label: 'Kitchen Remodel', avg: 25000, desc: 'Transform your kitchen with new cabinets, counters and appliances.' },
  { slug: 'bathroom-remodel', label: 'Bathroom Remodel', avg: 12000, desc: 'Upgrade bathroom fixtures and finishes for comfort and value.' },
  { slug: 'basement-finishing', label: 'Basement Finishing', avg: 18000, desc: 'Convert your unfinished basement into usable living space.' },
  { slug: 'garage', label: 'Garage', avg: 15000, desc: 'Build a new garage or upgrade your existing one.' },
  { slug: 'pool', label: 'Swimming Pool', avg: 35000, desc: 'Install an in-ground or above-ground pool for your backyard.' },
  { slug: 'landscaping', label: 'Landscaping', avg: 8000, desc: 'Improve curb appeal and outdoor living with professional landscaping.' },
  { slug: 'fence', label: 'Fence', avg: 5000, desc: 'Install a new fence for privacy, security or pet containment.' },
  { slug: 'flooring', label: 'Flooring', avg: 7000, desc: 'Replace carpet, install hardwood or upgrade tile throughout your home.' },
  { slug: 'windows', label: 'Windows', avg: 8000, desc: 'Replace old windows for better energy efficiency and comfort.' },
  { slug: 'doors', label: 'Doors', avg: 3000, desc: 'Upgrade exterior or interior doors for security and style.' },
  { slug: 'siding', label: 'Siding', avg: 12000, desc: 'Replace or repair home siding for protection and curb appeal.' },
  { slug: 'driveway', label: 'Driveway', avg: 5000, desc: 'Pave, repave or repair your driveway.' },
  { slug: 'rv', label: 'RV Purchase', avg: 30000, desc: 'Finance a recreational vehicle for road trips and travel.' },
  { slug: 'boat', label: 'Boat', avg: 25000, desc: 'Finance a personal watercraft or fishing boat.' },
  { slug: 'motorcycle', label: 'Motorcycle', avg: 10000, desc: 'Finance a motorcycle or scooter for commuting or recreation.' },
  { slug: 'atv', label: 'ATV', avg: 8000, desc: 'Finance an all-terrain vehicle for off-road adventures.' },
  { slug: 'musical-instrument', label: 'Musical Instrument', avg: 3000, desc: 'Purchase a piano, guitar or professional instrument.' },
  { slug: 'art', label: 'Art Purchase', avg: 5000, desc: 'Finance art for investment or personal enjoyment.' },
  { slug: 'photography', label: 'Photography Equipment', avg: 4000, desc: 'Invest in professional camera gear and lighting.' },
  { slug: 'gym-equipment', label: 'Gym Equipment', avg: 5000, desc: 'Build a complete home gym with quality equipment.' },
  { slug: 'clothing', label: 'Clothing', avg: 2000, desc: 'Build a professional wardrobe or purchase special occasion outfits.' },
  { slug: 'jewelry', label: 'Jewelry', avg: 5000, desc: 'Finance fine jewelry for a special occasion or investment.' },
  { slug: 'engagement-ring', label: 'Engagement Ring', avg: 6000, desc: 'Finance the perfect engagement ring for the one you love.' },
  { slug: 'divorce', label: 'Divorce Costs', avg: 15000, desc: 'Cover legal fees and transition expenses during divorce proceedings.' },
  { slug: 'legal-fees', label: 'Legal Fees', avg: 10000, desc: 'Finance attorney fees for legal matters and representation.' },
  { slug: 'burial-funeral', label: 'Funeral Expenses', avg: 9000, desc: 'Cover burial and funeral costs for a loved one during a difficult time.' },
];

function buildPersonalLoanPage(p) {
  const slugsArray = JSON.stringify(loanPurposes.map(x => ({ purpose: x.slug })));

  const client = `'use client';
import { useState } from 'react';
import AdUnit from '../../../../components/AdUnit';

export default function Client() {
  const [amount, setAmount] = useState(${p.avg});
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
            <p className="text-white text-3xl font-bold">${'{'}fmt(result.monthly){'}'}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Repaid</p>
            <p className="text-white text-3xl font-bold">${'{'}fmt(result.total){'}'}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Interest</p>
            <p className="text-white text-3xl font-bold">${'{'}fmt(result.interest){'}'}</p>
          </div>
        </div>
      )}
      <AdUnit slot="${AD_SLOT}" />
    </div>
  );
}
`;

  const page = `import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';

export async function generateStaticParams() {
  return ${slugsArray};
}

export async function generateMetadata() {
  return {
    title: 'Personal Loan for ${p.label} | FreeFinCalc.net',
    description: '${p.desc} Use our free calculator to estimate monthly payments.',
    alternates: { canonical: 'https://www.freefincalc.net/personal-loan/purpose/${p.slug}' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/personal-loan-calculator" className="hover:text-amber-400 transition-colors">Personal Loan</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">${p.label}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Personal Loan for ${p.label}</h1>
          <p className="text-slate-400 text-lg mb-10">${p.desc}</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

  writeFile(path.join('app', 'personal-loan', 'purpose', p.slug, 'Client.js'), client);
  writeFile(path.join('app', 'personal-loan', 'purpose', p.slug, 'page.js'), page);
}

loanPurposes.forEach(buildPersonalLoanPage);
console.log('Batch 1 done: ' + loanPurposes.length + ' personal loan purpose pages');

// ═══════════════════════════════════════════════════════════════════════════════
// BATCH 2: STUDENT LOAN BY MAJOR
// app/student-loan/major/[major]/page.js
// ═══════════════════════════════════════════════════════════════════════════════

const studentMajors = [
  { slug: 'computer-science', label: 'Computer Science', avgDebt: 35000, avgSalary: 110000 },
  { slug: 'nursing', label: 'Nursing', avgDebt: 40000, avgSalary: 77000 },
  { slug: 'business-administration', label: 'Business Administration', avgDebt: 35000, avgSalary: 65000 },
  { slug: 'psychology', label: 'Psychology', avgDebt: 30000, avgSalary: 50000 },
  { slug: 'mechanical-engineering', label: 'Mechanical Engineering', avgDebt: 32000, avgSalary: 95000 },
  { slug: 'biology', label: 'Biology', avgDebt: 30000, avgSalary: 55000 },
  { slug: 'accounting', label: 'Accounting', avgDebt: 28000, avgSalary: 70000 },
  { slug: 'education', label: 'Education', avgDebt: 25000, avgSalary: 45000 },
  { slug: 'communications', label: 'Communications', avgDebt: 28000, avgSalary: 52000 },
  { slug: 'criminal-justice', label: 'Criminal Justice', avgDebt: 27000, avgSalary: 48000 },
  { slug: 'marketing', label: 'Marketing', avgDebt: 30000, avgSalary: 65000 },
  { slug: 'finance', label: 'Finance', avgDebt: 32000, avgSalary: 75000 },
  { slug: 'electrical-engineering', label: 'Electrical Engineering', avgDebt: 32000, avgSalary: 98000 },
  { slug: 'civil-engineering', label: 'Civil Engineering', avgDebt: 32000, avgSalary: 88000 },
  { slug: 'pre-med', label: 'Pre-Med', avgDebt: 45000, avgSalary: 60000 },
  { slug: 'political-science', label: 'Political Science', avgDebt: 30000, avgSalary: 55000 },
  { slug: 'sociology', label: 'Sociology', avgDebt: 27000, avgSalary: 48000 },
  { slug: 'history', label: 'History', avgDebt: 27000, avgSalary: 47000 },
  { slug: 'english', label: 'English', avgDebt: 27000, avgSalary: 50000 },
  { slug: 'art', label: 'Art', avgDebt: 28000, avgSalary: 44000 },
  { slug: 'music', label: 'Music', avgDebt: 28000, avgSalary: 46000 },
  { slug: 'film', label: 'Film', avgDebt: 35000, avgSalary: 52000 },
  { slug: 'architecture', label: 'Architecture', avgDebt: 40000, avgSalary: 80000 },
  { slug: 'pharmacy', label: 'Pharmacy', avgDebt: 120000, avgSalary: 125000 },
  { slug: 'law', label: 'Law', avgDebt: 130000, avgSalary: 115000 },
  { slug: 'social-work', label: 'Social Work', avgDebt: 30000, avgSalary: 48000 },
  { slug: 'public-health', label: 'Public Health', avgDebt: 45000, avgSalary: 60000 },
  { slug: 'economics', label: 'Economics', avgDebt: 30000, avgSalary: 78000 },
  { slug: 'mathematics', label: 'Mathematics', avgDebt: 28000, avgSalary: 82000 },
  { slug: 'statistics', label: 'Statistics', avgDebt: 28000, avgSalary: 88000 },
  { slug: 'data-science', label: 'Data Science', avgDebt: 32000, avgSalary: 105000 },
  { slug: 'information-technology', label: 'Information Technology', avgDebt: 30000, avgSalary: 85000 },
  { slug: 'cybersecurity', label: 'Cybersecurity', avgDebt: 30000, avgSalary: 95000 },
  { slug: 'graphic-design', label: 'Graphic Design', avgDebt: 28000, avgSalary: 55000 },
  { slug: 'interior-design', label: 'Interior Design', avgDebt: 28000, avgSalary: 55000 },
  { slug: 'fashion-design', label: 'Fashion Design', avgDebt: 30000, avgSalary: 50000 },
  { slug: 'hospitality', label: 'Hospitality', avgDebt: 25000, avgSalary: 52000 },
  { slug: 'culinary-arts', label: 'Culinary Arts', avgDebt: 22000, avgSalary: 48000 },
  { slug: 'environmental-science', label: 'Environmental Science', avgDebt: 28000, avgSalary: 58000 },
  { slug: 'chemistry', label: 'Chemistry', avgDebt: 28000, avgSalary: 72000 },
  { slug: 'physics', label: 'Physics', avgDebt: 28000, avgSalary: 80000 },
  { slug: 'philosophy', label: 'Philosophy', avgDebt: 27000, avgSalary: 50000 },
  { slug: 'theology', label: 'Theology', avgDebt: 25000, avgSalary: 44000 },
  { slug: 'anthropology', label: 'Anthropology', avgDebt: 27000, avgSalary: 48000 },
  { slug: 'linguistics', label: 'Linguistics', avgDebt: 27000, avgSalary: 52000 },
  { slug: 'journalism', label: 'Journalism', avgDebt: 28000, avgSalary: 52000 },
  { slug: 'public-relations', label: 'Public Relations', avgDebt: 28000, avgSalary: 58000 },
  { slug: 'human-resources', label: 'Human Resources', avgDebt: 28000, avgSalary: 62000 },
  { slug: 'supply-chain', label: 'Supply Chain', avgDebt: 28000, avgSalary: 72000 },
  { slug: 'real-estate', label: 'Real Estate', avgDebt: 28000, avgSalary: 68000 },
];

function buildStudentLoanPage(m) {
  const slugsArray = JSON.stringify(studentMajors.map(x => ({ major: x.slug })));
  const dti = ((m.avgDebt / (m.avgSalary / 12)) * 100).toFixed(0);

  const client = `'use client';
import { useState } from 'react';
import AdUnit from '../../../../components/AdUnit';

export default function Client() {
  const [amount, setAmount] = useState(${m.avgDebt});
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(120);
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
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Loan Amount ($)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-blue-400 transition-colors" min="1000" max="300000" step="1000" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-blue-400 transition-colors" min="1" max="20" step="0.1" />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Repayment Term (months)</label>
            <input type="number" value={term} onChange={e => setTerm(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:border-blue-400 transition-colors" min="12" max="300" step="12" />
          </div>
        </div>
        <button onClick={calculate} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl text-lg transition-colors">Calculate Monthly Payment</button>
      </div>
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-6 text-center">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Monthly Payment</p>
            <p className="text-white text-3xl font-bold">${'{'}fmt(result.monthly){'}'}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Repaid</p>
            <p className="text-white text-3xl font-bold">${'{'}fmt(result.total){'}'}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Interest</p>
            <p className="text-white text-3xl font-bold">${'{'}fmt(result.interest){'}'}</p>
          </div>
        </div>
      )}
      <AdUnit slot="${AD_SLOT}" />
    </div>
  );
}
`;

  const page = `import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';

export async function generateStaticParams() {
  return ${slugsArray};
}

export async function generateMetadata() {
  return {
    title: 'Student Loan Calculator for ${m.label} Majors | FreeFinCalc.net',
    description: 'Average student loan debt for ${m.label} majors is $${m.avgDebt.toLocaleString()}. Calculate your monthly payments and total repayment cost.',
    alternates: { canonical: 'https://www.freefincalc.net/student-loan/major/${m.slug}' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/student-loan-calculator" className="hover:text-blue-400 transition-colors">Student Loan</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">${m.label}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Student Loan Calculator for ${m.label}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl p-5 text-center">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Avg Debt</p>
              <p className="text-white text-2xl font-bold">$${m.avgDebt.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Avg Starting Salary</p>
              <p className="text-white text-2xl font-bold">$${m.avgSalary.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Debt-to-Income</p>
              <p className="text-white text-2xl font-bold">${dti}%</p>
            </div>
          </div>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

  writeFile(path.join('app', 'student-loan', 'major', m.slug, 'Client.js'), client);
  writeFile(path.join('app', 'student-loan', 'major', m.slug, 'page.js'), page);
}

studentMajors.forEach(buildStudentLoanPage);
console.log('Batch 2 done: ' + studentMajors.length + ' student loan major pages');

// ═══════════════════════════════════════════════════════════════════════════════
// BATCH 3: INVESTMENT RETURN by ASSET — rebuild dynamic sub-pages
// app/investment-return-calculator/asset/[asset]/page.js
// ═══════════════════════════════════════════════════════════════════════════════

const investmentAssets = [
  { slug: 'sp500', label: 'S&P 500', avgReturn: 10.5 },
  { slug: 'nasdaq', label: 'NASDAQ', avgReturn: 13.0 },
  { slug: 'dow-jones', label: 'Dow Jones', avgReturn: 9.5 },
  { slug: 'real-estate', label: 'Real Estate', avgReturn: 8.0 },
  { slug: 'gold', label: 'Gold', avgReturn: 6.0 },
  { slug: 'silver', label: 'Silver', avgReturn: 5.5 },
  { slug: 'bitcoin', label: 'Bitcoin', avgReturn: 30.0 },
  { slug: 'ethereum', label: 'Ethereum', avgReturn: 25.0 },
  { slug: 'bonds', label: 'Bonds', avgReturn: 4.0 },
  { slug: 'treasury-bonds', label: 'Treasury Bonds', avgReturn: 3.5 },
  { slug: 'municipal-bonds', label: 'Municipal Bonds', avgReturn: 3.0 },
  { slug: 'corporate-bonds', label: 'Corporate Bonds', avgReturn: 5.0 },
  { slug: 'index-funds', label: 'Index Funds', avgReturn: 10.0 },
  { slug: 'etfs', label: 'ETFs', avgReturn: 10.0 },
  { slug: 'mutual-funds', label: 'Mutual Funds', avgReturn: 8.5 },
  { slug: 'dividend-stocks', label: 'Dividend Stocks', avgReturn: 9.0 },
  { slug: 'growth-stocks', label: 'Growth Stocks', avgReturn: 14.0 },
  { slug: 'value-stocks', label: 'Value Stocks', avgReturn: 9.5 },
  { slug: 'small-cap-stocks', label: 'Small Cap Stocks', avgReturn: 12.0 },
  { slug: 'large-cap-stocks', label: 'Large Cap Stocks', avgReturn: 10.0 },
  { slug: 'international-stocks', label: 'International Stocks', avgReturn: 7.5 },
  { slug: 'emerging-markets', label: 'Emerging Markets', avgReturn: 8.0 },
  { slug: 'reits', label: 'REITs', avgReturn: 9.0 },
  { slug: 'commodities', label: 'Commodities', avgReturn: 5.0 },
  { slug: 'oil', label: 'Oil', avgReturn: 6.0 },
  { slug: 'natural-gas', label: 'Natural Gas', avgReturn: 4.5 },
  { slug: 'agricultural-commodities', label: 'Agricultural Commodities', avgReturn: 4.0 },
  { slug: 'forex', label: 'Forex', avgReturn: 5.0 },
  { slug: 'options', label: 'Options', avgReturn: 15.0 },
  { slug: 'futures', label: 'Futures', avgReturn: 8.0 },
  { slug: 'peer-to-peer-lending', label: 'Peer-to-Peer Lending', avgReturn: 7.0 },
  { slug: 'crowdfunding', label: 'Crowdfunding', avgReturn: 8.0 },
  { slug: 'angel-investing', label: 'Angel Investing', avgReturn: 20.0 },
  { slug: 'venture-capital', label: 'Venture Capital', avgReturn: 18.0 },
  { slug: 'private-equity', label: 'Private Equity', avgReturn: 14.0 },
  { slug: 'hedge-funds', label: 'Hedge Funds', avgReturn: 8.0 },
  { slug: 'annuities', label: 'Annuities', avgReturn: 4.5 },
  { slug: 'life-insurance-investment', label: 'Life Insurance Investment', avgReturn: 4.0 },
  { slug: '529-plan', label: '529 Plan', avgReturn: 7.0 },
  { slug: 'hsa', label: 'HSA', avgReturn: 7.5 },
  { slug: 'roth-ira', label: 'Roth IRA', avgReturn: 10.0 },
  { slug: 'traditional-ira', label: 'Traditional IRA', avgReturn: 10.0 },
  { slug: '401k', label: '401(k)', avgReturn: 9.5 },
  { slug: 'solo-401k', label: 'Solo 401(k)', avgReturn: 9.5 },
  { slug: 'sep-ira', label: 'SEP IRA', avgReturn: 9.5 },
  { slug: 'simple-ira', label: 'SIMPLE IRA', avgReturn: 9.0 },
  { slug: 'defined-benefit-plan', label: 'Defined Benefit Plan', avgReturn: 7.0 },
  { slug: 'esop', label: 'ESOP', avgReturn: 8.5 },
  { slug: 'stock-options', label: 'Stock Options', avgReturn: 12.0 },
  { slug: 'rsus', label: 'RSUs', avgReturn: 10.0 },
];

function buildInvestmentAssetPage(a) {
  const slugsArray = JSON.stringify(investmentAssets.map(x => ({ asset: x.slug })));
  const labelSafe = a.label.replace(/&/g, 'and');

  const client = `'use client';
import { useState } from 'react';
import AdUnit from '../../../../components/AdUnit';

export default function Client() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(${a.avgReturn});
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
      <AdUnit slot="${AD_SLOT}" />
    </div>
  );
}
`;

  const page = `import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';

export async function generateStaticParams() {
  return ${slugsArray};
}

export async function generateMetadata() {
  return {
    title: '${labelSafe} Return Calculator | FreeFinCalc.net',
    description: 'Calculate your ${labelSafe} investment return. Historical average return is ${a.avgReturn}% per year. See how your money grows over time.',
    alternates: { canonical: 'https://www.freefincalc.net/investment-return-calculator/asset/${a.slug}' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/investment-calculator" className="hover:text-emerald-400 transition-colors">Investment Calculator</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">${labelSafe}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">${labelSafe} Return Calculator</h1>
          <p className="text-slate-400 text-lg mb-10">The historical average annual return for ${labelSafe} is approximately ${a.avgReturn}%. Use the calculator below to see how your investment grows over time.</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

  writeFile(path.join('app', 'investment-return-calculator', 'asset', a.slug, 'Client.js'), client);
  writeFile(path.join('app', 'investment-return-calculator', 'asset', a.slug, 'page.js'), page);
}

investmentAssets.forEach(buildInvestmentAssetPage);
console.log('Batch 3 done: ' + investmentAssets.length + ' investment asset pages');

// ═══════════════════════════════════════════════════════════════════════════════
// BATCH 4: DEBT PAYOFF by AMOUNT
// app/debt-payoff-calculator/amount/[amount]/page.js
// ═══════════════════════════════════════════════════════════════════════════════

const debtAmounts = [
  1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,
  12000,15000,18000,20000,25000,30000,35000,40000,45000,50000,
  60000,70000,80000,90000,100000,120000,150000,175000,200000,250000,
  300000,350000,400000,500000,600000,700000,800000,900000,1000000,
  1200000,1500000,1750000,2000000,2500000,3000000,4000000,5000000,
  6000000,7000000,8000000,
];

function buildDebtPayoffPage(amt) {
  const slugsArray = JSON.stringify(debtAmounts.map(x => ({ amount: String(x) })));
  const fmtAmt = amt.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const monthlyMin = Math.round(amt * 0.02);

  const client = `'use client';
import { useState } from 'react';
import AdUnit from '../../../../components/AdUnit';

export default function Client() {
  const [balance, setBalance] = useState(${amt});
  const [rate, setRate] = useState(18.9);
  const [payment, setPayment] = useState(${monthlyMin});
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
      <AdUnit slot="${AD_SLOT}" />
    </div>
  );
}
`;

  const page = `import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Client from './Client';

export async function generateStaticParams() {
  return ${slugsArray};
}

export async function generateMetadata() {
  return {
    title: 'How Long to Pay Off ${fmtAmt} in Debt? | FreeFinCalc.net',
    description: 'Find out how long it takes to pay off ${fmtAmt} in debt. Calculate monthly payments, total interest and payoff date with our free debt payoff calculator.',
    alternates: { canonical: 'https://www.freefincalc.net/debt-payoff-calculator/amount/${amt}' },
  };
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-slate-500 mb-6">
            <a href="/" className="hover:text-red-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/debt-payoff-calculator" className="hover:text-red-400 transition-colors">Debt Payoff</a>
            <span className="mx-2">/</span>
            <span className="text-slate-300">${fmtAmt}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How Long to Pay Off ${fmtAmt} in Debt?</h1>
          <p className="text-slate-400 text-lg mb-10">Use the calculator below to find out exactly how long it will take to pay off ${fmtAmt} in debt and how much interest you will pay in total.</p>
          <Client />
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

  writeFile(path.join('app', 'debt-payoff-calculator', 'amount', String(amt), 'Client.js'), client);
  writeFile(path.join('app', 'debt-payoff-calculator', 'amount', String(amt), 'page.js'), page);
}

debtAmounts.forEach(buildDebtPayoffPage);
console.log('Batch 4 done: ' + debtAmounts.length + ' debt payoff amount pages');

// ─── SUMMARY ──────────────────────────────────────────────────────────────────
const total = loanPurposes.length + studentMajors.length + investmentAssets.length + debtAmounts.length;
console.log('\n🎉 ALL DONE! ' + total + ' pages built across 4 batches');
console.log('\nBatch summary:');
console.log('  personal-loan/purpose/  →  ' + loanPurposes.length + ' pages');
console.log('  student-loan/major/     →  ' + studentMajors.length + ' pages');
console.log('  investment-return/asset →  ' + investmentAssets.length + ' pages');
console.log('  debt-payoff/amount/     →  ' + debtAmounts.length + ' pages');
console.log('\nNext:');
console.log('  git add .');
console.log('  git commit -m "Fix 404s: rebuild missing programmatic pages"');
console.log('  git push origin master');
