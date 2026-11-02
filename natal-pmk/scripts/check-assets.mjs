import {readFile, stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {projectRoot, validateLogo} from './import-logos.mjs';

const draft = process.argv.includes('--draft');
let missingRequired = 0;
async function requireFile(relativePath) {
  try {
    if (!(await stat(resolve(projectRoot, relativePath))).isFile()) throw new Error('not a file');
    console.log(`OK ${relativePath}`);
  } catch {
    missingRequired++;
    console.error(`MISSING ${relativePath}`);
  }
}
for (const scene of ['opening', 'togetherness', 'gift', 'nativity', 'sunrise', 'worship']) {
  await requireFile(`public/scenes/${scene}.png`);
}
for (const font of ['CormorantGaramond.ttf', 'GreatVibes.ttf', 'Manrope.ttf']) await requireFile(`public/fonts/${font}`);

let logos = {};
try { logos = JSON.parse(await readFile(resolve(projectRoot, 'src/config/logo-assets.json'), 'utf8')); } catch { /* handled per logo below */ }
for (const [key, label] of [['uny', 'Logo UNY'], ['natal', 'Logo Natal']]) {
  try {
    if (typeof logos[key] !== 'string' || !/^logos\/(?:uny|natal)\.(?:png|jpg|jpeg|webp|svg)$/.test(logos[key])) throw new Error('belum diimpor');
    const bytes = await readFile(resolve(projectRoot, 'public', logos[key]));
    validateLogo(bytes, label);
    console.log(`OK ${label}: public/${logos[key]}`);
  } catch (error) {
    const message = `${label} belum tersedia atau tidak valid: ${error.message}`;
    if (draft) console.warn(`DRAFT WARNING ${message}. Placeholder pengembangan akan tampil.`);
    else { missingRequired++; console.error(`MISSING ${message}`); }
  }
}
const audio = JSON.parse(await readFile(resolve(projectRoot, 'src/config/audio.json'), 'utf8'));
if (audio.src) {
  const audioPath = resolve(projectRoot, 'public', audio.src);
  if (!audioPath.startsWith(resolve(projectRoot, 'public') + '/')) {
    missingRequired++;
    console.error('MISSING Jalur audio harus berada di dalam public/.');
  } else await requireFile(`public/${audio.src}`);
} else console.warn('OPTIONAL Musik tidak diaktifkan; video draf tanpa musik.');
if (missingRequired) {
  console.error(`${missingRequired} aset wajib belum tersedia. Pasang logo dengan: node scripts/import-logos.mjs /path/uny.png /path/natal.png`);
  process.exitCode = 1;
} else {
  console.log(draft ? 'Aset pratinjau diperiksa. Ini bukan konfirmasi kelengkapan logo produksi.' : 'Aset wajib tersedia.');
}
