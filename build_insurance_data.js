const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');
const DOMAIN = 'https://www.freefincalc.net';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function esc(s) { return s.replace(/</g, 'less than ').replace(/>/g, 'greater than ').replace(/'/g, "\\'"); }

console.log('Building 10 Insurance Data Pages...');

const PAGES = [
  {
    slug: 'average-car-insurance-by-state',
    title: 'Average Car Insurance Cost by State 2026 (All 50 States)',
    desc: 'Car insurance rates for all 50 states ranked cheapest to most expensive. Full coverage and minimum coverage rates compared.',
    sections: [
      { heading: 'Annual Car Insurance Premiums by State', rows: [
        ['1','Maine','$1,020','$380'],['2','Vermont','$1,085','$395'],['3','Idaho','$1,095','$340'],['4','Ohio','$1,110','$365'],['5','New Hampshire','$1,125','$410'],['---','National Average','$1,935','$565'],['46','New Jersey','$2,650','$780'],['47','Florida','$2,780','$820'],['48','Louisiana','$2,890','$765'],['49','Michigan','$2,950','$860'],['50','New York','$3,150','$920'],
      ], columns: ['Rank','State','Full Coverage','Min Coverage'] },
      { heading: 'Car Insurance by Age', rows: [
        ['16-19','$5,100','Highest risk'],['20-24','$2,900',''],['25-34','$1,920','Rates drop at 25'],['35-54','$1,760','Best rates'],['55-64','$1,820','Slight increase'],['65+','$2,100','Higher risk'],
      ], columns: ['Age','Avg Full Coverage','Notes'] },
    ],
    faqs: [
      { q: 'How much is car insurance on average?', a: 'The national average is $1,935/year for full coverage and $565/year for minimum coverage in 2026.' },
      { q: 'Which state has the cheapest car insurance?', a: 'Maine has the cheapest at $1,020/year for full coverage.' },
      { q: 'Which state has the most expensive car insurance?', a: 'New York has the most expensive at $3,150/year for full coverage.' },
    ],
    relatedCalcs: ['/car-loan-calculator','/budget-planner-calculator'],
  },
  {
    slug: 'average-health-insurance-cost',
    title: 'Average Health Insurance Cost 2026 (By Age, Family Size and Plan)',
    desc: 'Health insurance premiums by age, family size, and plan type. Marketplace, employer, and individual plan costs compared.',
    sections: [
      { heading: 'Average Monthly Health Insurance Premiums', rows: [
        ['Individual (Marketplace)','$580','$6,960'],['Individual (Employer)','$145','$1,740'],['Family (Marketplace)','$1,580','$18,960'],['Family (Employer)','$425','$5,100'],['Medicare Part B','$185','$2,220'],
      ], columns: ['Plan Type','Monthly','Annual'] },
      { heading: 'Health Insurance by Age (Marketplace)', rows: [
        ['21','$325','$3,900'],['30','$385','$4,620'],['40','$490','$5,880'],['50','$680','$8,160'],['60','$975','$11,700'],
      ], columns: ['Age','Monthly','Annual'] },
    ],
    faqs: [
      { q: 'How much does health insurance cost per month?', a: 'The average marketplace plan costs $580/month for individuals. Through an employer, employees pay $145/month on average.' },
      { q: 'How much does family health insurance cost?', a: 'Family marketplace plans average $1,580/month. Employer family plans cost employees about $425/month.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/salary-after-tax-calculator'],
  },
  {
    slug: 'average-life-insurance-cost-by-age',
    title: 'Average Life Insurance Cost by Age 2026 (Monthly Rates)',
    desc: 'Life insurance rates by age and coverage amount. Term life and whole life premiums for ages 20-70.',
    sections: [
      { heading: 'Monthly Term Life Rates ($500K, 20-Year)', rows: [
        ['25','$21','$17'],['30','$23','$19'],['35','$27','$22'],['40','$38','$30'],['45','$58','$45'],['50','$95','$72'],['55','$165','$118'],['60','$295','$198'],['65','$520','$365'],
      ], columns: ['Age','Male','Female'] },
      { heading: 'Term vs Whole Life (Male, Age 35, $500K)', rows: [
        ['20-Year Term','$27/mo','Cheapest'],['30-Year Term','$42/mo','Longest term'],['Whole Life','$385/mo','Permanent, cash value'],
      ], columns: ['Type','Monthly Cost','Notes'] },
    ],
    faqs: [
      { q: 'How much does life insurance cost?', a: 'A healthy 30-year-old male pays about $23/month for $500,000 of 20-year term life insurance.' },
      { q: 'Is term or whole life better?', a: 'Term life is better for most people. It costs $27/month vs $385/month for whole life at age 35. Invest the difference for better returns.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/net-worth-calculator'],
  },
  {
    slug: 'average-renters-insurance-by-state',
    title: 'Average Renters Insurance Cost by State 2026',
    desc: 'Renters insurance rates for all 50 states. Average premiums and what it covers.',
    sections: [
      { heading: 'Annual Renters Insurance by State', rows: [
        ['1','Wyoming','$120','$10'],['2','Idaho','$132','$11'],['3','Oregon','$138','$12'],['---','National Average','$195','$16'],['48','Florida','$290','$24'],['49','Louisiana','$310','$26'],['50','Mississippi','$325','$27'],
      ], columns: ['Rank','State','Annual','Monthly'] },
    ],
    faqs: [
      { q: 'How much is renters insurance?', a: 'The national average is $195/year or about $16/month.' },
      { q: 'Is renters insurance worth it?', a: 'Yes. For $16/month you get $30,000-$50,000 in property protection plus liability coverage.' },
    ],
    relatedCalcs: ['/rent-affordability-calculator','/budget-planner-calculator'],
  },
  {
    slug: 'car-insurance-statistics',
    title: 'Car Insurance Statistics 2026: Rates, Claims and Industry Data',
    desc: 'Auto insurance statistics including premiums, claims data, uninsured drivers, and industry trends.',
    sections: [
      { heading: 'US Auto Insurance Key Statistics', rows: [
        ['Total Premiums Written','$350 billion','Annual'],['Average Annual Premium','$1,935','Full coverage'],['Uninsured Motorist Rate','12.6%','1 in 8 drivers'],['Average Claim Amount','$5,200','Property damage'],['Average Injury Claim','$20,235','Bodily injury'],['Fatal Accidents/Year','42,795','NHTSA data'],
      ], columns: ['Metric','Value','Notes'] },
      { heading: 'Uninsured Rates (Top 10)', rows: [
        ['1','Mississippi','29.4%'],['2','Michigan','25.5%'],['3','Tennessee','23.7%'],['4','New Mexico','21.8%'],['5','Florida','20.4%'],
      ], columns: ['Rank','State','Uninsured Rate'] },
    ],
    faqs: [
      { q: 'What percentage of drivers are uninsured?', a: '12.6% of US drivers are uninsured. Mississippi has the highest rate at 29.4%.' },
      { q: 'How much has car insurance gone up?', a: 'Premiums have increased about 25% since 2020, from $1,548 to $1,935 annually.' },
    ],
    relatedCalcs: ['/car-loan-calculator','/budget-planner-calculator'],
  },
  {
    slug: 'health-insurance-statistics',
    title: 'Health Insurance Statistics 2026: Coverage, Costs and Uninsured',
    desc: 'US health insurance coverage rates, premiums, uninsured population, and healthcare spending data.',
    sections: [
      { heading: 'US Health Insurance Coverage', rows: [
        ['Total Insured','92.1%','305 million'],['Employer-Sponsored','49.6%','164 million'],['Medicaid','21.2%','70 million'],['Medicare','18.7%','62 million'],['Marketplace','5.8%','19 million'],['Uninsured','7.9%','26 million'],
      ], columns: ['Type','% of Population','People'] },
      { heading: 'Healthcare Spending by Country', rows: [
        ['United States','$13,493','17.8% of GDP'],['Switzerland','$8,650','11.8%'],['Germany','$7,890','12.7%'],['Canada','$6,320','12.1%'],['UK','$5,150','11.3%'],
      ], columns: ['Country','Per Capita','% of GDP'] },
    ],
    faqs: [
      { q: 'How many Americans are uninsured?', a: 'About 26 million Americans (7.9%) are uninsured in 2026.' },
      { q: 'How much does the US spend on healthcare?', a: 'The US spends $13,493 per person annually, nearly 2.5x the OECD average.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/salary-after-tax-calculator'],
  },
  {
    slug: 'insurance-cost-by-age',
    title: 'Insurance Cost by Age 2026: Car, Health, Life and Home Rates',
    desc: 'How insurance costs change across your lifetime. All insurance types by age from 18 to 75+.',
    sections: [
      { heading: 'Total Annual Insurance Costs by Age', rows: [
        ['18-24','$4,850','$3,900','$180','N/A','$8,930'],['25-34','$1,920','$4,400','$276','$2,377','$8,973'],['35-44','$1,780','$5,500','$396','$2,377','$10,053'],['45-54','$1,750','$7,200','$792','$2,377','$12,119'],['55-64','$1,820','$10,200','$2,340','$2,377','$16,737'],['65+','$2,100','$2,640','$6,000','$2,377','$13,117'],
      ], columns: ['Age','Car','Health','Life ($500K)','Home','Total/Year'] },
    ],
    faqs: [
      { q: 'At what age is insurance cheapest?', a: 'Overall costs are lowest at 25-34 at about $8,973/year.' },
      { q: 'At what age is insurance most expensive?', a: 'Ages 55-64 are most expensive at about $16,737/year due to health and life insurance costs.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/net-worth-calculator'],
  },
  {
    slug: 'insurance-industry-statistics',
    title: 'Insurance Industry Statistics 2026: Market Size and Revenue',
    desc: 'US insurance industry overview: total premiums, market segments, top companies, and employment data.',
    sections: [
      { heading: 'US Insurance Industry by Segment', rows: [
        ['Health Insurance','$1.28 trillion','36.4%'],['Life/Annuity','$850 billion','24.2%'],['Property and Casualty','$780 billion','22.2%'],['Auto Insurance','$350 billion','10.0%'],['Total US Insurance','$3.52 trillion','100%'],
      ], columns: ['Segment','Annual Premiums','Share'] },
      { heading: 'Top 5 Insurance Companies', rows: [
        ['1','UnitedHealth Group','$372 billion'],['2','CVS/Aetna','$357 billion'],['3','Berkshire Hathaway','$302 billion'],['4','Elevance Health','$171 billion'],['5','Centene','$154 billion'],
      ], columns: ['Rank','Company','Revenue'] },
    ],
    faqs: [
      { q: 'How big is the US insurance industry?', a: 'The US insurance industry writes approximately $3.52 trillion in premiums annually.' },
      { q: 'What is the largest insurance company?', a: 'UnitedHealth Group is the largest by revenue at $372 billion.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/roi-calculator'],
  },
  {
    slug: 'pet-insurance-cost',
    title: 'Pet Insurance Cost 2026: Average Rates for Dogs and Cats',
    desc: 'How much does pet insurance cost? Average premiums for dogs and cats by breed, age, and coverage.',
    sections: [
      { heading: 'Average Monthly Pet Insurance Premiums', rows: [
        ['Dog (Accident + Illness)','$56','$672'],['Dog (Accident Only)','$22','$264'],['Cat (Accident + Illness)','$32','$384'],['Cat (Accident Only)','$12','$144'],
      ], columns: ['Pet/Plan','Monthly','Annual'] },
      { heading: 'Dog Insurance by Breed', rows: [
        ['Mixed Breed','$42','Lower risk'],['Labrador','$55','Joint issues'],['French Bulldog','$72','Breathing issues'],['Bulldog','$78','Most expensive'],
      ], columns: ['Breed','Monthly','Risk'] },
      { heading: 'Average Vet Costs', rows: [
        ['Annual Wellness Visit','$250-$400',''],['Emergency Room','$800-$2,500',''],['ACL Surgery','$3,500-$6,000',''],['Cancer Treatment','$5,000-$15,000',''],['Dental Cleaning','$500-$1,200',''],
      ], columns: ['Procedure','Cost Range',''] },
    ],
    faqs: [
      { q: 'How much is pet insurance?', a: 'Dog insurance averages $56/month. Cat insurance averages $32/month for accident and illness coverage.' },
      { q: 'Is pet insurance worth it?', a: 'One emergency surgery costs $3,000-$6,000. At $56/month, insurance pays for itself with one major claim.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/savings-goal-calculator'],
  },
  {
    slug: 'uninsured-rates-by-state',
    title: 'Uninsured Rates by State 2026 (Health Insurance Coverage)',
    desc: 'Health insurance uninsured rates for all 50 states with Medicaid expansion status.',
    sections: [
      { heading: 'Uninsured Rates by State', rows: [
        ['1','Texas','16.6%','No expansion'],['2','Georgia','13.5%','Partial'],['3','Florida','12.7%','No expansion'],['4','Mississippi','12.2%','No expansion'],['5','Oklahoma','11.8%','Expanded 2021'],['---','National Average','7.9%',''],['48','Iowa','3.2%','Expanded'],['49','Vermont','2.8%','Expanded'],['50','Massachusetts','2.4%','Expanded'],
      ], columns: ['Rank','State','Uninsured %','Medicaid Status'] },
    ],
    faqs: [
      { q: 'Which state has the highest uninsured rate?', a: 'Texas at 16.6% (4.9 million people).' },
      { q: 'Which state has the lowest uninsured rate?', a: 'Massachusetts at 2.4%.' },
    ],
    relatedCalcs: ['/budget-planner-calculator','/salary-after-tax-calculator'],
  },
];

// BUILD
const dataDir = path.join(APP, 'insurance-data');
ensureDir(dataDir);

PAGES.forEach(page => {
  const dir = path.join(dataDir, page.slug);
  ensureDir(dir);

  let sectionsHTML = '';
  page.sections.forEach((sec, si) => {
    const headerCells = sec.columns.map(c => '<th style={st.th}>' + esc(c) + '</th>').join('');
    const bodyRows = sec.rows.map((row, ri) => {
      const cells = row.map((cell, ci) => '<td style={{...st.td' + (ci === 0 ? ",fontWeight:600,color:'#e2e8f0'" : '') + '}}>' + esc(cell) + '</td>').join('');
      return '<tr style={{background:' + (ri % 2 === 0 ? "'transparent'" : "'rgba(255,255,255,0.015)'") + '}}>' + cells + '</tr>';
    }).join('\n              ');
    sectionsHTML += '\n        <div style={st.box}>\n          <h2 style={st.h2}>' + esc(sec.heading) + '</h2>\n          <div style={{overflowX:\'auto\'}}><table style={st.table}><thead><tr>' + headerCells + '</tr></thead><tbody>\n              ' + bodyRows + '\n          </tbody></table></div>\n        </div>';
    if (si === 0) sectionsHTML += '\n        <AdUnit slot="3248634657" />';
  });

  const calcLinks = page.relatedCalcs.map(href => '<a href="' + href + '" style={st.calcLink}>' + href.replace(/\//g,' ').replace(/-/g,' ').trim() + '</a>').join('\n            ');

  const lines = [];
  lines.push("import Header from '../../../components/Header'");
  lines.push("import Footer from '../../../components/Footer'");
  lines.push("import AdUnit from '../../../components/AdUnit'");
  lines.push("import FaqSchema from '../../../components/FaqSchema'");
  lines.push("");
  lines.push("export const metadata = {");
  lines.push("  title: '" + esc(page.title) + " | FreeFinCalc',");
  lines.push("  description: '" + esc(page.desc) + "',");
  lines.push("  alternates: { canonical: '" + DOMAIN + "/insurance-data/" + page.slug + "' },");
  lines.push("  openGraph: { title: '" + esc(page.title) + "', description: '" + esc(page.desc) + "', url: '" + DOMAIN + "/insurance-data/" + page.slug + "', siteName: 'FreeFinCalc', type: 'article' },");
  lines.push("}");
  lines.push("");
  lines.push("const faqs = " + JSON.stringify(page.faqs));
  lines.push("");
  lines.push("export default function Page() {");
  lines.push("  const st = {");
  lines.push("    page:{minHeight:'100vh',background:'#0f1117',color:'#e2e8f0'},");
  lines.push("    wrap:{maxWidth:1000,margin:'0 auto',padding:'32px 16px 64px'},");
  lines.push("    h1:{fontSize:'clamp(24px,4vw,38px)',fontWeight:900,color:'#f1f5f9',margin:'0 0 12px',lineHeight:1.15},");
  lines.push("    desc:{fontSize:15,color:'#94a3b8',lineHeight:1.7,margin:'0 0 28px'},");
  lines.push("    box:{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24,marginBottom:24},");
  lines.push("    h2:{fontSize:20,fontWeight:700,color:'#f1f5f9',margin:'0 0 16px'},");
  lines.push("    table:{width:'100%',borderCollapse:'collapse',fontSize:13},");
  lines.push("    th:{padding:'10px 12px',textAlign:'left',color:'#10b981',fontWeight:700,fontSize:11,textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:'2px solid rgba(16,185,129,0.2)'},");
  lines.push("    td:{padding:'10px 12px',borderBottom:'1px solid rgba(255,255,255,0.05)',color:'#94a3b8'},");
  lines.push("    calcLink:{display:'inline-block',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:600,textDecoration:'none',margin:'0 8px 8px 0',background:'rgba(16,185,129,0.08)',border:'1px solid rgba(16,185,129,0.2)',color:'#10b981'},");
  lines.push("  }");
  lines.push("  return (");
  lines.push("    <div style={st.page}>");
  lines.push("      <Header />");
  lines.push("      <FaqSchema faqs={faqs} />");
  lines.push("      <AdUnit slot=\"7405024590\" />");
  lines.push("      <div style={st.wrap}>");
  lines.push("        <nav style={{fontSize:13,color:'#64748b',marginBottom:20,display:'flex',gap:6,flexWrap:'wrap'}}><a href=\"/\" style={{color:'#64748b',textDecoration:'none'}}>Home</a><span style={{color:'#475569'}}>{'\\u203a'}</span><a href=\"/insurance-data\" style={{color:'#64748b',textDecoration:'none'}}>Insurance Data</a><span style={{color:'#475569'}}>{'\\u203a'}</span><span style={{color:'#94a3b8'}}>" + esc(page.title.split(':')[0].split('(')[0].trim()) + "</span></nav>");
  lines.push("        <h1 style={st.h1}>" + esc(page.title) + "</h1>");
  lines.push("        <p style={st.desc}>" + esc(page.desc) + "</p>");
  lines.push(sectionsHTML);
  lines.push("        <div style={st.box}><h2 style={st.h2}>Related Calculators</h2><div style={{display:'flex',flexWrap:'wrap',gap:8}}>" + calcLinks + "</div></div>");
  lines.push("        <div style={st.box}><h2 style={st.h2}>Frequently Asked Questions</h2>{faqs.map((faq,i)=>(<div key={i} style={i<faqs.length-1?{borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:16,marginBottom:16}:{paddingBottom:8}}><h3 style={{fontSize:14,fontWeight:600,color:'#e2e8f0',marginBottom:6,marginTop:0}}>{faq.q}</h3><p style={{fontSize:13,color:'#94a3b8',lineHeight:1.7,margin:0}}>{faq.a}</p></div>))}</div>");
  lines.push("      </div>");
  lines.push("      <Footer />");
  lines.push("    </div>)");
  lines.push("}");

  fs.writeFileSync(path.join(dir, 'page.js'), lines.join('\n'), 'utf8');
  console.log('  Created: /insurance-data/' + page.slug);
});

// Hub
const hubLines = [];
hubLines.push("import Link from 'next/link'");
hubLines.push("import Header from '../../components/Header'");
hubLines.push("import Footer from '../../components/Footer'");
hubLines.push("export const metadata = { title: 'Insurance Data 2026 | FreeFinCalc', description: 'Insurance rates and statistics for car, health, life, home, renters, and pet insurance.', alternates: { canonical: '" + DOMAIN + "/insurance-data' } }");
hubLines.push("const pages = " + JSON.stringify(PAGES.map(p => ({slug:p.slug,title:p.title,desc:p.desc.substring(0,90)+'...'}))) + ";");
hubLines.push("export default function Hub() { return (<><Header /><main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}><h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px',textAlign:'center'}}>Insurance Data and Statistics</h1><p style={{fontSize:16,color:'#94a3b8',textAlign:'center',margin:'0 0 40px'}}>Real insurance rates updated for 2026</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12}}>{pages.map(p=>(<Link key={p.slug} href={'/insurance-data/'+p.slug} style={{display:'block',padding:'20px 24px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}><div style={{fontSize:15,fontWeight:700,color:'#e2e8f0',marginBottom:6}}>{p.title.split('(')[0].split(':')[0].trim()}</div><div style={{fontSize:12,color:'#64748b'}}>{p.desc}</div></Link>))}</div></main><Footer /></>)}");
fs.writeFileSync(path.join(dataDir, 'page.js'), hubLines.join('\n'), 'utf8');
console.log('  Created: /insurance-data (hub)');

// Sitemap
console.log('Updating sitemap...');
const smFile = path.join(APP, 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');
const lb = sm.lastIndexOf(']');
let ne = '';
if (!sm.includes('/insurance-data"')) ne += '    { url: "' + DOMAIN + '/insurance-data", lastModified: today, changeFrequency: "weekly", priority: 0.9 },\n';
PAGES.forEach(p => { if (!sm.includes(p.slug)) ne += '    { url: "' + DOMAIN + '/insurance-data/' + p.slug + '", lastModified: today, changeFrequency: "monthly", priority: 0.8 },\n'; });
if (ne) { const b = sm.substring(0,lb).trim(); sm = sm.slice(0,lb) + (b.endsWith(',') ? '\n' : ',\n') + ne + sm.slice(lb); fs.writeFileSync(smFile,sm,'utf8'); }

console.log('');
console.log('DONE: 10 Insurance Data Pages + Hub');
console.log('CPC: $15-50/click (insurance keywords)');
console.log('');
console.log('Run: git add . && git commit -m "Add 10 insurance data pages" && git push origin master');
