/* eslint-disable no-console */
const sharp = require('sharp');
const path = require('path');

const NAVY = '#0a192f';
const GREEN = '#64ffda';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
  <polygon
    points="50,5 11,27 11,72 50,95 89,73 89,28"
    fill="${NAVY}"
    stroke="${NAVY}"
    stroke-width="5"
    stroke-linejoin="round"/>
  <text x="50" y="68" text-anchor="middle"
        font-family="Calibre, Inter, SF Pro Text, sans-serif"
        font-size="55" font-weight="700"
        fill="${GREEN}">K</text>
</svg>
`.trim();

(async () => {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  await sharp(buf).resize(512, 512).toFile(path.join(__dirname, '..', 'src/images/logo.png'));

  const favDir = path.join(__dirname, '..', 'src/images/favicons');
  await sharp(buf).resize(16, 16).toFile(path.join(favDir, 'favicon-16x16.png'));
  await sharp(buf).resize(32, 32).toFile(path.join(favDir, 'favicon-32x32.png'));
  await sharp(buf).resize(96, 96).toFile(path.join(favDir, 'favicon-96x96.png'));
  console.log('regenerated logo + favicons');
})();
