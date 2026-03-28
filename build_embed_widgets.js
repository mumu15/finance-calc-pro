const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://www.freefincalc.net';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

console.log('');
console.log('=====================================================');
console.log('  BUILD: Embeddable Calculator Widgets');
console.log('  Each embed = automatic backlink to your site');
console.log('  NEW FILES ONLY — nothing existing is modified');
console.log('=====================================================');
console.log('');

const WIDGETS = [
  {
    slug: 'mortgage',
    title: 'Free Mortgage Calculator Widget',
    calcName: 'Mortgage Calculator',
    fullPage: '/mortgage-calculator',
    fields: [
      { id: 'price', label: 'Home Price', default: 350000, type: 'dollar' },
      { id: 'down', label: 'Down Payment (%)', default: 20, type: 'percent' },
      { id: 'rate', label: 'Interest Rate (%)', default: 6.5, type: 'rate' },
      { id: 'term', label: 'Loan Term (years)', default: 30, type: 'number' },
    ],
    calcLogic: `const loan = price * (1 - down / 100);
      const r = rate / 100 / 12;
      const n = term * 12;
      const payment = r > 0 ? loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loan / n;
      const totalPaid = payment * n;
      const totalInterest = totalPaid - loan;
      return { payment: Math.round(payment), totalPaid: Math.round(totalPaid), totalInterest: Math.round(totalInterest), loan: Math.round(loan) };`,
    results: [
      { key: 'payment', label: 'Monthly Payment', format: 'dollar' },
      { key: 'loan', label: 'Loan Amount', format: 'dollar' },
      { key: 'totalInterest', label: 'Total Interest', format: 'dollar' },
      { key: 'totalPaid', label: 'Total Cost', format: 'dollar' },
    ],
  },
  {
    slug: 'compound-interest',
    title: 'Free Compound Interest Calculator Widget',
    calcName: 'Compound Interest Calculator',
    fullPage: '/compound-interest-calculator',
    fields: [
      { id: 'principal', label: 'Initial Investment', default: 10000, type: 'dollar' },
      { id: 'monthly', label: 'Monthly Contribution', default: 500, type: 'dollar' },
      { id: 'rate', label: 'Annual Return (%)', default: 8, type: 'rate' },
      { id: 'years', label: 'Years', default: 20, type: 'number' },
    ],
    calcLogic: `const r = rate / 100 / 12;
      const n = years * 12;
      const futureP = principal * Math.pow(1 + r, n);
      const futureM = monthly * ((Math.pow(1 + r, n) - 1) / r);
      const total = Math.round(futureP + futureM);
      const contributed = Math.round(principal + monthly * n);
      const interest = total - contributed;
      return { total, contributed, interest, monthly: Math.round((futureP + futureM) / n) };`,
    results: [
      { key: 'total', label: 'Future Value', format: 'dollar' },
      { key: 'contributed', label: 'Total Contributed', format: 'dollar' },
      { key: 'interest', label: 'Interest Earned', format: 'dollar' },
    ],
  },
  {
    slug: 'loan-payoff',
    title: 'Free Loan Payoff Calculator Widget',
    calcName: 'Loan Payoff Calculator',
    fullPage: '/loan-payment-calculator',
    fields: [
      { id: 'balance', label: 'Loan Balance', default: 25000, type: 'dollar' },
      { id: 'rate', label: 'Interest Rate (%)', default: 6.5, type: 'rate' },
      { id: 'payment', label: 'Monthly Payment', default: 500, type: 'dollar' },
    ],
    calcLogic: `const r = rate / 100 / 12;
      if (payment <= balance * r) return { months: 0, totalPaid: 0, totalInterest: 0, payoffDate: 'Payment too low' };
      const months = Math.ceil(Math.log(payment / (payment - balance * r)) / Math.log(1 + r));
      const totalPaid = Math.round(payment * months);
      const totalInterest = totalPaid - balance;
      const d = new Date(); d.setMonth(d.getMonth() + months);
      const payoffDate = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return { months, totalPaid, totalInterest: Math.round(totalInterest), payoffDate };`,
    results: [
      { key: 'months', label: 'Months to Pay Off', format: 'number' },
      { key: 'payoffDate', label: 'Payoff Date', format: 'text' },
      { key: 'totalInterest', label: 'Total Interest', format: 'dollar' },
      { key: 'totalPaid', label: 'Total Paid', format: 'dollar' },
    ],
  },
  {
    slug: 'retirement',
    title: 'Free Retirement Calculator Widget',
    calcName: 'Retirement Calculator',
    fullPage: '/retirement-calculator',
    fields: [
      { id: 'age', label: 'Current Age', default: 30, type: 'number' },
      { id: 'retireAge', label: 'Retire At', default: 65, type: 'number' },
      { id: 'saved', label: 'Current Savings', default: 50000, type: 'dollar' },
      { id: 'monthly', label: 'Monthly Savings', default: 1000, type: 'dollar' },
      { id: 'rate', label: 'Annual Return (%)', default: 8, type: 'rate' },
    ],
    calcLogic: `const years = retireAge - age;
      if (years <= 0) return { total: saved, contributed: saved, interest: 0, monthlyIncome: Math.round(saved / 300) };
      const r = rate / 100 / 12;
      const n = years * 12;
      const futureS = saved * Math.pow(1 + r, n);
      const futureM = monthly * ((Math.pow(1 + r, n) - 1) / r);
      const total = Math.round(futureS + futureM);
      const contributed = Math.round(saved + monthly * n);
      const interest = total - contributed;
      const monthlyIncome = Math.round(total * 0.04 / 12);
      return { total, contributed, interest, monthlyIncome };`,
    results: [
      { key: 'total', label: 'At Retirement', format: 'dollar' },
      { key: 'contributed', label: 'Your Contributions', format: 'dollar' },
      { key: 'interest', label: 'Investment Growth', format: 'dollar' },
      { key: 'monthlyIncome', label: 'Monthly Income (4% rule)', format: 'dollar' },
    ],
  },
  {
    slug: 'bmi',
    title: 'Free BMI Calculator Widget',
    calcName: 'BMI Calculator',
    fullPage: '/budget-planner-calculator',
    fields: [
      { id: 'weight', label: 'Weight (lbs)', default: 170, type: 'number' },
      { id: 'feet', label: 'Height (feet)', default: 5, type: 'number' },
      { id: 'inches', label: 'Height (inches)', default: 10, type: 'number' },
    ],
    calcLogic: `const totalInches = feet * 12 + inches;
      const bmi = Math.round((weight / (totalInches * totalInches)) * 703 * 10) / 10;
      const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
      const idealMin = Math.round(18.5 * totalInches * totalInches / 703);
      const idealMax = Math.round(24.9 * totalInches * totalInches / 703);
      return { bmi, category, idealRange: idealMin + ' - ' + idealMax + ' lbs' };`,
    results: [
      { key: 'bmi', label: 'Your BMI', format: 'number' },
      { key: 'category', label: 'Category', format: 'text' },
      { key: 'idealRange', label: 'Healthy Range', format: 'text' },
    ],
  },
  {
    slug: 'tip',
    title: 'Free Tip Calculator Widget',
    calcName: 'Tip Calculator',
    fullPage: '/tip-calculator',
    fields: [
      { id: 'bill', label: 'Bill Amount', default: 85, type: 'dollar' },
      { id: 'tipPct', label: 'Tip (%)', default: 18, type: 'percent' },
      { id: 'people', label: 'Split Between', default: 2, type: 'number' },
    ],
    calcLogic: `const tip = Math.round(bill * tipPct / 100 * 100) / 100;
      const total = Math.round((bill + tip) * 100) / 100;
      const perPerson = Math.round(total / people * 100) / 100;
      return { tip, total, perPerson };`,
    results: [
      { key: 'tip', label: 'Tip Amount', format: 'dollar' },
      { key: 'total', label: 'Total', format: 'dollar' },
      { key: 'perPerson', label: 'Per Person', format: 'dollar' },
    ],
  },
];

