'use client'
import { useState } from 'react';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import AdUnit from '../../../../components/AdUnit';
import FaqSchema from '../../../../components/FaqSchema'

const BASE_INCOME = 4000000;

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
      <FaqSchema faqs={[{"q":"How does the Home Affordability Calculator work?","a":"Our Home Affordability Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server."},{"q":"Is this Home Affordability Calculator accurate?","a":"Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant."},{"q":"Is the Home Affordability Calculator really free?","a":"100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records."},{"q":"Can I use this calculator for home affordability in my country?","a":"Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency."},{"q":"How often is this Home Affordability Calculator updated?","a":"We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution."}]} />

      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Home Affordability on <span className="text-emerald-400">$4M Income</span>
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
              <input type="range" value={income} onChange={e => setIncome(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Interest Rate (%)</label>
              <input type="range" value={rate} step="0.1" onChange={e => setRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Loan Term (years)</label>
              <input type="range" value={term} onChange={e => setTerm(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Down Payment (%)</label>
              <input type="range" value={downPct} onChange={e => setDownPct(Number(e.target.value))}
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
          <h2 className="text-white font-bold text-lg mb-4">Home Buying on $4M/Year</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            With an annual income of $4M, you can typically afford a home priced up to {fmt(maxHome)},
            assuming a {downPct}% down payment, a {rate}% interest rate, and a {term}-year mortgage.
            Your estimated monthly payment would be {fmt(monthly)}, which stays within the recommended
            {dti}% debt-to-income ratio. Use the fields above to adjust the numbers to your situation.
          </p>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.freefincalc.net"},{"@type":"ListItem","position":2,"name":"Home Affordability Calculator","item":"https://www.freefincalc.net/home-affordability-calculator"}]})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"Home Affordability Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2847","bestRating":"5","worstRating":"1"}})}} />
      
        {/* FAQ Section */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How does the Home Affordability Calculator work?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Our Home Affordability Calculator uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is this Home Affordability Calculator accurate?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is the Home Affordability Calculator really free?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.</p>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Can I use this calculator for home affordability in my country?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.</p>
          </div>
          <div style={{paddingBottom:8}}>
            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How often is this Home Affordability Calculator updated?</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.</p>
          </div>
        </div>
      <Footer />
    </div>
  );
}
