const fs = require('fs');
let c = fs.readFileSync('app/PageClient.js', 'utf8');

// Remove the broken style tag completely
c = c.replace(/<style dangerouslySetInnerHTML=\{\{__html:.*?\}\} \/>/s, '');

// Also remove any leftover empty style tags
c = c.replace(/<style>\{`[^`]*`\}<\/style>/g, '');

// Now add the CSS as a proper style tag inside the return, right before <Footer />
const css = `a[href]:hover .tool-name{color:#f0c842!important}
a[href]:hover .pop-name{color:#f0c842!important}
.tool-link:hover{border-color:rgba(240,200,66,0.3)!important;background:rgba(240,200,66,0.06)!important}
.pop-link:hover{border-color:rgba(240,200,66,0.3)!important;transform:translateY(-2px)}
.comp-link:hover{background:rgba(99,102,241,0.12)!important;color:#c4b5fd!important}
.col-link:hover{color:#f0c842!important;border-color:rgba(240,200,66,0.3)!important}`;

c = c.replace(
  '      <Footer />',
  '      <style dangerouslySetInnerHTML={{__html: `' + css + '`}} />\n      <Footer />'
);

fs.writeFileSync('app/PageClient.js', c, 'utf8');
console.log('Fixed style tag properly');