// ================================================================
// BUILD EMBED WIDGET PAGES
// ================================================================

const embedDir = path.join(APP, 'embed');
ensureDir(embedDir);

WIDGETS.forEach(w => {
  const dir = path.join(embedDir, w.slug);
  ensureDir(dir);

  const fieldStates = w.fields.map(f => `const [${f.id}, set${f.id.charAt(0).toUpperCase() + f.id.slice(1)}] = useState(${typeof f.default === 'string' ? "'" + f.default + "'" : f.default})`).join('\n  ');
  
  const fieldInputs = w.fields.map(f => {
    const setter = 'set' + f.id.charAt(0).toUpperCase() + f.id.slice(1);
    return `          <div>
            <label style={st.label}>${f.label}</label>
            <input type="number" value={${f.id}} onChange={e => ${setter}(Number(e.target.value))} style={st.input} />
          </div>`;
  }).join('\n');

  const calcArgs = w.fields.map(f => f.id).join(', ');

  const resultOutputs = w.results.map(r => {
    const valExpr = r.format === 'dollar' ? "'$' + r." + r.key + ".toLocaleString()" : 
                    r.format === 'number' ? "r." + r.key + ".toLocaleString()" :
                    "r." + r.key;
    return `          <div style={st.resultRow}>
            <span style={st.resultLabel}>${r.label}</span>
            <span style={st.resultVal}>{${valExpr}}</span>
          </div>`;
  }).join('\n');

  const lines = [];
  lines.push("'use client'");
  lines.push("import { useState, useMemo } from 'react'");
  lines.push("");
  lines.push("export default function EmbedWidget() {");
  lines.push("  " + fieldStates);
  lines.push("");
  lines.push("  const r = useMemo(() => {");
  lines.push("    try {");
  lines.push("      " + w.calcLogic.split('\n').join('\n      '));
  lines.push("    } catch(e) { return null }");
  lines.push("  }, [" + calcArgs + "])");
  lines.push("");
  lines.push("  const st = {");
  lines.push("    box: { fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', background: '#0f1117', borderRadius: 16, padding: 20, maxWidth: 400, color: '#e2e8f0' },");
  lines.push("    title: { fontSize: 16, fontWeight: 800, color: '#f1f5f9', marginBottom: 16 },");
  lines.push("    label: { display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 4, fontWeight: 600 },");
  lines.push("    input: { width: '100%', padding: '8px 12px', borderRadius: 8, background: '#1a1d28', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, marginBottom: 12, outline: 'none', fontFamily: 'inherit' },");
  lines.push("    resultRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },");
  lines.push("    resultLabel: { fontSize: 13, color: '#94a3b8' },");
  lines.push("    resultVal: { fontSize: 14, fontWeight: 700, color: '#f0c842' },");
  lines.push("    powered: { marginTop: 12, textAlign: 'center', fontSize: 11, color: '#475569' },");
  lines.push("    link: { color: '#f0c842', textDecoration: 'none', fontWeight: 700 },");
  lines.push("  }");
  lines.push("");
  lines.push("  return (");
  lines.push("    <div style={st.box}>");
  lines.push("      <div style={st.title}>" + w.calcName + "</div>");
  lines.push("      <div>");
  lines.push(fieldInputs);
  lines.push("      </div>");
  lines.push("      {r && (");
  lines.push("        <div style={{marginTop:8}}>");
  lines.push(resultOutputs);
  lines.push("        </div>");
  lines.push("      )}");
  lines.push("      <div style={st.powered}>");
  lines.push("        Powered by <a href=\"" + DOMAIN + w.fullPage + "\" target=\"_blank\" rel=\"noopener\" style={st.link}>FreeFinCalc.net</a>");
  lines.push("      </div>");
  lines.push("    </div>");
  lines.push("  )");
  lines.push("}");

  fs.writeFileSync(path.join(dir, 'page.js'), lines.join('\n'), 'utf8');
  console.log('  Created: /embed/' + w.slug);
});

