import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360';
const clientId = 'barbearia-di-souza';
const clientName = 'Barbearia Di Souza';
const clientCategory = 'Barbearia';
const sourceDir = path.join(root, 'Barbearia Di_Souza');
const targetDir = path.join(root, 'public', 'panoramas', clientId);

const files = [
  { src: '4925.jpg', dest: '01.jpg' },
  { src: '4926.jpg', dest: '02.jpg' },
  { src: '4927.jpg', dest: '03.jpg' },
  { src: '4931.jpg', dest: '04.jpg' },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processImage(srcPath, destBase) {
  const input = sharp(srcPath).withMetadata({ exif: {} });

  await input
    .clone()
    .resize({ width: 4096, height: 2048, fit: 'inside' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(path.join(targetDir, destBase));

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

  const stats = await fs.stat(path.join(targetDir, destBase));
  console.log(`✓ ${destBase}: ${Math.round(stats.size / 1024)} KB`);
}

async function main() {
  await ensureDir(targetDir);
  await ensureDir(path.join(targetDir, 'thumbs'));

  for (const { src, dest } of files) {
    const srcPath = path.join(sourceDir, src);
    console.log(`Processing ${src} -> ${dest}...`);
    await processImage(srcPath, dest);
  }

  console.log('\n--- Adicione no src/data/clients.js ---\n');
  console.log(JSON.stringify({
    id: clientId,
    name: clientName,
    category: clientCategory,
    thumbnail: `/panoramas/${clientId}/thumbs/01`,
    photos: files.map(f => `/panoramas/${clientId}/${f.dest}`),
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
