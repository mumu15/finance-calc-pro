const fs = require('fs');
const blogDir = 'app/blog';
const allBlogs = fs.readdirSync(blogDir).filter(d => fs.existsSync(blogDir + '/' + d + '/page.js'));
let fixed = 0;
allBlogs.forEach(blog => {
  const filePath = blogDir + '/' + blog + '/page.js';
  let c = fs.readFileSync(filePath, 'utf8');
  const original = c;
  c = c.replace(/&gt;/g, '>');
  c = c.replace(/Old if deductions >([^\s<])/g, 'Old if deductions &gt;$1');
  if (c !== original) {
    fs.writeFileSync(filePath, c, 'utf8');
    console.log('Fixed: ' + blog);
    fixed++;
  }
});
console.log('Done! Fixed ' + fixed + ' files.');
