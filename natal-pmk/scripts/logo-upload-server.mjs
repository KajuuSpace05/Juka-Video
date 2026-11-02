import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {importLogoBuffers, maxLogoBytes, projectRoot} from './import-logos.mjs';

const host = process.env.LOGO_UPLOAD_HOST || '127.0.0.1';
const port = Number(process.env.LOGO_UPLOAD_PORT || 3001);
const maxRequestBytes = Math.ceil(maxLogoBytes * 8 / 3) + 8192;
const respond = (response, status, body, type = 'application/json; charset=utf-8') => {
  response.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'",
  });
  response.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
};

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && (request.url === '/' || request.url === '/import-logos.html')) {
      respond(response, 200, await readFile(resolve(projectRoot, 'public/import-logos.html')), 'text/html; charset=utf-8');
      return;
    }
    if (request.method !== 'POST' || request.url !== '/api/logos') {
      respond(response, 404, {error: 'Tidak ditemukan.'});
      return;
    }
    // Reject cross-origin writes to this local file-import service.
    const expectedOrigin = `http://${request.headers.host}`;
    if (request.headers.origin && request.headers.origin !== expectedOrigin) {
      respond(response, 403, {error: 'Unggah dari halaman lokal layanan ini.'});
      return;
    }
    if (!/^application\/json(?:;|$)/i.test(request.headers['content-type'] || '')) {
      respond(response, 415, {error: 'Payload JSON diperlukan.'});
      return;
    }
    if (Number(request.headers['content-length'] || 0) > maxRequestBytes) {
      respond(response, 413, {error: 'Ukuran maksimal masing-masing logo 15 MB.'});
      request.resume();
      return;
    }
    const chunks = [];
    let length = 0;
    for await (const chunk of request) {
      length += chunk.length;
      if (length > maxRequestBytes) {
        respond(response, 413, {error: 'Ukuran maksimal masing-masing logo 15 MB.'});
        return;
      }
      chunks.push(chunk);
    }
    const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    const decode = (entry, label) => {
      if (typeof entry?.base64 !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(entry.base64) || entry.base64.length % 4 !== 0) {
        throw new Error(`${label}: data unggahan tidak valid.`);
      }
      return Buffer.from(entry.base64, 'base64');
    };
    const result = await importLogoBuffers(decode(payload.uny, 'Logo UNY'), decode(payload.natal, 'Logo Natal'));
    respond(response, 200, {ok: true, ...result});
    console.log('Kedua logo asli dipasang; tidak ada pengubahan gambar.');
  } catch (error) {
    if (!response.headersSent) respond(response, 400, {error: error.message});
  }
});

server.requestTimeout = 60000;
server.headersTimeout = 10000;
server.listen(port, host, () => {
  console.log(`Import logo: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
  console.log('Pilih kedua berkas asli. File disimpan tanpa mengubah warna, proporsi, atau byte.');
});
server.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
