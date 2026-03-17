/**
 * Downloads real product images from Picsum (https://picsum.photos) into
 * frontend/public/images/ as 1.jpg … 10.jpg. Uses seeded URLs so the same
 * image is fetched every time. Run: npm run download-images
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const SIZE = 600; // width/height for square product images

const SEEDS = [
  'shopworthy-headphones',
  'shopworthy-shoes',
  'shopworthy-coffee',
  'shopworthy-yoga',
  'shopworthy-bottle',
  'shopworthy-keyboard',
  'shopworthy-pans',
  'shopworthy-desk',
  'shopworthy-protein',
  'shopworthy-hub',
];

async function download(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let i = 0; i < SEEDS.length; i++) {
    const n = i + 1;
    const url = `https://picsum.photos/seed/${SEEDS[i]}/${SIZE}/${SIZE}`;
    const file = path.join(OUT_DIR, `${n}.jpg`);
    process.stdout.write(`Downloading ${n}.jpg ... `);
    try {
      const buf = await download(url);
      fs.writeFileSync(file, buf);
      console.log('OK');
    } catch (e) {
      console.log('FAIL:', e.message);
    }
  }

  console.log('Done. Product images are in frontend/public/images/ (1.jpg–10.jpg).');
}

main();
