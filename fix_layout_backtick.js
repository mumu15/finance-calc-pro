const fs = require('fs');
const path = require('path');

let fixed = 0;

function fixLayout(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // The broken pattern looks like: description: `...month.`,` },
  // The `,` }, at end is the leftover from alternates removal
  // specifically: the template literal canonical `https://.../${params.x}` 
  // had its } eaten by [^}]* so we got leftover: ` },

  // Fix: remove the stray `,` }, pattern that appears after a description backtick
  // Pattern: `,` }, on its own or at end of line
  content = content.replace(/`,`\s*\},?/g, '`,');
  // Also fix: ` }, that appears as stray remnant  
  content = content.replace(/`\s*\},\s*\n(\s*\})/g, '\n$1');
  // Fix lone stray: ` }, after a comma
  content = content.replace(/,`\s*\},/g, ',');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ ' + filePath);
    fixed++;
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') return;
      walkDir(fullPath);
    } else if (entry.name === 'layout.js') {
      fixLayout(fullPath);
    }
  });
}

walkDir('app');
console.log('\n✅ Fixed ' + fixed + ' layout.js files');
console.log('\nNow run:');
console.log('  git add .');
console.log('  git commit -m "Fix stray backtick syntax in layout.js files"');
console.log('  git push origin master');
