# Digital Wedding Invitation (Undangan Pernikahan Digital Modern & Eksklusif)

Website undangan pernikahan digital modern, elegan, romantis, eksklusif, interaktif, dan sepenuhnya responsif (mobile-first) untuk acara pernikahan mewah.

---

## ✨ Fitur-Fitur Utama

1. **Halaman Pembuka (Cover Overlay Eksklusif)**
   - Foto prewedding layar penuh dengan gradasi transparan elegan.
   - Tipografi serif klasik (*Cinzel* & *Cormorant Garamond*).
   - Personalisasi nama tamu otomatis dari URL parameter (`?to=Nama+Tamu`).
   - Tombol **"Buka Undangan"** dengan animasi pendar emas (*pulsing gold*) yang membuka halaman utama secara halus.

2. **Hero Section & Countdown Real-Time**
   - Foto prewedding utama dengan ornamen sudut emas (*vintage corner filigrees*).
   - Nama lengkap kedua mempelai dan tanggal pernikahan.
   - Countdown timer real-time (Hari, Jam, Menit, Detik) berbasis JavaScript presisi tinggi.

3. **Profil Mempelai (Couple Section)**
   - Foto mempelai pria dan wanita dalam frame lingkaran berornamen emas.
   - Nama lengkap beserta gelar, nama panggilan, nama orang tua, dan tautan Instagram.
   - Layout berdampingan pada layar desktop dan vertikal pada layar ponsel pintar.

4. **Kisah Cinta (Love Story Interactive Timeline)**
   - Perjalanan cinta mulai dari awal pertemuan hingga lamaran dan hari bahagia.
   - Dilengkapi tahun, foto momen, dan narasi romantis.

5. **Rangkaian Acara (Akad Nikah & Resepsi)**
   - Kartu acara bergaya *glassmorphism* dengan detail tanggal, waktu, nama gedung, dan alamat lengkap.
   - Tombol **"Lihat Lokasi Maps"** terintegrasi ke Google Maps.
   - Tombol **"Simpan Kalender"** otomatis membuat agenda di Google Calendar tamu.

6. **Galeri Foto Prewedding & Lightbox Interaktif**
   - Grid galeri foto responsif dengan efek pembesaran lembut saat di-*hover*.
   - Fitur **Lightbox Layar Penuh** saat foto diklik, lengkap dengan navigasi Sebelumnya/Berikutnya, nomor urut foto, tombol tutup, dan dukungan keyboard (`ArrowLeft`, `ArrowRight`, `Esc`).

7. **Video Prewedding Teaser**
   - Frame pemutar video sinematik dengan rasio 16:9 responsif dan bingkai emas mewah.
   - Mendukung tautan video YouTube maupun file video lokal MP4.

8. **Love Quote & Ayat Pernikahan**
   - Tampilan kaligrafi ayat suci (QS. Ar-Rum: 21) dan terjemahan bahasa Indonesia yang puitis.

9. **RSVP & Konfirmasi Kehadiran Interaktif**
   - Formulir konfirmasi: Nama Tamu (otomatis terisi dari URL), Jumlah Tamu yang hadir, Pilihan Kehadiran (Hadir / Tidak Hadir), dan Pesan Doa Restu.
   - Validasi data formulir dan efek letupan konfeti (*Canvas Confetti*) saat berhasil dikirim.
   - Penyimpanan data permanen secara *client-side* melalui `localStorage` (langsung berfungsi tanpa setup server).
   - Tersedia opsi konfigurasi webhook / backend API (seperti Google Sheets, Supabase, Zapier, Make.com) pada `config.js`.

10. **Buku Tamu Digital (Ucapan & Doa)**
    - Umpan (*stream*) ucapan doa dari para tamu undangan.
    - Avatar inisial dinamis, lencana status kehadiran (*badge* Hadir / Tidak Hadir), dan stempel waktu (*timestamp*).
    - Ucapan baru langsung muncul secara instan di bagian teratas tanpa perlu me-*refresh* halaman.

11. **Tanda Kasih Digital (Wedding Gift / Angpao Digital)**
    - Kartu rekening bank (BCA, Mandiri, BSI) dengan tombol **Salin Nomor Rekening** sekali klik (*copy-to-clipboard*) disertai notifikasi *toast* emas.
    - Kode QRIS Standar Pembayaran Nasional untuk seluruh dompet digital (GoPay, OVO, DANA, ShopeePay, dsb).
    - Alamat pengiriman kado fisik lengkap dengan tombol salin alamat dan instruksi kurir.

