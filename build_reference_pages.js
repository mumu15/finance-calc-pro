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
console.log('  BUILD: Ultra-High Volume Reference Pages');
console.log('  Targeting 100K-500K+ monthly searches each');
console.log('=====================================================');
console.log('');

// These are standalone pages (not dynamic routes) because each has unique data
const PAGES = [
  {
    slug: 'minimum-wage-by-state',
    title: 'Minimum Wage by State 2026 (All 50 States + Federal)',
    desc: 'Current minimum wage rates for all 50 states and federal. Updated for 2026 with tipped wages, scheduled increases, and cost-of-living adjusted rankings.',
    searchVol: '300K+/mo',
    data: [
      { state: 'Alabama', rate: 7.25, tipped: 2.13, note: 'Federal rate (no state minimum)' },
      { state: 'Alaska', rate: 11.73, tipped: 11.73, note: 'No tip credit allowed' },
      { state: 'Arizona', rate: 14.35, tipped: 11.35, note: 'Adjusted annually for inflation' },
      { state: 'Arkansas', rate: 11.00, tipped: 2.63, note: '' },
      { state: 'California', rate: 16.50, tipped: 16.50, note: 'No tip credit. Highest large state.' },
      { state: 'Colorado', rate: 14.42, tipped: 11.39, note: 'Adjusted annually for inflation' },
      { state: 'Connecticut', rate: 16.35, tipped: 6.38, note: '' },
      { state: 'Delaware', rate: 13.25, tipped: 2.23, note: '' },
      { state: 'Florida', rate: 13.00, tipped: 9.98, note: 'Increasing $1/year until $15' },
      { state: 'Georgia', rate: 7.25, tipped: 2.13, note: 'State rate $5.15, federal applies' },
      { state: 'Hawaii', rate: 14.00, tipped: 12.75, note: '' },
      { state: 'Idaho', rate: 7.25, tipped: 3.35, note: 'Federal rate' },
      { state: 'Illinois', rate: 14.00, tipped: 8.40, note: '' },
      { state: 'Indiana', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
      { state: 'Iowa', rate: 7.25, tipped: 4.35, note: 'Federal rate' },
      { state: 'Kansas', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
      { state: 'Kentucky', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
      { state: 'Louisiana', rate: 7.25, tipped: 2.13, note: 'No state minimum, federal applies' },
      { state: 'Maine', rate: 14.15, tipped: 7.08, note: '' },
      { state: 'Maryland', rate: 15.00, tipped: 3.63, note: '' },
      { state: 'Massachusetts', rate: 15.00, tipped: 6.75, note: '' },
      { state: 'Michigan', rate: 12.48, tipped: 3.84, note: '' },
      { state: 'Minnesota', rate: 11.13, tipped: 11.13, note: 'No tip credit allowed' },
      { state: 'Mississippi', rate: 7.25, tipped: 2.13, note: 'No state minimum, federal applies' },
      { state: 'Missouri', rate: 13.75, tipped: 6.88, note: '' },
      { state: 'Montana', rate: 10.55, tipped: 10.55, note: 'No tip credit for large employers' },
      { state: 'Nebraska', rate: 13.50, tipped: 2.13, note: '' },
      { state: 'Nevada', rate: 12.00, tipped: 12.00, note: 'No tip credit allowed' },
      { state: 'New Hampshire', rate: 7.25, tipped: 3.27, note: 'Federal rate' },
      { state: 'New Jersey', rate: 15.49, tipped: 5.62, note: 'Adjusted annually' },
      { state: 'New Mexico', rate: 12.00, tipped: 3.00, note: '' },
      { state: 'New York', rate: 16.00, tipped: 10.65, note: 'NYC, LI, Westchester rate' },
      { state: 'North Carolina', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
      { state: 'North Dakota', rate: 7.25, tipped: 4.86, note: 'Federal rate' },
      { state: 'Ohio', rate: 10.65, tipped: 5.35, note: '' },
      { state: 'Oklahoma', rate: 7.25, tipped: 2.13, note: 'Federal rate applies' },
      { state: 'Oregon', rate: 14.70, tipped: 14.70, note: 'No tip credit. Portland metro higher.' },
      { state: 'Pennsylvania', rate: 7.25, tipped: 2.83, note: 'Federal rate' },
      { state: 'Rhode Island', rate: 14.00, tipped: 3.89, note: '' },
      { state: 'South Carolina', rate: 7.25, tipped: 2.13, note: 'No state minimum, federal applies' },
      { state: 'South Dakota', rate: 11.20, tipped: 5.60, note: '' },
      { state: 'Tennessee', rate: 7.25, tipped: 2.13, note: 'No state minimum, federal applies' },
      { state: 'Texas', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
      { state: 'Utah', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
      { state: 'Vermont', rate: 14.01, tipped: 7.01, note: '' },
      { state: 'Virginia', rate: 12.41, tipped: 2.13, note: '' },
      { state: 'Washington', rate: 16.66, tipped: 16.66, note: 'Highest state minimum. No tip credit.' },
      { state: 'Washington DC', rate: 17.50, tipped: 10.00, note: 'Highest in the nation' },
      { state: 'West Virginia', rate: 8.75, tipped: 2.62, note: '' },
      { state: 'Wisconsin', rate: 7.25, tipped: 2.33, note: 'Federal rate' },
      { state: 'Wyoming', rate: 7.25, tipped: 2.13, note: 'Federal rate' },
    ],
    columns: ['State', 'Min Wage', 'Tipped Wage', 'Notes'],
    fields: ['state', 'rate', 'tipped', 'note'],
    formatters: { rate: 'dollar', tipped: 'dollar' },
    faqs: [
      { q: 'What is the federal minimum wage in 2026?', a: 'The federal minimum wage is $7.25/hour, unchanged since 2009. However, 30+ states have set higher minimums. The highest is Washington DC at $17.50/hour, followed by Washington state at $16.66/hour.' },
      { q: 'Which states have the highest minimum wage?', a: 'Washington DC ($17.50), Washington ($16.66), California ($16.50), New York ($16.00), and Connecticut ($16.35) have the highest minimum wages in 2026.' },
      { q: 'Which states use the federal minimum wage?', a: 'Alabama, Georgia, Idaho, Indiana, Iowa, Kansas, Kentucky, Louisiana, Mississippi, New Hampshire, North Carolina, North Dakota, Oklahoma, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Wisconsin, and Wyoming all use the federal $7.25/hour rate.' },
      { q: 'What is the tipped minimum wage?', a: 'The federal tipped minimum wage is $2.13/hour. Employers must ensure total pay (tips + wages) equals at least the regular minimum wage. Seven states (Alaska, California, Minnesota, Montana, Nevada, Oregon, Washington) do not allow tip credits.' },
    ],
    relatedCalcs: ['/hourly-to-salary-calculator', '/salary-after-tax-calculator', '/budget-planner-calculator'],
    relatedData: ['/data/minimum-wage-livability-by-state', '/data/median-household-income-by-state', '/data/cost-of-living-for-singles-by-state'],
  },
  {
    slug: 'federal-tax-brackets',
    title: 'Federal Tax Brackets 2026 (IRS Income Tax Rates & Calculator)',
    desc: '2026 federal income tax brackets and rates for all filing statuses. Single, married filing jointly, head of household. Includes standard deduction and capital gains rates.',
    searchVol: '500K+/mo',
    data: [
      { bracket: '10%', single: '$0 - $11,925', married: '$0 - $23,850', hoh: '$0 - $17,000' },
      { bracket: '12%', single: '$11,926 - $48,475', married: '$23,851 - $96,950', hoh: '$17,001 - $64,850' },
      { bracket: '22%', single: '$48,476 - $103,350', married: '$96,951 - $206,700', hoh: '$64,851 - $103,350' },
      { bracket: '24%', single: '$103,351 - $197,300', married: '$206,701 - $394,600', hoh: '$103,351 - $197,300' },
      { bracket: '32%', single: '$197,301 - $250,525', married: '$394,601 - $501,050', hoh: '$197,301 - $250,500' },
      { bracket: '35%', single: '$250,526 - $626,350', married: '$501,051 - $751,600', hoh: '$250,501 - $626,350' },
      { bracket: '37%', single: 'Over $626,350', married: 'Over $751,600', hoh: 'Over $626,350' },
    ],
    columns: ['Tax Rate', 'Single', 'Married Filing Jointly', 'Head of Household'],
    fields: ['bracket', 'single', 'married', 'hoh'],
    formatters: {},
    extraTables: [
      {
        title: 'Standard Deduction 2026',
        data: [
          { status: 'Single', amount: '$15,000', over65: '$16,950' },
          { status: 'Married Filing Jointly', amount: '$30,000', over65: '$31,500 (one) / $33,000 (both)' },
          { status: 'Head of Household', amount: '$22,500', over65: '$24,450' },
        ],
        columns: ['Filing Status', 'Standard Deduction', 'Over 65 Additional'],
        fields: ['status', 'amount', 'over65'],
      },
      {
        title: 'Capital Gains Tax Rates 2026',
        data: [
          { rate: '0%', single: '$0 - $48,350', married: '$0 - $96,700' },
          { rate: '15%', single: '$48,351 - $533,400', married: '$96,701 - $600,050' },
          { rate: '20%', single: 'Over $533,400', married: 'Over $600,050' },
        ],
        columns: ['Rate', 'Single', 'Married Filing Jointly'],
        fields: ['rate', 'single', 'married'],
      },
      {
        title: 'Key Tax Numbers 2026',
        data: [
          { item: 'Social Security Wage Base', value: '$176,100' },
          { item: 'Medicare Tax Rate', value: '1.45% (+ 0.9% over $200K)' },
          { item: 'Social Security Tax Rate', value: '6.2%' },
          { item: '401k Contribution Limit', value: '$23,500' },
          { item: '401k Catch-Up (50+)', value: '$7,500' },
          { item: 'IRA Contribution Limit', value: '$7,000' },
          { item: 'IRA Catch-Up (50+)', value: '$1,000' },
          { item: 'HSA Individual Limit', value: '$4,300' },
          { item: 'HSA Family Limit', value: '$8,550' },
          { item: 'Gift Tax Exclusion', value: '$19,000' },
          { item: 'Estate Tax Exemption', value: '$13.99 million' },
          { item: 'Child Tax Credit', value: '$2,000 per child' },
          { item: 'EITC Max (3+ children)', value: '$7,830' },
        ],
        columns: ['Item', 'Amount'],
        fields: ['item', 'value'],
      },
    ],
    faqs: [
      { q: 'What are the federal tax brackets for 2026?', a: 'The 2026 tax brackets are: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. These are marginal rates, meaning only the income within each bracket is taxed at that rate.' },
      { q: 'What is the standard deduction for 2026?', a: 'The 2026 standard deduction is $15,000 for single filers, $30,000 for married filing jointly, and $22,500 for head of household. Additional deductions apply for those over 65.' },
      { q: 'What is the 401k contribution limit for 2026?', a: 'The 2026 401k contribution limit is $23,500, with an additional $7,500 catch-up contribution for those 50 and older.' },
      { q: 'What are the capital gains tax rates for 2026?', a: 'Long-term capital gains (held over 1 year) are taxed at 0%, 15%, or 20% depending on income. Short-term gains are taxed as ordinary income.' },
    ],
    relatedCalcs: ['/tax-calculator', '/salary-after-tax-calculator', '/capital-gains-tax-calculator', '/paycheck-calculator'],
    relatedData: ['/data/states-with-no-income-tax', '/data/states-with-highest-income-tax', '/data/tax-burden-by-state', '/data/take-home-pay-by-state-100k'],
  },
  {
    slug: 'state-income-tax-rates',
    title: 'State Income Tax Rates 2026 (All 50 States Ranked)',
    desc: 'Complete guide to state income tax rates in 2026. All 50 states ranked from lowest to highest with brackets, deductions, and no-income-tax states.',
    searchVol: '150K+/mo',
    data: [
      { state: 'Alaska', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'Florida', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'Nevada', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'New Hampshire', rate: '0%', type: 'No income tax (as of 2025)', top: '0%' },
      { state: 'South Dakota', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'Tennessee', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'Texas', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'Washington', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'Wyoming', rate: '0%', type: 'No income tax', top: '0%' },
      { state: 'North Dakota', rate: '1.95%', type: 'Graduated', top: '2.5%' },
      { state: 'Pennsylvania', rate: '3.07%', type: 'Flat', top: '3.07%' },
      { state: 'Indiana', rate: '3.05%', type: 'Flat', top: '3.05%' },
      { state: 'Michigan', rate: '4.25%', type: 'Flat', top: '4.25%' },
      { state: 'Colorado', rate: '4.40%', type: 'Flat', top: '4.40%' },
      { state: 'Arizona', rate: '2.50%', type: 'Flat', top: '2.50%' },
      { state: 'Utah', rate: '4.65%', type: 'Flat', top: '4.65%' },
      { state: 'Illinois', rate: '4.95%', type: 'Flat', top: '4.95%' },
      { state: 'Kentucky', rate: '4.00%', type: 'Flat', top: '4.00%' },
      { state: 'Mississippi', rate: '5.00%', type: 'Flat (2026)', top: '5.00%' },
      { state: 'Massachusetts', rate: '5.00%', type: 'Flat (+ 4% surtax over $1M)', top: '9.00%' },
      { state: 'North Carolina', rate: '4.50%', type: 'Flat', top: '4.50%' },
      { state: 'Georgia', rate: '5.49%', type: 'Flat (2026)', top: '5.49%' },
      { state: 'Alabama', rate: '2-5%', type: 'Graduated', top: '5.00%' },
      { state: 'Virginia', rate: '2-5.75%', type: 'Graduated', top: '5.75%' },
      { state: 'Louisiana', rate: '1.85-4.25%', type: 'Graduated', top: '4.25%' },
      { state: 'Missouri', rate: '2-4.95%', type: 'Graduated', top: '4.95%' },
      { state: 'Oklahoma', rate: '0.25-4.75%', type: 'Graduated', top: '4.75%' },
      { state: 'Idaho', rate: '5.80%', type: 'Flat', top: '5.80%' },
      { state: 'Arkansas', rate: '2-4.40%', type: 'Graduated', top: '4.40%' },
      { state: 'Ohio', rate: '0-3.75%', type: 'Graduated', top: '3.75%' },
      { state: 'Kansas', rate: '3.1-5.7%', type: 'Graduated', top: '5.70%' },
      { state: 'Nebraska', rate: '2.46-5.84%', type: 'Graduated', top: '5.84%' },
      { state: 'Maryland', rate: '2-5.75%', type: 'Graduated', top: '5.75%' },
      { state: 'Montana', rate: '4.7-5.9%', type: 'Graduated', top: '5.90%' },
      { state: 'West Virginia', rate: '2.36-5.12%', type: 'Graduated', top: '5.12%' },
      { state: 'New Mexico', rate: '1.7-5.9%', type: 'Graduated', top: '5.90%' },
      { state: 'South Carolina', rate: '0-6.40%', type: 'Graduated', top: '6.40%' },
      { state: 'Rhode Island', rate: '3.75-5.99%', type: 'Graduated', top: '5.99%' },
      { state: 'Delaware', rate: '2.2-6.6%', type: 'Graduated', top: '6.60%' },
      { state: 'Iowa', rate: '4.40-6.00%', type: 'Graduated', top: '6.00%' },
      { state: 'Connecticut', rate: '2-6.99%', type: 'Graduated', top: '6.99%' },
      { state: 'Wisconsin', rate: '3.5-7.65%', type: 'Graduated', top: '7.65%' },
      { state: 'Maine', rate: '5.8-7.15%', type: 'Graduated', top: '7.15%' },
      { state: 'Minnesota', rate: '5.35-9.85%', type: 'Graduated', top: '9.85%' },
      { state: 'Vermont', rate: '3.35-8.75%', type: 'Graduated', top: '8.75%' },
      { state: 'Oregon', rate: '4.75-9.9%', type: 'Graduated', top: '9.90%' },
      { state: 'New Jersey', rate: '1.4-10.75%', type: 'Graduated', top: '10.75%' },
      { state: 'Hawaii', rate: '1.4-11%', type: 'Graduated', top: '11.00%' },
      { state: 'New York', rate: '4-10.9%', type: 'Graduated', top: '10.90%' },
      { state: 'California', rate: '1-13.3%', type: 'Graduated', top: '13.30%' },
    ],
    columns: ['State', 'Rate Range', 'Type', 'Top Rate'],
    fields: ['state', 'rate', 'type', 'top'],
    formatters: {},
    faqs: [
      { q: 'Which states have no income tax?', a: 'Nine states have no income tax: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming.' },
      { q: 'Which state has the highest income tax?', a: 'California has the highest top marginal rate at 13.3%. Hawaii (11%), New Jersey (10.75%), and New York (10.9%) also have very high rates.' },
      { q: 'Which states have a flat income tax?', a: 'States with flat income tax include: Arizona (2.5%), Colorado (4.4%), Illinois (4.95%), Indiana (3.05%), Kentucky (4.0%), Massachusetts (5.0%), Michigan (4.25%), Mississippi (5.0%), North Carolina (4.5%), Pennsylvania (3.07%), and Utah (4.65%).' },
      { q: 'How much do I save in a no-income-tax state?', a: 'On a $75,000 salary, moving from California (9.3% effective) to Texas (0%) saves approximately $6,975/year. On $100,000, the savings are approximately $9,300/year.' },
    ],
    relatedCalcs: ['/tax-calculator', '/salary-after-tax-calculator', '/paycheck-calculator'],
    relatedData: ['/data/states-with-no-income-tax', '/data/states-with-highest-income-tax', '/data/take-home-pay-by-state-100k'],
  },
  {
    slug: 'property-tax-rates-by-state',
    title: 'Property Tax Rates by State 2026 (Effective Rates Ranked)',
    desc: 'Average property tax rates for all 50 states. Effective rates, median tax paid, and median home value. Ranked from lowest to highest.',
    searchVol: '110K+/mo',
    data: [
      { state: 'Hawaii', rate: '0.29%', medianTax: '$2,420', medianHome: '$835,000' },
      { state: 'Alabama', rate: '0.40%', medianTax: '$860', medianHome: '$215,000' },
      { state: 'Colorado', rate: '0.51%', medianTax: '$2,780', medianHome: '$545,000' },
      { state: 'Louisiana', rate: '0.56%', medianTax: '$1,148', medianHome: '$205,000' },
      { state: 'South Carolina', rate: '0.57%', medianTax: '$1,682', medianHome: '$295,000' },
      { state: 'West Virginia', rate: '0.58%', medianTax: '$899', medianHome: '$155,000' },
      { state: 'Wyoming', rate: '0.60%', medianTax: '$1,890', medianHome: '$315,000' },
      { state: 'Arkansas', rate: '0.62%', medianTax: '$1,209', medianHome: '$195,000' },
      { state: 'Utah', rate: '0.63%', medianTax: '$3,182', medianHome: '$505,000' },
      { state: 'Nevada', rate: '0.65%', medianTax: '$2,698', medianHome: '$415,000' },
      { state: 'Tennessee', rate: '0.66%', medianTax: '$2,475', medianHome: '$375,000' },
      { state: 'Idaho', rate: '0.67%', medianTax: '$2,781', medianHome: '$415,000' },
      { state: 'Arizona', rate: '0.68%', medianTax: '$2,822', medianHome: '$415,000' },
      { state: 'Delaware', rate: '0.70%', medianTax: '$2,275', medianHome: '$325,000' },
      { state: 'California', rate: '0.71%', medianTax: '$5,574', medianHome: '$785,000' },
      { state: 'Mississippi', rate: '0.72%', medianTax: '$1,260', medianHome: '$175,000' },
      { state: 'Virginia', rate: '0.75%', medianTax: '$2,888', medianHome: '$385,000' },
      { state: 'Montana', rate: '0.76%', medianTax: '$3,382', medianHome: '$445,000' },
      { state: 'New Mexico', rate: '0.78%', medianTax: '$2,223', medianHome: '$285,000' },
      { state: 'North Carolina', rate: '0.80%', medianTax: '$2,840', medianHome: '$355,000' },
      { state: 'Kentucky', rate: '0.82%', medianTax: '$1,845', medianHome: '$225,000' },
      { state: 'Indiana', rate: '0.84%', medianTax: '$1,974', medianHome: '$235,000' },
      { state: 'Oklahoma', rate: '0.87%', medianTax: '$1,871', medianHome: '$215,000' },
      { state: 'Georgia', rate: '0.88%', medianTax: '$2,948', medianHome: '$335,000' },
      { state: 'Florida', rate: '0.89%', medianTax: '$3,605', medianHome: '$405,000' },
      { state: 'Oregon', rate: '0.93%', medianTax: '$4,418', medianHome: '$475,000' },
      { state: 'North Dakota', rate: '0.94%', medianTax: '$2,209', medianHome: '$235,000' },
      { state: 'Washington', rate: '0.98%', medianTax: '$5,831', medianHome: '$595,000' },
      { state: 'Missouri', rate: '0.99%', medianTax: '$2,327', medianHome: '$235,000' },
      { state: 'South Dakota', rate: '1.01%', medianTax: '$2,677', medianHome: '$265,000' },
      { state: 'Alaska', rate: '1.04%', medianTax: '$3,484', medianHome: '$335,000' },
      { state: 'Maryland', rate: '1.05%', medianTax: '$4,148', medianHome: '$395,000' },
      { state: 'Minnesota', rate: '1.08%', medianTax: '$3,402', medianHome: '$315,000' },
      { state: 'Massachusetts', rate: '1.12%', medianTax: '$6,552', medianHome: '$585,000' },
      { state: 'Kansas', rate: '1.15%', medianTax: '$2,473', medianHome: '$215,000' },
      { state: 'Maine', rate: '1.18%', medianTax: '$4,307', medianHome: '$365,000' },
      { state: 'Ohio', rate: '1.22%', medianTax: '$2,867', medianHome: '$235,000' },
      { state: 'Michigan', rate: '1.25%', medianTax: '$2,938', medianHome: '$235,000' },
      { state: 'Iowa', rate: '1.29%', medianTax: '$2,774', medianHome: '$215,000' },
      { state: 'Pennsylvania', rate: '1.35%', medianTax: '$3,578', medianHome: '$265,000' },
      { state: 'Rhode Island', rate: '1.40%', medianTax: '$5,950', medianHome: '$425,000' },
      { state: 'Nebraska', rate: '1.44%', medianTax: '$3,528', medianHome: '$245,000' },
      { state: 'New York', rate: '1.62%', medianTax: '$7,857', medianHome: '$485,000' },
      { state: 'Wisconsin', rate: '1.63%', medianTax: '$4,320', medianHome: '$265,000' },
      { state: 'Vermont', rate: '1.68%', medianTax: '$5,964', medianHome: '$355,000' },
      { state: 'Texas', rate: '1.74%', medianTax: '$5,829', medianHome: '$335,000' },
      { state: 'New Hampshire', rate: '1.86%', medianTax: '$8,277', medianHome: '$445,000' },
      { state: 'Connecticut', rate: '1.98%', medianTax: '$7,821', medianHome: '$395,000' },
      { state: 'Illinois', rate: '2.07%', medianTax: '$5,900', medianHome: '$285,000' },
      { state: 'New Jersey', rate: '2.23%', medianTax: '$11,040', medianHome: '$495,000' },
    ],
    columns: ['State', 'Effective Rate', 'Median Tax Paid', 'Median Home Value'],
    fields: ['state', 'rate', 'medianTax', 'medianHome'],
    formatters: {},
    faqs: [
      { q: 'Which state has the highest property tax?', a: 'New Jersey has the highest effective property tax rate at 2.23%, with a median annual tax of $11,040. Illinois (2.07%) and Connecticut (1.98%) follow.' },
      { q: 'Which state has the lowest property tax?', a: 'Hawaii has the lowest effective property tax rate at 0.29%, despite high home values. Alabama (0.40%) and Colorado (0.51%) also have very low rates.' },
      { q: 'How is property tax calculated?', a: 'Property tax = Assessed Value x Tax Rate. The assessed value may differ from market value depending on state assessment ratios. Effective tax rate is the actual tax paid divided by market value.' },
      { q: 'Do states with no income tax have higher property taxes?', a: 'Generally yes. Texas (1.74%), New Hampshire (1.86%), and Alaska (1.04%) all have above-average property taxes to compensate for no income tax revenue.' },
    ],
    relatedCalcs: ['/property-tax-calculator', '/mortgage-calculator', '/home-affordability-calculator'],
    relatedData: ['/data/median-home-price-by-state', '/data/average-mortgage-payment-by-state', '/data/housing-affordability-index-by-state'],
  },
  {
    slug: 'inflation-rate-by-year',
    title: 'US Inflation Rate by Year (1960-2026 Historical Data)',
    desc: 'Historical US inflation rates from 1960 to 2026. Annual CPI data, cumulative inflation, and purchasing power calculations.',
    searchVol: '200K+/mo',
    data: [
      { year: '2026', rate: '2.8%', cpi: '322.5', cumulative: '1,148%' },
      { year: '2025', rate: '2.9%', cpi: '313.7', cumulative: '1,114%' },
      { year: '2024', rate: '2.9%', cpi: '304.8', cumulative: '1,080%' },
      { year: '2023', rate: '4.1%', cpi: '296.2', cumulative: '1,046%' },
      { year: '2022', rate: '8.0%', cpi: '284.5', cumulative: '1,000%' },
      { year: '2021', rate: '4.7%', cpi: '263.4', cumulative: '919%' },
      { year: '2020', rate: '1.2%', cpi: '251.6', cumulative: '873%' },
      { year: '2019', rate: '1.8%', cpi: '248.6', cumulative: '862%' },
      { year: '2018', rate: '2.4%', cpi: '244.2', cumulative: '845%' },
      { year: '2017', rate: '2.1%', cpi: '238.5', cumulative: '823%' },
      { year: '2016', rate: '1.3%', cpi: '233.6', cumulative: '804%' },
      { year: '2015', rate: '0.1%', cpi: '230.6', cumulative: '793%' },
      { year: '2014', rate: '1.6%', cpi: '230.3', cumulative: '791%' },
      { year: '2013', rate: '1.5%', cpi: '226.7', cumulative: '778%' },
      { year: '2012', rate: '2.1%', cpi: '223.4', cumulative: '765%' },
      { year: '2011', rate: '3.2%', cpi: '218.8', cumulative: '746%' },
      { year: '2010', rate: '1.6%', cpi: '212.1', cumulative: '720%' },
      { year: '2009', rate: '-0.4%', cpi: '208.8', cumulative: '707%' },
      { year: '2008', rate: '3.8%', cpi: '209.7', cumulative: '710%' },
      { year: '2007', rate: '2.8%', cpi: '202.0', cumulative: '681%' },
      { year: '2006', rate: '3.2%', cpi: '196.5', cumulative: '660%' },
      { year: '2005', rate: '3.4%', cpi: '190.4', cumulative: '637%' },
      { year: '2004', rate: '2.7%', cpi: '184.1', cumulative: '612%' },
      { year: '2003', rate: '2.3%', cpi: '179.3', cumulative: '594%' },
      { year: '2002', rate: '1.6%', cpi: '175.2', cumulative: '578%' },
      { year: '2001', rate: '2.8%', cpi: '172.4', cumulative: '567%' },
      { year: '2000', rate: '3.4%', cpi: '167.7', cumulative: '549%' },
      { year: '1990', rate: '5.4%', cpi: '126.1', cumulative: '388%' },
      { year: '1980', rate: '13.5%', cpi: '77.8', cumulative: '201%' },
      { year: '1970', rate: '5.7%', cpi: '37.8', cumulative: '46%' },
      { year: '1960', rate: '1.7%', cpi: '25.9', cumulative: '0% (base)' },
    ],
    columns: ['Year', 'Inflation Rate', 'CPI', 'Cumulative Since 1960'],
    fields: ['year', 'rate', 'cpi', 'cumulative'],
    formatters: {},
    faqs: [
      { q: 'What is the current US inflation rate?', a: 'The US inflation rate for 2026 is approximately 2.8%, measured by the Consumer Price Index (CPI). This is down significantly from the 2022 peak of 8.0%.' },
      { q: 'What was the highest inflation rate in US history?', a: 'The highest post-WWII inflation was 13.5% in 1980. In 2022, inflation reached 8.0%, the highest since 1981. The 1970s and early 1980s saw sustained high inflation.' },
      { q: 'How much has the dollar lost in value?', a: 'Since 1960, the US dollar has lost over 91% of its purchasing power. $1 in 1960 has the equivalent purchasing power of about $12.48 in 2026.' },
      { q: 'How does inflation affect savings?', a: 'At 3% inflation, $100,000 in savings loses about $3,000 in real value per year. Over 10 years, $100,000 becomes worth only about $74,400 in real terms. This is why investing to beat inflation is critical.' },
    ],
    relatedCalcs: ['/inflation-impact-calculator', '/savings-interest-calculator', '/investment-return-calculator'],
    relatedData: ['/data/how-far-100k-goes-by-state', '/data/monthly-budget-by-state'],
  },
  {
    slug: 'social-security-benefits-by-age',
    title: 'Social Security Benefits by Age 2026 (Monthly Payment Table)',
    desc: 'Estimated Social Security retirement benefits by claiming age from 62 to 70. See how much more you get by waiting, plus maximum benefit amounts.',
    searchVol: '150K+/mo',
    data: [
      { age: '62', pct: '70%', monthly: '$1,274', annual: '$15,288', note: 'Maximum reduction (30%)' },
      { age: '63', pct: '75%', monthly: '$1,365', annual: '$16,380', note: '25% reduction' },
      { age: '64', pct: '80%', monthly: '$1,456', annual: '$17,472', note: '20% reduction' },
      { age: '65', pct: '86.7%', monthly: '$1,578', annual: '$18,936', note: '13.3% reduction' },
      { age: '66', pct: '93.3%', monthly: '$1,698', annual: '$20,376', note: '6.7% reduction' },
      { age: '67 (FRA)', pct: '100%', monthly: '$1,820', annual: '$21,840', note: 'Full Retirement Age' },
      { age: '68', pct: '108%', monthly: '$1,966', annual: '$23,592', note: '8% delayed credit' },
      { age: '69', pct: '116%', monthly: '$2,111', annual: '$25,332', note: '16% delayed credit' },
      { age: '70', pct: '124%', monthly: '$2,257', annual: '$27,084', note: 'Maximum benefit age' },
    ],
    columns: ['Claiming Age', '% of Full Benefit', 'Est. Monthly', 'Est. Annual', 'Notes'],
    fields: ['age', 'pct', 'monthly', 'annual', 'note'],
    formatters: {},
    extraTables: [
      {
        title: 'Maximum Social Security Benefits 2026',
        data: [
          { age: 'Age 62', max: '$2,710/mo ($32,520/yr)' },
          { age: 'Age 67 (FRA)', max: '$3,822/mo ($45,864/yr)' },
          { age: 'Age 70', max: '$4,873/mo ($58,476/yr)' },
        ],
        columns: ['Claiming Age', 'Maximum Monthly Benefit'],
        fields: ['age', 'max'],
      },
    ],
    faqs: [
      { q: 'What is the maximum Social Security benefit in 2026?', a: 'The maximum benefit at age 70 is $4,873/month ($58,476/year). At full retirement age (67), the maximum is $3,822/month. At age 62, the maximum is $2,710/month.' },
      { q: 'What is full retirement age in 2026?', a: 'Full retirement age (FRA) is 67 for anyone born in 1960 or later. This is the age at which you receive 100% of your benefit. Claiming earlier reduces it; waiting until 70 increases it.' },
      { q: 'How much does Social Security increase per year after 67?', a: 'Benefits increase 8% per year for each year you delay past FRA until age 70. Waiting from 67 to 70 increases your benefit by 24%.' },
      { q: 'Should I claim Social Security at 62 or wait?', a: 'If you claim at 62, you get 30% less per month but collect for 5+ more years. If you wait until 70, you get 24% more. The break-even age is around 80-82. If you expect to live past 82, waiting is better financially.' },
    ],
    relatedCalcs: ['/social-security-calculator', '/retirement-calculator', '/fire-calculator'],
    relatedData: ['/data/best-states-for-retirees', '/data/states-where-you-can-retire-on-50k', '/financial-data/average-retirement-savings-by-age'],
  },
  {
    slug: '401k-ira-contribution-limits',
    title: '401k & IRA Contribution Limits 2026 (Complete Guide)',
    desc: 'All retirement account contribution limits for 2026. 401k, Roth IRA, Traditional IRA, SEP IRA, SIMPLE IRA, HSA, and 529 plan limits.',
    searchVol: '200K+/mo',
    data: [
      { account: '401k / 403b', limit: '$23,500', catchup: '$7,500 (50+)', total: '$31,000 (50+)' },
      { account: 'Traditional IRA', limit: '$7,000', catchup: '$1,000 (50+)', total: '$8,000 (50+)' },
      { account: 'Roth IRA', limit: '$7,000', catchup: '$1,000 (50+)', total: '$8,000 (50+)' },
      { account: 'SEP IRA', limit: '$69,000 or 25% of comp', catchup: 'N/A', total: '$69,000' },
      { account: 'SIMPLE IRA', limit: '$16,500', catchup: '$3,500 (50+)', total: '$20,000 (50+)' },
      { account: 'Solo 401k', limit: '$23,500 + 25% of net SE', catchup: '$7,500 (50+)', total: '$69,000' },
      { account: 'HSA (Individual)', limit: '$4,300', catchup: '$1,000 (55+)', total: '$5,300 (55+)' },
      { account: 'HSA (Family)', limit: '$8,550', catchup: '$1,000 (55+)', total: '$9,550 (55+)' },
      { account: '529 Plan', limit: 'No federal limit', catchup: 'N/A', total: '$18,000/yr gift tax free' },
    ],
    columns: ['Account Type', '2026 Limit', 'Catch-Up', 'Total with Catch-Up'],
    fields: ['account', 'limit', 'catchup', 'total'],
    formatters: {},
    extraTables: [
      {
        title: 'Roth IRA Income Limits 2026',
        data: [
          { status: 'Single', full: 'Under $150,000', partial: '$150,000 - $165,000', none: 'Over $165,000' },
          { status: 'Married Filing Jointly', full: 'Under $236,000', partial: '$236,000 - $246,000', none: 'Over $246,000' },
        ],
        columns: ['Filing Status', 'Full Contribution', 'Partial', 'Not Eligible'],
        fields: ['status', 'full', 'partial', 'none'],
      },
      {
        title: 'Historical 401k Limits (2020-2026)',
        data: [
          { year: '2026', limit: '$23,500', catchup: '$7,500' },
          { year: '2025', limit: '$23,500', catchup: '$7,500' },
          { year: '2024', limit: '$23,000', catchup: '$7,500' },
          { year: '2023', limit: '$22,500', catchup: '$7,500' },
          { year: '2022', limit: '$20,500', catchup: '$6,500' },
          { year: '2021', limit: '$19,500', catchup: '$6,500' },
          { year: '2020', limit: '$19,500', catchup: '$6,500' },
        ],
        columns: ['Year', 'Employee Limit', 'Catch-Up (50+)'],
        fields: ['year', 'limit', 'catchup'],
      },
    ],
    faqs: [
      { q: 'What is the 401k contribution limit for 2026?', a: 'The 2026 401k employee contribution limit is $23,500. If you are 50 or older, you can contribute an additional $7,500 in catch-up contributions for a total of $31,000.' },
      { q: 'What is the Roth IRA limit for 2026?', a: 'The 2026 Roth IRA contribution limit is $7,000 ($8,000 if 50+). Income limits apply: single filers must earn under $165,000, married filing jointly under $246,000 for full contributions.' },
      { q: 'Can I contribute to both a 401k and IRA?', a: 'Yes, you can contribute to both. However, if you have a workplace 401k, your Traditional IRA contribution may not be tax-deductible above certain income thresholds. Roth IRA eligibility depends on income.' },
      { q: 'What is the HSA contribution limit for 2026?', a: 'The 2026 HSA limit is $4,300 for individual coverage and $8,550 for family coverage. An additional $1,000 catch-up is available for those 55+.' },
    ],
    relatedCalcs: ['/401k-calculator', '/roth-ira-calculator', '/retirement-calculator'],
    relatedData: ['/financial-data/average-401k-balance-by-age', '/financial-data/average-retirement-savings-by-age'],
  },
];

// ================================================================
// BUILD PAGES
// ================================================================

PAGES.forEach(page => {
  const dir = path.join(APP, page.slug);
  ensureDir(dir);

  // Build extra tables JSX
  let extraTablesJSX = '';
  if (page.extraTables) {
    page.extraTables.forEach(et => {
      extraTablesJSX += `
        <div style={st.box}>
          <h2 style={st.h2}>${et.title}</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            ${et.columns.map(c => '<th style={st.th}>' + c + '</th>').join('\n            ')}
          </tr></thead><tbody>
            ${et.data.map((row, i) => '<tr style={{background:' + (i % 2 === 0 ? "'transparent'" : "'rgba(255,255,255,0.015)'") + '}}>' + et.fields.map(f => '<td style={st.td}>' + (row[f] || '') + '</td>').join('') + '</tr>').join('\n            ')}
          </tbody></table></div>
        </div>`;
    });
  }

  // Build FAQ data
  const faqsJSON = JSON.stringify(page.faqs).replace(/'/g, "\\'");

  // Build related links
  const relatedCalcLinks = page.relatedCalcs.map(href => {
    const name = href.replace(/\//g, ' ').replace(/-/g, ' ').trim();
    return `<a href="${href}" style={st.calcLink}>${name}</a>`;
  }).join('\n            ');

  const relatedDataLinks = page.relatedData.map(href => {
    const name = href.split('/').pop().replace(/-/g, ' ').trim();
    return `<a href="${href}" style={st.dataLink}>${name}</a>`;
  }).join('\n            ');

  // Main data table rows
  const mainTableRows = page.data.map((row, i) => {
    const cells = page.fields.map(f => {
      let val = row[f] || '';
      if (page.formatters[f] === 'dollar' && typeof val === 'number') val = '$' + val.toFixed(2);
      return '<td style={{...st.td' + (f === page.fields[0] ? ",fontWeight:700,color:'#e2e8f0'" : '') + '}}>' + val + '</td>';
    }).join('');
    return `<tr style={{background:${i % 2 === 0 ? "'transparent'" : "'rgba(255,255,255,0.015)'"}}}>${cells}</tr>`;
  }).join('\n              ');

  const pageContent = `import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdUnit from '../../components/AdUnit'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: '${page.title.replace(/'/g, "\\'")} | FreeFinCalc',
  description: '${page.desc.replace(/'/g, "\\'")}',
  alternates: { canonical: '${DOMAIN}/${page.slug}' },
  openGraph: {
    title: '${page.title.replace(/'/g, "\\'")}',
    description: '${page.desc.replace(/'/g, "\\'")}',
    url: '${DOMAIN}/${page.slug}',
    siteName: 'FreeFinCalc',
    type: 'article',
  },
}

const faqs = ${faqsJSON}

export default function Page() {
  const st = {
    page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
    wrap: { maxWidth: 1000, margin: '0 auto', padding: '32px 16px 64px' },
    h1: { fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#f1f5f9', margin: '0 0 12px', lineHeight: 1.15 },
    desc: { fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '0 0 8px' },
    vol: { fontSize: 12, color: '#64748b', margin: '0 0 28px' },
    box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 24, marginBottom: 24 },
    h2: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
    th: { padding: '10px 12px', textAlign: 'left', color: '#f0c842', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid rgba(240,200,66,0.2)' },
    td: { padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' },
    calcLink: { display: 'inline-block', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', margin: '0 8px 8px 0', background: 'rgba(240,200,66,0.08)', border: '1px solid rgba(240,200,66,0.2)', color: '#f0c842' },
    dataLink: { display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', margin: '0 6px 8px 0', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' },
  }

  return (
    <div style={st.page}>
      <Header />
      <FaqSchema faqs={faqs} />
      <AdUnit slot="7405024590" />
      <div style={st.wrap}>
        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}>
          <a href="/" style={{color:'#64748b',textDecoration:'none'}}>Home</a>
          <span style={{color:'#475569'}}>\\u203a</span>
          <span style={{color:'#94a3b8'}}>${page.title.split('(')[0].split('2026')[0].trim().replace(/'/g, "\\'")}</span>
        </nav>

        <h1 style={st.h1}>${page.title.replace(/'/g, "\\'")}</h1>
        <p style={st.desc}>${page.desc.replace(/'/g, "\\'")}</p>
        <p style={st.vol}>Est. monthly search volume: ${page.searchVol}</p>

        <div style={st.box}>
          <h2 style={st.h2}>${page.title.split('(')[0].trim().replace(/'/g, "\\'")}</h2>
          <div style={{overflowX:'auto'}}><table style={st.table}><thead><tr>
            ${page.columns.map(c => '<th style={st.th}>' + c + '</th>').join('\n            ')}
          </tr></thead><tbody>
              ${mainTableRows}
          </tbody></table></div>
        </div>

        <AdUnit slot="3248634657" />${extraTablesJSX}

        <div style={st.box}>
          <h2 style={st.h2}>Related Calculators</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            ${relatedCalcLinks}
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Related Data</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            ${relatedDataLinks}
          </div>
        </div>

        <div style={st.box}>
          <h2 style={st.h2}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={i < faqs.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16} : {paddingBottom:8}}>
              <h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3>
              <p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":"${page.title.replace(/"/g, '\\"')}","description":"${page.desc.replace(/"/g, '\\"')}","author":{"@type":"Organization","name":"FreeFinCalc"},"publisher":{"@type":"Organization","name":"FreeFinCalc"},"datePublished":"2026-03-27","dateModified":"2026-03-27","mainEntityOfPage":"${DOMAIN}/${page.slug}"})}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${DOMAIN}"},{"@type":"ListItem","position":2,"name":"${page.title.split('(')[0].trim().replace(/"/g, '\\"')}","item":"${DOMAIN}/${page.slug}"}]})}} />
      <Footer />
    </div>
  )
}
`;

  fs.writeFileSync(path.join(dir, 'page.js'), pageContent, 'utf8');
  console.log('  Created: /' + page.slug);
});

// ================================================================
// UPDATE SITEMAP
// ================================================================
console.log('');
console.log('Updating sitemap...');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');
const lb = sm.lastIndexOf(']');
let ne = '';
PAGES.forEach(p => {
  const url = DOMAIN + '/' + p.slug;
  if (!sm.includes(url)) {
    ne += '    { url: "' + url + '", lastModified: today, changeFrequency: "monthly", priority: 0.9 },\n';
  }
});
if (ne) {
  sm = sm.slice(0, lb) + ne + sm.slice(lb);
  fs.writeFileSync(smFile, sm, 'utf8');
  console.log('  Added ' + PAGES.length + ' URLs to sitemap');
}

console.log('');
console.log('=====================================================');
console.log('  CREATED: ' + PAGES.length + ' Ultra-High Volume Reference Pages');
console.log('');
PAGES.forEach(p => console.log('  ' + p.searchVol + ' - ' + p.title.split('(')[0].trim()));
console.log('');
console.log('  Combined estimated search volume: 1,600,000+/month');
console.log('=====================================================');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add ultra-high volume reference data pages"');
console.log('  git push origin master');
