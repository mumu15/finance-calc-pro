const fs = require('fs');
const path = require('path');

let fixed = 0;

function fixClientFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix the broken JSX expressions - replace {fmt(result.X){'}'} with {fmt(result.X)}
  content = content.replace(/\{fmt\(result\.monthly\)\{'\}'\}/g, '{fmt(result.monthly)}');
  content = content.replace(/\{fmt\(result\.total\)\{'\}'\}/g, '{fmt(result.total)}');
  content = content.replace(/\{fmt\(result\.interest\)\{'\}'\}/g, '{fmt(result.interest)}');
  content = content.replace(/\{fmt\(result\.gains\)\}/g, '{fmt(result.gains)}');

  // Also fix any $ signs that got mangled - ${'{'}fmt(...) should be {fmt(...)}
  content = content.replace(/\$\{'\{'\}fmt\(result\.monthly\)\}/g, '{fmt(result.monthly)}');
  content = content.replace(/\$\{'\{'\}fmt\(result\.total\)\}/g, '{fmt(result.total)}');
  content = content.replace(/\$\{'\{'\}fmt\(result\.interest\)\}/g, '{fmt(result.interest)}');
  content = content.replace(/\$\{'\{'\}fmt\(result\.gains\)\}/g, '{fmt(result.gains)}');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed: ' + filePath);
    fixed++;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name === 'Client.js') {
      fixClientFile(fullPath);
    }
  });
}

// Fix all batches
walkDir(path.join('app', 'personal-loan'));
walkDir(path.join('app', 'student-loan'));
walkDir(path.join('app', 'investment-return-calculator'));
walkDir(path.join('app', 'debt-payoff-calculator'));

console.log('\n🎉 Fixed ' + fixed + ' files');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix JSX syntax errors in Client.js files"');
console.log('  git push origin master');
