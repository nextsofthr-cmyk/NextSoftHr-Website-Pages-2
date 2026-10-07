const fs = require('fs');
const path = require('path');

const dirs = [
  'about us', 'about-us-2', 'blog', 'contact', 'faq', 'homepage',
  'outsourcing', 'partner-commission-1', 'partner-commission-2',
  'partner-registry', 'partners', 'partners-agreement', 'pricing',
  'privacy-policy', 'refund-policy', 'services', 'sign-in',
  'terms & condition', 'training'
];

const hrefMap = {};

function findHrefs(dir, page) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      findHrefs(full, page);
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/href=["']([^"']+)["']/g);
      if (matches) {
        matches.forEach(m => {
          const val = m.replace(/href=["']/, '').replace(/["']$/, '');
          if (!val.startsWith('http') && !val.startsWith('mailto:') && !val.startsWith('tel:') && !val.startsWith('#') && val !== '/') {
            if (!hrefMap[val]) hrefMap[val] = [];
            hrefMap[val].push(`${page}:${item.name}`);
          }
        });
      }
    }
  }
}

for (const d of dirs) {
  findHrefs(path.join(d, 'src'), d);
}

console.log('Internal relative hrefs found:');
for (const [k, v] of Object.entries(hrefMap)) {
  console.log(`  ${k} (used in ${v.length} places)`);
}
