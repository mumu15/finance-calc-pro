const fs = require('fs');
const path = require('path');

const APP = path.join(__dirname, 'app');
const globalsFile = path.join(APP, 'globals.css');

let content = fs.readFileSync(globalsFile, 'utf8');

// Remove the old calc-input CSS block
content = content.replace(/\/\* =+\s*PREMIUM CALCULATOR INPUTS[\s\S]*?\.slider-upgrade:focus \{[^}]*\}\s*/g, '');

// Add the fixed version with !important overrides
const fixedCSS = `
/* ============================================
   PREMIUM CALCULATOR INPUTS
   ============================================ */
.calc-input,
input.calc-input,
input[type="number"].calc-input {
  width: 100% !important;
  background: #0f1117 !important;
  border: 1.5px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px !important;
  padding: 14px 16px !important;
  color: #f0c842 !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  font-family: inherit !important;
  outline: none !important;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s !important;
  -moz-appearance: textfield !important;
  -webkit-appearance: none !important;
  appearance: none !important;
}
.calc-input::-webkit-outer-spin-button,
.calc-input::-webkit-inner-spin-button,
input.calc-input::-webkit-outer-spin-button,
input.calc-input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
.calc-input:hover,
input.calc-input:hover {
  border-color: rgba(240, 200, 66, 0.4) !important;
  background: #131620 !important;
}
.calc-input:focus,
input.calc-input:focus {
  border-color: #f0c842 !important;
  box-shadow: 0 0 0 3px rgba(240, 200, 66, 0.15) !important;
  background: #131620 !important;
  color: #f0c842 !important;
}
.calc-input::placeholder,
input.calc-input::placeholder {
  color: #475569 !important;
  font-weight: 400 !important;
}

/* Tailwind-based pages */
input[type="number"].slider-upgrade {
  width: 100% !important;
  background: #0f1117 !important;
  border: 1.5px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px !important;
  padding: 14px 16px !important;
  color: #f0c842 !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  font-family: inherit !important;
  outline: none !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
  -moz-appearance: textfield !important;
  -webkit-appearance: none !important;
  appearance: none !important;
}
input[type="number"].slider-upgrade::-webkit-outer-spin-button,
input[type="number"].slider-upgrade::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
input[type="number"].slider-upgrade:hover {
  border-color: rgba(240, 200, 66, 0.4) !important;
  background: #131620 !important;
}
input[type="number"].slider-upgrade:focus {
  border-color: #f0c842 !important;
  box-shadow: 0 0 0 3px rgba(240, 200, 66, 0.15) !important;
  background: #131620 !important;
}
`;

content += fixedCSS;
fs.writeFileSync(globalsFile, content, 'utf8');

console.log('');
console.log('✅ Fixed input styling:');
console.log('   - Dark background (#0f1117) with !important');
console.log('   - Gold text (#f0c842) with !important');
console.log('   - Browser defaults fully overridden');
console.log('   - Gold focus ring on click');
console.log('');
console.log('Now run:');
console.log('  git add .');
console.log('  git commit -m "Fix input visibility - dark bg + gold text"');
console.log('  git push origin master');
console.log('');
