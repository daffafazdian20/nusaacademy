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
git config --global user.name "Nama Anda"
git config --global user.email "email-akun-github@contoh.com"
```

### B6. Push pertama
Jalankan **satu per satu**:
```powershell
git init
git add .
git commit -m "Upload pertama"
git branch -M main
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
git add .
git commit -m "Deskripsi perubahan"
git push
```
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
