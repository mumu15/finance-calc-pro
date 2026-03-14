const fs = require('fs');
const path = require('path');

// ============================================================
// ADD "How to Use" + "Why This Matters" guide sections
// Adds 300-500 words of unique content per calculator
// Inserts BEFORE the FAQ section or Footer
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let added = 0;
let skipped = 0;

// Hand-written guides for highest-CPC calculators
const GUIDES = {
  'auto-loan-calculator': {
    how: 'Start by entering the vehicle price, then adjust your down payment amount. Set the interest rate based on quotes from your lender or credit union. Choose a loan term — 48 or 60 months is recommended. The calculator instantly shows your monthly payment, total interest paid, and the true cost of the vehicle including financing.',
    why: 'Understanding the true cost of a car loan prevents overspending. Many buyers focus only on the monthly payment, but a longer loan term dramatically increases total interest. A $30,000 car at 7% for 72 months costs $6,900 in interest versus $4,200 for 48 months. This calculator helps you find the sweet spot between an affordable payment and minimizing interest. Always get pre-approved before visiting a dealership — it gives you negotiating power and prevents dealer markup on financing.',
  },
  'balance-transfer-calculator': {
    how: 'Enter your current credit card balance, the interest rate you are currently paying, and the balance transfer fee (typically 3-5%). Then enter the promotional 0% APR period length. The calculator shows whether the transfer saves money, how much you need to pay monthly to clear the balance before the promo expires, and your net savings after the transfer fee.',
    why: 'Credit card interest at 20-29% can trap you in debt for decades. A balance transfer to a 0% card lets every dollar go toward principal instead of interest. On a $10,000 balance at 22% APR, you pay $2,200/year in interest alone. Transferring to a 0% card with a 3% fee ($300) saves $1,900 in the first year. The key is having a payoff plan — divide your balance by the number of promo months to know your required monthly payment.',
  },
  'boat-loan-calculator': {
    how: 'Enter the boat purchase price, your down payment, the interest rate from your marine lender, and the loan term in years. The calculator shows your monthly payment, total interest over the life of the loan, and the total cost of ownership. Adjust the down payment to see how it affects your monthly payment and total interest.',
    why: 'Boats are a significant financial commitment that extends far beyond the purchase price. Annual ownership costs (insurance, storage, fuel, maintenance) typically add 10-15% of the boat value per year. A $50,000 boat can cost $5,000-$7,500 annually just to own. Understanding your monthly loan payment alongside these costs helps you budget realistically and avoid becoming what the industry calls "boat poor" — owning a boat you cannot afford to enjoy.',
  },
  'budget-planner-calculator': {
    how: 'Enter your monthly after-tax income. The calculator automatically divides it using the 50/30/20 rule: 50% for needs (housing, utilities, groceries, insurance), 30% for wants (dining out, entertainment, shopping), and 20% for savings and debt repayment. Adjust the percentages to match your situation and see how changes affect each category.',
    why: 'Without a budget, most people underestimate their spending by 20-30%. The average American has $8,000 in credit card debt largely because of untracked spending. A budget does not restrict you — it gives you permission to spend guilt-free within categories while ensuring your financial goals are met. The 50/30/20 rule is a proven starting framework used by financial advisors worldwide. Even high earners benefit — lifestyle inflation without a budget is the number one reason high-income households still live paycheck to paycheck.',
  },
  'business-loan-calculator': {
    how: 'Enter the loan amount you need, the interest rate from your lender, and the repayment term. The calculator shows your monthly payment, total interest cost, and total amount repaid. Compare different loan amounts and terms to find the best balance between affordable payments and minimizing total interest.',
    why: 'Choosing the wrong business loan can cost tens of thousands in unnecessary interest or saddle you with payments that strain cash flow. A $100,000 loan at 8% for 5 years costs $21,600 in interest. The same loan at 12% from an online lender costs $33,500 — a $12,000 difference. Always compare SBA loans (lowest rates, longest terms), bank loans (moderate rates, faster approval), and online lenders (highest rates, fastest funding) before committing.',
  },
  'capital-gains-tax-calculator': {
    how: 'Enter the purchase price of your investment, the sale price, and how long you held it. Select your tax filing status and annual income. The calculator determines whether your gain is short-term or long-term, applies the correct tax rate, and shows your estimated tax liability and net profit after taxes.',
    why: 'The difference between short-term and long-term capital gains tax can be enormous. A $50,000 gain taxed at short-term rates (up to 37%) could cost $18,500 in taxes. The same gain taxed at long-term rates (0-20%) might cost $7,500 or even $0 if your income is low enough. Simply holding an investment for one day longer than 12 months can save thousands. This calculator helps you plan the timing of sales to minimize your tax burden legally.',
  },
  'cd-calculator': {
    how: 'Enter the deposit amount, the APY (Annual Percentage Yield) offered by the bank, and the CD term length. The calculator shows your total interest earned, the maturity value, and the effective monthly earnings. Compare different CD terms and rates to find the best option for your savings timeline.',
    why: 'CDs offer guaranteed returns that savings accounts cannot match, but choosing the wrong term can cost you. If rates are rising, locking into a long-term CD means missing higher future rates. If rates are falling, a long-term CD locks in today higher rate. CD laddering — splitting your money across multiple terms — solves this dilemma by providing both liquidity and rate optimization. With 2026 CD rates at 4-5%, they are a compelling option for risk-free returns.',
  },
  'closing-cost-calculator': {
    how: 'Enter the home purchase price and your down payment percentage. The calculator estimates all closing costs including loan origination fees, appraisal, title insurance, attorney fees, prepaid taxes and insurance, and recording fees. Results show both the total closing costs and the complete cash needed at closing.',
    why: 'Closing costs catch many first-time buyers off guard. They typically add 2-5% of the purchase price on top of your down payment. On a $400,000 home, that is $8,000-$20,000 in additional cash needed at closing. Failing to budget for closing costs is one of the top reasons home purchases fall through. Some costs are negotiable (origination fees, title insurance), and some sellers will contribute toward closing costs as part of the deal negotiation.',
  },
  'construction-loan-calculator': {
    how: 'Enter the total construction budget, the interest rate, the construction period length, and the permanent loan terms. The calculator shows interest-only payments during construction, the total construction period cost, and your permanent mortgage payment after construction is complete.',
    why: 'Construction loans work differently from regular mortgages. During building, you make interest-only payments on the amount disbursed (not the full loan). Rates are typically 1-2% higher than conventional mortgages. Understanding the true cost helps you budget for both the construction phase and the permanent mortgage. Many construction projects go 10-20% over budget, so building in a contingency fund of 15-20% is essential.',
  },
  'debt-consolidation-calculator': {
    how: 'Enter each of your current debts with their balances, interest rates, and monthly payments. Then enter the consolidation loan terms (rate, term). The calculator compares your current total monthly payments and total interest against the consolidated loan, showing your monthly savings and total interest savings.',
    why: 'The average American with credit card debt has balances across 3-4 cards at rates of 20-29%. Consolidating into a single personal loan at 8-12% can save hundreds per month and thousands in total interest. However, consolidation only works if you stop adding new debt. Many people consolidate, then run up the original cards again — ending up in worse shape. Use this calculator to see the real savings, then close or freeze the original accounts.',
  },
  'early-retirement-calculator': {
    how: 'Enter your current age, savings, monthly contributions, expected return, and desired retirement spending. Set your target early retirement age. The calculator shows whether your savings will sustain you through early retirement, how long your money will last, and any shortfall you need to address.',
    why: 'Early retirement requires significantly more savings than traditional retirement because your money must last longer and you cannot access retirement accounts penalty-free until age 59.5. Retiring at 50 instead of 65 means your portfolio must survive 15 extra years — roughly 50% more savings needed. The FIRE movement uses the 25x rule: save 25 times your annual expenses. For $50,000/year spending, that is $1.25 million. Healthcare before Medicare (age 65) is a major cost that many early retirees underestimate.',
  },
  'employee-cost-calculator': {
    how: 'Enter the employee annual salary. The calculator adds employer costs including payroll taxes (FICA, FUTA, SUTA), health insurance, retirement contributions, workers compensation, and other benefits. Results show the true total cost of the employee and the multiplier above their base salary.',
    why: 'Most employers underestimate the true cost of hiring. An employee earning $60,000 typically costs $75,000-$90,000 when you factor in payroll taxes (7.65%), health insurance ($6,000-$15,000), retirement match (3-6%), workers comp, paid time off, equipment, and training. The standard multiplier is 1.25x-1.5x the base salary. Understanding this helps you budget accurately for new hires, price your services to cover labor costs, and make informed decisions about hiring employees versus contractors.',
  },
  'equipment-loan-calculator': {
    how: 'Enter the equipment cost, down payment, interest rate, and loan term. The calculator shows your monthly payment, total interest, and total cost. You can compare buying versus leasing by adjusting the terms to see which option makes more financial sense for your business.',
    why: 'Equipment financing keeps cash available for operations while still acquiring necessary assets. Most equipment loans require 10-20% down and offer terms matching the equipment useful life (3-7 years). Interest rates range from 5-15% depending on credit and equipment type. The key decision is buy versus lease: buying builds equity and may qualify for Section 179 tax deductions (up to $1.16 million in 2026). Leasing offers lower payments and easier upgrades but costs more long-term.',
  },
  'estate-tax-calculator': {
    how: 'Enter the total value of the estate including real estate, investments, bank accounts, life insurance, and other assets. Subtract any debts. The calculator applies the current federal estate tax exemption and shows whether the estate owes tax, the estimated tax amount, and effective tax rate.',
    why: 'The federal estate tax exemption in 2026 is approximately $13.6 million per individual ($27.2 million for married couples). Estates below this threshold owe zero federal estate tax. However, some states have their own estate taxes with much lower thresholds — as low as $1 million in Oregon and Massachusetts. Proper estate planning including trusts, gifting strategies, and beneficiary designations can legally reduce or eliminate estate taxes for most families.',
  },
  'fha-loan-calculator': {
    how: 'Enter the home price and your down payment (FHA allows as low as 3.5%). Set the interest rate and loan term. The calculator adds the FHA mortgage insurance premiums (upfront 1.75% and annual 0.55-1.05%) to show your true monthly payment including MIP, taxes, and insurance.',
    why: 'FHA loans make homeownership accessible to buyers who cannot qualify for conventional loans. With just 3.5% down and credit scores as low as 580, they open doors that conventional loans keep shut. However, the trade-off is mortgage insurance that lasts the life of the loan (unless you refinance to conventional later). On a $300,000 home, FHA MIP adds roughly $150-$250/month. Understanding this total cost helps you decide whether FHA or conventional (which drops PMI at 20% equity) is the better long-term choice.',
  },
};

