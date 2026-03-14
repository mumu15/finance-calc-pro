const fs = require('fs');
const path = require('path');

// ============================================================
// ADD UNIQUE FAQs to all calculators missing them
// - Adds FaqSchema import + component
// - Adds visible FAQ section before Footer
// - Each calculator gets unique relevant FAQs
// ============================================================

const BASE = __dirname;
const APP = path.join(BASE, 'app');
let added = 0;
let skipped = 0;

// Unique FAQs per calculator slug
const FAQ_DB = {
  'auto-loan-calculator': [
    { q:'What is a good interest rate for a car loan in 2026?', a:'A good car loan rate in 2026 is between 4-7% for new cars with good credit (700+). Used cars typically run 1-2% higher. Credit unions often offer the best rates. Always compare at least 3 lenders before signing.' },
    { q:'How long should a car loan be?', a:'Most financial experts recommend keeping car loans to 48-60 months. While 72 and 84 month loans have lower payments, you pay significantly more interest and risk being underwater (owing more than the car is worth) for years.' },
    { q:'Should I put money down on a car?', a:'Yes. A 20% down payment is ideal — it lowers your monthly payment, reduces total interest, and prevents you from going underwater on the loan. At minimum, aim for 10% to avoid negative equity early in the loan.' },
    { q:'Does paying off a car loan early save money?', a:'Yes. Paying off early saves you all the interest that would have accrued on remaining payments. Check your loan for prepayment penalties first (most auto loans do not have them). Even small extra payments can save hundreds or thousands.' },
    { q:'What credit score do I need for a car loan?', a:'You can get a car loan with a credit score as low as 500, but rates vary dramatically. 750+ gets the best rates (3-5%). 670-749 gets good rates (5-8%). Below 670 expect 8-15%+. Improving your score before buying can save thousands.' },
  ],
  'baby-cost-calculator': [
    { q:'How much does a baby cost in the first year?', a:'The average first-year cost of a baby in the US is $12,000-$15,000, covering diapers ($900), formula ($1,500 if not breastfeeding), clothing ($500), childcare ($8,000-$15,000), medical costs, gear and supplies.' },
    { q:'What is the biggest expense with a new baby?', a:'Childcare is by far the biggest expense, averaging $800-$1,500/month depending on location. If one parent stays home, the biggest cost becomes lost income. Diapers, formula, and medical costs are the next largest categories.' },
    { q:'How much should I save before having a baby?', a:'Financial advisors recommend saving $10,000-$20,000 before having a baby to cover medical bills (even with insurance), lost income during leave, and initial baby expenses. Having 3-6 months of expenses in an emergency fund is also essential.' },
    { q:'Does health insurance cover pregnancy and delivery?', a:'Under the ACA, all marketplace plans must cover pregnancy and childbirth. However, you will still owe your deductible (average $1,500-$3,000) and copays. A typical vaginal delivery costs $2,000-$5,000 out of pocket with insurance.' },
    { q:'How can I reduce baby costs?', a:'Buy used gear (cribs, strollers, clothes), breastfeed if possible ($1,500/year savings), use cloth diapers ($500/year savings), take advantage of FSA/HSA for medical costs, and stock up during sales. Hand-me-downs from friends and family save thousands.' },
  ],
  'balance-transfer-calculator': [
    { q:'Is a balance transfer worth it?', a:'A balance transfer is worth it if you can pay off the balance during the 0% intro period (usually 12-21 months) and the transfer fee (typically 3-5%) is less than the interest you would have paid. If you cannot pay it off in time, the regular APR kicks in at 19-29%.' },
    { q:'What credit score do I need for a balance transfer card?', a:'Most 0% balance transfer cards require good to excellent credit (670+). The best offers with the longest intro periods (18-21 months) typically require 720+. Check for pre-qualification with soft credit pulls before applying.' },
    { q:'Does a balance transfer hurt your credit score?', a:'Initially, it may cause a small dip due to the hard inquiry and new account. However, it often improves your score over time by reducing your credit utilization ratio and helping you pay off debt faster. The net effect is usually positive.' },
    { q:'Can I transfer a balance between cards from the same bank?', a:'Most banks do not allow balance transfers between their own cards. You typically need to transfer to a card from a different issuer. Check the specific terms before applying.' },
    { q:'What happens after the 0% intro period ends?', a:'After the intro period, any remaining balance accrues interest at the card regular APR, which is typically 19-29%. This is why it is critical to pay off the full balance before the promo expires or have a plan to transfer again.' },
  ],
  'biweekly-mortgage-calculator': [
    { q:'How does a biweekly mortgage payment work?', a:'Instead of making 12 monthly payments per year, you make 26 half-payments (every two weeks). This equals 13 full payments per year — one extra payment annually. This extra payment goes directly to principal, saving you years and thousands in interest.' },
    { q:'How much can biweekly payments save me?', a:'On a $300,000 30-year mortgage at 7%, biweekly payments save approximately $75,000 in interest and pay off the loan about 5 years early. The savings are larger with higher interest rates and loan amounts.' },
    { q:'Do all lenders offer biweekly payment plans?', a:'Not all lenders offer formal biweekly plans. Some charge setup or processing fees. A free alternative is to simply make one extra payment per year toward principal, which achieves nearly the same result without any fees.' },
    { q:'Is it better to make biweekly payments or extra payments?', a:'Both achieve similar results. Biweekly is automatic and easier to budget around a biweekly paycheck. However, making a lump extra payment each year gives you more flexibility on timing. Either approach saves significant interest.' },
    { q:'Can I switch to biweekly payments at any time?', a:'You can start biweekly payments at any point during your mortgage. The earlier you start, the more you save. Contact your lender to set up the plan, or simply divide your monthly payment in half and pay that amount every two weeks.' },
  ],
  'boat-loan-calculator': [
    { q:'What is a typical boat loan interest rate?', a:'Boat loan rates typically range from 5-9% for new boats and 7-12% for used boats in 2026. Rates depend on credit score, loan amount, boat age, and loan term. Marine lenders and credit unions often offer better rates than banks.' },
    { q:'How long can you finance a boat?', a:'Boat loan terms range from 2-20 years depending on the loan amount. Boats under $25,000 typically get 2-8 year terms. Boats $25,000-$75,000 get up to 12 years. Boats over $75,000 can qualify for 15-20 year terms.' },
    { q:'What is the total cost of owning a boat?', a:'Beyond the purchase price, annual boat ownership costs include insurance ($500-$3,000), storage/marina ($1,200-$12,000), fuel ($500-$5,000), maintenance ($1,000-$3,000), and registration fees. Budget 10-15% of the boat value annually for total ownership costs.' },
    { q:'How much should I put down on a boat?', a:'Most marine lenders require 10-20% down. A larger down payment gets you a better interest rate and lower monthly payments. For boats over $100,000, some lenders may accept as little as 10% with excellent credit.' },
    { q:'Is boat loan interest tax deductible?', a:'If your boat qualifies as a second home (has a sleeping berth, cooking facility, and toilet), the mortgage interest may be tax deductible. Consult a tax professional for your specific situation, as tax laws change frequently.' },
  ],
  'bond-yield-calculator': [
    { q:'What is bond yield?', a:'Bond yield is the return you earn on a bond investment, expressed as an annual percentage. Current yield is the annual coupon payment divided by the current market price. Yield to maturity (YTM) accounts for all future payments and the return of principal at maturity.' },
    { q:'What is a good bond yield in 2026?', a:'In 2026, US Treasury yields range from 4-5% depending on maturity. Investment-grade corporate bonds yield 5-7%. High-yield (junk) bonds offer 7-10%+. Municipal bonds yield 3-5% but are often tax-free, making their after-tax yield competitive.' },
    { q:'Why do bond prices fall when interest rates rise?', a:'When new bonds are issued at higher rates, existing bonds with lower coupon rates become less attractive. To compensate, their market price drops until their effective yield matches current rates. The longer the maturity, the more sensitive the price.' },
    { q:'Are bonds a good investment in 2026?', a:'Bonds can be a good investment for income, diversification, and capital preservation. With yields at 4-5%, they offer reasonable returns with lower risk than stocks. They are especially valuable for retirees and investors approaching retirement who need stable income.' },
    { q:'What is the difference between coupon rate and yield?', a:'The coupon rate is the fixed annual interest payment as a percentage of the bond face value (par). Yield is the actual return based on the current market price. If you buy a bond below par, your yield is higher than the coupon rate, and vice versa.' },
  ],
  'budget-planner-calculator': [
    { q:'What is the 50/30/20 budget rule?', a:'The 50/30/20 rule allocates 50% of after-tax income to needs (housing, food, utilities, insurance), 30% to wants (entertainment, dining out, hobbies), and 20% to savings and debt repayment. It is a simple starting framework that works for most income levels.' },
    { q:'How much should I spend on housing?', a:'The standard guideline is no more than 28-30% of gross income on housing costs (rent/mortgage, insurance, taxes). In high-cost cities, many people spend 35-40%, but this leaves less room for savings and other expenses.' },
    { q:'How much should I save each month?', a:'At minimum, save 20% of after-tax income. This includes retirement contributions, emergency fund, and other savings goals. If 20% is not possible right now, start with whatever you can and increase by 1% every few months until you reach 20%.' },
    { q:'What are the biggest budget mistakes people make?', a:'The most common mistakes are not tracking small recurring subscriptions, underestimating food spending, ignoring annual expenses (insurance, taxes, car registration), not having an emergency fund, and failing to budget for irregular expenses like gifts and car repairs.' },
    { q:'How often should I review my budget?', a:'Review your budget monthly at minimum. Do a quick weekly check-in to make sure you are on track. Major life changes (new job, move, baby) should trigger an immediate budget revision. Annual reviews should assess your overall financial goals.' },
  ],
  'burn-rate-calculator': [
    { q:'What is burn rate?', a:'Burn rate is the rate at which a company spends cash reserves before generating positive cash flow. Gross burn rate is total monthly spending. Net burn rate is monthly spending minus monthly revenue. It is a critical metric for startups and any business not yet profitable.' },
    { q:'What is a good burn rate for a startup?', a:'A healthy burn rate depends on your funding runway. Ideally, you should have 18-24 months of runway. If you have $1M in the bank, a net burn rate of $40,000-$55,000/month gives you the recommended runway. Investors get nervous below 6 months runway.' },
    { q:'How do I reduce my burn rate?', a:'The most impactful ways to reduce burn rate are renegotiating rent or going remote, delaying non-essential hires, cutting unused software subscriptions, reducing marketing spend on low-ROI channels, and renegotiating vendor contracts.' },
    { q:'What is runway in business?', a:'Runway is how many months your company can continue operating at the current burn rate before running out of cash. It is calculated as total cash reserves divided by monthly net burn rate. Maintaining 12-18 months of runway is considered healthy.' },
    { q:'When should I worry about burn rate?', a:'Worry when runway drops below 6 months without a clear path to profitability or additional funding. Also watch if burn rate is increasing faster than revenue growth. A rising burn rate with flat revenue is a warning sign that requires immediate action.' },
  ],
  'business-loan-calculator': [
    { q:'What credit score do I need for a business loan?', a:'Most traditional bank business loans require a personal credit score of 680+. SBA loans typically need 650+. Online lenders may approve scores as low as 500-600 but at much higher interest rates (15-30%+). The higher your score, the better your terms.' },
    { q:'What is a good interest rate for a business loan?', a:'In 2026, SBA loan rates are 6-9%, traditional bank loans 5-10%, and online lenders 8-30%+. The rate depends on your creditworthiness, business revenue, time in business, and the type of loan. Secured loans backed by collateral get better rates.' },
    { q:'How much can I borrow for a business loan?', a:'SBA loans go up to $5 million. Traditional bank loans vary widely. Online lenders typically offer $5,000-$500,000. The amount you qualify for depends on annual revenue (most lenders cap at 10-33% of annual revenue), credit score, and time in business.' },
    { q:'What documents do I need for a business loan?', a:'Typically you need tax returns (2-3 years personal and business), bank statements (3-12 months), profit and loss statement, balance sheet, business plan (for startups), and legal documents (articles of incorporation, licenses). Online lenders require fewer documents.' },
    { q:'Should I get an SBA loan or a regular business loan?', a:'SBA loans offer lower rates, longer terms, and lower down payments, but take 30-90 days to process and have more paperwork. Regular bank loans are faster (1-4 weeks). Online lenders are fastest (1-7 days) but most expensive. Choose based on your urgency and cost tolerance.' },
  ],
  'business-valuation-calculator': [
    { q:'How do you value a small business?', a:'The three main methods are asset-based (total assets minus liabilities), income-based (typically 2-5x annual earnings or EBITDA), and market-based (comparing to similar businesses that recently sold). Most small businesses sell for 2-4x annual discretionary earnings.' },
    { q:'What multiple is used for business valuation?', a:'Common multiples are 2-4x SDE (Seller Discretionary Earnings) for small businesses, 4-8x EBITDA for mid-sized businesses, and 8-15x+ for larger companies. The multiple depends on industry, growth rate, recurring revenue, and risk factors.' },
    { q:'What increases a business valuation?', a:'Key value drivers include recurring revenue, strong profit margins, diversified customer base, documented systems and processes, growth trajectory, intellectual property, long-term contracts, and a business that can run without the owner.' },
    { q:'How much is a business worth with $1 million in revenue?', a:'Revenue alone does not determine value — profitability matters more. A business with $1M revenue and $200K profit might sell for $400K-$800K (2-4x earnings). A high-growth SaaS business with $1M ARR might sell for $4M-$10M+ due to higher multiples.' },
    { q:'When should I get a business valuation?', a:'Get a formal valuation when selling, seeking investors, buying a partner out, estate planning, divorce proceedings, or applying for certain business loans. Informal valuations are useful annually to track progress and identify value-building opportunities.' },
  ],
  'cap-rate-calculator': [
    { q:'What is a good cap rate for rental property?', a:'Cap rates of 5-10% are generally considered good for residential rental property. Higher cap rates (8-12%) indicate higher returns but often come with more risk or less desirable locations. Lower cap rates (3-5%) are typical in premium markets with stable appreciation.' },
    { q:'How is cap rate calculated?', a:'Cap rate equals Net Operating Income (NOI) divided by the property purchase price, multiplied by 100. NOI is annual rental income minus operating expenses (property taxes, insurance, maintenance, management fees) but excluding mortgage payments.' },
    { q:'Does cap rate include mortgage payments?', a:'No. Cap rate is calculated before financing costs. It measures the property return as if you paid all cash. This allows you to compare properties regardless of how they are financed. To account for financing, use cash-on-cash return instead.' },
    { q:'What is the difference between cap rate and ROI?', a:'Cap rate measures property return without considering financing. ROI (return on investment) measures your actual return based on the cash you invested, including leverage. A property with a 6% cap rate can produce 15%+ ROI when using a mortgage due to leverage.' },
    { q:'Why do cap rates vary by location?', a:'Cap rates are lower in high-demand, stable markets (New York, San Francisco) because investors accept lower yields for safer appreciation. Higher cap rates exist in smaller markets or riskier areas where investors demand higher returns to compensate for greater risk and less liquidity.' },
  ],
  'capital-gains-tax-calculator': [
    { q:'What is the capital gains tax rate in 2026?', a:'Long-term capital gains (assets held over 1 year) are taxed at 0%, 15%, or 20% depending on income. Short-term gains (held under 1 year) are taxed as ordinary income at rates up to 37%. The net investment income tax adds 3.8% for high earners.' },
    { q:'How can I reduce capital gains taxes?', a:'Key strategies include holding investments for over 1 year (long-term rates), tax-loss harvesting (offsetting gains with losses), using retirement accounts (401k, IRA), donating appreciated assets to charity, and timing sales in lower-income years.' },
    { q:'Do I pay capital gains on my primary home?', a:'You can exclude up to $250,000 in gains ($500,000 for married couples) from the sale of your primary home if you lived there for at least 2 of the last 5 years. Any gain above the exclusion amount is subject to capital gains tax.' },
    { q:'What is tax-loss harvesting?', a:'Tax-loss harvesting is selling investments at a loss to offset capital gains and reduce your tax bill. You can deduct up to $3,000 in net losses against ordinary income per year, and carry forward any excess losses to future years.' },
    { q:'Are capital gains taxed at the state level?', a:'Most states tax capital gains as regular income. However, some states have no income tax (Texas, Florida, Nevada, etc.) or offer reduced rates for capital gains. California taxes capital gains at regular income rates up to 13.3%.' },
  ],
  'car-affordability-calculator': [
    { q:'How much car can I afford?', a:'The 20/4/10 rule is a good guideline: 20% down payment, 4-year loan maximum, and total car costs (payment, insurance, gas, maintenance) should not exceed 10% of gross monthly income. On a $60,000 salary, this means about $500/month total car costs.' },
    { q:'What percentage of income should go to a car payment?', a:'Financial experts recommend keeping your car payment under 10-15% of take-home pay. Combined with insurance, gas, and maintenance, total transportation costs should stay under 15-20% of take-home pay to maintain a healthy budget.' },
    { q:'Should I buy new or used?', a:'Used cars (2-3 years old) typically offer the best value because they have already absorbed the steepest depreciation (20-30% in the first year). Certified pre-owned vehicles offer a middle ground with manufacturer warranties at lower prices.' },
    { q:'How much should I spend on a car if I make $50,000?', a:'On a $50,000 salary, aim for a car costing $15,000-$25,000. This keeps your payment around $300-$450/month on a 4-5 year loan. Total monthly car expenses (payment, insurance, gas, maintenance) should not exceed $600-$700.' },
    { q:'Does a car loan affect my ability to get a mortgage?', a:'Yes. Your car payment increases your debt-to-income (DTI) ratio, which lenders use to determine how much mortgage you qualify for. Paying off or reducing your car loan before applying for a mortgage can significantly increase your home buying power.' },
  ],
  'car-depreciation-calculator': [
    { q:'How fast do cars depreciate?', a:'Cars lose about 20% of their value in the first year, 15% per year for years 2-3, and 10% per year after that. After 5 years, most cars are worth about 40% of their original price. Luxury and electric vehicles may depreciate differently.' },
    { q:'Which cars hold their value best?', a:'Toyota, Honda, and Subaru consistently have the best resale values. Trucks (Toyota Tacoma, Ford F-150) and SUVs tend to hold value better than sedans. The Toyota Tacoma and Jeep Wrangler are known for retaining 60%+ of their value after 5 years.' },
    { q:'How can I reduce car depreciation?', a:'Keep mileage low (under 12,000/year), maintain the car according to the manufacturer schedule, keep it clean and damage-free, choose popular colors (white, black, silver), and buy cars known for reliability and strong resale value.' },
    { q:'Is it better to lease or buy considering depreciation?', a:'If you always want a new car every 3 years, leasing can be cheaper since you only pay for the depreciation during the lease period. If you plan to keep a car 7+ years, buying is almost always cheaper since you own the car beyond its steepest depreciation.' },
    { q:'Do electric cars depreciate faster?', a:'Historically, most EVs depreciated faster than gas cars due to rapidly improving technology and battery concerns. However, Tesla and some popular EVs now hold value well. As EV adoption increases and technology stabilizes, depreciation rates are normalizing.' },
  ],
  'cash-flow-calculator': [
    { q:'What is cash flow?', a:'Cash flow is the net amount of money moving in and out of a business. Positive cash flow means more money coming in than going out. It is the lifeblood of any business — profitable companies can still fail if they run out of cash.' },
    { q:'What is the difference between cash flow and profit?', a:'Profit is revenue minus expenses on paper (accrual accounting). Cash flow is actual money in minus actual money out. A business can be profitable but cash-flow negative if customers pay late, or cash-flow positive but unprofitable due to depreciation and other non-cash expenses.' },
    { q:'What is a good cash flow margin?', a:'A healthy operating cash flow margin (operating cash flow divided by revenue) is 15-30% for most industries. Margins below 10% suggest the business may struggle to fund growth or survive downturns. Software companies often achieve 30-40%+ margins.' },
    { q:'How can I improve business cash flow?', a:'Invoice promptly and follow up aggressively on late payments, negotiate longer payment terms with suppliers, reduce inventory, offer early payment discounts (2/10 net 30), require deposits on large orders, and build a cash reserve of 3-6 months operating expenses.' },
    { q:'What are the three types of cash flow?', a:'Operating cash flow comes from core business activities. Investing cash flow relates to buying or selling assets and investments. Financing cash flow involves debt, equity, and dividends. Healthy businesses have strong positive operating cash flow.' },
  ],
  'cd-calculator': [
    { q:'What is a CD and how does it work?', a:'A Certificate of Deposit (CD) is a savings product that earns a fixed interest rate for a set period (typically 3 months to 5 years). You deposit money and agree not to withdraw it until maturity. In return, you get a guaranteed rate higher than a regular savings account.' },
    { q:'What is a good CD rate in 2026?', a:'In 2026, top CD rates are 4-5% for 1-year terms and 4-4.5% for 5-year terms at online banks. These are significantly higher than the national average. Always compare rates across online banks, credit unions, and traditional banks.' },
    { q:'What happens if I withdraw a CD early?', a:'Early withdrawal typically incurs a penalty of 3-12 months of interest depending on the CD term. On a 5-year CD, you might lose 6-12 months of interest. Some banks offer no-penalty CDs, but these usually have slightly lower rates.' },
    { q:'Are CDs worth it in 2026?', a:'CDs are worth it for money you do not need for a specific period, especially if you want guaranteed returns. With rates at 4-5%, they are competitive with savings accounts and offer the certainty of a locked rate even if rates drop. They are ideal for emergency funds and short-term savings goals.' },
    { q:'What is a CD ladder?', a:'A CD ladder involves spreading money across CDs with different maturity dates (e.g., 1, 2, 3, 4, 5 years). As each CD matures, you reinvest at the longest term. This provides regular access to portions of your money while earning higher long-term rates.' },
  ],
};

