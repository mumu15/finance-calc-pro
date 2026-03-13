const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components', 'SchemaMarkup.js');

if (!fs.existsSync(file)) {
  console.log('❌ Could not find components/SchemaMarkup.js');
  process.exit(1);
}

let content = fs.readFileSync(file, 'utf8');

// Fix: add default empty array for breadcrumbs prop
const old = '{ breadcrumbs, includeReview = false }';
const fixed = '{ breadcrumbs = [], includeReview = false }';

if (content.includes(fixed)) {
  console.log('✅ Already fixed! breadcrumbs already has default value.');
  process.exit(0);
}

if (!content.includes(old)) {
  console.log('❌ Could not find the expected code pattern. File may have been modified.');
  process.exit(1);
}

content = content.replace(old, fixed);
fs.writeFileSync(file, content, 'utf8');

console.log('');
console.log('✅ Fixed SchemaMarkup.js — breadcrumbs now defaults to [] when not passed');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix SchemaMarkup crash when breadcrumbs prop is missing"');
console.log('  git push origin master');
console.log('');