12. **Audio Latar Belakang & Floating Music Controller**
    - Pemutar musik latar romantis yang mulai berputar otomatis tepat setelah tamu menekan tombol **"Buka Undangan"** (sesuai standar kebijakan autoplay browser modern).
    - Widget kontrol musik melayang (*floating vinyl disc*) dengan animasi piringan hitam berputar dan status putar/jeda.

13. **Navigasi Multi-Perangkat**
    - **Desktop**: *Sticky header navbar* dengan efek *glassmorphism* dan penanda menu aktif.
    - **Mobile**: *Floating dock navigation* di bagian bawah layar dengan ikon minimalis yang elegan.
    - Tombol *Back to Top* pintar yang muncul otomatis saat halaman digulir.

14. **Generator Tautan Undangan WhatsApp**
    - Alat bantu di bagian penutup untuk membuat tautan undangan berformat personal ke tamu lain dan langsung membagikannya via WhatsApp.

---

## 📁 Struktur Direktori

```text
digital-wedding-invitation/
├── index.html              # Halaman utama aplikasi (HTML5 Semantic)
├── config.js               # SATU-SATUNYA file konfigurasi seluruh konten & data
├── README.md               # Dokumentasi lengkap proyek
├── css/
│   └── style.css           # Styling kustom, variabel tema, keyframe animasi
├── js/
│   ├── app.js              # Logika interaktif umum, musik, countdown, lightbox, galeri
│   └── firebase-rsvp.js    # Modul Firebase Realtime Database untuk RSVP & Buku Tamu Cloud
└── assets/
    ├── qris-sample.svg     # Vektor QRIS Standar Nasional
    └── audio/
        └── wedding-song.mp3 # Musik instrumen romantis (bebas royalti)
```

---

## 🚀 Cara Menjalankan Website

Website ini dibangun secara murni menggunakan teknologi web standar (HTML5, Tailwind CSS, Vanilla JavaScript modern) tanpa dependensi *node_modules* yang rumit, sehingga dapat langsung dijalankan dengan sangat mudah:

### Opsi 1: Buka Langsung di Browser
Cukup klik dua kali (double-click) file `index.html` pada File Explorer, atau seret file tersebut ke browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Opsi 2: Menggunakan Live Server (VS Code / Antigravity)
Jika menggunakan ekstensi Live Server di editor:
1. Klik kanan pada `index.html`.
2. Pilih **"Open with Live Server"**.
3. Website akan terbuka di `http://127.0.0.1:5500`.

### Opsi 3: Menggunakan Python atau Node.js HTTP Server
Jika ingin menjalankan server lokal cepat via Terminal / PowerShell:
```bash
# Python 3
python -m http.server 3000

# Atau menggunakan npx serve
npx serve .
```
Akses di browser pada tautan: `http://localhost:3000`.

---

## 💌 Personalisasi Nama Tamu Melalui URL

Anda dapat mengundang tamu dengan nama yang disesuaikan pada halaman pembuka dan formulir RSVP dengan menambahkan parameter `?to=` pada URL:

Contoh:
- `http://localhost:3000/?to=Bapak+Joko+Santoso+dan+Keluarga`
- `http://localhost:3000/?to=dr.+Annisa+Rahmawati,+Sp.A`
- `http://localhost:3000/?to=Sahabat+Alumni+SMA+1`

> **Catatan:** Spasi dapat ditulis menggunakan tanda `+` atau `%20`. Jika parameter dikosongkan atau tidak ada, sistem akan secara anggun menggunakan teks default **"Tamu Undangan"**.

---

## ⚙️ Kustomisasi Data Pernikahan (`config.js`)

Seluruh teks, nama mempelai, tanggal acara, rekening bank, kutipan, hingga galeri foto terpusat pada file `config.js`. Anda **tidak perlu menyentuh file HTML atau JS** untuk mengganti data.

Buka file `config.js` dan sesuaikan nilainya:

