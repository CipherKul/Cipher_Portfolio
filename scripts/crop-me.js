/* eslint-disable no-console */
const path = require('path');
const sharp = require('sharp');

const SRC = '/Users/kuldeepvaishnav01/Desktop/Kuldeep image.jpeg';
const OUT = path.join(__dirname, '..', 'src/images/me.jpg');

// Source: 960 x 1280 portrait. Face center ~ (485, 430).
// Tight head + shoulders square.
const SIZE = 560;
const LEFT = 205;
const TOP = 200;
const FINAL = 800;

(async () => {
  await sharp(SRC)
    .extract({ left: LEFT, top: TOP, width: SIZE, height: SIZE })
    .resize(FINAL, FINAL)
    .modulate({ brightness: 1.08, saturation: 1.05 })
    .linear(1.08, -8)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(OUT);
  console.log('wrote', OUT);
})();
