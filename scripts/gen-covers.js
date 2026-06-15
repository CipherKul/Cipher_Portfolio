/* eslint-disable no-console */
/* Generates themed PNG cover images for featured + archive projects. */
const sharp = require('sharp');
const path = require('path');

const W = 1400;
const H = 900;
const NAVY = '#0a192f';
const LIGHT_NAVY = '#112240';
const GREEN = '#64ffda';
const SLATE = '#8892b0';

const projects = [
  {
    out: 'content/featured/FreshBuyzar/demo.png',
    mono: 'FB',
    name: 'Fresh Buyzar',
    tag: 'E-commerce · Next.js',
  },
  {
    out: 'content/featured/QRCodeCreator/demo.png',
    mono: 'QR',
    name: 'QR Code Creator',
    tag: 'Tooling · React',
  },
  {
    out: 'content/featured/SEOPlaybookAI/demo.png',
    mono: 'SP',
    name: 'SEO Playbook AI',
    tag: 'AI · Next.js',
  },
];

const svgFor = ({ mono, name, tag }) =>
  `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${LIGHT_NAVY}"/>
    </linearGradient>
    <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="${GREEN}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <circle cx="${W - 180}" cy="180" r="240" fill="${GREEN}" fill-opacity="0.08"/>
  <circle cx="160" cy="${H - 140}" r="180" fill="${GREEN}" fill-opacity="0.05"/>
  <text x="50%" y="46%" text-anchor="middle" dominant-baseline="middle"
        font-family="Calibre, Inter, SF Pro Text, sans-serif" font-weight="800"
        font-size="360" fill="${GREEN}" letter-spacing="-12">${mono}</text>
  <text x="50%" y="73%" text-anchor="middle"
        font-family="Calibre, Inter, SF Pro Text, sans-serif" font-weight="600"
        font-size="64" fill="#ccd6f6">${name}</text>
  <text x="50%" y="82%" text-anchor="middle"
        font-family="SF Mono, Menlo, monospace" font-weight="400"
        font-size="32" fill="${SLATE}">${tag}</text>
</svg>
`.trim();

(async () => {
  for (const p of projects) {
    const outPath = path.join(__dirname, '..', p.out);
    await sharp(Buffer.from(svgFor(p)))
      .png()
      .toFile(outPath);
    console.log('wrote', p.out);
  }
})();
