# A. IMPLEMENTATION SUMMARY

Revisi **Bang Motion — Natal PMK UNY 2026: The Greatest Gift** mempertahankan delapan adegan, seluruh teks, urutan, dan timing prompt asli: **1800 frame, 30 fps, 1920×1080, 60 detik**. Visual memakai navy, evergreen, emas antik, merah muda, dan ivory sesuai brief. Kamera memiliki framing berbeda menurut makna adegan; reveal kata/mask/script, foreground dekoratif, motif cahaya, serta lima jenis transisi menambah gerak yang berdiri sendiri dari plate ilustrasi.

Tiga ilustrasi mahasiswa (`opening`, `togetherness`, `sunrise`) diperbarui tanpa hijab sesuai arahan visual terbaru pengguna. Adegan ibadah yang sudah menampilkan mahasiswa tanpa hijab dipertahankan; tudung tradisional Maria pada adegan kelahiran Yesus tidak diubah. Kedua logo asli tetap identik byte demi byte, dengan SHA-256 dalam `public/logos/source-manifest.json`. Musik belum disediakan.

Skill **Bang Motion 1.19.0**, karya Bang Tutorial, lisensi MIT, ditambahkan utuh dari ZIP pengguna ke `.agents/skills/bang-motion/`. [Arah desain](../docs/BANG-MOTION-DIRECTION.md) menjelaskan penerapannya. Prompt khusus pengguna menjadi acuan bila berbeda dari aturan generik skill.

Tersedia dua cara melihat: **Remotion** untuk pengeditan/ekspor MP4 dan **HTML browser** untuk menonton tanpa instalasi Node. Keduanya memakai naskah dan batas waktu yang sama, tetapi dekorasi serta implementasi geraknya tidak diklaim identik piksel demi piksel. Remotion adalah acuan ekspor MP4.

# B. PROJECT STRUCTURE

```text
Juka-Video/
  BUKA-VIDEO.html                 # peluncur lokal edisi browser
  README.md
  .agents/skills/bang-motion/     # paket skill pengguna + lisensi MIT
  docs/BANG-MOTION-DIRECTION.md
  natal-pmk/
    package.json, package-lock.json, .nvmrc
    remotion.config.ts, tsconfig.json
    src/
      index.ts, Root.tsx, NatalPMKUNY2026.tsx, style.css
      config/{theme,timeline,scenes}.ts
      config/{logo-assets,audio}.json
      components/
        AnimatedText.tsx, CinematicBackground.tsx, SceneFrame.tsx
        Atmosphere.tsx, StoryMotif.tsx, SceneTransition.tsx, AudioTrack.tsx
      scenes/Scene01Opening.tsx ... Scene08EndCard.tsx
      art/Illustrations.tsx
    public/
      scenes/{opening,togetherness,gift,nativity,sunrise,worship}.png
      fonts/{CormorantGaramond,GreatVibes,Manrope}.ttf
      fonts/OFL-*.txt
      logos/{uny,natal}.png, logos/source-manifest.json
      vendor/                    # GSAP lokal dan pemberitahuan upstream
      audio/                     # musik opsional
      import-logos.html
    watch/{index.html,README.md}
    scripts/
      build-browser.mjs, import-logos.mjs, logo-upload-server.mjs
      check-assets.mjs, render-review.mjs
    out/                         # hasil lokal; tidak disimpan di Git
    README.md, DELIVERY.md
```

# C. COMPLETE WORKING CODE

Implementasi TypeScript/TSX tersedia lengkap di `src/`. Master dan kedelapan komponen adegan didaftarkan tersendiri di `Root.tsx`; Sequence tetap menjaga batas global asli. Transisi 18 frame mengapit cut tanpa mengurangi durasi adegan. Animasi visual Remotion membaca frame/fps dan memakai hash deterministik, bukan jam sistem atau Math.random.

`watch/index.html` adalah keluaran siap tonton dari `scripts/build-browser.mjs`. CSS, JavaScript, dan GSAP lokal ditulis inline; gambar/font relatif ke `public`. Konfigurasi teks, warna, dan waktu diambil dari berkas proyek saat build. HTML memakai satu dunia scenic rail, bintang penghubung, atmosfer, foreground, dan reveal kata. Pemutaran browser memakai timeline GSAP; seek pada waktu yang sama menghasilkan keadaan yang sama.

