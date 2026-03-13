const fs = require('fs');
const path = require('path');

// app/home-affordability-calculator/income/[slug]/Client.js = 4 levels deep
// Header/Footer: ../../../../components/Header
// AdUnit: ../../../components/AdUnit  (lives in app/components/)

const incomeDir = path.join('app', 'home-affordability-calculator', 'income');
let fixed = 0;

fs.readdirSync(incomeDir, { withFileTypes: true }).forEach(entry => {
  if (!entry.isDirectory()) return;
  const clientFile = path.join(incomeDir, entry.name, 'Client.js');
  if (!fs.existsSync(clientFile)) return;

  let content = fs.readFileSync(clientFile, 'utf8');
  
  content = content
    .replace(/['"]\.\.\/\.\.\/\.\.\/components\/Header['"]/g, "'../../../../components/Header'")
    .replace(/['"]\.\.\/\.\.\/\.\.\/components\/Footer['"]/g, "'../../../../components/Footer'")
    .replace(/['"]\.\.\/\.\.\/components\/AdUnit['"]/g,       "'../../../components/AdUnit'");

  fs.writeFileSync(clientFile, content, 'utf8');
  fixed++;
});

console.log('✅ Fixed imports in ' + fixed + ' Client.js files');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix import paths in home-affordability income Client.js files"');
console.log('  git push origin master');
