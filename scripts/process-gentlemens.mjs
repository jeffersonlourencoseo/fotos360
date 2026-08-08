import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360\\Gentlemens Barber Beer';
const targetDir = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360\\public\\panoramas\\gentlemens-barber-beer';

const files = [
  { src: '6759.jpg', dest: '01.jpg' },
  { src: '6760.jpg', dest: '02.jpg' },
  { src: '6766.jpg', dest: '03.jpg' },
  { src: '6768.jpg', dest: '04.jpg' },
  { src: '6769.jpg', dest: '05.jpg' },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processImage(srcPath, destBase) {
  const input = sharp(srcPath).withMetadata({ exif: {} });

  // Full-size panorama: reduce to 4096px wide, high-quality JPEG
  await input
    .clone()
    .resize({ width: 4096, height: 2048, fit: 'inside' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(targetDir, destBase));

  // Thumbnail: 600x450 cover crop for cards and viewer thumbnails
  const thumbBase = path.join(targetDir, 'thumbs', destBase);
  await input
    .clone()
    .resize({ width: 600, height: 450, fit: 'cover' })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(thumbBase);

  await input
    .clone()
    .resize({ width: 600, height: 450, fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(thumbBase.replace(/\.jpg$/, '.webp'));
}

async function main() {
  await ensureDir(targetDir);
  await ensureDir(path.join(targetDir, 'thumbs'));

  for (const { src, dest } of files) {
    const srcPath = path.join(sourceDir, src);
    console.log(`Processing ${src} -> ${dest}...`);
    await processImage(srcPath, dest);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
