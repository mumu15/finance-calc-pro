const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');

console.log('');
console.log('=====================================================');
console.log('  THICKEN THIN PAGES — Fix "crawled not indexed"');
console.log('=====================================================');
console.log('');

// ============================================================
// 1. Freelance Rate Calculator /job/[job] template
// ============================================================
console.log('--- 1. Thickening freelance-rate-calculator/job/[job] ---');

const freelanceFile = path.join(APP, 'freelance-rate-calculator', 'job', '[job]', 'page.js');
let freelanceContent = fs.readFileSync(freelanceFile, 'utf8');
const freelanceBefore = freelanceContent.length;

// Check if it already has substantial content
if (freelanceContent.length < 2000) {
  // Read the file to understand its structure
  // We need to add content INSIDE the existing JSX return
  
  // Find the closing </main> or <Footer and insert before it
  let insertBefore = '</main>';
  if (!freelanceContent.includes('</main>')) insertBefore = '<Footer';
  if (!freelanceContent.includes(insertBefore)) insertBefore = '</>';

  const idx = freelanceContent.lastIndexOf(insertBefore);
  if (idx > 0) {
    const guideContent = `
        <div style={{maxWidth:900,margin:'32px auto',padding:'0 16px'}}>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>How to Set Your Freelance Rate</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Setting the right freelance rate is one of the most important decisions you will make as an independent professional. Charge too little and you will burn out working long hours for inadequate pay. Charge too much and you will struggle to find clients. The sweet spot varies by profession, experience level, and location.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>The most reliable method is the salary-replacement formula: take the annual salary you would earn as a full-time employee in your role, add 25-40% for self-employment taxes, health insurance, retirement contributions, and business expenses, then divide by your billable hours (typically 1,000-1,500 per year, NOT 2,080). This gives you the minimum hourly rate needed to match full-time compensation.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>For example, if a full-time position pays $80,000 per year, a freelancer needs approximately $100,000-$112,000 in gross revenue to achieve the same lifestyle after accounting for self-employment tax (15.3%), health insurance ($6,000-$12,000/year), retirement savings, and business costs. At 1,200 billable hours per year, that translates to $83-$93 per hour minimum.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>Most successful freelancers eventually transition from hourly to project-based or value-based pricing. Instead of billing $100/hour for 10 hours ($1,000), they charge $2,500 for the deliverable based on the value it provides to the client. This rewards efficiency and expertise rather than time spent.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Freelance Pricing Strategies</h2>
            <h3 style={{fontSize:17,fontWeight:700,color:'#e2e8f0',marginBottom:10,marginTop:0}}>Hourly Rate</h3>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Best for ongoing work, consulting, and when scope is uncertain. Clients pay for your time. The downside is an income ceiling — there are only so many hours in a day. Common for developers, consultants, and designers in early career stages.</p>
            <h3 style={{fontSize:17,fontWeight:700,color:'#e2e8f0',marginBottom:10,marginTop:16}}>Project-Based Pricing</h3>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Best for defined deliverables like websites, logos, articles, or marketing campaigns. You quote a flat fee for the entire project. This rewards speed and expertise — a senior developer who builds a site in 20 hours earns more per hour than a junior who takes 60 hours at the same project price.</p>
            <h3 style={{fontSize:17,fontWeight:700,color:'#e2e8f0',marginBottom:10,marginTop:16}}>Retainer Model</h3>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>Best for ongoing relationships. The client pays a fixed monthly fee for a set number of hours or deliverables. This provides predictable income for you and guaranteed availability for the client. Most freelancers aim to have 2-3 retainer clients covering their base expenses.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Common Freelance Rate Mistakes</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}><strong style={{color:'#ef4444'}}>Undercharging out of fear:</strong> New freelancers often set rates 30-50% below market because they are afraid of losing clients. This attracts low-quality clients who do not value your work and leads to burnout. Research market rates for your skill level and charge accordingly from day one.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}><strong style={{color:'#ef4444'}}>Not accounting for non-billable time:</strong> Only 60-70% of your working hours are billable. The rest goes to marketing, admin, invoicing, client communication, and professional development. If you need $80/hour to cover costs, you actually need to charge $115-$130/hour for your billable time.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}><strong style={{color:'#ef4444'}}>Forgetting taxes:</strong> As a freelancer, you pay both the employee AND employer portions of Social Security and Medicare (15.3% total) plus federal and state income tax. A $100,000 gross freelance income can result in $30,000-$40,000 in combined taxes. Use our salary after tax calculator to estimate your true take-home pay.</p>
          </div>
          <div style={{background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.15)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How much should a freelancer charge per hour?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Freelance hourly rates vary widely by profession and experience. Entry-level freelancers typically charge $25-$50/hour. Mid-level professionals charge $50-$100/hour. Senior specialists and consultants charge $100-$250+/hour. The rate should cover your salary equivalent plus 25-40% for taxes, insurance, and business costs.</p>
            </div>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Should I charge hourly or per project?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Start with hourly rates to understand how long different projects take. Once you have a track record, switch to project-based pricing for defined deliverables. Project pricing rewards your growing efficiency and typically earns 20-40% more than equivalent hourly billing.</p>
            </div>
            <div>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How do I raise my freelance rates?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Raise rates for new clients immediately and give existing clients 30-60 days notice with a clear explanation of the value you provide. Aim to increase rates 10-20% annually. If no clients push back on your rates, you are probably undercharging. Some rate resistance is healthy — it means you are at market rate.</p>
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Related Calculators</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {[['/freelance-rate-calculator','Freelance Rate Calculator'],['/salary-after-tax-calculator','Salary After Tax'],['/self-employment-tax-calculator','Self-Employment Tax'],['/hourly-to-salary-calculator','Hourly to Salary'],['/contractor-pay-calculator','Contractor Pay'],['/budget-planner-calculator','Budget Planner']].map(([href,lbl]) => (
                <a key={href} href={href} style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>{lbl}</a>
              ))}
            </div>
          </div>
        </div>
`;
    freelanceContent = freelanceContent.slice(0, idx) + guideContent + '      ' + freelanceContent.slice(idx);
    fs.writeFileSync(freelanceFile, freelanceContent, 'utf8');
    console.log('  ✅ Freelance job template: ' + freelanceBefore + ' → ' + freelanceContent.length + ' chars');
  }
} else {
  console.log('  ⏭️  Already thick enough');
}