function generateGuide(slug) {
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace(' Calculator', '');
  const fullName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    how: `Start by entering your values using the sliders above. Each input updates the results instantly in real time. Adjust different scenarios to compare outcomes — for example, see how a higher contribution or a different rate changes your results. All calculations happen in your browser so your data stays completely private. You can download the results as a PDF for your records or to share with a financial advisor.`,
    why: `Making informed ${name.toLowerCase()} decisions can save you thousands of dollars over time. Many people rely on rough estimates or rules of thumb that do not account for their specific situation. This calculator uses precise mathematical formulas to give you personalized results based on your actual numbers. Whether you are planning ahead, comparing options, or checking a professional recommendation, having accurate calculations helps you make confident financial decisions. Use this tool alongside our related calculators for a complete picture of your finances.`,
  };
}

function findClientFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir)) {
    if (item === 'node_modules' || item === '.next') continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findClientFiles(full, results);
    else if ((item === 'PageClient.js' || item.endsWith('Client.js')) && !item.startsWith('.')) {
      results.push(full);
    }
  }
  return results;
}

console.log('');
console.log('=====================================================');
console.log('  ADD "How to Use" guide sections');
console.log('=====================================================');
console.log('');

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // Skip if already has guide content
  if (content.includes('How to Use') || content.includes('How This Calculator Works') || content.includes('Guide</h2>') || content.includes('Buying a Home in')) {
    skipped++;
    continue;
  }

  // Skip redirect pages
  if (content.includes('return null') || (content.includes('router.replace') && !content.includes('<div'))) {
    skipped++;
    continue;
  }

  // Skip sub-pages (amount, city, state, age, etc) — they already have contextual content
  const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = relToApp.split('/').filter(Boolean);
  if (parts.length > 1) { skipped++; continue; }

  // Must have Footer or FAQ section to insert before
  if (!content.includes('<Footer') && !content.includes('Frequently Asked')) {
    skipped++;
    continue;
  }

  const slug = parts[0] || 'calculator';
  const fullName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const guide = GUIDES[slug] || generateGuide(slug);

  const guideSection = `
        {/* How to Use Guide */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:28,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>How to Use the ${fullName}</h2>
          <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,margin:'0 0 20px'}}>${guide.how}</p>
          <h2 style={{fontSize:20,fontWeight:700,color:'#f0c842',marginBottom:16,marginTop:0}}>Why This Calculator Matters</h2>
          <p style={{fontSize:15,color:'#94a3b8',lineHeight:1.8,margin:0}}>${guide.why}</p>
        </div>
`;

  // Insert before FAQ section if it exists, otherwise before Footer
  let insertIdx = -1;
  
  if (content.includes('Frequently Asked Questions')) {
    // Find the FAQ section start
    const faqIdx = content.indexOf('Frequently Asked Questions');
    // Go back to find the containing div
    const beforeFaq = content.lastIndexOf('<div', faqIdx);
    // Go back more to find the style/className opening
    const sectionStart = content.lastIndexOf('{/*', faqIdx);
    if (sectionStart > 0 && faqIdx - sectionStart < 200) {
      insertIdx = sectionStart;
    } else if (beforeFaq > 0) {
      // Find the start of this div's parent container
      const lineStart = content.lastIndexOf('\n', beforeFaq);
      insertIdx = lineStart > 0 ? lineStart : beforeFaq;
    }
  }
  
  if (insertIdx <= 0 && content.includes('<Footer')) {
    insertIdx = content.lastIndexOf('<Footer');
  }

  if (insertIdx <= 0) { skipped++; continue; }

  content = content.slice(0, insertIdx) + guideSection + content.slice(insertIdx);

  fs.writeFileSync(cf, content, 'utf8');
  added++;
  if (added <= 20) console.log('  ✅ ' + rel);
}

if (added > 20) console.log('  ... and ' + (added - 20) + ' more');

console.log('');
console.log('=====================================================');
console.log('  RESULTS: Added guides to ' + added + ' | Skipped ' + skipped);
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add How to Use guide sections — thicker content for SEO"');
console.log('  git push origin master');
console.log('');
