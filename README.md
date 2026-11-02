# Natal PMK UNY 2026 — The Greatest Gift

Proyek motion graphics Remotion: **60 detik · 1920×1080 · 30 fps · 8 adegan**.
Kode, enam ilustrasi, tiga font beserta lisensinya, serta **logo UNY dan logo Natal asli** tersedia di folder [`natal-pmk`](./natal-pmk). Kedua logo dipertahankan tanpa perubahan gambar. Musik belum disertakan.

## Unduh proyek

**[Klik untuk mengunduh ZIP proyek](https://github.com/KajuuSpace05/Juka-Video/archive/refs/heads/main.zip)**

Atau klik tombol hijau **Code → Download ZIP** pada halaman repositori ini.

## Membuka di MacBook

1. Unduh ZIP di atas dan klik dua kali untuk mengekstraknya melalui Finder.
2. Di dalam folder `Juka-Video-main`, buka folder **`natal-pmk`**. Folder ini berisi file `package.json`.
3. Instal **Node.js LTS versi 24 atau lebih baru** dari [nodejs.org](https://nodejs.org/en/download). Gunakan installer macOS `.pkg`.
4. Tekan **Command + Space**, ketik **Terminal**, lalu tekan Enter.
5. Ketik `cd` diikuti satu spasi, seret folder **`natal-pmk`** dari Finder ke Terminal, lalu tekan Enter. Dengan cara ini lokasi folder di Mac Anda akan terisi otomatis.
6. Jalankan perintah berikut satu per satu, tunggu proses pertama selesai:

```bash
npm ci
npm run dev
```

Biarkan Terminal tetap terbuka. Browser biasanya terbuka otomatis. Jika tidak, buka alamat Studio yang dicetak di Terminal (biasanya `http://localhost:3000`). Pilih **NatalPMKUNY2026** di daftar komposisi sebelah kiri dan klik Play. Kedua logo muncul pada detik **56–60**.

Untuk membuka lagi lain waktu, arahkan Terminal ke folder yang sama, lalu jalankan `npm run dev`. Untuk menghentikan Studio, tekan **Control + C** di Terminal.

## Mengekspor MP4

Dari folder `natal-pmk`, jalankan:

```bash
npm run render
```

Video akan disimpan di `natal-pmk/out/Natal-PMK-UNY-2026.mp4`. Pada render pertama, Remotion dapat mengunduh browser yang dibutuhkan; koneksi internet diperlukan.

## Panduan dan pemeriksaan

- [Panduan proyek dan pengaturan audio](./natal-pmk/README.md)
- [Struktur lengkap, manifest aset, timing, dan hasil pemeriksaan](./natal-pmk/DELIVERY.md)

Untuk pemeriksaan kode dan aset:

```bash
npm run lint
npm run check:assets
```

Folder dependensi `node_modules`, cache build, dan hasil video tidak disimpan di Git. Dependensi dipulihkan oleh `npm ci`; video dapat dibuat kembali dengan `npm run render`.
