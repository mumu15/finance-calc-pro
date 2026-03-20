const fs = require('fs');
const path = require('path');

const smFile = path.join(__dirname, 'app', 'sitemap.js');
let sm = fs.readFileSync(smFile, 'utf8');

// Fix: remove trailing commas before ] that cause undefined entries
sm = sm.replace(/,\s*\n\s*\]/g, '\n  ]');

// Also fix any double commas
sm = sm.replace(/,\s*,/g, ',');

// Fix any empty entries like { url: undefined }
sm = sm.replace(/\{[^}]*undefined[^}]*\},?\n?/g, '');

fs.writeFileSync(smFile, sm, 'utf8');

// Verify by counting
const urlCount = (sm.match(/url:/g) || []).length;
console.log('  ✅ Fixed sitemap — ' + urlCount + ' URLs');
console.log('');
console.log('Now run:');
console.log('  git add . && git commit -m "Fix sitemap trailing comma" && git push origin master');