// ============================================================
// 2. Rent vs Buy /city/[city] template
// ============================================================
console.log('--- 2. Thickening rent-vs-buy-calculator/city/[city] ---');

const rvbFile = path.join(APP, 'rent-vs-buy-calculator', 'city', '[city]', 'page.js');
let rvbContent = fs.readFileSync(rvbFile, 'utf8');
const rvbBefore = rvbContent.length;

if (rvbContent.length < 2000) {
  let insertBefore = '</main>';
  if (!rvbContent.includes('</main>')) insertBefore = '<Footer';
  if (!rvbContent.includes(insertBefore)) insertBefore = '</>';

  const idx = rvbContent.lastIndexOf(insertBefore);
  if (idx > 0) {
    const guideContent = `
        <div style={{maxWidth:900,margin:'32px auto',padding:'0 16px'}}>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Rent vs Buy: How to Decide</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>The rent versus buy decision is one of the most significant financial choices you will make. It depends on your local housing market, how long you plan to stay, your financial stability, and your lifestyle preferences. There is no universally correct answer — both renting and buying have clear advantages depending on your situation.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>The general rule of thumb is the 5-year breakeven: if you plan to live in the same place for at least 5 years, buying usually wins because you have time to recoup closing costs (2-5% of purchase price) and benefit from appreciation. If you might move within 3 years, renting is almost always cheaper because the transaction costs of buying and selling eat into any equity gained.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>However, this rule oversimplifies complex local markets. In high-cost cities like San Francisco or New York, the price-to-rent ratio is so high that renting can be better even for 10+ year stays. In affordable Midwest cities, buying can break even in just 2-3 years. Use this calculator with your specific city data to get a personalized answer.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>The True Cost of Buying a Home</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Many first-time buyers underestimate the true cost of homeownership. Beyond the mortgage payment, you must budget for property taxes (0.5-2.5% of home value annually), homeowners insurance ($1,000-$3,000/year), maintenance and repairs (1-2% of home value annually), HOA fees ($200-$500/month in many communities), and the opportunity cost of your down payment (which could be invested elsewhere).</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>On a $350,000 home, these additional costs add $500-$1,200/month on top of your mortgage payment. A $2,000/month mortgage can easily become $2,800-$3,200/month in total housing costs. Many homeowners are surprised by the ongoing expense of maintenance — a new roof ($8,000-$15,000), HVAC replacement ($5,000-$10,000), or major plumbing repair ($3,000-$7,000) can wipe out years of equity gains.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>The biggest financial advantage of buying is forced savings through equity buildup and potential appreciation. The average US home has appreciated 3-5% annually over the past 30 years. On a $350,000 home, that is $10,500-$17,500/year in equity growth — plus principal paydown on your mortgage adds another $5,000-$8,000/year in the early years.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>The Financial Case for Renting</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Renting gets a bad reputation as "throwing money away," but this is a myth. Renters avoid closing costs ($10,000-$25,000), maintenance surprises, and the illiquidity of real estate. The down payment money ($70,000 on a $350,000 home) can be invested in the stock market, which has averaged 10% annual returns over the past 50 years.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Renting also provides flexibility — you can relocate for career opportunities without the 6-12 month process and 6-8% transaction cost of selling a home. For young professionals, this flexibility often has more career value than the equity buildup from homeownership.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>The key to making renting financially smart is investing the difference. If buying would cost $3,000/month total and renting costs $1,800/month, you must actually invest that $1,200/month difference. Without disciplined investing, the renter falls behind the homeowner over time due to the forced savings mechanism of a mortgage.</p>
          </div>
          <div style={{background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.15)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Is it cheaper to rent or buy in 2026?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>It depends on your local market, how long you plan to stay, and mortgage rates. With 2026 mortgage rates around 6.5-7%, buying is more expensive in the short term than it was in 2020-2021 when rates were 3%. In most markets, you need to stay 5+ years for buying to beat renting financially.</p>
            </div>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>What is the 5% rule for rent vs buy?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>The 5% rule states: multiply the home value by 5% and divide by 12. If that number is higher than your rent, renting is better financially. For a $400,000 home: $400,000 x 5% / 12 = $1,667/month. If your rent is below $1,667, renting wins on pure cost comparison.</p>
            </div>
            <div>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How long do I need to own a home to make buying worth it?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Typically 5-7 years to break even after accounting for closing costs, maintenance, and transaction fees. In high-appreciation markets, it can be 3-4 years. In flat markets, it may take 7-10 years. Use this calculator with your specific numbers to find your breakeven point.</p>
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Related Calculators</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {[['/rent-vs-buy-calculator','Rent vs Buy Calculator'],['/mortgage-calculator','Mortgage Calculator'],['/home-affordability-calculator','Home Affordability'],['/rent-affordability-calculator','Rent Affordability'],['/down-payment-calculator','Down Payment'],['/cost-of-living-calculator','Cost of Living']].map(([href,lbl]) => (
                <a key={href} href={href} style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>{lbl}</a>
              ))}
            </div>
          </div>
        </div>
`;
    rvbContent = rvbContent.slice(0, idx) + guideContent + '      ' + rvbContent.slice(idx);
    fs.writeFileSync(rvbFile, rvbContent, 'utf8');
    console.log('  ✅ Rent vs Buy city template: ' + rvbBefore + ' → ' + rvbContent.length + ' chars');
  }
} else {
  console.log('  ⏭️  Already thick enough');
}

