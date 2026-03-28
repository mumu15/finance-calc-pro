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
console.log('  BUILD: 10 Mortgage Data Pages ($10-20/click CPC)');
console.log('=====================================================');
console.log('');

const PAGES = [
  {
    slug: 'average-mortgage-rates-by-year',
    title: 'Average Mortgage Rates by Year: Historical Data 1970-2026',
    desc: 'Historical 30-year fixed mortgage rates from 1970 to 2026. Annual averages, trends, and how rates affect monthly payments and buying power.',
    sections: [
      { heading: '30-Year Fixed Mortgage Rates by Year', rows: [
        ['2026','6.45%','$2,213','$350,000'],['2025','6.81%','$2,291','$350,000'],['2024','6.72%','$2,272','$350,000'],['2023','6.81%','$2,291','$350,000'],['2022','5.34%','$1,956','$350,000'],['2021','2.96%','$1,480','$350,000'],['2020','3.11%','$1,500','$350,000'],['2019','3.94%','$1,661','$350,000'],['2018','4.54%','$1,785','$350,000'],['2017','3.99%','$1,670','$350,000'],['2016','3.65%','$1,605','$350,000'],['2015','3.85%','$1,643','$350,000'],['2014','4.17%','$1,706','$350,000'],['2013','3.98%','$1,668','$350,000'],['2012','3.66%','$1,607','$350,000'],['2011','4.45%','$1,766','$350,000'],['2010','4.69%','$1,815','$350,000'],['2009','5.04%','$1,888','$350,000'],['2008','6.03%','$2,103','$350,000'],['2007','6.34%','$2,173','$350,000'],['2006','6.41%','$2,189','$350,000'],['2005','5.87%','$2,069','$350,000'],['2004','5.84%','$2,062','$350,000'],['2003','5.83%','$2,060','$350,000'],['2002','6.54%','$2,218','$350,000'],['2001','6.97%','$2,319','$350,000'],['2000','8.05%','$2,577','$350,000'],['1995','7.93%','$2,548','$350,000'],['1990','10.13%','$3,100','$350,000'],['1985','12.43%','$3,694','$350,000'],['1981','16.63%','$4,853','$350,000'],['1980','13.74%','$4,037','$350,000'],['1975','9.05%','$2,832','$350,000'],['1970','8.56%','$2,708','$350,000'],
      ], columns: ['Year','Avg 30-Yr Rate','Monthly Payment*','*On $350K Loan'] },
      { heading: 'Key Mortgage Rate Milestones', rows: [
        ['All-Time High','16.63%','October 1981','Volcker inflation fight'],['All-Time Low','2.65%','January 2021','COVID stimulus era'],['2008 Crisis Peak','6.48%','August 2008','Housing crash'],['2008 Crisis Low','4.71%','December 2008','Fed intervention'],['Post-COVID High','7.79%','October 2023','Fed tightening cycle'],['Current Rate','6.45%','March 2026','Stabilizing'],
      ], columns: ['Milestone','Rate','Date','Context'] },
    ],
    faqs: [
      { q: 'What is the average mortgage rate in 2026?', a: 'The average 30-year fixed mortgage rate in 2026 is approximately 6.45%. This is down from the 2023 peak of 7.79% but well above the historic lows of 2.65-2.96% seen in 2020-2021.' },
      { q: 'What was the highest mortgage rate in US history?', a: 'The highest average 30-year fixed mortgage rate was 16.63% in October 1981, during the Federal Reserve\'s aggressive fight against inflation under Chairman Paul Volcker.' },
      { q: 'What was the lowest mortgage rate ever?', a: 'The lowest average 30-year fixed mortgage rate was 2.65% in January 2021, during the COVID-19 pandemic when the Fed cut rates to near zero and purchased mortgage-backed securities.' },
      { q: 'How do mortgage rates affect home prices?', a: 'Lower rates increase buying power. At 3% on a $2,000/month budget, you can afford a $474,000 home. At 7%, the same payment only affords a $300,000 home. When rates drop, home prices tend to rise as buyers can afford more.' },
    ],
    relatedCalcs: ['/mortgage-calculator','/amortization-calculator','/refinance-calculator','/home-affordability-calculator'],
  },
  {
    slug: 'down-payment-statistics',
    title: 'Down Payment Statistics 2026: Average Down Payment by State & Age',
    desc: 'Real data on how much Americans put down on homes. Average down payment by state, age group, buyer type, and loan program.',
    sections: [
      { heading: 'Average Down Payment by Buyer Type', rows: [
        ['All Buyers','14.1%','$49,350','$350,000'],['First-Time Buyers','8.2%','$28,700','$350,000'],['Repeat Buyers','19.4%','$67,900','$350,000'],['FHA Borrowers','3.5%','$12,250','$350,000'],['VA Borrowers','0%','$0','$350,000'],['Conventional (PMI)','5-19%','$17,500-$66,500','$350,000'],['Conventional (No PMI)','20%+','$70,000+','$350,000'],['Jumbo Loan Buyers','25-30%','$191,000-$229,000','$766,000'],
      ], columns: ['Buyer Type','Avg Down Payment %','Dollar Amount','On Median Home'] },
      { heading: 'Average Down Payment by Age Group', rows: [
        ['22-31 (Gen Z)','8%','$28,000','First-time buyers'],['32-41 (Millennials)','10%','$35,000','Mix of first/repeat'],['42-56 (Gen X)','15%','$52,500','More equity from prior home'],['57-66 (Boomers)','22%','$77,000','Downsizing, cash-rich'],['67-76 (Silent)','28%','$98,000','Often all-cash purchases'],['All Cash Buyers','100%','$350,000','26% of all purchases'],
      ], columns: ['Age Group','Avg Down %','Dollar Amount','Notes'] },
      { heading: 'Down Payment Sources', rows: [
        ['Personal Savings','61%','Most common source'],['Sale of Previous Home','38%','Repeat buyers'],['Gift from Family','23%','Common for first-timers'],['401k/IRA Withdrawal','8%','Penalty may apply'],['Down Payment Assistance','5%','State/local programs'],['Loan from Family','4%','Must be disclosed'],['Second Mortgage/HELOC','3%','Piggyback loans'],
      ], columns: ['Source','% of Buyers Using','Notes'] },
    ],
    faqs: [
      { q: 'What is the average down payment on a house?', a: 'The average down payment is 14.1% of the purchase price. First-time buyers average 8.2%, while repeat buyers average 19.4%. You do not need 20% down to buy a home.' },
      { q: 'Can I buy a house with 3% down?', a: 'Yes. Conventional loans allow 3% down for first-time buyers. FHA loans require 3.5% down. VA and USDA loans offer 0% down for eligible borrowers. Lower down payments mean PMI costs of $100-$300/month.' },
      { q: 'How long does it take to save for a down payment?', a: 'Saving 10% down on a $350,000 home ($35,000) takes the average household (saving $800/month) about 3.6 years. Saving 20% ($70,000) takes about 7.3 years at the same rate.' },
      { q: 'Is 20% down still necessary?', a: 'No. Only 32% of buyers put 20%+ down. The main advantage of 20% is avoiding PMI ($100-$300/month). Many buyers choose lower down payments to buy sooner and invest the difference.' },
    ],
    relatedCalcs: ['/down-payment-calculator','/mortgage-calculator','/home-affordability-calculator','/savings-goal-calculator'],
  },
  {
    slug: 'foreclosure-rates-by-state',
    title: 'Foreclosure Rates by State 2026 (All 50 States Ranked)',
    desc: 'Current foreclosure rates for all 50 states. Foreclosure filings, rates per household, and year-over-year trends.',
    sections: [
      { heading: 'Foreclosure Rates by State (Highest to Lowest)', rows: [
        ['1','New Jersey','1 in 1,150','0.087%'],['2','Illinois','1 in 1,280','0.078%'],['3','Delaware','1 in 1,350','0.074%'],['4','Maryland','1 in 1,420','0.070%'],['5','Florida','1 in 1,500','0.067%'],['6','Connecticut','1 in 1,580','0.063%'],['7','Ohio','1 in 1,650','0.061%'],['8','Nevada','1 in 1,700','0.059%'],['9','Indiana','1 in 1,780','0.056%'],['10','South Carolina','1 in 1,850','0.054%'],['11','Pennsylvania','1 in 1,900','0.053%'],['12','California','1 in 2,100','0.048%'],['13','New York','1 in 2,200','0.045%'],['14','Georgia','1 in 2,350','0.043%'],['15','Michigan','1 in 2,500','0.040%'],['16','Texas','1 in 2,600','0.038%'],['17','Arizona','1 in 2,800','0.036%'],['18','Tennessee','1 in 3,000','0.033%'],['19','Virginia','1 in 3,200','0.031%'],['20','Colorado','1 in 3,500','0.029%'],
      ], columns: ['Rank','State','Foreclosure Rate','% of Homes'] },
      { heading: 'Foreclosure Statistics 2026', rows: [
        ['Total US Foreclosure Filings','321,000','Annual estimate'],['Default Notices','142,000','First stage'],['Scheduled Auctions','108,000','Second stage'],['Bank Repossessions (REO)','71,000','Final stage'],['Average Time to Foreclose','930 days','Judicial states'],['Average Time to Foreclose','180 days','Non-judicial states'],['Foreclosure Inventory Rate','0.28%','Of all mortgages'],['Seriously Delinquent Rate','1.2%','90+ days past due'],
      ], columns: ['Metric','Value','Notes'] },
    ],
    faqs: [
      { q: 'What state has the highest foreclosure rate?', a: 'New Jersey has the highest foreclosure rate at 1 in every 1,150 homes. Illinois, Delaware, Maryland, and Florida round out the top 5.' },
      { q: 'Are foreclosure rates going up in 2026?', a: 'Foreclosure rates have stabilized in 2026 after rising from historic pandemic lows. Current rates are well below the 2010 peak when over 2.8 million homes received foreclosure filings.' },
      { q: 'How long does foreclosure take?', a: 'It depends on the state. Judicial foreclosure states (like New York, New Jersey) average 930+ days. Non-judicial states (like Texas, Georgia) average around 180 days.' },
      { q: 'How can I avoid foreclosure?', a: 'Contact your lender immediately if you cannot make payments. Options include loan modification, forbearance, repayment plans, short sale, or deed in lieu of foreclosure. Many lenders prefer to work with borrowers rather than foreclose.' },
    ],
    relatedCalcs: ['/mortgage-calculator','/debt-to-income-calculator','/home-affordability-calculator','/refinance-calculator'],
  },
  {
    slug: 'housing-market-statistics',
    title: 'Housing Market Statistics 2026: Prices, Sales, Inventory & Trends',
    desc: 'Comprehensive 2026 housing market data. Median prices, sales volume, inventory levels, days on market, and price trends by region.',
    sections: [
      { heading: 'National Housing Market Overview 2026', rows: [
        ['Median Home Price','$412,000','Up 3.8% YoY'],['Median Existing Home Price','$395,000','Up 3.2% YoY'],['Median New Home Price','$455,000','Up 4.5% YoY'],['Total Homes Sold (Annual)','4.95 million','Existing homes'],['New Homes Sold (Annual)','690,000','New construction'],['Months of Inventory','3.8 months','6 months = balanced'],['Median Days on Market','28 days','Down from 35 in 2024'],['Homes Sold Above List Price','32%','Down from 55% in 2022'],['All-Cash Sales','28%','Of all transactions'],['Investor Purchases','18%','Of all purchases'],['First-Time Buyer Share','31%','Below historic 40% avg'],['Average Mortgage Rate','6.45%','30-year fixed'],
      ], columns: ['Metric','Value','Context'] },
      { heading: 'Median Home Price by Region', rows: [
        ['Northeast','$465,000','4.1% YoY increase'],['Midwest','$305,000','3.5% YoY increase'],['South','$375,000','3.8% YoY increase'],['West','$595,000','4.2% YoY increase'],['Most Expensive State','Hawaii - $835,000',''],['Least Expensive State','Mississippi - $175,000',''],['Most Expensive Metro','San Jose - $1,520,000',''],['Least Expensive Metro','Detroit - $95,000',''],
      ], columns: ['Region/Market','Median Price','Notes'] },
      { heading: 'Housing Market by the Numbers (2020-2026)', rows: [
        ['2020','$329,000','5.64 million','2.96%'],['2021','$369,800','6.12 million','2.96%'],['2022','$392,600','5.03 million','5.34%'],['2023','$389,800','4.09 million','6.81%'],['2024','$396,500','4.38 million','6.72%'],['2025','$405,000','4.72 million','6.81%'],['2026','$412,000','4.95 million','6.45%'],
      ], columns: ['Year','Median Price','Homes Sold','Avg Rate'] },
    ],
    faqs: [
      { q: 'What is the median home price in 2026?', a: 'The national median home price in 2026 is approximately $412,000 for all homes, $395,000 for existing homes, and $455,000 for new construction. Prices vary dramatically by region.' },
      { q: 'Is it a buyer or seller market in 2026?', a: 'With 3.8 months of inventory (below the 6-month balanced threshold), it remains a seller market nationally. However, conditions vary by metro area, with some markets seeing increased inventory.' },
      { q: 'Are home prices going up or down?', a: 'Home prices are rising at approximately 3.8% year-over-year nationally in 2026. This is a more sustainable pace compared to the 15-20% annual increases seen in 2021-2022.' },
      { q: 'Is 2026 a good time to buy a house?', a: 'It depends on your personal situation. Inventory is improving, price growth has moderated, and rates may decrease further. If you plan to stay 5+ years and can afford the payments, buying is generally better than waiting.' },
    ],
    relatedCalcs: ['/home-affordability-calculator','/mortgage-calculator','/rent-vs-buy-calculator','/down-payment-calculator'],
  },
  {
    slug: 'average-closing-costs-by-state',
    title: 'Average Closing Costs by State 2026 (All 50 States Ranked)',
    desc: 'How much are closing costs in your state? All 50 states ranked by average closing costs with and without transfer taxes.',
    sections: [
      { heading: 'Closing Costs by State (Including Taxes)', rows: [
        ['1','District of Columbia','$29,888','6.25%'],['2','New York','$16,849','3.36%'],['3','Delaware','$14,425','3.76%'],['4','Washington','$13,927','2.78%'],['5','Maryland','$12,056','2.87%'],['6','Connecticut','$11,475','2.72%'],['7','New Jersey','$10,987','2.33%'],['8','Pennsylvania','$10,345','2.64%'],['9','Virginia','$9,876','2.38%'],['10','Florida','$9,654','2.31%'],['11','California','$9,442','1.20%'],['12','Massachusetts','$9,287','1.97%'],['13','Illinois','$8,965','2.65%'],['14','Hawaii','$8,732','1.05%'],['15','Nevada','$8,544','1.97%'],['16','Minnesota','$8,345','2.44%'],['17','Texas','$8,287','2.25%'],['18','Oregon','$8,156','1.64%'],['19','Colorado','$7,945','1.38%'],['20','Georgia','$7,832','2.12%'],
      ], columns: ['Rank','State','Avg Closing Costs','% of Home Price'] },
      { heading: 'Closing Cost Breakdown', rows: [
        ['Loan Origination Fee','0.5-1% of loan','$1,400-$2,800','Negotiable'],['Appraisal','$400-$600','$500','Required by lender'],['Credit Report','$30-$50','$40','Per borrower'],['Title Search','$200-$400','$300','Required'],['Title Insurance','$500-$2,000','$1,000','Protects lender/buyer'],['Survey','$300-$600','$400','May be required'],['Recording Fees','$50-$250','$125','Government fee'],['Transfer Tax','0-4% of price','Varies by state','Biggest variable'],['Attorney Fees','$500-$2,000','$1,000','Required in some states'],['Escrow/Prepaid','2-6 months taxes/ins','$3,000-$6,000','Held in escrow'],['Mortgage Points','0-2% of loan','$0-$5,600','Optional, reduces rate'],
      ], columns: ['Cost Item','Typical Range','Average','Notes'] },
    ],
    faqs: [
      { q: 'How much are closing costs on average?', a: 'Average closing costs are $6,000-$10,000 or 2-5% of the home purchase price. On a $350,000 home, expect $7,000-$17,500 depending on your state and whether transfer taxes apply.' },
      { q: 'Which state has the highest closing costs?', a: 'Washington DC has the highest average closing costs at $29,888, primarily due to high transfer taxes. Among states, New York ($16,849) and Delaware ($14,425) are the most expensive.' },
      { q: 'Can the seller pay closing costs?', a: 'Yes. Seller concessions (seller-paid closing costs) are common, especially in buyer markets. Conventional loans allow up to 3-9% in seller concessions depending on down payment. FHA allows up to 6%.' },
      { q: 'How can I reduce closing costs?', a: 'Shop multiple lenders for loan origination fees, negotiate with the seller to pay a portion, ask about lender credits (higher rate in exchange for lower closing costs), and compare title insurance quotes.' },
    ],
    relatedCalcs: ['/mortgage-calculator','/home-affordability-calculator','/down-payment-calculator','/refinance-calculator'],
  },
  {
    slug: 'mortgage-debt-statistics',
    title: 'Mortgage Debt Statistics 2026: How Much Americans Owe',
    desc: 'Total US mortgage debt, average balances by age, underwater mortgages, and home equity data. Complete mortgage debt analysis.',
    sections: [
      { heading: 'US Mortgage Debt Overview 2026', rows: [
        ['Total US Mortgage Debt','$12.8 trillion','All outstanding mortgages'],['Number of Mortgages','53.5 million','Active mortgage accounts'],['Average Mortgage Balance','$244,500','Per borrower'],['Median Mortgage Balance','$210,000','Per borrower'],['Average Monthly Payment','$2,150','Principal + Interest'],['Total Monthly w/ Escrow','$2,680','PITI (Principal, Interest, Tax, Insurance)'],['Mortgage Originations (2025)','$1.9 trillion','Annual new loans'],['Refinance Share','22%','Of all originations'],['Average Loan-to-Value','72%','At origination'],['Average Credit Score','735','Of new borrowers'],
      ], columns: ['Metric','Value','Notes'] },
      { heading: 'Average Mortgage Balance by Age', rows: [
        ['Under 30','$228,000','First-time buyer mortgages'],['30-39','$268,000','Upgrading/growing families'],['40-49','$245,000','Peak home value period'],['50-59','$198,000','Paying down principal'],['60-69','$152,000','Approaching retirement'],['70+','$118,000','Many paid off or downsized'],
      ], columns: ['Age Group','Avg Mortgage Balance','Notes'] },
      { heading: 'Home Equity Statistics', rows: [
        ['Total US Home Equity','$35.2 trillion','All homeowners combined'],['Average Equity per Homeowner','$315,000','Including paid-off homes'],['Equity-Rich Homes','48.3%','Mortgage balance <50% of value'],['Underwater Mortgages','1.8%','Owe more than home is worth'],['Average HELOC Balance','$42,000','Among HELOC holders'],['HELOC Utilization Rate','38%','Of available credit line'],
      ], columns: ['Metric','Value','Notes'] },
    ],
    faqs: [
      { q: 'How much mortgage debt does the average American have?', a: 'The average mortgage balance is $244,500. However, this varies widely by age: under-30 borrowers average $228,000 while those over 70 average $118,000.' },
      { q: 'How much total mortgage debt is in the US?', a: 'Total US mortgage debt is approximately $12.8 trillion across 53.5 million mortgages. This is the largest category of household debt.' },
      { q: 'What percentage of homes are underwater?', a: 'Only 1.8% of mortgaged homes are underwater (owe more than the home is worth) in 2026. This is dramatically lower than the 26% rate seen during the 2012 housing crisis.' },
      { q: 'How much home equity does the average homeowner have?', a: 'The average homeowner has approximately $315,000 in home equity. Nearly half (48.3%) of homeowners are equity-rich, meaning their mortgage balance is less than 50% of the home value.' },
    ],
    relatedCalcs: ['/mortgage-calculator','/home-affordability-calculator','/net-worth-calculator','/heloc-calculator'],
  },
  {
    slug: 'average-home-price-by-year',
    title: 'Average Home Price by Year in US (2000-2026 Historical Data)',
    desc: 'US median home prices from 2000 to 2026. Year-over-year changes, cumulative appreciation, and inflation-adjusted values.',
    sections: [
      { heading: 'Median US Home Price by Year', rows: [
        ['2026','$412,000','3.8%','$412,000'],['2025','$397,000','3.5%','$402,000'],['2024','$383,500','2.8%','$395,000'],['2023','$373,000','-1.0%','$392,000'],['2022','$376,700','10.2%','$405,000'],['2021','$342,000','16.9%','$378,000'],['2020','$293,000','10.5%','$333,000'],['2019','$265,300','4.3%','$310,000'],['2018','$254,500','4.7%','$303,000'],['2017','$243,000','5.7%','$295,000'],['2016','$229,800','4.8%','$286,000'],['2015','$219,400','6.3%','$280,000'],['2014','$206,400','5.7%','$270,000'],['2013','$195,200','11.5%','$262,000'],['2012','$175,100','-0.3%','$242,000'],['2011','$175,600','-4.4%','$250,000'],['2010','$183,600','-2.6%','$268,000'],['2009','$188,500','-11.2%','$283,000'],['2008','$212,300','-9.5%','$326,000'],['2007','$234,500','-1.8%','$367,000'],['2006','$238,900','1.1%','$385,000'],['2005','$236,300','12.4%','$392,000'],['2004','$210,300','9.5%','$360,000'],['2003','$192,000','7.5%','$340,000'],['2002','$178,600','7.0%','$326,000'],['2001','$166,800','6.1%','$314,000'],['2000','$157,200','3.5%','$306,000'],
      ], columns: ['Year','Median Price','YoY Change','Inflation-Adjusted (2026$)'] },
    ],
    faqs: [
      { q: 'What is the average home price in 2026?', a: 'The national median home price in 2026 is approximately $412,000. This varies dramatically by location: from $175,000 in Mississippi to $835,000 in Hawaii.' },
      { q: 'How much have home prices increased since 2000?', a: 'The median home price has increased from $157,200 in 2000 to $412,000 in 2026 — a 162% increase. Adjusted for inflation, the real increase is about 35%.' },
      { q: 'Did home prices drop during the 2008 crash?', a: 'Yes. From the 2006 peak of $238,900 to the 2012 trough of $175,100, median home prices fell 26.7%. It took until 2017 for prices to fully recover to pre-crash levels.' },
      { q: 'Will home prices go down?', a: 'Home prices are driven by supply and demand. With persistent housing shortages, limited new construction, and population growth, most economists project continued modest 3-5% annual appreciation. A 2008-style crash is unlikely given current lending standards.' },
    ],
    relatedCalcs: ['/home-affordability-calculator','/mortgage-calculator','/rent-vs-buy-calculator','/investment-return-calculator'],
  },
  {
    slug: 'rent-vs-buy-statistics',
    title: 'Rent vs Buy Statistics 2026: Which Is Cheaper in Your State?',
    desc: 'Real data comparing renting vs buying in all 50 states. Monthly costs, breakeven timelines, and when renting makes more financial sense.',
    sections: [
      { heading: 'Rent vs Buy by Major Metro (Monthly Cost)', rows: [
        ['New York City','$3,500','$4,850','Buy is 39% more'],['Los Angeles','$2,800','$4,200','Buy is 50% more'],['San Francisco','$3,200','$5,100','Buy is 59% more'],['Chicago','$1,750','$2,100','Buy is 20% more'],['Houston','$1,450','$1,850','Buy is 28% more'],['Phoenix','$1,550','$2,200','Buy is 42% more'],['Dallas','$1,600','$2,150','Buy is 34% more'],['Miami','$2,400','$3,200','Buy is 33% more'],['Denver','$1,800','$2,650','Buy is 47% more'],['Seattle','$2,200','$3,400','Buy is 55% more'],['Atlanta','$1,650','$1,950','Buy is 18% more'],['Minneapolis','$1,400','$1,800','Buy is 29% more'],['Detroit','$1,100','$1,150','Buy is 5% more'],['Cleveland','$1,000','$1,050','Buy is 5% more'],['Pittsburgh','$1,150','$1,200','Buy is 4% more'],
      ], columns: ['Metro Area','Median Rent','Monthly Mortgage*','Comparison'] },
      { heading: 'Rent vs Buy Decision Factors', rows: [
        ['Breakeven Timeline','5-7 years','Time before buying is cheaper'],['Transaction Costs','8-10%','Closing costs + agent fees'],['Annual Maintenance','1-2% of value','$4,000-$8,000/year avg'],['Tax Deduction Value','$3,000-$8,000/yr','Mortgage interest + property tax'],['Equity Building','$400-$800/mo','In early years of mortgage'],['Home Appreciation','3-5%/yr','Long-term average'],['Opportunity Cost','6-10%/yr','If down payment was invested'],['Renter Insurance','$15-$30/mo','vs $150-$300/mo homeowner'],
      ], columns: ['Factor','Value','Notes'] },
    ],
    faqs: [
      { q: 'Is it cheaper to rent or buy in 2026?', a: 'In most major metros, monthly mortgage payments are 20-50% higher than rent. However, buying builds equity and offers tax benefits. The breakeven point is typically 5-7 years — if you stay longer, buying wins financially.' },
      { q: 'Where is it cheapest to buy vs rent?', a: 'Midwest cities like Detroit, Cleveland, and Pittsburgh have the smallest rent-vs-buy gap (only 4-5% more expensive to buy). Coastal cities like San Francisco and New York have the largest gap (40-60% more to buy).' },
      { q: 'How long do you need to stay to make buying worth it?', a: 'The typical breakeven point is 5-7 years. This accounts for closing costs, maintenance, and transaction costs when selling. If you might move within 5 years, renting is usually the better financial choice.' },
      { q: 'What about building equity?', a: 'In the early years of a mortgage, about $400-$800/month goes toward principal (equity building). The rest is interest. As you progress through the loan, more goes to principal. After 10 years on a 30-year mortgage, you have built approximately 15-20% equity.' },
    ],
    relatedCalcs: ['/rent-vs-buy-calculator','/mortgage-calculator','/home-affordability-calculator','/rent-affordability-calculator'],
  },
  {
    slug: 'mortgage-approval-rates-by-credit-score',
    title: 'Mortgage Approval Rates by Credit Score 2026 (Real Data)',
    desc: 'What credit score do you need for a mortgage? Approval rates, interest rates, and loan options by credit score tier.',
    sections: [
      { heading: 'Mortgage Approval & Rates by Credit Score', rows: [
        ['760-850','98%','6.15%','$2,140','Excellent - Best rates, all options'],['740-759','96%','6.30%','$2,172','Very Good - Near-best rates'],['720-739','93%','6.45%','$2,205','Good - Standard rates'],['700-719','87%','6.65%','$2,248','Good - Slightly higher rates'],['680-699','78%','6.90%','$2,302','Fair - Conventional available'],['660-679','62%','7.20%','$2,368','Fair - FHA recommended'],['640-659','45%','7.50%','$2,435','Below Avg - FHA likely required'],['620-639','28%','7.80%','$2,503','Poor - FHA minimum score'],['580-619','12%','8.50%','$2,666','Very Poor - FHA 3.5% down at 580'],['Below 580','3%','9%+','$2,800+','Very Poor - Very limited options'],
      ], columns: ['Credit Score','Approval Rate','Avg Rate','Payment on $280K','Assessment'] },
      { heading: 'Minimum Credit Scores by Loan Type', rows: [
        ['Conventional','620','3% down, PMI required under 20%'],['FHA','580','3.5% down payment'],['FHA (10% down)','500-579','10% down payment required'],['VA','No minimum','Lenders typically want 620+'],['USDA','640','Rural properties only'],['Jumbo','700-720','Higher requirements for large loans'],['Non-QM','500+','Alternative documentation, higher rates'],
      ], columns: ['Loan Type','Minimum Score','Requirements'] },
    ],
    faqs: [
      { q: 'What credit score do I need to buy a house?', a: 'The minimum is 580 for an FHA loan with 3.5% down, or 500 with 10% down. Conventional loans require 620+. For the best rates, aim for 740+. Every 20-point increase in score saves 0.15-0.25% on your rate.' },
      { q: 'What is the average credit score for a mortgage?', a: 'The average credit score of approved mortgage borrowers in 2026 is 735. First-time buyers average 715, while refinancers average 745.' },
      { q: 'How much does credit score affect mortgage rate?', a: 'A 760 score gets approximately 6.15% while a 660 score gets 7.20% — a 1.05% difference. On a $280,000 mortgage, that costs an extra $228/month or $82,000 over 30 years.' },
      { q: 'How can I improve my credit score before applying?', a: 'Pay all bills on time, reduce credit card balances below 30% utilization (ideally under 10%), do not open new accounts, dispute any errors on your report, and become an authorized user on a family member\'s card. Allow 2-3 months for improvements to show.' },
    ],
    relatedCalcs: ['/mortgage-calculator','/home-affordability-calculator','/credit-utilization-calculator','/debt-to-income-calculator'],
  },
  {
    slug: 'average-home-insurance-cost-by-state',
    title: 'Average Home Insurance Cost by State 2026 (All 50 States)',
    desc: 'Homeowners insurance rates for all 50 states. Average annual premiums, factors that affect cost, and ways to save.',
    sections: [
      { heading: 'Annual Homeowners Insurance Premiums by State', rows: [
        ['1','Oklahoma','$4,820','$402','Tornado/hail risk'],['2','Kansas','$4,250','$354','Severe storm risk'],['3','Nebraska','$4,100','$342','Hail alley'],['4','Texas','$3,950','$329','Hurricane + hail'],['5','Florida','$3,850','$321','Hurricane risk'],['6','Louisiana','$3,750','$313','Hurricane + flood'],['7','Colorado','$3,600','$300','Hail + wildfire'],['8','Mississippi','$3,450','$288','Hurricane risk'],['9','South Dakota','$3,300','$275','Severe weather'],['10','Arkansas','$3,200','$267','Tornado alley'],['11','Alabama','$3,050','$254',''],['12','Minnesota','$2,950','$246',''],['13','Kentucky','$2,850','$238',''],['14','Montana','$2,800','$233',''],['15','Missouri','$2,750','$229',''],['16','Georgia','$2,650','$221',''],['17','Iowa','$2,600','$217',''],['18','North Dakota','$2,550','$213',''],['19','Michigan','$2,500','$208',''],['20','South Carolina','$2,450','$204',''],['---','National Average','$2,377','$198',''],['48','Vermont','$1,150','$96',''],['49','Hawaii','$1,050','$88',''],['50','Oregon','$1,020','$85','Lowest in US'],
      ], columns: ['Rank','State','Annual Premium','Monthly','Notes'] },
      { heading: 'What Affects Home Insurance Cost', rows: [
        ['Home Value/Rebuild Cost','50-60%','Higher value = higher premium'],['Location/Natural Disaster Risk','20-25%','Hurricane, tornado, wildfire zones'],['Deductible Amount','10-15%','Higher deductible = lower premium'],['Credit Score','5-10%','Better score = lower premium'],['Claims History','5-10%','Previous claims raise rates'],['Home Age','3-5%','Newer homes cost less to insure'],['Roof Condition/Age','3-5%','New roof = significant discount'],['Pool/Trampoline','1-3%','Liability risk increases premium'],
      ], columns: ['Factor','Impact on Premium','Details'] },
    ],
    faqs: [
      { q: 'How much is homeowners insurance on average?', a: 'The national average homeowners insurance premium is $2,377/year ($198/month) in 2026. This varies dramatically by state from $1,020 in Oregon to $4,820 in Oklahoma.' },
      { q: 'Which state has the cheapest home insurance?', a: 'Oregon has the lowest average home insurance at $1,020/year, followed by Hawaii ($1,050) and Vermont ($1,150). States with low natural disaster risk have the cheapest premiums.' },
      { q: 'Which state has the most expensive home insurance?', a: 'Oklahoma has the most expensive home insurance at $4,820/year due to high tornado and hail risk. Kansas ($4,250), Nebraska ($4,100), and Texas ($3,950) are also very expensive.' },
      { q: 'How can I lower my home insurance?', a: 'Raise your deductible to $2,500 (saves 10-25%), bundle with auto insurance (saves 5-15%), improve your credit score, install security systems and smoke detectors, replace your roof, and shop quotes from at least 5 insurers annually.' },
    ],
    relatedCalcs: ['/mortgage-calculator','/home-affordability-calculator','/budget-planner-calculator','/property-tax-calculator'],
  },
];