// ================================================================
// BUILD EMBED HUB PAGE (with embed code generator)
// ================================================================

const hubLines = [];
hubLines.push("import Header from '../../components/Header'");
hubLines.push("import Footer from '../../components/Footer'");
hubLines.push("");
hubLines.push("export const metadata = {");
hubLines.push("  title: 'Free Embeddable Calculator Widgets | FreeFinCalc',");
hubLines.push("  description: 'Add free financial calculators to your website. Mortgage, compound interest, retirement, loan payoff, tip, and BMI widgets. One line of code. Free forever.',");
hubLines.push("  alternates: { canonical: '" + DOMAIN + "/embed' },");
hubLines.push("}");
hubLines.push("");
hubLines.push("const widgets = " + JSON.stringify(WIDGETS.map(w => ({ slug: w.slug, title: w.calcName, desc: w.title }))) + ";");
hubLines.push("");
hubLines.push("export default function EmbedHub() {");
hubLines.push("  return (");
hubLines.push("    <>");
hubLines.push("      <Header />");
hubLines.push("      <main style={{maxWidth:900,margin:'0 auto',padding:'48px 16px 64px'}}>");
hubLines.push("        <div style={{textAlign:'center',marginBottom:48}}>");
hubLines.push("          <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px'}}>Free Embeddable Widgets</h1>");
hubLines.push("          <p style={{fontSize:16,color:'#94a3b8',margin:'0 0 8px'}}>Add free financial calculators to your website</p>");
hubLines.push("          <p style={{fontSize:13,color:'#64748b'}}>One line of code. Free forever. No API key needed.</p>");
hubLines.push("        </div>");
hubLines.push("        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16}}>");
hubLines.push("          {widgets.map(w => (");
hubLines.push("            <div key={w.slug} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24}}>");
hubLines.push("              <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:8}}>{w.title}</h2>");
hubLines.push("              <p style={{fontSize:13,color:'#64748b',marginBottom:16}}>{w.desc}</p>");
hubLines.push("              <a href={'/embed/' + w.slug} target=\"_blank\" style={{display:'inline-block',padding:'8px 16px',borderRadius:8,background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',color:'#f0c842',fontSize:13,fontWeight:700,textDecoration:'none',marginBottom:12}}>Preview Widget</a>");
hubLines.push("              <div style={{marginTop:8}}>");
hubLines.push("                <p style={{fontSize:11,color:'#64748b',marginBottom:4}}>Embed code:</p>");
hubLines.push("                <code style={{display:'block',padding:12,borderRadius:8,background:'#1a1d28',border:'1px solid rgba(255,255,255,0.08)',color:'#10b981',fontSize:11,wordBreak:'break-all',lineHeight:1.6}}>{'<iframe src=\"" + DOMAIN + "/embed/' + w.slug + '\" width=\"400\" height=\"500\" frameborder=\"0\" style=\"border-radius:16px\"></iframe>'}</code>");
hubLines.push("              </div>");
hubLines.push("            </div>");
hubLines.push("          ))}");
hubLines.push("        </div>");
hubLines.push("        <div style={{marginTop:48,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:32}}>");
hubLines.push("          <h2 style={{fontSize:22,fontWeight:800,color:'#f1f5f9',marginBottom:12}}>Why Embed Our Widgets?</h2>");
hubLines.push("          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:16}}>");
hubLines.push("            <div><div style={{fontSize:14,fontWeight:700,color:'#f0c842',marginBottom:4}}>100% Free</div><div style={{fontSize:13,color:'#94a3b8'}}>No API key, no account, no costs. Ever.</div></div>");
hubLines.push("            <div><div style={{fontSize:14,fontWeight:700,color:'#10b981',marginBottom:4}}>Responsive</div><div style={{fontSize:13,color:'#94a3b8'}}>Works on mobile, tablet, and desktop.</div></div>");
hubLines.push("            <div><div style={{fontSize:14,fontWeight:700,color:'#3b82f6',marginBottom:4}}>Fast</div><div style={{fontSize:13,color:'#94a3b8'}}>Loads instantly. No external scripts.</div></div>");
hubLines.push("            <div><div style={{fontSize:14,fontWeight:700,color:'#8b5cf6',marginBottom:4}}>Dark Theme</div><div style={{fontSize:13,color:'#94a3b8'}}>Sleek dark design that fits any site.</div></div>");
hubLines.push("          </div>");
hubLines.push("        </div>");
hubLines.push("      </main>");
hubLines.push("      <Footer />");
hubLines.push("    </>");
hubLines.push("  )");
hubLines.push("}");