// ============================================================
// 3. Percent Change Calculator
// ============================================================
console.log('--- 3. Thickening percent-change-calculator ---');

const pctFile = path.join(APP, 'percent-change-calculator', 'PageClient.js');
let pctContent = fs.readFileSync(pctFile, 'utf8');
const pctBefore = pctContent.length;

if (pctContent.length < 2000) {
  let insertBefore = '<Footer';
  if (!pctContent.includes('<Footer')) insertBefore = '</main>';
  if (!pctContent.includes(insertBefore)) insertBefore = '</>';

  const idx = pctContent.lastIndexOf(insertBefore);
  if (idx > 0) {
    const guideContent = `
        <div style={{maxWidth:900,margin:'32px auto',padding:'0 16px'}}>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>How to Calculate Percent Change</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>Percent change measures how much a value has increased or decreased relative to its original amount. The formula is simple: <strong style={{color:'#f0c842'}}>Percent Change = ((New Value - Old Value) / Old Value) x 100</strong>. A positive result means an increase, while a negative result means a decrease.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>For example, if a stock price goes from $50 to $65, the percent change is ((65 - 50) / 50) x 100 = 30% increase. If it drops from $65 to $52, that is ((52 - 65) / 65) x 100 = -20% decrease. Note that a 30% gain followed by a 20% loss does NOT get you back to even — this is a common mathematical trap.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>Percent change is used everywhere in finance: stock returns, revenue growth, inflation rates, salary increases, price changes, population growth, and economic indicators. Understanding it is essential for making informed financial decisions and evaluating whether changes are significant or trivial.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Percent Change vs Percentage Point Change</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}>These are different concepts that are often confused. If an interest rate goes from 5% to 7%, the <strong style={{color:'#e2e8f0'}}>percentage point change is 2 points</strong> (simple difference), but the <strong style={{color:'#e2e8f0'}}>percent change is 40%</strong> ((7-5)/5 x 100). News headlines often mix these up, which can be misleading.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}>In investment contexts, this distinction matters enormously. A fund that returns 10% one year and 12% the next has improved by 2 percentage points but has increased its return by 20%. When evaluating performance claims, always clarify which measure is being used.</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Common Uses of Percent Change</h2>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}><strong style={{color:'#e2e8f0'}}>Investment Returns:</strong> If your portfolio grows from $50,000 to $62,000, that is a 24% return. Annualized returns use compound percent change over multiple years. A 50% gain over 3 years is approximately 14.5% per year (not 16.7%), because returns compound.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}><strong style={{color:'#e2e8f0'}}>Salary Negotiations:</strong> A raise from $75,000 to $82,000 is a 9.3% increase. Knowing the percentage helps you evaluate whether a raise keeps pace with inflation (3-4%) or represents a real increase in purchasing power. A 3% raise during 4% inflation is actually a 1% pay cut in real terms.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:14}}><strong style={{color:'#e2e8f0'}}>Business Metrics:</strong> Revenue growth, profit margin changes, customer acquisition rates, and churn rates are all expressed as percent changes. A business growing revenue at 20% year-over-year is doubling every 3.6 years.</p>
            <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,marginBottom:0}}><strong style={{color:'#e2e8f0'}}>Real Estate:</strong> Home appreciation of 5% per year on a $400,000 home adds $20,000 in equity annually. Over 10 years at 5% annual appreciation, that home is worth $652,000 — a 63% total increase due to compounding.</p>
          </div>
          <div style={{background:'rgba(240,200,66,0.04)',border:'1px solid rgba(240,200,66,0.15)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How do you calculate percent increase?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Percent increase = ((New Value - Old Value) / Old Value) x 100. Example: a price increase from $40 to $52 is ((52 - 40) / 40) x 100 = 30% increase.</p>
            </div>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}}>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>How do you calculate percent decrease?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Percent decrease uses the same formula: ((New Value - Old Value) / Old Value) x 100. The result will be negative. Example: a drop from $80 to $60 is ((60 - 80) / 80) x 100 = -25% decrease.</p>
            </div>
            <div>
              <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>Why does a 50% loss need a 100% gain to recover?</h3>
              <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>Because the base changes. If $100 drops 50% to $50, you need a 100% gain on $50 to get back to $100. This asymmetry is why protecting against large losses is so important in investing. A 20% loss only needs a 25% gain to recover, which is much more achievable.</p>
            </div>
          </div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:28,marginBottom:24}}>
            <h2 style={{fontSize:18,fontWeight:700,color:'#f1f5f9',marginBottom:12,marginTop:0}}>Related Calculators</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {[['/roi-calculator','ROI Calculator'],['/investment-return-calculator','Investment Return'],['/inflation-impact-calculator','Inflation Calculator'],['/profit-margin-calculator','Profit Margin'],['/raise-calculator','Raise Calculator'],['/discount-calculator','Discount Calculator']].map(([href,lbl]) => (
                <a key={href} href={href} style={{display:'inline-block',padding:'8px 14px',background:'rgba(240,200,66,0.08)',border:'1px solid rgba(240,200,66,0.2)',borderRadius:8,color:'#f0c842',textDecoration:'none',fontSize:13,fontWeight:600}}>{lbl}</a>
              ))}
            </div>
          </div>
        </div>
`;
    pctContent = pctContent.slice(0, idx) + guideContent + '      ' + pctContent.slice(idx);
    fs.writeFileSync(pctFile, pctContent, 'utf8');
    console.log('  ✅ Percent change calculator: ' + pctBefore + ' → ' + pctContent.length + ' chars');
  }
} else {
  console.log('  ⏭️  Already thick enough');
}

