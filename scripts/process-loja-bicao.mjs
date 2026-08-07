import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360';

const jobs = [
  {
    id: 'loja-apimentada',
    name: 'Loja Apimentada',
    category: 'Loja',
    sourceDir: path.join(root, 'Apimentada Fashion'),
    files: [
      { src: '6272.jpg', dest: '01.jpg' },
      { src: '6273.jpg', dest: '02.jpg' },
      { src: '6274.jpg', dest: '03.jpg' },
      { src: '6275.jpg', dest: '04.jpg' },
      { src: '6276.jpg', dest: '05.jpg' },
      { src: '6279.jpg', dest: '06.jpg' },
      { src: '6280.jpg', dest: '07.jpg' },
    ],
  },
  {
    id: 'restaurante-seu-bicao',
    name: 'Seu Restaurante Bicão',
    category: 'Restaurante',
    sourceDir: path.join(root, 'Seu Restaurante Bicão'),
    files: [
      { src: '5678.jpg', dest: '01.jpg' },
      { src: '5705.jpg', dest: '02.jpg' },
      { src: '5706.jpg', dest: '03.jpg' },
      { src: '5707.jpg', dest: '04.jpg' },
      { src: '5710.jpg', dest: '05.jpg' },
      { src: '5717.jpg', dest: '06.jpg' },
    ],
  },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processImage(sourceDir, targetDir, src, destBase) {
  const srcPath = path.join(sourceDir, src);
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

  const stats = await fs.stat(path.join(targetDir, destBase));
  console.log(`  ✓ ${destBase}: ${Math.round(stats.size / 1024)} KB`);
}

async function processJob(job) {
  const targetDir = path.join(root, 'public', 'panoramas', job.id);
  await ensureDir(targetDir);
  await ensureDir(path.join(targetDir, 'thumbs'));

  console.log(`\nProcessando ${job.name}...`);
  for (const { src, dest } of job.files) {
    await processImage(job.sourceDir, targetDir, src, dest);
  }

  return {
    id: job.id,
    name: job.name,
    category: job.category,
    thumbnail: `/panoramas/${job.id}/thumbs/01`,
    photos: job.files.map((f) => `/panoramas/${job.id}/${f.dest}`),
  };
}

async function main() {
  const entries = [];
  for (const job of jobs) {
    entries.push(await processJob(job));
  }

  console.log('\n--- Adicione no src/data/clients.js ---\n');
  console.log(JSON.stringify(entries, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
