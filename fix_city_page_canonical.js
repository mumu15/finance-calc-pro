const fs = require('fs');
const path = require('path');

// The mortgage-calculator/[city]/page.js is a 'use client' file
// We need to move generateMetadata OUT of it into a separate server wrapper
// Same pattern we use elsewhere: page.js (server) + Client.js (use client)

const pageFile = path.join('app', 'mortgage-calculator', '[city]', 'page.js');

if (!fs.existsSync(pageFile)) {
  console.log('ERROR: File not found: ' + pageFile);
  process.exit(1);
}

let content = fs.readFileSync(pageFile, 'utf8');
console.log('📄 Current file starts with: ' + content.slice(0, 80));

// Check if it's a 'use client' file
const isClient = content.startsWith("'use client'") || content.startsWith('"use client"');
console.log('   Is use client: ' + isClient);

if (isClient) {
  // Step 1: Remove the generateMetadata we accidentally added
  content = content.replace(/\nexport async function generateMetadata[\s\S]*?\n\}\n/g, '\n');
  content = content.replace(/\nexport function generateMetadata[\s\S]*?\n\}\n/g, '\n');

  // Save the cleaned client file as Client.js
  const clientFile = path.join('app', 'mortgage-calculator', '[city]', 'Client.js');
  
  // If Client.js already exists, just clean page.js
  if (fs.existsSync(clientFile)) {
    console.log('   Client.js already exists — just cleaning page.js');
    fs.writeFileSync(pageFile, content, 'utf8');
    console.log('   ✅ Removed generateMetadata from page.js (use client file)');
    
    // Now check if page.js is purely a server wrapper or still use client
    // Read current page.js to see if it's already split
    console.log('   page.js now starts with: ' + content.slice(0, 100));
    
  } else {
    // page.js IS the client component — we need to split it
    // Save current content as Client.js (keep 'use client')
    fs.writeFileSync(clientFile, content, 'utf8');
    console.log('   ✅ Saved current content as Client.js');
    
    // Extract params to understand the generateStaticParams
    const gsParams = content.match(/export(?:\s+async)?\s+function\s+generateStaticParams[\s\S]*?\n\}/);
    
    // Create new server page.js
    const cities = ['new-york','los-angeles','chicago','houston','phoenix','philadelphia','san-antonio','san-diego','dallas','san-jose','austin','jacksonville','fort-worth','columbus','charlotte','indianapolis','san-francisco','seattle','denver','nashville','oklahoma-city','el-paso','washington-dc','las-vegas','louisville','memphis','portland','baltimore','milwaukee','albuquerque','tucson','fresno','sacramento','kansas-city','mesa','omaha','raleigh','colorado-springs','long-beach','virginia-beach','minneapolis','tampa','new-orleans','arlington','bakersfield','honolulu','anaheim','aurora','santa-ana','corpus-christi'];
    
    const newPage = "import MortgageCityClient from './Client';\n\n" +
      "export async function generateStaticParams() {\n" +
      "  const cities = " + JSON.stringify(cities) + ";\n" +
      "  return cities.map(city => ({ city }));\n" +
      "}\n\n" +
      "export async function generateMetadata({ params }) {\n" +
      "  return {\n" +
      "    alternates: { canonical: `https://freefincalc.net/mortgage-calculator/${params.city}` },\n" +
      "  };\n" +
      "}\n\n" +
      "export default function Page({ params }) {\n" +
      "  return <MortgageCityClient params={params} />;\n" +
      "}\n";
    
    fs.writeFileSync(pageFile, newPage, 'utf8');
    console.log('   ✅ Created new server page.js with generateMetadata');
  }
} else {
  // Not a use client file — just ensure generateMetadata is correct
  console.log('   Not a use client file — checking generateMetadata...');
  if (!content.includes('generateMetadata')) {
    const genMeta = '\nexport async function generateMetadata({ params }) {\n' +
      '  return {\n' +
      '    alternates: { canonical: `https://freefincalc.net/mortgage-calculator/${params.city}` },\n' +
      '  };\n' +
      '}\n';
    content = content.replace(/(export default)/, genMeta + '\n$1');
    fs.writeFileSync(pageFile, content, 'utf8');
    console.log('   ✅ Added generateMetadata');
  }
}

console.log('\nDone! Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix mortgage/city canonical — move generateMetadata to server component"');
console.log('  git push origin master');
