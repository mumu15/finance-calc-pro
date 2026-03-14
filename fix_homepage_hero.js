const fs = require('fs');
const path = require('path');

const f = path.join(__dirname, 'app', 'PageClient.js');
let c = fs.readFileSync(f, 'utf8');

// 1. Reduce hero padding: py-20 → py-8
c = c.replace('className="relative py-20 px-4 text-center overflow-hidden"', 'className="relative py-8 px-4 text-center overflow-hidden"');

// 2. Smaller heading: text-5xl md:text-7xl → text-3xl md:text-5xl
c = c.replace('className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"', 'className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"');

// 3. Smaller subtitle: text-xl mb-10 → text-base mb-6
c = c.replace('className="text-slate-400 text-xl max-w-2xl mx-auto mb-10"', 'className="text-slate-400 text-base max-w-2xl mx-auto mb-5"');

// 4. Smaller badge margin: mb-6 → mb-3
c = c.replace(/items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6/g, 'items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3');

// 5. Smaller search: py-4 → py-3, mb-6 → mb-4
c = c.replace('className="w-full pl-12 pr-6 py-4 rounded-2xl text-white text-base outline-none"', 'className="w-full pl-12 pr-6 py-3 rounded-2xl text-white text-sm outline-none"');
c = c.replace('className="relative max-w-xl mx-auto mb-6"', 'className="relative max-w-xl mx-auto mb-4"');

// 6. Fix remaining "124" references
c = c.replace(/Search 124 calculators/g, 'Search 470+ calculators');
c = c.replace(/All \(124\)/g, 'All (470+)');

// 7. Fix "124" in the comment
c = c.replace(/All 124 calculators/g, 'All 470+ calculators');

fs.writeFileSync(f, c, 'utf8');

console.log('');
console.log('  ✅ Hero compacted:');
console.log('     - Padding: py-20 → py-8');
console.log('     - Heading: 5xl/7xl → 3xl/5xl');
console.log('     - Subtitle: xl → base');
console.log('     - Search bar: smaller');
console.log('     - All "124" → "470+"');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Compact homepage hero — calculators visible above the fold"');
console.log('  git push origin master');
console.log('');
