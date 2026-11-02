# Natal PMK UNY 2026 — The Greatest Gift

Revisi **Bang Motion**: **60 detik · 1920×1080 · 30 fps · 8 adegan**, dengan prompt, teks, urutan, dan timing asli. Tiga ilustrasi mahasiswa diperbarui tanpa hijab untuk arahan visual acara ini. **Logo UNY dan logo Natal asli tetap dipertahankan tanpa perubahan gambar.** Musik belum disertakan.

## Unduh dan tonton di MacBook tanpa instalasi

**[Unduh ZIP proyek](https://github.com/KajuuSpace05/Juka-Video/archive/refs/heads/main.zip)**

Atau klik **Code → Download ZIP** pada halaman repositori ini.

**[Unduh MP4 siap putar](https://github.com/KajuuSpace05/Juka-Video/raw/refs/heads/main/video/Natal-PMK-UNY-2026-BangMotion.mp4)** — dapat dibuka di QuickTime tanpa Node atau Remotion.

![Pratinjau delapan adegan revisi](./docs/preview-bang-motion.jpg)

1. Klik dua kali ZIP untuk mengekstraknya melalui Finder.
2. Buka folder **`Juka-Video-main`**.
3. Klik dua kali **`BUKA-VIDEO.html`**. Jika diminta memilih aplikasi, pilih Chrome atau Safari.
4. Video otomatis diputar dan mengulang setelah 60 detik. **Space** untuk jeda/putar, **R** untuk mengulang.

Cara menonton ini menggunakan HTML, gambar, logo, font, dan GSAP lokal. **Tidak memerlukan Node, npm, server, atau koneksi internet setelah ZIP diunduh.** Jangan memindahkan file HTML saja: biarkan folder `natal-pmk` tetap berada di lokasi hasil ekstraksi agar aset relatifnya terbaca.

Edisi browser telah diuji melalui server HTTP lokal dengan koneksi eksternal diblokir. Pembukaan langsung melalui `file://` dirancang untuk browser biasa, tetapi belum diuji pada Mac/Safari: browser cloud yang dikelola memblokir navigasi `file://` sebelum halaman dimuat.

## Mengedit di Remotion atau mengekspor MP4

Bagian ini hanya diperlukan untuk **mengedit atau membuat MP4**, bukan untuk menonton HTML di atas. Untuk pemasangan dependensi, sediakan ruang kosong **5–10 GB**.

1. Di dalam `Juka-Video-main`, cari folder **`natal-pmk`** yang berisi `package.json`.
2. Untuk **macOS Monterey 12**, gunakan **Node.js 22 LTS**, minimal versi **22.13.0** dalam seri 22. Node.js 24 memerlukan macOS 13.5 atau lebih baru.
3. Buka Terminal lewat **Command + Space → Terminal**.
4. Ketik `cd` diikuti satu spasi, seret folder **`natal-pmk`** dari Finder ke Terminal, lalu tekan Enter.
5. Jalankan satu per satu:

```bash
npm ci
npm run dev
```

Biarkan Terminal terbuka. Buka alamat Studio yang dicetak di Terminal, pilih **NatalPMKUNY2026**, lalu klik Play. Kedua logo muncul pada detik **56–60**. Untuk menghentikan Studio, tekan **Control + C**.

Jika Node sudah dipasang melalui **nvm**:

```bash
nvm install 22
nvm use 22
nvm alias default 22
node -v
```

Hasil `node -v` seharusnya diawali `v22.`. File `natal-pmk/.nvmrc` juga memilih seri 22.

Untuk ekspor revisi Bang Motion dari folder `natal-pmk`:

```bash
npm run render:bang
```

Hasilnya: `natal-pmk/out/Natal-PMK-UNY-2026-BangMotion.mp4`. Pada render pertama, Remotion dapat mengunduh browser yang dibutuhkan.

## Isi dan panduan

- [Panduan proyek, ekspor, dan audio](./natal-pmk/README.md)
- [Struktur, manifest aset, timing, dan hasil pemeriksaan](./natal-pmk/DELIVERY.md)
- [Konsep dan penerapan Bang Motion](./docs/BANG-MOTION-DIRECTION.md)
- [Skill Bang Motion 1.19.0](./.agents/skills/bang-motion/SKILL.md), karya Bang Tutorial, lisensi MIT; paket dari ZIP pengguna disertakan utuh.

Revisi memakai variasi framing kamera, reveal kata/mask/script, motif cahaya yang berlanjut, dekorasi foreground terpisah, serta transisi bintang, pita, fajar, dedaunan, dan dissolve. Edisi browser dan Remotion memuat cerita serta timing yang sama, tetapi dekorasi dan geraknya tidak diklaim identik piksel demi piksel. Remotion menjadi acuan ekspor MP4.

Folder `node_modules`, cache build, dan output kerja `out/` tidak disimpan di Git. Satu MP4 final siap putar disertakan di `video/`. HTML siap tonton dan aset lokalnya juga disertakan; dependensi untuk pengeditan dipulihkan dengan `npm ci`.