`node_modules`, cache build, dan folder output kerja `out/` tidak disimpan di Git. Satu MP4 revisi final disertakan pada folder `video/` di akar repositori untuk unduhan langsung. Instalasi dengan `npm ci` hanya dibutuhkan untuk mengedit, membangun ulang HTML, atau mengekspor MP4; HTML yang sudah disertakan dapat ditonton langsung.

# D. ASSET MANIFEST

| Aset | Jalur | Status |
|---|---|---|
| Kampus malam | `public/scenes/opening.png` | Diperbarui: mahasiswa tanpa hijab, komposisi kampus dipertahankan |
| Kebersamaan | `public/scenes/togetherness.png` | Diperbarui: mahasiswa tanpa hijab |
| Hadiah | `public/scenes/gift.png` | Ilustrasi orisinal yang sudah ada, dipertahankan |
| Kelahiran Yesus | `public/scenes/nativity.png` | Dipertahankan; Maria, Yusuf, dan bayi Yesus tidak diubah |
| Kampus pagi | `public/scenes/sunrise.png` | Diperbarui: mahasiswa tanpa hijab |
| Ibadah | `public/scenes/worship.png` | Dipertahankan; mahasiswa sudah tanpa hijab |
| Dekorasi dan motif cahaya | SVG dalam `Atmosphere.tsx`, `StoryMotif.tsx` | Tersedia, animasi deterministik terpisah dari plate |
| Logo UNY asli | `public/logos/uny.png` | Tersedia; byte asli dipertahankan |
| Logo Natal asli pengguna | `public/logos/natal.png` | Tersedia; dipertahankan persis tanpa perubahan |
| Cormorant Garamond | `public/fonts/CormorantGaramond.ttf` | Tersedia, SIL OFL, lisensi disertakan |
| Great Vibes | `public/fonts/GreatVibes.ttf` | Tersedia, SIL OFL, lisensi disertakan |
| Manrope | `public/fonts/Manrope.ttf` | Tersedia, SIL OFL, lisensi disertakan |
| GSAP 3.13.0 | `public/vendor/gsap-3.13.0.min.js` | Tersedia lokal; header, README, dan notice upstream disertakan; di-inline dalam HTML |
| Skill Bang Motion | `../.agents/skills/bang-motion/` | Paket ZIP pengguna, MIT, karya Bang Tutorial |
| Musik instrumental | `public/audio/christmas-instrumental.mp3` | Opsional, belum tersedia; audio dinonaktifkan |
| Layer tubuh/wajah terpisah | — | Tidak tersedia, tidak diklaim ada |
| Storyboard delapan panel | Nama yang disebut dalam prompt | Tidak tersedia sebagai lampiran berkas sesi ini |
| Vektor alternatif | `src/art/Illustrations.tsx` | Pustaka alternatif, tidak aktif dalam master |

Tidak ada aset templat Envato yang disalin. Plate sekitar 1672×941 di-cover secara proporsional ke 1920×1080 tanpa peregangan bentuk. Logo tidak dibuat ulang dengan AI.

# E. RUN AND RENDER COMMANDS

**Menonton tanpa instalasi:** unduh ZIP GitHub, ekstrak, klik dua kali `BUKA-VIDEO.html`. Alternatif: buka `natal-pmk/watch/index.html`. Pertahankan struktur folder aset. Space menjeda/memutar; R mengulang. `?debug=1` menampilkan panel pemeriksaan; `?clean=1` menahan autoplay.

**Mengedit atau mengekspor:** untuk macOS Monterey gunakan Node.js 22 LTS (minimal 22.13.0 dalam seri 22). Sediakan ruang kosong 5–10 GB untuk dependensi dan alat render. Dari folder hasil ekstraksi `Juka-Video-main`:

```bash
cd natal-pmk
npm ci
npm run dev
npm run lint
npm run check:assets
npm run build
npm run watch:build
npm run review
npm run render:bang
```

Tujuan ekspor revisi: `out/Natal-PMK-UNY-2026-BangMotion.mp4` (H.264). `npm run render` tetap tersedia dengan nama output standar. Kedua logo asli sudah terpasang; alat impor hanya diperlukan bila ingin mengganti file sumber.

Di mesin cloud ini Chromium tersedia di `/usr/bin/chromium`. Flag berikut khusus path browser mesin tersebut:

```bash
npm run render:bang -- --browser-executable=/usr/bin/chromium
```

Pengguna Mac dapat memakai perintah render biasa di atas; Remotion akan menyiapkan browser yang sesuai bila diperlukan. Lihat README untuk pengaturan audio dan startup lintas mesin.

# F. QUALITY CHECK

