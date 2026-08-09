import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourcePath = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360\\Gentlemens Barber Beer\\6768.jpg';
const targetDir = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360\\public\\panoramas\\gentlemens-barber-beer';
const thumbDir = path.join(targetDir, 'thumbs');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function rotateEquirect180(inputPath) {
  const input = sharp(inputPath);
  const { width, height } = await input.metadata();
  const half = Math.floor(width / 2);
  const rightWidth = width - half;

  // Rotate 180° around the vertical axis: swap left/right halves.
  const rightHalf = await input.clone().extract({ left: half, top: 0, width: rightWidth, height }).toBuffer();
  const leftHalf = await input.clone().extract({ left: 0, top: 0, width: half, height }).toBuffer();

  // Build rotated image as a buffer first to avoid chained composite/clone issues.
  const rotatedBuffer = await sharp({
    create: { width, height, channels: 3, background: { r: 0, g: 0, b: 0 } },
  })
    .composite([
      { input: rightHalf, left: 0, top: 0 },
      { input: leftHalf, left: rightWidth, top: 0 },
    ])
    .jpeg({ quality: 95, progressive: true })
    .toBuffer();

  return sharp(rotatedBuffer);
}

async function main() {
  await ensureDir(targetDir);
  await ensureDir(thumbDir);

  console.log('Rotating 6768.jpg 180°...');
  const rotated = await rotateEquirect180(sourcePath);

  // Full-size panorama
  await rotated
    .clone()
    .resize({ width: 4096, height: 2048, fit: 'inside' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(targetDir, '04.jpg'));

  // Thumbnails
  const thumbBase = path.join(thumbDir, '04.jpg');
  await rotated
    .clone()
    .resize({ width: 600, height: 450, fit: 'cover' })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(thumbBase);

  await rotated
    .clone()
    .resize({ width: 600, height: 450, fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(thumbBase.replace(/\.jpg$/, '.webp'));

  console.log('Done. Output:', path.join(targetDir, '04.jpg'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
