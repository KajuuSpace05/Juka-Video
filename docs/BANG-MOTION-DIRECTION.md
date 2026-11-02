# Natal PMK UNY 2026 — revisi Bang Motion

## Batas dari pengguna

Prompt asli tetap berlaku: delapan adegan dalam urutan yang sama, 60 detik, 30 fps, 1920×1080, semua teks dan tanda baca tetap, identitas Natal PMK UNY, serta kedua logo asli yang tidak diubah. Permintaan terbaru mengganti ilustrasi mahasiswa berhijab dengan karakter fiktif tanpa hijab untuk konteks visual acara ini. Ini arahan kostum ilustrasi, bukan penentuan agama seseorang dari penampilannya. Tudung tradisional Maria dalam adegan kelahiran Yesus bukan mahasiswa dan tidak diubah.

Skill Bang Motion 1.19.0 dari ZIP pengguna ditambahkan utuh ke `.agents/skills/bang-motion/`, dengan lisensi MIT dan kredit penulisnya. Skill ini merupakan panduan kerja tambahan. Bila aturan generiknya berbeda dari prompt khusus pengguna (misalnya durasi 25–40 detik, pemotongan teks, atau pengubahan urutan), prompt pengguna menjadi acuan. Tidak diperlukan persetujuan ulang atas palet, timing, dan narasi yang sudah diminta tetap sama.

## Konsep dan arah visual

Tiga kemungkinan yang dipertimbangkan:

1. **Cahaya yang diteruskan**: bintang kampus menjadi kilau pita hadiah, diteruskan ke Betlehem, matahari pagi, dan cahaya ibadah.
2. **Buku kisah Natal**: halaman ilustrasi membuka kampus, hadiah, kelahiran, dan pesan penutup.
3. **Pita persaudaraan**: satu pita merah muda menghubungkan persekutuan mahasiswa dan ucapan Natal.

Pilihan: **cahaya yang diteruskan**, karena mendukung makna “The Greatest Gift” dan simbol bintang yang sudah ada dalam brief tanpa mengganti urutan delapan adegan. Pita dipakai sebagai transisi saat masuk/keluar adegan hadiah dan kartu penutup, bukan sebagai sapuan yang berulang di semua cut.

Sidik jari: **perjalanan cahaya · 8 adegan · bintang/kampus → mahasiswa → hadiah → palungan → langkah mahasiswa → salib/ibadah → ucapan → logo asli · pembuka langit malam · penutup berkat di ivory**.

- Perasaan: hangat, penuh harapan, khidmat.
- Palet: navy `#071B2B`, evergreen `#103E30`, emas `#D8B76A`, pink `#F3A6BE`, ivory `#FFF0D7`, amber `#F9C77B`, semuanya dari prompt pengguna. Warna logo asli tidak diubah untuk menyesuaikan palet.
- Tipografi: Cormorant Garamond untuk judul, Great Vibes untuk tema, Manrope untuk teks pendukung; sesuai brief. Seluruh teks tetap dapat diedit.
- Penekanan: ukuran/bobot, pengungkapan kata dan mask yang lembut, satu aksen pink/emas. Tidak ada badge, kicker nomor adegan, atau metadata teknis di video.
- Bahasa latar: ilustrasi kisah dengan atmosfer terpisah; langit malam → kehangatan halaman kampus → emerald hadiah → malam Betlehem → fajar → cahaya ibadah → emerald ucapan → ivory berkat.
- Gerak: kamera mengikuti objek dengan perbedaan framing/pan per adegan dalam rentang lembut 1,00–1,06; foreground dekoratif, partikel, dan motif cahaya bergerak independen. Tidak mengklaim ilustrasi datar mempunyai layer tubuh/wajah terpisah.
- Transisi: bintang, pita, cahaya fajar, dedaunan, dan dissolve khidmat; masing-masing 0,6 detik di batas global tetap. Tidak ada whirl, glitch, atau perubahan perspektif wajah.
- Momen utama: kilau hadiah berlanjut ke bintang Betlehem, bukan pembukaan hadiah komersial.

## Dua cara membuka

1. **Remotion**: komposisi editable dan ekspor MP4 tetap tersedia di proyek `natal-pmk`.
2. **HTML browser**: `natal-pmk/watch/index.html` membuka edisi browser langsung dari Finder tanpa Node, server, atau unduhan CDN saat menonton. Aset dan font lokal; GSAP disertakan lokal dengan kredit/lisensi.

Keduanya memuat naskah yang sama dan mengikuti batas 0 / 6 / 13 / 21 / 30 / 39 / 48 / 56 / 60 detik. Edisi browser dan Remotion memakai implementasi dekorasi/gerak masing-masing, sehingga tidak diklaim identik piksel demi piksel. Remotion tetap acuan ekspor MP4 1800 frame.

## Aset

Tiga plate mahasiswa diperbarui: `opening.png`, `togetherness.png`, `sunrise.png`. Adegan ibadah yang sudah menampilkan mahasiswa tanpa hijab dipertahankan. Plate hadiah, Betlehem, dan kedua logo asli dipertahankan. Musik tetap opsional dan belum disediakan. Storyboard delapan panel yang disebut di prompt tidak tersedia sebagai lampiran; ilustrasi mengikuti deskripsi tertulis.