| Adegan | Frame global | Waktu |
|---|---|---|
| Opening | 0–179 | 00:00–00:06 |
| Togetherness | 180–389 | 00:06–00:13 |
| Gift | 390–629 | 00:13–00:21 |
| Nativity | 630–899 | 00:21–00:30 |
| StudentMeaning | 900–1169 | 00:30–00:39 |
| Gratitude | 1170–1439 | 00:39–00:48 |
| Closing | 1440–1679 | 00:48–00:56 |
| EndCard | 1680–1799 | 00:56–01:00 |

- Teks dan tanda baca tetap mengikuti prompt; nomor adegan serta anotasi editorial tidak tampil.
- Tiga plate mahasiswa revisi sudah diperiksa visual; kedua logo asli tidak berubah dan checksum dipertahankan.
- TypeScript, ESLint, pemeriksaan aset, dan bundle Remotion telah diperiksa dalam alur revisi; hasil ekspor penuh terbaru dicatat setelah render selesai.
- Delapan PNG representatif revisi berhasil dirender pada frame 156, 369, 606, 870, 1131, 1404, 1641, dan 1785; contact sheet diperiksa untuk teks, kontras, proporsi, dan konsistensi warna.
- Efek Remotion memakai frame/fps; tidak ada CSS animation atau randomness tak terkontrol pada jalur visual.
- Overlay transisi 0,6 detik tetap mengapit batas adegan, tanpa menggeser timing. Lima belas frame sebelum/saat/sesudah lima jenis transisi diperiksa visual. Peluncur HTML dari akar ZIP dan pengulangan setelah 60 detik juga lulus pemeriksaan browser.
- Browser HTML diuji melalui HTTP lokal dengan koneksi eksternal diblokir: tidak ada JavaScript error, gambar gagal, atau font hilang; tidak ada permintaan jaringan eksternal yang dicoba.
- Enam belas pemeriksaan sebelum/sesudah batas adegan browser lulus. Seek ke waktu yang sama setelah berpindah waktu menghasilkan PNG identik. Kontrol tersembunyi secara default dan tampil hanya pada mode debug.
- HTML memuat GSAP/CSS/JavaScript inline dengan aset relatif lokal. Navigasi `file://` diblokir kebijakan administrator browser cloud sebelum halaman dimuat; pembukaan langsung pada Mac/Safari belum diuji dan tidak diklaim sudah terverifikasi.
- **Ekspor MP4 revisi Bang Motion:** berhasil. H.264, 1920×1080, 30 fps, tepat 1800 frame, durasi 60.000000 detik, ukuran 67.801.474 byte. Seluruh MP4 berhasil didekode tanpa error. Salinan siap unduh disertakan di `video/Natal-PMK-UNY-2026-BangMotion.mp4` pada akar repositori. Metadata/checksum tersedia di `docs/quality-bang-motion.json`.
- Historis sebelum revisi Bang Motion: `out/Natal-PMK-UNY-2026.mp4` selesai diekspor H.264, 1920×1080, 30 fps, 1800 frame, 60 detik, 56.353.734 byte, tanpa audio. Draf lebih awal sebelum impor logo berukuran 56.213.374 byte. Keduanya tidak dipakai sebagai bukti hasil baru.

# G. LIMITATIONS

Musik berlisensi belum disediakan sehingga audio tetap dinonaktifkan. Storyboard delapan panel yang disebut prompt tidak tersedia sebagai lampiran; ilustrasi mengikuti deskripsi tertulis, bukan klaim reproduksi persis storyboard yang belum dibaca. Bangunan terinspirasi kampus UNY, bukan dokumentasi arsitektur resmi.

Karakter pada plate berupa ilustrasi datar. Kamera, atmosfer, teks, cahaya, dan ornamen bergerak independen; wajah/tubuh tidak diklaim sebagai rig berlapis. Pakaian mahasiswa disesuaikan sebagai arahan ilustrasi acara, bukan penentuan agama seseorang dari penampilannya. Tudung tradisional Maria dipertahankan.

Edisi browser dan Remotion memakai teks/timing yang sama dengan implementasi gerak berbeda. Pembukaan HTML melalui file lokal dirancang untuk browser biasa tetapi belum diuji pada Mac/Safari karena pembatasan browser cloud. Remotion tetap acuan MP4 yang dapat diekspor 60 detik tepat 30 fps. Tidak ada klaim telah melihat templat Envato tertentu atau mengunduh musik berhak cipta tanpa izin.
