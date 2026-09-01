# TukarSkill

Platform pertukaran skill (skill swap) untuk mahasiswa, anak muda, dan
pelaku usaha kecil — dibuat untuk kompetisi **Web Development Mahasiswa
ITechno Cup 2026**, subtema *"Smart Sustainable Digital Solution for
Inclusive Society"*, selaras dengan **SDG 8: Pekerjaan Layak dan
Pertumbuhan Ekonomi**.

## Penjelasan Aplikasi

Banyak mahasiswa, anak muda, dan pelaku UMKM ingin belajar skill baru
(desain, fotografi produk, marketing digital, pembukuan, dll) tapi
terkendala biaya kursus. Di sisi lain, mereka sendiri sering punya skill
lain yang bisa ditawarkan sebagai barter.

**TukarSkill** menjadi wadah untuk saling menukar keahlian tanpa uang —
seperti konsep pasar barter, tapi versi digital. Pengguna mendaftarkan
skill yang mereka kuasai dan skill yang ingin dipelajari, lalu sistem
mencarikan pasangan tukar yang saling melengkapi kebutuhan.

## Fitur Utama

- **Beranda** — penjelasan konsep, statistik komunitas, dan alur kerja.
- **Jelajahi** — mencari & memfilter pengguna lain berdasarkan skill/kota.
- **Cocok Untukmu** — pencocokan otomatis (matching) antara skill yang
  kamu punya dan yang kamu cari, dengan label "Cocok Sempurna" (saling
  membutuhkan) dan "Cocok Sebagian".
- **Profil Saya** — kelola nama, kota, skill, dan bio.
- **Ajak Tukar** — kirim permintaan tukar ke pengguna lain, tersimpan di
  database sebagai riwayat permintaan.
- Data profil & permintaan tukar **tersimpan permanen** di Firebase
  Firestore, dan diperbarui **real-time** antar pengguna.
- Setiap pengunjung otomatis mendapat identitas unik (anonymous auth)
  tanpa perlu membuat akun/login manual.

## Teknologi yang Digunakan

| Teknologi | Peruntukan |
|---|---|
| **React 19 + Vite** | Framework utama & tooling build frontend |
| **Tailwind CSS** | Styling utility-first, desain kustom (tema "pasar digital") |
| **lucide-react** | Ikon antarmuka |
| **Firebase Firestore** | Database NoSQL cloud — menyimpan profil pengguna & permintaan tukar |
| **Firebase Authentication (Anonymous)** | Memberi identitas unik per perangkat tanpa proses login manual |
| **Vercel** | Hosting/deployment aplikasi |

## Cara Instalasi

1. **Clone repository & install dependency**
   ```bash
   git clone <url-repo-ini>
   cd tukar-skill
   npm install
   ```

2. **Buat project Firebase**
   - Buka [Firebase Console](https://console.firebase.google.com/) → *Add project*.
   - Di dalam project, buka **Build > Firestore Database** → *Create database* (mode production atau test, boleh salah satu — rules custom sudah disediakan di `firestore.rules`).
   - Buka **Build > Authentication** → tab *Sign-in method* → aktifkan provider **Anonymous**.
   - Buka **Project settings > General > Your apps** → klik ikon web (`</>`) untuk mendaftarkan web app, lalu salin objek `firebaseConfig` yang muncul.
   - (Opsional tapi disarankan) Buka tab **Rules** di Firestore, tempel isi file `firestore.rules` dari repo ini, lalu *Publish*.

3. **Isi environment variable**
   ```bash
   cp .env.example .env
   ```
   Buka `.env`, isi tiap `VITE_FIREBASE_...` dengan nilai dari `firebaseConfig` yang tadi disalin.

4. **Jalankan mode development**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` di browser.

## Cara Penggunaan

1. Buka aplikasi — kamu otomatis "login" secara anonim (tidak perlu isi apapun).
2. Masuk ke tab **Profil Saya**, isi nama, kota, skill yang kamu kuasai, skill yang ingin dipelajari, dan bio singkat, lalu klik **Simpan profil**.
3. Cek tab **Cocok Untukmu** untuk melihat pengguna lain yang skill-nya saling melengkapi denganmu.
4. Atau jelajahi semua pengguna lain lewat tab **Jelajahi**, bisa difilter berdasarkan kota/kata kunci.
5. Klik **Ajak Tukar** pada profil yang kamu minati — permintaan akan tersimpan di database (koleksi `requests`).

## Build untuk Produksi

```bash
npm run build
```
Hasil build ada di folder `dist/`, siap di-deploy ke Vercel/Netlify.

## Deploy ke Vercel

1. Push project ini ke repository GitHub.
2. Buka [vercel.com](https://vercel.com/) → *Add New Project* → import repo GitHub tersebut.
3. Saat konfigurasi, buka bagian **Environment Variables**, masukkan seluruh variabel yang ada di `.env` (nama harus sama persis, contoh `VITE_FIREBASE_API_KEY`).
4. Klik **Deploy**. Vercel otomatis mendeteksi ini sebagai project Vite dan menjalankan `npm run build`.

## Catatan Keamanan

Untuk kebutuhan demo kompetisi, Firestore rules (`firestore.rules`)
mengizinkan siapa saja **membaca** data profil (diperlukan untuk fitur
pencocokan), tapi **menulis** hanya bisa dilakukan pengguna yang sudah
ter-autentikasi (meski anonim). Untuk produksi jangka panjang,
disarankan menambahkan validasi lebih ketat (misal: satu pengguna hanya
boleh menulis dokumen profilnya sendiri berdasarkan `uid`).
