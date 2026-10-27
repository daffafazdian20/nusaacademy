<<<<<<< HEAD
# NusaAcademy.ID — Frontend

Landing page + dashboard admin (HTML/CSS/JS vanilla). Backend: Google Apps Script (REST API).
=======
# NusaAcademy.ID — Frontend (GitHub Pages)

<<<<<<< HEAD
Frontend statis (HTML/CSS/JS vanilla). Backend: Google Apps Script sebagai REST API (JSON).

```
index.html      ← harus berada di ROOT repository
css/style.css
js/config.js    ← isi GAS_URL (URL /exec dari Apps Script) sebelum push
js/api.js       ← fetch ke GAS
js/app.js       ← logika landing page + dashboard
```

Update setelah mengubah file: `git add .` → `git commit -m "pesan"` → `git push`.
Lihat `PANDUAN-INSTALASI.md` untuk langkah lengkap.
=======
Frontend statis (HTML/CSS/JS vanilla). Backend: Google Apps Script REST API (terpisah, tidak ada di repo ini).
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496

```
index.html
css/style.css
<<<<<<< HEAD
js/config.js   ← isi GAS_URL di sini
js/api.js      ← fetch ke backend
js/app.js      ← seluruh logika UI
```

Isi `GAS_URL` di `js/config.js` dengan URL `/exec` dari Apps Script, lalu deploy ke GitHub Pages.
Panduan lengkap: `PANDUAN-INSTALASI.md`.
=======
js/config.js   <- isi GAS_URL (URL /exec) sebelum push
js/api.js      <- fetch ke Apps Script
js/app.js      <- landing page + dashboard admin
```
Update: `git add .` → `git commit -m "pesan"` → `git push`.
>>>>>>> 2f2faa1 (Upload pertama)
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496
