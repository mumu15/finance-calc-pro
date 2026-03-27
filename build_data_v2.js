const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const APP = path.join(BASE, 'app');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

console.log('Building 50 data pages...');

// 1. Ensure directories
const dynDir = path.join(APP, 'data', '[slug]');
ensureDir(dynDir);

// 2. Copy DataPageClient.js (must be in project root already)
const clientSrc = path.join(BASE, 'DataPageClient.js');
const clientDest = path.join(dynDir, 'DataPageClient.js');
if (fs.existsSync(clientSrc)) {
  fs.copyFileSync(clientSrc, clientDest);
  console.log('  Copied DataPageClient.js');
} else {
  console.log('  ERROR: DataPageClient.js not found in project root!');
  console.log('  Download it and place it in: ' + BASE);
  process.exit(1);
}

// 3. Create page.js (server component)
const pageJS = [
  "import colStates from '../../../data/colStates'",
  "import TOPICS from '../../../data/dataTopics'",
  "import DataPageClient from './DataPageClient'",
  "import { notFound } from 'next/navigation'",
  "",
  "export async function generateStaticParams() {",
  "  return TOPICS.map(t => ({ slug: t.slug }))",
  "}",
  "",
  "export async function generateMetadata({ params }) {",
  "  const t = TOPICS.find(x => x.slug === params.slug)",
  "  if (!t) return {}",
  "  return {",
  "    title: t.title + ' | FreeFinCalc',",
  "    description: t.desc,",
  "    alternates: { canonical: 'https://www.freefincalc.net/data/' + t.slug },",
  "    openGraph: {",
  "      title: t.title,",
  "      description: t.desc,",
  "      url: 'https://www.freefincalc.net/data/' + t.slug,",
  "      siteName: 'FreeFinCalc',",
  "      type: 'article',",
  "    },",
  "  }",
  "}",
  "",
  "export default function Page({ params }) {",
  "  const topic = TOPICS.find(x => x.slug === params.slug)",
  "  if (!topic) return notFound()",
  "  return <DataPageClient topic={topic} states={colStates} allTopics={TOPICS} />",
  "}",
].join('\n');

fs.writeFileSync(path.join(dynDir, 'page.js'), pageJS, 'utf8');
console.log('  Created app/data/[slug]/page.js');

// 4. Data hub page already created by previous script
const hubDir = path.join(APP, 'data');
if (!fs.existsSync(path.join(hubDir, 'page.js'))) {
  // Create a simple hub
  const hubPage = [
    "import Link from 'next/link'",
    "import Header from '../../components/Header'",
    "import Footer from '../../components/Footer'",
    "import TOPICS from '../../data/dataTopics'",
    "",
    "export const metadata = {",
    "  title: 'Data & Research - 50 State Rankings & Statistics | FreeFinCalc',",
    "  description: 'Original financial data and research. All 50 states ranked by mortgage, cost of living, taxes, salaries, rent, savings, and more.',",
    "  alternates: { canonical: 'https://www.freefincalc.net/data' },",
    "}",
    "",
    "const cats = {",
    "  mortgage: { label: 'Mortgage & Housing', color: '#3b82f6' },",
    "  budget: { label: 'Cost of Living & Budget', color: '#f97316' },",
    "  tax: { label: 'Tax & Income', color: '#ec4899' },",
    "  salary: { label: 'Salary & Pay', color: '#84cc16' },",
    "  retirement: { label: 'Retirement & FIRE', color: '#06b6d4' },",
    "  savings: { label: 'Savings & Wealth', color: '#f0c842' },",
    "  auto: { label: 'Auto & Transport', color: '#f59e0b' },",
    "  debt: { label: 'Debt', color: '#ef4444' },",
    "  business: { label: 'Business', color: '#6366f1' },",
    "  investing: { label: 'Investing', color: '#10b981' },",
    "}",
    "",
    "export default function DataHub() {",
    "  const grouped = {}",
    "  TOPICS.forEach(t => {",
    "    if (!grouped[t.category]) grouped[t.category] = []",
    "    grouped[t.category].push(t)",
    "  })",
    "  return (",
    "    <>",
    "      <Header />",
    "      <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 16px 64px'}}>",
    "        <div style={{textAlign:'center',marginBottom:48}}>",
    "          <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,color:'#fff',margin:'0 0 12px'}}>Data & Research</h1>",
    "          <p style={{fontSize:16,color:'#94a3b8',margin:'0 0 8px'}}>Original financial data and state rankings updated for 2026</p>",
    "          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',borderRadius:99,background:'rgba(240,200,66,0.1)',border:'1px solid rgba(240,200,66,0.25)',color:'#f0c842',fontSize:13,fontWeight:700,marginTop:12}}>",
    "            {TOPICS.length} Research Pages | All 50 States | Free Data",
    "          </div>",
    "        </div>",
    "        {Object.entries(grouped).map(([catKey, topics]) => {",
    "          const cat = cats[catKey] || { label: catKey, color: '#94a3b8' }",
    "          return (",
    "            <div key={catKey} style={{marginBottom:40}}>",
    "              <h2 style={{fontSize:20,fontWeight:800,color:cat.color,margin:'0 0 16px',paddingLeft:12,borderLeft:'4px solid ' + cat.color}}>{cat.label}</h2>",
    "              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:10}}>",
    "                {topics.map(t => (",
    "                  <Link key={t.slug} href={'/data/' + t.slug} style={{display:'block',padding:'16px 20px',borderRadius:14,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',textDecoration:'none'}}>",
    "                    <div style={{fontSize:14,fontWeight:600,color:'#e2e8f0',lineHeight:1.4,marginBottom:4}}>{t.title.split('(')[0].split('2026')[0].trim()}</div>",
    "                    <div style={{fontSize:12,color:'#64748b',lineHeight:1.5}}>{t.desc.substring(0, 100)}...</div>",
    "                  </Link>",
    "                ))}",
    "              </div>",
    "            </div>",
    "          )",
    "        })}",
    "      </main>",
    "      <Footer />",
    "    </>",
    "  )",
    "}",
  ].join('\n');
  fs.writeFileSync(path.join(hubDir, 'page.js'), hubPage, 'utf8');
  console.log('  Created app/data/page.js (hub)');
} else {
  console.log('  Hub page already exists');
}

// 5. Update sitemap
console.log('  Updating sitemap...');
const smFile = path.join(APP, 'sitemap.js');
let smContent = fs.readFileSync(smFile, 'utf8');
const TOPICS = require(path.join(BASE, 'data', 'dataTopics.js'));
const lastBracket = smContent.lastIndexOf(']');
let newEntries = '';

if (!smContent.includes('/data"')) {
  newEntries += '  { url: base + "/data", lastModified: today, changeFrequency: "weekly", priority: 0.9 },\n';
}
TOPICS.forEach(t => {
  if (!smContent.includes('/data/' + t.slug)) {
    newEntries += '  { url: base + "/data/' + t.slug + '", lastModified: today, changeFrequency: "monthly", priority: 0.8 },\n';
  }
});

if (newEntries) {
  smContent = smContent.slice(0, lastBracket) + newEntries + smContent.slice(lastBracket);
  fs.writeFileSync(smFile, smContent, 'utf8');
  console.log('  Added URLs to sitemap');
}

console.log('');
console.log('DONE! 50 data pages ready.');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Add 50 original data research pages"');
console.log('  git push origin master');
