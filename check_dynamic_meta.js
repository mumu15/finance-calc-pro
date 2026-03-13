const fs = require('fs');
const path = require('path');

// Check all dynamic page.js files and show their generateMetadata block
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') return;
      walkDir(fullPath);
    } else if (entry.name === 'page.js' && fullPath.includes('[')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Extract generateMetadata block
      const match = content.match(/export async function generateMetadata[\s\S]{0,300}?^\}/m);
      if (match) {
        console.log('\n📄 ' + fullPath);
        console.log(match[0].trim());
      } else {
        console.log('\n❌ NO generateMetadata: ' + fullPath);
      }
    }
  });
}

walkDir('app');
