<<<<<<< HEAD
# 📋 PANDUAN INSTALASI — NusaAcademy.ID

Arsitektur: **Frontend statis (GitHub Pages)** ⇄ `fetch()` ⇄ **Google Apps Script (REST API)** ⇄ Google Sheets / Drive.

Anda akan memasang dua bagian: **backend dulu**, lalu **frontend**.

---

## A. BACKEND (Google Apps Script)

1. Buka <https://script.google.com> → **Proyek baru**.
2. Ganti nama `Code.gs` menjadi `Kode`, hapus isi bawaan, lalu tempel seluruh isi file **`Kode.gs`**.
3. Jalankan **`setupAwal`** — **HANYA SEKALI**:
   - Dropdown fungsi → `setupAwal` → ▶ **Run** → *Review permissions* → izinkan akses Drive, Sheets, dan Gmail.
   - Buka **Execution log**: akan tampil URL Spreadsheet `DB_NusaAcademy.ID`.
   - Akun Google Anda otomatis menjadi **Superadmin**. Data dummy ikut terisi.
   - ⚠️ Jangan jalankan `setupAwal` berulang kali.
4. Jalankan **`pasangTrigger`** sekali (retry notifikasi tiap jam + pemanasan cache tiap 5 menit).
5. *(Opsional, WhatsApp)* Project Settings → **Script Properties** → tambah `FONNTE_TOKEN` = token Fonnte Anda.
6. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy** → **salin URL `/exec`**.
7. Setiap kali Anda mengubah `Kode.gs`: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**.

**Tes cepat:** buka `URL_EXEC?action=ping` di browser → harus muncul `{"success":true,"data":{"app":"NusaAcademy.ID","status":"ok"}}`.

---

## B. FRONTEND — siapkan folder

1. Ekstrak `nusaacademy-frontend.zip`. Hasilnya folder **`nusaacademy-frontend`**.
2. Buka `js/config.js`, ganti `PASTE_URL_EXEC_DI_SINI` dengan URL `/exec` tadi:
   ```js
   const GAS_URL = 'https://script.google.com/macros/s/XXXXXXXX/exec';
   ```
3. Isi folder harus seperti ini (`index.html` langsung di root):
   ```
   nusaacademy-frontend/
   ├── index.html
   ├── README.md
   ├── PANDUAN-INSTALASI.md
   ├── css/style.css
   └── js/config.js, api.js, app.js
   ```

> 📁 **Folder kerja untuk `git init` = `nusaacademy-frontend`** (folder hasil ekstraksi ZIP itu sendiri). Jangan masuk lebih dalam, jangan naik satu level.

---

## C. DEPLOY KE GITHUB PAGES (lewat terminal)

> Satu langkah kecil setiap saat. Jangan gunakan "Upload files" di web GitHub — struktur folder `css/` dan `js/` akan rusak.

**C1. Pasang Git** — Windows: <https://git-scm.com/download/win> (pengaturan default). Mac: ketik `git --version` di Terminal. Cek:
```bash
git --version
```

**C2. Akun GitHub** — daftar di <https://github.com>. Username menjadi bagian alamat situs (`username.github.io`).