// ============================================================
// 4. Mortgage Calculator /fort-worth (check if exists)
// ============================================================
console.log('--- 4. Checking mortgage-calculator/fort-worth ---');
const fwFile = path.join(APP, 'mortgage-calculator', 'fort-worth', 'page.js');
if (fs.existsSync(fwFile)) {
  const fwContent = fs.readFileSync(fwFile, 'utf8');
  console.log('  Fort Worth page: ' + fwContent.length + ' chars — ' + (fwContent.length > 2000 ? 'OK' : 'needs thickening'));
} else {
  // Check for dynamic route
  const mortFiles = [];
  function findMort(dir) {
    if (!fs.existsSync(dir)) return;
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) findMort(full);
      else if (item === 'page.js') mortFiles.push(path.relative(APP, full).replace(/\\/g, '/'));
    }
  }
  findMort(path.join(APP, 'mortgage-calculator'));
  console.log('  Mortgage calculator sub-pages:');
  mortFiles.forEach(f => console.log('    ' + f));
}

console.log('');
console.log('=====================================================');
console.log('  THICKENING COMPLETE');
console.log('  These templates generate ALL the thin pages');
console.log('  Google flagged — freelance jobs (16 pages),');
console.log('  rent-vs-buy cities (8 pages), and percent change.');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Thicken thin pages — 500+ words added to 3 templates"');
console.log('  git push origin master');
console.log('');
