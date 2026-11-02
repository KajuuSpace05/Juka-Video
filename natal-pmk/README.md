# Natal PMK UNY 2026 — The Greatest Gift

Proyek Remotion yang dapat diedit: **60 detik, 1800 frame, 30 fps, 1920×1080**, delapan adegan dengan batas waktu tetap. React + TypeScript, Remotion 4.0.540, font lokal, ilustrasi orisinal, partikel deterministik, serta transisi cahaya emas.

**Status:** animasi, enam ilustrasi, dan kedua logo asli tersedia. Logo UNY dan logo Natal diterima dari `LOGO KAMPUS DAN LOGO NATAL.zip` lalu dipasang ke kartu penutup sebagai PNG asli. Isi berkas dipertahankan byte demi byte dan dicatat dengan SHA-256. Musik belum disediakan. Video terbaru `out/Natal-PMK-UNY-2026.mp4` sudah selesai diekspor dengan kedua logo; video draf lama disimpan sebagai hasil historis sebelum logo diimpor.

## Menjalankan

Untuk Mac dengan **macOS Monterey 12**, gunakan **Node.js 22 LTS**, minimal **22.13.0** dalam seri 22. Node.js 24 memerlukan macOS 13.5 atau lebih baru. Versi Node yang diterima proyek ditentukan di `package.json`; `.nvmrc` memilih seri 22 bagi pengguna nvm. Lingkungan cloud proyek telah diuji dengan Node.js 24.19.0 pada Linux.

Jika sudah menggunakan nvm, jalankan satu per satu:

```bash
nvm install 22
nvm use 22
nvm alias default 22
node -v
```

Lanjutkan setelah `node -v` menampilkan versi yang diawali `v22.`.

```bash
# Di Mac: masuk ke folder natal-pmk hasil ekstraksi ZIP.
# Dari folder Juka-Video-main, gunakan:
cd natal-pmk
npm ci
npm run dev -- --no-open
```

Buka alamat Studio yang dicetak terminal, pilih **NatalPMKUNY2026**. Folder **Scenes** berisi delapan adegan yang dapat diedit dan dipratinjau terpisah. Di cloud gunakan checkout yang sudah ada; tidak perlu Git worktree baru. Jika port 3000 sudah aktif, gunakan Studio yang sedang berjalan.

Dalam cloud ini, operasi jaringan/server/Chromium perlu izin eksekusi yang mendukung jaringan. `NODE_USE_ENV_PROXY=1` diperlukan ketika menjalankan scaffold atau alat Node yang memakai fetch; pertahankan proxy dan CA bawaan. Font dan seluruh ilustrasi sudah lokal, sehingga pemutaran tidak bergantung pada layanan gambar/font daring.

## Kedua logo asli dan impor pengganti

Logo yang dipasang: `public/logos/uny.png` dari `LOGO KAMPUS.png` dan `public/logos/natal.png` dari `Logo Natal.PNG`. Keduanya sudah diterima dalam ZIP pengguna. File yang disalin tetap identik byte demi byte. Proporsi dipertahankan dengan `objectFit: contain`; tidak ada penghapusan latar, pewarnaan ulang, pemotongan, rekonstruksi, atau konversi gambar.

```bash
npm run import:logos -- /lokasi/logo-uny.png /lokasi/logo-natal.png
```

Atau gunakan formulir unggah lokal:

```bash
npm run upload:logos
```

Buka alamat yang dicetak, pilih dua file, lalu klik **Masukkan ke proyek**. Server secara default hanya mendengarkan loopback. Di lingkungan cloud, URL tersebut mungkin hanya dapat diakses dari dalam mesin. Gunakan alat ini hanya jika ingin mengganti logo dengan berkas asli lainnya; kedua logo yang dikirim pengguna sudah tersedia di proyek.

Impor memperbarui `src/config/logo-assets.json`, menyimpan asli ke `public/logos/`, dan mencatat SHA-256 di `public/logos/source-manifest.json`. Studio memuat perubahan otomatis. Ilustrasi kelahiran Yesus diperlakukan sebagai **logo Natal dari pengguna**, bukan diklaim sebagai lambang resmi PMK. Arahan terbaru pengguna untuk mempertahankannya persis mengesampingkan arahan penyesuaian sebelumnya.

## Render dan pemeriksaan

```bash
npm run lint
npm run check:draft
npm run build
npm run review
npm run render:draft
# Pemeriksaan dan ekspor dengan kedua logo asli:
npm run check:assets
npm run render
```

Tujuan ekspor produksi: `out/Natal-PMK-UNY-2026.mp4` (H.264).
Video draf historis sebelum impor logo: `out/Natal-PMK-UNY-2026-DRAFT.mp4`. Gunakan ekspor produksi untuk hasil dengan kedua logo.

Di mesin ini Chromium tersedia di `/usr/bin/chromium`. Tambahkan flag saat render jika Remotion meminta mengunduh browser:

```bash
npm run render:draft -- --browser-executable=/usr/bin/chromium
npm run render -- --browser-executable=/usr/bin/chromium
```

`npm run review` merender delapan PNG representatif dalam `out/review/` dan mengecek metadata komposisi. Script review memakai `/usr/bin/chromium`; untuk mesin lain atur `REMOTION_BROWSER_EXECUTABLE` ke path Chromium/Chrome lokal.

## Mengedit

- `src/config/scenes.ts`: seluruh teks dan jalur ilustrasi.
- `src/config/theme.ts`: warna dan font.
- `src/NatalPMKUNY2026.tsx`: posisi adegan serta overlay transisi; pertahankan delapan batas waktu asli.
- `src/Root.tsx`: registrasi master dan delapan komposisi adegan.
- `src/scenes/`: tata letak dan waktu masuk teks masing-masing adegan.
- `src/components/`: kamera, teks, partikel, bintang, dekorasi, cahaya, dan audio.
- `src/art/Illustrations.tsx`: pustaka ilustrasi vektor alternatif, tidak aktif dalam komposisi utama.

`timeline.ts` adalah tabel referensi editorial; posisi JSX di timeline utama tetap menjadi sumber timing yang dieksekusi, agar tiap Sequence dapat diedit independen di Studio. Setiap judul tetap berupa teks HTML yang bisa diedit, bukan bagian dari gambar.

## Musik opsional

Simpan musik yang hak pakainya telah Anda miliki di `public/audio/`. Ubah `src/config/audio.json` menjadi:

```json
{"src":"audio/christmas-instrumental.mp3","volume":0.35}
```

Durasi ideal minimal 60 detik. Fade pembuka 1 detik dan penutup 2 detik disediakan. Tidak ada voice-over atau musik berhak cipta yang diambil tanpa izin.

## Batasan visual

Storyboard delapan panel yang disebut di prompt tidak tersedia sebagai lampiran berkas pada sesi ini. Keenam plate dibuat orisinal berdasarkan deskripsi adegan, bukan reproduksi storyboard atau templat Envato. Bentuk bangunan terinspirasi kampus UNY; bukan dokumentasi arsitektur resmi. Karakter berada di dalam ilustrasi datar: gerak kamera, atmosfer, dekorasi vektor, partikel, dan teks berdiri sendiri; tidak ada klaim animasi tubuh/karakter terpisah. Logo tidak dibuat dengan AI.

Lihat `DELIVERY.md` untuk struktur lengkap, manifest aset, dan hasil pemeriksaan.
