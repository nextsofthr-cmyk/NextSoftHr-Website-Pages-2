const fs = require('fs');
const path = require('path');

const dirs = [
  'about us', 'about-us-2', 'blog', 'contact', 'faq', 'homepage',
  'outsourcing', 'partner-commission-1', 'partner-commission-2',
  'partner-registry', 'partners', 'partners-agreement', 'pricing',
  'privacy-policy', 'refund-policy', 'services', 'sign-in',
  'terms & condition', 'training'
];

for (const d of dirs) {
  const cssFile = path.join(d, 'src', 'index.css');
  const htmlFile = path.join(d, 'index.html');
  console.log('=== ' + d + ' ===');
  if (fs.existsSync(htmlFile)) {
    const html = fs.readFileSync(htmlFile, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/);
    console.log('Title:', title ? title[1] : 'none');
    const fontLinks = html.split('\n').filter(l => l.includes('fonts.googleapis.com'));
    if (fontLinks.length) {
      console.log('Fonts:', fontLinks.map(l => l.trim()));
    }
  }
  if (fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, 'utf8');
    console.log('CSS length:', css.length);
    console.log('CSS preview:', css.slice(0, 150).replace(/\n/g, ' '));
  }
}
