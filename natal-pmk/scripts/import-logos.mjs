import {createHash, randomUUID} from 'node:crypto';
import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const maxLogoBytes = 15 * 1024 * 1024;

export function validateLogo(bytes, label = 'Logo') {
  if (!Buffer.isBuffer(bytes) || bytes.length === 0) throw new Error(`${label}: berkas kosong.`);
  if (bytes.length > maxLogoBytes) throw new Error(`${label}: ukuran maksimal 15 MB.`);
  if (bytes.length >= 33 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    if (bytes.toString('ascii', 12, 16) !== 'IHDR' || !bytes.readUInt32BE(16) || !bytes.readUInt32BE(20)) {
      throw new Error(`${label}: header PNG tidak valid.`);
    }
    if (!bytes.subarray(-12).equals(Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]))) {
      throw new Error(`${label}: PNG tidak lengkap.`);
    }
    return 'png';
  }
  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    if (bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) throw new Error(`${label}: JPEG tidak lengkap.`);
    return 'jpg';
  }
  if (bytes.length >= 20 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    if (bytes.readUInt32LE(4) + 8 !== bytes.length) throw new Error(`${label}: ukuran WebP tidak valid.`);
    return 'webp';
  }
  const text = bytes.toString('utf8').replace(/^\uFEFF/, '').trim();
  const svg = text.replace(/^<\?xml[^?]*\?>\s*/i, '');
  if (/^<svg(?:\s|>)/i.test(svg) && /<\/svg>\s*$/i.test(svg)) {
    // Logos are local image assets: prohibit executable and externally resolved SVG content.
    if (/<\s*(?:script|foreignObject|iframe|object|embed|audio|video|a)\b|<!|<\?|\bon[a-z]+\s*=|\\/i.test(svg)) {
      throw new Error(`${label}: SVG harus statis, tanpa skrip, entitas, atau konten aktif.`);
    }
    for (const match of svg.matchAll(/(?:href|src)\s*=\s*(["'])(.*?)\1/gi)) {
      if (!/^#[A-Za-z_][\w:.-]*$/.test(match[2])) throw new Error(`${label}: SVG tidak boleh memuat referensi eksternal.`);
    }
    if (/(?:href|src)\s*=\s*[^"'\s]|@import|https?:|\/\/|&#|&[A-Za-z][\w.-]*;/i.test(svg.replace(/xmlns(?::[\w-]+)?\s*=\s*(["'])[^"']*\1/g, ''))) {
      throw new Error(`${label}: SVG mengandung referensi yang tidak didukung. Gunakan PNG atau SVG mandiri.`);
    }
    for (const match of svg.matchAll(/url\s*\(([^)]*)\)/gi)) {
      if (!/^\s*["']?#[A-Za-z_][\w:.-]*["']?\s*$/.test(match[1])) throw new Error(`${label}: SVG tidak boleh memuat URL eksternal.`);
    }
    return 'svg';
  }
  throw new Error(`${label}: gunakan berkas PNG, JPEG, WebP, atau SVG statis yang valid.`);
}

async function atomicWrite(path, bytes) {
  await mkdir(dirname(path), {recursive: true});
  const temporaryPath = `${path}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, bytes);
  await rename(temporaryPath, path);
}

export async function importLogoBuffers(uny, natal, root = projectRoot) {
  // Validate both before saving either; artwork bytes are never transformed.
  const unyExtension = validateLogo(uny, 'Logo UNY');
  const natalExtension = validateLogo(natal, 'Logo Natal');
  const assets = {uny: `logos/uny.${unyExtension}`, natal: `logos/natal.${natalExtension}`};
  const entries = [
    {name: 'Logo UNY', path: assets.uny, sha256: createHash('sha256').update(uny).digest('hex'), bytes: uny.length},
    {name: 'Logo Natal', path: assets.natal, sha256: createHash('sha256').update(natal).digest('hex'), bytes: natal.length},
  ];
  await atomicWrite(resolve(root, 'public', assets.uny), uny);
  await atomicWrite(resolve(root, 'public', assets.natal), natal);
  await atomicWrite(resolve(root, 'public/logos/source-manifest.json'), `${JSON.stringify({unchangedOriginalBytes: true, logos: entries}, null, 2)}\n`);
  // Update the composition only once both original files have been persisted.
  await atomicWrite(resolve(root, 'src/config/logo-assets.json'), `${JSON.stringify(assets, null, 2)}\n`);
  return {assets, logos: entries};
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [unyPath, natalPath] = process.argv.slice(2);
  if (!unyPath || !natalPath || process.argv.length !== 4) {
    console.error('Penggunaan: node scripts/import-logos.mjs /path/logo-uny.png /path/logo-natal.png');
    process.exitCode = 1;
  } else {
    try {
      const [uny, natal] = await Promise.all([readFile(resolve(unyPath)), readFile(resolve(natalPath))]);
      const result = await importLogoBuffers(uny, natal);
      console.log('Kedua logo asli sudah dipasang. Proporsi, warna, dan byte berkas dipertahankan.');
      for (const logo of result.logos) console.log(`${logo.name}: public/${logo.path}\nSHA-256: ${logo.sha256}`);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}
