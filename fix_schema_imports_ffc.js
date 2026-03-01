const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(f => {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) files.push(...walk(p));
    else if (f.name === 'page.js') files.push(p);
  });
  return files;
}

let fixed = 0;

walk('app').forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix wrong import paths - replace ../../../components with ../../components for top level pages
  if (content.includes("from '../../../components/BreadcrumbSchema'") && 
      !file.includes('app\\blog\\') && !file.includes('app/blog/')) {
    content = content.replace(
      "from '../../../components/BreadcrumbSchema'",
      "from '../../components/BreadcrumbSchema'"
    );
    content = content.replace(
      "from '../../../components/WebAppSchema'",
      "from '../../components/WebAppSchema'"
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed imports in: ${file}`);
    fixed++;
  }
});

console.log(`\n🎉 Done! ${fixed} files fixed.`);
console.log('Run: git add . && git commit -m "Fix schema import paths" && git push origin master:main');
