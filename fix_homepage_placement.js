const fs = require('fs');

let c = fs.readFileSync('app/PageClient.js', 'utf8');

// Remove the misplaced data section (between return ( and <div style={st.page}>)
const dataStart = c.indexOf('{/* Data & Research Section */}');
const mainDiv = c.indexOf('<div style={st.page}>', dataStart);

if (dataStart > -1 && mainDiv > -1) {
  // Extract the data section HTML
  const dataSection = c.substring(dataStart, mainDiv).trim();
  
  // Remove it from wrong location
  c = c.substring(0, dataStart) + c.substring(mainDiv);
  
  // Now insert it before <Footer
  const footerIdx = c.lastIndexOf('<Footer');
  if (footerIdx > -1) {
    c = c.substring(0, footerIdx) + dataSection + '\n      ' + c.substring(footerIdx);
    console.log('Moved data section before Footer');
  }
} else {
  console.log('Data section not found in wrong place, checking if already correct...');
}

fs.writeFileSync('app/PageClient.js', c);
console.log('Fixed! Now run: git add . && git commit -m "Fix homepage data section" && git push origin master');
