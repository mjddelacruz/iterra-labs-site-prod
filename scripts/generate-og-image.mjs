import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = join(root, 'public/iterra labs white logo copy.png');
const outPath = join(root, 'public/og-image.png');

const CANVAS = { width: 1200, height: 630 };
const LOGO_MAX_WIDTH = 1100;

const logoMeta = await sharp(logoPath).metadata();
const logoHeight = Math.round(LOGO_MAX_WIDTH * (logoMeta.height / logoMeta.width));

const logoBuffer = await sharp(logoPath)
  .resize(LOGO_MAX_WIDTH, logoHeight, { fit: 'inside' })
  .png()
  .toBuffer();

await sharp({
  create: {
    ...CANVAS,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
})
  .composite([{ input: logoBuffer, gravity: 'center' }])
  .png()
  .toFile(outPath);

console.log(`Wrote ${outPath} (${CANVAS.width}x${CANVAS.height})`);
