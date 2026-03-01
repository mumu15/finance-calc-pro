const fs = require('fs');

const relatedCalcs = {
  'app/mortgage-calculator/page.js': [
    { name: 'Loan Calculator', href: '/loan-calculator', icon: '💳', desc: 'Calculate monthly payments for any loan' },
    { name: 'Rent vs Buy', href: '/rent-vs-buy-calculator', icon: '🏡', desc: 'Compare renting vs buying a home' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
  ],
  'app/loan-calculator/page.js': [
    { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: '🏠', desc: 'Calculate your monthly mortgage payment' },
    { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', icon: '💰', desc: 'Plan your debt payoff strategy' },
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
  ],
  'app/compound-interest/page.js': [
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
    { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴', desc: 'Plan your retirement savings' },
    { name: 'Inflation Calculator', href: '/inflation-calculator', icon: '📉', desc: 'See how inflation affects your money' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
  ],
  'app/savings-calculator/page.js': [
    { name: 'Compound Interest', href: '/compound-interest', icon: '📈', desc: 'See how compound interest grows money' },
    { name: 'Emergency Fund', href: '/emergency-fund-calculator', icon: '🛡️', desc: 'Calculate your emergency fund target' },
    { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴', desc: 'Plan your retirement savings' },
    { name: 'Inflation Calculator', href: '/inflation-calculator', icon: '📉', desc: 'See how inflation affects savings' },
  ],
  'app/retirement-calculator/page.js': [
    { name: 'Compound Interest', href: '/compound-interest', icon: '📈', desc: 'See how compound interest grows money' },
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Inflation Calculator', href: '/inflation-calculator', icon: '📉', desc: 'See how inflation affects savings' },
  ],
  'app/tax-calculator/page.js': [
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
    { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴', desc: 'Plan your retirement savings' },
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
  ],
  'app/debt-payoff-calculator/page.js': [
    { name: 'Loan Calculator', href: '/loan-calculator', icon: '💳', desc: 'Calculate monthly payments for any loan' },
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Emergency Fund', href: '/emergency-fund-calculator', icon: '🛡️', desc: 'Calculate your emergency fund target' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
  ],
  'app/emergency-fund-calculator/page.js': [
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
    { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', icon: '💰', desc: 'Plan your debt payoff strategy' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
  ],
  'app/budget-calculator/page.js': [
    { name: 'Emergency Fund', href: '/emergency-fund-calculator', icon: '🛡️', desc: 'Calculate your emergency fund target' },
    { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', icon: '💰', desc: 'Plan your debt payoff strategy' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
  ],
  'app/net-worth-calculator/page.js': [
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Debt Payoff Calculator', href: '/debt-payoff-calculator', icon: '💰', desc: 'Plan your debt payoff strategy' },
    { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴', desc: 'Plan your retirement savings' },
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
  ],
  'app/rent-vs-buy-calculator/page.js': [
    { name: 'Mortgage Calculator', href: '/mortgage-calculator', icon: '🏠', desc: 'Calculate your monthly mortgage payment' },
    { name: 'Budget Calculator', href: '/budget-calculator', icon: '📋', desc: 'Create a monthly budget plan' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
    { name: 'Loan Calculator', href: '/loan-calculator', icon: '💳', desc: 'Calculate monthly payments for any loan' },
  ],
  'app/inflation-calculator/page.js': [
    { name: 'Savings Calculator', href: '/savings-calculator', icon: '🏦', desc: 'Calculate how your savings grow' },
    { name: 'Compound Interest', href: '/compound-interest', icon: '📈', desc: 'See how compound interest grows money' },
    { name: 'Retirement Calculator', href: '/retirement-calculator', icon: '👴', desc: 'Plan your retirement savings' },
    { name: 'Net Worth Calculator', href: '/net-worth-calculator', icon: '💎', desc: 'Calculate your total net worth' },
  ],
};

const relatedSection = (calcs) => `
          {/* Related Calculators */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              ${calcs.map(calc => `<a href="${calc.href}" className="result-box group hover:-translate-y-1 transition-all duration-300" style={{'--hover':'1'}}>
                <div className="text-3xl mb-3">${calc.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors">${calc.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">${calc.desc}</p>
              </a>`).join('\n              ')}
            </div>
          </div>`;

let fixed = 0;
let skipped = 0;

Object.entries(relatedCalcs).forEach(([file, calcs]) => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Not found: ${file}`);
    skipped++;
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('You Might Also Like')) {
    console.log(`⏭️  Already has related calcs: ${file}`);
    skipped++;
    return;
  }
  content = content.replace(
    '      </main>',
    relatedSection(calcs) + '\n      </main>'
  );
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✅ Added related calcs to: ${file}`);
  fixed++;
});

console.log(`\n🎉 Done! ${fixed} files updated, ${skipped} skipped.`);
console.log('Run: git add . && git commit -m "Add related calculators section to all calc pages" && git push origin master:main');
