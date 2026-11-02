# Tonton tanpa instalasi

Klik dua kali **index.html** dalam folder ini. Pilih Chrome atau Safari jika macOS meminta aplikasi pembuka. Biarkan folder **public** tetap berada di sebelah folder **watch**; gambar, logo, font, dan GSAP sudah lokal. Tidak perlu Node, npm, server, atau internet untuk menonton.

Video otomatis diputar dan mengulang setelah 60 detik, tanpa panel di layar. **Space** menjeda/memutar; **R** mengulang. Musik belum disediakan. Kedua logo adalah berkas asli pengguna tanpa perubahan.

Untuk panel pemeriksaan, tambahkan **?debug=1** pada akhir alamat file. Untuk snapshot berhenti di awal, gunakan **?clean=1**.

Versi ini memakai arsitektur Bang Motion: satu dunia gambar, kamera scenic rail, bintang penghubung, cahaya, dekorasi foreground, dan reveal kata. Delapan waktu adegan dan semua tulisan diambil dari konfigurasi proyek. Karakter pada plate merupakan ilustrasi datar, bukan rig tubuh terpisah. Versi Remotion di folder src tetap tersedia untuk edit dan ekspor MP4.

Pengembang dapat memperbarui HTML setelah mengubah konfigurasi dengan menjalankan `node scripts/build-browser.mjs` dari folder natal-pmk.
