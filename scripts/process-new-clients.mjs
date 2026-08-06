import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = 'C:\\Users\\jeffe\\Desktop\\PROJETOS\\SITE PORTFOLIO 360';

const clients = [
  {
    id: 'academia-professor-silva-ribeiro',
    name: 'Academia Professor Silva Ribeiro',
    category: 'Academia',
    sourceDir: path.join(root, 'ACADEMIA PROFESSOR SILVA RIBEIRO'),
    sourceFile: 'Academia.jpeg',
  },
  {
    id: 'clinica-dr-fernando-silva',
    name: 'Clínica Dr. Fernando Silva',
    category: 'Clínica Odontológica',
    sourceDir: path.join(root, 'CLINICA DR. FERNANDO SILVA'),
    sourceFile: 'Dentista.jpeg',
  },
  {
    id: 'clinica-gastros',
    name: "Clínica Gastro's",
    category: 'Clínica',
    sourceDir: path.join(root, "CLINICA GASTRO'S"),
    sourceFile: 'Clínica.jpg',
  },
  {
    id: 'clinica-nivea-odonto',
    name: 'Clínica Nívea Odonto',
    category: 'Clínica Odontológica',
    sourceDir: path.join(root, 'CLINICA NIVEA ODONTO'),
    sourceFile: 'Interna clínica.jpeg',
  },
  {
    id: 'escola-tia-laura',
    name: 'Escola Tia Laura',
    category: 'Escola',
    sourceDir: path.join(root, 'ESCOLA TIA LAURA'),
    sourceFile: 'Escola Creche Parquinho.jpg',
  },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function processClient(client) {
  const targetDir = path.join(root, 'public', 'panoramas', client.id);
  const srcPath = path.join(client.sourceDir, client.sourceFile);
  const destBase = '01.jpg';

  await ensureDir(targetDir);
  await ensureDir(path.join(targetDir, 'thumbs'));

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
  console.log(`✓ ${client.name}: ${Math.round(stats.size / 1024)} KB`);

  return {
    id: client.id,
    name: client.name,
    category: client.category,
    thumbnail: `/panoramas/${client.id}/thumbs/01`,
    photos: [`/panoramas/${client.id}/01.jpg`],
  };
}

async function main() {
  const entries = [];
  for (const client of clients) {
    entries.push(await processClient(client));
  }

  // Print entries ready to paste into clients.js
  console.log('\n--- Adicione no src/data/clients.js ---\n');
  console.log(JSON.stringify(entries, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