```javascript
const WEDDING_CONFIG = {
  // 1. Data Mempelai
  couple: {
    groom: {
      fullName: "Nama Lengkap Mempelai Pria",
      nickname: "Nama Panggilan",
      sonOf: "Putra dari Bapak ... & Ibu ...",
      photo: "URL_FOTO_PRIA",
      instagram: "https://instagram.com/username",
      instagramUsername: "@username"
    },
    bride: {
      fullName: "Nama Lengkap Mempelai Wanita",
      nickname: "Nama Panggilan",
      daughterOf: "Putri dari Bapak ... & Ibu ...",
      photo: "URL_FOTO_WANITA",
      instagram: "https://instagram.com/username",
      instagramUsername: "@username"
    }
  },

  // 2. Waktu & Tanggal (Format ISO: YYYY-MM-DDTHH:mm:ss+07:00)
  weddingDate: {
    targetCountdown: "2026-12-12T08:00:00+07:00",
    displayDate: "Sabtu, 12 Desember 2026"
  },

  // 3. Rangkaian Acara (Akad & Resepsi)
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      date: "12 Desember 2026",
      time: "08.00 - 10.00 WIB",
      venue: "Nama Gedung / Masjid",
      address: "Alamat Lengkap",
      googleMapsUrl: "https://maps.google.com/?q=..."
    },
    {
      id: "resepsi",
      title: "Resepsi Pernikahan",
      date: "12 Desember 2026",
      time: "11.30 - 14.30 WIB",
      venue: "Nama Ballroom / Hotel",
      address: "Alamat Lengkap",
      googleMapsUrl: "https://maps.google.com/?q=..."
    }
  ],

  // 4. Rekening Hadiah Digital
  gift: {
    accounts: [
      {
        bank: "BCA",
        accountNumber: "1234567890",
        accountHolder: "NAMA PEMILIK REKENING"
      }
    ]
  }
};
```

---

## ☁️ Penyimpanan Real-Time Cloud dengan Firebase Realtime Database

Formulir RSVP dan Buku Tamu Digital sekarang tersimpan secara terpusat di **Firebase Realtime Database**. Setiap tamu yang mengirim ucapan akan langsung terlihat oleh seluruh pengunjung lainnya secara *real-time* tanpa perlu memuat ulang halaman (*zero refresh*).

### Konfigurasi Firebase (`config.js`)
Konfigurasi akun Firebase Anda sudah terpasang rapi pada `config.js`:
```javascript
firebase: {
  apiKey: "AIzaSyDSEe5SitVsOQjd9APHkliIeXgFnRn3gIw",
  authDomain: "undangan-digital-b92fe.firebaseapp.com",
  databaseURL: "https://undangan-digital-b92fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "undangan-digital-b92fe",
  storageBucket: "undangan-digital-b92fe.firebasestorage.app",
  messagingSenderId: "504706015457",
  appId: "1:504706015457:web:a6b9d0043f973b7b2917a0",
  measurementId: "G-9YLLWQ9Y0M",
  rtdbPath: "ucapan_rsvp"
}
```

### ⚠️ Penting: Pengaturan Rules di Firebase Console
Agar seluruh tamu undangan umum dapat membaca dan mengirimkan ucapan tanpa perlu login akun, pastikan Anda telah mengatur aturan database di Firebase Console:
1. Buka [Firebase Console](https://console.firebase.google.com/) dan pilih project **undangan-digital-b92fe**.
2. Masuk ke menu **Build > Realtime Database** di sisi kiri.
3. Klik tab **Rules** di bagian atas.
4. Ubah aturan menjadi:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
5. Klik **Publish**. Sekarang seluruh tamu dapat mengirim dan membaca ucapan secara instan!

---

## 🚢 Panduan Publikasi (Deployment Gratis)

Website ini siap diunggah ke berbagai layanan hosting gratis terkemuka:

### 1. GitHub Pages
1. Inisialisasi git repository di folder proyek:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding invitation"
   ```
2. Hubungkan ke GitHub repo Anda dan buka tab **Settings > Pages > Deploy from Branch: main**.

### 2. Vercel atau Netlify
- Seret (drag-and-drop) folder `digital-wedding-invitation` langsung ke dashboard Netlify Drop (`app.netlify.com/drop`) untuk langsung mendapatkan URL publik yang aktif dalam 5 detik.
