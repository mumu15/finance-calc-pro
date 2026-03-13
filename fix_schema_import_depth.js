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
      
      // Calculate correct depth: count path separators from project root
      const segments = fp.split(path.sep);
      // segments: ['app','route','sub','[param]','File.js'] = 5 parts
      // need to go up (length-1) levels from file to reach project root
      const depth = segments.length - 1;
      const correctDots = '../'.repeat(depth - 1);
      const wrongDots3 = '../../../';
      const wrongDots2 = '../../';

      let changed = false;

      // Fix SchemaMarkup path
      if (c.includes(wrongDots3 + 'components/SchemaMarkup')) {
        c = c.replace(new RegExp('\\.\\./\\.\\./\\.\\./components/SchemaMarkup', 'g'), correctDots + 'components/SchemaMarkup');
        changed = true;
      }
      if (c.includes(wrongDots2 + 'components/SchemaMarkup')) {
        c = c.replace(new RegExp('\\.\\./\\.\\./components/SchemaMarkup', 'g'), correctDots + 'components/SchemaMarkup');
        changed = true;
      }

      // Fix AdUnit path
      if (c.includes(wrongDots3 + 'components/AdUnit')) {
        c = c.replace(new RegExp('\\.\\./\\.\\./\\.\\./components/AdUnit', 'g'), correctDots + 'components/AdUnit');
        changed = true;
      }
      if (c.includes(wrongDots2 + 'components/AdUnit')) {
        c = c.replace(new RegExp('\\.\\./\\.\\./components/AdUnit', 'g'), correctDots + 'components/AdUnit');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fp, c, 'utf8');
        fixed++;
        if (fixed <= 10) console.log('✅ [depth=' + depth + ', dots=' + correctDots + '] ' + fp);
      }
    }
  });
}

walkDir('app');
console.log('\n✅ Fixed import paths in ' + fixed + ' files');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix SchemaMarkup/AdUnit import path depth in client files"');
console.log('  git push origin master');
