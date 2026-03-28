const fs = require('fs');

// Find the homepage client file
const possiblePaths = ['app/PageClient.js', 'app/page.js'];
let filePath = '';
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    if (content.includes('Cost of Living by State') || content.includes('Popular Calculators') || content.includes('Calculate Smarter')) {
      filePath = p;
      break;
    }
  }
}

if (!filePath) {
  console.log('Could not find homepage file. Checking...');
  if (fs.existsSync('app/PageClient.js')) {
    filePath = 'app/PageClient.js';
    console.log('Using app/PageClient.js');
  } else {
    console.log('Files in app/:', fs.readdirSync('app').join(', '));
    process.exit(1);
  }
}

let c = fs.readFileSync(filePath, 'utf8');

// Add data sections before the FAQ section or Footer
// Find a good insertion point - before FAQs or before </div> closing
const dataSection = `
      {/* Data & Research Section */}
      <div style={{maxWidth:1200,margin:'0 auto',padding:'48px 16px'}}>
        <h2 style={{fontSize:'clamp(22px,3vw,32px)',fontWeight:900,color:'#fff',textAlign:'center',margin:'0 0 8px'}}>Data & Research</h2>
        <p style={{color:'#94a3b8',textAlign:'center',margin:'0 0 32px',fontSize:15}}>Original financial data and state rankings — cite us in your research</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',gap:10}}>
          <a href="/data" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(240,200,66,0.06)',border:'1px solid rgba(240,200,66,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#f0c842'}}>50 State Rankings</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Mortgage, rent, taxes, salary & more</div>
          </a>
          <a href="/salary-data" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#3b82f6'}}>Salary by Profession</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>15 professions across 50 states</div>
          </a>
          <a href="/financial-data" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#10b981'}}>Financial by Age</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Net worth, 401k, savings, debt by age</div>
          </a>
          <a href="/mortgage-data" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(240,200,66,0.06)',border:'1px solid rgba(240,200,66,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#f0c842'}}>Mortgage Data</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Rates, prices, foreclosures, costs</div>
          </a>
          <a href="/insurance-data" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#10b981'}}>Insurance Data</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Car, health, life, home rates</div>
          </a>
          <a href="/credit-card-data" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#ef4444'}}>Credit Card Data</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Debt, APR, rewards, approval rates</div>
          </a>
          <a href="/federal-tax-brackets" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(139,92,246,0.06)',border:'1px solid rgba(139,92,246,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#8b5cf6'}}>Tax Brackets 2026</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Federal rates, deductions, limits</div>
          </a>
          <a href="/minimum-wage-by-state" style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(139,92,246,0.06)',border:'1px solid rgba(139,92,246,0.15)',textDecoration:'none'}}>
            <div style={{fontSize:14,fontWeight:700,color:'#8b5cf6'}}>Minimum Wage 2026</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>All 50 states + federal rate</div>
          </a>
        </div>
      </div>`;

// Try to insert before FAQs section
if (c.includes('Frequently Asked Questions')) {
  c = c.replace(
    /(\s*{\/\*.*?FAQ.*?\*\/}|\s*<div[^>]*>[\s\S]*?Frequently Asked Questions)/,
    dataSection + '\n$1'
  );
  console.log('Inserted data section before FAQs');
} else if (c.includes('Financial Guides')) {
  c = c.replace(
    /(\s*{\/\*.*?Guide.*?\*\/}|\s*<div[^>]*>[\s\S]*?Financial Guides)/,
    dataSection + '\n$1'
  );
  console.log('Inserted data section before Guides');
} else {
  // Insert before the last </div> before Footer
  const footerIdx = c.lastIndexOf('<Footer');
  if (footerIdx > -1) {
    c = c.substring(0, footerIdx) + dataSection + '\n      ' + c.substring(footerIdx);
    console.log('Inserted data section before Footer');
  } else {
    console.log('WARNING: Could not find insertion point. Adding at end.');
  }
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('Updated ' + filePath + ' with Data & Research section');
console.log('');
console.log('Now run: git add . && git commit -m "Add data sections to homepage" && git push origin master');
