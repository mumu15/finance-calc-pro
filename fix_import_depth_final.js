const fs = require('fs');
const path = require('path');

let fixed = 0;

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules','.next','public','data'].includes(entry.name)) return;
      walkDir(fp);
    } else if (entry.name.endsWith('Client.js')) {
      let c = fs.readFileSync(fp, 'utf8');
      if (!c.includes('SchemaMarkup') && !c.includes('AdUnit')) return;

      // Calculate correct number of ../ needed
      // File at app/a/b/c/File.js → segments = ['app','a','b','c','File.js'] → need 4 x ../
      const segments = fp.split(path.sep);
      const depth = segments.length - 1; // number of directories deep
      const correct = '../'.repeat(depth);

      let changed = false;
      const original = c;

      // Replace any wrong number of ../ before components/AdUnit or components/SchemaMarkup
      c = c.replace(/(?:\.\.\/)+components\/AdUnit/g, correct + 'components/AdUnit');
      c = c.replace(/(?:\.\.\/)+components\/SchemaMarkup/g, correct + 'components/SchemaMarkup');

      if (c !== original) {
        fs.writeFileSync(fp, c, 'utf8');
        fixed++;
        if (fixed <= 10) console.log('✅ [' + correct.slice(0,-1) + '] ' + fp);
      }
    }
  });
}

walkDir('app');
console.log('\n✅ Fixed: ' + fixed + ' files');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix AdUnit/SchemaMarkup import depths — exact path per file depth"');
console.log('  git push origin master');
