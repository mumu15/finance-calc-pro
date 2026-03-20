const fs = require('fs');
const c = fs.readFileSync('app/sitemap.js', 'utf8');
const lines = c.split('\n');
console.log('Total lines:', lines.length);
console.log('');

// Find lines with "url:" that don't have a proper path
const bad = [];
lines.forEach((l, i) => {
  if (l.includes('url:') && !l.includes('"/')) {
    bad.push((i + 1) + ': ' + l.trim());
  }
});

console.log('Bad URL lines:', bad.length);
bad.forEach(l => console.log('  ' + l));

console.log('');
console.log('--- Last 10 lines ---');
lines.slice(-10).forEach((l, i) => {
  console.log((lines.length - 9 + i) + ': ' + l);
});

console.log('');
console.log('--- Around line with .map if any ---');
lines.forEach((l, i) => {
  if (l.includes('.map(entry')) {
    for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 5); j++) {
      console.log((j + 1) + ': ' + lines[j]);
    }
  }
});
