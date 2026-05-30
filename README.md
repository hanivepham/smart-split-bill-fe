# 💸 Smart Bill Splitter - Backend API (Kelompok 6)

Ini adalah *source code* Backend untuk aplikasi **Smart Bill Splitter**, dibangun menggunakan framework **Laravel 11**. API ini berfungsi untuk mengelola data tagihan patungan (split bill) dan menghitung rincian pembagian tagihan per partisipan.

## 🚀 Cara Menjalankan Project di Laptop Kalian (Lokal)

Buat anggota kelompok yang baru pertama kali *clone* repository ini, ikuti langkah-langkah wajib berikut agar API bisa menyala:

1. **Clone Repository**
   `git clone https://github.com/hanivepham/smart-split-bill-be.git`
   `cd smart-split-bill-be`

2. **Install Dependencies (Alat-alat Laravel)**
   `composer install`

3. **Setup File Environment**
   `cp .env.example .env`

4. **Generate Application Key**
   `php artisan key:generate`

5. **Konfigurasi Database**
   Buat database kosong bernama `smart_bill_splitter` di Laragon. Lalu pastikan `.env` sesuai.

6. **Migrasi Database (Membuat Tabel)**
   `php artisan migrate`

7. **Nyalakan Server API**
   `php artisan serve`