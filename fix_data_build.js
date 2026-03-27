const fs = require('fs');
let c = fs.readFileSync('build_data_pages.js', 'utf8');

// The problem: inside the backtick template literal for clientJS,
// ${Math.round(s.medianIncome)} gets evaluated by Node instead of being literal output.
// Fix: replace the JSX expression with string concatenation

// Find the clientJS template and replace the problematic line
c = c.replace(
  "<td style={{...st.td,color:'#94a3b8'}}>${Math.round(s.medianIncome).toLocaleString()}</td>",
  "<td style={{...st.td,color:'#94a3b8'}}>{'$' + Math.round(s.medianIncome).toLocaleString()}</td>"
);

fs.writeFileSync('build_data_pages.js', c);
console.log('Fixed template literal. Now run: node build_data_pages.js');