fs.writeFileSync(path.join(embedDir, 'page.js'), hubLines.join('\n'), 'utf8');
console.log('  Created: /embed (hub with embed codes)');

// ================================================================
// UPDATE SITEMAP — add embed pages
// ================================================================

console.log('');
console.log('Updating sitemap...');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');
const lb = sm.lastIndexOf(']');
let ne = '';
if (!sm.includes('/embed"')) ne += '    { url: "' + DOMAIN + '/embed", lastModified: today, changeFrequency: "monthly", priority: 0.8 },\n';
WIDGETS.forEach(w => {
  if (!sm.includes('/embed/' + w.slug)) ne += '    { url: "' + DOMAIN + '/embed/' + w.slug + '", lastModified: today, changeFrequency: "monthly", priority: 0.7 },\n';
});
if (ne) {
  const before = sm.substring(0, lb).trim();
  const comma = !before.endsWith(',') ? ',\n' : '\n';
  sm = sm.slice(0, lb) + comma + ne + sm.slice(lb);
  fs.writeFileSync(smFile, sm, 'utf8');
  console.log('  Added ' + (WIDGETS.length + 1) + ' URLs to sitemap');
}

console.log('');
console.log('=====================================================');
console.log('  CREATED: ' + WIDGETS.length + ' Embeddable Widgets + Hub Page');
console.log('');
WIDGETS.forEach(w => console.log('  /embed/' + w.slug + ' — ' + w.calcName));
console.log('');
console.log('  Hub: /embed (embed codes for all widgets)');
console.log('');
console.log('  How it generates backlinks:');
console.log('  1. Blogger finds /embed page via Google');
console.log('  2. Copies iframe code to their site');
console.log('  3. Widget shows "Powered by FreeFinCalc.net"');
console.log('  4. = Automatic dofollow backlink!');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add 6 embeddable calculator widgets"');
console.log('  git push origin master');
