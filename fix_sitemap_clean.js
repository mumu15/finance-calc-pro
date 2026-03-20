const fs = require('fs');
const c = fs.readFileSync('app/sitemap.js', 'utf8');

// Find double commas, empty lines between entries, or trailing commas
const lines = c.split('\n');
let issues = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const prev = i > 0 ? lines[i-1].trim() : '';
  
  // Double comma: },  ,
  if (line === ',' || line === ',,') {
    issues.push('Line ' + (i+1) + ': bare comma');
  }
  // Entry ending with }, followed by another }, (missing entry between)
  if (line.startsWith(',') && line.length < 3) {
    issues.push('Line ' + (i+1) + ': starts with lone comma');
  }
  // Empty entry like: ,\n  ,\n
  if (prev.endsWith(',') && line.startsWith(',')) {
    issues.push('Line ' + (i+1) + ': double comma pattern (prev line ends with comma, this starts with comma)');
  }
}

console.log('Issues found:', issues.length);
issues.forEach(i => console.log('  ' + i));

// Now actually fix it: re-parse the array entries properly
// Extract everything between the opening [ and closing ].map
const arrayMatch = c.match(/return \[\n([\s\S]*?)\n  \]\.map/);
if (!arrayMatch) {
  console.log('Could not find array pattern');
  process.exit(1);
}

const arrayContent = arrayMatch[1];
const entryRegex = /\{\s*url:\s*"([^"]+)",\s*priority:\s*([\d.]+),\s*freq:\s*"([^"]+)"\s*\}/g;
const entries = [];
const seen = new Set();
let match;

while ((match = entryRegex.exec(arrayContent)) !== null) {
  const url = match[1];
  if (!seen.has(url)) {
    seen.add(url);
    entries.push({ url, priority: parseFloat(match[2]), freq: match[3] });
  }
}

console.log('');
console.log('Valid unique entries extracted:', entries.length);

// Rebuild the sitemap cleanly
const newSitemap = `export default function sitemap() {
  const base = 'https://www.freefincalc.net';
  const today = new Date().toISOString().split('T')[0];

  return [
${entries.map(e => `    { url: "${e.url}", priority: ${e.priority}, freq: "${e.freq}" }`).join(',\n')}
  ].map(entry => ({
    url: base + entry.url,
    lastModified: today,
    changeFrequency: entry.freq,
    priority: entry.priority,
  }));
}
`;

fs.writeFileSync('app/sitemap.js', newSitemap, 'utf8');
console.log('');
console.log('✅ Rebuilt clean sitemap with ' + entries.length + ' entries');
console.log('');
console.log('Now run:');
console.log('  git add . && git commit -m "Rebuild clean sitemap" && git push origin master');