**C3. Identitas Git (sekali saja):**
```bash
=======
<<<<<<< HEAD
# 📋 PANDUAN INSTALASI — NusaAcademy.ID (GAS API + GitHub Pages)

Urutan: **A. Backend (Apps Script) → B. Frontend (GitHub Pages) → C. Uji.**
Kerjakan A dulu, karena B membutuhkan URL `/exec` hasil A.

---

## A. BACKEND — Google Apps Script

1. Buka https://script.google.com → **Proyek baru**.
2. Ganti isi `Code.gs` dengan seluruh isi **`Kode.gs`** (berkas terpisah). Rename file menjadi `Kode`. **Tidak perlu** file HTML apa pun.
3. Jalankan **`setupAwal`** — **hanya sekali**:
   - Dropdown fungsi → `setupAwal` → ▶ Run → *Review permissions* → izinkan akses Drive, Sheets, Gmail.
   - Buka **Execution log**: akan tampil URL Spreadsheet. Akun Anda otomatis menjadi **Superadmin**.
   - Cek Google Drive (folder `Aset_NusaAcademy.ID`) dan Google Sheets (`DB_NusaAcademy.ID`, berisi data dummy).
   - ⚠️ Jangan jalankan `setupAwal` berulang kali.
4. Jalankan **`pasangTrigger`** sekali (percobaan ulang notifikasi + pemanasan cache).
5. *(Opsional, notifikasi WhatsApp)* Project Settings → **Script Properties** → tambah `FONNTE_TOKEN` = token Fonnte Anda.
6. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik Deploy → **salin URL yang berakhiran `/exec`**.
7. Tes cepat: tempel URL tadi di browser dan tambahkan `?action=getKontenPublik`. Harus muncul JSON berawalan `{"success":true,...`.

> Setiap kali Anda mengubah `Kode.gs`: **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**. URL `/exec` tidak berubah.

---

## B. FRONTEND — GitHub Pages

### B1. Siapkan folder (PENTING)
1. Unduh `nusaacademy-frontend.zip`, klik kanan → **Extract All**.
2. Folder hasil ekstraksi (**`nusaacademy-frontend`**) adalah folder tempat Anda menjalankan `git init`. **Jangan masuk lebih dalam, jangan naik satu level.**
3. Buka folder itu dan pastikan **langsung terlihat** `index.html`, folder `css`, folder `js`. Jika yang terlihat hanya satu folder lagi di dalamnya, masuk satu level sampai `index.html` terlihat.
4. Buka `js/config.js` dengan Notepad dan ganti `ISI_URL_EXEC_DISINI` dengan URL `/exec` dari langkah A6, lalu simpan.

### B2. Install Git & akun GitHub
- Windows: https://git-scm.com/download/win (install dengan pengaturan default). Mac: ketik `git --version` di Terminal.
- Buat akun di https://github.com (username Anda menjadi bagian dari URL situs: `username.github.io`).

### B3. Buat repository
GitHub → tombol **+** → **New repository** → nama: `nusaacademy` → **Public** → **jangan centang** README/.gitignore/license → **Create repository**.

### B4. Buka terminal di folder yang benar
Di File Explorer, buka folder `nusaacademy-frontend`, klik address bar, ketik `powershell`, Enter. Lalu cek:
```powershell
dir
```
Wajib terlihat `index.html`, `css`, `js` (jika tidak, berhenti dan perbaiki folder dulu).

### B5. Identitas Git (sekali per komputer)
```powershell
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496
git config --global user.name "Nama Anda"
git config --global user.email "email-akun-github@contoh.com"
```

<<<<<<< HEAD
**C4. Buat repository** — github.com → **+** → **New repository** → nama mis. `nusaacademy` → **Public** → **jangan** centang README/.gitignore/license → **Create**.

**C5. Masuk ke folder yang benar & verifikasi** (Windows: buka folder di File Explorer → klik address bar → ketik `powershell` → Enter):
```powershell
dir
```
✅ Wajib terlihat `index.html`, `css`, `js` di daftar. Kalau yang terlihat justru folder lain, Anda salah folder — jangan lanjut.

**C6. Push pertama (satu per satu):**
```bash
=======
### B6. Push pertama
Jalankan **satu per satu**:
```powershell
=======
# PANDUAN INSTALASI — NusaAcademy.ID (GAS-PRO-API + GitHub Pages)

## A. Backend (Google Apps Script)
1. Buka https://script.google.com → **Proyek baru**. Hapus `Code.gs` bawaan, buat file **Kode**, tempel seluruh isi `Kode.gs`.
2. Pilih fungsi `setupAwal` → ▶ Run **(hanya sekali)** → *Review permissions* → izinkan. Catat URL Spreadsheet di Execution Log. Akun Anda otomatis menjadi **Superadmin**.
3. Jalankan `pasangTrigger` (sekali).
4. (Opsional WA) Project Settings → Script Properties → tambah `FONNTE_TOKEN`.
5. **Deploy → New deployment → Web app** → Execute as: **Me** · Who has access: **Anyone** → Deploy → salin URL berakhiran `/exec`.
6. Tes: buka `URL_EXEC?action=getKontenPublik` di browser — harus tampil JSON (`brand`, `hero`, `produk`, dst).

## B. Frontend (GitHub Pages)
1. Ekstrak `nusaacademy-frontend.zip`. Folder hasil ekstraksi **`nusaacademy-frontend`** adalah folder tempat `git init` dijalankan (jangan masuk lebih dalam, jangan naik satu level).
2. Buka `js/config.js`, ganti `PASTE_URL_EXEC_DI_SINI` dengan URL `/exec`.
3. Di folder itu `dir` / `ls` harus menampilkan `index.html`, `css`, `js`.
4. Buat repository **Public** baru di GitHub (jangan centang README), lalu dari folder tersebut:
```
>>>>>>> 2f2faa1 (Upload pertama)
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496
git init
git add .
git commit -m "Upload pertama"
git branch -M main
<<<<<<< HEAD
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```
Saat diminta password, tempel **Personal Access Token** (bukan password akun). Layar tampak kosong saat mengetik — itu normal.
Buat token di <https://github.com/settings/tokens> → *Generate new token (classic)* → centang **repo**.

**C7. Aktifkan Pages** — repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch: **main** / **(root)** → **Save** → centang **Enforce HTTPS**. Tunggu 1–2 menit → situs di `https://USERNAME.github.io/NAMA-REPO/`.

**C8. Update berikutnya:**
```bash
=======
<<<<<<< HEAD
git remote add origin https://github.com/USERNAME/nusaacademy.git
git push -u origin main
```
(Ganti `USERNAME` dengan username GitHub Anda. Tanda titik pada `git add .` wajib ada.)

Saat diminta **Username**: username GitHub. **Password**: tempel **Personal Access Token** (bukan password akun). Layar tampak kosong saat paste, itu normal.

**Membuat token:** https://github.com/settings/tokens → *Generate new token (classic)* → centang **repo** → Generate → salin `ghp_...` (hanya tampil sekali).

Alternatif tanpa terminal: **GitHub Desktop** (https://desktop.github.com) → *Add Local Repository* → pilih folder → *Publish repository*.

### B7. Aktifkan GitHub Pages
Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** / **(root)** → Save → centang **Enforce HTTPS**. Tunggu 1–2 menit; situs live di `https://USERNAME.github.io/nusaacademy/`.

---

## C. UJI
1. Buka URL situs → konten (hero, produk, dst.) tampil.
2. Klik **Beli Sekarang** → isi form → cek sheet `Leads` terisi.
3. Klik **Masuk** → masukkan email Superadmin → kode 6 digit dikirim ke email → masuk dashboard.
4. Buka Chrome DevTools (F12) → Network/Console → pastikan tidak ada error CORS.

## D. UPDATE FRONTEND
```powershell
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496
git add .
git commit -m "Deskripsi perubahan"
git push
```
<<<<<<< HEAD
Jika tampilan lama masih muncul: **Ctrl+Shift+R**.

---

## D. LOGIN ADMIN

Buka situs → footer → **Masuk Admin** → masukkan email Superadmin (akun Google yang menjalankan `setupAwal`) → **Kirim kode** → masukkan kode 6 digit dari email. Login Google langsung tidak tersedia di mode API; OTP email adalah penggantinya.

Setelah itu: isi **Pengaturan** (nomor WA admin, email, template), lalu **Hapus data dummy** sebelum go-live.

---

## E. IMPORT DATA DARI APP LAMA

Gunakan jika Anda punya spreadsheet dari versi NusaAcademy sebelumnya. **App lama tidak disentuh** — hanya dibaca.

**Syarat:** spreadsheet lama dimiliki **akun Google yang sama** dengan pemilik app baru (agar gambar di Drive tetap terbaca; ID/URL gambar disalin apa adanya).

1. Login sebagai **Superadmin** → menu **Migrasi Data**.
2. Tempel URL/ID spreadsheet lama.
3. Pilih sheet (log default tidak dicentang). Biarkan "Timpa konten" **tidak dicentang** kecuali memang ingin menimpa.
4. Klik **Pindai (Dry-run)** → periksa tabel *Ditambah / Diperbarui / Dilewati* dan daftar peringatan. Belum ada yang ditulis.
5. Klik **Jalankan Import**. Aman diulang — tidak ada data ganda.
6. Cek Produk, Leads, Pengaturan di dashboard.

**Aturan yang dijalankan otomatis:**
| Data | Kunci | Perilaku |
|---|---|---|
| Hero, Produk, HasilKelas, Testimoni, Kelas, Kurikulum | `id` | Ditambah bila belum ada; ditimpa hanya jika "Timpa" dicentang |
| Leads | `id` | Ditambah; status follow-up diperbarui **hanya** bila masih `baru` di app baru |
| Pengguna | `email` (huruf kecil) | Ditambah; role selain admin/superadmin & email rusak dilewati |
| Pengaturan | `kunci` | Hanya mengisi nilai kosong/bawaan; pengaturan yang sudah Anda ubah tidak ditimpa |
| Kunjungan | `tanggal` | Jumlah = nilai terbesar (lama vs baru) |
| LogAktivitas | waktu+pengguna+aksi+target | Ditambah, diurutkan ulang menurut waktu |

**Penanganan khusus:** nomor WA dinormalisasi ke `62…` (angka 0 di depan yang hilang dipulihkan); notifikasi leads lama berstatus `antre` diubah ke `dilewati` supaya **tidak terkirim ulang** ke pelanggan lama.

### Cutover
1. Pasang app baru → **Pindai** → **Jalankan Import**.
2. Uji dengan satu akun admin.
3. **Tepat sebelum pindah**, jalankan **Import sekali lagi** (delta sync) untuk menangkap leads baru.
4. Umumkan alamat baru. Arsipkan deployment lama (datanya tetap aman).

**Batasan jujur:** sesi login lama tidak ikut pindah (admin cukup login ulang); data > ±20 ribu baris per sheet sebaiknya dipindah per sheet karena batas eksekusi 6 menit Apps Script; spreadsheet beda akun Google tidak bisa dibaca.

---

## F. CHECKLIST TES

- [ ] `URL_EXEC?action=ping` menjawab `status: ok`
- [ ] Situs GitHub Pages tampil lengkap dengan gaya (bukan teks polos)
- [ ] Produk, hero, testimoni tampil dari data sheet
- [ ] Klik **Beli Sekarang** → isi form → baris baru muncul di sheet `Leads`
- [ ] Email notifikasi terkirim (cek kolom `status_notif_email`)
- [ ] Login admin OTP berhasil; edit produk tampil di situs setelah ±beberapa detik
- [ ] Chrome DevTools (F12) → Console: tidak ada error merah

## G. TROUBLESHOOTING

| Gejala | Penyebab | Solusi |
|---|---|---|
| "GAS_URL belum diisi" | `js/config.js` masih placeholder | Isi URL `/exec`, lalu `git add . && git commit -m "fix config" && git push` |
| "Respons server tidak valid" | Deployment bukan *Anyone* / belum versi baru | Manage deployments → Who has access: Anyone → New version |
| Halaman 404 di GitHub Pages | `index.html` tidak di root repo | Pastikan `git init` dari folder `nusaacademy-frontend` |
| Teks polos tanpa gaya | Folder `css/` `js/` rata di root | Push ulang dari terminal, bukan upload web |
| Perubahan tidak tampil | Cache browser / belum New version | Ctrl+Shift+R; deploy New version di Apps Script |
| Kode OTP tidak datang | Email tidak ada di sheet `Pengguna` / kuota email | Cek sheet `Pengguna`; kuota harian MailApp |
| `Password authentication is not supported` | GitHub butuh token | Buat Personal Access Token (C6) |
=======
Jika halaman masih versi lama: **Ctrl+Shift+R**.

## E. TROUBLESHOOTING
| Gejala | Solusi |
|---|---|
| 404 di GitHub Pages, repo menampilkan folder bukan `index.html` | `git init` dijalankan satu level terlalu tinggi. Masuk ke folder yang berisi `index.html`, lalu `git init`, `git add .`, `git commit -m "fix"`, `git branch -M main`, `git remote add origin ...`, `git push -u origin main --force` |
| Halaman tanpa styling | Folder `css/` & `js/` tidak ikut. Jangan upload via web GitHub, gunakan terminal |
| Toast "GAS_URL belum diisi" | Isi `js/config.js`, lalu `git add .`, `commit`, `push` |
| "Respons server tidak valid" | Deployment harus *Execute as Me* + *Anyone*; setelah ubah kode wajib **New version** |
| Kode login tidak masuk email | Email harus ada di sheet `Pengguna` dengan status `aktif`; cek kuota Gmail harian |
| Notifikasi WA "gagal" | `FONNTE_TOKEN` belum diisi / toggle `notif_wa` = OFF di Pengaturan |
| `Password authentication is not supported` | Gunakan Personal Access Token (B6) |
=======
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```
(password = Personal Access Token, scope **repo**; layar kosong saat paste itu normal)
5. Repo → Settings → Pages → Deploy from a branch → `main` `/ (root)` → Save. Situs: `https://USERNAME.github.io/NAMA-REPO/`

## C. Uji
- Landing page tampil dengan data; slideshow & video jalan.
- Isi form checkout → cek sheet `Leads`.
- Login admin: **Masuk Admin** (footer) → email terdaftar → kode OTP dari email.
- Console (F12): tidak ada error CORS.

## D. Setelah mengubah backend
Deploy → Manage deployments → ✏️ → Version: **New version** → Deploy (URL `/exec` tetap).

## Catatan
- Login Google dihapus (tidak bisa di mode REST); gunakan OTP email.
- Konten publik di-cache 10 menit; perubahan dari dashboard langsung membersihkan cache.
>>>>>>> 2f2faa1 (Upload pertama)
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496