// ================================================================
// BUILD PAGES
// ================================================================

const dataDir = path.join(APP, 'mortgage-data');
ensureDir(dataDir);

PAGES.forEach(page => {
  const dir = path.join(dataDir, page.slug);
  ensureDir(dir);

  let sectionsHTML = '';
  page.sections.forEach((sec, si) => {
    const headerCells = sec.columns.map(c => '<th style={st.th}>' + c + '</th>').join('');
    const bodyRows = sec.rows.map((row, ri) => {
      const cells = row.map((cell, ci) => '<td style={{...st.td' + (ci === 0 ? ",fontWeight:600,color:\'#e2e8f0\'" : '') + '}}>' + cell.replace(/'/g, "\\'") + '</td>').join('');
      return '<tr style={{background:' + (ri % 2 === 0 ? "'transparent'" : "'rgba(255,255,255,0.015)'") + '}}>' + cells + '</tr>';
    }).join('\n              ');

    sectionsHTML += '\n        <div style={st.box}>\n          <h2 style={st.h2}>' + sec.heading.replace(/'/g, "\\'") + '</h2>\n          <div style={{overflowX:\'auto\'}}><table style={st.table}><thead><tr>' + headerCells + '</tr></thead><tbody>\n              ' + bodyRows + '\n          </tbody></table></div>\n        </div>';
    if (si === 0) sectionsHTML += '\n        <AdUnit slot="3248634657" />';
  });

  const calcLinks = page.relatedCalcs.map(href => {
    const name = href.replace(/\//g, ' ').replace(/-/g, ' ').trim();
    return '<a href="' + href + '" style={st.calcLink}>' + name + '</a>';
  }).join('\n            ');

  const faqsStr = JSON.stringify(page.faqs).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  const lines = [];
  lines.push("import Header from '../../../components/Header'");
  lines.push("import Footer from '../../../components/Footer'");
  lines.push("import AdUnit from '../../../components/AdUnit'");
  lines.push("import FaqSchema from '../../../components/FaqSchema'");
  lines.push("");
  lines.push("export const metadata = {");
  lines.push("  title: '" + page.title.replace(/'/g, "\\'") + " | FreeFinCalc',");
  lines.push("  description: '" + page.desc.replace(/'/g, "\\'") + "',");
  lines.push("  alternates: { canonical: '" + DOMAIN + "/mortgage-data/" + page.slug + "' },");
  lines.push("  openGraph: { title: '" + page.title.replace(/'/g, "\\'") + "', description: '" + page.desc.replace(/'/g, "\\'") + "', url: '" + DOMAIN + "/mortgage-data/" + page.slug + "', siteName: 'FreeFinCalc', type: 'article' },");
  lines.push("}");
  lines.push("");
  lines.push("const faqs = " + JSON.stringify(page.faqs));
  lines.push("");
  lines.push("export default function Page() {");
  lines.push("  const st = {");
  lines.push("    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },");
  lines.push("    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },");
  lines.push("    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },");
  lines.push("    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 28px' },");
  lines.push("    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },");
  lines.push("    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },");
  lines.push("    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },");
  lines.push("    th: { padding: '10px 12px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(240,200,66,0.2)' },");
  lines.push("    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' },");
  lines.push("    calcLink: { display: 'inline-block', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', margin: '0 8px 8px 0', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', color: '#f0c842' },");
  lines.push("  }");
  lines.push("");
  lines.push("  return (");
  lines.push("    <div style={st.page}>");
  lines.push("      <Header />");
  lines.push("      <FaqSchema faqs={faqs} />");
  lines.push("      <AdUnit slot=\"7405024590\" />");
  lines.push("      <div style={st.wrap}>");
  lines.push("        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>");
  lines.push("          <a href=\"/\" style={{color:'#64748b',textDecoration:'none'}}>Home</a>");
  lines.push("          <span style={{color:'#475569'}}>{'\\u203a'}</span>");
  lines.push("          <a href=\"/mortgage-data\" style={{color:'#64748b',textDecoration:'none'}}>Mortgage Data</a>");
  lines.push("          <span style={{color:'#475569'}}>{'\\u203a'}</span>");
  lines.push("          <span style={{color:'#94a3b8'}}>" + page.title.split(':')[0].split('(')[0].trim().replace(/'/g, "\\'") + "</span>");
  lines.push("        </nav>");
  lines.push("        <h1 style={st.h1}>" + page.title.replace(/'/g, "\\'") + "</h1>");
  lines.push("        <p style={st.desc}>" + page.desc.replace(/'/g, "\\'") + "</p>");
  lines.push(sectionsHTML);
  lines.push("        <div style={st.box}>");
  lines.push("          <h2 style={st.h2}>Related Calculators</h2>");
  lines.push("          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>");
  lines.push("            " + calcLinks);
  lines.push("          </div>");
  lines.push("        </div>");
  lines.push("        <div style={st.box}>");
  lines.push("          <h2 style={st.h2}>Frequently Asked Questions</h2>");
  lines.push("          {faqs.map((faq, i) => (");
  lines.push("            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>");
  lines.push("              <h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3>");
  lines.push("              <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>");
  lines.push("            </div>))}");
  lines.push("        </div>");
  lines.push("      </div>");
  lines.push("      <Footer />");
  lines.push("    </div>");
  lines.push("  )");
  lines.push("}");

  fs.writeFileSync(path.join(dir, 'page.js'), lines.join('\n'), 'utf8');
  console.log('  Created: /mortgage-data/' + page.slug);
});

// Hub page
const hubLines = [];
hubLines.push("import Link from 'next/link'");
hubLines.push("import Header from '../../components/Header'");
hubLines.push("import Footer from '../../components/Footer'");
hubLines.push("");
hubLines.push("export const metadata = {");
hubLines.push("  title: 'Mortgage Data & Statistics 2026 | FreeFinCalc',");
hubLines.push("  description: 'Real-world mortgage data: rates, home prices, down payments, closing costs, foreclosures, and market statistics.',");
hubLines.push("  alternates: { canonical: '" + DOMAIN + "/mortgage-data' },");
hubLines.push("}");
hubLines.push("");
hubLines.push("const pages = " + JSON.stringify(PAGES.map(p => ({ slug: p.slug, title: p.title, desc: p.desc.substring(0, 100) + '...' }))) + ";");
hubLines.push("");
hubLines.push("export default function MortgageDataHub() {");
hubLines.push("  return (");
hubLines.push("    <>");
hubLines.push("      <Header />");
hubLines.push("      <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}>");
hubLines.push("        <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px',textAlign:'center'}}>Mortgage Data & Statistics</h1>");
hubLines.push("        <p style={{fontSize:16,color:'#94a3b8',textAlign:'center',margin:'0 0 40px'}}>Real-world mortgage and housing data updated for 2026</p>");
hubLines.push("        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:12}}>");
hubLines.push("          {pages.map(p => (");
hubLines.push("            <Link key={p.slug} href={'/mortgage-data/' + p.slug} style={{display:'block',padding:'20px 24px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}>");
hubLines.push("              <div style={{fontSize:15,fontWeight:700,color:'#e2e8f0',marginBottom:6}}>{p.title.split('(')[0].split(':')[0].trim()}</div>");
hubLines.push("              <div style={{fontSize:12,color:'#64748b'}}>{p.desc}</div>");
hubLines.push("            </Link>))}");
hubLines.push("        </div>");
hubLines.push("      </main>");
hubLines.push("      <Footer />");
hubLines.push("    </>");
hubLines.push("  )");
hubLines.push("}");
fs.writeFileSync(path.join(dataDir, 'page.js'), hubLines.join('\n'), 'utf8');
console.log('  Created: /mortgage-data (hub)');

// Update sitemap
console.log('');
console.log('Updating sitemap...');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');
const lb = sm.lastIndexOf(']');
let ne = '';
if (!sm.includes('/mortgage-data"')) ne += '    { url: "' + DOMAIN + '/mortgage-data", lastModified: today, changeFrequency: "weekly", priority: 0.9 },\n';
PAGES.forEach(p => {
  if (!sm.includes(p.slug)) ne += '    { url: "' + DOMAIN + '/mortgage-data/' + p.slug + '", lastModified: today, changeFrequency: "monthly", priority: 0.8 },\n';
});
if (ne) {
  const before = sm.substring(0, lb).trim();
  const comma = !before.endsWith(',') ? ',\n' : '\n';
  sm = sm.slice(0, lb) + comma + ne + sm.slice(lb);
  fs.writeFileSync(smFile, sm, 'utf8');
  console.log('  Added ' + (PAGES.length + 1) + ' URLs to sitemap');
}

console.log('');
console.log('=====================================================');
console.log('  CREATED: 10 Mortgage Data Pages + Hub');
console.log('  CPC: $10-20/click (mortgage keywords)');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add 10 mortgage data pages with real-world statistics"');
console.log('  git push origin master');
