const fs = require('fs');
const path = require('path');
const f = path.join('app','mortgage-calculator','[city]','layout.js');
console.log(fs.readFileSync(f,'utf8'));