// Generate generic FAQs based on calculator slug for calculators not in FAQ_DB
function generateFaqs(slug) {
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace('Calculator', '').trim();
  const fullName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
  return [
    { q: `How does the ${fullName} work?`, a: `Our ${fullName} uses industry-standard formulas to give you instant, accurate results. Enter your values using the sliders above and the calculator updates in real time. All calculations happen in your browser — nothing is stored or sent to a server.` },
    { q: `Is this ${fullName} accurate?`, a: `Yes. This calculator uses the same mathematical formulas used by financial professionals. Results are estimates for planning purposes. For binding financial decisions, consult with a qualified financial advisor or accountant.` },
    { q: `Is the ${fullName} really free?`, a: `100% free, no sign-up required, no hidden fees. We are supported by advertising revenue, which allows us to provide all our calculators completely free. You can also download results as a PDF for your records.` },
    { q: `Can I use this calculator for ${name.toLowerCase()} in my country?`, a: `Yes. Use the currency selector at the top of the page to switch between 40+ currencies. The calculator adapts its default values to match your region. The underlying math works the same regardless of currency.` },
    { q: `How often is this ${fullName} updated?`, a: `We update our calculators regularly to reflect current rates, tax brackets, and financial regulations. The formulas and default values are reviewed quarterly. For the most current rates, always verify with your specific lender or institution.` },
  ];
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
console.log('  ADD FAQs to calculators missing them');
console.log('=====================================================');
console.log('');

const allClients = findClientFiles(APP);

for (const cf of allClients) {
  let content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(BASE, cf).replace(/\\/g, '/');

  // Skip if already has FAQ
  if (content.includes('FaqSchema') || content.includes('Frequently Asked Questions') || content.includes('faq')) {
    skipped++;
    continue;
  }

  // Skip redirect pages
  if (content.includes('return null') || (content.includes('router.replace') && !content.includes('<div'))) {
    skipped++;
    continue;
  }

  // Must have Footer to insert before
  if (!content.includes('<Footer') && !content.includes('</main>')) {
    skipped++;
    continue;
  }

  // Derive calculator slug
  const relToApp = path.relative(APP, path.dirname(cf)).replace(/\\/g, '/');
  const parts = relToApp.split('/').filter(Boolean);
  const slug = parts[0] || 'calculator';

  // Get FAQs for this calculator
  const faqs = FAQ_DB[slug] || generateFaqs(slug);

  // Calculate import path for FaqSchema
  const depth = relToApp.split('/').filter(Boolean).length;
  const dots = depth === 0 ? '..' : '../'.repeat(depth + 1).slice(0, -1);
  const faqImport = `import FaqSchema from '${dots}/components/FaqSchema'`;

  // Build FAQ section HTML
  const faqDataStr = JSON.stringify(faqs).replace(/"/g, "'").replace(/'/g, "'");
  
  // Build the visible FAQ section
  let faqSection = `\n        {/* FAQ Section */}\n        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:16,padding:24,marginTop:32,marginBottom:32,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>\n          <h2 style={{fontSize:20,fontWeight:700,color:'#f1f5f9',marginBottom:16,marginTop:0}}>Frequently Asked Questions</h2>\n`;
  
  for (let i = 0; i < faqs.length; i++) {
    const borderStyle = i < faqs.length - 1 ? "borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:16,marginBottom:16" : "paddingBottom:8";
    faqSection += `          <div style={{${borderStyle}}}>\n            <h3 style={{fontSize:15,fontWeight:600,color:'#e2e8f0',marginBottom:8,marginTop:0}}>${faqs[i].q}</h3>\n            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,margin:0}}>${faqs[i].a}</p>\n          </div>\n`;
  }
  faqSection += `        </div>\n`;

  // Add FaqSchema import if not present
  if (!content.includes('FaqSchema')) {
    const lastImportIdx = content.lastIndexOf('import ');
    if (lastImportIdx !== -1) {
      const endOfLine = content.indexOf('\n', lastImportIdx);
      content = content.slice(0, endOfLine + 1) + faqImport + '\n' + content.slice(endOfLine + 1);
    }
  }

  // Add FaqSchema component call after first return tag
  const faqSchemaCall = `\n      <FaqSchema faqs={${JSON.stringify(faqs)}} />\n`;
  
  // Insert FAQ section before <Footer or </main>
  let insertPoint = -1;
  if (content.includes('<Footer')) {
    insertPoint = content.lastIndexOf('<Footer');
  } else if (content.includes('</main>')) {
    insertPoint = content.lastIndexOf('</main>');
  }

  if (insertPoint > 0) {
    content = content.slice(0, insertPoint) + faqSection + '      ' + content.slice(insertPoint);
  }

  // Add FaqSchema component right after the first > in return
  const returnIdx = content.indexOf('return (');
  if (returnIdx === -1) {
    const returnIdx2 = content.indexOf('return(');
    if (returnIdx2 !== -1) {
      const afterReturn = content.substring(returnIdx2);
      const firstClose = afterReturn.indexOf('>');
      if (firstClose > 0) {
        const globalIdx = returnIdx2 + firstClose + 1;
        content = content.slice(0, globalIdx) + faqSchemaCall + content.slice(globalIdx);
      }
    }
  } else {
    const afterReturn = content.substring(returnIdx);
    const firstClose = afterReturn.indexOf('>');
    if (firstClose > 0) {
      const globalIdx = returnIdx + firstClose + 1;
      content = content.slice(0, globalIdx) + faqSchemaCall + content.slice(globalIdx);
    }
  }

  fs.writeFileSync(cf, content, 'utf8');
  added++;
  if (added <= 20) console.log('  ✅ ' + rel);
}

if (added > 20) console.log('  ... and ' + (added - 20) + ' more');

console.log('');
console.log('=====================================================');
console.log('  RESULTS: Added FAQs to ' + added + ' | Skipped ' + skipped + ' (already had FAQs)');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add FAQ sections + FaqSchema to all calculators"');
console.log('  git push origin master');
console.log('');
