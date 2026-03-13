const fs = require('fs');
const path = require('path');

// Good one (has H1 + AdSense + Schema)
const good = path.join('app','personal-loan','purpose','wedding','page.js');
// Bad one (missing all three)  
const bad = path.join('app','retirement-calculator','age','[age]','Client.js');
// Another bad one
const bad2 = path.join('app','budget-calculator','city','[city]','Client.js');

[['GOOD (personal-loan/purpose/wedding)', good], 
 ['BAD (retirement/age)', bad],
 ['BAD2 (budget/city)', bad2]
].forEach(([label, f]) => {
  console.log('\n═══ ' + label + ' ═══');
  if (fs.existsSync(f)) console.log(fs.readFileSync(f, 'utf8').slice(0, 1500));
  else console.log('NOT FOUND');
});
